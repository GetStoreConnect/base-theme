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

  // src/scripts/packs/accordion.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-accordion-trigger]")].forEach((trigger) => {
      trigger.addEventListener("click", toggleActiveState);
    });
  }
  function toggleActiveState(e) {
    const parent = e.currentTarget.parentNode;
    const target = parent.querySelector("[data-accordion-target]");
    const icons = parent.querySelectorAll("[data-accordion-icon]");
    const isExpanded = target.getAttribute("aria-expanded") === "true";
    target.setAttribute("aria-expanded", isExpanded ? "false" : "true");
    icons.forEach((icon) => icon.classList.toggle("is-active"));
    parent.classList.toggle("is-active");
    target.classList.toggle("is-expanded");
  }
})();
//# sourceMappingURL=accordion.SYDCGK7W.js.map
