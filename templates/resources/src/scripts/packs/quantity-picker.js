import { onDomChange } from '../theme/utils/init';

const RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
const MIN_DEFAULT = 1;
const MANUAL_OPTION = 'manual_option';

let activePicker = null;

onDomChange(init);

function init(node) {
  initQtyPickers([...node.querySelectorAll('[data-qty-picker]')]);
}

/**
 * Initialises all quantity pickers on the page either on load or
 * when called externally within our core javascript (typically in
 * cases where HTML is returned from the backend and injected into
 * DOM without a page refresh)
 */
function initQtyPickers(pickers = []) {
  pickers.forEach((picker) => {
    resetQtyPicker(picker);
    initQtyPicker(picker);
    observeQtyPicker(picker);
  });
}

/**
 * Initalises a quanity picker by create options based on the range
 * and min/max thresholds (optionally set on the input field).
 * Handles click events to show the quantity picker menu and update
 * the quantity based on selected option.
 */
function initQtyPicker(picker) {
  const initBtn = getQtyPickerTrigger(picker);
  const inputElem = getQtyPickerInput(picker);
  const labelElem = getQtyPickerLabel(picker);
  const updateBtn = getQtyPickerUpdateButton(picker);
  const customQtyLabels = getQtyPickerLabels(picker);
  const { min, max, range } = getQtyPickerRange(picker);

  // Shows the quantity picker menu
  initBtn.addEventListener('click', () => {
    if (activePicker) hideQtyPickerOptions(activePicker);
    showQtyPickerOptions(picker);
    listenForOutsideClick(picker);
  });

  const options = [
    // Options (quantities) based on the range and input min/max thresholds
    ...createRangeOptions(picker, min, max, range, customQtyLabels),
    // An option for manual quantity input when the desired
    // quantity is greater than the visible menu of options.
    createManualEntryOption(min, max, range),
  ]

  options.forEach(optionListItem => {
    if (optionListItem === null || optionListItem == undefined) return;

    const optionBtn = optionListItem.querySelector('button');
    const menuElem = getQtyPickerMenu(picker);

    // Click quantity option
    optionBtn.addEventListener('click', (event) => {
      hideQtyPickerOptions(picker);
      if (optionBtn.value === MANUAL_OPTION) {
        setDisplayHidden(initBtn);
        setDisplayVisible(updateBtn);
        setDisplayVisible(inputElem);
        inputElem.focus();
        inputElem.select();
      } else {
        labelElem.innerText = optionBtn.innerText;
        inputElem.value = optionBtn.value;
        inputElem.dispatchEvent(new Event('change'));
        if (shouldSubmitOnChange(inputElem.form)) {
          event.target.form.dispatchEvent(new CustomEvent("submit", { bubbles: true, cancelable: true }))
        }
      }
    });

    menuElem.append(optionListItem);
  })
}

/* Create quantity picker options */

function createRangeOptions(picker, min, max, range = [], customQtyLabels = {}) {
  return range.map((quantity) => {
    const customLabel = customQtyLabels[quantity];
    const removeText = picker.getAttribute("data-i18n-remove") || 'Remove';
    const maxText = picker.getAttribute("data-i18n-max") || 'Max';
    const minText = picker.getAttribute("data-i18n-min") || 'Min';

    return createOption({
      value: quantity,
      label: customLabel || quantity,
      hint: (() => {
        switch (quantity) {
          case 0:
            return `(${removeText})`;
          case max:
            return `(${maxText})`;
          case min:
            return `(${minText})`;
          default:
            return null;
        }
      })()
    });
  })
}

function createManualEntryOption(min, max = Infinity, range = []) {
  if (max > range.length) return createOption({
    value: MANUAL_OPTION,
    label: (min === 0 ? range.length : range.length + 1) + '+',
  })
}

function createOption({ value, label = null, hint = null }) {
  const listItemElem = document.createElement('li');
  const optionButton = document.createElement('button');

  optionButton.type = 'button';
  optionButton.value = value;
  optionButton.innerText = label || value;

  optionButton.style.display = 'flex';
  optionButton.style.alignItems = 'center';
  optionButton.style.gap = 'var(--sc-spacing-tiny)';
  optionButton.classList.add('sc-focus:outline','sc-focus:bg-lightest');

  listItemElem.append(optionButton);
  if (hint === null) return listItemElem;

  const optionHintElem = document.createElement('span');

  optionHintElem.classList.add('sc-font-tiny', 'sc-shade-neutral');
  optionHintElem.innerText = hint;
  optionHintElem.style.pointerEvents = 'none';
  optionButton.append(optionHintElem);
  return listItemElem;
}

