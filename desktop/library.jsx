// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';

const labels = {scenes:'working models',variants:'saved options',height_studies:'height studies',
  archived_studies:'archived study flags',quantity_reviews:'quantity review snapshots',
  quantity_heads:'current quantity reviews',position_studies:'position studies'};
const counts = values => Object.entries(values).map(([key,value]) => value+' '+(labels[key] ?? key)).join(', ');

export function RemovalDialog({ctx,kind,id,onCancel,onRemoved}) {
  const [preview,setPreview] = useState(null);
  const [name,setName] = useState('');
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(false);
  const alive = useRef(true);
  const path = '/library/'+kind+'/'+id;
  const load = async () => {
    const result = await ctx.rest(path+'/removal');
    if (alive.current) {setPreview(result);setName('');}
  };
  useEffect(() => {
    alive.current = true;
    load().catch(exc => {if (alive.current) setError(exc.message);});
    return () => {alive.current = false;};
  },[ctx,path]);
  const remove = async event => {
    event.preventDefault();
    if (busy || !preview?.eligible || name !== preview.name) return;
    setBusy(true);setError('');
    try {
      const result = await ctx.rest(path,{method:'DELETE',body:{token:preview.token,confirmed_name:name}});
      if (alive.current) onRemoved(result);
    } catch (exc) {
      if (!alive.current) return;
      setError(exc.message);
      try {await load();} catch (refresh) {if (alive.current) {setPreview(null);setError(refresh.message);}}
    } finally {if (alive.current) setBusy(false);}
  };
  return <section className="sf-card sf-removal" role="dialog" aria-modal="false" aria-label="Confirm removal">
    <h3>Remove {kind === 'documents' ? 'PDF project' : 'saved option'}</h3>
    {!preview && !error && <p role="status">Checking dependencies…</p>}
    {preview && <><p><strong>{preview.name}</strong> · {counts(preview.counts) || 'No saved models'}.</p>
      {kind === 'documents' && <p>The original PDF, its listed project records and this Studio's drafts for the PDF will be removed permanently. Supporting PDFs remain in your library. Download a project ZIP first if you want a backup.</p>}
      {kind === 'options' && <p>The saved snapshot will be removed permanently. The working model stays in your library.</p>}
      {!preview.eligible ? <><p className="sf-flag">Removal is blocked by references:</p>
        <ul>{preview.blockers.map((item,index) => <li key={index}>{item.name} · {item.type.replaceAll('_',' ')}</li>)}</ul>
        <p>Retain referenced evidence, or remove dependent options before removing their baseline.</p></> :
        <form onSubmit={remove}><label>Type the exact name to confirm<input autoFocus value={name} disabled={busy}
          onChange={event => setName(event.target.value)} autoComplete="off"/></label>
          <button type="submit" disabled={busy || name !== preview.name}>{busy ? 'Removing…' : 'Remove permanently'}</button>
        </form>}
    </>}
    {error && <p role="alert" className="sf-flag">{error}</p>}
    <button type="button" disabled={busy} onClick={onCancel}>Cancel removal</button>
  </section>;
}

export function LibraryManager({ctx,refreshKey,onRemoved}) {
  const [usage,setUsage] = useState(null);
  const [error,setError] = useState('');
  const [selected,setSelected] = useState(null);
  const [refresh,setRefresh] = useState(0);
  useEffect(() => {
    let active = true;
    ctx.rest('/library').then(value => {if (active) {setUsage(value);setError('');}})
      .catch(exc => {if (active) setError(exc.message);});
    return () => {active = false;};
  },[ctx,refreshKey,refresh]);
  return <details className="sf-card sf-review" onToggle={event => {
    if (event.currentTarget.open) setRefresh(value => value+1);
  }}><summary>Manage library and storage</summary>
    <button type="button" onClick={() => setRefresh(value => value+1)}>Refresh storage usage</button>
    {usage && <><p>PDF quota in use: {(usage.pdf_bytes.used/1048576).toFixed(2)} / {usage.pdf_bytes.limit/1048576} MiB.
      Saved options: {usage.options.used} / {usage.options.limit}; up to {usage.options.per_sheet_limit} per sheet.</p>
      <p className="sf-caption">Removal frees SiteForm quota. SQLite reuses released space; the database file may keep its size on disk.</p>
      {usage.documents.length === 0 && <p>No PDFs in this profile.</p>}
      {usage.documents.map(item => <div className="sf-library-row" key={item.id}>
        <p><strong>{item.name}</strong> · {(item.size/1048576).toFixed(2)} MiB · {counts(item.counts)}</p>
        <button disabled={Boolean(selected)} onClick={() => setSelected(item.id)}>Remove PDF project: {item.name}</button>
      </div>)}
    </>}
    {error && <p role="alert">{error}</p>}
    {selected && <RemovalDialog key={selected} ctx={ctx} kind="documents" id={selected}
      onCancel={() => setSelected(null)} onRemoved={result => {setSelected(null);setRefresh(value => value+1);onRemoved(result);}}/>}
  </details>;
}
