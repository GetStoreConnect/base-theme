import { init, formElement, loadScript, showError, setPayButton, submitData } from "./common";
import { apiKey, apiMode } from './form';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.SecurePay = function ({ providerId, inputStyles }) {
  var mySecurePayUI;

  init('SecurePay', providerId, function () {
    mySecurePayUI.tokenise();
  });

  const scriptId = `SecurePayScript${providerId}`;
  var securepayUiUrl = "https://payments.auspost.net.au/v3/ui/client/securepay-ui.min.js";
  if (apiMode() !== 'production') {
    securepayUiUrl = "https://payments-stest.npe.auspost.zone/v3/ui/client/securepay-ui.min.js";
  }

  loadScript({
    url: securepayUiUrl, id: scriptId, onload: function () {
      const merchantCode = formElement().dataset.merchantCode;

      setPayButton(false);

      function tokeniseSuccessful(tokenisedCard) {
        const payload = {
          payment_source: {
            tok_id: tokenisedCard.token
          }
        }
        submitData({ payload })
      };

      function tokeniseFailed(errors) {
        // error while tokenising card
        const errorMessage = JSON.parse(errors).errors[0].detail;
        showError(errorMessage);
      };

      function initStyles() {
        // this removes border around the iframe object
        formElement().getElementsByClassName('securepay-ui-iframe')[0].classList.add('sc-border-none');
      }

      function loadComplete() {
        initStyles();
        setPayButton(true);
      };

      mySecurePayUI = new securePayUI.init({
        containerId: `SecurePayContainer${providerId}`,
        scriptId: scriptId,
        clientId: apiKey(),
        merchantCode,
        card: {
          onTokeniseSuccess: tokeniseSuccessful,
          onTokenizeError: tokeniseFailed
        },
        style: inputStyles,
        onLoadComplete: loadComplete
      });
    }
  });
}
