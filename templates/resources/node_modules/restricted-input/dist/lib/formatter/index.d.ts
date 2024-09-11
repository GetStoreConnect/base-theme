import { Pattern } from "./parse-pattern";
import type { Selection } from "../input-selection";
export declare type FormatMetadata = {
    value: string;
    selection: Selection;
};
export interface SimulateDeleteOptions extends FormatMetadata {
    event: KeyboardEvent;
}
export declare class PatternFormatter {
    pattern: Pattern[];
    constructor(pattern: string);
    format(options: FormatMetadata): FormatMetadata;
    unformat(options: FormatMetadata): FormatMetadata;
    simulateDeletion(options: SimulateDeleteOptions): FormatMetadata;
}
