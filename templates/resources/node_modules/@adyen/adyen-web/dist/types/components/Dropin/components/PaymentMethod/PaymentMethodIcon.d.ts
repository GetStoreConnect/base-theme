import { h } from 'preact';
interface PaymentMethodIconProps {
    /** URL to the payment method icon */
    src: string;
    /** Alt description of payment method used of a11y */
    altDescription: string;
    /** Type of the payment method*/
    type: string;
    disabled?: boolean;
}
declare const PaymentMethodIcon: ({ src, altDescription, type, disabled }: PaymentMethodIconProps) => h.JSX.Element;
export default PaymentMethodIcon;
