# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Prepare explicit, profile-local downloads for Hermes' file save bridge."""
from html import escape
from base64 import b64decode
from io import BytesIO
import os
from pathlib import Path
from tempfile import NamedTemporaryFile
from threading import Lock
from time import time

import pymupdf as pdf
from plugins.plugin_storage import plugin_data_dir

from . import archive, dossier, service

DOWNLOAD_LOCK = Lock()


def stage(content, identity, suffix):
    folder = plugin_data_dir("siteform") / "downloads"
    folder.mkdir(exist_ok=True)
    if folder.is_symlink() or folder.resolve().parent != plugin_data_dir("siteform").resolve():
        raise ValueError("The SiteForm downloads folder must be inside the active profile.")
    with DOWNLOAD_LOCK:
        active = []
        for path in folder.glob("siteform-*"):
            if path.is_symlink() or not path.is_file():
                continue
            if time() - path.stat().st_mtime > 3600:
                path.unlink(missing_ok=True)
            else:
                active.append(path)
        if len(active) >= 12 or sum(path.stat().st_size for path in active) + len(content) > 128*1024*1024:
            raise ValueError("The temporary download limit has been reached. Try again when previous downloads expire.")
        with NamedTemporaryFile(dir=folder, prefix=f"siteform-{identity}-", suffix=suffix, delete=False) as file:
            file.write(content)
    target = Path(file.name).resolve()
    return {"path":str(target),"name":target.name}


def project_download(document_id, page):
    return stage(archive.pack(document_id,page), document_id[:8], f"-sheet-{page}.zip")


def report_bytes(document_id, page, request):
    with service.database() as db:
        db.execute("BEGIN")
        service.require_page(db, document_id, page)
        reference, scene = service.read_reference(db, document_id, page, request.reference)
        if scene["revision"] != request.revision:
            raise service.RevisionConflict("The reviewed model changed. Reopen the current revision.")
    report = service.review_model(scene, request.limits)
    source = scene["source"]

    def row(*cells):
        return "<tr>" + "".join(f"<td>{escape(str(cell))}</td>" for cell in cells) + "</tr>"

    metrics = scene["metrics"]
    table = row("Building","Height (m)","Footprint (m²)","Volume (m³)","Floors","Outline")
    for item in scene["buildings"]:
        table += row(item["code"], f'{item["height_m"]:,.2f}', f'{item["area_m2"]:,.2f}',
                     f'{item["volume_m3"]:,.2f}', (item.get("program") or {}).get("floors","Unknown"), item["method"])
        if item.get("placement"):
            placement = item["placement"]
            table += row(item["code"], f'Design X offset {placement["dx_m"]:g} m',
                         f'Design Y offset {placement["dy_m"]:g} m', "", "", "")
    limits = "".join(f"<li>{escape(key.replace('_',' '))}: {value:g}</li>" for key,value in report["limits"].items())
    findings = "".join("<li>"+escape(f'{item["kind"].replace("_"," ")} · '
                                    f'{", ".join(item["buildings"]) or "site"} · '
                                    f'{item["actual"]:g} (limit {item["limit"]:g})')+"</li>" for item in report["findings"])
    findings += "".join("<li>"+escape(message)+"</li>" for message in report["unavailable"])
    parcel = scene.get("site_metrics", {})
    quantities = "".join("<li>"+escape(f'{key.replace("_"," ")}: {value:,.3f}' if isinstance(value,(int,float))
                                      else f'{key.replace("_"," ")}: Unknown')+"</li>"
                         for key,value in parcel.items() if key != "definition")
    provenance = scene.get("proposal", {})
    parent = provenance.get("base_revision")
    parent_note = f"<p>Parent revision: {escape(str(parent))}</p>" if parent else ""
    changed = provenance.get("changed_buildings")
    changes_note = f"<p>Changed buildings: {escape(', '.join(map(str,changed)))}</p>" if isinstance(changed,list) else ""
    calibration = scene.get("calibration_check")
    scale_note = ""
    if calibration:
        scale_note = (f'<p>Second known segment: {calibration["expected_m"]:g} m. '
                      f'Measured {calibration["calculated_m"]:g} m ({calibration["difference_pct"]:g}% difference).</p>')
    boundary_note = f'<p>Boundary reference: {escape(scene["parcel"]["reference"])}</p>' if scene.get("parcel") else ""
    count = report["finding_count"]
    finding_summary = f'{count} finding' + ('s' if count != 1 else '')
    body = f"""
    <h1>SiteForm decision report</h1><h2>{escape(reference["name"])}</h2>
    <p>Source: {escape(source["name"])} · Sheet {page}</p>
    <p>Source SHA-256: <code>{source["sha256"]}</code><br>Revision: <code>{scene["revision"]}</code></p>
    {parent_note}
    {changes_note}
    <p>{metrics["building_count"]} buildings · {metrics["max_height_m"]:,.2f} m maximum height ·
    {metrics["volume_m3"]:,.2f} m³ enclosed volume</p>
    <h2>Confirmed geometry</h2><table>{table}</table>
    {('<h2>Parcel and floor quantities</h2><ul>'+quantities+'</ul>') if quantities else ''}
    {boundary_note}
    <h2>Concept checks</h2>
    {('<ul>'+limits+'</ul>') if limits else '<p>No user thresholds were supplied.</p>'}
    <p>{finding_summary}. Up to 40 detailed findings are included.</p>
    <ul>{findings}</ul><h2>Basis and limitations</h2>
    <p>{escape(scene["limits"])}</p>{scale_note}<p>{escape(report["scope"])}</p>
    <p>Footprint and volume totals sum individual buildings. Concept floor area uses confirmed full floor plates.
    Roofs marked illustrative in SiteForm are design assumptions.</p>
    """
    output = BytesIO()
    writer = pdf.DocumentWriter(output)
    story = pdf.Story(body, user_css="""
        body {font: 10pt sans-serif; color:#23334a}
        h1 {font-size:25pt; color:#173961; margin:0 0 12pt}
        h2 {font-size:14pt; color:#173961}
        table {width:100%; border-collapse:collapse}
        td {padding:5pt; border-bottom:0.5pt solid #b8c7d4}
        tr:first-child {background-color:#e6eff6; font-weight:bold}
    """)
    page_rect = pdf.paper_rect("a4")
    content_rect = page_rect + (42,42,-42,-42)
    more = True
    try:
        while more:
            device = writer.begin_page(page_rect)
            more, _ = story.place(content_rect)
            story.draw(device)
            writer.end_page()
    finally:
        writer.close()
    return output.getvalue()


