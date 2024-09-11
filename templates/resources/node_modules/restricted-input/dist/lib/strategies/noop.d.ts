import { StrategyInterface } from "./strategy-interface";
export declare class NoopKeyboardStrategy extends StrategyInterface {
    getUnformattedValue(): string;
    setPattern(): void;
}
