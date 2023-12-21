import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class Topbar extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-top-bar')
  }
}

customElements.define('sc-top-bar', Topbar)
