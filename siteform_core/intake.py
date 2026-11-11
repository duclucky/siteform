# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Bounded, local text and OCR suggestions for operator review."""
from collections import defaultdict
from math import sqrt
from pathlib import Path
from typing import Annotated, Literal
from unicodedata import combining, normalize
import re

import pymupdf as pdf
from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, StringConstraints

LABEL = re.compile(
    r"^(?:BUILDING\s+)?(?P<code>[A-Z]{1,8}[-_]?\d{1,8})[\s:;,-]+"
    r"(?:H(?:EIGHT)?|CHIỀU\s+CAO)\s*[:=]?\s*"
    r"(?P<height>\d{1,4}(?:[.,]\d{1,2})?)\s*M(?:\s|$)", re.IGNORECASE,
)
TESSDATA = Path(__file__).resolve().parents[1] / "tessdata"
BOX = tuple[Annotated[FiniteFloat,Field(ge=0,le=1)], Annotated[FiniteFloat,Field(ge=0,le=1)],
            Annotated[FiniteFloat,Field(ge=0,le=1)], Annotated[FiniteFloat,Field(ge=0,le=1)]]
TABLE_HEIGHT = re.compile(
    r"^(?:(?:\d{1,3}[.)]?|(?P<code>[a-z]{1,8}[-_]?\d{1,8}))\s+)?"
    r"(?:chieu cao cong trinh|building height)\s*[:=]?\s*"
    r"(?P<height>\d{1,4}(?:[.,]\d{1,2})?)\s*m$"
)
BUILDING_LEGEND = re.compile(r"^(?P<code>\d{1,3})[.)]\s+(?:khoi nha|toa nha|building)\b")


class LabelEvidence(BaseModel):
    model_config = ConfigDict(extra="forbid")
    method: Literal["pdf_text", "ocr"]
    bounds: BOX
    text: Annotated[str,StringConstraints(min_length=1,max_length=160)]
    marker_bounds: BOX | None = Field(default=None, exclude_if=lambda value: value is None)
    kind: Literal["height_table"] | None = Field(default=None, exclude_if=lambda value: value is None)


def ensure_ocr_data():
    if not all((TESSDATA / f"{language}.traineddata").is_file() for language in ("eng","vie")):
        raise ValueError("Local OCR data is missing. Reinstall the complete SiteForm package or confirm fields manually.")


def normalized_bounds(rect, width, height):
    return [round(min(1,max(0,value)),6) for value in (rect.x0/width,rect.y0/height,rect.x1/width,rect.y1/height)]


def folded(text):
    return "".join(char for char in normalize("NFD",text.casefold()) if not combining(char))


def word_lines(words):
    lines = defaultdict(list)
    for word in words[:12000]:
        lines[tuple(word[5:7])].append(word)
    return lines.values()


def schedule_words(page, bounds):
    """Read a small schedule image with long table rules removed."""
    import numpy as np

    ensure_ocr_data()
    scale = min(6,3000/max(bounds.width,bounds.height),sqrt(4_000_000/(bounds.width*bounds.height)))
    pixmap = page.get_pixmap(matrix=pdf.Matrix(scale,scale),clip=bounds,colorspace=pdf.csRGB,alpha=False)
    pixels = np.frombuffer(pixmap.samples,dtype=np.uint8).copy().reshape(pixmap.height,pixmap.width,3)
    dark = pixels.max(axis=2) < 150
    pixels[dark.mean(axis=1) > .55,:] = 255
    pixels[:,dark.mean(axis=0) > .65] = 255
    cleaned = pdf.Pixmap(pdf.csRGB,pixmap.width,pixmap.height,pixels.tobytes(),False)
    try:
        content = cleaned.pdfocr_tobytes(language="eng+vie",tessdata=str(TESSDATA))
        with pdf.open(stream=content,filetype="pdf") as document:
            image = document[0]
            sx = pixmap.width/scale/image.rect.width
            sy = pixmap.height/scale/image.rect.height
            return [(word[0]*sx+pixmap.x/scale,word[1]*sy+pixmap.y/scale,
                     word[2]*sx+pixmap.x/scale,word[3]*sy+pixmap.y/scale,word[4])
                    for word in image.get_text("words")]
    except RuntimeError as exc:
        raise ValueError("Local OCR could not read the selected table.") from exc


def row_words(words):
    def vertical_center(word):
        return (word[1]+word[3])/2

    current = []
    for word in sorted(words,key=vertical_center):
        if current:
            anchor = current[0]
            tolerance = .45*min(anchor[3]-anchor[1],word[3]-word[1])
            if vertical_center(word)-vertical_center(anchor) > tolerance:
                yield sorted(current,key=lambda item: item[0])
                current = []
        current.append(word)
    if current:
        yield sorted(current,key=lambda item: item[0])


