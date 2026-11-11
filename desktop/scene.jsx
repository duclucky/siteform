// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import React, {useEffect, useMemo, useRef, useState} from 'react';
import * as THREE from 'three';
import {OrbitControls} from 'three/addons/controls/OrbitControls.js';
import {sheetPlacement} from './underlay.js';

import {buildingMesh, palette} from './massing.js';
import {roofNames} from './roof-fields.jsx';

function setup(container, buildings, sheetImage, placement, onSelect, onSource, compact, overlay) {
  const renderer = new THREE.WebGLRenderer({antialias:true, alpha:true});
  renderer.shadowMap.enabled = true;
  renderer.shadowMap.type = THREE.PCFShadowMap;
  renderer.shadowMap.autoUpdate = false;
  renderer.shadowMap.needsUpdate = true;
  try {
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(37, 1, 0.1, 100000);
    const orbit = new OrbitControls(camera, renderer.domElement);
    orbit.enableZoom = !compact;
    const model = new THREE.Group();
    scene.add(model, new THREE.HemisphereLight(0xf3f8fc, 0x88969a, 1.55));
    const sunlight = new THREE.DirectionalLight(0xfff4e7, 2.1);
    sunlight.castShadow = true;
    scene.add(sunlight, sunlight.target);

    const meshes = buildings.map((building, index) => {
      const mesh = buildingMesh(building,index);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({
        color:0x394854, transparent:true, opacity:.38,
      })));
      model.add(mesh);
      if (building.program) {
        const {floors,floor_height_m:step} = building.program;
        const positions = [];
        const stride = Math.ceil(floors/40);
        for (let level=stride;level<floors;level+=stride) {
          for (const ring of [building.footprint,...(building.courtyards ?? [])]) {
            ring.forEach(([x,z],i) => {
              const [u,v] = ring[(i+1)%ring.length];
              positions.push(x,level*step,z,u,level*step,v);
            });
          }
        }
        const geometry = new THREE.BufferGeometry().setAttribute('position',new THREE.Float32BufferAttribute(positions,3));
        mesh.add(new THREE.LineSegments(geometry,new THREE.LineBasicMaterial({color:0x30475e,transparent:true,opacity:.45})));
      }
      return mesh;
    });
    const modelBounds = new THREE.Box3().setFromObject(model);
    for (const building of overlay?.buildings ?? []) {
      const mesh = buildingMesh(building);
      const edge = new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), new THREE.LineBasicMaterial({
        color:0x9a3412, depthTest:false, transparent:true, opacity:.75,
      }));
      edge.position.set(overlay.dx,0,overlay.dz);
      edge.renderOrder = 2;
      model.add(edge);
      mesh.geometry.dispose();
      mesh.material.forEach(material => material.dispose());
    }
    if (overlay) modelBounds.setFromObject(model);
    const size = modelBounds.getSize(new THREE.Vector3());
    const span = Math.max(size.x, size.y, size.z, 3);
    camera.near = span / 10000;
    camera.far = span * 40;
    camera.updateProjectionMatrix();
    const centre = modelBounds.getCenter(new THREE.Vector3());
    sunlight.position.copy(centre).add(new THREE.Vector3(-span*.70, span*1.35, span*.95));
    sunlight.target.position.copy(centre);
    sunlight.shadow.camera.left = sunlight.shadow.camera.bottom = -span;
    sunlight.shadow.camera.right = sunlight.shadow.camera.top = span;
    sunlight.shadow.camera.near = span*.1;
    sunlight.shadow.camera.far = span*4;
    sunlight.shadow.camera.updateProjectionMatrix();
    sunlight.shadow.mapSize.set(2048,2048);
    sunlight.shadow.normalBias = span*.0007;
    sunlight.shadow.bias = -.00025;
    sunlight.shadow.radius = 2.5;
    sunlight.shadow.intensity = .68;

    const [left, top, width, height] = placement.world;
    const ground = new THREE.Vector3(left+width/2,0,top+height/2);
    const boardDepth = span*.015;
    const board = new THREE.Mesh(new THREE.BoxGeometry(width,boardDepth,height),
      new THREE.MeshStandardMaterial({color:0xa3a9a6, roughness:.98}));
    board.position.copy(ground).setY(-boardDepth/2-span*.001);
    scene.add(board);

    const floor = new THREE.Mesh(new THREE.PlaneGeometry(width,height), new THREE.MeshStandardMaterial({
      color:0xd6d9d0, roughness:1,
    }));
    floor.rotation.x = -Math.PI / 2;
    floor.position.copy(ground).setY(-span*.0005);
    floor.receiveShadow = true;
    scene.add(floor);

    const stage = new THREE.Mesh(new THREE.PlaneGeometry(span*24,span*24),
      new THREE.ShadowMaterial({opacity:.22}));
    stage.rotation.x = -Math.PI / 2;
    stage.position.copy(ground).setY(-boardDepth-span*.002);
    stage.receiveShadow = true;
    scene.add(stage);

    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    const canvas = renderer.domElement;
    canvas.setAttribute('aria-label', 'Interactive 3D massing');
    container.replaceChildren(canvas);
    const draw = () => renderer.render(scene, camera);
    let disposed = false;
    let sourceVisible = false;
    let sourceReady = false;
    const showSource = visible => {
      sourceVisible = visible;
      floor.material.map = visible && sourceReady ? texture : null;
      floor.material.needsUpdate = true;
      draw();
    };
    const texture = new THREE.TextureLoader().load(sheetImage, loaded => {
      if (disposed) return;
      const [x0,y0,x1,y1] = placement.crop;
      loaded.colorSpace = THREE.SRGBColorSpace;
      loaded.offset.set(x0,1-y1);
      loaded.repeat.set(x1-x0,y1-y0);
      loaded.anisotropy = Math.min(8,renderer.capabilities.getMaxAnisotropy());
      sourceReady = true;
      showSource(sourceVisible);
      onSource('ready');
    }, undefined, () => {if (!disposed) onSource('unavailable');});
    const boardBounds = new THREE.Box3().setFromObject(board).union(modelBounds);
    const viewDirection = new THREE.Vector3(-.74,1.23,-1.12).normalize();
    const fit = bounds => {
      const target = bounds.getCenter(new THREE.Vector3());
      camera.position.copy(target).add(viewDirection);
      camera.lookAt(target);
      const inverse = camera.quaternion.clone().invert();
      const vertical = Math.tan(THREE.MathUtils.degToRad(camera.fov/2)) * .89;
      const horizontal = vertical * camera.aspect;
      let distance = span*.035;
      for (const x of [bounds.min.x,bounds.max.x]) {
        for (const y of [bounds.min.y,bounds.max.y]) {
          for (const z of [bounds.min.z,bounds.max.z]) {
            const corner = new THREE.Vector3(x,y,z).sub(target).applyQuaternion(inverse);
            distance = Math.max(distance, corner.z + Math.abs(corner.x)/horizontal,
              corner.z + Math.abs(corner.y)/vertical);
          }
        }
      }
      camera.position.copy(target).addScaledVector(viewDirection,distance);
      orbit.target.copy(target);
      orbit.update();
      draw();
    };
    orbit.maxDistance = span * 12;
    const resize = () => {
      const width = Math.max(1,container.clientWidth);
      const height = Math.max(1,container.clientHeight);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width,height);
    };
    resize();
    const observer = new ResizeObserver(() => {resize(); draw();});
    observer.observe(container);
    orbit.addEventListener('change', draw);

    const ray = new THREE.Raycaster();
    let pressed;
    const pointerDown = event => {
      pressed = event.button === 0 ? [event.clientX,event.clientY] : null;
    };
    const pointerUp = event => {
      const start = pressed;
      pressed = null;
      if (!start || event.button !== 0 || Math.hypot(event.clientX-start[0],event.clientY-start[1]) > 5) return;
      const rect = canvas.getBoundingClientRect();
      ray.setFromCamera({
        x:(event.clientX-rect.left)/rect.width*2-1,
        y:1-(event.clientY-rect.top)/rect.height*2,
      }, camera);
      onSelect(ray.intersectObjects(meshes, false)[0]?.object.userData.code ?? null);
    };
    canvas.addEventListener('pointerdown',pointerDown);
    canvas.addEventListener('pointerup',pointerUp);
    fit(boardBounds);
    return {
      showSource,
      reset:() => fit(boardBounds),
      zoom(factor) {
        camera.position.sub(orbit.target).multiplyScalar(factor).add(orbit.target);
        orbit.update();
        draw();
      },
      rotate() {
        camera.position.sub(orbit.target).applyAxisAngle(camera.up, Math.PI/8).add(orbit.target);
        orbit.update();
        draw();
      },
      focus(code) {
        const mesh = meshes.find(mesh => mesh.userData.code === code);
        if (mesh) fit(new THREE.Box3().setFromObject(mesh));
      },
      select(code) {
        for (const mesh of meshes) {
          const active = mesh.userData.code === code;
          for (const material of mesh.material) material.emissive.set(active ? 0x4f2713 : 0);
          mesh.children[0].material.color.set(active ? 0x914820 : 0x394854);
          mesh.children[0].material.opacity = active ? 1 : .38;
        }
        draw();
      },
      dispose() {
        disposed = true;
        observer.disconnect();
        orbit.dispose();
        canvas.removeEventListener('pointerdown',pointerDown);
        canvas.removeEventListener('pointerup',pointerUp);
        scene.traverse(object => {
          object.geometry?.dispose();
          if (Array.isArray(object.material)) object.material.forEach(material => material.dispose());
          else object.material?.dispose();
        });
        sunlight.shadow.dispose();
        texture.dispose();
        renderer.dispose();
        renderer.forceContextLoss();
        canvas.remove();
      },
    };
  } catch (error) {
    renderer.dispose();
    renderer.domElement.remove();
    throw error;
  }
}

