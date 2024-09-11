import { PaymentResponse, ProcessedResponse } from '../../types';
/**
 * Processes a response from Adyen by type
 * @param response - to be processed
 * @returns a new object describing the response result (ready for onStatusChange)
 */
export declare const processResponse: (response: PaymentResponse) => ProcessedResponse;
export default processResponse;
