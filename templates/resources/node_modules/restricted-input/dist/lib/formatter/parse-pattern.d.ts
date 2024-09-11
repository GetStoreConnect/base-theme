export declare type Pattern = {
    value: RegExp | string;
    isPermaChar: boolean;
    index: number;
};
export declare function parsePattern(patternString: string): Pattern[];
