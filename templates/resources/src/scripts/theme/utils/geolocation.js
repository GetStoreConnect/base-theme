export function fetchGeolocation(onSuccess, onError) {
  if (navigator && navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => onSuccess(pos),
      (err) => onError(err)
    )
  } else onError()
}

export function getGeolocationFromSession() {
  return JSON.parse(window.sessionStorage.getItem('geolocation'))
}

export function setGeolocationToSession(geoloc) {
  if (geoloc === null) return
  window.sessionStorage.setItem('geolocation', JSON.stringify(geoloc))
}

export function getLatLngFromGeo(pos) {
  return { lat: pos.coords.latitude, lng: pos.coords.longitude }
}
