import{j as t,a as j,g as P,s as B,e as S,f as u,_ as n,h as g,r as p,u as M,b as R,c as _,d as H}from"./index-c9b6f3db.js";import{S as E}from"./SwitchBase-d9541667.js";import{c as h}from"./createSvgIcon-60083042.js";const O=h(t.jsx("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),U=h(t.jsx("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),V=h(t.jsx("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function L(o){return P("MuiCheckbox",o)}const N=j("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary","sizeSmall","sizeMedium"]),m=N,w=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],F=o=>{const{classes:e,indeterminate:c,color:a,size:r}=o,s={root:["root",c&&"indeterminate",`color${u(a)}`,`size${u(r)}`]},l=H(s,L,e);return n({},e,l)},T=B(E,{shouldForwardProp:o=>S(o)||o==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(o,e)=>{const{ownerState:c}=o;return[e.root,c.indeterminate&&e.indeterminate,c.color!=="default"&&e[`color${u(c.color)}`]]}})(({theme:o,ownerState:e})=>n({color:(o.vars||o).palette.text.secondary},!e.disableRipple&&{"&:hover":{backgroundColor:o.vars?`rgba(${e.color==="default"?o.vars.palette.action.activeChannel:o.vars.palette.primary.mainChannel} / ${o.vars.palette.action.hoverOpacity})`:g(e.color==="default"?o.palette.action.active:o.palette[e.color].main,o.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},e.color!=="default"&&{[`&.${m.checked}, &.${m.indeterminate}`]:{color:(o.vars||o).palette[e.color].main},[`&.${m.disabled}`]:{color:(o.vars||o).palette.action.disabled}})),W=t.jsx(U,{}),q=t.jsx(O,{}),A=t.jsx(V,{}),D=p.forwardRef(function(e,c){var a,r;const s=M({props:e,name:"MuiCheckbox"}),{checkedIcon:l=W,color:b="primary",icon:I=q,indeterminate:i=!1,indeterminateIcon:x=A,inputProps:z,size:d="medium",className:$}=s,y=R(s,w),C=i?x:I,k=i?x:l,v=n({},s,{color:b,indeterminate:i,size:d}),f=F(v);return t.jsx(T,n({type:"checkbox",inputProps:n({"data-indeterminate":i},z),icon:p.cloneElement(C,{fontSize:(a=C.props.fontSize)!=null?a:d}),checkedIcon:p.cloneElement(k,{fontSize:(r=k.props.fontSize)!=null?r:d}),ownerState:v,ref:c,className:_(f.root,$)},y,{classes:f}))}),Q=D;export{Q as C};