import { initShadowDOM } from '/system/elements'

export default class ProductListElement extends HTMLElement {
  constructor() {
    super()
    this.id = 'sc-product-list'
  }

  connectedCallback() {
    const element = initShadowDOM(this)
  }
}
