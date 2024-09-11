import { Component, h } from 'preact';
interface ThreeDS2FormProps {
    name: string;
    action: string;
    target: string;
    inputName: string;
    inputValue: string;
}
export default class ThreeDS2Form extends Component<ThreeDS2FormProps> {
    protected formEl: any;
    componentDidMount(): void;
    render({ name, action, target, inputName, inputValue }: {
        name: any;
        action: any;
        target: any;
        inputName: any;
        inputValue: any;
    }): h.JSX.Element;
}
export {};
