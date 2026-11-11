"""Position-study behavior through persistence, constraints and portable restore."""
from copy import deepcopy
from tempfile import TemporaryDirectory
from concurrent.futures import ThreadPoolExecutor
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
import os
import json
from pydantic import ValidationError
from fastapi import FastAPI
from fastapi.testclient import TestClient

import pymupdf as pdf

from verify_siteform_options import event, service
from siteform_core import archive, spatial
from siteform_core.api import router


def fixture():
    return service.Draft.model_validate({
        "scale":{"points":[[0,0],[.1,0]],"metres":10},
        "site":{"boundary":[[0,0],[.9,0],[.9,.9],[0,.9]],
                "exclusions":[[[.5,.1],[.6,.1],[.6,.2],[.5,.2]]],
                "reference":"Synthetic parcel for geometry verification"},
        "buildings":[{"code":"A","height":12,"method":"traced",
                      "outline":[[.01,.1],[.11,.1],[.11,.2],[.01,.2]]},
                     {"code":"B","height":10,"method":"traced",
                      "outline":[[.25,.1],[.35,.1],[.35,.2],[.25,.2]]}],
    })


def verify_source_shapes():
    with pdf.open() as reader:
        page=reader.new_page(width=100,height=100)
        page.draw_rect(pdf.Rect(10,10,20,20))
        key=service.upload("vector-position.pdf",reader.tobytes())["id"]
    candidate=service.detect(key,1,[.05,.05,.25,.25])[0]
    payload=fixture().model_dump(mode="json")
    payload["buildings"]=[{**payload["buildings"][0],**candidate,"height":12,"code":"V",
                            "candidate":candidate["id"],"window":[.05,.05,.25,.25]}]
    # Candidate records contain display-only fields outside Building's contract.
    payload["buildings"][0]={key:value for key,value in payload["buildings"][0].items()
                              if key in service.Building.model_fields}
    base=service.save(key,1,service.Draft.model_validate(payload))
    option=service.save_variant(key,1,"Vector baseline",base["revision"])
    study=spatial.position_study(key,option["id"],"V",{"min_m":2,"max_m":2,"step_m":1},
        {"min_m":0,"max_m":0,"step_m":1},0,0,page=1)
    moved=spatial.preview(study["id"],1)["scene"]
    assert moved["draft"]["buildings"][0]["candidate"] == candidate["id"]
    assert moved["buildings"][0]["volume_m3"] == base["buildings"][0]["volume_m3"]
    forged=deepcopy(moved["draft"])
    forged["buildings"][0]["outline"][0][0]+=.01
    try:
        service.build_scene(base["source"],service.Draft.model_validate(forged),service.read_vectors(key,1))
    except ValueError:
        pass
    else:
        raise AssertionError("Design translation bypassed vector provenance")
    court=fixture().model_dump(mode="json")
    court["buildings"]=court["buildings"][:1]
    court["buildings"][0]["courtyards"]=[[[.03,.12],[.08,.12],[.08,.18],[.03,.18]]]
    court["buildings"][0]["placement"]={"dx_m":3,"dy_m":4}
    rebuilt=service.build_scene(base["source"],service.Draft.model_validate(court),service.read_vectors(key,1))
    assert rebuilt["buildings"][0]["courtyards"][0][0] == [5,6]


