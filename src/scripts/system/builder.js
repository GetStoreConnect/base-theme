import { LitElement, html, css } from 'lit'

export class ThemeBuilder extends LitElement {
  static get styles() {
    return css`
      form {
        font-family: 'Inter', sans-serif;
        font-size: 15px;
        display: flex;
        flex-direction: column;
        height: 100vh;
        background: #333;
        color: #ccc;
        box-shadow: 0 3px 32px hsla(0, 0%, 0%, 0.2);
      }

      header {
        color: white;
        margin: 0;
        padding: 0 20px;
      }

      .prop {
        display: grid;
        grid-template-columns: 1fr 1fr;
        align-items: center;
        gap: 20px;
        padding: 10px 20px;
        border-bottom: 1px solid hsla(0, 0%, 0%, 0.4);
      }

      input {
        border: none;
        height: 40px;
        padding: 0 10px;
        border-radius: 4px;
        background-color: transparent;
        font-family: inherit;
        font-size: inherit;
        color: white;
      }
    `
  }

  constructor() {
    super()
    this.props = themeProps
  }

  renderProp(name) {
    const label = name.replace(/--sc-/g, '')
    const value = this.props[name]

    return html`
      <div class="prop">
        <label>${label}</label>
        <input type="text" name="${label}" value="${value}" />
      </div>
    `
  }

  renderProps() {
    return [...Object.keys(this.props)].map((key) => {
      return this.renderProp(key)
    })
  }

  render() {
    return html` <form>${this.renderProps()}</form> `
  }
}
