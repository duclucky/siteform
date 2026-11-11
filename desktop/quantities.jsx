// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useRef, useState} from 'react';
import {host} from '@hermes/plugin-sdk';
import {downloadPrepared} from './export.js';

const labels = {
  parcel_area:'Parcel area', footprint_area:'Footprint area',
  above_ground_area:'Above-ground floor area', basement_area:'Basement floor area',
  total_floor_area:'Total floor area', floor_area:'Floor group area',
  coverage:'Site coverage', far:'Floor area ratio', height:'Building height', floors:'Above-ground floors',
};
const units = {coverage:'%', far:'ratio', height:'m', floors:'count'};
const format = value => value.toLocaleString(undefined, {maximumFractionDigits:6});

export function QuantityReview({ctx, documentId, page, reviewId, library, sessionId, ownsSession}) {
  const [review, setReview] = useState(null);
  const [selected, setSelected] = useState([]);
  const [numerator, setNumerator] = useState('');
  const [denominator, setDenominator] = useState('');
  const [source, setSource] = useState(documentId ?? '');
  const [sourcePage, setSourcePage] = useState(1);
  const [locale, setLocale] = useState('vi');
  const [documents, setDocuments] = useState(library ?? []);
  const [error, setError] = useState('');
  const [message, setMessage] = useState('');
  const [busy, setBusy] = useState(false);
  const [evidence, setEvidence] = useState(null);
  const evidencePanel = useRef(null);
  const calculationPanel = useRef(null);
  const [rows, setRows] = useState(null);
  const [manual, setManual] = useState({row:0, quantity:'floor_area', value_text:'', subject:'project', basis:''});
  const primary = review?.primary ?? {document_id:documentId, page};
  const endpoint = '/documents/'+primary.document_id+'/'+primary.page+'/quantities';
  const canEdit = !ownsSession || ownsSession();

  const accept = value => {
    setReview(value);
    setSelected(value?.confirmed ?? []);
    setNumerator(value?.basis?.numerator_id ?? '');
    setDenominator(value?.basis?.denominator_id ?? '');
    setEvidence(null);
  };
  useEffect(() => {
    if (evidence) evidencePanel.current?.scrollIntoView({block:'center'});
  }, [evidence]);
  useEffect(() => {
    let active = true;
    setError('');
    const path = reviewId ? '/quantity-reviews/'+reviewId :
      '/documents/'+documentId+'/'+page+'/quantities';
    ctx.rest(path).then(value => {if (active) accept(value);})
      .catch(exc => {if (active) setError(exc.message);});
    if (!library) ctx.rest('/documents').then(value => {if (active) setDocuments(value);})
      .catch(exc => {if (active) setError(exc.message);});
    return () => {active = false;};
  }, [ctx, documentId, page, reviewId, library]);
  const operate = async action => {
    if (!canEdit || busy) return;
    setBusy(true); setError(''); setMessage('');
    try {await action();} catch (exc) {setError(exc.message);} finally {setBusy(false);}
  };
  const scan = () => operate(async () => {
    accept(await ctx.rest(endpoint, {method:'POST', timeoutMs:60000,
      body:{sources:[{document_id:source, page:sourcePage, locale}]}}));
    setRows(null);
    setMessage('Source suggestions saved. Review each row before confirming.');
  });
  const confirm = () => operate(async () => {
    const value = await ctx.rest('/quantity-reviews/'+review.id+'/confirm', {method:'POST',
      body:{fact_ids:selected, numerator_id:numerator || null, denominator_id:denominator || null}});
    accept(value);
    setMessage('Confirmed quantities and counting basis saved.');
    requestAnimationFrame(() => calculationPanel.current?.scrollIntoView({block:'center'}));
  });
  const inspect = fact => operate(async () => {
    setEvidence(await ctx.rest('/quantity-reviews/'+review.id+'/evidence/'+fact.id));
  });
  const askModel = () => operate(async () => {
    if (!sessionId || !host.composer?.insertText || !ownsSession?.()) {
      setError('Open this quantity review in its originating Hermes chat to request model interpretation.');
      return;
    }
    const prompt = 'Use siteform_project_review to interpret the selected PDF text with the configured Hermes model. '+
      'Treat extracted rows as suggestions and preserve their source evidence. '+
      JSON.stringify({document_id:primary.document_id, page:primary.page,
        sources:[{document_id:source || primary.document_id, page:sourcePage, locale}], use_model:true});
    if (!await host.composer.insertText(sessionId, prompt, {mode:'block'})) {
      throw new Error('Open the originating chat composer to continue.');
    }
    setMessage('Interpretation request added to this chat. Review and send it.');
  });
  const addManual = () => operate(async () => {
    const row = rows[manual.row];
    const value = await ctx.rest('/quantity-reviews/'+review.id+'/facts', {method:'POST', body:{
      quantity:manual.quantity, value_text:manual.value_text, unit:units[manual.quantity] ?? 'm2',
      subject:manual.subject, basis:manual.basis || 'Reported quantity',
      evidence:{document_id:source, page:sourcePage, locale, bounds:row.bounds, quote:row.text},
    }});
    accept(value); setRows(null); setMessage('Source-linked suggestion added. Confirm it when reviewed.');
  });
  const sourceDocument = documents.find(item => item.id === source);
  const accepted = review?.facts.filter(fact => selected.includes(fact.id)) ?? [];
  const findingText = finding => {
    if (finding.kind === 'source_conflict') return labels[finding.quantity]+' has competing source values.';
    if (finding.kind === 'far_comparison') return 'Reported FAR '+format(finding.reported)+
      ' · calculated FAR '+format(finding.calculated);
    return labels[finding.quantity]+' · reported '+format(finding.reported)+
      ' · model estimate '+format(finding.estimated)+' · difference '+format(finding.difference);
  };

  return <section className="sf-card sf-quantities" aria-label="Project quantity review">
    <div className="sf-bar"><h2>Project quantities</h2>
      {review && <button type="button" disabled={busy} onClick={() => operate(async () => {
        accept(await ctx.rest(endpoint)); setMessage('Latest quantity review opened.');
      })}>Load latest review</button>}
    </div>
    <p>Compare reported quantities with the model estimate. Confirm the sources and floor-area basis you want to use.</p>
    <fieldset disabled={busy || !canEdit} className="sf-editor-fields">
      <div className="sf-option-controls">
        <label>Import supporting PDF<input type="file" accept=".pdf,application/pdf" onChange={event => {
          const file = event.target.files?.[0];
          event.target.value = '';
          if (!file) return;
          operate(async () => {
            if (file.size > 30*1024*1024) throw new Error('Choose a PDF up to 30 MiB.');
            const document = await ctx.rest('/documents', {method:'POST', timeoutMs:60000, upload:{
              filename:file.name, contentType:'application/pdf', bytes:await file.arrayBuffer(),
            }});
            setDocuments(items => [document, ...items.filter(item => item.id !== document.id)]);
            setSource(document.id); setSourcePage(1); setRows(null);
          });
        }}/></label>
        <label>Supporting PDF<select aria-label="Quantity source PDF" value={source} onChange={event => {
          setSource(event.target.value); setSourcePage(1); setRows(null);
        }}>
          <option value="">Choose a source</option>
          {documents.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
        </select></label>
        <label>Source page<input aria-label="Quantity source page" type="number" min="1"
          max={sourceDocument?.pages ?? 30} value={sourcePage} onChange={event => {
            setSourcePage(Number(event.target.value)); setRows(null);
          }}/></label>
        <label>Number format<select value={locale} onChange={event => {setLocale(event.target.value); setRows(null);}}>
          <option value="vi">Vietnamese · 2.950,5</option><option value="en">English · 2,950.5</option>
        </select></label>
        <button type="button" disabled={!source || !primary.document_id} onClick={scan}>Read source quantities</button>
        {sessionId && <button type="button" disabled={!source} onClick={askModel}>Interpret with Hermes</button>}
      </div>
      {sessionId && <p className="sf-caption">Hermes interpretation sends the selected page text to your configured model when you send the request.</p>}
      {review && <>
        <p className="sf-caption">Review {review.id.slice(0,8)} · {review.sources.length} source pages or regions</p>
        <div className="sf-table"><table aria-label="Source quantities">
          <thead><tr><th scope="col">Confirm</th><th scope="col">Quantity</th><th scope="col">Reported value</th>
            <th scope="col">Basis</th><th scope="col">Source</th></tr></thead>
          <tbody>{review.facts.map(fact => <tr key={fact.id} data-fact-id={fact.id}>
            <td><input type="checkbox" aria-label={'Confirm '+labels[fact.quantity]+' '+fact.value}
              checked={selected.includes(fact.id)} onChange={event => setSelected(
                event.target.checked ? [...selected,fact.id] : selected.filter(id => id !== fact.id))}/></td>
            <th scope="row">{labels[fact.quantity]}<small>{fact.subject}</small></th>
            <td>{format(fact.value)} {fact.unit}</td><td>{fact.basis}<small>{fact.method.replaceAll('_',' ')}</small></td>
            <td><button type="button" onClick={() => inspect(fact)}>View source</button>
              <small>{documents.find(item => item.id === fact.evidence.document_id)?.name ?? fact.evidence.document_id.slice(0,8)}
                {' · page '+fact.evidence.page}</small></td>
          </tr>)}</tbody>
        </table></div>
        {review.facts.length === 0 && <p>No supported quantity labels found. Add a fact from a source row.</p>}
        <div className="sf-option-controls">
          <label>FAR floor-area numerator<select aria-label="FAR floor-area numerator" value={numerator}
            onChange={event => setNumerator(event.target.value)}>
            <option value="">Choose a confirmed floor area</option>
            {accepted.filter(fact => ['above_ground_area','total_floor_area','floor_area'].includes(fact.quantity))
              .map(fact => <option key={fact.id} value={fact.id}>{labels[fact.quantity]} · {format(fact.value)} m² · {fact.basis}</option>)}
          </select></label>
          <label>FAR parcel-area denominator<select aria-label="FAR parcel-area denominator" value={denominator}
            onChange={event => setDenominator(event.target.value)}>
            <option value="">Choose a confirmed parcel area</option>
            {accepted.filter(fact => fact.quantity === 'parcel_area').map(fact =>
              <option key={fact.id} value={fact.id}>{format(fact.value)} m² · page {fact.evidence.page}</option>)}
          </select></label>
          <button type="button" onClick={confirm}>Save confirmed quantities</button>
        </div>
        <button type="button" disabled={!source} onClick={() => operate(async () => {
          setRows(await ctx.rest('/documents/'+source+'/'+sourcePage+'/quantity-rows?locale='+locale));
        })}>Add from source row</button>
        {rows && <div className="sf-manual-quantity">
          <label>Source row<select value={manual.row} onChange={event => setManual({...manual,row:Number(event.target.value)})}>
            {rows.map((row,index) => <option key={index} value={index}>{row.text}</option>)}
          </select></label>
          <div className="sf-fields">
            <label>Quantity<select value={manual.quantity} onChange={event => setManual({...manual,quantity:event.target.value})}>
              {Object.entries(labels).map(([key,label]) => <option key={key} value={key}>{label}</option>)}
            </select></label>
            <label>Number exactly as printed<input value={manual.value_text}
              onChange={event => setManual({...manual,value_text:event.target.value})}/></label>
            <label>Building or project<input value={manual.subject}
              onChange={event => setManual({...manual,subject:event.target.value})}/></label>
            <label>Counting basis or floor group<input placeholder="e.g. Floors 1–9, above ground" value={manual.basis}
              onChange={event => setManual({...manual,basis:event.target.value})}/></label>
          </div>
          <div className="sf-inline"><button type="button" disabled={!rows.length || !manual.value_text} onClick={addManual}>Add source-linked fact</button>
            <button type="button" onClick={() => setRows(null)}>Cancel</button></div>
        </div>}
      </>}
    </fieldset>
    {evidence && <figure ref={evidencePanel} className="sf-quantity-evidence">
      <img src={evidence.image} alt={'Quantity source on page '+evidence.page}/>
      <figcaption>{evidence.filename} · page {evidence.page}<p>{evidence.quote}</p></figcaption>
      <button type="button" onClick={() => setEvidence(null)}>Close source</button>
    </figure>}
    {review?.calculation && <div ref={calculationPanel} className="sf-quantity-calculation" role="status">
      <strong>Confirmed FAR {format(review.calculation.far)}</strong>
      <p>{format(review.calculation.numerator_m2)} m² / {format(review.calculation.denominator_m2)} m²</p>
      <p>{review.calculation.basis}</p>
    </div>}
    {review?.model_estimate?.gross_floor_area_m2 != null && <p>
      Recorded model estimate {format(review.model_estimate.gross_floor_area_m2)} m² · footprint × floor count
      {' · revision '+review.model_estimate.revision.slice(0,8)}
    </p>}
    {review?.findings.length > 0 && <details open>
      <summary>Quantities to review ({review.findings.length})</summary>
      <ul>{review.findings.map((finding,index) => <li key={index}>{findingText(finding)}</li>)}</ul>
    </details>}
    {review?.warnings.map(warning => <p role="status" key={warning}>{warning}</p>)}
    {review && <button type="button" disabled={busy} onClick={() => operate(async () => {
      await downloadPrepared(ctx, '/quantity-reviews/'+review.id+'/report');
      setMessage('Quantity report saved.');
    })}>Download quantity report</button>}
    {busy && <p role="status">Reading project quantities…</p>}
    {message && <p role="status">{message}</p>}
    {error && <p className="sf-flag" role="alert">{error}</p>}
  </section>;
}
