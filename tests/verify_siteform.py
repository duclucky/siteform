"""Exercise SiteForm contracts against Hermes and a small rotated vector PDF."""
import json
import os
import sys
from pathlib import Path
from tempfile import TemporaryDirectory

import pymupdf as pdf
from fastapi import FastAPI
from fastapi.testclient import TestClient

event = Path(__file__).resolve().parents[1]
(event/".test-cache").mkdir(exist_ok=True)
sys.path.insert(0, str(event))
from siteform_core import service
from siteform_core.api import router


def expect_error(callback):
    try:
        callback()
    except ValueError:
        return
    raise AssertionError("Expected validation error")


def main():
    with TemporaryDirectory(prefix="siteform-check-", dir=event / ".test-cache") as directory:
        root = Path(directory)
        os.environ["HERMES_HOME"] = str(root)
        source = root / "rotated-test.pdf"
        with pdf.open() as reader:
            page = reader.new_page(width=400, height=300)
            page.draw_polyline([(70, 90), (180, 90), (180, 160), (110, 160), (70, 130)],
                               closePath=True, color=(0.1, 0.2, 0.5))
            page.draw_oval(pdf.Rect(250, 60, 330, 100), color=(0.1, 0.3, 0.5))
            page.insert_text((190, 180), "Test geometry")
            page.set_rotation(90)
            reader.save(source)
        api = FastAPI()
        api.include_router(router, prefix="/api/plugins/siteform")
        with TestClient(api) as http:
            prefix = "/api/plugins/siteform/documents"
            bad = http.post(prefix, files={"file": ("test.pdf", b"bad pdf", "application/pdf")})
            assert bad.status_code == 400, bad.text
            oversized = http.post(prefix, headers={"Content-Length": "40000000"})
            assert oversized.status_code == 413, oversized.text
            first = http.post(prefix, files={"file": (source.name, source.read_bytes(), "application/pdf")})
            assert first.status_code == 200, first.text
            data = first.json()
            assert service.import_pdf(str(source)) == data
            assert len(http.get(prefix).json()) == 1
            expect_error(lambda: service.import_pdf("test.pdf"))
            expect_error(lambda: service.import_pdf("//example.com/sharing/file.pdf"))
            expect_error(lambda: service.inspect("../anything", 1))

            endpoint = prefix + "/" + data["id"] + "/1"
            sheet = http.get(endpoint).json()
            assert sheet["size"] == [300, 400] and sheet["vector_paths"] == 2
            assert sheet["image"].startswith("data:image/jpeg;base64,")
            assert http.get(endpoint + "/scene").json() is None
            window = [0.15, 0.1, 0.85, 0.6]
            found = http.post(endpoint + "/detect", json={"window": window}).json()
            assert len(found) == 1 and len(found[0]["outline"]) == 5
            curve = http.post(endpoint + "/detect", json={"window": [.6,.6,.85,.9]}).json()
            assert len(curve) == 1 and 12 < len(curve[0]["outline"]) <= 180
            assert abs(curve[0]["area_pt2"] - 2513.27) < 25
            candidate = found[0]
            item = {"code": "A", "height": 10, "method": "vector", "outline": candidate["outline"],
                    "candidate": candidate["id"], "window": window}
            scale = {"points": [[0.1, 0.1], [0.2, 0.1]], "metres": 30}
            scene = http.put(endpoint + "/scene", json={"scale": scale, "buildings": [item]})
            assert scene.status_code == 200, scene.text
            saved = scene.json()
            assert service.scene(source.name,None) == saved
            assert abs(saved["buildings"][0]["area_m2"] - 7100) < 0.02
            assert http.get(endpoint + "/scene").json() == saved
            option = http.post(endpoint + "/variants", json={"name":"Chat option", "revision":saved["revision"]})
            assert option.status_code == 200, option.text
            option_id = option.json()["id"]
            assert service.variants(source.name,None) == [option.json()]
            card_url = "/api/plugins/siteform/chat-options/" + option_id
            card = http.get(card_url)
            assert card.status_code == 200, card.text
            assert card.json()["option"]["scene"] == saved
            assert card.json()["sheet"]["size"] == [300, 400]
            assert card.json()["sheet"]["image"].startswith("data:image/jpeg;base64,")
            assert http.get("/api/plugins/siteform/chat-options/invalid").status_code == 422
            other = service.propose_single(data["id"],1,option_id,saved["revision"],
                                           "Roof alternative","A","gable",2,90)
            pair = http.get(card_url, params={"compare_to":other["id"]})
            assert pair.status_code == 200, pair.text
            result = pair.json()
            assert result["option"]["scene"] == saved
            assert result["compare_to"]["id"] == other["id"]
            assert result["comparison"] == service.compare(data["id"],1,option_id,other["id"])
            assert result["comparison"]["right_minus_left"]["volume_m3"] < 0
            assert result["comparison"]["building_changes"][0]["code"] == "A"
            review_url = endpoint + "/review"
            review = {"reference":option_id,"revision":saved["revision"],"limits":{"max_height_m":9}}
            review_response = http.post(review_url,json=review)
            assert review_response.status_code == 200, review_response.text
            assert review_response.json()["findings"] == [{"kind":"height","buildings":["A"],"actual":10,"limit":9}]
            assert http.post(review_url,json=review | {"revision":"0"*64}).status_code == 400
            assert http.post(review_url,json=review | {"limits":{"min_clearance_m":0}}).status_code == 200
            assert http.get(card_url, params={"compare_to":option_id}).status_code == 400
            assert http.get(card_url, params={"compare_to":"invalid"}).status_code == 422
            assert http.get(card_url, params={"compare_to":"a"*32}).status_code == 400
            with pdf.open() as second_reader:
                second_reader.new_page(width=250, height=175)
                second = service.upload("another.pdf",second_reader.tobytes())["id"]
            second_draft = service.Draft.model_validate({
                "scale":scale,
                "buildings":[{"code":"B","method":"traced","height":10,
                              "outline":[[.2,.2],[.6,.2],[.6,.4],[.2,.4]]}],
            })
            second_scene = service.save(second,1,second_draft)
            second_option = service.save_variant(second,1,"Another sheet",second_scene["revision"])
            assert http.get(card_url, params={"compare_to":second_option["id"]}).status_code == 400
            study = service.height_study(source.name,option_id,[{"code":"A","min_m":7,"max_m":9,"step_m":1}],
                                         9,None,page=1)
            study_url = "/api/plugins/siteform/height-studies/" + study["id"]
            assert http.get(study_url).json() == study
            assert http.get(study_url + "/preview/0").json()["scene"] == saved
            assert http.get(study_url + "/preview/1").json()["scene"]["buildings"][0]["height_m"] == 9
            assert http.get(study_url + "/preview/4").status_code == 400
            assert http.get(study_url + "/preview/6").status_code == 422
            assert len(service.variants(data["id"],1)) == 2
            save = http.post(study_url + "/save", json={"rank":1,"name":"Studied height"})
            assert save.status_code == 200, save.text
            assert save.json()["metrics"]["volume_m3"] == study["candidates"][0]["volume_m3"]
            assert http.post(study_url + "/save", json={"rank":0,"name":"Invalid rank"}).status_code == 422
            altered = {**item, "outline": [[0.3, 0.1], *item["outline"][1:]]}
            assert http.put(endpoint + "/scene", json={"scale": scale, "buildings": [altered]}).status_code == 400
            crossing = {**item, "method": "traced", "outline": [[0.1, 0.1], [0.8, 0.8], [0.8, 0.1], [0.1, 0.8]]}
            assert http.put(endpoint + "/scene", json={"scale": scale, "buildings": [crossing]}).status_code == 400
            assert http.put(endpoint + "/scene", json={"scale": scale, "buildings": [item, item]}).status_code == 400
            assert http.get(endpoint + "/scene").json() == saved

        os.environ["HERMES_HOME"] = str(root / "other-profile")
        expect_error(lambda: service.inspect(data["id"], 1))
        assert service.documents() == []
        with TestClient(api) as http:
            assert http.get(card_url).status_code == 400
            assert http.get(study_url).status_code == 400
            assert http.get(study_url + "/preview/1").status_code == 400
            assert http.post(study_url + "/save", json={"rank":1,"name":"Unavailable study"}).status_code == 400
        print(json.dumps({"passed": True, "checks": [
            "rotated vector PDF", "native local import deduplication", "invalid and oversized upload",
            "local path constraints", "closed vector and cubic path detection", "massing and persistence",
            "reject tampered vector, crossed trace and duplicate IDs", "profile isolation",
            "profile-scoped chat preview", "saved option comparison card and invalid pair rejection",
            "per-building comparison", "revision-scoped concept check and invalid threshold rejection",
            "study preview, explicit save, rank validation and profile isolation",
        ]}))


if __name__ == "__main__":
    main()
