import { h } from 'preact';
import { BacsInputProps } from './types';
import './BacsInput.scss';
declare function BacsInput(props: BacsInputProps): h.JSX.Element;
declare namespace BacsInput {
    var defaultProps: {
        data: {};
        placeholders: {};
    };
}
export default BacsInput;
