import { attachElementTemplate } from '/javascripts/system/elements'

export default class ProductList extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const element = attachElementTemplate(this, 'sc-product-list')
  }
}
