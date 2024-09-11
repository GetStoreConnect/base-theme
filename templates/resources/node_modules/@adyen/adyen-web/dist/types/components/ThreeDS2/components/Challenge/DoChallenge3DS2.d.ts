import { Component, h } from 'preact';
import { DoChallenge3DS2Props, DoChallenge3DS2State } from './types';
declare class DoChallenge3DS2 extends Component<DoChallenge3DS2Props, DoChallenge3DS2State> {
    private processMessageHandler;
    private challengePromise;
    constructor(props: any);
    private iframeCallback;
    private get3DS2ChallengePromise;
    componentDidMount(): void;
    componentWillUnmount(): void;
    render({ acsURL, cReqData, iframeSizeArr }: {
        acsURL: any;
        cReqData: any;
        iframeSizeArr: any;
    }, { base64URLencodedData, status }: {
        base64URLencodedData: any;
        status: any;
    }): h.JSX.Element;
}
export default DoChallenge3DS2;
