import { LitElement, html, css } from 'lit'
import { defineCustomElem } from '/src/scripts/system/elements'

export default class BaseButton extends LitElement {
  static properties = {
    href: { type: String },
    size: { type: String },
    expand: { type: Boolean },
  }

  static styles = css`
    button,
    a {
      cursor: pointer;
      border: none;
      appearance: none;
      height: 50px;
      width: 100%;
      background-color: var(--sc-color-primary);
      border-radius: var(--sc-border-radius);
      font-size: var(--sc-font-medium);
      color: white;
      padding: 0 var(--sc-spacing-base);
    }

    button:hover,
    a:hover {
      background-color: hsl(
        var(--sc-color-primary-h),
        var(--sc-color-primary-s),
        40%
      );
    }
  `

  constructor() {
    super()
    this.href = null
    this.type = 'button'
  }

  connectedCallback() {
    super.connectedCallback()
  }

  getWidth() {
    if (this.expand) return '100%'
    else return 'auto'
  }

  render() {
    if (this.href)
      return html`
        <a href="${this.href}">
          <slot></slot>
        </a>
      `
    else
      return html`
        <button type=${this.type}>
          <slot></slot>
        </button>
      `
  }
}

defineCustomElem('sc-button', BaseButton)
