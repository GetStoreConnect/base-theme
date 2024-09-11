import {basicInit} from "./common";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Bosch = async function ({providerId, providerName}) {
  basicInit(providerId, providerName);

  const form = document.getElementById(`${providerName}PaymentForm${providerId}`);
  const button = document.getElementById(`BoschPaymentButton${providerId}`);

  button.setAttribute('href', form.dataset.paymentFormUrl);
}
