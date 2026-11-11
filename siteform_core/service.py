# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Bounded PDF intake and reviewed massing, stored only in the active profile."""
from base64 import b64encode
from contextlib import closing, contextmanager
from copy import deepcopy
from datetime import datetime, timezone
from functools import lru_cache
from hashlib import sha256
from math import dist
from pathlib import Path, PureWindowsPath
import json
import sqlite3
from threading import RLock
from uuid import uuid4

import pymupdf as pdf
from plugins.plugin_storage import plugin_data_dir
from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, StringConstraints, model_validator
from typing import Annotated, Literal

from .geometry import candidates, is_convex, signed_area, simple_ring
from .intake import LabelEvidence
from .review import Limits, building_changes, review_model, site_comparison
from .roof import volume
from .semantics import Parcel, Program, Ring, Translation, courtyard_area, project_metrics, project_outline, translate_ring
from .study import ALGORITHM, StudyInput, evaluate, normalize_axes

MAX_BYTES = 30 * 1024 * 1024
MAX_LIBRARY_BYTES = 120 * 1024 * 1024
MAX_PAGES = 30
MAX_PATHS = 75_000
MAX_STUDIES = 64
UNGUARDED = object()
PDF_LOCK = RLock()
Fraction = Annotated[FiniteFloat, Field(ge=0, le=1)]
Point = tuple[Fraction, Fraction]
Distance = Annotated[FiniteFloat, Field(gt=0, le=10000)]
Code = Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=48)]


class RevisionConflict(ValueError):
    """A working model changed after it was opened."""


class Selection(BaseModel):
    window: tuple[Fraction, Fraction, Fraction, Fraction]


class RulerDetailRequest(BaseModel):
    point: Point


class Ruler(BaseModel):
    points: tuple[Point, Point]
    metres: Distance


class Scale(Ruler):
    check: Ruler | None = Field(default=None, exclude_if=lambda value: value is None)


class Roof(BaseModel):
    model_config = ConfigDict(extra="forbid")
    kind: Literal["gable", "shed", "stepped"]
    rise_m: Annotated[FiniteFloat, Field(gt=0, lt=1000)]
    angle_deg: Annotated[FiniteFloat, Field(ge=0, lt=360)] | None = None
    upper_scale_pct: Annotated[FiniteFloat, Field(ge=10, le=95)] | None = None
    basis: Literal["illustrative", "drawing"] = "illustrative"
    note: Annotated[str, StringConstraints(strip_whitespace=True, max_length=240)] = ""

    @model_validator(mode="after")
    def verify_parameters(self):
        if self.kind == "stepped":
            if self.upper_scale_pct is None or self.angle_deg is not None:
                raise ValueError("A stepped mass needs an upper tier scale between 10% and 95%.")
        elif self.angle_deg is None or self.upper_scale_pct is not None:
            raise ValueError("A pitched roof needs a direction between 0 and 360 degrees.")
        if self.basis == "drawing" and not self.note:
            raise ValueError("Add a drawing reference for a documented roof.")
        return self


class Building(BaseModel):
    code: Code
    height: Annotated[FiniteFloat, Field(gt=0, le=1000)]
    printed_area: Annotated[FiniteFloat, Field(gt=0, le=100_000_000)] | None = None
    method: Literal["vector", "dashed", "joined", "traced"]
    outline: list[Point] = Field(min_length=3, max_length=180)
    candidate: str | None = Field(default=None, max_length=64)
    window: tuple[Fraction, Fraction, Fraction, Fraction] | None = None
    roof: Roof | None = None
    program: Program | None = Field(default=None, exclude_if=lambda value: value is None)
    placement: Translation | None = Field(default=None, exclude_if=lambda value: value is None)
    courtyards: list[Ring] = Field(default_factory=list, max_length=8, exclude_if=lambda value: not value)
    label_evidence: LabelEvidence | None = Field(default=None, exclude_if=lambda value: value is None)

    @model_validator(mode="after")
    def verify_roof(self):
        if self.courtyards and self.roof:
            raise ValueError("Use flat massing for buildings with courtyards.")
        if self.roof and self.roof.rise_m >= self.height:
            raise ValueError("Roof rise must be less than the maximum building height.")
        return self


class OptionRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    name: Code
    revision: Annotated[str, StringConstraints(pattern=r"^[0-9a-f]{64}$")]


class ProposalChange(BaseModel):
    model_config = ConfigDict(extra="forbid")
    code: Code
    roof: Roof | None


class ProposalRequest(OptionRequest):
    base: Annotated[str, StringConstraints(pattern=r"^(working|[0-9a-f]{32})$")]
    changes: list[ProposalChange] = Field(min_length=1, max_length=40)


class RevisionChange(ProposalChange):
    roof: Roof | None = None
    height_m: Annotated[FiniteFloat, Field(gt=0, le=1000)] | None = None


class RevisionRequest(ProposalRequest):
    changes: list[RevisionChange] = Field(min_length=1, max_length=40)


