// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useState} from 'react';
import {Massing} from './scene.jsx';

const number = value => value.toLocaleString(undefined,{maximumFractionDigits:3});
const reasons = {outside_parcel:'Outside parcel', setback:'Parcel setback', exclusion:'Exclusion zone',
  clearance:'Building clearance', overlap:'Building overlap'};

export function PositionStudy({ctx, study, visible=true, onSaved}) {
  const [rank, setRank] = useState(0);
  const [previews, setPreviews] = useState({});
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const [retry, setRetry] = useState(0);
  const [message, setMessage] = useState('');
  const path = '/position-studies/'+study.id;
  const current = previews[rank];
  const selectRank = value => {
    setRank(value); setMessage(''); setError('');
  };
  useEffect(() => {
    if (previews[rank]) return;
    let active = true;
    setError('');
    ctx.rest(path+'/preview/'+rank,{timeoutMs:45000}).then(data => {
      if (active) setPreviews(prior => ({...prior,[rank]:data}));
    }).catch(exc => {if (active) setError(exc.message);});
    return () => {active = false;};
  }, [ctx,path,rank,previews,retry]);
  const save = async event => {
    event.preventDefault();
    if (busy || !current || rank === 0 || !name.trim()) return;
    setBusy(true); setError(''); setMessage('');
    try {
      const saved = await ctx.rest(path+'/save',{method:'POST',body:{rank,name},timeoutMs:45000});
      setMessage('Saved '+saved.name+'.'); setName('');
      onSaved?.(saved);
    } catch (exc) {setError(exc.message);} finally {setBusy(false);}
  };
  return <section className="sf-card sf-position-study" aria-label="Position study results">
    <h2>Building positions</h2>
    <p>{study.request.code} · {study.baseline.name} · {study.source.name}, sheet {study.source.page}</p>
    <div className="sf-model-summary">
      <span><strong>{study.tested}</strong> positions tested</span>
      <span><strong>{study.feasible}</strong> feasible changes</span>
      <span>Setback {number(study.request.setback_m)} m</span>
      <span>Clearance {number(study.request.clearance_m)} m</span>
    </div>
    <p className="sf-caption">Offsets are measured from the saved baseline. Positive X follows sheet right,
      positive Y follows sheet down. Candidates rank by least movement within the tested grid.</p>
    {study.baseline_findings.length > 0 && <p className="sf-flag">
      Baseline findings · {study.baseline_findings.map(item => reasons[item.kind]+' ('+item.buildings.join(', ')+')').join(' · ')}
    </p>}
    <div className="sf-table"><table aria-label="Ranked position candidates">
      <thead><tr><th scope="col">Model</th><th scope="col">X offset (m)</th><th scope="col">Y offset (m)</th>
        <th scope="col">Movement (m)</th></tr></thead>
      <tbody><tr><th scope="row"><button type="button" aria-pressed={rank === 0}
        disabled={busy} onClick={() => selectRank(0)}>Preview baseline</button></th><td>0</td><td>0</td><td>0</td></tr>
        {study.candidates.map(row => <tr key={row.rank}>
          <th scope="row"><button type="button" aria-pressed={rank === row.rank} disabled={busy}
            onClick={() => selectRank(row.rank)}>Preview position {row.rank}</button></th>
          <td>{number(row.dx_m)}</td><td>{number(row.dy_m)}</td><td>{number(row.movement_m)}</td>
        </tr>)}
      </tbody>
    </table></div>
    {study.feasible === 0 && <p role="status">No changed position passed all constraints in this grid.</p>}
    <details className="sf-review">
      <summary>All tested positions ({study.tested})</summary>
      <div className="sf-table sf-study-trace"><table aria-label="Tested positions">
        <thead><tr><th scope="col">X (m)</th><th scope="col">Y (m)</th><th scope="col">Outcome</th>
          <th scope="col">Findings</th></tr></thead>
        <tbody>{study.trace.map((row,index) => <tr key={index}>
          <td>{number(row.dx_m)}</td><td>{number(row.dy_m)}</td><td>{row.outcome}</td>
          <td>{row.findings.map(item => reasons[item.kind]+' · '+item.buildings.join(', ')).join(' / ') || '—'}</td>
        </tr>)}</tbody>
      </table></div>
    </details>
    {rank > 0 && <form className="sf-option-save" onSubmit={save}>
      <label>Position option name<input aria-label="Position option name" maxLength={48}
        value={name} disabled={busy} onChange={event => setName(event.target.value)}/></label>
      <button type="submit" disabled={busy || !current || !name.trim()}>Save position {rank}</button>
    </form>}
    {message && <p role="status">{message}</p>}
    {error && <div><p role="alert" className="sf-flag">{error}</p>
      {!current && <button type="button" onClick={() => setRetry(value => value+1)}>Retry position preview</button>}</div>}
    {current ? <Massing key={rank} scene={current.scene} sheet={current.sheet} title={current.name}
      visible={visible} compare={rank > 0 ? previews[0]?.scene : null} compact
      feasibleRegion={study.envelope} initialPlan/> : !error && <p role="status">Loading position preview…</p>}
  </section>;
}

