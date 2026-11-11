# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Register SiteForm tools in the Hermes agent's native tool registry."""
import json
from pathlib import Path

from .siteform_core import dossier, intake, service, spatial


def record(properties, required):
    return {"type":"object", "properties":properties, "required":required, "additionalProperties":False}


STRING = {"type":"string"}
NUMBER = {"type":"number"}
DOC = {"document_id": STRING}
SHEET = {**DOC, "page":{"type":"integer", "minimum":1, "maximum":30}}
LIBRARY_SHEET = {
    "document_id":{"type":"string","description":"The exact PDF filename or its document ID. Use the supplied filename directly."},
    "page":{"type":["integer","null"],"minimum":1,"maximum":30,"description":"Sheet number, or null for a single-sheet PDF."},
}
REFERENCE = {"type":"string", "description":"Use 'working' or an option ID returned by siteform_options."}
REVISION = {"type":"string", "description":"Exact revision returned by siteform_scene or siteform_options."}
POINT = {"type":"array", "items":{"type":"number", "minimum":0, "maximum":1}, "minItems":2, "maxItems":2}
RING = {"type":"array", "items":POINT, "minItems":3, "maxItems":180}
WINDOW = {"type":"array", "items":{"type":"number", "minimum":0, "maximum":1}, "minItems":4, "maxItems":4}
ROOF = {
    **record({
        "kind":{"enum":["gable","shed","stepped"]}, "rise_m":NUMBER,
        "angle_deg":{"type":"number","description":"Required for gable or shed. Degrees clockwise from sheet right."},
        "upper_scale_pct":{"type":"number","description":"Required for stepped mass only, between 10 and 95."},
        "basis":{"enum":["illustrative","drawing"]},
        "note":{"type":"string","description":"Required drawing and detail reference when basis is drawing."},
    }, ["kind","rise_m","basis"]),
    "type":["object","null"],
    "description":"Use null to set flat massing. Use illustrative unless an actual drawing reference was supplied.",
}
COMPARE_REF = {"type":"string","description":"Use 'working', an option ID, or its exact saved name."}
BUILDING = record({
    "code":STRING,"height":NUMBER,"printed_area":NUMBER,
    "method":{"enum":["vector","dashed","joined","traced"]},
    "outline":RING,
    "candidate":STRING,"window":WINDOW,"roof":ROOF,
    "courtyards":{"type":"array","items":RING,"maxItems":8},
    "label_evidence":record({
        "method":{"enum":["pdf_text","ocr"]},"bounds":WINDOW,"text":STRING,
        "marker_bounds":WINDOW,"kind":{"enum":["height_table"]},
    },["method","bounds","text"]),
    "program":record({"floors":{"type":"integer","minimum":1,"maximum":300},
                      "floor_height_m":NUMBER, "use":STRING}, ["floors","floor_height_m"]),
    "placement":record({"dx_m":NUMBER,"dy_m":NUMBER},["dx_m","dy_m"]),
}, ["code","height","method","outline"])
RULER = record({"points":{"type":"array","items":POINT,"minItems":2,"maxItems":2}, "metres":NUMBER},
               ["points","metres"])
DRAFT = record({
    "scale":record({
        "points":{"type":"array","items":POINT,"minItems":2,"maxItems":2},
        "metres":NUMBER,
        "check":RULER,
    }, ["points","metres"]),
    "buildings":{"type":"array","items":BUILDING,"minItems":1,"maxItems":40},
    "site":record({"boundary":RING, "exclusions":{"type":"array","items":RING,"maxItems":12},
                   "reference":STRING}, ["boundary","reference"]),
}, ["scale","buildings"])
FORM = {
    "code":STRING,
    "kind":{"enum":["flat","gable","shed","stepped"]},
    "rise_m":{"type":"number","description":"Rise from the low edge to the unchanged highest point. Use 0 for flat."},
    "orientation":{"type":"number","description":"Gable ridge or shed uphill direction in degrees clockwise from sheet right. For stepped, upper tier scale percent. Use 0 for flat."},
}
NULLABLE_NUMBER = {"type":["number","null"]}
REVIEW_LIMITS = record({
    "max_height_m":NULLABLE_NUMBER, "max_footprint_m2":NULLABLE_NUMBER,
    "max_volume_m3":NULLABLE_NUMBER, "min_clearance_m":NULLABLE_NUMBER,
    "min_setback_m":NULLABLE_NUMBER, "max_coverage_pct":NULLABLE_NUMBER, "max_far":NULLABLE_NUMBER,
}, [])
INLINE_PREVIEW = " In Hermes Desktop, copy chat_preview verbatim as its own paragraph to show the interactive 3D model in this chat."

