// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';
import {host, TRANSCRIPT_DIRECTIVE_AREA, useValue} from '@hermes/plugin-sdk';
import {Massing} from './scene.jsx';
import {css} from './style.js';
import {exportScene} from './export.js';
import {BuildingChanges, ModelReview} from './review.jsx';
import {StudyView} from './study.jsx';
import {QuantityReview} from './quantities.jsx';
import {PositionStudy} from './positions.jsx';
import {SourceAccess} from './source-access.jsx';
import {QuickEdit} from './quick-edit.jsx';
import {openStudio} from './navigation.js';

const optionId = /^[0-9a-f]{32}$/;
const number = new Intl.NumberFormat(undefined,{maximumFractionDigits:2});
const delta = new Intl.NumberFormat(undefined,{maximumFractionDigits:2,signDisplay:'exceptZero'});
const comparisonRows = [
  ['Volume (m³)','volume_m3'],
  ['Footprint (m²)','footprint_m2'],
  ['Highest point (m)','max_height_m'],
  ['Buildings','building_count'],
  ['Area flags','area_flags'],
];

function modelRequest(attrs) {
  if (attrs.study !== undefined) {
    if (Object.keys(attrs).length !== 1 || typeof attrs.study !== 'string' || !optionId.test(attrs.study)) return null;
    return {path:'/height-studies/'+attrs.study, study:true};
  }
  let review = '';
  if (attrs.review === 'yes') {
    const keys = ['max_height_m','max_footprint_m2','max_volume_m3','min_clearance_m','min_setback_m','max_coverage_pct','max_far'];
    const limits = {};
    for (const key of keys) {
      if (attrs[key] === undefined) continue;
      const value = Number(attrs[key]);
      if (!Number.isFinite(value) || value <= 0) return null;
      limits[key] = value;
    }
    review = JSON.stringify(limits);
  }
  if (attrs.compare !== undefined) {
    if (review || typeof attrs.option !== 'string' || typeof attrs.compare !== 'string' ||
        !optionId.test(attrs.option) || !optionId.test(attrs.compare) || attrs.option === attrs.compare) {
      return null;
    }
    return {path:'/chat-options/'+attrs.option+'?compare_to='+attrs.compare};
  }
  if (typeof attrs.option === 'string' && optionId.test(attrs.option)) {
    return {path:'/chat-options/'+attrs.option, review};
  }
  if (typeof attrs.document === 'string' && /^[0-9a-f]{64}$/.test(attrs.document) &&
      typeof attrs.revision === 'string' && /^[0-9a-f]{64}$/.test(attrs.revision) &&
      typeof attrs.page === 'string' && /^(?:[1-9]|[12][0-9]|30)$/.test(attrs.page)) {
    return {path:'/documents/'+attrs.document+'/'+attrs.page, revision:attrs.revision, review};
  }
  return null;
}

async function loadModel(ctx, path, revision, review) {
  const view = await loadSnapshots(ctx,path,revision);
  if (review) {
    const {id,scene} = view.models[0];
    try {
      view.report = await ctx.rest('/documents/'+scene.source.sha256+'/'+scene.source.page+'/review',{
        method:'POST',body:{reference:id,revision:scene.revision,limits:JSON.parse(review)},timeoutMs:30000,
      });
    } catch (exc) {
      view.reviewError = exc.message || 'Could not check this model.';
    }
  }
  return view;
}

async function loadSnapshots(ctx, path, revision) {
  if (!revision) {
    const {option, compare_to, comparison, sheet} = await ctx.rest(path,{timeoutMs:30000});
    return {models:compare_to ? [option,compare_to] : [option], comparison, sheet};
  }
  const [scene, sheet] = await Promise.all([
    ctx.rest(path+'/scene',{timeoutMs:30000}), ctx.rest(path,{timeoutMs:30000}),
  ]);
  if (scene?.revision !== revision) throw new Error('This working model has changed since the chat turn.');
  return {models:[{id:'working',name:scene.source.name,scene}], sheet};
}

