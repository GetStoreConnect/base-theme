export default class ProductCard extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: 'open' })
    const template = document.querySelector('template#sc-product-card')
    const clone = template.content.cloneNode(true)
    const button = clone.querySelector('a')

    shadow.appendChild(clone)

    // Setup event listeners
    button.addEventListener('click', this.handleClick)
  }

  handleClick() {
    console.log('click')
  }
}
