/**
 *  Used to retrieve the origin from a url
 *
 *  @remarks
 *  Uses a regex to get origin (can't handle localhost origins)
 *
 *  @param url - URL
 *  @returns The origin of the url
 */
export declare const getOrigin: (url: string) => string;
export default getOrigin;
