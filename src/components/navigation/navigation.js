import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class Navigation extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-navigation')
  }
}

customElements.define('sc-navigation', Navigation)
