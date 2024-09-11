import { h } from 'preact';
import './Spinner.scss';
interface SpinnerProps {
    /**
     * Whether the spinner should be rendered inline
     */
    inline?: boolean;
    /**
     * size of the spinner (small/medium/large)
     */
    size?: string;
}
/**
 * Default Loading Spinner
 * @param props -
 */
declare const Spinner: ({ inline, size }: SpinnerProps) => h.JSX.Element;
export default Spinner;
