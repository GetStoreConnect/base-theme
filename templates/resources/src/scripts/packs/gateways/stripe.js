import { init, formElement, formFieldElement, showError, submitData, elementProviderId, dedicatedCartProductId } from './common';
import { apiKey, currency, showWallets, totalPayable } from './form';
import { onlyExpressCheckout, storeName, offerShipping, allowedShippingCountries, fetchShippingRates, formAuthentityToken, setShippingRate, loadingShippingRates, prepareProductCartWithAddToCartData, removeWalletsContainer } from './express-checkout';
import { loadStripe } from '@stripe/stripe-js/pure';
import storePathUrl from '../../theme/store-path-url';

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Stripe = function ({ providerId, dedicatedCartProductId }) {
  init('Stripe', providerId, stripeCreateToken, null, dedicatedCartProductId);

  let cardNumberElement;
  let stripe;
  let elements;

  function paymentsUrl() {
    return formElement().dataset.paymentsUrl;
  }

  function intentsUrl() {
    return formElement().dataset.intentsUrl;
  }

  function stripeCreateToken(_form) {
    // We're bypassing the form here because we're using Stripe Elements
    stripe.createToken(cardNumberElement, { name: formFieldElement('card_name').value })
      .then(stripeResponseHandler);
  }

  function stripeResponseHandler(response) {
    if (response.error) {
      showError(response.error.message);
    } else {
      const token = response.token;
      const payload = {
        payment_source: {
          tok_id: token.id,
          last_digits: token.card.last4,
          month: token.card.exp_month,
          year: token.card.exp_year
        }
      }
      submitData({ payload })
    }
  }

  // If CC form present, initialize Stripe Elements
  async function stripeInitializeElements() {
    if (formFieldElement('card_number')) {
      elements = stripe.elements();

      const root = document.querySelector(':root');
      const computedStyles = getComputedStyle(root);

      const fontSize = computedStyles.getPropertyValue('--sc-font-base').trim();
      const fontFamily = computedStyles.getPropertyValue('--sc-font-family').trim();

      cardNumberElement = elements.create('cardNumber', {
        placeholder: formFieldElement('card_number').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe sc-expand' },
        style: {
          base: {
            fontSize: fontSize,
            fontFamily: fontFamily,
          },
        },
      });

      cardNumberElement.mount(`#${formFieldElement('card_number').id}`);
      const cardExpiryElement = elements.create('cardExpiry', {
        placeholder: formFieldElement('card_expiry').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style: {
          base: {
            fontSize: fontSize,
            fontFamily: fontFamily,
          },
        },
      });
      cardExpiryElement.mount(`#${formFieldElement('card_expiry').id}`);

      const cardCvcElement = elements.create('cardCvc', {
        placeholder: formFieldElement('card_verification').dataset.placeholder,
        classes: { base: 'SC-Field_input SC-Field-stripe' },
        style: {
          base: {
            fontSize: fontSize,
            fontFamily: fontFamily,
          },
        },
      });
      cardCvcElement.mount(`#${formFieldElement('card_verification').id}`);
    }
  }

  function handleWalletError({ error, event }) {
    if (error) {
      const id = `#StripeWalletsError${elementProviderId()}`;
      const messageContainer = document.querySelector(id);
      if (messageContainer) {
        if (error.message) {
          messageContainer.textContent = error.message;
        } else {
          messageContainer.textContent = JSON.stringify(error);
        }
      }
    }
    if (event) {
      event.reject();
    }
  }

  function stripeInitializeWallets() {
    const checkoutId = `StripeWalletsCheckout${elementProviderId()}`;
    if (!document.getElementById(checkoutId)) {
      return;
    }

    // Passing StripeElementsOptions; returns StripeElements
    const elements = stripe.elements({
      mode: 'payment',
      amount: Math.round(totalPayable() * 100),
      currency: currency().toLowerCase(),
    });

    const expressCheckoutElement = elements.create('expressCheckout', {
      paymentMethods: { applePay: 'always', googlePay: 'always' },
      buttonType: {
        applePay: 'check-out',
        googlePay: 'checkout',
      },
    });

    expressCheckoutElement.mount(`#${checkoutId}`);

    // When user starts wallet process by clicking Buy with Apple Pay or Google Pay button
    //
    // https://docs.stripe.com/js/element/events/on_click?type=expressCheckoutElement
    expressCheckoutElement.on('click', async (event) => {
      const options = {
        business: {
          name: storeName(),
        },
      };

      if (onlyExpressCheckout()) {
        // Collect email address for receipt / default for account creation
        options.emailRequired = true;
        options.billingAddressRequired = true;

        if (offerShipping()) {
          options.shippingAddressRequired = true;

          // Wallet can indicate to customer their country is not valid
          options.allowedShippingCountries = allowedShippingCountries();

          // If shippingAddressRequired is true, then shippingRates is required
          // Show something to indicate we're loading them
          options.shippingRates = loadingShippingRates();
        }

        if (dedicatedCartProductId) {
          const { amount, error } = await prepareProductCartWithAddToCartData(dedicatedCartProductId);
          if (error) {
            handleWalletError({ error, event });
            return;
          }
          elements.update({ amount });
        }
      }

      event.resolve(options);
    });

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingaddresschange_event#express_checkout_element_on_shipping_address_change
    expressCheckoutElement.on('shippingaddresschange', async (event) => {
      const { address } = event;
      const { shippingRates, error } = await fetchShippingRates(address);
      if (error) {
        handleWalletError({ error, event });
        return;
      }
      event.resolve({ shippingRates });
    });

    // https://docs.stripe.com/js/elements_object/express_checkout_element_shippingratechange_event
    expressCheckoutElement.on('shippingratechange', async (event) => {
      const { amount, error } = await setShippingRate(event.shippingRate);
      if (error) {
        handleWalletError({ error, event });
        return;
      }
      elements.update({ amount });
      event.resolve({});
    });

    // When user finally confirms the wallet payment
    //
    // https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event
    expressCheckoutElement.on('confirm', async (event) => {
      if (onlyExpressCheckout()) {
        const res = await fetch(storePathUrl(`/express_checkout/carts`), {
          method: 'PUT',
          headers: { 'content-type': 'application/json' },
          body: JSON.stringify({
            billing_details: event.billingDetails,
            shipping_address: event.shippingAddress,
            shipping_rate: event.shippingRate, // shouldn't have changed since last shippingratechange
            authenticity_token: formAuthentityToken(),
            dedicated_cart_product_id: dedicatedCartProductId,
          }),
        });

        if (!res.ok) {
          const { error } = await res.json();
          if (error) {
            handleWalletError({ error });
            event.paymentFailed({ reason: 'fail' }); // NOTE: there's also 'invalid_shipping_address' but we're not using it
            return;
          }
        }
      }

      const clientSecret = await fetchClientSecret();

      const { error } = await stripe.confirmPayment({
        elements,
        clientSecret,
        confirmParams: {
          // https://docs.stripe.com/js/payment_intents/confirm_payment#confirm_payment_intent-options-confirmParams-return_url
          return_url: paymentsUrl()
        },
      });

      if (error) {
        handleWalletError({ error });
      } else {
        // Customer is redirected to the callback URL
      }
    });
  }

  // Creates Stripe PaymentIntent and returns client_secret
  async function fetchClientSecret() {
    const res = await fetch(intentsUrl(), {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
    });

    const { client_secret: clientSecret } = await res.json();

    return clientSecret
  }

  async function initializeStripe() {
    stripe = await loadStripe(apiKey());

    await stripeInitializeElements();

    if (showWallets()) {
      await stripeInitializeWallets();
    } else {
      removeWalletsContainer();
    }
  }

  initializeStripe();

  if (window.StoreConnectTestMode === 'enabled') {
    window.testStripeExpressCheckout = async ({ dedicatedProductId }) => {
      handleWalletError({ error: { message: `put your left foot in` } });
      if (dedicatedProductId) {
        dedicatedCartProductId = dedicatedProductId; // shared into common.js

        handleWalletError({ error: { message: `using dedicated cart product id: ${dedicatedCartProductId}` } });

        // On wallet click, we send the 'add-to-cart' form data to the server
        // to create a dedicated cart for the product
        const { amount, error } = await prepareProductCartWithAddToCartData(dedicatedProductId);
        if (error) {
          handleWalletError({ error });
          return;
        }
      }

      // Disable the /cart form as it can be accidentally submitted
      document.querySelectorAll('form[action="/cart"]').forEach((form) => {
        form.removeAttribute('action');
      });

      // Simulate shippingaddresschange event
      const address = {
        line1: '123 Test St',
        country: 'AU',
        state: 'QLD',
        postal_code: '4000',
        city: 'Milton',
      };

      handleWalletError({ error: { message: 'starting...' } });

      const { shippingRates, error: error1 } = await fetchShippingRates(address);
      handleWalletError({ error: { message: 'fetched rates' } });
      if (error1) {
        handleWalletError({ error: error1 });
        return;
      }

      // Simulate shippingratechange event
      const shippingRate = shippingRates[0];
      const { amount, error: error2 } = await setShippingRate(shippingRate);
      if (error2) {
        handleWalletError({ error: error2 });
        return;
      }

      // Simulate confirm event (payment)
      // https://docs.stripe.com/js/elements_object/express_checkout_element_confirm_event
      const res = await fetch(storePathUrl(`/express_checkout/carts`), {
        method: 'PUT',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({
          authenticity_token: formAuthentityToken(),
          billing_details: {
            name: 'Test User',
            email: 'drnic@getstoreconnect.com',
            address,
          },
          shipping_address: {
            name: 'Test User',
            address,
          },
          shipping_rate: shippingRate,
          dedicated_cart_product_id: dedicatedCartProductId,
        }),
      });
      if (!res.ok) {
        const { error } = await res.json();
        handleWalletError({ error });
        return;
      }

      await window.testStripeWalletCallback();
    };

    window.testStripeWalletCallback = async () => {
      const clientSecret = await fetchClientSecret();

      const url = new URL(paymentsUrl())
      url.searchParams.set('payment_intent', clientSecret)
      window.location = url
    };
  }
};
