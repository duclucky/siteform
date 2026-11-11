// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useLayoutEffect, useRef, useState} from 'react';
import * as sdk from '@hermes/plugin-sdk';
import {Options} from './options.jsx';
import {RoofFields} from './roof-fields.jsx';
import {css} from './style.js';
import {registerChatModel} from './chat-model.jsx';
import {SourceAccess} from './source-access.jsx';
import {CalibrationPreview, RulerDetail} from './ruler-detail.jsx';
import {QuantityReview} from './quantities.jsx';
import {LibraryManager} from './library.jsx';
import {clearHandoff, readHandoff, returnToChat, subscribeHandoff, validHandoff} from './navigation.js';

const emptyScale = {points:[], metres:''};
const modes = {
  scale: 'Click the two ends of a scale bar or a known dimension.',
  check: 'Mark another known distance to check the primary scale.',
  region: 'Click opposite corners of a box that encloses one building.',
  table: 'Click opposite corners of the height table. Include the label, value and unit.',
  trace: 'Click each corner of the footprint in order. Then close the outline.',
  parcel: 'Click the corners of the confirmed parcel boundary.',
  exclusion: 'Click the corners of an area where buildings cannot be placed.',
  courtyard: 'Trace the interior courtyard within the selected flat building.',
};
const p = points => points.map(([x,y]) => [x * 1000, y * 1000]).join(' ');
const paint = color => color.length === 3 ? 'rgb(' + color.map(v => Math.round(v*255)).join(' ') + ')' : '#64748b';

const outlineName = {vector:'Closed path',dashed:'Joined dashes',joined:'Joined strokes',traced:'Traced'};

function Sheet({info, scale, check, evidence, points, windowBox, outline, saved, site, onPoint, zoom, rotation}) {
  const choose = event => {
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX-box.left)/box.width));
    const y = Math.min(1, Math.max(0, (event.clientY-box.top)/box.height));
    onPoint([[x,y], [y,1-x], [1-x,1-y], [1-y,x]][rotation]);
  };
  const [width, height] = info.size;
  const turned = rotation % 2;
  return <div className="sf-sheet-scroll">
    <div className="sf-drawing" style={{width:zoom+'%', aspectRatio:turned ? height/width : width/height}}
      onClick={choose} data-testid="drawing">
      <div className="sf-sheet-layer" style={{width:(turned ? width/height*100 : 100)+'%',
        height:(turned ? height/width*100 : 100)+'%', transform:'translate(-50%,-50%) rotate('+(rotation*90)+'deg)'}}>
      <img alt="Rendered source drawing" src={info.image} draggable={false}/>
      <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
        {saved.map((item, i) => <polygon key={i} className="sf-confirmed" points={p(item.outline)}/>)}
        {saved.flatMap((item,i) => (item.courtyards ?? []).map((ring,j) =>
          <polygon key={i+'-'+j} className="sf-exclusion" points={p(ring)}/>))}
        {site && <polygon className="sf-parcel" points={p(site.boundary)}/>}
        {site?.exclusions.map((ring,i) => <polygon key={i} className="sf-exclusion" points={p(ring)}/>)}
        {windowBox && <rect className="sf-region" x={windowBox[0]*1000} y={windowBox[1]*1000}
          width={(windowBox[2]-windowBox[0])*1000} height={(windowBox[3]-windowBox[1])*1000}/>}
        {outline.length > 0 && <polygon className="sf-outline" points={p(outline)}/>}
        {scale.length > 0 && <polyline className="sf-ruler" points={p(scale)}/>}
        {check?.length > 0 && <polyline className="sf-check-ruler" points={p(check)}/>}
        {evidence && <rect className="sf-exclusion" x={evidence[0]*1000} y={evidence[1]*1000}
          width={(evidence[2]-evidence[0])*1000} height={(evidence[3]-evidence[1])*1000}/>}
        {[...scale, ...points].map(([x,y], i) => <circle key={i} className="sf-point" cx={x*1000} cy={y*1000} r="3"/>)}
        {points.length > 1 && <polyline className="sf-ruler" points={p(points)}/>}
      </svg>
      </div>
    </div>
  </div>;
}

