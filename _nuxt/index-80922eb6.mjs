import{_ as N,d as z,r as u,L as P,a as r,o as i,c as m,w as t,b as a,e as F,t as h,f as I,g,h as d,C as M}from"./entry-4a2c6079.mjs";const j=z({__name:"MatrixConsole",setup(L,{expose:S}){S();const f=u(0),e=u(0),w=u(0),B=u(0),_=u(512),l=u(!1),v=u(null),s=P.of(_.value),p=new M,k=()=>O(),y=()=>E(),V=()=>T();function E(){l.value=!0;const o=R(s.lives);let n=0;const c=setInterval(()=>{s.update(),x(s.lives,o),n%100===0&&console.log("\u5B9F\u884C\u56DE\u6570:",n),n++>5e3&&(alert("\u7D42\u4E86\u3067\u3059\u3002"),clearInterval(c)),l.value||clearInterval(c)},1)}function R(o){const n=v.value;n.width=o[0].length,n.height=o.length;const c=n.getContext("2d");return x(o,c),c}function x(o,n){n.clearRect(0,0,o[0].length,o.length),n.beginPath();for(let c=0;c<o.length;c++){const A=o[c];for(let C=0;C<A.length;C++){const D=A[C];D!==0&&(n.fillStyle=p.colorOf(D),n.fillRect(C,c,1,1))}}}function T(){l.value=!1}function O(){s.langtonsLoops(_.value)}const b={recycleTimeSec:f,drawingRate:e,displayCount:w,calculateCount:B,canvasOneSideSize:_,started:l,matrixCanvas:v,langtonsLoops:s,cellTypes:p,onClickReset:k,onClickStart:y,onClickStop:V,doLangtonsLoops:E,initialRenderCanvasOf:R,renderCanvasOf:x,stopLangtonsLoops:T,resetLangtonsLoops:O};return Object.defineProperty(b,"__isScriptSetup",{enumerable:!1,value:!0}),b}}),q=d(" \u30EA\u30B5\u30A4\u30AF\u30EB\u30BF\u30A4\u30E0: "),G=d(" \u63CF\u753B\u7387(\u8868\u793A\u56DE\u6570/\u8A08\u7B97\u56DE\u6570): "),H={key:0},J={key:1},K=d("RESET"),Q=d(" START "),U=d(" STOP "),W=["width","height"];function X(L,S,f,e,w,B){const _=r("v-card-text"),l=r("v-btn"),v=r("v-card-actions"),s=r("v-col"),p=r("v-row"),k=r("v-container"),y=r("v-card");return i(),m(y,{class:"mx-auto"},{default:t(()=>[a(k,null,{default:t(()=>[a(p,{dense:"","no-gutters":""},{default:t(()=>[a(s,null,{default:t(()=>[a(_,null,{default:t(()=>[q,F("div",null,h(e.recycleTimeSec)+" \u79D2",1)]),_:1}),a(_,null,{default:t(()=>[G,e.calculateCount>0?(i(),I("div",H,h(e.drawingRate)+"% ("+h(e.displayCount)+"/"+h(e.calculateCount)+") ",1)):g("",!0),e.calculateCount<=0?(i(),I("div",J,"-")):g("",!0)]),_:1}),a(v,null,{default:t(()=>[a(l,{color:"error",outlined:"",onClick:e.onClickReset},{default:t(()=>[K]),_:1}),e.started?g("",!0):(i(),m(l,{key:0,color:"primary",outlined:"",onClick:e.onClickStart},{default:t(()=>[Q]),_:1})),e.started?(i(),m(l,{key:1,color:"secondary",outlined:"",onClick:e.onClickStop},{default:t(()=>[U]),_:1})):g("",!0)]),_:1})]),_:1}),a(s,null,{default:t(()=>[F("canvas",{ref:"matrixCanvas",width:e.canvasOneSideSize,height:e.canvasOneSideSize},null,8,W)]),_:1})]),_:1})]),_:1})]),_:1})}var Y=N(j,[["render",X],["__scopeId","data-v-0c7b883e"]]);const Z={};function $(L,S){const f=Y,e=r("v-container");return i(),m(e,null,{default:t(()=>[a(f)]),_:1})}var ne=N(Z,[["render",$]]);export{ne as default};
