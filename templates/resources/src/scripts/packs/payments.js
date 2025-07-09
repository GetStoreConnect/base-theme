import { onDomChange } from '../theme/utils/init'
import Cookie from 'js-cookie'
window.StoreConnect = window.StoreConnect || {}

// Update checkout summary panel
onDomChange((node) => {
  if (!node.querySelector('[data-checkout-summary]')) {
    return
  }

  resetPaymentCookieIfNecessary()

  const tabTriggers = node.querySelectorAll('[data-tab-trigger]')

  ;[...tabTriggers].map((tab) => {
    tab.addEventListener('click', (event) => {
      const providerId = event.target.getAttribute('data-tab-trigger')

      if (providerId) {
        showPaymentForm(providerId)
      }
    })
  })

  let currentProviderId = Cookie.get('last-used-payment-provider')

  if (currentProviderId && providerIdTabExists(currentProviderId)) {
    showPaymentForm(currentProviderId)
  } else {
    currentProviderId = null
    // If there is no last used provider, we'll show the first one if it is available
    const paymentProviders = document.querySelector("section[data-tabs='payment']")
    if (paymentProviders) {
      if (paymentProviders.querySelector('[data-tab]')) {
        currentProviderId = paymentProviders.querySelector('[data-tab]').getAttribute('data-tab')
        if (currentProviderId) {
          showPaymentForm(currentProviderId)
        }
      }
    }
  }

  // If no payment provider is selected,
  // e.g. vouchers/credit covers the entire order
  // we still need to setTotalPayable + setTotalTax
  if (!currentProviderId) {
    activateSurcharge()
  }
})

// Once a payment is processed, reset the payment provider cookie;
// Or if the user starts the checkout process again.
// The data-reset-cookie-checkout attribute should appear on these pages.
function resetPaymentCookieIfNecessary() {
  if (document.querySelector('[data-reset-cookie-checkout]')) {
    Cookie.remove('last-used-payment-provider')
  }
}

function providerIdTabExists(providerId) {
  return document.querySelector(`[data-tab='${providerId}']`)
}

function showPaymentForm(providerId) {
  document.querySelectorAll('[data-tab]').forEach((tab) => tab.classList.add('sc-hide'))
  document
    .querySelectorAll('[data-tab-trigger]')
    .forEach((tab) => tab.classList.remove('is-active'))

  const tab = document.querySelector(`[data-tab='${providerId}']`)
  const trigger = document.querySelector(`[data-tab-trigger='${providerId}']`)

  // Store the selected payment provider for 1 day
  Cookie.set('last-used-payment-provider', providerId, { expires: 1 })

  if (tab) {
    tab.classList.remove('sc-hide')
  }
  if (trigger) {
    trigger.classList.add('is-active')
  }
  activateSurcharge(providerId)
}

// providerId may be null if there is no payment provider selected
// e.g. vouchers/credit covers the entire order
function activateSurcharge(providerId) {
  const totalPayableElem = document.querySelector('[data-order-cart-total-payable]')
  const totalTaxElem = document.querySelector('[data-order-tax-amount]')

  document.querySelectorAll(`[data-surcharge-id]`).forEach((elem) => elem.classList.add('sc-hide'))

  let elem = null
  if (providerId) {
    const selector = `[data-surcharge-id="${providerId}"]`
    document.querySelectorAll(selector).forEach((elem) => elem.classList.remove('sc-hide'))

    elem = document.querySelector(selector)
  }

  if (elem) {
    setTotalPayable(elem.getAttribute('data-surcharge-cart-total-payable'))
    setTotalTax(elem.getAttribute('data-surcharge-cart-total-tax'))
  } else {
    if (totalPayableElem) {
      setTotalPayable(totalPayableElem.getAttribute('data-order-cart-total-payable'))
    }

    if (totalTaxElem) {
      setTotalTax(totalTaxElem.getAttribute('data-order-tax-amount'))
    }
  }
}

function setTotalPayable(amount) {
  document.querySelectorAll('[data-order-cart-total-payable]').forEach((elem) => {
    elem.innerHTML = amount
  })
}

function setTotalTax(amount) {
  document.querySelectorAll('[data-order-tax-amount]').forEach((elem) => {
    elem.innerHTML = amount
  })
}