class FormEdit(BaseModel):
    model_config = ConfigDict(extra="forbid")
    code: Code
    height_m: Annotated[FiniteFloat, Field(gt=0, le=1000)] | None
    form: Literal["keep", "flat", "gable", "shed", "stepped"]
    rise_m: FiniteFloat | None
    orientation: FiniteFloat | None

    def as_change(self):
        if self.form in {"keep", "flat"} and (self.rise_m not in (None, 0) or self.orientation not in (None, 0)):
            raise ValueError(f"{self.code}: use null or zero rise and orientation for keep or flat.")
        if self.form == "keep":
            if self.height_m is None:
                raise ValueError(f"{self.code}: supply a new height or choose a different form.")
            return {"code":self.code, "height_m":self.height_m}
        if self.form != "flat" and (self.rise_m is None or self.orientation is None):
            raise ValueError(f"{self.code}: supply both roof rise and orientation.")
        return form_change(self.code, self.form, self.rise_m or 0, self.orientation or 0) | {
            "height_m":self.height_m,
        }


class ReviewRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    reference: Annotated[str, StringConstraints(pattern=r"^(working|[0-9a-f]{32})$")]
    revision: Annotated[str, StringConstraints(pattern=r"^[0-9a-f]{64}$")]
    limits: Limits


class StudySaveRequest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    rank: Annotated[int, Field(strict=True, ge=1, le=5)]
    name: Code


class Draft(BaseModel):
    model_config = ConfigDict(extra="forbid")
    scale: Scale
    buildings: list[Building] = Field(min_length=1, max_length=40)
    site: Parcel | None = Field(default=None, exclude_if=lambda value: value is None)


@contextmanager
def database():
    path = plugin_data_dir("siteform") / "library.sqlite3"
    with closing(sqlite3.connect(path, timeout=15)) as db, db:
        db.row_factory = sqlite3.Row
        db.executescript("""
            CREATE TABLE IF NOT EXISTS documents (
                id TEXT PRIMARY KEY, name TEXT NOT NULL, pages INTEGER NOT NULL,
                bytes BLOB NOT NULL, size INTEGER NOT NULL
            );
            CREATE TABLE IF NOT EXISTS scenes (
                document_id TEXT NOT NULL, page INTEGER NOT NULL, data TEXT NOT NULL,
                PRIMARY KEY(document_id, page)
            );
            CREATE TABLE IF NOT EXISTS variants (
                id TEXT PRIMARY KEY, document_id TEXT NOT NULL, page INTEGER NOT NULL,
                name TEXT NOT NULL, name_key TEXT NOT NULL, created_at TEXT NOT NULL,
                data TEXT NOT NULL, UNIQUE(document_id, page, name_key)
            );
            CREATE TABLE IF NOT EXISTS height_studies (
                id TEXT PRIMARY KEY, data TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS archived_studies (
                id TEXT PRIMARY KEY
            );
            CREATE TABLE IF NOT EXISTS quantity_reviews (
                id TEXT PRIMARY KEY, document_id TEXT NOT NULL, page INTEGER NOT NULL,
                data TEXT NOT NULL
            );
            CREATE TABLE IF NOT EXISTS quantity_heads (
                document_id TEXT NOT NULL, page INTEGER NOT NULL, review_id TEXT NOT NULL,
                PRIMARY KEY(document_id, page)
            );
            CREATE TABLE IF NOT EXISTS position_studies (
                id TEXT PRIMARY KEY, document_id TEXT NOT NULL, page INTEGER NOT NULL,
                data TEXT NOT NULL
            );
        """)
        yield db


def documents():
    with database() as db:
        return [dict(row) for row in db.execute("SELECT id, name, pages, size FROM documents ORDER BY rowid DESC")]


def document(document_id):
    with database() as db:
        row = db.execute("SELECT * FROM documents WHERE id = ?", (document_id,)).fetchone()
    if row is None:
        raise ValueError("This PDF is not in the SiteForm library.")
    return dict(row)


@contextmanager
def open_pdf(content):
    with PDF_LOCK:
        try:
            reader = pdf.open(stream=content, filetype="pdf")
        except (RuntimeError, ValueError) as exc:
            raise ValueError("The selected file is not a readable PDF.") from exc
        with reader:
            if reader.needs_pass or not 1 <= len(reader) <= MAX_PAGES:
                raise ValueError("Choose an unlocked PDF with 1–30 sheets.")
            yield reader


def upload(name, content):
    if len(content) > MAX_BYTES or not content.startswith(b"%PDF-"):
        raise ValueError("Choose a valid PDF up to 30 MiB.")
    name = PureWindowsPath(name or "Drawing.pdf").name[:160]
    digest = sha256(content).hexdigest()
    with open_pdf(content) as reader:
        page_count = len(reader)
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        existing = db.execute("SELECT id, name, pages, size FROM documents WHERE id = ?", (digest,)).fetchone()
        if existing is not None:
            return dict(existing)
        used = db.execute("SELECT COALESCE(SUM(size), 0) FROM documents").fetchone()[0]
        if used + len(content) > MAX_LIBRARY_BYTES:
            raise ValueError("This Hermes profile has reached SiteForm's 120 MiB PDF limit.")
        db.execute("INSERT INTO documents VALUES (?, ?, ?, ?, ?)", (digest, name, page_count, content, len(content)))
    return {"id": digest, "name": name, "pages": page_count, "size": len(content)}


