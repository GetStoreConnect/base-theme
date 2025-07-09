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

  // src/scripts/packs/checkout-helpers.js
  onDomChange(init);
  function init(node) {
    const billingForm = node.querySelector("[data-billing-form]");
    const billingCheckbox = node.querySelector("[data-billing-checkbox] input[type=checkbox]");
    if (!billingForm || !billingCheckbox) {
      return;
    }
    if (billingCheckbox.checked) {
      billingForm.querySelectorAll("input, select").forEach((input) => {
        input.removeAttribute("required");
      });
    } else {
      billingForm.querySelectorAll(".required input, .required select").forEach((input) => {
        input.setAttribute("required", "");
      });
    }
    billingCheckbox.addEventListener("change", function() {
      billingForm.classList.toggle("is-hidden");
    });
  }
})();
//# sourceMappingURL=checkout-helpers.DHRDUBA3.js.map
