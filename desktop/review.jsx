// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';
import {downloadPrepared} from './export.js';

const number = new Intl.NumberFormat(undefined,{maximumFractionDigits:4});
const delta = new Intl.NumberFormat(undefined,{maximumFractionDigits:2,signDisplay:'exceptZero'});
const fields = [
  ['max_height_m','Maximum height (m)',1000],
  ['max_footprint_m2','Maximum footprint sum (m²)'],
  ['max_volume_m3','Maximum volume sum (m³)'],
  ['min_clearance_m','Minimum clearance (m)',1000],
  ['min_setback_m','Minimum parcel setback (m)',1000],
  ['max_coverage_pct','Maximum parcel coverage (%)',100],
  ['max_far','Maximum floor area ratio',1000],
];
const findingLabels = {
  height:['Height','m'], footprint:['Footprint sum','m²'], volume:['Volume sum','m³'],
  clearance:['Clearance','m'], printed_area:['Printed area difference','%'],
  coverage:['Parcel coverage','%'], far:['Floor area ratio',''], setback:['Parcel setback','m'],
  outside_parcel:['Footprint outside parcel','m²'], exclusion:['Footprint in exclusion','m²'],
};

export function BuildingChanges({changes, onInspect}) {
  const moved = changes.some(item => item.displacement_m !== undefined);
  const program = changes.some(item => item.changed.includes('program'));
  const describe = value => value ? `${value.floors} floors × ${number.format(value.floor_height_m)} m · ${value.use || 'Use unspecified'}` : 'Unknown';
  return <details className="sf-review">
    <summary>Building changes ({changes.length})</summary>
    {changes.length === 0 ? <p>No changes to building geometry, form or program.</p> :
      <div className="sf-table"><table aria-label="Building changes">
        <thead><tr><th scope="col">Building</th><th scope="col">Changed</th><th scope="col">Δ Height (m)</th>
          <th scope="col">Δ Footprint (m²)</th><th scope="col">Δ Volume (m³)</th>{program && <th scope="col">Floor program · before → after</th>}{moved && <th scope="col">Movement (m)</th>}</tr></thead>
        <tbody>{changes.map(row => <tr key={row.code}>
          <th scope="row"><button type="button" onClick={() => onInspect(row)}>{row.code}</button></th>
          <td>{row.status === 'changed' ? row.changed.join(', ') : row.status}</td>
          <td>{row.status === 'changed' ? delta.format(row.height_delta_m) : '—'}</td>
          <td>{delta.format(row.footprint_delta_m2)}</td><td>{delta.format(row.volume_delta_m3)}</td>
          {program && <td>{row.changed.includes('program') ? describe(row.left_program)+' → '+describe(row.right_program) : 'Unchanged'}</td>}
          {moved && <td>{number.format(row.displacement_m ?? 0)}</td>}
        </tr>)}</tbody>
      </table></div>}
  </details>;
}

export function SiteChanges({comparison}) {
  if (!comparison?.site_comparison) return null;
  const labels = {parcel_area_m2:'Parcel area (m²)',union_footprint_m2:'Union footprint (m²)',
    covered_in_parcel_m2:'Footprint in parcel (m²)',coverage_pct:'Parcel coverage (%)',
    gross_floor_area_m2:'Estimated gross floor area (m²)',far:'Floor area ratio'};
  const precise = new Intl.NumberFormat(undefined,{maximumFractionDigits:6});
  const signed = new Intl.NumberFormat(undefined,{maximumFractionDigits:6,signDisplay:'exceptZero'});
  const format = value => value == null ? 'Unknown' : precise.format(value);
  return <details className="sf-review"><summary>Parcel and floor comparison</summary>
    <p>{comparison.site_comparison.parcel_changed ? 'Parcel definition changed.' : 'Parcel definition unchanged.'}</p>
    <div className="sf-table"><table aria-label="Parcel and floor comparison"><thead><tr>
      <th>Metric</th><th>{comparison.left.name}</th><th>{comparison.right.name}</th><th>Change</th>
    </tr></thead><tbody>{Object.entries(comparison.site_comparison.metrics).map(([key,row]) => <tr key={key}>
      <th scope="row">{labels[key]}</th><td>{format(row.left)}</td><td>{format(row.right)}</td>
      <td>{row.delta == null ? row.status.replaceAll('_',' ') : signed.format(row.delta)}</td>
    </tr>)}</tbody></table></div>
    <p className="sf-caption">Floor area is footprint × confirmed floor count. Unknown values have no numeric difference.</p>
  </details>;
}

