import { LitElement, html, css } from 'lit'

export default class Brand extends LitElement {
  static properties = {
    href: { type: String },
    logo: { type: Object },
  }

  static styles = css`
    :host {
      grid-area: brand;
      display: inline-block;
    }

    a {
      display: inline-block;
      font-size: 0;
      padding: var(--sc-spacing-small);
    }
  `

  constructor() {
    super()
    this.logo = {}
    this.href = '/'
  }

  render() {
    if (this.logo && Object.keys(this.logo).length > 0)
      return html`
        <a href="${this.href}">
          <img src="${this.logo.url}" alt="Logo" />
        </a>
      `
    else
      return html`
        <a href="${this.href}">
          <sc-placeholder viewBox="0 0 180 40"></sc-placeholder>
        </a>
      `
  }
}

customElements.define('sc-brand', Brand)
