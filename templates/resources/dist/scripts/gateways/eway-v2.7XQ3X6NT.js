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
  }
  function init(form_, paymentPayloadCallback_, setPayButtonCallback_, dedicatedCartProductId_) {
    basicInit(form_);
    paymentPayloadCallback = paymentPayloadCallback_;
    setPayButtonCallback = setPayButtonCallback_;
    dedicatedCartProductId = dedicatedCartProductId_;
    form.addEventListener("submit", submitHandler, false);
    form.querySelectorAll("input[data-disable-with], button[data-disable-with]").forEach((button) => {
      const value = button.tagName === "INPUT" ? button.value : button.innerHTML;
      button.setAttribute("data-enable-with", value);
    });
  }
  function elementProviderId() {
    if (dedicatedCartProductId) {
      return `${providerId}Product${dedicatedCartProductId}`;
    }
    return providerId;
  }
  function errorElement() {
    return document.getElementById(`${providerName}PaymentError${elementProviderId()}`);
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
  function showError(error, replace = true) {
    setPayButton(true);
    const errorContainer = errorElement();
    if (errorContainer) {
      if (replace) {
        errorContainer.innerText = error;
      }
      if (error) {
        errorContainer.classList.remove("sc-hide");
      }
    } else {
      if (providerName) {
        console.warn(
          `Provider '${providerName}' does not have a #${providerName}PaymentError${providerId} div container`
        );
      } else {
        console.warn(`Run init(providerName, providerId) before calling showError(error)`);
      }
      console.error(error);
    }
  }
  function hideError() {
    errorElement()?.classList.add("sc-hide");
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
    const customerNotes = document.getElementById(`customer_notes__payment__${providerId}`);
    if (customerNotes) {
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
    payload.answers = {};
    formData.forEach((value, key) => {
      const matches = key.match(/answers\[(.*)\]\[answer\]/);
      if (matches) {
        payload.answers[matches[1]] = { answer: value };
      }
    });
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
  function refreshForm(error) {
    if (error) {
      showError(error);
    } else {
      hideError();
    }
    setPayButton(true);
  }

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

  // src/scripts/packs/gateways/eway-v2.js
  onDomChange((node) => {
    const forms = node.querySelectorAll('form[data-provider="EwayV2"]');
    forms.forEach((form2) => {
      const providerId2 = form2.dataset.providerId;
      if (providerId2) {
        initEwayV2({ form: form2 });
      }
    });
  });
  function initEwayV2({ form: form2 }) {
    init(form2, showEwayModal);
    const accessCode = form2.dataset.accessCode;
    function showEwayModal() {
      const sharedPaymentUrl = form2.dataset.sharedPaymentUrl;
      if (typeof eCrypt !== "undefined") {
        eCrypt.showModalPayment({ sharedPaymentUrl }, modalCallback);
      } else {
        console.error("eCrypt is not defined.");
      }
    }
    function modalCallback(result, transactionID, errors) {
      if (result === "Complete") {
        confirmPayment(transactionID);
      } else if (result === "Cancelled") {
        console.error("Payment was cancelled.");
        showError(errors);
        setPayButton(true);
      } else if (result === "Error") {
        console.error(`Payment Error: ${errors}`);
        showError(errors);
        setPayButton(true);
      }
    }
    function confirmPayment(transactionID) {
      const payload = {
        payment_source: {
          tok_id: accessCode
        }
      };
      submitData({ payload });
    }
  }
})();
//# sourceMappingURL=eway-v2.7XQ3X6NT.js.map
