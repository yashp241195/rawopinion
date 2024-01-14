import{j as e,a as Ae,g as Oe,s as ae,f as we,_ as C,q as Ie,r as S,u as Be,b as Se,c as re,d as He,t as _e,R as me,C as Pe,L as le}from"./index-c9b6f3db.js";import{A as De}from"./AuthLayoutFullScreen-c62f9763.js";import{P as qe}from"./Profile-507bbe68.js";import{u as Ne,H as $e}from"./Helmet-21af47cd.js";import{B as Ge}from"./NavbarAuth-08c18815.js";import{A as xe,L as ye,d as Ke}from"./index-83b4f9f0.js";import{d as We}from"./MoreVert-8ec84b33.js";import{r as Ue,i as Qe}from"./createSvgIcon-a416b878.js";import{A as ve}from"./Avatar-eea5dbe6.js";import{L as Xe}from"./ListItemText-5dddd07f.js";import{B as b}from"./Button-91d3855e.js";import{I as ue}from"./IconButton-6c2b5903.js";import{a as ge,M as je}from"./Menu-5b85e992.js";import{M as J}from"./MenuItem-bc6ecf75.js";import{u as Ye}from"./useTheme-239bb432.js";import{c as ze,d as ke,u as Je,b as Ze}from"./createSvgIcon-60083042.js";import{u as et,g as be}from"./useIsFocusVisible-672433b0.js";import{u as tt}from"./useQuery-b30a1dc7.js";import{u as it}from"./useMutation-eed3cbaa.js";import"./Refresh-c5117a03.js";import"./Favorite-398d5337.js";import"./FactCheck-82153bdd.js";import"./listItemTextClasses-4ee9e470.js";import"./List-488c0746.js";import"./ArrowBack-76f009fb.js";import"./Grid-e2163307.js";import"./extendSxProp-f96b963a.js";import"./ListItemButton-4a57b46d.js";import"./listItemButtonClasses-2c90cfd8.js";import"./ListItem-62b53da2.js";import"./Typography-ecdde47a.js";import"./TransitionGroupContext-93465ad1.js";const nt={border:0,clip:"rect(0 0 0 0)",height:"1px",margin:-1,overflow:"hidden",padding:0,position:"absolute",whiteSpace:"nowrap",width:"1px"},st=nt,ot=ze(e.jsx("path",{d:"M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"}),"Star"),lt=ze(e.jsx("path",{d:"M22 9.24l-7.19-.62L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27 18.18 21l-1.63-7.03L22 9.24zM12 15.4l-3.76 2.27 1-4.28-3.32-2.88 4.38-.38L12 6.1l1.71 4.04 4.38.38-3.32 2.88 1 4.28L12 15.4z"}),"StarBorder");function rt(t){return Oe("MuiRating",t)}const at=Ae("MuiRating",["root","sizeSmall","sizeMedium","sizeLarge","readOnly","disabled","focusVisible","visuallyHidden","pristine","label","labelEmptyValueActive","icon","iconEmpty","iconFilled","iconHover","iconFocus","iconActive","decimal"]),ne=at,ct=["value"],dt=["className","defaultValue","disabled","emptyIcon","emptyLabelText","getLabelText","highlightSelectedOnly","icon","IconContainerComponent","max","name","onChange","onChangeActive","onMouseLeave","onMouseMove","precision","readOnly","size","value"];function ut(t,i,o){return t<i?i:t>o?o:t}function ft(t){const i=t.toString().split(".")[1];return i?i.length:0}function fe(t,i){if(t==null)return t;const o=Math.round(t/i)*i;return Number(o.toFixed(ft(i)))}const ht=t=>{const{classes:i,size:o,readOnly:h,disabled:z,emptyValueFocused:x,focusVisible:y}=t,L={root:["root",`size${we(o)}`,z&&"disabled",y&&"focusVisible",h&&"readOnly"],label:["label","pristine"],labelEmptyValue:[x&&"labelEmptyValueActive"],icon:["icon"],iconEmpty:["iconEmpty"],iconFilled:["iconFilled"],iconHover:["iconHover"],iconFocus:["iconFocus"],iconActive:["iconActive"],decimal:["decimal"],visuallyHidden:["visuallyHidden"]};return He(L,rt,i)},pt=ae("span",{name:"MuiRating",slot:"Root",overridesResolver:(t,i)=>{const{ownerState:o}=t;return[{[`& .${ne.visuallyHidden}`]:i.visuallyHidden},i.root,i[`size${we(o.size)}`],o.readOnly&&i.readOnly]}})(({theme:t,ownerState:i})=>C({display:"inline-flex",position:"relative",fontSize:t.typography.pxToRem(24),color:"#faaf00",cursor:"pointer",textAlign:"left",WebkitTapHighlightColor:"transparent",[`&.${ne.disabled}`]:{opacity:(t.vars||t).palette.action.disabledOpacity,pointerEvents:"none"},[`&.${ne.focusVisible} .${ne.iconActive}`]:{outline:"1px solid #999"},[`& .${ne.visuallyHidden}`]:st},i.size==="small"&&{fontSize:t.typography.pxToRem(18)},i.size==="large"&&{fontSize:t.typography.pxToRem(30)},i.readOnly&&{pointerEvents:"none"})),Me=ae("label",{name:"MuiRating",slot:"Label",overridesResolver:({ownerState:t},i)=>[i.label,t.emptyValueFocused&&i.labelEmptyValueActive]})(({ownerState:t})=>C({cursor:"inherit"},t.emptyValueFocused&&{top:0,bottom:0,position:"absolute",outline:"1px solid #999",width:"100%"})),mt=ae("span",{name:"MuiRating",slot:"Icon",overridesResolver:(t,i)=>{const{ownerState:o}=t;return[i.icon,o.iconEmpty&&i.iconEmpty,o.iconFilled&&i.iconFilled,o.iconHover&&i.iconHover,o.iconFocus&&i.iconFocus,o.iconActive&&i.iconActive]}})(({theme:t,ownerState:i})=>C({display:"flex",transition:t.transitions.create("transform",{duration:t.transitions.duration.shortest}),pointerEvents:"none"},i.iconActive&&{transform:"scale(1.2)"},i.iconEmpty&&{color:(t.vars||t).palette.action.disabled})),xt=ae("span",{name:"MuiRating",slot:"Decimal",shouldForwardProp:t=>Ie(t)&&t!=="iconActive",overridesResolver:(t,i)=>{const{iconActive:o}=t;return[i.decimal,o&&i.iconActive]}})(({iconActive:t})=>C({position:"relative"},t&&{transform:"scale(1.2)"}));function yt(t){const i=Se(t,ct);return e.jsx("span",C({},i))}function Ce(t){const{classes:i,disabled:o,emptyIcon:h,focus:z,getLabelText:x,highlightSelectedOnly:y,hover:L,icon:_,IconContainerComponent:$,isActive:k,itemValue:s,labelProps:A,name:M,onBlur:g,onChange:n,onClick:d,onFocus:v,readOnly:G,ownerState:a,ratingValue:T,ratingValueRounded:P}=t,V=y?s===T:s<=T,E=s<=L,O=s<=z,K=s===P,w=ke(),j=e.jsx(mt,{as:$,value:s,className:re(i.icon,V?i.iconFilled:i.iconEmpty,E&&i.iconHover,O&&i.iconFocus,k&&i.iconActive),ownerState:C({},a,{iconEmpty:!V,iconFilled:V,iconHover:E,iconFocus:O,iconActive:k}),children:h&&!V?h:_});return G?e.jsx("span",C({},A,{children:j})):e.jsxs(S.Fragment,{children:[e.jsxs(Me,C({ownerState:C({},a,{emptyValueFocused:void 0}),htmlFor:w},A,{children:[j,e.jsx("span",{className:i.visuallyHidden,children:x(s)})]})),e.jsx("input",{className:i.visuallyHidden,onFocus:v,onBlur:g,onChange:n,onClick:d,disabled:o,value:s,id:w,type:"radio",name:M,checked:K})]})}const vt=e.jsx(ot,{fontSize:"inherit"}),gt=e.jsx(lt,{fontSize:"inherit"});function jt(t){return`${t} Star${t!==1?"s":""}`}const bt=S.forwardRef(function(i,o){const h=Be({name:"MuiRating",props:i}),{className:z,defaultValue:x=null,disabled:y=!1,emptyIcon:L=gt,emptyLabelText:_="Empty",getLabelText:$=jt,highlightSelectedOnly:k=!1,icon:s=vt,IconContainerComponent:A=yt,max:M=5,name:g,onChange:n,onChangeActive:d,onMouseLeave:v,onMouseMove:G,precision:a=1,readOnly:T=!1,size:P="medium",value:V}=h,E=Se(h,dt),O=ke(g),[K,w]=Je({controlled:V,default:x,name:"Rating"}),j=fe(K,a),ce=Ye(),[{hover:R,focus:W},D]=S.useState({hover:-1,focus:-1});let B=j;R!==-1&&(B=R),W!==-1&&(B=W);const{isFocusVisibleRef:se,onBlur:l,onFocus:r,ref:u}=et(),[p,f]=S.useState(!1),U=S.useRef(),q=Ze(u,U,o),ee=c=>{G&&G(c);const m=U.current,{right:F,left:oe}=m.getBoundingClientRect(),{width:X}=m.firstChild.getBoundingClientRect();let Y;ce.direction==="rtl"?Y=(F-c.clientX)/(X*M):Y=(c.clientX-oe)/(X*M);let I=fe(M*Y+a/2,a);I=ut(I,a,M),D(N=>N.hover===I&&N.focus===I?N:{hover:I,focus:I}),f(!1),d&&R!==I&&d(c,I)},te=c=>{v&&v(c);const m=-1;D({hover:m,focus:m}),d&&R!==m&&d(c,m)},Q=c=>{let m=c.target.value===""?null:parseFloat(c.target.value);R!==-1&&(m=R),w(m),n&&n(c,m)},Re=c=>{c.clientX===0&&c.clientY===0||(D({hover:-1,focus:-1}),w(null),n&&parseFloat(c.target.value)===j&&n(c,null))},Fe=c=>{r(c),se.current===!0&&f(!0);const m=parseFloat(c.target.value);D(F=>({hover:F.hover,focus:m}))},Le=c=>{if(R!==-1)return;l(c),se.current===!1&&f(!1);const m=-1;D(F=>({hover:F.hover,focus:m}))},[Ve,pe]=S.useState(!1),ie=C({},h,{defaultValue:x,disabled:y,emptyIcon:L,emptyLabelText:_,emptyValueFocused:Ve,focusVisible:p,getLabelText:$,icon:s,IconContainerComponent:A,max:M,precision:a,readOnly:T,size:P}),H=ht(ie);return e.jsxs(pt,C({ref:q,onMouseMove:ee,onMouseLeave:te,className:re(H.root,z,T&&"MuiRating-readOnly"),ownerState:ie,role:T?"img":null,"aria-label":T?$(B):null},E,{children:[Array.from(new Array(M)).map((c,m)=>{const F=m+1,oe={classes:H,disabled:y,emptyIcon:L,focus:W,getLabelText:$,highlightSelectedOnly:k,hover:R,icon:s,IconContainerComponent:A,name:O,onBlur:Le,onChange:Q,onClick:Re,onFocus:Fe,ratingValue:B,ratingValueRounded:j,readOnly:T,ownerState:ie},X=F===Math.ceil(B)&&(R!==-1||W!==-1);if(a<1){const Y=Array.from(new Array(1/a));return e.jsx(xt,{className:re(H.decimal,X&&H.iconActive),ownerState:ie,iconActive:X,children:Y.map((I,N)=>{const de=fe(F-1+(N+1)*a,a);return e.jsx(Ce,C({},oe,{isActive:!1,itemValue:de,labelProps:{style:Y.length-1===N?{}:{width:de===B?`${(N+1)*a*100}%`:"0%",overflow:"hidden",position:"absolute"}}}),de)})},F)}return e.jsx(Ce,C({},oe,{isActive:X,itemValue:F}),F)}),!T&&!y&&e.jsxs(Me,{className:re(H.label,H.labelEmptyValue),ownerState:ie,children:[e.jsx("input",{className:H.visuallyHidden,value:"",id:`${O}-empty`,type:"radio",name:O,checked:j==null,onFocus:()=>pe(!0),onBlur:()=>pe(!1),onChange:Q}),e.jsx("span",{className:H.visuallyHidden,children:_})]})]}))}),Z=bt;var he={},Ct=Qe;Object.defineProperty(he,"__esModule",{value:!0});var Te=he.default=void 0;zt(S);var wt=Ct(Ue()),St=e;function Ee(t){if(typeof WeakMap!="function")return null;var i=new WeakMap,o=new WeakMap;return(Ee=function(h){return h?o:i})(t)}function zt(t,i){if(!i&&t&&t.__esModule)return t;if(t===null||typeof t!="object"&&typeof t!="function")return{default:t};var o=Ee(i);if(o&&o.has(t))return o.get(t);var h={},z=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var x in t)if(x!=="default"&&Object.prototype.hasOwnProperty.call(t,x)){var y=z?Object.getOwnPropertyDescriptor(t,x):null;y&&(y.get||y.set)?Object.defineProperty(h,x,y):h[x]=t[x]}return h.default=t,o&&o.set(t,h),h}var kt=(0,wt.default)((0,St.jsx)("path",{d:"M9.78 18.65l.28-4.23 7.68-6.92c.34-.31-.07-.46-.52-.19L7.74 13.3 3.64 12c-.88-.25-.89-.86.2-1.3l15.97-6.16c.73-.33 1.43.18 1.15 1.3l-2.72 12.81c-.19.91-.74 1.13-1.5.71L12.6 16.3l-1.99 1.93c-.23.23-.42.42-.83.42z"}),"Telegram");Te=he.default=kt;const Mt=()=>{const[t]=Ne(),[i]=_e(),o=be`
    query GetMatches{
      getMatches{
        username firstname lastname
        pic lastseen communicationScore 
      }
    }
  `,h=be`
    mutation SendRequest($requestInput:RequestInput){
      sendRequest(requestInput:$requestInput)
    }
  `,{data:z,loading:x,error:y}=tt(o,{fetchPolicy:"network-only"}),[L,{data:_,loading:$,error:k}]=it(h,{fetchPolicy:"network-only"}),[s,A]=S.useState(null),[M,g]=S.useState(!1),[n,d]=me.useState(null),[v,G]=S.useState(-1),[a,T]=S.useState(null),[P,V]=me.useState(null),E=!!P,O=(l,r)=>{G(r),V(l.currentTarget)},K=()=>{V(null)},w=l=>{T(l),g(!0),V(null)};z&&(s||z.getMatches&&A(z.getMatches)),y&&console.log("error",y),S.useEffect(()=>{if(_){const{username:l}=s[v];switch(a){case"GIVE_FEEDBACK":break;case"REMOVE_MATCH":const r=s.filter(p=>p.username!==l);A(r);break;case"BLOCK":const u=s.filter(p=>p.username!==l);A(u);break}g(!1)}},[_]);const j=()=>{const{username:l}=s[v];if(l)switch(a){case"GIVE_FEEDBACK":n&&n.texting&&n.speaking&&n.listening&&L({variables:{requestInput:{username:l,communication:{texting:n&&n.texting,speaking:n&&n.speaking,listening:n&&n.listening}}},fetchPolicy:"network-only"});break;case"REMOVE_MATCH":L({variables:{requestInput:{username:l,reqStatus:"UNMATCH"}},fetchPolicy:"network-only"});break;case"BLOCK":L({variables:{requestInput:{username:l,reqStatus:"BLOCK"}},fetchPolicy:"network-only"});break}},ce=({key:l,index:r,style:u})=>{const{username:p,firstname:f,lastname:U,communicationScore:q,lastseen:ee,pic:te}=s[r];return e.jsx("div",{style:{...u,width:"97%"},children:e.jsxs("div",{style:{display:"flex",border:"1px solid #fafafa",height:85},children:[e.jsx("div",{style:{paddingLeft:10,paddingTop:5},children:e.jsxs("div",{style:{display:"flex",width:300},children:[e.jsx("div",{style:{paddingTop:7},children:e.jsx(ve,{variant:"round",src:te,sx:{height:60,width:60}})}),e.jsx("div",{style:{paddingLeft:20,paddingTop:0,width:300},children:e.jsx(Xe,{sx:{width:300},primary:e.jsx("div",{style:{fontSize:16},children:e.jsxs(le,{style:{color:"#000"},to:"/profile/view/"+p,children:[f," ",U]})}),secondary:e.jsxs("div",{children:[e.jsx("div",{style:{fontSize:13},children:q&&"Communication Score : "+q+"/5"}),e.jsx("div",{style:{fontSize:13},children:ee})]})})})]})}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{paddingTop:30},children:e.jsx(le,{to:"/message/"+p,children:e.jsx(b,{size:"small",style:{textTransform:"none",border:"1px solid #efefef"},variant:"outlined",endIcon:e.jsx(Ge,{}),children:"Message"})})}),e.jsxs("div",{style:{paddingTop:5,paddingLeft:15},children:[e.jsx(ue,{size:"small",id:"basic-button","aria-controls":E?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":E?"true":void 0,onClick:Q=>{O(Q,r)},children:e.jsx(Ke,{})}),e.jsxs(ge,{id:"basic-menu",anchorEl:P,open:E,onClose:K,slotProps:{paper:{sx:{border:"1px solid #efefef",boxShadow:"0px 5px 5px #efefef"}}},MenuListProps:{"aria-labelledby":"basic-button"},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},children:[e.jsx(J,{style:{fontSize:12,fontWeight:"bold",color:"#595959"},value:1,onClick:()=>w("GIVE_FEEDBACK"),children:"Give communication feedback"}),e.jsx(J,{style:{fontSize:12,fontWeight:"bold",color:"#595959"},value:2,onClick:()=>w("REMOVE_MATCH"),children:"Remove Match"}),e.jsx(J,{style:{fontSize:12,fontWeight:"bold",color:"#595959"},value:3,onClick:()=>w("BLOCK"),children:"Block"})]})]}),e.jsx("div",{style:{width:10}})]})},l)},R=({key:l,index:r,style:u})=>{const{username:p,firstname:f,lastname:U,communicationScore:q,lastseen:ee,pic:te}=s[r];return e.jsx("div",{style:{...u},children:e.jsxs("div",{style:{display:"flex",border:"1px solid #fafafa",width:"97%",paddingTop:10,paddingBottom:10,borderRadius:5},children:[e.jsx("div",{style:{flexGrow:1},children:e.jsx(le,{style:{color:"#000",textDecoration:"none"},to:"/profile/view/"+p,children:e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{paddingTop:0,paddingRight:7,paddingLeft:7},children:e.jsx(ve,{src:te,variant:"round",sx:{height:50,width:50}})}),e.jsxs("div",{style:{flexGrow:1},children:[e.jsxs("div",{style:{fontSize:"1rem",paddingTop:0},children:[f," ",U]}),e.jsxs("div",{style:{paddingTop:2},children:[e.jsx("div",{style:{fontSize:"0.8rem",color:"#595959"},children:q&&"Communication : "+q+"/5"}),e.jsx("div",{style:{fontSize:"0.8rem",color:"#595959"},children:ee})]})]})]})})}),e.jsxs("div",{style:{display:"flex"},children:[e.jsxs("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center"},children:[e.jsx(ue,{size:"small",id:"basic-button","aria-controls":E?"basic-menu":void 0,"aria-haspopup":"true","aria-expanded":E?"true":void 0,onClick:Q=>{O(Q,r)},children:e.jsx(We,{sx:{fontSize:22}})}),e.jsxs(ge,{id:"basic-menu",anchorEl:P,open:E,onClose:K,slotProps:{paper:{sx:{boxShadow:"0px 2px 2px #efefef"}}},MenuListProps:{"aria-labelledby":"basic-button"},anchorOrigin:{vertical:"bottom",horizontal:"right"},transformOrigin:{vertical:"top",horizontal:"right"},size:"small",children:[e.jsx(J,{style:{fontSize:12},value:1,onClick:()=>w("GIVE_FEEDBACK"),children:"Give communication feedback"}),e.jsx(J,{style:{fontSize:12},value:2,onClick:()=>w("REMOVE_MATCH"),children:"Remove Match"}),e.jsx(J,{style:{fontSize:12},value:3,onClick:()=>w("BLOCK"),children:"Block"})]})]}),e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",border:"1px solid #fff"},children:e.jsx(ue,{size:"small",style:{textTransform:"none"},variant:"outlined",children:e.jsx(le,{to:"/message/"+p,children:e.jsx(Te,{style:{fontSize:26,color:"#595959"}})})})})]})]})},l)},W=()=>{let l="";if(a=="GIVE_FEEDBACK"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",justifyContent:"center",border:"1 px solid #efefef",background:"#fff",height:250,width:400},children:e.jsxs("div",{style:{display:"flex",flexDirection:"column",width:270},children:[e.jsxs("div",{style:{fontSize:20,paddingTop:8},children:["Give feedback to ",r," ",u]}),e.jsx("div",{style:{flexGrow:1}}),e.jsxs("div",{style:{display:"flex",fontSize:18,paddingTop:10},children:[e.jsx("div",{style:{width:80},children:"Texting"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.texting,onChange:(p,f)=>{d({...n,texting:f})}})})]}),e.jsxs("div",{style:{display:"flex",fontSize:18,paddingTop:10},children:[e.jsx("div",{style:{width:80},children:"Speaking"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.speaking,onChange:(p,f)=>{d({...n,speaking:f})}})})]}),e.jsxs("div",{style:{display:"flex",fontSize:18,paddingTop:10},children:[e.jsx("div",{style:{width:80},children:"Listening"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.listening,onChange:(p,f)=>{d({...n,listening:f})}})})]}),e.jsx("div",{style:{flexGrow:1}}),e.jsxs("div",{style:{fontSize:14,paddingTop:10,color:"#595959"},children:["Only total score will be notified to ",r]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't send feedback"}),e.jsxs("div",{style:{paddingTop:10},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",variant:"contained",children:"Submit Feedback"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"contained",children:"Cancel"})]}),e.jsx("div",{style:{flexGrow:1}})]})})}if(a=="REMOVE_MATCH"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",justifyContent:"center",border:"1 px solid #fff",background:"#fff",height:250,width:400},children:e.jsxs("div",{style:{paddingTop:70,width:250},children:[e.jsxs("div",{style:{fontSize:20},children:["Do you really wish to unmatch with ",r," ?"]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't remove match"}),e.jsxs("div",{style:{paddingTop:30},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",color:"error",variant:"contained",children:"Unmatch"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"outlined",children:"No"})]})]})})}if(a=="BLOCK"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",justifyContent:"center",border:"1 px solid #fff",background:"#fff",height:250,width:400},children:e.jsxs("div",{style:{paddingTop:70,width:250},children:[e.jsxs("div",{style:{fontSize:20},children:["Do you really wish to block ",r," ?"]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't block"}),e.jsxs("div",{style:{paddingTop:30},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",color:"error",variant:"contained",children:"Block"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"outlined",children:"No"})]})]})})}return e.jsx(je,{style:{position:"absolute",top:"35%",left:"50%",transform:"translate(-50%, -50%)",background:"#fff",width:400,height:250,backgroundColor:"#ffffff00",border:"2px solid #efefef",boxShadow:24,p:4},open:M,onClose:()=>{g(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:e.jsx("div",{style:{display:"flex",height:"60vh",justifyContent:"center"},children:l})})},D=()=>{let l="";if(a=="GIVE_FEEDBACK"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",border:"1 px solid #efefef",background:"#fff",height:"100vh",width:"100%"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsxs("div",{style:{width:250},children:[e.jsxs("div",{style:{fontSize:20},children:["Give feedback to ",r," ",u]}),e.jsxs("div",{style:{display:"flex",fontSize:16,paddingTop:20},children:[e.jsx("div",{style:{width:80},children:"Texting"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.texting,onChange:(p,f)=>{d({...n,texting:f})}})})]}),e.jsxs("div",{style:{display:"flex",fontSize:16,paddingTop:10},children:[e.jsx("div",{style:{width:80},children:"Speaking"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.speaking,onChange:(p,f)=>{d({...n,speaking:f})}})})]}),e.jsxs("div",{style:{display:"flex",fontSize:16,paddingTop:10},children:[e.jsx("div",{style:{width:80},children:"Listening"}),e.jsx("div",{children:e.jsx(Z,{size:"small",name:"simple-controlled",value:n&&n.listening,onChange:(p,f)=>{d({...n,listening:f})}})})]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't send feedback"}),e.jsxs("div",{style:{paddingTop:15},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",variant:"contained",children:"Submit Feedback"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"contained",children:"Cancel"})]})]})})})}if(a=="REMOVE_MATCH"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",border:"1 px solid #efefef",background:"#fff",height:"100vh",width:"100%"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsxs("div",{style:{width:250},children:[e.jsxs("div",{style:{fontSize:20},children:["Do you really wish to unmatch with ",r," ?"]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't remove match"}),e.jsxs("div",{style:{paddingTop:30},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",color:"error",variant:"contained",children:"Unmatch"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"outlined",children:"No"})]})]})})})}if(a=="BLOCK"){const{firstname:r,lastname:u}=s[v];l=e.jsx("div",{style:{display:"flex",flexDirection:"column",justifyContent:"center",border:"1 px solid #efefef",background:"#fff",height:"100vh",width:"100%"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsxs("div",{style:{width:250},children:[e.jsxs("div",{style:{fontSize:20},children:["Do you really wish to block ",r," ?"]}),e.jsx("div",{style:{color:"red"},children:k&&"Error : Can't block"}),e.jsxs("div",{style:{paddingTop:30},children:[e.jsx(b,{onClick:()=>{j()},style:{textTransform:"none"},size:"small",color:"error",variant:"contained",children:"Block"}),e.jsx(b,{onClick:()=>{g(!1),d(null)},color:"error",style:{textTransform:"none",marginLeft:10},size:"small",variant:"outlined",children:"No"})]})]})})})}return e.jsx(je,{style:{position:"absolute",top:"50%",left:"50%",transform:"translate(-50%, -50%)",background:"#fff",width:"100%",height:"100%",bgcolor:"background.paper",border:"2px solid #efefef",boxShadow:24,p:4},open:M,onClose:()=>{g(!1)},"aria-labelledby":"modal-modal-title","aria-describedby":"modal-modal-description",children:e.jsx("div",{style:{display:"flex",height:"60vh",justifyContent:"center"},children:l})})},B=()=>e.jsxs("div",{children:[v>=0?W():e.jsx(e.Fragment,{}),e.jsx("div",{style:{fontSize:22,paddingBottom:15},children:"Matches"}),e.jsx("div",{style:{height:350,width:560},children:s&&s.length>0?e.jsx(xe,{children:({width:l,height:r})=>e.jsx(ye,{width:l*.98,height:r,rowCount:s.length,rowHeight:90,rowRenderer:ce,scrollToIndex:s.findIndex(u=>u.username===i.get("user"))})}):e.jsx("div",{style:{color:"#595959",fontSize:16},children:"No match found"})})]}),se=()=>e.jsxs("div",{children:[v>=0?D():e.jsx(e.Fragment,{}),e.jsx("div",{style:{height:"85vh"},children:s&&s.length>0?e.jsx(xe,{children:({width:l,height:r})=>e.jsx(ye,{width:l*1,height:r,rowCount:s.length,rowHeight:80,rowRenderer:R,scrollToIndex:s.findIndex(u=>u.username===i.get("user"))})}):e.jsx("div",{style:{display:"flex",justifyContent:"center",color:"#595959",fontSize:20},children:"No match found"})})]});return e.jsx("div",{style:{},children:x?e.jsx("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(Pe,{})})}):e.jsxs("div",{children:[t>800?B():e.jsx(e.Fragment,{}),t<800?se():e.jsx(e.Fragment,{})]})})},li=()=>{const t=()=>e.jsx($e,{children:e.jsx("title",{children:"MyMatches rawopinion.in"})});return e.jsxs(De,{children:[t(),e.jsx(qe,{children:e.jsx(Mt,{})})]})};export{li as default};
