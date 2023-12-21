import { LitElement } from 'lit'
import {
  attachElemTemplate,
  defineCustomElem,
} from '/src/scripts/system/elements'

export default class Navigation extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-navigation')
  }
}

defineCustomElem('sc-navigation', Navigation)
