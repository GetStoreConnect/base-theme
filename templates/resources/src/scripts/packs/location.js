import { createMap, createLocationMarker, setNearBeacon, setFocusedMarker } from '../theme/location-map'
import { getClientGeolocation } from '../theme/geolocation'
import { startLoader, stopLoader } from '../theme/loader'
import { setContainerToWindowHeight } from '../theme/utils/window'

const container = document.querySelector('[data-location-record]')
const latLng = getLatLngFromMap()

setContainerToWindowHeight(container)
startLoader(container)
getClientGeolocation(geolocation =>  {
  createMap(latLng, () => {
    const marker = createLocationMarker(latLng)

    stopLoader(container)
    setNearBeacon(geolocation)
    setFocusedMarker(marker)
  })
})

function getLatLngFromMap() {
  const map = document.querySelector('[data-location-map]')
  const lat = map.dataset.lat
  const lng = map.dataset.lng

  return lat && lng ? {
    lat: parseFloat(lat),
    lng: parseFloat(lng),
  } : null
}
