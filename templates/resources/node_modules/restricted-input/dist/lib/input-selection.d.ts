import { Input } from "./strategies/strategy-interface";
export declare type Selection = {
    start: number;
    end: number;
    delta?: number;
};
export declare function get(element: Input): Selection;
export declare function set(element: Input, start: number, end: number): void;