const footprintPath = item => [item.footprint,...(item.courtyards ?? [])].map(ring => 'M'+ring.join(' L')+' Z').join(' ');

function Plan({buildings, sheet, placement, showSource, selected, onSelect, overlay, parcel, feasibleRegion}) {
  const [measuring, setMeasuring] = useState(false);
  const [points, setPoints] = useState([]);
  const [x,y,width,height] = placement.source;
  const [left,top,cropWidth,cropHeight] = placement.world;
  const viewBox = placement.world.join(' ');
  const mark = event => {
    if (!measuring) return;
    const transform = event.currentTarget.getScreenCTM();
    if (!transform) return;
    const point = new DOMPoint(event.clientX,event.clientY).matrixTransform(transform.inverse());
    if (point.x < left || point.x > left+cropWidth || point.y < top || point.y > top+cropHeight) return;
    setPoints(current => current.length === 1 ? [...current,[point.x,point.y]] : [[point.x,point.y]]);
  };
  const distance = points.length === 2 ? Math.hypot(points[1][0]-points[0][0],points[1][1]-points[0][1]) : null;
  return <>
  <div className="sf-inline sf-plan-ruler">
    <button type="button" aria-pressed={measuring} onClick={() => setMeasuring(value => !value)}>Measure distance</button>
    {points.length > 0 && <button type="button" onClick={() => setPoints([])}>Clear measurement</button>}
    <output aria-live="polite">{distance !== null ? distance.toFixed(2)+' m' :
      measuring ? (points.length ? 'Select the end point.' : 'Select the start point.') : ''}</output>
  </div>
  <svg className={'sf-plan'+(measuring ? ' sf-measuring' : '')} role="img" aria-label="2D footprint plan" viewBox={viewBox}
    onClick={mark}>
    {showSource && <svg x={left} y={top} width={cropWidth} height={cropHeight} viewBox={viewBox} overflow="hidden">
      <image href={sheet.image} x={x} y={y} width={width} height={height}
        preserveAspectRatio="none" data-testid="plan-source-layer"/>
    </svg>}
    {parcel && <g pointerEvents="none">
      <polygon points={parcel.boundary.join(' ')} className="sf-parcel" vectorEffect="non-scaling-stroke"/>
      {parcel.exclusions.map((ring,i) => <polygon key={i} points={ring.join(' ')}
        className="sf-exclusion" vectorEffect="non-scaling-stroke"/>)}
    </g>}
    {feasibleRegion && <g pointerEvents="none" aria-label="Parcel buildable region">
      {feasibleRegion.polygons.map((item,index) => <path key={index}
        d={footprintPath({footprint:item.boundary,courtyards:item.holes})} fillRule="evenodd"
        fill="#14b8a6" fillOpacity=".22" stroke="#0f766e" strokeWidth="2" strokeDasharray="5 3"
        vectorEffect="non-scaling-stroke"/>)}
    </g>}
    {buildings.map((item, i) => <path key={item.code} fillRule="evenodd"
      fill={palette[i % palette.length]} fillOpacity={selected === item.code ? '.8' : '.48'}
      stroke={selected === item.code ? (showSource ? '#a16207' : '#fbbf24') : (showSource ? '#1e3a5f' : '#dbeafe')} strokeWidth={selected === item.code ? '3' : '1'}
      vectorEffect="non-scaling-stroke" d={footprintPath(item)}
      onClick={() => {if (!measuring) onSelect(item.code);}}><title>{item.code}</title></path>)}
    {overlay && <g transform={'translate('+overlay.dx+' '+overlay.dz+')'} pointerEvents="none">
      {overlay.buildings.map(item => <path key={item.code} d={footprintPath(item)}
        stroke="#f97316" strokeWidth="2" strokeDasharray="6 4" fill="none" vectorEffect="non-scaling-stroke"/>)}
    </g>}
    <polyline points={points.join(' ')} stroke="#be123c" strokeWidth="3" vectorEffect="non-scaling-stroke" fill="none"/>
    {points.map(([px,py],i) => <circle key={i} cx={px} cy={py} r={cropWidth*.006} fill="#be123c" stroke="white"
      strokeWidth="1" vectorEffect="non-scaling-stroke"/>)}
  </svg>
  </>;
}

