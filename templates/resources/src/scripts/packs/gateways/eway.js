import { init, formFieldElement, loadScript, submitData } from './common';
import { formElement } from "./common";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Eway = function ({ providerId }) {
  init('Eway', providerId, getFormFields);

  const publicKey = formElement().dataset.publicKey;

  function getFormFields(form) {
    const cardNumberEl = form.querySelector("[data-encrypt-name='EWAY_CARDNUMBER']");
    const cvnEl = form.querySelector("[data-encrypt-name='EWAY_CARDCVN']");
    const payload = {
      payment_source: {
        number: eCrypt.encryptValue(cardNumberEl.value, publicKey),
        name: formFieldElement('card_name').value,
        expiry_month: formFieldElement('card_month').value,
        expiry_year: formFieldElement('card_year').value,
        cvn: eCrypt.encryptValue(cvnEl.value, publicKey)
      }
    };

    submitData({ payload });
  }

  loadScript({ url: "https://secure.ewaypayments.com/scripts/eCrypt.min.js" });
}
