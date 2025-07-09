(() => {
  // src/scripts/packs/cart-tease.js
  var TEASE_INTERVAL = 7e3;
  document.addEventListener("DOMContentLoaded", tease);
  function closeCartIfClicked(e) {
    let target = e.target, parents = [];
    while (target) {
      parents.unshift(target);
      target = target.parentElement;
    }
    let shouldClose = true;
    parents.forEach((parent) => {
      if (parent.hasAttribute("data-nav") && parent.getAttribute("data-nav") === "cart") {
        shouldClose = false;
      }
    });
    if (shouldClose) {
      close();
    }
  }
  function open() {
    const cart = document.querySelector("[data-nav=cart]");
    if (cart) {
      cart.classList.add("is-active");
    }
  }
  function close() {
    const body = document.querySelector("body");
    if (body) {
      body.removeEventListener("click", closeCartIfClicked);
    }
    const cart = document.querySelector("[data-nav=cart]");
    if (cart) {
      cart.classList.remove("is-active");
    }
  }
  function tease(_e) {
    const cart = document.querySelector("[data-nav=cart]");
    if (cart) {
      open();
      setTimeout(() => cart.classList.remove("is-active"), TEASE_INTERVAL);
    }
    const body = document.querySelector("body");
    if (body) {
      body.addEventListener("click", closeCartIfClicked);
    }
  }
})();
//# sourceMappingURL=cart-tease.FAJU4BKE.js.map