def import_pdf(pdf_path):
    if not isinstance(pdf_path, str) or not 1 <= len(pdf_path) <= 4096 or pdf_path.startswith(("//", "\\")):
        raise ValueError("Enter the absolute path of a local PDF.")
    path = Path(pdf_path)
    if not path.is_absolute() or path.suffix.lower() != ".pdf":
        raise ValueError("Enter the absolute path of a local PDF.")
    try:
        resolved = path.resolve(strict=True)
        if str(resolved).startswith(("//", "\\")) or resolved.suffix.lower() != ".pdf" or not resolved.is_file():
            raise ValueError("Choose a regular local PDF.")
        with resolved.open("rb") as source:
            content = source.read(MAX_BYTES + 1)
    except (OSError, RuntimeError) as exc:
        raise ValueError("The selected local PDF could not be opened.") from exc
    return upload(path.name, content)


@contextmanager
def sheet(document_id, page):
    stored = document(document_id)
    if type(page) is not int or not 1 <= page <= stored["pages"]:
        raise ValueError("Choose a sheet within this PDF.")
    with open_pdf(stored["bytes"]) as reader:
        selected = reader[page - 1]
        if not (0 < selected.rect.width <= 20000 and 0 < selected.rect.height <= 20000):
            raise ValueError("Unsupported PDF page dimensions.")
        yield selected


def read_vectors(document_id, page):
    # Profile identity is part of the key, even when two profiles import the same PDF.
    return _read_vectors(plugin_data_dir("siteform"), document_id, page)


@lru_cache(maxsize=2)
def _read_vectors(profile, document_id, page):
    with sheet(document_id, page) as selected:
        return page_vectors(selected, page)


def page_vectors(selected, page):
    rotation = selected.rotation_matrix
    size = (selected.rect.width, selected.rect.height)
    if any(not 0 < dimension <= 20000 for dimension in size):
        raise ValueError("Unsupported PDF page dimensions.")
    paths = selected.get_drawings()
    info = {
        "page": page, "size": size, "vector_paths": len(paths),
        "text_sample": selected.get_text()[:2000].strip(),
        "automatic": 0 < len(paths) <= MAX_PATHS,
    }
    vectors = [(path["rect"] * rotation, path) for path in paths] if info["automatic"] else []
    return info, vectors, rotation


def inspect(document_id, page):
    return read_vectors(document_id, page)[0]


def preview(document_id, page):
    info = inspect(document_id, page)
    with sheet(document_id, page) as selected:
        ratio = 3200 / max(info["size"])
        image = selected.get_pixmap(matrix=pdf.Matrix(ratio, ratio), colorspace=pdf.csRGB, alpha=False)
        encoded = b64encode(image.tobytes("jpeg", jpg_quality=86)).decode("ascii")
    return {**info, "image": f"data:image/jpeg;base64,{encoded}"}


def ruler_detail(document_id, page, point):
    info, paths, rotation = read_vectors(document_id, page)
    width, height = info["size"]
    x, y = point[0] * width, point[1] * height
    radius = min(48, max(8, max(width, height) * .012))
    with sheet(document_id, page) as selected:
        clip = pdf.Rect(x - radius, y - radius, x + radius, y + radius) & selected.rect
        ratio = 384 / max(clip.width, clip.height)
        image = selected.get_pixmap(matrix=pdf.Matrix(ratio, ratio), clip=clip, colorspace=pdf.csRGB, alpha=False)
        bounds = [image.x / ratio / width, image.y / ratio / height,
                  (image.x + image.width) / ratio / width, (image.y + image.height) / ratio / height]
        encoded = b64encode(image.tobytes("png")).decode("ascii")
    vertices = set()
    for rect, path in paths:
        if rect.x1 < clip.x0 or rect.x0 > clip.x1 or rect.y1 < clip.y0 or rect.y0 > clip.y1:
            continue
        for kind, *values in path["items"]:
            if kind == "l":
                ends = values
            elif kind == "c":
                ends = (values[0], values[-1])
            elif kind == "re":
                box = values[0]
                ends = (box.tl, box.tr, box.bl, box.br)
            elif kind == "qu":
                quad = values[0]
                ends = (quad.ul, quad.ur, quad.ll, quad.lr)
            else:
                continue
            for end in ends:
                vertex = end * rotation
                if clip.x0 <= vertex.x <= clip.x1 and clip.y0 <= vertex.y <= clip.y1:
                    vertices.add((round(vertex.x / width, 9), round(vertex.y / height, 9)))
    nearest = sorted(vertices, key=lambda vertex: (dist((vertex[0]*width, vertex[1]*height), (x, y)), vertex))
    return {"bounds": bounds, "pixels": [image.width, image.height],
            "vertices": [list(vertex) for vertex in nearest[:24]], "image": f"data:image/png;base64,{encoded}"}


def detect(document_id, page, window):
    return detect_in(read_vectors(document_id, page), window)


def detect_in(vectors, window):
    info, paths, rotation = vectors
    width, height = info["size"]
    x0, y0, x1, y1 = Selection(window=window).window
    if (x1 - x0) * width < 8 or (y1 - y0) * height < 8:
        raise ValueError("Mark a larger area around the outline.")
    bounds = pdf.Rect(x0 * width, y0 * height, x1 * width, y1 * height)
    return candidates(paths, rotation, bounds, width, height)


def require_page(db, document_id, page):
    row = db.execute("SELECT pages FROM documents WHERE id = ?", (document_id,)).fetchone()
    if row is None or type(page) is not int or not 1 <= page <= row["pages"]:
        raise ValueError("Choose a sheet within this PDF.")


