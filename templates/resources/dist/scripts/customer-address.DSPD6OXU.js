(() => {
  // src/scripts/theme/utils/fetch.js
  function fetchWithResponseHandler(url, options) {
    const method = options.method ? options.method.toUpperCase() : "GET";
    if (method !== "GET" && method !== "HEAD") {
      const tag = document.querySelector('meta[name="csrf-token"]');
      const csrfToken = tag ? document.querySelector('meta[name="csrf-token"]').getAttribute("content") : "";
      options.headers = {
        ...options.headers,
        "X-CSRF-Token": csrfToken
      };
    }
    return fetch(url, options).then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok: " + response.statusText);
      }
      const contentType = response.headers.get("Content-Type");
      if (contentType.includes("application/json")) {
        return response.json();
      } else if (contentType.includes("text/javascript")) {
        return response.text().then((script) => (0, eval)(script));
      } else if (contentType.includes("text/html")) {
        return response.text();
      } else {
        return response.blob();
      }
    });
  }

  // src/scripts/theme/store-path-url.js
  function store_path_url_default(url) {
    const storePath = document.querySelector('meta[name="sc-path"]');
    if (storePath) {
      const storePathContent = storePath.content;
      if (storePathContent) {
        return `/${storePathContent}${url}`;
      }
    }
    return url;
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

  // src/scripts/packs/customer-address.js
  onDomChange(init);
  function init(node) {
    ;
    [...node.querySelectorAll("[data-checkout-address-container]")].forEach((element) => {
      configure(element);
    });
  }
  function configure(element) {
    const country_select = document.getElementById(element.getAttribute("data-country-id"));
    const state_id = element.getAttribute("data-state-id");
    const address_type = element.getAttribute("data-address-type");
    const billing_same_as_shipping_element = document.getElementById(
      element.getAttribute("data-billing-same-id")
    );
    if (country_select) {
      updateStates(country_select.value);
      country_select.addEventListener("change", function(event) {
        const countryId = event.target.value;
        updateStates(countryId);
        updateRequired(countryId);
      });
    }
    if (billing_same_as_shipping_element) {
      billing_same_as_shipping_element.addEventListener("change", () => {
        if (country_select) {
          updateRequired(country_select.value);
        }
      });
    }
    if (country_select) {
      updateRequired(country_select.value);
    }
    function billing_same_as_shipping() {
      return billing_same_as_shipping_element ? billing_same_as_shipping_element.checked : false;
    }
    function updateRequiredFields(fields) {
      ;
      [
        ...document.querySelectorAll(
          "[data-required-fields-form] input, [data-required-fields-form] select"
        )
      ].forEach((input) => {
        const name = input.name;
        if (name && input.name.includes(address_type)) {
          let required = fields.includes(name);
          if (address_type === "billing" && billing_same_as_shipping()) {
            required = false;
          }
          if (name.includes("address_lines")) {
            const form = input.form;
            const index = Array.from(form.querySelectorAll(`input[name="${input.name}"]`)).indexOf(
              input
            );
            if (index === 0) {
              required = fields.includes(name.replace(`[]`, ``));
            }
          }
          if (required) {
            input.required = true;
            input.dataset.required = true;
            if (input.labels) {
              input.labels.forEach((label) => {
                label.dataset.required = true;
              });
            }
          } else {
            input.required = false;
            delete input.dataset.required;
            if (input.labels) {
              input.labels.forEach((label) => {
                delete label.dataset.required;
              });
            }
          }
        }
      });
    }
    function updateRequired(country_id) {
      fetchWithResponseHandler(store_path_url_default("/checkout/required_fields"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
          country_id,
          billing_same_as_shipping: billing_same_as_shipping()
        }).toString()
      }).then((data) => {
        updateRequiredFields(data);
      }).catch((error) => {
        console.error("Error updating required fields:", error);
      });
    }
    function updateStates(id) {
      if (id === "") {
        return false;
      }
      fetchWithResponseHandler(store_path_url_default("/checkout/find_states"), {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({ country_id: id }).toString()
      }).then((data) => {
        buildStatesDropdown(data);
      }).catch((error) => {
        console.error("Error updating states:", error);
      });
    }
    function buildStatesDropdown(data) {
      const state = document.getElementById(state_id);
      if (state) {
        const selected_value = state.getAttribute("data-selected");
        state.options.length = 0;
        data.unshift(["", state.getAttribute("placeholder")]);
        data.forEach((element2) => {
          const newOption = document.createElement("option");
          const optionText = document.createTextNode(element2[1]);
          newOption.appendChild(optionText);
          newOption.setAttribute("value", element2[0]);
          if (element2[0] === selected_value) {
            newOption.setAttribute("selected", true);
          }
          state.appendChild(newOption);
        });
      }
    }
  }
})();
//# sourceMappingURL=customer-address.DSPD6OXU.js.map
