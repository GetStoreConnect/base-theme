import { CheckoutDetailsRequest, PayloadJSON, UpdateAmazonCheckoutSessionRequest } from './types';
/**
 * Calls the Sign String endpoint to the PayloadJSON string.
 * @param loadingContext - Loading context to be used in the call
 * @param clientKey - Key to be used as a public token
 * @param payloadJSON - Object to be signed
 * @returns A promise containing the response of the call
 */
export declare function getAmazonSignature(loadingContext: string, clientKey: string, payloadJSON: PayloadJSON): Promise<any>;
/**
 * Calls the getCheckoutDetails details to either get the shopper details or the decline flow URL.
 * @param loadingContext - Loading context to be used in the call
 * @param clientKey - Key to be used as a public token
 * @param request - Object to sent
 * @returns A promise containing the response of the call
 */
export declare function getCheckoutDetails(loadingContext: string, clientKey: string, request: CheckoutDetailsRequest): Promise<any>;
/**
 * Calls the Update Checkout Session endpoint to create an order.
 * @param loadingContext - Loading context to be used in the call
 * @param clientKey - Key to be used as a public token
 * @param data -
 * @returns A promise containing the response of the call
 */
export declare function updateAmazonCheckoutSession(loadingContext: string, clientKey: string, data: UpdateAmazonCheckoutSessionRequest): Promise<any>;
