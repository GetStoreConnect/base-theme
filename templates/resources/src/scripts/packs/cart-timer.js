import { onDomChange } from '../theme/utils/init';

onDomChange(init);

const WARNING_TIMESPAN = 1000 * 60; // 1 min

let expiry;

function init(node) {
  [...node.querySelectorAll('[data-sc-cart-timer]')].forEach(timer => {
    expiry = timer.getAttribute('data-sc-expiry');

    const timeRemaining = getTimespan(expiry);
    if (timeRemaining <= 0) return expire();
    setInterval(() => timer.dispatchEvent(new Event('countdown')), 1000);
    timer.addEventListener('countdown', countdown);
  });
}

function countdown() {
  const timeRemaining = getTimespan(expiry);

  if (timeRemaining <= 0) return expire();
  if (timeRemaining <= WARNING_TIMESPAN) warn();
  [...document.querySelectorAll('[data-sc-cart-timer]')].map(timer => {
    timer.querySelector('[data-sc-mins]').innerText = getMinutes(timeRemaining);
    timer.querySelector('[data-sc-secs]').innerText = getSeconds(timeRemaining);
  });
}

function warn() {
  [...document.querySelectorAll('[data-sc-cart-timer]')]
    .map(timer => timer.classList.add('warning'));
}

function expire() {
  document.removeEventListener('countdown', countdown);

  [...document.querySelectorAll('[data-sc-cart-timer]')].map(timer => {
    const label = timer.querySelector('[data-sc-label]');

    timer.classList.add('expired');
    label.innerText = label.dataset.scExpired;
  });

  [...document.querySelectorAll('[data-sc-cart]')].map(cart => {
    cart.classList.add('expired');
    [...cart.querySelectorAll('[data-sc-cart-booking]')].map(node => {
      node.classList.add('expired');
    });
  });
}

function getTimespan(expiryDate) {
  return Date.parse(expiryDate) - Date.parse(new Date());
}

function getMinutes(time) {
  return new Date(time).getMinutes();
}

function getSeconds(time) {
  const secs = new Date(time).getSeconds();
  return (secs < 10 ? '0' : '') + secs;
}
