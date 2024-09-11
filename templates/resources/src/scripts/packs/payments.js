import Cookie from 'js-cookie';
window.StoreConnect = window.StoreConnect || {};

document.addEventListener("DOMContentLoaded", () => {
  resetPaymentCookieIfNecessary();

  const tabTriggers = document.querySelectorAll("[data-tab-trigger]");
  [...tabTriggers].map((tab) => {
    tab.addEventListener("click", event => {
      const providerId = event.target.getAttribute("data-tab-trigger");

      if (providerId) {
        showPaymentForm(providerId);
      }
    });
  });

  const lastProviderId = Cookie.get("last-used-payment-provider");
  if (lastProviderId) {
    showPaymentForm(lastProviderId);
  } else {
    // If there is no last used provider, we'll show the first one if it is available
    const paymentProviders = document.querySelector("section[data-tabs='payment']");
    if (paymentProviders) {
      if (paymentProviders.querySelector("[data-tab]")) {
        const firstProviderId = paymentProviders.querySelector("[data-tab]").getAttribute("data-tab");
        if (firstProviderId) {
          showPaymentForm(firstProviderId);
        }
      }
    }
  }
});

// Once a payment is processed, reset the payment provider cookie;
// Or if the user starts the checkout process again.
// The data-reset-cookie-checkout attribute should appear on these pages.
function resetPaymentCookieIfNecessary() {
  if (document.querySelector("[data-reset-cookie-checkout]")) {
    Cookie.remove("last-used-payment-provider");
  }
}

function showPaymentForm(providerId) {
  document
    .querySelectorAll("[data-tab]")
    .forEach((tab) => tab.classList.add("sc-hide"));
  document
    .querySelectorAll("[data-tab-trigger]")
    .forEach((tab) => tab.classList.remove("is-active"));

  const tab = document.querySelector(`[data-tab='${providerId}']`);
  const trigger = document.querySelector(`[data-tab-trigger='${providerId}']`);

  // Store the selected payment provider for 1 day
  Cookie.set("last-used-payment-provider", providerId, { expires: 1 });

  if (tab) { tab.classList.remove("sc-hide"); }
  if (trigger) { trigger.classList.add("is-active"); }
  activateSurcharge(providerId);
}

function activateSurcharge(providerId) {
  document
    .querySelectorAll(`[data-surcharge-id]`)
    .forEach((elem) => elem.classList.add("sc-hide"));

  const selector = `[data-surcharge-id="${providerId}"]`
  document
    .querySelectorAll(selector)
    .forEach((elem) => elem.classList.remove("sc-hide"))

  const elem = document.querySelector(selector);
  const totalPayableElem = document.querySelector("[data-order-cart-total-payable]")
  const totalTaxElem = document.querySelector("[data-order-tax-amount]")

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
  document.
    querySelectorAll('[data-order-cart-total-payable]').
    forEach((elem) => {elem.innerHTML = amount});
}

function setTotalTax(amount) {
  document.
    querySelectorAll('[data-order-tax-amount]').
    forEach((elem) => { elem.innerHTML = amount });
}

window.StoreConnect.showPaymentProviderCallbacks = {};
