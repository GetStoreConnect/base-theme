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

  // src/scripts/packs/date-localizer.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("time[data-timestamp]")].forEach((elem) => localize(elem));
  }
  function localize(elem) {
    const styles = ["full", "long", "medium", "short"];
    const timestamp = elem.getAttribute("data-timestamp");
    if (!timestamp || timestamp === "") return;
    let format = {};
    let dateStyle = elem.getAttribute("data-date-style");
    if (styles.includes(dateStyle)) format["dateStyle"] = dateStyle;
    let timeStyle = elem.getAttribute("data-time-style");
    if (styles.includes(timeStyle)) format["timeStyle"] = timeStyle;
    const formatter = new Intl.DateTimeFormat(Intl.DateTimeFormat().resolvedOptions().locale, format);
    outputString = formatter.format(Date.parse(timestamp));
    elem.innerHTML = outputString;
    elem.setAttribute("title", Intl.DateTimeFormat().resolvedOptions().timeZone);
  }
})();
//# sourceMappingURL=date-localizer.GAMZQQVG.js.map
