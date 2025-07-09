(() => {
  // src/scripts/theme/utils/init.js
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.ObserverCallbacks = window.StoreConnect.ObserverCallbacks || [];
  document.addEventListener("DOMContentLoaded", establishObserver);
  function onDomChange(initCallback) {
    window.StoreConnect.ObserverCallbacks.push(initCallback);
  }
  function establishObserver() {
    if (window.StoreConnect.Observer) return;
    window.StoreConnect.Observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            runCallbacks(node, "mutation");
          }
        });
      });
    });
    window.StoreConnect.Observer.observe(document.body, { childList: true, subtree: true });
    runCallbacks(document, "initial load");
  }
  function runCallbacks(node, _context) {
    window.StoreConnect.ObserverCallbacks.forEach((callback) => callback(node));
  }

  // src/scripts/packs/cart-timer.js
  onDomChange(init);
  var WARNING_TIMESPAN = 1e3 * 60;
  var expiry;
  function init(node) {
    ;
    [...node.querySelectorAll("[data-sc-cart-timer]")].forEach((timer) => {
      expiry = timer.getAttribute("data-sc-expiry");
      const timeRemaining = getTimespan(expiry);
      if (timeRemaining <= 0) return expire();
      setInterval(() => timer.dispatchEvent(new Event("countdown")), 1e3);
      timer.addEventListener("countdown", countdown);
    });
  }
  function countdown() {
    const timeRemaining = getTimespan(expiry);
    if (timeRemaining <= 0) return expire();
    if (timeRemaining <= WARNING_TIMESPAN) warn();
    [...document.querySelectorAll("[data-sc-cart-timer]")].map((timer) => {
      timer.querySelector("[data-sc-mins]").innerText = getMinutes(timeRemaining);
      timer.querySelector("[data-sc-secs]").innerText = getSeconds(timeRemaining);
    });
  }
  function warn() {
    ;
    [...document.querySelectorAll("[data-sc-cart-timer]")].map(
      (timer) => timer.classList.add("warning")
    );
  }
  function expire() {
    document.removeEventListener("countdown", countdown);
    [...document.querySelectorAll("[data-sc-cart-timer]")].map((timer) => {
      const label = timer.querySelector("[data-sc-label]");
      timer.classList.add("expired");
      label.innerText = label.dataset.scExpired;
    });
    [...document.querySelectorAll("[data-sc-cart]")].map((cart) => {
      cart.classList.add("expired");
      [...cart.querySelectorAll("[data-sc-cart-booking]")].map((node) => {
        node.classList.add("expired");
      });
    });
  }
  function getTimespan(expiryDate) {
    return Date.parse(expiryDate) - Date.parse(/* @__PURE__ */ new Date());
  }
  function getMinutes(time) {
    return new Date(time).getMinutes();
  }
  function getSeconds(time) {
    const secs = new Date(time).getSeconds();
    return (secs < 10 ? "0" : "") + secs;
  }
})();
//# sourceMappingURL=cart-timer.7SII6DIO.js.map
