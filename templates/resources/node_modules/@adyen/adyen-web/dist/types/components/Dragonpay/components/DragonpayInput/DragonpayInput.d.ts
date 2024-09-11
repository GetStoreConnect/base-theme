import { h } from 'preact';
import { DragonpayInputProps } from '../../types';
declare function DragonpayInput(props: DragonpayInputProps): h.JSX.Element;
declare namespace DragonpayInput {
    var defaultProps: {
        data: {};
        items: any[];
        onChange: () => void;
    };
}
export default DragonpayInput;
