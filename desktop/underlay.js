// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
// PDF fractions use top-left coordinates. The viewer's +Z follows page-down.
export function sheetPlacement(sheet, scene) {
  const [width, height] = sheet.size.map(size => size * scene.metres_per_pdf_point);
  const [originX, originY] = scene.draft.buildings[0].outline[0];
  const source = [-originX * width, -originY * height, width, height];
  const vertices = [...scene.draft.buildings.flatMap(building => building.outline), ...(scene.draft.site?.boundary ?? [])];
  const xs = vertices.map(([x]) => x);
  const ys = vertices.map(([,y]) => y);
  const x0 = Math.min(...xs), x1 = Math.max(...xs);
  const y0 = Math.min(...ys), y1 = Math.max(...ys);
  const pad = Math.max((x1-x0)*width, (y1-y0)*height) * .14;
  const crop = [
    Math.max(0, x0-pad/width), Math.max(0, y0-pad/height),
    Math.min(1, x1+pad/width), Math.min(1, y1+pad/height),
  ];
  return {crop, source, world:[
    source[0] + crop[0]*width, source[1] + crop[1]*height,
    (crop[2]-crop[0])*width, (crop[3]-crop[1])*height,
  ]};
}
