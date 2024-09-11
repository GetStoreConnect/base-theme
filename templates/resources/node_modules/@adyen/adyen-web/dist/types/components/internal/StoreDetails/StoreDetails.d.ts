import { h } from 'preact';
/**
 * "Store details" generic checkbox
 */
declare function StoreDetails({ storeDetails, ...props }: {
    [x: string]: any;
    storeDetails?: boolean;
}): h.JSX.Element;
export default StoreDetails;
