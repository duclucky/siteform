// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';
import {RoofFields} from './roof-fields.jsx';

function roofPayload(roof) {
  if (!roof) return null;
  return {kind:roof.kind,rise_m:Number(roof.rise_m),basis:roof.basis,note:roof.note ?? '',
    ...(roof.kind === 'stepped' ? {upper_scale_pct:Number(roof.upper_scale_pct)} : {angle_deg:Number(roof.angle_deg)})};
}

export function QuickEdit({ctx,model,request,ownsSession,onSaved,onClose}) {
  const [code,setCode] = useState(request.code ?? '');
  const building = model.scene.buildings.find(item => item.code === code);
  const [roof,setRoof] = useState(building?.roof ?? null);
  const [height,setHeight] = useState(building?.height_m ?? '');
  const [name,setName] = useState('');
  const [busy,setBusy] = useState(false);
  const [error,setError] = useState('');
  const mounted = useRef(true);
  useEffect(() => {mounted.current=true;return () => {mounted.current=false;};},[]);
  useEffect(() => {setRoof(building?.roof ?? null);setHeight(building?.height_m ?? '');},[building]);
  const submit = async event => {
    event.preventDefault();
    if (busy || !building) return;
    if (!ownsSession()) {setError('Focus the originating chat before saving.');return;}
    setBusy(true);setError('');
    try {
      const source = model.scene.source;
      const change = request.kind === 'roof' ? {code,roof:roofPayload(roof)} : {code,height_m:Number(height)};
      const saved = await ctx.rest('/documents/'+source.sha256+'/'+source.page+'/revisions',{
        method:'POST',body:{base:model.id,revision:model.scene.revision,name,changes:[change]},timeoutMs:30000,
      });
      if (!ownsSession()) throw new Error('The option was saved in its original profile. Reopen this chat to view it.');
      if (mounted.current) await onSaved(saved,code);
    } catch (exc) {setError(exc.message || 'Could not save this alternative.');}
    finally {setBusy(false);}
  };
  return <section className="sf-card sf-quick-edit" aria-label="Edit model alternative">
    <h3>{request.kind === 'roof' ? 'Try a different roof' : 'Try a different height'}</h3>
    <p>Base: {model.name}. Save a new option; the base and working model stay unchanged.</p>
    <form onSubmit={submit}>
      <label>Building<select required aria-label="Edit building" disabled={busy} value={code} onChange={event => setCode(event.target.value)}>
        <option value="">Choose a building</option>
        {model.scene.buildings.map(item => <option key={item.code} value={item.code}>{item.code}</option>)}
      </select></label>
      {building && (request.kind === 'roof' ? <RoofFields roof={roof} index={code} onChange={setRoof}/> :
        <label>Highest point (m)<input type="number" required min=".001" max="1000" step="any" value={height}
          disabled={busy} onChange={event => setHeight(event.target.value)}/></label>)}
      <label>New option name<input required maxLength={48} value={name} disabled={busy}
        placeholder="Name this alternative" onChange={event => setName(event.target.value)}/></label>
      <div className="sf-inline">
        <button type="submit" disabled={busy || !building || !name.trim()}>{busy ? 'Saving…' : 'Save alternative'}</button>
        <button type="button" disabled={busy} onClick={onClose}>Cancel edit</button>
      </div>
      {error && <p role="alert" className="sf-flag">{error}</p>}
    </form>
  </section>;
}
