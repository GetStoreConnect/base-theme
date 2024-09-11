import { h } from 'preact';
import './GiftcardResult.scss';
declare function GiftcardResult({ brand, amount, balance, transactionLimit, ...props }: {
    [x: string]: any;
    brand: any;
    amount: any;
    balance: any;
    transactionLimit: any;
}): h.JSX.Element;
export default GiftcardResult;
