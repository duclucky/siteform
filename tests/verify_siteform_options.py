"""Regression for roof evidence, independent options and the comparison totals."""
import json
import os
import sys
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from tempfile import TemporaryDirectory

import pymupdf as pdf

event = Path(__file__).resolve().parents[1]
(event/".test-cache").mkdir(exist_ok=True)
sys.path.insert(0, str(event))
from siteform_core import service


def draft(roof=None):
    building = {"code":"A", "height":12, "method":"traced",
                "outline":[[.1,.1],[.5,.1],[.5,.4],[.1,.4]]}
    if roof is not None:
        building["roof"] = roof
    return service.Draft.model_validate({
        "scale":{"points":[[.1,.1],[.2,.1]],"metres":20},
        "buildings":[building],
    })


def main():
    with TemporaryDirectory(prefix="siteform-options-", dir=event/".test-cache") as folder:
        os.environ["HERMES_HOME"] = folder
        with pdf.open() as reader:
            reader.new_page(width=200,height=100)
            reader.new_page(width=200,height=100)
            key = service.upload("source.pdf",reader.tobytes())["id"]
        baseline = service.save(key,1,draft())
        assert baseline["metrics"]["volume_m3"] == 28800
        option = service.save_variant(key,1,"Flat baseline",baseline["revision"])
        pitched = service.save(key,1,draft({"kind":"gable","rise_m":4,"angle_deg":0,
                                            "basis":"illustrative"}))
        assert pitched["metrics"]["volume_m3"] == 24000
        assert pitched["metrics"]["footprint_m2"] == baseline["metrics"]["footprint_m2"]
        assert pitched["buildings"][0]["roof"]["basis"] == "illustrative"
        assert service.variant(key,1,option["id"])["scene"] == baseline
        assert service.variants(key,1)[0]["metrics"] == baseline["metrics"]
        try:
            service.save_variant(key,1,"Stale",baseline["revision"])
        except ValueError as exc:
            assert "changed" in str(exc)
        else:
            raise AssertionError("Stale snapshot accepted")
        for invalid in (
            {"kind":"shed","rise_m":12,"angle_deg":90,"basis":"illustrative"},
            {"kind":"shed","rise_m":2,"angle_deg":90,"basis":"drawing"},
        ):
            try:
                draft(invalid)
            except ValueError:
                pass
            else:
                raise AssertionError("Invalid roof accepted")
        stepped = service.save(key,1,draft({"kind":"stepped","rise_m":4,"upper_scale_pct":50}))
        assert stepped["metrics"]["volume_m3"] == 21600
        invalid_step = draft({"kind":"stepped","rise_m":4,"upper_scale_pct":50})
        invalid_step.buildings[0].outline = [(.1,.1),(.5,.1),(.5,.2),(.2,.2),(.2,.4),(.1,.4)]
        try:
            service.save(key,1,invalid_step)
        except ValueError as exc:
            assert "convex" in str(exc)
        else:
            raise AssertionError("Concave footprint accepted for a stepped mass")
        assert len(service.variants(key,1)) == 1
        assert service.scene(key,1) == stepped
        first = service.create(key,2,draft().model_dump(mode="json"))
        assert first["metrics"]["volume_m3"] == 28800
        try:
            service.create(key,2,draft().model_dump(mode="json"))
        except ValueError as exc:
            assert "already exists" in str(exc)
        else:
            raise AssertionError("Create replaced an existing model")
        edit = [{"code":"a","roof":{"kind":"shed","rise_m":4,"angle_deg":90,"basis":"illustrative"}}]
        result = service.propose(key,1,option["id"],baseline["revision"],"Hermes option",edit)
        assert result["origin"] == "hermes_tool"
        assert service.propose(key,1,option["id"],baseline["revision"],"Hermes option",edit) == result
        saved = service.variant(key,1,result["id"])["scene"]
        assert saved["proposal"]["changed_buildings"] == ["A"]
        assert saved["buildings"][0]["footprint"] == baseline["buildings"][0]["footprint"]
        assert service.scene(key,1) == stepped
        assert service.variant(key,1,option["id"])["scene"] == baseline
        comparison = service.compare(key,1,option["id"],result["id"])
        assert comparison["right_minus_left"]["volume_m3"] == -4800
        assert service.compare(key,1,"Flat baseline","Hermes option") == comparison
        try:
            service.propose(key,1,option["id"],baseline["revision"],"Height injection",
                            [{"code":"A","height_m":10,"roof":None}])
        except ValueError:
            pass
        else:
            raise AssertionError("Native roof proposal changed the base height")
        try:
            service.propose(key,1,"working",baseline["revision"],"Stale proposal",edit)
        except ValueError as exc:
            assert "changed" in str(exc)
        else:
            raise AssertionError("Stale proposal accepted")
        assert len(service.variants(key,1)) == 2
        study = {"document_id":"source.pdf", "page":1, "base":"Flat baseline", "name":"Chat roof study",
                 "code":"A", "kind":"gable", "rise_m":4, "orientation":90}
        with ThreadPoolExecutor(max_workers=2) as workers:
            first_call = workers.submit(service.roof_study, **study)
            retry_call = workers.submit(service.roof_study, **study)
            study_result = first_call.result()
            assert retry_call.result() == study_result
        assert study_result["baseline"]["id"] == option["id"]
        studied = service.variant(key,1,study_result["option"]["id"])
        assert studied["origin"] == "hermes_tool" and studied["scene"]["proposal"]["base"] == option["id"]
        assert studied["scene"]["buildings"][0]["height_m"] == 12
        assert study_result["volume_delta_m3"] == -4800
        assert study_result["reports"] == {
            "en":"Volume 28,800.00 → 24,000.00 m³ (change -4,800.00 m³).",
            "vi":"Thể tích 28.800,00 → 24.000,00 m³ (chênh lệch -4.800,00 m³).",
        }
        assert service.roof_study(**study) == study_result
        assert service.scene(key,1) == stepped
        for changes, error in (
            ({"page":None}, "sheet number"),
            ({"document_id":"missing.pdf"}, "not in the SiteForm library"),
            ({"rise_m":12}, "less than the maximum"),
            ({"rise_m":3}, "Choose a new option name"),
        ):
            try:
                service.roof_study(**(study | changes))
            except ValueError as exc:
                assert error in str(exc), str(exc)
            else:
                raise AssertionError(f"Roof study unexpectedly accepted {changes}")
        with pdf.open() as reader:
            reader.new_page(width=300,height=200)
            service.upload("source.pdf",reader.tobytes())
        try:
            service.roof_study(**study)
        except ValueError as exc:
            assert "More than one PDF" in str(exc)
        else:
            raise AssertionError("Ambiguous drawing filename accepted")
        assert service.roof_study(**(study | {"document_id":key})) == study_result
        assert len(service.variants(key,1)) == 3
        assert service.view_options(key,"Chat roof study",page=1) == {
            "option":next(item for item in service.variants(key,1) if item["id"] == studied["id"])
        }
        assert service.view_options(key,"Flat baseline","Chat roof study",page=1) == (
            service.compare(key,1,option["id"],studied["id"])
        )
        assert len(service.variants(key,1)) == 3 and service.scene(key,1) == stepped
        edits = [
            {"code":"A","height_m":11,"form":"keep","rise_m":None,"orientation":None},
            {"code":"B","height_m":9,"form":"shed","rise_m":2,"orientation":90},
        ]
        plan = draft().model_dump(mode="json")
        plan["buildings"].append({"code":"B","height":10,"method":"traced",
                                  "outline":[[.51,.1],[.6,.1],[.6,.4],[.51,.4]]})
        two = service.save(key,1,service.Draft.model_validate(plan))
        base = service.save_variant(key,1,"Two blocks",two["revision"])
        revised = service.revise_option(key,"Two blocks","Lower roofs",edits,page=1)
        assert service.FormEdit(code="B",height_m=9,form="flat",rise_m=0,orientation=0).as_change()["roof"] is None
        assert service.revise_option(key,"Two blocks","Lower roofs",edits,page=1) == revised
        assert revised["baseline"]["id"] == base["id"]
        assert revised["comparison"]["building_changes"][0]["height_delta_m"] == -1
        assert set(revised["comparison"]["building_changes"][1]["changed"]) == {"height","roof","volume"}
        assert service.scene(key,1) == two
        assert service.variant(key,1,base["id"])["scene"] == two
        option_id = revised["option"]["id"]
        review = service.check_model(key,option_id,{"max_height_m":10,"min_clearance_m":3},page=1)
        assert review["finding_count"] == 2
        assert {item["kind"]:item["actual"] for item in review["findings"]} == {
            "height":11, "clearance":2,
        }
        assert service.check_model(key,option_id,{"max_height_m":11,"min_clearance_m":2},page=1)["findings"] == []
        capped = service.check_model(key,option_id,{"max_footprint_m2":1,"max_volume_m3":1},page=1)
        assert [item["kind"] for item in capped["findings"]] == ["footprint","volume"]
        nested = plan["buildings"][1] | {"outline":[[.2,.2],[.3,.2],[.3,.3],[.2,.3]]}
        touching = plan["buildings"][1] | {"outline":[[.5,.2],[.6,.2],[.6,.3],[.5,.3]]}
        for shape in (nested, touching):
            candidate = plan | {"buildings":[plan["buildings"][0],shape]}
            service.save(key,2,service.Draft.model_validate(candidate))
            findings = service.check_model(key,"working",{"min_clearance_m":1},page=2)["findings"]
            assert len(findings) == 1 and findings[0]["actual"] == 0
        for rejected in (edits + [edits[0]], [edits[0], edits[1] | {"height_m":1}]):
            try:
                service.revise_option(key,"Two blocks","Rejected edits",rejected,page=1)
            except ValueError:
                pass
            else:
                raise AssertionError("An invalid multi-building edit was committed")
        assert len(service.variants(key,1)) == 5
        axes = [
            {"code":"A","min_m":9,"max_m":11,"step_m":1},
            {"code":"B","min_m":8,"max_m":10,"step_m":1},
        ]
        study = service.height_study(key,base["id"],axes,10,28860,page=1)
        assert study["tested"] == 9 and study["feasible"] == 5
        assert study["candidates"][0]["heights_m"] == {"A":10,"B":9}
        assert study["candidates"][0]["volume_m3"] == 28860
        assert service.height_study(key,"Two blocks",axes,10,28860,page=1) == study
        assert len(service.variants(key,1)) == 5
        with ThreadPoolExecutor(max_workers=2) as workers:
            saves = [workers.submit(service.save_study_option,study["id"],1,"Highest retained volume")
                     for _ in range(2)]
            selected = saves[0].result()
            assert saves[1].result() == selected
        assert selected["metrics"]["volume_m3"] == study["candidates"][0]["volume_m3"]
        assert service.save_study_option(study["id"],1,"Highest retained volume") == selected
        saved = service.variant(key,1,selected["id"])["scene"]
        assert saved["study"]["id"] == study["id"]
        assert service.scene(key,1) == two
        assert service.height_study(key,base["id"],axes,8,None,page=1)["feasible"] == 0
        assert service.height_study(key,base["id"],axes[1:],10,None,page=1)["fixed_height_blockers"] == ["A"]
        roof_axis = [{"code":"B","min_m":1,"max_m":2,"step_m":1}]
        roof_study = service.height_study(key,option_id,roof_axis,20,None,page=1)
        assert roof_study["rejections"] == {"roof_rise":2}
        for invalid in ([axes[0] | {"step_m":.3}], [axes[0]] * 2, [axes[0] | {"code":"missing"}]):
            try:
                service.height_study(key,base["id"],invalid,10,None,page=1)
            except ValueError:
                pass
            else:
                raise AssertionError("An invalid height grid was accepted")
        print(json.dumps({"passed":True,"checks":["flat/roof volume","same footprint","roof evidence",
          "immutable option","stale revision rejected","invalid roof rejected","working model preserved","native create only once","native proposal isolation and idempotency","native metric delta","native stale proposal rejected","named roof study","Vietnamese volume formatting","roof study idempotency and refusal cases","read-only named option lookup","atomic multi-building edits and retry","height and aggregate limits","clearance, contact and containment","exact height grid and capped ranking","roof rise and fixed height blockers","concurrent study candidate save"]}))


if __name__ == "__main__":
    main()
