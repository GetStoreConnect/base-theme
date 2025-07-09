(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/@rails/ujs/app/assets/javascripts/rails-ujs.js
  var require_rails_ujs = __commonJS({
    "node_modules/@rails/ujs/app/assets/javascripts/rails-ujs.js"(exports, module) {
      (function(global, factory) {
        typeof exports === "object" && typeof module !== "undefined" ? module.exports = factory() : typeof define === "function" && define.amd ? define(factory) : (global = typeof globalThis !== "undefined" ? globalThis : global || self, global.Rails = factory());
      })(exports, function() {
        "use strict";
        const linkClickSelector = "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]";
        const buttonClickSelector = {
          selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
          exclude: "form button"
        };
        const inputChangeSelector = "select[data-remote], input[data-remote], textarea[data-remote]";
        const formSubmitSelector = "form:not([data-turbo=true])";
        const formInputClickSelector = "form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])";
        const formDisableSelector = "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled";
        const formEnableSelector = "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled";
        const fileInputSelector = "input[name][type=file]:not([disabled])";
        const linkDisableSelector = "a[data-disable-with], a[data-disable]";
        const buttonDisableSelector = "button[data-remote][data-disable-with], button[data-remote][data-disable]";
        let nonce = null;
        const loadCSPNonce = () => {
          const metaTag = document.querySelector("meta[name=csp-nonce]");
          return nonce = metaTag && metaTag.content;
        };
        const cspNonce = () => nonce || loadCSPNonce();
        const m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
        const matches = function(element, selector) {
          if (selector.exclude) {
            return m.call(element, selector.selector) && !m.call(element, selector.exclude);
          } else {
            return m.call(element, selector);
          }
        };
        const EXPANDO = "_ujsData";
        const getData = (element, key) => element[EXPANDO] ? element[EXPANDO][key] : void 0;
        const setData = function(element, key, value) {
          if (!element[EXPANDO]) {
            element[EXPANDO] = {};
          }
          return element[EXPANDO][key] = value;
        };
        const $ = (selector) => Array.prototype.slice.call(document.querySelectorAll(selector));
        const isContentEditable = function(element) {
          var isEditable = false;
          do {
            if (element.isContentEditable) {
              isEditable = true;
              break;
            }
            element = element.parentElement;
          } while (element);
          return isEditable;
        };
        const csrfToken = () => {
          const meta = document.querySelector("meta[name=csrf-token]");
          return meta && meta.content;
        };
        const csrfParam = () => {
          const meta = document.querySelector("meta[name=csrf-param]");
          return meta && meta.content;
        };
        const CSRFProtection = (xhr) => {
          const token = csrfToken();
          if (token) {
            return xhr.setRequestHeader("X-CSRF-Token", token);
          }
        };
        const refreshCSRFTokens = () => {
          const token = csrfToken();
          const param = csrfParam();
          if (token && param) {
            return $('form input[name="' + param + '"]').forEach((input) => input.value = token);
          }
        };
        const AcceptHeaders = {
          "*": "*/*",
          text: "text/plain",
          html: "text/html",
          xml: "application/xml, text/xml",
          json: "application/json, text/javascript",
          script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
        };
        const ajax = (options) => {
          options = prepareOptions(options);
          var xhr = createXHR(options, function() {
            const response = processResponse(xhr.response != null ? xhr.response : xhr.responseText, xhr.getResponseHeader("Content-Type"));
            if (Math.floor(xhr.status / 100) === 2) {
              if (typeof options.success === "function") {
                options.success(response, xhr.statusText, xhr);
              }
            } else {
              if (typeof options.error === "function") {
                options.error(response, xhr.statusText, xhr);
              }
            }
            return typeof options.complete === "function" ? options.complete(xhr, xhr.statusText) : void 0;
          });
          if (options.beforeSend && !options.beforeSend(xhr, options)) {
            return false;
          }
          if (xhr.readyState === XMLHttpRequest.OPENED) {
            return xhr.send(options.data);
          }
        };
        var prepareOptions = function(options) {
          options.url = options.url || location.href;
          options.type = options.type.toUpperCase();
          if (options.type === "GET" && options.data) {
            if (options.url.indexOf("?") < 0) {
              options.url += "?" + options.data;
            } else {
              options.url += "&" + options.data;
            }
          }
          if (!(options.dataType in AcceptHeaders)) {
            options.dataType = "*";
          }
          options.accept = AcceptHeaders[options.dataType];
          if (options.dataType !== "*") {
            options.accept += ", */*; q=0.01";
          }
          return options;
        };
        var createXHR = function(options, done) {
          const xhr = new XMLHttpRequest();
          xhr.open(options.type, options.url, true);
          xhr.setRequestHeader("Accept", options.accept);
          if (typeof options.data === "string") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded; charset=UTF-8");
          }
          if (!options.crossDomain) {
            xhr.setRequestHeader("X-Requested-With", "XMLHttpRequest");
            CSRFProtection(xhr);
          }
          xhr.withCredentials = !!options.withCredentials;
          xhr.onreadystatechange = function() {
            if (xhr.readyState === XMLHttpRequest.DONE) {
              return done(xhr);
            }
          };
          return xhr;
        };
        var processResponse = function(response, type) {
          if (typeof response === "string" && typeof type === "string") {
            if (type.match(/\bjson\b/)) {
              try {
                response = JSON.parse(response);
              } catch (error) {
              }
            } else if (type.match(/\b(?:java|ecma)script\b/)) {
              const script = document.createElement("script");
              script.setAttribute("nonce", cspNonce());
              script.text = response;
              document.head.appendChild(script).parentNode.removeChild(script);
            } else if (type.match(/\b(xml|html|svg)\b/)) {
              const parser = new DOMParser();
              type = type.replace(/;.+/, "");
              try {
                response = parser.parseFromString(response, type);
              } catch (error1) {
              }
            }
          }
          return response;
        };
        const href = (element) => element.href;
        const isCrossDomain = function(url) {
          const originAnchor = document.createElement("a");
          originAnchor.href = location.href;
          const urlAnchor = document.createElement("a");
          try {
            urlAnchor.href = url;
            return !((!urlAnchor.protocol || urlAnchor.protocol === ":") && !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host === urlAnchor.protocol + "//" + urlAnchor.host);
          } catch (e) {
            return true;
          }
        };
        let preventDefault;
        let { CustomEvent: CustomEvent2 } = window;
        if (typeof CustomEvent2 !== "function") {
          CustomEvent2 = function(event, params) {
            const evt = document.createEvent("CustomEvent");
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
            return evt;
          };
          CustomEvent2.prototype = window.Event.prototype;
          ({ preventDefault } = CustomEvent2.prototype);
          CustomEvent2.prototype.preventDefault = function() {
            const result = preventDefault.call(this);
            if (this.cancelable && !this.defaultPrevented) {
              Object.defineProperty(this, "defaultPrevented", {
                get() {
                  return true;
                }
              });
            }
            return result;
          };
        }
        const fire = (obj, name, data) => {
          const event = new CustomEvent2(name, {
            bubbles: true,
            cancelable: true,
            detail: data
          });
          obj.dispatchEvent(event);
          return !event.defaultPrevented;
        };
        const stopEverything = (e) => {
          fire(e.target, "ujs:everythingStopped");
          e.preventDefault();
          e.stopPropagation();
          e.stopImmediatePropagation();
        };
        const delegate = (element, selector, eventType, handler) => element.addEventListener(eventType, function(e) {
          let { target } = e;
          while (!!(target instanceof Element) && !matches(target, selector)) {
            target = target.parentNode;
          }
          if (target instanceof Element && handler.call(target, e) === false) {
            e.preventDefault();
            e.stopPropagation();
          }
        });
        const toArray = (e) => Array.prototype.slice.call(e);
        const serializeElement = (element, additionalParam) => {
          let inputs = [element];
          if (matches(element, "form")) {
            inputs = toArray(element.elements);
          }
          const params = [];
          inputs.forEach(function(input) {
            if (!input.name || input.disabled) {
              return;
            }
            if (matches(input, "fieldset[disabled] *")) {
              return;
            }
            if (matches(input, "select")) {
              toArray(input.options).forEach(function(option) {
                if (option.selected) {
                  params.push({
                    name: input.name,
                    value: option.value
                  });
                }
              });
            } else if (input.checked || ["radio", "checkbox", "submit"].indexOf(input.type) === -1) {
              params.push({
                name: input.name,
                value: input.value
              });
            }
          });
          if (additionalParam) {
            params.push(additionalParam);
          }
          return params.map(function(param) {
            if (param.name) {
              return `${encodeURIComponent(param.name)}=${encodeURIComponent(param.value)}`;
            } else {
              return param;
            }
          }).join("&");
        };
        const formElements = (form2, selector) => {
          if (matches(form2, "form")) {
            return toArray(form2.elements).filter((el) => matches(el, selector));
          } else {
            return toArray(form2.querySelectorAll(selector));
          }
        };
        const handleConfirmWithRails = (rails) => function(e) {
          if (!allowAction(this, rails)) {
            stopEverything(e);
          }
        };
        const confirm = (message, element) => window.confirm(message);
        var allowAction = function(element, rails) {
          let callback;
          const message = element.getAttribute("data-confirm");
          if (!message) {
            return true;
          }
          let answer = false;
          if (fire(element, "confirm")) {
            try {
              answer = rails.confirm(message, element);
            } catch (error) {
            }
            callback = fire(element, "confirm:complete", [answer]);
          }
          return answer && callback;
        };
        const handleDisabledElement = function(e) {
          const element = this;
          if (element.disabled) {
            stopEverything(e);
          }
        };
        const enableElement = (e) => {
          let element;
          if (e instanceof Event) {
            if (isXhrRedirect(e)) {
              return;
            }
            element = e.target;
          } else {
            element = e;
          }
          if (isContentEditable(element)) {
            return;
          }
          if (matches(element, linkDisableSelector)) {
            return enableLinkElement(element);
          } else if (matches(element, buttonDisableSelector) || matches(element, formEnableSelector)) {
            return enableFormElement(element);
          } else if (matches(element, formSubmitSelector)) {
            return enableFormElements(element);
          }
        };
        const disableElement = (e) => {
          const element = e instanceof Event ? e.target : e;
          if (isContentEditable(element)) {
            return;
          }
          if (matches(element, linkDisableSelector)) {
            return disableLinkElement(element);
          } else if (matches(element, buttonDisableSelector) || matches(element, formDisableSelector)) {
            return disableFormElement(element);
          } else if (matches(element, formSubmitSelector)) {
            return disableFormElements(element);
          }
        };
        var disableLinkElement = function(element) {
          if (getData(element, "ujs:disabled")) {
            return;
          }
          const replacement = element.getAttribute("data-disable-with");
          if (replacement != null) {
            setData(element, "ujs:enable-with", element.innerHTML);
            element.innerHTML = replacement;
          }
          element.addEventListener("click", stopEverything);
          return setData(element, "ujs:disabled", true);
        };
        var enableLinkElement = function(element) {
          const originalText = getData(element, "ujs:enable-with");
          if (originalText != null) {
            element.innerHTML = originalText;
            setData(element, "ujs:enable-with", null);
          }
          element.removeEventListener("click", stopEverything);
          return setData(element, "ujs:disabled", null);
        };
        var disableFormElements = (form2) => formElements(form2, formDisableSelector).forEach(disableFormElement);
        var disableFormElement = function(element) {
          if (getData(element, "ujs:disabled")) {
            return;
          }
          const replacement = element.getAttribute("data-disable-with");
          if (replacement != null) {
            if (matches(element, "button")) {
              setData(element, "ujs:enable-with", element.innerHTML);
              element.innerHTML = replacement;
            } else {
              setData(element, "ujs:enable-with", element.value);
              element.value = replacement;
            }
          }
          element.disabled = true;
          return setData(element, "ujs:disabled", true);
        };
        var enableFormElements = (form2) => formElements(form2, formEnableSelector).forEach((element) => enableFormElement(element));
        var enableFormElement = function(element) {
          const originalText = getData(element, "ujs:enable-with");
          if (originalText != null) {
            if (matches(element, "button")) {
              element.innerHTML = originalText;
            } else {
              element.value = originalText;
            }
            setData(element, "ujs:enable-with", null);
          }
          element.disabled = false;
          return setData(element, "ujs:disabled", null);
        };
        var isXhrRedirect = function(event) {
          const xhr = event.detail ? event.detail[0] : void 0;
          return xhr && xhr.getResponseHeader("X-Xhr-Redirect");
        };
        const handleMethodWithRails = (rails) => function(e) {
          const link = this;
          const method = link.getAttribute("data-method");
          if (!method) {
            return;
          }
          if (isContentEditable(this)) {
            return;
          }
          const href2 = rails.href(link);
          const csrfToken$1 = csrfToken();
          const csrfParam$1 = csrfParam();
          const form2 = document.createElement("form");
          let formContent = `<input name='_method' value='${method}' type='hidden' />`;
          if (csrfParam$1 && csrfToken$1 && !isCrossDomain(href2)) {
            formContent += `<input name='${csrfParam$1}' value='${csrfToken$1}' type='hidden' />`;
          }
          formContent += '<input type="submit" />';
          form2.method = "post";
          form2.action = href2;
          form2.target = link.target;
          form2.innerHTML = formContent;
          form2.style.display = "none";
          document.body.appendChild(form2);
          form2.querySelector('[type="submit"]').click();
          stopEverything(e);
        };
        const isRemote = function(element) {
          const value = element.getAttribute("data-remote");
          return value != null && value !== "false";
        };
        const handleRemoteWithRails = (rails) => function(e) {
          let data, method, url;
          const element = this;
          if (!isRemote(element)) {
            return true;
          }
          if (!fire(element, "ajax:before")) {
            fire(element, "ajax:stopped");
            return false;
          }
          if (isContentEditable(element)) {
            fire(element, "ajax:stopped");
            return false;
          }
          const withCredentials = element.getAttribute("data-with-credentials");
          const dataType = element.getAttribute("data-type") || "script";
          if (matches(element, formSubmitSelector)) {
            const button = getData(element, "ujs:submit-button");
            method = getData(element, "ujs:submit-button-formmethod") || element.getAttribute("method") || "get";
            url = getData(element, "ujs:submit-button-formaction") || element.getAttribute("action") || location.href;
            if (method.toUpperCase() === "GET") {
              url = url.replace(/\?.*$/, "");
            }
            if (element.enctype === "multipart/form-data") {
              data = new FormData(element);
              if (button != null) {
                data.append(button.name, button.value);
              }
            } else {
              data = serializeElement(element, button);
            }
            setData(element, "ujs:submit-button", null);
            setData(element, "ujs:submit-button-formmethod", null);
            setData(element, "ujs:submit-button-formaction", null);
          } else if (matches(element, buttonClickSelector) || matches(element, inputChangeSelector)) {
            method = element.getAttribute("data-method");
            url = element.getAttribute("data-url");
            data = serializeElement(element, element.getAttribute("data-params"));
          } else {
            method = element.getAttribute("data-method");
            url = rails.href(element);
            data = element.getAttribute("data-params");
          }
          ajax({
            type: method || "GET",
            url,
            data,
            dataType,
            beforeSend(xhr, options) {
              if (fire(element, "ajax:beforeSend", [xhr, options])) {
                return fire(element, "ajax:send", [xhr]);
              } else {
                fire(element, "ajax:stopped");
                return false;
              }
            },
            success(...args) {
              return fire(element, "ajax:success", args);
            },
            error(...args) {
              return fire(element, "ajax:error", args);
            },
            complete(...args) {
              return fire(element, "ajax:complete", args);
            },
            crossDomain: isCrossDomain(url),
            withCredentials: withCredentials != null && withCredentials !== "false"
          });
          stopEverything(e);
        };
        const formSubmitButtonClick = function(e) {
          const button = this;
          const { form: form2 } = button;
          if (!form2) {
            return;
          }
          if (button.name) {
            setData(form2, "ujs:submit-button", {
              name: button.name,
              value: button.value
            });
          }
          setData(form2, "ujs:formnovalidate-button", button.formNoValidate);
          setData(form2, "ujs:submit-button-formaction", button.getAttribute("formaction"));
          return setData(form2, "ujs:submit-button-formmethod", button.getAttribute("formmethod"));
        };
        const preventInsignificantClick = function(e) {
          const link = this;
          const method = (link.getAttribute("data-method") || "GET").toUpperCase();
          const data = link.getAttribute("data-params");
          const metaClick = e.metaKey || e.ctrlKey;
          const insignificantMetaClick = metaClick && method === "GET" && !data;
          const nonPrimaryMouseClick = e.button != null && e.button !== 0;
          if (nonPrimaryMouseClick || insignificantMetaClick) {
            e.stopImmediatePropagation();
          }
        };
        const Rails2 = {
          $,
          ajax,
          buttonClickSelector,
          buttonDisableSelector,
          confirm,
          cspNonce,
          csrfToken,
          csrfParam,
          CSRFProtection,
          delegate,
          disableElement,
          enableElement,
          fileInputSelector,
          fire,
          formElements,
          formEnableSelector,
          formDisableSelector,
          formInputClickSelector,
          formSubmitButtonClick,
          formSubmitSelector,
          getData,
          handleDisabledElement,
          href,
          inputChangeSelector,
          isCrossDomain,
          linkClickSelector,
          linkDisableSelector,
          loadCSPNonce,
          matches,
          preventInsignificantClick,
          refreshCSRFTokens,
          serializeElement,
          setData,
          stopEverything
        };
        const handleConfirm = handleConfirmWithRails(Rails2);
        Rails2.handleConfirm = handleConfirm;
        const handleMethod = handleMethodWithRails(Rails2);
        Rails2.handleMethod = handleMethod;
        const handleRemote = handleRemoteWithRails(Rails2);
        Rails2.handleRemote = handleRemote;
        const start = function() {
          if (window._rails_loaded) {
            throw new Error("rails-ujs has already been loaded!");
          }
          window.addEventListener("pageshow", function() {
            $(formEnableSelector).forEach(function(el) {
              if (getData(el, "ujs:disabled")) {
                enableElement(el);
              }
            });
            $(linkDisableSelector).forEach(function(el) {
              if (getData(el, "ujs:disabled")) {
                enableElement(el);
              }
            });
          });
          delegate(document, linkDisableSelector, "ajax:complete", enableElement);
          delegate(document, linkDisableSelector, "ajax:stopped", enableElement);
          delegate(document, buttonDisableSelector, "ajax:complete", enableElement);
          delegate(document, buttonDisableSelector, "ajax:stopped", enableElement);
          delegate(document, linkClickSelector, "click", preventInsignificantClick);
          delegate(document, linkClickSelector, "click", handleDisabledElement);
          delegate(document, linkClickSelector, "click", handleConfirm);
          delegate(document, linkClickSelector, "click", disableElement);
          delegate(document, linkClickSelector, "click", handleRemote);
          delegate(document, linkClickSelector, "click", handleMethod);
          delegate(document, buttonClickSelector, "click", preventInsignificantClick);
          delegate(document, buttonClickSelector, "click", handleDisabledElement);
          delegate(document, buttonClickSelector, "click", handleConfirm);
          delegate(document, buttonClickSelector, "click", disableElement);
          delegate(document, buttonClickSelector, "click", handleRemote);
          delegate(document, inputChangeSelector, "change", handleDisabledElement);
          delegate(document, inputChangeSelector, "change", handleConfirm);
          delegate(document, inputChangeSelector, "change", handleRemote);
          delegate(document, formSubmitSelector, "submit", handleDisabledElement);
          delegate(document, formSubmitSelector, "submit", handleConfirm);
          delegate(document, formSubmitSelector, "submit", handleRemote);
          delegate(document, formSubmitSelector, "submit", (e) => setTimeout(() => disableElement(e), 13));
          delegate(document, formSubmitSelector, "ajax:send", disableElement);
          delegate(document, formSubmitSelector, "ajax:complete", enableElement);
          delegate(document, formInputClickSelector, "click", preventInsignificantClick);
          delegate(document, formInputClickSelector, "click", handleDisabledElement);
          delegate(document, formInputClickSelector, "click", handleConfirm);
          delegate(document, formInputClickSelector, "click", formSubmitButtonClick);
          document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
          document.addEventListener("DOMContentLoaded", loadCSPNonce);
          return window._rails_loaded = true;
        };
        Rails2.start = start;
        if (typeof jQuery !== "undefined" && jQuery && jQuery.ajax) {
          if (jQuery.rails) {
            throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
          }
          jQuery.rails = Rails2;
          jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
            if (!options.crossDomain) {
              return CSRFProtection(xhr);
            }
          });
        }
        if (typeof exports !== "object" && typeof module === "undefined") {
          window.Rails = Rails2;
          if (fire(document, "rails:attachBindings")) {
            start();
          }
        }
        return Rails2;
      });
    }
  });

  // node_modules/@stripe/stripe-js/dist/pure.js
  var require_pure = __commonJS({
    "node_modules/@stripe/stripe-js/dist/pure.js"(exports) {
      "use strict";
      Object.defineProperty(exports, "__esModule", { value: true });
      function _typeof(obj) {
        "@babel/helpers - typeof";
        if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
          _typeof = function(obj2) {
            return typeof obj2;
          };
        } else {
          _typeof = function(obj2) {
            return obj2 && typeof Symbol === "function" && obj2.constructor === Symbol && obj2 !== Symbol.prototype ? "symbol" : typeof obj2;
          };
        }
        return _typeof(obj);
      }
      var V3_URL = "https://js.stripe.com/v3";
      var V3_URL_REGEX = /^https:\/\/js\.stripe\.com\/v3\/?(\?.*)?$/;
      var EXISTING_SCRIPT_MESSAGE = "loadStripe.setLoadParameters was called but an existing Stripe.js script already exists in the document; existing script parameters will be used";
      var findScript = function findScript2() {
        var scripts = document.querySelectorAll('script[src^="'.concat(V3_URL, '"]'));
        for (var i = 0; i < scripts.length; i++) {
          var script = scripts[i];
          if (!V3_URL_REGEX.test(script.src)) {
            continue;
          }
          return script;
        }
        return null;
      };
      var injectScript = function injectScript2(params) {
        var queryString = params && !params.advancedFraudSignals ? "?advancedFraudSignals=false" : "";
        var script = document.createElement("script");
        script.src = "".concat(V3_URL).concat(queryString);
        var headOrBody = document.head || document.body;
        if (!headOrBody) {
          throw new Error("Expected document.body not to be null. Stripe.js requires a <body> element.");
        }
        headOrBody.appendChild(script);
        return script;
      };
      var registerWrapper = function registerWrapper2(stripe, startTime) {
        if (!stripe || !stripe._registerWrapper) {
          return;
        }
        stripe._registerWrapper({
          name: "stripe-js",
          version: "3.4.0",
          startTime
        });
      };
      var stripePromise = null;
      var onErrorListener = null;
      var onLoadListener = null;
      var onError = function onError2(reject) {
        return function() {
          reject(new Error("Failed to load Stripe.js"));
        };
      };
      var onLoad = function onLoad2(resolve, reject) {
        return function() {
          if (window.Stripe) {
            resolve(window.Stripe);
          } else {
            reject(new Error("Stripe.js not available"));
          }
        };
      };
      var loadScript = function loadScript2(params) {
        if (stripePromise !== null) {
          return stripePromise;
        }
        stripePromise = new Promise(function(resolve, reject) {
          if (typeof window === "undefined" || typeof document === "undefined") {
            resolve(null);
            return;
          }
          if (window.Stripe && params) {
            console.warn(EXISTING_SCRIPT_MESSAGE);
          }
          if (window.Stripe) {
            resolve(window.Stripe);
            return;
          }
          try {
            var script = findScript();
            if (script && params) {
              console.warn(EXISTING_SCRIPT_MESSAGE);
            } else if (!script) {
              script = injectScript(params);
            } else if (script && onLoadListener !== null && onErrorListener !== null) {
              var _script$parentNode;
              script.removeEventListener("load", onLoadListener);
              script.removeEventListener("error", onErrorListener);
              (_script$parentNode = script.parentNode) === null || _script$parentNode === void 0 ? void 0 : _script$parentNode.removeChild(script);
              script = injectScript(params);
            }
            onLoadListener = onLoad(resolve, reject);
            onErrorListener = onError(reject);
            script.addEventListener("load", onLoadListener);
            script.addEventListener("error", onErrorListener);
          } catch (error) {
            reject(error);
            return;
          }
        });
        return stripePromise["catch"](function(error) {
          stripePromise = null;
          return Promise.reject(error);
        });
      };
      var initStripe2 = function initStripe3(maybeStripe, args, startTime) {
        if (maybeStripe === null) {
          return null;
        }
        var stripe = maybeStripe.apply(void 0, args);
        registerWrapper(stripe, startTime);
        return stripe;
      };
      var validateLoadParams = function validateLoadParams2(params) {
        var errorMessage = "invalid load parameters; expected object of shape\n\n    {advancedFraudSignals: boolean}\n\nbut received\n\n    ".concat(JSON.stringify(params), "\n");
        if (params === null || _typeof(params) !== "object") {
          throw new Error(errorMessage);
        }
        if (Object.keys(params).length === 1 && typeof params.advancedFraudSignals === "boolean") {
          return params;
        }
        throw new Error(errorMessage);
      };
      var loadParams;
      var loadStripeCalled = false;
      var loadStripe2 = function loadStripe3() {
        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }
        loadStripeCalled = true;
        var startTime = Date.now();
        return loadScript(loadParams).then(function(maybeStripe) {
          return initStripe2(maybeStripe, args, startTime);
        });
      };
      loadStripe2.setLoadParameters = function(params) {
        if (loadStripeCalled && loadParams) {
          var validatedParams = validateLoadParams(params);
          var parameterKeys = Object.keys(validatedParams);
          var sameParameters = parameterKeys.reduce(function(previousValue, currentValue) {
            var _loadParams;
            return previousValue && params[currentValue] === ((_loadParams = loadParams) === null || _loadParams === void 0 ? void 0 : _loadParams[currentValue]);
          }, true);
          if (sameParameters) {
            return;
          }
        }
        if (loadStripeCalled) {
          throw new Error("You cannot change load parameters after calling loadStripe");
        }
        loadParams = validateLoadParams(params);
      };
      exports.loadStripe = loadStripe2;
    }
  });

  // node_modules/@stripe/stripe-js/pure/index.js
  var require_pure2 = __commonJS({
    "node_modules/@stripe/stripe-js/pure/index.js"(exports, module) {
      module.exports = require_pure();
    }
  });

  // src/scripts/packs/gateways/common.js
  var import_ujs = __toESM(require_rails_ujs());
  var providerName;
  var providerId;
  var form;
  var dedicatedCartProductId;
  var paymentPayloadCallback;
  var setPayButtonCallback;
  window.StoreConnect = window.StoreConnect || {};
  function basicInit(form_) {
    form = form_;
    providerName = form.dataset.provider;
    providerId = form.dataset.providerId;
    form.querySelectorAll("input[data-disable-with], button[data-disable-with]").forEach((button) => {
      const value = button.tagName === "INPUT" ? button.value : button.innerHTML;
      button.setAttribute("data-enable-with", value);
    });
  }
  function init(form_, paymentPayloadCallback_, setPayButtonCallback_) {
    basicInit(form_);
    paymentPayloadCallback = paymentPayloadCallback_;
    setPayButtonCallback = setPayButtonCallback_;
    dedicatedCartProductId = form.dataset.dedicatedCartProductId;
    form.addEventListener("submit", submitHandler, false);
  }
  function elementProviderId() {
    if (dedicatedCartProductId) {
      return `${providerId}Product${dedicatedCartProductId}`;
    }
    return providerId;
  }
  function errorElement2() {
    const errorElement3 = document.getElementById(`${providerName}PaymentError${elementProviderId()}`);
    if (!errorElement3) {
      console.warn(
        `Provider '${providerName}' does not have a #${providerName}PaymentError${elementProviderId()} div container`
      );
    }
    return errorElement3;
  }
  function formFieldElement(name) {
    return document.getElementById(`${name}__payment__${providerId}`);
  }
  function submitElement() {
    return document.getElementById(`${providerName}PaymentButton${providerId}`);
  }
  function setPayButton(enabled) {
    const payButton = submitElement();
    if (setPayButtonCallback) {
      setPayButtonCallback(payButton, enabled);
      return;
    }
    if (payButton) {
      const originalText = payButton.getAttribute("data-enable-with");
      setTimeout(() => {
        if (payButton.disabled == enabled) {
          payButton.disabled = !enabled;
          if (payButton.tagName === "INPUT") {
            payButton.value = originalText;
          } else {
            payButton.innerHTML = originalText;
          }
        }
      }, 100);
    }
  }
  function showError(error, options = {}) {
    const { replace = true, errorContainer: errorContainerOption } = options;
    setPayButton(true);
    let errorContainer;
    if (typeof errorContainerOption === "string") {
      errorContainer = document.getElementById(errorContainerOption);
    } else if (errorContainerOption instanceof Element) {
      errorContainer = errorContainerOption;
    } else {
      errorContainer = errorElement2();
    }
    if (errorContainer) {
      if (replace) {
        errorContainer.innerText = error;
      }
      if (error) {
        errorContainer.classList.remove("sc-hide");
      }
    } else {
      console.error(error);
    }
  }
  function hideError() {
    errorElement2()?.classList.add("sc-hide");
  }
  function submitHandler(e) {
    e.preventDefault();
    prepareSubmit(() => {
      if (paymentPayloadCallback) {
        paymentPayloadCallback(form);
      }
    });
  }
  function prepareSubmit(callback) {
    setPayButton(false);
    document.dispatchEvent(new CustomEvent("store-connect.payment-processing-start"));
    callback();
  }
  function submitData({ payload, handleSuccess }) {
    hideError();
    payload.payment = payload.payment || {};
    payload.payment.provider_id = providerId;
    payload.payment.method = providerName;
    extractAdditionalFormPayload(payload);
    const formMethod = form._method ? form._method.value : form.getAttribute("method");
    const checkoutUrl = payload.url ? payload.url : form.getAttribute("action");
    import_ujs.default.ajax({
      url: checkoutUrl,
      type: formMethod || payload.method,
      beforeSend(xhr, options) {
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        options.data = JSON.stringify(payload);
        return true;
      },
      success: function(response, _textStatus, _jqXHR) {
        if (response.sf) {
          if (response.paymentId) {
            window.parent.postMessage(
              { type: "payment_status", status: "success", message: response.paymentId },
              "*"
            );
          } else {
            window.parent.postMessage(
              { type: "payment_status", status: "error", message: response.error_message },
              "*"
            );
            refreshForm(response.error_message);
          }
        } else if (response.redirect_url) {
          window.location = response.redirect_url;
        } else if (response.error_message) {
          refreshForm(response.error_message);
        } else if (response.payment_response && handleSuccess) {
          handleSuccess(response.payment_response.action);
        }
      },
      error: function(_response, _textStatus, jqXHR) {
        if (jqXHR.status === 0) {
          return;
        }
        const error = document.querySelector("[data-general-error-message]");
        if (error) {
          showError(error.getAttribute("data-general-error-message"));
        }
      }
    });
  }
  function extractAdditionalFormPayload(payload) {
    payload = payload || {};
    const customerNotes = document.getElementById(`customer_notes__payment__${providerId}`);
    if (customerNotes && customerNotes.value.trim() !== "") {
      payload.customer_notes = customerNotes.value;
    }
    const assistedBy = document.getElementById(`assisted_by_user_id__payment__${providerId}`);
    if (assistedBy) {
      const assistedByOption = assistedBy.options[assistedBy.selectedIndex];
      if (assistedByOption && !assistedByOption.disabled) {
        payload.assisted_by_user_id = assistedBy.value;
      }
    }
    const formData = new FormData(form);
    formData.forEach((value, key) => {
      const matches = key.match(/answers\[(.*)\]\[answer\]/);
      if (matches) {
        if (!payload.answers) {
          payload.answers = {};
        }
        payload.answers[matches[1]] = { answer: value };
      }
    });
    return payload;
  }
  function refreshForm(error) {
    if (error) {
      showError(error);
    } else {
      hideError();
    }
    setPayButton(true);
  }

  // src/scripts/theme/store-path-url.js
  function store_path_url_default(url) {
    const storePath = document.querySelector('meta[name="sc-path"]');
    if (storePath) {
      const storePathContent = storePath.content;
      if (storePathContent) {
        return `/${storePathContent}${url}`;
      }
    }
    return url;
  }

  // src/scripts/packs/gateways/form.js
  function apiKey() {
    return form.dataset.apiKey;
  }
  function showWallets() {
    return Boolean(form.dataset.showWallets);
  }
  function totalPayable() {
    return form.dataset.totalPayable;
  }
  function currency() {
    return form.dataset.currencyCode;
  }

  // src/scripts/packs/gateways/wallets.js
  function onlyExpressCheckout() {
    return form.dataset.onlyExpressCheckout === "true";
  }
  function storeName() {
    return form.dataset.storeName;
  }
  function offerShipping() {
    return form.dataset.offerShipping === "true";
  }
  function allowedShippingCountries() {
    return JSON.parse(form.dataset.shippingCountries || "[]");
  }
  function formAuthentityToken() {
    return form.querySelector("input[name='authenticity_token']")?.value;
  }
  function walletsContainerId() {
    return `${providerName}WalletsContainer${elementProviderId()}`;
  }
  function walletsContainer() {
    const container = document.getElementById(walletsContainerId());
    if (!container) {
      showError(`Cannot setup wallets: no wallets container element found #${walletsContainerId()}`);
    }
    return container;
  }
  function walletsElementId() {
    return `${providerName}WalletsCheckout${elementProviderId()}`;
  }
  function walletsElementExists() {
    const container = document.getElementById(walletsContainerId());
    if (!container) {
      return false;
    }
    const element = container.querySelector('[data-ref="wallet-buttons"]');
    if (!element) {
      return false;
    }
    return true;
  }
  function walletsErrorElement() {
    let walletsErrorElement2 = walletsContainer().querySelector('[data-ref="wallet-error"]');
    if (!walletsErrorElement2) {
      showError(
        `Cannot setup wallets: no wallets error element found #${walletsContainerId()} [data-ref="wallet-error"]`
      );
      walletsErrorElement2 = errorElement();
    }
    return walletsErrorElement2;
  }
  function showWalletsError(error, options = {}) {
    options.errorContainer = walletsErrorElement();
    showError(error, options);
  }
  async function prepareProductCartWithAddToCartData(dedicatedCartProductId2) {
    if (!dedicatedCartProductId2) {
      return;
    }
    const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        authenticity_token: formAuthentityToken(),
        add_to_cart_form_data: addToCartFormData(),
        dedicated_cart_product_id: dedicatedCartProductId2
      })
    });
    if (!res.ok) {
      return await res.json();
    }
    const response = await res.json();
    return {
      amount: Math.round(response.cart.amount * 100)
    };
  }
  async function fetchShippingRates(address) {
    let params = {
      address,
      authenticity_token: formAuthentityToken()
    };
    if (dedicatedCartProductId) {
      params.dedicated_cart_product_id = dedicatedCartProductId;
      params.add_to_cart_form_data = addToCartFormData();
    }
    const res = await fetch(store_path_url_default(`/express_checkout/shipping_methods`), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(params)
    });
    if (!res.ok) {
      return await res.json();
    }
    const response = await res.json();
    let defaultShippingRate = response.shipping.rates.find((rate) => rate.default);
    const shippingRates = response.shipping.rates.sort((a, b) => {
      if (a.default) return -1;
      if (b.default) return 1;
      return a.amount - b.amount;
    }).slice(0, 9);
    if (!defaultShippingRate) {
      defaultShippingRate = shippingRates[0];
    }
    return {
      amount: Math.round(response.cart.amount * 100),
      defaultShippingRateId: defaultShippingRate.id,
      shippingRates: shippingRates.map((rate) => {
        return {
          id: rate.id,
          amount: Math.round(rate.amount * 100),
          displayName: rate.label,
          deliveryEstimate: rate.description
        };
      })
    };
  }
  async function setShippingRate(shippingRate) {
    const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        authenticity_token: formAuthentityToken(),
        dedicated_cart_product_id: dedicatedCartProductId,
        shipping_rate: shippingRate
      })
    });
    if (!res.ok) {
      return await res.json();
    }
    const response = await res.json();
    return {
      amount: Math.round(response.cart.amount * 100)
    };
  }
  function loadingShippingRates() {
    return [
      {
        id: "loading",
        displayName: "Loading...",
        amount: 0
      }
    ];
  }
  function addToCartFormData() {
    const form2 = document.querySelector(`form[data-cart-form="true"]`);
    const formData = new FormData(form2);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    return formValues;
  }
  function removeWalletsContainer() {
    const id = `${providerName}WalletsContainer${providerId}`;
    const walletsContainer2 = document.getElementById(id);
    if (walletsContainer2) {
      walletsContainer2.remove();
    }
  }

  // src/scripts/packs/gateways/stripe.js
  var import_pure = __toESM(require_pure2());

  // src/scripts/theme/utils/init.js
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.ObserverCallbacks = window.StoreConnect.ObserverCallbacks || [];
  document.addEventListener("DOMContentLoaded", establishObserver);
  function onDomChange(initCallback) {
    window.StoreConnect.ObserverCallbacks.push(initCallback);
  }
  function establishObserver() {
    if (window.StoreConnect.Observer) return;
    window.StoreConnect.Observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            runCallbacks(node, "mutation");
          }
        });
      });
    });
    window.StoreConnect.Observer.observe(document.body, { childList: true, subtree: true });
    runCallbacks(document, "initial load");
  }
  function runCallbacks(node, _context) {
    window.StoreConnect.ObserverCallbacks.forEach((callback) => callback(node));
  }

  // src/scripts/packs/gateways/stripe.js
  onDomChange((node) => {
    const forms = node.querySelectorAll('form[data-provider="Stripe"]');
    forms.forEach((form2) => {
      const providerId2 = form2.dataset.providerId;
      if (providerId2) {
        initStripe({ form: form2 });
      }
    });
  });
  function initStripe({ form: form2 }) {
    init(form2, stripeCreateToken);
    let dedicatedCartProductId2 = form2.dataset.dedicatedCartProductId;
    let cardNumberElement;
    let stripe;
    let elements;
    function paymentsUrl() {
      const payload = extractAdditionalFormPayload();
      const url = new URL(form2.dataset.paymentsUrl, window.location.origin);
      Object.entries(payload).forEach(([key, value]) => {
        url.searchParams.set(key, value);
      });
      return url.toString();
    }
    function intentsUrl() {
      return form2.dataset.intentsUrl;
    }
    function stripeCreateToken(_form) {
      stripe.createToken(cardNumberElement, { name: formFieldElement("card_name").value }).then(stripeResponseHandler);
    }
    function stripeResponseHandler(response) {
      if (response.error) {
        showError(response.error.message);
      } else {
        const token = response.token;
        const payload = {
          payment_source: {
            tok_id: token.id,
            last_digits: token.card.last4,
            month: token.card.exp_month,
            year: token.card.exp_year
          }
        };
        submitData({ payload });
      }
    }
    async function stripeInitializeElements() {
      if (formFieldElement("card_number")) {
        elements = stripe.elements();
        const root = document.querySelector(":root");
        const computedStyles = getComputedStyle(root);
        const fontSize = computedStyles.getPropertyValue("--sc-font-base").trim();
        const fontFamily = computedStyles.getPropertyValue("--sc-font-family").trim();
        const style = { base: { fontSize, fontFamily } };
        cardNumberElement = elements.create("cardNumber", {
          placeholder: formFieldElement("card_number").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe sc-expand" },
          style,
          disableLink: true
        });
        cardNumberElement.mount(`#${formFieldElement("card_number").id}`);
        const cardExpiryElement = elements.create("cardExpiry", {
          placeholder: formFieldElement("card_expiry").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe" },
          style
        });
        cardExpiryElement.mount(`#${formFieldElement("card_expiry").id}`);
        const cardCvcElement = elements.create("cardCvc", {
          placeholder: formFieldElement("card_verification").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe" },
          style
        });
        cardCvcElement.mount(`#${formFieldElement("card_verification").id}`);
      }
    }
    function handleWalletError({ error, event }) {
      if (error) {
        if (error.message) {
          showWalletsError(error.message);
        } else {
          showWalletsError(JSON.stringify(error));
        }
      }
      if (event) {
        event.reject();
      }
    }
    function stripeInitializeWallets() {
      if (!walletsElementExists()) {
        return;
      }
      const elements2 = stripe.elements({
        mode: "payment",
        amount: Math.round(totalPayable() * 100),
        currency: currency().toLowerCase()
      });
      const expressCheckoutElement = elements2.create("expressCheckout", {
        paymentMethods: {
          applePay: "auto",
          googlePay: "always",
          amazonPay: "auto",
          paypal: "auto",
          link: "auto"
        },
        buttonType: {
          applePay: "check-out",
          googlePay: "checkout"
        },
        paymentMethodOrder: ["applePay", "googlePay", "amazonPay", "link", "paypal"]
      });
      expressCheckoutElement.mount(`#${walletsElementId()}`);
      expressCheckoutElement.on("click", async (event) => {
        const options = {
          business: {
            name: storeName()
          }
        };
        if (onlyExpressCheckout()) {
          options.emailRequired = true;
          options.billingAddressRequired = true;
          if (offerShipping()) {
            options.phoneNumberRequired = true;
            options.shippingAddressRequired = true;
            options.allowedShippingCountries = allowedShippingCountries();
            options.shippingRates = loadingShippingRates();
          }
          if (dedicatedCartProductId2) {
            const { amount, error } = await prepareProductCartWithAddToCartData(dedicatedCartProductId2);
            if (error) {
              handleWalletError({ error, event });
              return;
            }
            elements2.update({ amount });
          }
        }
        event.resolve(options);
      });
      expressCheckoutElement.on("shippingaddresschange", async (event) => {
        const { address } = event;
        const { amount, shippingRates, error } = await fetchShippingRates(address);
        if (error) {
          handleWalletError({ error, event });
          return;
        }
        elements2.update({ amount });
        event.resolve({ shippingRates });
      });
      expressCheckoutElement.on("shippingratechange", async (event) => {
        const { amount, error } = await setShippingRate(event.shippingRate);
        if (error) {
          handleWalletError({ error, event });
          return;
        }
        elements2.update({ amount });
        event.resolve({});
      });
      expressCheckoutElement.on("confirm", async (event) => {
        if (onlyExpressCheckout()) {
          const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
            method: "PUT",
            headers: { "content-type": "application/json" },
            body: JSON.stringify({
              billing_details: event.billingDetails,
              shipping_address: event.shippingAddress,
              shipping_rate: event.shippingRate,
              // shouldn't have changed since last shippingratechange
              authenticity_token: formAuthentityToken(),
              dedicated_cart_product_id: dedicatedCartProductId2
            })
          });
          if (!res.ok) {
            const { error: error2 } = await res.json();
            if (error2) {
              handleWalletError({ error: error2 });
              event.paymentFailed({ reason: "fail" });
              return;
            }
          }
        }
        const clientSecret = await fetchClientSecret();
        const { error } = await stripe.confirmPayment({
          elements: elements2,
          clientSecret,
          confirmParams: {
            // https://docs.stripe.com/js/payment_intents/confirm_payment#confirm_payment_intent-options-confirmParams-return_url
            return_url: paymentsUrl()
          }
        });
        if (error) {
          handleWalletError({ error });
        } else {
        }
      });
    }
    async function fetchClientSecret() {
      const res = await fetch(intentsUrl(), {
        method: "POST",
        headers: {
          "content-type": "application/json"
        }
      });
      const { client_secret: clientSecret } = await res.json();
      return clientSecret;
    }
    async function initializeStripe() {
      stripe = await (0, import_pure.loadStripe)(apiKey());
      const tasks = [stripeInitializeElements()];
      if (showWallets()) {
        tasks.push(stripeInitializeWallets());
      }
      await Promise.allSettled(tasks);
      if (!showWallets()) {
        removeWalletsContainer();
      }
    }
    initializeStripe();
    if (window.StoreConnectTestMode === "enabled") {
      window.testStripeExpressCheckout = async ({ dedicatedProductId, shippingRateId }) => {
        handleWalletError({ error: { message: `put your left foot in` } });
        if (dedicatedProductId) {
          dedicatedCartProductId2 = dedicatedProductId;
          handleWalletError({
            error: { message: `using dedicated cart product id: ${dedicatedCartProductId2}` }
          });
          const { amount: amount2, error } = await prepareProductCartWithAddToCartData(dedicatedProductId);
          if (error) {
            handleWalletError({ error });
            return;
          }
        }
        document.querySelectorAll('form[action="/cart"]').forEach((form3) => {
          form3.removeAttribute("action");
        });
        const address = {
          line1: "123 Test St",
          country: "AU",
          state: "QLD",
          postal_code: "4000",
          city: "Milton"
        };
        handleWalletError({ error: { message: "starting..." } });
        const { shippingRates, error: error1 } = await fetchShippingRates(address);
        handleWalletError({ error: { message: "fetched rates" } });
        if (error1) {
          handleWalletError({ error: error1 });
          return;
        }
        const shippingRate = shippingRateId ? shippingRates.find((rate) => rate.id === shippingRateId) : shippingRates[0];
        const { amount, error: error2 } = await setShippingRate(shippingRate);
        if (error2) {
          handleWalletError({ error: error2 });
          return;
        }
        const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({
            authenticity_token: formAuthentityToken(),
            billing_details: {
              name: "Test User",
              email: "drnic@getstoreconnect.com",
              address
            },
            shipping_address: {
              name: "Test User",
              address
            },
            shipping_rate: shippingRate,
            dedicated_cart_product_id: dedicatedCartProductId2
          })
        });
        if (!res.ok) {
          const { error } = await res.json();
          handleWalletError({ error });
          return;
        }
        await window.testStripeWalletCallback();
      };
      window.testStripeWalletCallback = async () => {
        const clientSecret = await fetchClientSecret();
        const url = new URL(paymentsUrl());
        url.searchParams.set("payment_intent", clientSecret);
        window.location = url;
      };
    }
  }
})();
//# sourceMappingURL=stripe.B7MTVMCZ.js.map
