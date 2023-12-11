import attachElementTemplate from "/javascripts/system/attach-element-template"

export default class ProductCardElement extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const element = attachElementTemplate(this, 'sc-product-card')
    const button = element.querySelector('a')

    // Setup event listeners
    button.addEventListener('click', this.handleClick)
  }

  handleClick() {
    console.log('click')
  }
}