function labelsForOutline(labels, outline) {
  return labels.filter(({evidence}) => {
    const [left,top,right,bottom] = evidence.marker_bounds ?? evidence.bounds;
    const x = (left+right)/2, y = (top+bottom)/2;
    let inside = false;
    outline.forEach(([a,b],i) => {
      const [c,d] = outline[(i+1)%outline.length];
      if ((b>y)!==(d>y) && x < a+(c-a)*(y-b)/(d-b)) inside = !inside;
    });
    return inside;
  });
}

function tableLabels(table, building) {
  if (!table) return [];
  const matched = labelsForOutline(table.labels,building.outline);
  if (matched.length) return matched;
  const code = building.code.trim();
  if (!code) return [];
  return table.height_rows.filter(row => !row.code || row.code.toLowerCase()===code.toLowerCase())
    .map(row => ({...row,code}));
}

function Workspace({ctx, document, page, draftKey, onScene, handoff}) {
  const endpoint = '/documents/' + document.id + '/' + page;
  const [info, setInfo] = useState(null);
  const [scale, setScale] = useState(emptyScale);
  const [refine, setRefine] = useState(null);
  const [mode, setMode] = useState('scale');
  const [points, setPoints] = useState([]);
  const [windowBox, setWindowBox] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selection, setSelection] = useState(null);
  const [queued, setQueued] = useState([]);
  const [intake, setIntake] = useState(null);
  const [heightTable, setHeightTable] = useState(null);
  const [evidence, setEvidence] = useState(null);
  const [rows, setRows] = useState([]);
  const [site, setSite] = useState(null);
  const [courtyardBuilding, setCourtyardBuilding] = useState(null);
  const [scene, setScene] = useState(null);
  const [base, setBase] = useState(null);
  const [confirmed, setConfirmed] = useState(null);
  const [draftWarning, setDraftWarning] = useState('');
  const [ready, setReady] = useState(false);
  const storedDraft = useRef(null);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(true);
  const [zoom, setZoom] = useState(100);
  const [rotation, setRotation] = useState(0);

  useEffect(() => {
    let active = true;
    Promise.all([ctx.rest(endpoint, {timeoutMs:45000}), ctx.rest(endpoint+'/scene')]).then(([sheet, saved]) => {
      if (!active) return;
      setInfo(sheet);
      setMode(sheet.automatic ? 'scale' : 'trace');
      setConfirmed(saved);
      setBase(saved?.revision ?? 'new');
      setScene(saved);
      const recovered = ctx.storage?.get(draftKey, null);
      if (recovered) {
        storedDraft.current = JSON.stringify(recovered);
        setScale(recovered.scale);
        setRows(recovered.rows);
        setSite(recovered.site ?? null);
        setBase(recovered.base);
        setScene(null);
        if (recovered.mode && recovered.points?.length) {
          setMode(recovered.mode);
          setPoints(recovered.points);
          setCourtyardBuilding(recovered.courtyardBuilding ?? null);
        }
        setMessage('Unsaved draft recovered.');
        if (recovered.base !== (saved?.revision ?? 'new')) {
          setDraftWarning('The saved model changed since this draft was opened.');
        }
      } else if (saved) {
        setScale(saved.draft.scale);
        setRows(saved.draft.buildings);
        setSite(saved.draft.site ?? null);
      }
      setReady(true);
    }).catch(exc => active && setError(exc.message)).finally(() => active && setBusy(false));
    return () => {active = false;};
  }, [ctx, endpoint, draftKey]);

  useLayoutEffect(() => {
    if (!ready || !ctx.storage) return;
    try {
      const trace = ['trace','parcel','exclusion','courtyard'].includes(mode) && points.length > 0;
      if ((scene && !trace) || (!rows.length && !scale.points.length && scale.metres === '' && !site && !trace)) {
        if (storedDraft.current && storedDraft.current === JSON.stringify(ctx.storage.get(draftKey,null))) {
          ctx.storage.remove(draftKey);
        }
        storedDraft.current = null;
      } else {
        const snapshot = {base,scale,rows,site,...(trace ? {mode,points,courtyardBuilding} : {})};
        ctx.storage.set(draftKey,snapshot);
        storedDraft.current = JSON.stringify(snapshot);
      }
    } catch {
      setDraftWarning('Draft recovery storage is unavailable. Save before leaving this sheet.');
    }
  }, [ctx, draftKey, ready, scene, base, scale, rows, site, mode, points, courtyardBuilding]);

  const reloadBase = async () => {
    setBusy(true);
    setError('');
    try {
      const saved = await ctx.rest(endpoint+'/scene');
      setConfirmed(saved);
      setBase(saved?.revision ?? 'new');
      setDraftWarning('');
      setMessage('Draft kept. Review it before saving against the latest model.');
    } catch (exc) {
      setError(exc.message);
    } finally {
      setBusy(false);
    }
  };

  const clearSelection = () => {
    setPoints([]); setWindowBox(null); setCandidates([]); setSelection(null); setQueued([]); setMessage('');
  };
  const changeMode = value => {clearSelection(); setMode(value); setError(''); setRefine(null);};
  const mark = async point => {
    if (busy) return;
    setRefine(null);
    setError('');
    if (mode === 'scale') {
      const ruler = scale.points.length === 1 ? [scale.points[0], point] : [point];
      setScale({...scale, points:ruler}); setScene(null);
      return;
    }
    if (mode === 'check') {
      const prior = scale.check?.points ?? [];
      const points = prior.length === 1 ? [...prior,point] : [point];
      setScale({...scale,check:{points,metres:scale.check?.metres ?? ''}});setScene(null);
      return;
    }
    if (mode === 'trace' || mode === 'parcel' || mode === 'exclusion' || mode === 'courtyard') {
      if (points.length < 180) setPoints([...points, point]);
      setSelection(null);
      return;
    }
    if (points.length !== 1) {
      setPoints([point]); setWindowBox(null); setCandidates([]); setSelection(null); setQueued([]); return;
    }
    const [[x,y], [u,v]] = [points[0], point];
    const window = [Math.min(x,u), Math.min(y,v), Math.max(x,u), Math.max(y,v)];
    setWindowBox(window); setPoints([]); setBusy(true);
    try {
      if (mode === 'table') {
        setHeightTable(null);
        const result = await ctx.rest(endpoint+'/intake?ocr=true',{method:'POST',body:{window},timeoutMs:60000});
        setHeightTable(result);
        setEvidence(null);
        return;
      }
      const found = await ctx.rest(endpoint+'/detect', {method:'POST', body:{window}, timeoutMs:45000});
      setCandidates(found);
      setMessage(found.length ? 'Select an outline and check it against the drawing.' :
        'No closed vector outline here. Tighten the selection or trace the corners.');
      if (found.length === 1) setSelection({...found[0], window});
    } catch (exc) {
      setError(exc.message);
    } finally {
      setBusy(false);
    }
  };
  const useOutlines = items => {
    setRows([...rows,...items.map(item => ({code:'', height:'', printed_area:'', method:item.method, outline:item.outline,
      candidate:item.id ?? null, window:item.window ?? null}))]);
    setScene(null);
    clearSelection();
  };
  const update = (i, key, value) => {
    setRows(rows.map((item, index) => index === i ? {...item, [key]:value,
      ...(['code','height'].includes(key) ? {label_evidence:null} : {})} : item));
    setScene(null);
  };
  const valid = scale.points.length === 2 && Number(scale.metres) > 0 && rows.length > 0 &&
    (!scale.check || (scale.check.points.length === 2 && Number(scale.check.metres) > 0)) &&
    (!site || site.reference.trim()) && rows.every(item => item.code.trim() && Number(item.height) > 0 &&
      (!item.program || (Number(item.program.floors) > 0 && Number(item.program.floor_height_m) > 0)));
  const build = async event => {
    event.preventDefault();
    if (!valid || busy || !base || (points.length && mode !== 'region')) return;
    setError(''); setBusy(true);
    try {
      const saved = await ctx.rest(endpoint+'/scene?base='+base, {method:'PUT', timeoutMs:45000, body:{
        scale:{points:scale.points, metres:Number(scale.metres),
          ...(scale.check ? {check:{points:scale.check.points,metres:Number(scale.check.metres)}} : {})},
        ...(site ? {site} : {}),
        buildings:rows.map(item => ({...item, height:Number(item.height),
          program:item.program ? {...item.program, floors:Number(item.program.floors),
            floor_height_m:Number(item.program.floor_height_m)} : null,
          roof:item.roof ? {...item.roof, rise_m:Number(item.roof.rise_m),
            angle_deg:item.roof.kind === 'stepped' ? null : Number(item.roof.angle_deg),
            upper_scale_pct:item.roof.kind === 'stepped' ? Number(item.roof.upper_scale_pct) : null,
          } : null,
          printed_area:item.printed_area === '' || item.printed_area == null ? null : Number(item.printed_area)})),
      }});
      setScene(saved); setConfirmed(saved); setBase(saved.revision); setDraftWarning(''); onScene();
    } catch (exc) {
      setError(exc.message);
      if (exc.message?.includes('working model changed')) setDraftWarning(exc.message);
    } finally {
      setBusy(false);
    }
  };
  const readLabels = async ocr => {
    setBusy(true);setError('');
    try {
      const result = await ctx.rest(endpoint+'/intake?ocr='+ocr,{method:'POST',timeoutMs:60000});
      setIntake(result);setEvidence(null);
    } catch (exc) {
      setError(exc.message);
    } finally {
      setBusy(false);
    }
  };
  const refineButtons = (ruler, kind) => ruler.points.map((_, index) => {
    const label = 'Refine '+kind+' '+(index === 0 ? 'start' : 'end');
    return <button type="button" key={label} aria-pressed={refine?.label === label}
      onClick={() => setRefine({kind, index, label})}>{label}</button>;
  });
  const refineRuler = refine?.kind === 'check' ? scale.check : scale;
  const refinePoint = refine && refineRuler?.points[refine.index];
  if (!info) return <p role={error ? 'alert' : 'status'}>{error || 'Reading the PDF sheet…'}</p>;
  return <>
    <div className="sf-workspace">
      <section className="sf-card">
        <div className="sf-bar">
          <div><p className="sf-kicker">01 / Source drawing</p><h2>Sheet {page}</h2></div>
          <label className="sf-zoom">Zoom <input aria-label="Drawing zoom" type="range" min="100" max="350"
            step="25" value={zoom} onChange={event => setZoom(Number(event.target.value))}/></label>
        </div>
        <div className="sf-inline sf-modes">
          <button aria-pressed={mode==='scale'} onClick={() => changeMode('scale')}>Set scale</button>
          <button aria-pressed={mode==='check'} disabled={scale.points.length!==2}
            onClick={() => changeMode('check')}>Check scale</button>
          <button aria-pressed={mode==='region'} disabled={!info.automatic} onClick={() => changeMode('region')}>Find outline</button>
          <button aria-pressed={mode==='trace'} onClick={() => changeMode('trace')}>Trace outline</button>
          <button aria-pressed={mode==='parcel'} onClick={() => changeMode('parcel')}>Trace parcel</button>
          {site && <button aria-pressed={mode==='exclusion'} disabled={site.exclusions.length >= 12}
            onClick={() => changeMode('exclusion')}>Trace exclusion</button>}
          <button onClick={() => setRotation((rotation + 3) % 4)}>Rotate left</button>
        </div>
        <p>{modes[mode]}</p>
        <Sheet info={info} scale={scale.points} check={scale.check?.points} evidence={evidence} points={points} windowBox={windowBox}
          outline={selection?.outline ?? []} saved={rows} site={site} zoom={zoom} rotation={rotation} onPoint={mark}/>
        <p className="sf-caption">{info.vector_paths === 0 ? 'Image-only sheet · Trace outlines by hand.' :
          info.automatic ? info.vector_paths.toLocaleString() + ' vector paths · Inspect each detected outline.' :
          'High-complexity sheet · Trace outlines by hand.'}</p>
      </section>
      <form className="sf-card" onSubmit={build}>
        <fieldset disabled={busy} className="sf-editor-fields">
        <p className="sf-kicker">02 / Confirm dimensions</p><h2>Review buildings</h2>
        <label>Ruler distance (m)<input type="number" min=".001" max="10000" step="any" value={scale.metres}
          placeholder="Enter known distance" onChange={event => {setScale({...scale, metres:event.target.value});setScene(null);}}/></label>
        <p className="sf-caption">{scale.points.length}/2 ruler points marked</p>
        {scale.points.length > 0 && <div className="sf-inline">{refineButtons(scale, 'primary')}</div>}
        {scale.check && <div className="sf-ruler-check">
          <label>Second known distance (m)<input type="number" min=".001" max="10000" step="any" required
            value={scale.check.metres} onChange={event => {
              setScale({...scale,check:{...scale.check,metres:event.target.value}});setScene(null);
            }}/></label>
          <div className="sf-inline">
            {refineButtons(scale.check, 'check')}
            <button type="button" onClick={() => {
              setScale({...scale,check:null});setScene(null);changeMode('scale');
            }}>Remove scale check</button>
          </div>
        </div>}
        {refinePoint && <RulerDetail key={refine.label} ctx={ctx} endpoint={endpoint} point={refinePoint}
          label={refine.label} onClose={() => setRefine(null)} onApply={point => {
            const ruler = {...refineRuler, points:refineRuler.points.map((prior, index) => index === refine.index ? point : prior)};
            setScale(refine.kind === 'check' ? {...scale, check:ruler} : ruler);
            setScene(null);
            setRefine(null);
          }}/>}
        <CalibrationPreview ctx={ctx} endpoint={endpoint} scale={scale}/>
        {mode === 'trace' && <div className="sf-inline">
          <button type="button" disabled={!points.length} onClick={() => setPoints(points.slice(0,-1))}>Undo point</button>
          <button type="button" disabled={points.length < 3 || rows.length >= 40} onClick={() =>
            useOutlines([{method:'traced', outline:points}])}>Close outline</button>
        </div>}
        {(mode === 'parcel' || mode === 'exclusion') && <div className="sf-inline">
          <button type="button" disabled={!points.length} onClick={() => setPoints(points.slice(0,-1))}>Undo point</button>
          <button type="button" disabled={points.length < 3} onClick={() => {
            setSite(mode === 'parcel' ? {boundary:points,exclusions:site?.exclusions ?? [],reference:site?.reference ?? ''} :
              {...site,exclusions:[...site.exclusions,points]});
            setScene(null); changeMode('scale');
          }}>Confirm {mode}</button>
        </div>}
        {mode === 'courtyard' && <div className="sf-inline">
          <button type="button" disabled={!points.length} onClick={() => setPoints(points.slice(0,-1))}>Undo point</button>
          <button type="button" disabled={points.length < 3 || !rows[courtyardBuilding]} onClick={() => {
            const row = rows[courtyardBuilding];
            update(courtyardBuilding,'courtyards',[...(row.courtyards ?? []),points]);
            changeMode('scale');
          }}>Confirm courtyard</button>
        </div>}
        {site && <details className="sf-review" open={mode==='parcel' || mode==='exclusion' || !site.reference}>
          <summary>Parcel and exclusions</summary>
          <label>Boundary reference<input value={site.reference} maxLength={240} required
            placeholder="Drawing legend, survey reference or review assumption"
            onChange={event => {setSite({...site,reference:event.target.value});setScene(null);}}/></label>
          {site.exclusions.map((_,i) => <button type="button" key={i} onClick={() => {
            setSite({...site,exclusions:site.exclusions.filter((_,index) => i!==index)});setScene(null);
          }}>Remove exclusion {i+1}</button>)}
          <button type="button" onClick={() => {setSite(null);setScene(null);changeMode('scale');}}>Remove parcel</button>
        </details>}
        {message && <p role="status">{message}</p>}
        {candidates.length > 0 && <div className="sf-candidates">
          {candidates.map((item, index) => <button type="button" key={item.id}
            aria-pressed={selection?.id===item.id} onClick={() => setSelection({...item, window:windowBox})}>
            <i style={{background:paint(item.color)}}/>{outlineName[item.method]} {index+1}
          </button>)}
        </div>}
        {selection && <button type="button" disabled={rows.length >= 40} onClick={() => useOutlines([selection])}>Use selected outline</button>}
        {candidates.length > 1 && <details className="sf-review">
          <summary>Queue multiple outlines</summary>
          {candidates.map((item,i) => <label key={item.id}>
            <input type="checkbox" checked={queued.includes(item.id)} onChange={event => setQueued(ids =>
              event.target.checked ? [...ids,item.id] : ids.filter(id => id!==item.id))}/>
            Outline {i+1}
          </label>)}
          <button type="button" disabled={!queued.length || rows.length+queued.length>40} onClick={() =>
            useOutlines(candidates.filter(item => queued.includes(item.id)).map(item => ({...item,window:windowBox})))}>
            Add checked outlines for review
          </button>
        </details>}
        <div className="sf-inline">
          <button type="button" onClick={() => readLabels(false)}>Find drawing labels</button>
          <button type="button" onClick={() => readLabels(true)}>Read scan with local OCR</button>
          <button type="button" aria-pressed={mode==='table'} onClick={() => changeMode('table')}>Select height table</button>
        </div>
        {heightTable && <p role="status">{heightTable.height_rows.length
          ? heightTable.height_rows.length+' height rows found. Review the suggested match or enter a building ID to assign a row.'
          : 'No explicit building height with metre units was found in that region.'}</p>}
        {intake && <p role="status">{intake.labels.length} explicit ID and height labels found · {intake.method==='ocr' ? 'Local OCR' : 'PDF text'}.
          {' '}{intake.headings.join(' · ')} Review each suggestion against the drawing.</p>}
        <div className="sf-rows">
          {!rows.length && <p>Find or trace an outline. Add the building ID and height from the drawing.</p>}
          {rows.map((item, i) => <fieldset key={i}>
            <legend>Building {i+1} · {outlineName[item.method]}</legend>
            {item.placement && <div>
              <p className="sf-caption">Design placement · X {item.placement.dx_m} m · Y {item.placement.dy_m} m from the source outline.</p>
              <button type="button" onClick={() => {update(i,'placement',null);setScene(null);}}>Reset design placement</button>
            </div>}
            {item.label_evidence && <p className="sf-caption">
              Confirmed {item.label_evidence.method==='ocr' ? 'OCR' : 'drawing'} label · {item.label_evidence.text}
            </p>}
            {[...labelsForOutline(intake?.labels ?? [],item.outline),...tableLabels(heightTable,item)].map((label,index) =>
              <div className="sf-inline" key={index}>
                <span>{label.evidence.text}</span>
                <button type="button" onClick={() => setEvidence(label.evidence.bounds)}>Locate label</button>
                <button type="button" onClick={() => {
                  setRows(rows.map((row,j) => j===i ? {...row,code:label.code,height:label.height_m,label_evidence:label.evidence} : row));
                  setEvidence(label.evidence.bounds);setScene(null);
                }}>{label.evidence.kind === 'height_table' ? 'Use table height for ' : 'Confirm '}{label.code} at {label.height_m} m</button>
              </div>)}
            <label>Building ID {i+1}<input value={item.code} maxLength={48} required
              placeholder="e.g. A-01" onChange={event => update(i,'code',event.target.value)}/></label>
            <div className="sf-fields">
              <label>Height (m) {i+1}<input type="number" min=".001" max="1000" step="any" required
                value={item.height} onChange={event => update(i,'height',event.target.value)}/></label>
              <label>Printed area (m²) {i+1}<input type="number" min=".01" max="100000000" step="any"
                value={item.printed_area ?? ''} onChange={event => update(i,'printed_area',event.target.value)}/></label>
            </div>
            <RoofFields roof={item.roof} index={i+1} onChange={roof => update(i,'roof',roof)}/>
            {!item.roof && <button type="button" disabled={(item.courtyards?.length ?? 0) >= 8} onClick={() => {
              setCourtyardBuilding(i);changeMode('courtyard');
            }}>Trace courtyard for building {i+1}</button>}
            {item.courtyards?.map((_,index) => <button type="button" key={index} onClick={() =>
              update(i,'courtyards',item.courtyards.filter((_,j) => index!==j))}>Remove courtyard {index+1}</button>)}
            <label><input type="checkbox" checked={Boolean(item.program)}
              onChange={event => update(i,'program',event.target.checked ? {floors:'',floor_height_m:'',use:''} : null)}/>
              Enter confirmed floors for building {i+1}</label>
            {item.program && <div className="sf-fields">
              <label>Floors<input type="number" min="1" max="300" step="1" required value={item.program.floors}
                onChange={event => update(i,'program',{...item.program,floors:event.target.value})}/></label>
              <label>Floor height (m)<input type="number" min=".001" max="30" step="any" required value={item.program.floor_height_m}
                onChange={event => update(i,'program',{...item.program,floor_height_m:event.target.value})}/></label>
              <label>Use<input maxLength={80} value={item.program.use}
                onChange={event => update(i,'program',{...item.program,use:event.target.value})}/></label>
            </div>}
            <button type="button" onClick={() => {
              setRows(rows.filter((_,index) => i!==index));setScene(null);
              if (mode === 'courtyard') changeMode('scale');
            }}>Remove building {i+1}</button>
          </fieldset>)}
        </div>
        {!scene && base && <p className="sf-caption">Unsaved draft · Based on {base === 'new' ? 'a new model' : base.slice(0,8)}</p>}
        {draftWarning && <p role="status">{draftWarning}</p>}
        {draftWarning && <button type="button" onClick={reloadBase}>Load latest revision and keep draft</button>}
        {!scene && confirmed && <button type="button" onClick={() => {
          setScale(confirmed.draft.scale); setRows(confirmed.draft.buildings); setScene(confirmed);
          setRefine(null);
          setSite(confirmed.draft.site ?? null);
          setBase(confirmed.revision); setDraftWarning(''); setError(''); setMessage('Saved model restored.');
        }}>Restore saved model</button>}
        <button className="sf-primary" type="submit" disabled={!valid || busy || !base || Boolean(refinePoint) || (points.length > 0 && mode !== 'region')}>
          {busy ? 'Working…' : 'Build 3D model'}
        </button>
        </fieldset>
        {error && <p className="sf-flag" role="alert">{error}</p>}
      </form>
    </div>
    {(scene || (handoff && confirmed)) && <Options ctx={ctx} endpoint={endpoint} working={scene ?? confirmed}
      sheet={info} handoff={handoff} onCopy={draft => {
      setScale(draft.scale); setRows(draft.buildings); setSite(draft.site ?? null); setScene(null);
      setRefine(null);
      setMessage('Option copied into the editor. Build to update the working model.');
      requestAnimationFrame(() => window.document.querySelector('.sf-workspace form')?.scrollIntoView({block:'start'}));
    }}/>}
  </>;
}