function ChatModelView({ctx, view, visible, sessionId, ownsSession}) {
  const [selected,setSelected] = useState(0);
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  const [error,setError] = useState('');
  const [focus,setFocus] = useState(null);
  const [overlay,setOverlay] = useState(false);
  const [alternative,setAlternative] = useState(null);
  const [edit,setEdit] = useState(null);
  const [reviewOpen,setReviewOpen] = useState(0);
  const originalSelected = useRef(0);
  const {models,comparison,sheet} = alternative ?? view;
  const model = models[selected];
  const reference = comparison && models[1-selected];
  const comparable = reference && reference.scene.metres_per_pdf_point === model.scene.metres_per_pdf_point;

  const startEdit = (kind,building=null) => {
    if (!ownsSession()) {setError('Focus the originating chat to edit this model.');return;}
    setEdit({kind,code:building?.code ?? null});setError('');
  };
  const studio = async building => {
    try {await openStudio(ctx,host,model,sessionId,building,ownsSession);}
    catch (exc) {setError(exc.message);}
  };
  const saved = async (item,code) => {
    if (!ownsSession()) throw new Error('Reopen the originating chat to view the saved option.');
    const path = model.id === 'working' ? '/chat-options/'+item.id : '/chat-options/'+model.id+'?compare_to='+item.id;
    const loaded = await loadSnapshots(ctx,path);
    if (!ownsSession()) return;
    if (!alternative) originalSelected.current=selected;
    setAlternative(loaded);setSelected(loaded.models.length-1);setFocus({code});setOverlay(false);setEdit(null);
    setMessage('Saved '+item.name+'. You are viewing a new alternative to the chat result.');
  };

  const ask = async (building, request) => {
    if (!ownsSession() || !host.composer?.insertText) {
      setError('Focus the originating chat to use this action.');
      return;
    }
    const source = model.scene.source;
    const context = JSON.stringify({document:source.sha256, page:source.page, option:model.id,
      revision:model.scene.revision, building:building.code, comparison:reference?.id});
    setError('');
    try {
      const inserted = await host.composer.insertText(sessionId, request+'\nSiteForm context: '+context, {mode:'block'});
      if (!inserted) setError('Open the originating chat composer to continue.');
    } catch {
      setError('The originating chat composer is unavailable.');
    }
  };

  const save = async format => {
    setBusy(true);
    setMessage('');
    setError('');
    try {
      const path = await exportScene(ctx,model.scene,format);
      if (path) setMessage('Saved '+path);
    } catch (exc) {
      setError(exc.message || 'Could not export this model.');
    } finally {
      setBusy(false);
    }
  };

  return <>
    <Massing key={model.id} scene={model.scene} sheet={sheet} title={model.name} focus={focus}
      visible={visible} compare={overlay && comparable ? reference.scene : null} compact
      actions={building => <>
        <button onClick={() => ask(building,'Explain the confirmed dimensions and drawing evidence for this building.')}>Ask about building</button>
        <button onClick={() => startEdit('roof',building)}>Edit roof</button>
        <button onClick={() => startEdit('height',building)}>Change height</button>
        <button onClick={() => studio(building)}>Open building in Studio</button>
        {reference && <button onClick={() => ask(building,'Explain the changes for this building between these two saved options.')}>Explain change</button>}
      </>}/>
    <section className="sf-card sf-chat-tools" aria-label="SiteForm model tools">
      <div className="sf-inline">
        <button onClick={() => startEdit('roof')}>Edit roof</button>
        <button onClick={() => startEdit('height')}>Change height</button>
        <button onClick={() => setReviewOpen(value => value+1)}>Check limits</button>
        <button onClick={() => studio(null)}>Open in Studio</button>
        {alternative && <button onClick={() => {
          setAlternative(null);setSelected(originalSelected.current);setEdit(null);setFocus(null);setMessage('');setError('');setOverlay(false);
        }}>Back to chat result</button>}
      </div>
      {edit && <QuickEdit key={model.id+edit.kind+(edit.code ?? '')} ctx={ctx} model={model} request={edit}
        ownsSession={ownsSession} onSaved={saved} onClose={() => setEdit(null)}/>}
      {comparison && <>
        <p className="sf-kicker">SiteForm / Saved options</p>
        <div className="sf-table">
          <table aria-label="Saved option comparison">
            <thead><tr><th scope="col">Metric</th><th scope="col">{models[0].name}</th>
              <th scope="col">{models[1].name}</th><th scope="col">Change</th></tr></thead>
            <tbody>{comparisonRows.map(([label,key]) => <tr key={key}>
              <th scope="row">{label}</th>
              <td>{number.format(comparison.left.metrics[key])}</td>
              <td>{number.format(comparison.right.metrics[key])}</td>
              <td>{delta.format(comparison.right_minus_left[key])}</td>
            </tr>)}</tbody>
          </table>
        </div>
        <p className="sf-caption">Change is the second option minus the first. Values describe concept massing.</p>
        <BuildingChanges changes={comparison.building_changes ?? []} onInspect={row => {
          const index = row.right_code ? 1 : 0;
          setSelected(index);
          setFocus({code:row.right_code ?? row.left_code});
          setMessage('');
          setError('');
        }}/>
      </>}
      <div className="sf-inline">
        {comparable && <button type="button" aria-pressed={overlay} onClick={() => setOverlay(!overlay)}>
          Overlay {reference.name}
        </button>}
        {comparison && <label>View saved option
          <select aria-label="View saved option" value={selected} disabled={busy} onChange={event => {
            setSelected(Number(event.target.value)); setFocus(null); setMessage(''); setError('');setEdit(null);
          }}>
            {models.map((item,index) => <option key={item.id} value={index}>{item.name}</option>)}
          </select>
        </label>}
        <button type="button" disabled={busy} onClick={() => save('gltf')}>Export glTF</button>
        <button type="button" disabled={busy} onClick={() => save('json')}>Export evidence JSON</button>
        <button type="button" disabled={busy} onClick={() => save('csv')}>Export building CSV</button>
      </div>
      {message && <p role="status">{message}</p>}
      {error && <p role="alert" className="sf-flag">{error}</p>}
      <ModelReview key={model.id} ctx={ctx} model={model} initialReport={alternative ? null : view.report}
        initialError={alternative ? '' : view.reviewError} openRequest={reviewOpen}
        onInspect={code => setFocus({code})}/>
    </section>
  </>;
}

