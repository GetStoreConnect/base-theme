import { h } from 'preact';
import UIElement from '../UIElement';
declare class QiwiWalletElement extends UIElement {
    static type: string;
    static defaultProps: {
        items: any[];
        countryCode: string;
        prefixName: string;
        phoneName: string;
    };
    get isValid(): boolean;
    formatProps(props: any): any;
    /**
     * Formats the component data output
     */
    formatData(): {
        paymentMethod: {
            type: string;
            'qiwiwallet.telephoneNumberPrefix': any;
            'qiwiwallet.telephoneNumber': any;
        };
    };
    render(): h.JSX.Element;
}
export default QiwiWalletElement;