export function ModelReview({ctx, model, initialReport=null, initialError='', onInspect, openRequest=0}) {
  const [inputs,setInputs] = useState(() => initialReport?.limits ?? {});
  const [report,setReport] = useState(initialReport);
  const [error,setError] = useState(initialError);
  const [open,setOpen] = useState(Boolean(initialReport || initialError));
  const [busy,setBusy] = useState(false);
  const panel = useRef(null);
  useEffect(() => {
    if (!openRequest) return;
    setOpen(true);
    panel.current?.scrollIntoView({block:'center',behavior:'smooth'});
  },[openRequest]);
  const {scene, id} = model;
  const endpoint = '/documents/'+scene.source.sha256+'/'+scene.source.page;

  const download = async () => {
    setBusy(true);
    setError('');
    try {
      await downloadPrepared(ctx,endpoint+'/report',{reference:id,revision:scene.revision,limits:report?.limits ?? {}});
    } catch (exc) {
      setError(exc.message || 'Could not prepare this report.');
    } finally {
      setBusy(false);
    }
  };

  const run = async event => {
    event.preventDefault();
    if (busy) return;
    setBusy(true);
    setError('');
    setReport(null);
    const limits = Object.fromEntries(Object.entries(inputs).filter(([,value]) => value !== '')
      .map(([key,value]) => [key,Number(value)]));
    try {
      setReport(await ctx.rest(endpoint+'/review',{
        method:'POST',body:{reference:id,revision:scene.revision,limits},timeoutMs:30000,
      }));
    } catch (exc) {
      setError(exc.message || 'Could not check this model.');
    } finally {
      setBusy(false);
    }
  };

  return <details ref={panel} className="sf-review" open={open} onToggle={event => setOpen(event.currentTarget.open)}>
    <summary>Check design limits</summary>
    <p className="sf-caption">Leave unused limits blank. SiteForm always checks printed footprint areas.</p>
    <form onSubmit={run} aria-label="Concept limits">
      <div className="sf-review-fields">{fields.map(([key,label,max]) =>
        <label key={key}>{label}<input type="number" step="any" min={key.startsWith('min_') ? 0 : 0.000001} max={max} disabled={busy}
          value={inputs[key] ?? ''} onChange={event => {
            const value = event.target.value;
            setInputs(current => ({...current,[key]:value}));
            setReport(null);
          }}/></label>
      )}</div>
      <button type="submit" disabled={busy}>{busy ? 'Checking…' : 'Run checks'}</button>
      <button type="button" disabled={busy} onClick={download}>
        {report ? 'Download report with these checks' : 'Download decision report'}
      </button>
    </form>
    {error && <p role="alert" className="sf-flag">{error}</p>}
    {report && <>
      <p role="status">{report.finding_count ? report.finding_count+' findings for '+model.name : 'No findings in evaluated checks for '+model.name}</p>
      {report.unavailable?.map(message => <p key={message} className="sf-flag">{message}</p>)}
      {report.finding_count > 0 && <ul className="sf-findings" aria-label="Review findings">
        {report.findings.map(({kind,buildings,actual,limit}) => {
          const [label,unit] = findingLabels[kind];
          return <li key={kind+JSON.stringify(buildings)}>
            {label} <strong>{number.format(actual)} {unit}</strong> · limit {number.format(limit)} {unit}
            {buildings.map(code => <button type="button" key={code} onClick={() => onInspect(code)}
              aria-label={'Inspect '+code}>{code}</button>)}
          </li>;
        })}
      </ul>}
      {report.finding_count > report.findings.length && <p>Showing the first {report.findings.length} findings.</p>}
      <p className="sf-caption">{report.scope}</p>
    </>}
  </details>;
}
