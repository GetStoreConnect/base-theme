import Litepicker from 'litepicker';
import {formatDate} from '../theme/utils/date';
import Loader from '../theme/loader';
import { onDomChange } from '../theme/utils/init';

onDomChange(init);

function init(node) {
  [...node.querySelectorAll('[data-booking]')].forEach(node => BookingSelector(node));
}

const BookingSelector = (function (node) {
  const productId = node.dataset.id;
  const dates = node.querySelector('[data-booking-dates]');
  const trigger = dates.closest(".SC-DropdownPicker");
  const picker = createPicker();
  let autoJump = false;
  let highlightTimeoutId;
  let lastMonthSelected;

  start();

  function start() {
    const locations = [...node.querySelectorAll('[data-bookable-location]')];
    let srtDate = getStartDate();
    let endDate = getEndDate();

    if (!srtDate && !endDate) {
      autoJump = true;
    }

    if (!srtDate || !endDate) {
      srtDate = srtDate || (endDate ? formatDate(Date.parse(endDate) - 7 * 24 * 60 * 60 * 1000) : formatDate(Date.now()));
      endDate = endDate || formatDate(Date.parse(srtDate) + 7 * 24 * 60 * 60 * 1000);
    }

    if (srtDate > endDate) {
      const start = Date.parse(srtDate)
      endDate = formatDate(start + 7 * 24 * 60 * 60 * 1000);
    }
    storeDates(srtDate, endDate);

    const storedLocationId = retrieveVariable('booking-location-id');

    if (storedLocationId) {
      const storedLocation = node.querySelector('[data-bookable-location][value="' + storedLocationId + '"]');

      if (storedLocation)
        node.querySelector('[data-bookable-locations] span').innerText = storedLocation.dataset.name;
    }

    picker.on('show', () => {
      trigger.classList.add('is-active');
    });
    picker.on('hide', () => {
      trigger.classList.remove('is-active');
    });
    picker.on('selected', (first, second) => {
      handleDatesSelection(first, second);
    });
    picker.on('render', ui => {
      disablePastDates(ui);
      setCalendarWidth(ui);
    });
    picker.on('change:month', (date, calendarIdx) => {
      handleMonthChange(date, calendarIdx);
    });
    locations.map(option => {
      option.addEventListener('change', handleLocationSelection);
    });

    picker.setDateRange(srtDate, endDate, true);
    setHighlightDays();
  }

  function handleLocationSelection(event) {
    const locations = node.querySelector('[data-bookable-locations]');
    const srtDate = dates.getAttribute('data-start');
    const endDate = dates.getAttribute('data-end');
    const locationId = event.target.hasAttribute('value') ? event.target.value : null;

    storeVariables({ "booking-location-id": locationId })
    locations.querySelector('span').innerText = event.target.dataset.name;
    filterAvailabilities(srtDate, endDate, locationId);
    setHighlightDays();
  }

  function handleDatesSelection(first, second) {
    const srtDate = formatDate(first.dateInstance);
    const endDate = formatDate(second.dateInstance);

    storeDates(srtDate, endDate)
    dates.setAttribute('data-start', srtDate);
    dates.setAttribute('data-end', endDate);
    dates.querySelector('span').innerText = returnRangeAsString(srtDate, endDate);
    filterAvailabilities(srtDate, endDate, getLocationId());
  }

  function handleTimeslotSelection() {
    const form = node.closest('form');
    const locationInput = form.elements['product_bookable_location_id'];
    const startDateInput = form.elements['booking_start'];
    const endDateInput = form.elements['booking_end'];

    // Sets selected values to hidden inputs
    [...node.querySelectorAll('[data-booking-timeslot]')].map((timeslot) => {
      timeslot.addEventListener('change', (event) => {
        const buyNow = form.querySelector('[data-buy-now]');
        const addToCart = form.querySelector('[data-add-to-cart]');
        const qtyPickers = form.querySelectorAll('[data-qty-picker]');

        if (addToCart) addToCart.removeAttribute('disabled');
        if (buyNow) buyNow.removeAttribute('disabled');
        locationInput.value = event.target.dataset.location;
        startDateInput.value = event.target.dataset.start;
        endDateInput.value = event.target.dataset.end;

        qtyPickers.forEach(picker => {
          const input = picker.querySelector('input[name="quantity"]');

          if (event.target.dataset.available == "Infinity") {
            input.removeAttribute('max');
          } else {
            input.setAttribute('max', event.target.dataset.available);
          }
        });
      });
    });
  }

  function handleMonthChange(dateInstance, _calendarIdx) {
    clearTimeout(highlightTimeoutId);

    const date = dateInstance.toJSDate();
    const direction = lastMonthSelected > date ? "bwd" : "fwd";

    lastMonthSelected = date;

    highlightTimeoutId = setTimeout(function () {
      highlightDays(date, direction);
    }, 400);
  }

  function setHighlightDays() {
    const pckrDate = picker.getStartDate().toJSDate();
    const monthStartDate = new Date(pckrDate.getFullYear(), pckrDate.getMonth(), 1);

    highlightDays(monthStartDate, "both");
  }

  function highlightDays(date, direction, preload = false) {
    const startDate = formatDate(date);
    const endDate = formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    const slots = node.querySelector('[data-booking-timeslots]');
    const availabilitiesUrl = slots.dataset.bookingAvailabilitiesUrl;
    const locationId = getLocationId();
    const highlights = true
    const endpoint = returnEndPoint({ availabilitiesUrl, productId, startDate, endDate, locationId, highlights: highlights });

    fetchAvailabilities(endpoint, "application/json")
      .then((days) => {
        if (!preload) {
          picker.setHighlightedDays(JSON.parse(days));

          if (direction == "fwd" || direction == "both") {
            const nextDate = new Date(date.getFullYear(), date.getMonth() + 1, 1);
            highlightDays(nextDate, null, true);
          }

          if (direction == "bwd" || direction == "both") {
            const prevDate = new Date(date.getFullYear(), date.getMonth() - 1, 1);
            highlightDays(prevDate, null, true);
          }
        }
      })
      .catch((_) => {
        // no-op
      });
  }

  function filterAvailabilities(startDate, endDate, locationId) {
    const locations = node.querySelector('[data-bookable-locations]');
    const addToCart = node.closest('form').querySelector('[data-add-to-cart]');
    const buyNow = node.closest('form').querySelector('[data-buy-now]');
    const slots = node.querySelector('[data-booking-timeslots]');
    const availabilitiesUrl = slots.dataset.bookingAvailabilitiesUrl;
    const availabilitiesPartial = slots.dataset.bookingAvailabilitiesPartial;
    const fetchError = slots.dataset.bookingFetchError;
    const endpoint = returnEndPoint({ availabilitiesUrl, productId, startDate, endDate, locationId, partial: availabilitiesPartial });
    const loader = Loader({ target: slots, contextual: true });

    loader.on();
    locations.setAttribute('disabled', true);
    if (addToCart) addToCart.setAttribute('disabled', true);
    if (buyNow) buyNow.setAttribute('disabled', true);
    slots.scrollTop = 0;

    fetchAvailabilities(endpoint)
      .then((text) => {
        loader.off();
        locations.removeAttribute('disabled');
        slots.innerHTML = text;
        handleTimeslotSelection();
        handleClosestLinks();
      })
      .catch((_) => {
        loader.off();
        locations.removeAttribute('disabled');

        slots.innerHTML = `<div class="SC-Notice SC-Notice-alert sc-mt">${fetchError}</div>`;
        handleTimeslotSelection();
      });
  }

  async function fetchAvailabilities(endpoint, format="text/html") {
    const response = await fetch(endpoint, {
      headers: {
        "Accept": format,
      }
    });
    if (response.ok) {
      const availabilities = await response.text();
      return availabilities;
    } else {
      throw new Error(response.statusText);
    }
  }

  function returnEndPoint({ availabilitiesUrl, startDate, endDate, locationId, partial = null, highlights = false }) {
    if (!availabilitiesUrl)
      availabilitiesUrl = '/availabilities';

    let url = `${availabilitiesUrl}?product_id=${productId}&start_date=${startDate}&end_date=${endDate}`;

    if (locationId && locationId != "on")
      url = `${url}&product_bookable_location_id=${locationId}`

    if (partial)
      url = `${url}&partial=${partial}`

    if (highlights)
      url = `${url}&highlight=true`

    return url;
  }

  function returnRangeAsString(startDate, endDate) {
    const dateFormat = { day: 'numeric', month: 'short' };
    const dateTime = new Intl.DateTimeFormat('en-US', dateFormat);

    return (
      dateTime.format(new Date(startDate)) + ' - ' +
      dateTime.format(new Date(endDate))
    );
  }

  function disablePastDates(ui) {
    const today = ui.querySelector('.is-today');
    const days = [...ui.querySelectorAll('.day-item')];

    if (today === null) return;
    for (let i = 0; i < days.length; i++) {
      if (days[i] === today) break;
      days[i].classList.add('is-disabled');
    }
  }

  function getStartDate() {
    return retrieveVariable('booking-date-start')
  }

  function getEndDate() {
    return retrieveVariable('booking-date-end')
  }

  function getLocationId() {
    const locations = node.querySelector('[data-bookable-location]:checked');
    return locations ? locations.value : null;
  }

  function createPicker() {
    const icon = '<svg viewBox="0 0 100 100"><path d="M56.7,75.75 L95.4,37.05 C98.8,33.65 98.8,28.05 95.4,24.65 C92,21.25 86.4,21.25 83,24.65 L50.5,57.05 L18,24.55 C14.6,21.15 9,21.15 5.6,24.55 C3.9,26.25 3,28.55 3,30.75 C3,33.05 3.9,35.25 5.6,36.95 L44.3,75.75 C47.7,79.15 53.3,79.15 56.7,75.75 Z"></path></svg>';

    return new Litepicker({
      element: dates,
      singleMode: false,
      buttonText: { previousMonth: icon, nextMonth: icon },
      showTooltip: false,
      highlightedDaysFormat: "YYYY-MM-DD"
    });
  }

  function setCalendarWidth(ui) {
    ui.style.width = node.clientWidth + 'px';
  }

  function storeDates(srtDate, endDate) {
    storeVariables({ "booking-date-start": srtDate, "booking-date-end": endDate })
  }

  function storeVariables(hash) {
    const params = new URLSearchParams(window.location.search)

    for (const [key, value] of Object.entries(hash)) {
      params.delete(key)
      if (value !== null)
        params.append(key, value)
    }

    const url = new URL(window.location.href);
    url.search = params
    window.history.pushState({}, null, url);
  }

  function retrieveVariable(key) {
    const params = new URLSearchParams(window.location.search)
    return params.get(key);
  }

  function handleClosestLinks() {
    const jumpLinks = [...node.querySelectorAll('[data-booking-jump]')]
    jumpLinks.forEach(trigger => trigger.addEventListener('click', event => {
        const direction = event.target.getAttribute('data-booking-jump-direction')
        let start, end;

        if (direction == "back") {
          end = Date.parse(event.target.getAttribute('data-booking-jump'))
          start = end - 7 * 24 * 60 * 60 * 1000;
        } else {
          start = Date.parse(event.target.getAttribute('data-booking-jump'))
          end = start + 7 * 24 * 60 * 60 * 1000;
        }

        picker.setDateRange(start, end, true);
        setHighlightDays();
      })
    );

    if (autoJump) {
      autoJump = false;

      if (jumpLinks[0]) {
        jumpLinks[0].click();
      }
    }
  }
});
