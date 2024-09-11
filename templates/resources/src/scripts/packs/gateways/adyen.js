import AdyenCheckout from '@adyen/adyen-web';
import '@adyen/adyen-web/dist/adyen.css';
import { init, submitData, formElement } from './common';
import { apiMode, showWallets } from './form';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Adyen = function ({ providerId, clientOpts }) {
  init('Adyen', providerId, onSubmit);
  const mountElementId = `AdyenFieldset${providerId}`;

  let data;
  let card;

  function handleOnChange(state, method = "scheme") {
    if (method === "scheme") {
      if (state.isValid) {
        data = state.data
      } else {
        data = {}
      }
    } else {
      data = state.data
    }
  }

  const clientKey = formElement().dataset.apiClient;
  const environment = apiMode() === 'production' ? 'live' : 'test';
  const merchantName = formElement().dataset.merchantName;
  const merchantGoogleId = formElement().dataset.merchantGoogleId;
  const merchantAccount = formElement().dataset.merchantAccount;

  const configuration = {
    environment,
    clientKey,
    locale: "en_US",
    onChange: handleOnChange
  };

  const googlePayConfiguration = {
    amount: {
      value: formElement().dataset.amountPayableInCents,
      currency: formElement().dataset.currencyCode,
    },
    countryCode: formElement().dataset.countryCode,
    clientKey,
    configuration: {
      gatewayMerchantId: merchantAccount,
      merchantName: merchantName,
      merchantId: merchantGoogleId
    },
    environment: environment,
    onSubmit: onSubmitGooglePay,
    onAuthorized: onAuthorizeGooglePay,
  }

  async function initializeGooglePayForm() {
    const checkout = await AdyenCheckout(googlePayConfiguration);
    const googlePayComponent = checkout.create('googlepay', googlePayConfiguration);

    googlePayComponent
      .isAvailable()
      .then(() => {
        googlePayComponent.mount(`#${mountElementId}-googlePay`);
      })
      .catch(e => {
        console.log("Can't load googlePay")
      });
  }

  async function initializeAdyenForm() {
    const checkout = await AdyenCheckout(configuration)
    card = checkout.create("card", {
      ...clientOpts,
      hasHolderName: true,
      holderNameRequired: true,
      billingAddressRequired: false,
      onChange: handleOnChange
    }).mount(`#${mountElementId}`);
  }

  function onSubmitGooglePay(state) {
    handleOnChange(state, "googlePay")
  }

  function onAuthorizeGooglePay(response) {
    //NOTE: consider also checking cardHolderAuthenticated, currently did not include
    // since it's always false in test env haven't fully check on when this will be true
    // maybe in production
    if (response.paymentMethodData.info.assuranceDetails.accountVerified === true) {
      const payload = {
        url: `/checkout/payment`,
        payment: {
          method: "Adyen"
        },
        method: 'post',
        payment_source: data.paymentMethod
      }
      submitData({ payload });
    }
  }

  function onSubmit() {
    const payload = {
      payment: {
        provider_id: providerId,
        method: "Adyen"
      },
      payment_source: data.paymentMethod,
      additional_info: {
        browserInfo: {
          userAgent: data.browserInfo.userAgent,
          timeZoneOffset: data.browserInfo.timeZoneOffset
        },
        origin: data.origin,
        channel: "Web"
      }
    }

    submitData({ payload, handleSuccess: card.handleAction });
  };

  initializeAdyenForm();
  if (showWallets()) { initializeGooglePayForm() };
}
