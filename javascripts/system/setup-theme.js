import DUMMY_DATA from '/data.json'
import initThemeBuilder from './theme-builder'

export default async function setupTheme() {
  const style = document.createElement('style')

  style.innerHTML = getThemeProps(DUMMY_DATA.theme.settings)
  document.head.appendChild(style)
  initThemeBuilder(style)
}
