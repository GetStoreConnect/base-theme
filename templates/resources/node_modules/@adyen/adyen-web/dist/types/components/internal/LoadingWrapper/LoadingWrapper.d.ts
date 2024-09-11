import { ComponentChildren, h } from 'preact';
interface LoadingWrapperProps {
    status?: string;
    children?: ComponentChildren;
}
declare const LoadingWrapper: ({ children, status }: LoadingWrapperProps) => h.JSX.Element;
export default LoadingWrapper;
