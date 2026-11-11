"""Regression checks for the SiteForm upgrade, with an isolated profile."""
import os
from base64 import b64decode
from tempfile import TemporaryDirectory
from unicodedata import normalize
from io import BytesIO
from zipfile import ZipFile

import pymupdf as pdf

from verify_siteform_options import draft, event, service
from siteform_core import archive, delivery, intake


def verify_working_save(key):
    baseline = service.save(key, 1, draft(), expected_revision=None)
    newer = draft()
    newer.buildings[0].height = 14
    confirmed = service.save(key, 1, newer, expected_revision=baseline["revision"])
    try:
        service.save(key, 1, draft(), expected_revision=baseline["revision"])
    except service.RevisionConflict:
        pass
    else:
        raise AssertionError("An outdated editor silently overwrote a newer model")
    assert service.scene(key, 1) == confirmed
    assert service.save(key, 1, newer, expected_revision=baseline["revision"]) == confirmed


def verify_parcel(key):
    payload = draft().model_dump(mode="json")
    payload["buildings"][0]["program"] = {"floors": 2, "floor_height_m": 3, "use": "Office"}
    payload["buildings"].append({
        **payload["buildings"][0], "code":"B", "outline":[[.3,.1],[.7,.1],[.7,.4],[.3,.4]],
    })
    payload["site"] = {"boundary":[[0,0],[.6,0],[.6,.6],[0,.6]], "reference":"Confirmed study boundary"}
    model = service.save(key, 1, service.Draft.model_validate(payload))
    assert model["site_metrics"]["union_footprint_m2"] == 3600
    assert model["site_metrics"]["covered_in_parcel_m2"] == 3000
    assert model["site_metrics"]["gross_floor_area_m2"] == 9600
    report = service.check_model(key, "working", {"min_setback_m":11}, page=1)
    assert any(f["kind"] == "outside_parcel" and f["buildings"] == ["B"] for f in report["findings"])


def verify_delivery(key):
    data = draft().model_dump(mode="json")
    data["buildings"][0]["courtyards"] = [[[.2,.2],[.3,.2],[.3,.3],[.2,.3]]]
    scene = service.save(key, 1, service.Draft.model_validate(data))
    assert scene["buildings"][0]["area_m2"] == 2200
    assert scene["metrics"]["volume_m3"] == 26400
    option = service.save_variant(key, 1, "Courtyard", scene["revision"])
    study = service.height_study(key, option["id"], [{"code":"A","min_m":10,"max_m":13,"step_m":1}],
                                 13, None, 1, "lowest_peak")
    assert study["candidates"][0]["heights_m"]["A"] == 10
    request = service.ReviewRequest(reference=option["id"], revision=scene["revision"], limits={"max_height_m":10})
    report = delivery.report_bytes(key, 1, request)
    with pdf.open(stream=report,filetype="pdf") as document:
        text = normalize("NFKC", "".join(page.get_text() for page in document))
        assert scene["revision"] in text and "26,400.00" in text and "1 finding." in text
        document[0].get_pixmap().save(event / ".test-cache/siteform-roadmap-report.png")
    payload = archive.pack(key, 1)
    malicious = BytesIO(payload)
    with ZipFile(malicious,"a") as transfer:
        transfer.writestr("../outside.txt","bad")
    try:
        archive.restore(malicious.getvalue())
    except ValueError as exc:
        assert "only its manifest and source" in str(exc)
    else:
        raise AssertionError("An archive with a path traversal entry was accepted")
    original = os.environ["HERMES_HOME"]
    try:
        with TemporaryDirectory(prefix="siteform-restore-",dir=event/".test-cache") as folder:
            os.environ["HERMES_HOME"] = folder
            assert archive.restore(payload)["id"] == key
            assert archive.restore(payload)["id"] == key
            assert service.scene(key, 1) == scene
            assert service.variant(key, 1, option["id"])["scene"] == scene
            assert service.get_study(study["id"]) == study
            assert service.preview_study(study["id"],1)["scene"]["metrics"]["volume_m3"] == 22000
            assert service.archive_study(study["id"], True)["archived"]
            assert service.studies(key,1)[0]["archived"]
            service.archive_study(study["id"], False)
            assert not service.studies(key,1)[0]["archived"]
            service.save(key,1,draft())
            try:
                archive.restore(payload)
            except service.RevisionConflict:
                pass
            else:
                raise AssertionError("Archive replaced a different working model")
    finally:
        os.environ["HERMES_HOME"] = original


def verify_intake():
    with pdf.open() as drawing, pdf.open() as scan:
        page = drawing.new_page(width=400,height=240)
        page.insert_text((45,45),"SITE PLAN",fontsize=20)
        page.insert_text((45,105),"CN1 HEIGHT 16.25 m",fontsize=24)
        page.insert_text((45,165),"CN2 HEIGHT 15",fontsize=24)
        vector = service.upload("labels.pdf",drawing.tobytes())["id"]
        image = page.get_pixmap(matrix=pdf.Matrix(3,3))
        scan.new_page(width=400,height=240).insert_image(page.rect,pixmap=image)
        raster = service.upload("scan.pdf",scan.tobytes())["id"]
    labels = intake.suggestions(vector,1)
    assert labels["headings"] == ["SITE PLAN"]
    assert [(item["code"],item["height_m"]) for item in labels["labels"]] == [("CN1",16.25)]
    assert not intake.suggestions(raster,1)["text_present"]
    ocr = intake.suggestions(raster,1,True)
    assert [(item["code"],item["height_m"]) for item in ocr["labels"]] == [("CN1",16.25)], ocr
    evidence = ocr["labels"][0]["evidence"]
    payload = draft().model_dump(mode="json")
    payload["buildings"][0].update(code="CN1",height=16.25,label_evidence=evidence)
    payload["scale"]["check"] = {"points":[[.1,.3],[.2,.3]],"metres":19}
    saved = service.save(raster,1,service.Draft.model_validate(payload))
    assert saved["calibration_check"]["review"] and saved["calibration_check"]["calculated_m"] == 20
    assert saved["buildings"][0]["label_evidence"] == evidence
    option = service.save_variant(raster,1,"Scan baseline",saved["revision"])
    updated = service.revise_option(raster,option["id"],"Changed height",
                                    [{"code":"CN1","height_m":14,"form":"keep","rise_m":None,"orientation":None}],1)
    assert "label_evidence" not in service.variant(raster,1,updated["option"]["id"])["scene"]["buildings"][0]


