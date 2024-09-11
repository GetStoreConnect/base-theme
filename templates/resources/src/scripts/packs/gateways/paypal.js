import { init, prepareSubmit, showError, submitData } from './common';
import { apiKey, callbackUrl, currency } from './form';
import { loadScript } from "@paypal/paypal-js";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Paypal = function ({ providerId }) {
  init('Paypal', providerId, null, setPayButton);

  function paypalButton() {
    return document.getElementById(`PaypalButton${providerId}`);
  }

  function setPayButton(payButton, enabled) {
    if (payButton) {
      if (enabled) {
        payButton.classList.add("sc-hide");
        paypalButton().classList.remove("sc-hide");
      } else {
        payButton.classList.remove("sc-hide");
        paypalButton().classList.add("sc-hide");
      }
    }
  }

  loadScript({ clientId: apiKey(), currency: currency() })
    .then((paypal) => {
      paypal
        .Buttons({
          style: { layout: 'horizontal' },
          createOrder: function () {
            const SETEC_URL = callbackUrl();

            return fetch(SETEC_URL, {
              method: 'post',
              headers: {
                'content-type': 'application/json'
              }
            }).then(function (res) {
              return res.json();
            }).then(function (data) {
              if (data.message) {
                showError(data.message);
              }
              return data.id;
            });
          },
          onApprove: function (data, _actions) {
            prepareSubmit(() => {
              const payload = {
                payment_source: {
                  tok_id: data.orderID
                }
              }
              submitData({ payload })
            });
          },
          onError: function (err) {
            // false is passed to showError not to replace existing error message if any
            showError(err, false);
          }
        })
        .render(`#paypal-button-container${providerId}`)
        .catch((error) => {
          console.error("failed to render the PayPal Buttons", error);
        });
    })
    .catch((error) => {
      console.error("failed to load the PayPal JS SDK script", error);
    });
}
