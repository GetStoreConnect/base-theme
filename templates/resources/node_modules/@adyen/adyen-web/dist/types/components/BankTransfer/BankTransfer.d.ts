import { h } from 'preact';
import UIElement from '../UIElement';
import { BankTransferProps, BankTransferState } from './types';
export declare class BankTransferElement extends UIElement<BankTransferProps> {
    static type: string;
    static defaultProps: {
        showPayButton: boolean;
        showEmailAddress: boolean;
    };
    state: BankTransferState;
    get isValid(): boolean;
    /**
     * Formats the component data output
     */
    formatData(): {
        shopperEmail: string;
        paymentMethod: {
            type: string;
        };
    };
    private handleRef;
    render(): h.JSX.Element;
}
export default BankTransferElement;
