import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class ProductCard extends LitElement {
  static get properties() {
    return {
      href: { type: String },
      product: { attribute: false, type: Object },
    }
  }
  constructor() {
    super()
    this.href = this.getAttribute('href') || ''
    this.product = this.getAttribute('product') || {}
    console.log(this.product)
  }

  render() {
    attachElemTemplate(this, 'template#sc-product-card')
  }
}

customElements.define('sc-product-card', ProductCard)
