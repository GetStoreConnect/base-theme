import { BaseStrategy } from "./base";
export declare class IosStrategy extends BaseStrategy {
    getUnformattedValue(): string;
    protected attachListeners(): void;
    private fixLeadingBlankSpaceOnIos;
    private formatListener;
    private keydownListener;
}
