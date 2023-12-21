import { LitElement, css } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class ProductList extends LitElement {
  static properties = {
    type: { type: String },
  }

  static styles = css`
    ul {
      margin: 0;
      padding: var(--sc-spacing-small);
      gap: var(--sc-spacing-small);
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(
        auto-fill,
        minmax(var(--sc-product-card-min-width), 1fr)
      );
    }
  `

  getStyleClass() {
    return [this.type].join()
  }

  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-product-list')
  }
}

customElements.define('sc-product-list', ProductList)
