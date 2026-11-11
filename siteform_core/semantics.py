# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""User-confirmed parcel and floor quantities in the calibrated sheet plane."""
from typing import Annotated
from itertools import combinations

from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, StringConstraints
from shapely import Polygon, union_all

Fraction = Annotated[FiniteFloat, Field(ge=0, le=1)]
Ring = Annotated[list[tuple[Fraction, Fraction]], Field(min_length=3, max_length=180)]


class Translation(BaseModel):
    model_config = ConfigDict(extra="forbid")
    dx_m: Annotated[FiniteFloat, Field(ge=-10000, le=10000)]
    dy_m: Annotated[FiniteFloat, Field(ge=-10000, le=10000)]


def translate_ring(ring, dx, dy):
    return [[round(x+dx,4),round(y+dy,4)] for x,y in ring]


class Program(BaseModel):
    model_config = ConfigDict(extra="forbid")
    floors: Annotated[int, Field(strict=True, ge=1, le=300)]
    floor_height_m: Annotated[FiniteFloat, Field(gt=0, le=30)]
    use: Annotated[str, StringConstraints(strip_whitespace=True, max_length=80)] = ""

    @property
    def minimum_height(self):
        return self.floors * self.floor_height_m


class Parcel(BaseModel):
    model_config = ConfigDict(extra="forbid")
    boundary: Ring
    exclusions: list[Ring] = Field(default_factory=list, max_length=12)
    reference: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=240)]


def project_outline(points, origin, width, height, factor):
    return [[round((x-origin[0])*width*factor, 4), round((y-origin[1])*height*factor, 4)] for x,y in points]


def polygon(ring, holes=None):
    shape = Polygon(ring, holes)
    if not shape.is_valid or shape.area < .01:
        raise ValueError("Use a simple closed polygon with at least 0.01 m² of area.")
    return shape


def building_shape(item):
    return polygon(item["footprint"], item.get("courtyards"))


def courtyard_area(footprint, courtyards):
    exterior = polygon(footprint)
    holes = [polygon(ring) for ring in courtyards]
    if (any(not exterior.contains(hole) or exterior.boundary.distance(hole) <= 1e-6 for hole in holes) or
            any(left.distance(right) <= 1e-6 for left,right in combinations(holes,2))):
        raise ValueError("Courtyards must stay inside the footprint without touching its walls or each other.")
    return polygon(footprint,courtyards).area


def project_metrics(buildings, parcel):
    occupied = union_all([building_shape(item) for item in buildings])
    floor_area = None
    if all(item.get("program") for item in buildings):
        floor_area = sum(item["area_m2"] * item["program"]["floors"] for item in buildings)
    site_area = covered = coverage = far = None
    if parcel:
        boundary = polygon(parcel["boundary"])
        for ring in parcel["exclusions"]:
            if not boundary.covers(polygon(ring)):
                raise ValueError("Each exclusion must be inside the parcel.")
        site_area = boundary.area
        covered = occupied.intersection(boundary).area
        coverage = covered / site_area * 100
        far = floor_area / site_area if floor_area is not None else None
    return {
        "definition":"concept-parcel-v1",
        "parcel_area_m2":site_area,
        "union_footprint_m2":occupied.area,
        "covered_in_parcel_m2":covered,
        "coverage_pct":coverage,
        "gross_floor_area_m2":floor_area,
        "far":far,
    }


def parcel_findings(data, limits, flag):
    parcel = data.get("parcel")
    metrics = data.get("site_metrics", {})
    unavailable = []
    for field, value, kind, explanation in (
        ("coverage_pct",limits.max_coverage_pct,"coverage","Confirm a parcel before checking coverage."),
        ("far",limits.max_far,"far","Confirm a parcel and floor counts for every building before checking FAR."),
    ):
        actual = metrics.get(field)
        if value is not None:
            if actual is None:
                unavailable.append(explanation)
            elif actual > value:
                flag(kind, [], actual, value)
    if not parcel:
        if limits.min_setback_m is not None:
            unavailable.append("Confirm a parcel before checking setbacks.")
        return unavailable
    boundary = polygon(parcel["boundary"])
    exclusions = union_all([polygon(ring) for ring in parcel["exclusions"]])
    for item in data["buildings"]:
        footprint = building_shape(item)
        outside = footprint.difference(boundary).area
        if outside > 1e-8:
            flag("outside_parcel", [item["code"]], outside, 0)
        if not exclusions.is_empty and (overlap := footprint.intersection(exclusions).area) > 1e-8:
            flag("exclusion", [item["code"]], overlap, 0)
        if limits.min_setback_m is not None and outside <= 1e-8:
            gap = footprint.distance(boundary.boundary)
            if gap + 1e-8 < limits.min_setback_m:
                flag("setback", [item["code"]], gap, limits.min_setback_m)
    return unavailable
