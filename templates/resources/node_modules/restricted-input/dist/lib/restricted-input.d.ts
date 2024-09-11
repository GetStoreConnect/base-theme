import { StrategyInterface, StrategyOptions } from "./strategies/strategy-interface";
/**
 * Instances of this class can be used to modify the formatter for an input
 * @class
 * @param {object} options The initialization paramaters for this class
 * @param {object} options.element - A Input DOM object that RestrictedInput operates on
 * @param {string} options.pattern - The pattern to enforce on this element
 */
declare class RestrictedInput {
    strategy: StrategyInterface;
    constructor(options: StrategyOptions);
    /**
     * @public
     * @returns {string} the unformatted value of the element
     */
    getUnformattedValue(): string;
    /**
     * @public
     * @param {string} pattern - the pattern to enforce on the element
     * @return {void}
     */
    setPattern(pattern: string): void;
    static supportsFormatting(): boolean;
}
export = RestrictedInput;
