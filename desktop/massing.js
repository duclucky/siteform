// SPDX-License-Identifier: AGPL-3.0-only
// Copyright (c) 2026 SiteForm contributors
import * as THREE from 'three';

export const palette = ['#91a8ac', '#a6a9b8', '#719890', '#ba9a81', '#a8a78c', '#ab8f97', '#7e99ac'];

const cross = (a,b,c) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]);
const edgeNext = (points, index) => points[(index+1) % points.length];

function pitchedProfile(points, height, roof) {
  const angle = THREE.MathUtils.degToRad(roof.angle_deg);
  const gable = roof.kind === 'gable';
  const dx = gable ? -Math.sin(angle) : Math.cos(angle);
  const dz = gable ? Math.cos(angle) : Math.sin(angle);
  const project = ([x,z]) => dx*x + dz*z;
  const bounds = points.map(project);
  const low = Math.min(...bounds), high = Math.max(...bounds);
  const middle = (low+high)/2;
  const span = high-low;
  const side = point => {
    const offset = project(point)-middle;
    return Math.abs(offset) < span*1e-10 ? 0 : offset;
  };
  return {
    gable, side,
    elevation(point) {
      const loss = gable ? 2*Math.abs(side(point))/span : (high-project(point))/span;
      return height-roof.rise_m*loss;
    },
  };
}

function ridgeCrossing(a, b, side) {
  const av = side(a), bv = side(b);
  if (av*bv >= 0) return null;
  const t = av/(av-bv);
  return [a[0]+(b[0]-a[0])*t, a[1]+(b[1]-a[1])*t];
}

function clipAtRidge(points, side, sign) {
  const result = [];
  points.forEach((a,i) => {
    const b = edgeNext(points,i);
    if (side(a)*sign >= 0) result.push(a);
    const crossing = ridgeCrossing(a,b,side);
    if (crossing) result.push(crossing);
  });
  return result;
}

function orientedRing(footprint) {
  const points = footprint.filter((point,i) =>
    Math.abs(cross(footprint[(i+footprint.length-1)%footprint.length],point,edgeNext(footprint,i))) > 1e-10);
  const area2 = points.reduce((sum,[x,z],i) => {
    const [nextX,nextZ] = edgeNext(points,i);
    return sum+x*nextZ-z*nextX;
  },0);
  if (area2 < 0) points.reverse();
  return points;
}

function pitchedGeometry(footprint, height, roof) {
  const points = orientedRing(footprint);
  const profile = pitchedProfile(points,height,roof);
  const triangles = THREE.ShapeUtils.triangulateShape(points.map(([x,z]) => new THREE.Vector2(x,z)),[]);
  const cap = [], wall = [];
  const low = ([x,z]) => [x,0,z];
  const high = point => [point[0],profile.elevation(point),point[1]];
  for (const indices of triangles) {
    const ring = indices.map(i => points[i]);
    if (cross(...ring) < 0) ring.reverse();
    const pieces = profile.gable ? [clipAtRidge(ring,profile.side,1),clipAtRidge(ring,profile.side,-1)] : [ring];
    for (const piece of pieces) {
      const a = piece[0];
      for (let i=1;i<piece.length-1;i++) {
        const b = piece[i], c = piece[i+1];
        if (Math.abs(cross(a,b,c)) < 1e-10) continue;
        cap.push(...high(a),...high(c),...high(b),...low(a),...low(b),...low(c));
      }
    }
  }
  points.forEach((a,i) => {
    const b = edgeNext(points,i);
    const crossing = profile.gable ? ridgeCrossing(a,b,profile.side) : null;
    const rim = crossing ? [[a,crossing],[crossing,b]] : [[a,b]];
    for (const [start,end] of rim) {
      wall.push(...low(start),...high(start),...high(end),...low(start),...high(end),...low(end));
    }
  });
  return groupedGeometry(cap,wall);
}

function planarCap(cap, rim, holes, y, up) {
  const vectors = points => points.map(([x,z]) => new THREE.Vector2(x,z));
  const all = [...rim,...holes.flat()];
  for (const triangle of THREE.ShapeUtils.triangulateShape(vectors(rim),holes.map(vectors))) {
    const ring = triangle.map(index => all[index]);
    if ((cross(...ring) > 0) === up) ring.reverse();
    for (const [x,z] of ring) cap.push(x,y,z);
  }
}

function levelWalls(wall, rim, bottom, top) {
  rim.forEach(([x,z],i) => {
    const [u,v] = edgeNext(rim,i);
    wall.push(x,bottom,z, x,top,z, u,top,v, x,bottom,z, u,top,v, u,bottom,v);
  });
}

function steppedGeometry(footprint,height,roof) {
  const rim = orientedRing(footprint);
  const [cx,cz] = rim.reduce(([x,z],[u,v]) => [x+u/rim.length,z+v/rim.length],[0,0]);
  const ratio = roof.upper_scale_pct/100;
  const upper = rim.map(([x,z]) => [cx+(x-cx)*ratio,cz+(z-cz)*ratio]);
  const shoulder = height-roof.rise_m;
  const cap = [], wall = [];
  planarCap(cap,rim,[],0,false);
  planarCap(cap,rim,[upper],shoulder,true);
  planarCap(cap,upper,[],height,true);
  levelWalls(wall,rim,0,shoulder);
  levelWalls(wall,upper,shoulder,height);
  return groupedGeometry(cap,wall);
}

function groupedGeometry(cap,wall) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute('position',new THREE.Float32BufferAttribute([...cap,...wall],3));
  geometry.addGroup(0,cap.length/3,0);
  geometry.addGroup(cap.length/3,wall.length/3,1);
  geometry.computeVertexNormals();
  return geometry;
}

export function buildingGeometry({footprint,height_m,roof,courtyards=[]}) {
  if (roof?.kind === 'stepped') return steppedGeometry(footprint,height_m,roof);
  if (roof) return pitchedGeometry(footprint,height_m,roof);
  const shape = new THREE.Shape();
  const exterior = courtyards.length ? orientedRing(footprint) : footprint;
  exterior.forEach(([x,z],i) => i ? shape.lineTo(x,-z) : shape.moveTo(x,-z));
  shape.closePath();
  for (const ring of courtyards) {
    const hole = new THREE.Path();
    orientedRing(ring).reverse().forEach(([x,z],i) => i ? hole.lineTo(x,-z) : hole.moveTo(x,-z));
    hole.closePath();
    shape.holes.push(hole);
  }
  const geometry = new THREE.ExtrudeGeometry(shape,{depth:height_m,bevelEnabled:false});
  geometry.rotateX(-Math.PI/2);
  return geometry;
}

export function buildingMesh(building,index=0) {
  const color = new THREE.Color(palette[index % palette.length]);
  const roof = new THREE.MeshStandardMaterial({
    color:color.clone().lerp(new THREE.Color('#f3efe5'),.30),roughness:.92,
  });
  const walls = new THREE.MeshStandardMaterial({color,roughness:.93});
  const mesh = new THREE.Mesh(buildingGeometry(building),[roof,walls]);
  mesh.name = building.code;
  mesh.userData = {code:building.code, maxHeightMetres:building.height_m,
    roof:building.roof ?? null, footprintMethod:building.method, program:building.program ?? null};
  return mesh;
}