def height_table(page, window, ocr):
    from .service import Selection

    width,height = page.rect.width,page.rect.height
    left,top,right,bottom = Selection(window=window).window
    bounds = pdf.Rect(left*width,top*height,right*width,bottom*height)
    if bounds.width < 12 or bounds.height < 5:
        raise ValueError("Mark a region around the height table or one complete height row.")
    source_words = page.get_text("words")[:12000]
    rotation = page.rotation_matrix
    positioned = [(*tuple(pdf.Rect(word[:4])*rotation),word[4]) for word in source_words]
    words = schedule_words(page,bounds) if ocr else [word for word in positioned if bounds.contains(pdf.Rect(word[:4]))]
    method = "ocr" if ocr else "pdf_text"
    records = []
    for row in row_words(words[:4000]):
        text = normalize("NFKC"," ".join(word[4] for word in row)).replace("|"," ")
        match = TABLE_HEIGHT.fullmatch(" ".join(folded(text).split()))
        if not match:
            continue
        height_m = float(match["height"].replace(",","."))
        if not 0 < height_m <= 1000:
            continue
        rect = pdf.Rect(min(word[0] for word in row),min(word[1] for word in row),
                        max(word[2] for word in row),max(word[3] for word in row))
        records.append({"code":match["code"].upper() if match["code"] else None,"height_m":height_m,
                        "evidence":{"method":method,"bounds":normalized_bounds(rect,width,height),
                                    "text":text.strip()[:160],"kind":"height_table"}})
        if len(records) == 20:
            break

    # A global height can suggest a map association only when the legend identifies
    # one building. Keep both the marker and the separate table row as evidence.
    legend_codes = set()
    for line in word_lines(source_words):
        match = BUILDING_LEGEND.match(folded(normalize("NFKC"," ".join(word[4] for word in line))))
        if match:
            legend_codes.add(match["code"])
    labels = []
    if len(records) == 1 and records[0]["code"] is None and len(legend_codes) == 1:
        code = next(iter(legend_codes))
        for word in positioned:
            if word[4] == code and not bounds.intersects(pdf.Rect(word[:4])):
                marker = normalized_bounds(pdf.Rect(word[:4]),width,height)
                entry = records[0]
                labels.append({**entry,"code":code,"evidence":{**entry["evidence"],"marker_bounds":marker}})
                if len(labels) == 32:
                    break
    return {"method":method,"text_present":bool(words),"headings":[],"labels":labels,"height_rows":records,
            "scope":"Review the selected height row and its association with the plan before using the value."}


def suggestions(document_id, page, ocr=False, window=None):
    from . import service

    with service.sheet(document_id, page) as selected:
        if window is not None:
            return height_table(selected,window,ocr) | {"source":{"sha256":document_id,"page":page}}
        if ocr:
            ensure_ocr_data()
            dpi = min(200, max(1, int(3000 * 72 / max(selected.rect.width, selected.rect.height))))
            try:
                textpage = selected.get_textpage_ocr(language="eng+vie", dpi=dpi, full=True, tessdata=str(TESSDATA))
                words = selected.get_text("words", textpage=textpage)
            except RuntimeError as exc:
                raise ValueError("Local OCR could not read this sheet. Trace outlines and enter dimensions manually.") from exc
        else:
            words = selected.get_text("words")
        width,height = selected.rect.width,selected.rect.height
        rotate = selected.rotation_matrix
        labels = []
        method = "ocr" if ocr else "pdf_text"
        headings = []
        for line in word_lines(words):
            text = normalize("NFKC", " ".join(word[4] for word in line))
            if len(headings) < 4 and re.match(r"^(TỔNG MẶT BẰNG|SITE PLAN|MẶT ĐỨNG|ELEVATION)\b", text, re.I):
                headings.append(text[:120])
            match = LABEL.match(text)
            if not match or len(labels) >= 120:
                continue
            height_m = float(match["height"].replace(",", "."))
            if not 0 < height_m <= 1000:
                continue
            rect = service.pdf.Rect(min(word[0] for word in line), min(word[1] for word in line),
                                    max(word[2] for word in line), max(word[3] for word in line)) * rotate
            bounds = normalized_bounds(rect,width,height)
            if bounds[0] < bounds[2] and bounds[1] < bounds[3]:
                labels.append({"code":match["code"],"height_m":height_m,"evidence":{
                    "method":method,"bounds":bounds,"text":match[0].strip()[:160],
                }})
    return {"source":{"sha256":document_id,"page":page},"method":method,
            "text_present":bool(words),"headings":headings,"labels":labels,
            "scope":"Suggestions only. Review the outline, height meaning and units against the source."}
