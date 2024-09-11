import { h, ComponentChildren } from 'preact';
import './Fieldset.scss';
interface FieldsetProps {
    children: ComponentChildren;
    classNameModifiers: string[];
    label: string;
    readonly?: boolean;
}
export default function Fieldset({ children, classNameModifiers, label, readonly }: FieldsetProps): h.JSX.Element;
export {};
