import { init, submitData, formElement } from './common';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.PayWay = function ({ providerId, buttonId }) {
  init('PayWay', providerId, onSubmit);

  const apiKey = formElement().dataset.apiKey;
  const payButton = document.getElementById(buttonId);
  let creditCardFrame = null;

  const tokenCallback = function (err, data) {
    if (err) {
      payButton.disabled = false;
      const div = document.getElementById(`PayWayPaymentError${providerId}`);

      div.innerHTML = "Invalid: " + err.message;
    } else {
      const payload = {
        paymentSource: {
          singleUseTokenId: data.singleUseTokenId
        }
      }
      submitData({ payload });
    }
  };

  const createdCallback = function (err, frame) {
    if (err) {
      console.error("Error creating frame: " + err.message);
    } else {
      creditCardFrame = frame;
    }
  };

  const options = {
    publishableApiKey: apiKey,
    tokenMode: "callback",
    onValid: function () {
      payButton.disabled = false;
    },
    onInvalid: function () {
      payButton.disabled = true;
    }
  };

  function initializePayWayIframe() {
    payway.createCreditCardFrame(options, createdCallback);
  }

  function onSubmit() {
    creditCardFrame.getToken(tokenCallback);
  }

  initializePayWayIframe();
}
