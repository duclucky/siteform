// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useState} from 'react';

export function RulerDetail({ctx, endpoint, point, label, onApply, onClose}) {
  const [detail, setDetail] = useState(null);
  const [pending, setPending] = useState(point);
  const [error, setError] = useState('');

  useEffect(() => {
    let active = true;
    ctx.rest(endpoint+'/ruler-detail', {method:'POST', body:{point}})
      .then(result => {if (active) setDetail(result);})
      .catch(exc => {if (active) setError(exc.message);});
    return () => {active = false;};
  }, [ctx, endpoint, point]);

  const clamp = (value, min, max) => Math.min(Math.min(max, 1), Math.max(Math.max(min, 0), value));
  const directions = {ArrowLeft:[-1,0], ArrowRight:[1,0], ArrowUp:[0,-1], ArrowDown:[0,1]};
  let crop;
  if (detail) {
    const [left, top, right, bottom] = detail.bounds;
    const width = right - left;
    const height = bottom - top;
    const [pixelWidth, pixelHeight] = detail.pixels;
    const move = (x, y) => setPending([clamp(x, left, right), clamp(y, top, bottom)]);
    const project = ([x, y]) => [1000 * (x - left) / width, 1000 * (y - top) / height];
    const [x, y] = project(pending);
    const distance = ([u, v]) => Math.hypot((u - x) * pixelWidth, (v - y) * pixelHeight);
    const closest = detail.vertices.reduce((best, vertex) =>
      best && distance(project(best)) <= distance(project(vertex)) ? best : vertex, null);

    crop = <>
      <p className="sf-caption">Click the crop or use the arrow keys to move the marker one image pixel.</p>
      <button type="button" className="sf-ruler-crop" aria-label={label+' on the magnified drawing'}
        style={{maxWidth:pixelWidth}}
        onClick={event => {
          if (!event.detail) return;
          const rect = event.currentTarget.getBoundingClientRect();
          move(left + width * (event.clientX - rect.left) / rect.width,
            top + height * (event.clientY - rect.top) / rect.height);
        }}
        onKeyDown={event => {
          const direction = directions[event.key];
          if (!direction) return;
          event.preventDefault();
          move(pending[0] + direction[0] * width / pixelWidth,
            pending[1] + direction[1] * height / pixelHeight);
        }}>
        <img src={detail.image} alt="" width={pixelWidth} height={pixelHeight} draggable={false}/>
        <svg viewBox="0 0 1000 1000" preserveAspectRatio="none" aria-hidden="true">
          {detail.vertices.map(vertex => {
            const [cx, cy] = project(vertex);
            return <circle key={vertex.join(',')} className="sf-ruler-vertex" cx={cx} cy={cy} r="10"/>;
          })}
          <path d={`M${x-42} ${y}h84M${x} ${y-42}v84`}/>
          <circle className="sf-ruler-marker" cx={x} cy={y} r="18"/>
        </svg>
      </button>
      {closest && <button type="button" onClick={() => setPending(closest)}>Snap to nearest PDF vertex</button>}
    </>;
  }
  return <section className="sf-ruler-detail" aria-label={label}>
    <strong>{label}</strong>
    {error ? <p role="alert" className="sf-flag">{error}</p> :
      crop ?? <p role="status">Reading drawing detail…</p>}
    <div className="sf-inline">
      <button type="button" disabled={!detail} onClick={() => onApply(pending)}>Apply point</button>
      <button type="button" onClick={onClose}>Cancel</button>
    </div>
  </section>;
}

export function CalibrationPreview({ctx, endpoint, scale}) {
  const [state, setState] = useState(null);
  const complete = scale.points.length === 2 && scale.check?.points.length === 2 &&
    Number(scale.metres) > 0 && Number(scale.check.metres) > 0;
  const payload = complete ? JSON.stringify(scale) : null;
  useEffect(() => {
    if (!payload) return;
    let active = true;
    const timer = setTimeout(() => {
      ctx.rest(endpoint+'/calibration', {method:'POST', body:JSON.parse(payload)})
        .then(result => {if (active) setState({payload, check:result.check});})
        .catch(exc => {if (active) setState({payload, error:exc.message});});
    }, 200);
    return () => {active = false; clearTimeout(timer);};
  }, [ctx, endpoint, payload]);

  if (!payload) return null;
  if (state?.payload !== payload) return <p className="sf-caption" role="status">Checking the scale…</p>;
  if (state.error) return <p className="sf-caption sf-flag" role="status">{state.error}</p>;
  const check = state.check;
  const format = value => value.toLocaleString(undefined, {maximumFractionDigits:4});
  return <p className={'sf-calibration'+(check.review ? ' sf-flag' : '')} role="status">
    <strong>{check.review ? 'Review scale' : 'Scale check within 2%'}</strong>
    <span>{format(check.calculated_m)} m measured · {format(check.expected_m)} m expected · {format(check.difference_pct)}% difference</span>
  </p>;
}
