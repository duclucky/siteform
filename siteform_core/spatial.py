# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Bounded source-preserving position alternatives in the calibrated sheet plane."""
from collections import Counter
from copy import deepcopy
from decimal import Decimal
from hashlib import sha256
from itertools import combinations, product
from math import hypot
from typing import Annotated
import json
import re

from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, model_validator
from shapely import union_all

from . import service
from .semantics import Translation, building_shape, polygon, translate_ring

ALGORITHM = "position-grid-v1"


class OffsetAxis(BaseModel):
    model_config = ConfigDict(extra="forbid")
    min_m: Annotated[Decimal, Field(ge=-1000, le=1000, decimal_places=2)]
    max_m: Annotated[Decimal, Field(ge=-1000, le=1000, decimal_places=2)]
    step_m: Annotated[Decimal, Field(gt=0, le=1000, decimal_places=2)]

    @model_validator(mode="after")
    def check_grid(self):
        count,remainder = divmod(self.max_m-self.min_m,self.step_m)
        if remainder or not 0 <= count <= 8:
            raise ValueError("Each offset axis must reach its maximum exactly and contain 1–9 positions.")
        return self

    def values(self):
        count = int((self.max_m-self.min_m)/self.step_m)
        return [float(self.min_m+index*self.step_m) for index in range(count+1)]


class Request(BaseModel):
    model_config = ConfigDict(extra="forbid")
    base: service.Code
    code: service.Code
    dx: OffsetAxis
    dy: OffsetAxis
    setback_m: Annotated[FiniteFloat, Field(ge=0,le=1000)]
    clearance_m: Annotated[FiniteFloat, Field(ge=0,le=1000)]


def canonical(value):
    return json.dumps(value,sort_keys=True,allow_nan=False)


def envelope(data, setback_m):
    if not data.get("parcel"):
        raise ValueError("Confirm a parcel boundary before exploring positions.")
    if not 0 <= setback_m <= 1000:
        raise ValueError("Use a setback between 0 and 1000 metres.")
    parcel = data["parcel"]
    region = polygon(parcel["boundary"]).buffer(-setback_m)
    region = region.difference(union_all([polygon(ring) for ring in parcel["exclusions"]]))
    parts = [] if region.is_empty else ([region] if region.geom_type == "Polygon" else list(region.geoms))
    shapes = [{"boundary":[list(point) for point in item.exterior.coords[:-1]],
               "holes":[[list(point) for point in ring.coords[:-1]] for ring in item.interiors]}
              for item in parts if item.geom_type == "Polygon" and item.area > 1e-8]
    return {"setback_m":setback_m,"area_m2":round(region.area,4),"polygons":shapes}


def translated(data, code, dx, dy):
    updated = deepcopy(data)
    index = next((i for i,item in enumerate(updated["buildings"]) if item["code"] == code), None)
    if index is None:
        raise ValueError("Choose a building from the saved baseline.")
    draft = updated["draft"]["buildings"][index]
    building = updated["buildings"][index]
    prior = draft.get("placement") or {"dx_m":0,"dy_m":0}
    position = Translation(dx_m=round(prior["dx_m"]+dx,4),dy_m=round(prior["dy_m"]+dy,4))
    if position.dx_m or position.dy_m:
        draft["placement"] = position.model_dump()
        building["placement"] = position.model_dump()
    else:
        draft.pop("placement",None)
        building.pop("placement",None)
    building["footprint"] = translate_ring(building["footprint"],dx,dy)
    if building.get("courtyards"):
        building["courtyards"] = [translate_ring(ring,dx,dy) for ring in building["courtyards"]]
    return service.with_metrics(updated)


def violations(data, setback, clearance):
    boundary = polygon(data["parcel"]["boundary"])
    exclusions = union_all([polygon(ring) for ring in data["parcel"]["exclusions"]])
    shapes = [(item["code"],building_shape(item)) for item in data["buildings"]]
    found = []
    for code,shape in shapes:
        if shape.difference(boundary).area > 1e-8:
            found.append({"kind":"outside_parcel","buildings":[code]})
        elif shape.distance(boundary.boundary)+1e-8 < setback:
            found.append({"kind":"setback","buildings":[code]})
        if not exclusions.is_empty and shape.intersection(exclusions).area > 1e-8:
            found.append({"kind":"exclusion","buildings":[code]})
    for (left,a),(right,b) in combinations(shapes,2):
        if a.intersection(b).area > 1e-8:
            found.append({"kind":"overlap","buildings":[left,right]})
        elif a.distance(b)+1e-8 < clearance:
            found.append({"kind":"clearance","buildings":[left,right]})
    return found


def evaluate(data, request):
    feasible_region = envelope(data,request.setback_m)
    trace = []
    for dx,dy in product(request.dx.values(),request.dy.values()):
        candidate = translated(data,request.code,dx,dy)
        findings = violations(candidate,request.setback_m,request.clearance_m)
        outcome = "rejected" if findings else ("unchanged" if dx == dy == 0 else "feasible")
        trace.append({"dx_m":dx,"dy_m":dy,"movement_m":round(hypot(dx,dy),6),"outcome":outcome,
                      "violations":sorted({item["kind"] for item in findings}),"findings":findings})
    passed = sorted((row for row in trace if row["outcome"] == "feasible"),
                    key=lambda row:(Decimal(str(row["dx_m"]))**2+Decimal(str(row["dy_m"]))**2,
                                    row["dx_m"],row["dy_m"]))
    return {"tested":len(trace),"feasible":len(passed),
            "baseline_findings":violations(data,request.setback_m,request.clearance_m),
            "envelope":feasible_region,
            "rejections":dict(Counter(kind for row in trace for kind in row["violations"])),
            "candidates":[{**row,"rank":rank} for rank,row in enumerate(passed[:5],1)],"trace":trace}


