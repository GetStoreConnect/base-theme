import { onDomChange } from '../theme/utils/init';
import storePath from '../theme/store-path-url'

onDomChange(init);

function init(node) {
  const autocomplete = node.querySelector('[data-address-autocomplete]');

  if (autocomplete) {
    const container = autocomplete.closest('[data-address-autocomplete-container]');
    const form = autocomplete.closest("form");
    const datalist = document.createElement('datalist');
    datalist.id = 'autocomplete-list';
    autocomplete.setAttribute('list', 'autocomplete-list');
    document.body.appendChild(datalist);

    autocomplete.addEventListener('input', function (event) {
      fetch(storePath('/checkout/valid_addresses'), {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      })
      .then(response => response.json())
      .then(data => {
        datalist.innerHTML = '';
        data.forEach(address => {
          const option = document.createElement('option');
          option.value = address['address_1']; // Adjust according to address data structure
          datalist.appendChild(option);
        });
      });
    });

    autocomplete.addEventListener('change', function (event) {
      const address = event.target.value;
      const addressData = data.find(a => a['address_1'] === address);

      if (addressData) {
        const addressLine1 = form.querySelector('[autocomplete~="address-line1"]');
        const addressLevel2 = form.querySelector('[autocomplete~="address-level2"]');
        const addressLevel1 = form.querySelector('[autocomplete~="address-level1"]');
        const postalCode = form.querySelector('[autocomplete~="postal-code"]');

        if (addressLine1) addressLine1.value = addressData['address_1'];
        if (addressLevel2) addressLevel2.value = addressData['city'];
        if (addressLevel1) addressLevel1.value = addressData['state'];
        if (postalCode) postalCode.value = addressData['postal_code'];
      }
    });

    const country_field = form.querySelector('[autocomplete~="country"]');

    if (country_field) {
      country_field.addEventListener('change', event => {
        const target = event.target;

        if (target.value === 'AU') {
          container.classList.remove("sc-hide");
        } else {
          container.classList.add("sc-hide");
        }
      });
      country_field.value = "AU";
    }
  }
}
