import { h } from 'preact';
import UIElement from '../UIElement';
export declare class MultibancoElement extends UIElement {
    static type: string;
    static defaultProps: {
        showPayButton: boolean;
    };
    get isValid(): boolean;
    formatProps(props: any): any;
    /**
     * Formats the component data output
     */
    formatData(): {
        paymentMethod: {
            type: any;
        };
    };
    private handleRef;
    render(): h.JSX.Element;
}
export default MultibancoElement;
