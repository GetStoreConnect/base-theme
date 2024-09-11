import { SupportedLocale, PayPalElementProps, FundingSource } from './types';
/**
 * Processes and returns a new style object.
 */
declare const getStyle: (fundingSource: FundingSource, style?: {}) => {};
/**
 * Returns either a locale supported by PayPal or null, in order to let the PayPal SDK auto-detect the shopper locale.
 */
declare const getSupportedLocale: (locale: string) => SupportedLocale;
/**
 * Returns the PayPal SDK script URL with query parameters
 * @see {@link https://developer.paypal.com/docs/checkout/reference/customize-sdk/}
 */
declare const getPaypalUrl: (props: PayPalElementProps) => string;
export { getStyle, getSupportedLocale, getPaypalUrl };
