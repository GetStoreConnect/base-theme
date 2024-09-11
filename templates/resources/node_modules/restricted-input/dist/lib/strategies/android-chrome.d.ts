import { BaseStrategy } from "./base";
import { FormatMetadata } from "../formatter";
export declare class AndroidChromeStrategy extends BaseStrategy {
    protected attachListeners(): void;
    protected prePasteEventHandler(): void;
    protected postPasteEventHandler(): void;
    protected afterReformatInput(formattedState: FormatMetadata): void;
}
