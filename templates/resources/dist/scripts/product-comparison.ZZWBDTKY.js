(()=>{window.StoreConnect=window.StoreConnect||{};window.StoreConnect.ObserverCallbacks=window.StoreConnect.ObserverCallbacks||[];document.addEventListener("DOMContentLoaded",p);function f(r){window.StoreConnect.ObserverCallbacks.push(r)}function p(){window.StoreConnect.Observer||(window.StoreConnect.Observer=new MutationObserver(r=>{r.forEach(t=>{t.addedNodes.forEach(n=>{n.nodeType===Node.ELEMENT_NODE&&m(n,"mutation")})})}),window.StoreConnect.Observer.observe(document.body,{childList:!0,subtree:!0}),m(document,"initial load"))}function m(r,t){window.StoreConnect.ObserverCallbacks.forEach(n=>n(r))}f(C);function C(r){let t=[];[...r.querySelectorAll("[data-js-compare-add]")].forEach(e=>{e.addEventListener("change",function(c){h(c.target);let s=document.querySelector("[data-js-compare]"),a=document.querySelector("[data-js-compare-trigger]"),o=document.querySelector("[data-js-compare-count]");s&&s.classList.toggle("is-hidden",g()),a&&(a.disabled=S()),o&&(o.textContent=t.length)})});let n=r.querySelector("[data-js-compare-trigger]");n&&n.addEventListener("click",function(e){let c=e.target.getAttribute("data-js-compare-trigger"),s=t,a=new URLSearchParams({category:c});s.forEach(o=>a.append("ids[]",o)),fetch(`/product_comparison?${a.toString()}`,{method:"GET"}).then(o=>o.json()).then(o=>{if(o.status==="error"){console.error(o.message);return}else{if(o.html===""){console.error("No products found");return}let l=document.querySelector("[data-js-screen]"),u=document.querySelector("[data-js-screen-body]");l&&l.classList.remove("is-hidden"),u&&(u.innerHTML=o.html)}})});let d=r.querySelector("[data-js-compare-cancel]");d&&d.addEventListener("click",()=>{t=[];let e=document.querySelector("[data-js-compare]");e&&e.classList.add("is-hidden"),document.querySelectorAll("[data-js-compare-add]").forEach(c=>c.checked=!1)});let i=r.querySelector("[data-js-screen-close]");i&&i.addEventListener("click",()=>{let e=document.querySelector("[data-js-screen]");e&&e.classList.add("is-hidden")});function h(e){if(e.checked){t.push(e.id);return}t=t.filter(c=>c!==e.id)}function g(){return t.length<1}function S(){return t.length<2}}})();