function DrawingEvidence({item, draft, sheet}) {
  const [width,height] = sheet.size;
  const points = draft.outline.map(([x,y]) => [x*width,y*height]);
  const xs = points.map(([x]) => x), ys = points.map(([,y]) => y);
  const left = Math.min(...xs), top = Math.min(...ys);
  const w = Math.max(...xs)-left, h = Math.max(...ys)-top;
  const pad = Math.max(w,h)*.2;
  return <details className="sf-review">
    <summary>Drawing evidence for {item.code}</summary>
    <svg className="sf-evidence-crop" role="img" aria-label={'Source outline for '+item.code}
      viewBox={[left-pad,top-pad,w+2*pad,h+2*pad].join(' ')}>
      <image href={sheet.image} width={width} height={height}/>
      <polygon points={points.join(' ')} fill="#f59e0b30" stroke="#b45309" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
      {item.label_evidence && (item.label_evidence.kind !== 'height_table' || item.label_evidence.marker_bounds) && (() => {
        const [x0,y0,x1,y1] = item.label_evidence.marker_bounds ?? item.label_evidence.bounds;
        return <rect x={x0*width} y={y0*height} width={(x1-x0)*width} height={(y1-y0)*height}
          stroke="#be123c" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke"/>;
      })()}
    </svg>
    {item.label_evidence?.kind === 'height_table' && (() => {
      const [x0,y0,x1,y1] = item.label_evidence.bounds;
      const rowPad = Math.max((y1-y0)*height*.75,2);
      return <svg className="sf-evidence-crop" role="img" aria-label={'Height table evidence for '+item.code}
        viewBox={[x0*width-rowPad,y0*height-rowPad,(x1-x0)*width+2*rowPad,(y1-y0)*height+2*rowPad].join(' ')}>
        <image href={sheet.image} width={width} height={height}/>
        <rect x={x0*width} y={y0*height} width={(x1-x0)*width} height={(y1-y0)*height}
          stroke="#be123c" fill="none" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
      </svg>;
    })()}
    <p>Outline: {item.method === 'traced' ? 'operator trace' : 'verified PDF vectors'}. Height: operator-confirmed input.
      Footprint and volume: calculated from the confirmed geometry.</p>
    {item.label_evidence && <p>Confirmed {item.label_evidence.method === 'ocr' ? 'OCR' : 'PDF text'} label · {item.label_evidence.text}</p>}
  </details>;
}