/* Quantity picker range */

function getQtyPickerRange(picker) {
  const input = getQtyPickerInput(picker);
  const min = getMin(input);
  const max = getMax(input);
  const range = createRange(min, max);

  return { range, min, max };
}

function getMin(input) {
  if (input.getAttribute('min') === null) return MIN_DEFAULT;
  return parseInt(input.min);
}

function getMax(input) {
  if (input.getAttribute('max') === null) return Infinity;
  return parseInt(input.max);
}

function createRange(min = MIN_DEFAULT, max = Infinity) {
  if (max > RANGE.length && max < Infinity)
    return [...Array(max)].map((_, index) => min === 0 ? index : index + 1);
  else {
    if (min === 0) return [0, ...RANGE.slice(min, max)];
    else return RANGE.slice(min - 1, max);
  }
}

/**
 * By default we initalise the quantity picker on every page
 * load. When a product represents a booking with timeslots
 * we need to reset the quantity picker options based on the
 * availability of any chosen timeslot. See the timeslot
 * event listener in app/assets/javascripts/theme/booking.js
 */

function resetQtyPicker(picker) {
  const initBtn = getQtyPickerTrigger(picker);
  const menuElem = getQtyPickerMenu(picker);
  const inputElem = getQtyPickerInput(picker);
  const labelElem = getQtyPickerLabel(picker);
  const { min, max } = getQtyPickerRange(picker);

  setDisplayHidden(inputElem);
  setDisplayVisible(initBtn);
  menuElem.innerHTML = '';
  if (parseInt(inputElem.value) > max || parseInt(inputElem.value) < min) {
    labelElem.innerText = min
  }
}

/* Handle outside click */

function listenForOutsideClick(picker) {
  document.addEventListener('click', handleOutsideClick);
  picker.addEventListener('clickOutside', () => {
    hideQtyPickerOptions(picker);
    document.removeEventListener('click', handleOutsideClick);
  });
}

function handleOutsideClick(event) {
  const clickedPicker = event.target.closest('[data-qty-picker]');

  if (clickedPicker) {
    if (isMenuVisible(clickedPicker)) {
      return hideQtyPickerOptions(clickedPicker)
    } else {
      return showQtyPickerOptions(clickedPicker);
    }
  } else if (activePicker) {
    activePicker.dispatchEvent(new Event('clickOutside'));
  }
}

/* Show/hide quantity picker options */

function showQtyPickerOptions(picker) {
  const menuElem = getQtyPickerMenu(picker);
  const inputElem = getQtyPickerInput(picker);
  const currentValue = parseInt(inputElem.value);

  activePicker = picker;
  menuElem.style.display = 'block';
  menuElem.setAttribute('aria-hidden', false);
  const selectedItem = menuElem.querySelector(`button[value="${currentValue}"]`);
  if (selectedItem) {
    selectedItem.focus();
  }
}

function hideQtyPickerOptions(picker) {
  const menuElem = getQtyPickerMenu(picker);

  activePicker = null;
  menuElem.style.display = 'none';
  menuElem.setAttribute('aria-hidden', true);
}

/* Observe min and max attribute changes */
function observeQtyPicker(picker) {
  const input = getQtyPickerInput(picker);
  const observer = new MutationObserver(() => {
    resetQtyPicker(picker);
    initQtyPicker(picker);
  });

  observer.observe(input, { attributes: true, attributeFilter: ['min', 'max'] });
}

/* Helpers */

function shouldSubmitOnChange(form) {
  return form.getAttribute('data-submit-on-change') === 'true';
}

function getQtyPickerLabels(picker) {
  const input = getQtyPickerInput(picker);
  const labels = input.dataset.labels;

  return labels ? JSON.parse(labels) : {};
}

function setDisplayVisible(elem = null) {
  if (elem === null) return;
  return elem.style.display = 'block';
}

function setDisplayHidden(elem = null) {
  if (elem === null) return;
  return elem.style.display = 'none';
}

function isMenuVisible(picker) {
  return picker.querySelector('ul').getAttribute('aria-hidden') === 'true';
}

// DOM selectors

function getQtyPickerMenu(picker) {
  return picker.querySelector('ul');
}

function getQtyPickerInput(picker) {
  return picker.querySelector('input[type="number"]');
}

function getQtyPickerLabel(picker) {
  return picker.querySelector('[data-qty-picker-value]');
}

function getQtyPickerUpdateButton(picker) {
  return picker.querySelector('[data-qty-picker-update]');
}

function getQtyPickerTrigger(picker) {
  return picker.querySelector('[data-qty-picker-trigger]');
}
