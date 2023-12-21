import { LitElement, html, css } from 'lit'
import { defineCustomElem } from '/src/scripts/system/elements'

export default class Input extends LitElement {
  static properties = {
    name: { type: String },
    type: { type: String },
  }

  static styles = css`
    :host {
      --sc-icon-width: 34px;

      display: block;
      position: relative;
    }

    input {
      width: 100%;
      border: none;
      outline: none;
      appearance: none;
      border-style: solid;
      background: transparent;
      height: var(--sc-input-height);
      font-size: var(--sc-input-font-size);
      border: var(--sc-input-border);
      background-color: var(--sc-input-bg);
      border-color: hsl(0, 0%, var(--sc-input-border-lightness));
      border-width: var(--sc-input-border-width);
      border-radius: var(--sc-border-radius);
      box-shadow: var(--sc-input-shadow);
      padding: 0 var(--sc-spacing-small);
    }

    input:focus {
      border-color: hsl(
        var(--sc-color-primary-h),
        40%,
        var(--sc-input-border-lightness)
      );
      background-color: hsl(
        var(--sc-color-primary-h),
        var(--sc-color-primary-s),
        95%
      );
    }
  `

  constructor() {
    super()
    this.name = null
    this.type = 'text'
    this.placeholder = 'Placeholder'
  }

  render() {
    return html`
      <input
        type="${this.type}"
        name="${this.name}"
        placeholder="${this.placeholder}"
      />
    `
  }
}

defineCustomElem('sc-input', Input)
