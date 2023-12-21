import { LitElement } from 'lit'
import {
  attachElemTemplate,
  defineCustomElem,
} from '/src/scripts/system/elements'

export default class UserNavigation extends LitElement {
  constructor() {
    super()
  }

  render() {
    attachElemTemplate(this, 'template#sc-user-navigation')
  }
}

defineCustomElem('sc-user-navigation', UserNavigation)
