import { initShadowDOM } from '/assets/system/elements'

export default class ProductList extends HTMLElement {
  constructor() {
    super()
    this.id = 'sc-product-list'
  }

  connectedCallback() {
    const element = initShadowDOM(this)
  }
}
