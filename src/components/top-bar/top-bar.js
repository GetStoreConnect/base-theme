import { LitElement } from 'lit'
import {
  attachElemTemplate,
  defineCustomElem,
} from '/src/scripts/system/elements'

export default class Topbar extends LitElement {
  constructor() {
    super()
  }

  connectedCallback() {
    attachElemTemplate(this, 'template#sc-top-bar')
  }
}

defineCustomElem('sc-top-bar', Topbar)