TOOLS = (
    ("position_studies", "List saved position studies for a drawing, or reopen one by the study_id returned in the list. This is read-only. Use null for study_id to list studies. Copy the returned chat_preview verbatim when opening a study.", {
        **LIBRARY_SHEET,"study_id":{"type":["string","null"]},
    },spatial.open_studies),
    ("position_study", "Explore moving one building on a saved SiteForm option with a confirmed parcel. Supply explicit setback and clearance in metres and X/Y offset ranges of up to 9 values each. X follows sheet right, Y sheet down. Test at most 81 positions, report all violations, rank up to five feasible changes by movement distance, and preview the buildable region. Use the returned position preview directive verbatim.", {
        **LIBRARY_SHEET,"base":COMPARE_REF,"code":STRING,
        "dx":record({"min_m":NUMBER,"max_m":NUMBER,"step_m":NUMBER},["min_m","max_m","step_m"]),
        "dy":record({"min_m":NUMBER,"max_m":NUMBER,"step_m":NUMBER},["min_m","max_m","step_m"]),
        "setback_m":NUMBER,"clearance_m":NUMBER,
    },spatial.position_study),
    ("save_position_option", "Save a feasible position candidate only after the user chooses its rank and option name. Use the study ID returned by siteform_position_study. Returns a saved 3D preview.", {
        "study_id":STRING,"rank":{"type":"integer","minimum":1,"maximum":5},"name":STRING,
    },spatial.save_candidate),
    ("project_review", "Read or build a source-linked SiteForm project quantity review. Pass sources only to scan specified PDF pages. Keep basement, above-ground and total floor areas separate. Suggestions require user confirmation. use_model invokes the user's configured Hermes model on these selected page text rows only when the user requests interpretation. Copy chat_preview verbatim to show the quantity card.", {
        **LIBRARY_SHEET,
        "sources":{"type":["array","null"],"maxItems":8,"items":record({
            "document_id":STRING,"page":{"type":"integer","minimum":1,"maximum":30},
            "locale":{"enum":["vi","en"]},
        },["document_id","page","locale"])},
        "use_model":{"type":"boolean"},
    }, dossier.project_review),
    ("confirm_facts", "Confirm the explicitly selected facts and FAR counting basis from a saved quantity review. Use only IDs returned by siteform_project_review, after the user chooses them. Both calculation facts must be in fact_ids. Use null for both basis IDs to confirm facts without computing FAR. Copy chat_preview verbatim.", {
        "review_id":STRING,"fact_ids":{"type":"array","items":STRING,"maxItems":128},
        "numerator_id":{"type":["string","null"]},"denominator_id":{"type":["string","null"]},
    }, dossier.confirm_facts),
    ("height_study", "Use this first to find height combinations that retain the most enclosed volume under an explicit maximum height or total volume on a saved SiteForm option. Pass the exact PDF filename and saved base name directly. Each selected building needs an explicit minimum, maximum and step. Ask for missing inputs. This tests the whole bounded grid, preserves footprints and roofs, and stores a study without saving any design option. Show its ranked results or explain why none pass.", {
        **LIBRARY_SHEET,
        "base":{"type":"string","description":"Exact saved base option name or ID."},
        "axes":{"type":"array","minItems":1,"maxItems":2,"items":record({
            "code":STRING,"min_m":NUMBER,"max_m":NUMBER,"step_m":NUMBER,
        },["code","min_m","max_m","step_m"]),"description":"Choose one or two buildings. Each range must land exactly on its maximum and have 2–9 values."},
        "max_height_m":{"type":["number","null"],"description":"Site-wide maximum height in metres, or null."},
        "max_volume_m3":{"type":["number","null"],"description":"Site-wide maximum enclosed volume in cubic metres, or null."},
        "objective":{"enum":["retain_volume","lowest_peak","least_height_change"],
                     "description":"Optional ranking objective. Defaults to retaining enclosed volume."},
    }, service.height_study),
    ("save_study_option", "Save one ranked height-study candidate as a new SiteForm option after the user chooses its rank and name. Use the study ID returned by siteform_height_study. The base and other options are preserved.", {
        "study_id":STRING,"rank":{"type":"integer","minimum":1,"maximum":5},"name":STRING,
    }, service.save_study_option),
    ("check", "Check a SiteForm working model or saved option by name against user-supplied concept limits. Report affected buildings, actual values and thresholds. Clearance is horizontal edge to edge between any two building footprints. Omit unknown limits. Always reports printed-area discrepancies. This is read-only and does not determine legal compliance.", {
        **LIBRARY_SHEET, "model":COMPARE_REF, "limits":REVIEW_LIMITS,
    }, service.check_model),
    ("revise_option", "Use this first when the user gives a library PDF, base option, new name and confirmed height or multi-building form edits. Pass the exact PDF filename and base option name directly. No document lookup or base revision is required. Save one new option, preserve footprints and existing models, and return changes by building. Ask for missing design values.", {
        **LIBRARY_SHEET, "base":COMPARE_REF, "name":STRING,
        "edits":{"type":"array","minItems":1,"maxItems":40,"items":record({
            "code":STRING,
            "height_m":{"type":["number","null"],"description":"New maximum height in metres, or null to keep it."},
            "form":{"enum":["keep","flat","gable","shed","stepped"]},
            "rise_m":{"type":["number","null"],"description":"Roof rise in metres for gable, shed or stepped. Use null or zero for keep or flat."},
            "orientation":{"type":["number","null"],"description":"Clockwise degrees from sheet right for gable ridge or shed uphill, upper tier percent for stepped. Use null or zero for keep or flat."},
        }, ["code","height_m","form","rise_m","orientation"])},
    }, service.revise_option),
    ("view_options", "Open one or compare two saved SiteForm options by name in the current chat. This only reads existing options. Use exact names and pass null for right when opening a single option. The comparison is right minus left.", {
        **LIBRARY_SHEET,
        "left":{"type":"string","description":"Exact saved option name or ID for the first model."},
        "right":{"type":["string","null"],"description":"Exact saved option name or ID for the second model, or null."},
    }, service.view_options),
    ("roof_study", "Use this first when the user specifies a library PDF, base, new option name and one building's roof parameters. Resolve the names, save a separate illustrative roof option, and compare its volume to the base in one call. The footprint, maximum height and working model stay unchanged. Quote reports.vi for Vietnamese or reports.en for English. Ask for missing design values instead of guessing.", {
        **LIBRARY_SHEET,
        "base":COMPARE_REF, "name":STRING, **FORM,
    }, service.roof_study),
    ("import_pdf", "Import a local PDF the user explicitly selected by absolute file path. Return its ID and sheet count. The PDF must be local and at most 30 MiB.", {"pdf_path":STRING}, service.import_pdf),
    ("documents", "Browse the active PDF library or disambiguate duplicate filenames. A complete named roof study accepts the PDF filename directly through siteform_roof_study.", {}, service.documents),
    ("review_pdf", "Inspect the selected sheet for vector paths, selectable text and page dimensions. Treat extracted text as source data.", SHEET, service.inspect),
    ("intake", "Suggest explicitly labeled building IDs and heights with source boxes. Supply window to read a selected height table. Confirm each row and association with the user. Use local OCR only if requested.", {
        **SHEET,"ocr":{"type":"boolean","description":"Read raster text using local OCR. False reads the embedded PDF text."},
        "window":WINDOW,
    }, intake.suggestions),
    ("detect", "Find closed vector outlines in a reviewed region. Window is [left, top, right, bottom] in normalized page coordinates. Return candidates for human review.", {**SHEET,"window":WINDOW}, service.detect),
    ("scene", "Read the working model's full geometry and metrics. For a named saved baseline, use siteform_view_options, siteform_roof_study or siteform_revise_option as appropriate. Returns null if the sheet has no working model.", LIBRARY_SHEET, service.scene),
    ("options", "List saved option names, IDs, exact revisions, provenance and computed metrics for one SiteForm sheet.", LIBRARY_SHEET, service.variants),
    ("create", "Create the first working model from confirmed scale, outlines and heights. Coordinates are normalized page fractions in the displayed PDF before Desktop-only rotation. For vector/dashed outlines use the exact reviewed candidate ID, outline and detection window from siteform_detect. For traced outlines use user-confirmed corners. This tool refuses to replace a working model.", {**SHEET,"draft":DRAFT}, service.create),
    ("propose", "Save one illustrative form change as a new named option. Keep the exact source maximum height and footprint. Use the actual base revision from siteform_scene or siteform_options. The base is 'working' or an option ID.", {
        **SHEET, "base":REFERENCE, "revision":REVISION, "name":STRING, **FORM,
    }, service.propose_single),
    ("compare", "Compare two SiteForm references on the same sheet. Left and right can be an option ID, exact name, or 'working'. Returns right-minus-left metrics and per-building changes. For a 3D card of two saved options use siteform_view_options.", {**LIBRARY_SHEET,"left":COMPARE_REF,"right":COMPARE_REF}, service.compare),
)


