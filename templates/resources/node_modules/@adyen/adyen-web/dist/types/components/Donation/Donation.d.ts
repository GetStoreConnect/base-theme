import { h } from 'preact';
import UIElement from '../UIElement';
/**
 * DonationElement
 */
declare class DonationElement extends UIElement {
    static type: string;
    constructor(props: any);
    static defaultProps: {
        onCancel: () => void;
        onDonate: () => void;
    };
    /**
     * Returns the component payment data ready to submit to the Checkout API
     */
    get data(): any;
    /**
     * Returns whether the component state is valid or not
     */
    get isValid(): any;
    setState(newState: any): void;
    donate(): void;
    handleRef: (ref: any) => void;
    render(): h.JSX.Element;
}
export default DonationElement;
