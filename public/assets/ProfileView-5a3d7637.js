import{j as e,r as P,p as ce,C as fe,L as K}from"./index-c9b6f3db.js";import{u as je}from"./Helmet-21af47cd.js";import{r as D,i as M}from"./createSvgIcon-a416b878.js";import{d as N}from"./LocationOnOutlined-e4d2efb3.js";import{d as U}from"./ArrowBack-76f009fb.js";import{F}from"./FilterView-b293e98b.js";import{u as pe}from"./useLazyQuery-e4720a3f.js";import{B as Q}from"./Button-91d3855e.js";import{I as Y}from"./IconButton-6c2b5903.js";import{C as J}from"./Chip-15981a69.js";import{g as ye}from"./useIsFocusVisible-672433b0.js";var R={},ge=M;Object.defineProperty(R,"__esModule",{value:!0});var B=R.default=void 0,he=ge(D()),me=e,ve=(0,he.default)((0,me.jsx)("path",{d:"M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6 1.41-1.41z"}),"KeyboardArrowDown");B=R.default=ve;var q={},ue=M;Object.defineProperty(q,"__esModule",{value:!0});var V=q.default=void 0,we=ue(D()),Se=e,Ce=(0,we.default)((0,Se.jsx)("path",{d:"M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z"}),"KeyboardArrowUp");V=q.default=Ce;var $={},Fe=M;Object.defineProperty($,"__esModule",{value:!0});var X=$.default=void 0,be=Fe(D()),Te=e,ze=(0,be.default)((0,Te.jsx)("path",{d:"M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckCircle");X=$.default=ze;const qe=A=>{const[E]=je(),[I,Z]=P.useState(!1),[b,ee]=P.useState(null),[w,O]=P.useState(),S=ce(),ie=ye`
    query GetProfileView{
      getProfileView{
        username
        firstname lastname
        orientation gender
        age
        profileinfo{
          imageGallery{
            imgid url  
            identifiedAs filter isProfileSafe isSafe
            neutral porn drawing sexy hentai
          }
          bio
          activities
          openfor 
          height physique
          location{
            address
          }
          educationlevel
          course college
          jobrole company
          religion
          foodpreference 
          myfoodlimit 
          mydrinklimit 
          mysmokelimit
        }        
      }
    }
  `,[H,{data:C,loading:te,error:W}]=pe(ie,{fetchPolicy:"network-only"});C&&(b||ee(C.getProfileView)),W&&console.log("error",W),P.useEffect(()=>{I||(H(),Z(!0))},[I,H]);const i=n=>n?n.charAt(0)+n.substring(1).toLowerCase():"",t=n=>e.jsx(J,{sx:{border:"1px solid #efefef",height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"normal"}},label:n,size:"small",variant:"outlined"}),ne=n=>e.jsx(J,{sx:{fontSize:14,color:"#595959",border:"1px solid #efefef",height:"auto","& .MuiChip-label":{display:"block",whiteSpace:"normal"}},label:n,size:"medium",variant:"outlined"}),se=()=>{if(b){const{firstname:n,lastname:d,orientation:o,gender:a,age:x,profileinfo:p}=C.getProfileView,{imageGallery:l,bio:y,location:c,openfor:s,communicationScore:r}=p,f=l.find(j=>j.imgid===1);return e.jsxs("div",{style:{display:"flex",width:480,height:320,border:"1px solid #efefef"},children:[e.jsx("div",{style:{width:240},children:e.jsx(F,{filter:f.filter,width:240,image:f.url})}),e.jsxs("div",{style:{width:240,paddingLeft:12,paddingTop:10},children:[e.jsxs("div",{style:{fontSize:22,paddingLeft:10},children:[n," ",d,", ",x]}),c?e.jsxs("div",{style:{display:"flex",fontSize:16,paddingTop:5,paddingBottom:5,paddingLeft:10},children:[e.jsx(N,{sx:{fontSize:16,color:"#000"}}),e.jsx("div",{style:{paddingTop:0,color:"#595959"},children:c.address})]}):e.jsx(e.Fragment,{}),e.jsxs("div",{style:{fontSize:14,paddingLeft:5},children:[e.jsx("div",{style:{paddingTop:5},children:t("Open for : "+i(s))}),e.jsx("div",{style:{paddingTop:5},children:t("Gender :  "+i(a)+", "+i(o))}),r?e.jsx("div",{style:{width:150,paddingTop:5},children:t("Communication Score 4.5/5 (10+ feedbacks)")}):e.jsx(e.Fragment,{})]}),e.jsx("div",{style:{padding:5,fontFamily:"serif",fontSize:16,paddingTop:15,paddingLeft:10,height:140,overflowY:"hidden"},children:y})]})]})}return e.jsx("div",{})},de=()=>{if(b){const{firstname:n,profileinfo:d}=C.getProfileView,{imageGallery:o,activities:a,course:x,college:p,jobrole:l,company:y,educationlevel:c,foodpreference:s,height:r,mydrinklimit:f,myfoodlimit:j,mysmokelimit:g,physique:h,religion:m,big5Score:T,communicationScore:z}=d,v=o.find(u=>u.imgid===2),k=o.find(u=>u.imgid===3);return e.jsxs("div",{style:{border:"1px solid #efefef",width:480},children:[e.jsxs("div",{children:[a.length>0?e.jsxs("div",{style:{border:"1px solid #fff",paddingTop:10,paddingBottom:10},children:[e.jsxs("div",{style:{display:"flex",justifyContent:"center",color:"#595959"},children:[n," is open for the following activities"]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:10},children:a.map((u,G)=>e.jsx("div",{children:t(u)},G))})]}):e.jsx(e.Fragment,{}),z?e.jsx(e.Fragment,{}):e.jsxs("div",{style:{paddingBottom:10},children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",color:"#595959",paddingTop:10},children:"Communication Skills"}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",paddingTop:10},children:[t("Texting 4.5/5"),t("Speaking 4.5/5"),t("Listening 4.5/5")]}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx("div",{style:{paddingTop:5},children:t("Communication Score 4.5/5 (10+ feedbacks)")})})]}),l&&y?e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:10},children:e.jsx("div",{children:"Works as "+l+" at "+y})}):e.jsx(e.Fragment,{}),c&&x&&p?e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:5,paddingBottom:10},children:e.jsx("div",{children:i(c)+" in "+x+" from "+p})}):e.jsx(e.Fragment,{}),r||h||m?e.jsxs("div",{style:{display:"flex",fontSize:15,color:"#595959",justifyContent:"center",paddingTop:10,paddingBottom:10},children:[r?e.jsx("div",{style:{paddingLeft:10},children:"Height : "+r+" cm"}):e.jsx(e.Fragment,{}),h?e.jsx("div",{style:{paddingLeft:10},children:"Physique : "+i(h)}):e.jsx(e.Fragment,{}),m?e.jsx("div",{style:{paddingLeft:10},children:"Religion : "+i(m)}):e.jsx(e.Fragment,{})]}):e.jsx(e.Fragment,{}),s||j?e.jsxs("div",{style:{display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:10},children:[s?t("Food preference "+i(s)):e.jsx(e.Fragment,{}),j?t("Food limit "+i(j)):e.jsx(e.Fragment,{})]}):e.jsx(e.Fragment,{}),f||g?e.jsxs("div",{style:{display:"flex",fontSize:16,justifyContent:"center",paddingBottom:30},children:[f?t("Drink "+i(f)):e.jsx(e.Fragment,{}),g?t("Smoke "+i(g)):e.jsx(e.Fragment,{})]}):e.jsx(e.Fragment,{})]}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{width:240,justifyContent:"center",display:"flex",flexDirection:"column"},children:T?e.jsx(e.Fragment,{}):e.jsxs("div",{style:{height:320,display:"flex",justifyContent:"center",flexDirection:"column"},children:[e.jsx("div",{style:{display:"flex",color:"#595959",justifyContent:"center",paddingTop:10},children:"Big 5 Personality Traits"}),e.jsxs("div",{style:{paddingLeft:30,paddingTop:10,border:"1px solid #fff"},children:[t("Neuroticism Low "),t("Agreeableness High"),t("Extroversion Moderate"),t("Openness High"),t("Conscientiousness Moderate")]})]})}),e.jsx("div",{style:{width:240},children:v?e.jsx(F,{filter:v.filter,width:240,image:v.url}):e.jsx(e.Fragment,{})})]}),e.jsx("div",{style:{display:"flex"},children:k?e.jsx(F,{filter:k.filter,width:480,image:k.url}):e.jsx(e.Fragment,{})})]})}return e.jsx("div",{})},le=()=>{if(b){const{firstname:n,lastname:d,age:o,profileinfo:a}=C.getProfileView,{imageGallery:x,bio:p,location:l,openfor:y,communicationScore:c}=a,s=x.find(r=>r.imgid===1);return e.jsxs("div",{style:{display:"flex",flexDirection:"column",border:"1px solid #efefef",height:415,width:260},children:[e.jsx("div",{style:{},children:e.jsx(F,{filter:s.filter,width:260,image:s.url})}),e.jsxs("div",{style:{display:"flex",paddingLeft:5},children:[e.jsxs("div",{children:[e.jsxs("div",{style:{fontSize:20,padding:5,paddingTop:10},children:[n," ",d,", ",o]}),e.jsx("div",{style:{},children:l?e.jsxs("div",{style:{display:"flex",fontSize:16,paddingTop:0,paddingBottom:0,paddingLeft:0},children:[e.jsx("div",{style:{color:"#595959"},children:e.jsx(N,{sx:{fontSize:16,color:"#595959"}})}),e.jsx("div",{style:{paddingLeft:2,color:"#595959"},children:l.address})]}):e.jsx(e.Fragment,{})})]}),e.jsx("div",{style:{paddingTop:10,paddingLeft:3},children:e.jsx(X,{sx:{fontSize:22,color:"green"}})}),e.jsx("div",{style:{flexGrow:1}})]})]})}else return e.jsx("div",{})},re=()=>{if(b){const{firstname:n,profileinfo:d,orientation:o,gender:a}=C.getProfileView,{bio:x,imageGallery:p,activities:l,course:y,college:c,jobrole:s,company:r,educationlevel:f,foodpreference:j,height:g,mydrinklimit:h,myfoodlimit:m,mysmokelimit:T,physique:z,religion:v,big5Score:k,communicationScore:u}=d,G=p.find(L=>L.imgid===2),_=p.find(L=>L.imgid===4);return e.jsx("div",{style:{border:"1px solid #efefef",borderTop:"#fff",display:"flex",justifyContent:"center",width:260},children:e.jsxs("div",{children:[d&&d.openfor?e.jsx("div",{style:{color:"#595959",width:260,display:"flex",justifyContent:"center",paddingTop:20},children:t("Open for : "+i(d.openfor))}):e.jsx(e.Fragment,{}),a&&o?e.jsx("div",{style:{color:"#595959",width:260,display:"flex",justifyContent:"center",paddingTop:10,paddingBottom:15},children:t("Gender :  "+i(a)+", "+i(o))}):e.jsx(e.Fragment,{}),l.length>0?e.jsxs("div",{style:{border:"1px solid #fff",paddingTop:10,paddingBottom:20},children:[e.jsx("div",{style:{display:"flex",fontSize:18,justifyContent:"center"},children:e.jsxs("div",{style:{width:220,textAlign:"center"},children:[n," is open for the following activities"]})}),e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:20,flexWrap:"wrap"},children:l.map((L,xe)=>e.jsx("div",{style:{margin:2,color:"#595959"},children:ne(L)},xe))})]}):e.jsx(e.Fragment,{}),x?e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingTop:20,paddingBottom:20},children:e.jsx("div",{style:{fontSize:18,color:"#595959"},children:x})}):e.jsx(e.Fragment,{}),u?e.jsx(e.Fragment,{}):e.jsxs("div",{style:{fontSize:16,paddingBottom:20},children:[e.jsx("div",{style:{display:"flex",fontSize:18,justifyContent:"center",color:"#000",paddingTop:10},children:"Communication Skills"}),e.jsxs("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",paddingTop:10},children:[e.jsxs("div",{style:{padding:5,color:"#595959",display:"flex",justifyContent:"center"},children:[e.jsxs("div",{style:{width:80,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:14},children:"Texting"}),e.jsx("div",{style:{fontSize:14},children:"4.5/5"})]}),e.jsxs("div",{style:{width:80,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:14},children:"Listening"}),e.jsx("div",{style:{fontSize:14},children:"4.5/5"})]}),e.jsxs("div",{style:{width:80,textAlign:"center"},children:[e.jsx("div",{style:{fontSize:14},children:"Speaking"}),e.jsx("div",{style:{fontSize:14},children:"4.5/5"})]})]}),e.jsx("div",{style:{display:"flex",justifyContent:"center",padding:5,fontSize:14,color:"#595959"},children:"Total 4.5/5 (10+ feedbacks)"})]})]}),s&&r?e.jsx("div",{style:{display:"flex",justifyContent:"center",fontSize:16,padding:5},children:e.jsx("div",{style:{textAlign:"center"},children:"Works as "+s+" at "+r})}):e.jsx(e.Fragment,{}),f&&y&&c?e.jsx("div",{style:{display:"flex",justifyContent:"center",fontSize:16,paddingTop:10,padding:5},children:e.jsx("div",{style:{textAlign:"center"},children:i(f)+" in "+y+" from "+c})}):e.jsx(e.Fragment,{}),g||z||v?e.jsxs("div",{style:{display:"flex",fontSize:14,color:"#595959",justifyContent:"center",paddingTop:30},children:[e.jsx("div",{style:{flexGrow:1}}),g?e.jsx("div",{style:{padding:5,width:50,textAlign:"center"},children:"Height "+g+" cm"}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}}),z?e.jsx("div",{style:{padding:5,width:70,textAlign:"center"},children:"Physique "+i(z)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}}),v?e.jsx("div",{style:{padding:5,width:70,textAlign:"center"},children:"Religion "+i(v)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}})]}):e.jsx(e.Fragment,{}),j||m?e.jsxs("div",{style:{display:"flex",justifyContent:"center",fontSize:14,color:"#595959",paddingTop:10},children:[e.jsx("div",{style:{flexGrow:1}}),j?e.jsx("div",{style:{padding:5,width:110,textAlign:"center"},children:"Food Preference "+i(j)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}}),m?e.jsx("div",{style:{padding:5,width:80,textAlign:"center"},children:"Food Limit "+i(m)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}})]}):e.jsx(e.Fragment,{}),h||T?e.jsxs("div",{style:{display:"flex",fontSize:14,justifyContent:"center",color:"#595959",paddingTop:10},children:[e.jsx("div",{style:{flexGrow:1}}),h?e.jsx("div",{style:{padding:5,width:80,textAlign:"center"},children:"Drink "+i(h)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}}),T?e.jsx("div",{style:{padding:5,width:80,textAlign:"center"},children:"Smoke "+i(T)}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{flexGrow:1}})]}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{paddingTop:20},children:G?e.jsx(F,{filter:G.filter,width:260,image:G.url}):e.jsx(e.Fragment,{})}),k?e.jsx(e.Fragment,{}):e.jsxs("div",{children:[e.jsx("div",{style:{display:"flex",justifyContent:"center",fontSize:18,padding:10,paddingTop:30,color:"#000"},children:"Big 5 Personality Traits"}),e.jsxs("div",{style:{justifyContent:"center",display:"flex",fontSize:14,color:"#595959",paddingTop:20},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{width:70,textAlign:"center"},children:" Openness Low "}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{width:120,textAlign:"center"},children:" Conscientiousness Moderate "}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsx("div",{style:{justifyContent:"center",display:"flex",fontSize:14,color:"#595959",paddingTop:10},children:e.jsx("div",{style:{width:90,textAlign:"center"},children:" Extroversion Moderate "})}),e.jsxs("div",{style:{justifyContent:"center",display:"flex",fontSize:14,color:"#595959",paddingTop:10,paddingBottom:30},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{width:90,textAlign:"center"},children:" Agreeableness High "}),e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{width:90,textAlign:"center"},children:" Neuroticism Low "}),e.jsx("div",{style:{flexGrow:1}})]})]}),e.jsx("div",{style:{},children:_?e.jsx(F,{filter:_.filter,width:260,image:_.url}):e.jsx(e.Fragment,{})})]})})}return e.jsx("div",{})},oe=()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[e.jsx("div",{style:{flexGrow:1}}),S&&S.pathname!="/explore"&&A&&A.username?e.jsx("div",{style:{fontSize:22,padding:10,paddingBottom:15},children:e.jsx(K,{to:"/profile/matches",children:e.jsx(Q,{sx:{textTransform:"none",color:"#595959"},startIcon:e.jsx(U,{}),children:"back"})})}):e.jsx("div",{style:{}}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:le()}),e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:w?re():e.jsx(e.Fragment,{})}),e.jsxs("div",{style:{display:"flex",marginTop:-25,marginRight:0},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsxs("div",{style:{display:"flex",width:280},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{style:{marginRight:20},children:e.jsx(Y,{onClick:()=>{O(!w)},style:{border:"1px solid #efefef",background:"#fff"},children:w?e.jsx(V,{sx:{fontSize:20}}):e.jsx(B,{sx:{fontSize:20}})})})]}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsx("div",{style:{flexGrow:1}})]}),ae=()=>e.jsx("div",{style:{},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsxs("div",{style:{},children:[S&&S.pathname!="/explore"&&A&&A.username?e.jsx("div",{style:{height:50},children:e.jsx(K,{to:"/profile/matches",children:e.jsx(Q,{sx:{textTransform:"none",color:"#595959"},startIcon:e.jsx(U,{}),children:"back"})})}):e.jsx("div",{style:{display:"flex",fontSize:22,padding:10,paddingLeft:5,paddingBottom:15},children:S&&S.pathname!="/explore"?"My Profile":""}),e.jsx("div",{children:se()}),e.jsx("div",{children:w?de():e.jsx(e.Fragment,{})}),e.jsxs("div",{style:{display:"flex",marginTop:-30,marginRight:15},children:[e.jsx("div",{style:{flexGrow:1}}),e.jsx("div",{children:e.jsx(Y,{onClick:()=>{O(!w)},style:{border:"1px solid #efefef",background:"#fff"},children:w?e.jsx(V,{}):e.jsx(B,{})})})]})]})})});return e.jsx("div",{style:{},children:te?e.jsx("div",{style:{display:"flex",justifyContent:"center",flexDirection:"column",height:"60vh"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center",paddingBottom:15},children:e.jsx(fe,{})})}):e.jsxs("div",{style:{},children:[E>600?ae():e.jsx(e.Fragment,{}),E<600?oe():e.jsx(e.Fragment,{})]})})};export{qe as P};
