import { LitElement } from 'lit'
import {
  attachElemTemplate,
  defineCustomElem,
} from '/src/scripts/system/elements'

export default class ProductPoints extends LitElement {
  static properties = {
    points: { type: Array },
  }

  constructor() {
    super()
    this.points = []
  }

  render() {
    attachElemTemplate(this, 'template#sc-product-points')
  }
}

defineCustomElem('sc-product-points', ProductPoints)