def verify_label_corpus():
    """Synthetic independent cases cover format boundaries without implying field accuracy."""
    cases = (
        ("A01 H=12 m", 0, False, ("A01",12)),
        ("A02 Height: 12,5 m",90,False,("A02",12.5)),
        ("A03 H=14.25 m",180,False,("A03",14.25)),
        ("A04 H=15 m",270,False,("A04",15)),
        ("BUILDING A05 H=10 m",0,False,("A05",10)),
        ("A06 H=0 m",0,False,None),
        ("A07 H=12 ft",0,False,None),
        ("A08 H=12",0,False,None),
        ("A09 H=19 m",0,True,("A09",19)),
        ("A10 HEIGHT 21 m",0,True,("A10",21)),
    )
    for index,(label,rotation,raster,expected) in enumerate(cases):
        with pdf.open() as source, pdf.open() as document:
            page = source.new_page(width=400,height=200)
            page.insert_text((40,80),label,fontsize=28)
            if raster:
                document.new_page(width=400,height=200).insert_image(page.rect,pixmap=page.get_pixmap(matrix=pdf.Matrix(3,3)))
            else:
                document.insert_pdf(source)
            document[0].set_rotation(rotation)
            key = service.upload(f"corpus-{index+1}.pdf",document.tobytes())["id"]
        result = intake.suggestions(key,1,raster)
        found = [(item["code"],item["height_m"]) for item in result["labels"]]
        assert found == ([] if expected is None else [expected]), (label,result)
        for item in result["labels"]:
            x0,y0,x1,y1 = item["evidence"]["bounds"]
            assert 0 <= x0 < x1 <= 1 and 0 <= y0 < y1 <= 1


def verify_calibration():
    with pdf.open() as reader:
        page = reader.new_page(width=400, height=200)
        page.draw_line((40, 80), (110, 80), color=(0, 0, 0))
        page.set_rotation(90)
        key = service.upload("rotated-ruler.pdf", reader.tobytes())["id"]
        with pdf.open() as raster:
            raster.new_page(width=200, height=400).insert_image(
                page.rect, pixmap=page.get_pixmap(matrix=pdf.Matrix(3, 3)))
            raster_key = service.upload("raster-ruler.pdf", raster.tobytes())["id"]
    detail = service.ruler_detail(key, 1, (.605, .102))
    assert detail["image"].startswith("data:image/png;base64,")
    assert detail["vertices"][0] == [.6, .1]
    left, top, right, bottom = detail["bounds"]
    assert left < .6 < right and top < .1 < bottom
    assert 384 <= max(detail["pixels"]) <= 386
    for source in [detail, service.ruler_detail(raster_key, 1, (.605, .102))]:
        x0, y0, x1, y1 = source["bounds"]
        crop = pdf.Pixmap(b64decode(source["image"].split(",", 1)[1]))
        x = int((.6 - x0) / (x1 - x0) * crop.width)
        y = int((.11 - y0) / (y1 - y0) * crop.height)
        assert max(crop.pixel(x, y)) < 128, (source["vertices"], crop.pixel(x, y))
    assert service.ruler_detail(raster_key, 1, (.605, .102))["vertices"] == []
    edge = service.ruler_detail(key, 1, (1, 1))
    assert edge["bounds"][0] < 1 <= edge["bounds"][2]
    assert not edge["vertices"]
    model_draft = draft()
    model_draft.scale = service.Scale(points=[(.6, .1), (.6, .275)], metres=70, check={
        "points": [(.2, .5), (.7, .5)], "metres": 95,
    })
    result = service.calibration(key, 1, model_draft.scale)
    saved = service.save(key, 1, model_draft)
    assert result["metres_per_pdf_point"] == saved["metres_per_pdf_point"]
    assert result["check"] == saved["calibration_check"]
    assert result["check"]["review"]
    assert result["check"]["calculated_m"] == 100
    for check_points in [list(reversed(model_draft.scale.points)), [(.2, .5), (.201, .5)]]:
        invalid = service.Scale(points=model_draft.scale.points, metres=70, check={
            "points": check_points, "metres": 95,
        })
        try:
            service.calibration(key, 1, invalid)
        except ValueError:
            pass
        else:
            raise AssertionError("An invalid independent ruler passed the preview")


def main():
    with TemporaryDirectory(prefix="siteform-roadmap-", dir=event / ".test-cache") as folder:
        os.environ["HERMES_HOME"] = folder
        with pdf.open() as reader:
            reader.new_page(width=200, height=100)
            key = service.upload("roadmap.pdf", reader.tobytes())["id"]
        verify_working_save(key)
        verify_parcel(key)
        verify_delivery(key)
        verify_intake()
        verify_label_corpus()
        verify_calibration()
    print("SiteForm roadmap checks passed")


if __name__ == "__main__":
    main()
