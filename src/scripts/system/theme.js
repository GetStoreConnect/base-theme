import THEME from '/src/theme.json'

export default class StoreConnectTheme {
  constructor() {
    this.props = THEME.properties
  }

  async init() {
    const style = document.createElement('style')

    document.head.appendChild(style)
    this.update()
  }

  update() {
    document.querySelector('style').innerHTML =
      ':root {' +
      [...Object.keys(this.props)]
        .map((key) => '--' + key + ': ' + this.props[key] + ';')
        .join('') +
      '}'
  }

  get(key) {
    return this.props[key]
  }

  set(key, value) {
    this.props = { ...this.props, [key]: value }
  }
}
