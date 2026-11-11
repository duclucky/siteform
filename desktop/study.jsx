// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useState} from 'react';
import {Massing} from './scene.jsx';

const number = new Intl.NumberFormat(undefined,{maximumFractionDigits:2});
const delta = new Intl.NumberFormat(undefined,{maximumFractionDigits:2,signDisplay:'exceptZero'});
const outcomes = {
  roof_rise:'Height at or below roof rise',
  floor_fit:'Confirmed floors would not fit',
  height_cap:'Above height cap',
  volume_cap:'Above volume cap',
  unchanged:'Same as baseline',
  feasible:'Feasible',
};

function Trace({study,codes}) {
  return <details className="sf-review">
    <summary>All tested combinations ({study.tested})</summary>
    <div className="sf-table sf-study-trace"><table aria-label="Tested height combinations">
      <thead><tr>{codes.map(code => <th scope="col" key={code}>{code} (m)</th>)}
        <th scope="col">Peak (m)</th><th scope="col">Volume (m³)</th><th scope="col">Outcome</th></tr></thead>
      <tbody>{study.trace.map((row,index) => <tr key={index}>
        {codes.map(code => <td key={code}>{number.format(row.heights_m[code])}</td>)}
        <td>{number.format(row.peak_m)}</td><td>{row.volume_m3 === null ? '—' : number.format(row.volume_m3)}</td>
        <td>{outcomes[row.outcome]}</td>
      </tr>)}</tbody>
    </table></div>
  </details>;
}

export function StudyView({ctx, path, study, visible=true}) {
  const [rank,setRank] = useState(study.candidates[0]?.rank ?? 0);
  const [preview,setPreview] = useState(null);
  const [loadError,setLoadError] = useState('');
  const [attempt,retry] = useState(0);
  const [name,setName] = useState('');
  const [busy,setBusy] = useState(false);
  const [message,setMessage] = useState('');
  const [saveError,setSaveError] = useState('');
  const codes = Object.keys(study.ranges_m);

  useEffect(() => {
    let active = true;
    setLoadError('');
    ctx.rest(path+'/preview/'+rank,{timeoutMs:30000})
      .then(data => {if (active) setPreview({rank,data});})
      .catch(error => {if (active) setLoadError(error.message || 'Could not load the study model.');});
    return () => {active = false;};
  }, [ctx,path,rank,attempt]);

  const select = value => {
    setRank(value);
    setMessage('');
    setSaveError('');
  };

  const save = async event => {
    event.preventDefault();
    if (busy || rank === 0 || preview?.rank !== rank || !name.trim()) return;
    setBusy(true);
    setMessage('');
    setSaveError('');
    try {
      const option = await ctx.rest(path+'/save',{method:'POST',body:{rank,name},timeoutMs:30000});
      setMessage('Saved '+option.name+'.');
      setName('');
    } catch (error) {
      setSaveError(error.message || 'Could not save this candidate.');
    } finally {
      setBusy(false);
    }
  };

  const current = preview?.rank === rank ? preview.data : null;
  return <>
    <section className="sf-card sf-chat-tools" aria-label="Height study results">
      <p className="sf-kicker">SiteForm / Design exploration</p>
      <h2>Height study</h2>
      <p>Base · <strong>{study.baseline.name}</strong> · {study.source.name}, sheet {study.source.page}</p>
      <div className="sf-model-summary">
        <span><strong>{study.tested}</strong> combinations tested</span>
        <span><strong>{study.feasible}</strong> feasible changes</span>
        {study.caps.max_height_m !== undefined && <span>Height cap {number.format(study.caps.max_height_m)} m</span>}
        {study.caps.max_volume_m3 !== undefined && <span>Volume cap {number.format(study.caps.max_volume_m3)} m³</span>}
      </div>
      <p className="sf-caption">Ranks favor {study.objective === 'lowest_peak' ? 'the lowest peak height' :
        study.objective === 'least_height_change' ? 'the smallest total height change' : 'retained enclosed volume'}.
        Footprints, roofs and confirmed floor counts stay fixed.</p>
      {study.candidates.length ? <div className="sf-table"><table aria-label="Ranked height candidates">
        <thead><tr><th scope="col">Model</th>{codes.map(code => <th scope="col" key={code}>{code} (m)</th>)}
          <th scope="col">Peak (m)</th><th scope="col">Volume (m³)</th><th scope="col">Δ Volume (m³)</th></tr></thead>
        <tbody>
          <tr className={rank === 0 ? 'sf-picked' : undefined}>
            <th scope="row"><button type="button" aria-pressed={rank === 0} disabled={busy}
              onClick={() => select(0)}>Preview baseline</button></th>
            {codes.map(code => <td key={code}>—</td>)}
            <td>{number.format(study.baseline.metrics.max_height_m)}</td>
            <td>{number.format(study.baseline.metrics.volume_m3)}</td><td>—</td>
          </tr>
          {study.candidates.map(row => <tr key={row.rank} className={rank === row.rank ? 'sf-picked' : undefined}>
            <th scope="row"><button type="button" aria-pressed={rank === row.rank} disabled={busy}
              onClick={() => select(row.rank)}>Preview candidate {row.rank}</button></th>
            {codes.map(code => <td key={code}>{number.format(row.heights_m[code])}</td>)}
            <td>{number.format(row.peak_m)}</td><td>{number.format(row.volume_m3)}</td>
            <td>{delta.format(row.volume_delta_m3)}</td>
          </tr>)}
        </tbody>
      </table></div> : <p role="status">No changed design passed the caps in these ranges.</p>}
      {study.fixed_height_blockers.length > 0 && <p className="sf-flag">
        Fixed buildings above the height cap · {study.fixed_height_blockers.join(', ')}
      </p>}
      <Trace study={study} codes={codes}/>
      {rank > 0 && <form className="sf-option-save sf-study-save" onSubmit={save}>
        <label>Option name<input value={name} maxLength={48} disabled={busy}
          onChange={event => setName(event.target.value)}/></label>
        <button type="submit" disabled={busy || !current || !name.trim()}>Save candidate {rank}</button>
      </form>}
      {message && <p role="status">{message}</p>}
      {saveError && <p role="alert" className="sf-flag">{saveError}</p>}
    </section>
    {loadError ? <div className="sf-card"><p role="alert">{loadError}</p>
      <button type="button" onClick={() => retry(value => value+1)}>Retry model preview</button></div> :
      current ? <Massing key={rank} scene={current.scene} sheet={current.sheet} title={current.name} visible={visible} compact/> :
        <p role="status">Loading study model…</p>}
  </>;
}
