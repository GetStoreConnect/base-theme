export declare const UNSUPPORTED_PAYMENT_METHODS: string[];
export declare const filterUnsupported: (paymentMethod: any) => boolean;
export declare const filterPresent: (paymentMethod: any) => boolean;
export declare const filterAvailable: (paymentMethod: any) => Promise<any>;
