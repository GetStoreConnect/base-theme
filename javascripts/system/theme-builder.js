import DUMMY_DATA from '/data.json'
import { parseLiquid } from './parser'

let settings = DUMMY_DATA.theme.settings

export default async function initThemeBuilder(style) {
  const fragment = await createThemeBuilder()
  const inputs = fragment.querySelectorAll('input')

  inputs.forEach(input => input.addEventListener('change', event => {
    settings = getUpdatedSettings(settings, event.target)
    style.innerHTML = getThemeProps(settings)
  }))

  document.body.appendChild(fragment)
}

function getUpdatedSettings(settings, target) {
  return settings.map(setting => setting.key === target.name ?
    {...setting, value: target.value} : setting
  )
}

async function createThemeBuilder() {
  const range = document.createRange()
  const response = await fetch('/theme-builder.liquid')
  const textLiquid = await response.text()
  const textHTML = await parseLiquid(textLiquid, DUMMY_DATA)

  return range.createContextualFragment(textHTML)
}