def position_study(document_id, base, code, dx, dy, setback_m, clearance_m, page=None):
    request = Request(base=base,code=code,dx=dx,dy=dy,setback_m=setback_m,clearance_m=clearance_m)
    base,code = request.base,request.code
    if base == "working":
        raise ValueError("Save a baseline option before exploring positions.")
    with service.database() as db:
        db.execute("BEGIN")
        document_id,page = service.resolve_sheet(db,document_id,page)
        reference,data = service.read_reference(db,document_id,page,base,allow_name=True)
    names = {item["code"].casefold():item["code"] for item in data["buildings"]}
    if code.casefold() not in names:
        raise ValueError("Choose a building from the saved baseline.")
    request.code = names[code.casefold()]
    inputs = {"algorithm":ALGORITHM,"source":data["source"],
              "baseline":{key:reference[key] for key in ("id","name")} | {"revision":data["revision"]},
              "request":request.model_dump(mode="json") | {"base":reference["id"]}}
    key = sha256(canonical(inputs).encode()).hexdigest()[:32]
    with service.database() as db:
        row = db.execute("SELECT data FROM position_studies WHERE id=?",(key,)).fetchone()
    if row:
        return json.loads(row["data"])
    result = inputs | {"id":key} | evaluate(data,request)
    with service.database() as db:
        db.execute("BEGIN IMMEDIATE")
        if db.execute("SELECT COUNT(*) FROM position_studies").fetchone()[0] >= 64:
            if not db.execute("SELECT 1 FROM position_studies WHERE id=?",(key,)).fetchone():
                raise ValueError("This profile has reached the 64-position-study limit.")
        db.execute("INSERT OR IGNORE INTO position_studies VALUES (?,?,?,?)",
                   (key,document_id,page,canonical(result)))
    return result


def read_study(db, study_id):
    if not isinstance(study_id,str) or not re.fullmatch(r"[a-f0-9]{32}",study_id):
        raise ValueError("Choose a saved position study.")
    row = db.execute("SELECT data FROM position_studies WHERE id=?",(study_id,)).fetchone()
    if row is None:
        raise ValueError("This position study is not in the active profile.")
    return json.loads(row["data"])


def get_study(study_id):
    with service.database() as db:
        return read_study(db,study_id)


def open_studies(document_id,page=None,study_id=None):
    with service.database() as db:
        document_id,page = service.resolve_sheet(db,document_id,page)
        if study_id is not None:
            study = read_study(db,study_id)
            if (study["source"]["sha256"],study["source"]["page"]) != (document_id,page):
                raise ValueError("Choose a position study from this drawing sheet.")
            return study
    return {"studies":list_studies(document_id,page)}


def list_studies(document_id,page):
    with service.database() as db:
        service.require_page(db,document_id,page)
        result = []
        for row in db.execute("SELECT data FROM position_studies WHERE document_id=? AND page=? ORDER BY rowid DESC",
                              (document_id,page)):
            data = json.loads(row["data"])
            result.append({key:data[key] for key in ("id","baseline","request","tested","feasible")})
        return result


def candidate_scene(db, study, rank):
    source,baseline = study["source"],study["baseline"]
    _,data = service.read_reference(db,source["sha256"],source["page"],baseline["id"])
    if data["revision"] != baseline["revision"]:
        raise ValueError("The saved baseline no longer matches the position study.")
    if type(rank) is not int or not 0 <= rank <= len(study["candidates"]):
        raise ValueError("Choose a position rank from this study.")
    if rank == 0:
        return data
    row = study["candidates"][rank-1]
    changed = translated(data,study["request"]["code"],row["dx_m"],row["dy_m"])
    rebuilt = service.build_scene(source,service.Draft.model_validate(changed["draft"]),
                                  service.read_vectors(source["sha256"],source["page"]))
    for field in ("proposal","study","position_study"):
        if field in data:
            rebuilt[field] = data[field]
    rebuilt["proposal"] = {"base":baseline["id"],"base_revision":baseline["revision"],
                           "changed_buildings":[study["request"]["code"]]}
    rebuilt["position_study"] = {"id":study["id"],"algorithm":ALGORITHM,"rank":rank,
                                 "dx_m":row["dx_m"],"dy_m":row["dy_m"]}
    if violations(rebuilt,study["request"]["setback_m"],study["request"]["clearance_m"]):
        raise ValueError("The regenerated position no longer passes the study constraints.")
    return service.with_metrics(rebuilt)


def preview(study_id,rank):
    with service.database() as db:
        db.execute("BEGIN")
        study = read_study(db,study_id)
        scene = candidate_scene(db,study,rank)
    sheet = service.preview(scene["source"]["sha256"],scene["source"]["page"])
    return {"scene":scene,"sheet":{"size":sheet["size"],"image":sheet["image"]},
            "name":study["baseline"]["name"] if rank == 0 else f"Position candidate {rank}"}


def save_candidate(study_id,rank,name):
    if type(rank) is not int or not 1 <= rank <= 5:
        raise ValueError("Choose a feasible candidate rank from 1 to 5.")
    with service.database() as db:
        db.execute("BEGIN IMMEDIATE")
        study = read_study(db,study_id)
        scene = candidate_scene(db,study,rank)
        request = service.OptionRequest(name=name,revision=scene["revision"])
        source = scene["source"]
        return service.insert_variant(db,source["sha256"],source["page"],request.name,scene)
