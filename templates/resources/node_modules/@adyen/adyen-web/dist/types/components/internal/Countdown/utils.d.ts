/**
 * Pads a given string or number with zeros.
 *
 * @param value - Value to zero-pad.
 * @param length - Amount of characters to pad.
 * @returns Left-padded number/string.
 */
export declare const zeroPad: (value: any, length?: number) => any;
/**
 * Calculates the remaining time as a percentage
 *
 * @param start - Start date
 * @param now - Current date
 * @param end - End date
 * @returns Percentage of the remaining time
 */
export declare const getProgressPercentage: (start: any, now: any, end: any) => number;
/**
 * Calculates the difference in minutes and seconds from now to endDate
 *
 * @param startTime -
 * @param endTime -
 * @returns  Time difference
 */
export declare const getTimeDifference: (startTime: any, endTime: any) => {
    total: number;
    minutes: any;
    seconds: any;
    completed: boolean;
    percentage: number;
};
