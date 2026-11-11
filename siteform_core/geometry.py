# SPDX-License-Identifier: AGPL-3.0-only
# Copyright (c) 2026 SiteForm contributors
"""Extract closed vector outlines and reconnect orthogonal dashed CAD marks."""
from collections import defaultdict
from hashlib import sha256
from itertools import pairwise
from math import atan2, dist, floor
from statistics import mean

import pymupdf as pdf


def rgb(path, key):
    return tuple(round(x, 2) for x in (path[key] or ()))


def signed_area(points):
    return sum(x * v - u * y for (x, y), (u, v) in pairwise(points + points[:1])) / 2


def turn(a, b, c):
    return (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0])


def overlaps(a, b, c, d):
    return all(max(min(a[i], b[i]), min(c[i], d[i])) <= min(max(a[i], b[i]), max(c[i], d[i])) for i in (0, 1))


def simple_ring(points):
    if len(points) < 3 or len({tuple(point) for point in points}) != len(points) or abs(signed_area(points)) < 1e-10:
        return False
    edges = list(pairwise(points + points[:1]))
    for i, (a, b) in enumerate(edges):
        for j in range(i + 2, len(edges)):
            if i == 0 and j == len(edges) - 1:
                continue
            c, d = edges[j]
            if overlaps(a, b, c, d) and turn(a, b, c) * turn(a, b, d) <= 0 and turn(c, d, a) * turn(c, d, b) <= 0:
                return False
    return True


def is_convex(points):
    orientation = 1 if signed_area(points) > 0 else -1
    return all(orientation * turn(points[i - 1], point, points[(i + 1) % len(points)]) >= -1e-9
               for i, point in enumerate(points))


def merged_segments(boxes, horizontal):
    rows = []
    for x0, y0, x1, y1 in boxes:
        if (x1 - x0 > y1 - y0) == horizontal:
            rows.append(((y0 + y1) / 2, x0, x1) if horizontal else ((x0 + x1) / 2, y0, y1))
    bands = []
    for row in sorted(rows):
        if not bands or row[0] - bands[-1][-1][0] > 1:
            bands.append([])
        bands[-1].append(row)
    segments = []
    for band in bands:
        runs = []
        for offset, start, end in sorted(band, key=lambda row: row[1]):
            if not runs or start > runs[-1][1] + 5:
                runs.append([start, end, []])
            runs[-1][1] = max(end, runs[-1][1])
            runs[-1][2].append(offset)
        segments.extend((mean(offsets), start, end) for start, end, offsets in runs if end - start >= 9)
    return segments


def dashed_ring(boxes):
    if not 4 <= len(boxes) <= 5000:
        return []
    horizontal, vertical = (merged_segments(boxes, axis) for axis in (True, False))
    if len(horizontal) + len(vertical) > 180:
        return []
    graph = defaultdict(set)
    for segments, other, is_horizontal in ((horizontal, vertical, True), (vertical, horizontal, False)):
        for offset, start, end in segments:
            crossings = sorted(x for x, low, high in other if low - 7 <= offset <= high + 7)
            if not crossings:
                return []
            left = min(crossings, key=lambda x: abs(x - start))
            right = min(crossings, key=lambda x: abs(x - end))
            if abs(left - start) > 7 or abs(right - end) > 7 or left == right:
                return []
            points = [(x, offset) if is_horizontal else (offset, x) for x in crossings if left <= x <= right]
            for a, b in pairwise(points):
                graph[a].add(b)
                graph[b].add(a)
    if not 4 <= len(graph) <= 180 or any(len(adjacent) < 2 for adjacent in graph.values()):
        return []
    first = min(graph)
    second = min(graph[first], key=lambda p: atan2(p[1] - first[1], p[0] - first[0]))
    ring = []
    previous, current = first, second
    while previous not in ring:
        ring.append(previous)
        order = sorted(graph[current], key=lambda p: atan2(p[1] - current[1], p[0] - current[0]))
        previous, current = current, order[(order.index(previous) + 1) % len(order)]
        if (previous, current) == (first, second):
            return ring if len(ring) == len(graph) else []
    return []


def distance_to_segment(point, start, end):
    dx, dy = end[0] - start[0], end[1] - start[1]
    square = dx * dx + dy * dy
    if not square:
        return dist(point, start)
    t = ((point[0] - start[0]) * dx + (point[1] - start[1]) * dy) / square
    t = max(0, min(1, t))
    return dist(point, (start[0] + t * dx, start[1] + t * dy))


def flatten_curve(a, b, c, d, depth=0):
    # The curve lies within the control hull. Bound the error before using a chord.
    if max(distance_to_segment(b, a, d), distance_to_segment(c, a, d)) <= 0.25:
        return [d]
    if depth >= 8:
        return None

    def midpoint(p, q):
        return ((p[0] + q[0]) / 2, (p[1] + q[1]) / 2)

    ab, bc, cd = midpoint(a, b), midpoint(b, c), midpoint(c, d)
    left, right = midpoint(ab, bc), midpoint(bc, cd)
    middle = midpoint(left, right)
    first = flatten_curve(a, ab, left, middle, depth + 1)
    second = flatten_curve(middle, right, cd, d, depth + 1)
    return first + second if first is not None and second is not None else None