function ChatModel({ctx, path, revision, review, study, sessionId, ownsSession}) {
  const panel = useRef(null);
  const [visible, setVisible] = useState(false);
  const [view, setView] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(panel.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || view || error) return;
    let active = true;
    const request = study ? ctx.rest(path,{timeoutMs:30000}) : loadModel(ctx,path,revision,review);
    request.then(result => {if (active) setView(result);})
      .catch(exc => {if (active) setError(exc.message || 'Could not load the saved SiteForm model.');});
    return () => {active = false;};
  }, [ctx, path, revision, review, study, visible, view, error]);

  return <div ref={panel} className="siteform sf-chat-model" aria-label={study ? 'SiteForm height study' : 'SiteForm 3D preview'}>
    <style>{css}</style>
    <SourceAccess ctx={ctx}/>
    {view ? (study ? <StudyView ctx={ctx} path={path} study={view} visible={visible}/> :
      <ChatModelView ctx={ctx} view={view} visible={visible} sessionId={sessionId} ownsSession={ownsSession}/>) :
      <div className="sf-card sf-chat-placeholder">
        <strong>{study ? 'SiteForm height study' : (view?.models[0].name ?? 'SiteForm 3D preview')}</strong>
        {error ? <>
          <p role="alert">{error}</p>
          <p>Check the connection and enable the SiteForm Agent for this profile in Capabilities.</p>
          <button type="button" onClick={() => setError('')}>Retry preview</button>
        </> : !view && <p role="status">{study ? 'Loading height study…' : 'Loading saved model…'}</p>}
      </div>}
  </div>;
}

