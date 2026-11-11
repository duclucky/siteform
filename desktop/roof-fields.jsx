// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React from 'react';

export const roofNames = {gable:'Gable',shed:'Single slope',stepped:'Stepped'};

export function RoofFields({roof, index, onChange}) {
  const set = (key,value) => onChange({...roof,[key]:value});
  return <div className="sf-roof-fields">
    <label>Roof form {index}<select aria-label={'Roof form '+index} value={roof?.kind ?? 'flat'}
      onChange={event => onChange(event.target.value === 'flat' ? null : {
        rise_m:roof?.rise_m ?? '', angle_deg:roof?.angle_deg ?? 0, upper_scale_pct:roof?.upper_scale_pct ?? '',
        basis:roof?.basis ?? 'illustrative', note:roof?.note ?? '', kind:event.target.value,
      })}>
      <option value="flat">Flat massing</option>
      <option value="gable">Gable · two slopes</option>
      <option value="shed">Single slope</option>
      <option value="stepped">Stepped mass · two tiers</option>
    </select></label>
    {roof && <>
      <div className="sf-fields">
        <label>Roof rise (m) {index}<input type="number" required min=".001" max="999.999" step="any"
          value={roof.rise_m} onChange={event => set('rise_m',event.target.value)}/></label>
        {roof.kind === 'stepped' ?
          <label>Upper tier scale (%) {index}<input type="number" required min="10" max="95" step="any"
            value={roof.upper_scale_pct} onChange={event => set('upper_scale_pct',event.target.value)}/></label> :
          <label>Roof direction (°) {index}<input type="number" required min="0" max="359.999" step="any"
            value={roof.angle_deg} onChange={event => set('angle_deg',event.target.value)}/></label>}
      </div>
      <p className="sf-caption">
        {roof.kind === 'stepped' ?
          'Rise is the height of the upper tier. Its footprint is scaled inward. A convex footprint is required.' :
          <>Height above is the highest point. Rise is the difference to the low edge.
            Direction is the {roof.kind === 'gable' ? 'ridge' : 'uphill direction'} clockwise from sheet right.</>}
      </p>
      <label>Roof basis {index}<select aria-label={'Roof basis '+index} value={roof.basis}
        onChange={event => set('basis',event.target.value)}>
        <option value="illustrative">Illustrative assumption</option><option value="drawing">Entered from a drawing</option>
      </select></label>
      <label>Roof reference {index}<input maxLength={240} required={roof.basis === 'drawing'}
        placeholder="Sheet and detail, or a note" value={roof.note ?? ''}
        onChange={event => set('note',event.target.value)}/></label>
    </>}
  </div>;
}
