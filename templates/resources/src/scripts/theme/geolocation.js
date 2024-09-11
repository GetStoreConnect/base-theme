// Returns geolocation coordinates from the session if available,
// otherwise attempts to fetch and return the current geolocation
export function getClientGeolocation(callback) {
  const geolocation = getGeolocationFromSession()

  if (geolocation) return callback(geolocation)
  if (!navigator || !navigator.geolocation) return callback()


  navigator.geolocation.getCurrentPosition(
    (position) => {
      console.log(position)
      const latLng = getLatLngFromPosition(position)

      setGeolocationToSession(latLng)
      callback(latLng)
    },
    () => {
      console.log('Geolocation failed')
      callback()
    }
  )
}

export function getGeolocationFromSession() {
  return JSON.parse(window.sessionStorage.getItem('geolocation'));
}

export function setGeolocationToSession(geoloc) {
  if (geoloc === null) return
  window.sessionStorage.setItem('geolocation', JSON.stringify(geoloc));
}

export function getLatLngFromPosition(position) {
  return { lat: position.coords.latitude, lng: position.coords.longitude }
}
