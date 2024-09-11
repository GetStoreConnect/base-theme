import { providerId, providerName, formElement, dedicatedCartProductId } from "./common";
import storePathUrl from '../../theme/store-path-url';

export function onlyExpressCheckout() {
  return formElement().dataset.onlyExpressCheckout === "true";
}

export function enabledExpressCheckout() {
  return formElement().dataset.expressCheckoutEnabled === "true";
}

export function storeName() {
  return formElement().dataset.storeName;
}

// Express Checkout - Any physical goods?
export function offerShipping() {
  return formElement().dataset.offerShipping === "true";
}

// Express Checkout - Shipping countries
export function allowedShippingCountries() {
  return JSON.parse(formElement().dataset.shippingCountries || "[]");
}

export function formAuthentityToken() {
  return formElement().querySelector("input[name='authenticity_token']")?.value;
}

export async function prepareProductCartWithAddToCartData(dedicatedCartProductId) {
  if (!dedicatedCartProductId) {
    return;
  }

  const res = await fetch(storePathUrl(`/express_checkout/carts`), {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      authenticity_token: formAuthentityToken(),
      add_to_cart_form_data: addToCartFormData(),
      dedicated_cart_product_id: dedicatedCartProductId,
    }),
  });

  if (!res.ok) {
    return await res.json(); // Expects {error:{message: "..."}}
  }

  const response = await res.json();
  return {
    amount: Math.round(response.cart.amount * 100),
  };
}

// PUT /express_checkout/shipping_methods
// {"shipping":{"methods":["pick_up","regular_post","express_post","courier"],"rates":[{"id":"Custom Shipping_custom-shppng-1","label":"Standard shipping","amount":10.0},{"id":"Australia Post_PARCEL POST + SIGNATURE","label":"PARCEL POST + SIGNATURE","amount":"17.14"},{"id":"Australia Post_EXPRESS POST + SIGNATURE","label":"EXPRESS POST + SIGNATURE","amount":"17.4"}]}}
export async function fetchShippingRates(address) {
  const res = await fetch(storePathUrl(`/express_checkout/shipping_methods`), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      address,
      authenticity_token: formAuthentityToken(),
      dedicated_cart_product_id: dedicatedCartProductId,
    }),
  });

  if (!res.ok) {
    return await res.json(); // Expects {error:{message: "..."}}
  }

  const response = await res.json();
  // Max 9 cheapest shipping rates for Stripe
  const shippingRates = response.shipping.rates.sort((a, b) => a.amount - b.amount).slice(0, 9);

  // Map to ApplePay format id, amount, displayName
  return {
    shippingRates: shippingRates.map((rate) => {
      return {
        id: rate.id,
        amount: Math.round(rate.amount * 100),
        displayName: rate.label,
        deliveryEstimate: rate.description,
      };
    }),
  };
}

export async function setShippingRate(shippingRate) {
  const res = await fetch(storePathUrl(`/express_checkout/carts`), {
    method: "PUT",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({
      authenticity_token: formAuthentityToken(),
      dedicated_cart_product_id: dedicatedCartProductId,
      shipping_rate: shippingRate,
    }),
  });

  if (!res.ok) {
    return await res.json(); // Expects {error:{message: "..."}}
  }

  const response = await res.json();
  return {
    amount: Math.round(response.cart.amount * 100),
  };
}

export function loadingShippingRates() {
  return [
    {
      id: "loading",
      displayName: "Loading...",
      amount: 0,
    },
  ];
}

// We need the Qty field, and the optional variable Price field data
// Returns {quantity: "1", price: "100.0", _ufid, authenticity_token}
function addToCartFormData() {
  const form = document.querySelector(`form[data-cart-form="true"]`);

  const formData = new FormData(form);

  // Create an object to hold the form values
  const formValues = {};

  // Iterate through the FormData entries
  formData.forEach((value, key) => {
    formValues[key] = value;
  });

  return formValues;
}

export function removeWalletsContainer() {
  const id = `${providerName}WalletsContainer${providerId}`;
  const walletsContainer = document.getElementById(id);
  if (walletsContainer) {
    walletsContainer.remove();
  }
}
