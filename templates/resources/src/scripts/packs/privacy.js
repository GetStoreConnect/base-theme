import { onDomChange } from '../theme/utils/init';

window.StoreConnect = window.StoreConnect || {};

window.StoreConnect.PrivacySettings = {
  close: closePrivacySettings,
  open: showPrivacySettings
}

onDomChange(init);

function init(node) {
  const form = node.querySelector('[data-privacy-settings-form]');

  if (form) {
    const banner = node.querySelector('[data-privacy-settings-banner]');
    const customTrigger = node.querySelector('.sc-show-privacy-settings')

    if (banner) {
      if (customTrigger) {
        customTrigger.classList.add('sc-hide');
      }
      banner.querySelector('[data-privacy-settings-form-open]').addEventListener('click', showPrivacySettings);
    } else {
      if (customTrigger) {
        customTrigger.addEventListener('click', (e) => { e.preventDefault(); showPrivacySettings(); });
      }
    }
    [...form.querySelectorAll('[data-privacy-group-optional]')].forEach(group => {
      group.querySelector('input[type=checkbox]').addEventListener('change', enableOrDisableAllCookies);
    });
    [...form.querySelectorAll('[data-cookie-optional]')].map(cookie => {
      cookie.querySelector('input[type=checkbox]').addEventListener('change', enableOrDisableCookie);
    });

    form.querySelector('[data-privacy-settings-form-close]').addEventListener('click', closePrivacySettings);
  }
}

function showPrivacySettings() {
  document.querySelector('[data-privacy-settings-form]').classList.add('is-active');
}

function closePrivacySettings() {
  document.querySelector('[data-privacy-settings-form]').classList.remove('is-active');
}

function enableOrDisableAllCookies(event) {
  const groupId = event.target.id;
  const group = document.querySelector('[data-privacy-group="' + groupId + '"]');
  const cookies = group.querySelectorAll('[data-cookie-optional]');
  const cookieLabels = group.querySelectorAll('[data-cookie-label]');
  const label = group.querySelector('label[for="' + groupId + '"]');

  if (event.target.checked === true) {
    event.target.checked = true;
    label.innerText = label.dataset.disableLabel;
    [...cookieLabels].map(label => label.innerText = label.dataset.enabledLabel);
  } else {
    event.target.checked = false;
    label.innerText = label.dataset.enableLabel;
    [...cookieLabels].map(label => label.innerText = label.dataset.disabledLabel);
  }

  [...cookies].map(cookie => {
    const input = cookie.querySelector('input[type=checkbox]');
    input.checked = event.target.checked ? true : false;
  });
}

function enableOrDisableCookie(event) {
  const groupId = event.target.dataset.group;
  const group = document.querySelector('[data-privacy-group="' + groupId + '"]');
  const cookie = event.target.closest('[data-cookie]');
  const parentInput = group.querySelector('[data-privacy-group-optional] input[type=checkbox]');
  const parentLabel = group.querySelector('label[for="' + groupId + '"]');
  const label = cookie.querySelector('[data-cookie-label]');

  label.innerText = event.target.checked ? label.dataset.enabledLabel : label.dataset.disabledLabel;
  parentInput.checked = false;
  parentLabel.innerText = parentLabel.dataset.enableLabel;
}
