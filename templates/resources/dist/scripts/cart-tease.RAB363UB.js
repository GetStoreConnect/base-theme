(()=>{document.addEventListener("DOMContentLoaded",s);function o(e){let t=e.target,c=[];for(;t;)c.unshift(t),t=t.parentElement;let a=!0;c.forEach(n=>{n.hasAttribute("data-nav")&&n.getAttribute("data-nav")==="cart"&&(a=!1)}),a&&r()}function i(){let e=document.querySelector("[data-nav=cart]");e&&e.classList.add("is-active")}function r(){let e=document.querySelector("body");e&&e.removeEventListener("click",o);let t=document.querySelector("[data-nav=cart]");t&&t.classList.remove("is-active")}function s(e){let t=document.querySelector("[data-nav=cart]");t&&(i(),setTimeout(()=>t.classList.remove("is-active"),7e3));let c=document.querySelector("body");c&&c.addEventListener("click",o)}})();