def with_metrics(data):
    buildings = data["buildings"]
    for building in buildings:
        if "volume_m3" not in building:
            building["volume_m3"] = round(volume(building["footprint"], building["height_m"], building.get("roof"),
                                                   building.get("courtyards", ())), 4)
    data["metrics"] = {
        "building_count": len(buildings),
        "footprint_m2": round(sum(item["area_m2"] for item in buildings), 4),
        "max_height_m": max(item["height_m"] for item in buildings),
        "volume_m3": round(sum(item["volume_m3"] for item in buildings), 4),
        "area_flags": sum(item["difference_pct"] is not None and item["difference_pct"] >= 1 for item in buildings),
        "illustrative_roofs": sum((item.get("roof") or {}).get("basis") == "illustrative" for item in buildings),
    }
    if data.get("parcel") or any(item.get("program") or item.get("courtyards") for item in buildings):
        data["site_metrics"] = project_metrics(buildings, data.get("parcel"))
    canonical = {key: value for key, value in data.items() if key != "revision"}
    data["revision"] = sha256(json.dumps(canonical, sort_keys=True, allow_nan=False).encode()).hexdigest()
    return data


def scene(document_id, page):
    with database() as db:
        document_id, page = resolve_sheet(db, document_id, page)
        row = db.execute("SELECT data FROM scenes WHERE document_id = ? AND page = ?", (document_id, page)).fetchone()
    return with_metrics(json.loads(row["data"])) if row else None


def option_summary(row, data):
    return {key: row[key] for key in ("id", "name", "created_at")} | {
        "revision": data["revision"], "metrics": data["metrics"],
        "origin": "hermes_tool" if "proposal" in data else "desktop",
    }


def variants(document_id, page):
    with database() as db:
        document_id, page = resolve_sheet(db, document_id, page)
        rows = db.execute("SELECT * FROM variants WHERE document_id = ? AND page = ? ORDER BY rowid DESC",
                          (document_id, page)).fetchall()
    return [option_summary(row, json.loads(row["data"])) for row in rows]


def variant(document_id, page, option_id):
    with database() as db:
        require_page(db, document_id, page)
        row = db.execute("SELECT * FROM variants WHERE document_id = ? AND page = ? AND id = ?",
                         (document_id, page, option_id)).fetchone()
    if row is None:
        raise ValueError("This option does not belong to the selected sheet.")
    data = json.loads(row["data"])
    return option_summary(row, data) | {"scene": data}


def chat_option(option_id, compare_to=None):
    with database() as db:
        db.execute("BEGIN")
        row = db.execute("SELECT * FROM variants WHERE id = ?", (option_id,)).fetchone()
        if row is None:
            raise ValueError("This saved option is not in the active SiteForm profile.")
        other = None
        if compare_to is not None:
            if compare_to == option_id:
                raise ValueError("Choose two different saved options.")
            other = db.execute(
                "SELECT * FROM variants WHERE id = ? AND document_id = ? AND page = ?",
                (compare_to, row["document_id"], row["page"]),
            ).fetchone()
            if other is None:
                raise ValueError("Choose two saved options from the same SiteForm sheet.")
    data = json.loads(row["data"])
    sheet = preview(row["document_id"], row["page"])
    result = {
        "option": option_summary(row, data) | {"scene": data},
        "sheet": {"size": sheet["size"], "image": sheet["image"]},
    }
    if other is not None:
        other_data = json.loads(other["data"])
        result["compare_to"] = option_summary(other, other_data) | {"scene": other_data}
        result["comparison"] = comparison_metrics(row, data, other, other_data)
    return result


def read_reference(db, document_id, page, reference, allow_name=False):
    if reference == "working":
        row = db.execute("SELECT data FROM scenes WHERE document_id = ? AND page = ?",
                         (document_id, page)).fetchone()
        if row is None:
            raise ValueError("Build the first working model before using it as a base.")
        return {"id": "working", "name": "Working model"}, with_metrics(json.loads(row["data"]))
    row = db.execute("SELECT * FROM variants WHERE document_id = ? AND page = ? AND id = ?",
                     (document_id, page, reference)).fetchone()
    if row is None and allow_name and isinstance(reference, str):
        row = db.execute("SELECT * FROM variants WHERE document_id = ? AND page = ? AND name_key = ?",
                         (document_id, page, reference.strip().casefold())).fetchone()
    if row is None:
        raise ValueError("This option does not belong to the selected sheet.")
    return dict(row), json.loads(row["data"])


def insert_variant(db, document_id, page, name, data):
    name_key = name.casefold()
    same = db.execute("SELECT * FROM variants WHERE document_id = ? AND page = ? AND name_key = ?",
                      (document_id, page, name_key)).fetchone()
    if same is not None:
        saved = json.loads(same["data"])
        if saved["revision"] == data["revision"]:
            return option_summary(same, saved)
        raise ValueError("Choose a new option name to preserve the saved snapshot.")
    count = db.execute("SELECT COUNT(*) FROM variants WHERE document_id = ? AND page = ?",
                       (document_id, page)).fetchone()[0]
    if count >= 16 or db.execute("SELECT COUNT(*) FROM variants").fetchone()[0] >= 100:
        raise ValueError("The saved option limit has been reached.")
    item = {"id": uuid4().hex, "name": name, "created_at": datetime.now(timezone.utc).isoformat()}
    db.execute("INSERT INTO variants VALUES (?, ?, ?, ?, ?, ?, ?)",
               (item["id"], document_id, page, name, name_key, item["created_at"],
                json.dumps(data, allow_nan=False)))
    return option_summary(item, data)


