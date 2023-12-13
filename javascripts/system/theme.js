import DUMMY_DATA from '/data.json'
import { parseLiquid } from './parser'

let settings = DUMMY_DATA.theme.settings

export function setupTheme() {
  const style = document.createElement('style')

  style.innerHTML = getThemeProps(DUMMY_DATA.theme.settings)
  document.head.appendChild(style)
  initThemeBuilder(style)
}

async function initThemeBuilder(style) {
  const fragment = await createThemeBuilder()

  document.body.appendChild(fragment)
  fragment.querySelectorAll('input').forEach(input => {
    input.addEventListener('change', handleSettingChange)
  })
}

function handleSettingChange(event) {
  settings = getUpdatedSettings(settings, event.target)
  style.innerHTML = getThemeProps(settings)
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

function getThemeProps(settings) {
  const props = settings.map(setting => (
    '--' + setting.key + ': ' + setting.value + ';'
  ))
  return ':root {' + props + '}'
}