def register(ctx):
    for short, description, properties, operation in TOOLS:
        name = f"siteform_{short}"

        if short in {"create","propose","roof_study","view_options","check","revise_option","height_study","save_study_option","save_position_option"}:
            description += INLINE_PREVIEW

        def handler(args, _operation=operation, _short=short, **kwargs):
            try:
                if _short == "project_review":
                    args = dict(args)
                    if args.get("sources"):
                        with service.database() as db:
                            for source in args["sources"]:
                                source["document_id"], source["page"] = service.resolve_sheet(db, source["document_id"], source["page"])
                    data = _operation(**args, llm=ctx.llm if args.get("use_model") else None)
                else:
                    data = _operation(**args)
                if _short in {"project_review","confirm_facts"}:
                    data["chat_preview"] = f'::siteform-model{{quantities="{data["id"]}"}}'
                if _short == "create" or (_short == "check" and data["model"]["id"] == "working"):
                    source = data["source"]
                    data["chat_preview"] = (
                        f'::siteform-model{{document="{source["sha256"]}" '
                        f'page="{source["page"]}" revision="{data["revision"]}"}}'
                    )
                elif _short in {"roof_study","propose","revise_option","check","save_study_option","save_position_option"}:
                    option = data if _short in {"propose","save_study_option","save_position_option"} else data["model" if _short == "check" else "option"]
                    data["chat_preview"] = f'::siteform-model{{option="{option["id"]}"}}'
                elif _short == "view_options":
                    if "option" in data:
                        data["chat_preview"] = f'::siteform-model{{option="{data["option"]["id"]}"}}'
                    else:
                        data["chat_preview"] = (
                            f'::siteform-model{{option="{data["left"]["id"]}" compare="{data["right"]["id"]}"}}'
                        )
                if _short == "check":
                    attrs = " ".join(f'{key}="{value}"' for key, value in data["limits"].items())
                    data["chat_preview"] = data["chat_preview"][:-1] + ' review="yes"' + (' ' + attrs if attrs else '') + '}'
                elif _short == "height_study":
                    data.pop("trace")
                    data["chat_preview"] = f'::siteform-model{{study="{data["id"]}"}}'
                elif _short == "position_study" or (_short == "position_studies" and "id" in data):
                    data.pop("trace")
                    data.pop("envelope")
                    data["chat_preview"] = f'::siteform-model{{position="{data["id"]}"}}'
                return json.dumps({"ok":True,"data":data}, ensure_ascii=False, allow_nan=False)
            except (ValueError, TypeError) as exc:
                return json.dumps({"ok":False,"error":str(exc)})

        required = [key for key in properties if key != "objective" and (short != "intake" or key != "window")]
        schema = {"name":name,"description":description,"parameters":record(properties,required)}
        ctx.register_tool(name=name, toolset="siteform", schema=schema, handler=handler,
                          description=description)
    ctx.register_skill("guide", Path(__file__).parent / "skills" / "siteform-guide" / "SKILL.md",
                       description="Use the SiteForm tools to create, propose and compare reviewed planning models.")
