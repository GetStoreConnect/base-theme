(() => {
  // src/scripts/theme/utils/color.js
  function getHSLFromCSSColor(element) {
    return RGBToHSL(getComputedStyle(element).color);
  }
  function RGBToHSL(rgb) {
    let sep = rgb.indexOf(",") > -1 ? "," : " ";
    rgb = rgb.substr(4).split(")")[0].split(sep);
    for (let R in rgb) {
      let r2 = rgb[R];
      if (r2.indexOf("%") > -1) rgb[R] = Math.round(r2.substr(0, r2.length - 1) / 100 * 255);
    }
    let r = rgb[0] / 255, g = rgb[1] / 255, b = rgb[2] / 255;
    let cmin = Math.min(r, g, b), cmax = Math.max(r, g, b), delta = cmax - cmin, h = 0, s = 0, l = 0;
    if (delta == 0) h = 0;
    else if (cmax == r) h = (g - b) / delta % 6;
    else if (cmax == g) h = (b - r) / delta + 2;
    else h = (r - g) / delta + 4;
    h = Math.round(h * 60);
    if (h < 0) h += 360;
    l = (cmax + cmin) / 2;
    s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
    s = +(s * 100).toFixed(1);
    l = +(l * 100).toFixed(1);
    return { h, s, l };
  }

  // src/scripts/theme/location-map.js
  var map;
  var markers = [];
  var nearMarker = null;
  async function createMap(latLng2, onMapLoaded) {
    const container2 = document.querySelector("[data-location-map]");
    const { Map } = await google.maps.importLibrary("maps");
    map = new Map(container2, {
      zoom: 14,
      center: latLng2,
      disableDefaultUI: true,
      zoomControl: true
    });
    onMapLoaded(map);
  }
  function createLocationMarker(latLng2) {
    const marker = new google.maps.Marker({
      map,
      position: new google.maps.LatLng(latLng2),
      icon: getRestingLocationIcon()
    });
    markers.push(marker);
    return marker;
  }
  function setNearBeacon(latLng2 = null) {
    if (latLng2 === null) return;
    const position = new google.maps.LatLng(latLng2);
    nearMarker ? nearMarker.setPosition(position) : nearMarker = createNearMarker(position);
    console.log(position);
    map.panTo(position);
  }
  function setFocusedMarker(marker = null) {
    if (marker === null) return;
    const restingIcon = getRestingLocationIcon();
    const focusedIcon = getFocusedLocationIcon();
    const lat = marker.getPosition().lat();
    const lng = marker.getPosition().lng();
    const position = new google.maps.LatLng({ lat, lng });
    markers.forEach((m) => m.setIcon(restingIcon));
    marker.setIcon(focusedIcon);
    map.panTo(position);
  }
  function getFocusedLocationIcon(size = 50) {
    const color = getThemeColor();
    return {
      anchor: new google.maps.Point(size / 2, size),
      url: `data:image/svg+xml;utf-8,      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">        <path fill="hsl(${color.h},${color.s}%,${color.l}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>        <path fill="hsl(${color.h},${color.s}%,${color.l - 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>      </svg>`
    };
  }
  function getRestingLocationIcon(size = 40) {
    const color = getThemeColor();
    return {
      anchor: new google.maps.Point(size / 2, size),
      url: `data:image/svg+xml;utf-8,      <svg width="${size}" height="${size}" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">        <path fill="hsl(${color.h},${color.s}%,${color.l + 20}%)" d="M15.4936516,0 C9.21222402,0 5.94476278,5 6.00070647,10 C6.07764653,17.2779762 13.1207067,20 15.4936516,30 C17.8690441,20 25,17.1196429 25,10 C25,5 21.3136604,0 15.4971481,0"></path>        <path fill="hsl(${color.h},${color.s}%,${color.l + 10}%)" d="M15.5,6.4 C17.4326394,6.4 19,7.96699298 19,9.9 C19,11.8326394 17.433007,13.4 15.5,13.4 C13.5673606,13.4 12,11.833007 12,9.9 C12,7.96736062 13.566993,6.4 15.5,6.4"></path>      </svg>`
    };
  }
  function createNearMarker(position) {
    return new google.maps.Marker({
      map,
      position,
      icon: {
        anchor: new google.maps.Point(15, 15),
        url: `data:image/svg+xml;utf-8,       <svg width="30" height="30" viewBox="0 0 30 30" xmlns="http://www.w3.org/2000/svg">         <path fill="hsla(217, 89%, 61%, 30%)" d="M15,0 C23.2827403,0 30,6.7156842 30,15 C30,23.2827403 23.2843157,30 15,30 C6.71725971,30 0,23.2843157 0,15 C0,6.7172598 6.71568429,0 15,0"></path>        <path fill="hsl(0,0%,100%)" d="M15,7 C19.4174615,7 23,10.5816982 23,15 C23,19.4174615 19.4183017,23 15,23 C10.5825385,23 7,19.4183017 7,15 C7,10.5825386 10.5816983,7 15,7"></path>        <path fill="hsl(217, 89%, 61%)" d="M15,9 C18.3130961,9 21,11.6862737 21,15 C21,18.3130961 18.3137263,21 15,21 C11.6869039,21 9,18.3137263 9,15 C9,11.6869039 11.6862737,9 15,9"></path>      </svg>`
      }
    });
  }
  function getThemeColor() {
    const container2 = document.querySelector("[data-location-map]");
    return getHSLFromCSSColor(container2) || { h: 212, s: 100, l: 50 };
  }

  // src/scripts/theme/geolocation.js
  function getClientGeolocation(callback) {
    const geolocation = getGeolocationFromSession();
    if (geolocation) return callback(geolocation);
    if (!navigator || !navigator.geolocation) return callback();
    if (window.StoreConnectTestMode === "enabled") return callback();
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const latLng2 = getLatLngFromPosition(position);
        setGeolocationToSession(latLng2);
        callback(latLng2);
      },
      () => {
        console.log("Geolocation failed");
        callback();
      }
    );
  }
  function getGeolocationFromSession() {
    return JSON.parse(window.sessionStorage.getItem("geolocation"));
  }
  function setGeolocationToSession(geoloc) {
    if (geoloc === null) return;
    window.sessionStorage.setItem("geolocation", JSON.stringify(geoloc));
  }
  function getLatLngFromPosition(position) {
    return { lat: position.coords.latitude, lng: position.coords.longitude };
  }

  // src/scripts/theme/loader.js
  function startLoader(container2, contextual = false) {
    const loader = getLoader(container2);
    if (loader) {
      activate(loader, contextual);
    } else {
      createLoader(container2, contextual);
    }
  }
  function stopLoader(container2) {
    const loader = getLoader(container2);
    if (loader === null) return;
    loader.classList.remove("is-active");
  }
  function getLoader(target) {
    const origin = target || document.querySelector("body");
    return origin.querySelector("[data-loader]");
  }
  function activate(loader, contextual = false) {
    if (loader.classList.contains("Loader")) {
      loader.classList.add("is-active");
    } else if (contextual) {
      loader.classList.add("Loader", "is-active", "is-contextual");
    } else {
      loader.classList.add("Loader", "is-active");
    }
  }
  function createLoader(target, contextual = false) {
    const loader = document.createElement("div");
    const spinner = createSpinner();
    const destination = target || document.querySelector("body");
    loader.setAttribute("data-loader", "");
    loader.classList.add("Loader", "is-active");
    if (contextual) loader.classList.add("is-contextual");
    destination.prepend(loader);
    loader.append(spinner);
  }
  function createSpinner() {
    const url = "http://www.w3.org/2000/svg";
    const svg = document.createElementNS(url, "svg");
    const circle = document.createElementNS(url, "circle");
    svg.setAttribute("viewBox", "0 0 50 50");
    svg.classList.add("spinner");
    circle.setAttribute("cx", "25");
    circle.setAttribute("cy", "25");
    circle.setAttribute("r", "20");
    circle.setAttribute("fill", "none");
    circle.setAttribute("stroke-width", "5");
    circle.classList.add("path");
    svg.appendChild(circle);
    return svg;
  }

  // src/scripts/theme/utils/window.js
  function setContainerToWindowHeight(container2) {
    const header = document.getElementById("SC-Header");
    const offset = header.offsetHeight;
    container2.style.height = `calc(100vh - ${offset}px)`;
  }

  // src/scripts/packs/location.js
  var container = document.querySelector("[data-location-record]");
  var latLng = getLatLngFromMap();
  setContainerToWindowHeight(container);
  startLoader(container);
  getClientGeolocation((geolocation) => {
    createMap(latLng, () => {
      const marker = createLocationMarker(latLng);
      stopLoader(container);
      setNearBeacon(geolocation);
      setFocusedMarker(marker);
    });
  });
  function getLatLngFromMap() {
    const map2 = document.querySelector("[data-location-map]");
    const lat = map2.dataset.lat;
    const lng = map2.dataset.lng;
    return lat && lng ? {
      lat: parseFloat(lat),
      lng: parseFloat(lng)
    } : null;
  }
})();
//# sourceMappingURL=location.HHUMXIWC.js.map
