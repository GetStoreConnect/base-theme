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

  // node_modules/js-cookie/dist/js.cookie.mjs
  function assign(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        target[key] = source[key];
      }
    }
    return target;
  }
  var defaultConverter = {
    read: function(value) {
      if (value[0] === '"') {
        value = value.slice(1, -1);
      }
      return value.replace(/(%[\dA-F]{2})+/gi, decodeURIComponent);
    },
    write: function(value) {
      return encodeURIComponent(value).replace(
        /%(2[346BF]|3[AC-F]|40|5[BDE]|60|7[BCD])/g,
        decodeURIComponent
      );
    }
  };
  function init(converter, defaultAttributes) {
    function set(name, value, attributes) {
      if (typeof document === "undefined") {
        return;
      }
      attributes = assign({}, defaultAttributes, attributes);
      if (typeof attributes.expires === "number") {
        attributes.expires = new Date(Date.now() + attributes.expires * 864e5);
      }
      if (attributes.expires) {
        attributes.expires = attributes.expires.toUTCString();
      }
      name = encodeURIComponent(name).replace(/%(2[346B]|5E|60|7C)/g, decodeURIComponent).replace(/[()]/g, escape);
      var stringifiedAttributes = "";
      for (var attributeName in attributes) {
        if (!attributes[attributeName]) {
          continue;
        }
        stringifiedAttributes += "; " + attributeName;
        if (attributes[attributeName] === true) {
          continue;
        }
        stringifiedAttributes += "=" + attributes[attributeName].split(";")[0];
      }
      return document.cookie = name + "=" + converter.write(value, name) + stringifiedAttributes;
    }
    function get(name) {
      if (typeof document === "undefined" || arguments.length && !name) {
        return;
      }
      var cookies = document.cookie ? document.cookie.split("; ") : [];
      var jar = {};
      for (var i = 0; i < cookies.length; i++) {
        var parts = cookies[i].split("=");
        var value = parts.slice(1).join("=");
        try {
          var found = decodeURIComponent(parts[0]);
          jar[found] = converter.read(value, found);
          if (name === found) {
            break;
          }
        } catch (e) {
        }
      }
      return name ? jar[name] : jar;
    }
    return Object.create(
      {
        set,
        get,
        remove: function(name, attributes) {
          set(
            name,
            "",
            assign({}, attributes, {
              expires: -1
            })
          );
        },
        withAttributes: function(attributes) {
          return init(this.converter, assign({}, this.attributes, attributes));
        },
        withConverter: function(converter2) {
          return init(assign({}, this.converter, converter2), this.attributes);
        }
      },
      {
        attributes: { value: Object.freeze(defaultAttributes) },
        converter: { value: Object.freeze(converter) }
      }
    );
  }
  var api = init(defaultConverter, { path: "/" });

  // src/scripts/packs/payments.js
  window.StoreConnect = window.StoreConnect || {};
  onDomChange((node) => {
    if (!node.querySelector("[data-checkout-summary]")) {
      return;
    }
    resetPaymentCookieIfNecessary();
    const tabTriggers = node.querySelectorAll("[data-tab-trigger]");
    [...tabTriggers].map((tab) => {
      tab.addEventListener("click", (event) => {
        const providerId = event.target.getAttribute("data-tab-trigger");
        if (providerId) {
          showPaymentForm(providerId);
        }
      });
    });
    let currentProviderId = api.get("last-used-payment-provider");
    if (currentProviderId && providerIdTabExists(currentProviderId)) {
      showPaymentForm(currentProviderId);
    } else {
      currentProviderId = null;
      const paymentProviders = document.querySelector("section[data-tabs='payment']");
      if (paymentProviders) {
        if (paymentProviders.querySelector("[data-tab]")) {
          currentProviderId = paymentProviders.querySelector("[data-tab]").getAttribute("data-tab");
          if (currentProviderId) {
            showPaymentForm(currentProviderId);
          }
        }
      }
    }
    if (!currentProviderId) {
      activateSurcharge();
    }
  });
  function resetPaymentCookieIfNecessary() {
    if (document.querySelector("[data-reset-cookie-checkout]")) {
      api.remove("last-used-payment-provider");
    }
  }
  function providerIdTabExists(providerId) {
    return document.querySelector(`[data-tab='${providerId}']`);
  }
  function showPaymentForm(providerId) {
    document.querySelectorAll("[data-tab]").forEach((tab2) => tab2.classList.add("sc-hide"));
    document.querySelectorAll("[data-tab-trigger]").forEach((tab2) => tab2.classList.remove("is-active"));
    const tab = document.querySelector(`[data-tab='${providerId}']`);
    const trigger = document.querySelector(`[data-tab-trigger='${providerId}']`);
    api.set("last-used-payment-provider", providerId, { expires: 1 });
    if (tab) {
      tab.classList.remove("sc-hide");
    }
    if (trigger) {
      trigger.classList.add("is-active");
    }
    activateSurcharge(providerId);
  }
  function activateSurcharge(providerId) {
    const totalPayableElem = document.querySelector("[data-order-cart-total-payable]");
    const totalTaxElem = document.querySelector("[data-order-tax-amount]");
    document.querySelectorAll(`[data-surcharge-id]`).forEach((elem2) => elem2.classList.add("sc-hide"));
    let elem = null;
    if (providerId) {
      const selector = `[data-surcharge-id="${providerId}"]`;
      document.querySelectorAll(selector).forEach((elem2) => elem2.classList.remove("sc-hide"));
      elem = document.querySelector(selector);
    }
    if (elem) {
      setTotalPayable(elem.getAttribute("data-surcharge-cart-total-payable"));
      setTotalTax(elem.getAttribute("data-surcharge-cart-total-tax"));
    } else {
      if (totalPayableElem) {
        setTotalPayable(totalPayableElem.getAttribute("data-order-cart-total-payable"));
      }
      if (totalTaxElem) {
        setTotalTax(totalTaxElem.getAttribute("data-order-tax-amount"));
      }
    }
  }
  function setTotalPayable(amount) {
    document.querySelectorAll("[data-order-cart-total-payable]").forEach((elem) => {
      elem.innerHTML = amount;
    });
  }
  function setTotalTax(amount) {
    document.querySelectorAll("[data-order-tax-amount]").forEach((elem) => {
      elem.innerHTML = amount;
    });
  }
})();
/*! Bundled license information:

js-cookie/dist/js.cookie.mjs:
  (*! js-cookie v3.0.5 | MIT *)
*/
//# sourceMappingURL=payments.JSVASMJL.js.map