def main():
    with TemporaryDirectory(prefix="siteform-position-",dir=event/".test-cache") as folder:
        os.environ["HERMES_HOME"]=folder
        with pdf.open() as reader:
            reader.new_page(width=100,height=100)
            key=service.upload("synthetic-position.pdf",reader.tobytes())["id"]
        baseline=service.save(key,1,fixture())
        option=service.save_variant(key,1,"Position baseline",baseline["revision"])
        study=spatial.position_study(key,"Position baseline","A",
            {"min_m":0,"max_m":16,"step_m":2},{"min_m":0,"max_m":0,"step_m":1},2,3,page=1)
        assert study["tested"] == 9 and study["feasible"] >= 1
        full=spatial.position_study(key,option["id"],"A",
            {"min_m":0,"max_m":16,"step_m":2},{"min_m":0,"max_m":16,"step_m":2},2,3,page=1)
        assert full["tested"] == 81 and len(full["trace"]) == 81
        blocked=spatial.position_study(key,option["id"],"A",
            {"min_m":0,"max_m":0,"step_m":1},{"min_m":0,"max_m":0,"step_m":1},100,0,page=1)
        assert blocked["feasible"] == 0 and blocked["candidates"] == []
        assert study["candidates"][0]["dx_m"] == 2
        assert "setback" in study["trace"][0]["violations"]
        assert any("clearance" in row["violations"] for row in study["trace"])
        assert any("overlap" in row["violations"] for row in study["trace"])
        assert service.scene(key,1) == baseline
        view=spatial.preview(study["id"],1)
        moved=view["scene"]
        assert moved["buildings"][0]["footprint"][0][0] == baseline["buildings"][0]["footprint"][0][0]+2
        assert moved["draft"]["buildings"][0]["outline"] == baseline["draft"]["buildings"][0]["outline"]
        assert moved["metrics"]["volume_m3"] == baseline["metrics"]["volume_m3"]
        assert moved["parcel"] == baseline["parcel"]
        assert moved["buildings"][1] == baseline["buildings"][1]
        changes=service.building_changes(baseline,moved)
        assert "position" in changes[0]["changed"] and changes[0]["displacement_m"] == 2
        with ThreadPoolExecutor(max_workers=2) as pool:
            saved=list(pool.map(lambda _:spatial.save_candidate(study["id"],1,"Shift A"),range(2)))
        assert saved[0]["id"] == saved[1]["id"]
        repeated=spatial.position_study(key,"Position baseline","A",
            {"min_m":0,"max_m":16,"step_m":2},{"min_m":0,"max_m":0,"step_m":1},2,3,page=1)
        assert repeated["id"] == study["id"]
        empty=spatial.envelope(baseline,100)
        assert empty["area_m2"] == 0 and empty["polygons"] == []
        assert spatial.envelope(baseline,2)["polygons"][0]["holes"]
        concave=deepcopy(baseline)
        concave["parcel"]={"boundary":[[0,0],[8,0],[8,3],[12,3],[12,0],[20,0],[20,10],
                                           [12,10],[12,7],[8,7],[8,10],[0,10]],"exclusions":[]}
        assert len(spatial.envelope(concave,2.1)["polygons"]) == 2
        for bad in [{"min_m":0,"max_m":10,"step_m":1},{"min_m":0,"max_m":3,"step_m":2},
                    {"min_m":0,"max_m":1,"step_m":0}]:
            try:
                spatial.OffsetAxis.model_validate(bad)
            except ValidationError:
                pass
            else:
                raise AssertionError("An oversized or inexact position grid was accepted")
        unchanged=spatial.position_study(key,option["id"],"A",
            {"min_m":0,"max_m":0,"step_m":1},{"min_m":0,"max_m":0,"step_m":1},0,0,page=1)
        assert unchanged["feasible"] == 0 and unchanged["trace"][0]["outcome"] == "unchanged"
        service.revise_option(key,"Shift A","Shift A taller",
            [{"code":"A","height_m":13,"form":"keep","rise_m":None,"orientation":None}],page=1)
        app=FastAPI()
        app.include_router(router)
        with TestClient(app) as client:
            result=client.post(f"/documents/{key}/1/position-studies",json={
                **study["request"],"base":option["id"]})
            assert result.status_code == 200 and result.json()["id"] == study["id"]
            assert client.get(f'/position-studies/{study["id"]}/preview/99').status_code == 422
            assert client.get(f'/position-studies/{study["id"]}/preview/0').json()["scene"] == baseline
        content=archive.pack(key,1)
        with ZipFile(BytesIO(content)) as reader:
            manifest=json.loads(reader.read("project.json"))
            manifest["position_studies"][0]["candidates"][0]["dx_m"]=99
            corrupted=BytesIO()
            with ZipFile(corrupted,"w",ZIP_DEFLATED) as writer:
                for name in reader.namelist():
                    writer.writestr(name,json.dumps(manifest).encode() if name == "project.json" else reader.read(name))
        try:
            archive.unpack(corrupted.getvalue())
        except ValueError:
            pass
        else:
            raise AssertionError("A forged position ranking passed archive validation")
        with ZipFile(BytesIO(content)) as reader:
            manifest=json.loads(reader.read("project.json"))
            option_scene=next(item["scene"] for item in manifest["options"] if item["name"] == "Shift A")
            option_scene["position_study"]["rank"]=2
            option_scene["position_study"]["dx_m"]=study["candidates"][1]["dx_m"]
            option_scene.update(service.with_metrics(option_scene))
            corrupted=BytesIO()
            with ZipFile(corrupted,"w",ZIP_DEFLATED) as writer:
                for name in reader.namelist():
                    writer.writestr(name,json.dumps(manifest).encode() if name == "project.json" else reader.read(name))
        try:
            archive.unpack(corrupted.getvalue())
        except ValueError:
            pass
        else:
            raise AssertionError("A saved option falsely claiming another position rank was accepted")
        with TemporaryDirectory(prefix="siteform-position-restore-",dir=event/".test-cache") as destination:
            os.environ["HERMES_HOME"]=destination
            archive.restore(content)
            assert spatial.get_study(study["id"]) == study
            assert spatial.preview(study["id"],1)["scene"] == moved
        os.environ["HERMES_HOME"]=folder
        verify_source_shapes()
        with TemporaryDirectory(prefix="siteform-position-isolation-",dir=event/".test-cache") as isolated:
            os.environ["HERMES_HOME"]=isolated
            try:
                spatial.get_study(study["id"])
            except ValueError:
                pass
            else:
                raise AssertionError("A position study crossed profile boundaries")
        os.environ["HERMES_HOME"]=folder
        print("Position constraints, trace, source preservation, concurrent save and archive passed.")


if __name__ == "__main__":
    main()
