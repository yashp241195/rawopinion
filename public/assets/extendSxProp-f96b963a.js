import{b as u,_ as i,a8 as c,a9 as f}from"./index-c9b6f3db.js";const x=["sx"],P=t=>{var s,o;const n={systemProps:{},otherProps:{}},r=(s=t==null||(o=t.theme)==null?void 0:o.unstable_sxConfig)!=null?s:c;return Object.keys(t).forEach(e=>{r[e]?n.systemProps[e]=t[e]:n.otherProps[e]=t[e]}),n};function m(t){const{sx:s}=t,o=u(t,x),{systemProps:n,otherProps:r}=P(o);let e;return Array.isArray(s)?e=[n,...s]:typeof s=="function"?e=(...a)=>{const l=s(...a);return f(l)?i({},n,l):n}:e=i({},n,s),i({},r,{sx:e})}export{m as e};
