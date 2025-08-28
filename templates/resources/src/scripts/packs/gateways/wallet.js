import storePathUrl from '../../theme/store-path-url'

export class Wallet {
  constructor(paymentForm) {
    this.paymentForm = paymentForm
  }

  walletsContainerId() {
    return `${this.paymentForm.providerName}WalletsContainer${this.paymentForm.elementProviderId()}`
  }

  walletsContainer() {
    const container = document.getElementById(this.walletsContainerId())
    if (!container) {
      this.paymentForm.reportError(
        `Cannot setup wallets: no wallets container element found #${this.walletsContainerId()}`,
        { containerId: this.walletsContainerId() }
      )
    }
    return container
  }

  walletsElementId() {
    return `${this.paymentForm.providerName}WalletsCheckout${this.paymentForm.elementProviderId()}`
  }

  walletsElementExists() {
    const container = document.getElementById(this.walletsContainerId())
    if (!container) {
      return false
    }
    const element = container.querySelector('[data-ref="wallet-buttons"]')
    if (!element) {
      return false
    }
    return true
  }

  walletsElement() {
    const walletsElement = this.walletsContainer().querySelector('[data-ref="wallet-buttons"]')
    if (!walletsElement) {
      this.paymentForm.reportError(
        `Cannot setup wallets: no wallets container element found #${this.walletsContainerId()} [data-ref="wallet-buttons"]`,
        { containerId: this.walletsContainerId() }
      )
    }
    return walletsElement
  }

  walletsErrorElement() {
    let walletsErrorElement = this.walletsContainer().querySelector('[data-ref="wallet-error"]')
    if (!walletsErrorElement) {
      this.paymentForm.reportError(
        `Cannot setup wallets: no wallets error element found #${this.walletsContainerId()} [data-ref="wallet-error"]`,
        { containerId: this.walletsContainerId() }
      )
      walletsErrorElement = this.paymentForm.errorElement()
    }
    return walletsErrorElement
  }

  showWalletsError(error, options = {}) {
    options.errorContainer = this.walletsErrorElement()
    this.paymentForm.showError(error, options)
  }

  async prepareProductCartWithAddToCartData(dedicatedCartProductId) {
    if (!dedicatedCartProductId) {
      return
    }

    const res = await fetch(storePathUrl(`/express_checkout/carts`), {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        authenticity_token: this.paymentForm.formAuthentityToken(),
        add_to_cart_form_data: this.addToCartFormData(),
        dedicated_cart_product_id: dedicatedCartProductId,
      }),
    })

    if (!res.ok) {
      try {
        return await res.json() // Expects {error:{message: "..."}}
      } catch {
        return { error: { message: 'An error has occurred, please try again shortly.' } }
      }
    }

    const response = await res.json()
    return {
      amount: Math.round(response.cart.amount * 100),
    }
  }

  // PUT /express_checkout/shipping_methods
  // {"shipping":{"methods":["pick_up","regular_post","express_post","courier"],"rates":[{"id":"Custom Shipping_custom-shppng-1","label":"Standard shipping","amount":10.0},{"id":"Australia Post_PARCEL POST + SIGNATURE","label":"PARCEL POST + SIGNATURE","amount":"17.14"},{"id":"Australia Post_EXPRESS POST + SIGNATURE","label":"EXPRESS POST + SIGNATURE","amount":"17.4"}]}}
  async fetchShippingRates(address) {
    let params = {
      address,
      authenticity_token: this.paymentForm.formAuthentityToken(),
    }
    if (this.paymentForm.dedicatedCartProductId) {
      params.dedicated_cart_product_id = this.paymentForm.dedicatedCartProductId
      params.add_to_cart_form_data = this.addToCartFormData()
    }
    const res = await fetch(storePathUrl(`/express_checkout/shipping_methods`), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify(params),
    })

    if (!res.ok) {
      try {
        return await res.json() // Expects {error:{message: "..."}}
      } catch {
        return { error: { message: 'An error has occurred, please try again shortly.' } }
      }
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

  async setShippingRate(shippingRate) {
    const res = await fetch(storePathUrl(`/express_checkout/carts`), {
      method: 'PUT',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({
        authenticity_token: this.paymentForm.formAuthentityToken(),
        dedicated_cart_product_id: this.paymentForm.dedicatedCartProductId,
        shipping_rate: shippingRate,
      }),
    })

    if (!res.ok) {
      try {
        return await res.json() // Expects {error:{message: "..."}}
      } catch {
        return { error: { message: 'An error has occurred, please try again shortly.' } }
      }
    }

    const response = await res.json()
    return {
      amount: Math.round(response.cart.amount * 100),
    }
  }

  loadingShippingRates() {
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
  addToCartFormData() {
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

  removeWalletsContainer() {
    const id = `${this.paymentForm.providerName}WalletsContainer${this.paymentForm.providerId}`
    const walletsContainer = document.getElementById(id)
    if (walletsContainer) {
      walletsContainer.remove()
    }
  }
}

// Export standalone functions for backwards compatibility
export function fetchShippingRates(address) {
  throw new Error('fetchShippingRates should now be called as a method on a Wallet instance')
}

export function setShippingRate(shippingRate) {
  throw new Error('setShippingRate should now be called as a method on a Wallet instance')
}

export function walletsElement() {
  throw new Error('walletsElement should now be called as a method on a Wallet instance')
}

export function showWalletsError(error, options = {}) {
  throw new Error('showWalletsError should now be called as a method on a Wallet instance')
}

export function walletsElementExists() {
  throw new Error('walletsElementExists should now be called as a method on a Wallet instance')
}

export function removeWalletsContainer() {
  throw new Error('removeWalletsContainer should now be called as a method on a Wallet instance')
}

export function loadingShippingRates() {
  throw new Error('loadingShippingRates should now be called as a method on a Wallet instance')
}

export function prepareProductCartWithAddToCartData(dedicatedCartProductId) {
  throw new Error(
    'prepareProductCartWithAddToCartData should now be called as a method on a Wallet instance'
  )
}

export function walletsElementId() {
  throw new Error('walletsElementId should now be called as a method on a Wallet instance')
}
