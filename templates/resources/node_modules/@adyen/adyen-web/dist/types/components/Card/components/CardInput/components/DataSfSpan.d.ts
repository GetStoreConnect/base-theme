import { h } from 'preact';
import { SfSpanProps } from './types';
/**
 * Extract the relevant props and write them as attributes to the span that will contain the securedFields iframe
 * Specifically exists to make the uniqueId created by the Field comp accessible to the SFP via a data-uid attr
 */
export default function DataSfSpan(props: SfSpanProps): h.JSX.Element;
