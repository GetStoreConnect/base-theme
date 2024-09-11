import { init } from './common';
import { callbackUrl } from './form';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Windcave = async function ({
  providerId,
}) {
  init("Windcave", providerId, onClick);

  function onClick() {
    fetch(callbackUrl(), {
      method: 'post',
      headers: {
        'content-type': 'application/json'
      }
    }).then(function(res) {
      return res.json();
    }).then(function(result) {
      location.href = result.form_url;
    });
  }
}
