import { init, submitData, showError, formElement } from "./common";
import { apiKey, currency, totalPayable } from './form';

async function verifyBuyer(payments, token, data) {
  const verificationDetails = {
    amount: totalPayable(),
    billingContact: {
      givenName: data.firstname,
      familyName: data.lastname,
      email: data.email,
      phone: data.phone,
      addressLines: [data.billingStreet],
      city: data.billingCity,
      countryCode: data.billingCountry
    },
    currencyCode: data.currency,
    intent: 'CHARGE'
  };

  const verificationResults = await payments.verifyBuyer(
    token,
    verificationDetails
  );

  return verificationResults.token;
}

async function tokenize(paymentMethod) {
  const tokenResult = await paymentMethod.tokenize();
  if (tokenResult.status === 'OK') {
    return tokenResult.token;
  } else {
    let errorMessage = `Tokenization failed with status: ${tokenResult.status}`;
    if (tokenResult.errors) {
      errorMessage += ` and errors: ${JSON.stringify(
        tokenResult.errors,
      )}`;
    }
    throw new Error(errorMessage);
  }
}

async function preSubmit(_form) {
  try {
    const token = await tokenize(card);
    const verificationToken = await verifyBuyer(payments, token, data);

    const payload = {
      payment_source: {
        locationId,
        tok_id: token,
        verification_token: verificationToken
      }
    }
    submitData({ payload })

  } catch (e) {
    console.error(e.message);
    // this will re-enable the form button but
    // not show a message, which is what we want
    // because Square already shows an err msg
    showError(null);
  }
}

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.SquareGoogle = function (data = {
  providerId,
  billingStreet,
  billingCity,
  postCode,
  billingCountry,
  lastname,
  firstname,
  email,
  phone,
}) {
  init("SquareGoogle", providerId, preSubmit);

  const providerId = data.providerId;
  const billingCountry = data.billingCountry;
  const locationId = formElement().dataset.locationId;

  document.addEventListener('DOMContentLoaded', async function () {
    if (!window.Square) {
      throw new Error('Square.js failed to load properly');
    }

    let payments;
    const applicationId = apiKey();
    try {
      payments = window.Square.payments(applicationId, locationId);
    } catch (e) {
      Bugsnag.notify(e);

      const statusContainer = document.getElementById(`SquareGooglePaymentStatus${providerId}`);
      statusContainer.className = 'missing-credentials';
      statusContainer.style.visibility = 'visible';
      return;
    }

    try {
      const paymentRequest = payments.paymentRequest({
        countryCode: billingCountry,
        currencyCode: currency(),
        total: {
          amount: totalPayable(),
          label: 'Total',
        },
      });

      const button = `SquareGooglePaymentButton${providerId}`;
      const paymentMethod = await payments.googlePay(paymentRequest);
      await paymentMethod.attach(`#${button}`);

      document
        .getElementById(button)
        .addEventListener('click', async function (event) {
          event.preventDefault();

          const tok_id = await tokenize(paymentMethod);
          const verification_token = await verifyBuyer(payments, token, data);
          const payload = {
            payment_source: { tok_id, verification_token }
          }
          submitData({ payload })
        });
    } catch (e) {
      console.error('Initializing Google Pay failed', e);
      // There are a number of reason why Google Pay may not be supported
      // (e.g. Browser Support, Device Support, Account). Therefore you should handle
      // initialization failures, while still loading other applicable payment methods.
    }
  });
}
