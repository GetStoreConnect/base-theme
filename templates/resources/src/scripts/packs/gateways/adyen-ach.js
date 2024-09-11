import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { init, submitData } from './common';
import { apiMode } from './form';
import { formElement } from "./common";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.AdyenAch = function ({ providerId, clientOpts }) {
  init('AdyenAch', providerId, onSubmit);

  const mountElementId = `AdyenAchFieldset${providerId}`;

  let data;
  let card;

  function handleOnChange(state, component) {
    if (state.isValid) {
      data = state.data
    } else {
      data = {}
    }
  }

  const clientKey = formElement().dataset.apiClient;
  const environment = apiMode() === 'production' ? 'live' : 'test';

  const configuration = {
    environment,
    clientKey,
    locale: "en_US",
    onChange: handleOnChange
  };

  async function initializeAdyenAchForm() {
    const checkout = await AdyenCheckout(configuration)
    card = checkout.create("ach", {
      ...clientOpts,
      billingAddressRequired: false,
      onChange: handleOnChange
    }).mount(`#${mountElementId}`);
  }

  function onSubmit() {
    const payload = {
      payment: {
        provider_id: providerId,
        method: "Adyen"
      },
      payment_source: data.paymentMethod
    };

    submitData({ payload });
  };

  initializeAdyenAchForm();
}