def save_variant(document_id, page, name, revision):
    request = OptionRequest(name=name, revision=revision)
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        require_page(db, document_id, page)
        _, data = read_reference(db, document_id, page, "working")
        if data["revision"] != request.revision:
            raise ValueError("The working model changed. Reopen the sheet before saving an option.")
        return insert_variant(db, document_id, page, request.name, data)


def dimensions(item, footprint, courtyards=()):
    if item.roof and item.roof.kind == "stepped" and not is_convex(footprint):
        raise ValueError(f"{item.code}: use a convex footprint for a stepped mass.")
    roof = item.roof.model_dump(mode="json") if item.roof else None
    result = {"height_m": item.height, "roof": roof, "volume_m3": round(volume(footprint, item.height, roof, courtyards), 4)}
    if item.program:
        if item.program.minimum_height + (item.roof.rise_m if item.roof else 0) > item.height + 1e-8:
            raise ValueError(f"{item.code}: the confirmed floors do not fit below the roof.")
        result["program"] = item.program.model_dump(mode="json")
    return result


def apply_proposal(data, request):
    if data["revision"] != request.revision:
        raise ValueError("The base model changed. Read its current revision before trying again.")
    positions = {item["code"].casefold(): i for i, item in enumerate(data["buildings"])}
    changed = []
    for change in request.changes:
        index = positions.pop(change.code.casefold(), None)
        if index is None:
            raise ValueError(f"Provide one edit for each known building ID. Check {change.code}.")
        draft = data["draft"]["buildings"][index]
        if "roof" in change.model_fields_set:
            draft["roof"] = change.roof.model_dump(mode="json") if change.roof else None
        if isinstance(change, RevisionChange) and change.height_m is not None:
            if draft["height"] != change.height_m:
                draft.pop("label_evidence", None)
                data["buildings"][index].pop("label_evidence", None)
            draft["height"] = change.height_m
        item = Building.model_validate(draft)
        data["draft"]["buildings"][index] = item.model_dump(mode="json")
        building = data["buildings"][index]
        footprint, courtyards = building["footprint"], building.get("courtyards", ())
        if item.placement:
            dx,dy = -item.placement.dx_m,-item.placement.dy_m
            footprint = translate_ring(footprint,dx,dy)
            courtyards = [translate_ring(ring,dx,dy) for ring in courtyards]
        updated = dimensions(item, footprint, courtyards)
        if not isinstance(change, RevisionChange) or any(building.get(key) != value for key, value in updated.items()):
            changed.append(building["code"])
        building.update(updated)
    data["proposal"] = {"base": request.base, "base_revision": request.revision,
                        "changed_buildings": changed}
    return with_metrics(data)


def propose(document_id, page, base, revision, name, changes):
    request = ProposalRequest(base=base, revision=revision, name=name, changes=changes)
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        require_page(db, document_id, page)
        _, data = read_reference(db, document_id, page, request.base)
        return insert_variant(db, document_id, page, request.name, apply_proposal(data, request))


def save_revision(document_id, page, request: RevisionRequest):
    """Save an immutable alternative only against the revision the user viewed."""
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        require_page(db, document_id, page)
        _, data = read_reference(db, document_id, page, request.base)
        revised = apply_proposal(data, request)
        if not revised["proposal"]["changed_buildings"]:
            raise ValueError("Change a roof or height before saving an alternative.")
        return insert_variant(db, document_id, page, request.name, revised)


def form_change(code, kind, rise_m, orientation):
    if kind == "flat":
        if rise_m != 0 or orientation != 0:
            raise ValueError("Use zero rise and orientation for flat massing.")
        roof = None
    else:
        parameter = "upper_scale_pct" if kind == "stepped" else "angle_deg"
        roof = {"kind": kind, "rise_m": rise_m, parameter: orientation, "basis": "illustrative"}
    return {"code": code, "roof": roof}


def propose_single(document_id, page, base, revision, name, code, kind, rise_m, orientation):
    return propose(document_id, page, base, revision, name, [form_change(code, kind, rise_m, orientation)])


def resolve_sheet(db, drawing, page):
    if not isinstance(drawing, str) or not drawing.strip() or len(drawing) > 160:
        raise ValueError("Use the exact PDF filename or document ID.")
    rows = db.execute("SELECT id, pages FROM documents WHERE id = ? OR name = ? ORDER BY id = ? DESC LIMIT 2",
                      (drawing, drawing, drawing)).fetchall()
    if not rows:
        raise ValueError("This PDF is not in the SiteForm library.")
    if len(rows) > 1 and rows[0]["id"] != drawing:
        raise ValueError("More than one PDF has this filename. Use the document ID from siteform_documents.")
    document_id, pages = rows[0]
    if page is None:
        if pages > 1:
            raise ValueError("Choose a sheet number for this multi-sheet PDF.")
        page = 1
    if type(page) is not int or not 1 <= page <= pages:
        raise ValueError("Choose a sheet within this PDF.")
    return document_id, page


