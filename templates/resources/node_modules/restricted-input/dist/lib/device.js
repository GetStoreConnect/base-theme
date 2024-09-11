"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIos = exports.isIE9 = exports.isSamsungBrowser = exports.isAndroidChrome = exports.isKitKatWebview = void 0;
// server side rendering check
var UA = (typeof window !== "undefined" &&
    window.navigator &&
    window.navigator.userAgent);
// TODO remove this when browser detection is converted to typescript
/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-ignore
var isAndroid = require("@braintree/browser-detection/is-android");
// @ts-ignore
var isChromeOs = require("@braintree/browser-detection/is-chrome-os");
// @ts-ignore
var isChrome = require("@braintree/browser-detection/is-chrome");
// @ts-ignore
var isIos = require("@braintree/browser-detection/is-ios");
exports.isIos = isIos;
// @ts-ignore
var isIE9 = require("@braintree/browser-detection/is-ie9");
exports.isIE9 = isIE9;
/* eslint-enable @typescript-eslint/ban-ts-comment */
// Old Android Webviews used specific versions of Chrome with 0.0.0 as their version suffix
// https://developer.chrome.com/multidevice/user-agent#webview_user_agent
var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;
function isOldSamsungBrowserOrSamsungWebview(ua) {
    return !isChrome(ua) && ua.indexOf("Samsung") > -1;
}
function isKitKatWebview(ua) {
    if (ua === void 0) { ua = UA; }
    return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
}
exports.isKitKatWebview = isKitKatWebview;
function isAndroidChrome(ua) {
    if (ua === void 0) { ua = UA; }
    return (isAndroid(ua) || isChromeOs(ua)) && isChrome(ua);
}
exports.isAndroidChrome = isAndroidChrome;
function isSamsungBrowser(ua) {
    if (ua === void 0) { ua = UA; }
    return /SamsungBrowser/.test(ua) || isOldSamsungBrowserOrSamsungWebview(ua);
}
exports.isSamsungBrowser = isSamsungBrowser;
