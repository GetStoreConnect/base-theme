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

  // src/scripts/packs/search-nav-source.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-search-nav-source]")].forEach((linkElement) => {
      setupNavLink(linkElement);
    });
  }
  function setupNavLink(linkElement) {
    const source = linkElement.dataset.searchNavSource;
    const linkHref = linkElement.getAttribute("href");
    const url = new URL(linkHref, window.location.origin);
    url.searchParams.set("source", source);
    linkElement.setAttribute("href", url.href);
  }
})();
//# sourceMappingURL=search-nav-source.4BSNJNMU.js.map