export function Massing({scene, sheet, title='Project massing', compact=false, focus=null, visible=true, compare=null, actions, feasibleRegion=null, initialPlan=false}) {
  const container = useRef(null);
  const viewer = useRef(null);
  const [flat, setFlat] = useState(initialPlan);
  const [fallback, setFallback] = useState(false);
  const [source, setSource] = useState(true);
  const [sourceStatus, setSourceStatus] = useState('loading');
  const [selected, setSelected] = useState(null);
  const plan = flat || fallback;
  const placement = useMemo(() => sheetPlacement(sheet, scene), [sheet, scene]);
  const overlay = useMemo(() => {
    if (!compare) return null;
    const other = sheetPlacement(sheet, compare);
    return {buildings:compare.buildings, dx:placement.source[0]-other.source[0], dz:placement.source[1]-other.source[1]};
  }, [sheet, placement, compare]);
  const current = scene.buildings.find(item => item.code === selected);
  const flags = scene.buildings.filter(item => item.difference_pct >= 1).length;
  const BuildingDetails = compact ? 'details' : 'div';

  useEffect(() => {
    if (plan || !visible) return;
    setSourceStatus('loading');
    try {
      viewer.current = setup(container.current, scene.buildings, sheet.image, placement, setSelected, setSourceStatus, compact, overlay);
    } catch {
      setFallback(true);
    }
    return () => {viewer.current?.dispose(); viewer.current = null;};
  }, [plan, scene, sheet, placement, compact, visible, overlay]);
  useEffect(() => {viewer.current?.showSource(source);}, [plan, source, scene, placement, visible, overlay]);
  useEffect(() => {viewer.current?.select(selected);}, [plan, selected, scene, placement, visible, overlay]);
  useEffect(() => {
    if (focus && scene.buildings.some(item => item.code === focus.code)) {
      setSelected(focus.code);
      viewer.current?.focus(focus.code);
    }
  }, [focus, scene]);

  return <section className="sf-card sf-results">
    <div className="sf-bar">
      <div><p className="sf-kicker">{compact ? 'SiteForm / 3D preview' : '04 / Saved model'}</p><h2>{title}</h2></div>
      <div className="sf-inline">
        <button aria-pressed={source} onClick={() => setSource(!source)}
          disabled={!plan && sourceStatus==='unavailable'}>Source sheet</button>
        <button onClick={() => setFlat(!flat)} disabled={fallback}>{flat ? 'View 3D' : 'View plan'}</button>
        {!plan && <button onClick={() => viewer.current?.reset()}>Reset camera</button>}
      </div>
    </div>
    <div className="sf-model-summary">
      <span><strong>{scene.buildings.length}</strong> confirmed buildings</span>
      <span>{flags ? <strong className="sf-flag">{flags} to review</strong> : 'No area flags'}</span>
      <span>{source ? 'Source layer on' : 'Source layer off'}</span>
      <span>Revision {scene.revision.slice(0,8)}</span>
      {overlay && <span>Orange outline · comparison model</span>}
    </div>
    {scene.site_metrics && <details className="sf-review">
      <summary>Parcel and floor quantities</summary>
      {Object.entries({
        'Parcel area (m²)':scene.site_metrics.parcel_area_m2,
        'Union footprint (m²)':scene.site_metrics.union_footprint_m2,
        'Gross floor area estimate (m²)':scene.site_metrics.gross_floor_area_m2,
        'Parcel coverage (%)':scene.site_metrics.coverage_pct,
        'Floor area ratio':scene.site_metrics.far,
      }).map(([label,value]) => <p key={label}>{label} · {value == null ? 'Unknown' :
        value.toLocaleString(undefined,{maximumFractionDigits:3})}</p>)}
      {scene.parcel && <p>Boundary reference · {scene.parcel.reference}</p>}
      <p className="sf-caption">Coverage uses the union inside the parcel. Floor area uses confirmed counts and full floor plates.</p>
    </details>}
    {scene.calibration_check && <p className={scene.calibration_check.review ? 'sf-flag' : 'sf-caption'}>
      Independent scale check · {scene.calibration_check.calculated_m} m measured vs {scene.calibration_check.expected_m} m known
      {' · '}{scene.calibration_check.difference_pct}% difference{scene.calibration_check.review && ' · Review the scale'}
    </p>}
    {feasibleRegion && plan && <p className="sf-caption">Teal region · {feasibleRegion.area_m2.toLocaleString()} m²
      after parcel setback and exclusions. Building clearances are checked for each tested position.</p>}
    {plan ? <Plan buildings={scene.buildings} sheet={sheet} placement={placement}
      showSource={source} selected={selected} onSelect={setSelected} overlay={overlay} parcel={scene.parcel} feasibleRegion={feasibleRegion}/> :
      <div ref={container} className="sf-viewport" data-source-state={sourceStatus}/>}
    {compact && !plan && <div className="sf-inline sf-chat-camera">
      <button onClick={() => viewer.current?.rotate()}>Rotate view</button>
      <button onClick={() => viewer.current?.zoom(.8)}>Zoom in</button>
      <button onClick={() => viewer.current?.zoom(1.25)}>Zoom out</button>
    </div>}
    <p>{fallback ? '3D is unavailable on this device. Showing the measured 2D plan.' :
      flat ? 'Select a footprint or building ID to inspect it.' :
      compact ? 'Select a building · Drag to orbit · Right-drag to pan' :
        'Select a building · Drag to orbit · Scroll to zoom · Right-drag to pan'}</p>
    {!plan && source && sourceStatus === 'unavailable' && <p role="status">The source image could not load.</p>}
    {current && <div className="sf-inspect" aria-label="Selected building">
      <div>
        <strong>{current.code}</strong> · {current.height_m} m high · {current.area_m2.toFixed(2)} m²
        {current.program && <span> · {current.program.floors} floors{current.program.use && ' · '+current.program.use}</span>}
        {current.roof && <span> · {roofNames[current.roof.kind]} · {
          current.roof.basis === 'illustrative' ? 'Illustrative' : 'Entered from drawing'
        }{current.roof.note && ' · '+current.roof.note}</span>}
        {current.difference_pct >= 1 && <strong className="sf-flag"> · {current.difference_pct.toFixed(2)}% area difference</strong>}
      </div>
      <div className="sf-inline">
        {!plan && <button onClick={() => viewer.current?.focus(current.code)}>Focus building</button>}
        <button onClick={() => setSelected(null)}>Clear selection</button>
        {actions?.(current)}
      </div>
    </div>}
    {current && <DrawingEvidence key={current.code} item={current}
      draft={scene.draft.buildings.find(item => item.code === current.code)} sheet={sheet}/>}
    <BuildingDetails className="sf-table">{compact && <summary>Building details</summary>}<table aria-label="Confirmed buildings">
      <thead><tr><th>Building</th><th>Height</th><th>Footprint</th><th>Source</th><th>Roof</th><th>Area check</th></tr></thead>
      <tbody>{scene.buildings.map((item, i) => <tr key={item.code} className={selected === item.code ? 'sf-picked' : undefined}>
        <th><button className="sf-building-button" aria-pressed={selected === item.code} onClick={() => setSelected(item.code)}>
          <i aria-hidden="true" style={{background:palette[i % palette.length]}}/>{item.code}
        </button></th>
        <td>{item.height_m} m</td><td>{item.area_m2.toFixed(2)} m²</td>
        <td>{item.method === 'traced' ? 'Manually traced' : 'PDF vectors'}</td>
        <td>{item.roof ? roofNames[item.roof.kind]+(item.roof.basis === 'illustrative' ? ' · Illustrative' : '') : 'Flat massing'}</td>
        <td>{item.difference_pct == null ? 'No reference' : <>
          {item.difference_pct.toFixed(2)}% from {item.printed_area_m2} m²
          {item.difference_pct >= 1 && <strong className="sf-flag"> · Review</strong>}
        </>}</td>
      </tr>)}</tbody>
    </table></BuildingDetails>
    <p>{scene.source.name} · Sheet {scene.source.page} · {scene.limits}</p>
  </section>;
}
