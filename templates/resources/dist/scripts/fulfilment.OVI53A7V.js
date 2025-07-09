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

  // src/scripts/packs/fulfilment.js
  window.StoreConnectUI = window.StoreConnectUI || {};
  window.StoreConnectUI.Fulfilment = function() {
    let prevSubset;
    onDomChange(init);
    function init(node) {
      ;
      [...node.querySelectorAll("[data-fulfilment-option-trigger]")].forEach(
        (trigger) => trigger.addEventListener("click", choose)
      );
    }
    function choose(event) {
      const choice = event.currentTarget.parentNode;
      const subset = choice.querySelector("[data-fulfilment-option-subset]");
      event.preventDefault();
      if (prevSubset && !prevSubset.contains(choice)) {
        close(prevSubset);
      }
      subset ? open(subset) : select(choice);
      enableSubmitButton();
    }
    function select(option) {
      ;
      [...document.querySelectorAll("[data-fulfilment-option]")].map(
        (option2) => option2.classList.remove("is-selected")
      );
      option.classList.add("is-selected");
      option.querySelector("input[type=radio]").checked = true;
    }
    function close(subset) {
      subset.classList.remove("is-active");
      subset.parentNode.classList.remove("is-active");
    }
    function open(subset) {
      subset.classList.add("is-active");
      subset.parentNode.classList.add("is-active");
      prevSubset = subset;
    }
    function enableSubmitButton() {
      const button = document.querySelector("[data-fulfilment-button]");
      const form = button.closest("form");
      if (form.checkValidity() && !form.querySelector("[data-pending]")) {
        document.querySelector("[data-fulfilment-button]").removeAttribute("disabled");
      }
    }
  }();
})();
//# sourceMappingURL=fulfilment.OVI53A7V.js.map
