import { attachElementTemplate } from '/javascripts/system/elements'
import { dispatchEvent } from '/javascripts/system/events'

export default class ProductCard extends HTMLElement {
  constructor() {
    super()
  }

  connectedCallback() {
    const element = attachElementTemplate(this, 'sc-product-card')
    const button = element.querySelector('a')

    // Setup event listeners
    button.addEventListener('click', (event) => {
      // Handle click event
      this.handleClick(event)
      // Dispatch a custom event so that the client's
      // custom code can listen for it and do something
      dispatchEvent(element, 'sc-product-card-clicked')
    })
  }

  handleClick(_event) {
    console.log('handle product card click')
  }
}
