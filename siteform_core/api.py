# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Profile-scoped routes consumed through the Hermes Desktop SDK."""
from typing import Annotated

from fastapi import APIRouter, HTTPException, Path, Query, Request
from fastapi.concurrency import run_in_threadpool
from pydantic import ValidationError
from starlette.datastructures import UploadFile

from . import archive, delivery, dossier, intake, service, spatial, source_access, library

router = APIRouter()
StudyId = Annotated[str, Path(pattern=r"^[0-9a-f]{32}$")]


async def run(operation, *args):
    try:
        return await run_in_threadpool(operation, *args)
    except ValidationError as exc:
        raise HTTPException(422, exc.errors(include_context=False, include_input=False)[0]["msg"]) from exc
    except service.RevisionConflict as exc:
        raise HTTPException(409, str(exc)) from exc
    except ValueError as exc:
        raise HTTPException(400, str(exc)) from exc


@router.get("/documents")
async def list_documents():
    return await run(service.documents)


@router.get("/library")
async def library_usage():
    return await run(library.usage)


@router.get("/library/{kind}/{identifier}/removal")
async def removal_preview(kind: str, identifier: str):
    return await run(library.preview, kind, identifier)


@router.delete("/library/{kind}/{identifier}")
async def remove_library_item(kind: str, identifier: str, payload: library.Confirmation):
    return await run(library.remove, kind, identifier, payload)


@router.post("/source/archive")
async def source_archive():
    def prepare():
        return delivery.stage(source_access.pack(), "download-source", ".zip")
    return await run(prepare)


@router.get("/documents/{document_id}/{page}/quantities")
async def latest_quantities(document_id: str, page: int):
    return await run(dossier.latest, document_id, page)


@router.get("/documents/{document_id}/{page}/quantity-rows")
async def quantity_rows(document_id: str, page: int, locale: str = "vi"):
    return await run(dossier.source_rows, {"document_id":document_id, "page":page, "locale":locale})


@router.post("/documents/{document_id}/{page}/quantities")
async def scan_quantities(document_id: str, page: int, payload: dossier.ScanRequest):
    return await run(dossier.project_review, document_id, page, payload.sources)


@router.get("/quantity-reviews/{review_id}")
async def quantity_review(review_id: str):
    return await run(dossier.get_review, review_id)


@router.post("/quantity-reviews/{review_id}/confirm")
async def confirm_quantities(review_id: str, payload: dossier.Confirmation):
    return await run(dossier.confirm_facts, review_id, payload.fact_ids, payload.numerator_id, payload.denominator_id)


@router.post("/quantity-reviews/{review_id}/facts")
async def add_quantity(review_id: str, payload: dossier.FactInput):
    return await run(dossier.add_fact, review_id, payload)


@router.get("/quantity-reviews/{review_id}/evidence/{fact_id}")
async def quantity_evidence(review_id: str, fact_id: str):
    return await run(dossier.evidence_image, review_id, fact_id)


@router.post("/quantity-reviews/{review_id}/report")
async def quantity_report(review_id: str):
    return await run(delivery.quantity_report_download, review_id)


@router.post("/documents")
async def upload(request: Request):
    size = request.headers.get("content-length", "")
    if not size.isdecimal() or int(size) > service.MAX_BYTES + 16384:
        raise HTTPException(413, "Choose a PDF up to 30 MiB.")
    async with request.form(max_files=1, max_fields=0) as form:
        file = form.get("file")
        if not isinstance(file, UploadFile):
            raise HTTPException(400, "Choose one PDF.")
        content = await file.read(service.MAX_BYTES + 1)
        return await run(service.upload, file.filename, content)


@router.get("/documents/{document_id}/{page}")
async def sheet(document_id: str, page: int):
    return await run(service.preview, document_id, page)


@router.post("/documents/{document_id}/{page}/ruler-detail")
async def ruler_detail(document_id: str, page: int, selection: service.RulerDetailRequest):
    return await run(service.ruler_detail, document_id, page, selection.point)


@router.post("/documents/{document_id}/{page}/calibration")
async def calibration(document_id: str, page: int, scale: service.Scale):
    return await run(service.calibration, document_id, page, scale)


@router.post("/documents/{document_id}/{page}/detect")
async def detect(document_id: str, page: int, selection: service.Selection):
    return await run(service.detect, document_id, page, selection.window)


@router.post("/documents/{document_id}/{page}/intake")
async def assisted_intake(document_id: str, page: int, ocr: bool = False, selection: service.Selection | None = None):
    return await run(intake.suggestions, document_id, page, ocr, selection.window if selection else None)


