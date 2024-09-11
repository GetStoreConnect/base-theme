/**
 * Returns either the date input is supported or not in the current browser
 */
declare const checkDateInputSupport: () => boolean;
/**
 * Returns a formatted date
 * @param value -
 * @example
 * formatDate('22111990');
 * // '22/11/1990'
 */
declare const formatDate: (value: string) => string;
/**
 * Receives a formatted date and returns it as the API expects it
 * @param value -
 * @example
 * unformatDate('22/11/1990');
 * // '1990-11-22'
 */
declare const unformatDate: (value?: string) => string;
export { checkDateInputSupport, formatDate, unformatDate };
