import{ac as b,r as u,ad as m,Q as w,ae as O,af as f,ag as S,ah as R,ai as d,aj as E,aa as C,ak as g,al as Q,am as k,ab as y}from"./index-c9b6f3db.js";import{a as D,v as _,D as q}from"./useIsFocusVisible-672433b0.js";var P=!1,H="useSyncExternalStore",U=w[H],F=U||function(s,t,e){var r=t();globalThis.__DEV__!==!1&&!P&&r!==t()&&(P=!0,globalThis.__DEV__!==!1&&b.error(56));var o=u.useState({inst:{value:r,getSnapshot:t}}),i=o[0].inst,a=o[1];return m?u.useLayoutEffect(function(){Object.assign(i,{value:r,getSnapshot:t}),v(i)&&a({inst:i})},[s,r,t]):Object.assign(i,{value:r,getSnapshot:t}),u.useEffect(function(){return v(i)&&a({inst:i}),s(function(){v(i)&&a({inst:i})})},[s]),r};function v(s){var t=s.value,e=s.getSnapshot;try{return t!==e()}catch{return!0}}var j=Object.prototype.hasOwnProperty;function W(s,t){return t===void 0&&(t=Object.create(null)),M(D(t.client),s).useQuery(t)}function M(s,t){var e=u.useRef();(!e.current||s!==e.current.client||t!==e.current.query)&&(e.current=new T(s,t,e.current));var r=e.current;return r.forceUpdateState=u.useReducer(function(o){return o+1},0)[1],r}var T=function(){function s(t,e,r){var o=this;this.client=t,this.query=e,this.forceUpdate=function(){return o.forceUpdateState()},this.ssrDisabledResult=O({loading:!0,data:void 0,error:void 0,networkStatus:f.loading}),this.skipStandbyResult=O({loading:!1,data:void 0,error:void 0,networkStatus:f.ready}),this.toQueryResultCache=new(S?WeakMap:Map),_(e,q.Query);var i=r&&r.result,a=i&&i.data;a&&(this.previousData=a)}return s.prototype.forceUpdateState=function(){globalThis.__DEV__!==!1&&b.warn(48)},s.prototype.executeQuery=function(t){var e=this,r;t.query&&Object.assign(this,{query:t.query}),this.watchQueryOptions=this.createWatchQueryOptions(this.queryHookOptions=t);var o=this.observable.reobserveAsConcast(this.getObsQueryOptions());return this.previousData=((r=this.result)===null||r===void 0?void 0:r.data)||this.previousData,this.result=void 0,this.forceUpdate(),new Promise(function(i){var a;o.subscribe({next:function(l){a=l},error:function(){i(e.toQueryResult(e.observable.getCurrentResult()))},complete:function(){i(e.toQueryResult(a))}})})},s.prototype.useQuery=function(t){var e=this;this.renderPromises=u.useContext(R()).renderPromises,this.useOptions(t);var r=this.useObservableQuery(),o=F(u.useCallback(function(i){if(e.renderPromises)return function(){};e.forceUpdate=i;var a=function(){var n=e.result,h=r.getCurrentResult();n&&n.loading===h.loading&&n.networkStatus===h.networkStatus&&d(n.data,h.data)||e.setResult(h)},l=function(n){var h=r.last;c.unsubscribe();try{r.resetLastResults(),c=r.subscribe(a,l)}finally{r.last=h}if(!j.call(n,"graphQLErrors"))throw n;var p=e.result;(!p||p&&p.loading||!d(n,p.error))&&e.setResult({data:p&&p.data,error:n,loading:!1,networkStatus:f.error})},c=r.subscribe(a,l);return function(){setTimeout(function(){return c.unsubscribe()}),e.forceUpdate=function(){return e.forceUpdateState()}}},[r,this.renderPromises,this.client.disableNetworkFetches]),function(){return e.getCurrentResult()},function(){return e.getCurrentResult()});return this.unsafeHandlePartialRefetch(o),this.toQueryResult(o)},s.prototype.useOptions=function(t){var e,r=this.createWatchQueryOptions(this.queryHookOptions=t),o=this.watchQueryOptions;d(r,o)||(this.watchQueryOptions=r,o&&this.observable&&(this.observable.reobserve(this.getObsQueryOptions()),this.previousData=((e=this.result)===null||e===void 0?void 0:e.data)||this.previousData,this.result=void 0)),this.onCompleted=t.onCompleted||s.prototype.onCompleted,this.onError=t.onError||s.prototype.onError,(this.renderPromises||this.client.disableNetworkFetches)&&this.queryHookOptions.ssr===!1&&!this.queryHookOptions.skip?this.result=this.ssrDisabledResult:this.queryHookOptions.skip||this.watchQueryOptions.fetchPolicy==="standby"?this.result=this.skipStandbyResult:(this.result===this.ssrDisabledResult||this.result===this.skipStandbyResult)&&(this.result=void 0)},s.prototype.getObsQueryOptions=function(){var t=[],e=this.client.defaultOptions.watchQuery;return e&&t.push(e),this.queryHookOptions.defaultOptions&&t.push(this.queryHookOptions.defaultOptions),t.push(E(this.observable&&this.observable.options,this.watchQueryOptions)),t.reduce(C)},s.prototype.createWatchQueryOptions=function(t){var e;t===void 0&&(t={});var r=t.skip;t.ssr,t.onCompleted,t.onError,t.defaultOptions;var o=g(t,["skip","ssr","onCompleted","onError","defaultOptions"]),i=Object.assign(o,{query:this.query});if(this.renderPromises&&(i.fetchPolicy==="network-only"||i.fetchPolicy==="cache-and-network")&&(i.fetchPolicy="cache-first"),i.variables||(i.variables={}),r){var a=i.fetchPolicy,l=a===void 0?this.getDefaultFetchPolicy():a,c=i.initialFetchPolicy,n=c===void 0?l:c;Object.assign(i,{initialFetchPolicy:n,fetchPolicy:"standby"})}else i.fetchPolicy||(i.fetchPolicy=((e=this.observable)===null||e===void 0?void 0:e.options.initialFetchPolicy)||this.getDefaultFetchPolicy());return i},s.prototype.getDefaultFetchPolicy=function(){var t,e;return((t=this.queryHookOptions.defaultOptions)===null||t===void 0?void 0:t.fetchPolicy)||((e=this.client.defaultOptions.watchQuery)===null||e===void 0?void 0:e.fetchPolicy)||"cache-first"},s.prototype.onCompleted=function(t){},s.prototype.onError=function(t){},s.prototype.useObservableQuery=function(){var t=this.observable=this.renderPromises&&this.renderPromises.getSSRObservable(this.watchQueryOptions)||this.observable||this.client.watchQuery(this.getObsQueryOptions());this.obsQueryFields=u.useMemo(function(){return{refetch:t.refetch.bind(t),reobserve:t.reobserve.bind(t),fetchMore:t.fetchMore.bind(t),updateQuery:t.updateQuery.bind(t),startPolling:t.startPolling.bind(t),stopPolling:t.stopPolling.bind(t),subscribeToMore:t.subscribeToMore.bind(t)}},[t]);var e=!(this.queryHookOptions.ssr===!1||this.queryHookOptions.skip);return this.renderPromises&&e&&(this.renderPromises.registerSSRObservable(t),t.getCurrentResult().loading&&this.renderPromises.addObservableQueryPromise(t)),t},s.prototype.setResult=function(t){var e=this.result;e&&e.data&&(this.previousData=e.data),this.result=t,this.forceUpdate(),this.handleErrorOrCompleted(t,e)},s.prototype.handleErrorOrCompleted=function(t,e){var r=this;if(!t.loading){var o=this.toApolloError(t);Promise.resolve().then(function(){o?r.onError(o):t.data&&(e==null?void 0:e.networkStatus)!==t.networkStatus&&t.networkStatus===f.ready&&r.onCompleted(t.data)}).catch(function(i){globalThis.__DEV__!==!1&&b.warn(i)})}},s.prototype.toApolloError=function(t){return Q(t.errors)?new k({graphQLErrors:t.errors}):t.error},s.prototype.getCurrentResult=function(){return this.result||this.handleErrorOrCompleted(this.result=this.observable.getCurrentResult()),this.result},s.prototype.toQueryResult=function(t){var e=this.toQueryResultCache.get(t);if(e)return e;var r=t.data;t.partial;var o=g(t,["data","partial"]);return this.toQueryResultCache.set(t,e=y(y(y({data:r},o),this.obsQueryFields),{client:this.client,observable:this.observable,variables:this.observable.variables,called:!this.queryHookOptions.skip,previousData:this.previousData})),!e.error&&Q(t.errors)&&(e.error=new k({graphQLErrors:t.errors})),e},s.prototype.unsafeHandlePartialRefetch=function(t){t.partial&&this.queryHookOptions.partialRefetch&&!t.loading&&(!t.data||Object.keys(t.data).length===0)&&this.observable.options.fetchPolicy!=="cache-only"&&(Object.assign(t,{loading:!0,networkStatus:f.refetch}),this.observable.refetch())},s}();export{M as a,W as u};
