import { Component, h } from 'preact';
import { GetDeviceFingerprintProps } from './types';
declare class GetDeviceFingerprint extends Component<GetDeviceFingerprintProps> {
    postMessageDomain: any;
    processMessageHandler: any;
    deviceFingerPrintPromise: any;
    constructor(props: any);
    getDfpPromise(): Promise<any>;
    componentDidMount(): void;
    render({ dfpURL }: {
        dfpURL: any;
    }): h.JSX.Element;
}
export default GetDeviceFingerprint;
