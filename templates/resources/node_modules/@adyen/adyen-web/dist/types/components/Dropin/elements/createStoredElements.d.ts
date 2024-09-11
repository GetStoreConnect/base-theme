import { StoredPaymentMethod } from '../../../types';
/**
 *  Returns a filtered (available) list of oneClick paymentMethod Elements
 * @param paymentMethods -
 * @param props - Props to be passed through to every paymentMethod
 * @param create - Reference to the main instance `create` method
 */
declare const createStoredElements: (paymentMethods: StoredPaymentMethod[], props: any, create: any) => Promise<any[]>;
export default createStoredElements;
