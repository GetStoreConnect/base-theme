import { Component, h } from 'preact';
import { DeviceFingerprintProps, DeviceFingerprintState } from './types';
declare class DeviceFingerprint extends Component<DeviceFingerprintProps, DeviceFingerprintState> {
    constructor(props: any);
    static defaultProps: {
        onComplete: () => void;
        onError: () => void;
    };
    setStatusComplete(fingerprintResult: any): void;
    render({ loadingContext }: {
        loadingContext: any;
    }, { dfpURL }: {
        dfpURL: any;
    }): h.JSX.Element;
}
export default DeviceFingerprint;
