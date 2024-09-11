/// <reference types="googlepay" />
import { GooglePaymentDataRequest, GooglePayProps } from './types';
/**
 * Configure your site's support for payment methods supported by the Google Pay API.
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/object#IsReadyToPayRequest|isReadyToPayRequest}
 * @returns Google Pay API version, payment methods supported by the site
 */
export declare function isReadyToPayRequest({ allowedAuthMethods, allowedCardNetworks, existingPaymentMethodRequired }: {
    allowedAuthMethods: any;
    allowedCardNetworks: any;
    existingPaymentMethodRequired?: boolean;
}): google.payments.api.IsReadyToPayRequest;
/**
 * Provide Google Pay API with a payment amount, currency, and amount status
 *
 * @see {@link https://developers.google.com/pay/api/web/reference/object#TransactionInfo|TransactionInfo}
 * @returns transaction info, suitable for use as transactionInfo property of PaymentDataRequest
 */
export declare function getTransactionInfo({ amount, countryCode, totalPriceStatus, ...props }: GooglePayProps): google.payments.api.TransactionInfo;
export declare function initiatePaymentRequest({ configuration, ...props }: GooglePayProps): GooglePaymentDataRequest;
