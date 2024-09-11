import fetchWithResponseHandler from '../theme/utils/fetch';
import storePath from '../theme/store-path-url'
import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-checkout-address-container]')].forEach(element => {
    configure(element);
  });
}

function configure(element) {
  const country_select = document.getElementById(element.getAttribute('data-country-id'));
  const state_id = element.getAttribute('data-state-id');
  const address_type = element.getAttribute('data-address-type');
  const billing_same_as_shipping_element = document.getElementById(element.getAttribute('data-billing-same-id'));

  if (country_select) {
    updateStates(country_select.value);

    country_select.addEventListener('change', function (event) {
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
    [...document.querySelectorAll('[data-required-fields-form] input, [data-required-fields-form] select')].forEach(input => {
      const name = input.name;
      if (name && input.name.includes(address_type)) {
        let required = fields.includes(name);
        if (address_type === "billing" && billing_same_as_shipping()) {
          required = false;
        }

        // If name=shipping_address_lines[] then only check if first one is required
        if (name.includes("address_lines")) {
          const form = input.form;
          const index = Array.from(form.querySelectorAll(`input[name="${input.name}"]`)).indexOf(input);
          if (index === 0) {
            required = fields.includes(name.replace(`[]`, ``));
          }
        }

        if (required) {
          input.required = true;
          input.dataset.required = true;
          if (input.labels) {
            input.labels.forEach(label => {
              label.dataset.required = true;
            });
          }
        } else {
          input.required = false;
          delete input.dataset.required;
          if (input.labels) {
            input.labels.forEach(label => {
              delete label.dataset.required;
            });
          }
        }
      }
    });
  }

  function updateRequired(country_id) {
    fetchWithResponseHandler(storePath('/checkout/required_fields'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ country_id: country_id, billing_same_as_shipping: billing_same_as_shipping() }).toString()
    })
    .then(data => { updateRequiredFields(data); })
    .catch(error => { console.error('Error updating required fields:', error); });
  }

  function updateStates(id) {
    if (id === "") { return false; }

    fetchWithResponseHandler(storePath('/checkout/find_states'), {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams({ country_id: id }).toString()
    })
    .then(data => { buildStatesDropdown(data); })
    .catch(error => { console.error('Error updating states:', error); });
  }

  function buildStatesDropdown(data) {
    const state = document.getElementById(state_id);
    if (state) {
      const selected_value = state.getAttribute("data-selected");

      state.options.length = 0;
      data.unshift(['', state.getAttribute("placeholder")]);

      data.forEach(element => {
        const newOption = document.createElement('option');
        const optionText = document.createTextNode(element[1]);
        newOption.appendChild(optionText);
        newOption.setAttribute('value', element[0]);
        if (element[0] === selected_value) {
          newOption.setAttribute('selected', true);
        }
        state.appendChild(newOption);
      });
    }
  }
}
