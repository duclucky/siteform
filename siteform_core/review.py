# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Compare saved massing and check user-supplied concept limits in local metres."""
from itertools import combinations
from math import hypot
from typing import Annotated

from pydantic import BaseModel, ConfigDict, Field, FiniteFloat

from .semantics import building_shape, parcel_findings


class Limits(BaseModel):
    model_config = ConfigDict(extra="forbid")
    max_height_m: Annotated[FiniteFloat, Field(gt=0, le=1000)] | None = None
    max_footprint_m2: Annotated[FiniteFloat, Field(gt=0)] | None = None
    max_volume_m3: Annotated[FiniteFloat, Field(gt=0)] | None = None
    min_clearance_m: Annotated[FiniteFloat, Field(ge=0, le=1000)] | None = None
    min_setback_m: Annotated[FiniteFloat, Field(ge=0, le=1000)] | None = None
    max_coverage_pct: Annotated[FiniteFloat, Field(gt=0, le=100)] | None = None
    max_far: Annotated[FiniteFloat, Field(gt=0, le=1000)] | None = None


def ring_key(points):
    ring = tuple(map(tuple, points))
    start = ring.index(min(ring))
    rotated = ring[start:] + ring[:start]
    return min(rotated, rotated[:1] + rotated[:0:-1])


def building_index(scene):
    return {
        building["code"].casefold(): (building, ring_key(draft["outline"]))
        for building, draft in zip(scene["buildings"], scene["draft"]["buildings"], strict=True)
    }


def building_changes(left_scene, right_scene):
    left, right = building_index(left_scene), building_index(right_scene)
    fields = (("height","height_m"), ("footprint","area_m2"), ("volume","volume_m3"), ("roof","roof"), ("program","program"))
    same_scale = left_scene["metres_per_pdf_point"] == right_scene["metres_per_pdf_point"]
    changes = []
    for key in dict.fromkeys([*left, *right]):
        before, before_outline = left.get(key, ({}, None))
        after, after_outline = right.get(key, ({}, None))
        changed = [label for label, field in fields if before.get(field) != after.get(field)]
        left_position = before.get("placement") or {"dx_m":0,"dy_m":0}
        right_position = after.get("placement") or {"dx_m":0,"dy_m":0}
        displaced = bool(before and after and left_position != right_position)
        if displaced:
            changed.append("position")
        if before and after and (before_outline != after_outline or not same_scale or
                                 before.get("courtyards") != after.get("courtyards")):
            changed.append("outline or scale")
        if changed:
            changes.append({
                "code": (after or before)["code"],
                "left_code": before.get("code"), "right_code": after.get("code"),
                "status": "changed" if before and after else ("added" if after else "removed"),
                "changed": changed,
                "left_program": before.get("program"), "right_program": after.get("program"),
                "floor_count_delta": (after["program"]["floors"] - before["program"]["floors"]
                                      if before.get("program") and after.get("program") else None),
                "height_delta_m": round(after.get("height_m", 0) - before.get("height_m", 0), 4),
                "footprint_delta_m2": round(after.get("area_m2", 0) - before.get("area_m2", 0), 4),
                "volume_delta_m3": round(after.get("volume_m3", 0) - before.get("volume_m3", 0), 4),
            })
            if displaced:
                changes[-1]["displacement_m"] = round(hypot(
                    right_position["dx_m"]-left_position["dx_m"],
                    right_position["dy_m"]-left_position["dy_m"]),4)
    return changes


def site_comparison(left, right):
    rows = {}
    for key in ("parcel_area_m2", "union_footprint_m2", "covered_in_parcel_m2",
                "coverage_pct", "gross_floor_area_m2", "far"):
        before = (left.get("site_metrics") or {}).get(key)
        after = (right.get("site_metrics") or {}).get(key)
        known = before is not None and after is not None
        status = ("unchanged" if before == after else "changed") if known else (
            "unknown" if before is None and after is None else
            "became_known" if before is None else "became_unknown")
        rows[key] = {"left":before, "right":after, "status":status,
                     "delta":round(after-before, 6 if key == "far" else 4) if known else None}
    return {"parcel_changed":left["draft"].get("site") != right["draft"].get("site"), "metrics":rows}


def review_model(data, limits):
    findings = []

    def flag(kind, codes, actual, limit):
        findings.append({"kind":kind,"buildings":codes,"actual":round(actual,4),"limit":limit})

    for item in data["buildings"]:
        if limits.max_height_m is not None and item["height_m"] > limits.max_height_m:
            flag("height", [item["code"]], item["height_m"], limits.max_height_m)
        if item["difference_pct"] is not None and item["difference_pct"] >= 1:
            flag("printed_area", [item["code"]], item["difference_pct"], 1)
    for kind, field, limit in (
        ("footprint", "footprint_m2", limits.max_footprint_m2),
        ("volume", "volume_m3", limits.max_volume_m3),
    ):
        actual = data["metrics"][field]
        if limit is not None and actual > limit:
            flag(kind, [], actual, limit)
    if limits.min_clearance_m is not None:
        polygons = [(item["code"], building_shape(item)) for item in data["buildings"]]
        for (left, a), (right, b) in combinations(polygons, 2):
            gap = a.distance(b)
            if gap + 1e-8 < limits.min_clearance_m:
                flag("clearance", [left, right], gap, limits.min_clearance_m)

    unavailable = parcel_findings(data, limits, flag)
    return {
        "revision":data["revision"], "source":data["source"], "metrics":data["metrics"],
        "site_metrics":data.get("site_metrics"),
        "limits":limits.model_dump(exclude_none=True), "finding_count":len(findings), "findings":findings[:40],
        "unavailable":unavailable,
        "scope":"Checks supplied limits and printed-area differences on concept geometry. Clearance is horizontal edge-to-edge; zero means touch or overlap. This is not a regulatory determination.",
    }
