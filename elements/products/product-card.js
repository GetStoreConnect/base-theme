import { initShadowDOM } from "/assets/system/elements"

export default class ProductCard extends HTMLElement {
  constructor() {
    super()
    this.id = 'sc-product-card'
  }

  connectedCallback() {
    const element = initShadowDOM(this)
    const button = element.querySelector('a')

    // Setup event listeners
    button.addEventListener('click', this.handleClick)
  }

  handleClick() {
    console.log('click')
  }
}
