import { h } from 'preact';
import './RadioGroup.scss';
import { RadioGroupProps } from './types';
declare function RadioGroup(props: RadioGroupProps): h.JSX.Element;
declare namespace RadioGroup {
    var defaultProps: {
        onChange: () => void;
        items: any[];
    };
}
export default RadioGroup;
