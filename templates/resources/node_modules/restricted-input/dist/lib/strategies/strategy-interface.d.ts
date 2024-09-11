export declare type Input = HTMLInputElement | HTMLTextAreaElement;
export declare type OnPasteEventMethod = (options: {
    unformattedInputValue: string;
}) => void;
export declare type StrategyOptions = {
    element: Input;
    pattern: string;
    onPasteEvent?: OnPasteEventMethod;
};
export declare abstract class StrategyInterface {
    inputElement: Input;
    isFormatted: boolean;
    constructor(options: StrategyOptions);
    abstract getUnformattedValue(): string;
    abstract setPattern(pattern: string): void;
}
