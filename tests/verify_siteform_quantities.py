"""Quantity review, source integrity, revision conflicts and transfer regression."""
import json
import os
from io import BytesIO
from zipfile import ZipFile, ZIP_DEFLATED
from unicodedata import normalize
from types import SimpleNamespace
from pathlib import Path
from tempfile import TemporaryDirectory

import pymupdf as pdf

from verify_siteform_options import draft, event, service
from siteform_core import archive, delivery, dossier
from siteform_core.api import router
from fastapi import FastAPI
from fastapi.testclient import TestClient


def main():
    with TemporaryDirectory(prefix="siteform-quantities-", dir=event/".test-cache") as folder:
        os.environ["HERMES_HOME"] = folder
        with pdf.open() as document:
            page = document.new_page(width=500, height=400)
            for index, line in enumerate([
                "Site area 538.9 m2", "Footprint area 375.0 m2",
                "Above ground area 2950 m2", "Basement area 460 m2",
                "Total floor area 3410 m2", "Floor area ratio 5.47",
            ]):
                page.insert_text((30, 40+index*24), line)
            key = service.upload("quantities.pdf", document.tobytes())["id"]
        baseline = service.save(key, 1, draft())
        review = dossier.project_review(key, 1, [{"document_id":key, "page":1, "locale":"en"}])
        facts = {fact["quantity"]: fact for fact in review["facts"]}
        assert set(facts) == {"parcel_area", "footprint_area", "above_ground_area",
                              "basement_area", "total_floor_area", "far"}
        assert facts["above_ground_area"]["value"] == 2950
        assert not review["confirmed"]
        ids = [item["id"] for item in facts.values()]
        saved = dossier.confirm_facts(review["id"], ids, facts["above_ground_area"]["id"],
                                      facts["parcel_area"]["id"])
        assert abs(saved["calculation"]["far"]-2950/538.9) < 1e-12
        assert saved["calculation"]["numerator_m2"] == 2950
        assert dossier.confirm_facts(review["id"], ids, facts["above_ground_area"]["id"],
                                    facts["parcel_area"]["id"])["id"] == saved["id"]
        assert service.scene(key, 1) == baseline
        assert dossier.get_review(review["id"])["confirmed"] == []
        try:
            dossier.confirm_facts(review["id"], [], None, None)
        except service.RevisionConflict:
            pass
        else:
            raise AssertionError("A stale quantity review overwrote a confirmation")
        fake = dict(facts["parcel_area"])
        fake["value_text"] = "999.1"
        try:
            dossier.add_fact(saved["id"], dossier.FactInput.model_validate(fake))
        except ValueError:
            pass
        else:
            raise AssertionError("A quantity without matching source evidence was accepted")
        with pdf.open() as document:
            page = document.new_page(width=500, height=200)
            page.insert_text((30,40), "Site area 540.0 m2")
            supporting = service.upload("supporting.pdf", document.tobytes())["id"]
        saved = dossier.project_review(key, 1, [{"document_id":supporting,"page":1,"locale":"en"}])
        assert any(item["kind"] == "source_conflict" for item in saved["findings"])
        class BrokenModel:
            def complete_structured(self, **kwargs):
                raise RuntimeError("Controlled provider failure")
        failed = dossier.project_review(key,1,[{"document_id":supporting,"page":1,"locale":"en"}],
                                        use_model=True,llm=BrokenModel())
        assert failed["warnings"] and len(failed["facts"]) == len(saved["facts"])
        saved = failed
        with pdf.open(stream=delivery.quantity_report_bytes(saved["id"]),filetype="pdf") as report:
            report_text = normalize("NFKC", " ".join(" ".join(page.get_text() for page in report).split()))
            assert "Confirmed FAR" in report_text, report_text[-500:]
        content = archive.pack(key, 1)
        with TemporaryDirectory(prefix="siteform-quantities-restore-", dir=event/".test-cache") as restored:
            os.environ["HERMES_HOME"] = restored
            archive.restore(content)
            reopened = dossier.latest(key, 1)
            assert reopened["id"] == saved["id"]
            assert reopened["calculation"] == saved["calculation"]
            assert service.scene(key, 1) == baseline
            assert service.document(supporting)["name"] == "supporting.pdf"
            assert dossier.get_review(review["id"])["confirmed"] == []
            assert archive.restore(content)["id"] == key
        os.environ["HERMES_HOME"] = folder
        with ZipFile(BytesIO(content)) as reader:
            manifest = json.loads(reader.read("project.json"))
            manifest["quantity_reviews"][-1]["facts"][0]["value"] = 999
            malicious = BytesIO()
            with ZipFile(malicious,"w",ZIP_DEFLATED) as writer:
                for name in reader.namelist():
                    writer.writestr(name, json.dumps(manifest).encode() if name == "project.json" else reader.read(name))
        try:
            archive.restore(malicious.getvalue())
        except ValueError:
            pass
        else:
            raise AssertionError("An archive with forged quantities was accepted")
        assert dossier.parse_number("2.950", "vi") == 2950
        assert dossier.parse_number("2,950.25", "en") == 2950.25
        assert dossier.parse_number("538,9", "vi") == 538.9
        class StructuredModel:
            def complete_structured(self, **kwargs):
                item = {"row":0,"quantity":"parcel_area","value_text":"538.9","unit":"m2",
                        "subject":"project","basis":"Reported project parcel"}
                return SimpleNamespace(parsed={"facts":[item, {**item,"value_text":"999.1"}]})
        proposals, warning = dossier.scan({"document_id":key,"page":1,"locale":"en"}, StructuredModel())
        accepted_model = [fact for fact in proposals if fact["method"] == "hermes_model"]
        assert not warning and len(accepted_model) == 1 and accepted_model[0]["value"] == 538.9
        app = FastAPI()
        app.include_router(router)
        with TestClient(app) as client:
            response = client.get(f"/documents/{key}/1/quantities")
            assert response.status_code == 200 and response.json()["id"] == saved["id"]
            assert client.get(f"/documents/{key}/1/quantity-rows?locale=invalid").status_code == 422
            assert client.get(f'/quantity-reviews/{saved["id"]}/evidence/{facts["parcel_area"]["id"]}').status_code == 200
            invalid = client.post(f'/quantity-reviews/{saved["id"]}/confirm', json={
                "fact_ids":saved["confirmed"], "numerator_id":facts["parcel_area"]["id"],
                "denominator_id":facts["above_ground_area"]["id"]})
            assert invalid.status_code == 400
        with TemporaryDirectory(prefix="siteform-quantities-isolation-",dir=event/".test-cache") as isolated:
            os.environ["HERMES_HOME"] = isolated
            try:
                dossier.get_review(saved["id"])
            except ValueError:
                pass
            else:
                raise AssertionError("Quantity review crossed profile boundaries")
        os.environ["HERMES_HOME"] = folder
        print("Quantity scan, explicit FAR basis, source validation, immutable revisions, retry and archive passed.")


if __name__ == "__main__":
    main()
