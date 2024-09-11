import { BaseStrategy } from "./base";
export declare class IE9Strategy extends BaseStrategy {
    getUnformattedValue(): string;
    protected attachListeners(): void;
    private format;
    private keydownListener;
    protected reformatAfterPaste(): void;
}
