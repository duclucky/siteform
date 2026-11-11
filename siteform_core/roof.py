# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Evaluate the same roof profiles used by the Desktop mesh, in local metres."""
from itertools import pairwise
from math import cos, radians, sin


def clip(polygon, project, middle, lower):
    points = []
    for a, b in pairwise(polygon + polygon[:1]):
        av, bv = project(a) - middle, project(b) - middle
        inside_a, inside_b = (av <= 0, bv <= 0) if lower else (av >= 0, bv >= 0)
        if inside_a:
            points.append(a)
        if inside_a != inside_b:
            t = av / (av - bv)
            points.append(tuple(x + (y - x) * t for x, y in zip(a, b)))
    return points


def integral(polygon, value):
    """Signed fan integration also handles concave clipped rings and bridge edges."""
    if len(polygon) < 3:
        return 0
    origin = polygon[0]
    x, y = origin
    value0 = value(origin)
    total = 0
    for a, b in pairwise(polygon[1:]):
        cross = (a[0] - x) * (b[1] - y) - (b[0] - x) * (a[1] - y)
        total += cross * (value0 + value(a) + value(b)) / 6
    return abs(total)


def volume(footprint, height, roof, courtyards=()):
    if not roof:
        return integral(footprint, lambda _: height) - sum(integral(ring, lambda _: height) for ring in courtyards)
    if roof["kind"] == "stepped":
        ratio = roof["upper_scale_pct"] / 100
        return integral(footprint, lambda _: height - roof["rise_m"] * (1 - ratio * ratio))
    angle = radians(roof["angle_deg"])
    gable = roof["kind"] == "gable"
    dx, dz = (-sin(angle), cos(angle)) if gable else (cos(angle), sin(angle))

    def project(point):
        return dx * point[0] + dz * point[1]

    projected = [project(point) for point in footprint]
    low, high = min(projected), max(projected)
    span = high - low
    rise = roof["rise_m"]
    if not gable:
        return integral(footprint, lambda point: height - rise * (high - project(point)) / span)
    middle = (low + high) / 2

    def elevation(point):
        return height - rise * abs(project(point) - middle) / (span / 2)

    return sum(integral(clip(footprint, project, middle, lower), elevation) for lower in (True, False))
