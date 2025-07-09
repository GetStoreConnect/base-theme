import {
  providerId,
  providerName,
  form,
  dedicatedCartProductId,
  elementProviderId,
  showError,
} from './common'
import storePathUrl from '../../theme/store-path-url'

export function onlyExpressCheckout() {
  return form.dataset.onlyExpressCheckout === 'true'
}

export function enabledExpressCheckout() {
  return form.dataset.expressCheckoutEnabled === 'true'
}

export function storeName() {
  return form.dataset.storeName
}

// Express Checkout - Any physical goods?
export function offerShipping() {
  return form.dataset.offerShipping === 'true'
}

// Express Checkout - Shipping countries
export function allowedShippingCountries() {
  return JSON.parse(form.dataset.shippingCountries || '[]')
}

export function formAuthentityToken() {
  return form.querySelector("input[name='authenticity_token']")?.value
}

export function walletsContainerId() {
  return `${providerName}WalletsContainer${elementProviderId()}`
}

export function walletsContainer() {
  const container = document.getElementById(walletsContainerId())
  if (!container) {
    showError(`Cannot setup wallets: no wallets container element found #${walletsContainerId()}`)
  }
  return container
}

export function walletsElementId() {
  return `${providerName}WalletsCheckout${elementProviderId()}`
}

export function walletsElementExists() {
  const container = document.getElementById(walletsContainerId())
  if (!container) {
    return false
  }
  const element = container.querySelector('[data-ref="wallet-buttons"]')
  if (!element) {
    return false
  }
  return true
}

export function walletsElement() {
  const walletsElement = walletsContainer().querySelector('[data-ref="wallet-buttons"]')
  if (!walletsElement) {
    showError(
      `Cannot setup wallets: no wallets container element found #${walletsContainerId()} [data-ref="wallet-buttons"]`
    )
  }
  return walletsElement
}

function walletsErrorElement() {
  let walletsErrorElement = walletsContainer().querySelector('[data-ref="wallet-error"]')
  if (!walletsErrorElement) {
    showError(
      `Cannot setup wallets: no wallets error element found #${walletsContainerId()} [data-ref="wallet-error"]`
    )
    walletsErrorElement = errorElement()
  }
  return walletsErrorElement
}

export function showWalletsError(error, options = {}) {
  options.errorContainer = walletsErrorElement()
  showError(error, options)
}

export async function prepareProductCartWithAddToCartData(dedicatedCartProductId) {
  if (!dedicatedCartProductId) {
    return
  }

  const res = await fetch(storePathUrl(`/express_checkout/carts`), {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      authenticity_token: formAuthentityToken(),
      add_to_cart_form_data: addToCartFormData(),
      dedicated_cart_product_id: dedicatedCartProductId,
    }),
  })

  if (!res.ok) {
    return await res.json() // Expects {error:{message: "..."}}
  }

  const response = await res.json()
  return {
    amount: Math.round(response.cart.amount * 100),
  }
}

// PUT /express_checkout/shipping_methods
// {"shipping":{"methods":["pick_up","regular_post","express_post","courier"],"rates":[{"id":"Custom Shipping_custom-shppng-1","label":"Standard shipping","amount":10.0},{"id":"Australia Post_PARCEL POST + SIGNATURE","label":"PARCEL POST + SIGNATURE","amount":"17.14"},{"id":"Australia Post_EXPRESS POST + SIGNATURE","label":"EXPRESS POST + SIGNATURE","amount":"17.4"}]}}
export async function fetchShippingRates(address) {
  let params = {
    address,
    authenticity_token: formAuthentityToken(),
  }
  if (dedicatedCartProductId) {
    params.dedicated_cart_product_id = dedicatedCartProductId
    params.add_to_cart_form_data = addToCartFormData()
  }
  const res = await fetch(storePathUrl(`/express_checkout/shipping_methods`), {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(params),
  })

  if (!res.ok) {
    return await res.json() // Expects {error:{message: "..."}}
  }

  const response = await res.json()

  let defaultShippingRate = response.shipping.rates.find((rate) => rate.default)

  // Sort the rates by amount, but ensure defaultShippingRate is included in the final list
  // Max 9 cheapest shipping rates for Stripe
  const shippingRates = response.shipping.rates
    .sort((a, b) => {
      if (a.default) return -1
      if (b.default) return 1
      return a.amount - b.amount
    })
    .slice(0, 9)

  // Default to the cheapest rate if no .default specified above
  if (!defaultShippingRate) {
    defaultShippingRate = shippingRates[0]
  }

  // Map to ApplePay format id, amount, displayName
  return {
    amount: Math.round(response.cart.amount * 100),
    defaultShippingRateId: defaultShippingRate.id,
    shippingRates: shippingRates.map((rate) => {
      return {
        id: rate.id,
        amount: Math.round(rate.amount * 100),
        displayName: rate.label,
        deliveryEstimate: rate.description,
      }
    }),
  }
}

export async function setShippingRate(shippingRate) {
  const res = await fetch(storePathUrl(`/express_checkout/carts`), {
    method: 'PUT',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      authenticity_token: formAuthentityToken(),
      dedicated_cart_product_id: dedicatedCartProductId,
      shipping_rate: shippingRate,
    }),
  })

  if (!res.ok) {
    return await res.json() // Expects {error:{message: "..."}}
  }

  const response = await res.json()
  return {
    amount: Math.round(response.cart.amount * 100),
  }
}

export function loadingShippingRates() {
  return [
    {
      id: 'loading',
      displayName: 'Loading...',
      amount: 0,
    },
  ]
}

// We need the Qty field, and the optional variable Price field data
// Returns {quantity: "1", price: "100.0", _ufid, authenticity_token}
function addToCartFormData() {
  const form = document.querySelector(`form[data-cart-form="true"]`)

  const formData = new FormData(form)

  // Create an object to hold the form values
  const formValues = {}

  // Iterate through the FormData entries
  formData.forEach((value, key) => {
    formValues[key] = value
  })

  return formValues
}

export function removeWalletsContainer() {
  const id = `${providerName}WalletsContainer${providerId}`
  const walletsContainer = document.getElementById(id)
  if (walletsContainer) {
    walletsContainer.remove()
  }
}
