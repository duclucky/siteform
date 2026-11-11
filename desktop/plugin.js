/*! SiteForm: AGPL-3.0-only. Copyright (c) 2026 SiteForm contributors. See LICENSE and THIRD_PARTY_NOTICES.md. */
var Pg=Object.defineProperty;var Rg=(n,e)=>{for(var t in e)Pg(n,t,{get:e[t],enumerable:!0})};import G,{useEffect as El,useLayoutEffect as Mg,useRef as fv,useState as ft}from"react";import*as bi from"@hermes/plugin-sdk";import Ne,{useEffect as fh,useRef as Qm,useState as Gi}from"react";var or={LEFT:0,MIDDLE:1,RIGHT:2,ROTATE:0,DOLLY:1,PAN:2},ar={ROTATE:0,PAN:1,DOLLY_PAN:2,DOLLY_ROTATE:3},Sh=0,Il=1,wh=2;var Br=1,Th=2,Xi=3,wi=0,It=1,fi=2,Fi=0,un=1,Pl=2,Rl=3,Ll=4,Eh=5,fn=100,Ah=101,Ch=102,Ih=103,Ph=104,Rh=200,Lh=201,Dh=202,Nh=203,Vs=204,Hs=205,Uh=206,Fh=207,Oh=208,Bh=209,kh=210,zh=211,Vh=212,Hh=213,Gh=214,ra=0,sa=1,oa=2,Nn=3,aa=4,la=5,ca=6,ha=7,kr=0,Wh=1,Xh=2,Oi=0,qh=1,Yh=2,Zh=3,Jh=4,Kh=5,jh=6,$h=7;var ua=300,Ti=301,qi=302,zr=303,Vr=304,dn=306,Un=1e3,si=1001,Fn=1002,Ot=1003,Gs=1004;var On=1005;var Bt=1006,lr=1007;var di=1008;var Zt=1009,fa=1010,da=1011,pn=1012,Hr=1013,gi=1014,Jt=1015,rn=1016,Gr=1017,Wr=1018,mn=1020,pa=35902,ma=35899,ga=1021,xa=1022,Dt=1023,gn=1026,xn=1027,Ws=1028,cr=1029,_a=1030,Xr=1031;var qr=1033,Yr=33776,Zr=33777,Jr=33778,Kr=33779,Xs=35840,qs=35841,Ys=35842,Zs=35843,Js=36196,Ks=37492,js=37496,$s=37808,Qs=37809,eo=37810,to=37811,io=37812,no=37813,ro=37814,so=37815,oo=37816,ao=37817,lo=37818,co=37819,ho=37820,uo=37821,fo=36492,po=36494,mo=36495,go=36283,xo=36284,_o=36285,yo=36286;var _n=2300,jr=2301,ya=2302,va=2400,ba=2401,Ma=2402;var Qh=3200,eu=3201;var yn=0,tu=1,xi="",kt="srgb",Yi="srgb-linear",hr="linear",ht="srgb";var ur=7680;var Dl=519,iu=512,nu=513,ru=514,Sa=515,su=516,ou=517,au=518,lu=519,vo=35044;var Nl="300 es",Qt=2e3,Bn=2001;var Ht=class{addEventListener(e,t){this._listeners===void 0&&(this._listeners={});let i=this._listeners;i[e]===void 0&&(i[e]=[]),i[e].indexOf(t)===-1&&i[e].push(t)}hasEventListener(e,t){let i=this._listeners;return i===void 0?!1:i[e]!==void 0&&i[e].indexOf(t)!==-1}removeEventListener(e,t){let i=this._listeners;if(i===void 0)return;let r=i[e];if(r!==void 0){let s=r.indexOf(t);s!==-1&&r.splice(s,1)}}dispatchEvent(e){let t=this._listeners;if(t===void 0)return;let i=t[e.type];if(i!==void 0){e.target=this;let r=i.slice(0);for(let s=0,o=r.length;s<o;s++)r[s].call(this,e);e.target=null}}};var oi=["00","01","02","03","04","05","06","07","08","09","0a","0b","0c","0d","0e","0f","10","11","12","13","14","15","16","17","18","19","1a","1b","1c","1d","1e","1f","20","21","22","23","24","25","26","27","28","29","2a","2b","2c","2d","2e","2f","30","31","32","33","34","35","36","37","38","39","3a","3b","3c","3d","3e","3f","40","41","42","43","44","45","46","47","48","49","4a","4b","4c","4d","4e","4f","50","51","52","53","54","55","56","57","58","59","5a","5b","5c","5d","5e","5f","60","61","62","63","64","65","66","67","68","69","6a","6b","6c","6d","6e","6f","70","71","72","73","74","75","76","77","78","79","7a","7b","7c","7d","7e","7f","80","81","82","83","84","85","86","87","88","89","8a","8b","8c","8d","8e","8f","90","91","92","93","94","95","96","97","98","99","9a","9b","9c","9d","9e","9f","a0","a1","a2","a3","a4","a5","a6","a7","a8","a9","aa","ab","ac","ad","ae","af","b0","b1","b2","b3","b4","b5","b6","b7","b8","b9","ba","bb","bc","bd","be","bf","c0","c1","c2","c3","c4","c5","c6","c7","c8","c9","ca","cb","cc","cd","ce","cf","d0","d1","d2","d3","d4","d5","d6","d7","d8","d9","da","db","dc","dd","de","df","e0","e1","e2","e3","e4","e5","e6","e7","e8","e9","ea","eb","ec","ed","ee","ef","f0","f1","f2","f3","f4","f5","f6","f7","f8","f9","fa","fb","fc","fd","fe","ff"],cu=1234567,vn=Math.PI/180,kn=180/Math.PI;function ei(){let n=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(oi[n&255]+oi[n>>8&255]+oi[n>>16&255]+oi[n>>24&255]+"-"+oi[e&255]+oi[e>>8&255]+"-"+oi[e>>16&15|64]+oi[e>>24&255]+"-"+oi[t&63|128]+oi[t>>8&255]+"-"+oi[t>>16&255]+oi[t>>24&255]+oi[i&255]+oi[i>>8&255]+oi[i>>16&255]+oi[i>>24&255]).toLowerCase()}function qe(n,e,t){return Math.max(e,Math.min(t,n))}function wa(n,e){return(n%e+e)%e}function Lg(n,e,t,i,r){return i+(n-e)*(r-i)/(t-e)}function Dg(n,e,t){return n!==e?(t-n)/(e-n):0}function $r(n,e,t){return(1-t)*n+t*e}function Ng(n,e,t,i){return $r(n,e,1-Math.exp(-t*i))}function Ug(n,e=1){return e-Math.abs(wa(n,e*2)-e)}function Fg(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*(3-2*n))}function Og(n,e,t){return n<=e?0:n>=t?1:(n=(n-e)/(t-e),n*n*n*(n*(n*6-15)+10))}function Bg(n,e){return n+Math.floor(Math.random()*(e-n+1))}function kg(n,e){return n+Math.random()*(e-n)}function zg(n){return n*(.5-Math.random())}function Vg(n){n!==void 0&&(cu=n);let e=cu+=1831565813;return e=Math.imul(e^e>>>15,e|1),e^=e+Math.imul(e^e>>>7,e|61),((e^e>>>14)>>>0)/4294967296}function Hg(n){return n*vn}function Gg(n){return n*kn}function Wg(n){return(n&n-1)===0&&n!==0}function Xg(n){return Math.pow(2,Math.ceil(Math.log(n)/Math.LN2))}function qg(n){return Math.pow(2,Math.floor(Math.log(n)/Math.LN2))}function Yg(n,e,t,i,r){let s=Math.cos,o=Math.sin,a=s(t/2),l=o(t/2),c=s((e+i)/2),h=o((e+i)/2),u=s((e-i)/2),d=o((e-i)/2),f=s((i-e)/2),g=o((i-e)/2);switch(r){case"XYX":n.set(a*h,l*u,l*d,a*c);break;case"YZY":n.set(l*d,a*h,l*u,a*c);break;case"ZXZ":n.set(l*u,l*d,a*h,a*c);break;case"XZX":n.set(a*h,l*g,l*f,a*c);break;case"YXY":n.set(l*f,a*h,l*g,a*c);break;case"ZYZ":n.set(l*g,l*f,a*h,a*c);break;default:console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: "+r)}}function zn(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return n/4294967295;case Uint16Array:return n/65535;case Uint8Array:return n/255;case Int32Array:return Math.max(n/2147483647,-1);case Int16Array:return Math.max(n/32767,-1);case Int8Array:return Math.max(n/127,-1);default:throw new Error("Invalid component type.")}}function ti(n,e){switch(e.constructor){case Float32Array:return n;case Uint32Array:return Math.round(n*4294967295);case Uint16Array:return Math.round(n*65535);case Uint8Array:return Math.round(n*255);case Int32Array:return Math.round(n*2147483647);case Int16Array:return Math.round(n*32767);case Int8Array:return Math.round(n*127);default:throw new Error("Invalid component type.")}}var Zi={DEG2RAD:vn,RAD2DEG:kn,generateUUID:ei,clamp:qe,euclideanModulo:wa,mapLinear:Lg,inverseLerp:Dg,lerp:$r,damp:Ng,pingpong:Ug,smoothstep:Fg,smootherstep:Og,randInt:Bg,randFloat:kg,randFloatSpread:zg,seededRandom:Vg,degToRad:Hg,radToDeg:Gg,isPowerOfTwo:Wg,ceilPowerOfTwo:Xg,floorPowerOfTwo:qg,setQuaternionFromProperEuler:Yg,normalize:ti,denormalize:zn};var ie=class n{constructor(e=0,t=0){n.prototype.isVector2=!0,this.x=e,this.y=t}get width(){return this.x}set width(e){this.x=e}get height(){return this.y}set height(e){this.y=e}set(e,t){return this.x=e,this.y=t,this}setScalar(e){return this.x=e,this.y=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y)}copy(e){return this.x=e.x,this.y=e.y,this}add(e){return this.x+=e.x,this.y+=e.y,this}addScalar(e){return this.x+=e,this.y+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this}subScalar(e){return this.x-=e,this.y-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this}multiply(e){return this.x*=e.x,this.y*=e.y,this}multiplyScalar(e){return this.x*=e,this.y*=e,this}divide(e){return this.x/=e.x,this.y/=e.y,this}divideScalar(e){return this.multiplyScalar(1/e)}applyMatrix3(e){let t=this.x,i=this.y,r=e.elements;return this.x=r[0]*t+r[3]*i+r[6],this.y=r[1]*t+r[4]*i+r[7],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this}negate(){return this.x=-this.x,this.y=-this.y,this}dot(e){return this.x*e.x+this.y*e.y}cross(e){return this.x*e.y-this.y*e.x}lengthSq(){return this.x*this.x+this.y*this.y}length(){return Math.sqrt(this.x*this.x+this.y*this.y)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)}normalize(){return this.divideScalar(this.length()||1)}angle(){return Math.atan2(-this.y,-this.x)+Math.PI}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y;return t*t+i*i}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this}equals(e){return e.x===this.x&&e.y===this.y}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this}rotateAround(e,t){let i=Math.cos(t),r=Math.sin(t),s=this.x-e.x,o=this.y-e.y;return this.x=s*i-o*r+e.x,this.y=s*r+o*i+e.y,this}random(){return this.x=Math.random(),this.y=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y}};var Nt=class{constructor(e=0,t=0,i=0,r=1){this.isQuaternion=!0,this._x=e,this._y=t,this._z=i,this._w=r}static slerpFlat(e,t,i,r,s,o,a){let l=i[r+0],c=i[r+1],h=i[r+2],u=i[r+3],d=s[o+0],f=s[o+1],g=s[o+2],x=s[o+3];if(a===0){e[t+0]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u;return}if(a===1){e[t+0]=d,e[t+1]=f,e[t+2]=g,e[t+3]=x;return}if(u!==x||l!==d||c!==f||h!==g){let m=1-a,p=l*d+c*f+h*g+u*x,T=p>=0?1:-1,S=1-p*p;if(S>Number.EPSILON){let C=Math.sqrt(S),M=Math.atan2(C,p*T);m=Math.sin(m*M)/C,a=Math.sin(a*M)/C}let _=a*T;if(l=l*m+d*_,c=c*m+f*_,h=h*m+g*_,u=u*m+x*_,m===1-a){let C=1/Math.sqrt(l*l+c*c+h*h+u*u);l*=C,c*=C,h*=C,u*=C}}e[t]=l,e[t+1]=c,e[t+2]=h,e[t+3]=u}static multiplyQuaternionsFlat(e,t,i,r,s,o){let a=i[r],l=i[r+1],c=i[r+2],h=i[r+3],u=s[o],d=s[o+1],f=s[o+2],g=s[o+3];return e[t]=a*g+h*u+l*f-c*d,e[t+1]=l*g+h*d+c*u-a*f,e[t+2]=c*g+h*f+a*d-l*u,e[t+3]=h*g-a*u-l*d-c*f,e}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get w(){return this._w}set w(e){this._w=e,this._onChangeCallback()}set(e,t,i,r){return this._x=e,this._y=t,this._z=i,this._w=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._w)}copy(e){return this._x=e.x,this._y=e.y,this._z=e.z,this._w=e.w,this._onChangeCallback(),this}setFromEuler(e,t=!0){let i=e._x,r=e._y,s=e._z,o=e._order,a=Math.cos,l=Math.sin,c=a(i/2),h=a(r/2),u=a(s/2),d=l(i/2),f=l(r/2),g=l(s/2);switch(o){case"XYZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"YXZ":this._x=d*h*u+c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"ZXY":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u-d*f*g;break;case"ZYX":this._x=d*h*u-c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u+d*f*g;break;case"YZX":this._x=d*h*u+c*f*g,this._y=c*f*u+d*h*g,this._z=c*h*g-d*f*u,this._w=c*h*u-d*f*g;break;case"XZY":this._x=d*h*u-c*f*g,this._y=c*f*u-d*h*g,this._z=c*h*g+d*f*u,this._w=c*h*u+d*f*g;break;default:console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: "+o)}return t===!0&&this._onChangeCallback(),this}setFromAxisAngle(e,t){let i=t/2,r=Math.sin(i);return this._x=e.x*r,this._y=e.y*r,this._z=e.z*r,this._w=Math.cos(i),this._onChangeCallback(),this}setFromRotationMatrix(e){let t=e.elements,i=t[0],r=t[4],s=t[8],o=t[1],a=t[5],l=t[9],c=t[2],h=t[6],u=t[10],d=i+a+u;if(d>0){let f=.5/Math.sqrt(d+1);this._w=.25/f,this._x=(h-l)*f,this._y=(s-c)*f,this._z=(o-r)*f}else if(i>a&&i>u){let f=2*Math.sqrt(1+i-a-u);this._w=(h-l)/f,this._x=.25*f,this._y=(r+o)/f,this._z=(s+c)/f}else if(a>u){let f=2*Math.sqrt(1+a-i-u);this._w=(s-c)/f,this._x=(r+o)/f,this._y=.25*f,this._z=(l+h)/f}else{let f=2*Math.sqrt(1+u-i-a);this._w=(o-r)/f,this._x=(s+c)/f,this._y=(l+h)/f,this._z=.25*f}return this._onChangeCallback(),this}setFromUnitVectors(e,t){let i=e.dot(t)+1;return i<1e-8?(i=0,Math.abs(e.x)>Math.abs(e.z)?(this._x=-e.y,this._y=e.x,this._z=0,this._w=i):(this._x=0,this._y=-e.z,this._z=e.y,this._w=i)):(this._x=e.y*t.z-e.z*t.y,this._y=e.z*t.x-e.x*t.z,this._z=e.x*t.y-e.y*t.x,this._w=i),this.normalize()}angleTo(e){return 2*Math.acos(Math.abs(qe(this.dot(e),-1,1)))}rotateTowards(e,t){let i=this.angleTo(e);if(i===0)return this;let r=Math.min(1,t/i);return this.slerp(e,r),this}identity(){return this.set(0,0,0,1)}invert(){return this.conjugate()}conjugate(){return this._x*=-1,this._y*=-1,this._z*=-1,this._onChangeCallback(),this}dot(e){return this._x*e._x+this._y*e._y+this._z*e._z+this._w*e._w}lengthSq(){return this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w}length(){return Math.sqrt(this._x*this._x+this._y*this._y+this._z*this._z+this._w*this._w)}normalize(){let e=this.length();return e===0?(this._x=0,this._y=0,this._z=0,this._w=1):(e=1/e,this._x=this._x*e,this._y=this._y*e,this._z=this._z*e,this._w=this._w*e),this._onChangeCallback(),this}multiply(e){return this.multiplyQuaternions(this,e)}premultiply(e){return this.multiplyQuaternions(e,this)}multiplyQuaternions(e,t){let i=e._x,r=e._y,s=e._z,o=e._w,a=t._x,l=t._y,c=t._z,h=t._w;return this._x=i*h+o*a+r*c-s*l,this._y=r*h+o*l+s*a-i*c,this._z=s*h+o*c+i*l-r*a,this._w=o*h-i*a-r*l-s*c,this._onChangeCallback(),this}slerp(e,t){if(t===0)return this;if(t===1)return this.copy(e);let i=this._x,r=this._y,s=this._z,o=this._w,a=o*e._w+i*e._x+r*e._y+s*e._z;if(a<0?(this._w=-e._w,this._x=-e._x,this._y=-e._y,this._z=-e._z,a=-a):this.copy(e),a>=1)return this._w=o,this._x=i,this._y=r,this._z=s,this;let l=1-a*a;if(l<=Number.EPSILON){let f=1-t;return this._w=f*o+t*this._w,this._x=f*i+t*this._x,this._y=f*r+t*this._y,this._z=f*s+t*this._z,this.normalize(),this}let c=Math.sqrt(l),h=Math.atan2(c,a),u=Math.sin((1-t)*h)/c,d=Math.sin(t*h)/c;return this._w=o*u+this._w*d,this._x=i*u+this._x*d,this._y=r*u+this._y*d,this._z=s*u+this._z*d,this._onChangeCallback(),this}slerpQuaternions(e,t,i){return this.copy(e).slerp(t,i)}random(){let e=2*Math.PI*Math.random(),t=2*Math.PI*Math.random(),i=Math.random(),r=Math.sqrt(1-i),s=Math.sqrt(i);return this.set(r*Math.sin(e),r*Math.cos(e),s*Math.sin(t),s*Math.cos(t))}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._w===this._w}fromArray(e,t=0){return this._x=e[t],this._y=e[t+1],this._z=e[t+2],this._w=e[t+3],this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._w,e}fromBufferAttribute(e,t){return this._x=e.getX(t),this._y=e.getY(t),this._z=e.getZ(t),this._w=e.getW(t),this._onChangeCallback(),this}toJSON(){return this.toArray()}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._w}};var R=class n{constructor(e=0,t=0,i=0){n.prototype.isVector3=!0,this.x=e,this.y=t,this.z=i}set(e,t,i){return i===void 0&&(i=this.z),this.x=e,this.y=t,this.z=i,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this}multiplyVectors(e,t){return this.x=e.x*t.x,this.y=e.y*t.y,this.z=e.z*t.z,this}applyEuler(e){return this.applyQuaternion(hu.setFromEuler(e))}applyAxisAngle(e,t){return this.applyQuaternion(hu.setFromAxisAngle(e,t))}applyMatrix3(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[3]*i+s[6]*r,this.y=s[1]*t+s[4]*i+s[7]*r,this.z=s[2]*t+s[5]*i+s[8]*r,this}applyNormalMatrix(e){return this.applyMatrix3(e).normalize()}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=e.elements,o=1/(s[3]*t+s[7]*i+s[11]*r+s[15]);return this.x=(s[0]*t+s[4]*i+s[8]*r+s[12])*o,this.y=(s[1]*t+s[5]*i+s[9]*r+s[13])*o,this.z=(s[2]*t+s[6]*i+s[10]*r+s[14])*o,this}applyQuaternion(e){let t=this.x,i=this.y,r=this.z,s=e.x,o=e.y,a=e.z,l=e.w,c=2*(o*r-a*i),h=2*(a*t-s*r),u=2*(s*i-o*t);return this.x=t+l*c+o*u-a*h,this.y=i+l*h+a*c-s*u,this.z=r+l*u+s*h-o*c,this}project(e){return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix)}unproject(e){return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld)}transformDirection(e){let t=this.x,i=this.y,r=this.z,s=e.elements;return this.x=s[0]*t+s[4]*i+s[8]*r,this.y=s[1]*t+s[5]*i+s[9]*r,this.z=s[2]*t+s[6]*i+s[10]*r,this.normalize()}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this}divideScalar(e){return this.multiplyScalar(1/e)}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this}cross(e){return this.crossVectors(this,e)}crossVectors(e,t){let i=e.x,r=e.y,s=e.z,o=t.x,a=t.y,l=t.z;return this.x=r*l-s*a,this.y=s*o-i*l,this.z=i*a-r*o,this}projectOnVector(e){let t=e.lengthSq();if(t===0)return this.set(0,0,0);let i=e.dot(this)/t;return this.copy(e).multiplyScalar(i)}projectOnPlane(e){return Ul.copy(this).projectOnVector(e),this.sub(Ul)}reflect(e){return this.sub(Ul.copy(e).multiplyScalar(2*this.dot(e)))}angleTo(e){let t=Math.sqrt(this.lengthSq()*e.lengthSq());if(t===0)return Math.PI/2;let i=this.dot(e)/t;return Math.acos(qe(i,-1,1))}distanceTo(e){return Math.sqrt(this.distanceToSquared(e))}distanceToSquared(e){let t=this.x-e.x,i=this.y-e.y,r=this.z-e.z;return t*t+i*i+r*r}manhattanDistanceTo(e){return Math.abs(this.x-e.x)+Math.abs(this.y-e.y)+Math.abs(this.z-e.z)}setFromSpherical(e){return this.setFromSphericalCoords(e.radius,e.phi,e.theta)}setFromSphericalCoords(e,t,i){let r=Math.sin(t)*e;return this.x=r*Math.sin(i),this.y=Math.cos(t)*e,this.z=r*Math.cos(i),this}setFromCylindrical(e){return this.setFromCylindricalCoords(e.radius,e.theta,e.y)}setFromCylindricalCoords(e,t,i){return this.x=e*Math.sin(t),this.y=i,this.z=e*Math.cos(t),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this}setFromMatrixScale(e){let t=this.setFromMatrixColumn(e,0).length(),i=this.setFromMatrixColumn(e,1).length(),r=this.setFromMatrixColumn(e,2).length();return this.x=t,this.y=i,this.z=r,this}setFromMatrixColumn(e,t){return this.fromArray(e.elements,t*4)}setFromMatrix3Column(e,t){return this.fromArray(e.elements,t*3)}setFromEuler(e){return this.x=e._x,this.y=e._y,this.z=e._z,this}setFromColor(e){return this.x=e.r,this.y=e.g,this.z=e.b,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this}randomDirection(){let e=Math.random()*Math.PI*2,t=Math.random()*2-1,i=Math.sqrt(1-t*t);return this.x=i*Math.cos(e),this.y=t,this.z=i*Math.sin(e),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z}},Ul=new R,hu=new Nt;var Ye=class n{constructor(e,t,i,r,s,o,a,l,c){n.prototype.isMatrix3=!0,this.elements=[1,0,0,0,1,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c)}set(e,t,i,r,s,o,a,l,c){let h=this.elements;return h[0]=e,h[1]=r,h[2]=a,h[3]=t,h[4]=s,h[5]=l,h[6]=i,h[7]=o,h[8]=c,this}identity(){return this.set(1,0,0,0,1,0,0,0,1),this}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],this}extractBasis(e,t,i){return e.setFromMatrix3Column(this,0),t.setFromMatrix3Column(this,1),i.setFromMatrix3Column(this,2),this}setFromMatrix4(e){let t=e.elements;return this.set(t[0],t[4],t[8],t[1],t[5],t[9],t[2],t[6],t[10]),this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[3],l=i[6],c=i[1],h=i[4],u=i[7],d=i[2],f=i[5],g=i[8],x=r[0],m=r[3],p=r[6],T=r[1],S=r[4],_=r[7],C=r[2],M=r[5],A=r[8];return s[0]=o*x+a*T+l*C,s[3]=o*m+a*S+l*M,s[6]=o*p+a*_+l*A,s[1]=c*x+h*T+u*C,s[4]=c*m+h*S+u*M,s[7]=c*p+h*_+u*A,s[2]=d*x+f*T+g*C,s[5]=d*m+f*S+g*M,s[8]=d*p+f*_+g*A,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[3]*=e,t[6]*=e,t[1]*=e,t[4]*=e,t[7]*=e,t[2]*=e,t[5]*=e,t[8]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8];return t*o*h-t*a*c-i*s*h+i*a*l+r*s*c-r*o*l}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=h*o-a*c,d=a*l-h*s,f=c*s-o*l,g=t*u+i*d+r*f;if(g===0)return this.set(0,0,0,0,0,0,0,0,0);let x=1/g;return e[0]=u*x,e[1]=(r*c-h*i)*x,e[2]=(a*i-r*o)*x,e[3]=d*x,e[4]=(h*t-r*l)*x,e[5]=(r*s-a*t)*x,e[6]=f*x,e[7]=(i*l-c*t)*x,e[8]=(o*t-i*s)*x,this}transpose(){let e,t=this.elements;return e=t[1],t[1]=t[3],t[3]=e,e=t[2],t[2]=t[6],t[6]=e,e=t[5],t[5]=t[7],t[7]=e,this}getNormalMatrix(e){return this.setFromMatrix4(e).invert().transpose()}transposeIntoArray(e){let t=this.elements;return e[0]=t[0],e[1]=t[3],e[2]=t[6],e[3]=t[1],e[4]=t[4],e[5]=t[7],e[6]=t[2],e[7]=t[5],e[8]=t[8],this}setUvTransform(e,t,i,r,s,o,a){let l=Math.cos(s),c=Math.sin(s);return this.set(i*l,i*c,-i*(l*o+c*a)+o+e,-r*c,r*l,-r*(-c*o+l*a)+a+t,0,0,1),this}scale(e,t){return this.premultiply(Fl.makeScale(e,t)),this}rotate(e){return this.premultiply(Fl.makeRotation(-e)),this}translate(e,t){return this.premultiply(Fl.makeTranslation(e,t)),this}makeTranslation(e,t){return e.isVector2?this.set(1,0,e.x,0,1,e.y,0,0,1):this.set(1,0,e,0,1,t,0,0,1),this}makeRotation(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,i,t,0,0,0,1),this}makeScale(e,t){return this.set(e,0,0,0,t,0,0,0,1),this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<9;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<9;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e}clone(){return new this.constructor().fromArray(this.elements)}},Fl=new Ye;function Ta(n){for(let e=n.length-1;e>=0;--e)if(n[e]>=65535)return!0;return!1}function Vn(n){return document.createElementNS("http://www.w3.org/1999/xhtml",n)}function Ol(){let n=Vn("canvas");return n.style.display="block",n}var uu={};function Hn(n){n in uu||(uu[n]=!0,console.warn(n))}function fu(n,e,t){return new Promise(function(i,r){function s(){switch(n.clientWaitSync(e,n.SYNC_FLUSH_COMMANDS_BIT,0)){case n.WAIT_FAILED:r();break;case n.TIMEOUT_EXPIRED:setTimeout(s,t);break;default:i()}}setTimeout(s,t)})}var du=new Ye().set(.4123908,.3575843,.1804808,.212639,.7151687,.0721923,.0193308,.1191948,.9505322),pu=new Ye().set(3.2409699,-1.5373832,-.4986108,-.9692436,1.8759675,.0415551,.0556301,-.203977,1.0569715);function Zg(){let n={enabled:!0,workingColorSpace:Yi,spaces:{},convert:function(r,s,o){return this.enabled===!1||s===o||!s||!o||(this.spaces[s].transfer===ht&&(r.r=Ji(r.r),r.g=Ji(r.g),r.b=Ji(r.b)),this.spaces[s].primaries!==this.spaces[o].primaries&&(r.applyMatrix3(this.spaces[s].toXYZ),r.applyMatrix3(this.spaces[o].fromXYZ)),this.spaces[o].transfer===ht&&(r.r=fr(r.r),r.g=fr(r.g),r.b=fr(r.b))),r},workingToColorSpace:function(r,s){return this.convert(r,this.workingColorSpace,s)},colorSpaceToWorking:function(r,s){return this.convert(r,s,this.workingColorSpace)},getPrimaries:function(r){return this.spaces[r].primaries},getTransfer:function(r){return r===xi?hr:this.spaces[r].transfer},getToneMappingMode:function(r){return this.spaces[r].outputColorSpaceConfig.toneMappingMode||"standard"},getLuminanceCoefficients:function(r,s=this.workingColorSpace){return r.fromArray(this.spaces[s].luminanceCoefficients)},define:function(r){Object.assign(this.spaces,r)},_getMatrix:function(r,s,o){return r.copy(this.spaces[s].toXYZ).multiply(this.spaces[o].fromXYZ)},_getDrawingBufferColorSpace:function(r){return this.spaces[r].outputColorSpaceConfig.drawingBufferColorSpace},_getUnpackColorSpace:function(r=this.workingColorSpace){return this.spaces[r].workingColorSpaceConfig.unpackColorSpace},fromWorkingColorSpace:function(r,s){return Hn("THREE.ColorManagement: .fromWorkingColorSpace() has been renamed to .workingToColorSpace()."),n.workingToColorSpace(r,s)},toWorkingColorSpace:function(r,s){return Hn("THREE.ColorManagement: .toWorkingColorSpace() has been renamed to .colorSpaceToWorking()."),n.colorSpaceToWorking(r,s)}},e=[.64,.33,.3,.6,.15,.06],t=[.2126,.7152,.0722],i=[.3127,.329];return n.define({[Yi]:{primaries:e,whitePoint:i,transfer:hr,toXYZ:du,fromXYZ:pu,luminanceCoefficients:t,workingColorSpaceConfig:{unpackColorSpace:kt},outputColorSpaceConfig:{drawingBufferColorSpace:kt}},[kt]:{primaries:e,whitePoint:i,transfer:ht,toXYZ:du,fromXYZ:pu,luminanceCoefficients:t,outputColorSpaceConfig:{drawingBufferColorSpace:kt}}}),n}var st=Zg();function Ji(n){return n<.04045?n*.0773993808:Math.pow(n*.9478672986+.0521327014,2.4)}function fr(n){return n<.0031308?n*12.92:1.055*Math.pow(n,.41666)-.055}var Qr,dr=class{static getDataURL(e,t="image/png"){if(/^data:/i.test(e.src)||typeof HTMLCanvasElement>"u")return e.src;let i;if(e instanceof HTMLCanvasElement)i=e;else{Qr===void 0&&(Qr=Vn("canvas")),Qr.width=e.width,Qr.height=e.height;let r=Qr.getContext("2d");e instanceof ImageData?r.putImageData(e,0,0):r.drawImage(e,0,0,e.width,e.height),i=Qr}return i.toDataURL(t)}static sRGBToLinear(e){if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap){let t=Vn("canvas");t.width=e.width,t.height=e.height;let i=t.getContext("2d");i.drawImage(e,0,0,e.width,e.height);let r=i.getImageData(0,0,e.width,e.height),s=r.data;for(let o=0;o<s.length;o++)s[o]=Ji(s[o]/255)*255;return i.putImageData(r,0,0),t}else if(e.data){let t=e.data.slice(0);for(let i=0;i<t.length;i++)t instanceof Uint8Array||t instanceof Uint8ClampedArray?t[i]=Math.floor(Ji(t[i]/255)*255):t[i]=Ji(t[i]);return{data:t,width:e.width,height:e.height}}else return console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied."),e}};var Jg=0,Bi=class{constructor(e=null){this.isSource=!0,Object.defineProperty(this,"id",{value:Jg++}),this.uuid=ei(),this.data=e,this.dataReady=!0,this.version=0}getSize(e){let t=this.data;return typeof HTMLVideoElement<"u"&&t instanceof HTMLVideoElement?e.set(t.videoWidth,t.videoHeight,0):t instanceof VideoFrame?e.set(t.displayHeight,t.displayWidth,0):t!==null?e.set(t.width,t.height,t.depth||0):e.set(0,0,0),e}set needsUpdate(e){e===!0&&this.version++}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.images[this.uuid]!==void 0)return e.images[this.uuid];let i={uuid:this.uuid,url:""},r=this.data;if(r!==null){let s;if(Array.isArray(r)){s=[];for(let o=0,a=r.length;o<a;o++)r[o].isDataTexture?s.push(Bl(r[o].image)):s.push(Bl(r[o]))}else s=Bl(r);i.url=s}return t||(e.images[this.uuid]=i),i}};function Bl(n){return typeof HTMLImageElement<"u"&&n instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&n instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&n instanceof ImageBitmap?dr.getDataURL(n):n.data?{data:Array.from(n.data),width:n.width,height:n.height,type:n.data.constructor.name}:(console.warn("THREE.Texture: Unable to serialize Texture."),{})}var Kg=0,kl=new R,_t=class n extends Ht{constructor(e=n.DEFAULT_IMAGE,t=n.DEFAULT_MAPPING,i=si,r=si,s=Bt,o=di,a=Dt,l=Zt,c=n.DEFAULT_ANISOTROPY,h=xi){super(),this.isTexture=!0,Object.defineProperty(this,"id",{value:Kg++}),this.uuid=ei(),this.name="",this.source=new Bi(e),this.mipmaps=[],this.mapping=t,this.channel=0,this.wrapS=i,this.wrapT=r,this.magFilter=s,this.minFilter=o,this.anisotropy=c,this.format=a,this.internalFormat=null,this.type=l,this.offset=new ie(0,0),this.repeat=new ie(1,1),this.center=new ie(0,0),this.rotation=0,this.matrixAutoUpdate=!0,this.matrix=new Ye,this.generateMipmaps=!0,this.premultiplyAlpha=!1,this.flipY=!0,this.unpackAlignment=4,this.colorSpace=h,this.userData={},this.updateRanges=[],this.version=0,this.onUpdate=null,this.renderTarget=null,this.isRenderTargetTexture=!1,this.isArrayTexture=!!(e&&e.depth&&e.depth>1),this.pmremVersion=0}get width(){return this.source.getSize(kl).x}get height(){return this.source.getSize(kl).y}get depth(){return this.source.getSize(kl).z}get image(){return this.source.data}set image(e=null){this.source.data=e}updateMatrix(){this.matrix.setUvTransform(this.offset.x,this.offset.y,this.repeat.x,this.repeat.y,this.rotation,this.center.x,this.center.y)}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}clone(){return new this.constructor().copy(this)}copy(e){return this.name=e.name,this.source=e.source,this.mipmaps=e.mipmaps.slice(0),this.mapping=e.mapping,this.channel=e.channel,this.wrapS=e.wrapS,this.wrapT=e.wrapT,this.magFilter=e.magFilter,this.minFilter=e.minFilter,this.anisotropy=e.anisotropy,this.format=e.format,this.internalFormat=e.internalFormat,this.type=e.type,this.offset.copy(e.offset),this.repeat.copy(e.repeat),this.center.copy(e.center),this.rotation=e.rotation,this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrix.copy(e.matrix),this.generateMipmaps=e.generateMipmaps,this.premultiplyAlpha=e.premultiplyAlpha,this.flipY=e.flipY,this.unpackAlignment=e.unpackAlignment,this.colorSpace=e.colorSpace,this.renderTarget=e.renderTarget,this.isRenderTargetTexture=e.isRenderTargetTexture,this.isArrayTexture=e.isArrayTexture,this.userData=JSON.parse(JSON.stringify(e.userData)),this.needsUpdate=!0,this}setValues(e){for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Texture.setValues(): parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Texture.setValues(): property '${t}' does not exist.`);continue}r&&i&&r.isVector2&&i.isVector2||r&&i&&r.isVector3&&i.isVector3||r&&i&&r.isMatrix3&&i.isMatrix3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";if(!t&&e.textures[this.uuid]!==void 0)return e.textures[this.uuid];let i={metadata:{version:4.7,type:"Texture",generator:"Texture.toJSON"},uuid:this.uuid,name:this.name,image:this.source.toJSON(e).uuid,mapping:this.mapping,channel:this.channel,repeat:[this.repeat.x,this.repeat.y],offset:[this.offset.x,this.offset.y],center:[this.center.x,this.center.y],rotation:this.rotation,wrap:[this.wrapS,this.wrapT],format:this.format,internalFormat:this.internalFormat,type:this.type,colorSpace:this.colorSpace,minFilter:this.minFilter,magFilter:this.magFilter,anisotropy:this.anisotropy,flipY:this.flipY,generateMipmaps:this.generateMipmaps,premultiplyAlpha:this.premultiplyAlpha,unpackAlignment:this.unpackAlignment};return Object.keys(this.userData).length>0&&(i.userData=this.userData),t||(e.textures[this.uuid]=i),i}dispose(){this.dispatchEvent({type:"dispose"})}transformUv(e){if(this.mapping!==ua)return e;if(e.applyMatrix3(this.matrix),e.x<0||e.x>1)switch(this.wrapS){case Un:e.x=e.x-Math.floor(e.x);break;case si:e.x=e.x<0?0:1;break;case Fn:Math.abs(Math.floor(e.x)%2)===1?e.x=Math.ceil(e.x)-e.x:e.x=e.x-Math.floor(e.x);break}if(e.y<0||e.y>1)switch(this.wrapT){case Un:e.y=e.y-Math.floor(e.y);break;case si:e.y=e.y<0?0:1;break;case Fn:Math.abs(Math.floor(e.y)%2)===1?e.y=Math.ceil(e.y)-e.y:e.y=e.y-Math.floor(e.y);break}return this.flipY&&(e.y=1-e.y),e}set needsUpdate(e){e===!0&&(this.version++,this.source.needsUpdate=!0)}set needsPMREMUpdate(e){e===!0&&this.pmremVersion++}};_t.DEFAULT_IMAGE=null;_t.DEFAULT_MAPPING=ua;_t.DEFAULT_ANISOTROPY=1;var ut=class n{constructor(e=0,t=0,i=0,r=1){n.prototype.isVector4=!0,this.x=e,this.y=t,this.z=i,this.w=r}get width(){return this.z}set width(e){this.z=e}get height(){return this.w}set height(e){this.w=e}set(e,t,i,r){return this.x=e,this.y=t,this.z=i,this.w=r,this}setScalar(e){return this.x=e,this.y=e,this.z=e,this.w=e,this}setX(e){return this.x=e,this}setY(e){return this.y=e,this}setZ(e){return this.z=e,this}setW(e){return this.w=e,this}setComponent(e,t){switch(e){case 0:this.x=t;break;case 1:this.y=t;break;case 2:this.z=t;break;case 3:this.w=t;break;default:throw new Error("index is out of range: "+e)}return this}getComponent(e){switch(e){case 0:return this.x;case 1:return this.y;case 2:return this.z;case 3:return this.w;default:throw new Error("index is out of range: "+e)}}clone(){return new this.constructor(this.x,this.y,this.z,this.w)}copy(e){return this.x=e.x,this.y=e.y,this.z=e.z,this.w=e.w!==void 0?e.w:1,this}add(e){return this.x+=e.x,this.y+=e.y,this.z+=e.z,this.w+=e.w,this}addScalar(e){return this.x+=e,this.y+=e,this.z+=e,this.w+=e,this}addVectors(e,t){return this.x=e.x+t.x,this.y=e.y+t.y,this.z=e.z+t.z,this.w=e.w+t.w,this}addScaledVector(e,t){return this.x+=e.x*t,this.y+=e.y*t,this.z+=e.z*t,this.w+=e.w*t,this}sub(e){return this.x-=e.x,this.y-=e.y,this.z-=e.z,this.w-=e.w,this}subScalar(e){return this.x-=e,this.y-=e,this.z-=e,this.w-=e,this}subVectors(e,t){return this.x=e.x-t.x,this.y=e.y-t.y,this.z=e.z-t.z,this.w=e.w-t.w,this}multiply(e){return this.x*=e.x,this.y*=e.y,this.z*=e.z,this.w*=e.w,this}multiplyScalar(e){return this.x*=e,this.y*=e,this.z*=e,this.w*=e,this}applyMatrix4(e){let t=this.x,i=this.y,r=this.z,s=this.w,o=e.elements;return this.x=o[0]*t+o[4]*i+o[8]*r+o[12]*s,this.y=o[1]*t+o[5]*i+o[9]*r+o[13]*s,this.z=o[2]*t+o[6]*i+o[10]*r+o[14]*s,this.w=o[3]*t+o[7]*i+o[11]*r+o[15]*s,this}divide(e){return this.x/=e.x,this.y/=e.y,this.z/=e.z,this.w/=e.w,this}divideScalar(e){return this.multiplyScalar(1/e)}setAxisAngleFromQuaternion(e){this.w=2*Math.acos(e.w);let t=Math.sqrt(1-e.w*e.w);return t<1e-4?(this.x=1,this.y=0,this.z=0):(this.x=e.x/t,this.y=e.y/t,this.z=e.z/t),this}setAxisAngleFromRotationMatrix(e){let t,i,r,s,l=e.elements,c=l[0],h=l[4],u=l[8],d=l[1],f=l[5],g=l[9],x=l[2],m=l[6],p=l[10];if(Math.abs(h-d)<.01&&Math.abs(u-x)<.01&&Math.abs(g-m)<.01){if(Math.abs(h+d)<.1&&Math.abs(u+x)<.1&&Math.abs(g+m)<.1&&Math.abs(c+f+p-3)<.1)return this.set(1,0,0,0),this;t=Math.PI;let S=(c+1)/2,_=(f+1)/2,C=(p+1)/2,M=(h+d)/4,A=(u+x)/4,E=(g+m)/4;return S>_&&S>C?S<.01?(i=0,r=.707106781,s=.707106781):(i=Math.sqrt(S),r=M/i,s=A/i):_>C?_<.01?(i=.707106781,r=0,s=.707106781):(r=Math.sqrt(_),i=M/r,s=E/r):C<.01?(i=.707106781,r=.707106781,s=0):(s=Math.sqrt(C),i=A/s,r=E/s),this.set(i,r,s,t),this}let T=Math.sqrt((m-g)*(m-g)+(u-x)*(u-x)+(d-h)*(d-h));return Math.abs(T)<.001&&(T=1),this.x=(m-g)/T,this.y=(u-x)/T,this.z=(d-h)/T,this.w=Math.acos((c+f+p-1)/2),this}setFromMatrixPosition(e){let t=e.elements;return this.x=t[12],this.y=t[13],this.z=t[14],this.w=t[15],this}min(e){return this.x=Math.min(this.x,e.x),this.y=Math.min(this.y,e.y),this.z=Math.min(this.z,e.z),this.w=Math.min(this.w,e.w),this}max(e){return this.x=Math.max(this.x,e.x),this.y=Math.max(this.y,e.y),this.z=Math.max(this.z,e.z),this.w=Math.max(this.w,e.w),this}clamp(e,t){return this.x=qe(this.x,e.x,t.x),this.y=qe(this.y,e.y,t.y),this.z=qe(this.z,e.z,t.z),this.w=qe(this.w,e.w,t.w),this}clampScalar(e,t){return this.x=qe(this.x,e,t),this.y=qe(this.y,e,t),this.z=qe(this.z,e,t),this.w=qe(this.w,e,t),this}clampLength(e,t){let i=this.length();return this.divideScalar(i||1).multiplyScalar(qe(i,e,t))}floor(){return this.x=Math.floor(this.x),this.y=Math.floor(this.y),this.z=Math.floor(this.z),this.w=Math.floor(this.w),this}ceil(){return this.x=Math.ceil(this.x),this.y=Math.ceil(this.y),this.z=Math.ceil(this.z),this.w=Math.ceil(this.w),this}round(){return this.x=Math.round(this.x),this.y=Math.round(this.y),this.z=Math.round(this.z),this.w=Math.round(this.w),this}roundToZero(){return this.x=Math.trunc(this.x),this.y=Math.trunc(this.y),this.z=Math.trunc(this.z),this.w=Math.trunc(this.w),this}negate(){return this.x=-this.x,this.y=-this.y,this.z=-this.z,this.w=-this.w,this}dot(e){return this.x*e.x+this.y*e.y+this.z*e.z+this.w*e.w}lengthSq(){return this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w}length(){return Math.sqrt(this.x*this.x+this.y*this.y+this.z*this.z+this.w*this.w)}manhattanLength(){return Math.abs(this.x)+Math.abs(this.y)+Math.abs(this.z)+Math.abs(this.w)}normalize(){return this.divideScalar(this.length()||1)}setLength(e){return this.normalize().multiplyScalar(e)}lerp(e,t){return this.x+=(e.x-this.x)*t,this.y+=(e.y-this.y)*t,this.z+=(e.z-this.z)*t,this.w+=(e.w-this.w)*t,this}lerpVectors(e,t,i){return this.x=e.x+(t.x-e.x)*i,this.y=e.y+(t.y-e.y)*i,this.z=e.z+(t.z-e.z)*i,this.w=e.w+(t.w-e.w)*i,this}equals(e){return e.x===this.x&&e.y===this.y&&e.z===this.z&&e.w===this.w}fromArray(e,t=0){return this.x=e[t],this.y=e[t+1],this.z=e[t+2],this.w=e[t+3],this}toArray(e=[],t=0){return e[t]=this.x,e[t+1]=this.y,e[t+2]=this.z,e[t+3]=this.w,e}fromBufferAttribute(e,t){return this.x=e.getX(t),this.y=e.getY(t),this.z=e.getZ(t),this.w=e.getW(t),this}random(){return this.x=Math.random(),this.y=Math.random(),this.z=Math.random(),this.w=Math.random(),this}*[Symbol.iterator](){yield this.x,yield this.y,yield this.z,yield this.w}};var es=class extends Ht{constructor(e=1,t=1,i={}){super(),i=Object.assign({generateMipmaps:!1,internalFormat:null,minFilter:Bt,depthBuffer:!0,stencilBuffer:!1,resolveDepthBuffer:!0,resolveStencilBuffer:!0,depthTexture:null,samples:0,count:1,depth:1,multiview:!1},i),this.isRenderTarget=!0,this.width=e,this.height=t,this.depth=i.depth,this.scissor=new ut(0,0,e,t),this.scissorTest=!1,this.viewport=new ut(0,0,e,t);let r={width:e,height:t,depth:i.depth},s=new _t(r);this.textures=[];let o=i.count;for(let a=0;a<o;a++)this.textures[a]=s.clone(),this.textures[a].isRenderTargetTexture=!0,this.textures[a].renderTarget=this;this._setTextureOptions(i),this.depthBuffer=i.depthBuffer,this.stencilBuffer=i.stencilBuffer,this.resolveDepthBuffer=i.resolveDepthBuffer,this.resolveStencilBuffer=i.resolveStencilBuffer,this._depthTexture=null,this.depthTexture=i.depthTexture,this.samples=i.samples,this.multiview=i.multiview}_setTextureOptions(e={}){let t={minFilter:Bt,generateMipmaps:!1,flipY:!1,internalFormat:null};e.mapping!==void 0&&(t.mapping=e.mapping),e.wrapS!==void 0&&(t.wrapS=e.wrapS),e.wrapT!==void 0&&(t.wrapT=e.wrapT),e.wrapR!==void 0&&(t.wrapR=e.wrapR),e.magFilter!==void 0&&(t.magFilter=e.magFilter),e.minFilter!==void 0&&(t.minFilter=e.minFilter),e.format!==void 0&&(t.format=e.format),e.type!==void 0&&(t.type=e.type),e.anisotropy!==void 0&&(t.anisotropy=e.anisotropy),e.colorSpace!==void 0&&(t.colorSpace=e.colorSpace),e.flipY!==void 0&&(t.flipY=e.flipY),e.generateMipmaps!==void 0&&(t.generateMipmaps=e.generateMipmaps),e.internalFormat!==void 0&&(t.internalFormat=e.internalFormat);for(let i=0;i<this.textures.length;i++)this.textures[i].setValues(t)}get texture(){return this.textures[0]}set texture(e){this.textures[0]=e}set depthTexture(e){this._depthTexture!==null&&(this._depthTexture.renderTarget=null),e!==null&&(e.renderTarget=this),this._depthTexture=e}get depthTexture(){return this._depthTexture}setSize(e,t,i=1){if(this.width!==e||this.height!==t||this.depth!==i){this.width=e,this.height=t,this.depth=i;for(let r=0,s=this.textures.length;r<s;r++)this.textures[r].image.width=e,this.textures[r].image.height=t,this.textures[r].image.depth=i,this.textures[r].isArrayTexture=this.textures[r].image.depth>1;this.dispose()}this.viewport.set(0,0,e,t),this.scissor.set(0,0,e,t)}clone(){return new this.constructor().copy(this)}copy(e){this.width=e.width,this.height=e.height,this.depth=e.depth,this.scissor.copy(e.scissor),this.scissorTest=e.scissorTest,this.viewport.copy(e.viewport),this.textures.length=0;for(let t=0,i=e.textures.length;t<i;t++){this.textures[t]=e.textures[t].clone(),this.textures[t].isRenderTargetTexture=!0,this.textures[t].renderTarget=this;let r=Object.assign({},e.textures[t].image);this.textures[t].source=new Bi(r)}return this.depthBuffer=e.depthBuffer,this.stencilBuffer=e.stencilBuffer,this.resolveDepthBuffer=e.resolveDepthBuffer,this.resolveStencilBuffer=e.resolveStencilBuffer,e.depthTexture!==null&&(this.depthTexture=e.depthTexture.clone()),this.samples=e.samples,this}dispose(){this.dispatchEvent({type:"dispose"})}};var ii=class extends es{constructor(e=1,t=1,i={}){super(e,t,i),this.isWebGLRenderTarget=!0}};var Gn=class extends _t{constructor(e=null,t=1,i=1,r=1){super(null),this.isDataArrayTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1,this.layerUpdates=new Set}addLayerUpdate(e){this.layerUpdates.add(e)}clearLayerUpdates(){this.layerUpdates.clear()}};var pr=class extends _t{constructor(e=null,t=1,i=1,r=1){super(null),this.isData3DTexture=!0,this.image={data:e,width:t,height:i,depth:r},this.magFilter=Ot,this.minFilter=Ot,this.wrapR=si,this.generateMipmaps=!1,this.flipY=!1,this.unpackAlignment=1}};var Gt=class{constructor(e=new R(1/0,1/0,1/0),t=new R(-1/0,-1/0,-1/0)){this.isBox3=!0,this.min=e,this.max=t}set(e,t){return this.min.copy(e),this.max.copy(t),this}setFromArray(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t+=3)this.expandByPoint(Ki.fromArray(e,t));return this}setFromBufferAttribute(e){this.makeEmpty();for(let t=0,i=e.count;t<i;t++)this.expandByPoint(Ki.fromBufferAttribute(e,t));return this}setFromPoints(e){this.makeEmpty();for(let t=0,i=e.length;t<i;t++)this.expandByPoint(e[t]);return this}setFromCenterAndSize(e,t){let i=Ki.copy(t).multiplyScalar(.5);return this.min.copy(e).sub(i),this.max.copy(e).add(i),this}setFromObject(e,t=!1){return this.makeEmpty(),this.expandByObject(e,t)}clone(){return new this.constructor().copy(this)}copy(e){return this.min.copy(e.min),this.max.copy(e.max),this}makeEmpty(){return this.min.x=this.min.y=this.min.z=1/0,this.max.x=this.max.y=this.max.z=-1/0,this}isEmpty(){return this.max.x<this.min.x||this.max.y<this.min.y||this.max.z<this.min.z}getCenter(e){return this.isEmpty()?e.set(0,0,0):e.addVectors(this.min,this.max).multiplyScalar(.5)}getSize(e){return this.isEmpty()?e.set(0,0,0):e.subVectors(this.max,this.min)}expandByPoint(e){return this.min.min(e),this.max.max(e),this}expandByVector(e){return this.min.sub(e),this.max.add(e),this}expandByScalar(e){return this.min.addScalar(-e),this.max.addScalar(e),this}expandByObject(e,t=!1){e.updateWorldMatrix(!1,!1);let i=e.geometry;if(i!==void 0){let s=i.getAttribute("position");if(t===!0&&s!==void 0&&e.isInstancedMesh!==!0)for(let o=0,a=s.count;o<a;o++)e.isMesh===!0?e.getVertexPosition(o,Ki):Ki.fromBufferAttribute(s,o),Ki.applyMatrix4(e.matrixWorld),this.expandByPoint(Ki);else e.boundingBox!==void 0?(e.boundingBox===null&&e.computeBoundingBox(),Ea.copy(e.boundingBox)):(i.boundingBox===null&&i.computeBoundingBox(),Ea.copy(i.boundingBox)),Ea.applyMatrix4(e.matrixWorld),this.union(Ea)}let r=e.children;for(let s=0,o=r.length;s<o;s++)this.expandByObject(r[s],t);return this}containsPoint(e){return e.x>=this.min.x&&e.x<=this.max.x&&e.y>=this.min.y&&e.y<=this.max.y&&e.z>=this.min.z&&e.z<=this.max.z}containsBox(e){return this.min.x<=e.min.x&&e.max.x<=this.max.x&&this.min.y<=e.min.y&&e.max.y<=this.max.y&&this.min.z<=e.min.z&&e.max.z<=this.max.z}getParameter(e,t){return t.set((e.x-this.min.x)/(this.max.x-this.min.x),(e.y-this.min.y)/(this.max.y-this.min.y),(e.z-this.min.z)/(this.max.z-this.min.z))}intersectsBox(e){return e.max.x>=this.min.x&&e.min.x<=this.max.x&&e.max.y>=this.min.y&&e.min.y<=this.max.y&&e.max.z>=this.min.z&&e.min.z<=this.max.z}intersectsSphere(e){return this.clampPoint(e.center,Ki),Ki.distanceToSquared(e.center)<=e.radius*e.radius}intersectsPlane(e){let t,i;return e.normal.x>0?(t=e.normal.x*this.min.x,i=e.normal.x*this.max.x):(t=e.normal.x*this.max.x,i=e.normal.x*this.min.x),e.normal.y>0?(t+=e.normal.y*this.min.y,i+=e.normal.y*this.max.y):(t+=e.normal.y*this.max.y,i+=e.normal.y*this.min.y),e.normal.z>0?(t+=e.normal.z*this.min.z,i+=e.normal.z*this.max.z):(t+=e.normal.z*this.max.z,i+=e.normal.z*this.min.z),t<=-e.constant&&i>=-e.constant}intersectsTriangle(e){if(this.isEmpty())return!1;this.getCenter(bo),Aa.subVectors(this.max,bo),ts.subVectors(e.a,bo),is.subVectors(e.b,bo),ns.subVectors(e.c,bo),Wn.subVectors(is,ts),Xn.subVectors(ns,is),mr.subVectors(ts,ns);let t=[0,-Wn.z,Wn.y,0,-Xn.z,Xn.y,0,-mr.z,mr.y,Wn.z,0,-Wn.x,Xn.z,0,-Xn.x,mr.z,0,-mr.x,-Wn.y,Wn.x,0,-Xn.y,Xn.x,0,-mr.y,mr.x,0];return!zl(t,ts,is,ns,Aa)||(t=[1,0,0,0,1,0,0,0,1],!zl(t,ts,is,ns,Aa))?!1:(Ca.crossVectors(Wn,Xn),t=[Ca.x,Ca.y,Ca.z],zl(t,ts,is,ns,Aa))}clampPoint(e,t){return t.copy(e).clamp(this.min,this.max)}distanceToPoint(e){return this.clampPoint(e,Ki).distanceTo(e)}getBoundingSphere(e){return this.isEmpty()?e.makeEmpty():(this.getCenter(e.center),e.radius=this.getSize(Ki).length()*.5),e}intersect(e){return this.min.max(e.min),this.max.min(e.max),this.isEmpty()&&this.makeEmpty(),this}union(e){return this.min.min(e.min),this.max.max(e.max),this}applyMatrix4(e){return this.isEmpty()?this:(bn[0].set(this.min.x,this.min.y,this.min.z).applyMatrix4(e),bn[1].set(this.min.x,this.min.y,this.max.z).applyMatrix4(e),bn[2].set(this.min.x,this.max.y,this.min.z).applyMatrix4(e),bn[3].set(this.min.x,this.max.y,this.max.z).applyMatrix4(e),bn[4].set(this.max.x,this.min.y,this.min.z).applyMatrix4(e),bn[5].set(this.max.x,this.min.y,this.max.z).applyMatrix4(e),bn[6].set(this.max.x,this.max.y,this.min.z).applyMatrix4(e),bn[7].set(this.max.x,this.max.y,this.max.z).applyMatrix4(e),this.setFromPoints(bn),this)}translate(e){return this.min.add(e),this.max.add(e),this}equals(e){return e.min.equals(this.min)&&e.max.equals(this.max)}toJSON(){return{min:this.min.toArray(),max:this.max.toArray()}}fromJSON(e){return this.min.fromArray(e.min),this.max.fromArray(e.max),this}},bn=[new R,new R,new R,new R,new R,new R,new R,new R],Ki=new R,Ea=new Gt,ts=new R,is=new R,ns=new R,Wn=new R,Xn=new R,mr=new R,bo=new R,Aa=new R,Ca=new R,gr=new R;function zl(n,e,t,i,r){for(let s=0,o=n.length-3;s<=o;s+=3){gr.fromArray(n,s);let a=r.x*Math.abs(gr.x)+r.y*Math.abs(gr.y)+r.z*Math.abs(gr.z),l=e.dot(gr),c=t.dot(gr),h=i.dot(gr);if(Math.max(-Math.max(l,c,h),Math.min(l,c,h))>a)return!1}return!0}var jg=new Gt,Mo=new R,Vl=new R,ni=class{constructor(e=new R,t=-1){this.isSphere=!0,this.center=e,this.radius=t}set(e,t){return this.center.copy(e),this.radius=t,this}setFromPoints(e,t){let i=this.center;t!==void 0?i.copy(t):jg.setFromPoints(e).getCenter(i);let r=0;for(let s=0,o=e.length;s<o;s++)r=Math.max(r,i.distanceToSquared(e[s]));return this.radius=Math.sqrt(r),this}copy(e){return this.center.copy(e.center),this.radius=e.radius,this}isEmpty(){return this.radius<0}makeEmpty(){return this.center.set(0,0,0),this.radius=-1,this}containsPoint(e){return e.distanceToSquared(this.center)<=this.radius*this.radius}distanceToPoint(e){return e.distanceTo(this.center)-this.radius}intersectsSphere(e){let t=this.radius+e.radius;return e.center.distanceToSquared(this.center)<=t*t}intersectsBox(e){return e.intersectsSphere(this)}intersectsPlane(e){return Math.abs(e.distanceToPoint(this.center))<=this.radius}clampPoint(e,t){let i=this.center.distanceToSquared(e);return t.copy(e),i>this.radius*this.radius&&(t.sub(this.center).normalize(),t.multiplyScalar(this.radius).add(this.center)),t}getBoundingBox(e){return this.isEmpty()?(e.makeEmpty(),e):(e.set(this.center,this.center),e.expandByScalar(this.radius),e)}applyMatrix4(e){return this.center.applyMatrix4(e),this.radius=this.radius*e.getMaxScaleOnAxis(),this}translate(e){return this.center.add(e),this}expandByPoint(e){if(this.isEmpty())return this.center.copy(e),this.radius=0,this;Mo.subVectors(e,this.center);let t=Mo.lengthSq();if(t>this.radius*this.radius){let i=Math.sqrt(t),r=(i-this.radius)*.5;this.center.addScaledVector(Mo,r/i),this.radius+=r}return this}union(e){return e.isEmpty()?this:this.isEmpty()?(this.copy(e),this):(this.center.equals(e.center)===!0?this.radius=Math.max(this.radius,e.radius):(Vl.subVectors(e.center,this.center).setLength(e.radius),this.expandByPoint(Mo.copy(e.center).add(Vl)),this.expandByPoint(Mo.copy(e.center).sub(Vl))),this)}equals(e){return e.center.equals(this.center)&&e.radius===this.radius}clone(){return new this.constructor().copy(this)}toJSON(){return{radius:this.radius,center:this.center.toArray()}}fromJSON(e){return this.radius=e.radius,this.center.fromArray(e.center),this}};var Mn=new R,Hl=new R,Ia=new R,qn=new R,Gl=new R,Pa=new R,Wl=new R,Ei=class{constructor(e=new R,t=new R(0,0,-1)){this.origin=e,this.direction=t}set(e,t){return this.origin.copy(e),this.direction.copy(t),this}copy(e){return this.origin.copy(e.origin),this.direction.copy(e.direction),this}at(e,t){return t.copy(this.origin).addScaledVector(this.direction,e)}lookAt(e){return this.direction.copy(e).sub(this.origin).normalize(),this}recast(e){return this.origin.copy(this.at(e,Mn)),this}closestPointToPoint(e,t){t.subVectors(e,this.origin);let i=t.dot(this.direction);return i<0?t.copy(this.origin):t.copy(this.origin).addScaledVector(this.direction,i)}distanceToPoint(e){return Math.sqrt(this.distanceSqToPoint(e))}distanceSqToPoint(e){let t=Mn.subVectors(e,this.origin).dot(this.direction);return t<0?this.origin.distanceToSquared(e):(Mn.copy(this.origin).addScaledVector(this.direction,t),Mn.distanceToSquared(e))}distanceSqToSegment(e,t,i,r){Hl.copy(e).add(t).multiplyScalar(.5),Ia.copy(t).sub(e).normalize(),qn.copy(this.origin).sub(Hl);let s=e.distanceTo(t)*.5,o=-this.direction.dot(Ia),a=qn.dot(this.direction),l=-qn.dot(Ia),c=qn.lengthSq(),h=Math.abs(1-o*o),u,d,f,g;if(h>0)if(u=o*l-a,d=o*a-l,g=s*h,u>=0)if(d>=-g)if(d<=g){let x=1/h;u*=x,d*=x,f=u*(u+o*d+2*a)+d*(o*u+d+2*l)+c}else d=s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d=-s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;else d<=-g?(u=Math.max(0,-(-o*s+a)),d=u>0?-s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c):d<=g?(u=0,d=Math.min(Math.max(-s,-l),s),f=d*(d+2*l)+c):(u=Math.max(0,-(o*s+a)),d=u>0?s:Math.min(Math.max(-s,-l),s),f=-u*u+d*(d+2*l)+c);else d=o>0?-s:s,u=Math.max(0,-(o*d+a)),f=-u*u+d*(d+2*l)+c;return i&&i.copy(this.origin).addScaledVector(this.direction,u),r&&r.copy(Hl).addScaledVector(Ia,d),f}intersectSphere(e,t){Mn.subVectors(e.center,this.origin);let i=Mn.dot(this.direction),r=Mn.dot(Mn)-i*i,s=e.radius*e.radius;if(r>s)return null;let o=Math.sqrt(s-r),a=i-o,l=i+o;return l<0?null:a<0?this.at(l,t):this.at(a,t)}intersectsSphere(e){return e.radius<0?!1:this.distanceSqToPoint(e.center)<=e.radius*e.radius}distanceToPlane(e){let t=e.normal.dot(this.direction);if(t===0)return e.distanceToPoint(this.origin)===0?0:null;let i=-(this.origin.dot(e.normal)+e.constant)/t;return i>=0?i:null}intersectPlane(e,t){let i=this.distanceToPlane(e);return i===null?null:this.at(i,t)}intersectsPlane(e){let t=e.distanceToPoint(this.origin);return t===0||e.normal.dot(this.direction)*t<0}intersectBox(e,t){let i,r,s,o,a,l,c=1/this.direction.x,h=1/this.direction.y,u=1/this.direction.z,d=this.origin;return c>=0?(i=(e.min.x-d.x)*c,r=(e.max.x-d.x)*c):(i=(e.max.x-d.x)*c,r=(e.min.x-d.x)*c),h>=0?(s=(e.min.y-d.y)*h,o=(e.max.y-d.y)*h):(s=(e.max.y-d.y)*h,o=(e.min.y-d.y)*h),i>o||s>r||((s>i||isNaN(i))&&(i=s),(o<r||isNaN(r))&&(r=o),u>=0?(a=(e.min.z-d.z)*u,l=(e.max.z-d.z)*u):(a=(e.max.z-d.z)*u,l=(e.min.z-d.z)*u),i>l||a>r)||((a>i||i!==i)&&(i=a),(l<r||r!==r)&&(r=l),r<0)?null:this.at(i>=0?i:r,t)}intersectsBox(e){return this.intersectBox(e,Mn)!==null}intersectTriangle(e,t,i,r,s){Gl.subVectors(t,e),Pa.subVectors(i,e),Wl.crossVectors(Gl,Pa);let o=this.direction.dot(Wl),a;if(o>0){if(r)return null;a=1}else if(o<0)a=-1,o=-o;else return null;qn.subVectors(this.origin,e);let l=a*this.direction.dot(Pa.crossVectors(qn,Pa));if(l<0)return null;let c=a*this.direction.dot(Gl.cross(qn));if(c<0||l+c>o)return null;let h=-a*qn.dot(Wl);return h<0?null:this.at(h/o,s)}applyMatrix4(e){return this.origin.applyMatrix4(e),this.direction.transformDirection(e),this}equals(e){return e.origin.equals(this.origin)&&e.direction.equals(this.direction)}clone(){return new this.constructor().copy(this)}};var Je=class n{constructor(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m){n.prototype.isMatrix4=!0,this.elements=[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1],e!==void 0&&this.set(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m)}set(e,t,i,r,s,o,a,l,c,h,u,d,f,g,x,m){let p=this.elements;return p[0]=e,p[4]=t,p[8]=i,p[12]=r,p[1]=s,p[5]=o,p[9]=a,p[13]=l,p[2]=c,p[6]=h,p[10]=u,p[14]=d,p[3]=f,p[7]=g,p[11]=x,p[15]=m,this}identity(){return this.set(1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1),this}clone(){return new n().fromArray(this.elements)}copy(e){let t=this.elements,i=e.elements;return t[0]=i[0],t[1]=i[1],t[2]=i[2],t[3]=i[3],t[4]=i[4],t[5]=i[5],t[6]=i[6],t[7]=i[7],t[8]=i[8],t[9]=i[9],t[10]=i[10],t[11]=i[11],t[12]=i[12],t[13]=i[13],t[14]=i[14],t[15]=i[15],this}copyPosition(e){let t=this.elements,i=e.elements;return t[12]=i[12],t[13]=i[13],t[14]=i[14],this}setFromMatrix3(e){let t=e.elements;return this.set(t[0],t[3],t[6],0,t[1],t[4],t[7],0,t[2],t[5],t[8],0,0,0,0,1),this}extractBasis(e,t,i){return e.setFromMatrixColumn(this,0),t.setFromMatrixColumn(this,1),i.setFromMatrixColumn(this,2),this}makeBasis(e,t,i){return this.set(e.x,t.x,i.x,0,e.y,t.y,i.y,0,e.z,t.z,i.z,0,0,0,0,1),this}extractRotation(e){let t=this.elements,i=e.elements,r=1/rs.setFromMatrixColumn(e,0).length(),s=1/rs.setFromMatrixColumn(e,1).length(),o=1/rs.setFromMatrixColumn(e,2).length();return t[0]=i[0]*r,t[1]=i[1]*r,t[2]=i[2]*r,t[3]=0,t[4]=i[4]*s,t[5]=i[5]*s,t[6]=i[6]*s,t[7]=0,t[8]=i[8]*o,t[9]=i[9]*o,t[10]=i[10]*o,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromEuler(e){let t=this.elements,i=e.x,r=e.y,s=e.z,o=Math.cos(i),a=Math.sin(i),l=Math.cos(r),c=Math.sin(r),h=Math.cos(s),u=Math.sin(s);if(e.order==="XYZ"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=-l*u,t[8]=c,t[1]=f+g*c,t[5]=d-x*c,t[9]=-a*l,t[2]=x-d*c,t[6]=g+f*c,t[10]=o*l}else if(e.order==="YXZ"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d+x*a,t[4]=g*a-f,t[8]=o*c,t[1]=o*u,t[5]=o*h,t[9]=-a,t[2]=f*a-g,t[6]=x+d*a,t[10]=o*l}else if(e.order==="ZXY"){let d=l*h,f=l*u,g=c*h,x=c*u;t[0]=d-x*a,t[4]=-o*u,t[8]=g+f*a,t[1]=f+g*a,t[5]=o*h,t[9]=x-d*a,t[2]=-o*c,t[6]=a,t[10]=o*l}else if(e.order==="ZYX"){let d=o*h,f=o*u,g=a*h,x=a*u;t[0]=l*h,t[4]=g*c-f,t[8]=d*c+x,t[1]=l*u,t[5]=x*c+d,t[9]=f*c-g,t[2]=-c,t[6]=a*l,t[10]=o*l}else if(e.order==="YZX"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=x-d*u,t[8]=g*u+f,t[1]=u,t[5]=o*h,t[9]=-a*h,t[2]=-c*h,t[6]=f*u+g,t[10]=d-x*u}else if(e.order==="XZY"){let d=o*l,f=o*c,g=a*l,x=a*c;t[0]=l*h,t[4]=-u,t[8]=c*h,t[1]=d*u+x,t[5]=o*h,t[9]=f*u-g,t[2]=g*u-f,t[6]=a*h,t[10]=x*u+d}return t[3]=0,t[7]=0,t[11]=0,t[12]=0,t[13]=0,t[14]=0,t[15]=1,this}makeRotationFromQuaternion(e){return this.compose($g,e,Qg)}lookAt(e,t,i){let r=this.elements;return Ai.subVectors(e,t),Ai.lengthSq()===0&&(Ai.z=1),Ai.normalize(),Yn.crossVectors(i,Ai),Yn.lengthSq()===0&&(Math.abs(i.z)===1?Ai.x+=1e-4:Ai.z+=1e-4,Ai.normalize(),Yn.crossVectors(i,Ai)),Yn.normalize(),Ra.crossVectors(Ai,Yn),r[0]=Yn.x,r[4]=Ra.x,r[8]=Ai.x,r[1]=Yn.y,r[5]=Ra.y,r[9]=Ai.y,r[2]=Yn.z,r[6]=Ra.z,r[10]=Ai.z,this}multiply(e){return this.multiplyMatrices(this,e)}premultiply(e){return this.multiplyMatrices(e,this)}multiplyMatrices(e,t){let i=e.elements,r=t.elements,s=this.elements,o=i[0],a=i[4],l=i[8],c=i[12],h=i[1],u=i[5],d=i[9],f=i[13],g=i[2],x=i[6],m=i[10],p=i[14],T=i[3],S=i[7],_=i[11],C=i[15],M=r[0],A=r[4],E=r[8],b=r[12],v=r[1],P=r[5],N=r[9],F=r[13],z=r[2],V=r[6],q=r[10],X=r[14],W=r[3],Y=r[7],oe=r[11],Me=r[15];return s[0]=o*M+a*v+l*z+c*W,s[4]=o*A+a*P+l*V+c*Y,s[8]=o*E+a*N+l*q+c*oe,s[12]=o*b+a*F+l*X+c*Me,s[1]=h*M+u*v+d*z+f*W,s[5]=h*A+u*P+d*V+f*Y,s[9]=h*E+u*N+d*q+f*oe,s[13]=h*b+u*F+d*X+f*Me,s[2]=g*M+x*v+m*z+p*W,s[6]=g*A+x*P+m*V+p*Y,s[10]=g*E+x*N+m*q+p*oe,s[14]=g*b+x*F+m*X+p*Me,s[3]=T*M+S*v+_*z+C*W,s[7]=T*A+S*P+_*V+C*Y,s[11]=T*E+S*N+_*q+C*oe,s[15]=T*b+S*F+_*X+C*Me,this}multiplyScalar(e){let t=this.elements;return t[0]*=e,t[4]*=e,t[8]*=e,t[12]*=e,t[1]*=e,t[5]*=e,t[9]*=e,t[13]*=e,t[2]*=e,t[6]*=e,t[10]*=e,t[14]*=e,t[3]*=e,t[7]*=e,t[11]*=e,t[15]*=e,this}determinant(){let e=this.elements,t=e[0],i=e[4],r=e[8],s=e[12],o=e[1],a=e[5],l=e[9],c=e[13],h=e[2],u=e[6],d=e[10],f=e[14],g=e[3],x=e[7],m=e[11],p=e[15];return g*(+s*l*u-r*c*u-s*a*d+i*c*d+r*a*f-i*l*f)+x*(+t*l*f-t*c*d+s*o*d-r*o*f+r*c*h-s*l*h)+m*(+t*c*u-t*a*f-s*o*u+i*o*f+s*a*h-i*c*h)+p*(-r*a*h-t*l*u+t*a*d+r*o*u-i*o*d+i*l*h)}transpose(){let e=this.elements,t;return t=e[1],e[1]=e[4],e[4]=t,t=e[2],e[2]=e[8],e[8]=t,t=e[6],e[6]=e[9],e[9]=t,t=e[3],e[3]=e[12],e[12]=t,t=e[7],e[7]=e[13],e[13]=t,t=e[11],e[11]=e[14],e[14]=t,this}setPosition(e,t,i){let r=this.elements;return e.isVector3?(r[12]=e.x,r[13]=e.y,r[14]=e.z):(r[12]=e,r[13]=t,r[14]=i),this}invert(){let e=this.elements,t=e[0],i=e[1],r=e[2],s=e[3],o=e[4],a=e[5],l=e[6],c=e[7],h=e[8],u=e[9],d=e[10],f=e[11],g=e[12],x=e[13],m=e[14],p=e[15],T=u*m*c-x*d*c+x*l*f-a*m*f-u*l*p+a*d*p,S=g*d*c-h*m*c-g*l*f+o*m*f+h*l*p-o*d*p,_=h*x*c-g*u*c+g*a*f-o*x*f-h*a*p+o*u*p,C=g*u*l-h*x*l-g*a*d+o*x*d+h*a*m-o*u*m,M=t*T+i*S+r*_+s*C;if(M===0)return this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0);let A=1/M;return e[0]=T*A,e[1]=(x*d*s-u*m*s-x*r*f+i*m*f+u*r*p-i*d*p)*A,e[2]=(a*m*s-x*l*s+x*r*c-i*m*c-a*r*p+i*l*p)*A,e[3]=(u*l*s-a*d*s-u*r*c+i*d*c+a*r*f-i*l*f)*A,e[4]=S*A,e[5]=(h*m*s-g*d*s+g*r*f-t*m*f-h*r*p+t*d*p)*A,e[6]=(g*l*s-o*m*s-g*r*c+t*m*c+o*r*p-t*l*p)*A,e[7]=(o*d*s-h*l*s+h*r*c-t*d*c-o*r*f+t*l*f)*A,e[8]=_*A,e[9]=(g*u*s-h*x*s-g*i*f+t*x*f+h*i*p-t*u*p)*A,e[10]=(o*x*s-g*a*s+g*i*c-t*x*c-o*i*p+t*a*p)*A,e[11]=(h*a*s-o*u*s-h*i*c+t*u*c+o*i*f-t*a*f)*A,e[12]=C*A,e[13]=(h*x*r-g*u*r+g*i*d-t*x*d-h*i*m+t*u*m)*A,e[14]=(g*a*r-o*x*r-g*i*l+t*x*l+o*i*m-t*a*m)*A,e[15]=(o*u*r-h*a*r+h*i*l-t*u*l-o*i*d+t*a*d)*A,this}scale(e){let t=this.elements,i=e.x,r=e.y,s=e.z;return t[0]*=i,t[4]*=r,t[8]*=s,t[1]*=i,t[5]*=r,t[9]*=s,t[2]*=i,t[6]*=r,t[10]*=s,t[3]*=i,t[7]*=r,t[11]*=s,this}getMaxScaleOnAxis(){let e=this.elements,t=e[0]*e[0]+e[1]*e[1]+e[2]*e[2],i=e[4]*e[4]+e[5]*e[5]+e[6]*e[6],r=e[8]*e[8]+e[9]*e[9]+e[10]*e[10];return Math.sqrt(Math.max(t,i,r))}makeTranslation(e,t,i){return e.isVector3?this.set(1,0,0,e.x,0,1,0,e.y,0,0,1,e.z,0,0,0,1):this.set(1,0,0,e,0,1,0,t,0,0,1,i,0,0,0,1),this}makeRotationX(e){let t=Math.cos(e),i=Math.sin(e);return this.set(1,0,0,0,0,t,-i,0,0,i,t,0,0,0,0,1),this}makeRotationY(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,0,i,0,0,1,0,0,-i,0,t,0,0,0,0,1),this}makeRotationZ(e){let t=Math.cos(e),i=Math.sin(e);return this.set(t,-i,0,0,i,t,0,0,0,0,1,0,0,0,0,1),this}makeRotationAxis(e,t){let i=Math.cos(t),r=Math.sin(t),s=1-i,o=e.x,a=e.y,l=e.z,c=s*o,h=s*a;return this.set(c*o+i,c*a-r*l,c*l+r*a,0,c*a+r*l,h*a+i,h*l-r*o,0,c*l-r*a,h*l+r*o,s*l*l+i,0,0,0,0,1),this}makeScale(e,t,i){return this.set(e,0,0,0,0,t,0,0,0,0,i,0,0,0,0,1),this}makeShear(e,t,i,r,s,o){return this.set(1,i,s,0,e,1,o,0,t,r,1,0,0,0,0,1),this}compose(e,t,i){let r=this.elements,s=t._x,o=t._y,a=t._z,l=t._w,c=s+s,h=o+o,u=a+a,d=s*c,f=s*h,g=s*u,x=o*h,m=o*u,p=a*u,T=l*c,S=l*h,_=l*u,C=i.x,M=i.y,A=i.z;return r[0]=(1-(x+p))*C,r[1]=(f+_)*C,r[2]=(g-S)*C,r[3]=0,r[4]=(f-_)*M,r[5]=(1-(d+p))*M,r[6]=(m+T)*M,r[7]=0,r[8]=(g+S)*A,r[9]=(m-T)*A,r[10]=(1-(d+x))*A,r[11]=0,r[12]=e.x,r[13]=e.y,r[14]=e.z,r[15]=1,this}decompose(e,t,i){let r=this.elements,s=rs.set(r[0],r[1],r[2]).length(),o=rs.set(r[4],r[5],r[6]).length(),a=rs.set(r[8],r[9],r[10]).length();this.determinant()<0&&(s=-s),e.x=r[12],e.y=r[13],e.z=r[14],ji.copy(this);let c=1/s,h=1/o,u=1/a;return ji.elements[0]*=c,ji.elements[1]*=c,ji.elements[2]*=c,ji.elements[4]*=h,ji.elements[5]*=h,ji.elements[6]*=h,ji.elements[8]*=u,ji.elements[9]*=u,ji.elements[10]*=u,t.setFromRotationMatrix(ji),i.x=s,i.y=o,i.z=a,this}makePerspective(e,t,i,r,s,o,a=Qt,l=!1){let c=this.elements,h=2*s/(t-e),u=2*s/(i-r),d=(t+e)/(t-e),f=(i+r)/(i-r),g,x;if(l)g=s/(o-s),x=o*s/(o-s);else if(a===Qt)g=-(o+s)/(o-s),x=-2*o*s/(o-s);else if(a===Bn)g=-o/(o-s),x=-o*s/(o-s);else throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=d,c[12]=0,c[1]=0,c[5]=u,c[9]=f,c[13]=0,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=-1,c[15]=0,this}makeOrthographic(e,t,i,r,s,o,a=Qt,l=!1){let c=this.elements,h=2/(t-e),u=2/(i-r),d=-(t+e)/(t-e),f=-(i+r)/(i-r),g,x;if(l)g=1/(o-s),x=o/(o-s);else if(a===Qt)g=-2/(o-s),x=-(o+s)/(o-s);else if(a===Bn)g=-1/(o-s),x=-s/(o-s);else throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: "+a);return c[0]=h,c[4]=0,c[8]=0,c[12]=d,c[1]=0,c[5]=u,c[9]=0,c[13]=f,c[2]=0,c[6]=0,c[10]=g,c[14]=x,c[3]=0,c[7]=0,c[11]=0,c[15]=1,this}equals(e){let t=this.elements,i=e.elements;for(let r=0;r<16;r++)if(t[r]!==i[r])return!1;return!0}fromArray(e,t=0){for(let i=0;i<16;i++)this.elements[i]=e[i+t];return this}toArray(e=[],t=0){let i=this.elements;return e[t]=i[0],e[t+1]=i[1],e[t+2]=i[2],e[t+3]=i[3],e[t+4]=i[4],e[t+5]=i[5],e[t+6]=i[6],e[t+7]=i[7],e[t+8]=i[8],e[t+9]=i[9],e[t+10]=i[10],e[t+11]=i[11],e[t+12]=i[12],e[t+13]=i[13],e[t+14]=i[14],e[t+15]=i[15],e}},rs=new R,ji=new Je,$g=new R(0,0,0),Qg=new R(1,1,1),Yn=new R,Ra=new R,Ai=new R;var mu=new Je,gu=new Nt,Wt=class n{constructor(e=0,t=0,i=0,r=n.DEFAULT_ORDER){this.isEuler=!0,this._x=e,this._y=t,this._z=i,this._order=r}get x(){return this._x}set x(e){this._x=e,this._onChangeCallback()}get y(){return this._y}set y(e){this._y=e,this._onChangeCallback()}get z(){return this._z}set z(e){this._z=e,this._onChangeCallback()}get order(){return this._order}set order(e){this._order=e,this._onChangeCallback()}set(e,t,i,r=this._order){return this._x=e,this._y=t,this._z=i,this._order=r,this._onChangeCallback(),this}clone(){return new this.constructor(this._x,this._y,this._z,this._order)}copy(e){return this._x=e._x,this._y=e._y,this._z=e._z,this._order=e._order,this._onChangeCallback(),this}setFromRotationMatrix(e,t=this._order,i=!0){let r=e.elements,s=r[0],o=r[4],a=r[8],l=r[1],c=r[5],h=r[9],u=r[2],d=r[6],f=r[10];switch(t){case"XYZ":this._y=Math.asin(qe(a,-1,1)),Math.abs(a)<.9999999?(this._x=Math.atan2(-h,f),this._z=Math.atan2(-o,s)):(this._x=Math.atan2(d,c),this._z=0);break;case"YXZ":this._x=Math.asin(-qe(h,-1,1)),Math.abs(h)<.9999999?(this._y=Math.atan2(a,f),this._z=Math.atan2(l,c)):(this._y=Math.atan2(-u,s),this._z=0);break;case"ZXY":this._x=Math.asin(qe(d,-1,1)),Math.abs(d)<.9999999?(this._y=Math.atan2(-u,f),this._z=Math.atan2(-o,c)):(this._y=0,this._z=Math.atan2(l,s));break;case"ZYX":this._y=Math.asin(-qe(u,-1,1)),Math.abs(u)<.9999999?(this._x=Math.atan2(d,f),this._z=Math.atan2(l,s)):(this._x=0,this._z=Math.atan2(-o,c));break;case"YZX":this._z=Math.asin(qe(l,-1,1)),Math.abs(l)<.9999999?(this._x=Math.atan2(-h,c),this._y=Math.atan2(-u,s)):(this._x=0,this._y=Math.atan2(a,f));break;case"XZY":this._z=Math.asin(-qe(o,-1,1)),Math.abs(o)<.9999999?(this._x=Math.atan2(d,c),this._y=Math.atan2(a,s)):(this._x=Math.atan2(-h,f),this._y=0);break;default:console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: "+t)}return this._order=t,i===!0&&this._onChangeCallback(),this}setFromQuaternion(e,t,i){return mu.makeRotationFromQuaternion(e),this.setFromRotationMatrix(mu,t,i)}setFromVector3(e,t=this._order){return this.set(e.x,e.y,e.z,t)}reorder(e){return gu.setFromEuler(this),this.setFromQuaternion(gu,e)}equals(e){return e._x===this._x&&e._y===this._y&&e._z===this._z&&e._order===this._order}fromArray(e){return this._x=e[0],this._y=e[1],this._z=e[2],e[3]!==void 0&&(this._order=e[3]),this._onChangeCallback(),this}toArray(e=[],t=0){return e[t]=this._x,e[t+1]=this._y,e[t+2]=this._z,e[t+3]=this._order,e}_onChange(e){return this._onChangeCallback=e,this}_onChangeCallback(){}*[Symbol.iterator](){yield this._x,yield this._y,yield this._z,yield this._order}};Wt.DEFAULT_ORDER="XYZ";var Sn=class{constructor(){this.mask=1}set(e){this.mask=(1<<e|0)>>>0}enable(e){this.mask|=1<<e|0}enableAll(){this.mask=-1}toggle(e){this.mask^=1<<e|0}disable(e){this.mask&=~(1<<e|0)}disableAll(){this.mask=0}test(e){return(this.mask&e.mask)!==0}isEnabled(e){return(this.mask&(1<<e|0))!==0}};var ex=0,xu=new R,ss=new Nt,wn=new Je,La=new R,So=new R,tx=new R,ix=new Nt,_u=new R(1,0,0),yu=new R(0,1,0),vu=new R(0,0,1),bu={type:"added"},nx={type:"removed"},os={type:"childadded",child:null},Xl={type:"childremoved",child:null},at=class n extends Ht{constructor(){super(),this.isObject3D=!0,Object.defineProperty(this,"id",{value:ex++}),this.uuid=ei(),this.name="",this.type="Object3D",this.parent=null,this.children=[],this.up=n.DEFAULT_UP.clone();let e=new R,t=new Wt,i=new Nt,r=new R(1,1,1);function s(){i.setFromEuler(t,!1)}function o(){t.setFromQuaternion(i,void 0,!1)}t._onChange(s),i._onChange(o),Object.defineProperties(this,{position:{configurable:!0,enumerable:!0,value:e},rotation:{configurable:!0,enumerable:!0,value:t},quaternion:{configurable:!0,enumerable:!0,value:i},scale:{configurable:!0,enumerable:!0,value:r},modelViewMatrix:{value:new Je},normalMatrix:{value:new Ye}}),this.matrix=new Je,this.matrixWorld=new Je,this.matrixAutoUpdate=n.DEFAULT_MATRIX_AUTO_UPDATE,this.matrixWorldAutoUpdate=n.DEFAULT_MATRIX_WORLD_AUTO_UPDATE,this.matrixWorldNeedsUpdate=!1,this.layers=new Sn,this.visible=!0,this.castShadow=!1,this.receiveShadow=!1,this.frustumCulled=!0,this.renderOrder=0,this.animations=[],this.customDepthMaterial=void 0,this.customDistanceMaterial=void 0,this.userData={}}onBeforeShadow(){}onAfterShadow(){}onBeforeRender(){}onAfterRender(){}applyMatrix4(e){this.matrixAutoUpdate&&this.updateMatrix(),this.matrix.premultiply(e),this.matrix.decompose(this.position,this.quaternion,this.scale)}applyQuaternion(e){return this.quaternion.premultiply(e),this}setRotationFromAxisAngle(e,t){this.quaternion.setFromAxisAngle(e,t)}setRotationFromEuler(e){this.quaternion.setFromEuler(e,!0)}setRotationFromMatrix(e){this.quaternion.setFromRotationMatrix(e)}setRotationFromQuaternion(e){this.quaternion.copy(e)}rotateOnAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.multiply(ss),this}rotateOnWorldAxis(e,t){return ss.setFromAxisAngle(e,t),this.quaternion.premultiply(ss),this}rotateX(e){return this.rotateOnAxis(_u,e)}rotateY(e){return this.rotateOnAxis(yu,e)}rotateZ(e){return this.rotateOnAxis(vu,e)}translateOnAxis(e,t){return xu.copy(e).applyQuaternion(this.quaternion),this.position.add(xu.multiplyScalar(t)),this}translateX(e){return this.translateOnAxis(_u,e)}translateY(e){return this.translateOnAxis(yu,e)}translateZ(e){return this.translateOnAxis(vu,e)}localToWorld(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(this.matrixWorld)}worldToLocal(e){return this.updateWorldMatrix(!0,!1),e.applyMatrix4(wn.copy(this.matrixWorld).invert())}lookAt(e,t,i){e.isVector3?La.copy(e):La.set(e,t,i);let r=this.parent;this.updateWorldMatrix(!0,!1),So.setFromMatrixPosition(this.matrixWorld),this.isCamera||this.isLight?wn.lookAt(So,La,this.up):wn.lookAt(La,So,this.up),this.quaternion.setFromRotationMatrix(wn),r&&(wn.extractRotation(r.matrixWorld),ss.setFromRotationMatrix(wn),this.quaternion.premultiply(ss.invert()))}add(e){if(arguments.length>1){for(let t=0;t<arguments.length;t++)this.add(arguments[t]);return this}return e===this?(console.error("THREE.Object3D.add: object can't be added as a child of itself.",e),this):(e&&e.isObject3D?(e.removeFromParent(),e.parent=this,this.children.push(e),e.dispatchEvent(bu),os.child=e,this.dispatchEvent(os),os.child=null):console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.",e),this)}remove(e){if(arguments.length>1){for(let i=0;i<arguments.length;i++)this.remove(arguments[i]);return this}let t=this.children.indexOf(e);return t!==-1&&(e.parent=null,this.children.splice(t,1),e.dispatchEvent(nx),Xl.child=e,this.dispatchEvent(Xl),Xl.child=null),this}removeFromParent(){let e=this.parent;return e!==null&&e.remove(this),this}clear(){return this.remove(...this.children)}attach(e){return this.updateWorldMatrix(!0,!1),wn.copy(this.matrixWorld).invert(),e.parent!==null&&(e.parent.updateWorldMatrix(!0,!1),wn.multiply(e.parent.matrixWorld)),e.applyMatrix4(wn),e.removeFromParent(),e.parent=this,this.children.push(e),e.updateWorldMatrix(!1,!0),e.dispatchEvent(bu),os.child=e,this.dispatchEvent(os),os.child=null,this}getObjectById(e){return this.getObjectByProperty("id",e)}getObjectByName(e){return this.getObjectByProperty("name",e)}getObjectByProperty(e,t){if(this[e]===t)return this;for(let i=0,r=this.children.length;i<r;i++){let o=this.children[i].getObjectByProperty(e,t);if(o!==void 0)return o}}getObjectsByProperty(e,t,i=[]){this[e]===t&&i.push(this);let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].getObjectsByProperty(e,t,i);return i}getWorldPosition(e){return this.updateWorldMatrix(!0,!1),e.setFromMatrixPosition(this.matrixWorld)}getWorldQuaternion(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,e,tx),e}getWorldScale(e){return this.updateWorldMatrix(!0,!1),this.matrixWorld.decompose(So,ix,e),e}getWorldDirection(e){this.updateWorldMatrix(!0,!1);let t=this.matrixWorld.elements;return e.set(t[8],t[9],t[10]).normalize()}raycast(){}traverse(e){e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverse(e)}traverseVisible(e){if(this.visible===!1)return;e(this);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].traverseVisible(e)}traverseAncestors(e){let t=this.parent;t!==null&&(e(t),t.traverseAncestors(e))}updateMatrix(){this.matrix.compose(this.position,this.quaternion,this.scale),this.matrixWorldNeedsUpdate=!0}updateMatrixWorld(e){this.matrixAutoUpdate&&this.updateMatrix(),(this.matrixWorldNeedsUpdate||e)&&(this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),this.matrixWorldNeedsUpdate=!1,e=!0);let t=this.children;for(let i=0,r=t.length;i<r;i++)t[i].updateMatrixWorld(e)}updateWorldMatrix(e,t){let i=this.parent;if(e===!0&&i!==null&&i.updateWorldMatrix(!0,!1),this.matrixAutoUpdate&&this.updateMatrix(),this.matrixWorldAutoUpdate===!0&&(this.parent===null?this.matrixWorld.copy(this.matrix):this.matrixWorld.multiplyMatrices(this.parent.matrixWorld,this.matrix)),t===!0){let r=this.children;for(let s=0,o=r.length;s<o;s++)r[s].updateWorldMatrix(!1,!0)}}toJSON(e){let t=e===void 0||typeof e=="string",i={};t&&(e={geometries:{},materials:{},textures:{},images:{},shapes:{},skeletons:{},animations:{},nodes:{}},i.metadata={version:4.7,type:"Object",generator:"Object3D.toJSON"});let r={};r.uuid=this.uuid,r.type=this.type,this.name!==""&&(r.name=this.name),this.castShadow===!0&&(r.castShadow=!0),this.receiveShadow===!0&&(r.receiveShadow=!0),this.visible===!1&&(r.visible=!1),this.frustumCulled===!1&&(r.frustumCulled=!1),this.renderOrder!==0&&(r.renderOrder=this.renderOrder),Object.keys(this.userData).length>0&&(r.userData=this.userData),r.layers=this.layers.mask,r.matrix=this.matrix.toArray(),r.up=this.up.toArray(),this.matrixAutoUpdate===!1&&(r.matrixAutoUpdate=!1),this.isInstancedMesh&&(r.type="InstancedMesh",r.count=this.count,r.instanceMatrix=this.instanceMatrix.toJSON(),this.instanceColor!==null&&(r.instanceColor=this.instanceColor.toJSON())),this.isBatchedMesh&&(r.type="BatchedMesh",r.perObjectFrustumCulled=this.perObjectFrustumCulled,r.sortObjects=this.sortObjects,r.drawRanges=this._drawRanges,r.reservedRanges=this._reservedRanges,r.geometryInfo=this._geometryInfo.map(a=>({...a,boundingBox:a.boundingBox?a.boundingBox.toJSON():void 0,boundingSphere:a.boundingSphere?a.boundingSphere.toJSON():void 0})),r.instanceInfo=this._instanceInfo.map(a=>({...a})),r.availableInstanceIds=this._availableInstanceIds.slice(),r.availableGeometryIds=this._availableGeometryIds.slice(),r.nextIndexStart=this._nextIndexStart,r.nextVertexStart=this._nextVertexStart,r.geometryCount=this._geometryCount,r.maxInstanceCount=this._maxInstanceCount,r.maxVertexCount=this._maxVertexCount,r.maxIndexCount=this._maxIndexCount,r.geometryInitialized=this._geometryInitialized,r.matricesTexture=this._matricesTexture.toJSON(e),r.indirectTexture=this._indirectTexture.toJSON(e),this._colorsTexture!==null&&(r.colorsTexture=this._colorsTexture.toJSON(e)),this.boundingSphere!==null&&(r.boundingSphere=this.boundingSphere.toJSON()),this.boundingBox!==null&&(r.boundingBox=this.boundingBox.toJSON()));function s(a,l){return a[l.uuid]===void 0&&(a[l.uuid]=l.toJSON(e)),l.uuid}if(this.isScene)this.background&&(this.background.isColor?r.background=this.background.toJSON():this.background.isTexture&&(r.background=this.background.toJSON(e).uuid)),this.environment&&this.environment.isTexture&&this.environment.isRenderTargetTexture!==!0&&(r.environment=this.environment.toJSON(e).uuid);else if(this.isMesh||this.isLine||this.isPoints){r.geometry=s(e.geometries,this.geometry);let a=this.geometry.parameters;if(a!==void 0&&a.shapes!==void 0){let l=a.shapes;if(Array.isArray(l))for(let c=0,h=l.length;c<h;c++){let u=l[c];s(e.shapes,u)}else s(e.shapes,l)}}if(this.isSkinnedMesh&&(r.bindMode=this.bindMode,r.bindMatrix=this.bindMatrix.toArray(),this.skeleton!==void 0&&(s(e.skeletons,this.skeleton),r.skeleton=this.skeleton.uuid)),this.material!==void 0)if(Array.isArray(this.material)){let a=[];for(let l=0,c=this.material.length;l<c;l++)a.push(s(e.materials,this.material[l]));r.material=a}else r.material=s(e.materials,this.material);if(this.children.length>0){r.children=[];for(let a=0;a<this.children.length;a++)r.children.push(this.children[a].toJSON(e).object)}if(this.animations.length>0){r.animations=[];for(let a=0;a<this.animations.length;a++){let l=this.animations[a];r.animations.push(s(e.animations,l))}}if(t){let a=o(e.geometries),l=o(e.materials),c=o(e.textures),h=o(e.images),u=o(e.shapes),d=o(e.skeletons),f=o(e.animations),g=o(e.nodes);a.length>0&&(i.geometries=a),l.length>0&&(i.materials=l),c.length>0&&(i.textures=c),h.length>0&&(i.images=h),u.length>0&&(i.shapes=u),d.length>0&&(i.skeletons=d),f.length>0&&(i.animations=f),g.length>0&&(i.nodes=g)}return i.object=r,i;function o(a){let l=[];for(let c in a){let h=a[c];delete h.metadata,l.push(h)}return l}}clone(e){return new this.constructor().copy(this,e)}copy(e,t=!0){if(this.name=e.name,this.up.copy(e.up),this.position.copy(e.position),this.rotation.order=e.rotation.order,this.quaternion.copy(e.quaternion),this.scale.copy(e.scale),this.matrix.copy(e.matrix),this.matrixWorld.copy(e.matrixWorld),this.matrixAutoUpdate=e.matrixAutoUpdate,this.matrixWorldAutoUpdate=e.matrixWorldAutoUpdate,this.matrixWorldNeedsUpdate=e.matrixWorldNeedsUpdate,this.layers.mask=e.layers.mask,this.visible=e.visible,this.castShadow=e.castShadow,this.receiveShadow=e.receiveShadow,this.frustumCulled=e.frustumCulled,this.renderOrder=e.renderOrder,this.animations=e.animations.slice(),this.userData=JSON.parse(JSON.stringify(e.userData)),t===!0)for(let i=0;i<e.children.length;i++){let r=e.children[i];this.add(r.clone())}return this}};at.DEFAULT_UP=new R(0,1,0);at.DEFAULT_MATRIX_AUTO_UPDATE=!0;at.DEFAULT_MATRIX_WORLD_AUTO_UPDATE=!0;var $i=new R,Tn=new R,ql=new R,En=new R,as=new R,ls=new R,Mu=new R,Yl=new R,Zl=new R,Jl=new R,Kl=new ut,jl=new ut,$l=new ut,ki=class n{constructor(e=new R,t=new R,i=new R){this.a=e,this.b=t,this.c=i}static getNormal(e,t,i,r){r.subVectors(i,t),$i.subVectors(e,t),r.cross($i);let s=r.lengthSq();return s>0?r.multiplyScalar(1/Math.sqrt(s)):r.set(0,0,0)}static getBarycoord(e,t,i,r,s){$i.subVectors(r,t),Tn.subVectors(i,t),ql.subVectors(e,t);let o=$i.dot($i),a=$i.dot(Tn),l=$i.dot(ql),c=Tn.dot(Tn),h=Tn.dot(ql),u=o*c-a*a;if(u===0)return s.set(0,0,0),null;let d=1/u,f=(c*l-a*h)*d,g=(o*h-a*l)*d;return s.set(1-f-g,g,f)}static containsPoint(e,t,i,r){return this.getBarycoord(e,t,i,r,En)===null?!1:En.x>=0&&En.y>=0&&En.x+En.y<=1}static getInterpolation(e,t,i,r,s,o,a,l){return this.getBarycoord(e,t,i,r,En)===null?(l.x=0,l.y=0,"z"in l&&(l.z=0),"w"in l&&(l.w=0),null):(l.setScalar(0),l.addScaledVector(s,En.x),l.addScaledVector(o,En.y),l.addScaledVector(a,En.z),l)}static getInterpolatedAttribute(e,t,i,r,s,o){return Kl.setScalar(0),jl.setScalar(0),$l.setScalar(0),Kl.fromBufferAttribute(e,t),jl.fromBufferAttribute(e,i),$l.fromBufferAttribute(e,r),o.setScalar(0),o.addScaledVector(Kl,s.x),o.addScaledVector(jl,s.y),o.addScaledVector($l,s.z),o}static isFrontFacing(e,t,i,r){return $i.subVectors(i,t),Tn.subVectors(e,t),$i.cross(Tn).dot(r)<0}set(e,t,i){return this.a.copy(e),this.b.copy(t),this.c.copy(i),this}setFromPointsAndIndices(e,t,i,r){return this.a.copy(e[t]),this.b.copy(e[i]),this.c.copy(e[r]),this}setFromAttributeAndIndices(e,t,i,r){return this.a.fromBufferAttribute(e,t),this.b.fromBufferAttribute(e,i),this.c.fromBufferAttribute(e,r),this}clone(){return new this.constructor().copy(this)}copy(e){return this.a.copy(e.a),this.b.copy(e.b),this.c.copy(e.c),this}getArea(){return $i.subVectors(this.c,this.b),Tn.subVectors(this.a,this.b),$i.cross(Tn).length()*.5}getMidpoint(e){return e.addVectors(this.a,this.b).add(this.c).multiplyScalar(1/3)}getNormal(e){return n.getNormal(this.a,this.b,this.c,e)}getPlane(e){return e.setFromCoplanarPoints(this.a,this.b,this.c)}getBarycoord(e,t){return n.getBarycoord(e,this.a,this.b,this.c,t)}getInterpolation(e,t,i,r,s){return n.getInterpolation(e,this.a,this.b,this.c,t,i,r,s)}containsPoint(e){return n.containsPoint(e,this.a,this.b,this.c)}isFrontFacing(e){return n.isFrontFacing(this.a,this.b,this.c,e)}intersectsBox(e){return e.intersectsTriangle(this)}closestPointToPoint(e,t){let i=this.a,r=this.b,s=this.c,o,a;as.subVectors(r,i),ls.subVectors(s,i),Yl.subVectors(e,i);let l=as.dot(Yl),c=ls.dot(Yl);if(l<=0&&c<=0)return t.copy(i);Zl.subVectors(e,r);let h=as.dot(Zl),u=ls.dot(Zl);if(h>=0&&u<=h)return t.copy(r);let d=l*u-h*c;if(d<=0&&l>=0&&h<=0)return o=l/(l-h),t.copy(i).addScaledVector(as,o);Jl.subVectors(e,s);let f=as.dot(Jl),g=ls.dot(Jl);if(g>=0&&f<=g)return t.copy(s);let x=f*c-l*g;if(x<=0&&c>=0&&g<=0)return a=c/(c-g),t.copy(i).addScaledVector(ls,a);let m=h*g-f*u;if(m<=0&&u-h>=0&&f-g>=0)return Mu.subVectors(s,r),a=(u-h)/(u-h+(f-g)),t.copy(r).addScaledVector(Mu,a);let p=1/(m+x+d);return o=x*p,a=d*p,t.copy(i).addScaledVector(as,o).addScaledVector(ls,a)}equals(e){return e.a.equals(this.a)&&e.b.equals(this.b)&&e.c.equals(this.c)}};var Su={aliceblue:15792383,antiquewhite:16444375,aqua:65535,aquamarine:8388564,azure:15794175,beige:16119260,bisque:16770244,black:0,blanchedalmond:16772045,blue:255,blueviolet:9055202,brown:10824234,burlywood:14596231,cadetblue:6266528,chartreuse:8388352,chocolate:13789470,coral:16744272,cornflowerblue:6591981,cornsilk:16775388,crimson:14423100,cyan:65535,darkblue:139,darkcyan:35723,darkgoldenrod:12092939,darkgray:11119017,darkgreen:25600,darkgrey:11119017,darkkhaki:12433259,darkmagenta:9109643,darkolivegreen:5597999,darkorange:16747520,darkorchid:10040012,darkred:9109504,darksalmon:15308410,darkseagreen:9419919,darkslateblue:4734347,darkslategray:3100495,darkslategrey:3100495,darkturquoise:52945,darkviolet:9699539,deeppink:16716947,deepskyblue:49151,dimgray:6908265,dimgrey:6908265,dodgerblue:2003199,firebrick:11674146,floralwhite:16775920,forestgreen:2263842,fuchsia:16711935,gainsboro:14474460,ghostwhite:16316671,gold:16766720,goldenrod:14329120,gray:8421504,green:32768,greenyellow:11403055,grey:8421504,honeydew:15794160,hotpink:16738740,indianred:13458524,indigo:4915330,ivory:16777200,khaki:15787660,lavender:15132410,lavenderblush:16773365,lawngreen:8190976,lemonchiffon:16775885,lightblue:11393254,lightcoral:15761536,lightcyan:14745599,lightgoldenrodyellow:16448210,lightgray:13882323,lightgreen:9498256,lightgrey:13882323,lightpink:16758465,lightsalmon:16752762,lightseagreen:2142890,lightskyblue:8900346,lightslategray:7833753,lightslategrey:7833753,lightsteelblue:11584734,lightyellow:16777184,lime:65280,limegreen:3329330,linen:16445670,magenta:16711935,maroon:8388608,mediumaquamarine:6737322,mediumblue:205,mediumorchid:12211667,mediumpurple:9662683,mediumseagreen:3978097,mediumslateblue:8087790,mediumspringgreen:64154,mediumturquoise:4772300,mediumvioletred:13047173,midnightblue:1644912,mintcream:16121850,mistyrose:16770273,moccasin:16770229,navajowhite:16768685,navy:128,oldlace:16643558,olive:8421376,olivedrab:7048739,orange:16753920,orangered:16729344,orchid:14315734,palegoldenrod:15657130,palegreen:10025880,paleturquoise:11529966,palevioletred:14381203,papayawhip:16773077,peachpuff:16767673,peru:13468991,pink:16761035,plum:14524637,powderblue:11591910,purple:8388736,rebeccapurple:6697881,red:16711680,rosybrown:12357519,royalblue:4286945,saddlebrown:9127187,salmon:16416882,sandybrown:16032864,seagreen:3050327,seashell:16774638,sienna:10506797,silver:12632256,skyblue:8900331,slateblue:6970061,slategray:7372944,slategrey:7372944,snow:16775930,springgreen:65407,steelblue:4620980,tan:13808780,teal:32896,thistle:14204888,tomato:16737095,turquoise:4251856,violet:15631086,wheat:16113331,white:16777215,whitesmoke:16119285,yellow:16776960,yellowgreen:10145074},Zn={h:0,s:0,l:0},Da={h:0,s:0,l:0};function Ql(n,e,t){return t<0&&(t+=1),t>1&&(t-=1),t<1/6?n+(e-n)*6*t:t<1/2?e:t<2/3?n+(e-n)*6*(2/3-t):n}var Pe=class{constructor(e,t,i){return this.isColor=!0,this.r=1,this.g=1,this.b=1,this.set(e,t,i)}set(e,t,i){if(t===void 0&&i===void 0){let r=e;r&&r.isColor?this.copy(r):typeof r=="number"?this.setHex(r):typeof r=="string"&&this.setStyle(r)}else this.setRGB(e,t,i);return this}setScalar(e){return this.r=e,this.g=e,this.b=e,this}setHex(e,t=kt){return e=Math.floor(e),this.r=(e>>16&255)/255,this.g=(e>>8&255)/255,this.b=(e&255)/255,st.colorSpaceToWorking(this,t),this}setRGB(e,t,i,r=st.workingColorSpace){return this.r=e,this.g=t,this.b=i,st.colorSpaceToWorking(this,r),this}setHSL(e,t,i,r=st.workingColorSpace){if(e=wa(e,1),t=qe(t,0,1),i=qe(i,0,1),t===0)this.r=this.g=this.b=i;else{let s=i<=.5?i*(1+t):i+t-i*t,o=2*i-s;this.r=Ql(o,s,e+1/3),this.g=Ql(o,s,e),this.b=Ql(o,s,e-1/3)}return st.colorSpaceToWorking(this,r),this}setStyle(e,t=kt){function i(s){s!==void 0&&parseFloat(s)<1&&console.warn("THREE.Color: Alpha component of "+e+" will be ignored.")}let r;if(r=/^(\w+)\(([^\)]*)\)/.exec(e)){let s,o=r[1],a=r[2];switch(o){case"rgb":case"rgba":if(s=/^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(255,parseInt(s[1],10))/255,Math.min(255,parseInt(s[2],10))/255,Math.min(255,parseInt(s[3],10))/255,t);if(s=/^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setRGB(Math.min(100,parseInt(s[1],10))/100,Math.min(100,parseInt(s[2],10))/100,Math.min(100,parseInt(s[3],10))/100,t);break;case"hsl":case"hsla":if(s=/^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(a))return i(s[4]),this.setHSL(parseFloat(s[1])/360,parseFloat(s[2])/100,parseFloat(s[3])/100,t);break;default:console.warn("THREE.Color: Unknown color model "+e)}}else if(r=/^\#([A-Fa-f\d]+)$/.exec(e)){let s=r[1],o=s.length;if(o===3)return this.setRGB(parseInt(s.charAt(0),16)/15,parseInt(s.charAt(1),16)/15,parseInt(s.charAt(2),16)/15,t);if(o===6)return this.setHex(parseInt(s,16),t);console.warn("THREE.Color: Invalid hex color "+e)}else if(e&&e.length>0)return this.setColorName(e,t);return this}setColorName(e,t=kt){let i=Su[e.toLowerCase()];return i!==void 0?this.setHex(i,t):console.warn("THREE.Color: Unknown color "+e),this}clone(){return new this.constructor(this.r,this.g,this.b)}copy(e){return this.r=e.r,this.g=e.g,this.b=e.b,this}copySRGBToLinear(e){return this.r=Ji(e.r),this.g=Ji(e.g),this.b=Ji(e.b),this}copyLinearToSRGB(e){return this.r=fr(e.r),this.g=fr(e.g),this.b=fr(e.b),this}convertSRGBToLinear(){return this.copySRGBToLinear(this),this}convertLinearToSRGB(){return this.copyLinearToSRGB(this),this}getHex(e=kt){return st.workingToColorSpace(ai.copy(this),e),Math.round(qe(ai.r*255,0,255))*65536+Math.round(qe(ai.g*255,0,255))*256+Math.round(qe(ai.b*255,0,255))}getHexString(e=kt){return("000000"+this.getHex(e).toString(16)).slice(-6)}getHSL(e,t=st.workingColorSpace){st.workingToColorSpace(ai.copy(this),t);let i=ai.r,r=ai.g,s=ai.b,o=Math.max(i,r,s),a=Math.min(i,r,s),l,c,h=(a+o)/2;if(a===o)l=0,c=0;else{let u=o-a;switch(c=h<=.5?u/(o+a):u/(2-o-a),o){case i:l=(r-s)/u+(r<s?6:0);break;case r:l=(s-i)/u+2;break;case s:l=(i-r)/u+4;break}l/=6}return e.h=l,e.s=c,e.l=h,e}getRGB(e,t=st.workingColorSpace){return st.workingToColorSpace(ai.copy(this),t),e.r=ai.r,e.g=ai.g,e.b=ai.b,e}getStyle(e=kt){st.workingToColorSpace(ai.copy(this),e);let t=ai.r,i=ai.g,r=ai.b;return e!==kt?`color(${e} ${t.toFixed(3)} ${i.toFixed(3)} ${r.toFixed(3)})`:`rgb(${Math.round(t*255)},${Math.round(i*255)},${Math.round(r*255)})`}offsetHSL(e,t,i){return this.getHSL(Zn),this.setHSL(Zn.h+e,Zn.s+t,Zn.l+i)}add(e){return this.r+=e.r,this.g+=e.g,this.b+=e.b,this}addColors(e,t){return this.r=e.r+t.r,this.g=e.g+t.g,this.b=e.b+t.b,this}addScalar(e){return this.r+=e,this.g+=e,this.b+=e,this}sub(e){return this.r=Math.max(0,this.r-e.r),this.g=Math.max(0,this.g-e.g),this.b=Math.max(0,this.b-e.b),this}multiply(e){return this.r*=e.r,this.g*=e.g,this.b*=e.b,this}multiplyScalar(e){return this.r*=e,this.g*=e,this.b*=e,this}lerp(e,t){return this.r+=(e.r-this.r)*t,this.g+=(e.g-this.g)*t,this.b+=(e.b-this.b)*t,this}lerpColors(e,t,i){return this.r=e.r+(t.r-e.r)*i,this.g=e.g+(t.g-e.g)*i,this.b=e.b+(t.b-e.b)*i,this}lerpHSL(e,t){this.getHSL(Zn),e.getHSL(Da);let i=$r(Zn.h,Da.h,t),r=$r(Zn.s,Da.s,t),s=$r(Zn.l,Da.l,t);return this.setHSL(i,r,s),this}setFromVector3(e){return this.r=e.x,this.g=e.y,this.b=e.z,this}applyMatrix3(e){let t=this.r,i=this.g,r=this.b,s=e.elements;return this.r=s[0]*t+s[3]*i+s[6]*r,this.g=s[1]*t+s[4]*i+s[7]*r,this.b=s[2]*t+s[5]*i+s[8]*r,this}equals(e){return e.r===this.r&&e.g===this.g&&e.b===this.b}fromArray(e,t=0){return this.r=e[t],this.g=e[t+1],this.b=e[t+2],this}toArray(e=[],t=0){return e[t]=this.r,e[t+1]=this.g,e[t+2]=this.b,e}fromBufferAttribute(e,t){return this.r=e.getX(t),this.g=e.getY(t),this.b=e.getZ(t),this}toJSON(){return this.getHex()}*[Symbol.iterator](){yield this.r,yield this.g,yield this.b}},ai=new Pe;Pe.NAMES=Su;var rx=0,wt=class extends Ht{constructor(){super(),this.isMaterial=!0,Object.defineProperty(this,"id",{value:rx++}),this.uuid=ei(),this.name="",this.type="Material",this.blending=un,this.side=wi,this.vertexColors=!1,this.opacity=1,this.transparent=!1,this.alphaHash=!1,this.blendSrc=Vs,this.blendDst=Hs,this.blendEquation=fn,this.blendSrcAlpha=null,this.blendDstAlpha=null,this.blendEquationAlpha=null,this.blendColor=new Pe(0,0,0),this.blendAlpha=0,this.depthFunc=Nn,this.depthTest=!0,this.depthWrite=!0,this.stencilWriteMask=255,this.stencilFunc=Dl,this.stencilRef=0,this.stencilFuncMask=255,this.stencilFail=ur,this.stencilZFail=ur,this.stencilZPass=ur,this.stencilWrite=!1,this.clippingPlanes=null,this.clipIntersection=!1,this.clipShadows=!1,this.shadowSide=null,this.colorWrite=!0,this.precision=null,this.polygonOffset=!1,this.polygonOffsetFactor=0,this.polygonOffsetUnits=0,this.dithering=!1,this.alphaToCoverage=!1,this.premultipliedAlpha=!1,this.forceSinglePass=!1,this.allowOverride=!0,this.visible=!0,this.toneMapped=!0,this.userData={},this.version=0,this._alphaTest=0}get alphaTest(){return this._alphaTest}set alphaTest(e){this._alphaTest>0!=e>0&&this.version++,this._alphaTest=e}onBeforeRender(){}onBeforeCompile(){}customProgramCacheKey(){return this.onBeforeCompile.toString()}setValues(e){if(e!==void 0)for(let t in e){let i=e[t];if(i===void 0){console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);continue}let r=this[t];if(r===void 0){console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);continue}r&&r.isColor?r.set(i):r&&r.isVector3&&i&&i.isVector3?r.copy(i):this[t]=i}}toJSON(e){let t=e===void 0||typeof e=="string";t&&(e={textures:{},images:{}});let i={metadata:{version:4.7,type:"Material",generator:"Material.toJSON"}};i.uuid=this.uuid,i.type=this.type,this.name!==""&&(i.name=this.name),this.color&&this.color.isColor&&(i.color=this.color.getHex()),this.roughness!==void 0&&(i.roughness=this.roughness),this.metalness!==void 0&&(i.metalness=this.metalness),this.sheen!==void 0&&(i.sheen=this.sheen),this.sheenColor&&this.sheenColor.isColor&&(i.sheenColor=this.sheenColor.getHex()),this.sheenRoughness!==void 0&&(i.sheenRoughness=this.sheenRoughness),this.emissive&&this.emissive.isColor&&(i.emissive=this.emissive.getHex()),this.emissiveIntensity!==void 0&&this.emissiveIntensity!==1&&(i.emissiveIntensity=this.emissiveIntensity),this.specular&&this.specular.isColor&&(i.specular=this.specular.getHex()),this.specularIntensity!==void 0&&(i.specularIntensity=this.specularIntensity),this.specularColor&&this.specularColor.isColor&&(i.specularColor=this.specularColor.getHex()),this.shininess!==void 0&&(i.shininess=this.shininess),this.clearcoat!==void 0&&(i.clearcoat=this.clearcoat),this.clearcoatRoughness!==void 0&&(i.clearcoatRoughness=this.clearcoatRoughness),this.clearcoatMap&&this.clearcoatMap.isTexture&&(i.clearcoatMap=this.clearcoatMap.toJSON(e).uuid),this.clearcoatRoughnessMap&&this.clearcoatRoughnessMap.isTexture&&(i.clearcoatRoughnessMap=this.clearcoatRoughnessMap.toJSON(e).uuid),this.clearcoatNormalMap&&this.clearcoatNormalMap.isTexture&&(i.clearcoatNormalMap=this.clearcoatNormalMap.toJSON(e).uuid,i.clearcoatNormalScale=this.clearcoatNormalScale.toArray()),this.sheenColorMap&&this.sheenColorMap.isTexture&&(i.sheenColorMap=this.sheenColorMap.toJSON(e).uuid),this.sheenRoughnessMap&&this.sheenRoughnessMap.isTexture&&(i.sheenRoughnessMap=this.sheenRoughnessMap.toJSON(e).uuid),this.dispersion!==void 0&&(i.dispersion=this.dispersion),this.iridescence!==void 0&&(i.iridescence=this.iridescence),this.iridescenceIOR!==void 0&&(i.iridescenceIOR=this.iridescenceIOR),this.iridescenceThicknessRange!==void 0&&(i.iridescenceThicknessRange=this.iridescenceThicknessRange),this.iridescenceMap&&this.iridescenceMap.isTexture&&(i.iridescenceMap=this.iridescenceMap.toJSON(e).uuid),this.iridescenceThicknessMap&&this.iridescenceThicknessMap.isTexture&&(i.iridescenceThicknessMap=this.iridescenceThicknessMap.toJSON(e).uuid),this.anisotropy!==void 0&&(i.anisotropy=this.anisotropy),this.anisotropyRotation!==void 0&&(i.anisotropyRotation=this.anisotropyRotation),this.anisotropyMap&&this.anisotropyMap.isTexture&&(i.anisotropyMap=this.anisotropyMap.toJSON(e).uuid),this.map&&this.map.isTexture&&(i.map=this.map.toJSON(e).uuid),this.matcap&&this.matcap.isTexture&&(i.matcap=this.matcap.toJSON(e).uuid),this.alphaMap&&this.alphaMap.isTexture&&(i.alphaMap=this.alphaMap.toJSON(e).uuid),this.lightMap&&this.lightMap.isTexture&&(i.lightMap=this.lightMap.toJSON(e).uuid,i.lightMapIntensity=this.lightMapIntensity),this.aoMap&&this.aoMap.isTexture&&(i.aoMap=this.aoMap.toJSON(e).uuid,i.aoMapIntensity=this.aoMapIntensity),this.bumpMap&&this.bumpMap.isTexture&&(i.bumpMap=this.bumpMap.toJSON(e).uuid,i.bumpScale=this.bumpScale),this.normalMap&&this.normalMap.isTexture&&(i.normalMap=this.normalMap.toJSON(e).uuid,i.normalMapType=this.normalMapType,i.normalScale=this.normalScale.toArray()),this.displacementMap&&this.displacementMap.isTexture&&(i.displacementMap=this.displacementMap.toJSON(e).uuid,i.displacementScale=this.displacementScale,i.displacementBias=this.displacementBias),this.roughnessMap&&this.roughnessMap.isTexture&&(i.roughnessMap=this.roughnessMap.toJSON(e).uuid),this.metalnessMap&&this.metalnessMap.isTexture&&(i.metalnessMap=this.metalnessMap.toJSON(e).uuid),this.emissiveMap&&this.emissiveMap.isTexture&&(i.emissiveMap=this.emissiveMap.toJSON(e).uuid),this.specularMap&&this.specularMap.isTexture&&(i.specularMap=this.specularMap.toJSON(e).uuid),this.specularIntensityMap&&this.specularIntensityMap.isTexture&&(i.specularIntensityMap=this.specularIntensityMap.toJSON(e).uuid),this.specularColorMap&&this.specularColorMap.isTexture&&(i.specularColorMap=this.specularColorMap.toJSON(e).uuid),this.envMap&&this.envMap.isTexture&&(i.envMap=this.envMap.toJSON(e).uuid,this.combine!==void 0&&(i.combine=this.combine)),this.envMapRotation!==void 0&&(i.envMapRotation=this.envMapRotation.toArray()),this.envMapIntensity!==void 0&&(i.envMapIntensity=this.envMapIntensity),this.reflectivity!==void 0&&(i.reflectivity=this.reflectivity),this.refractionRatio!==void 0&&(i.refractionRatio=this.refractionRatio),this.gradientMap&&this.gradientMap.isTexture&&(i.gradientMap=this.gradientMap.toJSON(e).uuid),this.transmission!==void 0&&(i.transmission=this.transmission),this.transmissionMap&&this.transmissionMap.isTexture&&(i.transmissionMap=this.transmissionMap.toJSON(e).uuid),this.thickness!==void 0&&(i.thickness=this.thickness),this.thicknessMap&&this.thicknessMap.isTexture&&(i.thicknessMap=this.thicknessMap.toJSON(e).uuid),this.attenuationDistance!==void 0&&this.attenuationDistance!==1/0&&(i.attenuationDistance=this.attenuationDistance),this.attenuationColor!==void 0&&(i.attenuationColor=this.attenuationColor.getHex()),this.size!==void 0&&(i.size=this.size),this.shadowSide!==null&&(i.shadowSide=this.shadowSide),this.sizeAttenuation!==void 0&&(i.sizeAttenuation=this.sizeAttenuation),this.blending!==un&&(i.blending=this.blending),this.side!==wi&&(i.side=this.side),this.vertexColors===!0&&(i.vertexColors=!0),this.opacity<1&&(i.opacity=this.opacity),this.transparent===!0&&(i.transparent=!0),this.blendSrc!==Vs&&(i.blendSrc=this.blendSrc),this.blendDst!==Hs&&(i.blendDst=this.blendDst),this.blendEquation!==fn&&(i.blendEquation=this.blendEquation),this.blendSrcAlpha!==null&&(i.blendSrcAlpha=this.blendSrcAlpha),this.blendDstAlpha!==null&&(i.blendDstAlpha=this.blendDstAlpha),this.blendEquationAlpha!==null&&(i.blendEquationAlpha=this.blendEquationAlpha),this.blendColor&&this.blendColor.isColor&&(i.blendColor=this.blendColor.getHex()),this.blendAlpha!==0&&(i.blendAlpha=this.blendAlpha),this.depthFunc!==Nn&&(i.depthFunc=this.depthFunc),this.depthTest===!1&&(i.depthTest=this.depthTest),this.depthWrite===!1&&(i.depthWrite=this.depthWrite),this.colorWrite===!1&&(i.colorWrite=this.colorWrite),this.stencilWriteMask!==255&&(i.stencilWriteMask=this.stencilWriteMask),this.stencilFunc!==Dl&&(i.stencilFunc=this.stencilFunc),this.stencilRef!==0&&(i.stencilRef=this.stencilRef),this.stencilFuncMask!==255&&(i.stencilFuncMask=this.stencilFuncMask),this.stencilFail!==ur&&(i.stencilFail=this.stencilFail),this.stencilZFail!==ur&&(i.stencilZFail=this.stencilZFail),this.stencilZPass!==ur&&(i.stencilZPass=this.stencilZPass),this.stencilWrite===!0&&(i.stencilWrite=this.stencilWrite),this.rotation!==void 0&&this.rotation!==0&&(i.rotation=this.rotation),this.polygonOffset===!0&&(i.polygonOffset=!0),this.polygonOffsetFactor!==0&&(i.polygonOffsetFactor=this.polygonOffsetFactor),this.polygonOffsetUnits!==0&&(i.polygonOffsetUnits=this.polygonOffsetUnits),this.linewidth!==void 0&&this.linewidth!==1&&(i.linewidth=this.linewidth),this.dashSize!==void 0&&(i.dashSize=this.dashSize),this.gapSize!==void 0&&(i.gapSize=this.gapSize),this.scale!==void 0&&(i.scale=this.scale),this.dithering===!0&&(i.dithering=!0),this.alphaTest>0&&(i.alphaTest=this.alphaTest),this.alphaHash===!0&&(i.alphaHash=!0),this.alphaToCoverage===!0&&(i.alphaToCoverage=!0),this.premultipliedAlpha===!0&&(i.premultipliedAlpha=!0),this.forceSinglePass===!0&&(i.forceSinglePass=!0),this.wireframe===!0&&(i.wireframe=!0),this.wireframeLinewidth>1&&(i.wireframeLinewidth=this.wireframeLinewidth),this.wireframeLinecap!=="round"&&(i.wireframeLinecap=this.wireframeLinecap),this.wireframeLinejoin!=="round"&&(i.wireframeLinejoin=this.wireframeLinejoin),this.flatShading===!0&&(i.flatShading=!0),this.visible===!1&&(i.visible=!1),this.toneMapped===!1&&(i.toneMapped=!1),this.fog===!1&&(i.fog=!1),Object.keys(this.userData).length>0&&(i.userData=this.userData);function r(s){let o=[];for(let a in s){let l=s[a];delete l.metadata,o.push(l)}return o}if(t){let s=r(e.textures),o=r(e.images);s.length>0&&(i.textures=s),o.length>0&&(i.images=o)}return i}clone(){return new this.constructor().copy(this)}copy(e){this.name=e.name,this.blending=e.blending,this.side=e.side,this.vertexColors=e.vertexColors,this.opacity=e.opacity,this.transparent=e.transparent,this.blendSrc=e.blendSrc,this.blendDst=e.blendDst,this.blendEquation=e.blendEquation,this.blendSrcAlpha=e.blendSrcAlpha,this.blendDstAlpha=e.blendDstAlpha,this.blendEquationAlpha=e.blendEquationAlpha,this.blendColor.copy(e.blendColor),this.blendAlpha=e.blendAlpha,this.depthFunc=e.depthFunc,this.depthTest=e.depthTest,this.depthWrite=e.depthWrite,this.stencilWriteMask=e.stencilWriteMask,this.stencilFunc=e.stencilFunc,this.stencilRef=e.stencilRef,this.stencilFuncMask=e.stencilFuncMask,this.stencilFail=e.stencilFail,this.stencilZFail=e.stencilZFail,this.stencilZPass=e.stencilZPass,this.stencilWrite=e.stencilWrite;let t=e.clippingPlanes,i=null;if(t!==null){let r=t.length;i=new Array(r);for(let s=0;s!==r;++s)i[s]=t[s].clone()}return this.clippingPlanes=i,this.clipIntersection=e.clipIntersection,this.clipShadows=e.clipShadows,this.shadowSide=e.shadowSide,this.colorWrite=e.colorWrite,this.precision=e.precision,this.polygonOffset=e.polygonOffset,this.polygonOffsetFactor=e.polygonOffsetFactor,this.polygonOffsetUnits=e.polygonOffsetUnits,this.dithering=e.dithering,this.alphaTest=e.alphaTest,this.alphaHash=e.alphaHash,this.alphaToCoverage=e.alphaToCoverage,this.premultipliedAlpha=e.premultipliedAlpha,this.forceSinglePass=e.forceSinglePass,this.visible=e.visible,this.toneMapped=e.toneMapped,this.userData=JSON.parse(JSON.stringify(e.userData)),this}dispose(){this.dispatchEvent({type:"dispose"})}set needsUpdate(e){e===!0&&this.version++}};var zi=class extends wt{constructor(e){super(),this.isMeshBasicMaterial=!0,this.type="MeshBasicMaterial",this.color=new Pe(16777215),this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.specularMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.combine=kr,this.reflectivity=1,this.refractionRatio=.98,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.specularMap=e.specularMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.combine=e.combine,this.reflectivity=e.reflectivity,this.refractionRatio=e.refractionRatio,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.fog=e.fog,this}};var zt=new R,Na=new ie,sx=0,mt=class{constructor(e,t,i=!1){if(Array.isArray(e))throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");this.isBufferAttribute=!0,Object.defineProperty(this,"id",{value:sx++}),this.name="",this.array=e,this.itemSize=t,this.count=e!==void 0?e.length/t:0,this.normalized=i,this.usage=vo,this.updateRanges=[],this.gpuType=Jt,this.version=0}onUploadCallback(){}set needsUpdate(e){e===!0&&this.version++}setUsage(e){return this.usage=e,this}addUpdateRange(e,t){this.updateRanges.push({start:e,count:t})}clearUpdateRanges(){this.updateRanges.length=0}copy(e){return this.name=e.name,this.array=new e.array.constructor(e.array),this.itemSize=e.itemSize,this.count=e.count,this.normalized=e.normalized,this.usage=e.usage,this.gpuType=e.gpuType,this}copyAt(e,t,i){e*=this.itemSize,i*=t.itemSize;for(let r=0,s=this.itemSize;r<s;r++)this.array[e+r]=t.array[i+r];return this}copyArray(e){return this.array.set(e),this}applyMatrix3(e){if(this.itemSize===2)for(let t=0,i=this.count;t<i;t++)Na.fromBufferAttribute(this,t),Na.applyMatrix3(e),this.setXY(t,Na.x,Na.y);else if(this.itemSize===3)for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix3(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyMatrix4(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyMatrix4(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}applyNormalMatrix(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.applyNormalMatrix(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}transformDirection(e){for(let t=0,i=this.count;t<i;t++)zt.fromBufferAttribute(this,t),zt.transformDirection(e),this.setXYZ(t,zt.x,zt.y,zt.z);return this}set(e,t=0){return this.array.set(e,t),this}getComponent(e,t){let i=this.array[e*this.itemSize+t];return this.normalized&&(i=zn(i,this.array)),i}setComponent(e,t,i){return this.normalized&&(i=ti(i,this.array)),this.array[e*this.itemSize+t]=i,this}getX(e){let t=this.array[e*this.itemSize];return this.normalized&&(t=zn(t,this.array)),t}setX(e,t){return this.normalized&&(t=ti(t,this.array)),this.array[e*this.itemSize]=t,this}getY(e){let t=this.array[e*this.itemSize+1];return this.normalized&&(t=zn(t,this.array)),t}setY(e,t){return this.normalized&&(t=ti(t,this.array)),this.array[e*this.itemSize+1]=t,this}getZ(e){let t=this.array[e*this.itemSize+2];return this.normalized&&(t=zn(t,this.array)),t}setZ(e,t){return this.normalized&&(t=ti(t,this.array)),this.array[e*this.itemSize+2]=t,this}getW(e){let t=this.array[e*this.itemSize+3];return this.normalized&&(t=zn(t,this.array)),t}setW(e,t){return this.normalized&&(t=ti(t,this.array)),this.array[e*this.itemSize+3]=t,this}setXY(e,t,i){return e*=this.itemSize,this.normalized&&(t=ti(t,this.array),i=ti(i,this.array)),this.array[e+0]=t,this.array[e+1]=i,this}setXYZ(e,t,i,r){return e*=this.itemSize,this.normalized&&(t=ti(t,this.array),i=ti(i,this.array),r=ti(r,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this}setXYZW(e,t,i,r,s){return e*=this.itemSize,this.normalized&&(t=ti(t,this.array),i=ti(i,this.array),r=ti(r,this.array),s=ti(s,this.array)),this.array[e+0]=t,this.array[e+1]=i,this.array[e+2]=r,this.array[e+3]=s,this}onUpload(e){return this.onUploadCallback=e,this}clone(){return new this.constructor(this.array,this.itemSize).copy(this)}toJSON(){let e={itemSize:this.itemSize,type:this.array.constructor.name,array:Array.from(this.array),normalized:this.normalized};return this.name!==""&&(e.name=this.name),this.usage!==vo&&(e.usage=this.usage),e}};var cs=class extends mt{constructor(e,t,i){super(new Uint16Array(e),t,i)}};var hs=class extends mt{constructor(e,t,i){super(new Uint32Array(e),t,i)}};var tt=class extends mt{constructor(e,t,i){super(new Float32Array(e),t,i)}};var ox=0,Vi=new Je,ec=new at,us=new R,Ci=new Gt,wo=new Gt,Kt=new R,Ke=class n extends Ht{constructor(){super(),this.isBufferGeometry=!0,Object.defineProperty(this,"id",{value:ox++}),this.uuid=ei(),this.name="",this.type="BufferGeometry",this.index=null,this.indirect=null,this.attributes={},this.morphAttributes={},this.morphTargetsRelative=!1,this.groups=[],this.boundingBox=null,this.boundingSphere=null,this.drawRange={start:0,count:1/0},this.userData={}}getIndex(){return this.index}setIndex(e){return Array.isArray(e)?this.index=new(Ta(e)?hs:cs)(e,1):this.index=e,this}setIndirect(e){return this.indirect=e,this}getIndirect(){return this.indirect}getAttribute(e){return this.attributes[e]}setAttribute(e,t){return this.attributes[e]=t,this}deleteAttribute(e){return delete this.attributes[e],this}hasAttribute(e){return this.attributes[e]!==void 0}addGroup(e,t,i=0){this.groups.push({start:e,count:t,materialIndex:i})}clearGroups(){this.groups=[]}setDrawRange(e,t){this.drawRange.start=e,this.drawRange.count=t}applyMatrix4(e){let t=this.attributes.position;t!==void 0&&(t.applyMatrix4(e),t.needsUpdate=!0);let i=this.attributes.normal;if(i!==void 0){let s=new Ye().getNormalMatrix(e);i.applyNormalMatrix(s),i.needsUpdate=!0}let r=this.attributes.tangent;return r!==void 0&&(r.transformDirection(e),r.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}applyQuaternion(e){return Vi.makeRotationFromQuaternion(e),this.applyMatrix4(Vi),this}rotateX(e){return Vi.makeRotationX(e),this.applyMatrix4(Vi),this}rotateY(e){return Vi.makeRotationY(e),this.applyMatrix4(Vi),this}rotateZ(e){return Vi.makeRotationZ(e),this.applyMatrix4(Vi),this}translate(e,t,i){return Vi.makeTranslation(e,t,i),this.applyMatrix4(Vi),this}scale(e,t,i){return Vi.makeScale(e,t,i),this.applyMatrix4(Vi),this}lookAt(e){return ec.lookAt(e),ec.updateMatrix(),this.applyMatrix4(ec.matrix),this}center(){return this.computeBoundingBox(),this.boundingBox.getCenter(us).negate(),this.translate(us.x,us.y,us.z),this}setFromPoints(e){let t=this.getAttribute("position");if(t===void 0){let i=[];for(let r=0,s=e.length;r<s;r++){let o=e[r];i.push(o.x,o.y,o.z||0)}this.setAttribute("position",new tt(i,3))}else{let i=Math.min(e.length,t.count);for(let r=0;r<i;r++){let s=e[r];t.setXYZ(r,s.x,s.y,s.z||0)}e.length>t.count&&console.warn("THREE.BufferGeometry: Buffer size too small for points data. Use .dispose() and create a new geometry."),t.needsUpdate=!0}return this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new Gt);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box.",this),this.boundingBox.set(new R(-1/0,-1/0,-1/0),new R(1/0,1/0,1/0));return}if(e!==void 0){if(this.boundingBox.setFromBufferAttribute(e),t)for(let i=0,r=t.length;i<r;i++){let s=t[i];Ci.setFromBufferAttribute(s),this.morphTargetsRelative?(Kt.addVectors(this.boundingBox.min,Ci.min),this.boundingBox.expandByPoint(Kt),Kt.addVectors(this.boundingBox.max,Ci.max),this.boundingBox.expandByPoint(Kt)):(this.boundingBox.expandByPoint(Ci.min),this.boundingBox.expandByPoint(Ci.max))}}else this.boundingBox.makeEmpty();(isNaN(this.boundingBox.min.x)||isNaN(this.boundingBox.min.y)||isNaN(this.boundingBox.min.z))&&console.error('THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The "position" attribute is likely to have NaN values.',this)}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new ni);let e=this.attributes.position,t=this.morphAttributes.position;if(e&&e.isGLBufferAttribute){console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere.",this),this.boundingSphere.set(new R,1/0);return}if(e){let i=this.boundingSphere.center;if(Ci.setFromBufferAttribute(e),t)for(let s=0,o=t.length;s<o;s++){let a=t[s];wo.setFromBufferAttribute(a),this.morphTargetsRelative?(Kt.addVectors(Ci.min,wo.min),Ci.expandByPoint(Kt),Kt.addVectors(Ci.max,wo.max),Ci.expandByPoint(Kt)):(Ci.expandByPoint(wo.min),Ci.expandByPoint(wo.max))}Ci.getCenter(i);let r=0;for(let s=0,o=e.count;s<o;s++)Kt.fromBufferAttribute(e,s),r=Math.max(r,i.distanceToSquared(Kt));if(t)for(let s=0,o=t.length;s<o;s++){let a=t[s],l=this.morphTargetsRelative;for(let c=0,h=a.count;c<h;c++)Kt.fromBufferAttribute(a,c),l&&(us.fromBufferAttribute(e,c),Kt.add(us)),r=Math.max(r,i.distanceToSquared(Kt))}this.boundingSphere.radius=Math.sqrt(r),isNaN(this.boundingSphere.radius)&&console.error('THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The "position" attribute is likely to have NaN values.',this)}}computeTangents(){let e=this.index,t=this.attributes;if(e===null||t.position===void 0||t.normal===void 0||t.uv===void 0){console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");return}let i=t.position,r=t.normal,s=t.uv;this.hasAttribute("tangent")===!1&&this.setAttribute("tangent",new mt(new Float32Array(4*i.count),4));let o=this.getAttribute("tangent"),a=[],l=[];for(let E=0;E<i.count;E++)a[E]=new R,l[E]=new R;let c=new R,h=new R,u=new R,d=new ie,f=new ie,g=new ie,x=new R,m=new R;function p(E,b,v){c.fromBufferAttribute(i,E),h.fromBufferAttribute(i,b),u.fromBufferAttribute(i,v),d.fromBufferAttribute(s,E),f.fromBufferAttribute(s,b),g.fromBufferAttribute(s,v),h.sub(c),u.sub(c),f.sub(d),g.sub(d);let P=1/(f.x*g.y-g.x*f.y);isFinite(P)&&(x.copy(h).multiplyScalar(g.y).addScaledVector(u,-f.y).multiplyScalar(P),m.copy(u).multiplyScalar(f.x).addScaledVector(h,-g.x).multiplyScalar(P),a[E].add(x),a[b].add(x),a[v].add(x),l[E].add(m),l[b].add(m),l[v].add(m))}let T=this.groups;T.length===0&&(T=[{start:0,count:e.count}]);for(let E=0,b=T.length;E<b;++E){let v=T[E],P=v.start,N=v.count;for(let F=P,z=P+N;F<z;F+=3)p(e.getX(F+0),e.getX(F+1),e.getX(F+2))}let S=new R,_=new R,C=new R,M=new R;function A(E){C.fromBufferAttribute(r,E),M.copy(C);let b=a[E];S.copy(b),S.sub(C.multiplyScalar(C.dot(b))).normalize(),_.crossVectors(M,b);let P=_.dot(l[E])<0?-1:1;o.setXYZW(E,S.x,S.y,S.z,P)}for(let E=0,b=T.length;E<b;++E){let v=T[E],P=v.start,N=v.count;for(let F=P,z=P+N;F<z;F+=3)A(e.getX(F+0)),A(e.getX(F+1)),A(e.getX(F+2))}}computeVertexNormals(){let e=this.index,t=this.getAttribute("position");if(t!==void 0){let i=this.getAttribute("normal");if(i===void 0)i=new mt(new Float32Array(t.count*3),3),this.setAttribute("normal",i);else for(let d=0,f=i.count;d<f;d++)i.setXYZ(d,0,0,0);let r=new R,s=new R,o=new R,a=new R,l=new R,c=new R,h=new R,u=new R;if(e)for(let d=0,f=e.count;d<f;d+=3){let g=e.getX(d+0),x=e.getX(d+1),m=e.getX(d+2);r.fromBufferAttribute(t,g),s.fromBufferAttribute(t,x),o.fromBufferAttribute(t,m),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),a.fromBufferAttribute(i,g),l.fromBufferAttribute(i,x),c.fromBufferAttribute(i,m),a.add(h),l.add(h),c.add(h),i.setXYZ(g,a.x,a.y,a.z),i.setXYZ(x,l.x,l.y,l.z),i.setXYZ(m,c.x,c.y,c.z)}else for(let d=0,f=t.count;d<f;d+=3)r.fromBufferAttribute(t,d+0),s.fromBufferAttribute(t,d+1),o.fromBufferAttribute(t,d+2),h.subVectors(o,s),u.subVectors(r,s),h.cross(u),i.setXYZ(d+0,h.x,h.y,h.z),i.setXYZ(d+1,h.x,h.y,h.z),i.setXYZ(d+2,h.x,h.y,h.z);this.normalizeNormals(),i.needsUpdate=!0}}normalizeNormals(){let e=this.attributes.normal;for(let t=0,i=e.count;t<i;t++)Kt.fromBufferAttribute(e,t),Kt.normalize(),e.setXYZ(t,Kt.x,Kt.y,Kt.z)}toNonIndexed(){function e(a,l){let c=a.array,h=a.itemSize,u=a.normalized,d=new c.constructor(l.length*h),f=0,g=0;for(let x=0,m=l.length;x<m;x++){a.isInterleavedBufferAttribute?f=l[x]*a.data.stride+a.offset:f=l[x]*h;for(let p=0;p<h;p++)d[g++]=c[f++]}return new mt(d,h,u)}if(this.index===null)return console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed."),this;let t=new n,i=this.index.array,r=this.attributes;for(let a in r){let l=r[a],c=e(l,i);t.setAttribute(a,c)}let s=this.morphAttributes;for(let a in s){let l=[],c=s[a];for(let h=0,u=c.length;h<u;h++){let d=c[h],f=e(d,i);l.push(f)}t.morphAttributes[a]=l}t.morphTargetsRelative=this.morphTargetsRelative;let o=this.groups;for(let a=0,l=o.length;a<l;a++){let c=o[a];t.addGroup(c.start,c.count,c.materialIndex)}return t}toJSON(){let e={metadata:{version:4.7,type:"BufferGeometry",generator:"BufferGeometry.toJSON"}};if(e.uuid=this.uuid,e.type=this.type,this.name!==""&&(e.name=this.name),Object.keys(this.userData).length>0&&(e.userData=this.userData),this.parameters!==void 0){let l=this.parameters;for(let c in l)l[c]!==void 0&&(e[c]=l[c]);return e}e.data={attributes:{}};let t=this.index;t!==null&&(e.data.index={type:t.array.constructor.name,array:Array.prototype.slice.call(t.array)});let i=this.attributes;for(let l in i){let c=i[l];e.data.attributes[l]=c.toJSON(e.data)}let r={},s=!1;for(let l in this.morphAttributes){let c=this.morphAttributes[l],h=[];for(let u=0,d=c.length;u<d;u++){let f=c[u];h.push(f.toJSON(e.data))}h.length>0&&(r[l]=h,s=!0)}s&&(e.data.morphAttributes=r,e.data.morphTargetsRelative=this.morphTargetsRelative);let o=this.groups;o.length>0&&(e.data.groups=JSON.parse(JSON.stringify(o)));let a=this.boundingSphere;return a!==null&&(e.data.boundingSphere=a.toJSON()),e}clone(){return new this.constructor().copy(this)}copy(e){this.index=null,this.attributes={},this.morphAttributes={},this.groups=[],this.boundingBox=null,this.boundingSphere=null;let t={};this.name=e.name;let i=e.index;i!==null&&this.setIndex(i.clone());let r=e.attributes;for(let c in r){let h=r[c];this.setAttribute(c,h.clone(t))}let s=e.morphAttributes;for(let c in s){let h=[],u=s[c];for(let d=0,f=u.length;d<f;d++)h.push(u[d].clone(t));this.morphAttributes[c]=h}this.morphTargetsRelative=e.morphTargetsRelative;let o=e.groups;for(let c=0,h=o.length;c<h;c++){let u=o[c];this.addGroup(u.start,u.count,u.materialIndex)}let a=e.boundingBox;a!==null&&(this.boundingBox=a.clone());let l=e.boundingSphere;return l!==null&&(this.boundingSphere=l.clone()),this.drawRange.start=e.drawRange.start,this.drawRange.count=e.drawRange.count,this.userData=e.userData,this}dispose(){this.dispatchEvent({type:"dispose"})}};var wu=new Je,xr=new Ei,Ua=new ni,Tu=new R,Fa=new R,Oa=new R,Ba=new R,tc=new R,ka=new R,Eu=new R,za=new R,gt=class extends at{constructor(e=new Ke,t=new zi){super(),this.isMesh=!0,this.type="Mesh",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.count=1,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),e.morphTargetInfluences!==void 0&&(this.morphTargetInfluences=e.morphTargetInfluences.slice()),e.morphTargetDictionary!==void 0&&(this.morphTargetDictionary=Object.assign({},e.morphTargetDictionary)),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}getVertexPosition(e,t){let i=this.geometry,r=i.attributes.position,s=i.morphAttributes.position,o=i.morphTargetsRelative;t.fromBufferAttribute(r,e);let a=this.morphTargetInfluences;if(s&&a){ka.set(0,0,0);for(let l=0,c=s.length;l<c;l++){let h=a[l],u=s[l];h!==0&&(tc.fromBufferAttribute(u,e),o?ka.addScaledVector(tc,h):ka.addScaledVector(tc.sub(t),h))}t.add(ka)}return t}raycast(e,t){let i=this.geometry,r=this.material,s=this.matrixWorld;r!==void 0&&(i.boundingSphere===null&&i.computeBoundingSphere(),Ua.copy(i.boundingSphere),Ua.applyMatrix4(s),xr.copy(e.ray).recast(e.near),!(Ua.containsPoint(xr.origin)===!1&&(xr.intersectSphere(Ua,Tu)===null||xr.origin.distanceToSquared(Tu)>(e.far-e.near)**2))&&(wu.copy(s).invert(),xr.copy(e.ray).applyMatrix4(wu),!(i.boundingBox!==null&&xr.intersectsBox(i.boundingBox)===!1)&&this._computeIntersections(e,t,xr)))}_computeIntersections(e,t,i){let r,s=this.geometry,o=this.material,a=s.index,l=s.attributes.position,c=s.attributes.uv,h=s.attributes.uv1,u=s.attributes.normal,d=s.groups,f=s.drawRange;if(a!==null)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],T=Math.max(m.start,f.start),S=Math.min(a.count,Math.min(m.start+m.count,f.start+f.count));for(let _=T,C=S;_<C;_+=3){let M=a.getX(_),A=a.getX(_+1),E=a.getX(_+2);r=Va(this,p,e,i,c,h,u,M,A,E),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(a.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let T=a.getX(m),S=a.getX(m+1),_=a.getX(m+2);r=Va(this,o,e,i,c,h,u,T,S,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}else if(l!==void 0)if(Array.isArray(o))for(let g=0,x=d.length;g<x;g++){let m=d[g],p=o[m.materialIndex],T=Math.max(m.start,f.start),S=Math.min(l.count,Math.min(m.start+m.count,f.start+f.count));for(let _=T,C=S;_<C;_+=3){let M=_,A=_+1,E=_+2;r=Va(this,p,e,i,c,h,u,M,A,E),r&&(r.faceIndex=Math.floor(_/3),r.face.materialIndex=m.materialIndex,t.push(r))}}else{let g=Math.max(0,f.start),x=Math.min(l.count,f.start+f.count);for(let m=g,p=x;m<p;m+=3){let T=m,S=m+1,_=m+2;r=Va(this,o,e,i,c,h,u,T,S,_),r&&(r.faceIndex=Math.floor(m/3),t.push(r))}}}};function ax(n,e,t,i,r,s,o,a){let l;if(e.side===It?l=i.intersectTriangle(o,s,r,!0,a):l=i.intersectTriangle(r,s,o,e.side===wi,a),l===null)return null;za.copy(a),za.applyMatrix4(n.matrixWorld);let c=t.ray.origin.distanceTo(za);return c<t.near||c>t.far?null:{distance:c,point:za.clone(),object:n}}function Va(n,e,t,i,r,s,o,a,l,c){n.getVertexPosition(a,Fa),n.getVertexPosition(l,Oa),n.getVertexPosition(c,Ba);let h=ax(n,e,t,i,Fa,Oa,Ba,Eu);if(h){let u=new R;ki.getBarycoord(Eu,Fa,Oa,Ba,u),r&&(h.uv=ki.getInterpolatedAttribute(r,a,l,c,u,new ie)),s&&(h.uv1=ki.getInterpolatedAttribute(s,a,l,c,u,new ie)),o&&(h.normal=ki.getInterpolatedAttribute(o,a,l,c,u,new R),h.normal.dot(i.direction)>0&&h.normal.multiplyScalar(-1));let d={a,b:l,c,normal:new R,materialIndex:0};ki.getNormal(Fa,Oa,Ba,d.normal),h.face=d,h.barycoord=u}return h}var sn=class n extends Ke{constructor(e=1,t=1,i=1,r=1,s=1,o=1){super(),this.type="BoxGeometry",this.parameters={width:e,height:t,depth:i,widthSegments:r,heightSegments:s,depthSegments:o};let a=this;r=Math.floor(r),s=Math.floor(s),o=Math.floor(o);let l=[],c=[],h=[],u=[],d=0,f=0;g("z","y","x",-1,-1,i,t,e,o,s,0),g("z","y","x",1,-1,i,t,-e,o,s,1),g("x","z","y",1,1,e,i,t,r,o,2),g("x","z","y",1,-1,e,i,-t,r,o,3),g("x","y","z",1,-1,e,t,i,r,s,4),g("x","y","z",-1,-1,e,t,-i,r,s,5),this.setIndex(l),this.setAttribute("position",new tt(c,3)),this.setAttribute("normal",new tt(h,3)),this.setAttribute("uv",new tt(u,2));function g(x,m,p,T,S,_,C,M,A,E,b){let v=_/A,P=C/E,N=_/2,F=C/2,z=M/2,V=A+1,q=E+1,X=0,W=0,Y=new R;for(let oe=0;oe<q;oe++){let Me=oe*P-F;for(let Ae=0;Ae<V;Ae++){let ue=Ae*v-N;Y[x]=ue*T,Y[m]=Me*S,Y[p]=z,c.push(Y.x,Y.y,Y.z),Y[x]=0,Y[m]=0,Y[p]=M>0?1:-1,h.push(Y.x,Y.y,Y.z),u.push(Ae/A),u.push(1-oe/E),X+=1}}for(let oe=0;oe<E;oe++)for(let Me=0;Me<A;Me++){let Ae=d+Me+V*oe,ue=d+Me+V*(oe+1),He=d+(Me+1)+V*(oe+1),Re=d+(Me+1)+V*oe;l.push(Ae,ue,Re),l.push(ue,He,Re),W+=6}a.addGroup(f,W,b),f+=W,d+=X}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.depth,e.widthSegments,e.heightSegments,e.depthSegments)}};function An(n){let e={};for(let t in n){e[t]={};for(let i in n[t]){let r=n[t][i];r&&(r.isColor||r.isMatrix3||r.isMatrix4||r.isVector2||r.isVector3||r.isVector4||r.isTexture||r.isQuaternion)?r.isRenderTargetTexture?(console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms()."),e[t][i]=null):e[t][i]=r.clone():Array.isArray(r)?e[t][i]=r.slice():e[t][i]=r}}return e}function li(n){let e={};for(let t=0;t<n.length;t++){let i=An(n[t]);for(let r in i)e[r]=i[r]}return e}function Au(n){let e=[];for(let t=0;t<n.length;t++)e.push(n[t].clone());return e}function Ha(n){let e=n.getRenderTarget();return e===null?n.outputColorSpace:e.isXRRenderTarget===!0?e.texture.colorSpace:st.workingColorSpace}var ic={clone:An,merge:li};var Cu=`
void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}
`;var Iu=`
void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}
`;var jt=class extends wt{constructor(e){super(),this.isShaderMaterial=!0,this.type="ShaderMaterial",this.defines={},this.uniforms={},this.uniformsGroups=[],this.vertexShader=Cu,this.fragmentShader=Iu,this.linewidth=1,this.wireframe=!1,this.wireframeLinewidth=1,this.fog=!1,this.lights=!1,this.clipping=!1,this.forceSinglePass=!0,this.extensions={clipCullDistance:!1,multiDraw:!1},this.defaultAttributeValues={color:[1,1,1],uv:[0,0],uv1:[0,0]},this.index0AttributeName=void 0,this.uniformsNeedUpdate=!1,this.glslVersion=null,e!==void 0&&this.setValues(e)}copy(e){return super.copy(e),this.fragmentShader=e.fragmentShader,this.vertexShader=e.vertexShader,this.uniforms=An(e.uniforms),this.uniformsGroups=Au(e.uniformsGroups),this.defines=Object.assign({},e.defines),this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.fog=e.fog,this.lights=e.lights,this.clipping=e.clipping,this.extensions=Object.assign({},e.extensions),this.glslVersion=e.glslVersion,this}toJSON(e){let t=super.toJSON(e);t.glslVersion=this.glslVersion,t.uniforms={};for(let r in this.uniforms){let o=this.uniforms[r].value;o&&o.isTexture?t.uniforms[r]={type:"t",value:o.toJSON(e).uuid}:o&&o.isColor?t.uniforms[r]={type:"c",value:o.getHex()}:o&&o.isVector2?t.uniforms[r]={type:"v2",value:o.toArray()}:o&&o.isVector3?t.uniforms[r]={type:"v3",value:o.toArray()}:o&&o.isVector4?t.uniforms[r]={type:"v4",value:o.toArray()}:o&&o.isMatrix3?t.uniforms[r]={type:"m3",value:o.toArray()}:o&&o.isMatrix4?t.uniforms[r]={type:"m4",value:o.toArray()}:t.uniforms[r]={value:o}}Object.keys(this.defines).length>0&&(t.defines=this.defines),t.vertexShader=this.vertexShader,t.fragmentShader=this.fragmentShader,t.lights=this.lights,t.clipping=this.clipping;let i={};for(let r in this.extensions)this.extensions[r]===!0&&(i[r]=!0);return Object.keys(i).length>0&&(t.extensions=i),t}};var Jn=class extends at{constructor(){super(),this.isCamera=!0,this.type="Camera",this.matrixWorldInverse=new Je,this.projectionMatrix=new Je,this.projectionMatrixInverse=new Je,this.coordinateSystem=Qt,this._reversedDepth=!1}get reversedDepth(){return this._reversedDepth}copy(e,t){return super.copy(e,t),this.matrixWorldInverse.copy(e.matrixWorldInverse),this.projectionMatrix.copy(e.projectionMatrix),this.projectionMatrixInverse.copy(e.projectionMatrixInverse),this.coordinateSystem=e.coordinateSystem,this}getWorldDirection(e){return super.getWorldDirection(e).negate()}updateMatrixWorld(e){super.updateMatrixWorld(e),this.matrixWorldInverse.copy(this.matrixWorld).invert()}updateWorldMatrix(e,t){super.updateWorldMatrix(e,t),this.matrixWorldInverse.copy(this.matrixWorld).invert()}clone(){return new this.constructor().copy(this)}};var Kn=new R,Pu=new ie,Ru=new ie,Et=class extends Jn{constructor(e=50,t=1,i=.1,r=2e3){super(),this.isPerspectiveCamera=!0,this.type="PerspectiveCamera",this.fov=e,this.zoom=1,this.near=i,this.far=r,this.focus=10,this.aspect=t,this.view=null,this.filmGauge=35,this.filmOffset=0,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.fov=e.fov,this.zoom=e.zoom,this.near=e.near,this.far=e.far,this.focus=e.focus,this.aspect=e.aspect,this.view=e.view===null?null:Object.assign({},e.view),this.filmGauge=e.filmGauge,this.filmOffset=e.filmOffset,this}setFocalLength(e){let t=.5*this.getFilmHeight()/e;this.fov=kn*2*Math.atan(t),this.updateProjectionMatrix()}getFocalLength(){let e=Math.tan(vn*.5*this.fov);return .5*this.getFilmHeight()/e}getEffectiveFOV(){return kn*2*Math.atan(Math.tan(vn*.5*this.fov)/this.zoom)}getFilmWidth(){return this.filmGauge*Math.min(this.aspect,1)}getFilmHeight(){return this.filmGauge/Math.max(this.aspect,1)}getViewBounds(e,t,i){Kn.set(-1,-1,.5).applyMatrix4(this.projectionMatrixInverse),t.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z),Kn.set(1,1,.5).applyMatrix4(this.projectionMatrixInverse),i.set(Kn.x,Kn.y).multiplyScalar(-e/Kn.z)}getViewSize(e,t){return this.getViewBounds(e,Pu,Ru),t.subVectors(Ru,Pu)}setViewOffset(e,t,i,r,s,o){this.aspect=e/t,this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=this.near,t=e*Math.tan(vn*.5*this.fov)/this.zoom,i=2*t,r=this.aspect*i,s=-.5*r,o=this.view;if(this.view!==null&&this.view.enabled){let l=o.fullWidth,c=o.fullHeight;s+=o.offsetX*r/l,t-=o.offsetY*i/c,r*=o.width/l,i*=o.height/c}let a=this.filmOffset;a!==0&&(s+=e*a/this.getFilmWidth()),this.projectionMatrix.makePerspective(s,s+r,t,t-i,e,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.fov=this.fov,t.object.zoom=this.zoom,t.object.near=this.near,t.object.far=this.far,t.object.focus=this.focus,t.object.aspect=this.aspect,this.view!==null&&(t.object.view=Object.assign({},this.view)),t.object.filmGauge=this.filmGauge,t.object.filmOffset=this.filmOffset,t}};var fs=-90,ds=1,To=class extends at{constructor(e,t,i){super(),this.type="CubeCamera",this.renderTarget=i,this.coordinateSystem=null,this.activeMipmapLevel=0;let r=new Et(fs,ds,e,t);r.layers=this.layers,this.add(r);let s=new Et(fs,ds,e,t);s.layers=this.layers,this.add(s);let o=new Et(fs,ds,e,t);o.layers=this.layers,this.add(o);let a=new Et(fs,ds,e,t);a.layers=this.layers,this.add(a);let l=new Et(fs,ds,e,t);l.layers=this.layers,this.add(l);let c=new Et(fs,ds,e,t);c.layers=this.layers,this.add(c)}updateCoordinateSystem(){let e=this.coordinateSystem,t=this.children.concat(),[i,r,s,o,a,l]=t;for(let c of t)this.remove(c);if(e===Qt)i.up.set(0,1,0),i.lookAt(1,0,0),r.up.set(0,1,0),r.lookAt(-1,0,0),s.up.set(0,0,-1),s.lookAt(0,1,0),o.up.set(0,0,1),o.lookAt(0,-1,0),a.up.set(0,1,0),a.lookAt(0,0,1),l.up.set(0,1,0),l.lookAt(0,0,-1);else if(e===Bn)i.up.set(0,-1,0),i.lookAt(-1,0,0),r.up.set(0,-1,0),r.lookAt(1,0,0),s.up.set(0,0,1),s.lookAt(0,1,0),o.up.set(0,0,-1),o.lookAt(0,-1,0),a.up.set(0,-1,0),a.lookAt(0,0,1),l.up.set(0,-1,0),l.lookAt(0,0,-1);else throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: "+e);for(let c of t)this.add(c),c.updateMatrixWorld()}update(e,t){this.parent===null&&this.updateMatrixWorld();let{renderTarget:i,activeMipmapLevel:r}=this;this.coordinateSystem!==e.coordinateSystem&&(this.coordinateSystem=e.coordinateSystem,this.updateCoordinateSystem());let[s,o,a,l,c,h]=this.children,u=e.getRenderTarget(),d=e.getActiveCubeFace(),f=e.getActiveMipmapLevel(),g=e.xr.enabled;e.xr.enabled=!1;let x=i.texture.generateMipmaps;i.texture.generateMipmaps=!1,e.setRenderTarget(i,0,r),e.render(t,s),e.setRenderTarget(i,1,r),e.render(t,o),e.setRenderTarget(i,2,r),e.render(t,a),e.setRenderTarget(i,3,r),e.render(t,l),e.setRenderTarget(i,4,r),e.render(t,c),i.texture.generateMipmaps=x,e.setRenderTarget(i,5,r),e.render(t,h),e.setRenderTarget(u,d,f),e.xr.enabled=g,i.texture.needsPMREMUpdate=!0}};var Cn=class extends _t{constructor(e=[],t=Ti,i,r,s,o,a,l,c,h){super(e,t,i,r,s,o,a,l,c,h),this.isCubeTexture=!0,this.flipY=!1}get images(){return this.image}set images(e){this.image=e}};var Eo=class extends ii{constructor(e=1,t={}){super(e,e,t),this.isWebGLCubeRenderTarget=!0;let i={width:e,height:e,depth:1},r=[i,i,i,i,i,i];this.texture=new Cn(r),this._setTextureOptions(t),this.texture.isRenderTargetTexture=!0}fromEquirectangularTexture(e,t){this.texture.type=t.type,this.texture.colorSpace=t.colorSpace,this.texture.generateMipmaps=t.generateMipmaps,this.texture.minFilter=t.minFilter,this.texture.magFilter=t.magFilter;let i={uniforms:{tEquirect:{value:null}},vertexShader:`

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,fragmentShader:`

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`},r=new sn(5,5,5),s=new jt({name:"CubemapFromEquirect",uniforms:An(i.uniforms),vertexShader:i.vertexShader,fragmentShader:i.fragmentShader,side:It,blending:Fi});s.uniforms.tEquirect.value=t;let o=new gt(r,s),a=t.minFilter;return t.minFilter===di&&(t.minFilter=Bt),new To(1,10,this).update(e,o),t.minFilter=a,o.geometry.dispose(),o.material.dispose(),this}clear(e,t=!0,i=!0,r=!0){let s=e.getRenderTarget();for(let o=0;o<6;o++)e.setRenderTarget(this,o),e.clear(t,i,r);e.setRenderTarget(s)}};var Ii=class extends at{constructor(){super(),this.isGroup=!0,this.type="Group"}};var lx={type:"move"},_r=class{constructor(){this._targetRay=null,this._grip=null,this._hand=null}getHandSpace(){return this._hand===null&&(this._hand=new Ii,this._hand.matrixAutoUpdate=!1,this._hand.visible=!1,this._hand.joints={},this._hand.inputState={pinching:!1}),this._hand}getTargetRaySpace(){return this._targetRay===null&&(this._targetRay=new Ii,this._targetRay.matrixAutoUpdate=!1,this._targetRay.visible=!1,this._targetRay.hasLinearVelocity=!1,this._targetRay.linearVelocity=new R,this._targetRay.hasAngularVelocity=!1,this._targetRay.angularVelocity=new R),this._targetRay}getGripSpace(){return this._grip===null&&(this._grip=new Ii,this._grip.matrixAutoUpdate=!1,this._grip.visible=!1,this._grip.hasLinearVelocity=!1,this._grip.linearVelocity=new R,this._grip.hasAngularVelocity=!1,this._grip.angularVelocity=new R),this._grip}dispatchEvent(e){return this._targetRay!==null&&this._targetRay.dispatchEvent(e),this._grip!==null&&this._grip.dispatchEvent(e),this._hand!==null&&this._hand.dispatchEvent(e),this}connect(e){if(e&&e.hand){let t=this._hand;if(t)for(let i of e.hand.values())this._getHandJoint(t,i)}return this.dispatchEvent({type:"connected",data:e}),this}disconnect(e){return this.dispatchEvent({type:"disconnected",data:e}),this._targetRay!==null&&(this._targetRay.visible=!1),this._grip!==null&&(this._grip.visible=!1),this._hand!==null&&(this._hand.visible=!1),this}update(e,t,i){let r=null,s=null,o=null,a=this._targetRay,l=this._grip,c=this._hand;if(e&&t.session.visibilityState!=="visible-blurred"){if(c&&e.hand){o=!0;for(let x of e.hand.values()){let m=t.getJointPose(x,i),p=this._getHandJoint(c,x);m!==null&&(p.matrix.fromArray(m.transform.matrix),p.matrix.decompose(p.position,p.rotation,p.scale),p.matrixWorldNeedsUpdate=!0,p.jointRadius=m.radius),p.visible=m!==null}let h=c.joints["index-finger-tip"],u=c.joints["thumb-tip"],d=h.position.distanceTo(u.position),f=.02,g=.005;c.inputState.pinching&&d>f+g?(c.inputState.pinching=!1,this.dispatchEvent({type:"pinchend",handedness:e.handedness,target:this})):!c.inputState.pinching&&d<=f-g&&(c.inputState.pinching=!0,this.dispatchEvent({type:"pinchstart",handedness:e.handedness,target:this}))}else l!==null&&e.gripSpace&&(s=t.getPose(e.gripSpace,i),s!==null&&(l.matrix.fromArray(s.transform.matrix),l.matrix.decompose(l.position,l.rotation,l.scale),l.matrixWorldNeedsUpdate=!0,s.linearVelocity?(l.hasLinearVelocity=!0,l.linearVelocity.copy(s.linearVelocity)):l.hasLinearVelocity=!1,s.angularVelocity?(l.hasAngularVelocity=!0,l.angularVelocity.copy(s.angularVelocity)):l.hasAngularVelocity=!1));a!==null&&(r=t.getPose(e.targetRaySpace,i),r===null&&s!==null&&(r=s),r!==null&&(a.matrix.fromArray(r.transform.matrix),a.matrix.decompose(a.position,a.rotation,a.scale),a.matrixWorldNeedsUpdate=!0,r.linearVelocity?(a.hasLinearVelocity=!0,a.linearVelocity.copy(r.linearVelocity)):a.hasLinearVelocity=!1,r.angularVelocity?(a.hasAngularVelocity=!0,a.angularVelocity.copy(r.angularVelocity)):a.hasAngularVelocity=!1,this.dispatchEvent(lx)))}return a!==null&&(a.visible=r!==null),l!==null&&(l.visible=s!==null),c!==null&&(c.visible=o!==null),this}_getHandJoint(e,t){if(e.joints[t.jointName]===void 0){let i=new Ii;i.matrixAutoUpdate=!1,i.visible=!1,e.joints[t.jointName]=i,e.add(i)}return e.joints[t.jointName]}};var In=class extends at{constructor(){super(),this.isScene=!0,this.type="Scene",this.background=null,this.environment=null,this.fog=null,this.backgroundBlurriness=0,this.backgroundIntensity=1,this.backgroundRotation=new Wt,this.environmentIntensity=1,this.environmentRotation=new Wt,this.overrideMaterial=null,typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}copy(e,t){return super.copy(e,t),e.background!==null&&(this.background=e.background.clone()),e.environment!==null&&(this.environment=e.environment.clone()),e.fog!==null&&(this.fog=e.fog.clone()),this.backgroundBlurriness=e.backgroundBlurriness,this.backgroundIntensity=e.backgroundIntensity,this.backgroundRotation.copy(e.backgroundRotation),this.environmentIntensity=e.environmentIntensity,this.environmentRotation.copy(e.environmentRotation),e.overrideMaterial!==null&&(this.overrideMaterial=e.overrideMaterial.clone()),this.matrixAutoUpdate=e.matrixAutoUpdate,this}toJSON(e){let t=super.toJSON(e);return this.fog!==null&&(t.object.fog=this.fog.toJSON()),this.backgroundBlurriness>0&&(t.object.backgroundBlurriness=this.backgroundBlurriness),this.backgroundIntensity!==1&&(t.object.backgroundIntensity=this.backgroundIntensity),t.object.backgroundRotation=this.backgroundRotation.toArray(),this.environmentIntensity!==1&&(t.object.environmentIntensity=this.environmentIntensity),t.object.environmentRotation=this.environmentRotation.toArray(),t}};var sc=new R,cx=new R,hx=new Ye,_i=class{constructor(e=new R(1,0,0),t=0){this.isPlane=!0,this.normal=e,this.constant=t}set(e,t){return this.normal.copy(e),this.constant=t,this}setComponents(e,t,i,r){return this.normal.set(e,t,i),this.constant=r,this}setFromNormalAndCoplanarPoint(e,t){return this.normal.copy(e),this.constant=-t.dot(this.normal),this}setFromCoplanarPoints(e,t,i){let r=sc.subVectors(i,t).cross(cx.subVectors(e,t)).normalize();return this.setFromNormalAndCoplanarPoint(r,e),this}copy(e){return this.normal.copy(e.normal),this.constant=e.constant,this}normalize(){let e=1/this.normal.length();return this.normal.multiplyScalar(e),this.constant*=e,this}negate(){return this.constant*=-1,this.normal.negate(),this}distanceToPoint(e){return this.normal.dot(e)+this.constant}distanceToSphere(e){return this.distanceToPoint(e.center)-e.radius}projectPoint(e,t){return t.copy(e).addScaledVector(this.normal,-this.distanceToPoint(e))}intersectLine(e,t){let i=e.delta(sc),r=this.normal.dot(i);if(r===0)return this.distanceToPoint(e.start)===0?t.copy(e.start):null;let s=-(e.start.dot(this.normal)+this.constant)/r;return s<0||s>1?null:t.copy(e.start).addScaledVector(i,s)}intersectsLine(e){let t=this.distanceToPoint(e.start),i=this.distanceToPoint(e.end);return t<0&&i>0||i<0&&t>0}intersectsBox(e){return e.intersectsPlane(this)}intersectsSphere(e){return e.intersectsPlane(this)}coplanarPoint(e){return e.copy(this.normal).multiplyScalar(-this.constant)}applyMatrix4(e,t){let i=t||hx.getNormalMatrix(e),r=this.coplanarPoint(sc).applyMatrix4(e),s=this.normal.applyMatrix3(i).normalize();return this.constant=-r.dot(s),this}translate(e){return this.constant-=e.dot(this.normal),this}equals(e){return e.normal.equals(this.normal)&&e.constant===this.constant}clone(){return new this.constructor().copy(this)}};var yr=new ni,ux=new ie(.5,.5),Ga=new R,Qi=class{constructor(e=new _i,t=new _i,i=new _i,r=new _i,s=new _i,o=new _i){this.planes=[e,t,i,r,s,o]}set(e,t,i,r,s,o){let a=this.planes;return a[0].copy(e),a[1].copy(t),a[2].copy(i),a[3].copy(r),a[4].copy(s),a[5].copy(o),this}copy(e){let t=this.planes;for(let i=0;i<6;i++)t[i].copy(e.planes[i]);return this}setFromProjectionMatrix(e,t=Qt,i=!1){let r=this.planes,s=e.elements,o=s[0],a=s[1],l=s[2],c=s[3],h=s[4],u=s[5],d=s[6],f=s[7],g=s[8],x=s[9],m=s[10],p=s[11],T=s[12],S=s[13],_=s[14],C=s[15];if(r[0].setComponents(c-o,f-h,p-g,C-T).normalize(),r[1].setComponents(c+o,f+h,p+g,C+T).normalize(),r[2].setComponents(c+a,f+u,p+x,C+S).normalize(),r[3].setComponents(c-a,f-u,p-x,C-S).normalize(),i)r[4].setComponents(l,d,m,_).normalize(),r[5].setComponents(c-l,f-d,p-m,C-_).normalize();else if(r[4].setComponents(c-l,f-d,p-m,C-_).normalize(),t===Qt)r[5].setComponents(c+l,f+d,p+m,C+_).normalize();else if(t===Bn)r[5].setComponents(l,d,m,_).normalize();else throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: "+t);return this}intersectsObject(e){if(e.boundingSphere!==void 0)e.boundingSphere===null&&e.computeBoundingSphere(),yr.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);else{let t=e.geometry;t.boundingSphere===null&&t.computeBoundingSphere(),yr.copy(t.boundingSphere).applyMatrix4(e.matrixWorld)}return this.intersectsSphere(yr)}intersectsSprite(e){yr.center.set(0,0,0);let t=ux.distanceTo(e.center);return yr.radius=.7071067811865476+t,yr.applyMatrix4(e.matrixWorld),this.intersectsSphere(yr)}intersectsSphere(e){let t=this.planes,i=e.center,r=-e.radius;for(let s=0;s<6;s++)if(t[s].distanceToPoint(i)<r)return!1;return!0}intersectsBox(e){let t=this.planes;for(let i=0;i<6;i++){let r=t[i];if(Ga.x=r.normal.x>0?e.max.x:e.min.x,Ga.y=r.normal.y>0?e.max.y:e.min.y,Ga.z=r.normal.z>0?e.max.z:e.min.z,r.distanceToPoint(Ga)<0)return!1}return!0}containsPoint(e){let t=this.planes;for(let i=0;i<6;i++)if(t[i].distanceToPoint(e)<0)return!1;return!0}clone(){return new this.constructor().copy(this)}};var Ut=class extends wt{constructor(e){super(),this.isLineBasicMaterial=!0,this.type="LineBasicMaterial",this.color=new Pe(16777215),this.map=null,this.linewidth=1,this.linecap="round",this.linejoin="round",this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.map=e.map,this.linewidth=e.linewidth,this.linecap=e.linecap,this.linejoin=e.linejoin,this.fog=e.fog,this}};var qa=new R,Ya=new R,Uu=new Je,Co=new Ei,Wa=new ni,oc=new R,Fu=new R,on=class extends at{constructor(e=new Ke,t=new Ut){super(),this.isLine=!0,this.type="Line",this.geometry=e,this.material=t,this.morphTargetDictionary=void 0,this.morphTargetInfluences=void 0,this.updateMorphTargets()}copy(e,t){return super.copy(e,t),this.material=Array.isArray(e.material)?e.material.slice():e.material,this.geometry=e.geometry,this}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[0];for(let r=1,s=t.count;r<s;r++)qa.fromBufferAttribute(t,r-1),Ya.fromBufferAttribute(t,r),i[r]=i[r-1],i[r]+=qa.distanceTo(Ya);e.setAttribute("lineDistance",new tt(i,1))}else console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}raycast(e,t){let i=this.geometry,r=this.matrixWorld,s=e.params.Line.threshold,o=i.drawRange;if(i.boundingSphere===null&&i.computeBoundingSphere(),Wa.copy(i.boundingSphere),Wa.applyMatrix4(r),Wa.radius+=s,e.ray.intersectsSphere(Wa)===!1)return;Uu.copy(r).invert(),Co.copy(e.ray).applyMatrix4(Uu);let a=s/((this.scale.x+this.scale.y+this.scale.z)/3),l=a*a,c=this.isLineSegments?2:1,h=i.index,d=i.attributes.position;if(h!==null){let f=Math.max(0,o.start),g=Math.min(h.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=h.getX(x),T=h.getX(x+1),S=Xa(this,e,Co,l,p,T,x);S&&t.push(S)}if(this.isLineLoop){let x=h.getX(g-1),m=h.getX(f),p=Xa(this,e,Co,l,x,m,g-1);p&&t.push(p)}}else{let f=Math.max(0,o.start),g=Math.min(d.count,o.start+o.count);for(let x=f,m=g-1;x<m;x+=c){let p=Xa(this,e,Co,l,x,x+1,x);p&&t.push(p)}if(this.isLineLoop){let x=Xa(this,e,Co,l,g-1,f,g-1);x&&t.push(x)}}}updateMorphTargets(){let t=this.geometry.morphAttributes,i=Object.keys(t);if(i.length>0){let r=t[i[0]];if(r!==void 0){this.morphTargetInfluences=[],this.morphTargetDictionary={};for(let s=0,o=r.length;s<o;s++){let a=r[s].name||String(s);this.morphTargetInfluences.push(0),this.morphTargetDictionary[a]=s}}}}};function Xa(n,e,t,i,r,s,o){let a=n.geometry.attributes.position;if(qa.fromBufferAttribute(a,r),Ya.fromBufferAttribute(a,s),t.distanceSqToSegment(qa,Ya,oc,Fu)>i)return;oc.applyMatrix4(n.matrixWorld);let c=e.ray.origin.distanceTo(oc);if(!(c<e.near||c>e.far))return{distance:c,point:Fu.clone().applyMatrix4(n.matrixWorld),index:o,face:null,faceIndex:null,barycoord:null,object:n}}var Ou=new R,Bu=new R,ci=class extends on{constructor(e,t){super(e,t),this.isLineSegments=!0,this.type="LineSegments"}computeLineDistances(){let e=this.geometry;if(e.index===null){let t=e.attributes.position,i=[];for(let r=0,s=t.count;r<s;r+=2)Ou.fromBufferAttribute(t,r),Bu.fromBufferAttribute(t,r+1),i[r]=r===0?0:i[r-1],i[r+1]=i[r]+Ou.distanceTo(Bu);e.setAttribute("lineDistance",new tt(i,1))}else console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");return this}};var an=class extends _t{constructor(e,t,i,r,s,o,a,l,c,h,u,d){super(null,o,a,l,c,h,r,s,u,d),this.isCompressedTexture=!0,this.image={width:t,height:i},this.mipmaps=e,this.flipY=!1,this.generateMipmaps=!1}};var vr=class extends _t{constructor(e,t,i=gi,r,s,o,a=Ot,l=Ot,c,h=gn,u=1){if(h!==gn&&h!==xn)throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");let d={width:e,height:t,depth:u};super(d,r,s,o,a,l,h,i,c),this.isDepthTexture=!0,this.flipY=!1,this.generateMipmaps=!1,this.compareFunction=null}copy(e){return super.copy(e),this.source=new Bi(Object.assign({},e.image)),this.compareFunction=e.compareFunction,this}toJSON(e){let t=super.toJSON(e);return this.compareFunction!==null&&(t.compareFunction=this.compareFunction),t}};var br=class extends _t{constructor(e=null){super(),this.sourceTexture=e,this.isExternalTexture=!0}copy(e){return super.copy(e),this.sourceTexture=e.sourceTexture,this}};var Za=new R,Ja=new R,lc=new R,Ka=new ki,Io=class extends Ke{constructor(e=null,t=1){if(super(),this.type="EdgesGeometry",this.parameters={geometry:e,thresholdAngle:t},e!==null){let r=Math.pow(10,4),s=Math.cos(vn*t),o=e.getIndex(),a=e.getAttribute("position"),l=o?o.count:a.count,c=[0,0,0],h=["a","b","c"],u=new Array(3),d={},f=[];for(let g=0;g<l;g+=3){o?(c[0]=o.getX(g),c[1]=o.getX(g+1),c[2]=o.getX(g+2)):(c[0]=g,c[1]=g+1,c[2]=g+2);let{a:x,b:m,c:p}=Ka;if(x.fromBufferAttribute(a,c[0]),m.fromBufferAttribute(a,c[1]),p.fromBufferAttribute(a,c[2]),Ka.getNormal(lc),u[0]=`${Math.round(x.x*r)},${Math.round(x.y*r)},${Math.round(x.z*r)}`,u[1]=`${Math.round(m.x*r)},${Math.round(m.y*r)},${Math.round(m.z*r)}`,u[2]=`${Math.round(p.x*r)},${Math.round(p.y*r)},${Math.round(p.z*r)}`,!(u[0]===u[1]||u[1]===u[2]||u[2]===u[0]))for(let T=0;T<3;T++){let S=(T+1)%3,_=u[T],C=u[S],M=Ka[h[T]],A=Ka[h[S]],E=`${_}_${C}`,b=`${C}_${_}`;b in d&&d[b]?(lc.dot(d[b].normal)<=s&&(f.push(M.x,M.y,M.z),f.push(A.x,A.y,A.z)),d[b]=null):E in d||(d[E]={index0:c[T],index1:c[S],normal:lc.clone()})}}for(let g in d)if(d[g]){let{index0:x,index1:m}=d[g];Za.fromBufferAttribute(a,x),Ja.fromBufferAttribute(a,m),f.push(Za.x,Za.y,Za.z),f.push(Ja.x,Ja.y,Ja.z)}this.setAttribute("position",new tt(f,3))}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}};var wr={};Rg(wr,{ArcCurve:()=>ja,CatmullRomCurve3:()=>Qa,CubicBezierCurve:()=>ps,CubicBezierCurve3:()=>el,EllipseCurve:()=>jn,LineCurve:()=>ms,LineCurve3:()=>tl,QuadraticBezierCurve:()=>gs,QuadraticBezierCurve3:()=>Po,SplineCurve:()=>xs});var Pt=class{constructor(){this.type="Curve",this.arcLengthDivisions=200,this.needsUpdate=!1,this.cacheArcLengths=null}getPoint(){console.warn("THREE.Curve: .getPoint() not implemented.")}getPointAt(e,t){let i=this.getUtoTmapping(e);return this.getPoint(i,t)}getPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return t}getSpacedPoints(e=5){let t=[];for(let i=0;i<=e;i++)t.push(this.getPointAt(i/e));return t}getLength(){let e=this.getLengths();return e[e.length-1]}getLengths(e=this.arcLengthDivisions){if(this.cacheArcLengths&&this.cacheArcLengths.length===e+1&&!this.needsUpdate)return this.cacheArcLengths;this.needsUpdate=!1;let t=[],i,r=this.getPoint(0),s=0;t.push(0);for(let o=1;o<=e;o++)i=this.getPoint(o/e),s+=i.distanceTo(r),t.push(s),r=i;return this.cacheArcLengths=t,t}updateArcLengths(){this.needsUpdate=!0,this.getLengths()}getUtoTmapping(e,t=null){let i=this.getLengths(),r=0,s=i.length,o;t?o=t:o=e*i[s-1];let a=0,l=s-1,c;for(;a<=l;)if(r=Math.floor(a+(l-a)/2),c=i[r]-o,c<0)a=r+1;else if(c>0)l=r-1;else{l=r;break}if(r=l,i[r]===o)return r/(s-1);let h=i[r],d=i[r+1]-h,f=(o-h)/d;return(r+f)/(s-1)}getTangent(e,t){let r=e-1e-4,s=e+1e-4;r<0&&(r=0),s>1&&(s=1);let o=this.getPoint(r),a=this.getPoint(s),l=t||(o.isVector2?new ie:new R);return l.copy(a).sub(o).normalize(),l}getTangentAt(e,t){let i=this.getUtoTmapping(e);return this.getTangent(i,t)}computeFrenetFrames(e,t=!1){let i=new R,r=[],s=[],o=[],a=new R,l=new Je;for(let f=0;f<=e;f++){let g=f/e;r[f]=this.getTangentAt(g,new R)}s[0]=new R,o[0]=new R;let c=Number.MAX_VALUE,h=Math.abs(r[0].x),u=Math.abs(r[0].y),d=Math.abs(r[0].z);h<=c&&(c=h,i.set(1,0,0)),u<=c&&(c=u,i.set(0,1,0)),d<=c&&i.set(0,0,1),a.crossVectors(r[0],i).normalize(),s[0].crossVectors(r[0],a),o[0].crossVectors(r[0],s[0]);for(let f=1;f<=e;f++){if(s[f]=s[f-1].clone(),o[f]=o[f-1].clone(),a.crossVectors(r[f-1],r[f]),a.length()>Number.EPSILON){a.normalize();let g=Math.acos(qe(r[f-1].dot(r[f]),-1,1));s[f].applyMatrix4(l.makeRotationAxis(a,g))}o[f].crossVectors(r[f],s[f])}if(t===!0){let f=Math.acos(qe(s[0].dot(s[e]),-1,1));f/=e,r[0].dot(a.crossVectors(s[0],s[e]))>0&&(f=-f);for(let g=1;g<=e;g++)s[g].applyMatrix4(l.makeRotationAxis(r[g],f*g)),o[g].crossVectors(r[g],s[g])}return{tangents:r,normals:s,binormals:o}}clone(){return new this.constructor().copy(this)}copy(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}toJSON(){let e={metadata:{version:4.7,type:"Curve",generator:"Curve.toJSON"}};return e.arcLengthDivisions=this.arcLengthDivisions,e.type=this.type,e}fromJSON(e){return this.arcLengthDivisions=e.arcLengthDivisions,this}};var jn=class extends Pt{constructor(e=0,t=0,i=1,r=1,s=0,o=Math.PI*2,a=!1,l=0){super(),this.isEllipseCurve=!0,this.type="EllipseCurve",this.aX=e,this.aY=t,this.xRadius=i,this.yRadius=r,this.aStartAngle=s,this.aEndAngle=o,this.aClockwise=a,this.aRotation=l}getPoint(e,t=new ie){let i=t,r=Math.PI*2,s=this.aEndAngle-this.aStartAngle,o=Math.abs(s)<Number.EPSILON;for(;s<0;)s+=r;for(;s>r;)s-=r;s<Number.EPSILON&&(o?s=0:s=r),this.aClockwise===!0&&!o&&(s===r?s=-r:s=s-r);let a=this.aStartAngle+e*s,l=this.aX+this.xRadius*Math.cos(a),c=this.aY+this.yRadius*Math.sin(a);if(this.aRotation!==0){let h=Math.cos(this.aRotation),u=Math.sin(this.aRotation),d=l-this.aX,f=c-this.aY;l=d*h-f*u+this.aX,c=d*u+f*h+this.aY}return i.set(l,c)}copy(e){return super.copy(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}toJSON(){let e=super.toJSON();return e.aX=this.aX,e.aY=this.aY,e.xRadius=this.xRadius,e.yRadius=this.yRadius,e.aStartAngle=this.aStartAngle,e.aEndAngle=this.aEndAngle,e.aClockwise=this.aClockwise,e.aRotation=this.aRotation,e}fromJSON(e){return super.fromJSON(e),this.aX=e.aX,this.aY=e.aY,this.xRadius=e.xRadius,this.yRadius=e.yRadius,this.aStartAngle=e.aStartAngle,this.aEndAngle=e.aEndAngle,this.aClockwise=e.aClockwise,this.aRotation=e.aRotation,this}};var ja=class extends jn{constructor(e,t,i,r,s,o){super(e,t,i,i,r,s,o),this.isArcCurve=!0,this.type="ArcCurve"}};function fc(){let n=0,e=0,t=0,i=0;function r(s,o,a,l){n=s,e=a,t=-3*s+3*o-2*a-l,i=2*s-2*o+a+l}return{initCatmullRom:function(s,o,a,l,c){r(o,a,c*(a-s),c*(l-o))},initNonuniformCatmullRom:function(s,o,a,l,c,h,u){let d=(o-s)/c-(a-s)/(c+h)+(a-o)/h,f=(a-o)/h-(l-o)/(h+u)+(l-a)/u;d*=h,f*=h,r(o,a,d,f)},calc:function(s){let o=s*s,a=o*s;return n+e*s+t*o+i*a}}}var $a=new R,cc=new fc,hc=new fc,uc=new fc,Qa=class extends Pt{constructor(e=[],t=!1,i="centripetal",r=.5){super(),this.isCatmullRomCurve3=!0,this.type="CatmullRomCurve3",this.points=e,this.closed=t,this.curveType=i,this.tension=r}getPoint(e,t=new R){let i=t,r=this.points,s=r.length,o=(s-(this.closed?0:1))*e,a=Math.floor(o),l=o-a;this.closed?a+=a>0?0:(Math.floor(Math.abs(a)/s)+1)*s:l===0&&a===s-1&&(a=s-2,l=1);let c,h;this.closed||a>0?c=r[(a-1)%s]:($a.subVectors(r[0],r[1]).add(r[0]),c=$a);let u=r[a%s],d=r[(a+1)%s];if(this.closed||a+2<s?h=r[(a+2)%s]:($a.subVectors(r[s-1],r[s-2]).add(r[s-1]),h=$a),this.curveType==="centripetal"||this.curveType==="chordal"){let f=this.curveType==="chordal"?.5:.25,g=Math.pow(c.distanceToSquared(u),f),x=Math.pow(u.distanceToSquared(d),f),m=Math.pow(d.distanceToSquared(h),f);x<1e-4&&(x=1),g<1e-4&&(g=x),m<1e-4&&(m=x),cc.initNonuniformCatmullRom(c.x,u.x,d.x,h.x,g,x,m),hc.initNonuniformCatmullRom(c.y,u.y,d.y,h.y,g,x,m),uc.initNonuniformCatmullRom(c.z,u.z,d.z,h.z,g,x,m)}else this.curveType==="catmullrom"&&(cc.initCatmullRom(c.x,u.x,d.x,h.x,this.tension),hc.initCatmullRom(c.y,u.y,d.y,h.y,this.tension),uc.initCatmullRom(c.z,u.z,d.z,h.z,this.tension));return i.set(cc.calc(l),hc.calc(l),uc.calc(l)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e.closed=this.closed,e.curveType=this.curveType,e.tension=this.tension,e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new R().fromArray(r))}return this.closed=e.closed,this.curveType=e.curveType,this.tension=e.tension,this}};function dc(n,e,t,i,r){let s=(i-e)*.5,o=(r-t)*.5,a=n*n,l=n*a;return(2*t-2*i+s+o)*l+(-3*t+3*i-2*s-o)*a+s*n+t}function px(n,e){let t=1-n;return t*t*e}function mx(n,e){return 2*(1-n)*n*e}function gx(n,e){return n*n*e}function Mr(n,e,t,i){return px(n,e)+mx(n,t)+gx(n,i)}function xx(n,e){let t=1-n;return t*t*t*e}function _x(n,e){let t=1-n;return 3*t*t*n*e}function yx(n,e){return 3*(1-n)*n*n*e}function vx(n,e){return n*n*n*e}function Sr(n,e,t,i,r){return xx(n,e)+_x(n,t)+yx(n,i)+vx(n,r)}var ps=class extends Pt{constructor(e=new ie,t=new ie,i=new ie,r=new ie){super(),this.isCubicBezierCurve=!0,this.type="CubicBezierCurve",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new ie){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Sr(e,r.x,s.x,o.x,a.x),Sr(e,r.y,s.y,o.y,a.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var el=class extends Pt{constructor(e=new R,t=new R,i=new R,r=new R){super(),this.isCubicBezierCurve3=!0,this.type="CubicBezierCurve3",this.v0=e,this.v1=t,this.v2=i,this.v3=r}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2,a=this.v3;return i.set(Sr(e,r.x,s.x,o.x,a.x),Sr(e,r.y,s.y,o.y,a.y),Sr(e,r.z,s.z,o.z,a.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this.v3.copy(e.v3),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e.v3=this.v3.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this.v3.fromArray(e.v3),this}};var ms=class extends Pt{constructor(e=new ie,t=new ie){super(),this.isLineCurve=!0,this.type="LineCurve",this.v1=e,this.v2=t}getPoint(e,t=new ie){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new ie){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var tl=class extends Pt{constructor(e=new R,t=new R){super(),this.isLineCurve3=!0,this.type="LineCurve3",this.v1=e,this.v2=t}getPoint(e,t=new R){let i=t;return e===1?i.copy(this.v2):(i.copy(this.v2).sub(this.v1),i.multiplyScalar(e).add(this.v1)),i}getPointAt(e,t){return this.getPoint(e,t)}getTangent(e,t=new R){return t.subVectors(this.v2,this.v1).normalize()}getTangentAt(e,t){return this.getTangent(e,t)}copy(e){return super.copy(e),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var gs=class extends Pt{constructor(e=new ie,t=new ie,i=new ie){super(),this.isQuadraticBezierCurve=!0,this.type="QuadraticBezierCurve",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new ie){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Mr(e,r.x,s.x,o.x),Mr(e,r.y,s.y,o.y)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var Po=class extends Pt{constructor(e=new R,t=new R,i=new R){super(),this.isQuadraticBezierCurve3=!0,this.type="QuadraticBezierCurve3",this.v0=e,this.v1=t,this.v2=i}getPoint(e,t=new R){let i=t,r=this.v0,s=this.v1,o=this.v2;return i.set(Mr(e,r.x,s.x,o.x),Mr(e,r.y,s.y,o.y),Mr(e,r.z,s.z,o.z)),i}copy(e){return super.copy(e),this.v0.copy(e.v0),this.v1.copy(e.v1),this.v2.copy(e.v2),this}toJSON(){let e=super.toJSON();return e.v0=this.v0.toArray(),e.v1=this.v1.toArray(),e.v2=this.v2.toArray(),e}fromJSON(e){return super.fromJSON(e),this.v0.fromArray(e.v0),this.v1.fromArray(e.v1),this.v2.fromArray(e.v2),this}};var xs=class extends Pt{constructor(e=[]){super(),this.isSplineCurve=!0,this.type="SplineCurve",this.points=e}getPoint(e,t=new ie){let i=t,r=this.points,s=(r.length-1)*e,o=Math.floor(s),a=s-o,l=r[o===0?o:o-1],c=r[o],h=r[o>r.length-2?r.length-1:o+1],u=r[o>r.length-3?r.length-1:o+2];return i.set(dc(a,l.x,c.x,h.x,u.x),dc(a,l.y,c.y,h.y,u.y)),i}copy(e){super.copy(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.points=[];for(let t=0,i=this.points.length;t<i;t++){let r=this.points[t];e.points.push(r.toArray())}return e}fromJSON(e){super.fromJSON(e),this.points=[];for(let t=0,i=e.points.length;t<i;t++){let r=e.points[t];this.points.push(new ie().fromArray(r))}return this}};var Ro=class extends Pt{constructor(){super(),this.type="CurvePath",this.curves=[],this.autoClose=!1}add(e){this.curves.push(e)}closePath(){let e=this.curves[0].getPoint(0),t=this.curves[this.curves.length-1].getPoint(1);if(!e.equals(t)){let i=e.isVector2===!0?"LineCurve":"LineCurve3";this.curves.push(new wr[i](t,e))}return this}getPoint(e,t){let i=e*this.getLength(),r=this.getCurveLengths(),s=0;for(;s<r.length;){if(r[s]>=i){let o=r[s]-i,a=this.curves[s],l=a.getLength(),c=l===0?0:1-o/l;return a.getPointAt(c,t)}s++}return null}getLength(){let e=this.getCurveLengths();return e[e.length-1]}updateArcLengths(){this.needsUpdate=!0,this.cacheLengths=null,this.getCurveLengths()}getCurveLengths(){if(this.cacheLengths&&this.cacheLengths.length===this.curves.length)return this.cacheLengths;let e=[],t=0;for(let i=0,r=this.curves.length;i<r;i++)t+=this.curves[i].getLength(),e.push(t);return this.cacheLengths=e,e}getSpacedPoints(e=40){let t=[];for(let i=0;i<=e;i++)t.push(this.getPoint(i/e));return this.autoClose&&t.push(t[0]),t}getPoints(e=12){let t=[],i;for(let r=0,s=this.curves;r<s.length;r++){let o=s[r],a=o.isEllipseCurve?e*2:o.isLineCurve||o.isLineCurve3?1:o.isSplineCurve?e*o.points.length:e,l=o.getPoints(a);for(let c=0;c<l.length;c++){let h=l[c];i&&i.equals(h)||(t.push(h),i=h)}}return this.autoClose&&t.length>1&&!t[t.length-1].equals(t[0])&&t.push(t[0]),t}copy(e){super.copy(e),this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(r.clone())}return this.autoClose=e.autoClose,this}toJSON(){let e=super.toJSON();e.autoClose=this.autoClose,e.curves=[];for(let t=0,i=this.curves.length;t<i;t++){let r=this.curves[t];e.curves.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.autoClose=e.autoClose,this.curves=[];for(let t=0,i=e.curves.length;t<i;t++){let r=e.curves[t];this.curves.push(new wr[r.type]().fromJSON(r))}return this}};var Pn=class extends Ro{constructor(e){super(),this.type="Path",this.currentPoint=new ie,e&&this.setFromPoints(e)}setFromPoints(e){this.moveTo(e[0].x,e[0].y);for(let t=1,i=e.length;t<i;t++)this.lineTo(e[t].x,e[t].y);return this}moveTo(e,t){return this.currentPoint.set(e,t),this}lineTo(e,t){let i=new ms(this.currentPoint.clone(),new ie(e,t));return this.curves.push(i),this.currentPoint.set(e,t),this}quadraticCurveTo(e,t,i,r){let s=new gs(this.currentPoint.clone(),new ie(e,t),new ie(i,r));return this.curves.push(s),this.currentPoint.set(i,r),this}bezierCurveTo(e,t,i,r,s,o){let a=new ps(this.currentPoint.clone(),new ie(e,t),new ie(i,r),new ie(s,o));return this.curves.push(a),this.currentPoint.set(s,o),this}splineThru(e){let t=[this.currentPoint.clone()].concat(e),i=new xs(t);return this.curves.push(i),this.currentPoint.copy(e[e.length-1]),this}arc(e,t,i,r,s,o){let a=this.currentPoint.x,l=this.currentPoint.y;return this.absarc(e+a,t+l,i,r,s,o),this}absarc(e,t,i,r,s,o){return this.absellipse(e,t,i,i,r,s,o),this}ellipse(e,t,i,r,s,o,a,l){let c=this.currentPoint.x,h=this.currentPoint.y;return this.absellipse(e+c,t+h,i,r,s,o,a,l),this}absellipse(e,t,i,r,s,o,a,l){let c=new jn(e,t,i,r,s,o,a,l);if(this.curves.length>0){let u=c.getPoint(0);u.equals(this.currentPoint)||this.lineTo(u.x,u.y)}this.curves.push(c);let h=c.getPoint(1);return this.currentPoint.copy(h),this}copy(e){return super.copy(e),this.currentPoint.copy(e.currentPoint),this}toJSON(){let e=super.toJSON();return e.currentPoint=this.currentPoint.toArray(),e}fromJSON(e){return super.fromJSON(e),this.currentPoint.fromArray(e.currentPoint),this}};var ln=class extends Pn{constructor(e){super(e),this.uuid=ei(),this.type="Shape",this.holes=[]}getPointsHoles(e){let t=[];for(let i=0,r=this.holes.length;i<r;i++)t[i]=this.holes[i].getPoints(e);return t}extractPoints(e){return{shape:this.getPoints(e),holes:this.getPointsHoles(e)}}copy(e){super.copy(e),this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(r.clone())}return this}toJSON(){let e=super.toJSON();e.uuid=this.uuid,e.holes=[];for(let t=0,i=this.holes.length;t<i;t++){let r=this.holes[t];e.holes.push(r.toJSON())}return e}fromJSON(e){super.fromJSON(e),this.uuid=e.uuid,this.holes=[];for(let t=0,i=e.holes.length;t<i;t++){let r=e.holes[t];this.holes.push(new Pn().fromJSON(r))}return this}};function gc(n,e,t=2){let i=e&&e.length,r=i?e[0]*t:n.length,s=Vu(n,0,r,t,!0),o=[];if(!s||s.next===s.prev)return o;let a,l,c;if(i&&(s=Tx(n,e,s,t)),n.length>80*t){a=1/0,l=1/0;let h=-1/0,u=-1/0;for(let d=t;d<r;d+=t){let f=n[d],g=n[d+1];f<a&&(a=f),g<l&&(l=g),f>h&&(h=f),g>u&&(u=g)}c=Math.max(h-a,u-l),c=c!==0?32767/c:0}return Do(s,o,t,a,l,c,0),o}function Vu(n,e,t,i,r){let s;if(r===Fx(n,e,t,i)>0)for(let o=e;o<t;o+=i)s=zu(o/i|0,n[o],n[o+1],s);else for(let o=t-i;o>=e;o-=i)s=zu(o/i|0,n[o],n[o+1],s);return s&&_s(s,s.next)&&(Uo(s),s=s.next),s}function Tr(n,e){if(!n)return n;e||(e=n);let t=n,i;do if(i=!1,!t.steiner&&(_s(t,t.next)||Rt(t.prev,t,t.next)===0)){if(Uo(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function Do(n,e,t,i,r,s,o){if(!n)return;!o&&s&&Px(n,i,r,s);let a=n;for(;n.prev!==n.next;){let l=n.prev,c=n.next;if(s?Mx(n,i,r,s):bx(n)){e.push(l.i,n.i,c.i),Uo(n),n=c.next,a=c.next;continue}if(n=c,n===a){o?o===1?(n=Sx(Tr(n),e),Do(n,e,t,i,r,s,2)):o===2&&wx(n,e,t,i,r,s):Do(Tr(n),e,t,i,r,s,1);break}}}function bx(n){let e=n.prev,t=n,i=n.next;if(Rt(e,t,i)>=0)return!1;let r=e.x,s=t.x,o=i.x,a=e.y,l=t.y,c=i.y,h=Math.min(r,s,o),u=Math.min(a,l,c),d=Math.max(r,s,o),f=Math.max(a,l,c),g=i.next;for(;g!==e;){if(g.x>=h&&g.x<=d&&g.y>=u&&g.y<=f&&Lo(r,a,s,l,o,c,g.x,g.y)&&Rt(g.prev,g,g.next)>=0)return!1;g=g.next}return!0}function Mx(n,e,t,i){let r=n.prev,s=n,o=n.next;if(Rt(r,s,o)>=0)return!1;let a=r.x,l=s.x,c=o.x,h=r.y,u=s.y,d=o.y,f=Math.min(a,l,c),g=Math.min(h,u,d),x=Math.max(a,l,c),m=Math.max(h,u,d),p=pc(f,g,e,t,i),T=pc(x,m,e,t,i),S=n.prevZ,_=n.nextZ;for(;S&&S.z>=p&&_&&_.z<=T;){if(S.x>=f&&S.x<=x&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Lo(a,h,l,u,c,d,S.x,S.y)&&Rt(S.prev,S,S.next)>=0||(S=S.prevZ,_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&Lo(a,h,l,u,c,d,_.x,_.y)&&Rt(_.prev,_,_.next)>=0))return!1;_=_.nextZ}for(;S&&S.z>=p;){if(S.x>=f&&S.x<=x&&S.y>=g&&S.y<=m&&S!==r&&S!==o&&Lo(a,h,l,u,c,d,S.x,S.y)&&Rt(S.prev,S,S.next)>=0)return!1;S=S.prevZ}for(;_&&_.z<=T;){if(_.x>=f&&_.x<=x&&_.y>=g&&_.y<=m&&_!==r&&_!==o&&Lo(a,h,l,u,c,d,_.x,_.y)&&Rt(_.prev,_,_.next)>=0)return!1;_=_.nextZ}return!0}function Sx(n,e){let t=n;do{let i=t.prev,r=t.next.next;!_s(i,r)&&Gu(i,t,t.next,r)&&No(i,r)&&No(r,i)&&(e.push(i.i,t.i,r.i),Uo(t),Uo(t.next),t=n=r),t=t.next}while(t!==n);return Tr(t)}function wx(n,e,t,i,r,s){let o=n;do{let a=o.next.next;for(;a!==o.prev;){if(o.i!==a.i&&Dx(o,a)){let l=Wu(o,a);o=Tr(o,o.next),l=Tr(l,l.next),Do(o,e,t,i,r,s,0),Do(l,e,t,i,r,s,0);return}a=a.next}o=o.next}while(o!==n)}function Tx(n,e,t,i){let r=[];for(let s=0,o=e.length;s<o;s++){let a=e[s]*i,l=s<o-1?e[s+1]*i:n.length,c=Vu(n,a,l,i,!1);c===c.next&&(c.steiner=!0),r.push(Lx(c))}r.sort(Ex);for(let s=0;s<r.length;s++)t=Ax(r[s],t);return t}function Ex(n,e){let t=n.x-e.x;if(t===0&&(t=n.y-e.y,t===0)){let i=(n.next.y-n.y)/(n.next.x-n.x),r=(e.next.y-e.y)/(e.next.x-e.x);t=i-r}return t}function Ax(n,e){let t=Cx(n,e);if(!t)return e;let i=Wu(t,n);return Tr(i,i.next),Tr(t,t.next)}function Cx(n,e){let t=e,i=n.x,r=n.y,s=-1/0,o;if(_s(n,t))return t;do{if(_s(n,t.next))return t.next;if(r<=t.y&&r>=t.next.y&&t.next.y!==t.y){let u=t.x+(r-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(u<=i&&u>s&&(s=u,o=t.x<t.next.x?t:t.next,u===i))return o}t=t.next}while(t!==e);if(!o)return null;let a=o,l=o.x,c=o.y,h=1/0;t=o;do{if(i>=t.x&&t.x>=l&&i!==t.x&&Hu(r<c?i:s,r,l,c,r<c?s:i,r,t.x,t.y)){let u=Math.abs(r-t.y)/(i-t.x);No(t,n)&&(u<h||u===h&&(t.x>o.x||t.x===o.x&&Ix(o,t)))&&(o=t,h=u)}t=t.next}while(t!==a);return o}function Ix(n,e){return Rt(n.prev,n,e.prev)<0&&Rt(e.next,n,n.next)<0}function Px(n,e,t,i){let r=n;do r.z===0&&(r.z=pc(r.x,r.y,e,t,i)),r.prevZ=r.prev,r.nextZ=r.next,r=r.next;while(r!==n);r.prevZ.nextZ=null,r.prevZ=null,Rx(r)}function Rx(n){let e,t=1;do{let i=n,r;n=null;let s=null;for(e=0;i;){e++;let o=i,a=0;for(let c=0;c<t&&(a++,o=o.nextZ,!!o);c++);let l=t;for(;a>0||l>0&&o;)a!==0&&(l===0||!o||i.z<=o.z)?(r=i,i=i.nextZ,a--):(r=o,o=o.nextZ,l--),s?s.nextZ=r:n=r,r.prevZ=s,s=r;i=o}s.nextZ=null,t*=2}while(e>1);return n}function pc(n,e,t,i,r){return n=(n-t)*r|0,e=(e-i)*r|0,n=(n|n<<8)&16711935,n=(n|n<<4)&252645135,n=(n|n<<2)&858993459,n=(n|n<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,n|e<<1}function Lx(n){let e=n,t=n;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==n);return t}function Hu(n,e,t,i,r,s,o,a){return(r-o)*(e-a)>=(n-o)*(s-a)&&(n-o)*(i-a)>=(t-o)*(e-a)&&(t-o)*(s-a)>=(r-o)*(i-a)}function Lo(n,e,t,i,r,s,o,a){return!(n===o&&e===a)&&Hu(n,e,t,i,r,s,o,a)}function Dx(n,e){return n.next.i!==e.i&&n.prev.i!==e.i&&!Nx(n,e)&&(No(n,e)&&No(e,n)&&Ux(n,e)&&(Rt(n.prev,n,e.prev)||Rt(n,e.prev,e))||_s(n,e)&&Rt(n.prev,n,n.next)>0&&Rt(e.prev,e,e.next)>0)}function Rt(n,e,t){return(e.y-n.y)*(t.x-e.x)-(e.x-n.x)*(t.y-e.y)}function _s(n,e){return n.x===e.x&&n.y===e.y}function Gu(n,e,t,i){let r=nl(Rt(n,e,t)),s=nl(Rt(n,e,i)),o=nl(Rt(t,i,n)),a=nl(Rt(t,i,e));return!!(r!==s&&o!==a||r===0&&il(n,t,e)||s===0&&il(n,i,e)||o===0&&il(t,n,i)||a===0&&il(t,e,i))}function il(n,e,t){return e.x<=Math.max(n.x,t.x)&&e.x>=Math.min(n.x,t.x)&&e.y<=Math.max(n.y,t.y)&&e.y>=Math.min(n.y,t.y)}function nl(n){return n>0?1:n<0?-1:0}function Nx(n,e){let t=n;do{if(t.i!==n.i&&t.next.i!==n.i&&t.i!==e.i&&t.next.i!==e.i&&Gu(t,t.next,n,e))return!0;t=t.next}while(t!==n);return!1}function No(n,e){return Rt(n.prev,n,n.next)<0?Rt(n,e,n.next)>=0&&Rt(n,n.prev,e)>=0:Rt(n,e,n.prev)<0||Rt(n,n.next,e)<0}function Ux(n,e){let t=n,i=!1,r=(n.x+e.x)/2,s=(n.y+e.y)/2;do t.y>s!=t.next.y>s&&t.next.y!==t.y&&r<(t.next.x-t.x)*(s-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==n);return i}function Wu(n,e){let t=mc(n.i,n.x,n.y),i=mc(e.i,e.x,e.y),r=n.next,s=e.prev;return n.next=e,e.prev=n,t.next=r,r.prev=t,i.next=t,t.prev=i,s.next=i,i.prev=s,i}function zu(n,e,t,i){let r=mc(n,e,t);return i?(r.next=i.next,r.prev=i,i.next.prev=r,i.next=r):(r.prev=r,r.next=r),r}function Uo(n){n.next.prev=n.prev,n.prev.next=n.next,n.prevZ&&(n.prevZ.nextZ=n.nextZ),n.nextZ&&(n.nextZ.prevZ=n.prevZ)}function mc(n,e,t){return{i:n,x:e,y:t,prev:null,next:null,z:0,prevZ:null,nextZ:null,steiner:!1}}function Fx(n,e,t,i){let r=0;for(let s=e,o=t-i;s<t;s+=i)r+=(n[o]-n[s])*(n[s+1]+n[o+1]),o=s;return r}var rl=class{static triangulate(e,t,i=2){return gc(e,t,i)}};var Pi=class n{static area(e){let t=e.length,i=0;for(let r=t-1,s=0;s<t;r=s++)i+=e[r].x*e[s].y-e[s].x*e[r].y;return i*.5}static isClockWise(e){return n.area(e)<0}static triangulateShape(e,t){let i=[],r=[],s=[];Xu(e),qu(i,e);let o=e.length;t.forEach(Xu);for(let l=0;l<t.length;l++)r.push(o),o+=t[l].length,qu(i,t[l]);let a=rl.triangulate(i,r);for(let l=0;l<a.length;l+=3)s.push(a.slice(l,l+3));return s}};function Xu(n){let e=n.length;e>2&&n[e-1].equals(n[0])&&n.pop()}function qu(n,e){for(let t=0;t<e.length;t++)n.push(e[t].x),n.push(e[t].y)}var sl=class n extends Ke{constructor(e=new ln([new ie(.5,.5),new ie(-.5,.5),new ie(-.5,-.5),new ie(.5,-.5)]),t={}){super(),this.type="ExtrudeGeometry",this.parameters={shapes:e,options:t},e=Array.isArray(e)?e:[e];let i=this,r=[],s=[];for(let a=0,l=e.length;a<l;a++){let c=e[a];o(c)}this.setAttribute("position",new tt(r,3)),this.setAttribute("uv",new tt(s,2)),this.computeVertexNormals();function o(a){let l=[],c=t.curveSegments!==void 0?t.curveSegments:12,h=t.steps!==void 0?t.steps:1,u=t.depth!==void 0?t.depth:1,d=t.bevelEnabled!==void 0?t.bevelEnabled:!0,f=t.bevelThickness!==void 0?t.bevelThickness:.2,g=t.bevelSize!==void 0?t.bevelSize:f-.1,x=t.bevelOffset!==void 0?t.bevelOffset:0,m=t.bevelSegments!==void 0?t.bevelSegments:3,p=t.extrudePath,T=t.UVGenerator!==void 0?t.UVGenerator:Ox,S,_=!1,C,M,A,E;p&&(S=p.getSpacedPoints(h),_=!0,d=!1,C=p.computeFrenetFrames(h,!1),M=new R,A=new R,E=new R),d||(m=0,f=0,g=0,x=0);let b=a.extractPoints(c),v=b.shape,P=b.holes;if(!Pi.isClockWise(v)){v=v.reverse();for(let D=0,Z=P.length;D<Z;D++){let K=P[D];Pi.isClockWise(K)&&(P[D]=K.reverse())}}function F(D){let K=10000000000000001e-36,Q=D[0];for(let Se=1;Se<=D.length;Se++){let pe=Se%D.length,Te=D[pe],Qe=Te.x-Q.x,je=Te.y-Q.y,I=Qe*Qe+je*je,y=Math.max(Math.abs(Te.x),Math.abs(Te.y),Math.abs(Q.x),Math.abs(Q.y)),H=K*y*y;if(I<=H){D.splice(pe,1),Se--;continue}Q=Te}}F(v),P.forEach(F);let z=P.length,V=v;for(let D=0;D<z;D++){let Z=P[D];v=v.concat(Z)}function q(D,Z,K){return Z||console.error("THREE.ExtrudeGeometry: vec does not exist"),D.clone().addScaledVector(Z,K)}let X=v.length;function W(D,Z,K){let Q,Se,pe,Te=D.x-Z.x,Qe=D.y-Z.y,je=K.x-D.x,I=K.y-D.y,y=Te*Te+Qe*Qe,H=Te*I-Qe*je;if(Math.abs(H)>Number.EPSILON){let $=Math.sqrt(y),ae=Math.sqrt(je*je+I*I),ee=Z.x-Qe/$,ke=Z.y+Te/$,we=K.x-I/ae,Oe=K.y+je/ae,Fe=((we-ee)*I-(Oe-ke)*je)/(Te*I-Qe*je);Q=ee+Te*Fe-D.x,Se=ke+Qe*Fe-D.y;let me=Q*Q+Se*Se;if(me<=2)return new ie(Q,Se);pe=Math.sqrt(me/2)}else{let $=!1;Te>Number.EPSILON?je>Number.EPSILON&&($=!0):Te<-Number.EPSILON?je<-Number.EPSILON&&($=!0):Math.sign(Qe)===Math.sign(I)&&($=!0),$?(Q=-Qe,Se=Te,pe=Math.sqrt(y)):(Q=Te,Se=Qe,pe=Math.sqrt(y/2))}return new ie(Q/pe,Se/pe)}let Y=[];for(let D=0,Z=V.length,K=Z-1,Q=D+1;D<Z;D++,K++,Q++)K===Z&&(K=0),Q===Z&&(Q=0),Y[D]=W(V[D],V[K],V[Q]);let oe=[],Me,Ae=Y.concat();for(let D=0,Z=z;D<Z;D++){let K=P[D];Me=[];for(let Q=0,Se=K.length,pe=Se-1,Te=Q+1;Q<Se;Q++,pe++,Te++)pe===Se&&(pe=0),Te===Se&&(Te=0),Me[Q]=W(K[Q],K[pe],K[Te]);oe.push(Me),Ae=Ae.concat(Me)}let ue;if(m===0)ue=Pi.triangulateShape(V,P);else{let D=[],Z=[];for(let K=0;K<m;K++){let Q=K/m,Se=f*Math.cos(Q*Math.PI/2),pe=g*Math.sin(Q*Math.PI/2)+x;for(let Te=0,Qe=V.length;Te<Qe;Te++){let je=q(V[Te],Y[Te],pe);xe(je.x,je.y,-Se),Q===0&&D.push(je)}for(let Te=0,Qe=z;Te<Qe;Te++){let je=P[Te];Me=oe[Te];let I=[];for(let y=0,H=je.length;y<H;y++){let $=q(je[y],Me[y],pe);xe($.x,$.y,-Se),Q===0&&I.push($)}Q===0&&Z.push(I)}}ue=Pi.triangulateShape(D,Z)}let He=ue.length,Re=g+x;for(let D=0;D<X;D++){let Z=d?q(v[D],Ae[D],Re):v[D];_?(A.copy(C.normals[0]).multiplyScalar(Z.x),M.copy(C.binormals[0]).multiplyScalar(Z.y),E.copy(S[0]).add(A).add(M),xe(E.x,E.y,E.z)):xe(Z.x,Z.y,0)}for(let D=1;D<=h;D++)for(let Z=0;Z<X;Z++){let K=d?q(v[Z],Ae[Z],Re):v[Z];_?(A.copy(C.normals[D]).multiplyScalar(K.x),M.copy(C.binormals[D]).multiplyScalar(K.y),E.copy(S[D]).add(A).add(M),xe(E.x,E.y,E.z)):xe(K.x,K.y,u/h*D)}for(let D=m-1;D>=0;D--){let Z=D/m,K=f*Math.cos(Z*Math.PI/2),Q=g*Math.sin(Z*Math.PI/2)+x;for(let Se=0,pe=V.length;Se<pe;Se++){let Te=q(V[Se],Y[Se],Q);xe(Te.x,Te.y,u+K)}for(let Se=0,pe=P.length;Se<pe;Se++){let Te=P[Se];Me=oe[Se];for(let Qe=0,je=Te.length;Qe<je;Qe++){let I=q(Te[Qe],Me[Qe],Q);_?xe(I.x,I.y+S[h-1].y,S[h-1].x+K):xe(I.x,I.y,u+K)}}}te(),ce();function te(){let D=r.length/3;if(d){let Z=0,K=X*Z;for(let Q=0;Q<He;Q++){let Se=ue[Q];_e(Se[2]+K,Se[1]+K,Se[0]+K)}Z=h+m*2,K=X*Z;for(let Q=0;Q<He;Q++){let Se=ue[Q];_e(Se[0]+K,Se[1]+K,Se[2]+K)}}else{for(let Z=0;Z<He;Z++){let K=ue[Z];_e(K[2],K[1],K[0])}for(let Z=0;Z<He;Z++){let K=ue[Z];_e(K[0]+X*h,K[1]+X*h,K[2]+X*h)}}i.addGroup(D,r.length/3-D,0)}function ce(){let D=r.length/3,Z=0;re(V,Z),Z+=V.length;for(let K=0,Q=P.length;K<Q;K++){let Se=P[K];re(Se,Z),Z+=Se.length}i.addGroup(D,r.length/3-D,1)}function re(D,Z){let K=D.length;for(;--K>=0;){let Q=K,Se=K-1;Se<0&&(Se=D.length-1);for(let pe=0,Te=h+m*2;pe<Te;pe++){let Qe=X*pe,je=X*(pe+1),I=Z+Q+Qe,y=Z+Se+Qe,H=Z+Se+je,$=Z+Q+je;We(I,y,H,$)}}}function xe(D,Z,K){l.push(D),l.push(Z),l.push(K)}function _e(D,Z,K){rt(D),rt(Z),rt(K);let Q=r.length/3,Se=T.generateTopUV(i,r,Q-3,Q-2,Q-1);L(Se[0]),L(Se[1]),L(Se[2])}function We(D,Z,K,Q){rt(D),rt(Z),rt(Q),rt(Z),rt(K),rt(Q);let Se=r.length/3,pe=T.generateSideWallUV(i,r,Se-6,Se-3,Se-2,Se-1);L(pe[0]),L(pe[1]),L(pe[3]),L(pe[1]),L(pe[2]),L(pe[3])}function rt(D){r.push(l[D*3+0]),r.push(l[D*3+1]),r.push(l[D*3+2])}function L(D){s.push(D.x),s.push(D.y)}}}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}toJSON(){let e=super.toJSON(),t=this.parameters.shapes,i=this.parameters.options;return Bx(t,i,e)}static fromJSON(e,t){let i=[];for(let s=0,o=e.shapes.length;s<o;s++){let a=t[e.shapes[s]];i.push(a)}let r=e.options.extrudePath;return r!==void 0&&(e.options.extrudePath=new wr[r.type]().fromJSON(r)),new n(i,e.options)}},Ox={generateTopUV:function(n,e,t,i,r){let s=e[t*3],o=e[t*3+1],a=e[i*3],l=e[i*3+1],c=e[r*3],h=e[r*3+1];return[new ie(s,o),new ie(a,l),new ie(c,h)]},generateSideWallUV:function(n,e,t,i,r,s){let o=e[t*3],a=e[t*3+1],l=e[t*3+2],c=e[i*3],h=e[i*3+1],u=e[i*3+2],d=e[r*3],f=e[r*3+1],g=e[r*3+2],x=e[s*3],m=e[s*3+1],p=e[s*3+2];return Math.abs(a-h)<Math.abs(o-c)?[new ie(o,1-l),new ie(c,1-u),new ie(d,1-g),new ie(x,1-p)]:[new ie(a,1-l),new ie(h,1-u),new ie(f,1-g),new ie(m,1-p)]}};function Bx(n,e,t){if(t.shapes=[],Array.isArray(n))for(let i=0,r=n.length;i<r;i++){let s=n[i];t.shapes.push(s.uuid)}else t.shapes.push(n.uuid);return t.options=Object.assign({},e),e.extrudePath!==void 0&&(t.options.extrudePath=e.extrudePath.toJSON()),t}var Rn=class n extends Ke{constructor(e=1,t=1,i=1,r=1){super(),this.type="PlaneGeometry",this.parameters={width:e,height:t,widthSegments:i,heightSegments:r};let s=e/2,o=t/2,a=Math.floor(i),l=Math.floor(r),c=a+1,h=l+1,u=e/a,d=t/l,f=[],g=[],x=[],m=[];for(let p=0;p<h;p++){let T=p*d-o;for(let S=0;S<c;S++){let _=S*u-s;g.push(_,-T,0),x.push(0,0,1),m.push(S/a),m.push(1-p/l)}}for(let p=0;p<l;p++)for(let T=0;T<a;T++){let S=T+c*p,_=T+c*(p+1),C=T+1+c*(p+1),M=T+1+c*p;f.push(S,_,M),f.push(_,C,M)}this.setIndex(f),this.setAttribute("position",new tt(g,3)),this.setAttribute("normal",new tt(x,3)),this.setAttribute("uv",new tt(m,2))}copy(e){return super.copy(e),this.parameters=Object.assign({},e.parameters),this}static fromJSON(e){return new n(e.width,e.height,e.widthSegments,e.heightSegments)}};var ys=class extends wt{constructor(e){super(),this.isShadowMaterial=!0,this.type="ShadowMaterial",this.color=new Pe(0),this.transparent=!0,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.color.copy(e.color),this.fog=e.fog,this}};var en=class extends wt{constructor(e){super(),this.isMeshStandardMaterial=!0,this.type="MeshStandardMaterial",this.defines={STANDARD:""},this.color=new Pe(16777215),this.roughness=1,this.metalness=0,this.map=null,this.lightMap=null,this.lightMapIntensity=1,this.aoMap=null,this.aoMapIntensity=1,this.emissive=new Pe(0),this.emissiveIntensity=1,this.emissiveMap=null,this.bumpMap=null,this.bumpScale=1,this.normalMap=null,this.normalMapType=yn,this.normalScale=new ie(1,1),this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.roughnessMap=null,this.metalnessMap=null,this.alphaMap=null,this.envMap=null,this.envMapRotation=new Wt,this.envMapIntensity=1,this.wireframe=!1,this.wireframeLinewidth=1,this.wireframeLinecap="round",this.wireframeLinejoin="round",this.flatShading=!1,this.fog=!0,this.setValues(e)}copy(e){return super.copy(e),this.defines={STANDARD:""},this.color.copy(e.color),this.roughness=e.roughness,this.metalness=e.metalness,this.map=e.map,this.lightMap=e.lightMap,this.lightMapIntensity=e.lightMapIntensity,this.aoMap=e.aoMap,this.aoMapIntensity=e.aoMapIntensity,this.emissive.copy(e.emissive),this.emissiveMap=e.emissiveMap,this.emissiveIntensity=e.emissiveIntensity,this.bumpMap=e.bumpMap,this.bumpScale=e.bumpScale,this.normalMap=e.normalMap,this.normalMapType=e.normalMapType,this.normalScale.copy(e.normalScale),this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.roughnessMap=e.roughnessMap,this.metalnessMap=e.metalnessMap,this.alphaMap=e.alphaMap,this.envMap=e.envMap,this.envMapRotation.copy(e.envMapRotation),this.envMapIntensity=e.envMapIntensity,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this.wireframeLinecap=e.wireframeLinecap,this.wireframeLinejoin=e.wireframeLinejoin,this.flatShading=e.flatShading,this.fog=e.fog,this}};var vs=class extends wt{constructor(e){super(),this.isMeshDepthMaterial=!0,this.type="MeshDepthMaterial",this.depthPacking=Qh,this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.wireframe=!1,this.wireframeLinewidth=1,this.setValues(e)}copy(e){return super.copy(e),this.depthPacking=e.depthPacking,this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this.wireframe=e.wireframe,this.wireframeLinewidth=e.wireframeLinewidth,this}};var bs=class extends wt{constructor(e){super(),this.isMeshDistanceMaterial=!0,this.type="MeshDistanceMaterial",this.map=null,this.alphaMap=null,this.displacementMap=null,this.displacementScale=1,this.displacementBias=0,this.setValues(e)}copy(e){return super.copy(e),this.map=e.map,this.alphaMap=e.alphaMap,this.displacementMap=e.displacementMap,this.displacementScale=e.displacementScale,this.displacementBias=e.displacementBias,this}};function Fo(n,e){return!n||n.constructor===e?n:typeof e.BYTES_PER_ELEMENT=="number"?new e(n):Array.prototype.slice.call(n)}function Yu(n){return ArrayBuffer.isView(n)&&!(n instanceof DataView)}var tn=class{constructor(e,t,i,r){this.parameterPositions=e,this._cachedIndex=0,this.resultBuffer=r!==void 0?r:new t.constructor(i),this.sampleValues=t,this.valueSize=i,this.settings=null,this.DefaultSettings_={}}evaluate(e){let t=this.parameterPositions,i=this._cachedIndex,r=t[i],s=t[i-1];i:{e:{let o;t:{n:if(!(e<r)){for(let a=i+2;;){if(r===void 0){if(e<s)break n;return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}if(i===a)break;if(s=r,r=t[++i],e<r)break e}o=t.length;break t}if(!(e>=s)){let a=t[1];e<a&&(i=2,s=a);for(let l=i-2;;){if(s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(i===l)break;if(r=s,s=t[--i-1],e>=s)break e}o=i,i=0;break t}break i}for(;i<o;){let a=i+o>>>1;e<t[a]?o=a:i=a+1}if(r=t[i],s=t[i-1],s===void 0)return this._cachedIndex=0,this.copySampleValue_(0);if(r===void 0)return i=t.length,this._cachedIndex=i,this.copySampleValue_(i-1)}this._cachedIndex=i,this.intervalChanged_(i,s,r)}return this.interpolate_(i,s,e,r)}getSettings_(){return this.settings||this.DefaultSettings_}copySampleValue_(e){let t=this.resultBuffer,i=this.sampleValues,r=this.valueSize,s=e*r;for(let o=0;o!==r;++o)t[o]=i[s+o];return t}interpolate_(){throw new Error("call to abstract method")}intervalChanged_(){}};var Oo=class extends tn{constructor(e,t,i,r){super(e,t,i,r),this._weightPrev=-0,this._offsetPrev=-0,this._weightNext=-0,this._offsetNext=-0,this.DefaultSettings_={endingStart:va,endingEnd:va}}intervalChanged_(e,t,i){let r=this.parameterPositions,s=e-2,o=e+1,a=r[s],l=r[o];if(a===void 0)switch(this.getSettings_().endingStart){case ba:s=e,a=2*t-i;break;case Ma:s=r.length-2,a=t+r[s]-r[s+1];break;default:s=e,a=i}if(l===void 0)switch(this.getSettings_().endingEnd){case ba:o=e,l=2*i-t;break;case Ma:o=1,l=i+r[1]-r[0];break;default:o=e-1,l=t}let c=(i-t)*.5,h=this.valueSize;this._weightPrev=c/(t-a),this._weightNext=c/(l-i),this._offsetPrev=s*h,this._offsetNext=o*h}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=this._offsetPrev,u=this._offsetNext,d=this._weightPrev,f=this._weightNext,g=(i-t)/(r-t),x=g*g,m=x*g,p=-d*m+2*d*x-d*g,T=(1+d)*m+(-1.5-2*d)*x+(-.5+d)*g+1,S=(-1-f)*m+(1.5+f)*x+.5*g,_=f*m-f*x;for(let C=0;C!==a;++C)s[C]=p*o[h+C]+T*o[c+C]+S*o[l+C]+_*o[u+C];return s}};var Ms=class extends tn{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=e*a,c=l-a,h=(i-t)/(r-t),u=1-h;for(let d=0;d!==a;++d)s[d]=o[c+d]*u+o[l+d]*h;return s}};var Bo=class extends tn{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e){return this.copySampleValue_(e-1)}};var Vt=class{constructor(e,t,i,r){if(e===void 0)throw new Error("THREE.KeyframeTrack: track name is undefined");if(t===void 0||t.length===0)throw new Error("THREE.KeyframeTrack: no keyframes in track named "+e);this.name=e,this.times=Fo(t,this.TimeBufferType),this.values=Fo(i,this.ValueBufferType),this.setInterpolation(r||this.DefaultInterpolation)}static toJSON(e){let t=e.constructor,i;if(t.toJSON!==this.toJSON)i=t.toJSON(e);else{i={name:e.name,times:Fo(e.times,Array),values:Fo(e.values,Array)};let r=e.getInterpolation();r!==e.DefaultInterpolation&&(i.interpolation=r)}return i.type=e.ValueTypeName,i}InterpolantFactoryMethodDiscrete(e){return new Bo(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodLinear(e){return new Ms(this.times,this.values,this.getValueSize(),e)}InterpolantFactoryMethodSmooth(e){return new Oo(this.times,this.values,this.getValueSize(),e)}setInterpolation(e){let t;switch(e){case _n:t=this.InterpolantFactoryMethodDiscrete;break;case jr:t=this.InterpolantFactoryMethodLinear;break;case ya:t=this.InterpolantFactoryMethodSmooth;break}if(t===void 0){let i="unsupported interpolation for "+this.ValueTypeName+" keyframe track named "+this.name;if(this.createInterpolant===void 0)if(e!==this.DefaultInterpolation)this.setInterpolation(this.DefaultInterpolation);else throw new Error(i);return console.warn("THREE.KeyframeTrack:",i),this}return this.createInterpolant=t,this}getInterpolation(){switch(this.createInterpolant){case this.InterpolantFactoryMethodDiscrete:return _n;case this.InterpolantFactoryMethodLinear:return jr;case this.InterpolantFactoryMethodSmooth:return ya}}getValueSize(){return this.values.length/this.times.length}shift(e){if(e!==0){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]+=e}return this}scale(e){if(e!==1){let t=this.times;for(let i=0,r=t.length;i!==r;++i)t[i]*=e}return this}trim(e,t){let i=this.times,r=i.length,s=0,o=r-1;for(;s!==r&&i[s]<e;)++s;for(;o!==-1&&i[o]>t;)--o;if(++o,s!==0||o!==r){s>=o&&(o=Math.max(o,1),s=o-1);let a=this.getValueSize();this.times=i.slice(s,o),this.values=this.values.slice(s*a,o*a)}return this}validate(){let e=!0,t=this.getValueSize();t-Math.floor(t)!==0&&(console.error("THREE.KeyframeTrack: Invalid value size in track.",this),e=!1);let i=this.times,r=this.values,s=i.length;s===0&&(console.error("THREE.KeyframeTrack: Track is empty.",this),e=!1);let o=null;for(let a=0;a!==s;a++){let l=i[a];if(typeof l=="number"&&isNaN(l)){console.error("THREE.KeyframeTrack: Time is not a valid number.",this,a,l),e=!1;break}if(o!==null&&o>l){console.error("THREE.KeyframeTrack: Out of order keys.",this,a,l,o),e=!1;break}o=l}if(r!==void 0&&Yu(r))for(let a=0,l=r.length;a!==l;++a){let c=r[a];if(isNaN(c)){console.error("THREE.KeyframeTrack: Value is not a valid number.",this,a,c),e=!1;break}}return e}optimize(){let e=this.times.slice(),t=this.values.slice(),i=this.getValueSize(),r=this.getInterpolation()===ya,s=e.length-1,o=1;for(let a=1;a<s;++a){let l=!1,c=e[a],h=e[a+1];if(c!==h&&(a!==1||c!==e[0]))if(r)l=!0;else{let u=a*i,d=u-i,f=u+i;for(let g=0;g!==i;++g){let x=t[u+g];if(x!==t[d+g]||x!==t[f+g]){l=!0;break}}}if(l){if(a!==o){e[o]=e[a];let u=a*i,d=o*i;for(let f=0;f!==i;++f)t[d+f]=t[u+f]}++o}}if(s>0){e[o]=e[s];for(let a=s*i,l=o*i,c=0;c!==i;++c)t[l+c]=t[a+c];++o}return o!==e.length?(this.times=e.slice(0,o),this.values=t.slice(0,o*i)):(this.times=e,this.values=t),this}clone(){let e=this.times.slice(),t=this.values.slice(),i=this.constructor,r=new i(this.name,e,t);return r.createInterpolant=this.createInterpolant,r}};Vt.prototype.ValueTypeName="";Vt.prototype.TimeBufferType=Float32Array;Vt.prototype.ValueBufferType=Float32Array;Vt.prototype.DefaultInterpolation=jr;var Ln=class extends Vt{constructor(e,t,i){super(e,t,i)}};Ln.prototype.ValueTypeName="bool";Ln.prototype.ValueBufferType=Array;Ln.prototype.DefaultInterpolation=_n;Ln.prototype.InterpolantFactoryMethodLinear=void 0;Ln.prototype.InterpolantFactoryMethodSmooth=void 0;var ko=class extends Vt{constructor(e,t,i,r){super(e,t,i,r)}};ko.prototype.ValueTypeName="color";var zo=class extends Vt{constructor(e,t,i,r){super(e,t,i,r)}};zo.prototype.ValueTypeName="number";var Vo=class extends tn{constructor(e,t,i,r){super(e,t,i,r)}interpolate_(e,t,i,r){let s=this.resultBuffer,o=this.sampleValues,a=this.valueSize,l=(i-t)/(r-t),c=e*a;for(let h=c+a;c!==h;c+=4)Nt.slerpFlat(s,0,o,c-a,o,c,l);return s}};var Ss=class extends Vt{constructor(e,t,i,r){super(e,t,i,r)}InterpolantFactoryMethodLinear(e){return new Vo(this.times,this.values,this.getValueSize(),e)}};Ss.prototype.ValueTypeName="quaternion";Ss.prototype.InterpolantFactoryMethodSmooth=void 0;var Dn=class extends Vt{constructor(e,t,i){super(e,t,i)}};Dn.prototype.ValueTypeName="string";Dn.prototype.ValueBufferType=Array;Dn.prototype.DefaultInterpolation=_n;Dn.prototype.InterpolantFactoryMethodLinear=void 0;Dn.prototype.InterpolantFactoryMethodSmooth=void 0;var Ho=class extends Vt{constructor(e,t,i,r){super(e,t,i,r)}};Ho.prototype.ValueTypeName="vector";var Er={enabled:!1,files:{},add:function(n,e){this.enabled!==!1&&(this.files[n]=e)},get:function(n){if(this.enabled!==!1)return this.files[n]},remove:function(n){delete this.files[n]},clear:function(){this.files={}}};var Go=class{constructor(e,t,i){let r=this,s=!1,o=0,a=0,l,c=[];this.onStart=void 0,this.onLoad=e,this.onProgress=t,this.onError=i,this.abortController=new AbortController,this.itemStart=function(h){a++,s===!1&&r.onStart!==void 0&&r.onStart(h,o,a),s=!0},this.itemEnd=function(h){o++,r.onProgress!==void 0&&r.onProgress(h,o,a),o===a&&(s=!1,r.onLoad!==void 0&&r.onLoad())},this.itemError=function(h){r.onError!==void 0&&r.onError(h)},this.resolveURL=function(h){return l?l(h):h},this.setURLModifier=function(h){return l=h,this},this.addHandler=function(h,u){return c.push(h,u),this},this.removeHandler=function(h){let u=c.indexOf(h);return u!==-1&&c.splice(u,2),this},this.getHandler=function(h){for(let u=0,d=c.length;u<d;u+=2){let f=c[u],g=c[u+1];if(f.global&&(f.lastIndex=0),f.test(h))return g}return null},this.abort=function(){return this.abortController.abort(),this.abortController=new AbortController,this}}},xc=new Go;var $t=class{constructor(e){this.manager=e!==void 0?e:xc,this.crossOrigin="anonymous",this.withCredentials=!1,this.path="",this.resourcePath="",this.requestHeader={}}load(){}loadAsync(e,t){let i=this;return new Promise(function(r,s){i.load(e,r,t,s)})}parse(){}setCrossOrigin(e){return this.crossOrigin=e,this}setWithCredentials(e){return this.withCredentials=e,this}setPath(e){return this.path=e,this}setResourcePath(e){return this.resourcePath=e,this}setRequestHeader(e){return this.requestHeader=e,this}abort(){return this}};$t.DEFAULT_MATERIAL_NAME="__DEFAULT";var ws=new WeakMap,Cr=class extends $t{constructor(e){super(e)}load(e,t,i,r){this.path!==void 0&&(e=this.path+e),e=this.manager.resolveURL(e);let s=this,o=Er.get(`image:${e}`);if(o!==void 0){if(o.complete===!0)s.manager.itemStart(e),setTimeout(function(){t&&t(o),s.manager.itemEnd(e)},0);else{let u=ws.get(o);u===void 0&&(u=[],ws.set(o,u)),u.push({onLoad:t,onError:r})}return o}let a=Vn("img");function l(){h(),t&&t(this);let u=ws.get(this)||[];for(let d=0;d<u.length;d++){let f=u[d];f.onLoad&&f.onLoad(this)}ws.delete(this),s.manager.itemEnd(e)}function c(u){h(),r&&r(u),Er.remove(`image:${e}`);let d=ws.get(this)||[];for(let f=0;f<d.length;f++){let g=d[f];g.onError&&g.onError(u)}ws.delete(this),s.manager.itemError(e),s.manager.itemEnd(e)}function h(){a.removeEventListener("load",l,!1),a.removeEventListener("error",c,!1)}return a.addEventListener("load",l,!1),a.addEventListener("error",c,!1),e.slice(0,5)!=="data:"&&this.crossOrigin!==void 0&&(a.crossOrigin=this.crossOrigin),Er.add(`image:${e}`,a),s.manager.itemStart(e),a.src=e,a}};var Wo=class extends $t{constructor(e){super(e)}load(e,t,i,r){let s=new _t,o=new Cr(this.manager);return o.setCrossOrigin(this.crossOrigin),o.setPath(this.path),o.load(e,function(a){s.image=a,s.needsUpdate=!0,t!==void 0&&t(s)},i,r),s}};var Hi=class extends at{constructor(e,t=1){super(),this.isLight=!0,this.type="Light",this.color=new Pe(e),this.intensity=t}dispose(){}copy(e,t){return super.copy(e,t),this.color.copy(e.color),this.intensity=e.intensity,this}toJSON(e){let t=super.toJSON(e);return t.object.color=this.color.getHex(),t.object.intensity=this.intensity,this.groundColor!==void 0&&(t.object.groundColor=this.groundColor.getHex()),this.distance!==void 0&&(t.object.distance=this.distance),this.angle!==void 0&&(t.object.angle=this.angle),this.decay!==void 0&&(t.object.decay=this.decay),this.penumbra!==void 0&&(t.object.penumbra=this.penumbra),this.shadow!==void 0&&(t.object.shadow=this.shadow.toJSON()),this.target!==void 0&&(t.object.target=this.target.uuid),t}};var Ts=class extends Hi{constructor(e,t,i){super(e,i),this.isHemisphereLight=!0,this.type="HemisphereLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.groundColor=new Pe(t)}copy(e,t){return super.copy(e,t),this.groundColor.copy(e.groundColor),this}};var yc=new Je,Ku=new R,ju=new R,Es=class{constructor(e){this.camera=e,this.intensity=1,this.bias=0,this.normalBias=0,this.radius=1,this.blurSamples=8,this.mapSize=new ie(512,512),this.mapType=Zt,this.map=null,this.mapPass=null,this.matrix=new Je,this.autoUpdate=!0,this.needsUpdate=!1,this._frustum=new Qi,this._frameExtents=new ie(1,1),this._viewportCount=1,this._viewports=[new ut(0,0,1,1)]}getViewportCount(){return this._viewportCount}getFrustum(){return this._frustum}updateMatrices(e){let t=this.camera,i=this.matrix;Ku.setFromMatrixPosition(e.matrixWorld),t.position.copy(Ku),ju.setFromMatrixPosition(e.target.matrixWorld),t.lookAt(ju),t.updateMatrixWorld(),yc.multiplyMatrices(t.projectionMatrix,t.matrixWorldInverse),this._frustum.setFromProjectionMatrix(yc,t.coordinateSystem,t.reversedDepth),t.reversedDepth?i.set(.5,0,0,.5,0,.5,0,.5,0,0,1,0,0,0,0,1):i.set(.5,0,0,.5,0,.5,0,.5,0,0,.5,.5,0,0,0,1),i.multiply(yc)}getViewport(e){return this._viewports[e]}getFrameExtents(){return this._frameExtents}dispose(){this.map&&this.map.dispose(),this.mapPass&&this.mapPass.dispose()}copy(e){return this.camera=e.camera.clone(),this.intensity=e.intensity,this.bias=e.bias,this.radius=e.radius,this.autoUpdate=e.autoUpdate,this.needsUpdate=e.needsUpdate,this.normalBias=e.normalBias,this.blurSamples=e.blurSamples,this.mapSize.copy(e.mapSize),this}clone(){return new this.constructor().copy(this)}toJSON(){let e={};return this.intensity!==1&&(e.intensity=this.intensity),this.bias!==0&&(e.bias=this.bias),this.normalBias!==0&&(e.normalBias=this.normalBias),this.radius!==1&&(e.radius=this.radius),(this.mapSize.x!==512||this.mapSize.y!==512)&&(e.mapSize=this.mapSize.toArray()),e.camera=this.camera.toJSON(!1).object,delete e.camera.matrix,e}};var $n=class extends Jn{constructor(e=-1,t=1,i=1,r=-1,s=.1,o=2e3){super(),this.isOrthographicCamera=!0,this.type="OrthographicCamera",this.zoom=1,this.view=null,this.left=e,this.right=t,this.top=i,this.bottom=r,this.near=s,this.far=o,this.updateProjectionMatrix()}copy(e,t){return super.copy(e,t),this.left=e.left,this.right=e.right,this.top=e.top,this.bottom=e.bottom,this.near=e.near,this.far=e.far,this.zoom=e.zoom,this.view=e.view===null?null:Object.assign({},e.view),this}setViewOffset(e,t,i,r,s,o){this.view===null&&(this.view={enabled:!0,fullWidth:1,fullHeight:1,offsetX:0,offsetY:0,width:1,height:1}),this.view.enabled=!0,this.view.fullWidth=e,this.view.fullHeight=t,this.view.offsetX=i,this.view.offsetY=r,this.view.width=s,this.view.height=o,this.updateProjectionMatrix()}clearViewOffset(){this.view!==null&&(this.view.enabled=!1),this.updateProjectionMatrix()}updateProjectionMatrix(){let e=(this.right-this.left)/(2*this.zoom),t=(this.top-this.bottom)/(2*this.zoom),i=(this.right+this.left)/2,r=(this.top+this.bottom)/2,s=i-e,o=i+e,a=r+t,l=r-t;if(this.view!==null&&this.view.enabled){let c=(this.right-this.left)/this.view.fullWidth/this.zoom,h=(this.top-this.bottom)/this.view.fullHeight/this.zoom;s+=c*this.view.offsetX,o=s+c*this.view.width,a-=h*this.view.offsetY,l=a-h*this.view.height}this.projectionMatrix.makeOrthographic(s,o,a,l,this.near,this.far,this.coordinateSystem,this.reversedDepth),this.projectionMatrixInverse.copy(this.projectionMatrix).invert()}toJSON(e){let t=super.toJSON(e);return t.object.zoom=this.zoom,t.object.left=this.left,t.object.right=this.right,t.object.top=this.top,t.object.bottom=this.bottom,t.object.near=this.near,t.object.far=this.far,this.view!==null&&(t.object.view=Object.assign({},this.view)),t}};var ol=class extends Es{constructor(){super(new $n(-5,5,5,-5,.5,500)),this.isDirectionalLightShadow=!0}};var As=class extends Hi{constructor(e,t){super(e,t),this.isDirectionalLight=!0,this.type="DirectionalLight",this.position.copy(at.DEFAULT_UP),this.updateMatrix(),this.target=new at,this.shadow=new ol}dispose(){this.shadow.dispose()}copy(e){return super.copy(e),this.target=e.target.clone(),this.shadow=e.shadow.clone(),this}};var Xo=class extends Et{constructor(e=[]){super(),this.isArrayCamera=!0,this.isMultiViewCamera=!1,this.cameras=e}};var bc="\\[\\]\\.:\\/",__=new RegExp("["+bc+"]","g"),Mc="[^"+bc+"]",y_="[^"+bc.replace("\\.","")+"]",v_=/((?:WC+[\/:])*)/.source.replace("WC",Mc),b_=/(WCOD+)?/.source.replace("WCOD",y_),M_=/(?:\.(WC+)(?:\[(.+)\])?)?/.source.replace("WC",Mc),S_=/\.(WC+)(?:\[(.+)\])?/.source.replace("WC",Mc),w_=new RegExp("^"+v_+b_+M_+S_+"$"),T_=["material","materials","bones","map"],vc=class{constructor(e,t,i){let r=i||pt.parseTrackName(t);this._targetGroup=e,this._bindings=e.subscribe_(t,r)}getValue(e,t){this.bind();let i=this._targetGroup.nCachedObjects_,r=this._bindings[i];r!==void 0&&r.getValue(e,t)}setValue(e,t){let i=this._bindings;for(let r=this._targetGroup.nCachedObjects_,s=i.length;r!==s;++r)i[r].setValue(e,t)}bind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].bind()}unbind(){let e=this._bindings;for(let t=this._targetGroup.nCachedObjects_,i=e.length;t!==i;++t)e[t].unbind()}},pt=class n{constructor(e,t,i){this.path=t,this.parsedPath=i||n.parseTrackName(t),this.node=n.findNode(e,this.parsedPath.nodeName),this.rootNode=e,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}static create(e,t,i){return e&&e.isAnimationObjectGroup?new n.Composite(e,t,i):new n(e,t,i)}static sanitizeNodeName(e){return e.replace(/\s/g,"_").replace(__,"")}static parseTrackName(e){let t=w_.exec(e);if(t===null)throw new Error("PropertyBinding: Cannot parse trackName: "+e);let i={nodeName:t[2],objectName:t[3],objectIndex:t[4],propertyName:t[5],propertyIndex:t[6]},r=i.nodeName&&i.nodeName.lastIndexOf(".");if(r!==void 0&&r!==-1){let s=i.nodeName.substring(r+1);T_.indexOf(s)!==-1&&(i.nodeName=i.nodeName.substring(0,r),i.objectName=s)}if(i.propertyName===null||i.propertyName.length===0)throw new Error("PropertyBinding: can not parse propertyName from trackName: "+e);return i}static findNode(e,t){if(t===void 0||t===""||t==="."||t===-1||t===e.name||t===e.uuid)return e;if(e.skeleton){let i=e.skeleton.getBoneByName(t);if(i!==void 0)return i}if(e.children){let i=function(s){for(let o=0;o<s.length;o++){let a=s[o];if(a.name===t||a.uuid===t)return a;let l=i(a.children);if(l)return l}return null},r=i(e.children);if(r)return r}return null}_getValue_unavailable(){}_setValue_unavailable(){}_getValue_direct(e,t){e[t]=this.targetObject[this.propertyName]}_getValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)e[t++]=i[r]}_getValue_arrayElement(e,t){e[t]=this.resolvedProperty[this.propertyIndex]}_getValue_toArray(e,t){this.resolvedProperty.toArray(e,t)}_setValue_direct(e,t){this.targetObject[this.propertyName]=e[t]}_setValue_direct_setNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.needsUpdate=!0}_setValue_direct_setMatrixWorldNeedsUpdate(e,t){this.targetObject[this.propertyName]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_array(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++]}_setValue_array_setNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.needsUpdate=!0}_setValue_array_setMatrixWorldNeedsUpdate(e,t){let i=this.resolvedProperty;for(let r=0,s=i.length;r!==s;++r)i[r]=e[t++];this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_arrayElement(e,t){this.resolvedProperty[this.propertyIndex]=e[t]}_setValue_arrayElement_setNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.needsUpdate=!0}_setValue_arrayElement_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty[this.propertyIndex]=e[t],this.targetObject.matrixWorldNeedsUpdate=!0}_setValue_fromArray(e,t){this.resolvedProperty.fromArray(e,t)}_setValue_fromArray_setNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.needsUpdate=!0}_setValue_fromArray_setMatrixWorldNeedsUpdate(e,t){this.resolvedProperty.fromArray(e,t),this.targetObject.matrixWorldNeedsUpdate=!0}_getValue_unbound(e,t){this.bind(),this.getValue(e,t)}_setValue_unbound(e,t){this.bind(),this.setValue(e,t)}bind(){let e=this.node,t=this.parsedPath,i=t.objectName,r=t.propertyName,s=t.propertyIndex;if(e||(e=n.findNode(this.rootNode,t.nodeName),this.node=e),this.getValue=this._getValue_unavailable,this.setValue=this._setValue_unavailable,!e){console.warn("THREE.PropertyBinding: No target node found for track: "+this.path+".");return}if(i){let c=t.objectIndex;switch(i){case"materials":if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.materials){console.error("THREE.PropertyBinding: Can not bind to material.materials as node.material does not have a materials array.",this);return}e=e.material.materials;break;case"bones":if(!e.skeleton){console.error("THREE.PropertyBinding: Can not bind to bones as node does not have a skeleton.",this);return}e=e.skeleton.bones;for(let h=0;h<e.length;h++)if(e[h].name===c){c=h;break}break;case"map":if("map"in e){e=e.map;break}if(!e.material){console.error("THREE.PropertyBinding: Can not bind to material as node does not have a material.",this);return}if(!e.material.map){console.error("THREE.PropertyBinding: Can not bind to material.map as node.material does not have a map.",this);return}e=e.material.map;break;default:if(e[i]===void 0){console.error("THREE.PropertyBinding: Can not bind to objectName of node undefined.",this);return}e=e[i]}if(c!==void 0){if(e[c]===void 0){console.error("THREE.PropertyBinding: Trying to bind to objectIndex of objectName, but is undefined.",this,e);return}e=e[c]}}let o=e[r];if(o===void 0){let c=t.nodeName;console.error("THREE.PropertyBinding: Trying to update property for track: "+c+"."+r+" but it wasn't found.",e);return}let a=this.Versioning.None;this.targetObject=e,e.isMaterial===!0?a=this.Versioning.NeedsUpdate:e.isObject3D===!0&&(a=this.Versioning.MatrixWorldNeedsUpdate);let l=this.BindingType.Direct;if(s!==void 0){if(r==="morphTargetInfluences"){if(!e.geometry){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.",this);return}if(!e.geometry.morphAttributes){console.error("THREE.PropertyBinding: Can not bind to morphTargetInfluences because node does not have a geometry.morphAttributes.",this);return}e.morphTargetDictionary[s]!==void 0&&(s=e.morphTargetDictionary[s])}l=this.BindingType.ArrayElement,this.resolvedProperty=o,this.propertyIndex=s}else o.fromArray!==void 0&&o.toArray!==void 0?(l=this.BindingType.HasFromToArray,this.resolvedProperty=o):Array.isArray(o)?(l=this.BindingType.EntireArray,this.resolvedProperty=o):this.propertyName=r;this.getValue=this.GetterByBindingType[l],this.setValue=this.SetterByBindingTypeAndVersioning[l][a]}unbind(){this.node=null,this.getValue=this._getValue_unbound,this.setValue=this._setValue_unbound}};pt.Composite=vc;pt.prototype.BindingType={Direct:0,EntireArray:1,ArrayElement:2,HasFromToArray:3};pt.prototype.Versioning={None:0,NeedsUpdate:1,MatrixWorldNeedsUpdate:2};pt.prototype.GetterByBindingType=[pt.prototype._getValue_direct,pt.prototype._getValue_array,pt.prototype._getValue_arrayElement,pt.prototype._getValue_toArray];pt.prototype.SetterByBindingTypeAndVersioning=[[pt.prototype._setValue_direct,pt.prototype._setValue_direct_setNeedsUpdate,pt.prototype._setValue_direct_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_array,pt.prototype._setValue_array_setNeedsUpdate,pt.prototype._setValue_array_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_arrayElement,pt.prototype._setValue_arrayElement_setNeedsUpdate,pt.prototype._setValue_arrayElement_setMatrixWorldNeedsUpdate],[pt.prototype._setValue_fromArray,pt.prototype._setValue_fromArray_setNeedsUpdate,pt.prototype._setValue_fromArray_setMatrixWorldNeedsUpdate]];var fD=new Float32Array(1);var Qu=new Je,qo=class{constructor(e,t,i=0,r=1/0){this.ray=new Ei(e,t),this.near=i,this.far=r,this.camera=null,this.layers=new Sn,this.params={Mesh:{},Line:{threshold:1},LOD:{},Points:{threshold:1},Sprite:{}}}set(e,t){this.ray.set(e,t)}setFromCamera(e,t){t.isPerspectiveCamera?(this.ray.origin.setFromMatrixPosition(t.matrixWorld),this.ray.direction.set(e.x,e.y,.5).unproject(t).sub(this.ray.origin).normalize(),this.camera=t):t.isOrthographicCamera?(this.ray.origin.set(e.x,e.y,(t.near+t.far)/(t.near-t.far)).unproject(t),this.ray.direction.set(0,0,-1).transformDirection(t.matrixWorld),this.camera=t):console.error("THREE.Raycaster: Unsupported camera type: "+t.type)}setFromXRController(e){return Qu.identity().extractRotation(e.matrixWorld),this.ray.origin.setFromMatrixPosition(e.matrixWorld),this.ray.direction.set(0,0,-1).applyMatrix4(Qu),this}intersectObject(e,t=!0,i=[]){return Sc(e,this,i,t),i.sort(ef),i}intersectObjects(e,t=!0,i=[]){for(let r=0,s=e.length;r<s;r++)Sc(e[r],this,i,t);return i.sort(ef),i}};function ef(n,e){return n.distance-e.distance}function Sc(n,e,t,i){let r=!0;if(n.layers.test(e.layers)&&n.raycast(e,t)===!1&&(r=!1),r===!0&&i===!0){let s=n.children;for(let o=0,a=s.length;o<a;o++)Sc(s[o],e,t,!0)}}var Cs=class{constructor(e=1,t=0,i=0){this.radius=e,this.phi=t,this.theta=i}set(e,t,i){return this.radius=e,this.phi=t,this.theta=i,this}copy(e){return this.radius=e.radius,this.phi=e.phi,this.theta=e.theta,this}makeSafe(){return this.phi=qe(this.phi,1e-6,Math.PI-1e-6),this}setFromVector3(e){return this.setFromCartesianCoords(e.x,e.y,e.z)}setFromCartesianCoords(e,t,i){return this.radius=Math.sqrt(e*e+t*t+i*i),this.radius===0?(this.theta=0,this.phi=0):(this.theta=Math.atan2(e,i),this.phi=Math.acos(qe(t/this.radius,-1,1))),this}clone(){return new this.constructor().copy(this)}};var Yo=class extends Ht{constructor(e,t=null){super(),this.object=e,this.domElement=t,this.enabled=!0,this.state=-1,this.keys={},this.mouseButtons={LEFT:null,MIDDLE:null,RIGHT:null},this.touches={ONE:null,TWO:null}}connect(e){if(e===void 0){console.warn("THREE.Controls: connect() now requires an element.");return}this.domElement!==null&&this.disconnect(),this.domElement=e}disconnect(){}dispose(){}update(){}};function wc(n,e,t,i){let r=C_(i);switch(t){case ga:return n*e;case Ws:return n*e/r.components*r.byteLength;case cr:return n*e/r.components*r.byteLength;case _a:return n*e*2/r.components*r.byteLength;case Xr:return n*e*2/r.components*r.byteLength;case xa:return n*e*3/r.components*r.byteLength;case Dt:return n*e*4/r.components*r.byteLength;case qr:return n*e*4/r.components*r.byteLength;case Yr:case Zr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case Jr:case Kr:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case qs:case Zs:return Math.max(n,16)*Math.max(e,8)/4;case Xs:case Ys:return Math.max(n,8)*Math.max(e,8)/2;case Js:case Ks:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*8;case js:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case $s:return Math.floor((n+3)/4)*Math.floor((e+3)/4)*16;case Qs:return Math.floor((n+4)/5)*Math.floor((e+3)/4)*16;case eo:return Math.floor((n+4)/5)*Math.floor((e+4)/5)*16;case to:return Math.floor((n+5)/6)*Math.floor((e+4)/5)*16;case io:return Math.floor((n+5)/6)*Math.floor((e+5)/6)*16;case no:return Math.floor((n+7)/8)*Math.floor((e+4)/5)*16;case ro:return Math.floor((n+7)/8)*Math.floor((e+5)/6)*16;case so:return Math.floor((n+7)/8)*Math.floor((e+7)/8)*16;case oo:return Math.floor((n+9)/10)*Math.floor((e+4)/5)*16;case ao:return Math.floor((n+9)/10)*Math.floor((e+5)/6)*16;case lo:return Math.floor((n+9)/10)*Math.floor((e+7)/8)*16;case co:return Math.floor((n+9)/10)*Math.floor((e+9)/10)*16;case ho:return Math.floor((n+11)/12)*Math.floor((e+9)/10)*16;case uo:return Math.floor((n+11)/12)*Math.floor((e+11)/12)*16;case fo:case po:case mo:return Math.ceil(n/4)*Math.ceil(e/4)*16;case go:case xo:return Math.ceil(n/4)*Math.ceil(e/4)*8;case _o:case yo:return Math.ceil(n/4)*Math.ceil(e/4)*16}throw new Error(`Unable to determine texture byte length for ${t} format.`)}function C_(n){switch(n){case Zt:case fa:return{byteLength:1,components:1};case pn:case da:case rn:return{byteLength:2,components:1};case Gr:case Wr:return{byteLength:2,components:4};case gi:case Hr:case Jt:return{byteLength:4,components:1};case pa:case ma:return{byteLength:4,components:3}}throw new Error(`Unknown texture type ${n}.`)}typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register",{detail:{revision:"180"}}));typeof window<"u"&&(window.__THREE__?console.warn("WARNING: Multiple instances of Three.js being imported."):window.__THREE__="180");function al(){let n=null,e=!1,t=null,i=null;function r(s,o){t(s,o),i=n.requestAnimationFrame(r)}return{start:function(){e!==!0&&t!==null&&(i=n.requestAnimationFrame(r),e=!0)},stop:function(){n.cancelAnimationFrame(i),e=!1},setAnimationLoop:function(s){t=s},setContext:function(s){n=s}}}function tf(n){let e=new WeakMap;function t(a,l){let c=a.array,h=a.usage,u=c.byteLength,d=n.createBuffer();n.bindBuffer(l,d),n.bufferData(l,c,h),a.onUploadCallback();let f;if(c instanceof Float32Array)f=n.FLOAT;else if(typeof Float16Array<"u"&&c instanceof Float16Array)f=n.HALF_FLOAT;else if(c instanceof Uint16Array)a.isFloat16BufferAttribute?f=n.HALF_FLOAT:f=n.UNSIGNED_SHORT;else if(c instanceof Int16Array)f=n.SHORT;else if(c instanceof Uint32Array)f=n.UNSIGNED_INT;else if(c instanceof Int32Array)f=n.INT;else if(c instanceof Int8Array)f=n.BYTE;else if(c instanceof Uint8Array)f=n.UNSIGNED_BYTE;else if(c instanceof Uint8ClampedArray)f=n.UNSIGNED_BYTE;else throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: "+c);return{buffer:d,type:f,bytesPerElement:c.BYTES_PER_ELEMENT,version:a.version,size:u}}function i(a,l,c){let h=l.array,u=l.updateRanges;if(n.bindBuffer(c,a),u.length===0)n.bufferSubData(c,0,h);else{u.sort((f,g)=>f.start-g.start);let d=0;for(let f=1;f<u.length;f++){let g=u[d],x=u[f];x.start<=g.start+g.count+1?g.count=Math.max(g.count,x.start+x.count-g.start):(++d,u[d]=x)}u.length=d+1;for(let f=0,g=u.length;f<g;f++){let x=u[f];n.bufferSubData(c,x.start*h.BYTES_PER_ELEMENT,h,x.start,x.count)}l.clearUpdateRanges()}l.onUploadCallback()}function r(a){return a.isInterleavedBufferAttribute&&(a=a.data),e.get(a)}function s(a){a.isInterleavedBufferAttribute&&(a=a.data);let l=e.get(a);l&&(n.deleteBuffer(l.buffer),e.delete(a))}function o(a,l){if(a.isInterleavedBufferAttribute&&(a=a.data),a.isGLBufferAttribute){let h=e.get(a);(!h||h.version<a.version)&&e.set(a,{buffer:a.buffer,type:a.type,bytesPerElement:a.elementSize,version:a.version});return}let c=e.get(a);if(c===void 0)e.set(a,t(a,l));else if(c.version<a.version){if(c.size!==a.array.byteLength)throw new Error("THREE.WebGLAttributes: The size of the buffer attribute's array buffer does not match the original size. Resizing buffer attributes is not supported.");i(c.buffer,a,l),c.version=a.version}}return{get:r,remove:s,update:o}}var nf=`
#ifdef USE_ALPHAHASH

	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;

#endif
`;var rf=`
#ifdef USE_ALPHAHASH

	/**
	 * See: https://casual-effects.com/research/Wyman2017Hashed/index.html
	 */

	const float ALPHA_HASH_SCALE = 0.05; // Derived from trials only, and may be changed.

	float hash2D( vec2 value ) {

		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );

	}

	float hash3D( vec3 value ) {

		return hash2D( vec2( hash2D( value.xy ), value.z ) );

	}

	float getAlphaHashThreshold( vec3 position ) {

		// Find the discretized derivatives of our coordinates
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );

		// Find two nearest log-discretized noise scales
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);

		// Compute alpha thresholds at our two noise scales
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);

		// Factor to interpolate lerp with
		float lerpFactor = fract( log2( pixScale ) );

		// Interpolate alpha threshold from noise at two scales
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;

		// Pass into CDF to compute uniformly distrib threshold
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);

		// Find our final, uniformly distributed alpha threshold (\u03B1\u03C4)
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;

		// Avoids \u03B1\u03C4 == 0. Could also do \u03B1\u03C4 =1-\u03B1\u03C4
		return clamp( threshold , 1.0e-6, 1.0 );

	}

#endif
`;var sf=`
#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;

#endif
`;var of=`
#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var af=`
#ifdef USE_ALPHATEST

	#ifdef ALPHA_TO_COVERAGE

	diffuseColor.a = smoothstep( alphaTest, alphaTest + fwidth( diffuseColor.a ), diffuseColor.a );
	if ( diffuseColor.a == 0.0 ) discard;

	#else

	if ( diffuseColor.a < alphaTest ) discard;

	#endif

#endif
`;var lf=`
#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif
`;var cf=`
#ifdef USE_AOMAP

	// reads channel R, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;

	reflectedLight.indirectDiffuse *= ambientOcclusion;

	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD )

		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );

		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );

	#endif

#endif
`;var hf=`
#ifdef USE_AOMAP

	uniform sampler2D aoMap;
	uniform float aoMapIntensity;

#endif
`;var uf=`
#ifdef USE_BATCHING
	#if ! defined( GL_ANGLE_multi_draw )
	#define gl_DrawID _gl_DrawID
	uniform int _gl_DrawID;
	#endif

	uniform highp sampler2D batchingTexture;
	uniform highp usampler2D batchingIdTexture;
	mat4 getBatchingMatrix( const in float i ) {

		int size = textureSize( batchingTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( batchingTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( batchingTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( batchingTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( batchingTexture, ivec2( x + 3, y ), 0 );
		return mat4( v1, v2, v3, v4 );

	}

	float getIndirectIndex( const in int i ) {

		int size = textureSize( batchingIdTexture, 0 ).x;
		int x = i % size;
		int y = i / size;
		return float( texelFetch( batchingIdTexture, ivec2( x, y ), 0 ).r );

	}

#endif

#ifdef USE_BATCHING_COLOR

	uniform sampler2D batchingColorTexture;
	vec3 getBatchingColor( const in float i ) {

		int size = textureSize( batchingColorTexture, 0 ).x;
		int j = int( i );
		int x = j % size;
		int y = j / size;
		return texelFetch( batchingColorTexture, ivec2( x, y ), 0 ).rgb;

	}

#endif
`;var ff=`
#ifdef USE_BATCHING
	mat4 batchingMatrix = getBatchingMatrix( getIndirectIndex( gl_DrawID ) );
#endif
`;var df=`
vec3 transformed = vec3( position );

#ifdef USE_ALPHAHASH

	vPosition = vec3( position );

#endif
`;var pf=`
vec3 objectNormal = vec3( normal );

#ifdef USE_TANGENT

	vec3 objectTangent = vec3( tangent.xyz );

#endif
`;var mf=`

float G_BlinnPhong_Implicit( /* const in float dotNL, const in float dotNV */ ) {

	// geometry term is (n dot l)(n dot v) / 4(n dot l)(n dot v)
	return 0.25;

}

float D_BlinnPhong( const in float shininess, const in float dotNH ) {

	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );

}

vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( specularColor, 1.0, dotVH );

	float G = G_BlinnPhong_Implicit( /* dotNL, dotNV */ );

	float D = D_BlinnPhong( shininess, dotNH );

	return F * ( G * D );

} // validated

`;var gf=`

#ifdef USE_IRIDESCENCE

	// XYZ to linear-sRGB color space
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);

	// Assume air interface for top
	// Note: We don't handle the case fresnel0 == 1
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {

		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );

	}

	// Conversion FO/IOR
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );

	}

	// ior is a value between 1.0 and 3.0. 1.0 is air interface
	float IorToFresnel0( float transmittedIor, float incidentIor ) {

		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));

	}

	// Fresnel equations for dielectric/dielectric interfaces.
	// Ref: https://belcour.github.io/blog/research/2017/05/01/brdf-thin-film.html
	// Evaluation XYZ sensitivity curves in Fourier space
	vec3 evalSensitivity( float OPD, vec3 shift ) {

		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );

		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;

		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;

	}

	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {

		vec3 I;

		// Force iridescenceIOR -> outsideIOR when thinFilmThickness -> 0.0
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		// Evaluate the cosTheta on the base layer (Snell law)
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );

		// Handle TIR:
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {

			return vec3( 1.0 );

		}

		float cosTheta2 = sqrt( cosTheta2Sq );

		// First interface
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;

		// Second interface
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) ); // guard against 1.0
		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;

		// Phase shift
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;

		// Compound terms
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );

		// Reflectance term for m = 0 (DC term amplitude)
		vec3 C0 = R12 + Rs;
		I = C0;

		// Reflectance term for m > 0 (pairs of diracs)
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {

			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;

		}

		// Since out of gamut colors might be produced, negative color values are clamped to 0.
		return max( I, vec3( 0.0 ) );

	}

#endif

`;var xf=`
#ifdef USE_BUMPMAP

	uniform sampler2D bumpMap;
	uniform float bumpScale;

	// Bump Mapping Unparametrized Surfaces on the GPU by Morten S. Mikkelsen
	// https://mmikk.github.io/papers3d/mm_sfgrad_bump.pdf

	// Evaluate the derivative of the height w.r.t. screen-space using forward differencing (listing 2)

	vec2 dHdxy_fwd() {

		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );

		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;

		return vec2( dBx, dBy );

	}

	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {

		// normalize is done to ensure that the bump map looks the same regardless of the texture's scale
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm; // normalized

		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );

		float fDet = dot( vSigmaX, R1 ) * faceDirection;

		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );

	}

#endif
`;var _f=`
#if NUM_CLIPPING_PLANES > 0

	vec4 plane;

	#ifdef ALPHA_TO_COVERAGE

		float distanceToPlane, distanceGradient;
		float clipOpacity = 1.0;

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
			distanceGradient = fwidth( distanceToPlane ) / 2.0;
			clipOpacity *= smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			if ( clipOpacity == 0.0 ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			float unionClipOpacity = 1.0;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				distanceToPlane = - dot( vClipPosition, plane.xyz ) + plane.w;
				distanceGradient = fwidth( distanceToPlane ) / 2.0;
				unionClipOpacity *= 1.0 - smoothstep( - distanceGradient, distanceGradient, distanceToPlane );

			}
			#pragma unroll_loop_end

			clipOpacity *= 1.0 - unionClipOpacity;

		#endif

		diffuseColor.a *= clipOpacity;

		if ( diffuseColor.a == 0.0 ) discard;

	#else

		#pragma unroll_loop_start
		for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {

			plane = clippingPlanes[ i ];
			if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;

		}
		#pragma unroll_loop_end

		#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES

			bool clipped = true;

			#pragma unroll_loop_start
			for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {

				plane = clippingPlanes[ i ];
				clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;

			}
			#pragma unroll_loop_end

			if ( clipped ) discard;

		#endif

	#endif

#endif
`;var yf=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];

#endif
`;var vf=`
#if NUM_CLIPPING_PLANES > 0

	varying vec3 vClipPosition;

#endif
`;var bf=`
#if NUM_CLIPPING_PLANES > 0

	vClipPosition = - mvPosition.xyz;

#endif
`;var Mf=`
#if defined( USE_COLOR_ALPHA )

	diffuseColor *= vColor;

#elif defined( USE_COLOR )

	diffuseColor.rgb *= vColor;

#endif
`;var Sf=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR )

	varying vec3 vColor;

#endif
`;var wf=`
#if defined( USE_COLOR_ALPHA )

	varying vec4 vColor;

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	varying vec3 vColor;

#endif
`;var Tf=`
#if defined( USE_COLOR_ALPHA )

	vColor = vec4( 1.0 );

#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR ) || defined( USE_BATCHING_COLOR )

	vColor = vec3( 1.0 );

#endif

#ifdef USE_COLOR

	vColor *= color;

#endif

#ifdef USE_INSTANCING_COLOR

	vColor.xyz *= instanceColor.xyz;

#endif

#ifdef USE_BATCHING_COLOR

	vec3 batchingColor = getBatchingColor( getIndirectIndex( gl_DrawID ) );

	vColor.xyz *= batchingColor.xyz;

#endif
`;var Ef=`
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6

#ifndef saturate
// <tonemapping_pars_fragment> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )

float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }

// expects values in the range of [0,1]x[0,1], returns values in the [0,1] range.
// do not collapse into a single function per: http://byteblacksmith.com/improvements-to-the-canonical-one-liner-glsl-rand-for-opengl-es-2-0/
highp float rand( const in vec2 uv ) {

	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );

	return fract( sin( sn ) * c );

}

#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif

struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};

struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};

#ifdef USE_ALPHAHASH

	varying vec3 vPosition;

#endif

vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

}

vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {

	// dir can be either a direction vector or a normal vector
	// upper-left 3x3 of matrix is assumed to be orthogonal

	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );

}

mat3 transposeMat3( const in mat3 m ) {

	mat3 tmp;

	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );

	return tmp;

}

bool isPerspectiveMatrix( mat4 m ) {

	return m[ 2 ][ 3 ] == - 1.0;

}

vec2 equirectUv( in vec3 dir ) {

	// dir is assumed to be unit length

	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;

	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;

	return vec2( u, v );

}

vec3 BRDF_Lambert( const in vec3 diffuseColor ) {

	return RECIPROCAL_PI * diffuseColor;

} // validated

vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated

float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {

	// Original approximation by Christophe Schlick '94
	// float fresnel = pow( 1.0 - dotVH, 5.0 );

	// Optimized variant (presented by Epic at SIGGRAPH '13)
	// https://cdn2.unrealengine.com/Resources/files/2013SiggraphPresentationsNotes-26915738.pdf
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );

	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );

} // validated
`;var Af=`
#ifdef ENVMAP_TYPE_CUBE_UV

	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0

	// These shader functions convert between the UV coordinates of a single face of
	// a cubemap, the 0-5 integer index of a cube face, and the direction vector for
	// sampling a textureCube (not generally normalized ).

	float getFace( vec3 direction ) {

		vec3 absDirection = abs( direction );

		float face = - 1.0;

		if ( absDirection.x > absDirection.z ) {

			if ( absDirection.x > absDirection.y )

				face = direction.x > 0.0 ? 0.0 : 3.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		} else {

			if ( absDirection.z > absDirection.y )

				face = direction.z > 0.0 ? 2.0 : 5.0;

			else

				face = direction.y > 0.0 ? 1.0 : 4.0;

		}

		return face;

	}

	// RH coordinate system; PMREM face-indexing convention
	vec2 getUV( vec3 direction, float face ) {

		vec2 uv;

		if ( face == 0.0 ) {

			uv = vec2( direction.z, direction.y ) / abs( direction.x ); // pos x

		} else if ( face == 1.0 ) {

			uv = vec2( - direction.x, - direction.z ) / abs( direction.y ); // pos y

		} else if ( face == 2.0 ) {

			uv = vec2( - direction.x, direction.y ) / abs( direction.z ); // pos z

		} else if ( face == 3.0 ) {

			uv = vec2( - direction.z, direction.y ) / abs( direction.x ); // neg x

		} else if ( face == 4.0 ) {

			uv = vec2( - direction.x, direction.z ) / abs( direction.y ); // neg y

		} else {

			uv = vec2( direction.x, direction.y ) / abs( direction.z ); // neg z

		}

		return 0.5 * ( uv + 1.0 );

	}

	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {

		float face = getFace( direction );

		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );

		mipInt = max( mipInt, cubeUV_minMipLevel );

		float faceSize = exp2( mipInt );

		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0; // #25071

		if ( face > 2.0 ) {

			uv.y += faceSize;

			face -= 3.0;

		}

		uv.x += face * faceSize;

		uv.x += filterInt * 3.0 * cubeUV_minTileSize;

		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );

		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;

		#ifdef texture2DGradEXT

			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb; // disable anisotropic filtering

		#else

			return texture2D( envMap, uv ).rgb;

		#endif

	}

	// These defines must match with PMREMGenerator

	#define cubeUV_r0 1.0
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_m6 4.0

	float roughnessToMip( float roughness ) {

		float mip = 0.0;

		if ( roughness >= cubeUV_r1 ) {

			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;

		} else if ( roughness >= cubeUV_r4 ) {

			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;

		} else if ( roughness >= cubeUV_r5 ) {

			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;

		} else if ( roughness >= cubeUV_r6 ) {

			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;

		} else {

			mip = - 2.0 * log2( 1.16 * roughness ); // 1.16 = 1.79^0.25
		}

		return mip;

	}

	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {

		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );

		float mipF = fract( mip );

		float mipInt = floor( mip );

		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );

		if ( mipF == 0.0 ) {

			return vec4( color0, 1.0 );

		} else {

			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );

			return vec4( mix( color0, color1, mipF ), 1.0 );

		}

	}

#endif
`;var Cf=`

vec3 transformedNormal = objectNormal;
#ifdef USE_TANGENT

	vec3 transformedTangent = objectTangent;

#endif

#ifdef USE_BATCHING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 bm = mat3( batchingMatrix );
	transformedNormal /= vec3( dot( bm[ 0 ], bm[ 0 ] ), dot( bm[ 1 ], bm[ 1 ] ), dot( bm[ 2 ], bm[ 2 ] ) );
	transformedNormal = bm * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = bm * transformedTangent;

	#endif

#endif

#ifdef USE_INSTANCING

	// this is in lieu of a per-instance normal-matrix
	// shear transforms in the instance matrix are not supported

	mat3 im = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( im[ 0 ], im[ 0 ] ), dot( im[ 1 ], im[ 1 ] ), dot( im[ 2 ], im[ 2 ] ) );
	transformedNormal = im * transformedNormal;

	#ifdef USE_TANGENT

		transformedTangent = im * transformedTangent;

	#endif

#endif

transformedNormal = normalMatrix * transformedNormal;

#ifdef FLIP_SIDED

	transformedNormal = - transformedNormal;

#endif

#ifdef USE_TANGENT

	transformedTangent = ( modelViewMatrix * vec4( transformedTangent, 0.0 ) ).xyz;

	#ifdef FLIP_SIDED

		transformedTangent = - transformedTangent;

	#endif

#endif
`;var If=`
#ifdef USE_DISPLACEMENTMAP

	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;

#endif
`;var Pf=`
#ifdef USE_DISPLACEMENTMAP

	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );

#endif
`;var Rf=`
#ifdef USE_EMISSIVEMAP

	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );

	#ifdef DECODE_VIDEO_TEXTURE_EMISSIVE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		emissiveColor = sRGBTransferEOTF( emissiveColor );

	#endif

	totalEmissiveRadiance *= emissiveColor.rgb;

#endif
`;var Lf=`
#ifdef USE_EMISSIVEMAP

	uniform sampler2D emissiveMap;

#endif
`;var Df=`
gl_FragColor = linearToOutputTexel( gl_FragColor );
`;var Nf=`

vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}

vec4 sRGBTransferEOTF( in vec4 value ) {
	return vec4( mix( pow( value.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), value.rgb * 0.0773993808, vec3( lessThanEqual( value.rgb, vec3( 0.04045 ) ) ) ), value.a );
}

vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}

`;var Uf=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vec3 cameraToFrag;

		if ( isOrthographic ) {

			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToFrag = normalize( vWorldPosition - cameraPosition );

		}

		// Transforming Normal Vectors with the Inverse Transformation
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vec3 reflectVec = reflect( cameraToFrag, worldNormal );

		#else

			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );

		#endif

	#else

		vec3 reflectVec = vReflect;

	#endif

	#ifdef ENVMAP_TYPE_CUBE

		vec4 envColor = textureCube( envMap, envMapRotation * vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );

	#else

		vec4 envColor = vec4( 0.0 );

	#endif

	#ifdef ENVMAP_BLENDING_MULTIPLY

		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_MIX )

		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );

	#elif defined( ENVMAP_BLENDING_ADD )

		outgoingLight += envColor.xyz * specularStrength * reflectivity;

	#endif

#endif
`;var Ff=`
#ifdef USE_ENVMAP

	uniform float envMapIntensity;
	uniform float flipEnvMap;
	uniform mat3 envMapRotation;

	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif
`;var Of=`
#ifdef USE_ENVMAP

	uniform float reflectivity;

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS

		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif

#endif
`;var Bf=`
#ifdef USE_ENVMAP

	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )

		#define ENV_WORLDPOS

	#endif

	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;

	#else

		varying vec3 vReflect;
		uniform float refractionRatio;

	#endif

#endif
`;var kf=`
#ifdef USE_ENVMAP

	#ifdef ENV_WORLDPOS

		vWorldPosition = worldPosition.xyz;

	#else

		vec3 cameraToVertex;

		if ( isOrthographic ) {

			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );

		} else {

			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );

		}

		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );

		#ifdef ENVMAP_MODE_REFLECTION

			vReflect = reflect( cameraToVertex, worldNormal );

		#else

			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );

		#endif

	#endif

#endif
`;var zf=`
#ifdef USE_FOG

	vFogDepth = - mvPosition.z;

#endif
`;var Vf=`
#ifdef USE_FOG

	varying float vFogDepth;

#endif
`;var Hf=`
#ifdef USE_FOG

	#ifdef FOG_EXP2

		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );

	#else

		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );

	#endif

	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );

#endif
`;var Gf=`
#ifdef USE_FOG

	uniform vec3 fogColor;
	varying float vFogDepth;

	#ifdef FOG_EXP2

		uniform float fogDensity;

	#else

		uniform float fogNear;
		uniform float fogFar;

	#endif

#endif
`;var Wf=`

#ifdef USE_GRADIENTMAP

	uniform sampler2D gradientMap;

#endif

vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {

	// dotNL will be from -1.0 to 1.0
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );

	#ifdef USE_GRADIENTMAP

		return vec3( texture2D( gradientMap, coord ).r );

	#else

		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );

	#endif

}
`;var Xf=`
#ifdef USE_LIGHTMAP

	uniform sampler2D lightMap;
	uniform float lightMapIntensity;

#endif
`;var qf=`
LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;
`;var Yf=`
varying vec3 vViewPosition;

struct LambertMaterial {

	vec3 diffuseColor;
	float specularStrength;

};

void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert
`;var Zf=`
uniform bool receiveShadow;
uniform vec3 ambientLightColor;

#if defined( USE_LIGHT_PROBES )

	uniform vec3 lightProbe[ 9 ];

#endif

// get the irradiance (radiance convolved with cosine lobe) at the point 'normal' on the unit sphere
// source: https://graphics.stanford.edu/papers/envmap/envmap.pdf
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {

	// normal is assumed to have unit length

	float x = normal.x, y = normal.y, z = normal.z;

	// band 0
	vec3 result = shCoefficients[ 0 ] * 0.886227;

	// band 1
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;

	// band 2
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );

	return result;

}

vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {

	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );

	return irradiance;

}

vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {

	vec3 irradiance = ambientLightColor;

	return irradiance;

}

float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {

	// based upon Frostbite 3 Moving to Physically-based Rendering
	// page 32, equation 26: E[window1]
	// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
	float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );

	if ( cutoffDistance > 0.0 ) {

		distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );

	}

	return distanceFalloff;

}

float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {

	return smoothstep( coneCosine, penumbraCosine, angleCosine );

}

#if NUM_DIR_LIGHTS > 0

	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};

	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];

	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {

		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;

	}

#endif


#if NUM_POINT_LIGHTS > 0

	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};

	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = pointLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float lightDistance = length( lVector );

		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );

	}

#endif


#if NUM_SPOT_LIGHTS > 0

	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};

	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];

	// light is an out parameter as having it as a return value caused compiler errors on some devices
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {

		vec3 lVector = spotLight.position - geometryPosition;

		light.direction = normalize( lVector );

		float angleCos = dot( light.direction, spotLight.direction );

		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );

		if ( spotAttenuation > 0.0 ) {

			float lightDistance = length( lVector );

			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );

		} else {

			light.color = vec3( 0.0 );
			light.visible = false;

		}

	}

#endif


#if NUM_RECT_AREA_LIGHTS > 0

	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};

	// Pre-computed values of LinearTransformedCosine approximation of BRDF
	// BRDF approximation Texture is 64x64
	uniform sampler2D ltc_1; // RGBA Float
	uniform sampler2D ltc_2; // RGBA Float

	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];

#endif


#if NUM_HEMI_LIGHTS > 0

	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};

	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];

	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {

		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;

		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );

		return irradiance;

	}

#endif
`;var Jf=`
#ifdef USE_ENVMAP

	vec3 getIBLIrradiance( const in vec3 normal ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * worldNormal, 1.0 );

			return PI * envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {

		#ifdef ENVMAP_TYPE_CUBE_UV

			vec3 reflectVec = reflect( - viewDir, normal );

			// Mixing the reflection with the normal is more accurate and keeps rough objects from gathering light from behind their tangent plane.
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );

			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );

			vec4 envMapColor = textureCubeUV( envMap, envMapRotation * reflectVec, roughness );

			return envMapColor.rgb * envMapIntensity;

		#else

			return vec3( 0.0 );

		#endif

	}

	#ifdef USE_ANISOTROPY

		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {

			#ifdef ENVMAP_TYPE_CUBE_UV

			  // https://google.github.io/filament/Filament.md.html#lighting/imagebasedlights/anisotropy
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );

				return getIBLRadiance( viewDir, bentNormal, roughness );

			#else

				return vec3( 0.0 );

			#endif

		}

	#endif

#endif
`;var Kf=`
ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;
`;var jf=`
varying vec3 vViewPosition;

struct ToonMaterial {

	vec3 diffuseColor;

};

void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon
`;var $f=`
BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;
`;var Qf=`
varying vec3 vViewPosition;

struct BlinnPhongMaterial {

	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;

};

void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;

}

void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong
`;var ed=`
PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );

vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );

material.roughness = max( roughnessFactor, 0.0525 );// 0.0525 corresponds to the base mip of a 256 cubemap.
material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );

#ifdef IOR

	material.ior = ior;

	#ifdef USE_SPECULAR

		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;

		#ifdef USE_SPECULAR_COLORMAP

			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;

		#endif

		#ifdef USE_SPECULAR_INTENSITYMAP

			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;

		#endif

		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );

	#else

		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;

	#endif

	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );

#else

	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;

#endif

#ifdef USE_CLEARCOAT

	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;

	#ifdef USE_CLEARCOATMAP

		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;

	#endif

	#ifdef USE_CLEARCOAT_ROUGHNESSMAP

		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;

	#endif

	material.clearcoat = saturate( material.clearcoat ); // Burley clearcoat model
	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );

#endif

#ifdef USE_DISPERSION

	material.dispersion = dispersion;

#endif

#ifdef USE_IRIDESCENCE

	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;

	#ifdef USE_IRIDESCENCEMAP

		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;

	#endif

	#ifdef USE_IRIDESCENCE_THICKNESSMAP

		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;

	#else

		material.iridescenceThickness = iridescenceThicknessMaximum;

	#endif

#endif

#ifdef USE_SHEEN

	material.sheenColor = sheenColor;

	#ifdef USE_SHEEN_COLORMAP

		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;

	#endif

	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );

	#ifdef USE_SHEEN_ROUGHNESSMAP

		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;

	#endif

#endif

#ifdef USE_ANISOTROPY

	#ifdef USE_ANISOTROPYMAP

		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;

	#else

		vec2 anisotropyV = anisotropyVector;

	#endif

	material.anisotropy = length( anisotropyV );

	if( material.anisotropy == 0.0 ) {
		anisotropyV = vec2( 1.0, 0.0 );
	} else {
		anisotropyV /= material.anisotropy;
		material.anisotropy = saturate( material.anisotropy );
	}

	// Roughness along the anisotropy bitangent is the material roughness, while the tangent roughness increases with anisotropy.
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );

	material.anisotropyT = tbn[ 0 ] * anisotropyV.x + tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x - tbn[ 0 ] * anisotropyV.y;

#endif
`;var td=`

struct PhysicalMaterial {

	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	float dispersion;

	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif

	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif

	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif

	#ifdef IOR
		float ior;
	#endif

	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif

	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif

};

// temporary
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );

vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );

    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}

// Moving Frostbite to Physically Based Rendering 3.0 - page 12, listing 2
// https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {

	float a2 = pow2( alpha );

	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );

	return 0.5 / max( gv + gl, EPSILON );

}

// Microfacet Models for Refraction through Rough Surfaces - equation (33)
// http://graphicrants.blogspot.com/2013/08/specular-brdf-reference.html
// alpha is "roughness squared" in Disney\u2019s reparameterization
float D_GGX( const in float alpha, const in float dotNH ) {

	float a2 = pow2( alpha );

	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0; // avoid alpha = 0 with dotNH = 1

	return RECIPROCAL_PI * a2 / pow2( denom );

}

// https://google.github.io/filament/Filament.md.html#materialsystem/anisotropicmodel/anisotropicspecularbrdf
#ifdef USE_ANISOTROPY

	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {

		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );

		return saturate(v);

	}

	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {

		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;

		return RECIPROCAL_PI * a2 * pow2 ( w2 );

	}

#endif

#ifdef USE_CLEARCOAT

	// GGX Distribution, Schlick Fresnel, GGX_SmithCorrelated Visibility
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {

		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;

		float alpha = pow2( roughness ); // UE4's roughness

		vec3 halfDir = normalize( lightDir + viewDir );

		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );

		vec3 F = F_Schlick( f0, f90, dotVH );

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

		return F * ( V * D );

	}

#endif

vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {

	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;

	float alpha = pow2( roughness ); // UE4's roughness

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );

	vec3 F = F_Schlick( f0, f90, dotVH );

	#ifdef USE_IRIDESCENCE

		F = mix( F, material.iridescenceFresnel, material.iridescence );

	#endif

	#ifdef USE_ANISOTROPY

		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );

		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );

		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );

	#else

		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );

		float D = D_GGX( alpha, dotNH );

	#endif

	return F * ( V * D );

}

// Rect Area Light

// Real-Time Polygonal-Light Shading with Linearly Transformed Cosines
// by Eric Heitz, Jonathan Dupuy, Stephen Hill and David Neubelt
// code: https://github.com/selfshadow/ltc_code/

vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	float dotNV = saturate( dot( N, V ) );

	// texture parameterized by sqrt( GGX alpha ) and sqrt( 1 - cos( theta ) )
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );

	uv = uv * LUT_SCALE + LUT_BIAS;

	return uv;

}

float LTC_ClippedSphereFormFactor( const in vec3 f ) {

	// Real-Time Area Lighting: a Journey from Research to Production (p.102)
	// An approximation of the form factor of a horizon-clipped rectangle.

	float l = length( f );

	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );

}

vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {

	float x = dot( v1, v2 );

	float y = abs( x );

	// rational polynomial approximation to theta / sin( theta ) / 2PI
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;

	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;

	return cross( v1, v2 ) * theta_sintheta;

}

vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {

	// bail if point is on back side of plane of light
	// assumes ccw winding order of light vertices
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );

	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );

	// construct orthonormal basis around N
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 ); // negated from paper; possibly due to a different handedness of world coordinate system

	// compute transform
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );

	// transform rect
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );

	// project rect onto sphere
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );

	// calculate vector form factor
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );

	// adjust for horizon clipping
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );

/*
	// alternate method of adjusting for horizon clipping (see reference)
	// refactoring required
	float len = length( vectorFormFactor );
	float z = vectorFormFactor.z / len;

	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;

	// tabulated horizon-clipped sphere, apparently...
	vec2 uv = vec2( z * 0.5 + 0.5, len );
	uv = uv * LUT_SCALE + LUT_BIAS;

	float scale = texture2D( ltc_2, uv ).w;

	float result = len * scale;
*/

	return vec3( result );

}

// End Rect Area Light

#if defined( USE_SHEEN )

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float D_Charlie( float roughness, float dotNH ) {

	float alpha = pow2( roughness );

	// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF"
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 ); // 2^(-14/2), so sin2h^2 > 0 in fp16

	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );

}

// https://github.com/google/filament/blob/master/shaders/src/brdf.fs
float V_Neubelt( float dotNV, float dotNL ) {

	// Neubelt and Pettineo 2013, "Crafting a Next-gen Material Pipeline for The Order: 1886"
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );

}

vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {

	vec3 halfDir = normalize( lightDir + viewDir );

	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );

	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );

	return sheenColor * ( D * V );

}

#endif

// This is a curve-fit approximation to the "Charlie sheen" BRDF integrated over the hemisphere from
// Estevez and Kulla 2017, "Production Friendly Microfacet Sheen BRDF". The analysis can be found
// in the Sheen section of https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	float r2 = roughness * roughness;

	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;

	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;

	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );

	return saturate( DG * RECIPROCAL_PI );

}

// Analytical approximation of the DFG LUT, one half of the
// split-sum approximation used in indirect specular lighting.
// via 'environmentBRDF' from "Physically Based Shading on Mobile"
// https://www.unrealengine.com/blog/physically-based-shading-on-mobile
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {

	float dotNV = saturate( dot( normal, viewDir ) );

	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );

	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );

	vec4 r = roughness * c0 + c1;

	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;

	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;

	return fab;

}

vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	return specularColor * fab.x + specularF90 * fab.y;

}

// Fdez-Ag\xFCera's "Multiple-Scattering Microfacet Model for Real-Time Image Based Lighting"
// Approximates multiscattering in order to preserve energy.
// http://www.jcgt.org/published/0008/01/03/
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif

	vec2 fab = DFGApprox( normal, viewDir, roughness );

	#ifdef USE_IRIDESCENCE

		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );

	#else

		vec3 Fr = specularColor;

	#endif

	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;

	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;

	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619; // 1/21
	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );

	singleScatter += FssEss;
	multiScatter += Fms * Ems;

}

#if NUM_RECT_AREA_LIGHTS > 0

	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;

		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight; // counterclockwise; light shines in local neg z direction
		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;

		vec2 uv = LTC_Uv( normal, viewDir, roughness );

		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );

		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);

		// LTC Fresnel Approximation by Stephen Hill
		// http://blog.selfshadow.com/publications/s2016-advances/s2016_ltc_fresnel.pdf
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );

		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );

		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );

	}

#endif

void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );

	vec3 irradiance = dotNL * directLight.color;

	#ifdef USE_CLEARCOAT

		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );

		vec3 ccIrradiance = dotNLcc * directLight.color;

		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );

	#endif

	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );

	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}

void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {

	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );

}

void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {

	#ifdef USE_CLEARCOAT

		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );

	#endif

	#ifdef USE_SHEEN

		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );

	#endif

	// Both indirect specular and indirect diffuse light accumulate here

	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;

	#ifdef USE_IRIDESCENCE

		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );

	#else

		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );

	#endif

	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );

	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;

	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;

}

#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical

// ref: https://seblagarde.files.wordpress.com/2015/07/course_notes_moving_frostbite_to_pbr_v32.pdf
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {

	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );

}
`;var id=`
/**
 * This is a template that can be used to light a material, it uses pluggable
 * RenderEquations (RE)for specific lighting scenarios.
 *
 * Instructions for use:
 * - Ensure that both RE_Direct, RE_IndirectDiffuse and RE_IndirectSpecular are defined
 * - Create a material parameter that is to be passed as the third parameter to your lighting functions.
 *
 * TODO:
 * - Add area light support.
 * - Add sphere light support.
 * - Add diffuse light probe (irradiance cubemap) support.
 */

vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE

	float dotNVi = saturate( dot( normal, geometryViewDir ) );

	if ( material.iridescenceThickness == 0.0 ) {

		material.iridescence = 0.0;

	} else {

		material.iridescence = saturate( material.iridescence );

	}

	if ( material.iridescence > 0.0 ) {

		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );

		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );

	}

#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif

		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif

		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`;var nd=`
#if defined( RE_IndirectDiffuse )

	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;

		irradiance += lightMapIrradiance;

	#endif

	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )

		iblIrradiance += getIBLIrradiance( geometryNormal );

	#endif

#endif

#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )

	#ifdef USE_ANISOTROPY

		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );

	#else

		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );

	#endif

	#ifdef USE_CLEARCOAT

		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );

	#endif

#endif
`;var rd=`
#if defined( RE_IndirectDiffuse )

	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif

#if defined( RE_IndirectSpecular )

	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

#endif
`;var sd=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	// Doing a strict comparison with == 1.0 can cause noise artifacts
	// on some platforms. See issue #17623.
	gl_FragDepth = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;

#endif
`;var od=`
#if defined( USE_LOGARITHMIC_DEPTH_BUFFER )

	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var ad=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	varying float vFragDepth;
	varying float vIsPerspective;

#endif
`;var ld=`
#ifdef USE_LOGARITHMIC_DEPTH_BUFFER

	vFragDepth = 1.0 + gl_Position.w;
	vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );

#endif
`;var cd=`
#ifdef USE_MAP

	vec4 sampledDiffuseColor = texture2D( map, vMapUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures (#26516)

		sampledDiffuseColor = sRGBTransferEOTF( sampledDiffuseColor );

	#endif

	diffuseColor *= sampledDiffuseColor;

#endif
`;var hd=`
#ifdef USE_MAP

	uniform sampler2D map;

#endif
`;var ud=`
#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

	#if defined( USE_POINTS_UV )

		vec2 uv = vUv;

	#else

		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;

	#endif

#endif

#ifdef USE_MAP

	diffuseColor *= texture2D( map, uv );

#endif

#ifdef USE_ALPHAMAP

	diffuseColor.a *= texture2D( alphaMap, uv ).g;

#endif
`;var fd=`
#if defined( USE_POINTS_UV )

	varying vec2 vUv;

#else

	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )

		uniform mat3 uvTransform;

	#endif

#endif

#ifdef USE_MAP

	uniform sampler2D map;

#endif

#ifdef USE_ALPHAMAP

	uniform sampler2D alphaMap;

#endif
`;var dd=`
float metalnessFactor = metalness;

#ifdef USE_METALNESSMAP

	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );

	// reads channel B, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	metalnessFactor *= texelMetalness.b;

#endif
`;var pd=`
#ifdef USE_METALNESSMAP

	uniform sampler2D metalnessMap;

#endif
`;var md=`
#ifdef USE_INSTANCING_MORPH

	float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	float morphTargetBaseInfluence = texelFetch( morphTexture, ivec2( 0, gl_InstanceID ), 0 ).r;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		morphTargetInfluences[i] =  texelFetch( morphTexture, ivec2( i + 1, gl_InstanceID ), 0 ).r;

	}
#endif
`;var gd=`
#if defined( USE_MORPHCOLORS )

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	vColor *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		#if defined( USE_COLOR_ALPHA )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];

		#elif defined( USE_COLOR )

			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];

		#endif

	}

#endif
`;var xd=`
#ifdef USE_MORPHNORMALS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in normal = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	objectNormal *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var _d=`
#ifdef USE_MORPHTARGETS

	#ifndef USE_INSTANCING_MORPH

		uniform float morphTargetBaseInfluence;
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];

	#endif

	uniform sampler2DArray morphTargetsTexture;
	uniform ivec2 morphTargetsTextureSize;

	vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {

		int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
		int y = texelIndex / morphTargetsTextureSize.x;
		int x = texelIndex - y * morphTargetsTextureSize.x;

		ivec3 morphUV = ivec3( x, y, morphTargetIndex );
		return texelFetch( morphTargetsTexture, morphUV, 0 );

	}

#endif
`;var yd=`
#ifdef USE_MORPHTARGETS

	// morphTargetBaseInfluence is set based on BufferGeometry.morphTargetsRelative value:
	// When morphTargetsRelative is false, this is set to 1 - sum(influences); this results in position = sum((target - base) * influence)
	// When morphTargetsRelative is true, this is set to 1; as a result, all morph targets are simply added to the base after weighting
	transformed *= morphTargetBaseInfluence;

	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {

		if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];

	}

#endif
`;var vd=`
float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;

#ifdef FLAT_SHADED

	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );

#else

	vec3 normal = normalize( vNormal );

	#ifdef DOUBLE_SIDED

		normal *= faceDirection;

	#endif

#endif

#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )

	#ifdef USE_TANGENT

		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;

	#endif

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	#ifdef USE_TANGENT

		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );

	#else

		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );

	#endif

	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )

		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;

	#endif

#endif

// non perturbed normal for clearcoat among others

vec3 nonPerturbedNormal = normal;

`;var bd=`

#ifdef USE_NORMALMAP_OBJECTSPACE

	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0; // overrides both flatShading and attribute normals

	#ifdef FLIP_SIDED

		normal = - normal;

	#endif

	#ifdef DOUBLE_SIDED

		normal = normal * faceDirection;

	#endif

	normal = normalize( normalMatrix * normal );

#elif defined( USE_NORMALMAP_TANGENTSPACE )

	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;

	normal = normalize( tbn * mapN );

#elif defined( USE_BUMPMAP )

	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );

#endif
`;var Md=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var Sd=`
#ifndef FLAT_SHADED

	varying vec3 vNormal;

	#ifdef USE_TANGENT

		varying vec3 vTangent;
		varying vec3 vBitangent;

	#endif

#endif
`;var wd=`
#ifndef FLAT_SHADED // normal is computed with derivatives when FLAT_SHADED

	vNormal = normalize( transformedNormal );

	#ifdef USE_TANGENT

		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );

	#endif

#endif
`;var Td=`
#ifdef USE_NORMALMAP

	uniform sampler2D normalMap;
	uniform vec2 normalScale;

#endif

#ifdef USE_NORMALMAP_OBJECTSPACE

	uniform mat3 normalMatrix;

#endif

#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )

	// Normal Mapping Without Precomputed Tangents
	// http://www.thetenthplanet.de/archives/1180

	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {

		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );

		vec3 N = surf_norm; // normalized

		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );

		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;

		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );

		return mat3( T * scale, B * scale, N );

	}

#endif
`;var Ed=`
#ifdef USE_CLEARCOAT

	vec3 clearcoatNormal = nonPerturbedNormal;

#endif
`;var Ad=`
#ifdef USE_CLEARCOAT_NORMALMAP

	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;

	clearcoatNormal = normalize( tbn2 * clearcoatMapN );

#endif
`;var Cd=`

#ifdef USE_CLEARCOATMAP

	uniform sampler2D clearcoatMap;

#endif

#ifdef USE_CLEARCOAT_NORMALMAP

	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;

#endif

#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform sampler2D clearcoatRoughnessMap;

#endif
`;var Id=`

#ifdef USE_IRIDESCENCEMAP

	uniform sampler2D iridescenceMap;

#endif

#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform sampler2D iridescenceThicknessMap;

#endif
`;var Pd=`
#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif

#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif

gl_FragColor = vec4( outgoingLight, diffuseColor.a );
`;var Rd=`
vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}

vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}

const float PackUpscale = 256. / 255.; // fraction -> 0..1 (including 1)
const float UnpackDownscale = 255. / 256.; // 0..1 -> fraction (excluding 1)
const float ShiftRight8 = 1. / 256.;
const float Inv255 = 1. / 255.;

const vec4 PackFactors = vec4( 1.0, 256.0, 256.0 * 256.0, 256.0 * 256.0 * 256.0 );

const vec2 UnpackFactors2 = vec2( UnpackDownscale, 1.0 / PackFactors.g );
const vec3 UnpackFactors3 = vec3( UnpackDownscale / PackFactors.rg, 1.0 / PackFactors.b );
const vec4 UnpackFactors4 = vec4( UnpackDownscale / PackFactors.rgb, 1.0 / PackFactors.a );

vec4 packDepthToRGBA( const in float v ) {
	if( v <= 0.0 )
		return vec4( 0., 0., 0., 0. );
	if( v >= 1.0 )
		return vec4( 1., 1., 1., 1. );
	float vuf;
	float af = modf( v * PackFactors.a, vuf );
	float bf = modf( vuf * ShiftRight8, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	return vec4( vuf * Inv255, gf * PackUpscale, bf * PackUpscale, af );
}

vec3 packDepthToRGB( const in float v ) {
	if( v <= 0.0 )
		return vec3( 0., 0., 0. );
	if( v >= 1.0 )
		return vec3( 1., 1., 1. );
	float vuf;
	float bf = modf( v * PackFactors.b, vuf );
	float gf = modf( vuf * ShiftRight8, vuf );
	// the 0.9999 tweak is unimportant, very tiny empirical improvement
	// return vec3( vuf * Inv255, gf * PackUpscale, bf * 0.9999 );
	return vec3( vuf * Inv255, gf * PackUpscale, bf );
}

vec2 packDepthToRG( const in float v ) {
	if( v <= 0.0 )
		return vec2( 0., 0. );
	if( v >= 1.0 )
		return vec2( 1., 1. );
	float vuf;
	float gf = modf( v * 256., vuf );
	return vec2( vuf * Inv255, gf );
}

float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors4 );
}

float unpackRGBToDepth( const in vec3 v ) {
	return dot( v, UnpackFactors3 );
}

float unpackRGToDepth( const in vec2 v ) {
	return v.r * UnpackFactors2.r + v.g * UnpackFactors2.g;
}

vec4 pack2HalfToRGBA( const in vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}

vec2 unpackRGBATo2Half( const in vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}

// NOTE: viewZ, the z-coordinate in camera space, is negative for points in front of the camera

float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( viewZ + near ) / ( near - far );
}

float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps orthographic depth in [ 0, 1 ] to viewZ
	return depth * ( near - far ) - near;
}

// NOTE: https://twitter.com/gonnavis/status/1377183786949959682

float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	// -near maps to 0; -far maps to 1
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}

float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	// maps perspective depth in [ 0, 1 ] to viewZ
	return ( near * far ) / ( ( far - near ) * depth - far );
}
`;var Ld=`
#ifdef PREMULTIPLIED_ALPHA

	// Get normal blending with premultipled, use with CustomBlending, OneFactor, OneMinusSrcAlphaFactor, AddEquation.
	gl_FragColor.rgb *= gl_FragColor.a;

#endif
`;var Dd=`
vec4 mvPosition = vec4( transformed, 1.0 );

#ifdef USE_BATCHING

	mvPosition = batchingMatrix * mvPosition;

#endif

#ifdef USE_INSTANCING

	mvPosition = instanceMatrix * mvPosition;

#endif

mvPosition = modelViewMatrix * mvPosition;

gl_Position = projectionMatrix * mvPosition;
`;var Nd=`
#ifdef DITHERING

	gl_FragColor.rgb = dithering( gl_FragColor.rgb );

#endif
`;var Ud=`
#ifdef DITHERING

	// based on https://www.shadertoy.com/view/MslGR8
	vec3 dithering( vec3 color ) {
		//Calculate grid position
		float grid_position = rand( gl_FragCoord.xy );

		//Shift the individual colors differently, thus making it even harder to see the dithering pattern
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );

		//modify shift according to grid position.
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );

		//shift the color by dither_shift
		return color + dither_shift_RGB;
	}

#endif
`;var Fd=`
float roughnessFactor = roughness;

#ifdef USE_ROUGHNESSMAP

	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );

	// reads channel G, compatible with a combined OcclusionRoughnessMetallic (RGB) texture
	roughnessFactor *= texelRoughness.g;

#endif
`;var Od=`
#ifdef USE_ROUGHNESSMAP

	uniform sampler2D roughnessMap;

#endif
`;var Bd=`
#if NUM_SPOT_LIGHT_COORDS > 0

	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#if NUM_SPOT_LIGHT_MAPS > 0

	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {

		float depth = unpackRGBAToDepth( texture2D( depths, uv ) );

		#ifdef USE_REVERSED_DEPTH_BUFFER

			return step( depth, compare );

		#else

			return step( compare, depth );

		#endif

	}

	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {

		return unpackRGBATo2Half( texture2D( shadow, uv ) );

	}

	float VSMShadow( sampler2D shadow, vec2 uv, float compare ) {

		float occlusion = 1.0;

		vec2 distribution = texture2DDistribution( shadow, uv );

		#ifdef USE_REVERSED_DEPTH_BUFFER

			float hard_shadow = step( distribution.x, compare );

		#else

			float hard_shadow = step( compare, distribution.x );

		#endif

		if ( hard_shadow != 1.0 ) {

			float distance = compare - distribution.x;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance ); // Chebeyshevs inequality
			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 ); // 0.3 reduces light bleed
			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );

		}
		return occlusion;

	}

	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord ) {

		float shadow = 1.0;

		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;

		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;

		if ( frustumTest ) {

		#if defined( SHADOWMAP_TYPE_PCF )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;

			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;

			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );

		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )

			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;

			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;

			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );

		#elif defined( SHADOWMAP_TYPE_VSM )

			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );

		#else // no percentage-closer filtering:

			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );

		#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

	// cubeToUV() maps a 3D direction vector suitable for cube texture mapping to a 2D
	// vector suitable for 2D texture mapping. This code uses the following layout for the
	// 2D texture:
	//
	// xzXZ
	//  y Y
	//
	// Y - Positive y direction
	// y - Negative y direction
	// X - Positive x direction
	// x - Negative x direction
	// Z - Positive z direction
	// z - Negative z direction
	//
	// Source and test bed:
	// https://gist.github.com/tschw/da10c43c467ce8afd0c4

	vec2 cubeToUV( vec3 v, float texelSizeY ) {

		// Number of texels to avoid at the edge of each square

		vec3 absV = abs( v );

		// Intersect unit cube

		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;

		// Apply scale to avoid seams

		// two texels less per square (one texel will do for NEAREST)
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );

		// Unwrap

		// space: -1 ... 1 range for each square
		//
		// #X##		dim    := ( 4 , 2 )
		//  # #		center := ( 1 , 1 )

		vec2 planar = v.xy;

		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;

		if ( absV.z >= almostOne ) {

			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;

		} else if ( absV.x >= almostOne ) {

			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;

		} else if ( absV.y >= almostOne ) {

			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;

		}

		// Transform to UV space

		// scale := 0.5 / dim
		// translate := ( center + 0.5 ) / dim
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );

	}

	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowIntensity, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {

		float shadow = 1.0;

		// for point lights, the uniform @vShadowCoord is re-purposed to hold
		// the vector from the light to the world-space position of the fragment.
		vec3 lightToPosition = shadowCoord.xyz;
		
		float lightToPositionLength = length( lightToPosition );

		if ( lightToPositionLength - shadowCameraFar <= 0.0 && lightToPositionLength - shadowCameraNear >= 0.0 ) {

			// dp = normalized distance from light to fragment position
			float dp = ( lightToPositionLength - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear ); // need to clamp?
			dp += shadowBias;

			// bd3D = base direction 3D
			vec3 bd3D = normalize( lightToPosition );

			vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );

			#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )

				vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;

				shadow = (
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
					texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
				) * ( 1.0 / 9.0 );

			#else // no percentage-closer filtering

				shadow = texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );

			#endif

		}

		return mix( 1.0, shadow, shadowIntensity );

	}

#endif
`;var kd=`

#if NUM_SPOT_LIGHT_COORDS > 0

	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];

#endif

#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];

		struct DirectionalLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

		struct SpotLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};

		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];

		struct PointLightShadow {
			float shadowIntensity;
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};

		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): uniforms for area light shadows

	#endif
	*/

#endif
`;var zd=`

#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )

	// Offsetting the position used for querying occlusion along the world normal can be used to reduce shadow acne.
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;

#endif

#if defined( USE_SHADOWMAP )

	#if NUM_DIR_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;

		}
		#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update vAreaShadowCoord with area light info

	#endif
	*/

#endif

// spot lights can be evaluated without active shadow mapping (when SpotLight.map is used)

#if NUM_SPOT_LIGHT_COORDS > 0

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {

		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;

	}
	#pragma unroll_loop_end

#endif


`;var Vd=`
float getShadowMask() {

	float shadow = 1.0;

	#ifdef USE_SHADOWMAP

	#if NUM_DIR_LIGHT_SHADOWS > 0

	DirectionalLightShadow directionalLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {

		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowIntensity, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_SPOT_LIGHT_SHADOWS > 0

	SpotLightShadow spotLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {

		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowIntensity, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	#if NUM_POINT_LIGHT_SHADOWS > 0

	PointLightShadow pointLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {

		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowIntensity, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;

	}
	#pragma unroll_loop_end

	#endif

	/*
	#if NUM_RECT_AREA_LIGHTS > 0

		// TODO (abelnation): update shadow for Area light

	#endif
	*/

	#endif

	return shadow;

}
`;var Hd=`
#ifdef USE_SKINNING

	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );

#endif
`;var Gd=`
#ifdef USE_SKINNING

	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;

	uniform highp sampler2D boneTexture;

	mat4 getBoneMatrix( const in float i ) {

		int size = textureSize( boneTexture, 0 ).x;
		int j = int( i ) * 4;
		int x = j % size;
		int y = j / size;
		vec4 v1 = texelFetch( boneTexture, ivec2( x, y ), 0 );
		vec4 v2 = texelFetch( boneTexture, ivec2( x + 1, y ), 0 );
		vec4 v3 = texelFetch( boneTexture, ivec2( x + 2, y ), 0 );
		vec4 v4 = texelFetch( boneTexture, ivec2( x + 3, y ), 0 );

		return mat4( v1, v2, v3, v4 );

	}

#endif
`;var Wd=`
#ifdef USE_SKINNING

	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );

	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;

	transformed = ( bindMatrixInverse * skinned ).xyz;

#endif
`;var Xd=`
#ifdef USE_SKINNING

	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;

	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;

	#ifdef USE_TANGENT

		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;

	#endif

#endif
`;var qd=`
float specularStrength;

#ifdef USE_SPECULARMAP

	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;

#else

	specularStrength = 1.0;

#endif
`;var Yd=`
#ifdef USE_SPECULARMAP

	uniform sampler2D specularMap;

#endif
`;var Zd=`
#if defined( TONE_MAPPING )

	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );

#endif
`;var Jd=`
#ifndef saturate
// <common> may have defined saturate() already
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif

uniform float toneMappingExposure;

// exposure only
vec3 LinearToneMapping( vec3 color ) {

	return saturate( toneMappingExposure * color );

}

// source: https://www.cs.utah.edu/docs/techreports/2002/pdf/UUCS-02-001.pdf
vec3 ReinhardToneMapping( vec3 color ) {

	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );

}

// source: http://filmicworlds.com/blog/filmic-tonemapping-operators/
vec3 CineonToneMapping( vec3 color ) {

	// filmic operator by Jim Hejl and Richard Burgess-Dawson
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );

}

// source: https://github.com/selfshadow/ltc_code/blob/master/webgl/shaders/ltc/ltc_blit.fs
vec3 RRTAndODTFit( vec3 v ) {

	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;

}

// this implementation of ACES is modified to accommodate a brighter viewing environment.
// the scale factor of 1/0.6 is subjective. see discussion in #19621.

vec3 ACESFilmicToneMapping( vec3 color ) {

	// sRGB => XYZ => D65_2_D60 => AP1 => RRT_SAT
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ), // transposed from source
		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);

	// ODT_SAT => XYZ => D60_2_D65 => sRGB
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ), // transposed from source
		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);

	color *= toneMappingExposure / 0.6;

	color = ACESInputMat * color;

	// Apply RRT and ODT
	color = RRTAndODTFit( color );

	color = ACESOutputMat * color;

	// Clamp to [0, 1]
	return saturate( color );

}

// Matrices for rec 2020 <> rec 709 color space conversion
// matrix provided in row-major order so it has been transposed
// https://www.itu.int/pub/R-REP-BT.2407-2017
const mat3 LINEAR_REC2020_TO_LINEAR_SRGB = mat3(
	vec3( 1.6605, - 0.1246, - 0.0182 ),
	vec3( - 0.5876, 1.1329, - 0.1006 ),
	vec3( - 0.0728, - 0.0083, 1.1187 )
);

const mat3 LINEAR_SRGB_TO_LINEAR_REC2020 = mat3(
	vec3( 0.6274, 0.0691, 0.0164 ),
	vec3( 0.3293, 0.9195, 0.0880 ),
	vec3( 0.0433, 0.0113, 0.8956 )
);

// https://iolite-engine.com/blog_posts/minimal_agx_implementation
// Mean error^2: 3.6705141e-06
vec3 agxDefaultContrastApprox( vec3 x ) {

	vec3 x2 = x * x;
	vec3 x4 = x2 * x2;

	return + 15.5 * x4 * x2
		- 40.14 * x4 * x
		+ 31.96 * x4
		- 6.868 * x2 * x
		+ 0.4298 * x2
		+ 0.1191 * x
		- 0.00232;

}

// AgX Tone Mapping implementation based on Filament, which in turn is based
// on Blender's implementation using rec 2020 primaries
// https://github.com/google/filament/pull/7236
// Inputs and outputs are encoded as Linear-sRGB.

vec3 AgXToneMapping( vec3 color ) {

	// AgX constants
	const mat3 AgXInsetMatrix = mat3(
		vec3( 0.856627153315983, 0.137318972929847, 0.11189821299995 ),
		vec3( 0.0951212405381588, 0.761241990602591, 0.0767994186031903 ),
		vec3( 0.0482516061458583, 0.101439036467562, 0.811302368396859 )
	);

	// explicit AgXOutsetMatrix generated from Filaments AgXOutsetMatrixInv
	const mat3 AgXOutsetMatrix = mat3(
		vec3( 1.1271005818144368, - 0.1413297634984383, - 0.14132976349843826 ),
		vec3( - 0.11060664309660323, 1.157823702216272, - 0.11060664309660294 ),
		vec3( - 0.016493938717834573, - 0.016493938717834257, 1.2519364065950405 )
	);

	// LOG2_MIN      = -10.0
	// LOG2_MAX      =  +6.5
	// MIDDLE_GRAY   =  0.18
	const float AgxMinEv = - 12.47393;  // log2( pow( 2, LOG2_MIN ) * MIDDLE_GRAY )
	const float AgxMaxEv = 4.026069;    // log2( pow( 2, LOG2_MAX ) * MIDDLE_GRAY )

	color *= toneMappingExposure;

	color = LINEAR_SRGB_TO_LINEAR_REC2020 * color;

	color = AgXInsetMatrix * color;

	// Log2 encoding
	color = max( color, 1e-10 ); // avoid 0 or negative numbers for log2
	color = log2( color );
	color = ( color - AgxMinEv ) / ( AgxMaxEv - AgxMinEv );

	color = clamp( color, 0.0, 1.0 );

	// Apply sigmoid
	color = agxDefaultContrastApprox( color );

	// Apply AgX look
	// v = agxLook(v, look);

	color = AgXOutsetMatrix * color;

	// Linearize
	color = pow( max( vec3( 0.0 ), color ), vec3( 2.2 ) );

	color = LINEAR_REC2020_TO_LINEAR_SRGB * color;

	// Gamut mapping. Simple clamp for now.
	color = clamp( color, 0.0, 1.0 );

	return color;

}

// https://modelviewer.dev/examples/tone-mapping

vec3 NeutralToneMapping( vec3 color ) {

	const float StartCompression = 0.8 - 0.04;
	const float Desaturation = 0.15;

	color *= toneMappingExposure;

	float x = min( color.r, min( color.g, color.b ) );

	float offset = x < 0.08 ? x - 6.25 * x * x : 0.04;

	color -= offset;

	float peak = max( color.r, max( color.g, color.b ) );

	if ( peak < StartCompression ) return color;

	float d = 1. - StartCompression;

	float newPeak = 1. - d * d / ( peak + d - StartCompression );

	color *= newPeak / peak;

	float g = 1. - 1. / ( Desaturation * ( peak - newPeak ) + 1. );

	return mix( color, vec3( newPeak ), g );

}

vec3 CustomToneMapping( vec3 color ) { return color; }
`;var Kd=`
#ifdef USE_TRANSMISSION

	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;

	#endif

	#ifdef USE_THICKNESSMAP

		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;

	#endif

	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );

	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.dispersion, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );

	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );

	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );

#endif
`;var jd=`
#ifdef USE_TRANSMISSION

	// Transmission code is based on glTF-Sampler-Viewer
	// https://github.com/KhronosGroup/glTF-Sample-Viewer

	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;

	#ifdef USE_TRANSMISSIONMAP

		uniform sampler2D transmissionMap;

	#endif

	#ifdef USE_THICKNESSMAP

		uniform sampler2D thicknessMap;

	#endif

	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;

	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;

	varying vec3 vWorldPosition;

	// Mipped Bicubic Texture Filtering by N8
	// https://www.shadertoy.com/view/Dl2SDW

	float w0( float a ) {

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );

	}

	float w1( float a ) {

		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );

	}

	float w2( float a ){

		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );

	}

	float w3( float a ) {

		return ( 1.0 / 6.0 ) * ( a * a * a );

	}

	// g0 and g1 are the two amplitude functions
	float g0( float a ) {

		return w0( a ) + w1( a );

	}

	float g1( float a ) {

		return w2( a ) + w3( a );

	}

	// h0 and h1 are the two offset functions
	float h0( float a ) {

		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );

	}

	float h1( float a ) {

		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );

	}

	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {

		uv = uv * texelSize.zw + 0.5;

		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );

		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );

		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;

		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );

	}

	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {

		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );

	}

	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {

		// Direction of refracted light.
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );

		// Compute rotation-independent scaling of the model matrix.
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );

		// The thickness is specified in local space.
		return normalize( refractionVector ) * thickness * modelScale;

	}

	float applyIorToRoughness( const in float roughness, const in float ior ) {

		// Scale roughness with IOR so that an IOR of 1.0 results in no microfacet refraction and
		// an IOR of 1.5 results in the default amount of microfacet refraction.
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );

	}

	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {

		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );

	}

	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {

		if ( isinf( attenuationDistance ) ) {

			// Attenuation distance is +\u221E, i.e. the transmitted color is not attenuated at all.
			return vec3( 1.0 );

		} else {

			// Compute light attenuation using Beer's law.
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance ); // Beer's law
			return transmittance;

		}

	}

	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float dispersion, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {

		vec4 transmittedLight;
		vec3 transmittance;

		#ifdef USE_DISPERSION

			float halfSpread = ( ior - 1.0 ) * 0.025 * dispersion;
			vec3 iors = vec3( ior - halfSpread, ior, ior + halfSpread );

			for ( int i = 0; i < 3; i ++ ) {

				vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, iors[ i ], modelMatrix );
				vec3 refractedRayExit = position + transmissionRay;

				// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
				vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
				vec2 refractionCoords = ndcPos.xy / ndcPos.w;
				refractionCoords += 1.0;
				refractionCoords /= 2.0;

				// Sample framebuffer to get pixel the refracted ray hits.
				vec4 transmissionSample = getTransmissionSample( refractionCoords, roughness, iors[ i ] );
				transmittedLight[ i ] = transmissionSample[ i ];
				transmittedLight.a += transmissionSample.a;

				transmittance[ i ] = diffuseColor[ i ] * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance )[ i ];

			}

			transmittedLight.a /= 3.0;

		#else

			vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
			vec3 refractedRayExit = position + transmissionRay;

			// Project refracted vector on the framebuffer, while mapping to normalized device coordinates.
			vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
			vec2 refractionCoords = ndcPos.xy / ndcPos.w;
			refractionCoords += 1.0;
			refractionCoords /= 2.0;

			// Sample framebuffer to get pixel the refracted ray hits.
			transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
			transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );

		#endif

		vec3 attenuatedColor = transmittance * transmittedLight.rgb;

		// Get the specular component.
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );

		// As less light is transmitted, the opacity should be increased. This simple approximation does a decent job
		// of modulating a CSS background, and has no effect when the buffer is opaque, due to a solid object or clear color.
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;

		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );

	}
#endif
`;var $d=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	varying vec2 vNormalMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_SPECULARMAP

	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var Qd=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	varying vec2 vUv;

#endif
#ifdef USE_MAP

	uniform mat3 mapTransform;
	varying vec2 vMapUv;

#endif
#ifdef USE_ALPHAMAP

	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;

#endif
#ifdef USE_LIGHTMAP

	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;

#endif
#ifdef USE_AOMAP

	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;

#endif
#ifdef USE_BUMPMAP

	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;

#endif
#ifdef USE_NORMALMAP

	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;

#endif
#ifdef USE_DISPLACEMENTMAP

	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;

#endif
#ifdef USE_EMISSIVEMAP

	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;

#endif
#ifdef USE_METALNESSMAP

	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;

#endif
#ifdef USE_ROUGHNESSMAP

	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;

#endif
#ifdef USE_ANISOTROPYMAP

	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;

#endif
#ifdef USE_CLEARCOATMAP

	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;

#endif
#ifdef USE_SHEEN_COLORMAP

	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;

#endif
#ifdef USE_IRIDESCENCEMAP

	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;

#endif
#ifdef USE_SPECULARMAP

	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;

#endif
#ifdef USE_SPECULAR_COLORMAP

	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;

#endif
#ifdef USE_TRANSMISSIONMAP

	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;

#endif
#ifdef USE_THICKNESSMAP

	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;

#endif
`;var ep=`
#if defined( USE_UV ) || defined( USE_ANISOTROPY )

	vUv = vec3( uv, 1 ).xy;

#endif
#ifdef USE_MAP

	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ALPHAMAP

	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_LIGHTMAP

	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_AOMAP

	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_BUMPMAP

	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_NORMALMAP

	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_DISPLACEMENTMAP

	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_EMISSIVEMAP

	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_METALNESSMAP

	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ROUGHNESSMAP

	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_ANISOTROPYMAP

	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOATMAP

	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_NORMALMAP

	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP

	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCEMAP

	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP

	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_COLORMAP

	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SHEEN_ROUGHNESSMAP

	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULARMAP

	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_COLORMAP

	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_SPECULAR_INTENSITYMAP

	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_TRANSMISSIONMAP

	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;

#endif
#ifdef USE_THICKNESSMAP

	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;

#endif
`;var tp=`
#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0

	vec4 worldPosition = vec4( transformed, 1.0 );

	#ifdef USE_BATCHING

		worldPosition = batchingMatrix * worldPosition;

	#endif

	#ifdef USE_INSTANCING

		worldPosition = instanceMatrix * worldPosition;

	#endif

	worldPosition = modelMatrix * worldPosition;

#endif
`;var ip=`
varying vec2 vUv;
uniform mat3 uvTransform;

void main() {

	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	gl_Position = vec4( position.xy, 1.0, 1.0 );

}
`,np=`
uniform sampler2D t2D;
uniform float backgroundIntensity;

varying vec2 vUv;

void main() {

	vec4 texColor = texture2D( t2D, vUv );

	#ifdef DECODE_VIDEO_TEXTURE

		// use inline sRGB decode until browsers properly support SRGB8_ALPHA8 with video textures

		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var rp=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,sp=`

#ifdef ENVMAP_TYPE_CUBE

	uniform samplerCube envMap;

#elif defined( ENVMAP_TYPE_CUBE_UV )

	uniform sampler2D envMap;

#endif

uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
uniform mat3 backgroundRotation;

varying vec3 vWorldDirection;

#include <cube_uv_reflection_fragment>

void main() {

	#ifdef ENVMAP_TYPE_CUBE

		vec4 texColor = textureCube( envMap, backgroundRotation * vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );

	#elif defined( ENVMAP_TYPE_CUBE_UV )

		vec4 texColor = textureCubeUV( envMap, backgroundRotation * vWorldDirection, backgroundBlurriness );

	#else

		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );

	#endif

	texColor.rgb *= backgroundIntensity;

	gl_FragColor = texColor;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var op=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

	gl_Position.z = gl_Position.w; // set z to camera.far

}
`,ap=`
uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;

varying vec3 vWorldDirection;

void main() {

	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );

	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var lp=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

// This is used for computing an equivalent of gl_FragCoord.z that is as high precision as possible.
// Some platforms compute gl_FragCoord at a lower precision which makes the manually computed value better for
// depth-based postprocessing effects. Reproduced on iPad with A10 processor / iPadOS 13.3.1.
varying vec2 vHighPrecisionZW;

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vHighPrecisionZW = gl_Position.zw;

}
`,cp=`
#if DEPTH_PACKING == 3200

	uniform float opacity;

#endif

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

varying vec2 vHighPrecisionZW;

void main() {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#if DEPTH_PACKING == 3200

		diffuseColor.a = opacity;

	#endif

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	#include <logdepthbuf_fragment>

	// Higher precision equivalent of gl_FragCoord.z

	#ifdef USE_REVERSED_DEPTH_BUFFER

		float fragCoordZ = vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ];

	#else

		float fragCoordZ = 0.5 * vHighPrecisionZW[ 0 ] / vHighPrecisionZW[ 1 ] + 0.5;

	#endif

	#if DEPTH_PACKING == 3200

		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );

	#elif DEPTH_PACKING == 3201

		gl_FragColor = packDepthToRGBA( fragCoordZ );

	#elif DEPTH_PACKING == 3202

		gl_FragColor = vec4( packDepthToRGB( fragCoordZ ), 1.0 );

	#elif DEPTH_PACKING == 3203

		gl_FragColor = vec4( packDepthToRG( fragCoordZ ), 0.0, 1.0 );

	#endif

}
`;var hp=`
#define DISTANCE

varying vec3 vWorldPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	#include <batching_vertex>
	#include <skinbase_vertex>

	#include <morphinstance_vertex>

	#ifdef USE_DISPLACEMENTMAP

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>

	vWorldPosition = worldPosition.xyz;

}
`,up=`
#define DISTANCE

uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;

#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>

void main () {

	vec4 diffuseColor = vec4( 1.0 );
	#include <clipping_planes_fragment>

	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist ); // clamp to [ 0, 1 ]

	gl_FragColor = packDepthToRGBA( dist );

}
`;var fp=`
varying vec3 vWorldDirection;

#include <common>

void main() {

	vWorldDirection = transformDirection( position, modelMatrix );

	#include <begin_vertex>
	#include <project_vertex>

}
`,dp=`
uniform sampler2D tEquirect;

varying vec3 vWorldDirection;

#include <common>

void main() {

	vec3 direction = normalize( vWorldDirection );

	vec2 sampleUV = equirectUv( direction );

	gl_FragColor = texture2D( tEquirect, sampleUV );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>

}
`;var pp=`
uniform float scale;
attribute float lineDistance;

varying float vLineDistance;

#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	vLineDistance = scale * lineDistance;

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,mp=`
uniform vec3 diffuse;
uniform float opacity;

uniform float dashSize;
uniform float totalSize;

varying float vLineDistance;

#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	if ( mod( vLineDistance, totalSize ) > dashSize ) {

		discard;

	}

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>

	outgoingLight = diffuseColor.rgb; // simple shader

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var gp=`
#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )

		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>

	#endif

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>

}
`,xp=`
uniform vec3 diffuse;
uniform float opacity;

#ifndef FLAT_SHADED

	varying vec3 vNormal;

#endif

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );

	// accumulation (baked indirect lighting only)
	#ifdef USE_LIGHTMAP

		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;

	#else

		reflectedLight.indirectDiffuse += vec3( 1.0 );

	#endif

	// modulation
	#include <aomap_fragment>

	reflectedLight.indirectDiffuse *= diffuseColor.rgb;

	vec3 outgoingLight = reflectedLight.indirectDiffuse;

	#include <envmap_fragment>

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var _p=`
#define LAMBERT

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,yp=`
#define LAMBERT

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var vp=`
#define MATCAP

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>

#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

	vViewPosition = - mvPosition.xyz;

}
`,bp=`
#define MATCAP

uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;

varying vec3 vViewPosition;

#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5; // 0.495 to remove artifacts caused by undersized matcap disks

	#ifdef USE_MATCAP

		vec4 matcapColor = texture2D( matcap, uv );

	#else

		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 ); // default if matcap is missing

	#endif

	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Mp=`
#define NORMAL

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	vViewPosition = - mvPosition.xyz;

#endif

}
`,Sp=`
#define NORMAL

uniform float opacity;

#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )

	varying vec3 vViewPosition;

#endif

#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( 0.0, 0.0, 0.0, opacity );

	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>

	gl_FragColor = vec4( packNormalToRGB( normal ), diffuseColor.a );

	#ifdef OPAQUE

		gl_FragColor.a = 1.0;

	#endif

}
`;var wp=`
#define PHONG

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Tp=`
#define PHONG

uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;

	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Ep=`
#define STANDARD

varying vec3 vViewPosition;

#ifdef USE_TRANSMISSION

	varying vec3 vWorldPosition;

#endif

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

#ifdef USE_TRANSMISSION

	vWorldPosition = worldPosition.xyz;

#endif
}
`,Ap=`
#define STANDARD

#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef IOR
	uniform float ior;
#endif

#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;

	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif

	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif

#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif

#ifdef USE_DISPERSION
	uniform float dispersion;
#endif

#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif

#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;

	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif

	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif

#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;

	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif

varying vec3 vViewPosition;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;

	#include <transmission_fragment>

	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;

	#ifdef USE_SHEEN

		// Sheen energy compensation approximation calculation can be found at the end of
		// https://drive.google.com/file/d/1T0D1VSyR4AllqIJTQAraEIzjlb5h4FKH/view?usp=sharing
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );

		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;

	#endif

	#ifdef USE_CLEARCOAT

		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );

		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );

		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;

	#endif

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Cp=`
#define TOON

varying vec3 vViewPosition;

#include <common>
#include <batching_pars_vertex>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>
	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>

	vViewPosition = - mvPosition.xyz;

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Ip=`
#define TOON

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;

#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>

	// accumulation
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>

	// modulation
	#include <aomap_fragment>

	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>

}
`;var Pp=`
uniform float size;
uniform float scale;

#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

#ifdef USE_POINTS_UV

	varying vec2 vUv;
	uniform mat3 uvTransform;

#endif

void main() {

	#ifdef USE_POINTS_UV

		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;

	#endif

	#include <color_vertex>
	#include <morphinstance_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>

	gl_PointSize = size;

	#ifdef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );

	#endif

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>

}
`,Rp=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>

}
`;var Lp=`
#include <common>
#include <batching_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>

void main() {

	#include <batching_vertex>

	#include <beginnormal_vertex>
	#include <morphinstance_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>

	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>

	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>

}
`,Dp=`
uniform vec3 color;
uniform float opacity;

#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>

void main() {

	#include <logdepthbuf_fragment>

	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );

	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var Np=`
uniform float rotation;
uniform vec2 center;

#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>

void main() {

	#include <uv_vertex>

	vec4 mvPosition = modelViewMatrix[ 3 ];

	vec2 scale = vec2( length( modelMatrix[ 0 ].xyz ), length( modelMatrix[ 1 ].xyz ) );

	#ifndef USE_SIZEATTENUATION

		bool isPerspective = isPerspectiveMatrix( projectionMatrix );

		if ( isPerspective ) scale *= - mvPosition.z;

	#endif

	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;

	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;

	mvPosition.xy += rotatedPosition;

	gl_Position = projectionMatrix * mvPosition;

	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>

}
`,Up=`
uniform vec3 diffuse;
uniform float opacity;

#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>

void main() {

	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <clipping_planes_fragment>

	vec3 outgoingLight = vec3( 0.0 );

	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>

	outgoingLight = diffuseColor.rgb;

	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>

}
`;var nt={alphahash_fragment:nf,alphahash_pars_fragment:rf,alphamap_fragment:sf,alphamap_pars_fragment:of,alphatest_fragment:af,alphatest_pars_fragment:lf,aomap_fragment:cf,aomap_pars_fragment:hf,batching_pars_vertex:uf,batching_vertex:ff,begin_vertex:df,beginnormal_vertex:pf,bsdfs:mf,iridescence_fragment:gf,bumpmap_pars_fragment:xf,clipping_planes_fragment:_f,clipping_planes_pars_fragment:yf,clipping_planes_pars_vertex:vf,clipping_planes_vertex:bf,color_fragment:Mf,color_pars_fragment:Sf,color_pars_vertex:wf,color_vertex:Tf,common:Ef,cube_uv_reflection_fragment:Af,defaultnormal_vertex:Cf,displacementmap_pars_vertex:If,displacementmap_vertex:Pf,emissivemap_fragment:Rf,emissivemap_pars_fragment:Lf,colorspace_fragment:Df,colorspace_pars_fragment:Nf,envmap_fragment:Uf,envmap_common_pars_fragment:Ff,envmap_pars_fragment:Of,envmap_pars_vertex:Bf,envmap_physical_pars_fragment:Jf,envmap_vertex:kf,fog_vertex:zf,fog_pars_vertex:Vf,fog_fragment:Hf,fog_pars_fragment:Gf,gradientmap_pars_fragment:Wf,lightmap_pars_fragment:Xf,lights_lambert_fragment:qf,lights_lambert_pars_fragment:Yf,lights_pars_begin:Zf,lights_toon_fragment:Kf,lights_toon_pars_fragment:jf,lights_phong_fragment:$f,lights_phong_pars_fragment:Qf,lights_physical_fragment:ed,lights_physical_pars_fragment:td,lights_fragment_begin:id,lights_fragment_maps:nd,lights_fragment_end:rd,logdepthbuf_fragment:sd,logdepthbuf_pars_fragment:od,logdepthbuf_pars_vertex:ad,logdepthbuf_vertex:ld,map_fragment:cd,map_pars_fragment:hd,map_particle_fragment:ud,map_particle_pars_fragment:fd,metalnessmap_fragment:dd,metalnessmap_pars_fragment:pd,morphinstance_vertex:md,morphcolor_vertex:gd,morphnormal_vertex:xd,morphtarget_pars_vertex:_d,morphtarget_vertex:yd,normal_fragment_begin:vd,normal_fragment_maps:bd,normal_pars_fragment:Md,normal_pars_vertex:Sd,normal_vertex:wd,normalmap_pars_fragment:Td,clearcoat_normal_fragment_begin:Ed,clearcoat_normal_fragment_maps:Ad,clearcoat_pars_fragment:Cd,iridescence_pars_fragment:Id,opaque_fragment:Pd,packing:Rd,premultiplied_alpha_fragment:Ld,project_vertex:Dd,dithering_fragment:Nd,dithering_pars_fragment:Ud,roughnessmap_fragment:Fd,roughnessmap_pars_fragment:Od,shadowmap_pars_fragment:Bd,shadowmap_pars_vertex:kd,shadowmap_vertex:zd,shadowmask_pars_fragment:Vd,skinbase_vertex:Hd,skinning_pars_vertex:Gd,skinning_vertex:Wd,skinnormal_vertex:Xd,specularmap_fragment:qd,specularmap_pars_fragment:Yd,tonemapping_fragment:Zd,tonemapping_pars_fragment:Jd,transmission_fragment:Kd,transmission_pars_fragment:jd,uv_pars_fragment:$d,uv_pars_vertex:Qd,uv_vertex:ep,worldpos_vertex:tp,background_vert:ip,background_frag:np,backgroundCube_vert:rp,backgroundCube_frag:sp,cube_vert:op,cube_frag:ap,depth_vert:lp,depth_frag:cp,distanceRGBA_vert:hp,distanceRGBA_frag:up,equirect_vert:fp,equirect_frag:dp,linedashed_vert:pp,linedashed_frag:mp,meshbasic_vert:gp,meshbasic_frag:xp,meshlambert_vert:_p,meshlambert_frag:yp,meshmatcap_vert:vp,meshmatcap_frag:bp,meshnormal_vert:Mp,meshnormal_frag:Sp,meshphong_vert:wp,meshphong_frag:Tp,meshphysical_vert:Ep,meshphysical_frag:Ap,meshtoon_vert:Cp,meshtoon_frag:Ip,points_vert:Pp,points_frag:Rp,shadow_vert:Lp,shadow_frag:Dp,sprite_vert:Np,sprite_frag:Up};var Ce={common:{diffuse:{value:new Pe(16777215)},opacity:{value:1},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}},specularmap:{specularMap:{value:null},specularMapTransform:{value:new Ye}},envmap:{envMap:{value:null},envMapRotation:{value:new Ye},flipEnvMap:{value:-1},reflectivity:{value:1},ior:{value:1.5},refractionRatio:{value:.98}},aomap:{aoMap:{value:null},aoMapIntensity:{value:1},aoMapTransform:{value:new Ye}},lightmap:{lightMap:{value:null},lightMapIntensity:{value:1},lightMapTransform:{value:new Ye}},bumpmap:{bumpMap:{value:null},bumpMapTransform:{value:new Ye},bumpScale:{value:1}},normalmap:{normalMap:{value:null},normalMapTransform:{value:new Ye},normalScale:{value:new ie(1,1)}},displacementmap:{displacementMap:{value:null},displacementMapTransform:{value:new Ye},displacementScale:{value:1},displacementBias:{value:0}},emissivemap:{emissiveMap:{value:null},emissiveMapTransform:{value:new Ye}},metalnessmap:{metalnessMap:{value:null},metalnessMapTransform:{value:new Ye}},roughnessmap:{roughnessMap:{value:null},roughnessMapTransform:{value:new Ye}},gradientmap:{gradientMap:{value:null}},fog:{fogDensity:{value:25e-5},fogNear:{value:1},fogFar:{value:2e3},fogColor:{value:new Pe(16777215)}},lights:{ambientLightColor:{value:[]},lightProbe:{value:[]},directionalLights:{value:[],properties:{direction:{},color:{}}},directionalLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},directionalShadowMap:{value:[]},directionalShadowMatrix:{value:[]},spotLights:{value:[],properties:{color:{},position:{},direction:{},distance:{},coneCos:{},penumbraCos:{},decay:{}}},spotLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{}}},spotLightMap:{value:[]},spotShadowMap:{value:[]},spotLightMatrix:{value:[]},pointLights:{value:[],properties:{color:{},position:{},decay:{},distance:{}}},pointLightShadows:{value:[],properties:{shadowIntensity:1,shadowBias:{},shadowNormalBias:{},shadowRadius:{},shadowMapSize:{},shadowCameraNear:{},shadowCameraFar:{}}},pointShadowMap:{value:[]},pointShadowMatrix:{value:[]},hemisphereLights:{value:[],properties:{direction:{},skyColor:{},groundColor:{}}},rectAreaLights:{value:[],properties:{color:{},position:{},width:{},height:{}}},ltc_1:{value:null},ltc_2:{value:null}},points:{diffuse:{value:new Pe(16777215)},opacity:{value:1},size:{value:1},scale:{value:1},map:{value:null},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0},uvTransform:{value:new Ye}},sprite:{diffuse:{value:new Pe(16777215)},opacity:{value:1},center:{value:new ie(.5,.5)},rotation:{value:0},map:{value:null},mapTransform:{value:new Ye},alphaMap:{value:null},alphaMapTransform:{value:new Ye},alphaTest:{value:0}}};var Ri={basic:{uniforms:li([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.fog]),vertexShader:nt.meshbasic_vert,fragmentShader:nt.meshbasic_frag},lambert:{uniforms:li([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Pe(0)}}]),vertexShader:nt.meshlambert_vert,fragmentShader:nt.meshlambert_frag},phong:{uniforms:li([Ce.common,Ce.specularmap,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,Ce.lights,{emissive:{value:new Pe(0)},specular:{value:new Pe(1118481)},shininess:{value:30}}]),vertexShader:nt.meshphong_vert,fragmentShader:nt.meshphong_frag},standard:{uniforms:li([Ce.common,Ce.envmap,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.roughnessmap,Ce.metalnessmap,Ce.fog,Ce.lights,{emissive:{value:new Pe(0)},roughness:{value:1},metalness:{value:0},envMapIntensity:{value:1}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag},toon:{uniforms:li([Ce.common,Ce.aomap,Ce.lightmap,Ce.emissivemap,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.gradientmap,Ce.fog,Ce.lights,{emissive:{value:new Pe(0)}}]),vertexShader:nt.meshtoon_vert,fragmentShader:nt.meshtoon_frag},matcap:{uniforms:li([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,Ce.fog,{matcap:{value:null}}]),vertexShader:nt.meshmatcap_vert,fragmentShader:nt.meshmatcap_frag},points:{uniforms:li([Ce.points,Ce.fog]),vertexShader:nt.points_vert,fragmentShader:nt.points_frag},dashed:{uniforms:li([Ce.common,Ce.fog,{scale:{value:1},dashSize:{value:1},totalSize:{value:2}}]),vertexShader:nt.linedashed_vert,fragmentShader:nt.linedashed_frag},depth:{uniforms:li([Ce.common,Ce.displacementmap]),vertexShader:nt.depth_vert,fragmentShader:nt.depth_frag},normal:{uniforms:li([Ce.common,Ce.bumpmap,Ce.normalmap,Ce.displacementmap,{opacity:{value:1}}]),vertexShader:nt.meshnormal_vert,fragmentShader:nt.meshnormal_frag},sprite:{uniforms:li([Ce.sprite,Ce.fog]),vertexShader:nt.sprite_vert,fragmentShader:nt.sprite_frag},background:{uniforms:{uvTransform:{value:new Ye},t2D:{value:null},backgroundIntensity:{value:1}},vertexShader:nt.background_vert,fragmentShader:nt.background_frag},backgroundCube:{uniforms:{envMap:{value:null},flipEnvMap:{value:-1},backgroundBlurriness:{value:0},backgroundIntensity:{value:1},backgroundRotation:{value:new Ye}},vertexShader:nt.backgroundCube_vert,fragmentShader:nt.backgroundCube_frag},cube:{uniforms:{tCube:{value:null},tFlip:{value:-1},opacity:{value:1}},vertexShader:nt.cube_vert,fragmentShader:nt.cube_frag},equirect:{uniforms:{tEquirect:{value:null}},vertexShader:nt.equirect_vert,fragmentShader:nt.equirect_frag},distanceRGBA:{uniforms:li([Ce.common,Ce.displacementmap,{referencePosition:{value:new R},nearDistance:{value:1},farDistance:{value:1e3}}]),vertexShader:nt.distanceRGBA_vert,fragmentShader:nt.distanceRGBA_frag},shadow:{uniforms:li([Ce.lights,Ce.fog,{color:{value:new Pe(0)},opacity:{value:1}}]),vertexShader:nt.shadow_vert,fragmentShader:nt.shadow_frag}};Ri.physical={uniforms:li([Ri.standard.uniforms,{clearcoat:{value:0},clearcoatMap:{value:null},clearcoatMapTransform:{value:new Ye},clearcoatNormalMap:{value:null},clearcoatNormalMapTransform:{value:new Ye},clearcoatNormalScale:{value:new ie(1,1)},clearcoatRoughness:{value:0},clearcoatRoughnessMap:{value:null},clearcoatRoughnessMapTransform:{value:new Ye},dispersion:{value:0},iridescence:{value:0},iridescenceMap:{value:null},iridescenceMapTransform:{value:new Ye},iridescenceIOR:{value:1.3},iridescenceThicknessMinimum:{value:100},iridescenceThicknessMaximum:{value:400},iridescenceThicknessMap:{value:null},iridescenceThicknessMapTransform:{value:new Ye},sheen:{value:0},sheenColor:{value:new Pe(0)},sheenColorMap:{value:null},sheenColorMapTransform:{value:new Ye},sheenRoughness:{value:1},sheenRoughnessMap:{value:null},sheenRoughnessMapTransform:{value:new Ye},transmission:{value:0},transmissionMap:{value:null},transmissionMapTransform:{value:new Ye},transmissionSamplerSize:{value:new ie},transmissionSamplerMap:{value:null},thickness:{value:0},thicknessMap:{value:null},thicknessMapTransform:{value:new Ye},attenuationDistance:{value:0},attenuationColor:{value:new Pe(0)},specularColor:{value:new Pe(1,1,1)},specularColorMap:{value:null},specularColorMapTransform:{value:new Ye},specularIntensity:{value:1},specularIntensityMap:{value:null},specularIntensityMapTransform:{value:new Ye},anisotropyVector:{value:new ie},anisotropyMap:{value:null},anisotropyMapTransform:{value:new Ye}}]),vertexShader:nt.meshphysical_vert,fragmentShader:nt.meshphysical_frag};var ll={r:0,b:0,g:0},Ir=new Wt,q_=new Je;function Fp(n,e,t,i,r,s,o){let a=new Pe(0),l=s===!0?0:1,c,h,u=null,d=0,f=null;function g(S){let _=S.isScene===!0?S.background:null;return _&&_.isTexture&&(_=(S.backgroundBlurriness>0?t:e).get(_)),_}function x(S){let _=!1,C=g(S);C===null?p(a,l):C&&C.isColor&&(p(C,1),_=!0);let M=n.xr.getEnvironmentBlendMode();M==="additive"?i.buffers.color.setClear(0,0,0,1,o):M==="alpha-blend"&&i.buffers.color.setClear(0,0,0,0,o),(n.autoClear||_)&&(i.buffers.depth.setTest(!0),i.buffers.depth.setMask(!0),i.buffers.color.setMask(!0),n.clear(n.autoClearColor,n.autoClearDepth,n.autoClearStencil))}function m(S,_){let C=g(_);C&&(C.isCubeTexture||C.mapping===dn)?(h===void 0&&(h=new gt(new sn(1,1,1),new jt({name:"BackgroundCubeMaterial",uniforms:An(Ri.backgroundCube.uniforms),vertexShader:Ri.backgroundCube.vertexShader,fragmentShader:Ri.backgroundCube.fragmentShader,side:It,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),h.geometry.deleteAttribute("normal"),h.geometry.deleteAttribute("uv"),h.onBeforeRender=function(M,A,E){this.matrixWorld.copyPosition(E.matrixWorld)},Object.defineProperty(h.material,"envMap",{get:function(){return this.uniforms.envMap.value}}),r.update(h)),Ir.copy(_.backgroundRotation),Ir.x*=-1,Ir.y*=-1,Ir.z*=-1,C.isCubeTexture&&C.isRenderTargetTexture===!1&&(Ir.y*=-1,Ir.z*=-1),h.material.uniforms.envMap.value=C,h.material.uniforms.flipEnvMap.value=C.isCubeTexture&&C.isRenderTargetTexture===!1?-1:1,h.material.uniforms.backgroundBlurriness.value=_.backgroundBlurriness,h.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,h.material.uniforms.backgroundRotation.value.setFromMatrix4(q_.makeRotationFromEuler(Ir)),h.material.toneMapped=st.getTransfer(C.colorSpace)!==ht,(u!==C||d!==C.version||f!==n.toneMapping)&&(h.material.needsUpdate=!0,u=C,d=C.version,f=n.toneMapping),h.layers.enableAll(),S.unshift(h,h.geometry,h.material,0,0,null)):C&&C.isTexture&&(c===void 0&&(c=new gt(new Rn(2,2),new jt({name:"BackgroundMaterial",uniforms:An(Ri.background.uniforms),vertexShader:Ri.background.vertexShader,fragmentShader:Ri.background.fragmentShader,side:wi,depthTest:!1,depthWrite:!1,fog:!1,allowOverride:!1})),c.geometry.deleteAttribute("normal"),Object.defineProperty(c.material,"map",{get:function(){return this.uniforms.t2D.value}}),r.update(c)),c.material.uniforms.t2D.value=C,c.material.uniforms.backgroundIntensity.value=_.backgroundIntensity,c.material.toneMapped=st.getTransfer(C.colorSpace)!==ht,C.matrixAutoUpdate===!0&&C.updateMatrix(),c.material.uniforms.uvTransform.value.copy(C.matrix),(u!==C||d!==C.version||f!==n.toneMapping)&&(c.material.needsUpdate=!0,u=C,d=C.version,f=n.toneMapping),c.layers.enableAll(),S.unshift(c,c.geometry,c.material,0,0,null))}function p(S,_){S.getRGB(ll,Ha(n)),i.buffers.color.setClear(ll.r,ll.g,ll.b,_,o)}function T(){h!==void 0&&(h.geometry.dispose(),h.material.dispose(),h=void 0),c!==void 0&&(c.geometry.dispose(),c.material.dispose(),c=void 0)}return{getClearColor:function(){return a},setClearColor:function(S,_=1){a.set(S),l=_,p(a,l)},getClearAlpha:function(){return l},setClearAlpha:function(S){l=S,p(a,l)},render:x,addToRenderList:m,dispose:T}}function Op(n,e){let t=n.getParameter(n.MAX_VERTEX_ATTRIBS),i={},r=d(null),s=r,o=!1;function a(v,P,N,F,z){let V=!1,q=u(F,N,P);s!==q&&(s=q,c(s.object)),V=f(v,F,N,z),V&&g(v,F,N,z),z!==null&&e.update(z,n.ELEMENT_ARRAY_BUFFER),(V||o)&&(o=!1,_(v,P,N,F),z!==null&&n.bindBuffer(n.ELEMENT_ARRAY_BUFFER,e.get(z).buffer))}function l(){return n.createVertexArray()}function c(v){return n.bindVertexArray(v)}function h(v){return n.deleteVertexArray(v)}function u(v,P,N){let F=N.wireframe===!0,z=i[v.id];z===void 0&&(z={},i[v.id]=z);let V=z[P.id];V===void 0&&(V={},z[P.id]=V);let q=V[F];return q===void 0&&(q=d(l()),V[F]=q),q}function d(v){let P=[],N=[],F=[];for(let z=0;z<t;z++)P[z]=0,N[z]=0,F[z]=0;return{geometry:null,program:null,wireframe:!1,newAttributes:P,enabledAttributes:N,attributeDivisors:F,object:v,attributes:{},index:null}}function f(v,P,N,F){let z=s.attributes,V=P.attributes,q=0,X=N.getAttributes();for(let W in X)if(X[W].location>=0){let oe=z[W],Me=V[W];if(Me===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(Me=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(Me=v.instanceColor)),oe===void 0||oe.attribute!==Me||Me&&oe.data!==Me.data)return!0;q++}return s.attributesNum!==q||s.index!==F}function g(v,P,N,F){let z={},V=P.attributes,q=0,X=N.getAttributes();for(let W in X)if(X[W].location>=0){let oe=V[W];oe===void 0&&(W==="instanceMatrix"&&v.instanceMatrix&&(oe=v.instanceMatrix),W==="instanceColor"&&v.instanceColor&&(oe=v.instanceColor));let Me={};Me.attribute=oe,oe&&oe.data&&(Me.data=oe.data),z[W]=Me,q++}s.attributes=z,s.attributesNum=q,s.index=F}function x(){let v=s.newAttributes;for(let P=0,N=v.length;P<N;P++)v[P]=0}function m(v){p(v,0)}function p(v,P){let N=s.newAttributes,F=s.enabledAttributes,z=s.attributeDivisors;N[v]=1,F[v]===0&&(n.enableVertexAttribArray(v),F[v]=1),z[v]!==P&&(n.vertexAttribDivisor(v,P),z[v]=P)}function T(){let v=s.newAttributes,P=s.enabledAttributes;for(let N=0,F=P.length;N<F;N++)P[N]!==v[N]&&(n.disableVertexAttribArray(N),P[N]=0)}function S(v,P,N,F,z,V,q){q===!0?n.vertexAttribIPointer(v,P,N,z,V):n.vertexAttribPointer(v,P,N,F,z,V)}function _(v,P,N,F){x();let z=F.attributes,V=N.getAttributes(),q=P.defaultAttributeValues;for(let X in V){let W=V[X];if(W.location>=0){let Y=z[X];if(Y===void 0&&(X==="instanceMatrix"&&v.instanceMatrix&&(Y=v.instanceMatrix),X==="instanceColor"&&v.instanceColor&&(Y=v.instanceColor)),Y!==void 0){let oe=Y.normalized,Me=Y.itemSize,Ae=e.get(Y);if(Ae===void 0)continue;let ue=Ae.buffer,He=Ae.type,Re=Ae.bytesPerElement,te=He===n.INT||He===n.UNSIGNED_INT||Y.gpuType===Hr;if(Y.isInterleavedBufferAttribute){let ce=Y.data,re=ce.stride,xe=Y.offset;if(ce.isInstancedInterleavedBuffer){for(let _e=0;_e<W.locationSize;_e++)p(W.location+_e,ce.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=ce.meshPerAttribute*ce.count)}else for(let _e=0;_e<W.locationSize;_e++)m(W.location+_e);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let _e=0;_e<W.locationSize;_e++)S(W.location+_e,Me/W.locationSize,He,oe,re*Re,(xe+Me/W.locationSize*_e)*Re,te)}else{if(Y.isInstancedBufferAttribute){for(let ce=0;ce<W.locationSize;ce++)p(W.location+ce,Y.meshPerAttribute);v.isInstancedMesh!==!0&&F._maxInstanceCount===void 0&&(F._maxInstanceCount=Y.meshPerAttribute*Y.count)}else for(let ce=0;ce<W.locationSize;ce++)m(W.location+ce);n.bindBuffer(n.ARRAY_BUFFER,ue);for(let ce=0;ce<W.locationSize;ce++)S(W.location+ce,Me/W.locationSize,He,oe,Me*Re,Me/W.locationSize*ce*Re,te)}}else if(q!==void 0){let oe=q[X];if(oe!==void 0)switch(oe.length){case 2:n.vertexAttrib2fv(W.location,oe);break;case 3:n.vertexAttrib3fv(W.location,oe);break;case 4:n.vertexAttrib4fv(W.location,oe);break;default:n.vertexAttrib1fv(W.location,oe)}}}}T()}function C(){E();for(let v in i){let P=i[v];for(let N in P){let F=P[N];for(let z in F)h(F[z].object),delete F[z];delete P[N]}delete i[v]}}function M(v){if(i[v.id]===void 0)return;let P=i[v.id];for(let N in P){let F=P[N];for(let z in F)h(F[z].object),delete F[z];delete P[N]}delete i[v.id]}function A(v){for(let P in i){let N=i[P];if(N[v.id]===void 0)continue;let F=N[v.id];for(let z in F)h(F[z].object),delete F[z];delete N[v.id]}}function E(){b(),o=!0,s!==r&&(s=r,c(s.object))}function b(){r.geometry=null,r.program=null,r.wireframe=!1}return{setup:a,reset:E,resetDefaultState:b,dispose:C,releaseStatesOfGeometry:M,releaseStatesOfProgram:A,initAttributes:x,enableAttribute:m,disableUnusedAttributes:T}}function Bp(n,e,t){let i;function r(c){i=c}function s(c,h){n.drawArrays(i,c,h),t.update(h,i,1)}function o(c,h,u){u!==0&&(n.drawArraysInstanced(i,c,h,u),t.update(h,i,u))}function a(c,h,u){if(u===0)return;e.get("WEBGL_multi_draw").multiDrawArraysWEBGL(i,c,0,h,0,u);let f=0;for(let g=0;g<u;g++)f+=h[g];t.update(f,i,1)}function l(c,h,u,d){if(u===0)return;let f=e.get("WEBGL_multi_draw");if(f===null)for(let g=0;g<c.length;g++)o(c[g],h[g],d[g]);else{f.multiDrawArraysInstancedWEBGL(i,c,0,h,0,d,0,u);let g=0;for(let x=0;x<u;x++)g+=h[x]*d[x];t.update(g,i,1)}}this.setMode=r,this.render=s,this.renderInstances=o,this.renderMultiDraw=a,this.renderMultiDrawInstances=l}function kp(n,e,t,i){let r;function s(){if(r!==void 0)return r;if(e.has("EXT_texture_filter_anisotropic")===!0){let A=e.get("EXT_texture_filter_anisotropic");r=n.getParameter(A.MAX_TEXTURE_MAX_ANISOTROPY_EXT)}else r=0;return r}function o(A){return!(A!==Dt&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_FORMAT))}function a(A){let E=A===rn&&(e.has("EXT_color_buffer_half_float")||e.has("EXT_color_buffer_float"));return!(A!==Zt&&i.convert(A)!==n.getParameter(n.IMPLEMENTATION_COLOR_READ_TYPE)&&A!==Jt&&!E)}function l(A){if(A==="highp"){if(n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.HIGH_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.HIGH_FLOAT).precision>0)return"highp";A="mediump"}return A==="mediump"&&n.getShaderPrecisionFormat(n.VERTEX_SHADER,n.MEDIUM_FLOAT).precision>0&&n.getShaderPrecisionFormat(n.FRAGMENT_SHADER,n.MEDIUM_FLOAT).precision>0?"mediump":"lowp"}let c=t.precision!==void 0?t.precision:"highp",h=l(c);h!==c&&(console.warn("THREE.WebGLRenderer:",c,"not supported, using",h,"instead."),c=h);let u=t.logarithmicDepthBuffer===!0,d=t.reversedDepthBuffer===!0&&e.has("EXT_clip_control"),f=n.getParameter(n.MAX_TEXTURE_IMAGE_UNITS),g=n.getParameter(n.MAX_VERTEX_TEXTURE_IMAGE_UNITS),x=n.getParameter(n.MAX_TEXTURE_SIZE),m=n.getParameter(n.MAX_CUBE_MAP_TEXTURE_SIZE),p=n.getParameter(n.MAX_VERTEX_ATTRIBS),T=n.getParameter(n.MAX_VERTEX_UNIFORM_VECTORS),S=n.getParameter(n.MAX_VARYING_VECTORS),_=n.getParameter(n.MAX_FRAGMENT_UNIFORM_VECTORS),C=g>0,M=n.getParameter(n.MAX_SAMPLES);return{isWebGL2:!0,getMaxAnisotropy:s,getMaxPrecision:l,textureFormatReadable:o,textureTypeReadable:a,precision:c,logarithmicDepthBuffer:u,reversedDepthBuffer:d,maxTextures:f,maxVertexTextures:g,maxTextureSize:x,maxCubemapSize:m,maxAttributes:p,maxVertexUniforms:T,maxVaryings:S,maxFragmentUniforms:_,vertexTextures:C,maxSamples:M}}function zp(n){let e=this,t=null,i=0,r=!1,s=!1,o=new _i,a=new Ye,l={value:null,needsUpdate:!1};this.uniform=l,this.numPlanes=0,this.numIntersection=0,this.init=function(u,d){let f=u.length!==0||d||i!==0||r;return r=d,i=u.length,f},this.beginShadows=function(){s=!0,h(null)},this.endShadows=function(){s=!1},this.setGlobalState=function(u,d){t=h(u,d,0)},this.setState=function(u,d,f){let g=u.clippingPlanes,x=u.clipIntersection,m=u.clipShadows,p=n.get(u);if(!r||g===null||g.length===0||s&&!m)s?h(null):c();else{let T=s?0:i,S=T*4,_=p.clippingState||null;l.value=_,_=h(g,d,S,f);for(let C=0;C!==S;++C)_[C]=t[C];p.clippingState=_,this.numIntersection=x?this.numPlanes:0,this.numPlanes+=T}};function c(){l.value!==t&&(l.value=t,l.needsUpdate=i>0),e.numPlanes=i,e.numIntersection=0}function h(u,d,f,g){let x=u!==null?u.length:0,m=null;if(x!==0){if(m=l.value,g!==!0||m===null){let p=f+x*4,T=d.matrixWorldInverse;a.getNormalMatrix(T),(m===null||m.length<p)&&(m=new Float32Array(p));for(let S=0,_=f;S!==x;++S,_+=4)o.copy(u[S]).applyMatrix4(T,a),o.normal.toArray(m,_),m[_+3]=o.constant}l.value=m,l.needsUpdate=!0}return e.numPlanes=x,e.numIntersection=0,m}}function Vp(n){let e=new WeakMap;function t(o,a){return a===zr?o.mapping=Ti:a===Vr&&(o.mapping=qi),o}function i(o){if(o&&o.isTexture){let a=o.mapping;if(a===zr||a===Vr)if(e.has(o)){let l=e.get(o).texture;return t(l,o.mapping)}else{let l=o.image;if(l&&l.height>0){let c=new Eo(l.height);return c.fromEquirectangularTexture(n,o),e.set(o,c),o.addEventListener("dispose",r),t(c.texture,o.mapping)}else return null}}return o}function r(o){let a=o.target;a.removeEventListener("dispose",r);let l=e.get(a);l!==void 0&&(e.delete(a),l.dispose())}function s(){e=new WeakMap}return{get:i,dispose:s}}var Rs=4,Hp=[.125,.215,.35,.446,.526,.582],Rr=20,Tc=new $n,Gp=new Pe,Ec=null,Ac=0,Cc=0,Ic=!1,Pr=(1+Math.sqrt(5))/2,Ps=1/Pr,Wp=[new R(-Pr,Ps,0),new R(Pr,Ps,0),new R(-Ps,0,Pr),new R(Ps,0,Pr),new R(0,Pr,-Ps),new R(0,Pr,Ps),new R(-1,1,-1),new R(1,1,-1),new R(-1,1,1),new R(1,1,1)],Y_=new R,Ls=class{constructor(e){this._renderer=e,this._pingPongRenderTarget=null,this._lodMax=0,this._cubeSize=0,this._lodPlanes=[],this._sizeLods=[],this._sigmas=[],this._blurMaterial=null,this._cubemapMaterial=null,this._equirectMaterial=null,this._compileMaterial(this._blurMaterial)}fromScene(e,t=0,i=.1,r=100,s={}){let{size:o=256,position:a=Y_}=s;Ec=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1,this._setSize(o);let l=this._allocateTargets();return l.depthBuffer=!0,this._sceneToCubeUV(e,i,r,l,a),t>0&&this._blur(l,0,0,t),this._applyPMREM(l),this._cleanup(l),l}fromEquirectangular(e,t=null){return this._fromTexture(e,t)}fromCubemap(e,t=null){return this._fromTexture(e,t)}compileCubemapShader(){this._cubemapMaterial===null&&(this._cubemapMaterial=Yp(),this._compileMaterial(this._cubemapMaterial))}compileEquirectangularShader(){this._equirectMaterial===null&&(this._equirectMaterial=qp(),this._compileMaterial(this._equirectMaterial))}dispose(){this._dispose(),this._cubemapMaterial!==null&&this._cubemapMaterial.dispose(),this._equirectMaterial!==null&&this._equirectMaterial.dispose()}_setSize(e){this._lodMax=Math.floor(Math.log2(e)),this._cubeSize=Math.pow(2,this._lodMax)}_dispose(){this._blurMaterial!==null&&this._blurMaterial.dispose(),this._pingPongRenderTarget!==null&&this._pingPongRenderTarget.dispose();for(let e=0;e<this._lodPlanes.length;e++)this._lodPlanes[e].dispose()}_cleanup(e){this._renderer.setRenderTarget(Ec,Ac,Cc),this._renderer.xr.enabled=Ic,e.scissorTest=!1,cl(e,0,0,e.width,e.height)}_fromTexture(e,t){e.mapping===Ti||e.mapping===qi?this._setSize(e.image.length===0?16:e.image[0].width||e.image[0].image.width):this._setSize(e.image.width/4),Ec=this._renderer.getRenderTarget(),Ac=this._renderer.getActiveCubeFace(),Cc=this._renderer.getActiveMipmapLevel(),Ic=this._renderer.xr.enabled,this._renderer.xr.enabled=!1;let i=t||this._allocateTargets();return this._textureToCubeUV(e,i),this._applyPMREM(i),this._cleanup(i),i}_allocateTargets(){let e=3*Math.max(this._cubeSize,112),t=4*this._cubeSize,i={magFilter:Bt,minFilter:Bt,generateMipmaps:!1,type:rn,format:Dt,colorSpace:Yi,depthBuffer:!1},r=Xp(e,t,i);if(this._pingPongRenderTarget===null||this._pingPongRenderTarget.width!==e||this._pingPongRenderTarget.height!==t){this._pingPongRenderTarget!==null&&this._dispose(),this._pingPongRenderTarget=Xp(e,t,i);let{_lodMax:s}=this;({sizeLods:this._sizeLods,lodPlanes:this._lodPlanes,sigmas:this._sigmas}=Z_(s)),this._blurMaterial=J_(s,e,t)}return r}_compileMaterial(e){let t=new gt(this._lodPlanes[0],e);this._renderer.compile(t,Tc)}_sceneToCubeUV(e,t,i,r,s){let l=new Et(90,1,t,i),c=[1,-1,1,1,1,1],h=[1,1,1,-1,-1,-1],u=this._renderer,d=u.autoClear,f=u.toneMapping;u.getClearColor(Gp),u.toneMapping=Oi,u.autoClear=!1,u.state.buffers.depth.getReversed()&&(u.setRenderTarget(r),u.clearDepth(),u.setRenderTarget(null));let x=new zi({name:"PMREM.Background",side:It,depthWrite:!1,depthTest:!1}),m=new gt(new sn,x),p=!1,T=e.background;T?T.isColor&&(x.color.copy(T),e.background=null,p=!0):(x.color.copy(Gp),p=!0);for(let S=0;S<6;S++){let _=S%3;_===0?(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x+h[S],s.y,s.z)):_===1?(l.up.set(0,0,c[S]),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y+h[S],s.z)):(l.up.set(0,c[S],0),l.position.set(s.x,s.y,s.z),l.lookAt(s.x,s.y,s.z+h[S]));let C=this._cubeSize;cl(r,_*C,S>2?C:0,C,C),u.setRenderTarget(r),p&&u.render(m,l),u.render(e,l)}m.geometry.dispose(),m.material.dispose(),u.toneMapping=f,u.autoClear=d,e.background=T}_textureToCubeUV(e,t){let i=this._renderer,r=e.mapping===Ti||e.mapping===qi;r?(this._cubemapMaterial===null&&(this._cubemapMaterial=Yp()),this._cubemapMaterial.uniforms.flipEnvMap.value=e.isRenderTargetTexture===!1?-1:1):this._equirectMaterial===null&&(this._equirectMaterial=qp());let s=r?this._cubemapMaterial:this._equirectMaterial,o=new gt(this._lodPlanes[0],s),a=s.uniforms;a.envMap.value=e;let l=this._cubeSize;cl(t,0,0,3*l,2*l),i.setRenderTarget(t),i.render(o,Tc)}_applyPMREM(e){let t=this._renderer,i=t.autoClear;t.autoClear=!1;let r=this._lodPlanes.length;for(let s=1;s<r;s++){let o=Math.sqrt(this._sigmas[s]*this._sigmas[s]-this._sigmas[s-1]*this._sigmas[s-1]),a=Wp[(r-s-1)%Wp.length];this._blur(e,s-1,s,o,a)}t.autoClear=i}_blur(e,t,i,r,s){let o=this._pingPongRenderTarget;this._halfBlur(e,o,t,i,r,"latitudinal",s),this._halfBlur(o,e,i,i,r,"longitudinal",s)}_halfBlur(e,t,i,r,s,o,a){let l=this._renderer,c=this._blurMaterial;o!=="latitudinal"&&o!=="longitudinal"&&console.error("blur direction must be either latitudinal or longitudinal!");let h=3,u=new gt(this._lodPlanes[r],c),d=c.uniforms,f=this._sizeLods[i]-1,g=isFinite(s)?Math.PI/(2*f):2*Math.PI/(2*Rr-1),x=s/g,m=isFinite(s)?1+Math.floor(h*x):Rr;m>Rr&&console.warn(`sigmaRadians, ${s}, is too large and will clip, as it requested ${m} samples when the maximum is set to ${Rr}`);let p=[],T=0;for(let A=0;A<Rr;++A){let E=A/x,b=Math.exp(-E*E/2);p.push(b),A===0?T+=b:A<m&&(T+=2*b)}for(let A=0;A<p.length;A++)p[A]=p[A]/T;d.envMap.value=e.texture,d.samples.value=m,d.weights.value=p,d.latitudinal.value=o==="latitudinal",a&&(d.poleAxis.value=a);let{_lodMax:S}=this;d.dTheta.value=g,d.mipInt.value=S-i;let _=this._sizeLods[r],C=3*_*(r>S-Rs?r-S+Rs:0),M=4*(this._cubeSize-_);cl(t,C,M,3*_,2*_),l.setRenderTarget(t),l.render(u,Tc)}};function Z_(n){let e=[],t=[],i=[],r=n,s=n-Rs+1+Hp.length;for(let o=0;o<s;o++){let a=Math.pow(2,r);t.push(a);let l=1/a;o>n-Rs?l=Hp[o-n+Rs-1]:o===0&&(l=0),i.push(l);let c=1/(a-2),h=-c,u=1+c,d=[h,h,u,h,u,u,h,h,u,u,h,u],f=6,g=6,x=3,m=2,p=1,T=new Float32Array(x*g*f),S=new Float32Array(m*g*f),_=new Float32Array(p*g*f);for(let M=0;M<f;M++){let A=M%3*2/3-1,E=M>2?0:-1,b=[A,E,0,A+2/3,E,0,A+2/3,E+1,0,A,E,0,A+2/3,E+1,0,A,E+1,0];T.set(b,x*g*M),S.set(d,m*g*M);let v=[M,M,M,M,M,M];_.set(v,p*g*M)}let C=new Ke;C.setAttribute("position",new mt(T,x)),C.setAttribute("uv",new mt(S,m)),C.setAttribute("faceIndex",new mt(_,p)),e.push(C),r>Rs&&r--}return{lodPlanes:e,sizeLods:t,sigmas:i}}function Xp(n,e,t){let i=new ii(n,e,t);return i.texture.mapping=dn,i.texture.name="PMREM.cubeUv",i.scissorTest=!0,i}function cl(n,e,t,i,r){n.viewport.set(e,t,i,r),n.scissor.set(e,t,i,r)}function J_(n,e,t){let i=new Float32Array(Rr),r=new R(0,1,0);return new jt({name:"SphericalGaussianBlur",defines:{n:Rr,CUBEUV_TEXEL_WIDTH:1/e,CUBEUV_TEXEL_HEIGHT:1/t,CUBEUV_MAX_MIP:`${n}.0`},uniforms:{envMap:{value:null},samples:{value:1},weights:{value:i},latitudinal:{value:!1},dTheta:{value:0},mipInt:{value:0},poleAxis:{value:r}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function qp(){return new jt({name:"EquirectangularToCubeUV",uniforms:{envMap:{value:null}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Yp(){return new jt({name:"CubemapToCubeUV",uniforms:{envMap:{value:null},flipEnvMap:{value:-1}},vertexShader:Pc(),fragmentShader:`

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,blending:Fi,depthTest:!1,depthWrite:!1})}function Pc(){return`

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`}function Zp(n){let e=new WeakMap,t=null;function i(a){if(a&&a.isTexture){let l=a.mapping,c=l===zr||l===Vr,h=l===Ti||l===qi;if(c||h){let u=e.get(a),d=u!==void 0?u.texture.pmremVersion:0;if(a.isRenderTargetTexture&&a.pmremVersion!==d)return t===null&&(t=new Ls(n)),u=c?t.fromEquirectangular(a,u):t.fromCubemap(a,u),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),u.texture;if(u!==void 0)return u.texture;{let f=a.image;return c&&f&&f.height>0||h&&f&&r(f)?(t===null&&(t=new Ls(n)),u=c?t.fromEquirectangular(a):t.fromCubemap(a),u.texture.pmremVersion=a.pmremVersion,e.set(a,u),a.addEventListener("dispose",s),u.texture):null}}}return a}function r(a){let l=0,c=6;for(let h=0;h<c;h++)a[h]!==void 0&&l++;return l===c}function s(a){let l=a.target;l.removeEventListener("dispose",s);let c=e.get(l);c!==void 0&&(e.delete(l),c.dispose())}function o(){e=new WeakMap,t!==null&&(t.dispose(),t=null)}return{get:i,dispose:o}}function Jp(n){let e={};function t(i){if(e[i]!==void 0)return e[i];let r;switch(i){case"WEBGL_depth_texture":r=n.getExtension("WEBGL_depth_texture")||n.getExtension("MOZ_WEBGL_depth_texture")||n.getExtension("WEBKIT_WEBGL_depth_texture");break;case"EXT_texture_filter_anisotropic":r=n.getExtension("EXT_texture_filter_anisotropic")||n.getExtension("MOZ_EXT_texture_filter_anisotropic")||n.getExtension("WEBKIT_EXT_texture_filter_anisotropic");break;case"WEBGL_compressed_texture_s3tc":r=n.getExtension("WEBGL_compressed_texture_s3tc")||n.getExtension("MOZ_WEBGL_compressed_texture_s3tc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");break;case"WEBGL_compressed_texture_pvrtc":r=n.getExtension("WEBGL_compressed_texture_pvrtc")||n.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");break;default:r=n.getExtension(i)}return e[i]=r,r}return{has:function(i){return t(i)!==null},init:function(){t("EXT_color_buffer_float"),t("WEBGL_clip_cull_distance"),t("OES_texture_float_linear"),t("EXT_color_buffer_half_float"),t("WEBGL_multisampled_render_to_texture"),t("WEBGL_render_shared_exponent")},get:function(i){let r=t(i);return r===null&&Hn("THREE.WebGLRenderer: "+i+" extension not supported."),r}}}function Kp(n,e,t,i){let r={},s=new WeakMap;function o(u){let d=u.target;d.index!==null&&e.remove(d.index);for(let g in d.attributes)e.remove(d.attributes[g]);d.removeEventListener("dispose",o),delete r[d.id];let f=s.get(d);f&&(e.remove(f),s.delete(d)),i.releaseStatesOfGeometry(d),d.isInstancedBufferGeometry===!0&&delete d._maxInstanceCount,t.memory.geometries--}function a(u,d){return r[d.id]===!0||(d.addEventListener("dispose",o),r[d.id]=!0,t.memory.geometries++),d}function l(u){let d=u.attributes;for(let f in d)e.update(d[f],n.ARRAY_BUFFER)}function c(u){let d=[],f=u.index,g=u.attributes.position,x=0;if(f!==null){let T=f.array;x=f.version;for(let S=0,_=T.length;S<_;S+=3){let C=T[S+0],M=T[S+1],A=T[S+2];d.push(C,M,M,A,A,C)}}else if(g!==void 0){let T=g.array;x=g.version;for(let S=0,_=T.length/3-1;S<_;S+=3){let C=S+0,M=S+1,A=S+2;d.push(C,M,M,A,A,C)}}else return;let m=new(Ta(d)?hs:cs)(d,1);m.version=x;let p=s.get(u);p&&e.remove(p),s.set(u,m)}function h(u){let d=s.get(u);if(d){let f=u.index;f!==null&&d.version<f.version&&c(u)}else c(u);return s.get(u)}return{get:a,update:l,getWireframeAttribute:h}}function jp(n,e,t){let i;function r(d){i=d}let s,o;function a(d){s=d.type,o=d.bytesPerElement}function l(d,f){n.drawElements(i,f,s,d*o),t.update(f,i,1)}function c(d,f,g){g!==0&&(n.drawElementsInstanced(i,f,s,d*o,g),t.update(f,i,g))}function h(d,f,g){if(g===0)return;e.get("WEBGL_multi_draw").multiDrawElementsWEBGL(i,f,0,s,d,0,g);let m=0;for(let p=0;p<g;p++)m+=f[p];t.update(m,i,1)}function u(d,f,g,x){if(g===0)return;let m=e.get("WEBGL_multi_draw");if(m===null)for(let p=0;p<d.length;p++)c(d[p]/o,f[p],x[p]);else{m.multiDrawElementsInstancedWEBGL(i,f,0,s,d,0,x,0,g);let p=0;for(let T=0;T<g;T++)p+=f[T]*x[T];t.update(p,i,1)}}this.setMode=r,this.setIndex=a,this.render=l,this.renderInstances=c,this.renderMultiDraw=h,this.renderMultiDrawInstances=u}function $p(n){let e={geometries:0,textures:0},t={frame:0,calls:0,triangles:0,points:0,lines:0};function i(s,o,a){switch(t.calls++,o){case n.TRIANGLES:t.triangles+=a*(s/3);break;case n.LINES:t.lines+=a*(s/2);break;case n.LINE_STRIP:t.lines+=a*(s-1);break;case n.LINE_LOOP:t.lines+=a*s;break;case n.POINTS:t.points+=a*s;break;default:console.error("THREE.WebGLInfo: Unknown draw mode:",o);break}}function r(){t.calls=0,t.triangles=0,t.points=0,t.lines=0}return{memory:e,render:t,programs:null,autoReset:!0,reset:r,update:i}}function Qp(n,e,t){let i=new WeakMap,r=new ut;function s(o,a,l){let c=o.morphTargetInfluences,h=a.morphAttributes.position||a.morphAttributes.normal||a.morphAttributes.color,u=h!==void 0?h.length:0,d=i.get(a);if(d===void 0||d.count!==u){let b=function(){A.dispose(),i.delete(a),a.removeEventListener("dispose",b)};d!==void 0&&d.texture.dispose();let f=a.morphAttributes.position!==void 0,g=a.morphAttributes.normal!==void 0,x=a.morphAttributes.color!==void 0,m=a.morphAttributes.position||[],p=a.morphAttributes.normal||[],T=a.morphAttributes.color||[],S=0;f===!0&&(S=1),g===!0&&(S=2),x===!0&&(S=3);let _=a.attributes.position.count*S,C=1;_>e.maxTextureSize&&(C=Math.ceil(_/e.maxTextureSize),_=e.maxTextureSize);let M=new Float32Array(_*C*4*u),A=new Gn(M,_,C,u);A.type=Jt,A.needsUpdate=!0;let E=S*4;for(let v=0;v<u;v++){let P=m[v],N=p[v],F=T[v],z=_*C*4*v;for(let V=0;V<P.count;V++){let q=V*E;f===!0&&(r.fromBufferAttribute(P,V),M[z+q+0]=r.x,M[z+q+1]=r.y,M[z+q+2]=r.z,M[z+q+3]=0),g===!0&&(r.fromBufferAttribute(N,V),M[z+q+4]=r.x,M[z+q+5]=r.y,M[z+q+6]=r.z,M[z+q+7]=0),x===!0&&(r.fromBufferAttribute(F,V),M[z+q+8]=r.x,M[z+q+9]=r.y,M[z+q+10]=r.z,M[z+q+11]=F.itemSize===4?r.w:1)}}d={count:u,texture:A,size:new ie(_,C)},i.set(a,d),a.addEventListener("dispose",b)}if(o.isInstancedMesh===!0&&o.morphTexture!==null)l.getUniforms().setValue(n,"morphTexture",o.morphTexture,t);else{let f=0;for(let x=0;x<c.length;x++)f+=c[x];let g=a.morphTargetsRelative?1:1-f;l.getUniforms().setValue(n,"morphTargetBaseInfluence",g),l.getUniforms().setValue(n,"morphTargetInfluences",c)}l.getUniforms().setValue(n,"morphTargetsTexture",d.texture,t),l.getUniforms().setValue(n,"morphTargetsTextureSize",d.size)}return{update:s}}function em(n,e,t,i){let r=new WeakMap;function s(l){let c=i.render.frame,h=l.geometry,u=e.get(l,h);if(r.get(u)!==c&&(e.update(u),r.set(u,c)),l.isInstancedMesh&&(l.hasEventListener("dispose",a)===!1&&l.addEventListener("dispose",a),r.get(l)!==c&&(t.update(l.instanceMatrix,n.ARRAY_BUFFER),l.instanceColor!==null&&t.update(l.instanceColor,n.ARRAY_BUFFER),r.set(l,c))),l.isSkinnedMesh){let d=l.skeleton;r.get(d)!==c&&(d.update(),r.set(d,c))}return u}function o(){r=new WeakMap}function a(l){let c=l.target;c.removeEventListener("dispose",a),t.remove(c.instanceMatrix),c.instanceColor!==null&&t.remove(c.instanceColor)}return{update:s,dispose:o}}var lm=new _t,tm=new vr(1,1),cm=new Gn,hm=new pr,um=new Cn,im=[],nm=[],rm=new Float32Array(16),sm=new Float32Array(9),om=new Float32Array(4);function Ds(n,e,t){let i=n[0];if(i<=0||i>0)return n;let r=e*t,s=im[r];if(s===void 0&&(s=new Float32Array(r),im[r]=s),e!==0){i.toArray(s,0);for(let o=1,a=0;o!==e;++o)a+=t,n[o].toArray(s,a)}return s}function Xt(n,e){if(n.length!==e.length)return!1;for(let t=0,i=n.length;t<i;t++)if(n[t]!==e[t])return!1;return!0}function qt(n,e){for(let t=0,i=e.length;t<i;t++)n[t]=e[t]}function hl(n,e){let t=nm[e];t===void 0&&(t=new Int32Array(e),nm[e]=t);for(let i=0;i!==e;++i)t[i]=n.allocateTextureUnit();return t}function K_(n,e){let t=this.cache;t[0]!==e&&(n.uniform1f(this.addr,e),t[0]=e)}function j_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2f(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2fv(this.addr,e),qt(t,e)}}function $_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3f(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else if(e.r!==void 0)(t[0]!==e.r||t[1]!==e.g||t[2]!==e.b)&&(n.uniform3f(this.addr,e.r,e.g,e.b),t[0]=e.r,t[1]=e.g,t[2]=e.b);else{if(Xt(t,e))return;n.uniform3fv(this.addr,e),qt(t,e)}}function Q_(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4f(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4fv(this.addr,e),qt(t,e)}}function e0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix2fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;om.set(i),n.uniformMatrix2fv(this.addr,!1,om),qt(t,i)}}function t0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix3fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;sm.set(i),n.uniformMatrix3fv(this.addr,!1,sm),qt(t,i)}}function i0(n,e){let t=this.cache,i=e.elements;if(i===void 0){if(Xt(t,e))return;n.uniformMatrix4fv(this.addr,!1,e),qt(t,e)}else{if(Xt(t,i))return;rm.set(i),n.uniformMatrix4fv(this.addr,!1,rm),qt(t,i)}}function n0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1i(this.addr,e),t[0]=e)}function r0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2i(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2iv(this.addr,e),qt(t,e)}}function s0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3i(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3iv(this.addr,e),qt(t,e)}}function o0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4i(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4iv(this.addr,e),qt(t,e)}}function a0(n,e){let t=this.cache;t[0]!==e&&(n.uniform1ui(this.addr,e),t[0]=e)}function l0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y)&&(n.uniform2ui(this.addr,e.x,e.y),t[0]=e.x,t[1]=e.y);else{if(Xt(t,e))return;n.uniform2uiv(this.addr,e),qt(t,e)}}function c0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z)&&(n.uniform3ui(this.addr,e.x,e.y,e.z),t[0]=e.x,t[1]=e.y,t[2]=e.z);else{if(Xt(t,e))return;n.uniform3uiv(this.addr,e),qt(t,e)}}function h0(n,e){let t=this.cache;if(e.x!==void 0)(t[0]!==e.x||t[1]!==e.y||t[2]!==e.z||t[3]!==e.w)&&(n.uniform4ui(this.addr,e.x,e.y,e.z,e.w),t[0]=e.x,t[1]=e.y,t[2]=e.z,t[3]=e.w);else{if(Xt(t,e))return;n.uniform4uiv(this.addr,e),qt(t,e)}}function u0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r);let s;this.type===n.SAMPLER_2D_SHADOW?(tm.compareFunction=Sa,s=tm):s=lm,t.setTexture2D(e||s,r)}function f0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture3D(e||hm,r)}function d0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTextureCube(e||um,r)}function p0(n,e,t){let i=this.cache,r=t.allocateTextureUnit();i[0]!==r&&(n.uniform1i(this.addr,r),i[0]=r),t.setTexture2DArray(e||cm,r)}function m0(n){switch(n){case 5126:return K_;case 35664:return j_;case 35665:return $_;case 35666:return Q_;case 35674:return e0;case 35675:return t0;case 35676:return i0;case 5124:case 35670:return n0;case 35667:case 35671:return r0;case 35668:case 35672:return s0;case 35669:case 35673:return o0;case 5125:return a0;case 36294:return l0;case 36295:return c0;case 36296:return h0;case 35678:case 36198:case 36298:case 36306:case 35682:return u0;case 35679:case 36299:case 36307:return f0;case 35680:case 36300:case 36308:case 36293:return d0;case 36289:case 36303:case 36311:case 36292:return p0}}function g0(n,e){n.uniform1fv(this.addr,e)}function x0(n,e){let t=Ds(e,this.size,2);n.uniform2fv(this.addr,t)}function _0(n,e){let t=Ds(e,this.size,3);n.uniform3fv(this.addr,t)}function y0(n,e){let t=Ds(e,this.size,4);n.uniform4fv(this.addr,t)}function v0(n,e){let t=Ds(e,this.size,4);n.uniformMatrix2fv(this.addr,!1,t)}function b0(n,e){let t=Ds(e,this.size,9);n.uniformMatrix3fv(this.addr,!1,t)}function M0(n,e){let t=Ds(e,this.size,16);n.uniformMatrix4fv(this.addr,!1,t)}function S0(n,e){n.uniform1iv(this.addr,e)}function w0(n,e){n.uniform2iv(this.addr,e)}function T0(n,e){n.uniform3iv(this.addr,e)}function E0(n,e){n.uniform4iv(this.addr,e)}function A0(n,e){n.uniform1uiv(this.addr,e)}function C0(n,e){n.uniform2uiv(this.addr,e)}function I0(n,e){n.uniform3uiv(this.addr,e)}function P0(n,e){n.uniform4uiv(this.addr,e)}function R0(n,e,t){let i=this.cache,r=e.length,s=hl(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)t.setTexture2D(e[o]||lm,s[o])}function L0(n,e,t){let i=this.cache,r=e.length,s=hl(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)t.setTexture3D(e[o]||hm,s[o])}function D0(n,e,t){let i=this.cache,r=e.length,s=hl(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)t.setTextureCube(e[o]||um,s[o])}function N0(n,e,t){let i=this.cache,r=e.length,s=hl(t,r);Xt(i,s)||(n.uniform1iv(this.addr,s),qt(i,s));for(let o=0;o!==r;++o)t.setTexture2DArray(e[o]||cm,s[o])}function U0(n){switch(n){case 5126:return g0;case 35664:return x0;case 35665:return _0;case 35666:return y0;case 35674:return v0;case 35675:return b0;case 35676:return M0;case 5124:case 35670:return S0;case 35667:case 35671:return w0;case 35668:case 35672:return T0;case 35669:case 35673:return E0;case 5125:return A0;case 36294:return C0;case 36295:return I0;case 36296:return P0;case 35678:case 36198:case 36298:case 36306:case 35682:return R0;case 35679:case 36299:case 36307:return L0;case 35680:case 36300:case 36308:case 36293:return D0;case 36289:case 36303:case 36311:case 36292:return N0}}var Lc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.setValue=m0(t.type)}},Dc=class{constructor(e,t,i){this.id=e,this.addr=i,this.cache=[],this.type=t.type,this.size=t.size,this.setValue=U0(t.type)}},Nc=class{constructor(e){this.id=e,this.seq=[],this.map={}}setValue(e,t,i){let r=this.seq;for(let s=0,o=r.length;s!==o;++s){let a=r[s];a.setValue(e,t[a.id],i)}}},Rc=/(\w+)(\])?(\[|\.)?/g;function am(n,e){n.seq.push(e),n.map[e.id]=e}function F0(n,e,t){let i=n.name,r=i.length;for(Rc.lastIndex=0;;){let s=Rc.exec(i),o=Rc.lastIndex,a=s[1],l=s[2]==="]",c=s[3];if(l&&(a=a|0),c===void 0||c==="["&&o+2===r){am(t,c===void 0?new Lc(a,n,e):new Dc(a,n,e));break}else{let u=t.map[a];u===void 0&&(u=new Nc(a),am(t,u)),t=u}}}var Qn=class{constructor(e,t){this.seq=[],this.map={};let i=e.getProgramParameter(t,e.ACTIVE_UNIFORMS);for(let r=0;r<i;++r){let s=e.getActiveUniform(t,r),o=e.getUniformLocation(t,s.name);F0(s,o,this)}}setValue(e,t,i,r){let s=this.map[t];s!==void 0&&s.setValue(e,i,r)}setOptional(e,t,i){let r=t[i];r!==void 0&&this.setValue(e,i,r)}static upload(e,t,i,r){for(let s=0,o=t.length;s!==o;++s){let a=t[s],l=i[a.id];l.needsUpdate!==!1&&a.setValue(e,l.value,r)}}static seqWithValue(e,t){let i=[];for(let r=0,s=e.length;r!==s;++r){let o=e[r];o.id in t&&i.push(o)}return i}};function Uc(n,e,t){let i=n.createShader(e);return n.shaderSource(i,t),n.compileShader(i),i}var O0=37297,B0=0;function k0(n,e){let t=n.split(`
`),i=[],r=Math.max(e-6,0),s=Math.min(e+6,t.length);for(let o=r;o<s;o++){let a=o+1;i.push(`${a===e?">":" "} ${a}: ${t[o]}`)}return i.join(`
`)}var fm=new Ye;function z0(n){st._getMatrix(fm,st.workingColorSpace,n);let e=`mat3( ${fm.elements.map(t=>t.toFixed(4))} )`;switch(st.getTransfer(n)){case hr:return[e,"LinearTransferOETF"];case ht:return[e,"sRGBTransferOETF"];default:return console.warn("THREE.WebGLProgram: Unsupported color space: ",n),[e,"LinearTransferOETF"]}}function dm(n,e,t){let i=n.getShaderParameter(e,n.COMPILE_STATUS),s=(n.getShaderInfoLog(e)||"").trim();if(i&&s==="")return"";let o=/ERROR: 0:(\d+)/.exec(s);if(o){let a=parseInt(o[1]);return t.toUpperCase()+`

`+s+`

`+k0(n.getShaderSource(e),a)}else return s}function V0(n,e){let t=z0(e);return[`vec4 ${n}( vec4 value ) {`,`	return ${t[1]}( vec4( value.rgb * ${t[0]}, value.a ) );`,"}"].join(`
`)}function H0(n,e){let t;switch(e){case qh:t="Linear";break;case Yh:t="Reinhard";break;case Zh:t="Cineon";break;case Jh:t="ACESFilmic";break;case jh:t="AgX";break;case $h:t="Neutral";break;case Kh:t="Custom";break;default:console.warn("THREE.WebGLProgram: Unsupported toneMapping:",e),t="Linear"}return"vec3 "+n+"( vec3 color ) { return "+t+"ToneMapping( color ); }"}var ul=new R;function G0(){st.getLuminanceCoefficients(ul);let n=ul.x.toFixed(4),e=ul.y.toFixed(4),t=ul.z.toFixed(4);return["float luminance( const in vec3 rgb ) {",`	const vec3 weights = vec3( ${n}, ${e}, ${t} );`,"	return dot( weights, rgb );","}"].join(`
`)}function W0(n){return[n.extensionClipCullDistance?"#extension GL_ANGLE_clip_cull_distance : require":"",n.extensionMultiDraw?"#extension GL_ANGLE_multi_draw : require":""].filter(Zo).join(`
`)}function X0(n){let e=[];for(let t in n){let i=n[t];i!==!1&&e.push("#define "+t+" "+i)}return e.join(`
`)}function q0(n,e){let t={},i=n.getProgramParameter(e,n.ACTIVE_ATTRIBUTES);for(let r=0;r<i;r++){let s=n.getActiveAttrib(e,r),o=s.name,a=1;s.type===n.FLOAT_MAT2&&(a=2),s.type===n.FLOAT_MAT3&&(a=3),s.type===n.FLOAT_MAT4&&(a=4),t[o]={type:s.type,location:n.getAttribLocation(e,o),locationSize:a}}return t}function Zo(n){return n!==""}function pm(n,e){let t=e.numSpotLightShadows+e.numSpotLightMaps-e.numSpotLightShadowsWithMaps;return n.replace(/NUM_DIR_LIGHTS/g,e.numDirLights).replace(/NUM_SPOT_LIGHTS/g,e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g,e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g,t).replace(/NUM_RECT_AREA_LIGHTS/g,e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g,e.numPointLights).replace(/NUM_HEMI_LIGHTS/g,e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g,e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g,e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g,e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g,e.numPointLightShadows)}function mm(n,e){return n.replace(/NUM_CLIPPING_PLANES/g,e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g,e.numClippingPlanes-e.numClipIntersection)}var Y0=/^[ \t]*#include +<([\w\d./]+)>/gm;function Fc(n){return n.replace(Y0,J0)}var Z0=new Map;function J0(n,e){let t=nt[e];if(t===void 0){let i=Z0.get(e);if(i!==void 0)t=nt[i],console.warn('THREE.WebGLRenderer: Shader chunk "%s" has been deprecated. Use "%s" instead.',e,i);else throw new Error("Can not resolve #include <"+e+">")}return Fc(t)}var K0=/#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;function gm(n){return n.replace(K0,j0)}function j0(n,e,t,i){let r="";for(let s=parseInt(e);s<parseInt(t);s++)r+=i.replace(/\[\s*i\s*\]/g,"[ "+s+" ]").replace(/UNROLLED_LOOP_INDEX/g,s);return r}function xm(n){let e=`precision ${n.precision} float;
	precision ${n.precision} int;
	precision ${n.precision} sampler2D;
	precision ${n.precision} samplerCube;
	precision ${n.precision} sampler3D;
	precision ${n.precision} sampler2DArray;
	precision ${n.precision} sampler2DShadow;
	precision ${n.precision} samplerCubeShadow;
	precision ${n.precision} sampler2DArrayShadow;
	precision ${n.precision} isampler2D;
	precision ${n.precision} isampler3D;
	precision ${n.precision} isamplerCube;
	precision ${n.precision} isampler2DArray;
	precision ${n.precision} usampler2D;
	precision ${n.precision} usampler3D;
	precision ${n.precision} usamplerCube;
	precision ${n.precision} usampler2DArray;
	`;return n.precision==="highp"?e+=`
#define HIGH_PRECISION`:n.precision==="mediump"?e+=`
#define MEDIUM_PRECISION`:n.precision==="lowp"&&(e+=`
#define LOW_PRECISION`),e}function $0(n){let e="SHADOWMAP_TYPE_BASIC";return n.shadowMapType===Br?e="SHADOWMAP_TYPE_PCF":n.shadowMapType===Th?e="SHADOWMAP_TYPE_PCF_SOFT":n.shadowMapType===Xi&&(e="SHADOWMAP_TYPE_VSM"),e}function Q0(n){let e="ENVMAP_TYPE_CUBE";if(n.envMap)switch(n.envMapMode){case Ti:case qi:e="ENVMAP_TYPE_CUBE";break;case dn:e="ENVMAP_TYPE_CUBE_UV";break}return e}function ey(n){let e="ENVMAP_MODE_REFLECTION";if(n.envMap)switch(n.envMapMode){case qi:e="ENVMAP_MODE_REFRACTION";break}return e}function ty(n){let e="ENVMAP_BLENDING_NONE";if(n.envMap)switch(n.combine){case kr:e="ENVMAP_BLENDING_MULTIPLY";break;case Wh:e="ENVMAP_BLENDING_MIX";break;case Xh:e="ENVMAP_BLENDING_ADD";break}return e}function iy(n){let e=n.envMapCubeUVHeight;if(e===null)return null;let t=Math.log2(e)-2,i=1/e;return{texelWidth:1/(3*Math.max(Math.pow(2,t),112)),texelHeight:i,maxMip:t}}function _m(n,e,t,i){let r=n.getContext(),s=t.defines,o=t.vertexShader,a=t.fragmentShader,l=$0(t),c=Q0(t),h=ey(t),u=ty(t),d=iy(t),f=W0(t),g=X0(s),x=r.createProgram(),m,p,T=t.glslVersion?"#version "+t.glslVersion+`
`:"";t.isRawShaderMaterial?(m=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zo).join(`
`),m.length>0&&(m+=`
`),p=["#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g].filter(Zo).join(`
`),p.length>0&&(p+=`
`)):(m=[xm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.extensionClipCullDistance?"#define USE_CLIP_DISTANCE":"",t.batching?"#define USE_BATCHING":"",t.batchingColor?"#define USE_BATCHING_COLOR":"",t.instancing?"#define USE_INSTANCING":"",t.instancingColor?"#define USE_INSTANCING_COLOR":"",t.instancingMorph?"#define USE_INSTANCING_MORPH":"",t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.map?"#define USE_MAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+h:"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.displacementMap?"#define USE_DISPLACEMENTMAP":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.mapUv?"#define MAP_UV "+t.mapUv:"",t.alphaMapUv?"#define ALPHAMAP_UV "+t.alphaMapUv:"",t.lightMapUv?"#define LIGHTMAP_UV "+t.lightMapUv:"",t.aoMapUv?"#define AOMAP_UV "+t.aoMapUv:"",t.emissiveMapUv?"#define EMISSIVEMAP_UV "+t.emissiveMapUv:"",t.bumpMapUv?"#define BUMPMAP_UV "+t.bumpMapUv:"",t.normalMapUv?"#define NORMALMAP_UV "+t.normalMapUv:"",t.displacementMapUv?"#define DISPLACEMENTMAP_UV "+t.displacementMapUv:"",t.metalnessMapUv?"#define METALNESSMAP_UV "+t.metalnessMapUv:"",t.roughnessMapUv?"#define ROUGHNESSMAP_UV "+t.roughnessMapUv:"",t.anisotropyMapUv?"#define ANISOTROPYMAP_UV "+t.anisotropyMapUv:"",t.clearcoatMapUv?"#define CLEARCOATMAP_UV "+t.clearcoatMapUv:"",t.clearcoatNormalMapUv?"#define CLEARCOAT_NORMALMAP_UV "+t.clearcoatNormalMapUv:"",t.clearcoatRoughnessMapUv?"#define CLEARCOAT_ROUGHNESSMAP_UV "+t.clearcoatRoughnessMapUv:"",t.iridescenceMapUv?"#define IRIDESCENCEMAP_UV "+t.iridescenceMapUv:"",t.iridescenceThicknessMapUv?"#define IRIDESCENCE_THICKNESSMAP_UV "+t.iridescenceThicknessMapUv:"",t.sheenColorMapUv?"#define SHEEN_COLORMAP_UV "+t.sheenColorMapUv:"",t.sheenRoughnessMapUv?"#define SHEEN_ROUGHNESSMAP_UV "+t.sheenRoughnessMapUv:"",t.specularMapUv?"#define SPECULARMAP_UV "+t.specularMapUv:"",t.specularColorMapUv?"#define SPECULAR_COLORMAP_UV "+t.specularColorMapUv:"",t.specularIntensityMapUv?"#define SPECULAR_INTENSITYMAP_UV "+t.specularIntensityMapUv:"",t.transmissionMapUv?"#define TRANSMISSIONMAP_UV "+t.transmissionMapUv:"",t.thicknessMapUv?"#define THICKNESSMAP_UV "+t.thicknessMapUv:"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.flatShading?"#define FLAT_SHADED":"",t.skinning?"#define USE_SKINNING":"",t.morphTargets?"#define USE_MORPHTARGETS":"",t.morphNormals&&t.flatShading===!1?"#define USE_MORPHNORMALS":"",t.morphColors?"#define USE_MORPHCOLORS":"",t.morphTargetsCount>0?"#define MORPHTARGETS_TEXTURE_STRIDE "+t.morphTextureStride:"",t.morphTargetsCount>0?"#define MORPHTARGETS_COUNT "+t.morphTargetsCount:"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.sizeAttenuation?"#define USE_SIZEATTENUATION":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 modelMatrix;","uniform mat4 modelViewMatrix;","uniform mat4 projectionMatrix;","uniform mat4 viewMatrix;","uniform mat3 normalMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;","#ifdef USE_INSTANCING","	attribute mat4 instanceMatrix;","#endif","#ifdef USE_INSTANCING_COLOR","	attribute vec3 instanceColor;","#endif","#ifdef USE_INSTANCING_MORPH","	uniform sampler2D morphTexture;","#endif","attribute vec3 position;","attribute vec3 normal;","attribute vec2 uv;","#ifdef USE_UV1","	attribute vec2 uv1;","#endif","#ifdef USE_UV2","	attribute vec2 uv2;","#endif","#ifdef USE_UV3","	attribute vec2 uv3;","#endif","#ifdef USE_TANGENT","	attribute vec4 tangent;","#endif","#if defined( USE_COLOR_ALPHA )","	attribute vec4 color;","#elif defined( USE_COLOR )","	attribute vec3 color;","#endif","#ifdef USE_SKINNING","	attribute vec4 skinIndex;","	attribute vec4 skinWeight;","#endif",`
`].filter(Zo).join(`
`),p=[xm(t),"#define SHADER_TYPE "+t.shaderType,"#define SHADER_NAME "+t.shaderName,g,t.useFog&&t.fog?"#define USE_FOG":"",t.useFog&&t.fogExp2?"#define FOG_EXP2":"",t.alphaToCoverage?"#define ALPHA_TO_COVERAGE":"",t.map?"#define USE_MAP":"",t.matcap?"#define USE_MATCAP":"",t.envMap?"#define USE_ENVMAP":"",t.envMap?"#define "+c:"",t.envMap?"#define "+h:"",t.envMap?"#define "+u:"",d?"#define CUBEUV_TEXEL_WIDTH "+d.texelWidth:"",d?"#define CUBEUV_TEXEL_HEIGHT "+d.texelHeight:"",d?"#define CUBEUV_MAX_MIP "+d.maxMip+".0":"",t.lightMap?"#define USE_LIGHTMAP":"",t.aoMap?"#define USE_AOMAP":"",t.bumpMap?"#define USE_BUMPMAP":"",t.normalMap?"#define USE_NORMALMAP":"",t.normalMapObjectSpace?"#define USE_NORMALMAP_OBJECTSPACE":"",t.normalMapTangentSpace?"#define USE_NORMALMAP_TANGENTSPACE":"",t.emissiveMap?"#define USE_EMISSIVEMAP":"",t.anisotropy?"#define USE_ANISOTROPY":"",t.anisotropyMap?"#define USE_ANISOTROPYMAP":"",t.clearcoat?"#define USE_CLEARCOAT":"",t.clearcoatMap?"#define USE_CLEARCOATMAP":"",t.clearcoatRoughnessMap?"#define USE_CLEARCOAT_ROUGHNESSMAP":"",t.clearcoatNormalMap?"#define USE_CLEARCOAT_NORMALMAP":"",t.dispersion?"#define USE_DISPERSION":"",t.iridescence?"#define USE_IRIDESCENCE":"",t.iridescenceMap?"#define USE_IRIDESCENCEMAP":"",t.iridescenceThicknessMap?"#define USE_IRIDESCENCE_THICKNESSMAP":"",t.specularMap?"#define USE_SPECULARMAP":"",t.specularColorMap?"#define USE_SPECULAR_COLORMAP":"",t.specularIntensityMap?"#define USE_SPECULAR_INTENSITYMAP":"",t.roughnessMap?"#define USE_ROUGHNESSMAP":"",t.metalnessMap?"#define USE_METALNESSMAP":"",t.alphaMap?"#define USE_ALPHAMAP":"",t.alphaTest?"#define USE_ALPHATEST":"",t.alphaHash?"#define USE_ALPHAHASH":"",t.sheen?"#define USE_SHEEN":"",t.sheenColorMap?"#define USE_SHEEN_COLORMAP":"",t.sheenRoughnessMap?"#define USE_SHEEN_ROUGHNESSMAP":"",t.transmission?"#define USE_TRANSMISSION":"",t.transmissionMap?"#define USE_TRANSMISSIONMAP":"",t.thicknessMap?"#define USE_THICKNESSMAP":"",t.vertexTangents&&t.flatShading===!1?"#define USE_TANGENT":"",t.vertexColors||t.instancingColor||t.batchingColor?"#define USE_COLOR":"",t.vertexAlphas?"#define USE_COLOR_ALPHA":"",t.vertexUv1s?"#define USE_UV1":"",t.vertexUv2s?"#define USE_UV2":"",t.vertexUv3s?"#define USE_UV3":"",t.pointsUvs?"#define USE_POINTS_UV":"",t.gradientMap?"#define USE_GRADIENTMAP":"",t.flatShading?"#define FLAT_SHADED":"",t.doubleSided?"#define DOUBLE_SIDED":"",t.flipSided?"#define FLIP_SIDED":"",t.shadowMapEnabled?"#define USE_SHADOWMAP":"",t.shadowMapEnabled?"#define "+l:"",t.premultipliedAlpha?"#define PREMULTIPLIED_ALPHA":"",t.numLightProbes>0?"#define USE_LIGHT_PROBES":"",t.decodeVideoTexture?"#define DECODE_VIDEO_TEXTURE":"",t.decodeVideoTextureEmissive?"#define DECODE_VIDEO_TEXTURE_EMISSIVE":"",t.logarithmicDepthBuffer?"#define USE_LOGARITHMIC_DEPTH_BUFFER":"",t.reversedDepthBuffer?"#define USE_REVERSED_DEPTH_BUFFER":"","uniform mat4 viewMatrix;","uniform vec3 cameraPosition;","uniform bool isOrthographic;",t.toneMapping!==Oi?"#define TONE_MAPPING":"",t.toneMapping!==Oi?nt.tonemapping_pars_fragment:"",t.toneMapping!==Oi?H0("toneMapping",t.toneMapping):"",t.dithering?"#define DITHERING":"",t.opaque?"#define OPAQUE":"",nt.colorspace_pars_fragment,V0("linearToOutputTexel",t.outputColorSpace),G0(),t.useDepthPacking?"#define DEPTH_PACKING "+t.depthPacking:"",`
`].filter(Zo).join(`
`)),o=Fc(o),o=pm(o,t),o=mm(o,t),a=Fc(a),a=pm(a,t),a=mm(a,t),o=gm(o),a=gm(a),t.isRawShaderMaterial!==!0&&(T=`#version 300 es
`,m=[f,"#define attribute in","#define varying out","#define texture2D texture"].join(`
`)+`
`+m,p=["#define varying in",t.glslVersion===Nl?"":"layout(location = 0) out highp vec4 pc_fragColor;",t.glslVersion===Nl?"":"#define gl_FragColor pc_fragColor","#define gl_FragDepthEXT gl_FragDepth","#define texture2D texture","#define textureCube texture","#define texture2DProj textureProj","#define texture2DLodEXT textureLod","#define texture2DProjLodEXT textureProjLod","#define textureCubeLodEXT textureLod","#define texture2DGradEXT textureGrad","#define texture2DProjGradEXT textureProjGrad","#define textureCubeGradEXT textureGrad"].join(`
`)+`
`+p);let S=T+m+o,_=T+p+a,C=Uc(r,r.VERTEX_SHADER,S),M=Uc(r,r.FRAGMENT_SHADER,_);r.attachShader(x,C),r.attachShader(x,M),t.index0AttributeName!==void 0?r.bindAttribLocation(x,0,t.index0AttributeName):t.morphTargets===!0&&r.bindAttribLocation(x,0,"position"),r.linkProgram(x);function A(P){if(n.debug.checkShaderErrors){let N=r.getProgramInfoLog(x)||"",F=r.getShaderInfoLog(C)||"",z=r.getShaderInfoLog(M)||"",V=N.trim(),q=F.trim(),X=z.trim(),W=!0,Y=!0;if(r.getProgramParameter(x,r.LINK_STATUS)===!1)if(W=!1,typeof n.debug.onShaderError=="function")n.debug.onShaderError(r,x,C,M);else{let oe=dm(r,C,"vertex"),Me=dm(r,M,"fragment");console.error("THREE.WebGLProgram: Shader Error "+r.getError()+" - VALIDATE_STATUS "+r.getProgramParameter(x,r.VALIDATE_STATUS)+`

Material Name: `+P.name+`
Material Type: `+P.type+`

Program Info Log: `+V+`
`+oe+`
`+Me)}else V!==""?console.warn("THREE.WebGLProgram: Program Info Log:",V):(q===""||X==="")&&(Y=!1);Y&&(P.diagnostics={runnable:W,programLog:V,vertexShader:{log:q,prefix:m},fragmentShader:{log:X,prefix:p}})}r.deleteShader(C),r.deleteShader(M),E=new Qn(r,x),b=q0(r,x)}let E;this.getUniforms=function(){return E===void 0&&A(this),E};let b;this.getAttributes=function(){return b===void 0&&A(this),b};let v=t.rendererExtensionParallelShaderCompile===!1;return this.isReady=function(){return v===!1&&(v=r.getProgramParameter(x,O0)),v},this.destroy=function(){i.releaseStatesOfProgram(this),r.deleteProgram(x),this.program=void 0},this.type=t.shaderType,this.name=t.shaderName,this.id=B0++,this.cacheKey=e,this.usedTimes=1,this.program=x,this.vertexShader=C,this.fragmentShader=M,this}var ny=0,fl=class{constructor(){this.shaderCache=new Map,this.materialCache=new Map}update(e){let t=e.vertexShader,i=e.fragmentShader,r=this._getShaderStage(t),s=this._getShaderStage(i),o=this._getShaderCacheForMaterial(e);return o.has(r)===!1&&(o.add(r),r.usedTimes++),o.has(s)===!1&&(o.add(s),s.usedTimes++),this}remove(e){let t=this.materialCache.get(e);for(let i of t)i.usedTimes--,i.usedTimes===0&&this.shaderCache.delete(i.code);return this.materialCache.delete(e),this}getVertexShaderID(e){return this._getShaderStage(e.vertexShader).id}getFragmentShaderID(e){return this._getShaderStage(e.fragmentShader).id}dispose(){this.shaderCache.clear(),this.materialCache.clear()}_getShaderCacheForMaterial(e){let t=this.materialCache,i=t.get(e);return i===void 0&&(i=new Set,t.set(e,i)),i}_getShaderStage(e){let t=this.shaderCache,i=t.get(e);return i===void 0&&(i=new Oc(e),t.set(e,i)),i}},Oc=class{constructor(e){this.id=ny++,this.code=e,this.usedTimes=0}};function ym(n,e,t,i,r,s,o){let a=new Sn,l=new fl,c=new Set,h=[],u=r.logarithmicDepthBuffer,d=r.vertexTextures,f=r.precision,g={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function x(b){return c.add(b),b===0?"uv":`uv${b}`}function m(b,v,P,N,F){let z=N.fog,V=F.geometry,q=b.isMeshStandardMaterial?N.environment:null,X=(b.isMeshStandardMaterial?t:e).get(b.envMap||q),W=X&&X.mapping===dn?X.image.height:null,Y=g[b.type];b.precision!==null&&(f=r.getMaxPrecision(b.precision),f!==b.precision&&console.warn("THREE.WebGLProgram.getParameters:",b.precision,"not supported, using",f,"instead."));let oe=V.morphAttributes.position||V.morphAttributes.normal||V.morphAttributes.color,Me=oe!==void 0?oe.length:0,Ae=0;V.morphAttributes.position!==void 0&&(Ae=1),V.morphAttributes.normal!==void 0&&(Ae=2),V.morphAttributes.color!==void 0&&(Ae=3);let ue,He,Re,te;if(Y){let xt=Ri[Y];ue=xt.vertexShader,He=xt.fragmentShader}else ue=b.vertexShader,He=b.fragmentShader,l.update(b),Re=l.getVertexShaderID(b),te=l.getFragmentShaderID(b);let ce=n.getRenderTarget(),re=n.state.buffers.depth.getReversed(),xe=F.isInstancedMesh===!0,_e=F.isBatchedMesh===!0,We=!!b.map,rt=!!b.matcap,L=!!X,D=!!b.aoMap,Z=!!b.lightMap,K=!!b.bumpMap,Q=!!b.normalMap,Se=!!b.displacementMap,pe=!!b.emissiveMap,Te=!!b.metalnessMap,Qe=!!b.roughnessMap,je=b.anisotropy>0,I=b.clearcoat>0,y=b.dispersion>0,H=b.iridescence>0,$=b.sheen>0,ae=b.transmission>0,ee=je&&!!b.anisotropyMap,ke=I&&!!b.clearcoatMap,we=I&&!!b.clearcoatNormalMap,Oe=I&&!!b.clearcoatRoughnessMap,Fe=H&&!!b.iridescenceMap,me=H&&!!b.iridescenceThicknessMap,B=$&&!!b.sheenColorMap,se=$&&!!b.sheenRoughnessMap,ne=!!b.specularMap,le=!!b.specularColorMap,Ge=!!b.specularIntensityMap,U=ae&&!!b.transmissionMap,fe=ae&&!!b.thicknessMap,Ee=!!b.gradientMap,Be=!!b.alphaMap,ye=b.alphaTest>0,he=!!b.alphaHash,Ve=!!b.extensions,it=Oi;b.toneMapped&&(ce===null||ce.isXRRenderTarget===!0)&&(it=n.toneMapping);let Mt={shaderID:Y,shaderType:b.type,shaderName:b.name,vertexShader:ue,fragmentShader:He,defines:b.defines,customVertexShaderID:Re,customFragmentShaderID:te,isRawShaderMaterial:b.isRawShaderMaterial===!0,glslVersion:b.glslVersion,precision:f,batching:_e,batchingColor:_e&&F._colorsTexture!==null,instancing:xe,instancingColor:xe&&F.instanceColor!==null,instancingMorph:xe&&F.morphTexture!==null,supportsVertexTextures:d,outputColorSpace:ce===null?n.outputColorSpace:ce.isXRRenderTarget===!0?ce.texture.colorSpace:Yi,alphaToCoverage:!!b.alphaToCoverage,map:We,matcap:rt,envMap:L,envMapMode:L&&X.mapping,envMapCubeUVHeight:W,aoMap:D,lightMap:Z,bumpMap:K,normalMap:Q,displacementMap:d&&Se,emissiveMap:pe,normalMapObjectSpace:Q&&b.normalMapType===tu,normalMapTangentSpace:Q&&b.normalMapType===yn,metalnessMap:Te,roughnessMap:Qe,anisotropy:je,anisotropyMap:ee,clearcoat:I,clearcoatMap:ke,clearcoatNormalMap:we,clearcoatRoughnessMap:Oe,dispersion:y,iridescence:H,iridescenceMap:Fe,iridescenceThicknessMap:me,sheen:$,sheenColorMap:B,sheenRoughnessMap:se,specularMap:ne,specularColorMap:le,specularIntensityMap:Ge,transmission:ae,transmissionMap:U,thicknessMap:fe,gradientMap:Ee,opaque:b.transparent===!1&&b.blending===un&&b.alphaToCoverage===!1,alphaMap:Be,alphaTest:ye,alphaHash:he,combine:b.combine,mapUv:We&&x(b.map.channel),aoMapUv:D&&x(b.aoMap.channel),lightMapUv:Z&&x(b.lightMap.channel),bumpMapUv:K&&x(b.bumpMap.channel),normalMapUv:Q&&x(b.normalMap.channel),displacementMapUv:Se&&x(b.displacementMap.channel),emissiveMapUv:pe&&x(b.emissiveMap.channel),metalnessMapUv:Te&&x(b.metalnessMap.channel),roughnessMapUv:Qe&&x(b.roughnessMap.channel),anisotropyMapUv:ee&&x(b.anisotropyMap.channel),clearcoatMapUv:ke&&x(b.clearcoatMap.channel),clearcoatNormalMapUv:we&&x(b.clearcoatNormalMap.channel),clearcoatRoughnessMapUv:Oe&&x(b.clearcoatRoughnessMap.channel),iridescenceMapUv:Fe&&x(b.iridescenceMap.channel),iridescenceThicknessMapUv:me&&x(b.iridescenceThicknessMap.channel),sheenColorMapUv:B&&x(b.sheenColorMap.channel),sheenRoughnessMapUv:se&&x(b.sheenRoughnessMap.channel),specularMapUv:ne&&x(b.specularMap.channel),specularColorMapUv:le&&x(b.specularColorMap.channel),specularIntensityMapUv:Ge&&x(b.specularIntensityMap.channel),transmissionMapUv:U&&x(b.transmissionMap.channel),thicknessMapUv:fe&&x(b.thicknessMap.channel),alphaMapUv:Be&&x(b.alphaMap.channel),vertexTangents:!!V.attributes.tangent&&(Q||je),vertexColors:b.vertexColors,vertexAlphas:b.vertexColors===!0&&!!V.attributes.color&&V.attributes.color.itemSize===4,pointsUvs:F.isPoints===!0&&!!V.attributes.uv&&(We||Be),fog:!!z,useFog:b.fog===!0,fogExp2:!!z&&z.isFogExp2,flatShading:b.flatShading===!0&&b.wireframe===!1,sizeAttenuation:b.sizeAttenuation===!0,logarithmicDepthBuffer:u,reversedDepthBuffer:re,skinning:F.isSkinnedMesh===!0,morphTargets:V.morphAttributes.position!==void 0,morphNormals:V.morphAttributes.normal!==void 0,morphColors:V.morphAttributes.color!==void 0,morphTargetsCount:Me,morphTextureStride:Ae,numDirLights:v.directional.length,numPointLights:v.point.length,numSpotLights:v.spot.length,numSpotLightMaps:v.spotLightMap.length,numRectAreaLights:v.rectArea.length,numHemiLights:v.hemi.length,numDirLightShadows:v.directionalShadowMap.length,numPointLightShadows:v.pointShadowMap.length,numSpotLightShadows:v.spotShadowMap.length,numSpotLightShadowsWithMaps:v.numSpotLightShadowsWithMaps,numLightProbes:v.numLightProbes,numClippingPlanes:o.numPlanes,numClipIntersection:o.numIntersection,dithering:b.dithering,shadowMapEnabled:n.shadowMap.enabled&&P.length>0,shadowMapType:n.shadowMap.type,toneMapping:it,decodeVideoTexture:We&&b.map.isVideoTexture===!0&&st.getTransfer(b.map.colorSpace)===ht,decodeVideoTextureEmissive:pe&&b.emissiveMap.isVideoTexture===!0&&st.getTransfer(b.emissiveMap.colorSpace)===ht,premultipliedAlpha:b.premultipliedAlpha,doubleSided:b.side===fi,flipSided:b.side===It,useDepthPacking:b.depthPacking>=0,depthPacking:b.depthPacking||0,index0AttributeName:b.index0AttributeName,extensionClipCullDistance:Ve&&b.extensions.clipCullDistance===!0&&i.has("WEBGL_clip_cull_distance"),extensionMultiDraw:(Ve&&b.extensions.multiDraw===!0||_e)&&i.has("WEBGL_multi_draw"),rendererExtensionParallelShaderCompile:i.has("KHR_parallel_shader_compile"),customProgramCacheKey:b.customProgramCacheKey()};return Mt.vertexUv1s=c.has(1),Mt.vertexUv2s=c.has(2),Mt.vertexUv3s=c.has(3),c.clear(),Mt}function p(b){let v=[];if(b.shaderID?v.push(b.shaderID):(v.push(b.customVertexShaderID),v.push(b.customFragmentShaderID)),b.defines!==void 0)for(let P in b.defines)v.push(P),v.push(b.defines[P]);return b.isRawShaderMaterial===!1&&(T(v,b),S(v,b),v.push(n.outputColorSpace)),v.push(b.customProgramCacheKey),v.join()}function T(b,v){b.push(v.precision),b.push(v.outputColorSpace),b.push(v.envMapMode),b.push(v.envMapCubeUVHeight),b.push(v.mapUv),b.push(v.alphaMapUv),b.push(v.lightMapUv),b.push(v.aoMapUv),b.push(v.bumpMapUv),b.push(v.normalMapUv),b.push(v.displacementMapUv),b.push(v.emissiveMapUv),b.push(v.metalnessMapUv),b.push(v.roughnessMapUv),b.push(v.anisotropyMapUv),b.push(v.clearcoatMapUv),b.push(v.clearcoatNormalMapUv),b.push(v.clearcoatRoughnessMapUv),b.push(v.iridescenceMapUv),b.push(v.iridescenceThicknessMapUv),b.push(v.sheenColorMapUv),b.push(v.sheenRoughnessMapUv),b.push(v.specularMapUv),b.push(v.specularColorMapUv),b.push(v.specularIntensityMapUv),b.push(v.transmissionMapUv),b.push(v.thicknessMapUv),b.push(v.combine),b.push(v.fogExp2),b.push(v.sizeAttenuation),b.push(v.morphTargetsCount),b.push(v.morphAttributeCount),b.push(v.numDirLights),b.push(v.numPointLights),b.push(v.numSpotLights),b.push(v.numSpotLightMaps),b.push(v.numHemiLights),b.push(v.numRectAreaLights),b.push(v.numDirLightShadows),b.push(v.numPointLightShadows),b.push(v.numSpotLightShadows),b.push(v.numSpotLightShadowsWithMaps),b.push(v.numLightProbes),b.push(v.shadowMapType),b.push(v.toneMapping),b.push(v.numClippingPlanes),b.push(v.numClipIntersection),b.push(v.depthPacking)}function S(b,v){a.disableAll(),v.supportsVertexTextures&&a.enable(0),v.instancing&&a.enable(1),v.instancingColor&&a.enable(2),v.instancingMorph&&a.enable(3),v.matcap&&a.enable(4),v.envMap&&a.enable(5),v.normalMapObjectSpace&&a.enable(6),v.normalMapTangentSpace&&a.enable(7),v.clearcoat&&a.enable(8),v.iridescence&&a.enable(9),v.alphaTest&&a.enable(10),v.vertexColors&&a.enable(11),v.vertexAlphas&&a.enable(12),v.vertexUv1s&&a.enable(13),v.vertexUv2s&&a.enable(14),v.vertexUv3s&&a.enable(15),v.vertexTangents&&a.enable(16),v.anisotropy&&a.enable(17),v.alphaHash&&a.enable(18),v.batching&&a.enable(19),v.dispersion&&a.enable(20),v.batchingColor&&a.enable(21),v.gradientMap&&a.enable(22),b.push(a.mask),a.disableAll(),v.fog&&a.enable(0),v.useFog&&a.enable(1),v.flatShading&&a.enable(2),v.logarithmicDepthBuffer&&a.enable(3),v.reversedDepthBuffer&&a.enable(4),v.skinning&&a.enable(5),v.morphTargets&&a.enable(6),v.morphNormals&&a.enable(7),v.morphColors&&a.enable(8),v.premultipliedAlpha&&a.enable(9),v.shadowMapEnabled&&a.enable(10),v.doubleSided&&a.enable(11),v.flipSided&&a.enable(12),v.useDepthPacking&&a.enable(13),v.dithering&&a.enable(14),v.transmission&&a.enable(15),v.sheen&&a.enable(16),v.opaque&&a.enable(17),v.pointsUvs&&a.enable(18),v.decodeVideoTexture&&a.enable(19),v.decodeVideoTextureEmissive&&a.enable(20),v.alphaToCoverage&&a.enable(21),b.push(a.mask)}function _(b){let v=g[b.type],P;if(v){let N=Ri[v];P=ic.clone(N.uniforms)}else P=b.uniforms;return P}function C(b,v){let P;for(let N=0,F=h.length;N<F;N++){let z=h[N];if(z.cacheKey===v){P=z,++P.usedTimes;break}}return P===void 0&&(P=new _m(n,v,b,s),h.push(P)),P}function M(b){if(--b.usedTimes===0){let v=h.indexOf(b);h[v]=h[h.length-1],h.pop(),b.destroy()}}function A(b){l.remove(b)}function E(){l.dispose()}return{getParameters:m,getProgramCacheKey:p,getUniforms:_,acquireProgram:C,releaseProgram:M,releaseShaderCache:A,programs:h,dispose:E}}function vm(){let n=new WeakMap;function e(o){return n.has(o)}function t(o){let a=n.get(o);return a===void 0&&(a={},n.set(o,a)),a}function i(o){n.delete(o)}function r(o,a,l){n.get(o)[a]=l}function s(){n=new WeakMap}return{has:e,get:t,remove:i,update:r,dispose:s}}function ry(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.material.id!==e.material.id?n.material.id-e.material.id:n.z!==e.z?n.z-e.z:n.id-e.id}function bm(n,e){return n.groupOrder!==e.groupOrder?n.groupOrder-e.groupOrder:n.renderOrder!==e.renderOrder?n.renderOrder-e.renderOrder:n.z!==e.z?e.z-n.z:n.id-e.id}function Mm(){let n=[],e=0,t=[],i=[],r=[];function s(){e=0,t.length=0,i.length=0,r.length=0}function o(u,d,f,g,x,m){let p=n[e];return p===void 0?(p={id:u.id,object:u,geometry:d,material:f,groupOrder:g,renderOrder:u.renderOrder,z:x,group:m},n[e]=p):(p.id=u.id,p.object=u,p.geometry=d,p.material=f,p.groupOrder=g,p.renderOrder=u.renderOrder,p.z=x,p.group=m),e++,p}function a(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?i.push(p):f.transparent===!0?r.push(p):t.push(p)}function l(u,d,f,g,x,m){let p=o(u,d,f,g,x,m);f.transmission>0?i.unshift(p):f.transparent===!0?r.unshift(p):t.unshift(p)}function c(u,d){t.length>1&&t.sort(u||ry),i.length>1&&i.sort(d||bm),r.length>1&&r.sort(d||bm)}function h(){for(let u=e,d=n.length;u<d;u++){let f=n[u];if(f.id===null)break;f.id=null,f.object=null,f.geometry=null,f.material=null,f.group=null}}return{opaque:t,transmissive:i,transparent:r,init:s,push:a,unshift:l,finish:h,sort:c}}function Sm(){let n=new WeakMap;function e(i,r){let s=n.get(i),o;return s===void 0?(o=new Mm,n.set(i,[o])):r>=s.length?(o=new Mm,s.push(o)):o=s[r],o}function t(){n=new WeakMap}return{get:e,dispose:t}}function sy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={direction:new R,color:new Pe};break;case"SpotLight":t={position:new R,direction:new R,color:new Pe,distance:0,coneCos:0,penumbraCos:0,decay:0};break;case"PointLight":t={position:new R,color:new Pe,distance:0,decay:0};break;case"HemisphereLight":t={direction:new R,skyColor:new Pe,groundColor:new Pe};break;case"RectAreaLight":t={color:new Pe,position:new R,halfWidth:new R,halfHeight:new R};break}return n[e.id]=t,t}}}function oy(){let n={};return{get:function(e){if(n[e.id]!==void 0)return n[e.id];let t;switch(e.type){case"DirectionalLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"SpotLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie};break;case"PointLight":t={shadowIntensity:1,shadowBias:0,shadowNormalBias:0,shadowRadius:1,shadowMapSize:new ie,shadowCameraNear:1,shadowCameraFar:1e3};break}return n[e.id]=t,t}}}var ay=0;function ly(n,e){return(e.castShadow?2:0)-(n.castShadow?2:0)+(e.map?1:0)-(n.map?1:0)}function wm(n){let e=new sy,t=oy(),i={version:0,hash:{directionalLength:-1,pointLength:-1,spotLength:-1,rectAreaLength:-1,hemiLength:-1,numDirectionalShadows:-1,numPointShadows:-1,numSpotShadows:-1,numSpotMaps:-1,numLightProbes:-1},ambient:[0,0,0],probe:[],directional:[],directionalShadow:[],directionalShadowMap:[],directionalShadowMatrix:[],spot:[],spotLightMap:[],spotShadow:[],spotShadowMap:[],spotLightMatrix:[],rectArea:[],rectAreaLTC1:null,rectAreaLTC2:null,point:[],pointShadow:[],pointShadowMap:[],pointShadowMatrix:[],hemi:[],numSpotLightShadowsWithMaps:0,numLightProbes:0};for(let c=0;c<9;c++)i.probe.push(new R);let r=new R,s=new Je,o=new Je;function a(c){let h=0,u=0,d=0;for(let b=0;b<9;b++)i.probe[b].set(0,0,0);let f=0,g=0,x=0,m=0,p=0,T=0,S=0,_=0,C=0,M=0,A=0;c.sort(ly);for(let b=0,v=c.length;b<v;b++){let P=c[b],N=P.color,F=P.intensity,z=P.distance,V=P.shadow&&P.shadow.map?P.shadow.map.texture:null;if(P.isAmbientLight)h+=N.r*F,u+=N.g*F,d+=N.b*F;else if(P.isLightProbe){for(let q=0;q<9;q++)i.probe[q].addScaledVector(P.sh.coefficients[q],F);A++}else if(P.isDirectionalLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),P.castShadow){let X=P.shadow,W=t.get(P);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,i.directionalShadow[f]=W,i.directionalShadowMap[f]=V,i.directionalShadowMatrix[f]=P.shadow.matrix,T++}i.directional[f]=q,f++}else if(P.isSpotLight){let q=e.get(P);q.position.setFromMatrixPosition(P.matrixWorld),q.color.copy(N).multiplyScalar(F),q.distance=z,q.coneCos=Math.cos(P.angle),q.penumbraCos=Math.cos(P.angle*(1-P.penumbra)),q.decay=P.decay,i.spot[x]=q;let X=P.shadow;if(P.map&&(i.spotLightMap[C]=P.map,C++,X.updateMatrices(P),P.castShadow&&M++),i.spotLightMatrix[x]=X.matrix,P.castShadow){let W=t.get(P);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,i.spotShadow[x]=W,i.spotShadowMap[x]=V,_++}x++}else if(P.isRectAreaLight){let q=e.get(P);q.color.copy(N).multiplyScalar(F),q.halfWidth.set(P.width*.5,0,0),q.halfHeight.set(0,P.height*.5,0),i.rectArea[m]=q,m++}else if(P.isPointLight){let q=e.get(P);if(q.color.copy(P.color).multiplyScalar(P.intensity),q.distance=P.distance,q.decay=P.decay,P.castShadow){let X=P.shadow,W=t.get(P);W.shadowIntensity=X.intensity,W.shadowBias=X.bias,W.shadowNormalBias=X.normalBias,W.shadowRadius=X.radius,W.shadowMapSize=X.mapSize,W.shadowCameraNear=X.camera.near,W.shadowCameraFar=X.camera.far,i.pointShadow[g]=W,i.pointShadowMap[g]=V,i.pointShadowMatrix[g]=P.shadow.matrix,S++}i.point[g]=q,g++}else if(P.isHemisphereLight){let q=e.get(P);q.skyColor.copy(P.color).multiplyScalar(F),q.groundColor.copy(P.groundColor).multiplyScalar(F),i.hemi[p]=q,p++}}m>0&&(n.has("OES_texture_float_linear")===!0?(i.rectAreaLTC1=Ce.LTC_FLOAT_1,i.rectAreaLTC2=Ce.LTC_FLOAT_2):(i.rectAreaLTC1=Ce.LTC_HALF_1,i.rectAreaLTC2=Ce.LTC_HALF_2)),i.ambient[0]=h,i.ambient[1]=u,i.ambient[2]=d;let E=i.hash;(E.directionalLength!==f||E.pointLength!==g||E.spotLength!==x||E.rectAreaLength!==m||E.hemiLength!==p||E.numDirectionalShadows!==T||E.numPointShadows!==S||E.numSpotShadows!==_||E.numSpotMaps!==C||E.numLightProbes!==A)&&(i.directional.length=f,i.spot.length=x,i.rectArea.length=m,i.point.length=g,i.hemi.length=p,i.directionalShadow.length=T,i.directionalShadowMap.length=T,i.pointShadow.length=S,i.pointShadowMap.length=S,i.spotShadow.length=_,i.spotShadowMap.length=_,i.directionalShadowMatrix.length=T,i.pointShadowMatrix.length=S,i.spotLightMatrix.length=_+C-M,i.spotLightMap.length=C,i.numSpotLightShadowsWithMaps=M,i.numLightProbes=A,E.directionalLength=f,E.pointLength=g,E.spotLength=x,E.rectAreaLength=m,E.hemiLength=p,E.numDirectionalShadows=T,E.numPointShadows=S,E.numSpotShadows=_,E.numSpotMaps=C,E.numLightProbes=A,i.version=ay++)}function l(c,h){let u=0,d=0,f=0,g=0,x=0,m=h.matrixWorldInverse;for(let p=0,T=c.length;p<T;p++){let S=c[p];if(S.isDirectionalLight){let _=i.directional[u];_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),u++}else if(S.isSpotLight){let _=i.spot[f];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),_.direction.setFromMatrixPosition(S.matrixWorld),r.setFromMatrixPosition(S.target.matrixWorld),_.direction.sub(r),_.direction.transformDirection(m),f++}else if(S.isRectAreaLight){let _=i.rectArea[g];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),o.identity(),s.copy(S.matrixWorld),s.premultiply(m),o.extractRotation(s),_.halfWidth.set(S.width*.5,0,0),_.halfHeight.set(0,S.height*.5,0),_.halfWidth.applyMatrix4(o),_.halfHeight.applyMatrix4(o),g++}else if(S.isPointLight){let _=i.point[d];_.position.setFromMatrixPosition(S.matrixWorld),_.position.applyMatrix4(m),d++}else if(S.isHemisphereLight){let _=i.hemi[x];_.direction.setFromMatrixPosition(S.matrixWorld),_.direction.transformDirection(m),x++}}}return{setup:a,setupView:l,state:i}}function Tm(n){let e=new wm(n),t=[],i=[];function r(h){c.camera=h,t.length=0,i.length=0}function s(h){t.push(h)}function o(h){i.push(h)}function a(){e.setup(t)}function l(h){e.setupView(t,h)}let c={lightsArray:t,shadowsArray:i,camera:null,lights:e,transmissionRenderTarget:{}};return{init:r,state:c,setupLights:a,setupLightsView:l,pushLight:s,pushShadow:o}}function Em(n){let e=new WeakMap;function t(r,s=0){let o=e.get(r),a;return o===void 0?(a=new Tm(n),e.set(r,[a])):s>=o.length?(a=new Tm(n),o.push(a)):a=o[s],a}function i(){e=new WeakMap}return{get:t,dispose:i}}var Am=`
void main() {

	gl_Position = vec4( position, 1.0 );

}
`,Cm=`
uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;

#include <packing>

void main() {

	const float samples = float( VSM_SAMPLES );

	float mean = 0.0;
	float squared_mean = 0.0;

	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {

		float uvOffset = uvStart + i * uvStride;

		#ifdef HORIZONTAL_PASS

			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;

		#else

			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;

		#endif

	}

	mean = mean / samples;
	squared_mean = squared_mean / samples;

	float std_dev = sqrt( squared_mean - mean * mean );

	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );

}
`;function Im(n,e,t){let i=new Qi,r=new ie,s=new ie,o=new ut,a=new vs({depthPacking:eu}),l=new bs,c={},h=t.maxTextureSize,u={[wi]:It,[It]:wi,[fi]:fi},d=new jt({defines:{VSM_SAMPLES:8},uniforms:{shadow_pass:{value:null},resolution:{value:new ie},radius:{value:4}},vertexShader:Am,fragmentShader:Cm}),f=d.clone();f.defines.HORIZONTAL_PASS=1;let g=new Ke;g.setAttribute("position",new mt(new Float32Array([-1,-1,.5,3,-1,.5,-1,3,.5]),3));let x=new gt(g,d),m=this;this.enabled=!1,this.autoUpdate=!0,this.needsUpdate=!1,this.type=Br;let p=this.type;this.render=function(M,A,E){if(m.enabled===!1||m.autoUpdate===!1&&m.needsUpdate===!1||M.length===0)return;let b=n.getRenderTarget(),v=n.getActiveCubeFace(),P=n.getActiveMipmapLevel(),N=n.state;N.setBlending(Fi),N.buffers.depth.getReversed()===!0?N.buffers.color.setClear(0,0,0,0):N.buffers.color.setClear(1,1,1,1),N.buffers.depth.setTest(!0),N.setScissorTest(!1);let F=p!==Xi&&this.type===Xi,z=p===Xi&&this.type!==Xi;for(let V=0,q=M.length;V<q;V++){let X=M[V],W=X.shadow;if(W===void 0){console.warn("THREE.WebGLShadowMap:",X,"has no shadow.");continue}if(W.autoUpdate===!1&&W.needsUpdate===!1)continue;r.copy(W.mapSize);let Y=W.getFrameExtents();if(r.multiply(Y),s.copy(W.mapSize),(r.x>h||r.y>h)&&(r.x>h&&(s.x=Math.floor(h/Y.x),r.x=s.x*Y.x,W.mapSize.x=s.x),r.y>h&&(s.y=Math.floor(h/Y.y),r.y=s.y*Y.y,W.mapSize.y=s.y)),W.map===null||F===!0||z===!0){let Me=this.type!==Xi?{minFilter:Ot,magFilter:Ot}:{};W.map!==null&&W.map.dispose(),W.map=new ii(r.x,r.y,Me),W.map.texture.name=X.name+".shadowMap",W.camera.updateProjectionMatrix()}n.setRenderTarget(W.map),n.clear();let oe=W.getViewportCount();for(let Me=0;Me<oe;Me++){let Ae=W.getViewport(Me);o.set(s.x*Ae.x,s.y*Ae.y,s.x*Ae.z,s.y*Ae.w),N.viewport(o),W.updateMatrices(X,Me),i=W.getFrustum(),_(A,E,W.camera,X,this.type)}W.isPointLightShadow!==!0&&this.type===Xi&&T(W,E),W.needsUpdate=!1}p=this.type,m.needsUpdate=!1,n.setRenderTarget(b,v,P)};function T(M,A){let E=e.update(x);d.defines.VSM_SAMPLES!==M.blurSamples&&(d.defines.VSM_SAMPLES=M.blurSamples,f.defines.VSM_SAMPLES=M.blurSamples,d.needsUpdate=!0,f.needsUpdate=!0),M.mapPass===null&&(M.mapPass=new ii(r.x,r.y)),d.uniforms.shadow_pass.value=M.map.texture,d.uniforms.resolution.value=M.mapSize,d.uniforms.radius.value=M.radius,n.setRenderTarget(M.mapPass),n.clear(),n.renderBufferDirect(A,null,E,d,x,null),f.uniforms.shadow_pass.value=M.mapPass.texture,f.uniforms.resolution.value=M.mapSize,f.uniforms.radius.value=M.radius,n.setRenderTarget(M.map),n.clear(),n.renderBufferDirect(A,null,E,f,x,null)}function S(M,A,E,b){let v=null,P=E.isPointLight===!0?M.customDistanceMaterial:M.customDepthMaterial;if(P!==void 0)v=P;else if(v=E.isPointLight===!0?l:a,n.localClippingEnabled&&A.clipShadows===!0&&Array.isArray(A.clippingPlanes)&&A.clippingPlanes.length!==0||A.displacementMap&&A.displacementScale!==0||A.alphaMap&&A.alphaTest>0||A.map&&A.alphaTest>0||A.alphaToCoverage===!0){let N=v.uuid,F=A.uuid,z=c[N];z===void 0&&(z={},c[N]=z);let V=z[F];V===void 0&&(V=v.clone(),z[F]=V,A.addEventListener("dispose",C)),v=V}if(v.visible=A.visible,v.wireframe=A.wireframe,b===Xi?v.side=A.shadowSide!==null?A.shadowSide:A.side:v.side=A.shadowSide!==null?A.shadowSide:u[A.side],v.alphaMap=A.alphaMap,v.alphaTest=A.alphaToCoverage===!0?.5:A.alphaTest,v.map=A.map,v.clipShadows=A.clipShadows,v.clippingPlanes=A.clippingPlanes,v.clipIntersection=A.clipIntersection,v.displacementMap=A.displacementMap,v.displacementScale=A.displacementScale,v.displacementBias=A.displacementBias,v.wireframeLinewidth=A.wireframeLinewidth,v.linewidth=A.linewidth,E.isPointLight===!0&&v.isMeshDistanceMaterial===!0){let N=n.properties.get(v);N.light=E}return v}function _(M,A,E,b,v){if(M.visible===!1)return;if(M.layers.test(A.layers)&&(M.isMesh||M.isLine||M.isPoints)&&(M.castShadow||M.receiveShadow&&v===Xi)&&(!M.frustumCulled||i.intersectsObject(M))){M.modelViewMatrix.multiplyMatrices(E.matrixWorldInverse,M.matrixWorld);let F=e.update(M),z=M.material;if(Array.isArray(z)){let V=F.groups;for(let q=0,X=V.length;q<X;q++){let W=V[q],Y=z[W.materialIndex];if(Y&&Y.visible){let oe=S(M,Y,b,v);M.onBeforeShadow(n,M,A,E,F,oe,W),n.renderBufferDirect(E,null,F,oe,M,W),M.onAfterShadow(n,M,A,E,F,oe,W)}}}else if(z.visible){let V=S(M,z,b,v);M.onBeforeShadow(n,M,A,E,F,V,null),n.renderBufferDirect(E,null,F,V,M,null),M.onAfterShadow(n,M,A,E,F,V,null)}}let N=M.children;for(let F=0,z=N.length;F<z;F++)_(N[F],A,E,b,v)}function C(M){M.target.removeEventListener("dispose",C);for(let E in c){let b=c[E],v=M.target.uuid;v in b&&(b[v].dispose(),delete b[v])}}}var hy={[ra]:sa,[oa]:ca,[aa]:ha,[Nn]:la,[sa]:ra,[ca]:oa,[ha]:aa,[la]:Nn};function Pm(n,e){function t(){let U=!1,fe=new ut,Ee=null,Be=new ut(0,0,0,0);return{setMask:function(ye){Ee!==ye&&!U&&(n.colorMask(ye,ye,ye,ye),Ee=ye)},setLocked:function(ye){U=ye},setClear:function(ye,he,Ve,it,Mt){Mt===!0&&(ye*=it,he*=it,Ve*=it),fe.set(ye,he,Ve,it),Be.equals(fe)===!1&&(n.clearColor(ye,he,Ve,it),Be.copy(fe))},reset:function(){U=!1,Ee=null,Be.set(-1,0,0,0)}}}function i(){let U=!1,fe=!1,Ee=null,Be=null,ye=null;return{setReversed:function(he){if(fe!==he){let Ve=e.get("EXT_clip_control");he?Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.ZERO_TO_ONE_EXT):Ve.clipControlEXT(Ve.LOWER_LEFT_EXT,Ve.NEGATIVE_ONE_TO_ONE_EXT),fe=he;let it=ye;ye=null,this.setClear(it)}},getReversed:function(){return fe},setTest:function(he){he?ce(n.DEPTH_TEST):re(n.DEPTH_TEST)},setMask:function(he){Ee!==he&&!U&&(n.depthMask(he),Ee=he)},setFunc:function(he){if(fe&&(he=hy[he]),Be!==he){switch(he){case ra:n.depthFunc(n.NEVER);break;case sa:n.depthFunc(n.ALWAYS);break;case oa:n.depthFunc(n.LESS);break;case Nn:n.depthFunc(n.LEQUAL);break;case aa:n.depthFunc(n.EQUAL);break;case la:n.depthFunc(n.GEQUAL);break;case ca:n.depthFunc(n.GREATER);break;case ha:n.depthFunc(n.NOTEQUAL);break;default:n.depthFunc(n.LEQUAL)}Be=he}},setLocked:function(he){U=he},setClear:function(he){ye!==he&&(fe&&(he=1-he),n.clearDepth(he),ye=he)},reset:function(){U=!1,Ee=null,Be=null,ye=null,fe=!1}}}function r(){let U=!1,fe=null,Ee=null,Be=null,ye=null,he=null,Ve=null,it=null,Mt=null;return{setTest:function(xt){U||(xt?ce(n.STENCIL_TEST):re(n.STENCIL_TEST))},setMask:function(xt){fe!==xt&&!U&&(n.stencilMask(xt),fe=xt)},setFunc:function(xt,hn,nn){(Ee!==xt||Be!==hn||ye!==nn)&&(n.stencilFunc(xt,hn,nn),Ee=xt,Be=hn,ye=nn)},setOp:function(xt,hn,nn){(he!==xt||Ve!==hn||it!==nn)&&(n.stencilOp(xt,hn,nn),he=xt,Ve=hn,it=nn)},setLocked:function(xt){U=xt},setClear:function(xt){Mt!==xt&&(n.clearStencil(xt),Mt=xt)},reset:function(){U=!1,fe=null,Ee=null,Be=null,ye=null,he=null,Ve=null,it=null,Mt=null}}}let s=new t,o=new i,a=new r,l=new WeakMap,c=new WeakMap,h={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,T=null,S=null,_=null,C=null,M=null,A=new Pe(0,0,0),E=0,b=!1,v=null,P=null,N=null,F=null,z=null,V=n.getParameter(n.MAX_COMBINED_TEXTURE_IMAGE_UNITS),q=!1,X=0,W=n.getParameter(n.VERSION);W.indexOf("WebGL")!==-1?(X=parseFloat(/^WebGL (\d)/.exec(W)[1]),q=X>=1):W.indexOf("OpenGL ES")!==-1&&(X=parseFloat(/^OpenGL ES (\d)/.exec(W)[1]),q=X>=2);let Y=null,oe={},Me=n.getParameter(n.SCISSOR_BOX),Ae=n.getParameter(n.VIEWPORT),ue=new ut().fromArray(Me),He=new ut().fromArray(Ae);function Re(U,fe,Ee,Be){let ye=new Uint8Array(4),he=n.createTexture();n.bindTexture(U,he),n.texParameteri(U,n.TEXTURE_MIN_FILTER,n.NEAREST),n.texParameteri(U,n.TEXTURE_MAG_FILTER,n.NEAREST);for(let Ve=0;Ve<Ee;Ve++)U===n.TEXTURE_3D||U===n.TEXTURE_2D_ARRAY?n.texImage3D(fe,0,n.RGBA,1,1,Be,0,n.RGBA,n.UNSIGNED_BYTE,ye):n.texImage2D(fe+Ve,0,n.RGBA,1,1,0,n.RGBA,n.UNSIGNED_BYTE,ye);return he}let te={};te[n.TEXTURE_2D]=Re(n.TEXTURE_2D,n.TEXTURE_2D,1),te[n.TEXTURE_CUBE_MAP]=Re(n.TEXTURE_CUBE_MAP,n.TEXTURE_CUBE_MAP_POSITIVE_X,6),te[n.TEXTURE_2D_ARRAY]=Re(n.TEXTURE_2D_ARRAY,n.TEXTURE_2D_ARRAY,1,1),te[n.TEXTURE_3D]=Re(n.TEXTURE_3D,n.TEXTURE_3D,1,1),s.setClear(0,0,0,1),o.setClear(1),a.setClear(0),ce(n.DEPTH_TEST),o.setFunc(Nn),K(!1),Q(Il),ce(n.CULL_FACE),D(Fi);function ce(U){h[U]!==!0&&(n.enable(U),h[U]=!0)}function re(U){h[U]!==!1&&(n.disable(U),h[U]=!1)}function xe(U,fe){return u[U]!==fe?(n.bindFramebuffer(U,fe),u[U]=fe,U===n.DRAW_FRAMEBUFFER&&(u[n.FRAMEBUFFER]=fe),U===n.FRAMEBUFFER&&(u[n.DRAW_FRAMEBUFFER]=fe),!0):!1}function _e(U,fe){let Ee=f,Be=!1;if(U){Ee=d.get(fe),Ee===void 0&&(Ee=[],d.set(fe,Ee));let ye=U.textures;if(Ee.length!==ye.length||Ee[0]!==n.COLOR_ATTACHMENT0){for(let he=0,Ve=ye.length;he<Ve;he++)Ee[he]=n.COLOR_ATTACHMENT0+he;Ee.length=ye.length,Be=!0}}else Ee[0]!==n.BACK&&(Ee[0]=n.BACK,Be=!0);Be&&n.drawBuffers(Ee)}function We(U){return g!==U?(n.useProgram(U),g=U,!0):!1}let rt={[fn]:n.FUNC_ADD,[Ah]:n.FUNC_SUBTRACT,[Ch]:n.FUNC_REVERSE_SUBTRACT};rt[Ih]=n.MIN,rt[Ph]=n.MAX;let L={[Rh]:n.ZERO,[Lh]:n.ONE,[Dh]:n.SRC_COLOR,[Vs]:n.SRC_ALPHA,[kh]:n.SRC_ALPHA_SATURATE,[Oh]:n.DST_COLOR,[Uh]:n.DST_ALPHA,[Nh]:n.ONE_MINUS_SRC_COLOR,[Hs]:n.ONE_MINUS_SRC_ALPHA,[Bh]:n.ONE_MINUS_DST_COLOR,[Fh]:n.ONE_MINUS_DST_ALPHA,[zh]:n.CONSTANT_COLOR,[Vh]:n.ONE_MINUS_CONSTANT_COLOR,[Hh]:n.CONSTANT_ALPHA,[Gh]:n.ONE_MINUS_CONSTANT_ALPHA};function D(U,fe,Ee,Be,ye,he,Ve,it,Mt,xt){if(U===Fi){x===!0&&(re(n.BLEND),x=!1);return}if(x===!1&&(ce(n.BLEND),x=!0),U!==Eh){if(U!==m||xt!==b){if((p!==fn||_!==fn)&&(n.blendEquation(n.FUNC_ADD),p=fn,_=fn),xt)switch(U){case un:n.blendFuncSeparate(n.ONE,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pl:n.blendFunc(n.ONE,n.ONE);break;case Rl:n.blendFuncSeparate(n.ZERO,n.ONE_MINUS_SRC_COLOR,n.ZERO,n.ONE);break;case Ll:n.blendFuncSeparate(n.DST_COLOR,n.ONE_MINUS_SRC_ALPHA,n.ZERO,n.ONE);break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}else switch(U){case un:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE_MINUS_SRC_ALPHA,n.ONE,n.ONE_MINUS_SRC_ALPHA);break;case Pl:n.blendFuncSeparate(n.SRC_ALPHA,n.ONE,n.ONE,n.ONE);break;case Rl:console.error("THREE.WebGLState: SubtractiveBlending requires material.premultipliedAlpha = true");break;case Ll:console.error("THREE.WebGLState: MultiplyBlending requires material.premultipliedAlpha = true");break;default:console.error("THREE.WebGLState: Invalid blending: ",U);break}T=null,S=null,C=null,M=null,A.set(0,0,0),E=0,m=U,b=xt}return}ye=ye||fe,he=he||Ee,Ve=Ve||Be,(fe!==p||ye!==_)&&(n.blendEquationSeparate(rt[fe],rt[ye]),p=fe,_=ye),(Ee!==T||Be!==S||he!==C||Ve!==M)&&(n.blendFuncSeparate(L[Ee],L[Be],L[he],L[Ve]),T=Ee,S=Be,C=he,M=Ve),(it.equals(A)===!1||Mt!==E)&&(n.blendColor(it.r,it.g,it.b,Mt),A.copy(it),E=Mt),m=U,b=!1}function Z(U,fe){U.side===fi?re(n.CULL_FACE):ce(n.CULL_FACE);let Ee=U.side===It;fe&&(Ee=!Ee),K(Ee),U.blending===un&&U.transparent===!1?D(Fi):D(U.blending,U.blendEquation,U.blendSrc,U.blendDst,U.blendEquationAlpha,U.blendSrcAlpha,U.blendDstAlpha,U.blendColor,U.blendAlpha,U.premultipliedAlpha),o.setFunc(U.depthFunc),o.setTest(U.depthTest),o.setMask(U.depthWrite),s.setMask(U.colorWrite);let Be=U.stencilWrite;a.setTest(Be),Be&&(a.setMask(U.stencilWriteMask),a.setFunc(U.stencilFunc,U.stencilRef,U.stencilFuncMask),a.setOp(U.stencilFail,U.stencilZFail,U.stencilZPass)),pe(U.polygonOffset,U.polygonOffsetFactor,U.polygonOffsetUnits),U.alphaToCoverage===!0?ce(n.SAMPLE_ALPHA_TO_COVERAGE):re(n.SAMPLE_ALPHA_TO_COVERAGE)}function K(U){v!==U&&(U?n.frontFace(n.CW):n.frontFace(n.CCW),v=U)}function Q(U){U!==Sh?(ce(n.CULL_FACE),U!==P&&(U===Il?n.cullFace(n.BACK):U===wh?n.cullFace(n.FRONT):n.cullFace(n.FRONT_AND_BACK))):re(n.CULL_FACE),P=U}function Se(U){U!==N&&(q&&n.lineWidth(U),N=U)}function pe(U,fe,Ee){U?(ce(n.POLYGON_OFFSET_FILL),(F!==fe||z!==Ee)&&(n.polygonOffset(fe,Ee),F=fe,z=Ee)):re(n.POLYGON_OFFSET_FILL)}function Te(U){U?ce(n.SCISSOR_TEST):re(n.SCISSOR_TEST)}function Qe(U){U===void 0&&(U=n.TEXTURE0+V-1),Y!==U&&(n.activeTexture(U),Y=U)}function je(U,fe,Ee){Ee===void 0&&(Y===null?Ee=n.TEXTURE0+V-1:Ee=Y);let Be=oe[Ee];Be===void 0&&(Be={type:void 0,texture:void 0},oe[Ee]=Be),(Be.type!==U||Be.texture!==fe)&&(Y!==Ee&&(n.activeTexture(Ee),Y=Ee),n.bindTexture(U,fe||te[U]),Be.type=U,Be.texture=fe)}function I(){let U=oe[Y];U!==void 0&&U.type!==void 0&&(n.bindTexture(U.type,null),U.type=void 0,U.texture=void 0)}function y(){try{n.compressedTexImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function H(){try{n.compressedTexImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function $(){try{n.texSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ae(){try{n.texSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ee(){try{n.compressedTexSubImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function ke(){try{n.compressedTexSubImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function we(){try{n.texStorage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Oe(){try{n.texStorage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function Fe(){try{n.texImage2D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function me(){try{n.texImage3D(...arguments)}catch(U){console.error("THREE.WebGLState:",U)}}function B(U){ue.equals(U)===!1&&(n.scissor(U.x,U.y,U.z,U.w),ue.copy(U))}function se(U){He.equals(U)===!1&&(n.viewport(U.x,U.y,U.z,U.w),He.copy(U))}function ne(U,fe){let Ee=c.get(fe);Ee===void 0&&(Ee=new WeakMap,c.set(fe,Ee));let Be=Ee.get(U);Be===void 0&&(Be=n.getUniformBlockIndex(fe,U.name),Ee.set(U,Be))}function le(U,fe){let Be=c.get(fe).get(U);l.get(fe)!==Be&&(n.uniformBlockBinding(fe,Be,U.__bindingPointIndex),l.set(fe,Be))}function Ge(){n.disable(n.BLEND),n.disable(n.CULL_FACE),n.disable(n.DEPTH_TEST),n.disable(n.POLYGON_OFFSET_FILL),n.disable(n.SCISSOR_TEST),n.disable(n.STENCIL_TEST),n.disable(n.SAMPLE_ALPHA_TO_COVERAGE),n.blendEquation(n.FUNC_ADD),n.blendFunc(n.ONE,n.ZERO),n.blendFuncSeparate(n.ONE,n.ZERO,n.ONE,n.ZERO),n.blendColor(0,0,0,0),n.colorMask(!0,!0,!0,!0),n.clearColor(0,0,0,0),n.depthMask(!0),n.depthFunc(n.LESS),o.setReversed(!1),n.clearDepth(1),n.stencilMask(4294967295),n.stencilFunc(n.ALWAYS,0,4294967295),n.stencilOp(n.KEEP,n.KEEP,n.KEEP),n.clearStencil(0),n.cullFace(n.BACK),n.frontFace(n.CCW),n.polygonOffset(0,0),n.activeTexture(n.TEXTURE0),n.bindFramebuffer(n.FRAMEBUFFER,null),n.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),n.bindFramebuffer(n.READ_FRAMEBUFFER,null),n.useProgram(null),n.lineWidth(1),n.scissor(0,0,n.canvas.width,n.canvas.height),n.viewport(0,0,n.canvas.width,n.canvas.height),h={},Y=null,oe={},u={},d=new WeakMap,f=[],g=null,x=!1,m=null,p=null,T=null,S=null,_=null,C=null,M=null,A=new Pe(0,0,0),E=0,b=!1,v=null,P=null,N=null,F=null,z=null,ue.set(0,0,n.canvas.width,n.canvas.height),He.set(0,0,n.canvas.width,n.canvas.height),s.reset(),o.reset(),a.reset()}return{buffers:{color:s,depth:o,stencil:a},enable:ce,disable:re,bindFramebuffer:xe,drawBuffers:_e,useProgram:We,setBlending:D,setMaterial:Z,setFlipSided:K,setCullFace:Q,setLineWidth:Se,setPolygonOffset:pe,setScissorTest:Te,activeTexture:Qe,bindTexture:je,unbindTexture:I,compressedTexImage2D:y,compressedTexImage3D:H,texImage2D:Fe,texImage3D:me,updateUBOMapping:ne,uniformBlockBinding:le,texStorage2D:we,texStorage3D:Oe,texSubImage2D:$,texSubImage3D:ae,compressedTexSubImage2D:ee,compressedTexSubImage3D:ke,scissor:B,viewport:se,reset:Ge}}function Rm(n,e,t,i,r,s,o){let a=e.has("WEBGL_multisampled_render_to_texture")?e.get("WEBGL_multisampled_render_to_texture"):null,l=typeof navigator>"u"?!1:/OculusBrowser/g.test(navigator.userAgent),c=new ie,h=new WeakMap,u,d=new WeakMap,f=!1;try{f=typeof OffscreenCanvas<"u"&&new OffscreenCanvas(1,1).getContext("2d")!==null}catch{}function g(I,y){return f?new OffscreenCanvas(I,y):Vn("canvas")}function x(I,y,H){let $=1,ae=je(I);if((ae.width>H||ae.height>H)&&($=H/Math.max(ae.width,ae.height)),$<1)if(typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&I instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&I instanceof ImageBitmap||typeof VideoFrame<"u"&&I instanceof VideoFrame){let ee=Math.floor($*ae.width),ke=Math.floor($*ae.height);u===void 0&&(u=g(ee,ke));let we=y?g(ee,ke):u;return we.width=ee,we.height=ke,we.getContext("2d").drawImage(I,0,0,ee,ke),console.warn("THREE.WebGLRenderer: Texture has been resized from ("+ae.width+"x"+ae.height+") to ("+ee+"x"+ke+")."),we}else return"data"in I&&console.warn("THREE.WebGLRenderer: Image in DataTexture is too big ("+ae.width+"x"+ae.height+")."),I;return I}function m(I){return I.generateMipmaps}function p(I){n.generateMipmap(I)}function T(I){return I.isWebGLCubeRenderTarget?n.TEXTURE_CUBE_MAP:I.isWebGL3DRenderTarget?n.TEXTURE_3D:I.isWebGLArrayRenderTarget||I.isCompressedArrayTexture?n.TEXTURE_2D_ARRAY:n.TEXTURE_2D}function S(I,y,H,$,ae=!1){if(I!==null){if(n[I]!==void 0)return n[I];console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '"+I+"'")}let ee=y;if(y===n.RED&&(H===n.FLOAT&&(ee=n.R32F),H===n.HALF_FLOAT&&(ee=n.R16F),H===n.UNSIGNED_BYTE&&(ee=n.R8)),y===n.RED_INTEGER&&(H===n.UNSIGNED_BYTE&&(ee=n.R8UI),H===n.UNSIGNED_SHORT&&(ee=n.R16UI),H===n.UNSIGNED_INT&&(ee=n.R32UI),H===n.BYTE&&(ee=n.R8I),H===n.SHORT&&(ee=n.R16I),H===n.INT&&(ee=n.R32I)),y===n.RG&&(H===n.FLOAT&&(ee=n.RG32F),H===n.HALF_FLOAT&&(ee=n.RG16F),H===n.UNSIGNED_BYTE&&(ee=n.RG8)),y===n.RG_INTEGER&&(H===n.UNSIGNED_BYTE&&(ee=n.RG8UI),H===n.UNSIGNED_SHORT&&(ee=n.RG16UI),H===n.UNSIGNED_INT&&(ee=n.RG32UI),H===n.BYTE&&(ee=n.RG8I),H===n.SHORT&&(ee=n.RG16I),H===n.INT&&(ee=n.RG32I)),y===n.RGB_INTEGER&&(H===n.UNSIGNED_BYTE&&(ee=n.RGB8UI),H===n.UNSIGNED_SHORT&&(ee=n.RGB16UI),H===n.UNSIGNED_INT&&(ee=n.RGB32UI),H===n.BYTE&&(ee=n.RGB8I),H===n.SHORT&&(ee=n.RGB16I),H===n.INT&&(ee=n.RGB32I)),y===n.RGBA_INTEGER&&(H===n.UNSIGNED_BYTE&&(ee=n.RGBA8UI),H===n.UNSIGNED_SHORT&&(ee=n.RGBA16UI),H===n.UNSIGNED_INT&&(ee=n.RGBA32UI),H===n.BYTE&&(ee=n.RGBA8I),H===n.SHORT&&(ee=n.RGBA16I),H===n.INT&&(ee=n.RGBA32I)),y===n.RGB&&(H===n.UNSIGNED_INT_5_9_9_9_REV&&(ee=n.RGB9_E5),H===n.UNSIGNED_INT_10F_11F_11F_REV&&(ee=n.R11F_G11F_B10F)),y===n.RGBA){let ke=ae?hr:st.getTransfer($);H===n.FLOAT&&(ee=n.RGBA32F),H===n.HALF_FLOAT&&(ee=n.RGBA16F),H===n.UNSIGNED_BYTE&&(ee=ke===ht?n.SRGB8_ALPHA8:n.RGBA8),H===n.UNSIGNED_SHORT_4_4_4_4&&(ee=n.RGBA4),H===n.UNSIGNED_SHORT_5_5_5_1&&(ee=n.RGB5_A1)}return(ee===n.R16F||ee===n.R32F||ee===n.RG16F||ee===n.RG32F||ee===n.RGBA16F||ee===n.RGBA32F)&&e.get("EXT_color_buffer_float"),ee}function _(I,y){let H;return I?y===null||y===gi||y===mn?H=n.DEPTH24_STENCIL8:y===Jt?H=n.DEPTH32F_STENCIL8:y===pn&&(H=n.DEPTH24_STENCIL8,console.warn("DepthTexture: 16 bit depth attachment is not supported with stencil. Using 24-bit attachment.")):y===null||y===gi||y===mn?H=n.DEPTH_COMPONENT24:y===Jt?H=n.DEPTH_COMPONENT32F:y===pn&&(H=n.DEPTH_COMPONENT16),H}function C(I,y){return m(I)===!0||I.isFramebufferTexture&&I.minFilter!==Ot&&I.minFilter!==Bt?Math.log2(Math.max(y.width,y.height))+1:I.mipmaps!==void 0&&I.mipmaps.length>0?I.mipmaps.length:I.isCompressedTexture&&Array.isArray(I.image)?y.mipmaps.length:1}function M(I){let y=I.target;y.removeEventListener("dispose",M),E(y),y.isVideoTexture&&h.delete(y)}function A(I){let y=I.target;y.removeEventListener("dispose",A),v(y)}function E(I){let y=i.get(I);if(y.__webglInit===void 0)return;let H=I.source,$=d.get(H);if($){let ae=$[y.__cacheKey];ae.usedTimes--,ae.usedTimes===0&&b(I),Object.keys($).length===0&&d.delete(H)}i.remove(I)}function b(I){let y=i.get(I);n.deleteTexture(y.__webglTexture);let H=I.source,$=d.get(H);delete $[y.__cacheKey],o.memory.textures--}function v(I){let y=i.get(I);if(I.depthTexture&&(I.depthTexture.dispose(),i.remove(I.depthTexture)),I.isWebGLCubeRenderTarget)for(let $=0;$<6;$++){if(Array.isArray(y.__webglFramebuffer[$]))for(let ae=0;ae<y.__webglFramebuffer[$].length;ae++)n.deleteFramebuffer(y.__webglFramebuffer[$][ae]);else n.deleteFramebuffer(y.__webglFramebuffer[$]);y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer[$])}else{if(Array.isArray(y.__webglFramebuffer))for(let $=0;$<y.__webglFramebuffer.length;$++)n.deleteFramebuffer(y.__webglFramebuffer[$]);else n.deleteFramebuffer(y.__webglFramebuffer);if(y.__webglDepthbuffer&&n.deleteRenderbuffer(y.__webglDepthbuffer),y.__webglMultisampledFramebuffer&&n.deleteFramebuffer(y.__webglMultisampledFramebuffer),y.__webglColorRenderbuffer)for(let $=0;$<y.__webglColorRenderbuffer.length;$++)y.__webglColorRenderbuffer[$]&&n.deleteRenderbuffer(y.__webglColorRenderbuffer[$]);y.__webglDepthRenderbuffer&&n.deleteRenderbuffer(y.__webglDepthRenderbuffer)}let H=I.textures;for(let $=0,ae=H.length;$<ae;$++){let ee=i.get(H[$]);ee.__webglTexture&&(n.deleteTexture(ee.__webglTexture),o.memory.textures--),i.remove(H[$])}i.remove(I)}let P=0;function N(){P=0}function F(){let I=P;return I>=r.maxTextures&&console.warn("THREE.WebGLTextures: Trying to use "+I+" texture units while this GPU supports only "+r.maxTextures),P+=1,I}function z(I){let y=[];return y.push(I.wrapS),y.push(I.wrapT),y.push(I.wrapR||0),y.push(I.magFilter),y.push(I.minFilter),y.push(I.anisotropy),y.push(I.internalFormat),y.push(I.format),y.push(I.type),y.push(I.generateMipmaps),y.push(I.premultiplyAlpha),y.push(I.flipY),y.push(I.unpackAlignment),y.push(I.colorSpace),y.join()}function V(I,y){let H=i.get(I);if(I.isVideoTexture&&Te(I),I.isRenderTargetTexture===!1&&I.isExternalTexture!==!0&&I.version>0&&H.__version!==I.version){let $=I.image;if($===null)console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");else if($.complete===!1)console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");else{te(H,I,y);return}}else I.isExternalTexture&&(H.__webglTexture=I.sourceTexture?I.sourceTexture:null);t.bindTexture(n.TEXTURE_2D,H.__webglTexture,n.TEXTURE0+y)}function q(I,y){let H=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){te(H,I,y);return}t.bindTexture(n.TEXTURE_2D_ARRAY,H.__webglTexture,n.TEXTURE0+y)}function X(I,y){let H=i.get(I);if(I.isRenderTargetTexture===!1&&I.version>0&&H.__version!==I.version){te(H,I,y);return}t.bindTexture(n.TEXTURE_3D,H.__webglTexture,n.TEXTURE0+y)}function W(I,y){let H=i.get(I);if(I.version>0&&H.__version!==I.version){ce(H,I,y);return}t.bindTexture(n.TEXTURE_CUBE_MAP,H.__webglTexture,n.TEXTURE0+y)}let Y={[Un]:n.REPEAT,[si]:n.CLAMP_TO_EDGE,[Fn]:n.MIRRORED_REPEAT},oe={[Ot]:n.NEAREST,[Gs]:n.NEAREST_MIPMAP_NEAREST,[On]:n.NEAREST_MIPMAP_LINEAR,[Bt]:n.LINEAR,[lr]:n.LINEAR_MIPMAP_NEAREST,[di]:n.LINEAR_MIPMAP_LINEAR},Me={[iu]:n.NEVER,[lu]:n.ALWAYS,[nu]:n.LESS,[Sa]:n.LEQUAL,[ru]:n.EQUAL,[au]:n.GEQUAL,[su]:n.GREATER,[ou]:n.NOTEQUAL};function Ae(I,y){if(y.type===Jt&&e.has("OES_texture_float_linear")===!1&&(y.magFilter===Bt||y.magFilter===lr||y.magFilter===On||y.magFilter===di||y.minFilter===Bt||y.minFilter===lr||y.minFilter===On||y.minFilter===di)&&console.warn("THREE.WebGLRenderer: Unable to use linear filtering with floating point textures. OES_texture_float_linear not supported on this device."),n.texParameteri(I,n.TEXTURE_WRAP_S,Y[y.wrapS]),n.texParameteri(I,n.TEXTURE_WRAP_T,Y[y.wrapT]),(I===n.TEXTURE_3D||I===n.TEXTURE_2D_ARRAY)&&n.texParameteri(I,n.TEXTURE_WRAP_R,Y[y.wrapR]),n.texParameteri(I,n.TEXTURE_MAG_FILTER,oe[y.magFilter]),n.texParameteri(I,n.TEXTURE_MIN_FILTER,oe[y.minFilter]),y.compareFunction&&(n.texParameteri(I,n.TEXTURE_COMPARE_MODE,n.COMPARE_REF_TO_TEXTURE),n.texParameteri(I,n.TEXTURE_COMPARE_FUNC,Me[y.compareFunction])),e.has("EXT_texture_filter_anisotropic")===!0){if(y.magFilter===Ot||y.minFilter!==On&&y.minFilter!==di||y.type===Jt&&e.has("OES_texture_float_linear")===!1)return;if(y.anisotropy>1||i.get(y).__currentAnisotropy){let H=e.get("EXT_texture_filter_anisotropic");n.texParameterf(I,H.TEXTURE_MAX_ANISOTROPY_EXT,Math.min(y.anisotropy,r.getMaxAnisotropy())),i.get(y).__currentAnisotropy=y.anisotropy}}}function ue(I,y){let H=!1;I.__webglInit===void 0&&(I.__webglInit=!0,y.addEventListener("dispose",M));let $=y.source,ae=d.get($);ae===void 0&&(ae={},d.set($,ae));let ee=z(y);if(ee!==I.__cacheKey){ae[ee]===void 0&&(ae[ee]={texture:n.createTexture(),usedTimes:0},o.memory.textures++,H=!0),ae[ee].usedTimes++;let ke=ae[I.__cacheKey];ke!==void 0&&(ae[I.__cacheKey].usedTimes--,ke.usedTimes===0&&b(y)),I.__cacheKey=ee,I.__webglTexture=ae[ee].texture}return H}function He(I,y,H){return Math.floor(Math.floor(I/H)/y)}function Re(I,y,H,$){let ee=I.updateRanges;if(ee.length===0)t.texSubImage2D(n.TEXTURE_2D,0,0,0,y.width,y.height,H,$,y.data);else{ee.sort((me,B)=>me.start-B.start);let ke=0;for(let me=1;me<ee.length;me++){let B=ee[ke],se=ee[me],ne=B.start+B.count,le=He(se.start,y.width,4),Ge=He(B.start,y.width,4);se.start<=ne+1&&le===Ge&&He(se.start+se.count-1,y.width,4)===le?B.count=Math.max(B.count,se.start+se.count-B.start):(++ke,ee[ke]=se)}ee.length=ke+1;let we=n.getParameter(n.UNPACK_ROW_LENGTH),Oe=n.getParameter(n.UNPACK_SKIP_PIXELS),Fe=n.getParameter(n.UNPACK_SKIP_ROWS);n.pixelStorei(n.UNPACK_ROW_LENGTH,y.width);for(let me=0,B=ee.length;me<B;me++){let se=ee[me],ne=Math.floor(se.start/4),le=Math.ceil(se.count/4),Ge=ne%y.width,U=Math.floor(ne/y.width),fe=le,Ee=1;n.pixelStorei(n.UNPACK_SKIP_PIXELS,Ge),n.pixelStorei(n.UNPACK_SKIP_ROWS,U),t.texSubImage2D(n.TEXTURE_2D,0,Ge,U,fe,Ee,H,$,y.data)}I.clearUpdateRanges(),n.pixelStorei(n.UNPACK_ROW_LENGTH,we),n.pixelStorei(n.UNPACK_SKIP_PIXELS,Oe),n.pixelStorei(n.UNPACK_SKIP_ROWS,Fe)}}function te(I,y,H){let $=n.TEXTURE_2D;(y.isDataArrayTexture||y.isCompressedArrayTexture)&&($=n.TEXTURE_2D_ARRAY),y.isData3DTexture&&($=n.TEXTURE_3D);let ae=ue(I,y),ee=y.source;t.bindTexture($,I.__webglTexture,n.TEXTURE0+H);let ke=i.get(ee);if(ee.version!==ke.__version||ae===!0){t.activeTexture(n.TEXTURE0+H);let we=st.getPrimaries(st.workingColorSpace),Oe=y.colorSpace===xi?null:st.getPrimaries(y.colorSpace),Fe=y.colorSpace===xi||we===Oe?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Fe);let me=x(y.image,!1,r.maxTextureSize);me=Qe(y,me);let B=s.convert(y.format,y.colorSpace),se=s.convert(y.type),ne=S(y.internalFormat,B,se,y.colorSpace,y.isVideoTexture);Ae($,y);let le,Ge=y.mipmaps,U=y.isVideoTexture!==!0,fe=ke.__version===void 0||ae===!0,Ee=ee.dataReady,Be=C(y,me);if(y.isDepthTexture)ne=_(y.format===xn,y.type),fe&&(U?t.texStorage2D(n.TEXTURE_2D,1,ne,me.width,me.height):t.texImage2D(n.TEXTURE_2D,0,ne,me.width,me.height,0,B,se,null));else if(y.isDataTexture)if(Ge.length>0){U&&fe&&t.texStorage2D(n.TEXTURE_2D,Be,ne,Ge[0].width,Ge[0].height);for(let ye=0,he=Ge.length;ye<he;ye++)le=Ge[ye],U?Ee&&t.texSubImage2D(n.TEXTURE_2D,ye,0,0,le.width,le.height,B,se,le.data):t.texImage2D(n.TEXTURE_2D,ye,ne,le.width,le.height,0,B,se,le.data);y.generateMipmaps=!1}else U?(fe&&t.texStorage2D(n.TEXTURE_2D,Be,ne,me.width,me.height),Ee&&Re(y,me,B,se)):t.texImage2D(n.TEXTURE_2D,0,ne,me.width,me.height,0,B,se,me.data);else if(y.isCompressedTexture)if(y.isCompressedArrayTexture){U&&fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,ne,Ge[0].width,Ge[0].height,me.depth);for(let ye=0,he=Ge.length;ye<he;ye++)if(le=Ge[ye],y.format!==Dt)if(B!==null)if(U){if(Ee)if(y.layerUpdates.size>0){let Ve=wc(le.width,le.height,y.format,y.type);for(let it of y.layerUpdates){let Mt=le.data.subarray(it*Ve/le.data.BYTES_PER_ELEMENT,(it+1)*Ve/le.data.BYTES_PER_ELEMENT);t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ye,0,0,it,le.width,le.height,1,B,Mt)}y.clearLayerUpdates()}else t.compressedTexSubImage3D(n.TEXTURE_2D_ARRAY,ye,0,0,0,le.width,le.height,me.depth,B,le.data)}else t.compressedTexImage3D(n.TEXTURE_2D_ARRAY,ye,ne,le.width,le.height,me.depth,0,le.data,0,0);else console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");else U?Ee&&t.texSubImage3D(n.TEXTURE_2D_ARRAY,ye,0,0,0,le.width,le.height,me.depth,B,se,le.data):t.texImage3D(n.TEXTURE_2D_ARRAY,ye,ne,le.width,le.height,me.depth,0,B,se,le.data)}else{U&&fe&&t.texStorage2D(n.TEXTURE_2D,Be,ne,Ge[0].width,Ge[0].height);for(let ye=0,he=Ge.length;ye<he;ye++)le=Ge[ye],y.format!==Dt?B!==null?U?Ee&&t.compressedTexSubImage2D(n.TEXTURE_2D,ye,0,0,le.width,le.height,B,le.data):t.compressedTexImage2D(n.TEXTURE_2D,ye,ne,le.width,le.height,0,le.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()"):U?Ee&&t.texSubImage2D(n.TEXTURE_2D,ye,0,0,le.width,le.height,B,se,le.data):t.texImage2D(n.TEXTURE_2D,ye,ne,le.width,le.height,0,B,se,le.data)}else if(y.isDataArrayTexture)if(U){if(fe&&t.texStorage3D(n.TEXTURE_2D_ARRAY,Be,ne,me.width,me.height,me.depth),Ee)if(y.layerUpdates.size>0){let ye=wc(me.width,me.height,y.format,y.type);for(let he of y.layerUpdates){let Ve=me.data.subarray(he*ye/me.data.BYTES_PER_ELEMENT,(he+1)*ye/me.data.BYTES_PER_ELEMENT);t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,he,me.width,me.height,1,B,se,Ve)}y.clearLayerUpdates()}else t.texSubImage3D(n.TEXTURE_2D_ARRAY,0,0,0,0,me.width,me.height,me.depth,B,se,me.data)}else t.texImage3D(n.TEXTURE_2D_ARRAY,0,ne,me.width,me.height,me.depth,0,B,se,me.data);else if(y.isData3DTexture)U?(fe&&t.texStorage3D(n.TEXTURE_3D,Be,ne,me.width,me.height,me.depth),Ee&&t.texSubImage3D(n.TEXTURE_3D,0,0,0,0,me.width,me.height,me.depth,B,se,me.data)):t.texImage3D(n.TEXTURE_3D,0,ne,me.width,me.height,me.depth,0,B,se,me.data);else if(y.isFramebufferTexture){if(fe)if(U)t.texStorage2D(n.TEXTURE_2D,Be,ne,me.width,me.height);else{let ye=me.width,he=me.height;for(let Ve=0;Ve<Be;Ve++)t.texImage2D(n.TEXTURE_2D,Ve,ne,ye,he,0,B,se,null),ye>>=1,he>>=1}}else if(Ge.length>0){if(U&&fe){let ye=je(Ge[0]);t.texStorage2D(n.TEXTURE_2D,Be,ne,ye.width,ye.height)}for(let ye=0,he=Ge.length;ye<he;ye++)le=Ge[ye],U?Ee&&t.texSubImage2D(n.TEXTURE_2D,ye,0,0,B,se,le):t.texImage2D(n.TEXTURE_2D,ye,ne,B,se,le);y.generateMipmaps=!1}else if(U){if(fe){let ye=je(me);t.texStorage2D(n.TEXTURE_2D,Be,ne,ye.width,ye.height)}Ee&&t.texSubImage2D(n.TEXTURE_2D,0,0,0,B,se,me)}else t.texImage2D(n.TEXTURE_2D,0,ne,B,se,me);m(y)&&p($),ke.__version=ee.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function ce(I,y,H){if(y.image.length!==6)return;let $=ue(I,y),ae=y.source;t.bindTexture(n.TEXTURE_CUBE_MAP,I.__webglTexture,n.TEXTURE0+H);let ee=i.get(ae);if(ae.version!==ee.__version||$===!0){t.activeTexture(n.TEXTURE0+H);let ke=st.getPrimaries(st.workingColorSpace),we=y.colorSpace===xi?null:st.getPrimaries(y.colorSpace),Oe=y.colorSpace===xi||ke===we?n.NONE:n.BROWSER_DEFAULT_WEBGL;n.pixelStorei(n.UNPACK_FLIP_Y_WEBGL,y.flipY),n.pixelStorei(n.UNPACK_PREMULTIPLY_ALPHA_WEBGL,y.premultiplyAlpha),n.pixelStorei(n.UNPACK_ALIGNMENT,y.unpackAlignment),n.pixelStorei(n.UNPACK_COLORSPACE_CONVERSION_WEBGL,Oe);let Fe=y.isCompressedTexture||y.image[0].isCompressedTexture,me=y.image[0]&&y.image[0].isDataTexture,B=[];for(let he=0;he<6;he++)!Fe&&!me?B[he]=x(y.image[he],!0,r.maxCubemapSize):B[he]=me?y.image[he].image:y.image[he],B[he]=Qe(y,B[he]);let se=B[0],ne=s.convert(y.format,y.colorSpace),le=s.convert(y.type),Ge=S(y.internalFormat,ne,le,y.colorSpace),U=y.isVideoTexture!==!0,fe=ee.__version===void 0||$===!0,Ee=ae.dataReady,Be=C(y,se);Ae(n.TEXTURE_CUBE_MAP,y);let ye;if(Fe){U&&fe&&t.texStorage2D(n.TEXTURE_CUBE_MAP,Be,Ge,se.width,se.height);for(let he=0;he<6;he++){ye=B[he].mipmaps;for(let Ve=0;Ve<ye.length;Ve++){let it=ye[Ve];y.format!==Dt?ne!==null?U?Ee&&t.compressedTexSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,0,0,it.width,it.height,ne,it.data):t.compressedTexImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,Ge,it.width,it.height,0,it.data):console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()"):U?Ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,0,0,it.width,it.height,ne,le,it.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve,Ge,it.width,it.height,0,ne,le,it.data)}}}else{if(ye=y.mipmaps,U&&fe){ye.length>0&&Be++;let he=je(B[0]);t.texStorage2D(n.TEXTURE_CUBE_MAP,Be,Ge,he.width,he.height)}for(let he=0;he<6;he++)if(me){U?Ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,B[he].width,B[he].height,ne,le,B[he].data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ge,B[he].width,B[he].height,0,ne,le,B[he].data);for(let Ve=0;Ve<ye.length;Ve++){let Mt=ye[Ve].image[he].image;U?Ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,0,0,Mt.width,Mt.height,ne,le,Mt.data):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,Ge,Mt.width,Mt.height,0,ne,le,Mt.data)}}else{U?Ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,0,0,ne,le,B[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,0,Ge,ne,le,B[he]);for(let Ve=0;Ve<ye.length;Ve++){let it=ye[Ve];U?Ee&&t.texSubImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,0,0,ne,le,it.image[he]):t.texImage2D(n.TEXTURE_CUBE_MAP_POSITIVE_X+he,Ve+1,Ge,ne,le,it.image[he])}}}m(y)&&p(n.TEXTURE_CUBE_MAP),ee.__version=ae.version,y.onUpdate&&y.onUpdate(y)}I.__version=y.version}function re(I,y,H,$,ae,ee){let ke=s.convert(H.format,H.colorSpace),we=s.convert(H.type),Oe=S(H.internalFormat,ke,we,H.colorSpace),Fe=i.get(y),me=i.get(H);if(me.__renderTarget=y,!Fe.__hasExternalTextures){let B=Math.max(1,y.width>>ee),se=Math.max(1,y.height>>ee);ae===n.TEXTURE_3D||ae===n.TEXTURE_2D_ARRAY?t.texImage3D(ae,ee,Oe,B,se,y.depth,0,ke,we,null):t.texImage2D(ae,ee,Oe,B,se,0,ke,we,null)}t.bindFramebuffer(n.FRAMEBUFFER,I),pe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,$,ae,me.__webglTexture,0,Se(y)):(ae===n.TEXTURE_2D||ae>=n.TEXTURE_CUBE_MAP_POSITIVE_X&&ae<=n.TEXTURE_CUBE_MAP_NEGATIVE_Z)&&n.framebufferTexture2D(n.FRAMEBUFFER,$,ae,me.__webglTexture,ee),t.bindFramebuffer(n.FRAMEBUFFER,null)}function xe(I,y,H){if(n.bindRenderbuffer(n.RENDERBUFFER,I),y.depthBuffer){let $=y.depthTexture,ae=$&&$.isDepthTexture?$.type:null,ee=_(y.stencilBuffer,ae),ke=y.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,we=Se(y);pe(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,we,ee,y.width,y.height):H?n.renderbufferStorageMultisample(n.RENDERBUFFER,we,ee,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,ee,y.width,y.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,ke,n.RENDERBUFFER,I)}else{let $=y.textures;for(let ae=0;ae<$.length;ae++){let ee=$[ae],ke=s.convert(ee.format,ee.colorSpace),we=s.convert(ee.type),Oe=S(ee.internalFormat,ke,we,ee.colorSpace),Fe=Se(y);H&&pe(y)===!1?n.renderbufferStorageMultisample(n.RENDERBUFFER,Fe,Oe,y.width,y.height):pe(y)?a.renderbufferStorageMultisampleEXT(n.RENDERBUFFER,Fe,Oe,y.width,y.height):n.renderbufferStorage(n.RENDERBUFFER,Oe,y.width,y.height)}}n.bindRenderbuffer(n.RENDERBUFFER,null)}function _e(I,y){if(y&&y.isWebGLCubeRenderTarget)throw new Error("Depth Texture with cube render targets is not supported");if(t.bindFramebuffer(n.FRAMEBUFFER,I),!(y.depthTexture&&y.depthTexture.isDepthTexture))throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");let $=i.get(y.depthTexture);$.__renderTarget=y,(!$.__webglTexture||y.depthTexture.image.width!==y.width||y.depthTexture.image.height!==y.height)&&(y.depthTexture.image.width=y.width,y.depthTexture.image.height=y.height,y.depthTexture.needsUpdate=!0),V(y.depthTexture,0);let ae=$.__webglTexture,ee=Se(y);if(y.depthTexture.format===gn)pe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_ATTACHMENT,n.TEXTURE_2D,ae,0);else if(y.depthTexture.format===xn)pe(y)?a.framebufferTexture2DMultisampleEXT(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0,ee):n.framebufferTexture2D(n.FRAMEBUFFER,n.DEPTH_STENCIL_ATTACHMENT,n.TEXTURE_2D,ae,0);else throw new Error("Unknown depthTexture format")}function We(I){let y=i.get(I),H=I.isWebGLCubeRenderTarget===!0;if(y.__boundDepthTexture!==I.depthTexture){let $=I.depthTexture;if(y.__depthDisposeCallback&&y.__depthDisposeCallback(),$){let ae=()=>{delete y.__boundDepthTexture,delete y.__depthDisposeCallback,$.removeEventListener("dispose",ae)};$.addEventListener("dispose",ae),y.__depthDisposeCallback=ae}y.__boundDepthTexture=$}if(I.depthTexture&&!y.__autoAllocateDepthBuffer){if(H)throw new Error("target.depthTexture not supported in Cube render targets");let $=I.texture.mipmaps;$&&$.length>0?_e(y.__webglFramebuffer[0],I):_e(y.__webglFramebuffer,I)}else if(H){y.__webglDepthbuffer=[];for(let $=0;$<6;$++)if(t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[$]),y.__webglDepthbuffer[$]===void 0)y.__webglDepthbuffer[$]=n.createRenderbuffer(),xe(y.__webglDepthbuffer[$],I,!1);else{let ae=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=y.__webglDepthbuffer[$];n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ee)}}else{let $=I.texture.mipmaps;if($&&$.length>0?t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer[0]):t.bindFramebuffer(n.FRAMEBUFFER,y.__webglFramebuffer),y.__webglDepthbuffer===void 0)y.__webglDepthbuffer=n.createRenderbuffer(),xe(y.__webglDepthbuffer,I,!1);else{let ae=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ee=y.__webglDepthbuffer;n.bindRenderbuffer(n.RENDERBUFFER,ee),n.framebufferRenderbuffer(n.FRAMEBUFFER,ae,n.RENDERBUFFER,ee)}}t.bindFramebuffer(n.FRAMEBUFFER,null)}function rt(I,y,H){let $=i.get(I);y!==void 0&&re($.__webglFramebuffer,I,I.texture,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,0),H!==void 0&&We(I)}function L(I){let y=I.texture,H=i.get(I),$=i.get(y);I.addEventListener("dispose",A);let ae=I.textures,ee=I.isWebGLCubeRenderTarget===!0,ke=ae.length>1;if(ke||($.__webglTexture===void 0&&($.__webglTexture=n.createTexture()),$.__version=y.version,o.memory.textures++),ee){H.__webglFramebuffer=[];for(let we=0;we<6;we++)if(y.mipmaps&&y.mipmaps.length>0){H.__webglFramebuffer[we]=[];for(let Oe=0;Oe<y.mipmaps.length;Oe++)H.__webglFramebuffer[we][Oe]=n.createFramebuffer()}else H.__webglFramebuffer[we]=n.createFramebuffer()}else{if(y.mipmaps&&y.mipmaps.length>0){H.__webglFramebuffer=[];for(let we=0;we<y.mipmaps.length;we++)H.__webglFramebuffer[we]=n.createFramebuffer()}else H.__webglFramebuffer=n.createFramebuffer();if(ke)for(let we=0,Oe=ae.length;we<Oe;we++){let Fe=i.get(ae[we]);Fe.__webglTexture===void 0&&(Fe.__webglTexture=n.createTexture(),o.memory.textures++)}if(I.samples>0&&pe(I)===!1){H.__webglMultisampledFramebuffer=n.createFramebuffer(),H.__webglColorRenderbuffer=[],t.bindFramebuffer(n.FRAMEBUFFER,H.__webglMultisampledFramebuffer);for(let we=0;we<ae.length;we++){let Oe=ae[we];H.__webglColorRenderbuffer[we]=n.createRenderbuffer(),n.bindRenderbuffer(n.RENDERBUFFER,H.__webglColorRenderbuffer[we]);let Fe=s.convert(Oe.format,Oe.colorSpace),me=s.convert(Oe.type),B=S(Oe.internalFormat,Fe,me,Oe.colorSpace,I.isXRRenderTarget===!0),se=Se(I);n.renderbufferStorageMultisample(n.RENDERBUFFER,se,B,I.width,I.height),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+we,n.RENDERBUFFER,H.__webglColorRenderbuffer[we])}n.bindRenderbuffer(n.RENDERBUFFER,null),I.depthBuffer&&(H.__webglDepthRenderbuffer=n.createRenderbuffer(),xe(H.__webglDepthRenderbuffer,I,!0)),t.bindFramebuffer(n.FRAMEBUFFER,null)}}if(ee){t.bindTexture(n.TEXTURE_CUBE_MAP,$.__webglTexture),Ae(n.TEXTURE_CUBE_MAP,y);for(let we=0;we<6;we++)if(y.mipmaps&&y.mipmaps.length>0)for(let Oe=0;Oe<y.mipmaps.length;Oe++)re(H.__webglFramebuffer[we][Oe],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+we,Oe);else re(H.__webglFramebuffer[we],I,y,n.COLOR_ATTACHMENT0,n.TEXTURE_CUBE_MAP_POSITIVE_X+we,0);m(y)&&p(n.TEXTURE_CUBE_MAP),t.unbindTexture()}else if(ke){for(let we=0,Oe=ae.length;we<Oe;we++){let Fe=ae[we],me=i.get(Fe),B=n.TEXTURE_2D;(I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(B=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(B,me.__webglTexture),Ae(B,Fe),re(H.__webglFramebuffer,I,Fe,n.COLOR_ATTACHMENT0+we,B,0),m(Fe)&&p(B)}t.unbindTexture()}else{let we=n.TEXTURE_2D;if((I.isWebGL3DRenderTarget||I.isWebGLArrayRenderTarget)&&(we=I.isWebGL3DRenderTarget?n.TEXTURE_3D:n.TEXTURE_2D_ARRAY),t.bindTexture(we,$.__webglTexture),Ae(we,y),y.mipmaps&&y.mipmaps.length>0)for(let Oe=0;Oe<y.mipmaps.length;Oe++)re(H.__webglFramebuffer[Oe],I,y,n.COLOR_ATTACHMENT0,we,Oe);else re(H.__webglFramebuffer,I,y,n.COLOR_ATTACHMENT0,we,0);m(y)&&p(we),t.unbindTexture()}I.depthBuffer&&We(I)}function D(I){let y=I.textures;for(let H=0,$=y.length;H<$;H++){let ae=y[H];if(m(ae)){let ee=T(I),ke=i.get(ae).__webglTexture;t.bindTexture(ee,ke),p(ee),t.unbindTexture()}}}let Z=[],K=[];function Q(I){if(I.samples>0){if(pe(I)===!1){let y=I.textures,H=I.width,$=I.height,ae=n.COLOR_BUFFER_BIT,ee=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT,ke=i.get(I),we=y.length>1;if(we)for(let Fe=0;Fe<y.length;Fe++)t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,null),t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,null,0);t.bindFramebuffer(n.READ_FRAMEBUFFER,ke.__webglMultisampledFramebuffer);let Oe=I.texture.mipmaps;Oe&&Oe.length>0?t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglFramebuffer[0]):t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglFramebuffer);for(let Fe=0;Fe<y.length;Fe++){if(I.resolveDepthBuffer&&(I.depthBuffer&&(ae|=n.DEPTH_BUFFER_BIT),I.stencilBuffer&&I.resolveStencilBuffer&&(ae|=n.STENCIL_BUFFER_BIT)),we){n.framebufferRenderbuffer(n.READ_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.RENDERBUFFER,ke.__webglColorRenderbuffer[Fe]);let me=i.get(y[Fe]).__webglTexture;n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0,n.TEXTURE_2D,me,0)}n.blitFramebuffer(0,0,H,$,0,0,H,$,ae,n.NEAREST),l===!0&&(Z.length=0,K.length=0,Z.push(n.COLOR_ATTACHMENT0+Fe),I.depthBuffer&&I.resolveDepthBuffer===!1&&(Z.push(ee),K.push(ee),n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,K)),n.invalidateFramebuffer(n.READ_FRAMEBUFFER,Z))}if(t.bindFramebuffer(n.READ_FRAMEBUFFER,null),t.bindFramebuffer(n.DRAW_FRAMEBUFFER,null),we)for(let Fe=0;Fe<y.length;Fe++){t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglMultisampledFramebuffer),n.framebufferRenderbuffer(n.FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.RENDERBUFFER,ke.__webglColorRenderbuffer[Fe]);let me=i.get(y[Fe]).__webglTexture;t.bindFramebuffer(n.FRAMEBUFFER,ke.__webglFramebuffer),n.framebufferTexture2D(n.DRAW_FRAMEBUFFER,n.COLOR_ATTACHMENT0+Fe,n.TEXTURE_2D,me,0)}t.bindFramebuffer(n.DRAW_FRAMEBUFFER,ke.__webglMultisampledFramebuffer)}else if(I.depthBuffer&&I.resolveDepthBuffer===!1&&l){let y=I.stencilBuffer?n.DEPTH_STENCIL_ATTACHMENT:n.DEPTH_ATTACHMENT;n.invalidateFramebuffer(n.DRAW_FRAMEBUFFER,[y])}}}function Se(I){return Math.min(r.maxSamples,I.samples)}function pe(I){let y=i.get(I);return I.samples>0&&e.has("WEBGL_multisampled_render_to_texture")===!0&&y.__useRenderToTexture!==!1}function Te(I){let y=o.render.frame;h.get(I)!==y&&(h.set(I,y),I.update())}function Qe(I,y){let H=I.colorSpace,$=I.format,ae=I.type;return I.isCompressedTexture===!0||I.isVideoTexture===!0||H!==Yi&&H!==xi&&(st.getTransfer(H)===ht?($!==Dt||ae!==Zt)&&console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType."):console.error("THREE.WebGLTextures: Unsupported texture color space:",H)),y}function je(I){return typeof HTMLImageElement<"u"&&I instanceof HTMLImageElement?(c.width=I.naturalWidth||I.width,c.height=I.naturalHeight||I.height):typeof VideoFrame<"u"&&I instanceof VideoFrame?(c.width=I.displayWidth,c.height=I.displayHeight):(c.width=I.width,c.height=I.height),c}this.allocateTextureUnit=F,this.resetTextureUnits=N,this.setTexture2D=V,this.setTexture2DArray=q,this.setTexture3D=X,this.setTextureCube=W,this.rebindTextures=rt,this.setupRenderTarget=L,this.updateRenderTargetMipmap=D,this.updateMultisampleRenderTarget=Q,this.setupDepthRenderbuffer=We,this.setupFrameBufferTexture=re,this.useMultisampledRTT=pe}function Bc(n,e){function t(i,r=xi){let s,o=st.getTransfer(r);if(i===Zt)return n.UNSIGNED_BYTE;if(i===Gr)return n.UNSIGNED_SHORT_4_4_4_4;if(i===Wr)return n.UNSIGNED_SHORT_5_5_5_1;if(i===pa)return n.UNSIGNED_INT_5_9_9_9_REV;if(i===ma)return n.UNSIGNED_INT_10F_11F_11F_REV;if(i===fa)return n.BYTE;if(i===da)return n.SHORT;if(i===pn)return n.UNSIGNED_SHORT;if(i===Hr)return n.INT;if(i===gi)return n.UNSIGNED_INT;if(i===Jt)return n.FLOAT;if(i===rn)return n.HALF_FLOAT;if(i===ga)return n.ALPHA;if(i===xa)return n.RGB;if(i===Dt)return n.RGBA;if(i===gn)return n.DEPTH_COMPONENT;if(i===xn)return n.DEPTH_STENCIL;if(i===Ws)return n.RED;if(i===cr)return n.RED_INTEGER;if(i===_a)return n.RG;if(i===Xr)return n.RG_INTEGER;if(i===qr)return n.RGBA_INTEGER;if(i===Yr||i===Zr||i===Jr||i===Kr)if(o===ht)if(s=e.get("WEBGL_compressed_texture_s3tc_srgb"),s!==null){if(i===Yr)return s.COMPRESSED_SRGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;if(i===Kr)return s.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT}else return null;else if(s=e.get("WEBGL_compressed_texture_s3tc"),s!==null){if(i===Yr)return s.COMPRESSED_RGB_S3TC_DXT1_EXT;if(i===Zr)return s.COMPRESSED_RGBA_S3TC_DXT1_EXT;if(i===Jr)return s.COMPRESSED_RGBA_S3TC_DXT3_EXT;if(i===Kr)return s.COMPRESSED_RGBA_S3TC_DXT5_EXT}else return null;if(i===Xs||i===qs||i===Ys||i===Zs)if(s=e.get("WEBGL_compressed_texture_pvrtc"),s!==null){if(i===Xs)return s.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;if(i===qs)return s.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;if(i===Ys)return s.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;if(i===Zs)return s.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG}else return null;if(i===Js||i===Ks||i===js)if(s=e.get("WEBGL_compressed_texture_etc"),s!==null){if(i===Js||i===Ks)return o===ht?s.COMPRESSED_SRGB8_ETC2:s.COMPRESSED_RGB8_ETC2;if(i===js)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC:s.COMPRESSED_RGBA8_ETC2_EAC}else return null;if(i===$s||i===Qs||i===eo||i===to||i===io||i===no||i===ro||i===so||i===oo||i===ao||i===lo||i===co||i===ho||i===uo)if(s=e.get("WEBGL_compressed_texture_astc"),s!==null){if(i===$s)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR:s.COMPRESSED_RGBA_ASTC_4x4_KHR;if(i===Qs)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR:s.COMPRESSED_RGBA_ASTC_5x4_KHR;if(i===eo)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR:s.COMPRESSED_RGBA_ASTC_5x5_KHR;if(i===to)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR:s.COMPRESSED_RGBA_ASTC_6x5_KHR;if(i===io)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR:s.COMPRESSED_RGBA_ASTC_6x6_KHR;if(i===no)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR:s.COMPRESSED_RGBA_ASTC_8x5_KHR;if(i===ro)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR:s.COMPRESSED_RGBA_ASTC_8x6_KHR;if(i===so)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR:s.COMPRESSED_RGBA_ASTC_8x8_KHR;if(i===oo)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR:s.COMPRESSED_RGBA_ASTC_10x5_KHR;if(i===ao)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR:s.COMPRESSED_RGBA_ASTC_10x6_KHR;if(i===lo)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR:s.COMPRESSED_RGBA_ASTC_10x8_KHR;if(i===co)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR:s.COMPRESSED_RGBA_ASTC_10x10_KHR;if(i===ho)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR:s.COMPRESSED_RGBA_ASTC_12x10_KHR;if(i===uo)return o===ht?s.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR:s.COMPRESSED_RGBA_ASTC_12x12_KHR}else return null;if(i===fo||i===po||i===mo)if(s=e.get("EXT_texture_compression_bptc"),s!==null){if(i===fo)return o===ht?s.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT:s.COMPRESSED_RGBA_BPTC_UNORM_EXT;if(i===po)return s.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;if(i===mo)return s.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT}else return null;if(i===go||i===xo||i===_o||i===yo)if(s=e.get("EXT_texture_compression_rgtc"),s!==null){if(i===go)return s.COMPRESSED_RED_RGTC1_EXT;if(i===xo)return s.COMPRESSED_SIGNED_RED_RGTC1_EXT;if(i===_o)return s.COMPRESSED_RED_GREEN_RGTC2_EXT;if(i===yo)return s.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT}else return null;return i===mn?n.UNSIGNED_INT_24_8:n[i]!==void 0?n[i]:null}return{convert:t}}var uy=`
void main() {

	gl_Position = vec4( position, 1.0 );

}`,fy=`
uniform sampler2DArray depthColor;
uniform float depthWidth;
uniform float depthHeight;

void main() {

	vec2 coord = vec2( gl_FragCoord.x / depthWidth, gl_FragCoord.y / depthHeight );

	if ( coord.x >= 1.0 ) {

		gl_FragDepth = texture( depthColor, vec3( coord.x - 1.0, coord.y, 1 ) ).r;

	} else {

		gl_FragDepth = texture( depthColor, vec3( coord.x, coord.y, 0 ) ).r;

	}

}`,dl=class{constructor(){this.texture=null,this.mesh=null,this.depthNear=0,this.depthFar=0}init(e,t){if(this.texture===null){let i=new br(e.texture);(e.depthNear!==t.depthNear||e.depthFar!==t.depthFar)&&(this.depthNear=e.depthNear,this.depthFar=e.depthFar),this.texture=i}}getMesh(e){if(this.texture!==null&&this.mesh===null){let t=e.cameras[0].viewport,i=new jt({vertexShader:uy,fragmentShader:fy,uniforms:{depthColor:{value:this.texture},depthWidth:{value:t.z},depthHeight:{value:t.w}}});this.mesh=new gt(new Rn(20,20),i)}return this.mesh}reset(){this.texture=null,this.mesh=null}getDepthTexture(){return this.texture}};var pl=class extends Ht{constructor(e,t){super();let i=this,r=null,s=1,o=null,a="local-floor",l=1,c=null,h=null,u=null,d=null,f=null,g=null,x=typeof XRWebGLBinding<"u",m=new dl,p={},T=t.getContextAttributes(),S=null,_=null,C=[],M=[],A=new ie,E=null,b=new Et;b.viewport=new ut;let v=new Et;v.viewport=new ut;let P=[b,v],N=new Xo,F=null,z=null;this.cameraAutoUpdate=!0,this.enabled=!1,this.isPresenting=!1,this.getController=function(te){let ce=C[te];return ce===void 0&&(ce=new _r,C[te]=ce),ce.getTargetRaySpace()},this.getControllerGrip=function(te){let ce=C[te];return ce===void 0&&(ce=new _r,C[te]=ce),ce.getGripSpace()},this.getHand=function(te){let ce=C[te];return ce===void 0&&(ce=new _r,C[te]=ce),ce.getHandSpace()};function V(te){let ce=M.indexOf(te.inputSource);if(ce===-1)return;let re=C[ce];re!==void 0&&(re.update(te.inputSource,te.frame,c||o),re.dispatchEvent({type:te.type,data:te.inputSource}))}function q(){r.removeEventListener("select",V),r.removeEventListener("selectstart",V),r.removeEventListener("selectend",V),r.removeEventListener("squeeze",V),r.removeEventListener("squeezestart",V),r.removeEventListener("squeezeend",V),r.removeEventListener("end",q),r.removeEventListener("inputsourceschange",X);for(let te=0;te<C.length;te++){let ce=M[te];ce!==null&&(M[te]=null,C[te].disconnect(ce))}F=null,z=null,m.reset();for(let te in p)delete p[te];e.setRenderTarget(S),f=null,d=null,u=null,r=null,_=null,Re.stop(),i.isPresenting=!1,e.setPixelRatio(E),e.setSize(A.width,A.height,!1),i.dispatchEvent({type:"sessionend"})}this.setFramebufferScaleFactor=function(te){s=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.")},this.setReferenceSpaceType=function(te){a=te,i.isPresenting===!0&&console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.")},this.getReferenceSpace=function(){return c||o},this.setReferenceSpace=function(te){c=te},this.getBaseLayer=function(){return d!==null?d:f},this.getBinding=function(){return u===null&&x&&(u=new XRWebGLBinding(r,t)),u},this.getFrame=function(){return g},this.getSession=function(){return r},this.setSession=async function(te){if(r=te,r!==null){if(S=e.getRenderTarget(),r.addEventListener("select",V),r.addEventListener("selectstart",V),r.addEventListener("selectend",V),r.addEventListener("squeeze",V),r.addEventListener("squeezestart",V),r.addEventListener("squeezeend",V),r.addEventListener("end",q),r.addEventListener("inputsourceschange",X),T.xrCompatible!==!0&&await t.makeXRCompatible(),E=e.getPixelRatio(),e.getSize(A),x&&"createProjectionLayer"in XRWebGLBinding.prototype){let re=null,xe=null,_e=null;T.depth&&(_e=T.stencil?t.DEPTH24_STENCIL8:t.DEPTH_COMPONENT24,re=T.stencil?xn:gn,xe=T.stencil?mn:gi);let We={colorFormat:t.RGBA8,depthFormat:_e,scaleFactor:s};u=this.getBinding(),d=u.createProjectionLayer(We),r.updateRenderState({layers:[d]}),e.setPixelRatio(1),e.setSize(d.textureWidth,d.textureHeight,!1),_=new ii(d.textureWidth,d.textureHeight,{format:Dt,type:Zt,depthTexture:new vr(d.textureWidth,d.textureHeight,xe,void 0,void 0,void 0,void 0,void 0,void 0,re),stencilBuffer:T.stencil,colorSpace:e.outputColorSpace,samples:T.antialias?4:0,resolveDepthBuffer:d.ignoreDepthValues===!1,resolveStencilBuffer:d.ignoreDepthValues===!1})}else{let re={antialias:T.antialias,alpha:!0,depth:T.depth,stencil:T.stencil,framebufferScaleFactor:s};f=new XRWebGLLayer(r,t,re),r.updateRenderState({baseLayer:f}),e.setPixelRatio(1),e.setSize(f.framebufferWidth,f.framebufferHeight,!1),_=new ii(f.framebufferWidth,f.framebufferHeight,{format:Dt,type:Zt,colorSpace:e.outputColorSpace,stencilBuffer:T.stencil,resolveDepthBuffer:f.ignoreDepthValues===!1,resolveStencilBuffer:f.ignoreDepthValues===!1})}_.isXRRenderTarget=!0,this.setFoveation(l),c=null,o=await r.requestReferenceSpace(a),Re.setContext(r),Re.start(),i.isPresenting=!0,i.dispatchEvent({type:"sessionstart"})}},this.getEnvironmentBlendMode=function(){if(r!==null)return r.environmentBlendMode},this.getDepthTexture=function(){return m.getDepthTexture()};function X(te){for(let ce=0;ce<te.removed.length;ce++){let re=te.removed[ce],xe=M.indexOf(re);xe>=0&&(M[xe]=null,C[xe].disconnect(re))}for(let ce=0;ce<te.added.length;ce++){let re=te.added[ce],xe=M.indexOf(re);if(xe===-1){for(let We=0;We<C.length;We++)if(We>=M.length){M.push(re),xe=We;break}else if(M[We]===null){M[We]=re,xe=We;break}if(xe===-1)break}let _e=C[xe];_e&&_e.connect(re)}}let W=new R,Y=new R;function oe(te,ce,re){W.setFromMatrixPosition(ce.matrixWorld),Y.setFromMatrixPosition(re.matrixWorld);let xe=W.distanceTo(Y),_e=ce.projectionMatrix.elements,We=re.projectionMatrix.elements,rt=_e[14]/(_e[10]-1),L=_e[14]/(_e[10]+1),D=(_e[9]+1)/_e[5],Z=(_e[9]-1)/_e[5],K=(_e[8]-1)/_e[0],Q=(We[8]+1)/We[0],Se=rt*K,pe=rt*Q,Te=xe/(-K+Q),Qe=Te*-K;if(ce.matrixWorld.decompose(te.position,te.quaternion,te.scale),te.translateX(Qe),te.translateZ(Te),te.matrixWorld.compose(te.position,te.quaternion,te.scale),te.matrixWorldInverse.copy(te.matrixWorld).invert(),_e[10]===-1)te.projectionMatrix.copy(ce.projectionMatrix),te.projectionMatrixInverse.copy(ce.projectionMatrixInverse);else{let je=rt+Te,I=L+Te,y=Se-Qe,H=pe+(xe-Qe),$=D*L/I*je,ae=Z*L/I*je;te.projectionMatrix.makePerspective(y,H,$,ae,je,I),te.projectionMatrixInverse.copy(te.projectionMatrix).invert()}}function Me(te,ce){ce===null?te.matrixWorld.copy(te.matrix):te.matrixWorld.multiplyMatrices(ce.matrixWorld,te.matrix),te.matrixWorldInverse.copy(te.matrixWorld).invert()}this.updateCamera=function(te){if(r===null)return;let ce=te.near,re=te.far;m.texture!==null&&(m.depthNear>0&&(ce=m.depthNear),m.depthFar>0&&(re=m.depthFar)),N.near=v.near=b.near=ce,N.far=v.far=b.far=re,(F!==N.near||z!==N.far)&&(r.updateRenderState({depthNear:N.near,depthFar:N.far}),F=N.near,z=N.far),N.layers.mask=te.layers.mask|6,b.layers.mask=N.layers.mask&3,v.layers.mask=N.layers.mask&5;let xe=te.parent,_e=N.cameras;Me(N,xe);for(let We=0;We<_e.length;We++)Me(_e[We],xe);_e.length===2?oe(N,b,v):N.projectionMatrix.copy(b.projectionMatrix),Ae(te,N,xe)};function Ae(te,ce,re){re===null?te.matrix.copy(ce.matrixWorld):(te.matrix.copy(re.matrixWorld),te.matrix.invert(),te.matrix.multiply(ce.matrixWorld)),te.matrix.decompose(te.position,te.quaternion,te.scale),te.updateMatrixWorld(!0),te.projectionMatrix.copy(ce.projectionMatrix),te.projectionMatrixInverse.copy(ce.projectionMatrixInverse),te.isPerspectiveCamera&&(te.fov=kn*2*Math.atan(1/te.projectionMatrix.elements[5]),te.zoom=1)}this.getCamera=function(){return N},this.getFoveation=function(){if(!(d===null&&f===null))return l},this.setFoveation=function(te){l=te,d!==null&&(d.fixedFoveation=te),f!==null&&f.fixedFoveation!==void 0&&(f.fixedFoveation=te)},this.hasDepthSensing=function(){return m.texture!==null},this.getDepthSensingMesh=function(){return m.getMesh(N)},this.getCameraTexture=function(te){return p[te]};let ue=null;function He(te,ce){if(h=ce.getViewerPose(c||o),g=ce,h!==null){let re=h.views;f!==null&&(e.setRenderTargetFramebuffer(_,f.framebuffer),e.setRenderTarget(_));let xe=!1;re.length!==N.cameras.length&&(N.cameras.length=0,xe=!0);for(let L=0;L<re.length;L++){let D=re[L],Z=null;if(f!==null)Z=f.getViewport(D);else{let Q=u.getViewSubImage(d,D);Z=Q.viewport,L===0&&(e.setRenderTargetTextures(_,Q.colorTexture,Q.depthStencilTexture),e.setRenderTarget(_))}let K=P[L];K===void 0&&(K=new Et,K.layers.enable(L),K.viewport=new ut,P[L]=K),K.matrix.fromArray(D.transform.matrix),K.matrix.decompose(K.position,K.quaternion,K.scale),K.projectionMatrix.fromArray(D.projectionMatrix),K.projectionMatrixInverse.copy(K.projectionMatrix).invert(),K.viewport.set(Z.x,Z.y,Z.width,Z.height),L===0&&(N.matrix.copy(K.matrix),N.matrix.decompose(N.position,N.quaternion,N.scale)),xe===!0&&N.cameras.push(K)}let _e=r.enabledFeatures;if(_e&&_e.includes("depth-sensing")&&r.depthUsage=="gpu-optimized"&&x){u=i.getBinding();let L=u.getDepthInformation(re[0]);L&&L.isValid&&L.texture&&m.init(L,r.renderState)}if(_e&&_e.includes("camera-access")&&x){e.state.unbindTexture(),u=i.getBinding();for(let L=0;L<re.length;L++){let D=re[L].camera;if(D){let Z=p[D];Z||(Z=new br,p[D]=Z);let K=u.getCameraImage(D);Z.sourceTexture=K}}}}for(let re=0;re<C.length;re++){let xe=M[re],_e=C[re];xe!==null&&_e!==void 0&&_e.update(xe,ce,c||o)}ue&&ue(te,ce),ce.detectedPlanes&&i.dispatchEvent({type:"planesdetected",data:ce}),g=null}let Re=new al;Re.setAnimationLoop(He),this.setAnimationLoop=function(te){ue=te},this.dispose=function(){}}};var Lr=new Wt,dy=new Je;function Lm(n,e){function t(m,p){m.matrixAutoUpdate===!0&&m.updateMatrix(),p.value.copy(m.matrix)}function i(m,p){p.color.getRGB(m.fogColor.value,Ha(n)),p.isFog?(m.fogNear.value=p.near,m.fogFar.value=p.far):p.isFogExp2&&(m.fogDensity.value=p.density)}function r(m,p,T,S,_){p.isMeshBasicMaterial||p.isMeshLambertMaterial?s(m,p):p.isMeshToonMaterial?(s(m,p),u(m,p)):p.isMeshPhongMaterial?(s(m,p),h(m,p)):p.isMeshStandardMaterial?(s(m,p),d(m,p),p.isMeshPhysicalMaterial&&f(m,p,_)):p.isMeshMatcapMaterial?(s(m,p),g(m,p)):p.isMeshDepthMaterial?s(m,p):p.isMeshDistanceMaterial?(s(m,p),x(m,p)):p.isMeshNormalMaterial?s(m,p):p.isLineBasicMaterial?(o(m,p),p.isLineDashedMaterial&&a(m,p)):p.isPointsMaterial?l(m,p,T,S):p.isSpriteMaterial?c(m,p):p.isShadowMaterial?(m.color.value.copy(p.color),m.opacity.value=p.opacity):p.isShaderMaterial&&(p.uniformsNeedUpdate=!1)}function s(m,p){m.opacity.value=p.opacity,p.color&&m.diffuse.value.copy(p.color),p.emissive&&m.emissive.value.copy(p.emissive).multiplyScalar(p.emissiveIntensity),p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.bumpMap&&(m.bumpMap.value=p.bumpMap,t(p.bumpMap,m.bumpMapTransform),m.bumpScale.value=p.bumpScale,p.side===It&&(m.bumpScale.value*=-1)),p.normalMap&&(m.normalMap.value=p.normalMap,t(p.normalMap,m.normalMapTransform),m.normalScale.value.copy(p.normalScale),p.side===It&&m.normalScale.value.negate()),p.displacementMap&&(m.displacementMap.value=p.displacementMap,t(p.displacementMap,m.displacementMapTransform),m.displacementScale.value=p.displacementScale,m.displacementBias.value=p.displacementBias),p.emissiveMap&&(m.emissiveMap.value=p.emissiveMap,t(p.emissiveMap,m.emissiveMapTransform)),p.specularMap&&(m.specularMap.value=p.specularMap,t(p.specularMap,m.specularMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest);let T=e.get(p),S=T.envMap,_=T.envMapRotation;S&&(m.envMap.value=S,Lr.copy(_),Lr.x*=-1,Lr.y*=-1,Lr.z*=-1,S.isCubeTexture&&S.isRenderTargetTexture===!1&&(Lr.y*=-1,Lr.z*=-1),m.envMapRotation.value.setFromMatrix4(dy.makeRotationFromEuler(Lr)),m.flipEnvMap.value=S.isCubeTexture&&S.isRenderTargetTexture===!1?-1:1,m.reflectivity.value=p.reflectivity,m.ior.value=p.ior,m.refractionRatio.value=p.refractionRatio),p.lightMap&&(m.lightMap.value=p.lightMap,m.lightMapIntensity.value=p.lightMapIntensity,t(p.lightMap,m.lightMapTransform)),p.aoMap&&(m.aoMap.value=p.aoMap,m.aoMapIntensity.value=p.aoMapIntensity,t(p.aoMap,m.aoMapTransform))}function o(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform))}function a(m,p){m.dashSize.value=p.dashSize,m.totalSize.value=p.dashSize+p.gapSize,m.scale.value=p.scale}function l(m,p,T,S){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.size.value=p.size*T,m.scale.value=S*.5,p.map&&(m.map.value=p.map,t(p.map,m.uvTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function c(m,p){m.diffuse.value.copy(p.color),m.opacity.value=p.opacity,m.rotation.value=p.rotation,p.map&&(m.map.value=p.map,t(p.map,m.mapTransform)),p.alphaMap&&(m.alphaMap.value=p.alphaMap,t(p.alphaMap,m.alphaMapTransform)),p.alphaTest>0&&(m.alphaTest.value=p.alphaTest)}function h(m,p){m.specular.value.copy(p.specular),m.shininess.value=Math.max(p.shininess,1e-4)}function u(m,p){p.gradientMap&&(m.gradientMap.value=p.gradientMap)}function d(m,p){m.metalness.value=p.metalness,p.metalnessMap&&(m.metalnessMap.value=p.metalnessMap,t(p.metalnessMap,m.metalnessMapTransform)),m.roughness.value=p.roughness,p.roughnessMap&&(m.roughnessMap.value=p.roughnessMap,t(p.roughnessMap,m.roughnessMapTransform)),p.envMap&&(m.envMapIntensity.value=p.envMapIntensity)}function f(m,p,T){m.ior.value=p.ior,p.sheen>0&&(m.sheenColor.value.copy(p.sheenColor).multiplyScalar(p.sheen),m.sheenRoughness.value=p.sheenRoughness,p.sheenColorMap&&(m.sheenColorMap.value=p.sheenColorMap,t(p.sheenColorMap,m.sheenColorMapTransform)),p.sheenRoughnessMap&&(m.sheenRoughnessMap.value=p.sheenRoughnessMap,t(p.sheenRoughnessMap,m.sheenRoughnessMapTransform))),p.clearcoat>0&&(m.clearcoat.value=p.clearcoat,m.clearcoatRoughness.value=p.clearcoatRoughness,p.clearcoatMap&&(m.clearcoatMap.value=p.clearcoatMap,t(p.clearcoatMap,m.clearcoatMapTransform)),p.clearcoatRoughnessMap&&(m.clearcoatRoughnessMap.value=p.clearcoatRoughnessMap,t(p.clearcoatRoughnessMap,m.clearcoatRoughnessMapTransform)),p.clearcoatNormalMap&&(m.clearcoatNormalMap.value=p.clearcoatNormalMap,t(p.clearcoatNormalMap,m.clearcoatNormalMapTransform),m.clearcoatNormalScale.value.copy(p.clearcoatNormalScale),p.side===It&&m.clearcoatNormalScale.value.negate())),p.dispersion>0&&(m.dispersion.value=p.dispersion),p.iridescence>0&&(m.iridescence.value=p.iridescence,m.iridescenceIOR.value=p.iridescenceIOR,m.iridescenceThicknessMinimum.value=p.iridescenceThicknessRange[0],m.iridescenceThicknessMaximum.value=p.iridescenceThicknessRange[1],p.iridescenceMap&&(m.iridescenceMap.value=p.iridescenceMap,t(p.iridescenceMap,m.iridescenceMapTransform)),p.iridescenceThicknessMap&&(m.iridescenceThicknessMap.value=p.iridescenceThicknessMap,t(p.iridescenceThicknessMap,m.iridescenceThicknessMapTransform))),p.transmission>0&&(m.transmission.value=p.transmission,m.transmissionSamplerMap.value=T.texture,m.transmissionSamplerSize.value.set(T.width,T.height),p.transmissionMap&&(m.transmissionMap.value=p.transmissionMap,t(p.transmissionMap,m.transmissionMapTransform)),m.thickness.value=p.thickness,p.thicknessMap&&(m.thicknessMap.value=p.thicknessMap,t(p.thicknessMap,m.thicknessMapTransform)),m.attenuationDistance.value=p.attenuationDistance,m.attenuationColor.value.copy(p.attenuationColor)),p.anisotropy>0&&(m.anisotropyVector.value.set(p.anisotropy*Math.cos(p.anisotropyRotation),p.anisotropy*Math.sin(p.anisotropyRotation)),p.anisotropyMap&&(m.anisotropyMap.value=p.anisotropyMap,t(p.anisotropyMap,m.anisotropyMapTransform))),m.specularIntensity.value=p.specularIntensity,m.specularColor.value.copy(p.specularColor),p.specularColorMap&&(m.specularColorMap.value=p.specularColorMap,t(p.specularColorMap,m.specularColorMapTransform)),p.specularIntensityMap&&(m.specularIntensityMap.value=p.specularIntensityMap,t(p.specularIntensityMap,m.specularIntensityMapTransform))}function g(m,p){p.matcap&&(m.matcap.value=p.matcap)}function x(m,p){let T=e.get(p).light;m.referencePosition.value.setFromMatrixPosition(T.matrixWorld),m.nearDistance.value=T.shadow.camera.near,m.farDistance.value=T.shadow.camera.far}return{refreshFogUniforms:i,refreshMaterialUniforms:r}}function Dm(n,e,t,i){let r={},s={},o=[],a=n.getParameter(n.MAX_UNIFORM_BUFFER_BINDINGS);function l(T,S){let _=S.program;i.uniformBlockBinding(T,_)}function c(T,S){let _=r[T.id];_===void 0&&(g(T),_=h(T),r[T.id]=_,T.addEventListener("dispose",m));let C=S.program;i.updateUBOMapping(T,C);let M=e.render.frame;s[T.id]!==M&&(d(T),s[T.id]=M)}function h(T){let S=u();T.__bindingPointIndex=S;let _=n.createBuffer(),C=T.__size,M=T.usage;return n.bindBuffer(n.UNIFORM_BUFFER,_),n.bufferData(n.UNIFORM_BUFFER,C,M),n.bindBuffer(n.UNIFORM_BUFFER,null),n.bindBufferBase(n.UNIFORM_BUFFER,S,_),_}function u(){for(let T=0;T<a;T++)if(o.indexOf(T)===-1)return o.push(T),T;return console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached."),0}function d(T){let S=r[T.id],_=T.uniforms,C=T.__cache;n.bindBuffer(n.UNIFORM_BUFFER,S);for(let M=0,A=_.length;M<A;M++){let E=Array.isArray(_[M])?_[M]:[_[M]];for(let b=0,v=E.length;b<v;b++){let P=E[b];if(f(P,M,b,C)===!0){let N=P.__offset,F=Array.isArray(P.value)?P.value:[P.value],z=0;for(let V=0;V<F.length;V++){let q=F[V],X=x(q);typeof q=="number"||typeof q=="boolean"?(P.__data[0]=q,n.bufferSubData(n.UNIFORM_BUFFER,N+z,P.__data)):q.isMatrix3?(P.__data[0]=q.elements[0],P.__data[1]=q.elements[1],P.__data[2]=q.elements[2],P.__data[3]=0,P.__data[4]=q.elements[3],P.__data[5]=q.elements[4],P.__data[6]=q.elements[5],P.__data[7]=0,P.__data[8]=q.elements[6],P.__data[9]=q.elements[7],P.__data[10]=q.elements[8],P.__data[11]=0):(q.toArray(P.__data,z),z+=X.storage/Float32Array.BYTES_PER_ELEMENT)}n.bufferSubData(n.UNIFORM_BUFFER,N,P.__data)}}}n.bindBuffer(n.UNIFORM_BUFFER,null)}function f(T,S,_,C){let M=T.value,A=S+"_"+_;if(C[A]===void 0)return typeof M=="number"||typeof M=="boolean"?C[A]=M:C[A]=M.clone(),!0;{let E=C[A];if(typeof M=="number"||typeof M=="boolean"){if(E!==M)return C[A]=M,!0}else if(E.equals(M)===!1)return E.copy(M),!0}return!1}function g(T){let S=T.uniforms,_=0,C=16;for(let A=0,E=S.length;A<E;A++){let b=Array.isArray(S[A])?S[A]:[S[A]];for(let v=0,P=b.length;v<P;v++){let N=b[v],F=Array.isArray(N.value)?N.value:[N.value];for(let z=0,V=F.length;z<V;z++){let q=F[z],X=x(q),W=_%C,Y=W%X.boundary,oe=W+Y;_+=Y,oe!==0&&C-oe<X.storage&&(_+=C-oe),N.__data=new Float32Array(X.storage/Float32Array.BYTES_PER_ELEMENT),N.__offset=_,_+=X.storage}}}let M=_%C;return M>0&&(_+=C-M),T.__size=_,T.__cache={},this}function x(T){let S={boundary:0,storage:0};return typeof T=="number"||typeof T=="boolean"?(S.boundary=4,S.storage=4):T.isVector2?(S.boundary=8,S.storage=8):T.isVector3||T.isColor?(S.boundary=16,S.storage=12):T.isVector4?(S.boundary=16,S.storage=16):T.isMatrix3?(S.boundary=48,S.storage=48):T.isMatrix4?(S.boundary=64,S.storage=64):T.isTexture?console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group."):console.warn("THREE.WebGLRenderer: Unsupported uniform value type.",T),S}function m(T){let S=T.target;S.removeEventListener("dispose",m);let _=o.indexOf(S.__bindingPointIndex);o.splice(_,1),n.deleteBuffer(r[S.id]),delete r[S.id],delete s[S.id]}function p(){for(let T in r)n.deleteBuffer(r[T]);o=[],r={},s={}}return{bind:l,update:c,dispose:p}}var Jo=class{constructor(e={}){let{canvas:t=Ol(),context:i=null,depth:r=!0,stencil:s=!1,alpha:o=!1,antialias:a=!1,premultipliedAlpha:l=!0,preserveDrawingBuffer:c=!1,powerPreference:h="default",failIfMajorPerformanceCaveat:u=!1,reversedDepthBuffer:d=!1}=e;this.isWebGLRenderer=!0;let f;if(i!==null){if(typeof WebGLRenderingContext<"u"&&i instanceof WebGLRenderingContext)throw new Error("THREE.WebGLRenderer: WebGL 1 is not supported since r163.");f=i.getContextAttributes().alpha}else f=o;let g=new Uint32Array(4),x=new Int32Array(4),m=null,p=null,T=[],S=[];this.domElement=t,this.debug={checkShaderErrors:!0,onShaderError:null},this.autoClear=!0,this.autoClearColor=!0,this.autoClearDepth=!0,this.autoClearStencil=!0,this.sortObjects=!0,this.clippingPlanes=[],this.localClippingEnabled=!1,this.toneMapping=Oi,this.toneMappingExposure=1,this.transmissionResolutionScale=1;let _=this,C=!1;this._outputColorSpace=kt;let M=0,A=0,E=null,b=-1,v=null,P=new ut,N=new ut,F=null,z=new Pe(0),V=0,q=t.width,X=t.height,W=1,Y=null,oe=null,Me=new ut(0,0,q,X),Ae=new ut(0,0,q,X),ue=!1,He=new Qi,Re=!1,te=!1,ce=new Je,re=new R,xe=new ut,_e={background:null,fog:null,environment:null,overrideMaterial:null,isScene:!0},We=!1;function rt(){return E===null?W:1}let L=i;function D(w,O){return t.getContext(w,O)}try{let w={alpha:!0,depth:r,stencil:s,antialias:a,premultipliedAlpha:l,preserveDrawingBuffer:c,powerPreference:h,failIfMajorPerformanceCaveat:u};if("setAttribute"in t&&t.setAttribute("data-engine",`three.js r${"180"}`),t.addEventListener("webglcontextlost",Ee,!1),t.addEventListener("webglcontextrestored",Be,!1),t.addEventListener("webglcontextcreationerror",ye,!1),L===null){let O="webgl2";if(L=D(O,w),L===null)throw D(O)?new Error("Error creating WebGL context with your selected attributes."):new Error("Error creating WebGL context.")}}catch(w){throw console.error("THREE.WebGLRenderer: "+w.message),w}let Z,K,Q,Se,pe,Te,Qe,je,I,y,H,$,ae,ee,ke,we,Oe,Fe,me,B,se,ne,le,Ge;function U(){Z=new Jp(L),Z.init(),ne=new Bc(L,Z),K=new kp(L,Z,e,ne),Q=new Pm(L,Z),K.reversedDepthBuffer&&d&&Q.buffers.depth.setReversed(!0),Se=new $p(L),pe=new vm,Te=new Rm(L,Z,Q,pe,K,ne,Se),Qe=new Vp(_),je=new Zp(_),I=new tf(L),le=new Op(L,I),y=new Kp(L,I,Se,le),H=new em(L,y,I,Se),me=new Qp(L,K,Te),we=new zp(pe),$=new ym(_,Qe,je,Z,K,le,we),ae=new Lm(_,pe),ee=new Sm,ke=new Em(Z),Fe=new Fp(_,Qe,je,Q,H,f,l),Oe=new Im(_,H,K),Ge=new Dm(L,Se,K,Q),B=new Bp(L,Z,Se),se=new jp(L,Z,Se),Se.programs=$.programs,_.capabilities=K,_.extensions=Z,_.properties=pe,_.renderLists=ee,_.shadowMap=Oe,_.state=Q,_.info=Se}U();let fe=new pl(_,L);this.xr=fe,this.getContext=function(){return L},this.getContextAttributes=function(){return L.getContextAttributes()},this.forceContextLoss=function(){let w=Z.get("WEBGL_lose_context");w&&w.loseContext()},this.forceContextRestore=function(){let w=Z.get("WEBGL_lose_context");w&&w.restoreContext()},this.getPixelRatio=function(){return W},this.setPixelRatio=function(w){w!==void 0&&(W=w,this.setSize(q,X,!1))},this.getSize=function(w){return w.set(q,X)},this.setSize=function(w,O,J=!0){if(fe.isPresenting){console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");return}q=w,X=O,t.width=Math.floor(w*W),t.height=Math.floor(O*W),J===!0&&(t.style.width=w+"px",t.style.height=O+"px"),this.setViewport(0,0,w,O)},this.getDrawingBufferSize=function(w){return w.set(q*W,X*W).floor()},this.setDrawingBufferSize=function(w,O,J){q=w,X=O,W=J,t.width=Math.floor(w*J),t.height=Math.floor(O*J),this.setViewport(0,0,w,O)},this.getCurrentViewport=function(w){return w.copy(P)},this.getViewport=function(w){return w.copy(Me)},this.setViewport=function(w,O,J,j){w.isVector4?Me.set(w.x,w.y,w.z,w.w):Me.set(w,O,J,j),Q.viewport(P.copy(Me).multiplyScalar(W).round())},this.getScissor=function(w){return w.copy(Ae)},this.setScissor=function(w,O,J,j){w.isVector4?Ae.set(w.x,w.y,w.z,w.w):Ae.set(w,O,J,j),Q.scissor(N.copy(Ae).multiplyScalar(W).round())},this.getScissorTest=function(){return ue},this.setScissorTest=function(w){Q.setScissorTest(ue=w)},this.setOpaqueSort=function(w){Y=w},this.setTransparentSort=function(w){oe=w},this.getClearColor=function(w){return w.copy(Fe.getClearColor())},this.setClearColor=function(){Fe.setClearColor(...arguments)},this.getClearAlpha=function(){return Fe.getClearAlpha()},this.setClearAlpha=function(){Fe.setClearAlpha(...arguments)},this.clear=function(w=!0,O=!0,J=!0){let j=0;if(w){let k=!1;if(E!==null){let be=E.texture.format;k=be===qr||be===Xr||be===cr}if(k){let be=E.texture.type,Le=be===Zt||be===gi||be===pn||be===mn||be===Gr||be===Wr,ze=Fe.getClearColor(),Ue=Fe.getClearAlpha(),$e=ze.r,et=ze.g,Xe=ze.b;Le?(g[0]=$e,g[1]=et,g[2]=Xe,g[3]=Ue,L.clearBufferuiv(L.COLOR,0,g)):(x[0]=$e,x[1]=et,x[2]=Xe,x[3]=Ue,L.clearBufferiv(L.COLOR,0,x))}else j|=L.COLOR_BUFFER_BIT}O&&(j|=L.DEPTH_BUFFER_BIT),J&&(j|=L.STENCIL_BUFFER_BIT,this.state.buffers.stencil.setMask(4294967295)),L.clear(j)},this.clearColor=function(){this.clear(!0,!1,!1)},this.clearDepth=function(){this.clear(!1,!0,!1)},this.clearStencil=function(){this.clear(!1,!1,!0)},this.dispose=function(){t.removeEventListener("webglcontextlost",Ee,!1),t.removeEventListener("webglcontextrestored",Be,!1),t.removeEventListener("webglcontextcreationerror",ye,!1),Fe.dispose(),ee.dispose(),ke.dispose(),pe.dispose(),Qe.dispose(),je.dispose(),H.dispose(),le.dispose(),Ge.dispose(),$.dispose(),fe.dispose(),fe.removeEventListener("sessionstart",nn),fe.removeEventListener("sessionend",xh),rr.stop()};function Ee(w){w.preventDefault(),console.log("THREE.WebGLRenderer: Context Lost."),C=!0}function Be(){console.log("THREE.WebGLRenderer: Context Restored."),C=!1;let w=Se.autoReset,O=Oe.enabled,J=Oe.autoUpdate,j=Oe.needsUpdate,k=Oe.type;U(),Se.autoReset=w,Oe.enabled=O,Oe.autoUpdate=J,Oe.needsUpdate=j,Oe.type=k}function ye(w){console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ",w.statusMessage)}function he(w){let O=w.target;O.removeEventListener("dispose",he),Ve(O)}function Ve(w){it(w),pe.remove(w)}function it(w){let O=pe.get(w).programs;O!==void 0&&(O.forEach(function(J){$.releaseProgram(J)}),w.isShaderMaterial&&$.releaseShaderCache(w))}this.renderBufferDirect=function(w,O,J,j,k,be){O===null&&(O=_e);let Le=k.isMesh&&k.matrixWorld.determinant()<0,ze=wg(w,O,J,j,k);Q.setMaterial(j,Le);let Ue=J.index,$e=1;if(j.wireframe===!0){if(Ue=y.getWireframeAttribute(J),Ue===void 0)return;$e=2}let et=J.drawRange,Xe=J.attributes.position,ct=et.start*$e,yt=(et.start+et.count)*$e;be!==null&&(ct=Math.max(ct,be.start*$e),yt=Math.min(yt,(be.start+be.count)*$e)),Ue!==null?(ct=Math.max(ct,0),yt=Math.min(yt,Ue.count)):Xe!=null&&(ct=Math.max(ct,0),yt=Math.min(yt,Xe.count));let Lt=yt-ct;if(Lt<0||Lt===1/0)return;le.setup(k,j,ze,J,Ue);let St,bt=B;if(Ue!==null&&(St=I.get(Ue),bt=se,bt.setIndex(St)),k.isMesh)j.wireframe===!0?(Q.setLineWidth(j.wireframeLinewidth*rt()),bt.setMode(L.LINES)):bt.setMode(L.TRIANGLES);else if(k.isLine){let Ze=j.linewidth;Ze===void 0&&(Ze=1),Q.setLineWidth(Ze*rt()),k.isLineSegments?bt.setMode(L.LINES):k.isLineLoop?bt.setMode(L.LINE_LOOP):bt.setMode(L.LINE_STRIP)}else k.isPoints?bt.setMode(L.POINTS):k.isSprite&&bt.setMode(L.TRIANGLES);if(k.isBatchedMesh)if(k._multiDrawInstances!==null)Hn("THREE.WebGLRenderer: renderMultiDrawInstances has been deprecated and will be removed in r184. Append to renderMultiDraw arguments and use indirection."),bt.renderMultiDrawInstances(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount,k._multiDrawInstances);else if(Z.get("WEBGL_multi_draw"))bt.renderMultiDraw(k._multiDrawStarts,k._multiDrawCounts,k._multiDrawCount);else{let Ze=k._multiDrawStarts,At=k._multiDrawCounts,dt=k._multiDrawCount,Mi=Ue?I.get(Ue).bytesPerElement:1,Or=pe.get(j).currentProgram.getUniforms();for(let Si=0;Si<dt;Si++)Or.setValue(L,"_gl_DrawID",Si),bt.render(Ze[Si]/Mi,At[Si])}else if(k.isInstancedMesh)bt.renderInstances(ct,Lt,k.count);else if(J.isInstancedBufferGeometry){let Ze=J._maxInstanceCount!==void 0?J._maxInstanceCount:1/0,At=Math.min(J.instanceCount,Ze);bt.renderInstances(ct,Lt,At)}else bt.render(ct,Lt)};function Mt(w,O,J){w.transparent===!0&&w.side===fi&&w.forceSinglePass===!1?(w.side=It,w.needsUpdate=!0,na(w,O,J),w.side=wi,w.needsUpdate=!0,na(w,O,J),w.side=fi):na(w,O,J)}this.compile=function(w,O,J=null){J===null&&(J=w),p=ke.get(J),p.init(O),S.push(p),J.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),w!==J&&w.traverseVisible(function(k){k.isLight&&k.layers.test(O.layers)&&(p.pushLight(k),k.castShadow&&p.pushShadow(k))}),p.setupLights();let j=new Set;return w.traverse(function(k){if(!(k.isMesh||k.isPoints||k.isLine||k.isSprite))return;let be=k.material;if(be)if(Array.isArray(be))for(let Le=0;Le<be.length;Le++){let ze=be[Le];Mt(ze,J,k),j.add(ze)}else Mt(be,J,k),j.add(be)}),p=S.pop(),j},this.compileAsync=function(w,O,J=null){let j=this.compile(w,O,J);return new Promise(k=>{function be(){if(j.forEach(function(Le){pe.get(Le).currentProgram.isReady()&&j.delete(Le)}),j.size===0){k(w);return}setTimeout(be,10)}Z.get("KHR_parallel_shader_compile")!==null?be():setTimeout(be,10)})};let xt=null;function hn(w){xt&&xt(w)}function nn(){rr.stop()}function xh(){rr.start()}let rr=new al;rr.setAnimationLoop(hn),typeof self<"u"&&rr.setContext(self),this.setAnimationLoop=function(w){xt=w,fe.setAnimationLoop(w),w===null?rr.stop():rr.start()},fe.addEventListener("sessionstart",nn),fe.addEventListener("sessionend",xh),this.render=function(w,O){if(O!==void 0&&O.isCamera!==!0){console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");return}if(C===!0)return;if(w.matrixWorldAutoUpdate===!0&&w.updateMatrixWorld(),O.parent===null&&O.matrixWorldAutoUpdate===!0&&O.updateMatrixWorld(),fe.enabled===!0&&fe.isPresenting===!0&&(fe.cameraAutoUpdate===!0&&fe.updateCamera(O),O=fe.getCamera()),w.isScene===!0&&w.onBeforeRender(_,w,O,E),p=ke.get(w,S.length),p.init(O),S.push(p),ce.multiplyMatrices(O.projectionMatrix,O.matrixWorldInverse),He.setFromProjectionMatrix(ce,Qt,O.reversedDepth),te=this.localClippingEnabled,Re=we.init(this.clippingPlanes,te),m=ee.get(w,T.length),m.init(),T.push(m),fe.enabled===!0&&fe.isPresenting===!0){let be=_.xr.getDepthSensingMesh();be!==null&&Al(be,O,-1/0,_.sortObjects)}Al(w,O,0,_.sortObjects),m.finish(),_.sortObjects===!0&&m.sort(Y,oe),We=fe.enabled===!1||fe.isPresenting===!1||fe.hasDepthSensing()===!1,We&&Fe.addToRenderList(m,w),this.info.render.frame++,Re===!0&&we.beginShadows();let J=p.state.shadowsArray;Oe.render(J,w,O),Re===!0&&we.endShadows(),this.info.autoReset===!0&&this.info.reset();let j=m.opaque,k=m.transmissive;if(p.setupLights(),O.isArrayCamera){let be=O.cameras;if(k.length>0)for(let Le=0,ze=be.length;Le<ze;Le++){let Ue=be[Le];yh(j,k,w,Ue)}We&&Fe.render(w);for(let Le=0,ze=be.length;Le<ze;Le++){let Ue=be[Le];_h(m,w,Ue,Ue.viewport)}}else k.length>0&&yh(j,k,w,O),We&&Fe.render(w),_h(m,w,O);E!==null&&A===0&&(Te.updateMultisampleRenderTarget(E),Te.updateRenderTargetMipmap(E)),w.isScene===!0&&w.onAfterRender(_,w,O),le.resetDefaultState(),b=-1,v=null,S.pop(),S.length>0?(p=S[S.length-1],Re===!0&&we.setGlobalState(_.clippingPlanes,p.state.camera)):p=null,T.pop(),T.length>0?m=T[T.length-1]:m=null};function Al(w,O,J,j){if(w.visible===!1)return;if(w.layers.test(O.layers)){if(w.isGroup)J=w.renderOrder;else if(w.isLOD)w.autoUpdate===!0&&w.update(O);else if(w.isLight)p.pushLight(w),w.castShadow&&p.pushShadow(w);else if(w.isSprite){if(!w.frustumCulled||He.intersectsSprite(w)){j&&xe.setFromMatrixPosition(w.matrixWorld).applyMatrix4(ce);let Le=H.update(w),ze=w.material;ze.visible&&m.push(w,Le,ze,J,xe.z,null)}}else if((w.isMesh||w.isLine||w.isPoints)&&(!w.frustumCulled||He.intersectsObject(w))){let Le=H.update(w),ze=w.material;if(j&&(w.boundingSphere!==void 0?(w.boundingSphere===null&&w.computeBoundingSphere(),xe.copy(w.boundingSphere.center)):(Le.boundingSphere===null&&Le.computeBoundingSphere(),xe.copy(Le.boundingSphere.center)),xe.applyMatrix4(w.matrixWorld).applyMatrix4(ce)),Array.isArray(ze)){let Ue=Le.groups;for(let $e=0,et=Ue.length;$e<et;$e++){let Xe=Ue[$e],ct=ze[Xe.materialIndex];ct&&ct.visible&&m.push(w,Le,ct,J,xe.z,Xe)}}else ze.visible&&m.push(w,Le,ze,J,xe.z,null)}}let be=w.children;for(let Le=0,ze=be.length;Le<ze;Le++)Al(be[Le],O,J,j)}function _h(w,O,J,j){let k=w.opaque,be=w.transmissive,Le=w.transparent;p.setupLightsView(J),Re===!0&&we.setGlobalState(_.clippingPlanes,J),j&&Q.viewport(P.copy(j)),k.length>0&&ia(k,O,J),be.length>0&&ia(be,O,J),Le.length>0&&ia(Le,O,J),Q.buffers.depth.setTest(!0),Q.buffers.depth.setMask(!0),Q.buffers.color.setMask(!0),Q.setPolygonOffset(!1)}function yh(w,O,J,j){if((J.isScene===!0?J.overrideMaterial:null)!==null)return;p.state.transmissionRenderTarget[j.id]===void 0&&(p.state.transmissionRenderTarget[j.id]=new ii(1,1,{generateMipmaps:!0,type:Z.has("EXT_color_buffer_half_float")||Z.has("EXT_color_buffer_float")?rn:Zt,minFilter:di,samples:4,stencilBuffer:s,resolveDepthBuffer:!1,resolveStencilBuffer:!1,colorSpace:st.workingColorSpace}));let be=p.state.transmissionRenderTarget[j.id],Le=j.viewport||P;be.setSize(Le.z*_.transmissionResolutionScale,Le.w*_.transmissionResolutionScale);let ze=_.getRenderTarget(),Ue=_.getActiveCubeFace(),$e=_.getActiveMipmapLevel();_.setRenderTarget(be),_.getClearColor(z),V=_.getClearAlpha(),V<1&&_.setClearColor(16777215,.5),_.clear(),We&&Fe.render(J);let et=_.toneMapping;_.toneMapping=Oi;let Xe=j.viewport;if(j.viewport!==void 0&&(j.viewport=void 0),p.setupLightsView(j),Re===!0&&we.setGlobalState(_.clippingPlanes,j),ia(w,J,j),Te.updateMultisampleRenderTarget(be),Te.updateRenderTargetMipmap(be),Z.has("WEBGL_multisampled_render_to_texture")===!1){let ct=!1;for(let yt=0,Lt=O.length;yt<Lt;yt++){let St=O[yt],bt=St.object,Ze=St.geometry,At=St.material,dt=St.group;if(At.side===fi&&bt.layers.test(j.layers)){let Mi=At.side;At.side=It,At.needsUpdate=!0,vh(bt,J,j,Ze,At,dt),At.side=Mi,At.needsUpdate=!0,ct=!0}}ct===!0&&(Te.updateMultisampleRenderTarget(be),Te.updateRenderTargetMipmap(be))}_.setRenderTarget(ze,Ue,$e),_.setClearColor(z,V),Xe!==void 0&&(j.viewport=Xe),_.toneMapping=et}function ia(w,O,J){let j=O.isScene===!0?O.overrideMaterial:null;for(let k=0,be=w.length;k<be;k++){let Le=w[k],ze=Le.object,Ue=Le.geometry,$e=Le.group,et=Le.material;et.allowOverride===!0&&j!==null&&(et=j),ze.layers.test(J.layers)&&vh(ze,O,J,Ue,et,$e)}}function vh(w,O,J,j,k,be){w.onBeforeRender(_,O,J,j,k,be),w.modelViewMatrix.multiplyMatrices(J.matrixWorldInverse,w.matrixWorld),w.normalMatrix.getNormalMatrix(w.modelViewMatrix),k.onBeforeRender(_,O,J,j,w,be),k.transparent===!0&&k.side===fi&&k.forceSinglePass===!1?(k.side=It,k.needsUpdate=!0,_.renderBufferDirect(J,O,j,k,w,be),k.side=wi,k.needsUpdate=!0,_.renderBufferDirect(J,O,j,k,w,be),k.side=fi):_.renderBufferDirect(J,O,j,k,w,be),w.onAfterRender(_,O,J,j,k,be)}function na(w,O,J){O.isScene!==!0&&(O=_e);let j=pe.get(w),k=p.state.lights,be=p.state.shadowsArray,Le=k.state.version,ze=$.getParameters(w,k.state,be,O,J),Ue=$.getProgramCacheKey(ze),$e=j.programs;j.environment=w.isMeshStandardMaterial?O.environment:null,j.fog=O.fog,j.envMap=(w.isMeshStandardMaterial?je:Qe).get(w.envMap||j.environment),j.envMapRotation=j.environment!==null&&w.envMap===null?O.environmentRotation:w.envMapRotation,$e===void 0&&(w.addEventListener("dispose",he),$e=new Map,j.programs=$e);let et=$e.get(Ue);if(et!==void 0){if(j.currentProgram===et&&j.lightsStateVersion===Le)return Mh(w,ze),et}else ze.uniforms=$.getUniforms(w),w.onBeforeCompile(ze,_),et=$.acquireProgram(ze,Ue),$e.set(Ue,et),j.uniforms=ze.uniforms;let Xe=j.uniforms;return(!w.isShaderMaterial&&!w.isRawShaderMaterial||w.clipping===!0)&&(Xe.clippingPlanes=we.uniform),Mh(w,ze),j.needsLights=Eg(w),j.lightsStateVersion=Le,j.needsLights&&(Xe.ambientLightColor.value=k.state.ambient,Xe.lightProbe.value=k.state.probe,Xe.directionalLights.value=k.state.directional,Xe.directionalLightShadows.value=k.state.directionalShadow,Xe.spotLights.value=k.state.spot,Xe.spotLightShadows.value=k.state.spotShadow,Xe.rectAreaLights.value=k.state.rectArea,Xe.ltc_1.value=k.state.rectAreaLTC1,Xe.ltc_2.value=k.state.rectAreaLTC2,Xe.pointLights.value=k.state.point,Xe.pointLightShadows.value=k.state.pointShadow,Xe.hemisphereLights.value=k.state.hemi,Xe.directionalShadowMap.value=k.state.directionalShadowMap,Xe.directionalShadowMatrix.value=k.state.directionalShadowMatrix,Xe.spotShadowMap.value=k.state.spotShadowMap,Xe.spotLightMatrix.value=k.state.spotLightMatrix,Xe.spotLightMap.value=k.state.spotLightMap,Xe.pointShadowMap.value=k.state.pointShadowMap,Xe.pointShadowMatrix.value=k.state.pointShadowMatrix),j.currentProgram=et,j.uniformsList=null,et}function bh(w){if(w.uniformsList===null){let O=w.currentProgram.getUniforms();w.uniformsList=Qn.seqWithValue(O.seq,w.uniforms)}return w.uniformsList}function Mh(w,O){let J=pe.get(w);J.outputColorSpace=O.outputColorSpace,J.batching=O.batching,J.batchingColor=O.batchingColor,J.instancing=O.instancing,J.instancingColor=O.instancingColor,J.instancingMorph=O.instancingMorph,J.skinning=O.skinning,J.morphTargets=O.morphTargets,J.morphNormals=O.morphNormals,J.morphColors=O.morphColors,J.morphTargetsCount=O.morphTargetsCount,J.numClippingPlanes=O.numClippingPlanes,J.numIntersection=O.numClipIntersection,J.vertexAlphas=O.vertexAlphas,J.vertexTangents=O.vertexTangents,J.toneMapping=O.toneMapping}function wg(w,O,J,j,k){O.isScene!==!0&&(O=_e),Te.resetTextureUnits();let be=O.fog,Le=j.isMeshStandardMaterial?O.environment:null,ze=E===null?_.outputColorSpace:E.isXRRenderTarget===!0?E.texture.colorSpace:Yi,Ue=(j.isMeshStandardMaterial?je:Qe).get(j.envMap||Le),$e=j.vertexColors===!0&&!!J.attributes.color&&J.attributes.color.itemSize===4,et=!!J.attributes.tangent&&(!!j.normalMap||j.anisotropy>0),Xe=!!J.morphAttributes.position,ct=!!J.morphAttributes.normal,yt=!!J.morphAttributes.color,Lt=Oi;j.toneMapped&&(E===null||E.isXRRenderTarget===!0)&&(Lt=_.toneMapping);let St=J.morphAttributes.position||J.morphAttributes.normal||J.morphAttributes.color,bt=St!==void 0?St.length:0,Ze=pe.get(j),At=p.state.lights;if(Re===!0&&(te===!0||w!==v)){let ui=w===v&&j.id===b;we.setState(j,w,ui)}let dt=!1;j.version===Ze.__version?(Ze.needsLights&&Ze.lightsStateVersion!==At.state.version||Ze.outputColorSpace!==ze||k.isBatchedMesh&&Ze.batching===!1||!k.isBatchedMesh&&Ze.batching===!0||k.isBatchedMesh&&Ze.batchingColor===!0&&k.colorTexture===null||k.isBatchedMesh&&Ze.batchingColor===!1&&k.colorTexture!==null||k.isInstancedMesh&&Ze.instancing===!1||!k.isInstancedMesh&&Ze.instancing===!0||k.isSkinnedMesh&&Ze.skinning===!1||!k.isSkinnedMesh&&Ze.skinning===!0||k.isInstancedMesh&&Ze.instancingColor===!0&&k.instanceColor===null||k.isInstancedMesh&&Ze.instancingColor===!1&&k.instanceColor!==null||k.isInstancedMesh&&Ze.instancingMorph===!0&&k.morphTexture===null||k.isInstancedMesh&&Ze.instancingMorph===!1&&k.morphTexture!==null||Ze.envMap!==Ue||j.fog===!0&&Ze.fog!==be||Ze.numClippingPlanes!==void 0&&(Ze.numClippingPlanes!==we.numPlanes||Ze.numIntersection!==we.numIntersection)||Ze.vertexAlphas!==$e||Ze.vertexTangents!==et||Ze.morphTargets!==Xe||Ze.morphNormals!==ct||Ze.morphColors!==yt||Ze.toneMapping!==Lt||Ze.morphTargetsCount!==bt)&&(dt=!0):(dt=!0,Ze.__version=j.version);let Mi=Ze.currentProgram;dt===!0&&(Mi=na(j,O,k));let Or=!1,Si=!1,zs=!1,Ct=Mi.getUniforms(),Ni=Ze.uniforms;if(Q.useProgram(Mi.program)&&(Or=!0,Si=!0,zs=!0),j.id!==b&&(b=j.id,Si=!0),Or||v!==w){Q.buffers.depth.getReversed()&&w.reversedDepth!==!0&&(w._reversedDepth=!0,w.updateProjectionMatrix()),Ct.setValue(L,"projectionMatrix",w.projectionMatrix),Ct.setValue(L,"viewMatrix",w.matrixWorldInverse);let mi=Ct.map.cameraPosition;mi!==void 0&&mi.setValue(L,re.setFromMatrixPosition(w.matrixWorld)),K.logarithmicDepthBuffer&&Ct.setValue(L,"logDepthBufFC",2/(Math.log(w.far+1)/Math.LN2)),(j.isMeshPhongMaterial||j.isMeshToonMaterial||j.isMeshLambertMaterial||j.isMeshBasicMaterial||j.isMeshStandardMaterial||j.isShaderMaterial)&&Ct.setValue(L,"isOrthographic",w.isOrthographicCamera===!0),v!==w&&(v=w,Si=!0,zs=!0)}if(k.isSkinnedMesh){Ct.setOptional(L,k,"bindMatrix"),Ct.setOptional(L,k,"bindMatrixInverse");let ui=k.skeleton;ui&&(ui.boneTexture===null&&ui.computeBoneTexture(),Ct.setValue(L,"boneTexture",ui.boneTexture,Te))}k.isBatchedMesh&&(Ct.setOptional(L,k,"batchingTexture"),Ct.setValue(L,"batchingTexture",k._matricesTexture,Te),Ct.setOptional(L,k,"batchingIdTexture"),Ct.setValue(L,"batchingIdTexture",k._indirectTexture,Te),Ct.setOptional(L,k,"batchingColorTexture"),k._colorsTexture!==null&&Ct.setValue(L,"batchingColorTexture",k._colorsTexture,Te));let Ui=J.morphAttributes;if((Ui.position!==void 0||Ui.normal!==void 0||Ui.color!==void 0)&&me.update(k,J,Mi),(Si||Ze.receiveShadow!==k.receiveShadow)&&(Ze.receiveShadow=k.receiveShadow,Ct.setValue(L,"receiveShadow",k.receiveShadow)),j.isMeshGouraudMaterial&&j.envMap!==null&&(Ni.envMap.value=Ue,Ni.flipEnvMap.value=Ue.isCubeTexture&&Ue.isRenderTargetTexture===!1?-1:1),j.isMeshStandardMaterial&&j.envMap===null&&O.environment!==null&&(Ni.envMapIntensity.value=O.environmentIntensity),Si&&(Ct.setValue(L,"toneMappingExposure",_.toneMappingExposure),Ze.needsLights&&Tg(Ni,zs),be&&j.fog===!0&&ae.refreshFogUniforms(Ni,be),ae.refreshMaterialUniforms(Ni,j,W,X,p.state.transmissionRenderTarget[w.id]),Qn.upload(L,bh(Ze),Ni,Te)),j.isShaderMaterial&&j.uniformsNeedUpdate===!0&&(Qn.upload(L,bh(Ze),Ni,Te),j.uniformsNeedUpdate=!1),j.isSpriteMaterial&&Ct.setValue(L,"center",k.center),Ct.setValue(L,"modelViewMatrix",k.modelViewMatrix),Ct.setValue(L,"normalMatrix",k.normalMatrix),Ct.setValue(L,"modelMatrix",k.matrixWorld),j.isShaderMaterial||j.isRawShaderMaterial){let ui=j.uniformsGroups;for(let mi=0,Cl=ui.length;mi<Cl;mi++){let sr=ui[mi];Ge.update(sr,Mi),Ge.bind(sr,Mi)}}return Mi}function Tg(w,O){w.ambientLightColor.needsUpdate=O,w.lightProbe.needsUpdate=O,w.directionalLights.needsUpdate=O,w.directionalLightShadows.needsUpdate=O,w.pointLights.needsUpdate=O,w.pointLightShadows.needsUpdate=O,w.spotLights.needsUpdate=O,w.spotLightShadows.needsUpdate=O,w.rectAreaLights.needsUpdate=O,w.hemisphereLights.needsUpdate=O}function Eg(w){return w.isMeshLambertMaterial||w.isMeshToonMaterial||w.isMeshPhongMaterial||w.isMeshStandardMaterial||w.isShadowMaterial||w.isShaderMaterial&&w.lights===!0}this.getActiveCubeFace=function(){return M},this.getActiveMipmapLevel=function(){return A},this.getRenderTarget=function(){return E},this.setRenderTargetTextures=function(w,O,J){let j=pe.get(w);j.__autoAllocateDepthBuffer=w.resolveDepthBuffer===!1,j.__autoAllocateDepthBuffer===!1&&(j.__useRenderToTexture=!1),pe.get(w.texture).__webglTexture=O,pe.get(w.depthTexture).__webglTexture=j.__autoAllocateDepthBuffer?void 0:J,j.__hasExternalTextures=!0},this.setRenderTargetFramebuffer=function(w,O){let J=pe.get(w);J.__webglFramebuffer=O,J.__useDefaultFramebuffer=O===void 0};let Ag=L.createFramebuffer();this.setRenderTarget=function(w,O=0,J=0){E=w,M=O,A=J;let j=!0,k=null,be=!1,Le=!1;if(w){let Ue=pe.get(w);if(Ue.__useDefaultFramebuffer!==void 0)Q.bindFramebuffer(L.FRAMEBUFFER,null),j=!1;else if(Ue.__webglFramebuffer===void 0)Te.setupRenderTarget(w);else if(Ue.__hasExternalTextures)Te.rebindTextures(w,pe.get(w.texture).__webglTexture,pe.get(w.depthTexture).__webglTexture);else if(w.depthBuffer){let Xe=w.depthTexture;if(Ue.__boundDepthTexture!==Xe){if(Xe!==null&&pe.has(Xe)&&(w.width!==Xe.image.width||w.height!==Xe.image.height))throw new Error("WebGLRenderTarget: Attached DepthTexture is initialized to the incorrect size.");Te.setupDepthRenderbuffer(w)}}let $e=w.texture;($e.isData3DTexture||$e.isDataArrayTexture||$e.isCompressedArrayTexture)&&(Le=!0);let et=pe.get(w).__webglFramebuffer;w.isWebGLCubeRenderTarget?(Array.isArray(et[O])?k=et[O][J]:k=et[O],be=!0):w.samples>0&&Te.useMultisampledRTT(w)===!1?k=pe.get(w).__webglMultisampledFramebuffer:Array.isArray(et)?k=et[J]:k=et,P.copy(w.viewport),N.copy(w.scissor),F=w.scissorTest}else P.copy(Me).multiplyScalar(W).floor(),N.copy(Ae).multiplyScalar(W).floor(),F=ue;if(J!==0&&(k=Ag),Q.bindFramebuffer(L.FRAMEBUFFER,k)&&j&&Q.drawBuffers(w,k),Q.viewport(P),Q.scissor(N),Q.setScissorTest(F),be){let Ue=pe.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_CUBE_MAP_POSITIVE_X+O,Ue.__webglTexture,J)}else if(Le){let Ue=O;for(let $e=0;$e<w.textures.length;$e++){let et=pe.get(w.textures[$e]);L.framebufferTextureLayer(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0+$e,et.__webglTexture,J,Ue)}}else if(w!==null&&J!==0){let Ue=pe.get(w.texture);L.framebufferTexture2D(L.FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ue.__webglTexture,J)}b=-1},this.readRenderTargetPixels=function(w,O,J,j,k,be,Le,ze=0){if(!(w&&w.isWebGLRenderTarget)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");return}let Ue=pe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue){Q.bindFramebuffer(L.FRAMEBUFFER,Ue);try{let $e=w.textures[ze],et=$e.format,Xe=$e.type;if(!K.textureFormatReadable(et)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");return}if(!K.textureTypeReadable(Xe)){console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");return}O>=0&&O<=w.width-j&&J>=0&&J<=w.height-k&&(w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ze),L.readPixels(O,J,j,k,ne.convert(et),ne.convert(Xe),be))}finally{let $e=E!==null?pe.get(E).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,$e)}}},this.readRenderTargetPixelsAsync=async function(w,O,J,j,k,be,Le,ze=0){if(!(w&&w.isWebGLRenderTarget))throw new Error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");let Ue=pe.get(w).__webglFramebuffer;if(w.isWebGLCubeRenderTarget&&Le!==void 0&&(Ue=Ue[Le]),Ue)if(O>=0&&O<=w.width-j&&J>=0&&J<=w.height-k){Q.bindFramebuffer(L.FRAMEBUFFER,Ue);let $e=w.textures[ze],et=$e.format,Xe=$e.type;if(!K.textureFormatReadable(et))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in RGBA or implementation defined format.");if(!K.textureTypeReadable(Xe))throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: renderTarget is not in UnsignedByteType or implementation defined type.");let ct=L.createBuffer();L.bindBuffer(L.PIXEL_PACK_BUFFER,ct),L.bufferData(L.PIXEL_PACK_BUFFER,be.byteLength,L.STREAM_READ),w.textures.length>1&&L.readBuffer(L.COLOR_ATTACHMENT0+ze),L.readPixels(O,J,j,k,ne.convert(et),ne.convert(Xe),0);let yt=E!==null?pe.get(E).__webglFramebuffer:null;Q.bindFramebuffer(L.FRAMEBUFFER,yt);let Lt=L.fenceSync(L.SYNC_GPU_COMMANDS_COMPLETE,0);return L.flush(),await fu(L,Lt,4),L.bindBuffer(L.PIXEL_PACK_BUFFER,ct),L.getBufferSubData(L.PIXEL_PACK_BUFFER,0,be),L.deleteBuffer(ct),L.deleteSync(Lt),be}else throw new Error("THREE.WebGLRenderer.readRenderTargetPixelsAsync: requested read bounds are out of range.")},this.copyFramebufferToTexture=function(w,O=null,J=0){let j=Math.pow(2,-J),k=Math.floor(w.image.width*j),be=Math.floor(w.image.height*j),Le=O!==null?O.x:0,ze=O!==null?O.y:0;Te.setTexture2D(w,0),L.copyTexSubImage2D(L.TEXTURE_2D,J,0,0,Le,ze,k,be),Q.unbindTexture()};let Cg=L.createFramebuffer(),Ig=L.createFramebuffer();this.copyTextureToTexture=function(w,O,J=null,j=null,k=0,be=null){be===null&&(k!==0?(Hn("WebGLRenderer: copyTextureToTexture function signature has changed to support src and dst mipmap levels."),be=k,k=0):be=0);let Le,ze,Ue,$e,et,Xe,ct,yt,Lt,St=w.isCompressedTexture?w.mipmaps[be]:w.image;if(J!==null)Le=J.max.x-J.min.x,ze=J.max.y-J.min.y,Ue=J.isBox3?J.max.z-J.min.z:1,$e=J.min.x,et=J.min.y,Xe=J.isBox3?J.min.z:0;else{let Ui=Math.pow(2,-k);Le=Math.floor(St.width*Ui),ze=Math.floor(St.height*Ui),w.isDataArrayTexture?Ue=St.depth:w.isData3DTexture?Ue=Math.floor(St.depth*Ui):Ue=1,$e=0,et=0,Xe=0}j!==null?(ct=j.x,yt=j.y,Lt=j.z):(ct=0,yt=0,Lt=0);let bt=ne.convert(O.format),Ze=ne.convert(O.type),At;O.isData3DTexture?(Te.setTexture3D(O,0),At=L.TEXTURE_3D):O.isDataArrayTexture||O.isCompressedArrayTexture?(Te.setTexture2DArray(O,0),At=L.TEXTURE_2D_ARRAY):(Te.setTexture2D(O,0),At=L.TEXTURE_2D),L.pixelStorei(L.UNPACK_FLIP_Y_WEBGL,O.flipY),L.pixelStorei(L.UNPACK_PREMULTIPLY_ALPHA_WEBGL,O.premultiplyAlpha),L.pixelStorei(L.UNPACK_ALIGNMENT,O.unpackAlignment);let dt=L.getParameter(L.UNPACK_ROW_LENGTH),Mi=L.getParameter(L.UNPACK_IMAGE_HEIGHT),Or=L.getParameter(L.UNPACK_SKIP_PIXELS),Si=L.getParameter(L.UNPACK_SKIP_ROWS),zs=L.getParameter(L.UNPACK_SKIP_IMAGES);L.pixelStorei(L.UNPACK_ROW_LENGTH,St.width),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,St.height),L.pixelStorei(L.UNPACK_SKIP_PIXELS,$e),L.pixelStorei(L.UNPACK_SKIP_ROWS,et),L.pixelStorei(L.UNPACK_SKIP_IMAGES,Xe);let Ct=w.isDataArrayTexture||w.isData3DTexture,Ni=O.isDataArrayTexture||O.isData3DTexture;if(w.isDepthTexture){let Ui=pe.get(w),ui=pe.get(O),mi=pe.get(Ui.__renderTarget),Cl=pe.get(ui.__renderTarget);Q.bindFramebuffer(L.READ_FRAMEBUFFER,mi.__webglFramebuffer),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Cl.__webglFramebuffer);for(let sr=0;sr<Ue;sr++)Ct&&(L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,pe.get(w).__webglTexture,k,Xe+sr),L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,pe.get(O).__webglTexture,be,Lt+sr)),L.blitFramebuffer($e,et,Le,ze,ct,yt,Le,ze,L.DEPTH_BUFFER_BIT,L.NEAREST);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else if(k!==0||w.isRenderTargetTexture||pe.has(w)){let Ui=pe.get(w),ui=pe.get(O);Q.bindFramebuffer(L.READ_FRAMEBUFFER,Cg),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,Ig);for(let mi=0;mi<Ue;mi++)Ct?L.framebufferTextureLayer(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,Ui.__webglTexture,k,Xe+mi):L.framebufferTexture2D(L.READ_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,Ui.__webglTexture,k),Ni?L.framebufferTextureLayer(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,ui.__webglTexture,be,Lt+mi):L.framebufferTexture2D(L.DRAW_FRAMEBUFFER,L.COLOR_ATTACHMENT0,L.TEXTURE_2D,ui.__webglTexture,be),k!==0?L.blitFramebuffer($e,et,Le,ze,ct,yt,Le,ze,L.COLOR_BUFFER_BIT,L.NEAREST):Ni?L.copyTexSubImage3D(At,be,ct,yt,Lt+mi,$e,et,Le,ze):L.copyTexSubImage2D(At,be,ct,yt,$e,et,Le,ze);Q.bindFramebuffer(L.READ_FRAMEBUFFER,null),Q.bindFramebuffer(L.DRAW_FRAMEBUFFER,null)}else Ni?w.isDataTexture||w.isData3DTexture?L.texSubImage3D(At,be,ct,yt,Lt,Le,ze,Ue,bt,Ze,St.data):O.isCompressedArrayTexture?L.compressedTexSubImage3D(At,be,ct,yt,Lt,Le,ze,Ue,bt,St.data):L.texSubImage3D(At,be,ct,yt,Lt,Le,ze,Ue,bt,Ze,St):w.isDataTexture?L.texSubImage2D(L.TEXTURE_2D,be,ct,yt,Le,ze,bt,Ze,St.data):w.isCompressedTexture?L.compressedTexSubImage2D(L.TEXTURE_2D,be,ct,yt,St.width,St.height,bt,St.data):L.texSubImage2D(L.TEXTURE_2D,be,ct,yt,Le,ze,bt,Ze,St);L.pixelStorei(L.UNPACK_ROW_LENGTH,dt),L.pixelStorei(L.UNPACK_IMAGE_HEIGHT,Mi),L.pixelStorei(L.UNPACK_SKIP_PIXELS,Or),L.pixelStorei(L.UNPACK_SKIP_ROWS,Si),L.pixelStorei(L.UNPACK_SKIP_IMAGES,zs),be===0&&O.generateMipmaps&&L.generateMipmap(At),Q.unbindTexture()},this.initRenderTarget=function(w){pe.get(w).__webglFramebuffer===void 0&&Te.setupRenderTarget(w)},this.initTexture=function(w){w.isCubeTexture?Te.setTextureCube(w,0):w.isData3DTexture?Te.setTexture3D(w,0):w.isDataArrayTexture||w.isCompressedArrayTexture?Te.setTexture2DArray(w,0):Te.setTexture2D(w,0),Q.unbindTexture()},this.resetState=function(){M=0,A=0,E=null,Q.reset(),le.reset()},typeof __THREE_DEVTOOLS__<"u"&&__THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe",{detail:this}))}get coordinateSystem(){return Qt}get outputColorSpace(){return this._outputColorSpace}set outputColorSpace(e){this._outputColorSpace=e;let t=this.getContext();t.drawingBufferColorSpace=st._getDrawingBufferColorSpace(e),t.unpackColorSpace=st._getUnpackColorSpace()}};var Um={POSITION:["byte","byte normalized","unsigned byte","unsigned byte normalized","short","short normalized","unsigned short","unsigned short normalized"],NORMAL:["byte normalized","short normalized"],TANGENT:["byte normalized","short normalized"],TEXCOORD:["byte","byte normalized","unsigned byte","short","short normalized","unsigned short"]},Dr=class{constructor(){this.textureUtils=null,this.pluginCallbacks=[],this.register(function(e){return new Hc(e)}),this.register(function(e){return new Gc(e)}),this.register(function(e){return new Yc(e)}),this.register(function(e){return new Zc(e)}),this.register(function(e){return new Jc(e)}),this.register(function(e){return new Kc(e)}),this.register(function(e){return new Wc(e)}),this.register(function(e){return new Xc(e)}),this.register(function(e){return new qc(e)}),this.register(function(e){return new jc(e)}),this.register(function(e){return new $c(e)}),this.register(function(e){return new Qc(e)}),this.register(function(e){return new eh(e)}),this.register(function(e){return new th(e)})}register(e){return this.pluginCallbacks.indexOf(e)===-1&&this.pluginCallbacks.push(e),this}unregister(e){return this.pluginCallbacks.indexOf(e)!==-1&&this.pluginCallbacks.splice(this.pluginCallbacks.indexOf(e),1),this}setTextureUtils(e){return this.textureUtils=e,this}parse(e,t,i,r){let s=new Vc,o=[];for(let a=0,l=this.pluginCallbacks.length;a<l;a++)o.push(this.pluginCallbacks[a](s));s.setPlugins(o),s.setTextureUtils(this.textureUtils),s.writeAsync(e,t,r).catch(i)}parseAsync(e,t){let i=this;return new Promise(function(r,s){i.parse(e,r,s,t)})}},lt={POINTS:0,LINES:1,LINE_LOOP:2,LINE_STRIP:3,TRIANGLES:4,TRIANGLE_STRIP:5,TRIANGLE_FAN:6,BYTE:5120,UNSIGNED_BYTE:5121,SHORT:5122,UNSIGNED_SHORT:5123,INT:5124,UNSIGNED_INT:5125,FLOAT:5126,ARRAY_BUFFER:34962,ELEMENT_ARRAY_BUFFER:34963,NEAREST:9728,LINEAR:9729,NEAREST_MIPMAP_NEAREST:9984,LINEAR_MIPMAP_NEAREST:9985,NEAREST_MIPMAP_LINEAR:9986,LINEAR_MIPMAP_LINEAR:9987,CLAMP_TO_EDGE:33071,MIRRORED_REPEAT:33648,REPEAT:10497},kc="KHR_mesh_quantization",Li={};Li[Ot]=lt.NEAREST;Li[Gs]=lt.NEAREST_MIPMAP_NEAREST;Li[On]=lt.NEAREST_MIPMAP_LINEAR;Li[Bt]=lt.LINEAR;Li[lr]=lt.LINEAR_MIPMAP_NEAREST;Li[di]=lt.LINEAR_MIPMAP_LINEAR;Li[si]=lt.CLAMP_TO_EDGE;Li[Un]=lt.REPEAT;Li[Fn]=lt.MIRRORED_REPEAT;var Fm={scale:"scale",position:"translation",quaternion:"rotation",morphTargetInfluences:"weights"},py=new Pe,Om=12,my=1179937895,gy=2,Bm=8,xy=1313821514,_y=5130562;function Ko(n,e){return n.length===e.length&&n.every(function(t,i){return t===e[i]})}function yy(n){return new TextEncoder().encode(n).buffer}function vy(n){return Ko(n.elements,[1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])}function by(n,e,t){let i={min:new Array(n.itemSize).fill(Number.POSITIVE_INFINITY),max:new Array(n.itemSize).fill(Number.NEGATIVE_INFINITY)};for(let r=e;r<e+t;r++)for(let s=0;s<n.itemSize;s++){let o;n.itemSize>4?o=n.array[r*n.itemSize+s]:(s===0?o=n.getX(r):s===1?o=n.getY(r):s===2?o=n.getZ(r):s===3&&(o=n.getW(r)),n.normalized===!0&&(o=Zi.normalize(o,n.array))),i.min[s]=Math.min(i.min[s],o),i.max[s]=Math.max(i.max[s],o)}return i}function zm(n){return Math.ceil(n/4)*4}function zc(n,e=0){let t=zm(n.byteLength);if(t!==n.byteLength){let i=new Uint8Array(t);if(i.set(new Uint8Array(n)),e!==0)for(let r=n.byteLength;r<t;r++)i[r]=e;return i.buffer}return n}function km(){return typeof document>"u"&&typeof OffscreenCanvas<"u"?new OffscreenCanvas(1,1):document.createElement("canvas")}function My(n,e){if(typeof OffscreenCanvas<"u"&&n instanceof OffscreenCanvas){let t;return e==="image/jpeg"?t=.92:e==="image/webp"&&(t=.8),n.convertToBlob({type:e,quality:t})}else return new Promise(t=>n.toBlob(t,e))}var Vc=class{constructor(){this.plugins=[],this.options={},this.pending=[],this.buffers=[],this.byteOffset=0,this.buffers=[],this.nodeMap=new Map,this.skins=[],this.extensionsUsed={},this.extensionsRequired={},this.uids=new Map,this.uid=0,this.json={asset:{version:"2.0",generator:"THREE.GLTFExporter r180"}},this.cache={meshes:new Map,attributes:new Map,attributesNormalized:new Map,materials:new Map,textures:new Map,images:new Map},this.textureUtils=null}setPlugins(e){this.plugins=e}setTextureUtils(e){this.textureUtils=e}async writeAsync(e,t,i={}){this.options=Object.assign({binary:!1,trs:!1,onlyVisible:!0,maxTextureSize:1/0,animations:[],includeCustomExtensions:!1},i),this.options.animations.length>0&&(this.options.trs=!0),await this.processInputAsync(e),await Promise.all(this.pending);let r=this,s=r.buffers,o=r.json;i=r.options;let a=r.extensionsUsed,l=r.extensionsRequired,c=new Blob(s,{type:"application/octet-stream"}),h=Object.keys(a),u=Object.keys(l);if(h.length>0&&(o.extensionsUsed=h),u.length>0&&(o.extensionsRequired=u),o.buffers&&o.buffers.length>0&&(o.buffers[0].byteLength=c.size),i.binary===!0){let d=new FileReader;d.readAsArrayBuffer(c),d.onloadend=function(){let f=zc(d.result),g=new DataView(new ArrayBuffer(Bm));g.setUint32(0,f.byteLength,!0),g.setUint32(4,_y,!0);let x=zc(yy(JSON.stringify(o)),32),m=new DataView(new ArrayBuffer(Bm));m.setUint32(0,x.byteLength,!0),m.setUint32(4,xy,!0);let p=new ArrayBuffer(Om),T=new DataView(p);T.setUint32(0,my,!0),T.setUint32(4,gy,!0);let S=Om+m.byteLength+x.byteLength+g.byteLength+f.byteLength;T.setUint32(8,S,!0);let _=new Blob([p,m,x,g,f],{type:"application/octet-stream"}),C=new FileReader;C.readAsArrayBuffer(_),C.onloadend=function(){t(C.result)}}}else if(o.buffers&&o.buffers.length>0){let d=new FileReader;d.readAsDataURL(c),d.onloadend=function(){let f=d.result;o.buffers[0].uri=f,t(o)}}else t(o)}serializeUserData(e,t){if(Object.keys(e.userData).length===0)return;let i=this.options,r=this.extensionsUsed;try{let s=JSON.parse(JSON.stringify(e.userData));if(i.includeCustomExtensions&&s.gltfExtensions){t.extensions===void 0&&(t.extensions={});for(let o in s.gltfExtensions)t.extensions[o]=s.gltfExtensions[o],r[o]=!0;delete s.gltfExtensions}Object.keys(s).length>0&&(t.extras=s)}catch(s){console.warn("THREE.GLTFExporter: userData of '"+e.name+"' won't be serialized because of JSON.stringify error - "+s.message)}}getUID(e,t=!1){if(this.uids.has(e)===!1){let r=new Map;r.set(!0,this.uid++),r.set(!1,this.uid++),this.uids.set(e,r)}return this.uids.get(e).get(t)}isNormalizedNormalAttribute(e){if(this.cache.attributesNormalized.has(e))return!1;let i=new R;for(let r=0,s=e.count;r<s;r++)if(Math.abs(i.fromBufferAttribute(e,r).length()-1)>5e-4)return!1;return!0}createNormalizedNormalAttribute(e){let t=this.cache;if(t.attributesNormalized.has(e))return t.attributesNormalized.get(e);let i=e.clone(),r=new R;for(let s=0,o=i.count;s<o;s++)r.fromBufferAttribute(i,s),r.x===0&&r.y===0&&r.z===0?r.setX(1):r.normalize(),i.setXYZ(s,r.x,r.y,r.z);return t.attributesNormalized.set(e,i),i}applyTextureTransform(e,t){let i=!1,r={};(t.offset.x!==0||t.offset.y!==0)&&(r.offset=t.offset.toArray(),i=!0),t.rotation!==0&&(r.rotation=t.rotation,i=!0),(t.repeat.x!==1||t.repeat.y!==1)&&(r.scale=t.repeat.toArray(),i=!0),i&&(e.extensions=e.extensions||{},e.extensions.KHR_texture_transform=r,this.extensionsUsed.KHR_texture_transform=!0)}async buildMetalRoughTextureAsync(e,t){if(e===t)return e;function i(f){return f.colorSpace===kt?function(x){return x<.04045?x*.0773993808:Math.pow(x*.9478672986+.0521327014,2.4)}:function(x){return x}}e instanceof an&&(e=await this.decompressTextureAsync(e)),t instanceof an&&(t=await this.decompressTextureAsync(t));let r=e?e.image:null,s=t?t.image:null,o=Math.max(r?r.width:0,s?s.width:0),a=Math.max(r?r.height:0,s?s.height:0),l=km();l.width=o,l.height=a;let c=l.getContext("2d",{willReadFrequently:!0});c.fillStyle="#00ffff",c.fillRect(0,0,o,a);let h=c.getImageData(0,0,o,a);if(r){c.drawImage(r,0,0,o,a);let f=i(e),g=c.getImageData(0,0,o,a).data;for(let x=2;x<g.length;x+=4)h.data[x]=f(g[x]/256)*256}if(s){c.drawImage(s,0,0,o,a);let f=i(t),g=c.getImageData(0,0,o,a).data;for(let x=1;x<g.length;x+=4)h.data[x]=f(g[x]/256)*256}c.putImageData(h,0,0);let d=(e||t).clone();return d.source=new Bi(l),d.colorSpace=xi,d.channel=(e||t).channel,e&&t&&e.channel!==t.channel&&console.warn("THREE.GLTFExporter: UV channels for metalnessMap and roughnessMap textures must match."),console.warn("THREE.GLTFExporter: Merged metalnessMap and roughnessMap textures."),d}async decompressTextureAsync(e,t=1/0){if(this.textureUtils===null)throw new Error("THREE.GLTFExporter: setTextureUtils() must be called to process compressed textures.");return await this.textureUtils.decompress(e,t)}processBuffer(e){let t=this.json,i=this.buffers;return t.buffers||(t.buffers=[{byteLength:0}]),i.push(e),0}processBufferView(e,t,i,r,s){let o=this.json;o.bufferViews||(o.bufferViews=[]);let a;switch(t){case lt.BYTE:case lt.UNSIGNED_BYTE:a=1;break;case lt.SHORT:case lt.UNSIGNED_SHORT:a=2;break;default:a=4}let l=e.itemSize*a;s===lt.ARRAY_BUFFER&&(l=Math.ceil(l/4)*4);let c=zm(r*l),h=new DataView(new ArrayBuffer(c)),u=0;for(let g=i;g<i+r;g++){for(let x=0;x<e.itemSize;x++){let m;e.itemSize>4?m=e.array[g*e.itemSize+x]:(x===0?m=e.getX(g):x===1?m=e.getY(g):x===2?m=e.getZ(g):x===3&&(m=e.getW(g)),e.normalized===!0&&(m=Zi.normalize(m,e.array))),t===lt.FLOAT?h.setFloat32(u,m,!0):t===lt.INT?h.setInt32(u,m,!0):t===lt.UNSIGNED_INT?h.setUint32(u,m,!0):t===lt.SHORT?h.setInt16(u,m,!0):t===lt.UNSIGNED_SHORT?h.setUint16(u,m,!0):t===lt.BYTE?h.setInt8(u,m):t===lt.UNSIGNED_BYTE&&h.setUint8(u,m),u+=a}u%l!==0&&(u+=l-u%l)}let d={buffer:this.processBuffer(h.buffer),byteOffset:this.byteOffset,byteLength:c};return s!==void 0&&(d.target=s),s===lt.ARRAY_BUFFER&&(d.byteStride=l),this.byteOffset+=c,o.bufferViews.push(d),{id:o.bufferViews.length-1,byteLength:0}}processBufferViewImage(e){let t=this,i=t.json;return i.bufferViews||(i.bufferViews=[]),new Promise(function(r){let s=new FileReader;s.readAsArrayBuffer(e),s.onloadend=function(){let o=zc(s.result),a={buffer:t.processBuffer(o),byteOffset:t.byteOffset,byteLength:o.byteLength};t.byteOffset+=o.byteLength,r(i.bufferViews.push(a)-1)}})}processAccessor(e,t,i,r){let s=this.json,o={1:"SCALAR",2:"VEC2",3:"VEC3",4:"VEC4",9:"MAT3",16:"MAT4"},a;if(e.array.constructor===Float32Array)a=lt.FLOAT;else if(e.array.constructor===Int32Array)a=lt.INT;else if(e.array.constructor===Uint32Array)a=lt.UNSIGNED_INT;else if(e.array.constructor===Int16Array)a=lt.SHORT;else if(e.array.constructor===Uint16Array)a=lt.UNSIGNED_SHORT;else if(e.array.constructor===Int8Array)a=lt.BYTE;else if(e.array.constructor===Uint8Array)a=lt.UNSIGNED_BYTE;else throw new Error("THREE.GLTFExporter: Unsupported bufferAttribute component type: "+e.array.constructor.name);if(i===void 0&&(i=0),(r===void 0||r===1/0)&&(r=e.count),r===0)return null;let l=by(e,i,r),c;t!==void 0&&(c=e===t.index?lt.ELEMENT_ARRAY_BUFFER:lt.ARRAY_BUFFER);let h=this.processBufferView(e,a,i,r,c),u={bufferView:h.id,byteOffset:h.byteOffset,componentType:a,count:r,max:l.max,min:l.min,type:o[e.itemSize]};return e.normalized===!0&&(u.normalized=!0),s.accessors||(s.accessors=[]),s.accessors.push(u)-1}processImage(e,t,i,r="image/png"){if(e!==null){let s=this,o=s.cache,a=s.json,l=s.options,c=s.pending;o.images.has(e)||o.images.set(e,{});let h=o.images.get(e),u=r+":flipY/"+i.toString();if(h[u]!==void 0)return h[u];a.images||(a.images=[]);let d={mimeType:r},f=km();f.width=Math.min(e.width,l.maxTextureSize),f.height=Math.min(e.height,l.maxTextureSize);let g=f.getContext("2d",{willReadFrequently:!0});if(i===!0&&(g.translate(0,f.height),g.scale(1,-1)),e.data!==void 0){t!==Dt&&console.error("GLTFExporter: Only RGBAFormat is supported.",t),(e.width>l.maxTextureSize||e.height>l.maxTextureSize)&&console.warn("GLTFExporter: Image size is bigger than maxTextureSize",e);let m=new Uint8ClampedArray(e.height*e.width*4);for(let p=0;p<m.length;p+=4)m[p+0]=e.data[p+0],m[p+1]=e.data[p+1],m[p+2]=e.data[p+2],m[p+3]=e.data[p+3];g.putImageData(new ImageData(m,e.width,e.height),0,0)}else if(typeof HTMLImageElement<"u"&&e instanceof HTMLImageElement||typeof HTMLCanvasElement<"u"&&e instanceof HTMLCanvasElement||typeof ImageBitmap<"u"&&e instanceof ImageBitmap||typeof OffscreenCanvas<"u"&&e instanceof OffscreenCanvas)g.drawImage(e,0,0,f.width,f.height);else throw new Error("THREE.GLTFExporter: Invalid image type. Use HTMLImageElement, HTMLCanvasElement, ImageBitmap or OffscreenCanvas.");l.binary===!0?c.push(My(f,r).then(m=>s.processBufferViewImage(m)).then(m=>{d.bufferView=m})):d.uri=dr.getDataURL(f,r);let x=a.images.push(d)-1;return h[u]=x,x}else throw new Error("THREE.GLTFExporter: No valid image data found. Unable to process texture.")}processSampler(e){let t=this.json;t.samplers||(t.samplers=[]);let i={magFilter:Li[e.magFilter],minFilter:Li[e.minFilter],wrapS:Li[e.wrapS],wrapT:Li[e.wrapT]};return t.samplers.push(i)-1}async processTextureAsync(e){let i=this.options,r=this.cache,s=this.json;if(r.textures.has(e))return r.textures.get(e);s.textures||(s.textures=[]),e instanceof an&&(e=await this.decompressTextureAsync(e,i.maxTextureSize));let o=e.userData.mimeType;o==="image/webp"&&(o="image/png");let a={sampler:this.processSampler(e),source:this.processImage(e.image,e.format,e.flipY,o)};e.name&&(a.name=e.name),await this._invokeAllAsync(async function(c){c.writeTexture&&await c.writeTexture(e,a)});let l=s.textures.push(a)-1;return r.textures.set(e,l),l}async processMaterialAsync(e){let t=this.cache,i=this.json;if(t.materials.has(e))return t.materials.get(e);if(e.isShaderMaterial)return console.warn("GLTFExporter: THREE.ShaderMaterial not supported."),null;i.materials||(i.materials=[]);let r={pbrMetallicRoughness:{}};e.isMeshStandardMaterial!==!0&&e.isMeshBasicMaterial!==!0&&console.warn("GLTFExporter: Use MeshStandardMaterial or MeshBasicMaterial for best results.");let s=e.color.toArray().concat([e.opacity]);if(Ko(s,[1,1,1,1])||(r.pbrMetallicRoughness.baseColorFactor=s),e.isMeshStandardMaterial?(r.pbrMetallicRoughness.metallicFactor=e.metalness,r.pbrMetallicRoughness.roughnessFactor=e.roughness):(r.pbrMetallicRoughness.metallicFactor=0,r.pbrMetallicRoughness.roughnessFactor=1),e.metalnessMap||e.roughnessMap){let a=await this.buildMetalRoughTextureAsync(e.metalnessMap,e.roughnessMap),l={index:await this.processTextureAsync(a),texCoord:a.channel};this.applyTextureTransform(l,a),r.pbrMetallicRoughness.metallicRoughnessTexture=l}if(e.map){let a={index:await this.processTextureAsync(e.map),texCoord:e.map.channel};this.applyTextureTransform(a,e.map),r.pbrMetallicRoughness.baseColorTexture=a}if(e.emissive){let a=e.emissive;if(Math.max(a.r,a.g,a.b)>0&&(r.emissiveFactor=e.emissive.toArray()),e.emissiveMap){let c={index:await this.processTextureAsync(e.emissiveMap),texCoord:e.emissiveMap.channel};this.applyTextureTransform(c,e.emissiveMap),r.emissiveTexture=c}}if(e.normalMap){let a={index:await this.processTextureAsync(e.normalMap),texCoord:e.normalMap.channel};e.normalScale&&e.normalScale.x!==1&&(a.scale=e.normalScale.x),this.applyTextureTransform(a,e.normalMap),r.normalTexture=a}if(e.aoMap){let a={index:await this.processTextureAsync(e.aoMap),texCoord:e.aoMap.channel};e.aoMapIntensity!==1&&(a.strength=e.aoMapIntensity),this.applyTextureTransform(a,e.aoMap),r.occlusionTexture=a}e.transparent?r.alphaMode="BLEND":e.alphaTest>0&&(r.alphaMode="MASK",r.alphaCutoff=e.alphaTest),e.side===fi&&(r.doubleSided=!0),e.name!==""&&(r.name=e.name),this.serializeUserData(e,r),await this._invokeAllAsync(async function(a){a.writeMaterialAsync&&await a.writeMaterialAsync(e,r)});let o=i.materials.push(r)-1;return t.materials.set(e,o),o}async processMeshAsync(e){let t=this.cache,i=this.json,r=[e.geometry.uuid];if(Array.isArray(e.material))for(let _=0,C=e.material.length;_<C;_++)r.push(e.material[_].uuid);else r.push(e.material.uuid);let s=r.join(":");if(t.meshes.has(s))return t.meshes.get(s);let o=e.geometry,a;e.isLineSegments?a=lt.LINES:e.isLineLoop?a=lt.LINE_LOOP:e.isLine?a=lt.LINE_STRIP:e.isPoints?a=lt.POINTS:a=e.material.wireframe?lt.LINES:lt.TRIANGLES;let l={},c={},h=[],u=[],d={uv:"TEXCOORD_0",uv1:"TEXCOORD_1",uv2:"TEXCOORD_2",uv3:"TEXCOORD_3",color:"COLOR_0",skinWeight:"WEIGHTS_0",skinIndex:"JOINTS_0"},f=o.getAttribute("normal");f!==void 0&&!this.isNormalizedNormalAttribute(f)&&(console.warn("THREE.GLTFExporter: Creating normalized normal attribute from the non-normalized one."),o.setAttribute("normal",this.createNormalizedNormalAttribute(f)));let g=null;for(let _ in o.attributes){if(_.slice(0,5)==="morph")continue;let C=o.attributes[_];if(_=d[_]||_.toUpperCase(),/^(POSITION|NORMAL|TANGENT|TEXCOORD_\d+|COLOR_\d+|JOINTS_\d+|WEIGHTS_\d+)$/.test(_)||(_="_"+_),t.attributes.has(this.getUID(C))){c[_]=t.attributes.get(this.getUID(C));continue}g=null;let A=C.array;_==="JOINTS_0"&&!(A instanceof Uint16Array)&&!(A instanceof Uint8Array)?(console.warn('GLTFExporter: Attribute "skinIndex" converted to type UNSIGNED_SHORT.'),g=new mt(new Uint16Array(A),C.itemSize,C.normalized)):(A instanceof Uint32Array||A instanceof Int32Array)&&!_.startsWith("_")&&(console.warn(`GLTFExporter: Attribute "${_}" converted to type FLOAT.`),g=Dr.Utils.toFloat32BufferAttribute(C));let E=this.processAccessor(g||C,o);E!==null&&(_.startsWith("_")||this.detectMeshQuantization(_,C),c[_]=E,t.attributes.set(this.getUID(C),E))}if(f!==void 0&&o.setAttribute("normal",f),Object.keys(c).length===0)return null;if(e.morphTargetInfluences!==void 0&&e.morphTargetInfluences.length>0){let _=[],C=[],M={};if(e.morphTargetDictionary!==void 0)for(let A in e.morphTargetDictionary)M[e.morphTargetDictionary[A]]=A;for(let A=0;A<e.morphTargetInfluences.length;++A){let E={},b=!1;for(let v in o.morphAttributes){if(v!=="position"&&v!=="normal"){b||(console.warn("GLTFExporter: Only POSITION and NORMAL morph are supported."),b=!0);continue}let P=o.morphAttributes[v][A],N=v.toUpperCase(),F=o.attributes[v];if(t.attributes.has(this.getUID(P,!0))){E[N]=t.attributes.get(this.getUID(P,!0));continue}let z=P.clone();if(!o.morphTargetsRelative)for(let V=0,q=P.count;V<q;V++)for(let X=0;X<P.itemSize;X++)X===0&&z.setX(V,P.getX(V)-F.getX(V)),X===1&&z.setY(V,P.getY(V)-F.getY(V)),X===2&&z.setZ(V,P.getZ(V)-F.getZ(V)),X===3&&z.setW(V,P.getW(V)-F.getW(V));E[N]=this.processAccessor(z,o),t.attributes.set(this.getUID(F,!0),E[N])}u.push(E),_.push(e.morphTargetInfluences[A]),e.morphTargetDictionary!==void 0&&C.push(M[A])}l.weights=_,C.length>0&&(l.extras={},l.extras.targetNames=C)}let x=Array.isArray(e.material);if(x&&o.groups.length===0)return null;let m=!1;if(x&&o.index===null){let _=[];for(let C=0,M=o.attributes.position.count;C<M;C++)_[C]=C;o.setIndex(_),m=!0}let p=x?e.material:[e.material],T=x?o.groups:[{materialIndex:0,start:void 0,count:void 0}];for(let _=0,C=T.length;_<C;_++){let M={mode:a,attributes:c};if(this.serializeUserData(o,M),u.length>0&&(M.targets=u),o.index!==null){let E=this.getUID(o.index);(T[_].start!==void 0||T[_].count!==void 0)&&(E+=":"+T[_].start+":"+T[_].count),t.attributes.has(E)?M.indices=t.attributes.get(E):(M.indices=this.processAccessor(o.index,o,T[_].start,T[_].count),t.attributes.set(E,M.indices)),M.indices===null&&delete M.indices}let A=await this.processMaterialAsync(p[T[_].materialIndex]);A!==null&&(M.material=A),h.push(M)}m===!0&&o.setIndex(null),l.primitives=h,i.meshes||(i.meshes=[]),await this._invokeAllAsync(function(_){_.writeMesh&&_.writeMesh(e,l)});let S=i.meshes.push(l)-1;return t.meshes.set(s,S),S}detectMeshQuantization(e,t){if(this.extensionsUsed[kc])return;let i;switch(t.array.constructor){case Int8Array:i="byte";break;case Uint8Array:i="unsigned byte";break;case Int16Array:i="short";break;case Uint16Array:i="unsigned short";break;default:return}t.normalized&&(i+=" normalized");let r=e.split("_",1)[0];Um[r]&&Um[r].includes(i)&&(this.extensionsUsed[kc]=!0,this.extensionsRequired[kc]=!0)}processCamera(e){let t=this.json;t.cameras||(t.cameras=[]);let i=e.isOrthographicCamera,r={type:i?"orthographic":"perspective"};return i?r.orthographic={xmag:e.right*2,ymag:e.top*2,zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near}:r.perspective={aspectRatio:e.aspect,yfov:Zi.degToRad(e.fov),zfar:e.far<=0?.001:e.far,znear:e.near<0?0:e.near},e.name!==""&&(r.name=e.type),t.cameras.push(r)-1}processAnimation(e,t){let i=this.json,r=this.nodeMap;i.animations||(i.animations=[]),e=Dr.Utils.mergeMorphTargetTracks(e.clone(),t);let s=e.tracks,o=[],a=[];for(let c=0;c<s.length;++c){let h=s[c],u=pt.parseTrackName(h.name),d=pt.findNode(t,u.nodeName),f=Fm[u.propertyName];if(u.objectName==="bones"&&(d.isSkinnedMesh===!0?d=d.skeleton.getBoneByName(u.objectIndex):d=void 0),!d||!f){console.warn('THREE.GLTFExporter: Could not export animation track "%s".',h.name);continue}let g=1,x=h.values.length/h.times.length;f===Fm.morphTargetInfluences&&(x/=d.morphTargetInfluences.length);let m;h.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline===!0?(m="CUBICSPLINE",x/=3):h.getInterpolation()===_n?m="STEP":m="LINEAR",a.push({input:this.processAccessor(new mt(h.times,g)),output:this.processAccessor(new mt(h.values,x)),interpolation:m}),o.push({sampler:a.length-1,target:{node:r.get(d),path:f}})}let l={name:e.name||"clip_"+i.animations.length,samplers:a,channels:o};return this.serializeUserData(e,l),i.animations.push(l),i.animations.length-1}processSkin(e){let t=this.json,i=this.nodeMap,r=t.nodes[i.get(e)],s=e.skeleton;if(s===void 0)return null;let o=e.skeleton.bones[0];if(o===void 0)return null;let a=[],l=new Float32Array(s.bones.length*16),c=new Je;for(let u=0;u<s.bones.length;++u)a.push(i.get(s.bones[u])),c.copy(s.boneInverses[u]),c.multiply(e.bindMatrix).toArray(l,u*16);return t.skins===void 0&&(t.skins=[]),t.skins.push({inverseBindMatrices:this.processAccessor(new mt(l,16)),joints:a,skeleton:i.get(o)}),r.skin=t.skins.length-1}async processNodeAsync(e){let t=this.json,i=this.options,r=this.nodeMap;t.nodes||(t.nodes=[]);let s={};if(i.trs){let a=e.quaternion.toArray(),l=e.position.toArray(),c=e.scale.toArray();Ko(a,[0,0,0,1])||(s.rotation=a),Ko(l,[0,0,0])||(s.translation=l),Ko(c,[1,1,1])||(s.scale=c)}else e.matrixAutoUpdate&&e.updateMatrix(),vy(e.matrix)===!1&&(s.matrix=e.matrix.elements);if(e.name!==""&&(s.name=String(e.name)),this.serializeUserData(e,s),e.isMesh||e.isLine||e.isPoints){let a=await this.processMeshAsync(e);a!==null&&(s.mesh=a)}else e.isCamera&&(s.camera=this.processCamera(e));e.isSkinnedMesh&&this.skins.push(e);let o=t.nodes.push(s)-1;if(r.set(e,o),e.children.length>0){let a=[];for(let l=0,c=e.children.length;l<c;l++){let h=e.children[l];if(h.visible||i.onlyVisible===!1){let u=await this.processNodeAsync(h);u!==null&&a.push(u)}}a.length>0&&(s.children=a)}return await this._invokeAllAsync(function(a){a.writeNode&&a.writeNode(e,s)}),o}async processSceneAsync(e){let t=this.json,i=this.options;t.scenes||(t.scenes=[],t.scene=0);let r={};e.name!==""&&(r.name=e.name),t.scenes.push(r);let s=[];for(let o=0,a=e.children.length;o<a;o++){let l=e.children[o];if(l.visible||i.onlyVisible===!1){let c=await this.processNodeAsync(l);c!==null&&s.push(c)}}s.length>0&&(r.nodes=s),this.serializeUserData(e,r)}async processObjectsAsync(e){let t=new In;t.name="AuxScene";for(let i=0;i<e.length;i++)t.children.push(e[i]);await this.processSceneAsync(t)}async processInputAsync(e){let t=this.options;e=e instanceof Array?e:[e],await this._invokeAllAsync(function(r){r.beforeParse&&r.beforeParse(e)});let i=[];for(let r=0;r<e.length;r++)e[r]instanceof In?await this.processSceneAsync(e[r]):i.push(e[r]);i.length>0&&await this.processObjectsAsync(i);for(let r=0;r<this.skins.length;++r)this.processSkin(this.skins[r]);for(let r=0;r<t.animations.length;++r)this.processAnimation(t.animations[r],e[0]);await this._invokeAllAsync(function(r){r.afterParse&&r.afterParse(e)})}async _invokeAllAsync(e){for(let t=0,i=this.plugins.length;t<i;t++)await e(this.plugins[t])}},Hc=class{constructor(e){this.writer=e,this.name="KHR_lights_punctual"}writeNode(e,t){if(!e.isLight)return;if(!e.isDirectionalLight&&!e.isPointLight&&!e.isSpotLight){console.warn("THREE.GLTFExporter: Only directional, point, and spot lights are supported.",e);return}let i=this.writer,r=i.json,s=i.extensionsUsed,o={};e.name&&(o.name=e.name),o.color=e.color.toArray(),o.intensity=e.intensity,e.isDirectionalLight?o.type="directional":e.isPointLight?(o.type="point",e.distance>0&&(o.range=e.distance)):e.isSpotLight&&(o.type="spot",e.distance>0&&(o.range=e.distance),o.spot={},o.spot.innerConeAngle=(1-e.penumbra)*e.angle,o.spot.outerConeAngle=e.angle),e.decay!==void 0&&e.decay!==2&&console.warn("THREE.GLTFExporter: Light decay may be lost. glTF is physically-based, and expects light.decay=2."),e.target&&(e.target.parent!==e||e.target.position.x!==0||e.target.position.y!==0||e.target.position.z!==-1)&&console.warn("THREE.GLTFExporter: Light direction may be lost. For best results, make light.target a child of the light with position 0,0,-1."),s[this.name]||(r.extensions=r.extensions||{},r.extensions[this.name]={lights:[]},s[this.name]=!0);let a=r.extensions[this.name].lights;a.push(o),t.extensions=t.extensions||{},t.extensions[this.name]={light:a.length-1}}},Gc=class{constructor(e){this.writer=e,this.name="KHR_materials_unlit"}async writeMaterialAsync(e,t){if(!e.isMeshBasicMaterial)return;let r=this.writer.extensionsUsed;t.extensions=t.extensions||{},t.extensions[this.name]={},r[this.name]=!0,t.pbrMetallicRoughness.metallicFactor=0,t.pbrMetallicRoughness.roughnessFactor=.9}},Wc=class{constructor(e){this.writer=e,this.name="KHR_materials_clearcoat"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.clearcoat===0)return;let i=this.writer,r=i.extensionsUsed,s={};if(s.clearcoatFactor=e.clearcoat,e.clearcoatMap){let o={index:await i.processTextureAsync(e.clearcoatMap),texCoord:e.clearcoatMap.channel};i.applyTextureTransform(o,e.clearcoatMap),s.clearcoatTexture=o}if(s.clearcoatRoughnessFactor=e.clearcoatRoughness,e.clearcoatRoughnessMap){let o={index:await i.processTextureAsync(e.clearcoatRoughnessMap),texCoord:e.clearcoatRoughnessMap.channel};i.applyTextureTransform(o,e.clearcoatRoughnessMap),s.clearcoatRoughnessTexture=o}if(e.clearcoatNormalMap){let o={index:await i.processTextureAsync(e.clearcoatNormalMap),texCoord:e.clearcoatNormalMap.channel};e.clearcoatNormalScale.x!==1&&(o.scale=e.clearcoatNormalScale.x),i.applyTextureTransform(o,e.clearcoatNormalMap),s.clearcoatNormalTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Xc=class{constructor(e){this.writer=e,this.name="KHR_materials_dispersion"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.dispersion===0)return;let r=this.writer.extensionsUsed,s={};s.dispersion=e.dispersion,t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},qc=class{constructor(e){this.writer=e,this.name="KHR_materials_iridescence"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.iridescence===0)return;let i=this.writer,r=i.extensionsUsed,s={};if(s.iridescenceFactor=e.iridescence,e.iridescenceMap){let o={index:await i.processTextureAsync(e.iridescenceMap),texCoord:e.iridescenceMap.channel};i.applyTextureTransform(o,e.iridescenceMap),s.iridescenceTexture=o}if(s.iridescenceIor=e.iridescenceIOR,s.iridescenceThicknessMinimum=e.iridescenceThicknessRange[0],s.iridescenceThicknessMaximum=e.iridescenceThicknessRange[1],e.iridescenceThicknessMap){let o={index:await i.processTextureAsync(e.iridescenceThicknessMap),texCoord:e.iridescenceThicknessMap.channel};i.applyTextureTransform(o,e.iridescenceThicknessMap),s.iridescenceThicknessTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Yc=class{constructor(e){this.writer=e,this.name="KHR_materials_transmission"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let i=this.writer,r=i.extensionsUsed,s={};if(s.transmissionFactor=e.transmission,e.transmissionMap){let o={index:await i.processTextureAsync(e.transmissionMap),texCoord:e.transmissionMap.channel};i.applyTextureTransform(o,e.transmissionMap),s.transmissionTexture=o}t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Zc=class{constructor(e){this.writer=e,this.name="KHR_materials_volume"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.transmission===0)return;let i=this.writer,r=i.extensionsUsed,s={};if(s.thicknessFactor=e.thickness,e.thicknessMap){let o={index:await i.processTextureAsync(e.thicknessMap),texCoord:e.thicknessMap.channel};i.applyTextureTransform(o,e.thicknessMap),s.thicknessTexture=o}e.attenuationDistance!==1/0&&(s.attenuationDistance=e.attenuationDistance),s.attenuationColor=e.attenuationColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Jc=class{constructor(e){this.writer=e,this.name="KHR_materials_ior"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.ior===1.5)return;let r=this.writer.extensionsUsed,s={};s.ior=e.ior,t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Kc=class{constructor(e){this.writer=e,this.name="KHR_materials_specular"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.specularIntensity===1&&e.specularColor.equals(py)&&!e.specularIntensityMap&&!e.specularColorMap)return;let i=this.writer,r=i.extensionsUsed,s={};if(e.specularIntensityMap){let o={index:await i.processTextureAsync(e.specularIntensityMap),texCoord:e.specularIntensityMap.channel};i.applyTextureTransform(o,e.specularIntensityMap),s.specularTexture=o}if(e.specularColorMap){let o={index:await i.processTextureAsync(e.specularColorMap),texCoord:e.specularColorMap.channel};i.applyTextureTransform(o,e.specularColorMap),s.specularColorTexture=o}s.specularFactor=e.specularIntensity,s.specularColorFactor=e.specularColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},jc=class{constructor(e){this.writer=e,this.name="KHR_materials_sheen"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.sheen==0)return;let i=this.writer,r=i.extensionsUsed,s={};if(e.sheenRoughnessMap){let o={index:await i.processTextureAsync(e.sheenRoughnessMap),texCoord:e.sheenRoughnessMap.channel};i.applyTextureTransform(o,e.sheenRoughnessMap),s.sheenRoughnessTexture=o}if(e.sheenColorMap){let o={index:await i.processTextureAsync(e.sheenColorMap),texCoord:e.sheenColorMap.channel};i.applyTextureTransform(o,e.sheenColorMap),s.sheenColorTexture=o}s.sheenRoughnessFactor=e.sheenRoughness,s.sheenColorFactor=e.sheenColor.toArray(),t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},$c=class{constructor(e){this.writer=e,this.name="KHR_materials_anisotropy"}async writeMaterialAsync(e,t){if(!e.isMeshPhysicalMaterial||e.anisotropy==0)return;let i=this.writer,r=i.extensionsUsed,s={};if(e.anisotropyMap){let o={index:await i.processTextureAsync(e.anisotropyMap)};i.applyTextureTransform(o,e.anisotropyMap),s.anisotropyTexture=o}s.anisotropyStrength=e.anisotropy,s.anisotropyRotation=e.anisotropyRotation,t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},Qc=class{constructor(e){this.writer=e,this.name="KHR_materials_emissive_strength"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.emissiveIntensity===1)return;let r=this.writer.extensionsUsed,s={};s.emissiveStrength=e.emissiveIntensity,t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},eh=class{constructor(e){this.writer=e,this.name="EXT_materials_bump"}async writeMaterialAsync(e,t){if(!e.isMeshStandardMaterial||e.bumpScale===1&&!e.bumpMap)return;let i=this.writer,r=i.extensionsUsed,s={};if(e.bumpMap){let o={index:await i.processTextureAsync(e.bumpMap),texCoord:e.bumpMap.channel};i.applyTextureTransform(o,e.bumpMap),s.bumpTexture=o}s.bumpFactor=e.bumpScale,t.extensions=t.extensions||{},t.extensions[this.name]=s,r[this.name]=!0}},th=class{constructor(e){this.writer=e,this.name="EXT_mesh_gpu_instancing"}writeNode(e,t){if(!e.isInstancedMesh)return;let i=this.writer,r=e,s=new Float32Array(r.count*3),o=new Float32Array(r.count*4),a=new Float32Array(r.count*3),l=new Je,c=new R,h=new Nt,u=new R;for(let f=0;f<r.count;f++)r.getMatrixAt(f,l),l.decompose(c,h,u),c.toArray(s,f*3),h.toArray(o,f*4),u.toArray(a,f*3);let d={TRANSLATION:i.processAccessor(new mt(s,3)),ROTATION:i.processAccessor(new mt(o,4)),SCALE:i.processAccessor(new mt(a,3))};r.instanceColor&&(d._COLOR_0=i.processAccessor(r.instanceColor)),t.extensions=t.extensions||{},t.extensions[this.name]={attributes:d},i.extensionsUsed[this.name]=!0,i.extensionsRequired[this.name]=!0}};Dr.Utils={insertKeyframe:function(n,e){let i=n.getValueSize(),r=new n.TimeBufferType(n.times.length+1),s=new n.ValueBufferType(n.values.length+i),o=n.createInterpolant(new n.ValueBufferType(i)),a;if(n.times.length===0){r[0]=e;for(let l=0;l<i;l++)s[l]=0;a=0}else if(e<n.times[0]){if(Math.abs(n.times[0]-e)<.001)return 0;r[0]=e,r.set(n.times,1),s.set(o.evaluate(e),0),s.set(n.values,i),a=0}else if(e>n.times[n.times.length-1]){if(Math.abs(n.times[n.times.length-1]-e)<.001)return n.times.length-1;r[r.length-1]=e,r.set(n.times,0),s.set(n.values,0),s.set(o.evaluate(e),n.values.length),a=r.length-1}else for(let l=0;l<n.times.length;l++){if(Math.abs(n.times[l]-e)<.001)return l;if(n.times[l]<e&&n.times[l+1]>e){r.set(n.times.slice(0,l+1),0),r[l+1]=e,r.set(n.times.slice(l+1),l+2),s.set(n.values.slice(0,(l+1)*i),0),s.set(o.evaluate(e),(l+1)*i),s.set(n.values.slice((l+1)*i),(l+2)*i),a=l+1;break}}return n.times=r,n.values=s,a},mergeMorphTargetTracks:function(n,e){let t=[],i={},r=n.tracks;for(let s=0;s<r.length;++s){let o=r[s],a=pt.parseTrackName(o.name),l=pt.findNode(e,a.nodeName);if(a.propertyName!=="morphTargetInfluences"||a.propertyIndex===void 0){t.push(o);continue}if(o.createInterpolant!==o.InterpolantFactoryMethodDiscrete&&o.createInterpolant!==o.InterpolantFactoryMethodLinear){if(o.createInterpolant.isInterpolantFactoryMethodGLTFCubicSpline)throw new Error("THREE.GLTFExporter: Cannot merge tracks with glTF CUBICSPLINE interpolation.");console.warn("THREE.GLTFExporter: Morph target interpolation mode not yet supported. Using LINEAR instead."),o=o.clone(),o.setInterpolation(jr)}let c=l.morphTargetInfluences.length,h=l.morphTargetDictionary[a.propertyIndex];if(h===void 0)throw new Error("THREE.GLTFExporter: Morph target name not found: "+a.propertyIndex);let u;if(i[l.uuid]===void 0){u=o.clone();let f=new u.ValueBufferType(c*u.times.length);for(let g=0;g<u.times.length;g++)f[g*c+h]=u.values[g];u.name=(a.nodeName||"")+".morphTargetInfluences",u.values=f,i[l.uuid]=u,t.push(u);continue}let d=o.createInterpolant(new o.ValueBufferType(1));u=i[l.uuid];for(let f=0;f<u.times.length;f++)u.values[f*c+h]=d.evaluate(u.times[f]);for(let f=0;f<o.times.length;f++){let g=this.insertKeyframe(u,o.times[f]);u.values[g*c+h]=o.values[f]}}return n.tracks=t,n},toFloat32BufferAttribute:function(n){let e=new mt(new Float32Array(n.count*n.itemSize),n.itemSize,!1);if(!n.normalized&&!n.isInterleavedBufferAttribute)return e.array.set(n.array),e;for(let t=0,i=n.count;t<i;t++)for(let r=0;r<n.itemSize;r++)e.setComponent(t,r,n.getComponent(t,r));return e}};var Nr=["#91a8ac","#a6a9b8","#719890","#ba9a81","#a8a78c","#ab8f97","#7e99ac"],ml=(n,e,t)=>(e[0]-n[0])*(t[1]-n[1])-(e[1]-n[1])*(t[0]-n[0]),jo=(n,e)=>n[(e+1)%n.length];function Sy(n,e,t){let i=Zi.degToRad(t.angle_deg),r=t.kind==="gable",s=r?-Math.sin(i):Math.cos(i),o=r?Math.cos(i):Math.sin(i),a=([g,x])=>s*g+o*x,l=n.map(a),c=Math.min(...l),h=Math.max(...l),u=(c+h)/2,d=h-c,f=g=>{let x=a(g)-u;return Math.abs(x)<d*1e-10?0:x};return{gable:r,side:f,elevation(g){let x=r?2*Math.abs(f(g))/d:(h-a(g))/d;return e-t.rise_m*x}}}function Gm(n,e,t){let i=t(n),r=t(e);if(i*r>=0)return null;let s=i/(i-r);return[n[0]+(e[0]-n[0])*s,n[1]+(e[1]-n[1])*s]}function Vm(n,e,t){let i=[];return n.forEach((r,s)=>{let o=jo(n,s);e(r)*t>=0&&i.push(r);let a=Gm(r,o,e);a&&i.push(a)}),i}function gl(n){let e=n.filter((i,r)=>Math.abs(ml(n[(r+n.length-1)%n.length],i,jo(n,r)))>1e-10);return e.reduce((i,[r,s],o)=>{let[a,l]=jo(e,o);return i+r*l-s*a},0)<0&&e.reverse(),e}function wy(n,e,t){let i=gl(n),r=Sy(i,e,t),s=Pi.triangulateShape(i.map(([h,u])=>new ie(h,u)),[]),o=[],a=[],l=([h,u])=>[h,0,u],c=h=>[h[0],r.elevation(h),h[1]];for(let h of s){let u=h.map(f=>i[f]);ml(...u)<0&&u.reverse();let d=r.gable?[Vm(u,r.side,1),Vm(u,r.side,-1)]:[u];for(let f of d){let g=f[0];for(let x=1;x<f.length-1;x++){let m=f[x],p=f[x+1];Math.abs(ml(g,m,p))<1e-10||o.push(...c(g),...c(p),...c(m),...l(g),...l(m),...l(p))}}}return i.forEach((h,u)=>{let d=jo(i,u),f=r.gable?Gm(h,d,r.side):null,g=f?[[h,f],[f,d]]:[[h,d]];for(let[x,m]of g)a.push(...l(x),...c(x),...c(m),...l(x),...c(m),...l(m))}),Wm(o,a)}function ih(n,e,t,i,r){let s=a=>a.map(([l,c])=>new ie(l,c)),o=[...e,...t.flat()];for(let a of Pi.triangulateShape(s(e),t.map(s))){let l=a.map(c=>o[c]);ml(...l)>0===r&&l.reverse();for(let[c,h]of l)n.push(c,i,h)}}function Hm(n,e,t,i){e.forEach(([r,s],o)=>{let[a,l]=jo(e,o);n.push(r,t,s,r,i,s,a,i,l,r,t,s,a,i,l,a,t,l)})}function Ty(n,e,t){let i=gl(n),[r,s]=i.reduce(([u,d],[f,g])=>[u+f/i.length,d+g/i.length],[0,0]),o=t.upper_scale_pct/100,a=i.map(([u,d])=>[r+(u-r)*o,s+(d-s)*o]),l=e-t.rise_m,c=[],h=[];return ih(c,i,[],0,!1),ih(c,i,[a],l,!0),ih(c,a,[],e,!0),Hm(h,i,0,l),Hm(h,a,l,e),Wm(c,h)}function Wm(n,e){let t=new Ke;return t.setAttribute("position",new tt([...n,...e],3)),t.addGroup(0,n.length/3,0),t.addGroup(n.length/3,e.length/3,1),t.computeVertexNormals(),t}function Ey({footprint:n,height_m:e,roof:t,courtyards:i=[]}){if(t?.kind==="stepped")return Ty(n,e,t);if(t)return wy(n,e,t);let r=new ln;(i.length?gl(n):n).forEach(([a,l],c)=>c?r.lineTo(a,-l):r.moveTo(a,-l)),r.closePath();for(let a of i){let l=new Pn;gl(a).reverse().forEach(([c,h],u)=>u?l.lineTo(c,-h):l.moveTo(c,-h)),l.closePath(),r.holes.push(l)}let o=new sl(r,{depth:e,bevelEnabled:!1});return o.rotateX(-Math.PI/2),o}function $o(n,e=0){let t=new Pe(Nr[e%Nr.length]),i=new en({color:t.clone().lerp(new Pe("#f3efe5"),.3),roughness:.92}),r=new en({color:t,roughness:.93}),s=new gt(Ey(n),[i,r]);return s.name=n.code,s.userData={code:n.code,maxHeightMetres:n.height_m,roof:n.roof??null,footprintMethod:n.method,program:n.program??null},s}import*as nh from"@hermes/plugin-sdk";async function er(n,e,t){if(!nh.captureGatewayFileDownload)throw new Error("This Hermes version cannot save prepared files.");let i=nh.captureGatewayFileDownload(),r=await n.rest(e,{method:"POST",body:t,timeoutMs:6e4});await i(r.path,r.name)}async function Ay(n){let e=new Ii;e.name="SiteForm massing",e.userData={source:n.source,revision:n.revision,limits:n.limits,metresPerUnit:1};let t=n.buildings.map($o);e.add(...t);try{let i=await new Dr().parseAsync(e,{binary:!1});return JSON.stringify(i)}finally{for(let i of t)i.geometry.dispose(),i.material.forEach(r=>r.dispose())}}function Cy(n){let e=String(n??"");return'"'+(typeof n=="string"&&/^[\s\uFEFF]*[=+@-]|^[\t\r\n]/.test(e)?"'"+e:e).replaceAll('"','""')+'"'}function Iy(n){let e=["Building ID","Height (m)","Footprint (m\xB2)","Volume (m\xB3)","Roof form","Roof basis","Roof reference","Outline method","Printed area (m\xB2)","Area difference (%)","Drawing","Sheet","Revision","Design X offset (m)","Design Y offset (m)"],t=n.buildings.map(i=>[i.code,i.height_m,i.area_m2,i.volume_m3,i.roof?.kind??"flat",i.roof?.basis,i.roof?.note,i.method,i.printed_area_m2,i.difference_pct,n.source.name,n.source.page,n.revision,i.placement?.dx_m??0,i.placement?.dy_m??0]);return"\uFEFF"+[e,...t].map(i=>i.map(Cy).join(",")).join(`\r
`)+`\r
`}async function Ns(n,e,t){if(!n.files?.requestFolder)throw new Error("File export requires Hermes Desktop folder access.");let i=await n.files.requestFolder();if(!i.ok)throw new Error(i.message);if(!i.folder)return null;let r=t==="gltf"?await Ay(e):t==="csv"?Iy(e):JSON.stringify(e,null,2);if(new TextEncoder().encode(r).byteLength>4*1024*1024)throw new Error("The export exceeds the Hermes 4 MiB file limit. Save a smaller model or export JSON evidence.");let s=new Date().toISOString().replace(/[^0-9]/g,""),o="siteform-"+e.revision.slice(0,8)+"-"+s+"."+t,a=await n.files.writeText(i.folder.id,o,r,{exclusive:!0});if(!a.ok)throw new Error(a.message);return i.folder.path+" / "+o}import de,{useEffect as vl,useMemo as Zm,useRef as Jm,useState as Ur}from"react";var Xm={type:"change"},sh={type:"start"},Ym={type:"end"},xl=new Ei,qm=new _i,Py=Math.cos(70*Zi.DEG2RAD),Yt=new R,yi=2*Math.PI,vt={NONE:-1,ROTATE:0,DOLLY:1,PAN:2,TOUCH_ROTATE:3,TOUCH_PAN:4,TOUCH_DOLLY_PAN:5,TOUCH_DOLLY_ROTATE:6},rh=1e-6,_l=class extends Yo{constructor(e,t=null){super(e,t),this.state=vt.NONE,this.target=new R,this.cursor=new R,this.minDistance=0,this.maxDistance=1/0,this.minZoom=0,this.maxZoom=1/0,this.minTargetRadius=0,this.maxTargetRadius=1/0,this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.enableDamping=!1,this.dampingFactor=.05,this.enableZoom=!0,this.zoomSpeed=1,this.enableRotate=!0,this.rotateSpeed=1,this.keyRotateSpeed=1,this.enablePan=!0,this.panSpeed=1,this.screenSpacePanning=!0,this.keyPanSpeed=7,this.zoomToCursor=!1,this.autoRotate=!1,this.autoRotateSpeed=2,this.keys={LEFT:"ArrowLeft",UP:"ArrowUp",RIGHT:"ArrowRight",BOTTOM:"ArrowDown"},this.mouseButtons={LEFT:or.ROTATE,MIDDLE:or.DOLLY,RIGHT:or.PAN},this.touches={ONE:ar.ROTATE,TWO:ar.DOLLY_PAN},this.target0=this.target.clone(),this.position0=this.object.position.clone(),this.zoom0=this.object.zoom,this._domElementKeyEvents=null,this._lastPosition=new R,this._lastQuaternion=new Nt,this._lastTargetPosition=new R,this._quat=new Nt().setFromUnitVectors(e.up,new R(0,1,0)),this._quatInverse=this._quat.clone().invert(),this._spherical=new Cs,this._sphericalDelta=new Cs,this._scale=1,this._panOffset=new R,this._rotateStart=new ie,this._rotateEnd=new ie,this._rotateDelta=new ie,this._panStart=new ie,this._panEnd=new ie,this._panDelta=new ie,this._dollyStart=new ie,this._dollyEnd=new ie,this._dollyDelta=new ie,this._dollyDirection=new R,this._mouse=new ie,this._performCursorZoom=!1,this._pointers=[],this._pointerPositions={},this._controlActive=!1,this._onPointerMove=Ly.bind(this),this._onPointerDown=Ry.bind(this),this._onPointerUp=Dy.bind(this),this._onContextMenu=zy.bind(this),this._onMouseWheel=Fy.bind(this),this._onKeyDown=Oy.bind(this),this._onTouchStart=By.bind(this),this._onTouchMove=ky.bind(this),this._onMouseDown=Ny.bind(this),this._onMouseMove=Uy.bind(this),this._interceptControlDown=Vy.bind(this),this._interceptControlUp=Hy.bind(this),this.domElement!==null&&this.connect(this.domElement),this.update()}connect(e){super.connect(e),this.domElement.addEventListener("pointerdown",this._onPointerDown),this.domElement.addEventListener("pointercancel",this._onPointerUp),this.domElement.addEventListener("contextmenu",this._onContextMenu),this.domElement.addEventListener("wheel",this._onMouseWheel,{passive:!1}),this.domElement.getRootNode().addEventListener("keydown",this._interceptControlDown,{passive:!0,capture:!0}),this.domElement.style.touchAction="none"}disconnect(){this.domElement.removeEventListener("pointerdown",this._onPointerDown),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.domElement.removeEventListener("pointercancel",this._onPointerUp),this.domElement.removeEventListener("wheel",this._onMouseWheel),this.domElement.removeEventListener("contextmenu",this._onContextMenu),this.stopListenToKeyEvents(),this.domElement.getRootNode().removeEventListener("keydown",this._interceptControlDown,{capture:!0}),this.domElement.style.touchAction="auto"}dispose(){this.disconnect()}getPolarAngle(){return this._spherical.phi}getAzimuthalAngle(){return this._spherical.theta}getDistance(){return this.object.position.distanceTo(this.target)}listenToKeyEvents(e){e.addEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=e}stopListenToKeyEvents(){this._domElementKeyEvents!==null&&(this._domElementKeyEvents.removeEventListener("keydown",this._onKeyDown),this._domElementKeyEvents=null)}saveState(){this.target0.copy(this.target),this.position0.copy(this.object.position),this.zoom0=this.object.zoom}reset(){this.target.copy(this.target0),this.object.position.copy(this.position0),this.object.zoom=this.zoom0,this.object.updateProjectionMatrix(),this.dispatchEvent(Xm),this.update(),this.state=vt.NONE}update(e=null){let t=this.object.position;Yt.copy(t).sub(this.target),Yt.applyQuaternion(this._quat),this._spherical.setFromVector3(Yt),this.autoRotate&&this.state===vt.NONE&&this._rotateLeft(this._getAutoRotationAngle(e)),this.enableDamping?(this._spherical.theta+=this._sphericalDelta.theta*this.dampingFactor,this._spherical.phi+=this._sphericalDelta.phi*this.dampingFactor):(this._spherical.theta+=this._sphericalDelta.theta,this._spherical.phi+=this._sphericalDelta.phi);let i=this.minAzimuthAngle,r=this.maxAzimuthAngle;isFinite(i)&&isFinite(r)&&(i<-Math.PI?i+=yi:i>Math.PI&&(i-=yi),r<-Math.PI?r+=yi:r>Math.PI&&(r-=yi),i<=r?this._spherical.theta=Math.max(i,Math.min(r,this._spherical.theta)):this._spherical.theta=this._spherical.theta>(i+r)/2?Math.max(i,this._spherical.theta):Math.min(r,this._spherical.theta)),this._spherical.phi=Math.max(this.minPolarAngle,Math.min(this.maxPolarAngle,this._spherical.phi)),this._spherical.makeSafe(),this.enableDamping===!0?this.target.addScaledVector(this._panOffset,this.dampingFactor):this.target.add(this._panOffset),this.target.sub(this.cursor),this.target.clampLength(this.minTargetRadius,this.maxTargetRadius),this.target.add(this.cursor);let s=!1;if(this.zoomToCursor&&this._performCursorZoom||this.object.isOrthographicCamera)this._spherical.radius=this._clampDistance(this._spherical.radius);else{let o=this._spherical.radius;this._spherical.radius=this._clampDistance(this._spherical.radius*this._scale),s=o!=this._spherical.radius}if(Yt.setFromSpherical(this._spherical),Yt.applyQuaternion(this._quatInverse),t.copy(this.target).add(Yt),this.object.lookAt(this.target),this.enableDamping===!0?(this._sphericalDelta.theta*=1-this.dampingFactor,this._sphericalDelta.phi*=1-this.dampingFactor,this._panOffset.multiplyScalar(1-this.dampingFactor)):(this._sphericalDelta.set(0,0,0),this._panOffset.set(0,0,0)),this.zoomToCursor&&this._performCursorZoom){let o=null;if(this.object.isPerspectiveCamera){let a=Yt.length();o=this._clampDistance(a*this._scale);let l=a-o;this.object.position.addScaledVector(this._dollyDirection,l),this.object.updateMatrixWorld(),s=!!l}else if(this.object.isOrthographicCamera){let a=new R(this._mouse.x,this._mouse.y,0);a.unproject(this.object);let l=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),this.object.updateProjectionMatrix(),s=l!==this.object.zoom;let c=new R(this._mouse.x,this._mouse.y,0);c.unproject(this.object),this.object.position.sub(c).add(a),this.object.updateMatrixWorld(),o=Yt.length()}else console.warn("WARNING: OrbitControls.js encountered an unknown camera type - zoom to cursor disabled."),this.zoomToCursor=!1;o!==null&&(this.screenSpacePanning?this.target.set(0,0,-1).transformDirection(this.object.matrix).multiplyScalar(o).add(this.object.position):(xl.origin.copy(this.object.position),xl.direction.set(0,0,-1).transformDirection(this.object.matrix),Math.abs(this.object.up.dot(xl.direction))<Py?this.object.lookAt(this.target):(qm.setFromNormalAndCoplanarPoint(this.object.up,this.target),xl.intersectPlane(qm,this.target))))}else if(this.object.isOrthographicCamera){let o=this.object.zoom;this.object.zoom=Math.max(this.minZoom,Math.min(this.maxZoom,this.object.zoom/this._scale)),o!==this.object.zoom&&(this.object.updateProjectionMatrix(),s=!0)}return this._scale=1,this._performCursorZoom=!1,s||this._lastPosition.distanceToSquared(this.object.position)>rh||8*(1-this._lastQuaternion.dot(this.object.quaternion))>rh||this._lastTargetPosition.distanceToSquared(this.target)>rh?(this.dispatchEvent(Xm),this._lastPosition.copy(this.object.position),this._lastQuaternion.copy(this.object.quaternion),this._lastTargetPosition.copy(this.target),!0):!1}_getAutoRotationAngle(e){return e!==null?yi/60*this.autoRotateSpeed*e:yi/60/60*this.autoRotateSpeed}_getZoomScale(e){let t=Math.abs(e*.01);return Math.pow(.95,this.zoomSpeed*t)}_rotateLeft(e){this._sphericalDelta.theta-=e}_rotateUp(e){this._sphericalDelta.phi-=e}_panLeft(e,t){Yt.setFromMatrixColumn(t,0),Yt.multiplyScalar(-e),this._panOffset.add(Yt)}_panUp(e,t){this.screenSpacePanning===!0?Yt.setFromMatrixColumn(t,1):(Yt.setFromMatrixColumn(t,0),Yt.crossVectors(this.object.up,Yt)),Yt.multiplyScalar(e),this._panOffset.add(Yt)}_pan(e,t){let i=this.domElement;if(this.object.isPerspectiveCamera){let r=this.object.position;Yt.copy(r).sub(this.target);let s=Yt.length();s*=Math.tan(this.object.fov/2*Math.PI/180),this._panLeft(2*e*s/i.clientHeight,this.object.matrix),this._panUp(2*t*s/i.clientHeight,this.object.matrix)}else this.object.isOrthographicCamera?(this._panLeft(e*(this.object.right-this.object.left)/this.object.zoom/i.clientWidth,this.object.matrix),this._panUp(t*(this.object.top-this.object.bottom)/this.object.zoom/i.clientHeight,this.object.matrix)):(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled."),this.enablePan=!1)}_dollyOut(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale/=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_dollyIn(e){this.object.isPerspectiveCamera||this.object.isOrthographicCamera?this._scale*=e:(console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled."),this.enableZoom=!1)}_updateZoomParameters(e,t){if(!this.zoomToCursor)return;this._performCursorZoom=!0;let i=this.domElement.getBoundingClientRect(),r=e-i.left,s=t-i.top,o=i.width,a=i.height;this._mouse.x=r/o*2-1,this._mouse.y=-(s/a)*2+1,this._dollyDirection.set(this._mouse.x,this._mouse.y,1).unproject(this.object).sub(this.object.position).normalize()}_clampDistance(e){return Math.max(this.minDistance,Math.min(this.maxDistance,e))}_handleMouseDownRotate(e){this._rotateStart.set(e.clientX,e.clientY)}_handleMouseDownDolly(e){this._updateZoomParameters(e.clientX,e.clientX),this._dollyStart.set(e.clientX,e.clientY)}_handleMouseDownPan(e){this._panStart.set(e.clientX,e.clientY)}_handleMouseMoveRotate(e){this._rotateEnd.set(e.clientX,e.clientY),this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yi*this._rotateDelta.x/t.clientHeight),this._rotateUp(yi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd),this.update()}_handleMouseMoveDolly(e){this._dollyEnd.set(e.clientX,e.clientY),this._dollyDelta.subVectors(this._dollyEnd,this._dollyStart),this._dollyDelta.y>0?this._dollyOut(this._getZoomScale(this._dollyDelta.y)):this._dollyDelta.y<0&&this._dollyIn(this._getZoomScale(this._dollyDelta.y)),this._dollyStart.copy(this._dollyEnd),this.update()}_handleMouseMovePan(e){this._panEnd.set(e.clientX,e.clientY),this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd),this.update()}_handleMouseWheel(e){this._updateZoomParameters(e.clientX,e.clientY),e.deltaY<0?this._dollyIn(this._getZoomScale(e.deltaY)):e.deltaY>0&&this._dollyOut(this._getZoomScale(e.deltaY)),this.update()}_handleKeyDown(e){let t=!1;switch(e.code){case this.keys.UP:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(yi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,this.keyPanSpeed),t=!0;break;case this.keys.BOTTOM:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateUp(-yi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(0,-this.keyPanSpeed),t=!0;break;case this.keys.LEFT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(yi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(this.keyPanSpeed,0),t=!0;break;case this.keys.RIGHT:e.ctrlKey||e.metaKey||e.shiftKey?this.enableRotate&&this._rotateLeft(-yi*this.keyRotateSpeed/this.domElement.clientHeight):this.enablePan&&this._pan(-this.keyPanSpeed,0),t=!0;break}t&&(e.preventDefault(),this.update())}_handleTouchStartRotate(e){if(this._pointers.length===1)this._rotateStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._rotateStart.set(i,r)}}_handleTouchStartPan(e){if(this._pointers.length===1)this._panStart.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panStart.set(i,r)}}_handleTouchStartDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyStart.set(0,s)}_handleTouchStartDollyPan(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enablePan&&this._handleTouchStartPan(e)}_handleTouchStartDollyRotate(e){this.enableZoom&&this._handleTouchStartDolly(e),this.enableRotate&&this._handleTouchStartRotate(e)}_handleTouchMoveRotate(e){if(this._pointers.length==1)this._rotateEnd.set(e.pageX,e.pageY);else{let i=this._getSecondPointerPosition(e),r=.5*(e.pageX+i.x),s=.5*(e.pageY+i.y);this._rotateEnd.set(r,s)}this._rotateDelta.subVectors(this._rotateEnd,this._rotateStart).multiplyScalar(this.rotateSpeed);let t=this.domElement;this._rotateLeft(yi*this._rotateDelta.x/t.clientHeight),this._rotateUp(yi*this._rotateDelta.y/t.clientHeight),this._rotateStart.copy(this._rotateEnd)}_handleTouchMovePan(e){if(this._pointers.length===1)this._panEnd.set(e.pageX,e.pageY);else{let t=this._getSecondPointerPosition(e),i=.5*(e.pageX+t.x),r=.5*(e.pageY+t.y);this._panEnd.set(i,r)}this._panDelta.subVectors(this._panEnd,this._panStart).multiplyScalar(this.panSpeed),this._pan(this._panDelta.x,this._panDelta.y),this._panStart.copy(this._panEnd)}_handleTouchMoveDolly(e){let t=this._getSecondPointerPosition(e),i=e.pageX-t.x,r=e.pageY-t.y,s=Math.sqrt(i*i+r*r);this._dollyEnd.set(0,s),this._dollyDelta.set(0,Math.pow(this._dollyEnd.y/this._dollyStart.y,this.zoomSpeed)),this._dollyOut(this._dollyDelta.y),this._dollyStart.copy(this._dollyEnd);let o=(e.pageX+t.x)*.5,a=(e.pageY+t.y)*.5;this._updateZoomParameters(o,a)}_handleTouchMoveDollyPan(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enablePan&&this._handleTouchMovePan(e)}_handleTouchMoveDollyRotate(e){this.enableZoom&&this._handleTouchMoveDolly(e),this.enableRotate&&this._handleTouchMoveRotate(e)}_addPointer(e){this._pointers.push(e.pointerId)}_removePointer(e){delete this._pointerPositions[e.pointerId];for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId){this._pointers.splice(t,1);return}}_isTrackingPointer(e){for(let t=0;t<this._pointers.length;t++)if(this._pointers[t]==e.pointerId)return!0;return!1}_trackPointer(e){let t=this._pointerPositions[e.pointerId];t===void 0&&(t=new ie,this._pointerPositions[e.pointerId]=t),t.set(e.pageX,e.pageY)}_getSecondPointerPosition(e){let t=e.pointerId===this._pointers[0]?this._pointers[1]:this._pointers[0];return this._pointerPositions[t]}_customWheelEvent(e){let t=e.deltaMode,i={clientX:e.clientX,clientY:e.clientY,deltaY:e.deltaY};switch(t){case 1:i.deltaY*=16;break;case 2:i.deltaY*=100;break}return e.ctrlKey&&!this._controlActive&&(i.deltaY*=10),i}};function Ry(n){this.enabled!==!1&&(this._pointers.length===0&&(this.domElement.setPointerCapture(n.pointerId),this.domElement.addEventListener("pointermove",this._onPointerMove),this.domElement.addEventListener("pointerup",this._onPointerUp)),!this._isTrackingPointer(n)&&(this._addPointer(n),n.pointerType==="touch"?this._onTouchStart(n):this._onMouseDown(n)))}function Ly(n){this.enabled!==!1&&(n.pointerType==="touch"?this._onTouchMove(n):this._onMouseMove(n))}function Dy(n){switch(this._removePointer(n),this._pointers.length){case 0:this.domElement.releasePointerCapture(n.pointerId),this.domElement.removeEventListener("pointermove",this._onPointerMove),this.domElement.removeEventListener("pointerup",this._onPointerUp),this.dispatchEvent(Ym),this.state=vt.NONE;break;case 1:let e=this._pointers[0],t=this._pointerPositions[e];this._onTouchStart({pointerId:e,pageX:t.x,pageY:t.y});break}}function Ny(n){let e;switch(n.button){case 0:e=this.mouseButtons.LEFT;break;case 1:e=this.mouseButtons.MIDDLE;break;case 2:e=this.mouseButtons.RIGHT;break;default:e=-1}switch(e){case or.DOLLY:if(this.enableZoom===!1)return;this._handleMouseDownDolly(n),this.state=vt.DOLLY;break;case or.ROTATE:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}else{if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}break;case or.PAN:if(n.ctrlKey||n.metaKey||n.shiftKey){if(this.enableRotate===!1)return;this._handleMouseDownRotate(n),this.state=vt.ROTATE}else{if(this.enablePan===!1)return;this._handleMouseDownPan(n),this.state=vt.PAN}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(sh)}function Uy(n){switch(this.state){case vt.ROTATE:if(this.enableRotate===!1)return;this._handleMouseMoveRotate(n);break;case vt.DOLLY:if(this.enableZoom===!1)return;this._handleMouseMoveDolly(n);break;case vt.PAN:if(this.enablePan===!1)return;this._handleMouseMovePan(n);break}}function Fy(n){this.enabled===!1||this.enableZoom===!1||this.state!==vt.NONE||(n.preventDefault(),this.dispatchEvent(sh),this._handleMouseWheel(this._customWheelEvent(n)),this.dispatchEvent(Ym))}function Oy(n){this.enabled!==!1&&this._handleKeyDown(n)}function By(n){switch(this._trackPointer(n),this._pointers.length){case 1:switch(this.touches.ONE){case ar.ROTATE:if(this.enableRotate===!1)return;this._handleTouchStartRotate(n),this.state=vt.TOUCH_ROTATE;break;case ar.PAN:if(this.enablePan===!1)return;this._handleTouchStartPan(n),this.state=vt.TOUCH_PAN;break;default:this.state=vt.NONE}break;case 2:switch(this.touches.TWO){case ar.DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchStartDollyPan(n),this.state=vt.TOUCH_DOLLY_PAN;break;case ar.DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchStartDollyRotate(n),this.state=vt.TOUCH_DOLLY_ROTATE;break;default:this.state=vt.NONE}break;default:this.state=vt.NONE}this.state!==vt.NONE&&this.dispatchEvent(sh)}function ky(n){switch(this._trackPointer(n),this.state){case vt.TOUCH_ROTATE:if(this.enableRotate===!1)return;this._handleTouchMoveRotate(n),this.update();break;case vt.TOUCH_PAN:if(this.enablePan===!1)return;this._handleTouchMovePan(n),this.update();break;case vt.TOUCH_DOLLY_PAN:if(this.enableZoom===!1&&this.enablePan===!1)return;this._handleTouchMoveDollyPan(n),this.update();break;case vt.TOUCH_DOLLY_ROTATE:if(this.enableZoom===!1&&this.enableRotate===!1)return;this._handleTouchMoveDollyRotate(n),this.update();break;default:this.state=vt.NONE}}function zy(n){this.enabled!==!1&&n.preventDefault()}function Vy(n){n.key==="Control"&&(this._controlActive=!0,this.domElement.getRootNode().addEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function Hy(n){n.key==="Control"&&(this._controlActive=!1,this.domElement.getRootNode().removeEventListener("keyup",this._interceptControlUp,{passive:!0,capture:!0}))}function oh(n,e){let[t,i]=n.size.map(m=>m*e.metres_per_pdf_point),[r,s]=e.draft.buildings[0].outline[0],o=[-r*t,-s*i,t,i],a=[...e.draft.buildings.flatMap(m=>m.outline),...e.draft.site?.boundary??[]],l=a.map(([m])=>m),c=a.map(([,m])=>m),h=Math.min(...l),u=Math.max(...l),d=Math.min(...c),f=Math.max(...c),g=Math.max((u-h)*t,(f-d)*i)*.14,x=[Math.max(0,h-g/t),Math.max(0,d-g/i),Math.min(1,u+g/t),Math.min(1,f+g/i)];return{crop:x,source:o,world:[o[0]+x[0]*t,o[1]+x[1]*i,(x[2]-x[0])*t,(x[3]-x[1])*i]}}import Tt from"react";var ah={gable:"Gable",shed:"Single slope",stepped:"Stepped"};function yl({roof:n,index:e,onChange:t}){let i=(r,s)=>t({...n,[r]:s});return Tt.createElement("div",{className:"sf-roof-fields"},Tt.createElement("label",null,"Roof form ",e,Tt.createElement("select",{"aria-label":"Roof form "+e,value:n?.kind??"flat",onChange:r=>t(r.target.value==="flat"?null:{rise_m:n?.rise_m??"",angle_deg:n?.angle_deg??0,upper_scale_pct:n?.upper_scale_pct??"",basis:n?.basis??"illustrative",note:n?.note??"",kind:r.target.value})},Tt.createElement("option",{value:"flat"},"Flat massing"),Tt.createElement("option",{value:"gable"},"Gable \xB7 two slopes"),Tt.createElement("option",{value:"shed"},"Single slope"),Tt.createElement("option",{value:"stepped"},"Stepped mass \xB7 two tiers"))),n&&Tt.createElement(Tt.Fragment,null,Tt.createElement("div",{className:"sf-fields"},Tt.createElement("label",null,"Roof rise (m) ",e,Tt.createElement("input",{type:"number",required:!0,min:".001",max:"999.999",step:"any",value:n.rise_m,onChange:r=>i("rise_m",r.target.value)})),n.kind==="stepped"?Tt.createElement("label",null,"Upper tier scale (%) ",e,Tt.createElement("input",{type:"number",required:!0,min:"10",max:"95",step:"any",value:n.upper_scale_pct,onChange:r=>i("upper_scale_pct",r.target.value)})):Tt.createElement("label",null,"Roof direction (\xB0) ",e,Tt.createElement("input",{type:"number",required:!0,min:"0",max:"359.999",step:"any",value:n.angle_deg,onChange:r=>i("angle_deg",r.target.value)}))),Tt.createElement("p",{className:"sf-caption"},n.kind==="stepped"?"Rise is the height of the upper tier. Its footprint is scaled inward. A convex footprint is required.":Tt.createElement(Tt.Fragment,null,"Height above is the highest point. Rise is the difference to the low edge. Direction is the ",n.kind==="gable"?"ridge":"uphill direction"," clockwise from sheet right.")),Tt.createElement("label",null,"Roof basis ",e,Tt.createElement("select",{"aria-label":"Roof basis "+e,value:n.basis,onChange:r=>i("basis",r.target.value)},Tt.createElement("option",{value:"illustrative"},"Illustrative assumption"),Tt.createElement("option",{value:"drawing"},"Entered from a drawing"))),Tt.createElement("label",null,"Roof reference ",e,Tt.createElement("input",{maxLength:240,required:n.basis==="drawing",placeholder:"Sheet and detail, or a note",value:n.note??"",onChange:r=>i("note",r.target.value)}))))}function Gy(n,e,t,i,r,s,o,a){let l=new Jo({antialias:!0,alpha:!0});l.shadowMap.enabled=!0,l.shadowMap.type=Br,l.shadowMap.autoUpdate=!1,l.shadowMap.needsUpdate=!0;try{let c=new In,h=new Et(37,1,.1,1e5),u=new _l(h,l.domElement);u.enableZoom=!o;let d=new Ii;c.add(d,new Ts(15988988,8951450,1.55));let f=new As(16774375,2.1);f.castShadow=!0,c.add(f,f.target);let g=e.map((re,xe)=>{let _e=$o(re,xe);if(_e.castShadow=!0,_e.receiveShadow=!0,_e.add(new ci(new Io(_e.geometry),new Ut({color:3754068,transparent:!0,opacity:.38}))),d.add(_e),re.program){let{floors:We,floor_height_m:rt}=re.program,L=[],D=Math.ceil(We/40);for(let K=D;K<We;K+=D)for(let Q of[re.footprint,...re.courtyards??[]])Q.forEach(([Se,pe],Te)=>{let[Qe,je]=Q[(Te+1)%Q.length];L.push(Se,K*rt,pe,Qe,K*rt,je)});let Z=new Ke().setAttribute("position",new tt(L,3));_e.add(new ci(Z,new Ut({color:3163998,transparent:!0,opacity:.45})))}return _e}),x=new Gt().setFromObject(d);for(let re of a?.buildings??[]){let xe=$o(re),_e=new ci(new Io(xe.geometry),new Ut({color:10105874,depthTest:!1,transparent:!0,opacity:.75}));_e.position.set(a.dx,0,a.dz),_e.renderOrder=2,d.add(_e),xe.geometry.dispose(),xe.material.forEach(We=>We.dispose())}a&&x.setFromObject(d);let m=x.getSize(new R),p=Math.max(m.x,m.y,m.z,3);h.near=p/1e4,h.far=p*40,h.updateProjectionMatrix();let T=x.getCenter(new R);f.position.copy(T).add(new R(-p*.7,p*1.35,p*.95)),f.target.position.copy(T),f.shadow.camera.left=f.shadow.camera.bottom=-p,f.shadow.camera.right=f.shadow.camera.top=p,f.shadow.camera.near=p*.1,f.shadow.camera.far=p*4,f.shadow.camera.updateProjectionMatrix(),f.shadow.mapSize.set(2048,2048),f.shadow.normalBias=p*7e-4,f.shadow.bias=-25e-5,f.shadow.radius=2.5,f.shadow.intensity=.68;let[S,_,C,M]=i.world,A=new R(S+C/2,0,_+M/2),E=p*.015,b=new gt(new sn(C,E,M),new en({color:10725798,roughness:.98}));b.position.copy(A).setY(-E/2-p*.001),c.add(b);let v=new gt(new Rn(C,M),new en({color:14080464,roughness:1}));v.rotation.x=-Math.PI/2,v.position.copy(A).setY(-p*5e-4),v.receiveShadow=!0,c.add(v);let P=new gt(new Rn(p*24,p*24),new ys({opacity:.22}));P.rotation.x=-Math.PI/2,P.position.copy(A).setY(-E-p*.002),P.receiveShadow=!0,c.add(P),l.setPixelRatio(Math.min(window.devicePixelRatio,2));let N=l.domElement;N.setAttribute("aria-label","Interactive 3D massing"),n.replaceChildren(N);let F=()=>l.render(c,h),z=!1,V=!1,q=!1,X=re=>{V=re,v.material.map=re&&q?W:null,v.material.needsUpdate=!0,F()},W=new Wo().load(t,re=>{if(z)return;let[xe,_e,We,rt]=i.crop;re.colorSpace=kt,re.offset.set(xe,1-rt),re.repeat.set(We-xe,rt-_e),re.anisotropy=Math.min(8,l.capabilities.getMaxAnisotropy()),q=!0,X(V),s("ready")},void 0,()=>{z||s("unavailable")}),Y=new Gt().setFromObject(b).union(x),oe=new R(-.74,1.23,-1.12).normalize(),Me=re=>{let xe=re.getCenter(new R);h.position.copy(xe).add(oe),h.lookAt(xe);let _e=h.quaternion.clone().invert(),We=Math.tan(Zi.degToRad(h.fov/2))*.89,rt=We*h.aspect,L=p*.035;for(let D of[re.min.x,re.max.x])for(let Z of[re.min.y,re.max.y])for(let K of[re.min.z,re.max.z]){let Q=new R(D,Z,K).sub(xe).applyQuaternion(_e);L=Math.max(L,Q.z+Math.abs(Q.x)/rt,Q.z+Math.abs(Q.y)/We)}h.position.copy(xe).addScaledVector(oe,L),u.target.copy(xe),u.update(),F()};u.maxDistance=p*12;let Ae=()=>{let re=Math.max(1,n.clientWidth),xe=Math.max(1,n.clientHeight);h.aspect=re/xe,h.updateProjectionMatrix(),l.setSize(re,xe)};Ae();let ue=new ResizeObserver(()=>{Ae(),F()});ue.observe(n),u.addEventListener("change",F);let He=new qo,Re,te=re=>{Re=re.button===0?[re.clientX,re.clientY]:null},ce=re=>{let xe=Re;if(Re=null,!xe||re.button!==0||Math.hypot(re.clientX-xe[0],re.clientY-xe[1])>5)return;let _e=N.getBoundingClientRect();He.setFromCamera({x:(re.clientX-_e.left)/_e.width*2-1,y:1-(re.clientY-_e.top)/_e.height*2},h),r(He.intersectObjects(g,!1)[0]?.object.userData.code??null)};return N.addEventListener("pointerdown",te),N.addEventListener("pointerup",ce),Me(Y),{showSource:X,reset:()=>Me(Y),zoom(re){h.position.sub(u.target).multiplyScalar(re).add(u.target),u.update(),F()},rotate(){h.position.sub(u.target).applyAxisAngle(h.up,Math.PI/8).add(u.target),u.update(),F()},focus(re){let xe=g.find(_e=>_e.userData.code===re);xe&&Me(new Gt().setFromObject(xe))},select(re){for(let xe of g){let _e=xe.userData.code===re;for(let We of xe.material)We.emissive.set(_e?5187347:0);xe.children[0].material.color.set(_e?9521184:3754068),xe.children[0].material.opacity=_e?1:.38}F()},dispose(){z=!0,ue.disconnect(),u.dispose(),N.removeEventListener("pointerdown",te),N.removeEventListener("pointerup",ce),c.traverse(re=>{re.geometry?.dispose(),Array.isArray(re.material)?re.material.forEach(xe=>xe.dispose()):re.material?.dispose()}),f.shadow.dispose(),W.dispose(),l.dispose(),l.forceContextLoss(),N.remove()}}}catch(c){throw l.dispose(),l.domElement.remove(),c}}var lh=n=>[n.footprint,...n.courtyards??[]].map(e=>"M"+e.join(" L")+" Z").join(" ");function Wy({buildings:n,sheet:e,placement:t,showSource:i,selected:r,onSelect:s,overlay:o,parcel:a,feasibleRegion:l}){let[c,h]=Ur(!1),[u,d]=Ur([]),[f,g,x,m]=t.source,[p,T,S,_]=t.world,C=t.world.join(" "),M=E=>{if(!c)return;let b=E.currentTarget.getScreenCTM();if(!b)return;let v=new DOMPoint(E.clientX,E.clientY).matrixTransform(b.inverse());v.x<p||v.x>p+S||v.y<T||v.y>T+_||d(P=>P.length===1?[...P,[v.x,v.y]]:[[v.x,v.y]])},A=u.length===2?Math.hypot(u[1][0]-u[0][0],u[1][1]-u[0][1]):null;return de.createElement(de.Fragment,null,de.createElement("div",{className:"sf-inline sf-plan-ruler"},de.createElement("button",{type:"button","aria-pressed":c,onClick:()=>h(E=>!E)},"Measure distance"),u.length>0&&de.createElement("button",{type:"button",onClick:()=>d([])},"Clear measurement"),de.createElement("output",{"aria-live":"polite"},A!==null?A.toFixed(2)+" m":c?u.length?"Select the end point.":"Select the start point.":"")),de.createElement("svg",{className:"sf-plan"+(c?" sf-measuring":""),role:"img","aria-label":"2D footprint plan",viewBox:C,onClick:M},i&&de.createElement("svg",{x:p,y:T,width:S,height:_,viewBox:C,overflow:"hidden"},de.createElement("image",{href:e.image,x:f,y:g,width:x,height:m,preserveAspectRatio:"none","data-testid":"plan-source-layer"})),a&&de.createElement("g",{pointerEvents:"none"},de.createElement("polygon",{points:a.boundary.join(" "),className:"sf-parcel",vectorEffect:"non-scaling-stroke"}),a.exclusions.map((E,b)=>de.createElement("polygon",{key:b,points:E.join(" "),className:"sf-exclusion",vectorEffect:"non-scaling-stroke"}))),l&&de.createElement("g",{pointerEvents:"none","aria-label":"Parcel buildable region"},l.polygons.map((E,b)=>de.createElement("path",{key:b,d:lh({footprint:E.boundary,courtyards:E.holes}),fillRule:"evenodd",fill:"#14b8a6",fillOpacity:".22",stroke:"#0f766e",strokeWidth:"2",strokeDasharray:"5 3",vectorEffect:"non-scaling-stroke"}))),n.map((E,b)=>de.createElement("path",{key:E.code,fillRule:"evenodd",fill:Nr[b%Nr.length],fillOpacity:r===E.code?".8":".48",stroke:r===E.code?i?"#a16207":"#fbbf24":i?"#1e3a5f":"#dbeafe",strokeWidth:r===E.code?"3":"1",vectorEffect:"non-scaling-stroke",d:lh(E),onClick:()=>{c||s(E.code)}},de.createElement("title",null,E.code))),o&&de.createElement("g",{transform:"translate("+o.dx+" "+o.dz+")",pointerEvents:"none"},o.buildings.map(E=>de.createElement("path",{key:E.code,d:lh(E),stroke:"#f97316",strokeWidth:"2",strokeDasharray:"6 4",fill:"none",vectorEffect:"non-scaling-stroke"}))),de.createElement("polyline",{points:u.join(" "),stroke:"#be123c",strokeWidth:"3",vectorEffect:"non-scaling-stroke",fill:"none"}),u.map(([E,b],v)=>de.createElement("circle",{key:v,cx:E,cy:b,r:S*.006,fill:"#be123c",stroke:"white",strokeWidth:"1",vectorEffect:"non-scaling-stroke"}))))}function Xy({item:n,draft:e,sheet:t}){let[i,r]=t.size,s=e.outline.map(([f,g])=>[f*i,g*r]),o=s.map(([f])=>f),a=s.map(([,f])=>f),l=Math.min(...o),c=Math.min(...a),h=Math.max(...o)-l,u=Math.max(...a)-c,d=Math.max(h,u)*.2;return de.createElement("details",{className:"sf-review"},de.createElement("summary",null,"Drawing evidence for ",n.code),de.createElement("svg",{className:"sf-evidence-crop",role:"img","aria-label":"Source outline for "+n.code,viewBox:[l-d,c-d,h+2*d,u+2*d].join(" ")},de.createElement("image",{href:t.image,width:i,height:r}),de.createElement("polygon",{points:s.join(" "),fill:"#f59e0b30",stroke:"#b45309",strokeWidth:"2",vectorEffect:"non-scaling-stroke"}),n.label_evidence&&(n.label_evidence.kind!=="height_table"||n.label_evidence.marker_bounds)&&(()=>{let[f,g,x,m]=n.label_evidence.marker_bounds??n.label_evidence.bounds;return de.createElement("rect",{x:f*i,y:g*r,width:(x-f)*i,height:(m-g)*r,stroke:"#be123c",fill:"none",strokeWidth:"2",vectorEffect:"non-scaling-stroke"})})()),n.label_evidence?.kind==="height_table"&&(()=>{let[f,g,x,m]=n.label_evidence.bounds,p=Math.max((m-g)*r*.75,2);return de.createElement("svg",{className:"sf-evidence-crop",role:"img","aria-label":"Height table evidence for "+n.code,viewBox:[f*i-p,g*r-p,(x-f)*i+2*p,(m-g)*r+2*p].join(" ")},de.createElement("image",{href:t.image,width:i,height:r}),de.createElement("rect",{x:f*i,y:g*r,width:(x-f)*i,height:(m-g)*r,stroke:"#be123c",fill:"none",strokeWidth:"2",vectorEffect:"non-scaling-stroke"}))})(),de.createElement("p",null,"Outline: ",n.method==="traced"?"operator trace":"verified PDF vectors",". Height: operator-confirmed input. Footprint and volume: calculated from the confirmed geometry."),n.label_evidence&&de.createElement("p",null,"Confirmed ",n.label_evidence.method==="ocr"?"OCR":"PDF text"," label \xB7 ",n.label_evidence.text))}function tr({scene:n,sheet:e,title:t="Project massing",compact:i=!1,focus:r=null,visible:s=!0,compare:o=null,actions:a,feasibleRegion:l=null,initialPlan:c=!1}){let h=Jm(null),u=Jm(null),[d,f]=Ur(c),[g,x]=Ur(!1),[m,p]=Ur(!0),[T,S]=Ur("loading"),[_,C]=Ur(null),M=d||g,A=Zm(()=>oh(e,n),[e,n]),E=Zm(()=>{if(!o)return null;let N=oh(e,o);return{buildings:o.buildings,dx:A.source[0]-N.source[0],dz:A.source[1]-N.source[1]}},[e,A,o]),b=n.buildings.find(N=>N.code===_),v=n.buildings.filter(N=>N.difference_pct>=1).length,P=i?"details":"div";return vl(()=>{if(!(M||!s)){S("loading");try{u.current=Gy(h.current,n.buildings,e.image,A,C,S,i,E)}catch{x(!0)}return()=>{u.current?.dispose(),u.current=null}}},[M,n,e,A,i,s,E]),vl(()=>{u.current?.showSource(m)},[M,m,n,A,s,E]),vl(()=>{u.current?.select(_)},[M,_,n,A,s,E]),vl(()=>{r&&n.buildings.some(N=>N.code===r.code)&&(C(r.code),u.current?.focus(r.code))},[r,n]),de.createElement("section",{className:"sf-card sf-results"},de.createElement("div",{className:"sf-bar"},de.createElement("div",null,de.createElement("p",{className:"sf-kicker"},i?"SiteForm / 3D preview":"04 / Saved model"),de.createElement("h2",null,t)),de.createElement("div",{className:"sf-inline"},de.createElement("button",{"aria-pressed":m,onClick:()=>p(!m),disabled:!M&&T==="unavailable"},"Source sheet"),de.createElement("button",{onClick:()=>f(!d),disabled:g},d?"View 3D":"View plan"),!M&&de.createElement("button",{onClick:()=>u.current?.reset()},"Reset camera"))),de.createElement("div",{className:"sf-model-summary"},de.createElement("span",null,de.createElement("strong",null,n.buildings.length)," confirmed buildings"),de.createElement("span",null,v?de.createElement("strong",{className:"sf-flag"},v," to review"):"No area flags"),de.createElement("span",null,m?"Source layer on":"Source layer off"),de.createElement("span",null,"Revision ",n.revision.slice(0,8)),E&&de.createElement("span",null,"Orange outline \xB7 comparison model")),n.site_metrics&&de.createElement("details",{className:"sf-review"},de.createElement("summary",null,"Parcel and floor quantities"),Object.entries({"Parcel area (m\xB2)":n.site_metrics.parcel_area_m2,"Union footprint (m\xB2)":n.site_metrics.union_footprint_m2,"Gross floor area estimate (m\xB2)":n.site_metrics.gross_floor_area_m2,"Parcel coverage (%)":n.site_metrics.coverage_pct,"Floor area ratio":n.site_metrics.far}).map(([N,F])=>de.createElement("p",{key:N},N," \xB7 ",F==null?"Unknown":F.toLocaleString(void 0,{maximumFractionDigits:3}))),n.parcel&&de.createElement("p",null,"Boundary reference \xB7 ",n.parcel.reference),de.createElement("p",{className:"sf-caption"},"Coverage uses the union inside the parcel. Floor area uses confirmed counts and full floor plates.")),n.calibration_check&&de.createElement("p",{className:n.calibration_check.review?"sf-flag":"sf-caption"},"Independent scale check \xB7 ",n.calibration_check.calculated_m," m measured vs ",n.calibration_check.expected_m," m known"," \xB7 ",n.calibration_check.difference_pct,"% difference",n.calibration_check.review&&" \xB7 Review the scale"),l&&M&&de.createElement("p",{className:"sf-caption"},"Teal region \xB7 ",l.area_m2.toLocaleString()," m\xB2 after parcel setback and exclusions. Building clearances are checked for each tested position."),M?de.createElement(Wy,{buildings:n.buildings,sheet:e,placement:A,showSource:m,selected:_,onSelect:C,overlay:E,parcel:n.parcel,feasibleRegion:l}):de.createElement("div",{ref:h,className:"sf-viewport","data-source-state":T}),i&&!M&&de.createElement("div",{className:"sf-inline sf-chat-camera"},de.createElement("button",{onClick:()=>u.current?.rotate()},"Rotate view"),de.createElement("button",{onClick:()=>u.current?.zoom(.8)},"Zoom in"),de.createElement("button",{onClick:()=>u.current?.zoom(1.25)},"Zoom out")),de.createElement("p",null,g?"3D is unavailable on this device. Showing the measured 2D plan.":d?"Select a footprint or building ID to inspect it.":i?"Select a building \xB7 Drag to orbit \xB7 Right-drag to pan":"Select a building \xB7 Drag to orbit \xB7 Scroll to zoom \xB7 Right-drag to pan"),!M&&m&&T==="unavailable"&&de.createElement("p",{role:"status"},"The source image could not load."),b&&de.createElement("div",{className:"sf-inspect","aria-label":"Selected building"},de.createElement("div",null,de.createElement("strong",null,b.code)," \xB7 ",b.height_m," m high \xB7 ",b.area_m2.toFixed(2)," m\xB2",b.program&&de.createElement("span",null," \xB7 ",b.program.floors," floors",b.program.use&&" \xB7 "+b.program.use),b.roof&&de.createElement("span",null," \xB7 ",ah[b.roof.kind]," \xB7 ",b.roof.basis==="illustrative"?"Illustrative":"Entered from drawing",b.roof.note&&" \xB7 "+b.roof.note),b.difference_pct>=1&&de.createElement("strong",{className:"sf-flag"}," \xB7 ",b.difference_pct.toFixed(2),"% area difference")),de.createElement("div",{className:"sf-inline"},!M&&de.createElement("button",{onClick:()=>u.current?.focus(b.code)},"Focus building"),de.createElement("button",{onClick:()=>C(null)},"Clear selection"),a?.(b))),b&&de.createElement(Xy,{key:b.code,item:b,draft:n.draft.buildings.find(N=>N.code===b.code),sheet:e}),de.createElement(P,{className:"sf-table"},i&&de.createElement("summary",null,"Building details"),de.createElement("table",{"aria-label":"Confirmed buildings"},de.createElement("thead",null,de.createElement("tr",null,de.createElement("th",null,"Building"),de.createElement("th",null,"Height"),de.createElement("th",null,"Footprint"),de.createElement("th",null,"Source"),de.createElement("th",null,"Roof"),de.createElement("th",null,"Area check"))),de.createElement("tbody",null,n.buildings.map((N,F)=>de.createElement("tr",{key:N.code,className:_===N.code?"sf-picked":void 0},de.createElement("th",null,de.createElement("button",{className:"sf-building-button","aria-pressed":_===N.code,onClick:()=>C(N.code)},de.createElement("i",{"aria-hidden":"true",style:{background:Nr[F%Nr.length]}}),N.code)),de.createElement("td",null,N.height_m," m"),de.createElement("td",null,N.area_m2.toFixed(2)," m\xB2"),de.createElement("td",null,N.method==="traced"?"Manually traced":"PDF vectors"),de.createElement("td",null,N.roof?ah[N.roof.kind]+(N.roof.basis==="illustrative"?" \xB7 Illustrative":""):"Flat massing"),de.createElement("td",null,N.difference_pct==null?"No reference":de.createElement(de.Fragment,null,N.difference_pct.toFixed(2),"% from ",N.printed_area_m2," m\xB2",N.difference_pct>=1&&de.createElement("strong",{className:"sf-flag"}," \xB7 Review")))))))),de.createElement("p",null,n.source.name," \xB7 Sheet ",n.source.page," \xB7 ",n.limits))}import ot,{useEffect as qy,useRef as Yy,useState as Qo}from"react";var hh=new Intl.NumberFormat(void 0,{maximumFractionDigits:4}),ch=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,signDisplay:"exceptZero"}),Zy=[["max_height_m","Maximum height (m)",1e3],["max_footprint_m2","Maximum footprint sum (m\xB2)"],["max_volume_m3","Maximum volume sum (m\xB3)"],["min_clearance_m","Minimum clearance (m)",1e3],["min_setback_m","Minimum parcel setback (m)",1e3],["max_coverage_pct","Maximum parcel coverage (%)",100],["max_far","Maximum floor area ratio",1e3]],Jy={height:["Height","m"],footprint:["Footprint sum","m\xB2"],volume:["Volume sum","m\xB3"],clearance:["Clearance","m"],printed_area:["Printed area difference","%"],coverage:["Parcel coverage","%"],far:["Floor area ratio",""],setback:["Parcel setback","m"],outside_parcel:["Footprint outside parcel","m\xB2"],exclusion:["Footprint in exclusion","m\xB2"]};function Km({changes:n,onInspect:e}){let t=n.some(i=>i.displacement_m!==void 0);return ot.createElement("details",{className:"sf-review"},ot.createElement("summary",null,"Building changes (",n.length,")"),n.length===0?ot.createElement("p",null,"No changes to building geometry or form."):ot.createElement("div",{className:"sf-table"},ot.createElement("table",{"aria-label":"Building changes"},ot.createElement("thead",null,ot.createElement("tr",null,ot.createElement("th",{scope:"col"},"Building"),ot.createElement("th",{scope:"col"},"Changed"),ot.createElement("th",{scope:"col"},"\u0394 Height (m)"),ot.createElement("th",{scope:"col"},"\u0394 Footprint (m\xB2)"),ot.createElement("th",{scope:"col"},"\u0394 Volume (m\xB3)"),t&&ot.createElement("th",{scope:"col"},"Movement (m)"))),ot.createElement("tbody",null,n.map(i=>ot.createElement("tr",{key:i.code},ot.createElement("th",{scope:"row"},ot.createElement("button",{type:"button",onClick:()=>e(i)},i.code)),ot.createElement("td",null,i.status==="changed"?i.changed.join(", "):i.status),ot.createElement("td",null,i.status==="changed"?ch.format(i.height_delta_m):"\u2014"),ot.createElement("td",null,ch.format(i.footprint_delta_m2)),ot.createElement("td",null,ch.format(i.volume_delta_m3)),t&&ot.createElement("td",null,hh.format(i.displacement_m??0))))))))}function bl({ctx:n,model:e,initialReport:t=null,initialError:i="",onInspect:r,openRequest:s=0}){let[o,a]=Qo(()=>t?.limits??{}),[l,c]=Qo(t),[h,u]=Qo(i),[d,f]=Qo(!!(t||i)),[g,x]=Qo(!1),m=Yy(null);qy(()=>{s&&(f(!0),m.current?.scrollIntoView({block:"center",behavior:"smooth"}))},[s]);let{scene:p,id:T}=e,S="/documents/"+p.source.sha256+"/"+p.source.page,_=async()=>{x(!0),u("");try{await er(n,S+"/report",{reference:T,revision:p.revision,limits:l?.limits??{}})}catch(M){u(M.message||"Could not prepare this report.")}finally{x(!1)}};return ot.createElement("details",{ref:m,className:"sf-review",open:d,onToggle:M=>f(M.currentTarget.open)},ot.createElement("summary",null,"Check design limits"),ot.createElement("p",{className:"sf-caption"},"Leave unused limits blank. SiteForm always checks printed footprint areas."),ot.createElement("form",{onSubmit:async M=>{if(M.preventDefault(),g)return;x(!0),u(""),c(null);let A=Object.fromEntries(Object.entries(o).filter(([,E])=>E!=="").map(([E,b])=>[E,Number(b)]));try{c(await n.rest(S+"/review",{method:"POST",body:{reference:T,revision:p.revision,limits:A},timeoutMs:3e4}))}catch(E){u(E.message||"Could not check this model.")}finally{x(!1)}},"aria-label":"Concept limits"},ot.createElement("div",{className:"sf-review-fields"},Zy.map(([M,A,E])=>ot.createElement("label",{key:M},A,ot.createElement("input",{type:"number",step:"any",min:"0",max:E,disabled:g,value:o[M]??"",onChange:b=>{let v=b.target.value;a(P=>({...P,[M]:v})),c(null)}})))),ot.createElement("button",{type:"submit",disabled:g},g?"Checking\u2026":"Run checks"),ot.createElement("button",{type:"button",disabled:g,onClick:_},l?"Download report with these checks":"Download decision report")),h&&ot.createElement("p",{role:"alert",className:"sf-flag"},h),l&&ot.createElement(ot.Fragment,null,ot.createElement("p",{role:"status"},l.finding_count?l.finding_count+" findings for "+e.name:"No findings in evaluated checks for "+e.name),l.unavailable?.map(M=>ot.createElement("p",{key:M,className:"sf-flag"},M)),l.finding_count>0&&ot.createElement("ul",{className:"sf-findings","aria-label":"Review findings"},l.findings.map(({kind:M,buildings:A,actual:E,limit:b})=>{let[v,P]=Jy[M];return ot.createElement("li",{key:M+JSON.stringify(A)},v," ",ot.createElement("strong",null,hh.format(E)," ",P)," \xB7 limit ",hh.format(b)," ",P,A.map(N=>ot.createElement("button",{type:"button",key:N,onClick:()=>r(N),"aria-label":"Inspect "+N},N)))})),l.finding_count>l.findings.length&&ot.createElement("p",null,"Showing the first ",l.findings.length," findings."),ot.createElement("p",{className:"sf-caption"},l.scope)))}import De,{useEffect as Ky,useState as ir}from"react";var cn=new Intl.NumberFormat(void 0,{maximumFractionDigits:2}),jy=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,signDisplay:"exceptZero"}),$y={roof_rise:"Height at or below roof rise",floor_fit:"Confirmed floors would not fit",height_cap:"Above height cap",volume_cap:"Above volume cap",unchanged:"Same as baseline",feasible:"Feasible"};function Qy({study:n,codes:e}){return De.createElement("details",{className:"sf-review"},De.createElement("summary",null,"All tested combinations (",n.tested,")"),De.createElement("div",{className:"sf-table sf-study-trace"},De.createElement("table",{"aria-label":"Tested height combinations"},De.createElement("thead",null,De.createElement("tr",null,e.map(t=>De.createElement("th",{scope:"col",key:t},t," (m)")),De.createElement("th",{scope:"col"},"Peak (m)"),De.createElement("th",{scope:"col"},"Volume (m\xB3)"),De.createElement("th",{scope:"col"},"Outcome"))),De.createElement("tbody",null,n.trace.map((t,i)=>De.createElement("tr",{key:i},e.map(r=>De.createElement("td",{key:r},cn.format(t.heights_m[r]))),De.createElement("td",null,cn.format(t.peak_m)),De.createElement("td",null,t.volume_m3===null?"\u2014":cn.format(t.volume_m3)),De.createElement("td",null,$y[t.outcome])))))))}function Ml({ctx:n,path:e,study:t,visible:i=!0}){let[r,s]=ir(t.candidates[0]?.rank??0),[o,a]=ir(null),[l,c]=ir(""),[h,u]=ir(0),[d,f]=ir(""),[g,x]=ir(!1),[m,p]=ir(""),[T,S]=ir(""),_=Object.keys(t.ranges_m);Ky(()=>{let E=!0;return c(""),n.rest(e+"/preview/"+r,{timeoutMs:3e4}).then(b=>{E&&a({rank:r,data:b})}).catch(b=>{E&&c(b.message||"Could not load the study model.")}),()=>{E=!1}},[n,e,r,h]);let C=E=>{s(E),p(""),S("")},M=async E=>{if(E.preventDefault(),!(g||r===0||o?.rank!==r||!d.trim())){x(!0),p(""),S("");try{let b=await n.rest(e+"/save",{method:"POST",body:{rank:r,name:d},timeoutMs:3e4});p("Saved "+b.name+"."),f("")}catch(b){S(b.message||"Could not save this candidate.")}finally{x(!1)}}},A=o?.rank===r?o.data:null;return De.createElement(De.Fragment,null,De.createElement("section",{className:"sf-card sf-chat-tools","aria-label":"Height study results"},De.createElement("p",{className:"sf-kicker"},"SiteForm / Design exploration"),De.createElement("h2",null,"Height study"),De.createElement("p",null,"Base \xB7 ",De.createElement("strong",null,t.baseline.name)," \xB7 ",t.source.name,", sheet ",t.source.page),De.createElement("div",{className:"sf-model-summary"},De.createElement("span",null,De.createElement("strong",null,t.tested)," combinations tested"),De.createElement("span",null,De.createElement("strong",null,t.feasible)," feasible changes"),t.caps.max_height_m!==void 0&&De.createElement("span",null,"Height cap ",cn.format(t.caps.max_height_m)," m"),t.caps.max_volume_m3!==void 0&&De.createElement("span",null,"Volume cap ",cn.format(t.caps.max_volume_m3)," m\xB3")),De.createElement("p",{className:"sf-caption"},"Ranks favor ",t.objective==="lowest_peak"?"the lowest peak height":t.objective==="least_height_change"?"the smallest total height change":"retained enclosed volume",". Footprints, roofs and confirmed floor counts stay fixed."),t.candidates.length?De.createElement("div",{className:"sf-table"},De.createElement("table",{"aria-label":"Ranked height candidates"},De.createElement("thead",null,De.createElement("tr",null,De.createElement("th",{scope:"col"},"Model"),_.map(E=>De.createElement("th",{scope:"col",key:E},E," (m)")),De.createElement("th",{scope:"col"},"Peak (m)"),De.createElement("th",{scope:"col"},"Volume (m\xB3)"),De.createElement("th",{scope:"col"},"\u0394 Volume (m\xB3)"))),De.createElement("tbody",null,De.createElement("tr",{className:r===0?"sf-picked":void 0},De.createElement("th",{scope:"row"},De.createElement("button",{type:"button","aria-pressed":r===0,disabled:g,onClick:()=>C(0)},"Preview baseline")),_.map(E=>De.createElement("td",{key:E},"\u2014")),De.createElement("td",null,cn.format(t.baseline.metrics.max_height_m)),De.createElement("td",null,cn.format(t.baseline.metrics.volume_m3)),De.createElement("td",null,"\u2014")),t.candidates.map(E=>De.createElement("tr",{key:E.rank,className:r===E.rank?"sf-picked":void 0},De.createElement("th",{scope:"row"},De.createElement("button",{type:"button","aria-pressed":r===E.rank,disabled:g,onClick:()=>C(E.rank)},"Preview candidate ",E.rank)),_.map(b=>De.createElement("td",{key:b},cn.format(E.heights_m[b]))),De.createElement("td",null,cn.format(E.peak_m)),De.createElement("td",null,cn.format(E.volume_m3)),De.createElement("td",null,jy.format(E.volume_delta_m3))))))):De.createElement("p",{role:"status"},"No changed design passed the caps in these ranges."),t.fixed_height_blockers.length>0&&De.createElement("p",{className:"sf-flag"},"Fixed buildings above the height cap \xB7 ",t.fixed_height_blockers.join(", ")),De.createElement(Qy,{study:t,codes:_}),r>0&&De.createElement("form",{className:"sf-option-save sf-study-save",onSubmit:M},De.createElement("label",null,"Option name",De.createElement("input",{value:d,maxLength:48,disabled:g,onChange:E=>f(E.target.value)})),De.createElement("button",{type:"submit",disabled:g||!A||!d.trim()},"Save candidate ",r)),m&&De.createElement("p",{role:"status"},m),T&&De.createElement("p",{role:"alert",className:"sf-flag"},T)),l?De.createElement("div",{className:"sf-card"},De.createElement("p",{role:"alert"},l),De.createElement("button",{type:"button",onClick:()=>u(E=>E+1)},"Retry model preview")):A?De.createElement(tr,{key:r,scene:A.scene,sheet:A.sheet,title:A.name,visible:i,compact:!0}):De.createElement("p",{role:"status"},"Loading study model\u2026"))}import ve,{useEffect as ev,useState as hi}from"react";var Fr=n=>n.toLocaleString(void 0,{maximumFractionDigits:3}),jm={outside_parcel:"Outside parcel",setback:"Parcel setback",exclusion:"Exclusion zone",clearance:"Building clearance",overlap:"Building overlap"};function uh({ctx:n,study:e,visible:t=!0,onSaved:i}){let[r,s]=hi(0),[o,a]=hi({}),[l,c]=hi(""),[h,u]=hi(!1),[d,f]=hi(""),[g,x]=hi(0),[m,p]=hi(""),T="/position-studies/"+e.id,S=o[r],_=M=>{s(M),p(""),f("")};ev(()=>{if(o[r])return;let M=!0;return f(""),n.rest(T+"/preview/"+r,{timeoutMs:45e3}).then(A=>{M&&a(E=>({...E,[r]:A}))}).catch(A=>{M&&f(A.message)}),()=>{M=!1}},[n,T,r,o,g]);let C=async M=>{if(M.preventDefault(),!(h||!S||r===0||!l.trim())){u(!0),f(""),p("");try{let A=await n.rest(T+"/save",{method:"POST",body:{rank:r,name:l},timeoutMs:45e3});p("Saved "+A.name+"."),c(""),i?.(A)}catch(A){f(A.message)}finally{u(!1)}}};return ve.createElement("section",{className:"sf-card sf-position-study","aria-label":"Position study results"},ve.createElement("h2",null,"Building positions"),ve.createElement("p",null,e.request.code," \xB7 ",e.baseline.name," \xB7 ",e.source.name,", sheet ",e.source.page),ve.createElement("div",{className:"sf-model-summary"},ve.createElement("span",null,ve.createElement("strong",null,e.tested)," positions tested"),ve.createElement("span",null,ve.createElement("strong",null,e.feasible)," feasible changes"),ve.createElement("span",null,"Setback ",Fr(e.request.setback_m)," m"),ve.createElement("span",null,"Clearance ",Fr(e.request.clearance_m)," m")),ve.createElement("p",{className:"sf-caption"},"Offsets are measured from the saved baseline. Positive X follows sheet right, positive Y follows sheet down. Candidates rank by least movement within the tested grid."),e.baseline_findings.length>0&&ve.createElement("p",{className:"sf-flag"},"Baseline findings \xB7 ",e.baseline_findings.map(M=>jm[M.kind]+" ("+M.buildings.join(", ")+")").join(" \xB7 ")),ve.createElement("div",{className:"sf-table"},ve.createElement("table",{"aria-label":"Ranked position candidates"},ve.createElement("thead",null,ve.createElement("tr",null,ve.createElement("th",{scope:"col"},"Model"),ve.createElement("th",{scope:"col"},"X offset (m)"),ve.createElement("th",{scope:"col"},"Y offset (m)"),ve.createElement("th",{scope:"col"},"Movement (m)"))),ve.createElement("tbody",null,ve.createElement("tr",null,ve.createElement("th",{scope:"row"},ve.createElement("button",{type:"button","aria-pressed":r===0,disabled:h,onClick:()=>_(0)},"Preview baseline")),ve.createElement("td",null,"0"),ve.createElement("td",null,"0"),ve.createElement("td",null,"0")),e.candidates.map(M=>ve.createElement("tr",{key:M.rank},ve.createElement("th",{scope:"row"},ve.createElement("button",{type:"button","aria-pressed":r===M.rank,disabled:h,onClick:()=>_(M.rank)},"Preview position ",M.rank)),ve.createElement("td",null,Fr(M.dx_m)),ve.createElement("td",null,Fr(M.dy_m)),ve.createElement("td",null,Fr(M.movement_m))))))),e.feasible===0&&ve.createElement("p",{role:"status"},"No changed position passed all constraints in this grid."),ve.createElement("details",{className:"sf-review"},ve.createElement("summary",null,"All tested positions (",e.tested,")"),ve.createElement("div",{className:"sf-table sf-study-trace"},ve.createElement("table",{"aria-label":"Tested positions"},ve.createElement("thead",null,ve.createElement("tr",null,ve.createElement("th",{scope:"col"},"X (m)"),ve.createElement("th",{scope:"col"},"Y (m)"),ve.createElement("th",{scope:"col"},"Outcome"),ve.createElement("th",{scope:"col"},"Findings"))),ve.createElement("tbody",null,e.trace.map((M,A)=>ve.createElement("tr",{key:A},ve.createElement("td",null,Fr(M.dx_m)),ve.createElement("td",null,Fr(M.dy_m)),ve.createElement("td",null,M.outcome),ve.createElement("td",null,M.findings.map(E=>jm[E.kind]+" \xB7 "+E.buildings.join(", ")).join(" / ")||"\u2014"))))))),r>0&&ve.createElement("form",{className:"sf-option-save",onSubmit:C},ve.createElement("label",null,"Position option name",ve.createElement("input",{"aria-label":"Position option name",maxLength:48,value:l,disabled:h,onChange:M=>c(M.target.value)})),ve.createElement("button",{type:"submit",disabled:h||!S||!l.trim()},"Save position ",r)),m&&ve.createElement("p",{role:"status"},m),d&&ve.createElement("div",null,ve.createElement("p",{role:"alert",className:"sf-flag"},d),!S&&ve.createElement("button",{type:"button",onClick:()=>x(M=>M+1)},"Retry position preview")),S?ve.createElement(tr,{key:r,scene:S.scene,sheet:S.sheet,title:S.name,visible:t,compare:r>0?o[0]?.scene:null,compact:!0,feasibleRegion:e.envelope,initialPlan:!0}):!d&&ve.createElement("p",{role:"status"},"Loading position preview\u2026"))}function $m({ctx:n,endpoint:e,model:t,onSaved:i}){let[r,s]=hi({min_m:-4,max_m:4,step_m:1}),[o,a]=hi({min_m:-4,max_m:4,step_m:1}),[l,c]=hi(""),[h,u]=hi(""),[d,f]=hi(t.scene.buildings[0].code),[g,x]=hi(null),[m,p]=hi(null),[T,S]=hi(!1),[_,C]=hi(""),M=async v=>{S(!0),C("");try{await v()}catch(P){C(P.message)}finally{S(!1)}},A=v=>{v.preventDefault(),M(async()=>x(await n.rest(e+"/position-studies",{method:"POST",timeoutMs:6e4,body:{base:t.id,code:d,dx:r,dy:o,setback_m:Number(l),clearance_m:Number(h)}})))},E=(v,P,N)=>ve.createElement("fieldset",{className:"sf-position-axis"},ve.createElement("legend",null,v," offset (m)"),["min_m","max_m","step_m"].map(F=>ve.createElement("label",{key:F},F==="min_m"?"Minimum":F==="max_m"?"Maximum":"Step",ve.createElement("input",{"aria-label":v+" "+F,type:"number",step:".01",required:!0,min:F==="step_m"?".01":"-1000",max:"1000",value:P[F],onChange:z=>N({...P,[F]:z.target.value})})))),b=t.id!=="working"&&t.scene.parcel;return ve.createElement("details",{className:"sf-position-explorer"},ve.createElement("summary",null,"Explore building positions"),ve.createElement("p",null,"Test one building on an explicit grid against a confirmed parcel and supplied limits."),!t.scene.parcel&&ve.createElement("p",null,"Trace and confirm a parcel boundary in the drawing editor, then build and save a baseline option."),t.id==="working"&&ve.createElement("p",null,"Save the working model as an option and select it before starting a position study."),ve.createElement("form",{onSubmit:A},ve.createElement("fieldset",{disabled:!b||T,className:"sf-editor-fields"},ve.createElement("label",null,"Building to move",ve.createElement("select",{value:d,onChange:v=>f(v.target.value)},t.scene.buildings.map(v=>ve.createElement("option",{key:v.code,value:v.code},v.code)))),ve.createElement("div",{className:"sf-fields"},ve.createElement("label",null,"Parcel setback (m)",ve.createElement("input",{type:"number",step:"any",min:"0",max:"1000",required:!0,value:l,onChange:v=>c(v.target.value)})),ve.createElement("label",null,"Building clearance (m)",ve.createElement("input",{type:"number",step:"any",min:"0",max:"1000",required:!0,value:h,onChange:v=>u(v.target.value)}))),ve.createElement("div",{className:"sf-fields"},E("X",r,s),E("Y",o,a)),ve.createElement("p",{className:"sf-caption"},"Each axis accepts 1\u20139 positions. The step must reach its maximum exactly. Limits are supplied project assumptions."),ve.createElement("button",{type:"submit"},"Find feasible positions"))),ve.createElement("button",{type:"button",disabled:T,onClick:()=>M(async()=>p(await n.rest(e+"/position-studies")))},"Open position study library"),m&&ve.createElement("div",null,m.length===0&&ve.createElement("p",null,"No saved position studies for this sheet."),m.map(v=>ve.createElement("div",{className:"sf-inline",key:v.id},ve.createElement("span",null,v.baseline.name," \xB7 ",v.request.code," \xB7 ",v.feasible,"/",v.tested," feasible"),ve.createElement("button",{type:"button",disabled:T,onClick:()=>M(async()=>x(await n.rest("/position-studies/"+v.id)))},"Open position study")))),T&&ve.createElement("p",{role:"status"},"Evaluating positions\u2026"),_&&ve.createElement("p",{className:"sf-flag",role:"alert"},_),g&&ve.createElement(uh,{key:g.id,ctx:n,study:g,onSaved:i}))}var dh=new Intl.NumberFormat(void 0,{maximumFractionDigits:2});function eg({ctx:n,endpoint:e,working:t,sheet:i,onCopy:r,handoff:s=null}){let o=e+"/variants",[a,l]=Gi([]),[c,h]=Gi(null),[u,d]=Gi(""),[f,g]=Gi(!1),[x,m]=Gi(!0),[p,T]=Gi(""),[S,_]=Gi(""),[C,M]=Gi(null),[A,E]=Gi(null),[b,v]=Gi(null),[P,N]=Gi(!!s),[F,z]=Gi(""),V=Qm(null),q=Qm(null);fh(()=>{if(!s){N(!1),z("");return}let ue=!0;return N(!0),z(""),(s.option==="working"?Promise.resolve({id:"working",name:"Working model",scene:t}):n.rest(o+"/"+s.option)).then(Re=>{if(ue){if(Re.scene.revision!==s.revision)throw new Error("This model changed since the chat. Reopen its latest version from chat.");if(s.building&&!Re.scene.buildings.some(te=>te.code===s.building))throw new Error("The selected building does not belong to this option.");h(Re.id==="working"?null:Re),M(s.building?{code:s.building}:null),T("Opened the exact model from chat: "+Re.name+".")}}).catch(Re=>{ue&&z(Re.message)}).finally(()=>{ue&&N(!1)}),()=>{ue=!1}},[n,o,s,t.revision]),fh(()=>{if(!s||P||F)return;let ue=requestAnimationFrame(()=>q.current?.scrollIntoView({block:"start"}));return()=>cancelAnimationFrame(ue)},[s,P,F,c?.id]),fh(()=>{let ue=!0;return n.rest(o).then(He=>{ue&&l(He)}).catch(He=>{ue&&_(He.message)}).finally(()=>{ue&&m(!1)}),()=>{ue=!1}},[n,o]);let X=async ue=>{g(!0),_(""),T("");try{await ue()}catch(He){_(He.message)}finally{g(!1)}},W=ue=>{ue.preventDefault(),!(f||!u.trim())&&X(async()=>{let He=await n.rest(o,{method:"POST",body:{name:u,revision:t.revision}});l(Re=>[He,...Re.filter(te=>te.id!==He.id)]),d(""),T("Saved option "+He.name+".")})},Y=ue=>{if(z(""),M(null),!ue){h(null);return}X(async()=>h(await n.rest(o+"/"+ue)))},oe=c?.scene??t,Me=[{id:"working",name:"Working model",metrics:t.metrics},...a],Ae=c?.id??"working";return P||F?Ne.createElement("section",{className:"sf-card",ref:V},P?Ne.createElement("p",{role:"status"},"Opening the model from chat\u2026"):Ne.createElement(Ne.Fragment,null,Ne.createElement("p",{role:"alert"},F),Ne.createElement("button",{onClick:()=>{z(""),h(null),M(null)}},"Browse this sheet instead"))):Ne.createElement(Ne.Fragment,null,Ne.createElement("section",{className:"sf-card sf-variants",ref:V},Ne.createElement("div",{className:"sf-bar"},Ne.createElement("div",null,Ne.createElement("p",{className:"sf-kicker"},"03 / Design options"),Ne.createElement("h2",null,"Compare and export")),Ne.createElement("div",{className:"sf-inline"},Ne.createElement("button",{disabled:f||x,onClick:()=>X(async()=>{l(await n.rest(o)),T("Options refreshed from Hermes.")})},"Refresh options"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>{let ue=await Ns(n,oe,"gltf");ue&&T("Saved "+ue)})},"Export glTF"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>{let ue=await Ns(n,oe,"json");ue&&T("Saved "+ue)})},"Export evidence JSON"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>{let ue=await Ns(n,oe,"csv");ue&&T("Saved "+ue)})},"Export building CSV"),Ne.createElement("button",{disabled:f,onClick:()=>X(()=>er(n,e+"/archive"))},"Download project ZIP"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>E(await n.rest(e+"/studies")))},"Browse height studies"))),Ne.createElement("div",{className:"sf-option-controls"},Ne.createElement("form",{className:"sf-option-save",onSubmit:W},Ne.createElement("label",null,"Option name",Ne.createElement("input",{value:u,maxLength:48,placeholder:"e.g. Gable proposal",onChange:ue=>d(ue.target.value)})),Ne.createElement("button",{type:"submit",disabled:f||x||!u.trim()},"Save working model as option")),Ne.createElement("label",null,"View model",Ne.createElement("select",{"aria-label":"View model",disabled:f,value:c?.id??"",onChange:ue=>Y(ue.target.value)},Ne.createElement("option",{value:""},"Working model"),a.map(ue=>Ne.createElement("option",{value:ue.id,key:ue.id},ue.name)))),c&&Ne.createElement("button",{disabled:f,onClick:()=>r(c.scene.draft)},"Copy option into editor")),Ne.createElement("div",{className:"sf-table"},Ne.createElement("table",{"aria-label":"Option comparison"},Ne.createElement("thead",null,Ne.createElement("tr",null,Ne.createElement("th",null,"Model"),Ne.createElement("th",null,"Buildings"),Ne.createElement("th",null,"Footprint (m\xB2)"),Ne.createElement("th",null,"Highest point (m)"),Ne.createElement("th",null,"Volume (m\xB3)"),Ne.createElement("th",null,"Illustrative roofs"),Ne.createElement("th",null,"Area flags"))),Ne.createElement("tbody",null,Me.map(({id:ue,name:He,metrics:Re,origin:te})=>Ne.createElement("tr",{key:ue,className:Ae===ue?"sf-picked":void 0},Ne.createElement("th",null,He,te==="hermes_tool"&&Ne.createElement("span",{className:"sf-viewing"}," \xB7 Hermes tool"),Ae===ue&&Ne.createElement("span",{className:"sf-viewing"}," \xB7 Viewing")),Ne.createElement("td",null,Re.building_count),Ne.createElement("td",null,dh.format(Re.footprint_m2)),Ne.createElement("td",null,dh.format(Re.max_height_m)),Ne.createElement("td",null,dh.format(Re.volume_m3)),Ne.createElement("td",null,Re.illustrative_roofs),Ne.createElement("td",null,Re.area_flags)))))),Ne.createElement("p",{className:"sf-caption"},"Footprints and volumes are summed per building. Options preserve a saved snapshot. Options created in chat appear here after refresh. Export uses the model you are viewing."),p&&Ne.createElement("p",{role:"status"},p),S&&Ne.createElement("p",{role:"alert",className:"sf-flag"},S),A&&Ne.createElement("details",{open:!0,className:"sf-review"},Ne.createElement("summary",null,"Height study library (",A.length,")"),A.length===0&&Ne.createElement("p",null,"No height studies for this sheet."),A.map(ue=>Ne.createElement("div",{key:ue.id,className:"sf-inline"},Ne.createElement("span",null,ue.baseline.name," \xB7 ",ue.feasible,"/",ue.tested," feasible ",ue.archived&&"\xB7 Archived"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>v(await n.rest("/height-studies/"+ue.id)))},"Open study"),Ne.createElement("button",{disabled:f,onClick:()=>X(async()=>{await n.rest("/height-studies/"+ue.id+"/archived?archived="+!ue.archived,{method:"PUT"}),E(await n.rest(e+"/studies"))})},ue.archived?"Restore study":"Archive study")))),Ne.createElement(bl,{key:Ae+oe.revision,ctx:n,model:c??{id:"working",name:"Working model",scene:oe},onInspect:ue=>M({code:ue})}),Ne.createElement($m,{key:"position:"+Ae+oe.revision,ctx:n,endpoint:e,model:c??{id:"working",name:"Working model",scene:oe},onSaved:()=>{n.rest(o).then(l).catch(ue=>_(ue.message))}})),Ne.createElement("div",{ref:q},Ne.createElement(tr,{key:Ae,scene:oe,sheet:i,focus:C,title:c?.name??"Working model"})),b&&Ne.createElement("div",{className:"sf-card"},Ne.createElement("button",{onClick:()=>v(null)},"Close study"),Ne.createElement(Ml,{key:b.id,ctx:n,path:"/height-studies/"+b.id,study:b})))}var Us=`
.siteform .sf-source-access{display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin:10px 0;color:var(--sf-muted);font-size:12px}.siteform .sf-source-access button{min-height:36px;font-size:12px}.siteform .sf-source-access p{flex-basis:100%}
.siteform{--sf-bg:var(--ui-bg-chrome,#111827);--sf-card:var(--ui-bg-elevated,#1f2937);--sf-fg:var(--ui-text-primary,#f8fafc);--sf-muted:var(--ui-text-secondary,#cbd5e1);--sf-line:var(--ui-stroke-secondary,#475569);--sf-accent:var(--ui-accent,#38bdf8);color:var(--sf-fg);background:var(--sf-bg);min-height:100vh;padding:28px clamp(16px,3vw,48px) 40px;font:14px/1.5 system-ui,sans-serif}
.siteform *{box-sizing:border-box}.siteform :focus-visible{outline:2px solid var(--sf-accent);outline-offset:3px}.siteform h1{font-size:clamp(26px,4vw,39px);line-height:1.1;letter-spacing:-.035em;margin:6px 0 8px}.siteform h2{font-size:19px;line-height:1.15;margin:5px 0 10px}.siteform p{margin:5px 0 10px;color:var(--sf-muted)}.sf-header{margin:0 auto 20px;max-width:1480px}.siteform .sf-kicker{font-size:11px;letter-spacing:.13em;text-transform:uppercase;font-weight:700;color:var(--sf-muted)}
.sf-card{padding:16px;background:var(--sf-card);border:1px solid var(--sf-line);border-radius:13px;min-width:0}.sf-intake{display:flex;gap:12px;align-items:flex-end;flex-wrap:wrap;margin:0 auto 16px;max-width:1480px}.sf-intake label:nth-child(2){flex:1;min-width:180px}.sf-workspace{display:grid;grid-template-columns:minmax(0,2.25fr) minmax(245px,1fr);gap:14px;align-items:start;max-width:1480px;margin:auto}.sf-results{max-width:1480px;margin:16px auto 0}.sf-bar{display:flex;justify-content:space-between;align-items:center;gap:12px}.sf-inline,.sf-candidates{display:flex;gap:6px;flex-wrap:wrap;align-items:center}.sf-modes,.sf-candidates{margin-bottom:8px}.siteform button,.siteform input,.siteform select{color:inherit;font:inherit;border-radius:7px;border:1px solid var(--sf-line);background:var(--sf-bg);min-height:34px;padding:6px 9px}.siteform button{cursor:pointer;font-weight:600}.siteform button:hover,.siteform button[aria-pressed=true]{border-color:var(--sf-accent);background:color-mix(in srgb,var(--sf-accent) 13%,var(--sf-card))}.siteform button:disabled,.siteform input:disabled{opacity:.55;cursor:default}.siteform button.sf-primary{width:100%;margin-top:12px;background:var(--sf-accent);border-color:var(--sf-accent);color:var(--theme-background-seed,var(--sf-bg));min-height:42px}.siteform label{font-size:12px;color:var(--sf-muted);font-weight:600}.siteform label input,.siteform label select{display:block;width:100%;margin-top:4px}.siteform input[type=file]{max-width:270px}.siteform input[type=file]::file-selector-button{color:inherit;background:var(--sf-card);border:1px solid var(--sf-line);border-radius:5px;padding:3px 8px;cursor:pointer}.siteform input[type=range]{padding:0;min-height:18px;accent-color:var(--sf-accent)}
.sf-sheet-scroll{max-height:66vh;overflow:auto;border:1px solid var(--sf-line);border-radius:8px;background:#f8fafc}.sf-drawing{position:relative;cursor:crosshair}.sf-sheet-layer{position:absolute;left:50%;top:50%}.sf-drawing img{display:block;width:100%;height:100%;user-select:none;pointer-events:none}.sf-drawing svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}.sf-drawing polygon,.sf-drawing rect,.sf-drawing circle,.sf-drawing polyline{stroke-width:2;vector-effect:non-scaling-stroke}.sf-region,.sf-outline{fill:#009aff30;stroke:#008dff}.sf-confirmed{fill:#0ea57236;stroke:#047653}.sf-ruler{fill:none;stroke:#ec5000}.sf-point{fill:#ff7900;stroke:#fff}.siteform .sf-caption{font-size:12px;margin:8px 0}.sf-zoom{min-width:94px}.sf-rows{display:grid;gap:9px;margin-top:10px;max-height:48vh;overflow:auto}.sf-rows fieldset{min-width:0;border:1px solid var(--sf-line);border-radius:8px;margin:0;padding:9px}.sf-rows legend{font-size:11px;color:var(--sf-muted);padding:0 4px}.sf-rows button{margin-top:7px;font-size:11px;min-height:27px}.sf-fields{display:grid;grid-template-columns:1fr 1fr;gap:7px;margin-top:6px}.sf-flag{color:var(--ui-status-warning,#d97706)!important}.sf-viewport,.sf-plan{width:100%;height:clamp(300px,54vh,630px);background:#101b2a;border-radius:8px;overflow:hidden}.sf-viewport{background:radial-gradient(ellipse at 50% 22%,#f1f3ef 0%,#dce4e3 51%,#afbec0 100%)}.sf-viewport canvas{display:block;width:100%;height:100%}.sf-table{overflow:auto}.sf-table table{width:100%;text-align:left;border-collapse:collapse}.sf-table th,.sf-table td{padding:8px;border-bottom:1px solid var(--sf-line)}.siteform i{display:inline-block;width:9px;height:9px;border-radius:50%;margin-right:7px}
.sf-model-summary{display:flex;gap:8px;flex-wrap:wrap;margin:2px 0 11px;color:var(--sf-muted);font-size:12px}.sf-model-summary span{padding:4px 9px;border:1px solid var(--sf-line);border-radius:6px}.sf-inspect{display:flex;justify-content:space-between;align-items:center;gap:8px;flex-wrap:wrap;padding:10px;margin:10px 0;border:1px solid var(--sf-accent);border-radius:8px;background:color-mix(in srgb,var(--sf-accent) 7%,var(--sf-card))}.sf-inspect button,.siteform .sf-building-button{min-height:34px}.siteform .sf-building-button{border-color:transparent;background:transparent;text-align:left}.sf-picked{background:color-mix(in srgb,var(--sf-accent) 9%,var(--sf-card))}.sf-viewport canvas{cursor:grab}.sf-viewport canvas:active{cursor:grabbing}.sf-plan polygon{cursor:pointer}
.sf-roof-fields{display:grid;gap:6px;margin-top:8px}.sf-roof-fields .sf-caption{margin:0}.sf-variants{max-width:1480px;margin:16px auto 0}.sf-option-controls{display:flex;gap:10px;flex-wrap:wrap;align-items:end;margin:7px 0 12px}.sf-option-save{display:flex;gap:7px;flex-wrap:wrap;align-items:end}.sf-option-controls label{min-width:150px}.sf-viewing{font-size:11px;font-weight:500;color:var(--sf-muted)}
@media(max-width:880px){.sf-workspace{grid-template-columns:minmax(0,1fr)}.sf-rows{max-height:none}.sf-sheet-scroll{max-height:55vh}} 
.siteform.sf-chat-model{width:100%;min-height:0;background:transparent;padding:0;margin:12px 0;overflow-wrap:anywhere}
.sf-chat-model .sf-results{margin:0}.sf-chat-model .sf-bar{flex-wrap:wrap;align-items:flex-start}
.sf-chat-model .sf-viewport,.sf-chat-model .sf-plan,.sf-chat-placeholder{min-height:240px;height:clamp(240px,36vh,360px)}
.sf-chat-model .sf-inline{gap:8px}.sf-chat-model .sf-inline button{min-height:40px}
.sf-chat-camera{margin-top:10px}
.sf-chat-tools{margin-bottom:8px}.sf-chat-tools .sf-inline{align-items:flex-end}
.sf-chat-tools select{max-width:100%;min-height:40px}
.sf-chat-tools .sf-table th,.sf-chat-tools .sf-table td{padding:6px 8px}
.sf-chat-tools .sf-table td{font-variant-numeric:tabular-nums;text-align:right}
.sf-review{border-top:1px solid var(--sf-line);padding-top:10px;margin-top:12px}
.sf-review summary{width:fit-content;cursor:pointer;font-weight:650;margin-bottom:6px}
.sf-review-fields{display:grid;grid-template-columns:repeat(auto-fit,minmax(min(155px,100%),1fr));gap:8px;margin:8px 0}
.sf-review-fields label{min-width:0}
.sf-findings{display:grid;gap:5px;margin:8px 0;padding-left:20px}
.sf-findings button{margin-left:6px}
.sf-plan-ruler{margin-bottom:8px}.sf-plan-ruler output{font-variant-numeric:tabular-nums}
.sf-plan.sf-measuring,.sf-plan.sf-measuring polygon{cursor:crosshair}
.sf-study-trace{max-height:240px}.sf-study-save{margin-top:12px}
.sf-editor-fields{margin:0;padding:0;border:0;min-width:0}
.sf-ruler-check{display:grid;gap:6px;margin-top:10px}
.sf-ruler-detail{display:grid;justify-items:start;gap:8px;margin-top:12px;padding:10px;border:1px solid var(--sf-line);border-radius:8px}
.sf-ruler-detail .sf-caption{margin:0}
.siteform button.sf-ruler-crop{display:block;position:relative;width:100%;max-width:384px;padding:0;border:0;border-radius:0;cursor:crosshair;outline:1px solid var(--sf-line)}
.siteform button.sf-ruler-crop:focus-visible{outline:2px solid var(--sf-accent);outline-offset:2px}
.sf-ruler-crop img{display:block;width:100%;height:auto;user-select:none;pointer-events:none}
.sf-ruler-crop svg{position:absolute;inset:0;width:100%;height:100%;pointer-events:none}
.sf-ruler-crop circle,.sf-ruler-crop path{fill:none;stroke-width:1.5;vector-effect:non-scaling-stroke}
.sf-ruler-vertex{stroke:#008891}
.sf-ruler-crop path,.sf-ruler-marker{stroke:#e33c19}
.sf-calibration{display:grid;gap:3px;padding:8px 10px;border:1px solid var(--sf-line);border-radius:8px;font-size:12px}
.sf-quantity-section{max-width:1480px;margin:0 auto 16px}
.sf-quantity-section>summary{padding:12px 16px;border:1px solid var(--sf-line);border-radius:8px;cursor:pointer;font-weight:600}
.sf-quantity-section[open]>summary{margin-bottom:10px}
.sf-quantities small{display:block;font-size:11px;font-weight:400;color:var(--sf-muted);overflow-wrap:anywhere}
.sf-quantities input[type=checkbox]{width:18px;height:18px;min-height:18px;accent-color:var(--sf-accent)}
.sf-quantities .sf-option-controls{margin:12px 0}
.sf-quantities .sf-option-controls label{flex:1;min-width:140px}
.sf-quantities .sf-option-controls input[type=number]{max-width:100px}
.sf-quantity-evidence{margin:12px 0;padding:12px;background:var(--sf-bg);border:1px solid var(--sf-line);border-radius:8px}
.sf-quantity-evidence img{display:block;width:auto;max-width:100%;max-height:280px;object-fit:contain;background:white}
.sf-quantity-evidence figcaption{margin-top:8px;font-size:12px;overflow-wrap:anywhere}
.sf-quantity-calculation{padding:12px;margin:12px 0;border:1px solid var(--sf-accent);border-radius:8px}
.sf-quantity-calculation strong{font-size:20px}
.sf-manual-quantity{display:grid;gap:10px;border:1px solid var(--sf-line);border-radius:8px;padding:12px;margin-top:12px}
.sf-manual-quantity select{max-width:100%}
.sf-position-explorer{margin:16px 0}
.sf-position-explorer>summary{cursor:pointer;font-weight:600;padding:10px 0}
.sf-position-axis{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;border:1px solid var(--sf-line);border-radius:8px;margin:8px 0;padding:10px;min-width:0}
.sf-position-axis legend{font-size:12px;color:var(--sf-muted)}
.sf-position-study{margin-top:14px}
.sf-position-study>.sf-results{margin-top:12px}
.sf-evidence-crop{display:block;width:100%;height:180px;background:var(--sf-bg)}
.sf-chat-model .sf-results+.sf-chat-tools{margin-top:8px}
.sf-parcel{fill:none;stroke:#2563eb;stroke-width:2;stroke-dasharray:6 3}
.sf-exclusion{fill:#be123c30;stroke:#be123c;stroke-width:2}
.siteform label input[type=checkbox]{display:inline;width:auto;min-height:0;margin:0 6px 0 0}
.sf-plan path{cursor:pointer}
.sf-plan.sf-measuring path{cursor:crosshair}
.sf-check-ruler{fill:none;stroke:#2563eb;stroke-dasharray:5 3}
.sf-intake .sf-file{flex:0 1 auto;min-width:0}
.sf-intake .sf-library-choice{flex:1;min-width:180px}
.sf-quick-edit{margin-top:12px;background:var(--sf-bg)}
.sf-quick-edit form{display:grid;gap:12px;max-width:640px}
.sf-chat-tools>.sf-inline{flex-wrap:wrap;gap:8px}
`;import Ie,{useEffect as gh,useRef as mg,useState as pi}from"react";import{host as Di,TRANSCRIPT_DIRECTIVE_AREA as dg,useValue as ta}from"@hermes/plugin-sdk";import ge,{useEffect as tg,useRef as ig,useState as vi}from"react";import{host as ng}from"@hermes/plugin-sdk";var Fs={parcel_area:"Parcel area",footprint_area:"Footprint area",above_ground_area:"Above-ground floor area",basement_area:"Basement floor area",total_floor_area:"Total floor area",floor_area:"Floor group area",coverage:"Site coverage",far:"Floor area ratio",height:"Building height",floors:"Above-ground floors"},tv={coverage:"%",far:"ratio",height:"m",floors:"count"},Wi=n=>n.toLocaleString(void 0,{maximumFractionDigits:6});function Sl({ctx:n,documentId:e,page:t,reviewId:i,library:r,sessionId:s,ownsSession:o}){let[a,l]=vi(null),[c,h]=vi([]),[u,d]=vi(""),[f,g]=vi(""),[x,m]=vi(e??""),[p,T]=vi(1),[S,_]=vi("vi"),[C,M]=vi(r??[]),[A,E]=vi(""),[b,v]=vi(""),[P,N]=vi(!1),[F,z]=vi(null),V=ig(null),q=ig(null),[X,W]=vi(null),[Y,oe]=vi({row:0,quantity:"floor_area",value_text:"",subject:"project",basis:""}),Me=a?.primary??{document_id:e,page:t},Ae="/documents/"+Me.document_id+"/"+Me.page+"/quantities",ue=!o||o(),He=D=>{l(D),h(D?.confirmed??[]),d(D?.basis?.numerator_id??""),g(D?.basis?.denominator_id??""),z(null)};tg(()=>{F&&V.current?.scrollIntoView({block:"center"})},[F]),tg(()=>{let D=!0;E("");let Z=i?"/quantity-reviews/"+i:"/documents/"+e+"/"+t+"/quantities";return n.rest(Z).then(K=>{D&&He(K)}).catch(K=>{D&&E(K.message)}),r||n.rest("/documents").then(K=>{D&&M(K)}).catch(K=>{D&&E(K.message)}),()=>{D=!1}},[n,e,t,i,r]);let Re=async D=>{if(!(!ue||P)){N(!0),E(""),v("");try{await D()}catch(Z){E(Z.message)}finally{N(!1)}}},te=()=>Re(async()=>{He(await n.rest(Ae,{method:"POST",timeoutMs:6e4,body:{sources:[{document_id:x,page:p,locale:S}]}})),W(null),v("Source suggestions saved. Review each row before confirming.")}),ce=()=>Re(async()=>{let D=await n.rest("/quantity-reviews/"+a.id+"/confirm",{method:"POST",body:{fact_ids:c,numerator_id:u||null,denominator_id:f||null}});He(D),v("Confirmed quantities and counting basis saved."),requestAnimationFrame(()=>q.current?.scrollIntoView({block:"center"}))}),re=D=>Re(async()=>{z(await n.rest("/quantity-reviews/"+a.id+"/evidence/"+D.id))}),xe=()=>Re(async()=>{if(!s||!ng.composer?.insertText||!o?.()){E("Open this quantity review in its originating Hermes chat to request model interpretation.");return}let D="Use siteform_project_review to interpret the selected PDF text with the configured Hermes model. Treat extracted rows as suggestions and preserve their source evidence. "+JSON.stringify({document_id:Me.document_id,page:Me.page,sources:[{document_id:x||Me.document_id,page:p,locale:S}],use_model:!0});if(!await ng.composer.insertText(s,D,{mode:"block"}))throw new Error("Open the originating chat composer to continue.");v("Interpretation request added to this chat. Review and send it.")}),_e=()=>Re(async()=>{let D=X[Y.row],Z=await n.rest("/quantity-reviews/"+a.id+"/facts",{method:"POST",body:{quantity:Y.quantity,value_text:Y.value_text,unit:tv[Y.quantity]??"m2",subject:Y.subject,basis:Y.basis||"Reported quantity",evidence:{document_id:x,page:p,locale:S,bounds:D.bounds,quote:D.text}}});He(Z),W(null),v("Source-linked suggestion added. Confirm it when reviewed.")}),We=C.find(D=>D.id===x),rt=a?.facts.filter(D=>c.includes(D.id))??[],L=D=>D.kind==="source_conflict"?Fs[D.quantity]+" has competing source values.":D.kind==="far_comparison"?"Reported FAR "+Wi(D.reported)+" \xB7 calculated FAR "+Wi(D.calculated):Fs[D.quantity]+" \xB7 reported "+Wi(D.reported)+" \xB7 model estimate "+Wi(D.estimated)+" \xB7 difference "+Wi(D.difference);return ge.createElement("section",{className:"sf-card sf-quantities","aria-label":"Project quantity review"},ge.createElement("div",{className:"sf-bar"},ge.createElement("h2",null,"Project quantities"),a&&ge.createElement("button",{type:"button",disabled:P,onClick:()=>Re(async()=>{He(await n.rest(Ae)),v("Latest quantity review opened.")})},"Load latest review")),ge.createElement("p",null,"Compare reported quantities with the model estimate. Confirm the sources and floor-area basis you want to use."),ge.createElement("fieldset",{disabled:P||!ue,className:"sf-editor-fields"},ge.createElement("div",{className:"sf-option-controls"},ge.createElement("label",null,"Import supporting PDF",ge.createElement("input",{type:"file",accept:".pdf,application/pdf",onChange:D=>{let Z=D.target.files?.[0];D.target.value="",Z&&Re(async()=>{if(Z.size>30*1024*1024)throw new Error("Choose a PDF up to 30 MiB.");let K=await n.rest("/documents",{method:"POST",timeoutMs:6e4,upload:{filename:Z.name,contentType:"application/pdf",bytes:await Z.arrayBuffer()}});M(Q=>[K,...Q.filter(Se=>Se.id!==K.id)]),m(K.id),T(1),W(null)})}})),ge.createElement("label",null,"Supporting PDF",ge.createElement("select",{"aria-label":"Quantity source PDF",value:x,onChange:D=>{m(D.target.value),T(1),W(null)}},ge.createElement("option",{value:""},"Choose a source"),C.map(D=>ge.createElement("option",{key:D.id,value:D.id},D.name)))),ge.createElement("label",null,"Source page",ge.createElement("input",{"aria-label":"Quantity source page",type:"number",min:"1",max:We?.pages??30,value:p,onChange:D=>{T(Number(D.target.value)),W(null)}})),ge.createElement("label",null,"Number format",ge.createElement("select",{value:S,onChange:D=>{_(D.target.value),W(null)}},ge.createElement("option",{value:"vi"},"Vietnamese \xB7 2.950,5"),ge.createElement("option",{value:"en"},"English \xB7 2,950.5"))),ge.createElement("button",{type:"button",disabled:!x||!Me.document_id,onClick:te},"Read source quantities"),s&&ge.createElement("button",{type:"button",disabled:!x,onClick:xe},"Interpret with Hermes")),s&&ge.createElement("p",{className:"sf-caption"},"Hermes interpretation sends the selected page text to your configured model when you send the request."),a&&ge.createElement(ge.Fragment,null,ge.createElement("p",{className:"sf-caption"},"Review ",a.id.slice(0,8)," \xB7 ",a.sources.length," source pages or regions"),ge.createElement("div",{className:"sf-table"},ge.createElement("table",{"aria-label":"Source quantities"},ge.createElement("thead",null,ge.createElement("tr",null,ge.createElement("th",{scope:"col"},"Confirm"),ge.createElement("th",{scope:"col"},"Quantity"),ge.createElement("th",{scope:"col"},"Reported value"),ge.createElement("th",{scope:"col"},"Basis"),ge.createElement("th",{scope:"col"},"Source"))),ge.createElement("tbody",null,a.facts.map(D=>ge.createElement("tr",{key:D.id,"data-fact-id":D.id},ge.createElement("td",null,ge.createElement("input",{type:"checkbox","aria-label":"Confirm "+Fs[D.quantity]+" "+D.value,checked:c.includes(D.id),onChange:Z=>h(Z.target.checked?[...c,D.id]:c.filter(K=>K!==D.id))})),ge.createElement("th",{scope:"row"},Fs[D.quantity],ge.createElement("small",null,D.subject)),ge.createElement("td",null,Wi(D.value)," ",D.unit),ge.createElement("td",null,D.basis,ge.createElement("small",null,D.method.replaceAll("_"," "))),ge.createElement("td",null,ge.createElement("button",{type:"button",onClick:()=>re(D)},"View source"),ge.createElement("small",null,C.find(Z=>Z.id===D.evidence.document_id)?.name??D.evidence.document_id.slice(0,8)," \xB7 page "+D.evidence.page))))))),a.facts.length===0&&ge.createElement("p",null,"No supported quantity labels found. Add a fact from a source row."),ge.createElement("div",{className:"sf-option-controls"},ge.createElement("label",null,"FAR floor-area numerator",ge.createElement("select",{"aria-label":"FAR floor-area numerator",value:u,onChange:D=>d(D.target.value)},ge.createElement("option",{value:""},"Choose a confirmed floor area"),rt.filter(D=>["above_ground_area","total_floor_area","floor_area"].includes(D.quantity)).map(D=>ge.createElement("option",{key:D.id,value:D.id},Fs[D.quantity]," \xB7 ",Wi(D.value)," m\xB2 \xB7 ",D.basis)))),ge.createElement("label",null,"FAR parcel-area denominator",ge.createElement("select",{"aria-label":"FAR parcel-area denominator",value:f,onChange:D=>g(D.target.value)},ge.createElement("option",{value:""},"Choose a confirmed parcel area"),rt.filter(D=>D.quantity==="parcel_area").map(D=>ge.createElement("option",{key:D.id,value:D.id},Wi(D.value)," m\xB2 \xB7 page ",D.evidence.page)))),ge.createElement("button",{type:"button",onClick:ce},"Save confirmed quantities")),ge.createElement("button",{type:"button",disabled:!x,onClick:()=>Re(async()=>{W(await n.rest("/documents/"+x+"/"+p+"/quantity-rows?locale="+S))})},"Add from source row"),X&&ge.createElement("div",{className:"sf-manual-quantity"},ge.createElement("label",null,"Source row",ge.createElement("select",{value:Y.row,onChange:D=>oe({...Y,row:Number(D.target.value)})},X.map((D,Z)=>ge.createElement("option",{key:Z,value:Z},D.text)))),ge.createElement("div",{className:"sf-fields"},ge.createElement("label",null,"Quantity",ge.createElement("select",{value:Y.quantity,onChange:D=>oe({...Y,quantity:D.target.value})},Object.entries(Fs).map(([D,Z])=>ge.createElement("option",{key:D,value:D},Z)))),ge.createElement("label",null,"Number exactly as printed",ge.createElement("input",{value:Y.value_text,onChange:D=>oe({...Y,value_text:D.target.value})})),ge.createElement("label",null,"Building or project",ge.createElement("input",{value:Y.subject,onChange:D=>oe({...Y,subject:D.target.value})})),ge.createElement("label",null,"Counting basis or floor group",ge.createElement("input",{placeholder:"e.g. Floors 1\u20139, above ground",value:Y.basis,onChange:D=>oe({...Y,basis:D.target.value})}))),ge.createElement("div",{className:"sf-inline"},ge.createElement("button",{type:"button",disabled:!X.length||!Y.value_text,onClick:_e},"Add source-linked fact"),ge.createElement("button",{type:"button",onClick:()=>W(null)},"Cancel"))))),F&&ge.createElement("figure",{ref:V,className:"sf-quantity-evidence"},ge.createElement("img",{src:F.image,alt:"Quantity source on page "+F.page}),ge.createElement("figcaption",null,F.filename," \xB7 page ",F.page,ge.createElement("p",null,F.quote)),ge.createElement("button",{type:"button",onClick:()=>z(null)},"Close source")),a?.calculation&&ge.createElement("div",{ref:q,className:"sf-quantity-calculation",role:"status"},ge.createElement("strong",null,"Confirmed FAR ",Wi(a.calculation.far)),ge.createElement("p",null,Wi(a.calculation.numerator_m2)," m\xB2 / ",Wi(a.calculation.denominator_m2)," m\xB2"),ge.createElement("p",null,a.calculation.basis)),a?.model_estimate?.gross_floor_area_m2!=null&&ge.createElement("p",null,"Recorded model estimate ",Wi(a.model_estimate.gross_floor_area_m2)," m\xB2 \xB7 footprint \xD7 floor count"," \xB7 revision "+a.model_estimate.revision.slice(0,8)),a?.findings.length>0&&ge.createElement("details",{open:!0},ge.createElement("summary",null,"Quantities to review (",a.findings.length,")"),ge.createElement("ul",null,a.findings.map((D,Z)=>ge.createElement("li",{key:Z},L(D))))),a?.warnings.map(D=>ge.createElement("p",{role:"status",key:D},D)),a&&ge.createElement("button",{type:"button",disabled:P,onClick:()=>Re(async()=>{await er(n,"/quantity-reviews/"+a.id+"/report"),v("Quantity report saved.")})},"Download quantity report"),P&&ge.createElement("p",{role:"status"},"Reading project quantities\u2026"),b&&ge.createElement("p",{role:"status"},b),A&&ge.createElement("p",{className:"sf-flag",role:"alert"},A))}import wl,{useState as rg}from"react";function Os({ctx:n}){let[e,t]=rg(!1),[i,r]=rg("");async function s(){t(!0),r("");try{await er(n,"/source/archive")}catch(o){r(o.message||"Could not prepare the source download.")}finally{t(!1)}}return wl.createElement("div",{className:"sf-source-access"},wl.createElement("span",null,"SiteForm \xB7 AGPL-3.0-only"),wl.createElement("button",{type:"button",onClick:s,disabled:e},e?"Preparing source\u2026":"Download source & licenses"),i&&wl.createElement("p",{role:"alert"},i))}import ri,{useEffect as sg,useRef as iv,useState as Bs}from"react";function nv(n){return n?{kind:n.kind,rise_m:Number(n.rise_m),basis:n.basis,note:n.note??"",...n.kind==="stepped"?{upper_scale_pct:Number(n.upper_scale_pct)}:{angle_deg:Number(n.angle_deg)}}:null}function og({ctx:n,model:e,request:t,ownsSession:i,onSaved:r,onClose:s}){let[o,a]=Bs(t.code??""),l=e.scene.buildings.find(C=>C.code===o),[c,h]=Bs(l?.roof??null),[u,d]=Bs(l?.height_m??""),[f,g]=Bs(""),[x,m]=Bs(!1),[p,T]=Bs(""),S=iv(!0);sg(()=>(S.current=!0,()=>{S.current=!1}),[]),sg(()=>{h(l?.roof??null),d(l?.height_m??"")},[l]);let _=async C=>{if(C.preventDefault(),!(x||!l)){if(!i()){T("Focus the originating chat before saving.");return}m(!0),T("");try{let M=e.scene.source,A=t.kind==="roof"?{code:o,roof:nv(c)}:{code:o,height_m:Number(u)},E=await n.rest("/documents/"+M.sha256+"/"+M.page+"/revisions",{method:"POST",body:{base:e.id,revision:e.scene.revision,name:f,changes:[A]},timeoutMs:3e4});if(!i())throw new Error("The option was saved in its original profile. Reopen this chat to view it.");S.current&&await r(E,o)}catch(M){T(M.message||"Could not save this alternative.")}finally{m(!1)}}};return ri.createElement("section",{className:"sf-card sf-quick-edit","aria-label":"Edit model alternative"},ri.createElement("h3",null,t.kind==="roof"?"Try a different roof":"Try a different height"),ri.createElement("p",null,"Base: ",e.name,". Save a new option; the base and working model stay unchanged."),ri.createElement("form",{onSubmit:_},ri.createElement("label",null,"Building",ri.createElement("select",{required:!0,"aria-label":"Edit building",disabled:x,value:o,onChange:C=>a(C.target.value)},ri.createElement("option",{value:""},"Choose a building"),e.scene.buildings.map(C=>ri.createElement("option",{key:C.code,value:C.code},C.code)))),l&&(t.kind==="roof"?ri.createElement(yl,{roof:c,index:o,onChange:h}):ri.createElement("label",null,"Highest point (m)",ri.createElement("input",{type:"number",required:!0,min:".001",max:"1000",step:"any",value:u,disabled:x,onChange:C=>d(C.target.value)}))),ri.createElement("label",null,"New option name",ri.createElement("input",{required:!0,maxLength:48,value:f,disabled:x,placeholder:"Name this alternative",onChange:C=>g(C.target.value)})),ri.createElement("div",{className:"sf-inline"},ri.createElement("button",{type:"submit",disabled:x||!l||!f.trim()},x?"Saving\u2026":"Save alternative"),ri.createElement("button",{type:"button",disabled:x,onClick:s},"Cancel edit")),p&&ri.createElement("p",{role:"alert",className:"sf-flag"},p)))}var ph=new Set,ag=(n,e)=>JSON.stringify([n??"local",e??"default"]),mh=n=>"studio-handoff:"+n;function ea(n,e){return n&&n.scope===e&&/^[0-9a-f]{64}$/.test(n.document??"")&&Number.isInteger(n.page)&&n.page>0&&n.page<=30&&/^(working|[0-9a-f]{32})$/.test(n.option??"")&&/^[0-9a-f]{64}$/.test(n.revision??"")&&typeof n.session=="string"&&n.session.length>0&&n.session.length<=200&&(n.building===null||typeof n.building=="string"&&n.building.length>0&&n.building.length<=48)&&Number.isFinite(n.created)&&Date.now()-n.created>=0&&Date.now()-n.created<36e5}function lg(n,e){let t=n.storage?.get(mh(e),null);return ea(t,e)?t:null}function cg(n,e){n.storage?.set(mh(e),null)}function hg(n){return ph.add(n),()=>ph.delete(n)}async function ug(n,e,t,i,r,s){if(!s())throw new Error("Focus the originating chat before opening Studio.");let o=e.state.connectionId.get(),a=e.state.profile.get(),l=ag(o,a),c={scope:l,document:t.scene.source.sha256,page:t.scene.source.page,option:t.id,revision:t.scene.revision,session:i,building:r?.code??null,created:Date.now()};if(!ea(c,l)||!n.storage)throw new Error("This model cannot be opened in Studio.");n.storage.set(mh(l),c);for(let h of ph)h(c);e.navigate("/siteform")}async function fg(n,e,t){if(!ea(e,t)||ag(n.state.connectionId.get(),n.state.profile.get())!==t)throw new Error("The originating profile is no longer active. Reopen the chat from Sessions.");await n.openSession(e.session,{profile:n.state.profile.get(),awaitHydration:!0})}var ks=/^[0-9a-f]{32}$/,pg=new Intl.NumberFormat(void 0,{maximumFractionDigits:2}),rv=new Intl.NumberFormat(void 0,{maximumFractionDigits:2,signDisplay:"exceptZero"}),sv=[["Volume (m\xB3)","volume_m3"],["Footprint (m\xB2)","footprint_m2"],["Highest point (m)","max_height_m"],["Buildings","building_count"],["Area flags","area_flags"]];function ov(n){if(n.study!==void 0)return Object.keys(n).length!==1||typeof n.study!="string"||!ks.test(n.study)?null:{path:"/height-studies/"+n.study,study:!0};let e="";if(n.review==="yes"){let t=["max_height_m","max_footprint_m2","max_volume_m3","min_clearance_m","min_setback_m","max_coverage_pct","max_far"],i={};for(let r of t){if(n[r]===void 0)continue;let s=Number(n[r]);if(!Number.isFinite(s)||s<=0)return null;i[r]=s}e=JSON.stringify(i)}return n.compare!==void 0?e||typeof n.option!="string"||typeof n.compare!="string"||!ks.test(n.option)||!ks.test(n.compare)||n.option===n.compare?null:{path:"/chat-options/"+n.option+"?compare_to="+n.compare}:typeof n.option=="string"&&ks.test(n.option)?{path:"/chat-options/"+n.option,review:e}:typeof n.document=="string"&&/^[0-9a-f]{64}$/.test(n.document)&&typeof n.revision=="string"&&/^[0-9a-f]{64}$/.test(n.revision)&&typeof n.page=="string"&&/^(?:[1-9]|[12][0-9]|30)$/.test(n.page)?{path:"/documents/"+n.document+"/"+n.page,revision:n.revision,review:e}:null}async function av(n,e,t,i){let r=await gg(n,e,t);if(i){let{id:s,scene:o}=r.models[0];try{r.report=await n.rest("/documents/"+o.source.sha256+"/"+o.source.page+"/review",{method:"POST",body:{reference:s,revision:o.revision,limits:JSON.parse(i)},timeoutMs:3e4})}catch(a){r.reviewError=a.message||"Could not check this model."}}return r}async function gg(n,e,t){if(!t){let{option:s,compare_to:o,comparison:a,sheet:l}=await n.rest(e,{timeoutMs:3e4});return{models:o?[s,o]:[s],comparison:a,sheet:l}}let[i,r]=await Promise.all([n.rest(e+"/scene",{timeoutMs:3e4}),n.rest(e,{timeoutMs:3e4})]);if(i?.revision!==t)throw new Error("This working model has changed since the chat turn.");return{models:[{id:"working",name:i.source.name,scene:i}],sheet:r}}function lv({ctx:n,view:e,visible:t,sessionId:i,ownsSession:r}){let[s,o]=pi(0),[a,l]=pi(!1),[c,h]=pi(""),[u,d]=pi(""),[f,g]=pi(null),[x,m]=pi(!1),[p,T]=pi(null),[S,_]=pi(null),[C,M]=pi(0),A=mg(0),{models:E,comparison:b,sheet:v}=p??e,P=E[s],N=b&&E[1-s],F=N&&N.scene.metres_per_pdf_point===P.scene.metres_per_pdf_point,z=(Y,oe=null)=>{if(!r()){d("Focus the originating chat to edit this model.");return}_({kind:Y,code:oe?.code??null}),d("")},V=async Y=>{try{await ug(n,Di,P,i,Y,r)}catch(oe){d(oe.message)}},q=async(Y,oe)=>{if(!r())throw new Error("Reopen the originating chat to view the saved option.");let Me=P.id==="working"?"/chat-options/"+Y.id:"/chat-options/"+P.id+"?compare_to="+Y.id,Ae=await gg(n,Me);r()&&(p||(A.current=s),T(Ae),o(Ae.models.length-1),g({code:oe}),m(!1),_(null),h("Saved "+Y.name+". You are viewing a new alternative to the chat result."))},X=async(Y,oe)=>{if(!r()||!Di.composer?.insertText){d("Focus the originating chat to use this action.");return}let Me=P.scene.source,Ae=JSON.stringify({document:Me.sha256,page:Me.page,option:P.id,revision:P.scene.revision,building:Y.code,comparison:N?.id});d("");try{await Di.composer.insertText(i,oe+`
SiteForm context: `+Ae,{mode:"block"})||d("Open the originating chat composer to continue.")}catch{d("The originating chat composer is unavailable.")}},W=async Y=>{l(!0),h(""),d("");try{let oe=await Ns(n,P.scene,Y);oe&&h("Saved "+oe)}catch(oe){d(oe.message||"Could not export this model.")}finally{l(!1)}};return Ie.createElement(Ie.Fragment,null,Ie.createElement(tr,{key:P.id,scene:P.scene,sheet:v,title:P.name,focus:f,visible:t,compare:x&&F?N.scene:null,compact:!0,actions:Y=>Ie.createElement(Ie.Fragment,null,Ie.createElement("button",{onClick:()=>X(Y,"Explain the confirmed dimensions and drawing evidence for this building.")},"Ask about building"),Ie.createElement("button",{onClick:()=>z("roof",Y)},"Edit roof"),Ie.createElement("button",{onClick:()=>z("height",Y)},"Change height"),Ie.createElement("button",{onClick:()=>V(Y)},"Open building in Studio"),N&&Ie.createElement("button",{onClick:()=>X(Y,"Explain the changes for this building between these two saved options.")},"Explain change"))}),Ie.createElement("section",{className:"sf-card sf-chat-tools","aria-label":"SiteForm model tools"},Ie.createElement("div",{className:"sf-inline"},Ie.createElement("button",{onClick:()=>z("roof")},"Edit roof"),Ie.createElement("button",{onClick:()=>z("height")},"Change height"),Ie.createElement("button",{onClick:()=>M(Y=>Y+1)},"Check limits"),Ie.createElement("button",{onClick:()=>V(null)},"Open in Studio"),p&&Ie.createElement("button",{onClick:()=>{T(null),o(A.current),_(null),g(null),h(""),d(""),m(!1)}},"Back to chat result")),S&&Ie.createElement(og,{key:P.id+S.kind+(S.code??""),ctx:n,model:P,request:S,ownsSession:r,onSaved:q,onClose:()=>_(null)}),b&&Ie.createElement(Ie.Fragment,null,Ie.createElement("p",{className:"sf-kicker"},"SiteForm / Saved options"),Ie.createElement("div",{className:"sf-table"},Ie.createElement("table",{"aria-label":"Saved option comparison"},Ie.createElement("thead",null,Ie.createElement("tr",null,Ie.createElement("th",{scope:"col"},"Metric"),Ie.createElement("th",{scope:"col"},E[0].name),Ie.createElement("th",{scope:"col"},E[1].name),Ie.createElement("th",{scope:"col"},"Change"))),Ie.createElement("tbody",null,sv.map(([Y,oe])=>Ie.createElement("tr",{key:oe},Ie.createElement("th",{scope:"row"},Y),Ie.createElement("td",null,pg.format(b.left.metrics[oe])),Ie.createElement("td",null,pg.format(b.right.metrics[oe])),Ie.createElement("td",null,rv.format(b.right_minus_left[oe]))))))),Ie.createElement("p",{className:"sf-caption"},"Change is the second option minus the first. Values describe concept massing."),Ie.createElement(Km,{changes:b.building_changes??[],onInspect:Y=>{let oe=Y.right_code?1:0;o(oe),g({code:Y.right_code??Y.left_code}),h(""),d("")}})),Ie.createElement("div",{className:"sf-inline"},F&&Ie.createElement("button",{type:"button","aria-pressed":x,onClick:()=>m(!x)},"Overlay ",N.name),b&&Ie.createElement("label",null,"View saved option",Ie.createElement("select",{"aria-label":"View saved option",value:s,disabled:a,onChange:Y=>{o(Number(Y.target.value)),g(null),h(""),d(""),_(null)}},E.map((Y,oe)=>Ie.createElement("option",{key:Y.id,value:oe},Y.name)))),Ie.createElement("button",{type:"button",disabled:a,onClick:()=>W("gltf")},"Export glTF"),Ie.createElement("button",{type:"button",disabled:a,onClick:()=>W("json")},"Export evidence JSON"),Ie.createElement("button",{type:"button",disabled:a,onClick:()=>W("csv")},"Export building CSV")),c&&Ie.createElement("p",{role:"status"},c),u&&Ie.createElement("p",{role:"alert",className:"sf-flag"},u),Ie.createElement(bl,{key:P.id,ctx:n,model:P,initialReport:p?null:e.report,initialError:p?"":e.reviewError,openRequest:C,onInspect:Y=>g({code:Y})})))}function cv({ctx:n,path:e,revision:t,review:i,study:r,sessionId:s,ownsSession:o}){let a=mg(null),[l,c]=pi(!1),[h,u]=pi(null),[d,f]=pi("");return gh(()=>{let g=new IntersectionObserver(([x])=>c(x.isIntersecting));return g.observe(a.current),()=>g.disconnect()},[]),gh(()=>{if(!l||h||d)return;let g=!0;return(r?n.rest(e,{timeoutMs:3e4}):av(n,e,t,i)).then(m=>{g&&u(m)}).catch(m=>{g&&f(m.message||"Could not load the saved SiteForm model.")}),()=>{g=!1}},[n,e,t,i,r,l,h,d]),Ie.createElement("div",{ref:a,className:"siteform sf-chat-model","aria-label":r?"SiteForm height study":"SiteForm 3D preview"},Ie.createElement("style",null,Us),Ie.createElement(Os,{ctx:n}),h?r?Ie.createElement(Ml,{ctx:n,path:e,study:h,visible:l}):Ie.createElement(lv,{ctx:n,view:h,visible:l,sessionId:s,ownsSession:o}):Ie.createElement("div",{className:"sf-card sf-chat-placeholder"},Ie.createElement("strong",null,r?"SiteForm height study":h?.models[0].name??"SiteForm 3D preview"),d?Ie.createElement(Ie.Fragment,null,Ie.createElement("p",{role:"alert"},d),Ie.createElement("p",null,"Check the connection and enable the SiteForm Agent for this profile in Capabilities."),Ie.createElement("button",{type:"button",onClick:()=>f("")},"Retry preview")):!h&&Ie.createElement("p",{role:"status"},r?"Loading height study\u2026":"Loading saved model\u2026")))}function hv({ctx:n,attrs:e,sessionId:t,streaming:i}){let r=ta(Di.state.focusedStoredSessionId),s=ta(Di.state.focusedSessionId),o=ta(Di.state.focusedSessionOwner),a=ta(Di.state.profile),l=ta(Di.state.connectionId),c=ov(e),h=typeof e?.quantities=="string"&&ks.test(e.quantities)?e.quantities:null,u=typeof e?.position=="string"&&ks.test(e.position)?e.position:null;if(!c&&!h&&!u||i||!t)return null;if(t!==r&&t!==s||o&&(o.profile!==(a||"default")||l&&o.connectionId!==l))return Ie.createElement("p",null,"Focus this chat to load the SiteForm model.");let d=()=>{let f=Di.state.focusedSessionOwner.get();return(t===Di.state.focusedSessionId.get()||t===Di.state.focusedStoredSessionId.get())&&l===Di.state.connectionId.get()&&a===Di.state.profile.get()&&(!f||f.profile===(a||"default")&&(!l||f.connectionId===l))};return u?Ie.createElement(uv,{key:JSON.stringify([l,a,t,u]),ctx:n,studyId:u}):h?Ie.createElement("div",{className:"siteform sf-chat-model","aria-label":"SiteForm quantity review"},Ie.createElement("style",null,Us),Ie.createElement(Os,{ctx:n}),Ie.createElement(Sl,{key:JSON.stringify([l,a,t,h]),ctx:n,reviewId:h,sessionId:t,ownsSession:d})):Ie.createElement(cv,{key:JSON.stringify([l,a,t,c]),ctx:n,sessionId:t,ownsSession:d,...c})}function uv({ctx:n,studyId:e}){let[t,i]=pi(null),[r,s]=pi(""),[o,a]=pi(0);return gh(()=>{let l=!0;return s(""),n.rest("/position-studies/"+e).then(c=>{l&&i(c)}).catch(c=>{l&&s(c.message)}),()=>{l=!1}},[n,e,o]),Ie.createElement("div",{className:"siteform sf-chat-model","aria-label":"SiteForm position study"},Ie.createElement("style",null,Us),Ie.createElement(Os,{ctx:n}),t?Ie.createElement(uh,{ctx:n,study:t}):r?Ie.createElement("div",null,Ie.createElement("p",{role:"alert"},r),Ie.createElement("button",{type:"button",onClick:()=>a(l=>l+1)},"Retry position study")):Ie.createElement("p",{role:"status"},"Loading position study\u2026"))}function xg(n){dg&&n.register({id:"chat-model",area:dg,data:{name:"siteform-model",render:e=>Ie.createElement(hv,{ctx:n,...e})}})}import Ft,{useEffect as _g,useState as Tl}from"react";function yg({ctx:n,endpoint:e,point:t,label:i,onApply:r,onClose:s}){let[o,a]=Tl(null),[l,c]=Tl(t),[h,u]=Tl("");_g(()=>{let x=!0;return n.rest(e+"/ruler-detail",{method:"POST",body:{point:t}}).then(m=>{x&&a(m)}).catch(m=>{x&&u(m.message)}),()=>{x=!1}},[n,e,t]);let d=(x,m,p)=>Math.min(Math.min(p,1),Math.max(Math.max(m,0),x)),f={ArrowLeft:[-1,0],ArrowRight:[1,0],ArrowUp:[0,-1],ArrowDown:[0,1]},g;if(o){let[x,m,p,T]=o.bounds,S=p-x,_=T-m,[C,M]=o.pixels,A=(F,z)=>c([d(F,x,p),d(z,m,T)]),E=([F,z])=>[1e3*(F-x)/S,1e3*(z-m)/_],[b,v]=E(l),P=([F,z])=>Math.hypot((F-b)*C,(z-v)*M),N=o.vertices.reduce((F,z)=>F&&P(E(F))<=P(E(z))?F:z,null);g=Ft.createElement(Ft.Fragment,null,Ft.createElement("p",{className:"sf-caption"},"Click the crop or use the arrow keys to move the marker one image pixel."),Ft.createElement("button",{type:"button",className:"sf-ruler-crop","aria-label":i+" on the magnified drawing",style:{maxWidth:C},onClick:F=>{if(!F.detail)return;let z=F.currentTarget.getBoundingClientRect();A(x+S*(F.clientX-z.left)/z.width,m+_*(F.clientY-z.top)/z.height)},onKeyDown:F=>{let z=f[F.key];z&&(F.preventDefault(),A(l[0]+z[0]*S/C,l[1]+z[1]*_/M))}},Ft.createElement("img",{src:o.image,alt:"",width:C,height:M,draggable:!1}),Ft.createElement("svg",{viewBox:"0 0 1000 1000",preserveAspectRatio:"none","aria-hidden":"true"},o.vertices.map(F=>{let[z,V]=E(F);return Ft.createElement("circle",{key:F.join(","),className:"sf-ruler-vertex",cx:z,cy:V,r:"10"})}),Ft.createElement("path",{d:`M${b-42} ${v}h84M${b} ${v-42}v84`}),Ft.createElement("circle",{className:"sf-ruler-marker",cx:b,cy:v,r:"18"}))),N&&Ft.createElement("button",{type:"button",onClick:()=>c(N)},"Snap to nearest PDF vertex"))}return Ft.createElement("section",{className:"sf-ruler-detail","aria-label":i},Ft.createElement("strong",null,i),h?Ft.createElement("p",{role:"alert",className:"sf-flag"},h):g??Ft.createElement("p",{role:"status"},"Reading drawing detail\u2026"),Ft.createElement("div",{className:"sf-inline"},Ft.createElement("button",{type:"button",disabled:!o,onClick:()=>r(l)},"Apply point"),Ft.createElement("button",{type:"button",onClick:s},"Cancel")))}function vg({ctx:n,endpoint:e,scale:t}){let[i,r]=Tl(null),o=t.points.length===2&&t.check?.points.length===2&&Number(t.metres)>0&&Number(t.check.metres)>0?JSON.stringify(t):null;if(_g(()=>{if(!o)return;let c=!0,h=setTimeout(()=>{n.rest(e+"/calibration",{method:"POST",body:JSON.parse(o)}).then(u=>{c&&r({payload:o,check:u.check})}).catch(u=>{c&&r({payload:o,error:u.message})})},200);return()=>{c=!1,clearTimeout(h)}},[n,e,o]),!o)return null;if(i?.payload!==o)return Ft.createElement("p",{className:"sf-caption",role:"status"},"Checking the scale\u2026");if(i.error)return Ft.createElement("p",{className:"sf-caption sf-flag",role:"status"},i.error);let a=i.check,l=c=>c.toLocaleString(void 0,{maximumFractionDigits:4});return Ft.createElement("p",{className:"sf-calibration"+(a.review?" sf-flag":""),role:"status"},Ft.createElement("strong",null,a.review?"Review scale":"Scale check within 2%"),Ft.createElement("span",null,l(a.calculated_m)," m measured \xB7 ",l(a.expected_m)," m expected \xB7 ",l(a.difference_pct),"% difference"))}var dv={points:[],metres:""},pv={scale:"Click the two ends of a scale bar or a known dimension.",check:"Mark another known distance to check the primary scale.",region:"Click opposite corners of a box that encloses one building.",table:"Click opposite corners of the height table. Include the label, value and unit.",trace:"Click each corner of the footprint in order. Then close the outline.",parcel:"Click the corners of the confirmed parcel boundary.",exclusion:"Click the corners of an area where buildings cannot be placed.",courtyard:"Trace the interior courtyard within the selected flat building."},nr=n=>n.map(([e,t])=>[e*1e3,t*1e3]).join(" "),mv=n=>n.length===3?"rgb("+n.map(e=>Math.round(e*255)).join(" ")+")":"#64748b",bg={vector:"Closed path",dashed:"Joined dashes",joined:"Joined strokes",traced:"Traced"};function gv({info:n,scale:e,check:t,evidence:i,points:r,windowBox:s,outline:o,saved:a,site:l,onPoint:c,zoom:h,rotation:u}){let d=m=>{let p=m.currentTarget.getBoundingClientRect(),T=Math.min(1,Math.max(0,(m.clientX-p.left)/p.width)),S=Math.min(1,Math.max(0,(m.clientY-p.top)/p.height));c([[T,S],[S,1-T],[1-T,1-S],[1-S,T]][u])},[f,g]=n.size,x=u%2;return G.createElement("div",{className:"sf-sheet-scroll"},G.createElement("div",{className:"sf-drawing",style:{width:h+"%",aspectRatio:x?g/f:f/g},onClick:d,"data-testid":"drawing"},G.createElement("div",{className:"sf-sheet-layer",style:{width:(x?f/g*100:100)+"%",height:(x?g/f*100:100)+"%",transform:"translate(-50%,-50%) rotate("+u*90+"deg)"}},G.createElement("img",{alt:"Rendered source drawing",src:n.image,draggable:!1}),G.createElement("svg",{viewBox:"0 0 1000 1000",preserveAspectRatio:"none","aria-hidden":"true"},a.map((m,p)=>G.createElement("polygon",{key:p,className:"sf-confirmed",points:nr(m.outline)})),a.flatMap((m,p)=>(m.courtyards??[]).map((T,S)=>G.createElement("polygon",{key:p+"-"+S,className:"sf-exclusion",points:nr(T)}))),l&&G.createElement("polygon",{className:"sf-parcel",points:nr(l.boundary)}),l?.exclusions.map((m,p)=>G.createElement("polygon",{key:p,className:"sf-exclusion",points:nr(m)})),s&&G.createElement("rect",{className:"sf-region",x:s[0]*1e3,y:s[1]*1e3,width:(s[2]-s[0])*1e3,height:(s[3]-s[1])*1e3}),o.length>0&&G.createElement("polygon",{className:"sf-outline",points:nr(o)}),e.length>0&&G.createElement("polyline",{className:"sf-ruler",points:nr(e)}),t?.length>0&&G.createElement("polyline",{className:"sf-check-ruler",points:nr(t)}),i&&G.createElement("rect",{className:"sf-exclusion",x:i[0]*1e3,y:i[1]*1e3,width:(i[2]-i[0])*1e3,height:(i[3]-i[1])*1e3}),[...e,...r].map(([m,p],T)=>G.createElement("circle",{key:T,className:"sf-point",cx:m*1e3,cy:p*1e3,r:"3"})),r.length>1&&G.createElement("polyline",{className:"sf-ruler",points:nr(r)})))))}function Sg(n,e){return n.filter(({evidence:t})=>{let[i,r,s,o]=t.marker_bounds??t.bounds,a=(i+s)/2,l=(r+o)/2,c=!1;return e.forEach(([h,u],d)=>{let[f,g]=e[(d+1)%e.length];u>l!=g>l&&a<h+(f-h)*(l-u)/(g-u)&&(c=!c)}),c})}function xv(n,e){if(!n)return[];let t=Sg(n.labels,e.outline);if(t.length)return t;let i=e.code.trim();return i?n.height_rows.filter(r=>!r.code||r.code.toLowerCase()===i.toLowerCase()).map(r=>({...r,code:i})):[]}function _v({ctx:n,document:e,page:t,draftKey:i,onScene:r,handoff:s}){let o="/documents/"+e.id+"/"+t,[a,l]=ft(null),[c,h]=ft(dv),[u,d]=ft(null),[f,g]=ft("scale"),[x,m]=ft([]),[p,T]=ft(null),[S,_]=ft([]),[C,M]=ft(null),[A,E]=ft([]),[b,v]=ft(null),[P,N]=ft(null),[F,z]=ft(null),[V,q]=ft([]),[X,W]=ft(null),[Y,oe]=ft(null),[Me,Ae]=ft(null),[ue,He]=ft(null),[Re,te]=ft(null),[ce,re]=ft(""),[xe,_e]=ft(!1),We=fv(null),[rt,L]=ft(""),[D,Z]=ft(""),[K,Q]=ft(!0),[Se,pe]=ft(100),[Te,Qe]=ft(0);El(()=>{let B=!0;return Promise.all([n.rest(o,{timeoutMs:45e3}),n.rest(o+"/scene")]).then(([se,ne])=>{if(!B)return;l(se),g(se.automatic?"scale":"trace"),te(ne),He(ne?.revision??"new"),Ae(ne);let le=n.storage?.get(i,null);le?(We.current=JSON.stringify(le),h(le.scale),q(le.rows),W(le.site??null),He(le.base),Ae(null),le.mode&&le.points?.length&&(g(le.mode),m(le.points),oe(le.courtyardBuilding??null)),Z("Unsaved draft recovered."),le.base!==(ne?.revision??"new")&&re("The saved model changed since this draft was opened.")):ne&&(h(ne.draft.scale),q(ne.draft.buildings),W(ne.draft.site??null)),_e(!0)}).catch(se=>B&&L(se.message)).finally(()=>B&&Q(!1)),()=>{B=!1}},[n,o,i]),Mg(()=>{if(!(!xe||!n.storage))try{let B=["trace","parcel","exclusion","courtyard"].includes(f)&&x.length>0;if(Me&&!B||!V.length&&!c.points.length&&c.metres===""&&!X&&!B)We.current&&We.current===JSON.stringify(n.storage.get(i,null))&&n.storage.remove(i),We.current=null;else{let se={base:ue,scale:c,rows:V,site:X,...B?{mode:f,points:x,courtyardBuilding:Y}:{}};n.storage.set(i,se),We.current=JSON.stringify(se)}}catch{re("Draft recovery storage is unavailable. Save before leaving this sheet.")}},[n,i,xe,Me,ue,c,V,X,f,x,Y]);let je=async()=>{Q(!0),L("");try{let B=await n.rest(o+"/scene");te(B),He(B?.revision??"new"),re(""),Z("Draft kept. Review it before saving against the latest model.")}catch(B){L(B.message)}finally{Q(!1)}},I=()=>{m([]),T(null),_([]),M(null),E([]),Z("")},y=B=>{I(),g(B),L(""),d(null)},H=async B=>{if(K)return;if(d(null),L(""),f==="scale"){let fe=c.points.length===1?[c.points[0],B]:[B];h({...c,points:fe}),Ae(null);return}if(f==="check"){let fe=c.check?.points??[],Ee=fe.length===1?[...fe,B]:[B];h({...c,check:{points:Ee,metres:c.check?.metres??""}}),Ae(null);return}if(f==="trace"||f==="parcel"||f==="exclusion"||f==="courtyard"){x.length<180&&m([...x,B]),M(null);return}if(x.length!==1){m([B]),T(null),_([]),M(null),E([]);return}let[[se,ne],[le,Ge]]=[x[0],B],U=[Math.min(se,le),Math.min(ne,Ge),Math.max(se,le),Math.max(ne,Ge)];T(U),m([]),Q(!0);try{if(f==="table"){N(null);let Ee=await n.rest(o+"/intake?ocr=true",{method:"POST",body:{window:U},timeoutMs:6e4});N(Ee),z(null);return}let fe=await n.rest(o+"/detect",{method:"POST",body:{window:U},timeoutMs:45e3});_(fe),Z(fe.length?"Select an outline and check it against the drawing.":"No closed vector outline here. Tighten the selection or trace the corners."),fe.length===1&&M({...fe[0],window:U})}catch(fe){L(fe.message)}finally{Q(!1)}},$=B=>{q([...V,...B.map(se=>({code:"",height:"",printed_area:"",method:se.method,outline:se.outline,candidate:se.id??null,window:se.window??null}))]),Ae(null),I()},ae=(B,se,ne)=>{q(V.map((le,Ge)=>Ge===B?{...le,[se]:ne,...["code","height"].includes(se)?{label_evidence:null}:{}}:le)),Ae(null)},ee=c.points.length===2&&Number(c.metres)>0&&V.length>0&&(!c.check||c.check.points.length===2&&Number(c.check.metres)>0)&&(!X||X.reference.trim())&&V.every(B=>B.code.trim()&&Number(B.height)>0&&(!B.program||Number(B.program.floors)>0&&Number(B.program.floor_height_m)>0)),ke=async B=>{if(B.preventDefault(),!(!ee||K||!ue||x.length&&f!=="region")){L(""),Q(!0);try{let se=await n.rest(o+"/scene?base="+ue,{method:"PUT",timeoutMs:45e3,body:{scale:{points:c.points,metres:Number(c.metres),...c.check?{check:{points:c.check.points,metres:Number(c.check.metres)}}:{}},...X?{site:X}:{},buildings:V.map(ne=>({...ne,height:Number(ne.height),program:ne.program?{...ne.program,floors:Number(ne.program.floors),floor_height_m:Number(ne.program.floor_height_m)}:null,roof:ne.roof?{...ne.roof,rise_m:Number(ne.roof.rise_m),angle_deg:ne.roof.kind==="stepped"?null:Number(ne.roof.angle_deg),upper_scale_pct:ne.roof.kind==="stepped"?Number(ne.roof.upper_scale_pct):null}:null,printed_area:ne.printed_area===""||ne.printed_area==null?null:Number(ne.printed_area)}))}});Ae(se),te(se),He(se.revision),re(""),r()}catch(se){L(se.message),se.message?.includes("working model changed")&&re(se.message)}finally{Q(!1)}}},we=async B=>{Q(!0),L("");try{let se=await n.rest(o+"/intake?ocr="+B,{method:"POST",timeoutMs:6e4});v(se),z(null)}catch(se){L(se.message)}finally{Q(!1)}},Oe=(B,se)=>B.points.map((ne,le)=>{let Ge="Refine "+se+" "+(le===0?"start":"end");return G.createElement("button",{type:"button",key:Ge,"aria-pressed":u?.label===Ge,onClick:()=>d({kind:se,index:le,label:Ge})},Ge)}),Fe=u?.kind==="check"?c.check:c,me=u&&Fe?.points[u.index];return a?G.createElement(G.Fragment,null,G.createElement("div",{className:"sf-workspace"},G.createElement("section",{className:"sf-card"},G.createElement("div",{className:"sf-bar"},G.createElement("div",null,G.createElement("p",{className:"sf-kicker"},"01 / Source drawing"),G.createElement("h2",null,"Sheet ",t)),G.createElement("label",{className:"sf-zoom"},"Zoom ",G.createElement("input",{"aria-label":"Drawing zoom",type:"range",min:"100",max:"350",step:"25",value:Se,onChange:B=>pe(Number(B.target.value))}))),G.createElement("div",{className:"sf-inline sf-modes"},G.createElement("button",{"aria-pressed":f==="scale",onClick:()=>y("scale")},"Set scale"),G.createElement("button",{"aria-pressed":f==="check",disabled:c.points.length!==2,onClick:()=>y("check")},"Check scale"),G.createElement("button",{"aria-pressed":f==="region",disabled:!a.automatic,onClick:()=>y("region")},"Find outline"),G.createElement("button",{"aria-pressed":f==="trace",onClick:()=>y("trace")},"Trace outline"),G.createElement("button",{"aria-pressed":f==="parcel",onClick:()=>y("parcel")},"Trace parcel"),X&&G.createElement("button",{"aria-pressed":f==="exclusion",disabled:X.exclusions.length>=12,onClick:()=>y("exclusion")},"Trace exclusion"),G.createElement("button",{onClick:()=>Qe((Te+3)%4)},"Rotate left")),G.createElement("p",null,pv[f]),G.createElement(gv,{info:a,scale:c.points,check:c.check?.points,evidence:F,points:x,windowBox:p,outline:C?.outline??[],saved:V,site:X,zoom:Se,rotation:Te,onPoint:H}),G.createElement("p",{className:"sf-caption"},a.vector_paths===0?"Image-only sheet \xB7 Trace outlines by hand.":a.automatic?a.vector_paths.toLocaleString()+" vector paths \xB7 Inspect each detected outline.":"High-complexity sheet \xB7 Trace outlines by hand.")),G.createElement("form",{className:"sf-card",onSubmit:ke},G.createElement("fieldset",{disabled:K,className:"sf-editor-fields"},G.createElement("p",{className:"sf-kicker"},"02 / Confirm dimensions"),G.createElement("h2",null,"Review buildings"),G.createElement("label",null,"Ruler distance (m)",G.createElement("input",{type:"number",min:".001",max:"10000",step:"any",value:c.metres,placeholder:"Enter known distance",onChange:B=>{h({...c,metres:B.target.value}),Ae(null)}})),G.createElement("p",{className:"sf-caption"},c.points.length,"/2 ruler points marked"),c.points.length>0&&G.createElement("div",{className:"sf-inline"},Oe(c,"primary")),c.check&&G.createElement("div",{className:"sf-ruler-check"},G.createElement("label",null,"Second known distance (m)",G.createElement("input",{type:"number",min:".001",max:"10000",step:"any",required:!0,value:c.check.metres,onChange:B=>{h({...c,check:{...c.check,metres:B.target.value}}),Ae(null)}})),G.createElement("div",{className:"sf-inline"},Oe(c.check,"check"),G.createElement("button",{type:"button",onClick:()=>{h({...c,check:null}),Ae(null),y("scale")}},"Remove scale check"))),me&&G.createElement(yg,{key:u.label,ctx:n,endpoint:o,point:me,label:u.label,onClose:()=>d(null),onApply:B=>{let se={...Fe,points:Fe.points.map((ne,le)=>le===u.index?B:ne)};h(u.kind==="check"?{...c,check:se}:se),Ae(null),d(null)}}),G.createElement(vg,{ctx:n,endpoint:o,scale:c}),f==="trace"&&G.createElement("div",{className:"sf-inline"},G.createElement("button",{type:"button",disabled:!x.length,onClick:()=>m(x.slice(0,-1))},"Undo point"),G.createElement("button",{type:"button",disabled:x.length<3||V.length>=40,onClick:()=>$([{method:"traced",outline:x}])},"Close outline")),(f==="parcel"||f==="exclusion")&&G.createElement("div",{className:"sf-inline"},G.createElement("button",{type:"button",disabled:!x.length,onClick:()=>m(x.slice(0,-1))},"Undo point"),G.createElement("button",{type:"button",disabled:x.length<3,onClick:()=>{W(f==="parcel"?{boundary:x,exclusions:X?.exclusions??[],reference:X?.reference??""}:{...X,exclusions:[...X.exclusions,x]}),Ae(null),y("scale")}},"Confirm ",f)),f==="courtyard"&&G.createElement("div",{className:"sf-inline"},G.createElement("button",{type:"button",disabled:!x.length,onClick:()=>m(x.slice(0,-1))},"Undo point"),G.createElement("button",{type:"button",disabled:x.length<3||!V[Y],onClick:()=>{let B=V[Y];ae(Y,"courtyards",[...B.courtyards??[],x]),y("scale")}},"Confirm courtyard")),X&&G.createElement("details",{className:"sf-review",open:f==="parcel"||f==="exclusion"||!X.reference},G.createElement("summary",null,"Parcel and exclusions"),G.createElement("label",null,"Boundary reference",G.createElement("input",{value:X.reference,maxLength:240,required:!0,placeholder:"Drawing legend, survey reference or review assumption",onChange:B=>{W({...X,reference:B.target.value}),Ae(null)}})),X.exclusions.map((B,se)=>G.createElement("button",{type:"button",key:se,onClick:()=>{W({...X,exclusions:X.exclusions.filter((ne,le)=>se!==le)}),Ae(null)}},"Remove exclusion ",se+1)),G.createElement("button",{type:"button",onClick:()=>{W(null),Ae(null),y("scale")}},"Remove parcel")),D&&G.createElement("p",{role:"status"},D),S.length>0&&G.createElement("div",{className:"sf-candidates"},S.map((B,se)=>G.createElement("button",{type:"button",key:B.id,"aria-pressed":C?.id===B.id,onClick:()=>M({...B,window:p})},G.createElement("i",{style:{background:mv(B.color)}}),bg[B.method]," ",se+1))),C&&G.createElement("button",{type:"button",disabled:V.length>=40,onClick:()=>$([C])},"Use selected outline"),S.length>1&&G.createElement("details",{className:"sf-review"},G.createElement("summary",null,"Queue multiple outlines"),S.map((B,se)=>G.createElement("label",{key:B.id},G.createElement("input",{type:"checkbox",checked:A.includes(B.id),onChange:ne=>E(le=>ne.target.checked?[...le,B.id]:le.filter(Ge=>Ge!==B.id))}),"Outline ",se+1)),G.createElement("button",{type:"button",disabled:!A.length||V.length+A.length>40,onClick:()=>$(S.filter(B=>A.includes(B.id)).map(B=>({...B,window:p})))},"Add checked outlines for review")),G.createElement("div",{className:"sf-inline"},G.createElement("button",{type:"button",onClick:()=>we(!1)},"Find drawing labels"),G.createElement("button",{type:"button",onClick:()=>we(!0)},"Read scan with local OCR"),G.createElement("button",{type:"button","aria-pressed":f==="table",onClick:()=>y("table")},"Select height table")),P&&G.createElement("p",{role:"status"},P.height_rows.length?P.height_rows.length+" height rows found. Review the suggested match or enter a building ID to assign a row.":"No explicit building height with metre units was found in that region."),b&&G.createElement("p",{role:"status"},b.labels.length," explicit ID and height labels found \xB7 ",b.method==="ocr"?"Local OCR":"PDF text","."," ",b.headings.join(" \xB7 ")," Review each suggestion against the drawing."),G.createElement("div",{className:"sf-rows"},!V.length&&G.createElement("p",null,"Find or trace an outline. Add the building ID and height from the drawing."),V.map((B,se)=>G.createElement("fieldset",{key:se},G.createElement("legend",null,"Building ",se+1," \xB7 ",bg[B.method]),B.placement&&G.createElement("div",null,G.createElement("p",{className:"sf-caption"},"Design placement \xB7 X ",B.placement.dx_m," m \xB7 Y ",B.placement.dy_m," m from the source outline."),G.createElement("button",{type:"button",onClick:()=>{ae(se,"placement",null),Ae(null)}},"Reset design placement")),B.label_evidence&&G.createElement("p",{className:"sf-caption"},"Confirmed ",B.label_evidence.method==="ocr"?"OCR":"drawing"," label \xB7 ",B.label_evidence.text),[...Sg(b?.labels??[],B.outline),...xv(P,B)].map((ne,le)=>G.createElement("div",{className:"sf-inline",key:le},G.createElement("span",null,ne.evidence.text),G.createElement("button",{type:"button",onClick:()=>z(ne.evidence.bounds)},"Locate label"),G.createElement("button",{type:"button",onClick:()=>{q(V.map((Ge,U)=>U===se?{...Ge,code:ne.code,height:ne.height_m,label_evidence:ne.evidence}:Ge)),z(ne.evidence.bounds),Ae(null)}},ne.evidence.kind==="height_table"?"Use table height for ":"Confirm ",ne.code," at ",ne.height_m," m"))),G.createElement("label",null,"Building ID ",se+1,G.createElement("input",{value:B.code,maxLength:48,required:!0,placeholder:"e.g. A-01",onChange:ne=>ae(se,"code",ne.target.value)})),G.createElement("div",{className:"sf-fields"},G.createElement("label",null,"Height (m) ",se+1,G.createElement("input",{type:"number",min:".001",max:"1000",step:"any",required:!0,value:B.height,onChange:ne=>ae(se,"height",ne.target.value)})),G.createElement("label",null,"Printed area (m\xB2) ",se+1,G.createElement("input",{type:"number",min:".01",max:"100000000",step:"any",value:B.printed_area??"",onChange:ne=>ae(se,"printed_area",ne.target.value)}))),G.createElement(yl,{roof:B.roof,index:se+1,onChange:ne=>ae(se,"roof",ne)}),!B.roof&&G.createElement("button",{type:"button",disabled:(B.courtyards?.length??0)>=8,onClick:()=>{oe(se),y("courtyard")}},"Trace courtyard for building ",se+1),B.courtyards?.map((ne,le)=>G.createElement("button",{type:"button",key:le,onClick:()=>ae(se,"courtyards",B.courtyards.filter((Ge,U)=>le!==U))},"Remove courtyard ",le+1)),G.createElement("label",null,G.createElement("input",{type:"checkbox",checked:!!B.program,onChange:ne=>ae(se,"program",ne.target.checked?{floors:"",floor_height_m:"",use:""}:null)}),"Enter confirmed floors for building ",se+1),B.program&&G.createElement("div",{className:"sf-fields"},G.createElement("label",null,"Floors",G.createElement("input",{type:"number",min:"1",max:"300",step:"1",required:!0,value:B.program.floors,onChange:ne=>ae(se,"program",{...B.program,floors:ne.target.value})})),G.createElement("label",null,"Floor height (m)",G.createElement("input",{type:"number",min:".001",max:"30",step:"any",required:!0,value:B.program.floor_height_m,onChange:ne=>ae(se,"program",{...B.program,floor_height_m:ne.target.value})})),G.createElement("label",null,"Use",G.createElement("input",{maxLength:80,value:B.program.use,onChange:ne=>ae(se,"program",{...B.program,use:ne.target.value})}))),G.createElement("button",{type:"button",onClick:()=>{q(V.filter((ne,le)=>se!==le)),Ae(null),f==="courtyard"&&y("scale")}},"Remove building ",se+1)))),!Me&&ue&&G.createElement("p",{className:"sf-caption"},"Unsaved draft \xB7 Based on ",ue==="new"?"a new model":ue.slice(0,8)),ce&&G.createElement("p",{role:"status"},ce),ce&&G.createElement("button",{type:"button",onClick:je},"Load latest revision and keep draft"),!Me&&Re&&G.createElement("button",{type:"button",onClick:()=>{h(Re.draft.scale),q(Re.draft.buildings),Ae(Re),d(null),W(Re.draft.site??null),He(Re.revision),re(""),L(""),Z("Saved model restored.")}},"Restore saved model"),G.createElement("button",{className:"sf-primary",type:"submit",disabled:!ee||K||!ue||!!me||x.length>0&&f!=="region"},K?"Working\u2026":"Build 3D model")),rt&&G.createElement("p",{className:"sf-flag",role:"alert"},rt))),(Me||s&&Re)&&G.createElement(eg,{ctx:n,endpoint:o,working:Me??Re,sheet:a,handoff:s,onCopy:B=>{h(B.scale),q(B.buildings),W(B.site??null),Ae(null),d(null),Z("Option copied into the editor. Build to update the working model."),requestAnimationFrame(()=>window.document.querySelector(".sf-workspace form")?.scrollIntoView({block:"start"}))}})):G.createElement("p",{role:rt?"alert":"status"},rt||"Reading the PDF sheet\u2026")}function yv({ctx:n}){let e=bi.useValue(bi.host.state.profile),t=bi.useValue(bi.host.state.connectionId),i=JSON.stringify([t??"local",e??"default"]);return G.createElement(vv,{key:i,ctx:n,scope:i})}function vv({ctx:n,scope:e}){let[t,i]=ft([]),r="sheet:"+e,[s,o]=ft(()=>n.storage?.get(r,null)?.id??""),[a,l]=ft(()=>n.storage?.get(r,null)?.page??1),[c,h]=ft(""),[u,d]=ft(!0),[f,g]=ft(""),[x,m]=ft(0),[p,T]=ft(()=>lg(n,e)),S=()=>{cg(n,e),T(null)};El(()=>hg(M=>{ea(M,e)&&T(M)}),[e]),El(()=>{if(!p||u)return;let M=t.find(A=>A.id===p.document);if(!M||p.page>M.pages){h("The drawing from this chat is not available in the active profile.");return}o(p.document),l(p.page),h("")},[p,t,u]),El(()=>{let M=!0;return n.rest("/documents").then(A=>{M&&i(A)}).catch(A=>{M&&h(A.message)}).finally(()=>{M&&d(!1)}),()=>{M=!1}},[n,x]),Mg(()=>{try{n.storage?.set(r,{id:s,page:a})}catch{}},[n,r,s,a]);let _=t.find(M=>M.id===s),C=async(M,A=!1)=>{let E=M.target.files?.[0];if(M.target.value="",!E)return;h(""),g("");let b=A?128*1024*1024:30*1024*1024;if(E.size>b){h(A?"The project archive is too large.":"Choose a PDF up to 30 MiB.");return}S(),d(!0);try{let v=await n.rest(A?"/projects/restore":"/documents",{method:"POST",timeoutMs:6e4,upload:{filename:E.name,contentType:A?"application/zip":"application/pdf",bytes:await E.arrayBuffer()}});i(P=>[v,...P.filter(N=>N.id!==v.id)]),o(v.id),l(v.page??1),A&&g("Project restored with its original saved revisions.")}catch(v){h(v.message)}finally{d(!1)}};return G.createElement("main",{className:"siteform"},G.createElement("style",null,Us),G.createElement("header",{className:"sf-header"},G.createElement("p",{className:"sf-kicker"},"SITEFORM / DRAWING STUDIO"),G.createElement("h1",null,"Turn site plans into 3D"),G.createElement("p",null,"Open a planning PDF, check the building outlines and confirm dimensions before viewing the massing."),G.createElement(Os,{ctx:n}),p&&G.createElement("div",{className:"sf-card","aria-label":"Chat context"},G.createElement("p",null,"Opened from chat \xB7 ",p.building?"Building "+p.building+" \xB7 ":"","Revision ",p.revision.slice(0,8),". Your editor draft is preserved. Copy the option into the editor only when you want to edit it."),G.createElement("button",{onClick:()=>fg(bi.host,p,e).catch(M=>h(M.message))},"Return to originating chat"),G.createElement("button",{onClick:S},"Clear chat context"))),G.createElement("section",{className:"sf-card sf-intake"},G.createElement("label",{className:"sf-file"},"Import planning PDF",G.createElement("input",{type:"file",accept:".pdf,application/pdf",onChange:C,disabled:u})),G.createElement("label",{className:"sf-file"},"Restore project ZIP",G.createElement("input",{type:"file",accept:".zip,application/zip",onChange:M=>C(M,!0),disabled:u})),G.createElement("label",{className:"sf-library-choice"},"Open saved PDF",G.createElement("select",{"aria-label":"Open saved PDF",value:s,disabled:u,onChange:M=>{S(),o(M.target.value),l(1),g("")}},G.createElement("option",{value:""},"Choose a drawing"),t.map(M=>G.createElement("option",{value:M.id,key:M.id},M.name)))),_&&G.createElement("label",null,"Sheet",G.createElement("select",{"aria-label":"Sheet",value:a,onChange:M=>{S(),l(Number(M.target.value)),g("")}},Array.from({length:_.pages},(M,A)=>G.createElement("option",{value:A+1,key:A},A+1," / ",_.pages)))),u&&G.createElement("p",{role:"status"},"Loading the local library\u2026"),c&&G.createElement("div",null,G.createElement("p",{className:"sf-flag",role:"alert"},c),G.createElement("button",{disabled:u,onClick:()=>{h(""),d(!0),m(M=>M+1)}},"Retry library")),f&&G.createElement("p",{role:"status"},f)),_&&G.createElement("details",{className:"sf-quantity-section"},G.createElement("summary",null,"Review project quantities and supporting documents"),G.createElement(Sl,{key:"quantities:"+s+"/"+a,ctx:n,documentId:s,page:a,library:t})),_&&G.createElement(_v,{key:s+"/"+a,ctx:n,document:_,page:a,handoff:p?.document===s&&p.page===a?p:null,draftKey:"draft:"+e+":"+s+"/"+a,onScene:()=>{g("Model saved in this Hermes profile."),requestAnimationFrame(()=>window.document.querySelector(".sf-variants")?.scrollIntoView({block:"start"}))}}))}var v8={id:"siteform",name:"SiteForm",defaultEnabled:!1,register(n){xg(n),n.registerMany([{id:"studio",area:bi.ROUTES_AREA,data:{path:"/siteform"},render:()=>G.createElement(yv,{ctx:n})},{id:"nav",area:bi.SIDEBAR_NAV_AREA,data:{path:"/siteform",label:"SiteForm",codicon:"symbol-structure"}},{id:"open",area:bi.PALETTE_AREA,data:{id:"siteform.open",label:"SiteForm: Open drawing studio",keywords:["planning","PDF","3D"],run:()=>bi.host.navigate("/siteform")}}])}};export{v8 as default};
