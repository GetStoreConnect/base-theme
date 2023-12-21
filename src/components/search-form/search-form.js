import { LitElement } from 'lit'
import { attachElemTemplate } from '/src/scripts/system/elements'

export default class SearchForm extends LitElement {
  static properties = {
    action: { type: String },
  }

  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-search-form')
  }
}

customElements.define('sc-search-form', SearchForm)