def roof_study(document_id, base, name, code, kind, rise_m, orientation, page=None):
    if not isinstance(base, str) or not 1 <= len(base.strip()) <= 48:
        raise ValueError("Use the exact saved base name, option ID, or 'working'.")
    change = form_change(code, kind, rise_m, orientation)
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        document_id, page = resolve_sheet(db, document_id, page)
        baseline, data = read_reference(db, document_id, page, base.strip(), allow_name=True)
        request = ProposalRequest(base=baseline["id"], revision=data["revision"], name=name, changes=[change])
        previous = data["metrics"]["volume_m3"]
        saved = insert_variant(db, document_id, page, request.name, apply_proposal(data, request))
    current = saved["metrics"]["volume_m3"]
    delta = round(current - previous, 4)
    values = [f"{previous:,.2f}", f"{current:,.2f}", f"{round(delta, 2) or 0.0:+,.2f}"]
    before, after, signed_delta = values
    separators = str.maketrans(",.", ".,")
    before_vi, after_vi, delta_vi = (value.translate(separators) for value in values)
    return {
        "baseline": {"id": baseline["id"], "name": baseline["name"], "volume_m3": previous},
        "option": {"id": saved["id"], "name": saved["name"], "volume_m3": current},
        "volume_delta_m3": delta,
        "reports": {
            "en": f"Volume {before} → {after} m³ (change {signed_delta} m³).",
            "vi": f"Thể tích {before_vi} → {after_vi} m³ (chênh lệch {delta_vi} m³).",
        },
    }


def view_options(document_id, left, right=None, page=None):
    with database() as db:
        db.execute("BEGIN")
        document_id, page = resolve_sheet(db, document_id, page)
        models = []
        for reference in (left,) if right is None else (left, right):
            if not isinstance(reference, str) or not 1 <= len(reference.strip()) <= 48 or reference.strip() == "working":
                raise ValueError("Use the exact name or ID of a saved option.")
            models.append(read_reference(db, document_id, page, reference.strip(), allow_name=True))
    if len(models) == 1:
        row, data = models[0]
        return {"option": option_summary(row, data)}
    (left_ref, left_data), (right_ref, right_data) = models
    if left_ref["id"] == right_ref["id"]:
        raise ValueError("Choose two different saved options.")
    return comparison_metrics(left_ref, left_data, right_ref, right_data)


def revise_option(document_id, base, name, edits, page=None):
    if not isinstance(base, str) or not 1 <= len(base.strip()) <= 48:
        raise ValueError("Use the exact saved base name, option ID, or 'working'.")
    if not isinstance(edits, list) or not 1 <= len(edits) <= 40:
        raise ValueError("Provide between one and 40 building edits.")
    changes = [FormEdit.model_validate(edit).as_change() for edit in edits]
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        document_id, page = resolve_sheet(db, document_id, page)
        baseline, data = read_reference(db, document_id, page, base.strip(), allow_name=True)
        request = RevisionRequest(base=baseline["id"], revision=data["revision"], name=name, changes=changes)
        updated = apply_proposal(deepcopy(data), request)
        if not updated["proposal"]["changed_buildings"]:
            raise ValueError("The edits leave all buildings unchanged.")
        option = insert_variant(db, document_id, page, request.name, updated)
    return {
        "baseline":{"id":baseline["id"],"name":baseline["name"],"revision":data["revision"]},
        "option":option, "comparison":comparison_metrics(baseline, data, option, updated),
    }


def check_model(document_id, model, limits, page=None, revision=None):
    if not isinstance(model, str) or not 1 <= len(model.strip()) <= 48:
        raise ValueError("Use the exact saved option name, option ID, or 'working'.")
    limits = Limits.model_validate(limits)
    with database() as db:
        db.execute("BEGIN")
        document_id, page = resolve_sheet(db, document_id, page)
        reference, data = read_reference(db, document_id, page, model.strip(), allow_name=True)
    if revision is not None and data["revision"] != revision:
        raise ValueError("The reviewed model changed. Reopen the latest revision before running checks.")
    return {"model":{"id":reference["id"],"name":reference["name"]}} | review_model(data, limits)


def height_study(document_id, base, axes, max_height_m, max_volume_m3, page=None, objective="retain_volume"):
    request = StudyInput(axes=axes, max_height_m=max_height_m, max_volume_m3=max_volume_m3, objective=objective)
    if not isinstance(base, str) or not 1 <= len(base.strip()) <= 48 or base.strip() == "working":
        raise ValueError("Use the exact name or ID of a saved base option.")
    with database() as db:
        db.execute("BEGIN")
        document_id, page = resolve_sheet(db, document_id, page)
        reference, data = read_reference(db, document_id, page, base.strip(), allow_name=True)
    inputs = {
        "algorithm":ALGORITHM, "source":data["source"],
        "baseline":{key:reference[key] for key in ("id","name")} | {
            "revision":data["revision"], "metrics":data["metrics"],
        },
        "ranges_m":normalize_axes(data, request.axes),
        "caps":request.model_dump(exclude={"axes","objective"}, exclude_none=True),
    }
    if objective != "retain_volume":
        inputs["objective"] = objective
    if data.get("site_metrics") or objective != "retain_volume":
        inputs["algorithm"] = "height-grid-v2"
    study_id = sha256(json.dumps(inputs, sort_keys=True, allow_nan=False).encode()).hexdigest()[:32]
    result = inputs | {"id":study_id} | evaluate(data, inputs["ranges_m"], request)
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        row = db.execute("SELECT data FROM height_studies WHERE id = ?", (study_id,)).fetchone()
        if row is not None:
            return json.loads(row["data"])
        if db.execute("SELECT COUNT(*) FROM height_studies").fetchone()[0] >= MAX_STUDIES:
            raise ValueError("This profile has reached the 64-study limit.")
        db.execute("INSERT INTO height_studies VALUES (?, ?)", (study_id,json.dumps(result,allow_nan=False)))
    return result


