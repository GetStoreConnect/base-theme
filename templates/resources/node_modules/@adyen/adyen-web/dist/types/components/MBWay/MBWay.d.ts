import { h } from 'preact';
import UIElement from '../UIElement';
export declare class MBWayElement extends UIElement {
    private static type;
    formatProps(props: any): any;
    /**
     * Formats the component data output
     */
    formatData(): object;
    get isValid(): boolean;
    get displayName(): string;
    render(): h.JSX.Element;
}
export default MBWayElement;
