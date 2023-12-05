export default class ProductList extends HTMLElement {
  constructor() {
    super()
  }

  async connectedCallback() {
    const shadow = this.attachShadow({ mode: "open" })
    const template = document.querySelector('template#sc-product-list')

    shadow.appendChild(template.content.cloneNode(true))
  }
}
