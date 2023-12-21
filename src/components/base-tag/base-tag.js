import { LitElement, html, css } from 'lit'

export default class BaseTag extends LitElement {
  static styles = css`
    span {
      display: inline-block;
      color: white;
      line-height: var(--sc-base-tag-height);
      height: var(--sc-base-tag-height);
      background-color: var(--sc-color-primary);
      border-radius: var(--sc-base-tag-radius);
      padding: 0 var(--sc-spacing-tiny);
    }
  `
  constructor() {
    super()
  }

  render() {
    return html`<span><slot></slot></span>`
  }
}

customElements.define('sc-base-tag', BaseTag)
