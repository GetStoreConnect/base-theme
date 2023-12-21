import { LitElement, html, css } from 'lit'
import { defineCustomElem } from '/src/scripts/system/elements'

export default class BaseCard extends LitElement {
  static properties = {
    href: { type: String },
  }

  static styles = css`
    button {
      background-color: transparent;
      border: none;
      cursor: pointer;
      padding: 0;
    }
  `

  constructor() {
    super()
  }

  connectedCallback() {
    super.connectedCallback()
    this.addEventListener('click', (event) => {})
  }

  render() {
    if (Object.keys(this.href).length > 0)
      return html`
        <a href="${this.href}">
          <slot></slot>
        </a>
      `
    else
      return html`
        <button type="button">
          <slot></slot>
        </button>
      `
  }
}

defineCustomElem('sc-base-card', BaseCard)
