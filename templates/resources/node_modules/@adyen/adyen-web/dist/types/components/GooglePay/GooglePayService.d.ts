/// <reference types="googlepay" />
declare class GooglePayService {
    readonly paymentsClient: Promise<google.payments.api.PaymentsClient>;
    constructor(props: any);
    /**
     * Initialize a Google Pay API client
     *
     * @see {@link https://developers.google.com/pay/api/web/reference/client#PaymentsClient|PaymentsClient constructor}
     * @returns Google Pay API client
     */
    getGooglePaymentsClient(paymentOptions: google.payments.api.PaymentOptions): Promise<google.payments.api.PaymentsClient>;
    /**
     * Determine a shopper's ability to return a form of payment from the Google Pay API.
     * @see {@link https://developers.google.com/pay/api/web/reference/client#isReadyToPay|isReadyToPay}
     */
    isReadyToPay(props: any): Promise<google.payments.api.IsReadyToPayResponse>;
    prefetchPaymentData(props: any): void;
    /**
     * Show Google Pay payment sheet when Google Pay payment button is clicked
     * @returns paymentData response from Google Pay API after user approves payment
     * @see {@link https://developers.google.com/pay/api/web/reference/object#PaymentData|PaymentData object reference}
     */
    initiatePayment(props: any): Promise<google.payments.api.PaymentData>;
}
export default GooglePayService;
