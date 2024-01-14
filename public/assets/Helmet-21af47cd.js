import{x as M,r as x,R as I}from"./index-c9b6f3db.js";var G={exports:{}},re="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED",ne=re,oe=ne;function V(){}function X(){}X.resetWarningCache=V;var ae=function(){function t(n,o,a,s,i,u){if(u!==oe){var c=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types");throw c.name="Invariant Violation",c}}t.isRequired=t;function e(){return t}var r={array:t,bigint:t,bool:t,func:t,number:t,object:t,string:t,symbol:t,any:t,arrayOf:e,element:t,elementType:t,instanceOf:e,node:t,objectOf:e,oneOf:e,oneOfType:e,shape:e,exact:e,checkPropTypes:X,resetWarningCache:V};return r.PropTypes=r,r};G.exports=ae();var ie=G.exports;const m=M(ie);function Je(){const[t,e]=x.useState([0,0]);return x.useLayoutEffect(()=>{function r(){e([window.innerWidth,window.innerHeight])}return window.addEventListener("resize",r),r(),()=>window.removeEventListener("resize",r)},[]),t}function ue(t){return t&&typeof t=="object"&&"default"in t?t.default:t}var Q=x,ce=ue(Q);function B(t,e,r){return e in t?Object.defineProperty(t,e,{value:r,enumerable:!0,configurable:!0,writable:!0}):t[e]=r,t}function se(t,e){t.prototype=Object.create(e.prototype),t.prototype.constructor=t,t.__proto__=e}var fe=!!(typeof window<"u"&&window.document&&window.document.createElement);function le(t,e,r){if(typeof t!="function")throw new Error("Expected reducePropsToState to be a function.");if(typeof e!="function")throw new Error("Expected handleStateChangeOnClient to be a function.");if(typeof r<"u"&&typeof r!="function")throw new Error("Expected mapStateOnServer to either be undefined or a function.");function n(o){return o.displayName||o.name||"Component"}return function(a){if(typeof a!="function")throw new Error("Expected WrappedComponent to be a React component.");var s=[],i;function u(){i=t(s.map(function(f){return f.props})),c.canUseDOM?e(i):r&&(i=r(i))}var c=function(f){se(p,f);function p(){return f.apply(this,arguments)||this}p.peek=function(){return i},p.rewind=function(){if(p.canUseDOM)throw new Error("You may only call rewind() on the server. Call peek() to read the current state.");var y=i;return i=void 0,s=[],y};var d=p.prototype;return d.UNSAFE_componentWillMount=function(){s.push(this),u()},d.componentDidUpdate=function(){u()},d.componentWillUnmount=function(){var y=s.indexOf(this);s.splice(y,1),u()},d.render=function(){return ce.createElement(a,this.props)},p}(Q.PureComponent);return B(c,"displayName","SideEffect("+n(a)+")"),B(c,"canUseDOM",fe),c}}var pe=le;const de=M(pe);var Te=typeof Element<"u",me=typeof Map=="function",he=typeof Set=="function",ve=typeof ArrayBuffer=="function"&&!!ArrayBuffer.isView;function j(t,e){if(t===e)return!0;if(t&&e&&typeof t=="object"&&typeof e=="object"){if(t.constructor!==e.constructor)return!1;var r,n,o;if(Array.isArray(t)){if(r=t.length,r!=e.length)return!1;for(n=r;n--!==0;)if(!j(t[n],e[n]))return!1;return!0}var a;if(me&&t instanceof Map&&e instanceof Map){if(t.size!==e.size)return!1;for(a=t.entries();!(n=a.next()).done;)if(!e.has(n.value[0]))return!1;for(a=t.entries();!(n=a.next()).done;)if(!j(n.value[1],e.get(n.value[0])))return!1;return!0}if(he&&t instanceof Set&&e instanceof Set){if(t.size!==e.size)return!1;for(a=t.entries();!(n=a.next()).done;)if(!e.has(n.value[0]))return!1;return!0}if(ve&&ArrayBuffer.isView(t)&&ArrayBuffer.isView(e)){if(r=t.length,r!=e.length)return!1;for(n=r;n--!==0;)if(t[n]!==e[n])return!1;return!0}if(t.constructor===RegExp)return t.source===e.source&&t.flags===e.flags;if(t.valueOf!==Object.prototype.valueOf&&typeof t.valueOf=="function"&&typeof e.valueOf=="function")return t.valueOf()===e.valueOf();if(t.toString!==Object.prototype.toString&&typeof t.toString=="function"&&typeof e.toString=="function")return t.toString()===e.toString();if(o=Object.keys(t),r=o.length,r!==Object.keys(e).length)return!1;for(n=r;n--!==0;)if(!Object.prototype.hasOwnProperty.call(e,o[n]))return!1;if(Te&&t instanceof Element)return!1;for(n=r;n--!==0;)if(!((o[n]==="_owner"||o[n]==="__v"||o[n]==="__o")&&t.$$typeof)&&!j(t[o[n]],e[o[n]]))return!1;return!0}return t!==t&&e!==e}var ye=function(e,r){try{return j(e,r)}catch(n){if((n.message||"").match(/stack|recursion/i))return console.warn("react-fast-compare cannot handle circular refs"),!1;throw n}};const ge=M(ye);/*
object-assign
(c) Sindre Sorhus
@license MIT
*/var q=Object.getOwnPropertySymbols,Ee=Object.prototype.hasOwnProperty,Ae=Object.prototype.propertyIsEnumerable;function be(t){if(t==null)throw new TypeError("Object.assign cannot be called with null or undefined");return Object(t)}function Se(){try{if(!Object.assign)return!1;var t=new String("abc");if(t[5]="de",Object.getOwnPropertyNames(t)[0]==="5")return!1;for(var e={},r=0;r<10;r++)e["_"+String.fromCharCode(r)]=r;var n=Object.getOwnPropertyNames(e).map(function(a){return e[a]});if(n.join("")!=="0123456789")return!1;var o={};return"abcdefghijklmnopqrst".split("").forEach(function(a){o[a]=a}),Object.keys(Object.assign({},o)).join("")==="abcdefghijklmnopqrst"}catch{return!1}}var Oe=Se()?Object.assign:function(t,e){for(var r,n=be(t),o,a=1;a<arguments.length;a++){r=Object(arguments[a]);for(var s in r)Ee.call(r,s)&&(n[s]=r[s]);if(q){o=q(r);for(var i=0;i<o.length;i++)Ae.call(r,o[i])&&(n[o[i]]=r[o[i]])}}return n};const Ce=M(Oe);var O={BODY:"bodyAttributes",HTML:"htmlAttributes",TITLE:"titleAttributes"},l={BASE:"base",BODY:"body",HEAD:"head",HTML:"html",LINK:"link",META:"meta",NOSCRIPT:"noscript",SCRIPT:"script",STYLE:"style",TITLE:"title"};Object.keys(l).map(function(t){return l[t]});var h={CHARSET:"charset",CSS_TEXT:"cssText",HREF:"href",HTTPEQUIV:"http-equiv",INNER_HTML:"innerHTML",ITEM_PROP:"itemprop",NAME:"name",PROPERTY:"property",REL:"rel",SRC:"src",TARGET:"target"},N={accesskey:"accessKey",charset:"charSet",class:"className",contenteditable:"contentEditable",contextmenu:"contextMenu","http-equiv":"httpEquiv",itemprop:"itemProp",tabindex:"tabIndex"},L={DEFAULT_TITLE:"defaultTitle",DEFER:"defer",ENCODE_SPECIAL_CHARACTERS:"encodeSpecialCharacters",ON_CHANGE_CLIENT_STATE:"onChangeClientState",TITLE_TEMPLATE:"titleTemplate"},we=Object.keys(N).reduce(function(t,e){return t[N[e]]=e,t},{}),Pe=[l.NOSCRIPT,l.SCRIPT,l.STYLE],g="data-react-helmet",Re=typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?function(t){return typeof t}:function(t){return t&&typeof Symbol=="function"&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},_e=function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")},Ie=function(){function t(e,r){for(var n=0;n<r.length;n++){var o=r[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(e,r,n){return r&&t(e.prototype,r),n&&t(e,n),e}}(),v=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var r=arguments[e];for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(t[n]=r[n])}return t},Le=function(t,e){if(typeof e!="function"&&e!==null)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)},Y=function(t,e){var r={};for(var n in t)e.indexOf(n)>=0||Object.prototype.hasOwnProperty.call(t,n)&&(r[n]=t[n]);return r},je=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e&&(typeof e=="object"||typeof e=="function")?e:t},F=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:!0;return r===!1?String(e):String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")},Ne=function(e){var r=w(e,l.TITLE),n=w(e,L.TITLE_TEMPLATE);if(n&&r)return n.replace(/%s/g,function(){return Array.isArray(r)?r.join(""):r});var o=w(e,L.DEFAULT_TITLE);return r||o||void 0},Me=function(e){return w(e,L.ON_CHANGE_CLIENT_STATE)||function(){}},H=function(e,r){return r.filter(function(n){return typeof n[e]<"u"}).map(function(n){return n[e]}).reduce(function(n,o){return v({},n,o)},{})},He=function(e,r){return r.filter(function(n){return typeof n[l.BASE]<"u"}).map(function(n){return n[l.BASE]}).reverse().reduce(function(n,o){if(!n.length)for(var a=Object.keys(o),s=0;s<a.length;s++){var i=a[s],u=i.toLowerCase();if(e.indexOf(u)!==-1&&o[u])return n.concat(o)}return n},[])},R=function(e,r,n){var o={};return n.filter(function(a){return Array.isArray(a[e])?!0:(typeof a[e]<"u"&&ke("Helmet: "+e+' should be of type "Array". Instead found type "'+Re(a[e])+'"'),!1)}).map(function(a){return a[e]}).reverse().reduce(function(a,s){var i={};s.filter(function(d){for(var T=void 0,y=Object.keys(d),E=0;E<y.length;E++){var A=y[E],b=A.toLowerCase();r.indexOf(b)!==-1&&!(T===h.REL&&d[T].toLowerCase()==="canonical")&&!(b===h.REL&&d[b].toLowerCase()==="stylesheet")&&(T=b),r.indexOf(A)!==-1&&(A===h.INNER_HTML||A===h.CSS_TEXT||A===h.ITEM_PROP)&&(T=A)}if(!T||!d[T])return!1;var P=d[T].toLowerCase();return o[T]||(o[T]={}),i[T]||(i[T]={}),o[T][P]?!1:(i[T][P]=!0,!0)}).reverse().forEach(function(d){return a.push(d)});for(var u=Object.keys(i),c=0;c<u.length;c++){var f=u[c],p=Ce({},o[f],i[f]);o[f]=p}return a},[]).reverse()},w=function(e,r){for(var n=e.length-1;n>=0;n--){var o=e[n];if(o.hasOwnProperty(r))return o[r]}return null},xe=function(e){return{baseTag:He([h.HREF,h.TARGET],e),bodyAttributes:H(O.BODY,e),defer:w(e,L.DEFER),encode:w(e,L.ENCODE_SPECIAL_CHARACTERS),htmlAttributes:H(O.HTML,e),linkTags:R(l.LINK,[h.REL,h.HREF],e),metaTags:R(l.META,[h.NAME,h.CHARSET,h.HTTPEQUIV,h.PROPERTY,h.ITEM_PROP],e),noscriptTags:R(l.NOSCRIPT,[h.INNER_HTML],e),onChangeClientState:Me(e),scriptTags:R(l.SCRIPT,[h.SRC,h.INNER_HTML],e),styleTags:R(l.STYLE,[h.CSS_TEXT],e),title:Ne(e),titleAttributes:H(O.TITLE,e)}},D=function(){var t=Date.now();return function(e){var r=Date.now();r-t>16?(t=r,e(r)):setTimeout(function(){D(e)},0)}}(),$=function(e){return clearTimeout(e)},Fe=typeof window<"u"?window.requestAnimationFrame&&window.requestAnimationFrame.bind(window)||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||D:global.requestAnimationFrame||D,De=typeof window<"u"?window.cancelAnimationFrame||window.webkitCancelAnimationFrame||window.mozCancelAnimationFrame||$:global.cancelAnimationFrame||$,ke=function(e){return console&&typeof console.warn=="function"&&console.warn(e)},_=null,Ue=function(e){_&&De(_),e.defer?_=Fe(function(){z(e,function(){_=null})}):(z(e),_=null)},z=function(e,r){var n=e.baseTag,o=e.bodyAttributes,a=e.htmlAttributes,s=e.linkTags,i=e.metaTags,u=e.noscriptTags,c=e.onChangeClientState,f=e.scriptTags,p=e.styleTags,d=e.title,T=e.titleAttributes;k(l.BODY,o),k(l.HTML,a),Be(d,T);var y={baseTag:C(l.BASE,n),linkTags:C(l.LINK,s),metaTags:C(l.META,i),noscriptTags:C(l.NOSCRIPT,u),scriptTags:C(l.SCRIPT,f),styleTags:C(l.STYLE,p)},E={},A={};Object.keys(y).forEach(function(b){var P=y[b],U=P.newTags,te=P.oldTags;U.length&&(E[b]=U),te.length&&(A[b]=y[b].oldTags)}),r&&r(),c(e,E,A)},J=function(e){return Array.isArray(e)?e.join(""):e},Be=function(e,r){typeof e<"u"&&document.title!==e&&(document.title=J(e)),k(l.TITLE,r)},k=function(e,r){var n=document.getElementsByTagName(e)[0];if(n){for(var o=n.getAttribute(g),a=o?o.split(","):[],s=[].concat(a),i=Object.keys(r),u=0;u<i.length;u++){var c=i[u],f=r[c]||"";n.getAttribute(c)!==f&&n.setAttribute(c,f),a.indexOf(c)===-1&&a.push(c);var p=s.indexOf(c);p!==-1&&s.splice(p,1)}for(var d=s.length-1;d>=0;d--)n.removeAttribute(s[d]);a.length===s.length?n.removeAttribute(g):n.getAttribute(g)!==i.join(",")&&n.setAttribute(g,i.join(","))}},C=function(e,r){var n=document.head||document.querySelector(l.HEAD),o=n.querySelectorAll(e+"["+g+"]"),a=Array.prototype.slice.call(o),s=[],i=void 0;return r&&r.length&&r.forEach(function(u){var c=document.createElement(e);for(var f in u)if(u.hasOwnProperty(f))if(f===h.INNER_HTML)c.innerHTML=u.innerHTML;else if(f===h.CSS_TEXT)c.styleSheet?c.styleSheet.cssText=u.cssText:c.appendChild(document.createTextNode(u.cssText));else{var p=typeof u[f]>"u"?"":u[f];c.setAttribute(f,p)}c.setAttribute(g,"true"),a.some(function(d,T){return i=T,c.isEqualNode(d)})?a.splice(i,1):s.push(c)}),a.forEach(function(u){return u.parentNode.removeChild(u)}),s.forEach(function(u){return n.appendChild(u)}),{oldTags:a,newTags:s}},Z=function(e){return Object.keys(e).reduce(function(r,n){var o=typeof e[n]<"u"?n+'="'+e[n]+'"':""+n;return r?r+" "+o:o},"")},qe=function(e,r,n,o){var a=Z(n),s=J(r);return a?"<"+e+" "+g+'="true" '+a+">"+F(s,o)+"</"+e+">":"<"+e+" "+g+'="true">'+F(s,o)+"</"+e+">"},Ye=function(e,r,n){return r.reduce(function(o,a){var s=Object.keys(a).filter(function(c){return!(c===h.INNER_HTML||c===h.CSS_TEXT)}).reduce(function(c,f){var p=typeof a[f]>"u"?f:f+'="'+F(a[f],n)+'"';return c?c+" "+p:p},""),i=a.innerHTML||a.cssText||"",u=Pe.indexOf(e)===-1;return o+"<"+e+" "+g+'="true" '+s+(u?"/>":">"+i+"</"+e+">")},"")},K=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Object.keys(e).reduce(function(n,o){return n[N[o]||o]=e[o],n},r)},$e=function(e){var r=arguments.length>1&&arguments[1]!==void 0?arguments[1]:{};return Object.keys(e).reduce(function(n,o){return n[we[o]||o]=e[o],n},r)},ze=function(e,r,n){var o,a=(o={key:r},o[g]=!0,o),s=K(n,a);return[I.createElement(l.TITLE,s,r)]},We=function(e,r){return r.map(function(n,o){var a,s=(a={key:o},a[g]=!0,a);return Object.keys(n).forEach(function(i){var u=N[i]||i;if(u===h.INNER_HTML||u===h.CSS_TEXT){var c=n.innerHTML||n.cssText;s.dangerouslySetInnerHTML={__html:c}}else s[u]=n[i]}),I.createElement(e,s)})},S=function(e,r,n){switch(e){case l.TITLE:return{toComponent:function(){return ze(e,r.title,r.titleAttributes)},toString:function(){return qe(e,r.title,r.titleAttributes,n)}};case O.BODY:case O.HTML:return{toComponent:function(){return K(r)},toString:function(){return Z(r)}};default:return{toComponent:function(){return We(e,r)},toString:function(){return Ye(e,r,n)}}}},ee=function(e){var r=e.baseTag,n=e.bodyAttributes,o=e.encode,a=e.htmlAttributes,s=e.linkTags,i=e.metaTags,u=e.noscriptTags,c=e.scriptTags,f=e.styleTags,p=e.title,d=p===void 0?"":p,T=e.titleAttributes;return{base:S(l.BASE,r,o),bodyAttributes:S(O.BODY,n,o),htmlAttributes:S(O.HTML,a,o),link:S(l.LINK,s,o),meta:S(l.META,i,o),noscript:S(l.NOSCRIPT,u,o),script:S(l.SCRIPT,c,o),style:S(l.STYLE,f,o),title:S(l.TITLE,{title:d,titleAttributes:T},o)}},Ge=function(e){var r,n;return n=r=function(o){Le(a,o);function a(){return _e(this,a),je(this,o.apply(this,arguments))}return a.prototype.shouldComponentUpdate=function(i){return!ge(this.props,i)},a.prototype.mapNestedChildrenToProps=function(i,u){if(!u)return null;switch(i.type){case l.SCRIPT:case l.NOSCRIPT:return{innerHTML:u};case l.STYLE:return{cssText:u}}throw new Error("<"+i.type+" /> elements are self-closing and can not contain children. Refer to our API for more information.")},a.prototype.flattenArrayTypeChildren=function(i){var u,c=i.child,f=i.arrayTypeChildren,p=i.newChildProps,d=i.nestedChildren;return v({},f,(u={},u[c.type]=[].concat(f[c.type]||[],[v({},p,this.mapNestedChildrenToProps(c,d))]),u))},a.prototype.mapObjectTypeChildren=function(i){var u,c,f=i.child,p=i.newProps,d=i.newChildProps,T=i.nestedChildren;switch(f.type){case l.TITLE:return v({},p,(u={},u[f.type]=T,u.titleAttributes=v({},d),u));case l.BODY:return v({},p,{bodyAttributes:v({},d)});case l.HTML:return v({},p,{htmlAttributes:v({},d)})}return v({},p,(c={},c[f.type]=v({},d),c))},a.prototype.mapArrayTypeChildrenToProps=function(i,u){var c=v({},u);return Object.keys(i).forEach(function(f){var p;c=v({},c,(p={},p[f]=i[f],p))}),c},a.prototype.warnOnInvalidChildren=function(i,u){return!0},a.prototype.mapChildrenToProps=function(i,u){var c=this,f={};return I.Children.forEach(i,function(p){if(!(!p||!p.props)){var d=p.props,T=d.children,y=Y(d,["children"]),E=$e(y);switch(c.warnOnInvalidChildren(p,T),p.type){case l.LINK:case l.META:case l.NOSCRIPT:case l.SCRIPT:case l.STYLE:f=c.flattenArrayTypeChildren({child:p,arrayTypeChildren:f,newChildProps:E,nestedChildren:T});break;default:u=c.mapObjectTypeChildren({child:p,newProps:u,newChildProps:E,nestedChildren:T});break}}}),u=this.mapArrayTypeChildrenToProps(f,u),u},a.prototype.render=function(){var i=this.props,u=i.children,c=Y(i,["children"]),f=v({},c);return u&&(f=this.mapChildrenToProps(u,f)),I.createElement(e,f)},Ie(a,null,[{key:"canUseDOM",set:function(i){e.canUseDOM=i}}]),a}(I.Component),r.propTypes={base:m.object,bodyAttributes:m.object,children:m.oneOfType([m.arrayOf(m.node),m.node]),defaultTitle:m.string,defer:m.bool,encodeSpecialCharacters:m.bool,htmlAttributes:m.object,link:m.arrayOf(m.object),meta:m.arrayOf(m.object),noscript:m.arrayOf(m.object),onChangeClientState:m.func,script:m.arrayOf(m.object),style:m.arrayOf(m.object),title:m.string,titleAttributes:m.object,titleTemplate:m.string},r.defaultProps={defer:!0,encodeSpecialCharacters:!0},r.peek=e.peek,r.rewind=function(){var o=e.rewind();return o||(o=ee({baseTag:[],bodyAttributes:{},encodeSpecialCharacters:!0,htmlAttributes:{},linkTags:[],metaTags:[],noscriptTags:[],scriptTags:[],styleTags:[],title:"",titleAttributes:{}})),o},n},Ve=function(){return null},Xe=de(xe,Ue,ee)(Ve),W=Ge(Xe);W.renderStatic=W.rewind;export{W as H,m as P,ie as p,Je as u};