def read_study(db, study_id):
    if not isinstance(study_id, str) or len(study_id) != 32 or any(c not in "0123456789abcdef" for c in study_id):
        raise ValueError("Use the study ID returned by SiteForm.")
    row = db.execute("SELECT data FROM height_studies WHERE id = ?", (study_id,)).fetchone()
    if row is None:
        raise ValueError("This study is not in the active SiteForm profile.")
    return json.loads(row["data"])


def get_study(study_id):
    with database() as db:
        return read_study(db, study_id)


def studies(document_id, page):
    with database() as db:
        require_page(db, document_id, page)
        rows = db.execute("""SELECT height_studies.data, archived_studies.id IS NOT NULL AS archived
                             FROM height_studies LEFT JOIN archived_studies USING (id)
                             ORDER BY height_studies.rowid DESC""").fetchall()
    result = []
    for row in rows:
        item = json.loads(row["data"])
        if (item["source"]["sha256"], item["source"]["page"]) == (document_id,page):
            result.append({key:item[key] for key in ("id","baseline","tested","feasible")} |
                          {"archived":bool(row["archived"])})
    return result


def archive_study(study_id, archived):
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        read_study(db, study_id)
        if archived:
            db.execute("INSERT OR IGNORE INTO archived_studies VALUES (?)", (study_id,))
        else:
            db.execute("DELETE FROM archived_studies WHERE id=?", (study_id,))
    return {"archived":archived}


def study_scene(db, study, rank):
    source, baseline = study["source"], study["baseline"]
    _, data = read_reference(db, source["sha256"], source["page"], baseline["id"])
    if data["revision"] != baseline["revision"]:
        raise ValueError("The saved baseline no longer matches the study.")
    if type(rank) is not int or not 0 <= rank <= len(study["candidates"]):
        raise ValueError("Choose a candidate rank shown in the study.")
    if rank == 0:
        return data
    candidate = study["candidates"][rank - 1]
    changes = [{"code":code,"height_m":height} for code, height in candidate["heights_m"].items()]
    request = RevisionRequest(name="Study candidate", base=baseline["id"],
                              revision=baseline["revision"], changes=changes)
    updated = apply_proposal(data, request)
    if (updated["metrics"]["volume_m3"], updated["metrics"]["max_height_m"]) != (
        candidate["volume_m3"], candidate["peak_m"],
    ):
        raise ValueError("The regenerated candidate no longer matches the study metrics.")
    updated["study"] = {"id":study["id"], "algorithm":study["algorithm"], "caps":study["caps"],
                        "candidate":candidate}
    if "objective" in study:
        updated["study"]["objective"] = study["objective"]
    return with_metrics(updated)


def preview_study(study_id, rank):
    with database() as db:
        db.execute("BEGIN")
        study = read_study(db, study_id)
        data = study_scene(db, study, rank)
    sheet = preview(data["source"]["sha256"], data["source"]["page"])
    name = f"Candidate {rank}" if rank else study["baseline"]["name"]
    return {"scene":data,"name":name,"sheet":{"size":sheet["size"],"image":sheet["image"]}}


def save_study_option(study_id, rank, name):
    if type(rank) is not int or not 1 <= rank <= 5:
        raise ValueError("Choose a candidate rank from 1 to 5.")
    with database() as db:
        db.execute("BEGIN IMMEDIATE")
        study = read_study(db, study_id)
        data = study_scene(db, study, rank)
        request = OptionRequest(name=name, revision=data["revision"])
        source = study["source"]
        return insert_variant(db, source["sha256"], source["page"], request.name, data)


def compare(document_id, page, left, right):
    with database() as db:
        db.execute("BEGIN")
        document_id, page = resolve_sheet(db, document_id, page)
        left_ref, left_data = read_reference(db, document_id, page, left, allow_name=True)
        right_ref, right_data = read_reference(db, document_id, page, right, allow_name=True)
    return comparison_metrics(left_ref, left_data, right_ref, right_data)


def comparison_metrics(left_ref, left_data, right_ref, right_data):
    return {
        "left": {"id": left_ref["id"], "name": left_ref["name"], "metrics": left_data["metrics"], "site_metrics":left_data.get("site_metrics")},
        "right": {"id": right_ref["id"], "name": right_ref["name"], "metrics": right_data["metrics"], "site_metrics":right_data.get("site_metrics")},
        "right_minus_left": {key: round(value - left_data["metrics"][key], 4)
                             for key, value in right_data["metrics"].items()},
        "building_changes": building_changes(left_data, right_data),
        "site_comparison": site_comparison(left_data, right_data),
        "scope": "Concept metrics. Footprint and enclosed volume sum individual buildings. Roof evidence may be illustrative.",
    }


