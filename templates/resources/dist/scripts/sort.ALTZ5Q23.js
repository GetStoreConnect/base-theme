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

  // src/scripts/packs/sort.js
  window.StoreConnectUI = window.StoreConnectUI || {};
  window.StoreConnectUI.Sort = function() {
    onDomChange(init);
    function init(node) {
      const input = node.querySelector("form[data-filters] input[name=sort]");
      if (input) {
        document.querySelector(`[data-sort] input[name=sort][value='${input.value}']`)?.setAttribute("checked", true);
      }
    }
    return {
      update: (id) => {
        document.querySelector("form[data-filters] input[name=sort]").value = id;
        document.querySelector("form[data-filters]").submit();
      }
    };
  }();
})();
//# sourceMappingURL=sort.ALTZ5Q23.js.map
