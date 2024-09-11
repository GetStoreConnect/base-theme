import { Component, h } from 'preact';
import './ApplePayButton.scss';
import Language from '../../../language/Language';
import { ApplePayButtonType } from '../types';
interface ApplePayButtonProps {
    i18n: Language;
    buttonColor: 'black' | 'white' | 'white-with-line';
    buttonType: ApplePayButtonType;
    onClick: (event: any) => void;
}
declare class ApplePayButton extends Component<ApplePayButtonProps> {
    static defaultProps: {
        onClick: () => void;
        buttonColor: string;
        buttonType: string;
    };
    render({ buttonColor, buttonType }: {
        buttonColor: any;
        buttonType: any;
    }): h.JSX.Element;
}
export default ApplePayButton;
