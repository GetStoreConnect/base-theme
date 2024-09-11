import { init, formElement, loadScript, showError, submitData } from './common';
import { callbackUrl } from './form';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.initZippay = function ({providerId}) {
  init("Zippay", providerId);

  const zipCheckoutId = `#ZippayPayWithButton${providerId}`;

  const zipCheckout = formElement().querySelector(zipCheckoutId);
  zipCheckout.disabled = true;

  loadScript({
    url: "https://static.zipmoney.com.au/checkout/checkout-v1.min.js",
    onload: function() {
      zipCheckout.disabled = false;

      const checkoutUri = callbackUrl();

      const args = {
        checkoutUri,
        redirectUri: `${checkoutUri}&type=redirect`, // Required; but we are not handling this scenario ATM
        onComplete: function(data) {
          const payload = {
            payment_source: {
              tok_id: data.checkoutId,
              customer_id: data.customerId,
              state: data.state
            }
          }
          submitData({payload})
        },
        onError: function(error) {
          if (error.detail.message) {
            showError(error.detail.message);
          } else {
            showError(error.message);
          }
        }
      }
      Zip.Checkout.attachButton(zipCheckoutId, args);
    }
  });
}
