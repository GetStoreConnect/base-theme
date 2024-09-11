import { init, formFieldElement, showError, submitData, loadScript } from './common';
import { apiMode, apiKey } from './form';
import { formElement } from "./common";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.AuthorizeNet = function ({ providerId, zipCode }) {
  init("AuthorizeNet", providerId, createToken);

  const authData = {
    apiLoginID: apiKey(),
    clientKey: formElement().dataset.publicKey,
  };

  function createToken() {
    const cardData = {
      fullName: formFieldElement("card_name").value,
      cardNumber: formFieldElement("card_number").value,
      month: formFieldElement("card_month").value,
      year: formFieldElement("card_year").value,
      cardCode: formFieldElement("card_verification").value,
      zip: zipCode
    };

    const secureData = {
      authData: authData,
      cardData: cardData
    };

    Accept.dispatchData(secureData, createTokenCallback);
  }

  function createTokenCallback(response) {
    if (response.messages.resultCode === "Error") {
      showError(response.messages.message.map(obj => obj.text).join("\n"))
    } else {
      const payload = {
        payment_source: {
          tok_id: response.opaqueData['dataValue']
        }
      }
      submitData({ payload });
    }
  }

  let authorizeNetUrl = "https://js.authorize.net/v1/Accept.js";
  if (apiMode() !== "production") {
    authorizeNetUrl = "https://jstest.authorize.net/v1/Accept.js";
  }
  loadScript({ url: authorizeNetUrl });
}