def stroke_points(items, rotation):
    if not 1 <= len(items) <= 180 or any(item[0] not in ("l", "c") for item in items):
        return []
    points = [tuple(items[0][1] * rotation)]
    for kind, *segment in items:
        coordinates = [tuple(point * rotation) for point in segment]
        if dist(points[-1], coordinates[0]) > 0.03:
            return []
        tail = [coordinates[-1]] if kind == "l" else flatten_curve(*coordinates)
        if tail is None or len(points) + len(tail) > 181:
            return []
        points.extend(tail)
    return points


def closed_ring(path, rotation):
    items = path["items"]
    if len(items) == 1 and items[0][0] == "re":
        rect = items[0][1]
        return [tuple(point * rotation) for point in (rect.tl, rect.tr, rect.br, rect.bl)]
    points = stroke_points(items, rotation)
    if not points:
        return []
    if dist(points[0], points[-1]) <= 0.03:
        points.pop()
        return points if len(points) >= 3 else []
    return points if 3 <= len(points) <= 180 and (path["closePath"] or path["type"] in ("f", "fs")) else []


def joined_rings(fragments, tolerance=0.25):
    """Join cycles of compatible strokes with an unambiguous partner at each end."""
    if not 2 <= len(fragments) <= 512:
        return
    ends = [point for fragment in fragments for point in (fragment[0], fragment[-1])]
    bins = defaultdict(list)
    for i, (x, y) in enumerate(ends):
        bins[floor(x/tolerance), floor(y/tolerance)].append(i)
    links = {}
    for i, (x, y) in enumerate(ends):
        col, row = floor(x/tolerance), floor(y/tolerance)
        nearby = [j for dx in (-1,0,1) for dy in (-1,0,1)
                  for j in bins.get((col+dx,row+dy), ())
                  if i//2 != j//2 and dist(ends[i],ends[j]) <= tolerance]
        if len(nearby) == 1:
            links[i] = nearby[0]

    visited = set()
    for first in range(0, len(ends), 2):
        current = first
        chain = []
        while current//2 not in visited:
            visited.add(current//2)
            exit_end = current ^ 1
            following = links.get(exit_end)
            if following is None or links.get(following) != exit_end:
                break
            fragment = fragments[current//2]
            interior = fragment[1:-1] if current % 2 == 0 else fragment[-2:0:-1]
            seam = tuple((a+b)/2 for a,b in zip(ends[exit_end],ends[following],strict=True))
            chain.extend([*interior,seam])
            if len(chain) > 180:
                break
            if following == first:
                if len(chain) >= 3:
                    yield chain
                break
            current = following


def candidates(paths, rotation, bounds, width, height):
    dashes = defaultdict(set)
    outlines = []
    strokes = defaultdict(dict)
    stroke_count = 0
    for rect, path in paths:
        if not bounds.contains(rect):
            continue
        if path["type"] == "f" and min(rect.width, rect.height) <= 2.5 and max(rect.width, rect.height) >= 3:
            dashes[rgb(path, "fill")].add(tuple(round(v, 2) for v in rect))
        ring = closed_ring(path, rotation) if min(rect.width, rect.height) >= 4 else []
        if ring:
            outlines.append((ring, "vector", rgb(path, "color") or rgb(path, "fill")))
        elif (path["type"] == "s" and not path["closePath"] and path["color"] and
              not (path.get("dashes") or "").split("]",1)[0].strip(" [") and
              max(rect.width,rect.height) >= 1 and stroke_count <= 2048):
            fragment = stroke_points(path["items"],rotation)
            if fragment and dist(fragment[0],fragment[-1]) > 0.25:
                points = tuple(fragment)
                key = min(points,points[::-1])
                style = rgb(path,"color"), round(path["width"] or 0,2)
                if key not in strokes[style]:
                    strokes[style][key] = points
                    stroke_count += 1
    for color, boxes in dashes.items():
        ring = dashed_ring(boxes)
        if ring:
            outlines.append((ring, "dashed", color))
    # Keep every legacy candidate addressable by saved models and archives.
    result = encode_candidates(outlines,width,height,12)
    if stroke_count <= 2048:
        joined = [(ring,"joined",color) for (color,_),fragments in strokes.items()
                  for ring in joined_rings(list(fragments.values()))]
        result.extend(encode_candidates(joined,width,height,4,{item["id"] for item in result}))
    return sorted(result,key=lambda item: -item["area_pt2"])


def encode_candidates(outlines, width, height, limit, seen=None):
    outlines.sort(key=lambda item: -abs(signed_area(item[0])))
    result = []
    seen = set() if seen is None else seen
    for ring, method, color in outlines:
        if abs(signed_area(ring)) < 32 or not simple_ring(ring):
            continue
        normalized = [[round(x / width, 7), round(y / height, 7)] for x, y in ring]
        if any(not 0 <= value <= 1 for point in normalized for value in point):
            continue
        key = sha256(repr(sorted(normalized)).encode()).hexdigest()[:24]
        if key in seen:
            continue
        seen.add(key)
        result.append({"id": key, "method": method, "color": color, "outline": normalized,
                       "area_pt2": round(abs(signed_area(ring)), 2)})
        if len(result) == limit:
            break
    return result
