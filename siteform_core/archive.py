# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Versioned, sheet-scoped project transfer with atomic, conflict-free restore."""
from datetime import datetime
from hashlib import sha256
from io import BytesIO
from pathlib import PureWindowsPath
from typing import Annotated, Literal
from zipfile import BadZipFile, ZIP_DEFLATED, ZipFile
import json
import re

from pydantic import BaseModel, ConfigDict, Field, StringConstraints, field_validator

from . import dossier, service, spatial

MANIFEST_LIMIT = 12 * 1024 * 1024
ARCHIVE_LIMIT = 128 * 1024 * 1024
Hex32 = Annotated[str, StringConstraints(pattern=r"^[a-f0-9]{32}$")]
Hex64 = Annotated[str, StringConstraints(pattern=r"^[a-f0-9]{64}$")]


class Option(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: Hex32
    name: service.Code
    created_at: datetime
    scene: dict


class SupportingSource(BaseModel):
    model_config = ConfigDict(extra="forbid")
    id: Hex64
    filename: Annotated[str, StringConstraints(min_length=1, max_length=160)]
    pages: Annotated[int, Field(strict=True, ge=1, le=service.MAX_PAGES)]


class Manifest(BaseModel):
    model_config = ConfigDict(extra="forbid")
    version: Literal[1, 2, 3]
    document: Hex64
    filename: Annotated[str, StringConstraints(min_length=1, max_length=160)]
    page: Annotated[int, Field(strict=True, ge=1, le=service.MAX_PAGES)]
    working: dict | None
    options: list[Option] = Field(max_length=16)
    studies: list[dict] = Field(max_length=service.MAX_STUDIES)
    archived_studies: list[Hex32] = Field(default_factory=list, max_length=service.MAX_STUDIES)
    quantity_reviews: list[dict] = Field(default_factory=list, max_length=dossier.MAX_REVIEWS)
    quantity_head: Hex32 | None = None
    supporting_sources: list[dict] = Field(default_factory=list, max_length=16)
    position_studies: list[dict] = Field(default_factory=list, max_length=64)

    @field_validator("supporting_sources")
    @classmethod
    def validate_sources(cls, items):
        return [SupportingSource.model_validate(item).model_dump() for item in items]


def json_text(value):
    return json.dumps(value, sort_keys=True, ensure_ascii=True, allow_nan=False)


def pack(document_id, page):
    with service.database() as db:
        db.execute("BEGIN")
        service.require_page(db, document_id, page)
        source = db.execute("SELECT * FROM documents WHERE id=?", (document_id,)).fetchone()
        working = db.execute("SELECT data FROM scenes WHERE document_id=? AND page=?", (document_id,page)).fetchone()
        options = db.execute(
            "SELECT id,name,created_at,data FROM variants WHERE document_id=? AND page=? ORDER BY rowid",
            (document_id,page),
        ).fetchall()
        studies = [json.loads(row["data"]) for row in db.execute("SELECT data FROM height_studies ORDER BY rowid")]
        archived = {row["id"] for row in db.execute("SELECT id FROM archived_studies")}
        reviews = [json.loads(row["data"]) for row in db.execute(
            "SELECT data FROM quantity_reviews WHERE document_id=? AND page=? ORDER BY rowid", (document_id,page))]
        head = db.execute("SELECT review_id FROM quantity_heads WHERE document_id=? AND page=?", (document_id,page)).fetchone()
        positions = [json.loads(row["data"]) for row in db.execute(
            "SELECT data FROM position_studies WHERE document_id=? AND page=? ORDER BY rowid",(document_id,page))]
        supporting = {}
        for review in reviews:
            for item in review["sources"] + [fact["evidence"] for fact in review["facts"]]:
                key = item["document_id"]
                if key != document_id and key not in supporting:
                    supporting[key] = dict(db.execute("SELECT * FROM documents WHERE id=?", (key,)).fetchone())
    manifest = {
        "version":1, "document":document_id, "filename":source["name"], "page":page,
        "working":json.loads(working["data"]) if working else None,
        "options":[{"id":row["id"],"name":row["name"],"created_at":row["created_at"],
                    "scene":json.loads(row["data"])} for row in options],
        "studies":[row for row in studies if row["source"]["sha256"] == document_id and row["source"]["page"] == page],
    }
    manifest["archived_studies"] = [row["id"] for row in manifest["studies"] if row["id"] in archived]
    if reviews:
        manifest.update(version=2, quantity_reviews=reviews, quantity_head=head["review_id"],
                        supporting_sources=[{"id":key,"filename":value["name"],"pages":value["pages"]}
                                            for key,value in supporting.items()])
    if positions:
        manifest.update(version=3,position_studies=positions)
    payload = json_text(manifest).encode()
    if len(payload) > MANIFEST_LIMIT:
        raise ValueError("This sheet exceeds the project archive limit.")
    buffer = BytesIO()
    with ZipFile(buffer, "w", compression=ZIP_DEFLATED) as archive:
        archive.writestr("project.json", payload)
        archive.writestr("source.pdf", source["bytes"])
        for key, value in supporting.items():
            archive.writestr(f"sources/{key}.pdf", value["bytes"])
    if buffer.tell() > ARCHIVE_LIMIT:
        raise ValueError("The project archive exceeds 128 MiB.")
    return buffer.getvalue()


def unpack(content, *, include_attachments=False):
    if len(content) > ARCHIVE_LIMIT:
        raise ValueError("The SiteForm project archive is too large.")
    try:
        with ZipFile(BytesIO(content)) as archive:
            entries = archive.infolist()
            names = archive.namelist()
            if len(entries) > 18 or len(names) != len(set(names)) or not {"project.json","source.pdf"} <= set(names):
                raise ValueError("Choose a SiteForm archive with its unique manifest and source PDFs.")
            if archive.getinfo("project.json").file_size > MANIFEST_LIMIT or any(
                    item.file_size > service.MAX_BYTES for item in entries if item.filename != "project.json"):
                raise ValueError("The archive exceeds the uncompressed size limit.")
            if sum(item.file_size for item in entries) > service.MAX_LIBRARY_BYTES + MANIFEST_LIMIT:
                raise ValueError("The archive exceeds the profile source limit.")
            manifest = Manifest.model_validate_json(archive.read("project.json"))
            if manifest.position_studies and manifest.version != 3:
                raise ValueError("Position studies require project archive version 3.")
            source = archive.read("source.pdf")
            expected = {"project.json","source.pdf"} | {f'sources/{item["id"]}.pdf' for item in manifest.supporting_sources}
            if set(names) != expected or (manifest.version == 1 and (manifest.quantity_reviews or manifest.supporting_sources or manifest.quantity_head)):
                raise ValueError("Choose a SiteForm archive containing only its manifest and source PDFs for this version.")
            attachments = {item["id"]:archive.read(f'sources/{item["id"]}.pdf') for item in manifest.supporting_sources}
    except (BadZipFile, RuntimeError, NotImplementedError, OSError) as exc:
        raise ValueError("The SiteForm project archive could not be read.") from exc
    if sha256(source).hexdigest() != manifest.document or not source.startswith(b"%PDF-"):
        raise ValueError("The source PDF does not match the project hash.")
    if PureWindowsPath(manifest.filename).name != manifest.filename:
        raise ValueError("Use a plain filename in the project manifest.")
    with service.open_pdf(source) as pdf:
        pages = len(pdf)
        if manifest.page > pages:
            raise ValueError("The saved sheet does not exist in the source PDF.")
        vectors = service.page_vectors(pdf[manifest.page-1], manifest.page)
    verify_payload(manifest, vectors)
    documents = {manifest.document:source}
    if len(attachments) != len(manifest.supporting_sources) or manifest.document in attachments:
        raise ValueError("Duplicate supporting source.")
    for item in manifest.supporting_sources:
        key = item["id"]
        if not re.fullmatch(r"[a-f0-9]{64}", key) or sha256(attachments[key]).hexdigest() != key:
            raise ValueError("A supporting PDF does not match its source hash.")
        if PureWindowsPath(item["filename"]).name != item["filename"] or not 1 <= len(item["filename"]) <= 160:
            raise ValueError("Use plain supporting PDF filenames.")
        with service.open_pdf(attachments[key]) as reader:
            if len(reader) != item["pages"] or not 1 <= len(reader) <= service.MAX_PAGES:
                raise ValueError("Invalid supporting PDF page count.")
        documents[key] = attachments[key]
    try:
        ids = set()
        for review in manifest.quantity_reviews:
            if review["id"] in ids or review["primary"] != {"document_id":manifest.document,"page":manifest.page}:
                raise ValueError("Invalid quantity review identity or sheet.")
            dossier.validate_review(review, documents)
            ids.add(review["id"])
        if manifest.quantity_head is not None and manifest.quantity_head not in ids:
            raise ValueError("The active quantity review is missing.")
        if manifest.quantity_reviews and manifest.quantity_head is None:
            raise ValueError("Choose an active quantity review.")
    except (KeyError, TypeError, IndexError) as exc:
        raise ValueError("The archive contains invalid quantity evidence.") from exc
    result = (manifest, source, pages)
    return (*result, attachments) if include_attachments else result


def verify_payload(manifest, vectors):
    source = {"sha256":manifest.document,"name":manifest.filename,"page":manifest.page}
    options = {item.id:item for item in manifest.options}
    if len(options) != len(manifest.options) or len({item.name.casefold() for item in manifest.options}) != len(options):
        raise ValueError("Duplicate saved options in the archive.")
    for scene in ([manifest.working] if manifest.working is not None else []) + [item.scene for item in manifest.options]:
        rebuilt = service.build_scene(source, service.Draft.model_validate(scene.get("draft")), vectors)
        for key in ("proposal","study","position_study"):
            if key in scene:
                if not isinstance(scene[key], dict):
                    raise ValueError("Invalid saved design provenance.")
                rebuilt[key] = scene[key]
        if json_text(service.with_metrics(rebuilt)) != json_text(scene):
            raise ValueError("A saved model does not match its confirmed geometry or revision.")
    study_ids = set()
    for study in manifest.studies:
        try:
            key = study["id"]
            baseline = options[study["baseline"]["id"]]
            axes = study["ranges_m"]
            draft_axes = [{"code":code,"min_m":values[0],"max_m":values[-1],
                           "step_m":round(values[1]-values[0],2)} for code,values in axes.items()]
            caps = {"max_height_m":None,"max_volume_m3":None} | study["caps"]
            request = service.StudyInput(axes=draft_axes, **caps,
                                         objective=study.get("objective","retain_volume"))
            ranges = service.normalize_axes(baseline.scene, request.axes)
            inputs = {field:study[field] for field in ("algorithm","source","baseline","ranges_m","caps")}
            if "objective" in study:
                inputs["objective"] = request.objective
            expected_id = sha256(json.dumps(inputs, sort_keys=True, allow_nan=False).encode()).hexdigest()[:32]
            if (not re.fullmatch(r"[a-f0-9]{32}", key) or key in study_ids or key != expected_id or
                    study["algorithm"] not in {"height-grid-v1","height-grid-v2"} or study["source"] != source or
                    study["baseline"] != {"id":baseline.id,"name":baseline.name,
                                         "revision":baseline.scene["revision"],"metrics":baseline.scene["metrics"]} or
                    ranges != axes or json_text(study) != json_text(inputs | {"id":key} |
                                                                    service.evaluate(baseline.scene,ranges,request))):
                raise ValueError("The study does not match its archived baseline or ranking.")
            study_ids.add(key)
        except (KeyError, TypeError, AttributeError, IndexError) as exc:
            raise ValueError("The project archive contains an invalid height study.") from exc
    if not set(manifest.archived_studies) <= study_ids:
        raise ValueError("An archived study is missing from the project.")
    position_ids = set()
    position_index = {}
    for study in manifest.position_studies:
        try:
            baseline = options[study["baseline"]["id"]]
            request = spatial.Request.model_validate(study["request"])
            inputs = {field:study[field] for field in ("algorithm","source","baseline","request")}
            key = sha256(spatial.canonical(inputs).encode()).hexdigest()[:32]
            expected = inputs | {"id":key} | spatial.evaluate(baseline.scene,request)
            if (study["algorithm"] != spatial.ALGORITHM or study["id"] != key or key in position_ids
                    or study["source"] != source or request.base != baseline.id
                    or study["baseline"] != {"id":baseline.id,"name":baseline.name,"revision":baseline.scene["revision"]}
                    or json_text(expected) != json_text(study)):
                raise ValueError("The position study does not match its baseline, constraints or ranking.")
            position_ids.add(key)
            position_index[key] = study
        except (KeyError,TypeError,AttributeError) as exc:
            raise ValueError("Invalid archived position study.") from exc
    for scene in ([manifest.working] if manifest.working else []) + [option.scene for option in manifest.options]:
        provenance = scene.get("position_study")
        if not provenance:
            continue
        if provenance.get("id") not in position_ids:
            raise ValueError("A saved position candidate is missing its study.")
        study = position_index[provenance["id"]]
        rank = provenance.get("rank")
        if type(rank) is not int or not 1 <= rank <= len(study["candidates"]):
            raise ValueError("Invalid saved position candidate rank.")
        row = study["candidates"][rank-1]
        expected_provenance = {"id":study["id"],"algorithm":spatial.ALGORITHM,"rank":rank,
                               "dx_m":row["dx_m"],"dy_m":row["dy_m"]}
        if provenance != expected_provenance:
            raise ValueError("The saved position provenance does not match its ranked candidate.")
        baseline = options[study["baseline"]["id"]].scene
        expected = spatial.translated(baseline,study["request"]["code"],row["dx_m"],row["dy_m"])
        if (scene.get("parcel") != expected["parcel"] or scene["draft"]["scale"] != expected["draft"]["scale"]
                or len(scene["buildings"]) != len(expected["buildings"])):
            raise ValueError("The saved position candidate does not match its source frame.")
        for actual,correct in zip(scene["buildings"],expected["buildings"],strict=True):
            if any(actual.get(field) != correct.get(field) for field in ("code","footprint","courtyards","placement")):
                raise ValueError("The saved building positions do not match their ranked candidate.")


def restore(content):
    manifest, source, pages, attachments = unpack(content, include_attachments=True)
    key, page = manifest.document, manifest.page
    with service.database() as db:
        db.execute("BEGIN IMMEDIATE")
        for item in manifest.supporting_sources:
            value = attachments[item["id"]]
            row = db.execute("SELECT name FROM documents WHERE id=?", (item["id"],)).fetchone()
            if row and row["name"] != item["filename"]:
                raise ValueError("A supporting PDF is already stored with a different filename.")
            if row is None:
                used = db.execute("SELECT COALESCE(SUM(size),0) FROM documents").fetchone()[0]
                if used + len(value) > service.MAX_LIBRARY_BYTES:
                    raise ValueError("The supporting PDFs exceed the profile source limit.")
                db.execute("INSERT INTO documents VALUES (?,?,?,?,?)",
                           (item["id"],item["filename"],item["pages"],value,len(value)))
        current = db.execute("SELECT name FROM documents WHERE id=?", (key,)).fetchone()
        if current and current["name"] != manifest.filename:
            raise ValueError("The same PDF is already stored with a different name. Restore into a fresh profile.")
        if current is None:
            used = db.execute("SELECT COALESCE(SUM(size),0) FROM documents").fetchone()[0]
            if used + len(source) > service.MAX_LIBRARY_BYTES:
                raise ValueError("The project exceeds the profile PDF limit.")
            db.execute("INSERT INTO documents VALUES (?,?,?,?,?)", (key,manifest.filename,pages,source,len(source)))
        if manifest.working is not None:
            row = db.execute("SELECT data FROM scenes WHERE document_id=? AND page=?", (key,page)).fetchone()
            if row and json.loads(row["data"]) != manifest.working:
                raise service.RevisionConflict("A different working model already exists for this sheet.")
            db.execute("INSERT OR IGNORE INTO scenes VALUES (?,?,?)", (key,page,json_text(manifest.working)))
        for option in manifest.options:
            row = db.execute("SELECT * FROM variants WHERE id=? OR (document_id=? AND page=? AND name_key=?)",
                             (option.id,key,page,option.name.casefold())).fetchall()
            if row:
                if (len(row) != 1 or row[0]["id"] != option.id or row[0]["name"] != option.name or
                        row[0]["document_id"] != key or row[0]["page"] != page or json.loads(row[0]["data"]) != option.scene):
                    raise ValueError("A different saved option conflicts with the archive.")
                continue
            count = db.execute("SELECT COUNT(*) FROM variants WHERE document_id=? AND page=?", (key,page)).fetchone()[0]
            if count >= 16 or db.execute("SELECT COUNT(*) FROM variants").fetchone()[0] >= 100:
                raise ValueError("The archive exceeds the saved option limit.")
            db.execute("INSERT INTO variants VALUES (?,?,?,?,?,?,?)",
                       (option.id,key,page,option.name,option.name.casefold(),option.created_at.isoformat(),json_text(option.scene)))
        for study in manifest.studies:
            row = db.execute("SELECT data FROM height_studies WHERE id=?", (study["id"],)).fetchone()
            if row:
                if json.loads(row["data"]) != study:
                    raise ValueError("A different height study conflicts with the archive.")
                continue
            if db.execute("SELECT COUNT(*) FROM height_studies").fetchone()[0] >= service.MAX_STUDIES:
                raise ValueError("The archive exceeds the height study limit.")
            db.execute("INSERT INTO height_studies VALUES (?,?)", (study["id"],json_text(study)))
            if study["id"] in manifest.archived_studies:
                db.execute("INSERT OR IGNORE INTO archived_studies VALUES (?)", (study["id"],))
        for study in manifest.position_studies:
            row = db.execute("SELECT data FROM position_studies WHERE id=?",(study["id"],)).fetchone()
            if row and json.loads(row["data"]) != study:
                raise ValueError("A position study conflicts with local data.")
            if row is None:
                if db.execute("SELECT COUNT(*) FROM position_studies").fetchone()[0] >= 64:
                    raise ValueError("The profile position study limit would be exceeded.")
                db.execute("INSERT INTO position_studies VALUES (?,?,?,?)",
                           (study["id"],key,page,spatial.canonical(study)))
        head = db.execute("SELECT review_id FROM quantity_heads WHERE document_id=? AND page=?", (key,page)).fetchone()
        if head and manifest.quantity_head and head["review_id"] != manifest.quantity_head:
            raise service.RevisionConflict("A different quantity review is already active for this sheet.")
        existing_count = db.execute("SELECT COUNT(*) FROM quantity_reviews").fetchone()[0]
        for review in manifest.quantity_reviews:
            row = db.execute("SELECT data FROM quantity_reviews WHERE id=?", (review["id"],)).fetchone()
            if row and json.loads(row["data"]) != review:
                raise ValueError("An archived quantity review conflicts with local data.")
            if row is None:
                existing_count += 1
                if existing_count > dossier.MAX_REVIEWS:
                    raise ValueError("The profile quantity review limit would be exceeded.")
                db.execute("INSERT INTO quantity_reviews VALUES (?,?,?,?)",
                           (review["id"],key,page,dossier.canonical(review)))
        if manifest.quantity_head:
            db.execute("INSERT OR IGNORE INTO quantity_heads VALUES (?,?,?)", (key,page,manifest.quantity_head))
    return {"id":key,"name":manifest.filename,"pages":pages,"page":page,"size":len(source)}
