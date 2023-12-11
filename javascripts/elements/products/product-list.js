import { initShadowDOM } from '../../system/setup-elements.js'

export default class ProductListElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const element = initShadowDOM(this, 'product-list')
  }
}