export function PositionExplorer({ctx, endpoint, model, onSaved}) {
  const [dx, setDx] = useState({min_m:-4,max_m:4,step_m:1});
  const [dy, setDy] = useState({min_m:-4,max_m:4,step_m:1});
  const [setback, setSetback] = useState('');
  const [clearance, setClearance] = useState('');
  const [code, setCode] = useState(model.scene.buildings[0].code);
  const [study, setStudy] = useState(null);
  const [history, setHistory] = useState(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');
  const act = async action => {
    setBusy(true); setError('');
    try {await action();} catch (exc) {setError(exc.message);} finally {setBusy(false);}
  };
  const run = event => {
    event.preventDefault();
    act(async () => setStudy(await ctx.rest(endpoint+'/position-studies',{method:'POST',timeoutMs:60000,
      body:{base:model.id,code,dx,dy,setback_m:Number(setback),clearance_m:Number(clearance)}})));
  };
  const axis = (label,value,setValue) => <fieldset className="sf-position-axis">
    <legend>{label} offset (m)</legend>
    {['min_m','max_m','step_m'].map(key => <label key={key}>
      {key === 'min_m' ? 'Minimum' : key === 'max_m' ? 'Maximum' : 'Step'}
      <input aria-label={label+' '+key} type="number" step=".01" required min={key === 'step_m' ? '.01' : '-1000'}
        max="1000" value={value[key]} onChange={event => setValue({...value,[key]:event.target.value})}/>
    </label>)}
  </fieldset>;
  const ready = model.id !== 'working' && model.scene.parcel;
  return <details className="sf-position-explorer">
    <summary>Explore building positions</summary>
    <p>Test one building on an explicit grid against a confirmed parcel and supplied limits.</p>
    {!model.scene.parcel && <p>Trace and confirm a parcel boundary in the drawing editor, then build and save a baseline option.</p>}
    {model.id === 'working' && <p>Save the working model as an option and select it before starting a position study.</p>}
    <form onSubmit={run}>
      <fieldset disabled={!ready || busy} className="sf-editor-fields">
        <label>Building to move<select value={code} onChange={event => setCode(event.target.value)}>
          {model.scene.buildings.map(item => <option key={item.code} value={item.code}>{item.code}</option>)}
        </select></label>
        <div className="sf-fields">
          <label>Parcel setback (m)<input type="number" step="any" min="0" max="1000" required
            value={setback} onChange={event => setSetback(event.target.value)}/></label>
          <label>Building clearance (m)<input type="number" step="any" min="0" max="1000" required
            value={clearance} onChange={event => setClearance(event.target.value)}/></label>
        </div>
        <div className="sf-fields">{axis('X',dx,setDx)}{axis('Y',dy,setDy)}</div>
        <p className="sf-caption">Each axis accepts 1–9 positions. The step must reach its maximum exactly.
          Limits are supplied project assumptions.</p>
        <button type="submit">Find feasible positions</button>
      </fieldset>
    </form>
    <button type="button" disabled={busy} onClick={() => act(async () =>
      setHistory(await ctx.rest(endpoint+'/position-studies')))}>Open position study library</button>
    {history && <div>{history.length === 0 && <p>No saved position studies for this sheet.</p>}
      {history.map(item => <div className="sf-inline" key={item.id}>
        <span>{item.baseline.name} · {item.request.code} · {item.feasible}/{item.tested} feasible</span>
        <button type="button" disabled={busy} onClick={() => act(async () =>
          setStudy(await ctx.rest('/position-studies/'+item.id)))}>Open position study</button>
      </div>)}
    </div>}
    {busy && <p role="status">Evaluating positions…</p>}
    {error && <p className="sf-flag" role="alert">{error}</p>}
    {study && <PositionStudy key={study.id} ctx={ctx} study={study} onSaved={onSaved}/>}
  </details>;
}