function TranscriptModel({ctx, attrs, sessionId, streaming}) {
  const storedId = useValue(host.state.focusedStoredSessionId);
  const runtimeId = useValue(host.state.focusedSessionId);
  const owner = useValue(host.state.focusedSessionOwner);
  const activeProfile = useValue(host.state.profile);
  const activeConnection = useValue(host.state.connectionId);
  const request = modelRequest(attrs);
  const quantityId = typeof attrs?.quantities === 'string' && optionId.test(attrs.quantities) ? attrs.quantities : null;
  const positionId = typeof attrs?.position === 'string' && optionId.test(attrs.position) ? attrs.position : null;
  if ((!request && !quantityId && !positionId) || streaming || !sessionId) return null;
  if ((sessionId !== storedId && sessionId !== runtimeId) ||
      (owner && (owner.profile !== (activeProfile || 'default') ||
        (activeConnection && owner.connectionId !== activeConnection)))) {
    return <p>Focus this chat to load the SiteForm model.</p>;
  }
  const ownsSession = () => {
    const current = host.state.focusedSessionOwner.get();
    return (sessionId === host.state.focusedSessionId.get() || sessionId === host.state.focusedStoredSessionId.get()) &&
      activeConnection === host.state.connectionId.get() && activeProfile === host.state.profile.get() &&
      (!current || (current.profile === (activeProfile || 'default') &&
        (!activeConnection || current.connectionId === activeConnection)));
  };
  if (positionId) return <PositionCard key={JSON.stringify([activeConnection,activeProfile,sessionId,positionId])}
    ctx={ctx} studyId={positionId}/>;
  if (quantityId) return <div className="siteform sf-chat-model" aria-label="SiteForm quantity review">
    <style>{css}</style>
    <SourceAccess ctx={ctx}/>
    <QuantityReview key={JSON.stringify([activeConnection,activeProfile,sessionId,quantityId])}
      ctx={ctx} reviewId={quantityId} sessionId={sessionId} ownsSession={ownsSession}/>
  </div>;
  return <ChatModel key={JSON.stringify([activeConnection,activeProfile,sessionId,request])}
    ctx={ctx} sessionId={sessionId} ownsSession={ownsSession} {...request}/>;
}

function PositionCard({ctx,studyId}) {
  const [study,setStudy] = useState(null);
  const [error,setError] = useState('');
  const [retry,setRetry] = useState(0);
  useEffect(() => {
    let active = true;
    setError('');
    ctx.rest('/position-studies/'+studyId).then(data => {if (active) setStudy(data);})
      .catch(exc => {if (active) setError(exc.message);});
    return () => {active = false;};
  },[ctx,studyId,retry]);
  return <div className="siteform sf-chat-model" aria-label="SiteForm position study">
    <style>{css}</style>
    <SourceAccess ctx={ctx}/>
    {study ? <PositionStudy ctx={ctx} study={study}/> : error ? <div>
      <p role="alert">{error}</p><button type="button" onClick={() => setRetry(value => value+1)}>Retry position study</button>
    </div> : <p role="status">Loading position study…</p>}
  </div>;
}

export function registerChatModel(ctx) {
  if (!TRANSCRIPT_DIRECTIVE_AREA) return;
  ctx.register({
    id:'chat-model',
    area:TRANSCRIPT_DIRECTIVE_AREA,
    data:{name:'siteform-model', render:props => <TranscriptModel ctx={ctx} {...props}/>},
  });
}
