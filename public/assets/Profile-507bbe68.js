import{p as h,j as e,L as a}from"./index-c9b6f3db.js";import{u}from"./Helmet-21af47cd.js";import{d as j}from"./NavbarAuth-08c18815.js";import{d as g}from"./Favorite-398d5337.js";import{L,d as y,a as v,b as w}from"./FactCheck-82153bdd.js";import{d as I}from"./ArrowBack-76f009fb.js";import{G as s}from"./Grid-e2163307.js";import{L as B}from"./List-488c0746.js";import{L as _}from"./ListItemButton-4a57b46d.js";import{L as P}from"./ListItem-62b53da2.js";import{L as $}from"./ListItemText-5dddd07f.js";import{I as S}from"./IconButton-6c2b5903.js";const q=i=>{const[r]=u(),o=h(),n=[{name:"Your Profile",url:"/profile/show",icon:e.jsx(j,{}),state:!1},{name:"Matches",url:"/profile/matches",icon:e.jsx(g,{}),state:!1},{name:"Edit Profile",url:"/profile/user/edit/profile",icon:e.jsx(y,{}),state:!1},{name:"Edit Preferences",url:"/profile/user/edit/preference",icon:e.jsx(v,{}),state:!1},{name:"Settings",url:"/profile/settings",icon:e.jsx(w,{}),state:!1}],d=()=>e.jsxs(s,{container:!0,children:[e.jsx(s,{item:!0,xs:3,style:{marginLeft:30,height:"75vh"},children:e.jsx(B,{dense:!0,children:n.map((t,m)=>{const{name:f,url:l,icon:p,state:z}=t,x=o.pathname===l?"#3B3B3B":"#979797";return e.jsx("div",{children:e.jsx(a,{style:{textDecoration:"none",color:x},to:l,children:e.jsx(_,{children:e.jsxs(P,{children:[e.jsx(L,{children:p}),e.jsx($,{primary:f})]})})})},m)})})}),e.jsx(s,{item:!0,xs:8,style:{paddingLeft:10,height:"75vh",overflowY:"auto"},children:i.children})]}),c=()=>e.jsxs("div",{style:{width:"100%",padding:10},children:[e.jsxs("div",{style:{display:"flex",paddingBottom:5},children:[e.jsx("div",{style:{padding:5},children:e.jsx(a,{style:{textDecoration:"none",color:"#000"},to:"/profile/options",children:e.jsx(S,{children:e.jsx(I,{style:{fontSize:22,color:"#000"}})})})}),e.jsx("div",{style:{fontSize:22,padding:10},children:n.filter(t=>t.url===o.pathname)[0].name})]}),e.jsx("div",{style:{height:"85vh"},children:i.children})]});return e.jsxs("div",{style:{display:"flex"},children:[r>800?d():e.jsx(e.Fragment,{}),r<800?c():e.jsx(e.Fragment,{})]})};export{q as P};
