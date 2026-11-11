# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Enumerate bounded height changes against an immutable SiteForm option."""
from collections import Counter
from decimal import Decimal
from itertools import product
from typing import Annotated, Literal

from pydantic import BaseModel, ConfigDict, Field, FiniteFloat, StringConstraints, model_validator

from .roof import volume

Height = Annotated[Decimal, Field(gt=0, le=1000, decimal_places=2)]
MAX_VALUES = 9
MAX_CANDIDATES = 5
ALGORITHM = "height-grid-v1"


class Axis(BaseModel):
    model_config = ConfigDict(extra="forbid")
    code: Annotated[str, StringConstraints(strip_whitespace=True, min_length=1, max_length=48)]
    min_m: Height
    max_m: Height
    step_m: Height

    @model_validator(mode="after")
    def check_grid(self):
        count, remainder = divmod(self.max_m - self.min_m, self.step_m)
        if not 1 <= count < MAX_VALUES or remainder:
            raise ValueError("Each range must contain 2–9 heights and its step must reach the maximum exactly.")
        return self

    def heights(self):
        count = int((self.max_m - self.min_m) / self.step_m)
        return [float(self.min_m + self.step_m * index) for index in range(count + 1)]


class StudyInput(BaseModel):
    model_config = ConfigDict(extra="forbid")
    axes: list[Axis] = Field(min_length=1, max_length=2)
    max_height_m: Annotated[FiniteFloat, Field(gt=0, le=1000)] | None
    max_volume_m3: Annotated[FiniteFloat, Field(gt=0)] | None
    objective: Literal["retain_volume","lowest_peak","least_height_change"] = "retain_volume"

    @model_validator(mode="after")
    def check_inputs(self):
        if self.max_height_m is None and self.max_volume_m3 is None:
            raise ValueError("Supply a height cap, a volume cap, or both.")
        if len({axis.code.casefold() for axis in self.axes}) != len(self.axes):
            raise ValueError("Use a different building ID for each height range.")
        return self


def normalize_axes(data, axes):
    index = {item["code"].casefold(): item["code"] for item in data["buildings"]}
    ranges = {}
    for axis in axes:
        code = index.get(axis.code.casefold())
        if code is None:
            raise ValueError(f"Building {axis.code} is not in the saved option.")
        ranges[code] = axis.heights()
    return dict(sorted(ranges.items()))


def evaluate(data, ranges, request):
    buildings = {item["code"]: item for item in data["buildings"]}
    samples = {}
    for code, heights in ranges.items():
        item = buildings[code]
        roof = item.get("roof")
        rise = roof["rise_m"] if roof else 0
        samples[code] = {height: round(volume(item["footprint"], height, roof, item.get("courtyards", ())), 4)
                         for height in heights if height > rise}

    trace = []
    for values in product(*ranges.values()):
        heights = dict(zip(ranges, values, strict=True))
        peak = max(heights.get(code, item["height_m"]) for code, item in buildings.items())
        enclosed = None
        if any(height not in samples[code] for code, height in heights.items()):
            outcome = "roof_rise"
        elif any(height + 1e-8 < buildings[code]["program"]["floors"] * buildings[code]["program"]["floor_height_m"]
                 + (buildings[code].get("roof") or {}).get("rise_m", 0)
                 for code, height in heights.items() if buildings[code].get("program")):
            outcome = "floor_fit"
        else:
            enclosed = round(sum(samples[code][heights[code]] if code in heights else item["volume_m3"]
                                 for code, item in buildings.items()), 4)
            if request.max_height_m is not None and peak > request.max_height_m:
                outcome = "height_cap"
            elif request.max_volume_m3 is not None and enclosed > request.max_volume_m3:
                outcome = "volume_cap"
            elif all(buildings[code]["height_m"] == height for code, height in heights.items()):
                outcome = "unchanged"
            else:
                outcome = "feasible"
        trace.append({"heights_m":heights, "peak_m":peak, "volume_m3":enclosed, "outcome":outcome})

    def rank_key(row):
        default = (-row["volume_m3"], row["peak_m"], tuple(row["heights_m"].values()))
        if request.objective == "lowest_peak":
            return (row["peak_m"], *default)
        if request.objective == "least_height_change":
            change = sum(abs(Decimal(str(height)) - Decimal(str(buildings[code]["height_m"])))
                         for code, height in row["heights_m"].items())
            return (change, *default)
        return default

    passed = sorted((row for row in trace if row["outcome"] == "feasible"), key=rank_key)
    candidates = [
        {**row, "rank":rank, "volume_delta_m3":round(row["volume_m3"] - data["metrics"]["volume_m3"], 4)}
        for rank, row in enumerate(passed[:MAX_CANDIDATES], 1)
    ]
    counts = Counter(row["outcome"] for row in trace)
    locked = [code for code, item in buildings.items()
              if code not in ranges and request.max_height_m is not None and item["height_m"] > request.max_height_m]
    return {
        "tested":len(trace), "feasible":counts.pop("feasible", 0),
        "rejections":dict(counts), "fixed_height_blockers":locked,
        "candidates":candidates, "trace":trace,
    }
