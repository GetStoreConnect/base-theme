import { h } from 'preact';
import UIElement from '../UIElement';
export declare class BoletoElement extends UIElement {
    static type: string;
    get isValid(): boolean;
    /**
     * Formats the component data output
     */
    formatData(): {
        socialSecurityNumber: any;
        shopperName: {
            firstName: any;
            lastName: any;
        };
        shopperEmail: any;
        billingAddress: any;
        paymentMethod: {
            type: any;
        };
    };
    private handleRef;
    render(): h.JSX.Element;
}
export default BoletoElement;
