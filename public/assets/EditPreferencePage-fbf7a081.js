import{r as j,j as e,C as T}from"./index-c9b6f3db.js";import{A as k}from"./AuthLayoutFullScreen-c62f9763.js";import{P as V}from"./Profile-507bbe68.js";import{u as W,H as w}from"./Helmet-21af47cd.js";import{J as K,v as t}from"./isValid-8e7c091d.js";import{F as z,I as F,S as H,T as q}from"./TextField-5350433d.js";import{M as L}from"./MenuItem-bc6ecf75.js";import{I as U}from"./InputAdornment-a3100ed2.js";import{B}from"./Button-91d3855e.js";import{g as A}from"./useIsFocusVisible-672433b0.js";import{u as Y}from"./useQuery-b30a1dc7.js";import{u as _}from"./useMutation-eed3cbaa.js";import"./NavbarAuth-08c18815.js";import"./createSvgIcon-a416b878.js";import"./createSvgIcon-60083042.js";import"./Grid-e2163307.js";import"./useTheme-239bb432.js";import"./extendSxProp-f96b963a.js";import"./Refresh-c5117a03.js";import"./Favorite-398d5337.js";import"./FactCheck-82153bdd.js";import"./listItemTextClasses-4ee9e470.js";import"./List-488c0746.js";import"./ArrowBack-76f009fb.js";import"./ListItemButton-4a57b46d.js";import"./listItemButtonClasses-2c90cfd8.js";import"./ListItem-62b53da2.js";import"./ListItemText-5dddd07f.js";import"./Typography-ecdde47a.js";import"./IconButton-6c2b5903.js";import"./useFormControl-6a66f310.js";import"./Menu-5b85e992.js";import"./TransitionGroupContext-93465ad1.js";const Q=()=>{const[o]=W(),[n,x]=j.useState(null),[p,I]=j.useState(null),b=A`
    query GetPreferences{
      getPreferences{
        genderpreference
        maxdistance
        minage maxage
        minheight
        physiquelimit 
        mineducation
        religionlimit 
        foodlimit drinklimit smokelimit
      }
    }
  `,P=A`
    mutation EditPreferences($preferenceInput:EditPreferenceInput) {
      editPreferences(preferenceInput:$preferenceInput)
    }
  `,{data:y,loading:N,error:J}=Y(b,{fetchPolicy:"network-only"}),[R,{data:v,loading:$,error:h}]=_(P,{fetchPolicy:"network-only"}),M=K.object({genderpreference:t.gender,maxdistance:t.maxdistance,minage:t.validAge,maxage:t.validAge,minheight:t.validHeight,physiquelimit:t.physique,mineducation:t.educationlevel,religionlimit:t.religionlimit,foodlimit:t.food,drinklimit:t.drink,smokelimit:t.smoke});if(y&&!n){const{genderpreference:l,maxdistance:s,minage:a,maxage:m,minheight:c,physiquelimit:r,mineducation:u,religionlimit:f,foodlimit:g,drinklimit:S,smokelimit:G}=y.getPreferences;x({genderpreference:l,maxdistance:s,minage:a||18,maxage:m||36,minheight:c||150,physiquelimit:r,mineducation:u,religionlimit:f,foodlimit:g,drinklimit:S,smokelimit:G})}const O=()=>{const l=M.validate(n).error;l?I({message:l.message}):R({variables:{preferenceInput:n},fetchPolicy:"network-only"})},i=l=>{const{minWidth:s,label:a,value:m,menuItemList:c}=l;return e.jsxs(z,{sx:{m:1,minWidth:s},size:"small",children:[e.jsx(F,{children:a}),e.jsxs(H,{defaultValue:"",onChange:r=>{x({...n,[m]:r.target.value})},value:n&&n[m]||"",MenuProps:{PaperProps:{style:{maxHeight:300}}},size:"small",label:a,children:[e.jsx(L,{value:"",children:e.jsx("em",{children:"None"})}),c.map((r,u)=>e.jsx(L,{value:r,children:r},u))]})]})},d=l=>{const{label:s,value:a,defaultValue:m,size:c,min:r,max:u,endlabel:f}=l;return e.jsx(q,{defaultValue:m,onChange:g=>{x({...n,[a]:parseInt(g.target.value)})},size:c,label:s,value:n&&n[a],type:"number",variant:"outlined",InputProps:{inputProps:{min:r,max:u},endAdornment:e.jsx(U,{position:"end",children:f})}})},E=({text:l,size:s})=>e.jsx("div",{style:{padding:5},children:e.jsx(B,{variant:"contained",size:s,color:"primary",style:{textTransform:"none",fontSize:14},onClick:()=>{O()},children:l})}),C=()=>e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsxs("div",{children:[o>800?e.jsx("div",{style:{fontSize:22,paddingBottom:20,padding:5,paddingLeft:7},children:"EditPreference"}):e.jsx(e.Fragment,{}),e.jsx("div",{style:{display:"flex"},children:i({value:"genderpreference",minWidth:200,label:"Gender Preference",menuItemList:["MALE","FEMALE","OTHER"]})}),e.jsxs("div",{style:{display:"flex"},children:[i({value:"maxdistance",minWidth:240,label:"Max Distance",menuItemList:["Local 2 KM","Nearby Locality 10 KM","Within City 100 KM","Other Nearby City 300 KM","Global 300 KM Above"]}),e.jsx("div",{style:{padding:8,paddingLeft:2},children:d({label:"Min Age",value:"minage",defaultValue:18,size:"small",min:18,max:80,endlabel:"years"})}),e.jsx("div",{style:{padding:8,paddingLeft:2},children:d({label:"Max Age",value:"maxage",defaultValue:36,size:"small",min:18,max:80,endlabel:"years"})})]}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{padding:8,paddingLeft:7},children:d({label:"Min Height",value:"minheight",defaultValue:160,size:"small",min:50,max:300,endlabel:"cm"})}),e.jsx("div",{children:i({value:"physiquelimit",minWidth:160,label:"Physique Limit",menuItemList:["SKINNY","ATHELETIC","AVERAGE","OBESE"]})})]}),e.jsxs("div",{style:{display:"flex"},children:[i({value:"mineducation",minWidth:200,label:"Min Education level",menuItemList:["SCHOOL","UNDERGRAD","POSTGRAD","DOCTORATE"]}),i({value:"religionlimit",minWidth:180,label:"Religion Limit",menuItemList:["SAME AS MINE","OPEN FOR ALL"]})]}),e.jsxs("div",{style:{display:"flex"},children:[i({value:"foodlimit",minWidth:130,label:"Food Limit",menuItemList:["NONVEG","VEG","VEGAN"]}),i({value:"drinklimit",minWidth:160,label:"Drink Limit",menuItemList:["ADDICT","REGULAR","OCCASIONAL","NONDRINKER"]}),i({value:"smokelimit",minWidth:160,label:"Smoke Limit",menuItemList:["ADDICT","REGULAR","OCCASIONAL","NONSMOKER"]})]}),e.jsx("div",{style:{padding:5,color:"red",width:500},children:p&&"Error : "+p.message||h&&h.message}),e.jsx("div",{style:{padding:5,color:"green",width:500},children:v?"Preferences successfully changed":""}),e.jsx("div",{style:{display:"flex",padding:5},children:E({text:"Update Preferences",size:"medium"})})]})}),D=()=>e.jsxs("div",{style:{height:"80vh",padding:5,overflowY:"scroll",overflowX:"hidden"},children:[e.jsx("div",{style:{display:"flex",flexDirection:"column",paddingTop:10},children:i({value:"genderpreference",minWidth:200,label:"Gender Preference",menuItemList:["MALE","FEMALE","OTHER"]})}),e.jsx("div",{style:{display:"flex",flexDirection:"column"},children:i({value:"maxdistance",minWidth:240,label:"Max Distance",menuItemList:["Local 2 KM","Nearby Locality 10 KM","Within City 100 KM","Other Nearby City 300 KM","Global 300 KM Above"]})}),e.jsxs("div",{style:{display:"flex",paddingTop:2},children:[e.jsx("div",{style:{padding:8},children:d({label:"Min Age",value:"minage",defaultValue:18,size:"small",min:18,max:80,endlabel:"years"})}),e.jsx("div",{style:{padding:8,paddingLeft:2},children:d({label:"Max Age",value:"maxage",defaultValue:36,size:"small",min:18,max:80,endlabel:"years"})}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsxs("div",{style:{display:"flex"},children:[e.jsx("div",{style:{padding:8,paddingLeft:7},children:d({label:"Min Height",value:"minheight",defaultValue:160,size:"small",min:50,max:300,endlabel:"cm"})}),e.jsx("div",{style:{flexGrow:1}})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i({value:"physiquelimit",minWidth:180,label:"Physique Limit",menuItemList:["SKINNY","ATHELETIC","AVERAGE","OBESE"]}),i({value:"mineducation",minWidth:200,label:"Min Education level",menuItemList:["SCHOOL","UNDERGRAD","POSTGRAD","DOCTORATE"]}),i({value:"religionlimit",minWidth:180,label:"Religion Limit",menuItemList:["SAME AS MINE","OPEN FOR ALL"]})]}),e.jsxs("div",{style:{display:"flex",flexDirection:"column"},children:[i({value:"foodlimit",minWidth:130,label:"Food Limit",menuItemList:["NONVEG","VEG","VEGAN"]}),i({value:"drinklimit",minWidth:160,label:"Drink Limit",menuItemList:["ADDICT","REGULAR","OCCASIONAL","NONDRINKER"]}),i({value:"smokelimit",minWidth:160,label:"Smoke Limit",menuItemList:["ADDICT","REGULAR","OCCASIONAL","NONSMOKER"]})]}),e.jsx("div",{style:{padding:5,color:"red",width:200},children:p&&"Error : "+p.message||h&&h.message}),e.jsx("div",{style:{padding:5,color:"green",width:200},children:v?"Preferences successfully changed":""}),e.jsx("div",{style:{display:"flex",padding:5},children:E({text:"Update Preferences",size:"medium"})})]});return e.jsx("div",{style:{},children:N?e.jsx("div",{style:{display:"flex",justifyContent:"center",height:"100%",flexDirection:"column"},children:e.jsx("div",{style:{display:"flex",justifyContent:"center"},children:e.jsx(T,{})})}):e.jsxs("div",{children:[o>600?C():e.jsx(e.Fragment,{}),o<600?D():e.jsx(e.Fragment,{})]})})},Ce=()=>{const o=()=>e.jsx(w,{children:e.jsx("title",{children:"EditPreference rawopinion.in"})});return e.jsxs(k,{children:[o(),e.jsx(V,{children:e.jsx(Q,{})})]})};export{Ce as default};