@router.get("/documents/{document_id}/{page}/scene")
async def get_scene(document_id: str, page: int):
    return await run(service.scene, document_id, page)


@router.post("/documents/{document_id}/{page}/review")
async def check_model(document_id: str, page: int, payload: service.ReviewRequest):
    return await run(service.check_model, document_id, payload.reference, payload.limits, page, payload.revision)


@router.put("/documents/{document_id}/{page}/scene")
async def save_scene(
    document_id: str, page: int, draft: service.Draft,
    base: Annotated[str | None, Query(pattern=r"^(new|[0-9a-f]{64})$")] = None,
):
    expected = None if base in (None, "new") else base
    return await run(service.save, document_id, page, draft, False, expected)


@router.get("/documents/{document_id}/{page}/variants")
async def list_variants(document_id: str, page: int):
    return await run(service.variants, document_id, page)


@router.post("/documents/{document_id}/{page}/revisions")
async def revise_model(document_id: str, page: int, payload: service.RevisionRequest):
    return await run(service.save_revision, document_id, page, payload)


@router.post("/documents/{document_id}/{page}/variants")
async def create_variant(document_id: str, page: int, payload: service.OptionRequest):
    return await run(service.save_variant, document_id, page, payload.name, payload.revision)


@router.get("/documents/{document_id}/{page}/variants/{option_id}")
async def get_variant(document_id: str, page: int, option_id: str):
    return await run(service.variant, document_id, page, option_id)


@router.get("/chat-options/{option_id}")
async def get_chat_option(
    option_id: Annotated[str, Path(pattern=r"^[0-9a-f]{32}$")],
    compare_to: Annotated[str | None, Query(pattern=r"^[0-9a-f]{32}$")] = None,
):
    return await run(service.chat_option, option_id, compare_to)


@router.get("/height-studies/{study_id}")
async def get_study(study_id: StudyId):
    return await run(service.get_study, study_id)


@router.get("/documents/{document_id}/{page}/position-studies")
async def position_studies(document_id: str, page: int):
    return await run(spatial.list_studies, document_id, page)


@router.post("/documents/{document_id}/{page}/position-studies")
async def run_position_study(document_id: str, page: int, payload: spatial.Request):
    return await run(spatial.position_study, document_id, payload.base, payload.code,
                     payload.dx, payload.dy, payload.setback_m, payload.clearance_m, page)


@router.get("/position-studies/{study_id}")
async def get_position_study(study_id: StudyId):
    return await run(spatial.get_study, study_id)


@router.get("/position-studies/{study_id}/preview/{rank}")
async def position_preview(study_id: StudyId, rank: Annotated[int, Path(ge=0,le=5)]):
    return await run(spatial.preview, study_id, rank)


@router.post("/position-studies/{study_id}/save")
async def save_position(study_id: StudyId, payload: service.StudySaveRequest):
    return await run(spatial.save_candidate, study_id, payload.rank, payload.name)


@router.get("/height-studies/{study_id}/preview/{rank}")
async def preview_study(study_id: StudyId, rank: Annotated[int, Path(ge=0, le=5)]):
    return await run(service.preview_study, study_id, rank)


@router.post("/height-studies/{study_id}/save")
async def save_study_option(study_id: StudyId, payload: service.StudySaveRequest):
    return await run(service.save_study_option, study_id, payload.rank, payload.name)


@router.get("/documents/{document_id}/{page}/studies")
async def list_studies(document_id: str, page: int):
    return await run(service.studies, document_id, page)


@router.put("/height-studies/{study_id}/archived")
async def archive_study(study_id: StudyId, archived: bool):
    return await run(service.archive_study, study_id, archived)


@router.post("/documents/{document_id}/{page}/archive")
async def project_download(document_id: str, page: int):
    return await run(delivery.project_download, document_id, page)


@router.post("/documents/{document_id}/{page}/report")
async def report_download(document_id: str, page: int, payload: service.ReviewRequest):
    return await run(delivery.report_download, document_id, page, payload)


@router.post("/projects/restore")
async def restore_project(request: Request):
    size = request.headers.get("content-length", "")
    if not size.isdecimal() or int(size) > archive.ARCHIVE_LIMIT + 16384:
        raise HTTPException(413, "The SiteForm project archive is too large.")
    async with request.form(max_files=1,max_fields=0) as form:
        file = form.get("file")
        if not isinstance(file, UploadFile):
            raise HTTPException(400, "Choose one SiteForm project ZIP.")
        return await run(archive.restore, await file.read(archive.ARCHIVE_LIMIT + 1))