def report_download(document_id, page, request):
    return stage(report_bytes(document_id,page,request), request.revision[:8], "-report.pdf")


def quantity_report_bytes(review_id):
    review = dossier.get_review(review_id)
    resources = pdf.Archive()
    fonts = [Path(os.environ.get("SystemRoot", "C:/Windows"))/"Fonts/arial.ttf",
             Path("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf"),
             Path("/System/Library/Fonts/Supplemental/Arial.ttf")]
    font = next((path for path in fonts if path.is_file()), None)
    css = "body{font:10pt sans-serif}p{margin:4pt 0}h1{font-size:22pt}img{width:100%}"
    if font:
        resources.add((font.read_bytes(), "siteform-report.ttf"))
        css += "@font-face{font-family:SiteFormReport;src:url(siteform-report.ttf)}body{font-family:SiteFormReport}"
    lines = ["SiteForm project quantities", "Review "+review_id,
             "Source quantities and model estimates retain their respective counting bases.", ""]
    accepted = set(review["confirmed"])
    crops = []
    for fact in review["facts"]:
        evidence = fact["evidence"]
        source = service.document(evidence["document_id"])
        lines.extend([
            dossier.KINDS[fact["quantity"]][0]+f' / {fact["subject"]}: {fact["value"]:g} {fact["unit"]}',
            ("Confirmed" if fact["id"] in accepted else "Suggested")+" / "+fact["basis"],
            f'{source["name"]} / page {evidence["page"]} / SHA-256 {evidence["document_id"]}',
            "Source: "+evidence["quote"], "",
        ])
        name = "source-"+fact["id"]+".png"
        image = dossier.evidence_image(review_id, fact["id"])["image"]
        resources.add((b64decode(image.split(",",1)[1]), name))
        crops.append(f'<p>{escape(dossier.KINDS[fact["quantity"]][0])} · Page {evidence["page"]}</p><img src="{name}">')
    if review["calculation"]:
        calculation = review["calculation"]
        lines += [f'Confirmed FAR = {calculation["numerator_m2"]:g} / {calculation["denominator_m2"]:g}'
                  f' = {calculation["far"]:.6f}', "Basis: "+calculation["basis"], ""]
    if review["model_estimate"]:
        estimate = review["model_estimate"]
        area = estimate["gross_floor_area_m2"]
        lines += ["Model estimate (footprint multiplied by floor count)",
                  f'Footprint sum: {estimate["footprint_m2"]:,.4f} m2',
                  f'Floor area: {area:,.4f} m2' if area is not None else "Floor area: unknown",
                  "Model revision: "+estimate["revision"], ""]
    lines += ["Review findings"]
    for finding in review["findings"]:
        label = dossier.KINDS[finding.get("quantity","far")][0]
        if finding["kind"] == "source_conflict":
            values = [str(fact["value"]) for fact in review["facts"] if fact["id"] in finding["fact_ids"]]
            lines.append(label+" has competing source values: "+", ".join(values))
        elif finding["kind"] == "model_difference":
            lines.append(f'{label} · reported {finding["reported"]:,.4f} · '
                         f'model estimate {finding["estimated"]:,.4f} · difference {finding["difference"]:+,.4f}.')
        else:
            lines.append(f'Reported FAR {finding["reported"]:.6f} · calculated FAR {finding["calculated"]:.6f}.')
    if not review["findings"]:
        lines.append("No differences identified for the quantities available in this review.")
    lines += ["Individual floor shapes require separate confirmed geometry."]
    output = BytesIO()
    writer = pdf.DocumentWriter(output)
    story = pdf.Story("<h1>SiteForm quantity review</h1>"+"".join(
        "<p>"+escape(line)+"</p>" for line in lines)+"<h2>Source evidence</h2>"+"".join(crops),
        user_css=css, archive=resources)
    rect = pdf.paper_rect("a4")
    try:
        more = True
        while more:
            device = writer.begin_page(rect)
            more, _ = story.place(rect+(40,40,-40,-40))
            story.draw(device)
            writer.end_page()
    finally:
        writer.close()
    return output.getvalue()


def quantity_report_download(review_id):
    return stage(quantity_report_bytes(review_id), review_id[:8], "-quantities.pdf")
