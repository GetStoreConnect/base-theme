import { PaymentAction } from '../../../types';
declare const actionTypes: {
    readonly redirect: (action: PaymentAction, props: any) => any;
    readonly threeDS2Fingerprint: (action: PaymentAction, props: any) => any;
    readonly threeDS2Challenge: (action: PaymentAction, props: any) => any;
    readonly threeDS2: (action: PaymentAction, props: any) => any;
    readonly voucher: (action: PaymentAction, props: any) => any;
    readonly qrCode: (action: PaymentAction, props: any) => any;
    readonly await: (action: PaymentAction, props: any) => any;
    readonly bankTransfer: (action: PaymentAction, props: any) => any;
    readonly sdk: (action: PaymentAction, props: any) => any;
};
export default actionTypes;
