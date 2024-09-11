import {totalPayable} from "./form";
import {formElement, basicInit} from "./common";

window.StoreConnect = window.StoreConnect || {};
window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};

window.StoreConnect.Gateways.Cboss = async function ({providerId, providerName}) {
  basicInit(providerName, providerId);

  // Replace the form action with the CBOSS payments URL
  formElement().action = formElement().dataset.paymentsUrl;

  function addFormInput(name, value) {
    const input = document.createElement("input");
    input.type = "hidden";
    input.name = name;
    input.value = value;
    formElement().appendChild(input);
  }

  addFormInput("ClientAccount", formElement().dataset.clientAccount);
  addFormInput("OriginatorID", formElement().dataset.originatorId);
  addFormInput("SuccessfulURL", formElement().dataset.callbackUrl);
  addFormInput("UnsuccessfulURL", formElement().dataset.callbackUrl);
  addFormInput("FirstName", formElement().dataset.firstName);
  addFormInput("LastName", formElement().dataset.lastName);
  addFormInput("BillingAddressLine1", formElement().dataset.billingAddressLine1);
  addFormInput("BillingEmail", formElement().dataset.billingEmail);
  addFormInput("BillingCity", formElement().dataset.billingCity);
  addFormInput("BillingCountry", formElement().dataset.billingCountry);
  addFormInput("BillingZip", formElement().dataset.billingZip);
  addFormInput("BillingPhoneNumber", formElement().dataset.billingPhoneNumber);
  addFormInput("BillingState", formElement().dataset.billingState);
  addFormInput("Currency", formElement().dataset.currency);
  addFormInput("Amount", totalPayable());
  addFormInput("Number", formElement().dataset.number);
  addFormInput("PaymentType", formElement().dataset.paymentType);
};
