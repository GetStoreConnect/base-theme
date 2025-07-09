(() => {
  // src/scripts/theme/utils/init.js
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.ObserverCallbacks = window.StoreConnect.ObserverCallbacks || [];
  document.addEventListener("DOMContentLoaded", establishObserver);
  function onDomChange(initCallback) {
    window.StoreConnect.ObserverCallbacks.push(initCallback);
  }
  function establishObserver() {
    if (window.StoreConnect.Observer) return;
    window.StoreConnect.Observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            runCallbacks(node, "mutation");
          }
        });
      });
    });
    window.StoreConnect.Observer.observe(document.body, { childList: true, subtree: true });
    runCallbacks(document, "initial load");
  }
  function runCallbacks(node, _context) {
    window.StoreConnect.ObserverCallbacks.forEach((callback) => callback(node));
  }

  // src/scripts/packs/quantity-picker.js
  var RANGE = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  var MIN_DEFAULT = 1;
  var MANUAL_OPTION = "manual_option";
  var activePicker = null;
  onDomChange(init);
  function init(node) {
    initQtyPickers([...node.querySelectorAll("[data-qty-picker]")]);
  }
  function initQtyPickers(pickers = []) {
    pickers.forEach((picker) => {
      resetQtyPicker(picker);
      initQtyPicker(picker);
      observeQtyPicker(picker);
    });
  }
  function initQtyPicker(picker) {
    const initBtn = getQtyPickerTrigger(picker);
    const inputElem = getQtyPickerInput(picker);
    const labelElem = getQtyPickerLabel(picker);
    const updateBtn = getQtyPickerUpdateButton(picker);
    const customQtyLabels = getQtyPickerLabels(picker);
    const { min, max, range } = getQtyPickerRange(picker);
    initBtn.addEventListener("click", () => {
      if (activePicker) hideQtyPickerOptions(activePicker);
      showQtyPickerOptions(picker);
      listenForOutsideClick(picker);
    });
    const options = [
      // Options (quantities) based on the range and input min/max thresholds
      ...createRangeOptions(picker, min, max, range, customQtyLabels),
      // An option for manual quantity input when the desired
      // quantity is greater than the visible menu of options.
      createManualEntryOption(min, max, range)
    ];
    options.forEach((optionListItem) => {
      if (optionListItem === null || optionListItem == void 0) return;
      const optionBtn = optionListItem.querySelector("button");
      const menuElem = getQtyPickerMenu(picker);
      optionBtn.addEventListener("click", (event) => {
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
          inputElem.dispatchEvent(new Event("change"));
          if (shouldSubmitOnChange(inputElem.form)) {
            event.target.form.dispatchEvent(
              new CustomEvent("submit", { bubbles: true, cancelable: true })
            );
          }
        }
      });
      menuElem.append(optionListItem);
    });
  }
  function createRangeOptions(picker, min, max, range = [], customQtyLabels = {}) {
    return range.map((quantity) => {
      const customLabel = customQtyLabels[quantity];
      const removeText = picker.getAttribute("data-i18n-remove") || "Remove";
      const maxText = picker.getAttribute("data-i18n-max") || "Max";
      const minText = picker.getAttribute("data-i18n-min") || "Min";
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
    });
  }
  function createManualEntryOption(min, max = Infinity, range = []) {
    if (max > range.length)
      return createOption({
        value: MANUAL_OPTION,
        label: (min === 0 ? range.length : range.length + 1) + "+"
      });
  }
  function createOption({ value, label = null, hint = null }) {
    const listItemElem = document.createElement("li");
    const optionButton = document.createElement("button");
    optionButton.type = "button";
    optionButton.value = value;
    optionButton.innerText = label || value;
    optionButton.style.display = "flex";
    optionButton.style.alignItems = "center";
    optionButton.style.gap = "var(--sc-spacing-tiny)";
    optionButton.classList.add("sc-focus:outline", "sc-focus:bg-lightest");
    listItemElem.append(optionButton);
    if (hint === null) return listItemElem;
    const optionHintElem = document.createElement("span");
    optionHintElem.classList.add("sc-font-tiny", "sc-shade-neutral");
    optionHintElem.innerText = hint;
    optionHintElem.style.pointerEvents = "none";
    optionButton.append(optionHintElem);
    return listItemElem;
  }
  function getQtyPickerRange(picker) {
    const input = getQtyPickerInput(picker);
    const min = getMin(input);
    const max = getMax(input);
    const range = createRange(min, max);
    return { range, min, max };
  }
  function getMin(input) {
    if (input.getAttribute("min") === null) return MIN_DEFAULT;
    return parseInt(input.min);
  }
  function getMax(input) {
    if (input.getAttribute("max") === null) return Infinity;
    return parseInt(input.max);
  }
  function createRange(min = MIN_DEFAULT, max = Infinity) {
    const offset = typeof min === "number" && !isNaN(min) ? min : MIN_DEFAULT;
    const length = Math.min(1 + max - offset, RANGE.length + (offset === 0 ? 1 : 0));
    return Array.from({ length }, (_, index) => index + offset);
  }
  function resetQtyPicker(picker) {
    const initBtn = getQtyPickerTrigger(picker);
    const menuElem = getQtyPickerMenu(picker);
    const inputElem = getQtyPickerInput(picker);
    const labelElem = getQtyPickerLabel(picker);
    const { min, max } = getQtyPickerRange(picker);
    setDisplayHidden(inputElem);
    setDisplayVisible(initBtn);
    menuElem.innerHTML = "";
    if (parseInt(inputElem.value) > max || parseInt(inputElem.value) < min) {
      labelElem.innerText = min;
    }
  }
  function listenForOutsideClick(picker) {
    document.addEventListener("click", handleOutsideClick);
    picker.addEventListener("clickOutside", () => {
      hideQtyPickerOptions(picker);
      document.removeEventListener("click", handleOutsideClick);
    });
  }
  function handleOutsideClick(event) {
    const clickedPicker = event.target.closest("[data-qty-picker]");
    if (clickedPicker) {
      if (isMenuVisible(clickedPicker)) {
        return hideQtyPickerOptions(clickedPicker);
      } else {
        return showQtyPickerOptions(clickedPicker);
      }
    } else if (activePicker) {
      activePicker.dispatchEvent(new Event("clickOutside"));
    }
  }
  function showQtyPickerOptions(picker) {
    const menuElem = getQtyPickerMenu(picker);
    const inputElem = getQtyPickerInput(picker);
    const currentValue = parseInt(inputElem.value);
    activePicker = picker;
    menuElem.style.display = "block";
    menuElem.setAttribute("aria-hidden", false);
    const selectedItem = menuElem.querySelector(`button[value="${currentValue}"]`);
    if (selectedItem) {
      selectedItem.focus();
    }
    disableGreedyButtons();
  }
  function hideQtyPickerOptions(picker) {
    const menuElem = getQtyPickerMenu(picker);
    activePicker = null;
    menuElem.style.display = "none";
    menuElem.setAttribute("aria-hidden", true);
    enableGreedyButtons();
  }
  function observeQtyPicker(picker) {
    const input = getQtyPickerInput(picker);
    const observer = new MutationObserver(() => {
      resetQtyPicker(picker);
      initQtyPicker(picker);
    });
    observer.observe(input, { attributes: true, attributeFilter: ["min", "max"] });
  }
  function shouldSubmitOnChange(form) {
    return form.getAttribute("data-submit-on-change") === "true";
  }
  function getQtyPickerLabels(picker) {
    const input = getQtyPickerInput(picker);
    const labels = input.dataset.labels;
    return labels ? JSON.parse(labels) : {};
  }
  function setDisplayVisible(elem = null) {
    if (elem === null) return;
    return elem.style.display = "block";
  }
  function setDisplayHidden(elem = null) {
    if (elem === null) return;
    return elem.style.display = "none";
  }
  function isMenuVisible(picker) {
    return picker.querySelector("ul").getAttribute("aria-hidden") === "true";
  }
  function getQtyPickerMenu(picker) {
    return picker.querySelector("ul");
  }
  function getQtyPickerInput(picker) {
    return picker.querySelector('input[type="number"]');
  }
  function getQtyPickerLabel(picker) {
    return picker.querySelector("[data-qty-picker-value]");
  }
  function getQtyPickerUpdateButton(picker) {
    return picker.querySelector("[data-qty-picker-update]");
  }
  function getQtyPickerTrigger(picker) {
    return picker.querySelector("[data-qty-picker-trigger]");
  }
  function disableGreedyButtons() {
    document.querySelectorAll("button.gpay-card-info-container").forEach((button) => {
      button.style.pointerEvents = "none";
    });
  }
  function enableGreedyButtons() {
    document.querySelectorAll("button.gpay-card-info-container").forEach((button) => {
      button.style.pointerEvents = "auto";
    });
  }
})();
//# sourceMappingURL=quantity-picker.GR6UJBZX.js.map
