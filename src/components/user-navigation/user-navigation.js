import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class UserNavigation extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-user-navigation')
  }
}

customElements.define('sc-user-navigation', UserNavigation)
