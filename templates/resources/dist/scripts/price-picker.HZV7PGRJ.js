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

  // src/scripts/packs/price-picker.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-price-picker]")].forEach((picker) => {
      const trigger = picker.querySelector("[data-price-picker-trigger]");
      if (!trigger) return;
      trigger.addEventListener("click", () => open(picker));
      buttons = [...picker.querySelectorAll("[data-price-picker-btn]")];
      buttons.map((button) => {
        button.addEventListener("click", (e) => {
          set(e, picker);
        });
        if (button.hasAttribute("data-price-picker-btn-other")) {
          button.addEventListener("click", (e) => {
            manualEntry(picker);
          });
        }
      });
      document.addEventListener("click", (e) => {
        closeIfClickElsewhere(e, picker);
      });
    });
  }
  function set(e, picker) {
    const input = picker.querySelector("[data-price-picker-input]");
    input.value = e.target.value;
    picker.querySelector("[data-price-picker-value]").innerText = e.target.innerText;
    if (input.value) input.dispatchEvent(new Event("change"));
    close(picker);
  }
  function manualEntry(picker) {
    const input = picker.querySelector("[data-price-picker-input]");
    input.classList.add("is-active");
    input.focus();
    picker.querySelector("[data-price-picker-trigger]").classList.add("is-hidden");
    close(picker);
  }
  function open(picker) {
    closeOpenPickers();
    const pickerList = picker.querySelector("[data-price-picker-list]");
    pickerList.classList.add("is-active");
    pickerList.setAttribute("aria-hidden", false);
  }
  function close(picker) {
    const pickerList = picker.querySelector("[data-price-picker-list]");
    pickerList.classList.remove("is-active");
    pickerList.setAttribute("aria-hidden", true);
  }
  function closeIfClickElsewhere(e, picker) {
    if (!picker.contains(e.target)) {
      close(picker);
    }
  }
  function closeOpenPickers() {
    const pickerLists = document.querySelectorAll("[data-price-picker-list].is-active");
    [...pickerLists].forEach((pickerList) => close(pickerList.closest("[data-price-picker]")));
  }
})();
//# sourceMappingURL=price-picker.HZV7PGRJ.js.map
