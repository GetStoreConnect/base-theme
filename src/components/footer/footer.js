import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class Footer extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-footer')
  }
}

customElements.define('sc-footer', Footer)