function SiteForm({ctx}) {
  const profile = sdk.useValue(sdk.host.state.profile);
  const connection = sdk.useValue(sdk.host.state.connectionId);
  const scope = JSON.stringify([connection ?? 'local', profile ?? 'default']);
  return <Library key={scope} ctx={ctx} scope={scope}/>;
}

function Library({ctx, scope}) {
  const [library,setLibrary] = useState([]);
  const selectionKey = 'sheet:'+scope;
  const [id,setId] = useState(() => ctx.storage?.get(selectionKey,null)?.id ?? '');
  const [page,setPage] = useState(() => ctx.storage?.get(selectionKey,null)?.page ?? 1);
  const [error,setError] = useState('');
  const [busy,setBusy] = useState(true);
  const [notice,setNotice] = useState('');
  const [retry,setRetry] = useState(0);
  const [handoff,setHandoff] = useState(() => readHandoff(ctx,scope));
  const dismissHandoff = () => {clearHandoff(ctx,scope);setHandoff(null);};
  useEffect(() => subscribeHandoff(value => {
    if (validHandoff(value,scope)) setHandoff(value);
  }),[scope]);
  useEffect(() => {
    if (!handoff || busy) return;
    const target = library.find(item => item.id === handoff.document);
    if (!target || handoff.page > target.pages) {
      setError('The drawing from this chat is not available in the active profile.');return;
    }
    setId(handoff.document);setPage(handoff.page);setError('');
  },[handoff,library,busy]);
  useEffect(() => {
    let active = true;
    ctx.rest('/documents').then(items => {if (active) setLibrary(items);})
      .catch(exc => {if (active) setError(exc.message);})
      .finally(() => {if (active) setBusy(false);});
    return () => {active = false;};
  }, [ctx,retry]);
  useLayoutEffect(() => {
    try {ctx.storage?.set(selectionKey,{id,page});} catch { /* Selection recovery is optional. */ }
  }, [ctx,selectionKey,id,page]);
  const document = library.find(item => item.id===id);
  const upload = async (event, restore=false) => {
    const file = event.target.files?.[0];
    event.target.value = '';
    if (!file) return;
    setError(''); setNotice('');
    const limit = restore ? 128*1024*1024 : 30*1024*1024;
    if (file.size > limit) {setError(restore ? 'The project archive is too large.' : 'Choose a PDF up to 30 MiB.');return;}
    dismissHandoff();
    setBusy(true);
    try {
      const item = await ctx.rest(restore ? '/projects/restore' : '/documents', {method:'POST', timeoutMs:60000, upload:{
        filename:file.name, contentType:restore ? 'application/zip' : 'application/pdf', bytes:await file.arrayBuffer(),
      }});
      setLibrary(items => [item, ...items.filter(other => other.id!==item.id)]);
      setId(item.id); setPage(item.page ?? 1);
      if (restore) setNotice('Project restored with its original saved revisions.');
    } catch (exc) {
      setError(exc.message);
    } finally {
      setBusy(false);
    }
  };
  return <main className="siteform">
    <style>{css}</style>
    <header className="sf-header">
      <p className="sf-kicker">SITEFORM / DRAWING STUDIO</p>
      <h1>Turn site plans into 3D</h1>
      <p>Open a planning PDF, check the building outlines and confirm dimensions before viewing the massing.</p>
      <SourceAccess ctx={ctx}/>
      {handoff && <div className="sf-card" aria-label="Chat context">
        <p>Opened from chat · {handoff.building ? 'Building '+handoff.building+' · ' : ''}Revision {handoff.revision.slice(0,8)}.
          Your editor draft is preserved. Copy the option into the editor only when you want to edit it.</p>
        <button onClick={() => returnToChat(sdk.host,handoff,scope).catch(exc => setError(exc.message))}>Return to originating chat</button>
        <button onClick={dismissHandoff}>Clear chat context</button>
      </div>}
    </header>
    <section className="sf-card sf-intake">
      <label className="sf-file">Import planning PDF<input type="file" accept=".pdf,application/pdf" onChange={upload} disabled={busy}/></label>
      <label className="sf-file">Restore project ZIP<input type="file" accept=".zip,application/zip"
        onChange={event => upload(event,true)} disabled={busy}/></label>
      <label className="sf-library-choice">Open saved PDF<select aria-label="Open saved PDF" value={id} disabled={busy} onChange={event => {dismissHandoff();setId(event.target.value);setPage(1);setNotice('');}}>
        <option value="">Choose a drawing</option>
        {library.map(item => <option value={item.id} key={item.id}>{item.name}</option>)}
      </select></label>
      {document && <label>Sheet<select aria-label="Sheet" value={page} onChange={event => {dismissHandoff();setPage(Number(event.target.value));setNotice('');}}>
        {Array.from({length:document.pages}, (_,i) => <option value={i+1} key={i}>{i+1} / {document.pages}</option>)}
      </select></label>}
      {busy && <p role="status">Loading the local library…</p>}
      {error && <div>
        <p className="sf-flag" role="alert">{error}</p>
        <button disabled={busy} onClick={() => {setError('');setBusy(true);setRetry(value => value+1);}}>Retry library</button>
      </div>}
      {notice && <p role="status">{notice}</p>}
    </section>
    <LibraryManager ctx={ctx} refreshKey={library} onRemoved={result => {
      setLibrary(items => items.filter(item => item.id !== result.removed));
      if (handoff?.document === result.removed) dismissHandoff();
      for (let sheet=1; sheet <= (library.find(item => item.id === result.removed)?.pages ?? 0); sheet++) {
        try {ctx.storage?.remove('draft:'+scope+':'+result.removed+'/'+sheet);} catch { /* Deleted PDFs cannot recover a draft. */ }
      }
      if (id === result.removed) {setId('');setPage(1);}
      setNotice('Removed '+result.name+' and its listed project records.');
    }}/>
    {document && <details className="sf-quantity-section">
      <summary>Review project quantities and supporting documents</summary>
      <QuantityReview key={'quantities:'+id+'/'+page} ctx={ctx} documentId={id} page={page} library={library}/>
    </details>}
    {document && <Workspace key={id+'/'+page} ctx={ctx} document={document} page={page}
      handoff={handoff?.document === id && handoff.page === page ? handoff : null}
      draftKey={'draft:'+scope+':'+id+'/'+page}
      onScene={() => {setNotice('Model saved in this Hermes profile.');
        requestAnimationFrame(() => window.document.querySelector('.sf-variants')?.scrollIntoView({block:'start'}));}}/>}
  </main>;
}

export default {
  id:'siteform', name:'SiteForm', defaultEnabled:false,
  register(ctx) {
    registerChatModel(ctx);
    ctx.registerMany([
      {id:'studio', area:sdk.ROUTES_AREA, data:{path:'/siteform'}, render:() => <SiteForm ctx={ctx}/>},
      {id:'nav', area:sdk.SIDEBAR_NAV_AREA, data:{path:'/siteform', label:'SiteForm', codicon:'symbol-structure'}},
      {id:'open', area:sdk.PALETTE_AREA, data:{id:'siteform.open', label:'SiteForm: Open drawing studio',
        keywords:['planning','PDF','3D'], run:() => sdk.host.navigate('/siteform')}},
    ]);
  },
};
