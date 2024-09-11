import { getAddressFromCoords, getLocationFromAddress } from './geocoding'
import { clearLocationMarkers } from '../theme/location-map'
import { startLoader, stopLoader } from './loader'

const params = new URLSearchParams(window.location.search)
const container = document.querySelector('[data-location-search-form]')

export function setupFormTemplate(template) {
  if (container === null) return
  container.appendChild(template.content.cloneNode(true))
  return container.querySelector('form')
}


/* Near address search form */

export async function initNearAddressForm(geolocation = null) {
  const addressInput = container.querySelector('input[name=address]')
  const addressParam = params.get('address')

  setDistanceUnit()
  setFormLatLng(geolocation)
  if (addressParam) {
    setFormAddress(addressParam)
    enableFormSubmit()
  } else getAddressFromCoords(geolocation, address => {
    setFormAddress(address)
    enableFormSubmit()
  })

  container.querySelector('form').addEventListener('submit', () => {
    startLoader(container)
    clearLocationMarkers()
    clearLocationResults()
  })

  addressInput.addEventListener('change', event => {
    clearLocationMarkers()
    clearLocationResults()
    disableFormSubmit()

    if (event.target.value) {
      startLoader(container)
      getLocationFromAddress(event.target.value, ({ latLng, formattedAddress }) => {
        setFormLatLng(latLng)
        setFormAddress(formattedAddress)
        submitForm()
      }).catch(error => {
        stopLoader(container)
        setFormError()
      })
    } else if (geolocation) {
      const useGeoBtn = container.querySelector('[data-use-geoloc]')

      useGeoBtn.classList.remove('sc-hide')
      clearFormError()
      clearLocationData()
      getAddressFromCoords(geolocation, address => {
        useGeoBtn.addEventListener('click', () => {
          useGeoBtn.classList.add('sc-hide')
          setFormAddress(address)
          submit()
        })
      })
    }
    else setFormError()
  })

  addressInput.addEventListener('input', event => {
    const address = event.target.value
    const searched = event.target.getAttribute('searched-value')

    clearFormError()
    container.querySelector('[data-use-geoloc]').classList.add('sc-hide')
    address == searched ? enableFormSubmit() : disableFormSubmit()
  })
}


/* Exact area search form */

export function initExactAreaForm() {
  const country = getCountry(container.querySelectorAll('input[name=country]'))
  const countrySelector = container.querySelector('[data-selector=country]')

  setupStateSelectors(country)
  countrySelector.addEventListener('change', event => {
    setupStateSelectors(event.target.value)
  })
}

function getCountry(countries = []) {
  return params.get('country') || countries.length === 2 ? countries[1].value : null
}

function setupStateSelectors(country) {
  const stateSelectors = container.querySelectorAll('[data-selector=state]')
  const combinedSelector = container.querySelector('[data-combined-state-selector]')

  stateSelectors.forEach(selector => {
    resetFormSelection(selector)
    if (country === null) {
      // Show the combined state selector
      selector.style.display = 'none'
      if (combinedSelector) combinedSelector.style.display = 'block'
    } else if (country === selector.dataset.id) {
      // Show the country state selector
      selector.style.display = 'block'
      if (combinedSelector) combinedSelector.style.display = 'none'
    } else selector.style.display = 'none'
  })
}

export function activateLocationCard(locationCard) {
  const locationCards = container.querySelectorAll('[data-location]')

  locationCards.forEach(card => card.classList.remove('sc-outline'))
  locationCard.classList.add('sc-outline')
  scrollToLocationCard(card)
}

function scrollToLocationCard(card) {
  const padding = window.getComputedStyle(container).getPropertyValue('padding-bottom')
  const posY = card.offsetTop - parseInt(padding, 10)
  const posX = card.offsetLeft - parseInt(padding, 10)

  container.scrollTop = posY
  container.scrollLeft = posX
}

function clearLocationResults() {
  const summary = document.querySelector('[data-location-search-summary]')
  const cards = document.querySelectorAll('[data-location]')

  if (cards.length === 0) return
  summary.innerText = summary.dataset.default
  cards.forEach(card => card.classList.add('sc-hide'))
}

function setFormLatLng(latLng = null) {
  if (latLng === null) return
  container.querySelector('input[name=lat]').value = latLng.lat
  container.querySelector('input[name=lng]').value = latLng.lng
}

function setFormAddress(address) {
  container.querySelector('input[name=address]').value = address
}

function setDistanceUnit() {
  const unit = getDistanceUnit()
  const distUnitInput = container.querySelector('input[name=distance_unit]')
  const distUnitLabel = container.querySelector('[data-distance-unit]')

  distUnitInput.value = unit
  distUnitLabel.innerText = getUnitLabel(unit)
}

function getDistanceUnit() {
  const locale = Intl.DateTimeFormat().resolvedOptions().locale
  return ['en-US', 'en-GB'].includes(locale) ? 'imp' : 'metric'
}

function resetSelectorLabel(selector) {
  const label = selector.querySelector('[data-dropdown-selection]')
  label.innerText = label.dataset.default
}

function resetSelections(selector) {
  selector.querySelectorAll('[data-dropdown-option]:checked')
    .forEach(option => option.checked = false)
}

function resetFormSelection(selector) {
  const selected = selector.querySelectorAll('[data-dropdown-option]:checked')
  selected.forEach(option => option.checked = false)
}

function clearLocationData() {
  container.querySelector('input[name=lat]').value = ''
  container.querySelector('input[name=lng]').value = ''
  container.querySelector('input[name=address]').value = ''
  disableFormSubmit()
}

function setFormError() {
  container.querySelector('[data-location-error]').classList.remove('sc-hide');
  container.querySelector('input[name=address]').classList.add('has-error');
}

function clearFormError() {
  container.querySelector('[data-location-error]').classList.add('sc-hide');
  container.querySelector('input[name=address]').classList.remove('has-error');
}

function enableFormSubmit() {
  container.querySelector('button[type=submit]').removeAttribute('disabled')
}

function disableFormSubmit() {
  container.querySelector('button[type=submit]').setAttribute('disabled', true)
}

function submitForm() {
  container.querySelector('form').submit()
}

function getUnitLabel(unit) {
  const form = container.querySelector('form')
  switch (unit) {
    case 'imp':
      return form.getAttribute('data-distance-unit-imperial')
    case 'metric':
      return form.getAttribute('data-distance-unit-metric')
  }
}

export function findLocationSearchForm(container) {
  return container.querySelector('[data-location-search-form]')
}
