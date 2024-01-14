import{p as _,i as F,j as e,N as G,L as d}from"./index-c9b6f3db.js";import{A as E}from"./AuthLayout-be952755.js";import{u as I,H as D}from"./Helmet-21af47cd.js";import{d as O}from"./Favorite-398d5337.js";import{L as o,d as k,a as A,b as B}from"./FactCheck-82153bdd.js";import{a as $}from"./NavbarAuth-08c18815.js";import{G as H}from"./Grid-e2163307.js";import{L as m}from"./List-488c0746.js";import{L as r}from"./ListItemButton-4a57b46d.js";import{L as s}from"./ListItem-62b53da2.js";import{A as M}from"./Avatar-eea5dbe6.js";import{L as l}from"./ListItemText-5dddd07f.js";import{a as N,g as x}from"./useIsFocusVisible-672433b0.js";import{u as T}from"./useMutation-eed3cbaa.js";import{u as b}from"./useQuery-b30a1dc7.js";import"./Refresh-c5117a03.js";import"./createSvgIcon-a416b878.js";import"./createSvgIcon-60083042.js";import"./Button-91d3855e.js";import"./TransitionGroupContext-93465ad1.js";import"./listItemTextClasses-4ee9e470.js";import"./useTheme-239bb432.js";import"./extendSxProp-f96b963a.js";import"./listItemButtonClasses-2c90cfd8.js";import"./Typography-ecdde47a.js";const q=n=>{const[a]=I(),p=_(),h=F(),u=N(),j=[{name:"Matches",url:"/profile/matches",icon:e.jsx(O,{sx:{fontSize:28}}),state:!1},{name:"Edit Profile",url:"/profile/user/edit/profile",icon:e.jsx(k,{sx:{fontSize:28}}),state:!1},{name:"Edit Preferences",url:"/profile/user/edit/preference",icon:e.jsx(A,{sx:{fontSize:28}}),state:!1},{name:"Settings",url:"/profile/settings",icon:e.jsx(B,{sx:{fontSize:28}}),state:!1}],y=x`
    mutation Logout{
        logout
    }
  `,g=x`
    query GetProfileView{
      getProfileView{
        firstname
        lastname
        profileinfo{
          imageGallery{
            imgid url  icon_url
          }
          location{
            address
          }
        }
        age
      }
    }

  `,[L,{loading:C,error:R,data:v}]=T(y,{fetchPolicy:"network-only"}),{data:i,loading:W,error:Q}=b(g,{fetchPolicy:"cache-and-network"});v&&(u.clearStore(),localStorage.clear(),h("/"));const w=()=>e.jsx(H,{container:!0,children:e.jsx(G,{to:"/profile/show"})}),P=()=>{const f=i&&i.getProfileView.profileinfo.imageGallery.filter(t=>t.imgid==1)[0].icon_url;return e.jsxs("div",{style:{width:"100%",display:"flex",flexDirection:"column",height:"70vh"},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{},children:e.jsx(m,{dense:!0,children:e.jsx(d,{style:{textDecoration:"none",color:"#595959",fontFamily:"serif"},to:"/profile/show",children:e.jsx(r,{children:e.jsxs(s,{sx:{profilepic:f},children:[e.jsx(o,{children:e.jsx(M,{src:f,sx:{height:68,width:68}})}),e.jsx(l,{primary:e.jsx("div",{style:{paddingLeft:10},children:e.jsxs("div",{style:{fontSize:24,color:"#000",fontFamily:"serif"},children:[i&&i.getProfileView.firstname+", "," ",i&&i.getProfileView.age]})}),secondary:e.jsxs("div",{style:{paddingLeft:10},children:[e.jsx("div",{style:{fontSize:14,color:"#595959",fontFamily:"serif"},children:i&&i.getProfileView.profileinfo.location&&i.getProfileView.profileinfo.location.address}),e.jsx("div",{style:{fontSize:12,color:"#1976d2",fontFamily:"sans-serif"},children:"View full profile ->"})]})})]})})})})}),e.jsx("div",{style:{},children:e.jsxs(m,{dense:!0,children:[j.map((t,S)=>{const{name:z,url:c,icon:V,state:U}=t;return p.pathname,e.jsx("div",{style:{height:50},children:e.jsx(d,{style:{textDecoration:"none",color:"#595959"},to:c,children:e.jsx(r,{children:e.jsxs(s,{sx:{},children:[e.jsx(o,{children:V}),e.jsx(l,{primary:e.jsx("div",{style:{fontSize:16,color:"#595959",fontFamily:"serif"},children:z})})]})})})},S)}),e.jsx(r,{onClick:()=>{L()},style:{textDecoration:"none"},children:e.jsxs(s,{sx:{},children:[e.jsx(o,{children:e.jsx($,{sx:{fontSize:24}})}),e.jsx(l,{primary:e.jsx("div",{style:{fontSize:16,color:"#595959",fontFamily:"serif"},children:"Logout"})})]})})]})}),e.jsx("div",{style:{flexGrow:1}})]})};return e.jsxs("div",{style:{display:"flex"},children:[a>800?w():e.jsx(e.Fragment,{}),a<800?P():e.jsx(e.Fragment,{})]})},Le=()=>{const n=()=>e.jsx(D,{children:e.jsx("title",{children:"Profile rawopinion.in"})});return e.jsxs(E,{children:[n(),e.jsx("div",{children:e.jsx(q,{})})]})};export{Le as default};
