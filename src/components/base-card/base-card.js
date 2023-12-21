import { LitElement, html, css } from 'lit'

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

customElements.define('sc-base-card', BaseCard)
