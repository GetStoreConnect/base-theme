import { createMap, createLocationMarker, setNearBeacon, setZoomForSingleResult, setFocusedMarker, onClickMarker } from '../theme/location-map'
import { initNearAddressForm, initExactAreaForm, setupFormTemplate } from '../theme/location-search-form'
import { setFocusedLocationCard, onClickLocationCard, setLocationCardData } from '../theme/location-cards'
import { setContainerToWindowHeight } from '../theme/utils/window'
import { getClientGeolocation } from '../theme/geolocation'
import { startLoader, stopLoader } from '../theme/loader'
import { tryGeocoder } from '../theme/geocoding'

const DEFAULT_COORD = { lat: -33.8523, lng: 151.2108 }
const container = document.querySelector('[data-location-search]')
const locations = container.querySelectorAll('[data-location]')
const mapContainer = document.querySelector('[data-location-map]')

startLoader(container)
setContainerToWindowHeight(container)
getClientGeolocation(geolocation =>  {
  // When a Google API key is unavailable we don't include the map
  // container in the HTML at all and return results based on the
  // country, state and/or postal code.
  if (mapContainer === null) {
    setupFormTemplate(document.querySelector('#sc-location-form-exact'))
    stopLoader(container)
    return initExactAreaForm()
  }

  // Initialize the map and create location markers using the
  // coordinates embedded in search results HTML. This is a
  // round-about way of getting this data, which would ideally
  // come directly from the server as JSON.
  const latLng = getLatLngParams() || geolocation || DEFAULT_COORD
  const origin = geolocation || DEFAULT_COORD

  createMap(latLng, map => {
    const bounds = new google.maps.LatLngBounds()

    setNearBeacon(latLng)

    locations.forEach(location => {
      // Create a marker for each location abd extend the
      // map's bounds to include each marker's position.
      const latLng = getLatLngFromElem(location)
      const marker = createLocationMarker(latLng)

      bounds.extend(latLng)

      setLocationCardData(location, origin)
      setZoomForSingleResult(bounds)

      // Focus the map on the first (nearest) location in
      // the search results and highlight its location card.
      if (locations[0] === location) {
        setFocusedMarker(marker)
        setFocusedLocationCard(location)
      }
      // Clicking a location card or map marker will shift the
      // map center to the location position and highlight the
      // marker and corresponding location card.
      onClickLocationCard(location, () => {
        setFocusedMarker(marker)
        setFocusedLocationCard(location)
      })
      onClickMarker(marker, () => {
        setFocusedMarker(marker)
        setFocusedLocationCard(location)
      })
    })
    // After we've extended the map's bounds to include all
    // location markers, we fit the map to the extended bounds.
    if (locations.length > 0) map.fitBounds(bounds)
  })

  tryGeocoder(
    // The Geocoder service is used to convert a typed address into
    // a set of coordinates. When the Geocoding API is available,
    // we render a form to search for locations relative to the
    // client location or any typed address.
    () => {
      const template = document.querySelector('#sc-location-form-near')

      stopLoader(container)
      setupFormTemplate(template)
      initNearAddressForm(geolocation)
    },

    // When the Geocoding API is unavailable we render a form
    // that allows the user to search within an area, defined
    // by state and/or postal code.
    () => {
      const template = document.querySelector('#sc-location-form-exact')

      stopLoader(container)
      setupFormTemplate(template)
      initExactAreaForm()
    }
  )
})

function getLatLngFromElem(location) {
  const lat = location.dataset.lat
  const lng = location.dataset.lng

  return lat && lng ? {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  } : null
}

function getLatLngParams() {
  const params = new URLSearchParams(window.location.search)
  const lat = params.get('lat')
  const lng = params.get('lng')

  if (!lat && !lng) return null
  return { lat: parseFloat(lat), lng: parseFloat(lng) }
}
