// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';
import {downloadPrepared, exportScene} from './export.js';
import {Massing} from './scene.jsx';
import {ModelReview} from './review.jsx';
import {StudyView} from './study.jsx';
import {PositionExplorer} from './positions.jsx';
import {RemovalDialog} from './library.jsx';
import {SiteChanges} from './review.jsx';

const number = new Intl.NumberFormat(undefined,{maximumFractionDigits:2});

export function Options({ctx, endpoint, working, sheet, onCopy, handoff=null}) {
  const url = endpoint+'/variants';
  const [items,setItems] = useState([]);
  const [view,setView] = useState(null);
  const [name,setName] = useState('');
  const [busy,setBusy] = useState(false);
  const [loading,setLoading] = useState(true);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const [focus,setFocus] = useState(null);
  const [studies,setStudies] = useState(null);
  const [study,setStudy] = useState(null);
  const [opening,setOpening] = useState(Boolean(handoff));
  const [handoffError,setHandoffError] = useState('');
  const [removing,setRemoving] = useState(null);
  const panel = useRef(null);
  const preview = useRef(null);
  useEffect(() => {
    if (!handoff) {setOpening(false);setHandoffError('');return;}
    let active = true;
    setOpening(true);setHandoffError('');
    const request = handoff.option === 'working' ? Promise.resolve({id:'working',name:'Working model',scene:working}) :
      ctx.rest(url+'/'+handoff.option);
    request.then(item => {
      if (!active) return;
      if (item.scene.revision !== handoff.revision) throw new Error('This model changed since the chat. Reopen its latest version from chat.');
      if (handoff.building && !item.scene.buildings.some(building => building.code === handoff.building)) {
        throw new Error('The selected building does not belong to this option.');
      }
      setView(item.id === 'working' ? null : item);
      setFocus(handoff.building ? {code:handoff.building} : null);
      setMessage('Opened the exact model from chat: '+item.name+'.');
    }).catch(exc => {if (active) setHandoffError(exc.message);})
      .finally(() => {if (active) setOpening(false);});
    return () => {active = false;};
  },[ctx,url,handoff,working.revision]);
  useEffect(() => {
    if (!handoff || opening || handoffError) return;
    const frame = requestAnimationFrame(() => preview.current?.scrollIntoView({block:'start'}));
    return () => cancelAnimationFrame(frame);
  },[handoff,opening,handoffError,view?.id]);
  useEffect(() => {
    let active = true;
    ctx.rest(url).then(list => {if (active) setItems(list);})
      .catch(exc => {if (active) setError(exc.message);})
      .finally(() => {if (active) setLoading(false);});
    return () => {active = false;};
  },[ctx,url]);

  const act = async work => {
    setBusy(true);
    setError('');
    setMessage('');
    try {await work();}
    catch (exc) {setError(exc.message);}
    finally {setBusy(false);}
  };
  const save = event => {
    event.preventDefault();
    if (busy || !name.trim()) return;
    act(async () => {
      const item = await ctx.rest(url,{method:'POST',body:{name,revision:working.revision}});
      setItems(current => [item,...current.filter(existing => existing.id !== item.id)]);
      setName('');
      setMessage('Saved option '+item.name+'.');
    });
  };
  const open = id => {
    setHandoffError('');
    setFocus(null);
    if (!id) {setView(null);return;}
    act(async () => setView(await ctx.rest(url+'/'+id)));
  };
  const scene = view?.scene ?? working;
  const entries = [{id:'working',name:'Working model',metrics:working.metrics},...items];
  const displayId = view?.id ?? 'working';

  if (opening || handoffError) return <section className="sf-card" ref={panel}>
    {opening ? <p role="status">Opening the model from chat…</p> : <>
      <p role="alert">{handoffError}</p>
      <button onClick={() => {setHandoffError('');setView(null);setFocus(null);}}>Browse this sheet instead</button>
    </>}
  </section>;

  return <>
    <section className="sf-card sf-variants" ref={panel}>
      <div className="sf-bar">
        <div><p className="sf-kicker">03 / Design options</p><h2>Compare and export</h2></div>
        <div className="sf-inline">
          <button disabled={busy || loading} onClick={() => act(async () => {
            setItems(await ctx.rest(url));
            setMessage('Options refreshed from Hermes.');
          })}>Refresh options</button>
          <button disabled={busy} onClick={() => act(async () => {
            const path = await exportScene(ctx,scene,'gltf');
            if (path) setMessage('Saved '+path);
          })}>Export glTF</button>
          <button disabled={busy} onClick={() => act(async () => {
            const path = await exportScene(ctx,scene,'json');
            if (path) setMessage('Saved '+path);
          })}>Export evidence JSON</button>
          <button disabled={busy} onClick={() => act(async () => {
            const path = await exportScene(ctx,scene,'csv');
            if (path) setMessage('Saved '+path);
          })}>Export building CSV</button>
          <button disabled={busy} onClick={() => act(() => downloadPrepared(ctx,endpoint+'/archive'))}>Download project ZIP</button>
          <button disabled={busy} onClick={() => act(async () => setStudies(await ctx.rest(endpoint+'/studies')))}>Browse height studies</button>
        </div>
      </div>
      <div className="sf-option-controls">
        <form className="sf-option-save" onSubmit={save}>
          <label>Option name<input value={name} maxLength={48} placeholder="e.g. Gable proposal"
            onChange={event => setName(event.target.value)}/></label>
          <button type="submit" disabled={busy || loading || !name.trim()}>Save working model as option</button>
        </form>
        <label>View model<select aria-label="View model" disabled={busy} value={view?.id ?? ''}
          onChange={event => open(event.target.value)}>
          <option value="">Working model</option>
          {items.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
        </select></label>
        {view && <button disabled={busy} onClick={() => onCopy(view.scene.draft)}>Copy option into editor</button>}
      </div>
      <div className="sf-table"><table aria-label="Option comparison">
        <thead><tr><th>Model</th><th>Buildings</th><th>Footprint (m²)</th><th>Highest point (m)</th>
          <th>Volume (m³)</th><th>Illustrative roofs</th><th>Area flags</th><th>Manage</th></tr></thead>
        <tbody>{entries.map(({id,name,metrics,origin}) => <tr key={id} className={displayId === id ? 'sf-picked' : undefined}>
          <th>{name}{origin === "hermes_tool" && <span className="sf-viewing"> · Hermes tool</span>}{displayId === id && <span className="sf-viewing"> · Viewing</span>}</th>
          <td>{metrics.building_count}</td><td>{number.format(metrics.footprint_m2)}</td>
          <td>{number.format(metrics.max_height_m)}</td><td>{number.format(metrics.volume_m3)}</td>
          <td>{metrics.illustrative_roofs}</td><td>{metrics.area_flags}</td>
          <td>{id !== 'working' && <button disabled={busy || Boolean(removing)} onClick={() => setRemoving(id)}>Remove option: {name}</button>}</td>
        </tr>)}</tbody>
      </table></div>
      {removing && <RemovalDialog key={removing} ctx={ctx} kind="options" id={removing}
        onCancel={() => setRemoving(null)} onRemoved={result => {
          setItems(current => current.filter(item => item.id !== result.removed));
          if (view?.id === result.removed) {setView(null);setFocus(null);}
          setRemoving(null);setMessage('Removed '+result.name+'.');
        }}/>}
      {view && <>
        <SiteChanges comparison={{left:{name:view.name},right:{name:'Working model'},
          site_comparison:compareSites(view.scene,working)}}/>
      </>}
      <p className="sf-caption">Footprints and volumes are summed per building. Options preserve a saved snapshot. Options created in chat appear here after refresh. Export uses the model you are viewing.</p>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert" className="sf-flag">{error}</p>}
      {studies && <details open className="sf-review">
        <summary>Height study library ({studies.length})</summary>
        {studies.length === 0 && <p>No height studies for this sheet.</p>}
        {studies.map(item => <div key={item.id} className="sf-inline">
          <span>{item.baseline.name} · {item.feasible}/{item.tested} feasible {item.archived && '· Archived'}</span>
          <button disabled={busy} onClick={() => act(async () => setStudy(await ctx.rest('/height-studies/'+item.id)))}>Open study</button>
          <button disabled={busy} onClick={() => act(async () => {
            await ctx.rest('/height-studies/'+item.id+'/archived?archived='+!item.archived,{method:'PUT'});
            setStudies(await ctx.rest(endpoint+'/studies'));
          })}>{item.archived ? 'Restore study' : 'Archive study'}</button>
        </div>)}
      </details>}
      <ModelReview key={displayId+scene.revision} ctx={ctx}
        model={view ?? {id:'working',name:'Working model',scene}} onInspect={code => setFocus({code})}/>
      <PositionExplorer key={'position:'+displayId+scene.revision} ctx={ctx} endpoint={endpoint}
        model={view ?? {id:'working',name:'Working model',scene}} onSaved={() => {
          ctx.rest(url).then(setItems).catch(exc => setError(exc.message));
        }}/>
    </section>
    <div ref={preview}><Massing key={displayId} scene={scene} sheet={sheet} focus={focus}
      title={view?.name ?? 'Working model'}/></div>
    {study && <div className="sf-card">
      <button onClick={() => setStudy(null)}>Close study</button>
      <StudyView key={study.id} ctx={ctx} path={'/height-studies/'+study.id} study={study}/>
    </div>}
  </>;
}

function compareSites(left,right) {
  const keys = ['parcel_area_m2','union_footprint_m2','covered_in_parcel_m2','coverage_pct','gross_floor_area_m2','far'];
  return {parcel_changed:JSON.stringify(left.draft.site) !== JSON.stringify(right.draft.site),
    metrics:Object.fromEntries(keys.map(key => {
      const a = left.site_metrics?.[key] ?? null, b = right.site_metrics?.[key] ?? null;
      return [key,{left:a,right:b,delta:a != null && b != null ? b-a : null,
        status:a == null && b == null ? 'unknown' : a == null ? 'became_known' : b == null ? 'became_unknown' : a === b ? 'unchanged' : 'changed'}];
    }))};
}
