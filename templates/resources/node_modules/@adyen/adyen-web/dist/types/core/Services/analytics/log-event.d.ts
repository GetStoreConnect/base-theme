/**
 * Log event to Adyen
 * @param config - ready to be serialized and included in the request
 * @returns A log event function
 */
declare const logEvent: (config: any) => (event: any) => void;
export default logEvent;
