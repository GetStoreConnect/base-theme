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

  // src/scripts/packs/product-comparison.js
  onDomChange(init);
  function init(node) {
    let ProductComparison = [];
    [...node.querySelectorAll("[data-js-compare-add]")].forEach((element) => {
      element.addEventListener("change", function(e) {
        updateSelectedProducts(e.target);
        const compareElement = document.querySelector("[data-js-compare]");
        const compareTrigger2 = document.querySelector("[data-js-compare-trigger]");
        const compareCount = document.querySelector("[data-js-compare-count]");
        if (compareElement) {
          compareElement.classList.toggle("is-hidden", noSelection());
        }
        if (compareTrigger2) {
          compareTrigger2.disabled = nothingToCompare();
        }
        if (compareCount) {
          compareCount.textContent = ProductComparison.length;
        }
      });
    });
    const compareTrigger = node.querySelector("[data-js-compare-trigger]");
    if (compareTrigger) {
      compareTrigger.addEventListener("click", function(e) {
        const category = e.target.getAttribute("data-js-compare-trigger");
        const ids = ProductComparison;
        const params = new URLSearchParams({ category });
        ids.forEach((id) => params.append("ids[]", id));
        fetch(`/product_comparison?${params.toString()}`, {
          method: "GET",
          headers: { Accept: "application/json" }
        }).then((response) => response.json()).then((response) => {
          if (response.status === "error") {
            console.error(response.message);
            return;
          } else {
            if (response.html === "") {
              console.error("No products found");
              return;
            }
            const screenElement = document.querySelector("[data-js-screen]");
            const screenBody = document.querySelector("[data-js-screen-body]");
            if (screenElement) {
              screenElement.classList.remove("is-hidden");
            }
            if (screenBody) {
              screenBody.innerHTML = response.html;
            }
          }
        });
      });
    }
    const compareCancel = node.querySelector("[data-js-compare-cancel]");
    if (compareCancel) {
      compareCancel.addEventListener("click", () => {
        ProductComparison = [];
        const compareElement = document.querySelector("[data-js-compare]");
        if (compareElement) {
          compareElement.classList.add("is-hidden");
        }
        document.querySelectorAll("[data-js-compare-add]").forEach((element) => element.checked = false);
      });
    }
    const screenClose = node.querySelector("[data-js-screen-close]");
    if (screenClose) {
      screenClose.addEventListener("click", () => {
        const screenElement = document.querySelector("[data-js-screen]");
        if (screenElement) {
          screenElement.classList.add("is-hidden");
        }
      });
    }
    function updateSelectedProducts(product) {
      if (product.checked) {
        ProductComparison.push(product.id);
        return;
      }
      ProductComparison = ProductComparison.filter((productId) => productId !== product.id);
    }
    function noSelection() {
      return ProductComparison.length < 1;
    }
    function nothingToCompare() {
      return ProductComparison.length < 2;
    }
  }
})();
//# sourceMappingURL=product-comparison.ST6MYEUZ.js.map
