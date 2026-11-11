// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import {Group} from 'three';
import {GLTFExporter} from 'three/addons/exporters/GLTFExporter.js';
import {buildingMesh} from './massing.js';
import * as sdk from '@hermes/plugin-sdk';

export async function downloadPrepared(ctx, endpoint, body) {
  if (!sdk.captureGatewayFileDownload) throw new Error('This Hermes version cannot save prepared files.');
  const download = sdk.captureGatewayFileDownload();
  const file = await ctx.rest(endpoint,{method:'POST',body,timeoutMs:60000});
  await download(file.path,file.name);
}

export async function gltf(scene) {
  const group = new Group();
  group.name = 'SiteForm massing';
  group.userData = {source:scene.source, revision:scene.revision, limits:scene.limits, metresPerUnit:1};
  const meshes = scene.buildings.map(buildingMesh);
  group.add(...meshes);
  try {
    const document = await new GLTFExporter().parseAsync(group,{binary:false});
    return JSON.stringify(document);
  } finally {
    for (const mesh of meshes) {
      mesh.geometry.dispose();
      mesh.material.forEach(material => material.dispose());
    }
  }
}

function csvCell(value) {
  const text = String(value ?? '');
  const safe = typeof value === 'string' && /^[\s\uFEFF]*[=+@-]|^[\t\r\n]/.test(text) ? "'"+text : text;
  return '"'+safe.replaceAll('"','""')+'"';
}

export function buildingSchedule(scene) {
  const header = ['Building ID','Height (m)','Footprint (m²)','Volume (m³)','Roof form','Roof basis',
    'Roof reference','Outline method','Printed area (m²)','Area difference (%)','Drawing','Sheet','Revision',
    'Design X offset (m)','Design Y offset (m)'];
  const rows = scene.buildings.map(item => [
    item.code,item.height_m,item.area_m2,item.volume_m3,item.roof?.kind ?? 'flat',item.roof?.basis,
    item.roof?.note,item.method,item.printed_area_m2,item.difference_pct,
    scene.source.name,scene.source.page,scene.revision,
    item.placement?.dx_m ?? 0,item.placement?.dy_m ?? 0,
  ]);
  return '\uFEFF'+[header,...rows].map(row => row.map(csvCell).join(',')).join('\r\n')+'\r\n';
}

export async function exportScene(ctx, scene, format) {
  if (!ctx.files?.requestFolder) throw new Error('File export requires Hermes Desktop folder access.');
  const choice = await ctx.files.requestFolder();
  if (!choice.ok) throw new Error(choice.message);
  if (!choice.folder) return null;
  const text = format === 'gltf' ? await gltf(scene) :
    format === 'csv' ? buildingSchedule(scene) : JSON.stringify(scene,null,2);
  if (new TextEncoder().encode(text).byteLength > 4*1024*1024) {
    throw new Error('The export exceeds the Hermes 4 MiB file limit. Save a smaller model or export JSON evidence.');
  }
  const stamp = new Date().toISOString().replace(/[^0-9]/g,'');
  const name = 'siteform-'+scene.revision.slice(0,8)+'-'+stamp+'.'+format;
  const result = await ctx.files.writeText(choice.folder.id,name,text,{exclusive:true});
  if (!result.ok) throw new Error(result.message);
  return choice.folder.path+' / '+name;
}
