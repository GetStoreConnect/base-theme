import { LitElement, html, css } from 'lit'
import { defineCustomElem } from '/src/scripts/system/elements'

export default class Placeholder extends LitElement {
  static properties = {
    viewBox: { type: String },
    width: { type: String },
    height: { type: String },
    fill: { type: String },
    rx: { type: String },
  }

  static styles = css`
    :host {
      font-size: 0;
      display: inline-flex;
      justify-content: center;
      align-items: center;
    }

    svg {
      position: relative;
      fill: rgba(black, 0.05);
    }
  `

  constructor() {
    super()
    this.viewBox = '0 0 100 100'
    this.fill = 'hsl(0, 0%, 94%)'
    this.height = 'var(--sc-input-height)'
    this.rx = '20'
  }

  render() {
    return html`
      <svg
        viewBox="${this.viewBox}"
        width="${this.width}"
        height="${this.height}"
        fill="${this.fill}"
      >
        <rect width="100%" height="100%" rx=${this.rx}></rect>
      </svg>
    `
  }
}

defineCustomElem('sc-placeholder', Placeholder)
