import{D as pt,E as ut,r as l,H as ft,b as ne,j as e,_ as c,c as G,g as se,a as ae,s as I,u as le,I as mt,d as de,J as xt,T as ht,K as gt,f as Ze,i as vt,R as pe,k as yt}from"./index-c9b6f3db.js";import{A as jt}from"./AuthLayoutLocked-3bf0e965.js";import{u as Ke,H as bt}from"./Helmet-21af47cd.js";import{g as St,a as Ct,p as Lt,h as wt,f as It,C as ke,d as De,b as Fe,c as Et,e as Rt,u as Tt}from"./aiAlgorithm-359986f1.js";import{F as Re}from"./FilterView-b293e98b.js";import{J as _e,v as re}from"./isValid-8e7c091d.js";import{d as Ue}from"./Cancel-31ac9045.js";import{I as Se}from"./IconButton-6c2b5903.js";import{T as Mt,F as zt,I as Pt,S as $t}from"./TextField-5350433d.js";import{L as At,A as Nt,D as kt,a as Dt}from"./DatePicker-06800ccf.js";import{M as We}from"./MenuItem-bc6ecf75.js";import{e as Ft}from"./extendSxProp-f96b963a.js";import{b as _t,c as Qe,S as Ut}from"./createSvgIcon-60083042.js";import{T as ee}from"./Typography-ecdde47a.js";import{T as Wt,g as Be,P as He,M as Ge}from"./Menu-5b85e992.js";import{u as Bt}from"./useTheme-239bb432.js";import{B as P}from"./Button-91d3855e.js";import{L as Ce}from"./LinearProgress-8dcc79b9.js";import{g as Ht}from"./useIsFocusVisible-672433b0.js";import{u as Gt}from"./useMutation-eed3cbaa.js";import"./Refresh-c5117a03.js";import"./createSvgIcon-a416b878.js";import"./useFormControl-6a66f310.js";import"./List-488c0746.js";import"./Stack-ef3e6bed.js";import"./Grid-e2163307.js";import"./TransitionGroupContext-93465ad1.js";import"./Popper-01c41e32.js";import"./InputAdornment-a3100ed2.js";import"./ListItem-62b53da2.js";import"./listItemButtonClasses-2c90cfd8.js";import"./Chip-15981a69.js";import"./listItemTextClasses-4ee9e470.js";const Ot=["className","component"];function Vt(t={}){const{themeId:n,defaultTheme:i,defaultClassName:o="MuiBox-root",generateClassName:p}=t,f=pt("div",{shouldForwardProp:a=>a!=="theme"&&a!=="sx"&&a!=="as"})(ut);return l.forwardRef(function(x,g){const m=ft(i),r=Ft(x),{className:v,component:b="div"}=r,S=ne(r,Ot);return e.jsx(f,c({as:b,ref:g,className:G(v,p?p(o):o),theme:n&&m[n]||m},S))})}function Jt(t){return se("MuiCollapse",t)}ae("MuiCollapse",["root","horizontal","vertical","entered","hidden","wrapper","wrapperInner"]);const Yt=["addEndListener","children","className","collapsedSize","component","easing","in","onEnter","onEntered","onEntering","onExit","onExited","onExiting","orientation","style","timeout","TransitionComponent"],qt=t=>{const{orientation:n,classes:i}=t,o={root:["root",`${n}`],entered:["entered"],hidden:["hidden"],wrapper:["wrapper",`${n}`],wrapperInner:["wrapperInner",`${n}`]};return de(o,Jt,i)},Xt=I("div",{name:"MuiCollapse",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,n[i.orientation],i.state==="entered"&&n.entered,i.state==="exited"&&!i.in&&i.collapsedSize==="0px"&&n.hidden]}})(({theme:t,ownerState:n})=>c({height:0,overflow:"hidden",transition:t.transitions.create("height")},n.orientation==="horizontal"&&{height:"auto",width:0,transition:t.transitions.create("width")},n.state==="entered"&&c({height:"auto",overflow:"visible"},n.orientation==="horizontal"&&{width:"auto"}),n.state==="exited"&&!n.in&&n.collapsedSize==="0px"&&{visibility:"hidden"})),Zt=I("div",{name:"MuiCollapse",slot:"Wrapper",overridesResolver:(t,n)=>n.wrapper})(({ownerState:t})=>c({display:"flex",width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),Kt=I("div",{name:"MuiCollapse",slot:"WrapperInner",overridesResolver:(t,n)=>n.wrapperInner})(({ownerState:t})=>c({width:"100%"},t.orientation==="horizontal"&&{width:"auto",height:"100%"})),et=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiCollapse"}),{addEndListener:p,children:f,className:h,collapsedSize:a="0px",component:x,easing:g,in:m,onEnter:r,onEntered:v,onEntering:b,onExit:S,onExited:L,onExiting:T,orientation:$="vertical",style:M,timeout:y=mt.standard,TransitionComponent:F=Wt}=o,z=ne(o,Yt),A=c({},o,{orientation:$,collapsedSize:a}),C=qt(A),N=Bt(),k=l.useRef(),E=l.useRef(null),O=l.useRef(),ce=typeof a=="number"?`${a}px`:a,j=$==="horizontal",W=j?"width":"height";l.useEffect(()=>()=>{clearTimeout(k.current)},[]);const B=l.useRef(null),Ie=_t(i,B),w=d=>R=>{if(d){const _=B.current;R===void 0?d(_):d(_,R)}},V=()=>E.current?E.current[j?"clientWidth":"clientHeight"]:0,U=w((d,R)=>{E.current&&j&&(E.current.style.position="absolute"),d.style[W]=ce,r&&r(d,R)}),me=w((d,R)=>{const _=V();E.current&&j&&(E.current.style.position="");const{duration:q,easing:ue}=Be({style:M,timeout:y,easing:g},{mode:"enter"});if(y==="auto"){const oe=N.transitions.getAutoHeightDuration(_);d.style.transitionDuration=`${oe}ms`,O.current=oe}else d.style.transitionDuration=typeof q=="string"?q:`${q}ms`;d.style[W]=`${_}px`,d.style.transitionTimingFunction=ue,b&&b(d,R)}),J=w((d,R)=>{d.style[W]="auto",v&&v(d,R)}),xe=w(d=>{d.style[W]=`${V()}px`,S&&S(d)}),Y=w(L),he=w(d=>{const R=V(),{duration:_,easing:q}=Be({style:M,timeout:y,easing:g},{mode:"exit"});if(y==="auto"){const ue=N.transitions.getAutoHeightDuration(R);d.style.transitionDuration=`${ue}ms`,O.current=ue}else d.style.transitionDuration=typeof _=="string"?_:`${_}ms`;d.style[W]=ce,d.style.transitionTimingFunction=q,T&&T(d)}),ge=d=>{y==="auto"&&(k.current=setTimeout(d,O.current||0)),p&&p(B.current,d)};return e.jsx(F,c({in:m,onEnter:U,onEntered:J,onEntering:me,onExit:xe,onExited:Y,onExiting:he,addEndListener:ge,nodeRef:B,timeout:y==="auto"?null:y},z,{children:(d,R)=>e.jsx(Xt,c({as:x,className:G(C.root,h,{entered:C.entered,exited:!m&&ce==="0px"&&C.hidden}[d]),style:c({[j?"minWidth":"minHeight"]:ce},M),ownerState:c({},A,{state:d}),ref:Ie},R,{children:e.jsx(Zt,{ownerState:c({},A,{state:d}),className:C.wrapper,ref:E,children:e.jsx(Kt,{ownerState:c({},A,{state:d}),className:C.wrapperInner,children:f})})}))}))});et.muiSupportAuto=!0;const tt=et,Qt=xt(),en=Vt({themeId:ht,defaultTheme:Qt,defaultClassName:"MuiBox-root",generateClassName:gt.generate}),Le=en,tn=l.createContext({}),fe=tn,nn=l.createContext({}),we=nn;function on(t){return se("MuiStep",t)}ae("MuiStep",["root","horizontal","vertical","alternativeLabel","completed"]);const rn=["active","children","className","component","completed","disabled","expanded","index","last"],sn=t=>{const{classes:n,orientation:i,alternativeLabel:o,completed:p}=t;return de({root:["root",i,o&&"alternativeLabel",p&&"completed"]},on,n)},an=I("div",{name:"MuiStep",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,n[i.orientation],i.alternativeLabel&&n.alternativeLabel,i.completed&&n.completed]}})(({ownerState:t})=>c({},t.orientation==="horizontal"&&{paddingLeft:8,paddingRight:8},t.alternativeLabel&&{flex:1,position:"relative"})),ln=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiStep"}),{active:p,children:f,className:h,component:a="div",completed:x,disabled:g,expanded:m=!1,index:r,last:v}=o,b=ne(o,rn),{activeStep:S,connector:L,alternativeLabel:T,orientation:$,nonLinear:M}=l.useContext(fe);let[y=!1,F=!1,z=!1]=[p,x,g];S===r?y=p!==void 0?p:!0:!M&&S>r?F=x!==void 0?x:!0:!M&&S<r&&(z=g!==void 0?g:!0);const A=l.useMemo(()=>({index:r,last:v,expanded:m,icon:r+1,active:y,completed:F,disabled:z}),[r,v,m,y,F,z]),C=c({},o,{active:y,orientation:$,alternativeLabel:T,completed:F,disabled:z,expanded:m,component:a}),N=sn(C),k=e.jsxs(an,c({as:a,className:G(N.root,h),ref:i,ownerState:C},b,{children:[L&&T&&r!==0?L:null,f]}));return e.jsx(we.Provider,{value:A,children:L&&!T&&r!==0?e.jsxs(l.Fragment,{children:[L,k]}):k})}),Oe=ln,dn=Qe(e.jsx("path",{d:"M12 0a12 12 0 1 0 0 24 12 12 0 0 0 0-24zm-2 17l-5-5 1.4-1.4 3.6 3.6 7.6-7.6L19 8l-9 9z"}),"CheckCircle"),cn=Qe(e.jsx("path",{d:"M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"}),"Warning");function pn(t){return se("MuiStepIcon",t)}const un=ae("MuiStepIcon",["root","active","completed","error","text"]),Te=un;var Ve;const fn=["active","className","completed","error","icon"],mn=t=>{const{classes:n,active:i,completed:o,error:p}=t;return de({root:["root",i&&"active",o&&"completed",p&&"error"],text:["text"]},pn,n)},Me=I(Ut,{name:"MuiStepIcon",slot:"Root",overridesResolver:(t,n)=>n.root})(({theme:t})=>({display:"block",transition:t.transitions.create("color",{duration:t.transitions.duration.shortest}),color:(t.vars||t).palette.text.disabled,[`&.${Te.completed}`]:{color:(t.vars||t).palette.primary.main},[`&.${Te.active}`]:{color:(t.vars||t).palette.primary.main},[`&.${Te.error}`]:{color:(t.vars||t).palette.error.main}})),xn=I("text",{name:"MuiStepIcon",slot:"Text",overridesResolver:(t,n)=>n.text})(({theme:t})=>({fill:(t.vars||t).palette.primary.contrastText,fontSize:t.typography.caption.fontSize,fontFamily:t.typography.fontFamily})),hn=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiStepIcon"}),{active:p=!1,className:f,completed:h=!1,error:a=!1,icon:x}=o,g=ne(o,fn),m=c({},o,{active:p,completed:h,error:a}),r=mn(m);if(typeof x=="number"||typeof x=="string"){const v=G(f,r.root);return a?e.jsx(Me,c({as:cn,className:v,ref:i,ownerState:m},g)):h?e.jsx(Me,c({as:dn,className:v,ref:i,ownerState:m},g)):e.jsxs(Me,c({className:v,ref:i,ownerState:m},g,{children:[Ve||(Ve=e.jsx("circle",{cx:"12",cy:"12",r:"12"})),e.jsx(xn,{className:r.text,x:"12",y:"12",textAnchor:"middle",dominantBaseline:"central",ownerState:m,children:x})]}))}return x}),gn=hn;function vn(t){return se("MuiStepLabel",t)}const yn=ae("MuiStepLabel",["root","horizontal","vertical","label","active","completed","error","disabled","iconContainer","alternativeLabel","labelContainer"]),te=yn,jn=["children","className","componentsProps","error","icon","optional","slotProps","StepIconComponent","StepIconProps"],bn=t=>{const{classes:n,orientation:i,active:o,completed:p,error:f,disabled:h,alternativeLabel:a}=t;return de({root:["root",i,f&&"error",h&&"disabled",a&&"alternativeLabel"],label:["label",o&&"active",p&&"completed",f&&"error",h&&"disabled",a&&"alternativeLabel"],iconContainer:["iconContainer",o&&"active",p&&"completed",f&&"error",h&&"disabled",a&&"alternativeLabel"],labelContainer:["labelContainer",a&&"alternativeLabel"]},vn,n)},Sn=I("span",{name:"MuiStepLabel",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,n[i.orientation]]}})(({ownerState:t})=>c({display:"flex",alignItems:"center",[`&.${te.alternativeLabel}`]:{flexDirection:"column"},[`&.${te.disabled}`]:{cursor:"default"}},t.orientation==="vertical"&&{textAlign:"left",padding:"8px 0"})),Cn=I("span",{name:"MuiStepLabel",slot:"Label",overridesResolver:(t,n)=>n.label})(({theme:t})=>c({},t.typography.body2,{display:"block",transition:t.transitions.create("color",{duration:t.transitions.duration.shortest}),[`&.${te.active}`]:{color:(t.vars||t).palette.text.primary,fontWeight:500},[`&.${te.completed}`]:{color:(t.vars||t).palette.text.primary,fontWeight:500},[`&.${te.alternativeLabel}`]:{marginTop:16},[`&.${te.error}`]:{color:(t.vars||t).palette.error.main}})),Ln=I("span",{name:"MuiStepLabel",slot:"IconContainer",overridesResolver:(t,n)=>n.iconContainer})(()=>({flexShrink:0,display:"flex",paddingRight:8,[`&.${te.alternativeLabel}`]:{paddingRight:0}})),wn=I("span",{name:"MuiStepLabel",slot:"LabelContainer",overridesResolver:(t,n)=>n.labelContainer})(({theme:t})=>({width:"100%",color:(t.vars||t).palette.text.secondary,[`&.${te.alternativeLabel}`]:{textAlign:"center"}})),nt=l.forwardRef(function(n,i){var o;const p=le({props:n,name:"MuiStepLabel"}),{children:f,className:h,componentsProps:a={},error:x=!1,icon:g,optional:m,slotProps:r={},StepIconComponent:v,StepIconProps:b}=p,S=ne(p,jn),{alternativeLabel:L,orientation:T}=l.useContext(fe),{active:$,disabled:M,completed:y,icon:F}=l.useContext(we),z=g||F;let A=v;z&&!A&&(A=gn);const C=c({},p,{active:$,alternativeLabel:L,completed:y,disabled:M,error:x,orientation:T}),N=bn(C),k=(o=r.label)!=null?o:a.label;return e.jsxs(Sn,c({className:G(N.root,h),ref:i,ownerState:C},S,{children:[z||A?e.jsx(Ln,{className:N.iconContainer,ownerState:C,children:e.jsx(A,c({completed:y,active:$,error:x,icon:z},b))}):null,e.jsxs(wn,{className:N.labelContainer,ownerState:C,children:[f?e.jsx(Cn,c({ownerState:C},k,{className:G(N.label,k==null?void 0:k.className),children:f})):null,m]})]}))});nt.muiName="StepLabel";const Je=nt;function In(t){return se("MuiStepConnector",t)}ae("MuiStepConnector",["root","horizontal","vertical","alternativeLabel","active","completed","disabled","line","lineHorizontal","lineVertical"]);const En=["className"],Rn=t=>{const{classes:n,orientation:i,alternativeLabel:o,active:p,completed:f,disabled:h}=t,a={root:["root",i,o&&"alternativeLabel",p&&"active",f&&"completed",h&&"disabled"],line:["line",`line${Ze(i)}`]};return de(a,In,n)},Tn=I("div",{name:"MuiStepConnector",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,n[i.orientation],i.alternativeLabel&&n.alternativeLabel,i.completed&&n.completed]}})(({ownerState:t})=>c({flex:"1 1 auto"},t.orientation==="vertical"&&{marginLeft:12},t.alternativeLabel&&{position:"absolute",top:8+4,left:"calc(-50% + 20px)",right:"calc(50% + 20px)"})),Mn=I("span",{name:"MuiStepConnector",slot:"Line",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.line,n[`line${Ze(i.orientation)}`]]}})(({ownerState:t,theme:n})=>{const i=n.palette.mode==="light"?n.palette.grey[400]:n.palette.grey[600];return c({display:"block",borderColor:n.vars?n.vars.palette.StepConnector.border:i},t.orientation==="horizontal"&&{borderTopStyle:"solid",borderTopWidth:1},t.orientation==="vertical"&&{borderLeftStyle:"solid",borderLeftWidth:1,minHeight:24})}),zn=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiStepConnector"}),{className:p}=o,f=ne(o,En),{alternativeLabel:h,orientation:a="horizontal"}=l.useContext(fe),{active:x,disabled:g,completed:m}=l.useContext(we),r=c({},o,{alternativeLabel:h,orientation:a,active:x,completed:m,disabled:g}),v=Rn(r);return e.jsx(Tn,c({className:G(v.root,p),ref:i,ownerState:r},f,{children:e.jsx(Mn,{className:v.line,ownerState:r})}))}),Pn=zn;function $n(t){return se("MuiStepContent",t)}ae("MuiStepContent",["root","last","transition"]);const An=["children","className","TransitionComponent","transitionDuration","TransitionProps"],Nn=t=>{const{classes:n,last:i}=t;return de({root:["root",i&&"last"],transition:["transition"]},$n,n)},kn=I("div",{name:"MuiStepContent",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,i.last&&n.last]}})(({ownerState:t,theme:n})=>c({marginLeft:12,paddingLeft:8+12,paddingRight:8,borderLeft:n.vars?`1px solid ${n.vars.palette.StepContent.border}`:`1px solid ${n.palette.mode==="light"?n.palette.grey[400]:n.palette.grey[600]}`},t.last&&{borderLeft:"none"})),Dn=I(tt,{name:"MuiStepContent",slot:"Transition",overridesResolver:(t,n)=>n.transition})({}),Fn=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiStepContent"}),{children:p,className:f,TransitionComponent:h=tt,transitionDuration:a="auto",TransitionProps:x}=o,g=ne(o,An);l.useContext(fe);const{active:m,last:r,expanded:v}=l.useContext(we),b=c({},o,{last:r}),S=Nn(b);let L=a;return a==="auto"&&!h.muiSupportAuto&&(L=void 0),e.jsx(kn,c({className:G(S.root,f),ref:i,ownerState:b},g,{children:e.jsx(Dn,c({as:h,in:m||v,className:S.transition,ownerState:b,timeout:L,unmountOnExit:!0},x,{children:p}))}))}),Ye=Fn;function _n(t){return se("MuiStepper",t)}ae("MuiStepper",["root","horizontal","vertical","alternativeLabel"]);const Un=["activeStep","alternativeLabel","children","className","component","connector","nonLinear","orientation"],Wn=t=>{const{orientation:n,alternativeLabel:i,classes:o}=t;return de({root:["root",n,i&&"alternativeLabel"]},_n,o)},Bn=I("div",{name:"MuiStepper",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:i}=t;return[n.root,n[i.orientation],i.alternativeLabel&&n.alternativeLabel]}})(({ownerState:t})=>c({display:"flex"},t.orientation==="horizontal"&&{flexDirection:"row",alignItems:"center"},t.orientation==="vertical"&&{flexDirection:"column"},t.alternativeLabel&&{alignItems:"flex-start"})),Hn=e.jsx(Pn,{}),Gn=l.forwardRef(function(n,i){const o=le({props:n,name:"MuiStepper"}),{activeStep:p=0,alternativeLabel:f=!1,children:h,className:a,component:x="div",connector:g=Hn,nonLinear:m=!1,orientation:r="horizontal"}=o,v=ne(o,Un),b=c({},o,{alternativeLabel:f,orientation:r,component:x}),S=Wn(b),L=l.Children.toArray(h).filter(Boolean),T=L.map((M,y)=>l.cloneElement(M,c({index:y,last:y+1===L.length},M.props))),$=l.useMemo(()=>({activeStep:p,alternativeLabel:f,connector:g,nonLinear:m,orientation:r}),[p,f,g,m,r]);return e.jsx(fe.Provider,{value:$,children:e.jsx(Bn,c({as:x,ownerState:b,className:G(S.root,a),ref:i},v,{children:T}))})}),qe=Gn;function Xe(){const t=Ht`
    mutation updateEssential($essentialInput:EssentialInput) {
      updateEssential(essentialInput:$essentialInput)
    }
  `,[n]=Ke(),i=vt(),[o,p]=l.useState({}),[f,h]=pe.useState(0),[a,x]=pe.useState(""),[g,m]=pe.useState(!1),[r,v]=l.useState(null),[b,S]=l.useState(!1),[L,T]=l.useState(!1),[$,M]=l.useState(-1),[y,F]=l.useState({x:0,y:0}),[z,A]=l.useState(3/4),[C,N]=l.useState(1),[k,E]=l.useState(0),[O,ce]=l.useState(null),[j,W]=l.useState(null),[B,Ie]=l.useState(null),[w,V]=pe.useState("Original"),[U,me]=pe.useState(0),[J,xe]=pe.useState("R"),Y=["Original","Grayscale","Sepia","Vintage","Clarendon","Gingham","Juno","Lark","Mayfair","Sierra","Valencia","Walden"],he=l.useCallback((s,u)=>{ce(u)},[]),ge=l.useCallback(async()=>{try{const s=await St(a.url,O);W(s)}catch(s){console.error(s)}},[O,a.url]),d=l.useCallback(async()=>{try{const s=await Ct(a.url,O,k);x({...a,url:s})}catch(s){console.error(s)}},[O,x,a,k]),R=s=>Math.floor((Date.now()-new Date(s))/(365.25*24*60*60*1e3)),[_,{data:q,loading:ue,error:oe}]=Gt(t),X=_e.object({firstname:re.firstname,lastname:re.lastname,openfor:re.openfor,dateofbirth:_e.string().required(),age:re.validAge,gender:re.gender,genderpreference:re.gender,orientation:re.orientation});l.useEffect(()=>{(async()=>{try{if(j){let u=await Lt(j);const{face_count:K,first_face_accuracy:D,identifiedAs:H}=u;if(K!=1)throw Error("Profile picture must feature the face of exactly one person");if(D<=.8)throw Error("Face must be properly visible");if(H=="neutral"||H=="sexy")v({...u,imagefilter:w,isSafe:!0,isSafeProfilePic:!0});else throw Error("Identifed as "+H)}}catch(u){Ie(u.message)}})()},[j]);const ot=()=>{!X.validate(o).error&&r.isSafeProfilePic&&$>=1&&_({variables:{essentialInput:{firstname:o.firstname,lastname:o.lastname,openfor:o.openfor,dateofbirth:o.dateofbirth,gender:o.gender,genderpreference:o.genderpreference,orientation:o.orientation,profilepic:{imgid:$,url:r.url,icon_url:r.icon_url,filter:r.imagefilter,identifiedAs:r.identifiedAs,isProfileSafe:r.isSafeProfilePic,isSafe:r.isSafe,porn:r.nude_detection.porn,drawing:r.nude_detection.drawing,sexy:r.nude_detection.sexy,hentai:r.nude_detection.hentai,neutral:r.nude_detection.neutral}}},fetchPolicy:"network-only"})},it=(s,u)=>localStorage.setItem(s,JSON.stringify(u)),rt=s=>JSON.parse(localStorage.getItem(s));if(q){console.log("data : ",q);const u={...rt("auth"),hasEssential:!0};it("auth",u),yt(u),i("/explore")}const ze=async()=>{S(!0);const s=await Tt(j,L);s&&(v({...r,...s,filter:w}),S(!1),m(!1))},Pe=({height:s,id:u,imgurl:K,ar:D})=>{const H=async(ie,be)=>{m(!0),M(be);const Ne=ie.target.files[0],Ee=await It(Ne,{maxSizeMB:4,maxWidthOrHeight:2024,useWebWorker:!0});be==1?T(!0):T(!1),x({id:be,url:URL.createObjectURL(Ee),ar:D})},Q=K||j;return e.jsx("div",{style:{padding:5},children:e.jsx("div",{style:{height:s,width:D*s,border:"1px solid #efefef"},children:a.id!==u?e.jsx("div",{style:{display:"flex",justifyContent:"center",flexDirection:D<1?"column":"row",border:"1px solid #fff",height:"100%"},children:e.jsxs(Se,{style:{width:D<1?"100%":"66%",height:D<1?"75%":"100%"},color:"primary","aria-label":"upload picture",component:"label",children:[e.jsx("input",{hidden:!0,accept:"image/*",type:"file",onChange:ie=>{H(ie,u)}}),e.jsx(wt,{})]})}):e.jsx("div",{children:e.jsx("div",{style:{height:"100%",width:"100%",overflowY:"hidden"},children:e.jsx(Re,{filter:w,height:200,width:200*a.ar,image:Q})})})})},u)},st=()=>e.jsx(Ge,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",background:"#fff",width:750,height:400,bgcolor:"background.paper",border:"2px solid #efefef",boxShadow:24,p:4},open:g,onClose:()=>{m(!1)},"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:e.jsx("div",{style:{display:"flex",height:400,justifyContent:"center"},children:e.jsxs("div",{style:{background:"#fff",width:"100%",height:"100%"},children:[e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsxs("div",{style:{fontSize:20,padding:5},children:[" ",j?"Applying Filter : "+w:"Crop"," "]}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{children:e.jsx(P,{color:"error",style:{textTransform:"none"},onClick:()=>{x({id:-1}),W(null),m(!1)},children:e.jsx(Ue,{sx:{fontSize:28}})})})]}),e.jsx("div",{style:{fontSize:18,display:"flex",justifyContent:"center",padding:5}}),e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:10},children:j?e.jsxs("div",{children:[e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{border:"1px solid #fff",display:"flex",justifyContent:"center",flexDirection:"column"},children:e.jsx(Re,{filter:w,height:a.id===3?200:220,width:a.id===3?200*a.ar:220*a.ar,image:j})}),e.jsx("div",{style:{paddingLeft:20,display:"flex",flexDirection:"column"},children:Y.map((s,u)=>u<=5?e.jsx(P,{style:{textTransform:"none",margin:2,border:"1px solid #efefef"},size:"small",onClick:()=>{V(s)},variant:s==w?"contained":"outlined",color:"primary",children:s},u):e.jsx(e.Fragment,{}))}),e.jsx("div",{style:{paddingLeft:5,display:"flex",flexDirection:"column"},children:Y.map((s,u)=>u>5&&u<=12?e.jsx(P,{style:{textTransform:"none",margin:2,border:"1px solid #efefef"},size:"small",onClick:()=>{V(s)},variant:s==w?"contained":"outlined",color:"primary",children:s},u):e.jsx(e.Fragment,{}))})]}),e.jsx("div",{style:{padding:5,paddingBottom:2},children:B?e.jsxs("div",{style:{color:"red"},children:["Error : ",B]}):e.jsx("div",{style:{color:"green"},children:r&&r.isSafeProfilePic?e.jsx("div",{style:{color:"green"},children:"Profile image is safe"}):e.jsxs("div",{style:{width:300,padding:5,color:"#1976d2"},children:[e.jsx("div",{children:e.jsx(Ce,{})}),e.jsx("div",{children:"Validating image with A.I."})]})})}),e.jsx("div",{style:{padding:5,paddingBottom:10},children:b?e.jsxs("div",{style:{width:300,padding:5,color:"#1976d2"},children:[e.jsx("div",{children:e.jsx(Ce,{})}),e.jsx("div",{children:"Uploading"})]}):e.jsx("div",{})}),e.jsx("div",{style:{display:"flex"},children:e.jsx(P,{disabled:r?!r.isSafeProfilePic:!0,onClick:()=>{ze()},style:{textTransform:"none"},variant:"contained",children:"Upload"})})]}):e.jsxs("div",{children:[e.jsx("div",{style:{position:"relative",width:240,height:240,background:"#333"},children:e.jsx(ke,{image:a.url,crop:y,zoom:C,onRotationChange:E,aspect:z,onCropChange:F,onCropComplete:he,onZoomChange:N})}),e.jsxs("div",{style:{display:"flex",paddingTop:10},children:[e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none",border:"1px solid #efefef"},size:"small",onClick:()=>{E(270),d()},startIcon:e.jsx(De,{}),variant:"outlined",color:"primary",children:"Left Rotate"})}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none",border:"1px solid #efefef"},size:"small",onClick:()=>{E(90),d()},variant:"outlined",color:"primary",endIcon:e.jsx(Fe,{}),children:"Right Rotate"})})]}),e.jsx("div",{style:{display:"flex",paddingTop:10},children:e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none"},size:"medium",onClick:()=>{ge()},variant:"contained",color:"primary",children:"Crop & Continue"})})})]})})]})})}),at=()=>e.jsx(Ge,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",background:"#fff",width:"100%",height:"100%",bgcolor:"background.paper",border:"2px solid #efefef",boxShadow:24,p:4},open:g,onClose:()=>{m(!1)},"aria-labelledby":"parent-modal-title","aria-describedby":"parent-modal-description",children:e.jsx("div",{style:{display:"flex",height:"100vh",justifyContent:"center"},children:e.jsxs("div",{style:{background:"#fff",width:"100%",height:"100%",display:"flex",flexDirection:"column"},children:[e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsxs("div",{style:{fontSize:24,paddingLeft:10,paddingTop:10},children:[" ",j?"Applying Filter : "+w:"Crop"," "]}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{children:e.jsx(Se,{color:"error",style:{textTransform:"none"},onClick:()=>{x({id:-1}),W(null),m(!1)},children:e.jsx(Ue,{sx:{fontSize:28}})})})]}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:10},children:j?e.jsx("div",{children:e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{border:"1px solid #fff",display:"flex",justifyContent:"center"},children:e.jsx(Re,{filter:w,height:"60vh",width:n*.8,image:j})}),e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:20,fontSize:18},children:e.jsxs("div",{style:{width:"80%"},children:[e.jsx("div",{style:{padding:5,paddingBottom:2},children:B?e.jsxs("div",{style:{color:"red"},children:["Error : ",B]}):e.jsx("div",{style:{color:"green"},children:r&&r.isSafeProfilePic?e.jsx("div",{style:{color:"green"},children:"Profile image is safe"}):e.jsxs("div",{style:{padding:5,color:"#1976d2"},children:[e.jsx("div",{children:e.jsx(Ce,{})}),e.jsx("div",{children:"Validating Image with AI"})]})})}),e.jsx("div",{style:{padding:5,paddingBottom:5},children:b?e.jsxs("div",{style:{padding:5,color:"#1976d2"},children:[e.jsx("div",{children:e.jsx(Ce,{})}),e.jsx("div",{children:"Uploading"})]}):e.jsx("div",{})})]})}),e.jsx("div",{style:{border:"1px solid #fff",display:"flex",justifyContent:"center"},children:e.jsxs("div",{style:{width:"80%",display:"flex",justifyContent:"center",padding:0,paddingBottom:10,paddingTop:20,border:"1px solid #fff"},children:[e.jsx("div",{children:e.jsx(Se,{disabled:U===0,size:"small",onClick:()=>{U>0&&(V(Y[U-1]),me(U-1),xe("L"))},style:{textTransform:"none",border:J=="L"?"":"1px solid #efefef",background:J=="L"?"#1976d2":"#fff"},children:e.jsx(Et,{sx:{fontSize:32,color:J=="L"?"#fff":"#595959"}})})}),e.jsx("div",{style:{paddingLeft:10},children:e.jsx(Se,{disabled:U===Y.length-1,size:"small",onClick:()=>{U<=Y.length-2&&(V(Y[U+1]),me(U+1),xe("R"))},style:{textTransform:"none",border:J=="R"?"":"1px solid #efefef",background:J=="R"?"#1976d2":"#fff"},children:e.jsx(Rt,{sx:{fontSize:32,color:J=="R"?"#fff":"#595959"}})})}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{display:"flex"},children:e.jsx(P,{disabled:r?!r.isSafeProfilePic:!0,onClick:()=>{ze()},style:{textTransform:"none",border:"1px solid #fff"},variant:"contained",children:"Upload"})})]})})]})}):e.jsxs("div",{children:[e.jsx("div",{style:{position:"relative",width:"100%",height:"70vh",background:"#333"},children:e.jsx(ke,{image:a.url,crop:y,zoom:C,onRotationChange:E,aspect:z,onCropChange:F,onCropComplete:he,onZoomChange:N})}),e.jsxs("div",{style:{display:"flex",paddingTop:10},children:[e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none",border:"1px solid #efefef"},size:"small",onClick:()=>{E(270),d()},variant:"outlined",color:"primary",startIcon:e.jsx(De,{}),children:"Left Rotate"})}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none",border:"1px solid #efefef"},size:"small",onClick:()=>{E(90),d()},variant:"outlined",color:"primary",endIcon:e.jsx(Fe,{}),children:"Right Rotate"})})]}),e.jsx("div",{style:{display:"flex",paddingTop:10},children:e.jsx("div",{children:e.jsx(P,{style:{textTransform:"none"},size:"medium",onClick:()=>{ge()},variant:"contained",color:"primary",children:"Crop & Continue"})})})]})}),e.jsx("div",{style:{flexGrow:1}})]})})}),ve=s=>{const{label:u,value:K,width:D,marginLeft:H,defaultValue:Q,size:ie,min:be,max:Ne,endlabel:ct}=s;return e.jsx(Mt,{style:{marginLeft:H,width:D},defaultValue:Q,onChange:Ee=>{p({...o,[K]:Ee.target.value})},size:ie,label:u,type:"text",variant:"outlined"})},$e=()=>e.jsx(At,{dateAdapter:Nt,children:e.jsx(kt,{components:["DatePicker"],children:e.jsx(Dt,{render:!0,onChange:s=>{p({...o,dateofbirth:JSON.stringify(s),age:R(s)})},slotProps:{textField:{size:"small"},popper:{placement:"top-start",style:{maxHeight:243}}},format:"DD-MM-YYYY",label:"Date of Birth"})})}),Z=s=>{const{minWidth:u,label:K,value:D,menuItemList:H}=s;return e.jsxs(zt,{sx:{m:1,minWidth:u},size:"small",children:[e.jsx(Pt,{children:K}),e.jsxs($t,{defaultValue:"",onChange:Q=>{p({...o,[D]:Q.target.value})},value:o[D],MenuProps:{PaperProps:{style:{maxHeight:300}}},size:"small",label:K,children:[e.jsx(We,{value:"",children:e.jsx("em",{children:"None"})}),H.map((Q,ie)=>e.jsx(We,{value:Q,children:Q},ie))]})]})},Ae=()=>{f==0&&(X.validate(o).error||h(u=>u+1)),f==1&&ot()},ye=[{label:"Enter some basic information about yourself",description:e.jsxs("div",{children:[e.jsx("div",{style:{paddingLeft:8,fontSize:14,color:"#800080",paddingBottom:15},children:"Please note that once you submit your name, gender, orientation and date of birth you won't be able to change this information in future"}),e.jsxs("div",{style:{display:"flex",paddingLeft:2},children:[ve({label:"First Name",size:"small",value:"firstname",width:180,marginLeft:5}),ve({label:"Last Name",size:"small",value:"lastname",width:180,marginLeft:14})]}),e.jsxs("div",{style:{display:"flex",paddingTop:10},children:[Z({value:"openfor",minWidth:150,label:"Open for",menuItemList:["FRIENDSHIP","DATING","MARRIAGE"]}),Z({value:"gender",minWidth:120,label:"Gender",menuItemList:["MALE","FEMALE","OTHER"]}),Z({value:"orientation",minWidth:178,label:"Orientation",menuItemList:["STRAIGHT","HOMOSEXUAL","BISEXUAL","OTHER"]})]}),e.jsx("div",{style:{paddingLeft:8,width:250},children:$e()}),e.jsx("div",{style:{paddingTop:5},children:Z({value:"genderpreference",minWidth:200,label:"Gender Preference",menuItemList:["MALE","FEMALE","OTHER"]})})]}),disabled:X.validate(o).error},{label:"Add your profile picture",description:e.jsx("div",{children:e.jsx("div",{style:{paddingTop:10,paddingBottom:5},children:Pe({height:200,id:1,ar:3/4})})}),disabled:j==null}],je=[{label:"Enter your full name",description:e.jsxs("div",{style:{width:"100%"},children:[e.jsx("div",{style:{paddingLeft:8,fontSize:12,color:"#800080",paddingBottom:15},children:"Please note that once you submit your name, gender, orientation and date of birth you won't be able to change this information in future"}),e.jsx("div",{style:{paddingTop:5,paddingLeft:10},children:ve({label:"First Name",size:"small",value:"firstname",width:180,marginLeft:0})}),e.jsx("div",{style:{paddingTop:10,paddingLeft:10},children:ve({label:"Last Name",size:"small",value:"lastname",width:180,marginLeft:0})}),e.jsx("div",{style:{paddingTop:5,paddingLeft:2},children:Z({value:"openfor",minWidth:150,label:"Open for",menuItemList:["FRIENDSHIP","DATING","MARRIAGE"]})}),e.jsx("div",{style:{paddingTop:0,paddingLeft:2},children:Z({value:"gender",minWidth:120,label:"Gender",menuItemList:["MALE","FEMALE","OTHER"]})}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:Z({value:"orientation",minWidth:178,label:"Orientation",menuItemList:["STRAIGHT","HOMOSEXUAL","BISEXUAL","OTHER"]})}),e.jsx("div",{style:{paddingTop:0,paddingLeft:8,paddingRight:8},children:$e()}),e.jsx("div",{style:{paddingTop:5},children:Z({value:"genderpreference",minWidth:200,label:"Gender Preference",menuItemList:["MALE","FEMALE","OTHER"]})})]}),disabled:X.validate(o).error},{label:"Add your profile picture",description:e.jsx("div",{children:e.jsx("div",{style:{width:250,paddingTop:20},children:Pe({height:200,id:1,ar:3/4})})}),disabled:j==null}],lt=()=>e.jsxs(Le,{sx:{width:550,height:"80vh"},children:[e.jsx("div",{style:{paddingBottom:10},children:st()}),e.jsx(qe,{activeStep:f,orientation:"vertical",children:ye&&ye.map((s,u)=>e.jsxs(Oe,{children:[e.jsx(Je,{optional:u===1?e.jsx(ee,{variant:"caption",children:"Last step"}):null,children:s.label}),e.jsxs(Ye,{children:[e.jsx(ee,{children:s.description}),e.jsx("div",{style:{paddingLeft:8,color:"red"},children:X.validate(o).error&&"Error : "+X.validate(o).error.message}),e.jsx("div",{style:{paddingLeft:8,color:"red"},children:oe&&"Error : "+oe.message}),e.jsx(Le,{sx:{mb:2},children:e.jsx("div",{children:e.jsx(P,{disabled:s.disabled,variant:"contained",onClick:()=>{Ae()},sx:{mt:1,mr:1},children:u===ye.length-1?"Finish":"Continue"})})})]})]},u))}),f===ye.length&&e.jsxs(He,{square:!0,elevation:0,sx:{p:3},children:[e.jsx(ee,{children:"All steps completed - you're finished"}),e.jsx(ee,{children:"Going back to homepage .."})]})]}),dt=()=>e.jsxs(Le,{sx:{maxWidth:300},children:[e.jsx("div",{style:{paddingBottom:10},children:at()}),e.jsx(qe,{activeStep:f,orientation:"vertical",children:je&&je.map((s,u)=>e.jsxs(Oe,{children:[e.jsx(Je,{optional:u===2?e.jsx(ee,{variant:"caption",children:"Last step"}):null,children:s.label}),e.jsxs(Ye,{children:[e.jsx(ee,{children:s.description}),e.jsx("div",{style:{paddingLeft:8,color:"red"},children:X.validate(o).error&&"Error : "+X.validate(o).error.message}),e.jsx("div",{style:{paddingLeft:8,color:"red"},children:oe&&"Error : "+oe.message}),e.jsx(Le,{sx:{mb:2},children:e.jsx("div",{children:e.jsx(P,{disabled:s.disabled,variant:"contained",onClick:()=>{Ae()},sx:{mt:1,mr:1},children:u===je.length-1?"Finish":"Continue"})})})]})]},s.label))}),f===je.length&&e.jsxs(He,{square:!0,elevation:0,sx:{p:3},children:[e.jsx(ee,{children:"All steps completed - you're finished"}),e.jsx(ee,{children:"Going back to homepage .."})]})]});return e.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItem:"center"},children:[n>800?lt():e.jsx(e.Fragment,{}),n<800?dt():e.jsx(e.Fragment,{})]})}const On=()=>{const[t]=Ke(),n=()=>e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:18},children:"Essential Info"}),e.jsx(Xe,{})]}),i=()=>e.jsx("div",{children:e.jsx(Xe,{})});return e.jsxs("div",{style:{display:"flex",justifyContent:"center",alignItem:"center"},children:[t>800?n():e.jsx(e.Fragment,{}),t<800?i():e.jsx(e.Fragment,{})]})},Io=()=>{const t=()=>e.jsx(bt,{children:e.jsx("title",{children:"Essential rawopinion.in"})});return e.jsx("div",{children:e.jsxs(jt,{children:[t(),e.jsx(On,{})]})})};export{Io as default};