def create(document_id, page, draft):
    data = save(document_id, page, Draft.model_validate(draft), only_new=True)
    return {key: data[key] for key in ("source", "revision", "metrics", "limits", "site_metrics") if key in data}


def calibration_values(scale, size):
    width, height = size
    ruler = [(x * width, y * height) for x, y in scale.points]
    length = dist(*ruler)
    if length < 4:
        raise ValueError("Use two distinct ruler points at least 4 PDF points apart.")
    factor = scale.metres / length
    check = scale.check
    result = None
    if check:
        if set(check.points) == set(scale.points):
            raise ValueError("Use a different known segment for the calibration check.")
        check_length = dist(*[(x * width, y * height) for x, y in check.points])
        if check_length < 4:
            raise ValueError("Use two distinct check points at least 4 PDF points apart.")
        estimated = check_length * factor
        difference = abs(estimated - check.metres) / check.metres * 100
        result = {"expected_m": check.metres, "calculated_m": round(estimated, 4),
                  "difference_pct": round(difference, 4), "review": difference > 2}
    return {"metres_per_pdf_point": factor, "check": result}


def calibration(document_id, page, scale):
    with sheet(document_id, page) as selected:
        size = (selected.rect.width, selected.rect.height)
    return calibration_values(scale, size)


def build_scene(source, draft, vectors):
    info = vectors[0]
    width, height = info["size"]
    codes = {item.code.casefold() for item in draft.buildings}
    if len(codes) != len(draft.buildings):
        raise ValueError("Give each building a distinct ID.")
    calibrated = calibration_values(draft.scale, info["size"])
    factor = calibrated["metres_per_pdf_point"]
    origin = draft.buildings[0].outline[0]
    result = []
    for item in draft.buildings:
        if item.method != "traced":
            if item.window is None or not item.candidate:
                raise ValueError("Re-select the vector candidate to verify its source.")
            match = next((candidate for candidate in detect_in(vectors, item.window)
                          if candidate["id"] == item.candidate and candidate["method"] == item.method), None)
            if match is None or match["outline"] != [list(point) for point in item.outline]:
                raise ValueError("The selected outline no longer matches the PDF vectors.")
        if not simple_ring(item.outline):
            raise ValueError(f"{item.code}: use a closed outline with distinct vertices and no crossings.")
        footprint = project_outline(item.outline, origin, width, height, factor)
        courtyards = [project_outline(ring, origin, width, height, factor) for ring in item.courtyards]
        area = courtyard_area(footprint, courtyards) if courtyards else abs(signed_area(footprint))
        if area < 0.01 or not simple_ring(footprint):
            raise ValueError(f"{item.code}: the scaled outline is too small or degenerate.")
        difference = abs(area - item.printed_area) / item.printed_area * 100 if item.printed_area else None
        properties = dimensions(item, footprint, courtyards)
        if item.placement:
            footprint = translate_ring(footprint,item.placement.dx_m,item.placement.dy_m)
            courtyards = [translate_ring(ring,item.placement.dx_m,item.placement.dy_m) for ring in courtyards]
        result.append({"code": item.code, "footprint": footprint, **properties,
                       "area_m2": area, "printed_area_m2": item.printed_area,
                       "difference_pct": difference, "method": item.method})
        if item.placement:
            result[-1]["placement"] = item.placement.model_dump(mode="json")
        if courtyards:
            result[-1]["courtyards"] = courtyards
        if item.label_evidence:
            result[-1]["label_evidence"] = item.label_evidence.model_dump(mode="json")
    data = {
        "source": source,
        "draft": draft.model_dump(mode="json"), "buildings": result, "metres_per_pdf_point": factor,
        "limits": "Concept massing on flat ground in local metres. Scale, heights and roof parameters are operator-entered.",
    }
    if draft.site:
        parcel = draft.site.model_dump(mode="json")
        parcel["boundary"] = project_outline(draft.site.boundary, origin, width, height, factor)
        parcel["exclusions"] = [project_outline(ring, origin, width, height, factor)
                                for ring in draft.site.exclusions]
        data["parcel"] = parcel
    if calibrated["check"]:
        data["calibration_check"] = calibrated["check"]
    return with_metrics(data)


def save(document_id, page, draft, only_new=False, expected_revision=UNGUARDED):
    source = {"sha256": document_id, "name": document(document_id)["name"], "page": page}
    data = build_scene(source, draft, read_vectors(document_id, page))
    with database() as db:
        if only_new:
            inserted = db.execute("INSERT OR IGNORE INTO scenes VALUES (?, ?, ?)",
                                  (document_id, page, json.dumps(data, allow_nan=False)))
            if inserted.rowcount != 1:
                raise ValueError("A working model already exists. Create a separate proposal instead.")
        else:
            if expected_revision is not UNGUARDED:
                db.execute("BEGIN IMMEDIATE")
                row = db.execute("SELECT data FROM scenes WHERE document_id = ? AND page = ?",
                                 (document_id, page)).fetchone()
                current = with_metrics(json.loads(row["data"])) if row else None
                if current and current["revision"] == data["revision"]:
                    return current
                if (current["revision"] if current else None) != expected_revision:
                    raise RevisionConflict("The working model changed. Reload it before saving. Your draft is still available.")
            db.execute("INSERT OR REPLACE INTO scenes VALUES (?, ?, ?)",
                       (document_id, page, json.dumps(data, allow_nan=False)))
    return data
