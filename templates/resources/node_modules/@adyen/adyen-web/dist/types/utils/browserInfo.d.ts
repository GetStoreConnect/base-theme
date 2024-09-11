import { BrowserInfo } from '../types';
/**
 * Collects available frontend browser info and store it in the properties dictated by the EMVCo spec
 * (3DS_Spec_protocolAndCoreFny_v2-1_Oct2017.pdf)
 *
 * @example
 * ```js
 * const browserInfo = collectBrowserInfo();
 * ```
 *
 * @returns An object containing the retrieved browser properties
 */
export default function collectBrowserInfo(): BrowserInfo;
