import { formElement } from "./common";

export function callbackUrl() {
  const element = formElement();
  return element ? element.dataset.callbackUrl : null;
}

export function apiKey() {
  const element = formElement();
  return element ? element.dataset.apiKey : null;
}

// Environment of payment provider, e.g. 'sandbox' or 'production'
export function apiMode() {
  const element = formElement();
  return element ? element.dataset.apiMode : null;
}

export function showWallets() {
  const element = formElement();
  return element ? Boolean(element.dataset.showWallets) : false;
}

export function totalPayable() {
  const element = formElement();
  return element ? element.dataset.totalPayable : null;
}

export function currency() {
  const element = formElement();
  return element ? element.dataset.currencyCode : null;
}
