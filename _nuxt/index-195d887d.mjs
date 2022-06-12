import{_ as N,d as j,r as s,L as q,a as u,o as p,c as E,w as t,b as l,e as h,t as k,f as F,g as x,h as G,C as H}from"./entry-3f94329c.mjs";const J=j({__name:"MatrixConsole",setup(b,{expose:T}){T();const i=s("-"),e=s(0),m=s(0),r=s(0),_=s(512),d=s(5e3),g=s(null),a=q.of(_.value),S=new H,v=s(!1);let f=0;const M=()=>D(),I=()=>A(),V=()=>R();function A(){v.value=!0;const o=w(a.lives),n=setInterval(()=>{const c=Date.now();a.update(),r.value++,B(a.lives,o),m.value++,f+=Date.now()-c;const y=f/r.value/1e3,z=Number(y.toFixed(3)).toLocaleString();i.value=z;const P=m.value/r.value*100;e.value=Number(P.toFixed(0)),r.value>=d.value&&(alert("\u6307\u5B9A\u3057\u305F\u8A08\u7B97\u56DE\u6570\u306B\u9054\u3057\u307E\u3057\u305F\u3002\u7D42\u4E86\u3057\u307E\u3059\u3002"),clearInterval(n)),v.value||clearInterval(n)},1)}function w(o){const n=g.value;n.width=o[0].length,n.height=o.length;const c=n.getContext("2d");return B(o,c),c}function B(o,n){n.clearRect(0,0,o[0].length,o.length),n.beginPath();for(let c=0;c<o.length;c++){const L=o[c];for(let C=0;C<L.length;C++){const y=L[C];y!==0&&(n.fillStyle=S.colorOf(y),n.fillRect(C,c,1,1))}}}function R(){v.value=!1}function D(){i.value="-",e.value=0,m.value=0,r.value=0,f=0,a.langtonsLoops(_.value),w(a.lives)}const O={cycleTime:i,drawingRate:e,displayCount:m,calculateCount:r,canvasOneSideSize:_,maxExecuteCount:d,matrixCanvas:g,langtonsLoops:a,cellTypes:S,started:v,totalElpasedMs:f,onClickReset:M,onClickStart:I,onClickStop:V,doLangtonsLoops:A,initialRenderCanvasOf:w,renderCanvasOf:B,stopLangtonsLoops:R,resetLangtonsLoops:D};return Object.defineProperty(O,"__isScriptSetup",{enumerable:!1,value:!0}),O}}),K=h(" \u63CF\u753B\u7387(\u8868\u793A\u56DE\u6570/\u8A08\u7B97\u56DE\u6570): "),Q={key:0},U={key:1},W=h("RESET"),X=h(" START "),Y=h(" STOP "),Z=["width","height"];function $(b,T,i,e,m,r){const _=u("v-card-text"),d=u("v-btn"),g=u("v-card-actions"),a=u("v-col"),S=u("v-row"),v=u("v-container"),f=u("v-card");return p(),E(f,{class:"mx-auto"},{default:t(()=>[l(v,null,{default:t(()=>[l(S,{dense:"","no-gutters":""},{default:t(()=>[l(a,null,{default:t(()=>[l(_,null,{default:t(()=>[h(" \u30EA\u30B5\u30A4\u30AF\u30EB\u30BF\u30A4\u30E0: "+k(e.cycleTime)+" \u79D2 ",1)]),_:1}),l(_,null,{default:t(()=>[K,e.calculateCount>0?(p(),F("div",Q,k(e.drawingRate)+"% ("+k(e.displayCount)+"/"+k(e.calculateCount)+") ",1)):x("",!0),e.calculateCount<=0?(p(),F("div",U,"-")):x("",!0)]),_:1}),l(g,null,{default:t(()=>[l(d,{color:"error",outlined:"",onClick:e.onClickReset},{default:t(()=>[W]),_:1}),e.started?x("",!0):(p(),E(d,{key:0,color:"primary",outlined:"",onClick:e.onClickStart},{default:t(()=>[X]),_:1})),e.started?(p(),E(d,{key:1,color:"secondary",outlined:"",onClick:e.onClickStop},{default:t(()=>[Y]),_:1})):x("",!0)]),_:1})]),_:1}),l(a,null,{default:t(()=>[G("canvas",{ref:"matrixCanvas",width:e.canvasOneSideSize,height:e.canvasOneSideSize},null,8,Z)]),_:1})]),_:1})]),_:1})]),_:1})}var ee=N(J,[["render",$],["__scopeId","data-v-7b1d7d36"]]);const te={};function ne(b,T){const i=ee,e=u("v-container");return p(),E(e,null,{default:t(()=>[l(i)]),_:1})}var ae=N(te,[["render",ne]]);export{ae as default};
