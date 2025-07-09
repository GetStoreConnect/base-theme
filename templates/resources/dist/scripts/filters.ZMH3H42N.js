(() => {
  // src/scripts/theme/viewport.js
  var BREAKPOINTS = [
    { id: 0, name: "base" },
    { id: 1, name: "small" },
    { id: 2, name: "medium" },
    { id: 3, name: "large" },
    { id: 4, name: "xlarge" },
    { id: 5, name: "huge" }
  ];
  var mediumAndUp = () => returnBreakpoint() > 1;
  function returnBreakpoint() {
    let breakpoint;
    if (document.querySelector("[data-breakpoint]") === null) {
      createBreakpointElements();
    }
    for (var i = 0; i < BREAKPOINTS.length; i++) {
      const elem = document.querySelector(`[data-breakpoint="${BREAKPOINTS[i].id}"]`);
      if (elem && isVisible(elem)) {
        breakpoint = BREAKPOINTS[i];
        break;
      }
    }
    return breakpoint.id;
  }
  function createBreakpointElements() {
    BREAKPOINTS.map((breakpoint) => {
      const elem = document.createElement("div");
      elem.setAttribute("data-breakpoint", breakpoint.id);
      document.querySelector("body").append(elem);
    });
  }
  function isVisible(element) {
    return window.getComputedStyle(element).display !== "none";
  }

  // src/scripts/theme/loader.js
  function Loader(settings) {
    const target = settings.target || null;
    const contextual = settings.contextual;
    return {
      on: () => stopLoader(target),
      off: () => startLoader(target, contextual)
    };
  }
  function startLoader(container, contextual = false) {
    const loader = getLoader(container);
    if (loader) {
      activate(loader, contextual);
    } else {
      createLoader(container, contextual);
    }
  }
  function stopLoader(container) {
    const loader = getLoader(container);
    if (loader === null) return;
    loader.classList.remove("is-active");
  }
  function getLoader(target) {
    const origin = target || document.querySelector("body");
    return origin.querySelector("[data-loader]");
  }
  function activate(loader, contextual = false) {
    if (loader.classList.contains("Loader")) {
      loader.classList.add("is-active");
    } else if (contextual) {
      loader.classList.add("Loader", "is-active", "is-contextual");
    } else {
      loader.classList.add("Loader", "is-active");
    }
  }
  function createLoader(target, contextual = false) {
    const loader = document.createElement("div");
    const spinner = createSpinner();
    const destination = target || document.querySelector("body");
    loader.setAttribute("data-loader", "");
    loader.classList.add("Loader", "is-active");
    if (contextual) loader.classList.add("is-contextual");
    destination.prepend(loader);
    loader.append(spinner);
  }
  function createSpinner() {
    const url = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(url, "svg");
    const circle = document.createElementNS(url, "circle");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.classList.add("spinner");
    circle.setAttribute("cx", "25");
    circle.setAttribute("cy", "25");
    circle.setAttribute("r", "20");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", "5");
    circle.classList.add("path");
    svg.appendChild(circle);
    return svg;
  }
  var loader_default = Loader;

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

  // src/scripts/packs/filters.js
  window.StoreConnectUI = window.StoreConnectUI || {};
  window.StoreConnectUI.Filters = function() {
    let isVisible2, loader;
    onDomChange(init);
    function init(node) {
      isVisible2 = mediumAndUp() ? true : false;
      loader = loader_default({ target: null, contextual: false });
      if (mediumAndUp() && node.querySelector("[data-filters-trigger]")) {
        document.querySelector("[data-filters-button-hide]").classList.remove("is-hidden");
        document.querySelector("[data-filters-button-show]").classList.add("is-hidden");
      }
    }
    function show() {
      isVisible2 = true;
      if (mediumAndUp()) {
        document.querySelector("[data-product-sidebar]").classList.remove("is-hidden");
        document.querySelector("[data-product-grid]").classList.remove("is-expanded");
        document.querySelector("[data-filters-button-show]").classList.add("is-hidden");
        document.querySelector("[data-filters-button-hide]").classList.remove("is-hidden");
        if (document.querySelector("[data-card-grid]")) {
          document.querySelector("[data-card-grid]").classList.add("is-offset-by-sidebar");
        }
      } else {
        document.querySelector("[data-filters]").classList.add("is-active");
      }
    }
    function hide() {
      isVisible2 = false;
      if (mediumAndUp()) {
        document.querySelector("[data-product-sidebar]").classList.add("is-hidden");
        document.querySelector("[data-product-grid]").classList.add("is-expanded");
        document.querySelector("[data-filters-button-show]").classList.remove("is-hidden");
        document.querySelector("[data-filters-button-hide]").classList.add("is-hidden");
        if (document.querySelector("[data-card-grid]")) {
          document.querySelector("[data-card-grid]").classList.remove("is-offset-by-sidebar");
        }
      } else {
        document.querySelector("[data-filters]").classList.remove("is-active");
      }
    }
    return {
      toggle: () => isVisible2 ? hide() : show(),
      reset: () => document.querySelector("[data-filters]").reset(),
      submit: () => {
        if (mediumAndUp()) {
          loader.on();
          document.querySelector("[data-filters]").submit();
        }
      }
    };
  }();
})();
//# sourceMappingURL=filters.ZMH3H42N.js.map
