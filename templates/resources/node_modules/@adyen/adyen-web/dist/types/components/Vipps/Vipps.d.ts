import RedirectElement from '../Redirect';
declare class VippsElement extends RedirectElement {
    static type: string;
    static defaultProps: {
        type: string;
        showPayButton: boolean;
        name: string;
    };
}
export default VippsElement;
