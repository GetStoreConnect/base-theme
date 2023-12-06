import { initShadowDOM } from "/system/elements"

export default class CardElement extends HTMLElement {
  constructor() {
    super()
    this.id = 'sc-card'
  }

  connectedCallback() {
    const element = initShadowDOM(this)
  }
}
