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
  function scriptsElement() {
    return document.getElementById(`${providerName}ScriptBlock${elementProviderId()}`);
  }
  function formFieldElement(name) {
    return document.getElementById(`${name}__payment__${providerId}`);
  }
  function submitElement() {
    return document.getElementById(`${providerName}PaymentButton${providerId}`);
  }
  async function loadScript({ url, onload, id }) {
    const script = document.createElement("script");
    script.src = url;
    if (onload) {
      script.onload = onload;
    }
    if (id) {
      script.id = id;
    }
    if (scriptsElement()) {
      scriptsElement().appendChild(script);
    } else {
      showError(`Missing #${providerName}ScriptBlock${elementProviderId()} div container`);
    }
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

  // src/scripts/packs/gateways/wallets.js
  function onlyExpressCheckout() {
    return form.dataset.onlyExpressCheckout === "true";
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
  function walletsElement() {
    const walletsElement2 = walletsContainer().querySelector('[data-ref="wallet-buttons"]');
    if (!walletsElement2) {
      showError(
        `Cannot setup wallets: no wallets container element found #${walletsContainerId()} [data-ref="wallet-buttons"]`
      );
    }
    return walletsElement2;
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

  // src/scripts/packs/gateways/form.js
  function isProduction() {
    if (!form) {
      console.error("No `form` object found");
      return false;
    }
    return form.dataset.apiMode === "production";
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
  function merchantCountryCode() {
    return form.dataset.merchantCountryCode;
  }
  function wrapOuterElement(args) {
    const { element, classNames } = args;
    const wrapper = document.createElement("div");
    if (classNames) {
      if (Array.isArray(classNames)) {
        wrapper.classList.add(...classNames);
      } else {
        wrapper.classList.add(classNames);
      }
    }
    wrapper.appendChild(element);
    return wrapper;
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

  // src/scripts/packs/gateways/google-pay.js
  async function initGooglePayForm({
    merchantId,
    merchantName,
    gateway,
    gatewayMerchantId,
    extractTokenCallback
  }) {
    let missingArguments = [];
    if (!merchantId) {
      missingArguments.push("merchantId");
    }
    if (!merchantName) {
      missingArguments.push("merchantName");
    }
    if (!gateway) {
      missingArguments.push("gateway");
    }
    if (!gatewayMerchantId) {
      missingArguments.push("gatewayMerchantId");
    }
    if (!extractTokenCallback || typeof extractTokenCallback !== "function") {
      missingArguments.push("extractTokenCallback");
    }
    if (missingArguments.length > 0) {
      console.error(`Google Pay missing arguments: ${missingArguments.join(", ")}`);
      return;
    }
    let paymentsClient = null;
    const baseRequest = {
      apiVersion: 2,
      apiVersionMinor: 0
    };
    const allowedCardNetworks = ["AMEX", "DISCOVER", "INTERAC", "JCB", "MASTERCARD", "VISA"];
    const allowedCardAuthMethods = ["PAN_ONLY", "CRYPTOGRAM_3DS"];
    const tokenizationSpecification = {
      type: "PAYMENT_GATEWAY",
      parameters: {
        gateway,
        gatewayMerchantId
      }
    };
    function baseTransactionInfo() {
      let transactionInfo = {
        totalPriceStatus: "FINAL",
        totalPriceLabel: "Total",
        currencyCode: currency()
      };
      if (merchantCountryCode()) {
        transactionInfo.countryCode = merchantCountryCode();
      }
      return transactionInfo;
    }
    function getGoogleTransactionInfo() {
      return Object.assign({}, baseTransactionInfo(), {
        totalPrice: totalPayable()
      });
    }
    const baseCardPaymentMethod = {
      type: "CARD",
      parameters: {
        allowedAuthMethods: allowedCardAuthMethods,
        allowedCardNetworks
      }
    };
    const cardPaymentMethod = Object.assign({}, baseCardPaymentMethod, {
      tokenizationSpecification
    });
    function getGoogleIsReadyToPayRequest() {
      return Object.assign({}, baseRequest, {
        allowedPaymentMethods: [baseCardPaymentMethod]
      });
    }
    function getGooglePaymentDataRequest() {
      const paymentDataRequest = Object.assign({}, baseRequest);
      paymentDataRequest.allowedPaymentMethods = [cardPaymentMethod];
      paymentDataRequest.transactionInfo = getGoogleTransactionInfo();
      paymentDataRequest.merchantInfo = { merchantId, merchantName };
      if (onlyExpressCheckout()) {
        paymentDataRequest.emailRequired = true;
        if (offerShipping()) {
          paymentDataRequest.callbackIntents = [
            "SHIPPING_ADDRESS",
            "SHIPPING_OPTION",
            "PAYMENT_AUTHORIZATION"
          ];
          paymentDataRequest.shippingAddressRequired = true;
          paymentDataRequest.shippingAddressParameters = shippingAddressParameters();
          paymentDataRequest.shippingOptionRequired = true;
        }
      }
      return paymentDataRequest;
    }
    function shippingAddressParameters() {
      return {
        phoneNumberRequired: true,
        allowedCountryCodes: allowedShippingCountries()
      };
    }
    function getGooglePaymentsClient() {
      if (paymentsClient === null) {
        paymentsClient = new google.payments.api.PaymentsClient({
          environment: isProduction() ? "PRODUCTION" : "TEST",
          paymentDataCallbacks: {
            onPaymentAuthorized,
            onPaymentDataChanged
          }
        });
      }
      return paymentsClient;
    }
    async function onPaymentAuthorized(paymentData) {
      const payload = {
        billing_details: {
          name: paymentData.shippingAddress.name,
          email: paymentData.email,
          phone: paymentData.shippingAddress.phoneNumber,
          address: {
            line1: paymentData.shippingAddress.address1,
            line2: paymentData.shippingAddress.address2,
            city: paymentData.shippingAddress.locality,
            state: paymentData.shippingAddress.administrativeArea,
            postal_code: paymentData.shippingAddress.postalCode,
            country: paymentData.shippingAddress.countryCode
          }
        },
        shipping_address: {
          name: paymentData.shippingAddress.name,
          address: {
            line1: paymentData.shippingAddress.address1,
            line2: paymentData.shippingAddress.address2,
            city: paymentData.shippingAddress.locality,
            state: paymentData.shippingAddress.administrativeArea,
            postal_code: paymentData.shippingAddress.postalCode,
            country: paymentData.shippingAddress.countryCode
          }
        },
        shipping_rate: paymentData.shippingOptionData,
        authenticity_token: formAuthentityToken(),
        dedicated_cart_product_id: dedicatedCartProductId
        // If dedicated product page; else null
      };
      const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
        method: "PUT",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(payload)
      });
      if (!res.ok) {
        const { error } = await res.json();
        if (error) {
          handleWalletError({ error });
          return {
            transactionState: "ERROR",
            error: {
              reason: "PAYMENT_DATA_INVALID",
              message: error.message,
              intent: "PAYMENT_AUTHORIZATION"
            }
          };
        }
      }
      return {
        transactionState: "SUCCESS"
      };
    }
    async function onPaymentDataChanged(intermediatePaymentData) {
      const callbackTrigger = intermediatePaymentData.callbackTrigger;
      switch (callbackTrigger) {
        case "INITIALIZE":
        case "SHIPPING_ADDRESS":
          return fetchShippingOptions(intermediatePaymentData.shippingAddress);
        case "SHIPPING_OPTION":
          return selectShippingOption(intermediatePaymentData.shippingOptionData);
      }
      return {};
    }
    async function fetchShippingOptions({ countryCode, postalCode, locality, administrativeArea }) {
      const shippingOptions = await fetchShippingRates({
        country: countryCode,
        postal_code: postalCode,
        city: locality,
        state: administrativeArea,
        street: ""
      });
      if (shippingOptions.error) {
        return {
          error: {
            message: shippingOptions.error.message,
            reason: "ERROR_FETCHING_SHIPPING_OPTIONS",
            intent: "SHIPPING_ADDRESS"
          }
        };
      }
      const response = await setShippingRate({ id: shippingOptions.defaultShippingRateId });
      const amount = response.amount;
      const priceFormatter = new Intl.NumberFormat("en", {
        style: "currency",
        currency: currency()
      });
      return {
        newTransactionInfo: Object.assign({}, baseTransactionInfo(), {
          totalPrice: (amount / 100).toFixed(2)
        }),
        newShippingOptionParameters: {
          defaultSelectedOptionId: shippingOptions.defaultShippingRateId,
          shippingOptions: shippingOptions.shippingRates.map((rate) => {
            let description = `FREE ${rate.deliveryEstimate}`;
            if (rate.amount > 0) {
              const price = priceFormatter.format(rate.amount / 100);
              description = `${price} ${rate.deliveryEstimate}`;
            }
            return {
              id: rate.id,
              label: rate.displayName,
              description
            };
          })
        }
      };
    }
    async function selectShippingOption({ id }) {
      const response = await setShippingRate({ id });
      if (response.error) {
        showError(response.error.message);
        return;
      }
      const amount = response.amount;
      return {
        newTransactionInfo: Object.assign({}, baseTransactionInfo(), {
          totalPrice: (amount / 100).toFixed(2)
        })
      };
    }
    function onGooglePayLoaded() {
      const paymentsClient2 = getGooglePaymentsClient();
      paymentsClient2.isReadyToPay(getGoogleIsReadyToPayRequest()).then(function(response) {
        if (response.result) {
          addGooglePayButton();
        }
      }).catch(function(err) {
        showError(err);
      });
    }
    function addGooglePayButton() {
      const walletsContainer2 = walletsElement();
      if (!walletsContainer2) {
        console.error("Cannot setup Google Pay button: no wallets container found");
        return;
      }
      const paymentsClient2 = getGooglePaymentsClient();
      const button = paymentsClient2.createButton({
        onClick: onGooglePaymentButtonClicked,
        buttonColor: "default",
        buttonSizeMode: "fill"
      });
      walletsContainer2.appendChild(wrapOuterElement({ element: button, classNames: "sc-grow" }));
    }
    function onGooglePaymentButtonClicked() {
      const paymentDataRequest = getGooglePaymentDataRequest();
      const paymentsClient2 = getGooglePaymentsClient();
      paymentsClient2.loadPaymentData(paymentDataRequest).then(function(paymentData) {
        processPayment(paymentData);
      }).catch(function(err) {
        console.error(err);
        if (err && err.statusCode === "CANCELED") {
          return;
        }
        showError(err);
      });
    }
    function processPayment(paymentData) {
      const payload = extractTokenCallback(paymentData);
      if (dedicatedCartProductId) {
        payload.dedicated_cart_product_id = dedicatedCartProductId;
      }
      submitData({ payload });
    }
    loadScript({
      url: "https://pay.google.com/gp/p/js/pay.js",
      onload: onGooglePayLoaded
    });
    if (window.StoreConnectTestMode === "enabled") {
      window.testGooglePayCallback = async () => {
        handleWalletError({ error: { message: `testGooglePayCallback: put your left foot in` } });
        const paymentData = {
          paymentMethodData: {
            tokenizationData: {
              token: JSON.stringify({ signature: "some-value" })
            },
            info: {
              cardNetwork: "VISA",
              cardDetails: "1111"
            }
          }
        };
        const payload = extractTokenCallback(paymentData);
        handleWalletError({ error: payload });
        submitData({ payload });
      };
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
  }

  // src/scripts/packs/gateways/apple-pay.js
  async function initApplePayForm({
    merchantId,
    merchantName,
    providerId: providerId2,
    extractTokenCallback
  }) {
    if (!window.ApplePaySession || !ApplePaySession.canMakePayments()) {
      console.log("Apple Pay is not available on this device/browser");
      return;
    }
    let missingArguments = [];
    if (!merchantId) {
      missingArguments.push("merchantId");
    }
    if (!merchantName) {
      missingArguments.push("merchantName");
    }
    if (!providerId2) {
      missingArguments.push("providerId");
    }
    if (!extractTokenCallback || typeof extractTokenCallback !== "function") {
      missingArguments.push("extractTokenCallback");
    }
    if (missingArguments.length > 0) {
      console.error(`Apple Pay missing arguments: ${missingArguments.join(", ")}`);
      return;
    }
    const applePayVersion = 3;
    const supportedNetworks = ["visa", "masterCard", "amex", "discover", "jcb"];
    const merchantCapabilities = ["supports3DS"];
    function createPaymentRequest() {
      const paymentRequest = {
        countryCode: merchantCountryCode() || "US",
        currencyCode: currency(),
        supportedNetworks,
        merchantCapabilities,
        total: {
          label: merchantName,
          amount: totalPayable(),
          type: "final"
        }
      };
      if (onlyExpressCheckout()) {
        if (offerShipping()) {
          paymentRequest.requiredShippingContactFields = ["name", "phone", "email", "postalAddress"];
          paymentRequest.shippingType = "shipping";
          const allowedCountries = allowedShippingCountries();
          if (allowedCountries && allowedCountries.length > 0) {
            paymentRequest.supportedCountries = allowedCountries;
          }
        }
      }
      return paymentRequest;
    }
    function onApplePayButtonClicked() {
      const paymentRequest = createPaymentRequest();
      const session = new ApplePaySession(applePayVersion, paymentRequest);
      session.onvalidatemerchant = async (event) => {
        try {
          const response = await fetch(store_path_url_default("/checkout/apple_pay_verifications"), {
            method: "POST",
            headers: {
              "Content-Type": "application/json"
            },
            body: JSON.stringify({
              provider_id: providerId2,
              authenticity_token: formAuthentityToken()
            })
          });
          if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || "Merchant validation failed");
          }
          const merchantSession = await response.json();
          session.completeMerchantValidation(merchantSession);
        } catch (error) {
          console.error("Apple Pay merchant validation error:", error);
          session.abort();
          showWalletsError(
            error.message || "Apple Pay setup failed. Please try another payment method."
          );
        }
      };
      session.onshippingcontactselected = async (event) => {
        if (!offerShipping()) {
          session.completeShippingContactSelection({
            status: ApplePaySession.STATUS_SUCCESS,
            newShippingMethods: [],
            newTotal: {
              label: merchantName,
              amount: totalPayable(),
              type: "final"
            }
          });
          return;
        }
        try {
          const shippingContact = event.shippingContact;
          const shippingOptions = await fetchShippingRates({
            country: shippingContact.countryCode,
            postal_code: shippingContact.postalCode,
            city: shippingContact.locality,
            state: shippingContact.administrativeArea,
            street: shippingContact.addressLines?.[0] || ""
          });
          if (shippingOptions.error) {
            session.completeShippingContactSelection({
              status: ApplePaySession.STATUS_INVALID_SHIPPING_POSTAL_ADDRESS,
              newShippingMethods: [],
              newTotal: {
                label: merchantName,
                amount: totalPayable()
              }
            });
            return;
          }
          const response = await setShippingRate({ id: shippingOptions.defaultShippingRateId });
          const amount = response.amount;
          const shippingMethods = shippingOptions.shippingRates.map((rate) => ({
            label: rate.displayName,
            amount: (rate.amount / 100).toFixed(2),
            detail: rate.deliveryEstimate,
            identifier: rate.id
          }));
          session.completeShippingContactSelection({
            status: ApplePaySession.STATUS_SUCCESS,
            newShippingMethods: shippingMethods,
            newTotal: {
              label: merchantName,
              amount: (amount / 100).toFixed(2)
            }
          });
        } catch (error) {
          console.error("Apple Pay shipping contact error:", error);
          session.completeShippingContactSelection({
            status: ApplePaySession.STATUS_FAILURE,
            newShippingMethods: [],
            newTotal: {
              label: merchantName,
              amount: totalPayable()
            }
          });
        }
      };
      session.onshippingmethodselected = async (event) => {
        try {
          const response = await setShippingRate({ id: event.shippingMethod.identifier });
          if (response.error) {
            throw new Error(response.error.message);
          }
          const amount = response.amount;
          session._selectedShippingMethodId = event.shippingMethod.identifier;
          session.completeShippingMethodSelection({
            status: ApplePaySession.STATUS_SUCCESS,
            newTotal: {
              label: merchantName,
              amount: (amount / 100).toFixed(2),
              type: "final"
            }
          });
        } catch (error) {
          console.error("Apple Pay shipping method error:", error);
          session.completeShippingMethodSelection({
            status: ApplePaySession.STATUS_FAILURE,
            newTotal: {
              label: merchantName,
              amount: totalPayable(),
              type: "final"
            }
          });
        }
      };
      session.onpaymentauthorized = async (event) => {
        try {
          const paymentData = event.payment;
          if (onlyExpressCheckout()) {
            if (!paymentData.shippingContact.emailAddress) {
              throw new Error("Email address is required but was not provided by Apple Pay");
            }
            const shipping_address = {
              name: paymentData.shippingContact.givenName + " " + paymentData.shippingContact.familyName,
              address: {
                line1: paymentData.shippingContact.addressLines?.[0],
                line2: paymentData.shippingContact.addressLines?.[1],
                city: paymentData.shippingContact.locality,
                state: paymentData.shippingContact.administrativeArea,
                postal_code: paymentData.shippingContact.postalCode,
                country: paymentData.shippingContact.countryCode
              }
            };
            const billing_details = {
              name: shipping_address.name,
              email: paymentData.shippingContact.emailAddress,
              phone: paymentData.shippingContact.phoneNumber,
              address: shipping_address.address
            };
            const payload2 = {
              billing_details,
              shipping_address,
              shipping_rate: { id: session._selectedShippingMethodId },
              authenticity_token: formAuthentityToken(),
              dedicated_cart_product_id: dedicatedCartProductId
            };
            const res = await fetch(store_path_url_default(`/express_checkout/carts`), {
              method: "PUT",
              headers: { "content-type": "application/json" },
              body: JSON.stringify(payload2)
            });
            if (!res.ok) {
              const { error } = await res.json();
              if (error) {
                handleWalletError({ error });
                session.completePayment(ApplePaySession.STATUS_FAILURE);
                return;
              }
            }
          }
          session.completePayment(ApplePaySession.STATUS_SUCCESS);
          const payload = extractTokenCallback(paymentData);
          if (dedicatedCartProductId) {
            payload.dedicated_cart_product_id = dedicatedCartProductId;
          }
          submitData({ payload });
        } catch (error) {
          console.error("Apple Pay payment authorization error:", error);
          session.completePayment(ApplePaySession.STATUS_FAILURE);
          handleWalletError({ error: { message: error.message } });
        }
      };
      session.oncancel = () => {
        console.log("Apple Pay cancelled by user");
      };
      session.begin();
    }
    function addApplePayButton() {
      const walletsContainer2 = walletsElement();
      if (!walletsContainer2) {
        console.error("Cannot setup Apple Pay button: no wallets container found");
        return;
      }
      const button = document.createElement("button");
      button.className = "apple-pay-button apple-pay-button-black";
      button.style.cssText = `
      -webkit-appearance: -apple-pay-button;
      -apple-pay-button-type: buy-now;
      -apple-pay-button-style: black;
      width: 100%;
      height: 40px;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      margin-bottom: 8px;
    `;
      button.addEventListener("click", onApplePayButtonClicked);
      walletsContainer2.appendChild(wrapOuterElement({ element: button, classNames: "sc-grow" }));
    }
    function checkApplePayAvailability() {
      if (ApplePaySession.applePayCapabilities) {
        ApplePaySession.applePayCapabilities(merchantId).then((canMakePayments) => {
          console.log("checkApplePayAvailability", merchantId, canMakePayments);
          if (canMakePayments) {
            addApplePayButton();
          }
        }).catch((error) => {
          console.error("Apple Pay availability check failed:", error);
        });
      } else {
        addApplePayButton();
      }
    }
    checkApplePayAvailability();
    if (window.StoreConnectTestMode === "enabled") {
      window.testApplePayCallback = async () => {
        handleWalletError({ error: { message: `testApplePayCallback: put your right foot in` } });
        const paymentData = {
          token: {
            paymentData: {
              data: "test-payment-data",
              signature: "test-signature",
              header: {
                ephemeralPublicKey: "test-key",
                publicKeyHash: "test-hash",
                transactionId: "test-transaction"
              }
            },
            paymentMethod: {
              displayName: "Visa \u2022\u2022\u2022\u2022 1234",
              network: "Visa",
              type: "debit"
            },
            transactionIdentifier: "test-transaction-id"
          }
        };
        const payload = extractTokenCallback(paymentData);
        handleWalletError({ error: payload });
        submitData({ payload });
      };
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
  }

  // src/scripts/packs/gateways/westpac-online-pay.js
  onDomChange((node) => {
    const forms = node.querySelectorAll('form[data-provider="WestpacOnlinePay"]');
    forms.forEach((form2) => {
      const providerId2 = form2.dataset.providerId;
      if (providerId2) {
        initWestpacOnlinePay({ form: form2 });
      }
    });
  });
  async function initWestpacOnlinePay({ form: form2 }) {
    init(form2, onSubmit);
    const encryptionKey = form2.dataset.secureCardCaptureKey;
    if (!encryptionKey) {
      console.error("Add WestpacOnlinePay api_options.secure_card_capture_key to payment provider.");
      return;
    }
    loadScript({
      url: form2.dataset.scriptUrl,
      onload: () => {
        setPayButton(true);
      }
    });
    const initTasks = [];
    if (showWallets() && walletsElementExists()) {
      initTasks.push(setupApplePay());
      initTasks.push(setupGooglePay());
    } else {
      removeWalletsContainer();
    }
    if (initTasks.length > 0) {
      await Promise.allSettled(initTasks);
    }
    async function onSubmit() {
      const cardDetails = {
        cardholderName: formFieldElement("card_name").value,
        cardNumber: formFieldElement("card_number").value.replace(/\s+/g, ""),
        expiryMonth: formFieldElement("card_month").value.padStart(2, "0"),
        expiryYear: formFieldElement("card_year").value.slice(-2),
        cvv: formFieldElement("card_verification").value
      };
      const cyphertext = await verifone.encryptCard(cardDetails, encryptionKey);
      const payload = {
        payment_source: {
          tok_id: cyphertext
        }
      };
      submitData({ payload });
    }
  }
  async function setupGooglePay() {
    initGooglePayForm({
      merchantId: form.dataset.googleMerchantId,
      merchantName: form.dataset.googleMerchantName,
      gateway: "verifone",
      gatewayMerchantId: form.dataset.merchantId,
      // Extract the google payment token into payload used by westpac_online_pay_service.rb
      extractTokenCallback: (paymentData) => {
        const paymentToken = paymentData.paymentMethodData.tokenizationData.token;
        const paymentTokenBase64 = btoa(paymentToken);
        return {
          payment_source: {
            wallet_payload: paymentTokenBase64,
            wallet_type: "GOOGLE_PAY",
            card_network: paymentData.paymentMethodData.info?.cardNetwork,
            card_last_four: paymentData.paymentMethodData.info?.cardDetails
          }
        };
      }
    });
  }
  async function setupApplePay() {
    const merchantId = form.dataset.appleMerchantId;
    if (!merchantId) {
      console.error("Configure api_options.apple_merchant_id to enable Apple Pay");
      return;
    }
    initApplePayForm({
      merchantId,
      merchantName: form.dataset.appleMerchantName || form.dataset.googleMerchantName,
      providerId: form.dataset.providerId,
      // Extract the apple payment token into payload used by westpac_online_pay_service.rb
      extractTokenCallback: (paymentData) => {
        const paymentToken = JSON.stringify(paymentData.token.paymentData);
        const paymentTokenBase64 = btoa(paymentToken);
        return {
          payment_source: {
            wallet_payload: paymentTokenBase64,
            wallet_type: "APPLE_PAY",
            card_network: paymentData.token.paymentMethod?.network,
            card_last_four: paymentData.token.paymentMethod?.displayName?.match(/\d{4}$/)?.[0]
          }
        };
      }
    });
  }
})();
//# sourceMappingURL=westpac-online-pay.QM4T64I5.js.map
