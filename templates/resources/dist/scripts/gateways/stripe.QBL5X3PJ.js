(()=>{var Ee=Object.create;var Q=Object.defineProperty;var Ce=Object.getOwnPropertyDescriptor;var ke=Object.getOwnPropertyNames;var xe=Object.getPrototypeOf,_e=Object.prototype.hasOwnProperty;var $=(o,e)=>()=>(e||o((e={exports:{}}).exports,e),e.exports);var je=(o,e,r,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let t of ke(e))!_e.call(o,t)&&t!==r&&Q(o,t,{get:()=>e[t],enumerable:!(i=Ce(e,t))||i.enumerable});return o};var K=(o,e,r)=>(r=o!=null?Ee(xe(o)):{},je(e||!o||!o.__esModule?Q(r,"default",{value:o,enumerable:!0}):r,o));var Y=$((V,A)=>{(function(){var o=this;(function(){(function(){this.Rails={linkClickSelector:"a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",buttonClickSelector:{selector:"button[data-remote]:not([form]), button[data-confirm]:not([form])",exclude:"form button"},inputChangeSelector:"select[data-remote], input[data-remote], textarea[data-remote]",formSubmitSelector:"form:not([data-turbo=true])",formInputClickSelector:"form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",formDisableSelector:"input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",formEnableSelector:"input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",fileInputSelector:"input[name][type=file]:not([disabled])",linkDisableSelector:"a[data-disable-with], a[data-disable]",buttonDisableSelector:"button[data-remote][data-disable-with], button[data-remote][data-disable]"}}).call(this)}).call(o);var e=o.Rails;(function(){(function(){var r;r=null,e.loadCSPNonce=function(){var i;return r=(i=document.querySelector("meta[name=csp-nonce]"))!=null?i.content:void 0},e.cspNonce=function(){return r??e.loadCSPNonce()}}).call(this),function(){var r,i;i=Element.prototype.matches||Element.prototype.matchesSelector||Element.prototype.mozMatchesSelector||Element.prototype.msMatchesSelector||Element.prototype.oMatchesSelector||Element.prototype.webkitMatchesSelector,e.matches=function(t,l){return l.exclude!=null?i.call(t,l.selector)&&!i.call(t,l.exclude):i.call(t,l)},r="_ujsData",e.getData=function(t,l){var s;return(s=t[r])!=null?s[l]:void 0},e.setData=function(t,l,s){return t[r]==null&&(t[r]={}),t[r][l]=s},e.$=function(t){return Array.prototype.slice.call(document.querySelectorAll(t))}}.call(this),function(){var r,i,t;r=e.$,t=e.csrfToken=function(){var l;return l=document.querySelector("meta[name=csrf-token]"),l&&l.content},i=e.csrfParam=function(){var l;return l=document.querySelector("meta[name=csrf-param]"),l&&l.content},e.CSRFProtection=function(l){var s;if(s=t(),s!=null)return l.setRequestHeader("X-CSRF-Token",s)},e.refreshCSRFTokens=function(){var l,s;if(s=t(),l=i(),s!=null&&l!=null)return r('form input[name="'+l+'"]').forEach(function(b){return b.value=s})}}.call(this),function(){var r,i,t,l;t=e.matches,r=window.CustomEvent,typeof r!="function"&&(r=function(s,b){var d;return d=document.createEvent("CustomEvent"),d.initCustomEvent(s,b.bubbles,b.cancelable,b.detail),d},r.prototype=window.Event.prototype,l=r.prototype.preventDefault,r.prototype.preventDefault=function(){var s;return s=l.call(this),this.cancelable&&!this.defaultPrevented&&Object.defineProperty(this,"defaultPrevented",{get:function(){return!0}}),s}),i=e.fire=function(s,b,d){var n;return n=new r(b,{bubbles:!0,cancelable:!0,detail:d}),s.dispatchEvent(n),!n.defaultPrevented},e.stopEverything=function(s){return i(s.target,"ujs:everythingStopped"),s.preventDefault(),s.stopPropagation(),s.stopImmediatePropagation()},e.delegate=function(s,b,d,n){return s.addEventListener(d,function(u){var m;for(m=u.target;!(!(m instanceof Element)||t(m,b));)m=m.parentNode;if(m instanceof Element&&n.call(m,u)===!1)return u.preventDefault(),u.stopPropagation()})}}.call(this),function(){var r,i,t,l,s,b,d;l=e.cspNonce,i=e.CSRFProtection,s=e.fire,r={"*":"*/*",text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript",script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},e.ajax=function(n){var u;if(n=b(n),u=t(n,function(){var m,p;return p=d((m=u.response)!=null?m:u.responseText,u.getResponseHeader("Content-Type")),Math.floor(u.status/100)===2?typeof n.success=="function"&&n.success(p,u.statusText,u):typeof n.error=="function"&&n.error(p,u.statusText,u),typeof n.complete=="function"?n.complete(u,u.statusText):void 0}),n.beforeSend!=null&&!n.beforeSend(u,n))return!1;if(u.readyState===XMLHttpRequest.OPENED)return u.send(n.data)},b=function(n){return n.url=n.url||location.href,n.type=n.type.toUpperCase(),n.type==="GET"&&n.data&&(n.url.indexOf("?")<0?n.url+="?"+n.data:n.url+="&"+n.data),r[n.dataType]==null&&(n.dataType="*"),n.accept=r[n.dataType],n.dataType!=="*"&&(n.accept+=", */*; q=0.01"),n},t=function(n,u){var m;return m=new XMLHttpRequest,m.open(n.type,n.url,!0),m.setRequestHeader("Accept",n.accept),typeof n.data=="string"&&m.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=UTF-8"),n.crossDomain||(m.setRequestHeader("X-Requested-With","XMLHttpRequest"),i(m)),m.withCredentials=!!n.withCredentials,m.onreadystatechange=function(){if(m.readyState===XMLHttpRequest.DONE)return u(m)},m},d=function(n,u){var m,p;if(typeof n=="string"&&typeof u=="string"){if(u.match(/\bjson\b/))try{n=JSON.parse(n)}catch{}else if(u.match(/\b(?:java|ecma)script\b/))p=document.createElement("script"),p.setAttribute("nonce",l()),p.text=n,document.head.appendChild(p).parentNode.removeChild(p);else if(u.match(/\b(xml|html|svg)\b/)){m=new DOMParser,u=u.replace(/;.+/,"");try{n=m.parseFromString(n,u)}catch{}}}return n},e.href=function(n){return n.href},e.isCrossDomain=function(n){var u,m,p;m=document.createElement("a"),m.href=location.href,p=document.createElement("a");try{return p.href=n,!((!p.protocol||p.protocol===":")&&!p.host||m.protocol+"//"+m.host==p.protocol+"//"+p.host)}catch(y){return u=y,!0}}}.call(this),function(){var r,i;r=e.matches,i=function(t){return Array.prototype.slice.call(t)},e.serializeElement=function(t,l){var s,b;return s=[t],r(t,"form")&&(s=i(t.elements)),b=[],s.forEach(function(d){if(!(!d.name||d.disabled)&&!r(d,"fieldset[disabled] *")){if(r(d,"select"))return i(d.options).forEach(function(n){if(n.selected)return b.push({name:d.name,value:n.value})});if(d.checked||["radio","checkbox","submit"].indexOf(d.type)===-1)return b.push({name:d.name,value:d.value})}}),l&&b.push(l),b.map(function(d){return d.name!=null?encodeURIComponent(d.name)+"="+encodeURIComponent(d.value):d}).join("&")},e.formElements=function(t,l){return r(t,"form")?i(t.elements).filter(function(s){return r(s,l)}):i(t.querySelectorAll(l))}}.call(this),function(){var r,i,t;i=e.fire,t=e.stopEverything,e.handleConfirm=function(l){if(!r(this))return t(l)},e.confirm=function(l,s){return confirm(l)},r=function(l){var s,b,d;if(d=l.getAttribute("data-confirm"),!d)return!0;if(s=!1,i(l,"confirm")){try{s=e.confirm(d,l)}catch{}b=i(l,"confirm:complete",[s])}return s&&b}}.call(this),function(){var r,i,t,l,s,b,d,n,u,m,p,y;m=e.matches,n=e.getData,p=e.setData,y=e.stopEverything,d=e.formElements,e.handleDisabledElement=function(a){var c;if(c=this,c.disabled)return y(a)},e.enableElement=function(a){var c;if(a instanceof Event){if(u(a))return;c=a.target}else c=a;if(m(c,e.linkDisableSelector))return b(c);if(m(c,e.buttonDisableSelector)||m(c,e.formEnableSelector))return l(c);if(m(c,e.formSubmitSelector))return s(c)},e.disableElement=function(a){var c;if(c=a instanceof Event?a.target:a,m(c,e.linkDisableSelector))return t(c);if(m(c,e.buttonDisableSelector)||m(c,e.formDisableSelector))return r(c);if(m(c,e.formSubmitSelector))return i(c)},t=function(a){var c;if(!n(a,"ujs:disabled"))return c=a.getAttribute("data-disable-with"),c!=null&&(p(a,"ujs:enable-with",a.innerHTML),a.innerHTML=c),a.addEventListener("click",y),p(a,"ujs:disabled",!0)},b=function(a){var c;return c=n(a,"ujs:enable-with"),c!=null&&(a.innerHTML=c,p(a,"ujs:enable-with",null)),a.removeEventListener("click",y),p(a,"ujs:disabled",null)},i=function(a){return d(a,e.formDisableSelector).forEach(r)},r=function(a){var c;if(!n(a,"ujs:disabled"))return c=a.getAttribute("data-disable-with"),c!=null&&(m(a,"button")?(p(a,"ujs:enable-with",a.innerHTML),a.innerHTML=c):(p(a,"ujs:enable-with",a.value),a.value=c)),a.disabled=!0,p(a,"ujs:disabled",!0)},s=function(a){return d(a,e.formEnableSelector).forEach(l)},l=function(a){var c;return c=n(a,"ujs:enable-with"),c!=null&&(m(a,"button")?a.innerHTML=c:a.value=c,p(a,"ujs:enable-with",null)),a.disabled=!1,p(a,"ujs:disabled",null)},u=function(a){var c,f;return f=(c=a.detail)!=null?c[0]:void 0,f?.getResponseHeader("X-Xhr-Redirect")!=null}}.call(this),function(){var r;r=e.stopEverything,e.handleMethod=function(i){var t,l,s,b,d,n,u;if(n=this,u=n.getAttribute("data-method"),!!u)return d=e.href(n),l=e.csrfToken(),t=e.csrfParam(),s=document.createElement("form"),b="<input name='_method' value='"+u+"' type='hidden' />",t!=null&&l!=null&&!e.isCrossDomain(d)&&(b+="<input name='"+t+"' value='"+l+"' type='hidden' />"),b+='<input type="submit" />',s.method="post",s.action=d,s.target=n.target,s.innerHTML=b,s.style.display="none",document.body.appendChild(s),s.querySelector('[type="submit"]').click(),r(i)}}.call(this),function(){var r,i,t,l,s,b,d,n,u,m=[].slice;b=e.matches,t=e.getData,n=e.setData,i=e.fire,u=e.stopEverything,r=e.ajax,l=e.isCrossDomain,d=e.serializeElement,s=function(p){var y;return y=p.getAttribute("data-remote"),y!=null&&y!=="false"},e.handleRemote=function(p){var y,a,c,f,h,S,v;return f=this,s(f)?i(f,"ajax:before")?(v=f.getAttribute("data-with-credentials"),c=f.getAttribute("data-type")||"script",b(f,e.formSubmitSelector)?(y=t(f,"ujs:submit-button"),h=t(f,"ujs:submit-button-formmethod")||f.method,S=t(f,"ujs:submit-button-formaction")||f.getAttribute("action")||location.href,h.toUpperCase()==="GET"&&(S=S.replace(/\?.*$/,"")),f.enctype==="multipart/form-data"?(a=new FormData(f),y!=null&&a.append(y.name,y.value)):a=d(f,y),n(f,"ujs:submit-button",null),n(f,"ujs:submit-button-formmethod",null),n(f,"ujs:submit-button-formaction",null)):b(f,e.buttonClickSelector)||b(f,e.inputChangeSelector)?(h=f.getAttribute("data-method"),S=f.getAttribute("data-url"),a=d(f,f.getAttribute("data-params"))):(h=f.getAttribute("data-method"),S=e.href(f),a=f.getAttribute("data-params")),r({type:h||"GET",url:S,data:a,dataType:c,beforeSend:function(g,x){return i(f,"ajax:beforeSend",[g,x])?i(f,"ajax:send",[g]):(i(f,"ajax:stopped"),!1)},success:function(){var g;return g=1<=arguments.length?m.call(arguments,0):[],i(f,"ajax:success",g)},error:function(){var g;return g=1<=arguments.length?m.call(arguments,0):[],i(f,"ajax:error",g)},complete:function(){var g;return g=1<=arguments.length?m.call(arguments,0):[],i(f,"ajax:complete",g)},crossDomain:l(S),withCredentials:v!=null&&v!=="false"}),u(p)):(i(f,"ajax:stopped"),!1):!0},e.formSubmitButtonClick=function(p){var y,a;if(y=this,a=y.form,!!a)return y.name&&n(a,"ujs:submit-button",{name:y.name,value:y.value}),n(a,"ujs:formnovalidate-button",y.formNoValidate),n(a,"ujs:submit-button-formaction",y.getAttribute("formaction")),n(a,"ujs:submit-button-formmethod",y.getAttribute("formmethod"))},e.preventInsignificantClick=function(p){var y,a,c,f,h,S;if(c=this,h=(c.getAttribute("data-method")||"GET").toUpperCase(),y=c.getAttribute("data-params"),f=p.metaKey||p.ctrlKey,a=f&&h==="GET"&&!y,S=p.button!=null&&p.button!==0,S||a)return p.stopImmediatePropagation()}}.call(this),function(){var r,i,t,l,s,b,d,n,u,m,p,y,a,c,f;if(b=e.fire,t=e.delegate,n=e.getData,r=e.$,f=e.refreshCSRFTokens,i=e.CSRFProtection,a=e.loadCSPNonce,s=e.enableElement,l=e.disableElement,m=e.handleDisabledElement,u=e.handleConfirm,c=e.preventInsignificantClick,y=e.handleRemote,d=e.formSubmitButtonClick,p=e.handleMethod,typeof jQuery<"u"&&jQuery!==null&&jQuery.ajax!=null){if(jQuery.rails)throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");jQuery.rails=e,jQuery.ajaxPrefilter(function(h,S,v){if(!h.crossDomain)return i(v)})}e.start=function(){if(window._rails_loaded)throw new Error("rails-ujs has already been loaded!");return window.addEventListener("pageshow",function(){return r(e.formEnableSelector).forEach(function(h){if(n(h,"ujs:disabled"))return s(h)}),r(e.linkDisableSelector).forEach(function(h){if(n(h,"ujs:disabled"))return s(h)})}),t(document,e.linkDisableSelector,"ajax:complete",s),t(document,e.linkDisableSelector,"ajax:stopped",s),t(document,e.buttonDisableSelector,"ajax:complete",s),t(document,e.buttonDisableSelector,"ajax:stopped",s),t(document,e.linkClickSelector,"click",c),t(document,e.linkClickSelector,"click",m),t(document,e.linkClickSelector,"click",u),t(document,e.linkClickSelector,"click",l),t(document,e.linkClickSelector,"click",y),t(document,e.linkClickSelector,"click",p),t(document,e.buttonClickSelector,"click",c),t(document,e.buttonClickSelector,"click",m),t(document,e.buttonClickSelector,"click",u),t(document,e.buttonClickSelector,"click",l),t(document,e.buttonClickSelector,"click",y),t(document,e.inputChangeSelector,"change",m),t(document,e.inputChangeSelector,"change",u),t(document,e.inputChangeSelector,"change",y),t(document,e.formSubmitSelector,"submit",m),t(document,e.formSubmitSelector,"submit",u),t(document,e.formSubmitSelector,"submit",y),t(document,e.formSubmitSelector,"submit",function(h){return setTimeout(function(){return l(h)},13)}),t(document,e.formSubmitSelector,"ajax:send",l),t(document,e.formSubmitSelector,"ajax:complete",s),t(document,e.formInputClickSelector,"click",c),t(document,e.formInputClickSelector,"click",m),t(document,e.formInputClickSelector,"click",u),t(document,e.formInputClickSelector,"click",d),document.addEventListener("DOMContentLoaded",f),document.addEventListener("DOMContentLoaded",a),window._rails_loaded=!0},window.Rails===e&&b(document,"rails:attachBindings")&&e.start()}.call(this)}).call(this),typeof A=="object"&&A.exports?A.exports=e:typeof define=="function"&&define.amd&&define(e)}).call(V)});var Se=$(G=>{"use strict";Object.defineProperty(G,"__esModule",{value:!0});function q(o){"@babel/helpers - typeof";return typeof Symbol=="function"&&typeof Symbol.iterator=="symbol"?q=function(e){return typeof e}:q=function(e){return e&&typeof Symbol=="function"&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},q(o)}var be="https://js.stripe.com/v3",Le=/^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/,me="loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used",Fe=function(){for(var e=document.querySelectorAll('script[src^="'.concat(be,'"]')),r=0;r<e.length;r++){var i=e[r];if(Le.test(i.src))return i}return null},pe=function(e){var r=e&&!e.advancedFraudSignals?"?advancedFraudSignals=false":"",i=document.createElement("script");i.src="".concat(be).concat(r);var t=document.head||document.body;if(!t)throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");return t.appendChild(i),i},Me=function(e,r){!e||!e._registerWrapper||e._registerWrapper({name:"stripe-js",version:"3.4.0",startTime:r})},T=null,F=null,M=null,qe=function(e){return function(){e(new Error("Failed to load Stripe.js"))}},Ne=function(e,r){return function(){window.Stripe?e(window.Stripe):r(new Error("Stripe.js not available"))}},$e=function(e){return T!==null?T:(T=new Promise(function(r,i){if(typeof window>"u"||typeof document>"u"){r(null);return}if(window.Stripe&&e&&console.warn(me),window.Stripe){r(window.Stripe);return}try{var t=Fe();if(t&&e)console.warn(me);else if(!t)t=pe(e);else if(t&&M!==null&&F!==null){var l;t.removeEventListener("load",M),t.removeEventListener("error",F),(l=t.parentNode)===null||l===void 0||l.removeChild(t),t=pe(e)}M=Ne(r,i),F=qe(i),t.addEventListener("load",M),t.addEventListener("error",F)}catch(s){i(s);return}}),T.catch(function(r){return T=null,Promise.reject(r)}))},Ie=function(e,r,i){if(e===null)return null;var t=e.apply(void 0,r);return Me(t,i),t},he=function(e){var r=`invalid load parameters; expected object of shape

    {advancedFraudSignals: boolean}

but received

    `.concat(JSON.stringify(e),`
`);if(e===null||q(e)!=="object")throw new Error(r);if(Object.keys(e).length===1&&typeof e.advancedFraudSignals=="boolean")return e;throw new Error(r)},N,z=!1,ye=function(){for(var e=arguments.length,r=new Array(e),i=0;i<e;i++)r[i]=arguments[i];z=!0;var t=Date.now();return $e(N).then(function(l){return Ie(l,r,t)})};ye.setLoadParameters=function(o){if(z&&N){var e=he(o),r=Object.keys(e),i=r.reduce(function(t,l){var s;return t&&o[l]===((s=N)===null||s===void 0?void 0:s[l])},!0);if(i)return}if(z)throw new Error("You cannot change load parameters after calling loadStripe");N=he(o)};G.loadStripe=ye});var ve=$((Qe,ge)=>{ge.exports=Se()});var Z=K(Y()),C,E,j,I,O;window.StoreConnect=window.StoreConnect||{};function ee(o,e,r,i,t){C=o,E=e,I=r,O=i,j=t,w().addEventListener("submit",Re,!1)}function R(){return j?`${E}Product${j}`:E}function te(){return document.getElementById(`${C}PaymentError${R()}`)}function w(){return document.getElementById(`${C}PaymentForm${R()}`)}function k(o){return document.getElementById(`${o}__payment__${E}`)}function Pe(){return document.getElementById(`${C}PaymentButton${E}`)}function U(o){let e=Pe();if(O){O(e,o);return}e&&(o?(e.removeAttribute("data-loading"),e.disabled=!1,setTimeout(()=>{e.disabled=!1},500)):(e.setAttribute("data-loading",!0),e.disabled=!0))}function L(o,e=!0){let r=te();r?(e&&(r.innerText=o),o&&r.classList.remove("sc-hide")):(console.warn(C?`Provider '${C}' does not have a #${C}PaymentError${E} div container`:"Run init(providerName, providerId) before calling showError(error)"),console.error(o)),U(!0)}function re(){te().classList.add("sc-hide")}function Re(o){o.preventDefault(),Te(()=>{I&&I(w())})}function Te(o){U(!1),document.dispatchEvent(new CustomEvent("store-connect.payment-processing-start")),o()}function ne({payload:o,handleSuccess:e}){re();let r=w();o.payment=o.payment||{},o.payment.provider_id=E,o.payment.method=C;let i=document.getElementById(`_checkout_customer_notes_${E}`);i&&(o.customer_notes=i.value);let t=document.getElementById(`_checkout_assisted_by_user_id_${E}`);t&&(o.assisted_by_user_id=t.value);let l=new FormData(r);o.answers={},l.forEach((d,n)=>{let u=n.match(/answers\[(.*)\]\[answer\]/);u&&(o.answers[u[1]]={answer:d})});let s=r._method?r._method.value:r.getAttribute("method"),b=o.url?o.url:r.getAttribute("action");Z.default.ajax({url:b,type:s||o.method,beforeSend(d,n){return d.setRequestHeader("Content-Type","application/json; charset=UTF-8"),n.data=JSON.stringify(o),!0},success:function(d,n,u){d.sf?window.parent.postMessage({type:"payment_status",status:"success",message:d.paymentId},"*"):d.redirect_url?window.location=d.redirect_url:d.error_message?De(d.error_message):d.payment_response&&e&&e(d.payment_response.action)},error:function(d,n,u){if(u.status===0)return;let m=document.querySelector("[data-general-error-message]");m&&L(m.getAttribute("data-general-error-message"))}})}function De(o){o?L(o):re(),U(!0)}function ae(){let o=w();return o?o.dataset.apiKey:null}function oe(){let o=w();return o?!!o.dataset.showWallets:!1}function ie(){let o=w();return o?o.dataset.totalPayable:null}function ce(){let o=w();return o?o.dataset.currencyCode:null}function _(o){let e=document.querySelector('meta[name="sc-path"]');if(e){let r=e.content;if(r)return`/${r}${o}`}return o}function H(){return w().dataset.onlyExpressCheckout==="true"}function le(){return w().dataset.storeName}function se(){return w().dataset.offerShipping==="true"}function ue(){return JSON.parse(w().dataset.shippingCountries||"[]")}function P(){return w().querySelector("input[name='authenticity_token']")?.value}async function B(o){if(!o)return;let e=await fetch(_("/express_checkout/carts"),{method:"POST",headers:{"content-type":"application/json"},body:JSON.stringify({authenticity_token:P(),add_to_cart_form_data:Ae(),dedicated_cart_product_id:o})});if(!e.ok)return await e.json();let r=await e.json();return{amount:Math.round(r.cart.amount*100)}}async function W(o){let e=await fetch(_("/express_checkout/shipping_methods"),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({address:o,authenticity_token:P(),dedicated_cart_product_id:j})});return e.ok?{shippingRates:(await e.json()).shipping.rates.sort((t,l)=>t.amount-l.amount).slice(0,9).map(t=>({id:t.id,amount:Math.round(t.amount*100),displayName:t.label,deliveryEstimate:t.description}))}:await e.json()}async function X(o){let e=await fetch(_("/express_checkout/carts"),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({authenticity_token:P(),dedicated_cart_product_id:j,shipping_rate:o})});if(!e.ok)return await e.json();let r=await e.json();return{amount:Math.round(r.cart.amount*100)}}function de(){return[{id:"loading",displayName:"Loading...",amount:0}]}function Ae(){let o=document.querySelector('form[data-cart-form="true"]'),e=new FormData(o),r={};return e.forEach((i,t)=>{r[t]=i}),r}function fe(){let o=`${C}WalletsContainer${E}`,e=document.getElementById(o);e&&e.remove()}var we=K(ve());window.StoreConnect=window.StoreConnect||{};window.StoreConnect.Gateways=window.StoreConnect.Gateways||{};window.StoreConnect.Gateways.Stripe=function({providerId:o,dedicatedCartProductId:e}){ee("Stripe",o,b,null,e);let r,i,t;function l(){return w().dataset.paymentsUrl}function s(){return w().dataset.intentsUrl}function b(a){i.createToken(r,{name:k("card_name").value}).then(d)}function d(a){if(a.error)L(a.error.message);else{let c=a.token,f={payment_source:{tok_id:c.id,last_digits:c.card.last4,month:c.card.exp_month,year:c.card.exp_year}};ne({payload:f})}}async function n(){if(k("card_number")){t=i.elements();let a=document.querySelector(":root"),c=getComputedStyle(a),f=c.getPropertyValue("--sc-font-base").trim(),h=c.getPropertyValue("--sc-font-family").trim();r=t.create("cardNumber",{placeholder:k("card_number").dataset.placeholder,classes:{base:"SC-Field_input SC-Field-stripe sc-expand"},style:{base:{fontSize:f,fontFamily:h}}}),r.mount(`#${k("card_number").id}`),t.create("cardExpiry",{placeholder:k("card_expiry").dataset.placeholder,classes:{base:"SC-Field_input SC-Field-stripe"},style:{base:{fontSize:f,fontFamily:h}}}).mount(`#${k("card_expiry").id}`),t.create("cardCvc",{placeholder:k("card_verification").dataset.placeholder,classes:{base:"SC-Field_input SC-Field-stripe"},style:{base:{fontSize:f,fontFamily:h}}}).mount(`#${k("card_verification").id}`)}}function u({error:a,event:c}){if(a){let f=`#StripeWalletsError${R()}`,h=document.querySelector(f);h&&(a.message?h.textContent=a.message:h.textContent=JSON.stringify(a))}c&&c.reject()}function m(){let a=`StripeWalletsCheckout${R()}`;if(!document.getElementById(a))return;let c=i.elements({mode:"payment",amount:Math.round(ie()*100),currency:ce().toLowerCase()}),f=c.create("expressCheckout",{paymentMethods:{applePay:"always",googlePay:"always"},buttonType:{applePay:"check-out",googlePay:"checkout"}});f.mount(`#${a}`),f.on("click",async h=>{let S={business:{name:le()}};if(H()&&(S.emailRequired=!0,S.billingAddressRequired=!0,se()&&(S.shippingAddressRequired=!0,S.allowedShippingCountries=ue(),S.shippingRates=de()),e)){let{amount:v,error:g}=await B(e);if(g){u({error:g,event:h});return}c.update({amount:v})}h.resolve(S)}),f.on("shippingaddresschange",async h=>{let{address:S}=h,{shippingRates:v,error:g}=await W(S);if(g){u({error:g,event:h});return}h.resolve({shippingRates:v})}),f.on("shippingratechange",async h=>{let{amount:S,error:v}=await X(h.shippingRate);if(v){u({error:v,event:h});return}c.update({amount:S}),h.resolve({})}),f.on("confirm",async h=>{if(H()){let g=await fetch(_("/express_checkout/carts"),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({billing_details:h.billingDetails,shipping_address:h.shippingAddress,shipping_rate:h.shippingRate,authenticity_token:P(),dedicated_cart_product_id:e})});if(!g.ok){let{error:x}=await g.json();if(x){u({error:x}),h.paymentFailed({reason:"fail"});return}}}let S=await p(),{error:v}=await i.confirmPayment({elements:c,clientSecret:S,confirmParams:{return_url:l()}});v&&u({error:v})})}async function p(){let a=await fetch(s(),{method:"POST",headers:{"content-type":"application/json"}}),{client_secret:c}=await a.json();return c}async function y(){i=await(0,we.loadStripe)(ae()),await n(),oe()?await m():fe()}y(),window.StoreConnectTestMode==="enabled"&&(window.testStripeExpressCheckout=async({dedicatedProductId:a})=>{if(u({error:{message:"put your left foot in"}}),a){e=a,u({error:{message:`using dedicated cart product id: ${e}`}});let{amount:D,error:J}=await B(a);if(J){u({error:J});return}}document.querySelectorAll('form[action="/cart"]').forEach(D=>{D.removeAttribute("action")});let c={line1:"123 Test St",country:"AU",state:"QLD",postal_code:"4000",city:"Milton"};u({error:{message:"starting..."}});let{shippingRates:f,error:h}=await W(c);if(u({error:{message:"fetched rates"}}),h){u({error:h});return}let S=f[0],{amount:v,error:g}=await X(S);if(g){u({error:g});return}let x=await fetch(_("/express_checkout/carts"),{method:"PUT",headers:{"content-type":"application/json"},body:JSON.stringify({authenticity_token:P(),billing_details:{name:"Test User",email:"drnic@getstoreconnect.com",address:c},shipping_address:{name:"Test User",address:c},shipping_rate:S,dedicated_cart_product_id:e})});if(!x.ok){let{error:D}=await x.json();u({error:D});return}await window.testStripeWalletCallback()},window.testStripeWalletCallback=async()=>{let a=await p(),c=new URL(l());c.searchParams.set("payment_intent",a),window.location=c})};})();
