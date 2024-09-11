/**
 * Tests if a passed promise settles before a certain amount of time has elapsed
 *
 * @param ms - number of milliseconds the passed promise has to settle
 * @param promise - the passed promise
 * @param timeOutObject - the object that the promiseTimeout will reject with if the passed promise doesn't settle in time
 */
declare const promiseTimeout: (ms: number, promise: Promise<any>, timeOutObject: object) => {
    promise: Promise<any>;
    cancel: () => void;
};
export default promiseTimeout;
