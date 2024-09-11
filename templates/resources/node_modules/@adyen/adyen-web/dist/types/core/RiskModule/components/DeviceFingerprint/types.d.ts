export interface GetDeviceFingerprintProps {
    loadingContext: string;
    dfpURL: string;
    onCompleteFingerprint: (result: any) => void;
    onErrorFingerprint: (error: any) => void;
}
export interface DeviceFingerprintProps {
    loadingContext: string;
    onComplete: (fingerprint: any) => void;
    onError: (error: any) => void;
}
export interface DeviceFingerprintState {
    status: string;
    dfpURL: string;
}
