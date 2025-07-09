(() => {
  // src/scripts/theme/loader.js
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

  // src/scripts/packs/product-variants.js
  onDomChange(init);
  window.addEventListener("popstate", popVariantPathFromHistory);
  var clearButton;
  var resetButton;
  var selectionPrompt;
  var variantSelector;
  function init(node) {
    const variantOptions = [...node.querySelectorAll("[data-variant-option]")];
    if (variantOptions.length == 0) return;
    variantSelector = variantOptions[0].closest("[data-variant-option-selector]");
    clearButton = variantSelector.querySelector("[data-variant-clear-button]");
    resetButton = variantSelector.querySelector("[data-variant-reset-button]");
    selectionPrompt = variantSelector.querySelector("[data-variant-selection-prompt]");
    variantOptions.map((option) => {
      option.addEventListener("change", (event) => {
        configureOptions(event.target);
      });
    });
    variantSelector.querySelectorAll("[data-variant-type] select").forEach((selectElem) => {
      selectElem.addEventListener("change", (event) => {
        configureOptions(event.target);
      });
    });
    if (clearButton) {
      clearButton.addEventListener("click", () => {
        clearSelectedOptions();
        if (resetButton) resetButton.classList.remove("is-hidden");
        if (selectionPrompt) selectionPrompt.classList.remove("is-hidden");
      });
    }
    if (resetButton) {
      resetButton.addEventListener("click", () => {
        resetSelectedOptions();
        configureOptions();
        resetButton.classList.add("is-hidden");
        if (selectionPrompt) selectionPrompt.classList.remove("is-hidden");
      });
    }
    configureOptions();
  }
  function configureOptions(target = null) {
    if (!window.variantData) return;
    const targetType = target ? target.dataset.type : null;
    const selectedOptions = getSelectedOptions();
    if (Object.keys(selectedOptions).length == 0) return;
    const types = window.variantData["types"];
    const products = window.variantData["products"].filter((product) => {
      for (const selectedOption of selectedOptions) {
        if (product[selectedOption.type] != selectedOption.value) {
          return false;
        }
      }
      return true;
    });
    const enabledValuesByType = {};
    for (const product of products) {
      for (const availableType of types) {
        if (target && targetType == availableType) continue;
        enabledValuesByType[availableType] = enabledValuesByType[availableType] || /* @__PURE__ */ new Set();
        enabledValuesByType[availableType].add(product[availableType]);
      }
    }
    if (types.length > 1) {
      for (const enabledType of Object.keys(enabledValuesByType)) {
        variantSelector.querySelectorAll(`[data-variant-type="${enabledType}"] [data-variant-option]`).forEach((optElem) => {
          disable(optElem, !enabledValuesByType[enabledType].has(optElem.value));
        });
      }
    }
    const selectedProduct = checkForSelectedProduct(selectedOptions);
    if (selectedProduct) {
      load(selectedProduct.path);
    } else {
      if (resetButton) resetButton.classList.remove("is-hidden");
      if (selectionPrompt) selectionPrompt.classList.add("is-hidden");
    }
  }
  function getSelectedOptions() {
    const selectedOptions = [];
    variantSelector.querySelectorAll("[data-variant-type] [data-variant-option]").forEach((option) => {
      if (option.selected || option.checked) {
        selectedOptions.push({ type: option.dataset.type, value: option.value });
      }
    });
    return selectedOptions;
  }
  function clearSelectedOptions() {
    const path = clearButton.dataset.clearPath;
    if (path) {
      load(path);
    } else {
      variantSelector.querySelectorAll("[data-variant-type] [data-variant-option]").forEach((option) => {
        if (option.selected != void 0) {
          const select = option.closest("select");
          if (select) {
            const options = select.querySelectorAll("option");
            if (options.length > 0) options[0].selected = true;
          }
        }
        if (option.checked != void 0) {
          option.checked = false;
        }
        disable(option, false);
      });
    }
  }
  function resetSelectedOptions() {
    variantSelector.querySelectorAll("[data-variant-type] [data-variant-option]").forEach((option) => {
      if (option.selected != void 0) {
        option.selected = option.dataset.selected == "true";
      }
      if (option.checked != void 0) {
        option.checked = option.dataset.checked == "true";
      }
      disable(option, false);
    });
  }
  function checkForSelectedProduct(selectedOptions) {
    const types = window.variantData["types"];
    const products = window.variantData["products"];
    for (const type of types) {
      if (!selectedOptions.find((option) => option.type == type)) {
        return false;
      }
    }
    const selectedProduct = products.find((product) => {
      for (const option of selectedOptions) {
        if (product[option.type] != option.value) {
          return false;
        }
      }
      return true;
    });
    return selectedProduct;
  }
  function load(path, callback) {
    if (window.location.pathname != path) {
      if (path == null) {
        path = window.location.pathname;
      }
      const element = document.querySelector('[data-remote-target="product"]');
      startLoader(element);
      fetch(path, {
        headers: {
          Accept: "application/json"
        }
      }).then((response) => {
        return response.json();
      }).then((json) => {
        pushVariantPathToHistory(path);
        if (element) element.innerHTML = json["html"];
        callback && callback();
      }).catch((error) => {
        console.log(error);
      }).finally(() => {
        stopLoader(element);
      });
    }
  }
  function pushVariantPathToHistory(path) {
    if (window.location.pathname === path) {
      return;
    }
    window.history.pushState(path, null, path);
  }
  function popVariantPathFromHistory(_event) {
    load(null);
  }
  function disable(option, bool) {
    option.disabled = bool;
  }
})();
//# sourceMappingURL=product-variants.VL2V5TWY.js.map
