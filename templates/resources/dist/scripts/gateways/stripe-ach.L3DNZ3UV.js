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

  // node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js
  var require_rails_ujs = __commonJS({
    "node_modules/@rails/ujs/lib/assets/compiled/rails-ujs.js"(exports, module) {
      (function() {
        var context = this;
        (function() {
          (function() {
            this.Rails = {
              linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
              buttonClickSelector: {
                selector: "button[data-remote]:not([form]), button[data-confirm]:not([form])",
                exclude: "form button"
              },
              inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
              formSubmitSelector: "form:not([data-turbo=true])",
              formInputClickSelector: "form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
              formDisableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
              formEnableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
              fileInputSelector: "input[name][type=file]:not([disabled])",
              linkDisableSelector: "a[data-disable-with], a[data-disable]",
              buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]"
            };
          }).call(this);
        }).call(context);
        var Rails3 = context.Rails;
        (function() {
          (function() {
            var nonce;
            nonce = null;
            Rails3.loadCSPNonce = function() {
              var ref;
              return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
            };
            Rails3.cspNonce = function() {
              return nonce != null ? nonce : Rails3.loadCSPNonce();
            };
          }).call(this);
          (function() {
            var expando, m;
            m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
            Rails3.matches = function(element, selector) {
              if (selector.exclude != null) {
                return m.call(element, selector.selector) && !m.call(element, selector.exclude);
              } else {
                return m.call(element, selector);
              }
            };
            expando = "_ujsData";
            Rails3.getData = function(element, key) {
              var ref;
              return (ref = element[expando]) != null ? ref[key] : void 0;
            };
            Rails3.setData = function(element, key, value) {
              if (element[expando] == null) {
                element[expando] = {};
              }
              return element[expando][key] = value;
            };
            Rails3.$ = function(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector));
            };
          }).call(this);
          (function() {
            var $, csrfParam, csrfToken;
            $ = Rails3.$;
            csrfToken = Rails3.csrfToken = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-token]");
              return meta && meta.content;
            };
            csrfParam = Rails3.csrfParam = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-param]");
              return meta && meta.content;
            };
            Rails3.CSRFProtection = function(xhr) {
              var token;
              token = csrfToken();
              if (token != null) {
                return xhr.setRequestHeader("X-CSRF-Token", token);
              }
            };
            Rails3.refreshCSRFTokens = function() {
              var param, token;
              token = csrfToken();
              param = csrfParam();
              if (token != null && param != null) {
                return $('form input[name="' + param + '"]').forEach(function(input) {
                  return input.value = token;
                });
              }
            };
          }).call(this);
          (function() {
            var CustomEvent2, fire, matches, preventDefault;
            matches = Rails3.matches;
            CustomEvent2 = window.CustomEvent;
            if (typeof CustomEvent2 !== "function") {
              CustomEvent2 = function(event, params) {
                var evt;
                evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
              };
              CustomEvent2.prototype = window.Event.prototype;
              preventDefault = CustomEvent2.prototype.preventDefault;
              CustomEvent2.prototype.preventDefault = function() {
                var result;
                result = preventDefault.call(this);
                if (this.cancelable && !this.defaultPrevented) {
                  Object.defineProperty(this, "defaultPrevented", {
                    get: function() {
                      return true;
                    }
                  });
                }
                return result;
              };
            }
            fire = Rails3.fire = function(obj, name, data) {
              var event;
              event = new CustomEvent2(name, {
                bubbles: true,
                cancelable: true,
                detail: data
              });
              obj.dispatchEvent(event);
              return !event.defaultPrevented;
            };
            Rails3.stopEverything = function(e) {
              fire(e.target, "ujs:everythingStopped");
              e.preventDefault();
              e.stopPropagation();
              return e.stopImmediatePropagation();
            };
            Rails3.delegate = function(element, selector, eventType, handler) {
              return element.addEventListener(eventType, function(e) {
                var target;
                target = e.target;
                while (!(!(target instanceof Element) || matches(target, selector))) {
                  target = target.parentNode;
                }
                if (target instanceof Element && handler.call(target, e) === false) {
                  e.preventDefault();
                  return e.stopPropagation();
                }
              });
            };
          }).call(this);
          (function() {
            var AcceptHeaders, CSRFProtection, createXHR, cspNonce, fire, prepareOptions, processResponse;
            cspNonce = Rails3.cspNonce, CSRFProtection = Rails3.CSRFProtection, fire = Rails3.fire;
            AcceptHeaders = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            };
            Rails3.ajax = function(options) {
              var xhr;
              options = prepareOptions(options);
              xhr = createXHR(options, function() {
                var ref, response;
                response = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader("Content-Type"));
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
              if (options.beforeSend != null && !options.beforeSend(xhr, options)) {
                return false;
              }
              if (xhr.readyState === XMLHttpRequest.OPENED) {
                return xhr.send(options.data);
              }
            };
            prepareOptions = function(options) {
              options.url = options.url || location.href;
              options.type = options.type.toUpperCase();
              if (options.type === "GET" && options.data) {
                if (options.url.indexOf("?") < 0) {
                  options.url += "?" + options.data;
                } else {
                  options.url += "&" + options.data;
                }
              }
              if (AcceptHeaders[options.dataType] == null) {
                options.dataType = "*";
              }
              options.accept = AcceptHeaders[options.dataType];
              if (options.dataType !== "*") {
                options.accept += ", */*; q=0.01";
              }
              return options;
            };
            createXHR = function(options, done) {
              var xhr;
              xhr = new XMLHttpRequest();
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
            processResponse = function(response, type) {
              var parser, script;
              if (typeof response === "string" && typeof type === "string") {
                if (type.match(/\bjson\b/)) {
                  try {
                    response = JSON.parse(response);
                  } catch (error) {
                  }
                } else if (type.match(/\b(?:java|ecma)script\b/)) {
                  script = document.createElement("script");
                  script.setAttribute("nonce", cspNonce());
                  script.text = response;
                  document.head.appendChild(script).parentNode.removeChild(script);
                } else if (type.match(/\b(xml|html|svg)\b/)) {
                  parser = new DOMParser();
                  type = type.replace(/;.+/, "");
                  try {
                    response = parser.parseFromString(response, type);
                  } catch (error) {
                  }
                }
              }
              return response;
            };
            Rails3.href = function(element) {
              return element.href;
            };
            Rails3.isCrossDomain = function(url) {
              var e, originAnchor, urlAnchor;
              originAnchor = document.createElement("a");
              originAnchor.href = location.href;
              urlAnchor = document.createElement("a");
              try {
                urlAnchor.href = url;
                return !((!urlAnchor.protocol || urlAnchor.protocol === ":") && !urlAnchor.host || originAnchor.protocol + "//" + originAnchor.host === urlAnchor.protocol + "//" + urlAnchor.host);
              } catch (error) {
                e = error;
                return true;
              }
            };
          }).call(this);
          (function() {
            var matches, toArray;
            matches = Rails3.matches;
            toArray = function(e) {
              return Array.prototype.slice.call(e);
            };
            Rails3.serializeElement = function(element, additionalParam) {
              var inputs, params;
              inputs = [element];
              if (matches(element, "form")) {
                inputs = toArray(element.elements);
              }
              params = [];
              inputs.forEach(function(input) {
                if (!input.name || input.disabled) {
                  return;
                }
                if (matches(input, "fieldset[disabled] *")) {
                  return;
                }
                if (matches(input, "select")) {
                  return toArray(input.options).forEach(function(option) {
                    if (option.selected) {
                      return params.push({
                        name: input.name,
                        value: option.value
                      });
                    }
                  });
                } else if (input.checked || ["radio", "checkbox", "submit"].indexOf(input.type) === -1) {
                  return params.push({
                    name: input.name,
                    value: input.value
                  });
                }
              });
              if (additionalParam) {
                params.push(additionalParam);
              }
              return params.map(function(param) {
                if (param.name != null) {
                  return encodeURIComponent(param.name) + "=" + encodeURIComponent(param.value);
                } else {
                  return param;
                }
              }).join("&");
            };
            Rails3.formElements = function(form, selector) {
              if (matches(form, "form")) {
                return toArray(form.elements).filter(function(el) {
                  return matches(el, selector);
                });
              } else {
                return toArray(form.querySelectorAll(selector));
              }
            };
          }).call(this);
          (function() {
            var allowAction, fire, stopEverything;
            fire = Rails3.fire, stopEverything = Rails3.stopEverything;
            Rails3.handleConfirm = function(e) {
              if (!allowAction(this)) {
                return stopEverything(e);
              }
            };
            Rails3.confirm = function(message, element) {
              return confirm(message);
            };
            allowAction = function(element) {
              var answer, callback, message;
              message = element.getAttribute("data-confirm");
              if (!message) {
                return true;
              }
              answer = false;
              if (fire(element, "confirm")) {
                try {
                  answer = Rails3.confirm(message, element);
                } catch (error) {
                }
                callback = fire(element, "confirm:complete", [answer]);
              }
              return answer && callback;
            };
          }).call(this);
          (function() {
            var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
            matches = Rails3.matches, getData = Rails3.getData, setData = Rails3.setData, stopEverything = Rails3.stopEverything, formElements = Rails3.formElements;
            Rails3.handleDisabledElement = function(e) {
              var element;
              element = this;
              if (element.disabled) {
                return stopEverything(e);
              }
            };
            Rails3.enableElement = function(e) {
              var element;
              if (e instanceof Event) {
                if (isXhrRedirect(e)) {
                  return;
                }
                element = e.target;
              } else {
                element = e;
              }
              if (matches(element, Rails3.linkDisableSelector)) {
                return enableLinkElement(element);
              } else if (matches(element, Rails3.buttonDisableSelector) || matches(element, Rails3.formEnableSelector)) {
                return enableFormElement(element);
              } else if (matches(element, Rails3.formSubmitSelector)) {
                return enableFormElements(element);
              }
            };
            Rails3.disableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails3.linkDisableSelector)) {
                return disableLinkElement(element);
              } else if (matches(element, Rails3.buttonDisableSelector) || matches(element, Rails3.formDisableSelector)) {
                return disableFormElement(element);
              } else if (matches(element, Rails3.formSubmitSelector)) {
                return disableFormElements(element);
              }
            };
            disableLinkElement = function(element) {
              var replacement;
              if (getData(element, "ujs:disabled")) {
                return;
              }
              replacement = element.getAttribute("data-disable-with");
              if (replacement != null) {
                setData(element, "ujs:enable-with", element.innerHTML);
                element.innerHTML = replacement;
              }
              element.addEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", true);
            };
            enableLinkElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
              if (originalText != null) {
                element.innerHTML = originalText;
                setData(element, "ujs:enable-with", null);
              }
              element.removeEventListener("click", stopEverything);
              return setData(element, "ujs:disabled", null);
            };
            disableFormElements = function(form) {
              return formElements(form, Rails3.formDisableSelector).forEach(disableFormElement);
            };
            disableFormElement = function(element) {
              var replacement;
              if (getData(element, "ujs:disabled")) {
                return;
              }
              replacement = element.getAttribute("data-disable-with");
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
            enableFormElements = function(form) {
              return formElements(form, Rails3.formEnableSelector).forEach(enableFormElement);
            };
            enableFormElement = function(element) {
              var originalText;
              originalText = getData(element, "ujs:enable-with");
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
            isXhrRedirect = function(event) {
              var ref, xhr;
              xhr = (ref = event.detail) != null ? ref[0] : void 0;
              return (xhr != null ? xhr.getResponseHeader("X-Xhr-Redirect") : void 0) != null;
            };
          }).call(this);
          (function() {
            var stopEverything;
            stopEverything = Rails3.stopEverything;
            Rails3.handleMethod = function(e) {
              var csrfParam, csrfToken, form, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails3.href(link);
              csrfToken = Rails3.csrfToken();
              csrfParam = Rails3.csrfParam();
              form = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails3.isCrossDomain(href)) {
                formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
              }
              formContent += '<input type="submit" />';
              form.method = "post";
              form.action = href;
              form.target = link.target;
              form.innerHTML = formContent;
              form.style.display = "none";
              document.body.appendChild(form);
              form.querySelector('[type="submit"]').click();
              return stopEverything(e);
            };
          }).call(this);
          (function() {
            var ajax, fire, getData, isCrossDomain, isRemote, matches, serializeElement, setData, stopEverything, slice = [].slice;
            matches = Rails3.matches, getData = Rails3.getData, setData = Rails3.setData, fire = Rails3.fire, stopEverything = Rails3.stopEverything, ajax = Rails3.ajax, isCrossDomain = Rails3.isCrossDomain, serializeElement = Rails3.serializeElement;
            isRemote = function(element) {
              var value;
              value = element.getAttribute("data-remote");
              return value != null && value !== "false";
            };
            Rails3.handleRemote = function(e) {
              var button, data, dataType, element, method, url, withCredentials;
              element = this;
              if (!isRemote(element)) {
                return true;
              }
              if (!fire(element, "ajax:before")) {
                fire(element, "ajax:stopped");
                return false;
              }
              withCredentials = element.getAttribute("data-with-credentials");
              dataType = element.getAttribute("data-type") || "script";
              if (matches(element, Rails3.formSubmitSelector)) {
                button = getData(element, "ujs:submit-button");
                method = getData(element, "ujs:submit-button-formmethod") || element.method;
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
              } else if (matches(element, Rails3.buttonClickSelector) || matches(element, Rails3.inputChangeSelector)) {
                method = element.getAttribute("data-method");
                url = element.getAttribute("data-url");
                data = serializeElement(element, element.getAttribute("data-params"));
              } else {
                method = element.getAttribute("data-method");
                url = Rails3.href(element);
                data = element.getAttribute("data-params");
              }
              ajax({
                type: method || "GET",
                url,
                data,
                dataType,
                beforeSend: function(xhr, options) {
                  if (fire(element, "ajax:beforeSend", [xhr, options])) {
                    return fire(element, "ajax:send", [xhr]);
                  } else {
                    fire(element, "ajax:stopped");
                    return false;
                  }
                },
                success: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:success", args);
                },
                error: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:error", args);
                },
                complete: function() {
                  var args;
                  args = 1 <= arguments.length ? slice.call(arguments, 0) : [];
                  return fire(element, "ajax:complete", args);
                },
                crossDomain: isCrossDomain(url),
                withCredentials: withCredentials != null && withCredentials !== "false"
              });
              return stopEverything(e);
            };
            Rails3.formSubmitButtonClick = function(e) {
              var button, form;
              button = this;
              form = button.form;
              if (!form) {
                return;
              }
              if (button.name) {
                setData(form, "ujs:submit-button", {
                  name: button.name,
                  value: button.value
                });
              }
              setData(form, "ujs:formnovalidate-button", button.formNoValidate);
              setData(form, "ujs:submit-button-formaction", button.getAttribute("formaction"));
              return setData(form, "ujs:submit-button-formmethod", button.getAttribute("formmethod"));
            };
            Rails3.preventInsignificantClick = function(e) {
              var data, insignificantMetaClick, link, metaClick, method, nonPrimaryMouseClick;
              link = this;
              method = (link.getAttribute("data-method") || "GET").toUpperCase();
              data = link.getAttribute("data-params");
              metaClick = e.metaKey || e.ctrlKey;
              insignificantMetaClick = metaClick && method === "GET" && !data;
              nonPrimaryMouseClick = e.button != null && e.button !== 0;
              if (nonPrimaryMouseClick || insignificantMetaClick) {
                return e.stopImmediatePropagation();
              }
            };
          }).call(this);
          (function() {
            var $, CSRFProtection, delegate, disableElement, enableElement, fire, formSubmitButtonClick, getData, handleConfirm, handleDisabledElement, handleMethod, handleRemote, loadCSPNonce, preventInsignificantClick, refreshCSRFTokens;
            fire = Rails3.fire, delegate = Rails3.delegate, getData = Rails3.getData, $ = Rails3.$, refreshCSRFTokens = Rails3.refreshCSRFTokens, CSRFProtection = Rails3.CSRFProtection, loadCSPNonce = Rails3.loadCSPNonce, enableElement = Rails3.enableElement, disableElement = Rails3.disableElement, handleDisabledElement = Rails3.handleDisabledElement, handleConfirm = Rails3.handleConfirm, preventInsignificantClick = Rails3.preventInsignificantClick, handleRemote = Rails3.handleRemote, formSubmitButtonClick = Rails3.formSubmitButtonClick, handleMethod = Rails3.handleMethod;
            if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
              if (jQuery.rails) {
                throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
              }
              jQuery.rails = Rails3;
              jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
                if (!options.crossDomain) {
                  return CSRFProtection(xhr);
                }
              });
            }
            Rails3.start = function() {
              if (window._rails_loaded) {
                throw new Error("rails-ujs has already been loaded!");
              }
              window.addEventListener("pageshow", function() {
                $(Rails3.formEnableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
                return $(Rails3.linkDisableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
              });
              delegate(document, Rails3.linkDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails3.linkDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails3.buttonDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails3.buttonDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails3.linkClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails3.linkClickSelector, "click", handleDisabledElement);
              delegate(document, Rails3.linkClickSelector, "click", handleConfirm);
              delegate(document, Rails3.linkClickSelector, "click", disableElement);
              delegate(document, Rails3.linkClickSelector, "click", handleRemote);
              delegate(document, Rails3.linkClickSelector, "click", handleMethod);
              delegate(document, Rails3.buttonClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails3.buttonClickSelector, "click", handleDisabledElement);
              delegate(document, Rails3.buttonClickSelector, "click", handleConfirm);
              delegate(document, Rails3.buttonClickSelector, "click", disableElement);
              delegate(document, Rails3.buttonClickSelector, "click", handleRemote);
              delegate(document, Rails3.inputChangeSelector, "change", handleDisabledElement);
              delegate(document, Rails3.inputChangeSelector, "change", handleConfirm);
              delegate(document, Rails3.inputChangeSelector, "change", handleRemote);
              delegate(document, Rails3.formSubmitSelector, "submit", handleDisabledElement);
              delegate(document, Rails3.formSubmitSelector, "submit", handleConfirm);
              delegate(document, Rails3.formSubmitSelector, "submit", handleRemote);
              delegate(document, Rails3.formSubmitSelector, "submit", function(e) {
                return setTimeout(function() {
                  return disableElement(e);
                }, 13);
              });
              delegate(document, Rails3.formSubmitSelector, "ajax:send", disableElement);
              delegate(document, Rails3.formSubmitSelector, "ajax:complete", enableElement);
              delegate(document, Rails3.formInputClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails3.formInputClickSelector, "click", handleDisabledElement);
              delegate(document, Rails3.formInputClickSelector, "click", handleConfirm);
              delegate(document, Rails3.formInputClickSelector, "click", formSubmitButtonClick);
              document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
              document.addEventListener("DOMContentLoaded", loadCSPNonce);
              return window._rails_loaded = true;
            };
            if (window.Rails === Rails3 && fire(document, "rails:attachBindings")) {
              Rails3.start();
            }
          }).call(this);
        }).call(this);
        if (typeof module === "object" && module.exports) {
          module.exports = Rails3;
        } else if (typeof define === "function" && define.amd) {
          define(Rails3);
        }
      }).call(exports);
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
      var initStripe = function initStripe2(maybeStripe, args, startTime) {
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
          return initStripe(maybeStripe, args, startTime);
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

  // src/scripts/packs/gateways/stripe-ach.js
  var import_ujs2 = __toESM(require_rails_ujs());

  // src/scripts/packs/gateways/common.js
  var import_ujs = __toESM(require_rails_ujs());
  var providerName;
  var providerId;
  var dedicatedCartProductId;
  var paymentPayloadCallback;
  var setPayButtonCallback;
  window.StoreConnect = window.StoreConnect || {};
  function init(providerName_, providerId_, paymentPayloadCallback_, setPayButtonCallback_, dedicatedCartProductId_) {
    providerName = providerName_;
    providerId = providerId_;
    paymentPayloadCallback = paymentPayloadCallback_;
    setPayButtonCallback = setPayButtonCallback_;
    dedicatedCartProductId = dedicatedCartProductId_;
    formElement().addEventListener("submit", submitHandler, false);
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
  function formElement() {
    return document.getElementById(`${providerName}PaymentForm${elementProviderId()}`);
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
      if (enabled) {
        import_ujs.default.enableElement(payButton);
        setTimeout(() => {
          import_ujs.default.enableElement(payButton);
        }, 500);
      } else {
        import_ujs.default.disableElement(payButton);
      }
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
        paymentPayloadCallback(formElement());
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
    const form = formElement();
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

  // src/scripts/packs/gateways/form.js
  function apiKey() {
    const element = formElement();
    return element ? element.dataset.apiKey : null;
  }

  // src/scripts/packs/gateways/stripe-ach.js
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

  // src/scripts/packs/gateways/stripe-ach.js
  onDomChange((node) => {
    const forms = node.querySelectorAll('form[data-provider="StripeAch"]');
    forms.forEach((form) => {
      const providerId2 = form.dataset.providerId;
      if (providerId2) {
        initStripeAch({ form, providerId: providerId2 });
      }
    });
  });
  function initStripeAch({ form, providerId: providerId2 }) {
    init("StripeAch", providerId2, stripeCreatePaymentIntent);
    let stripe;
    function collectBankAccountForMicrodeposit(response) {
      const paymentIntentSecret = response.payment_intent;
      stripe.confirmUsBankAccountPayment(paymentIntentSecret, {
        payment_method: {
          billing_details: {
            name: formFieldElement("ach_account_name").value,
            email: formFieldElement("ach_email").value
          },
          us_bank_account: {
            account_number: formFieldElement("ach_account_number").value,
            routing_number: formFieldElement("ach_routing_number").value,
            account_holder_type: formFieldElement("ach_account_holder_type").value
          }
        }
      }).then(({ paymentIntent, error }) => {
        if (error) {
          showError(error.message);
        } else {
          const payload = {
            payment_source: {
              tok_id: paymentIntent.id
            }
          };
          submitData({ payload });
        }
      });
    }
    function stripeCreatePaymentIntent(form2) {
      let data = {
        payment: {
          provider_id: providerId2,
          method: "StripeAch"
        },
        payment_details: {
          name: formFieldElement("ach_account_name").value,
          email: formFieldElement("ach_email").value,
          account_number: formFieldElement("ach_account_number").value,
          routing_number: formFieldElement("ach_routing_number").value,
          account_holder_type: formFieldElement("ach_account_holder_type").value,
          terms: formFieldElement("ach_terms").checked
        }
      };
      const url = `${form2.getAttribute("action")}/ach`;
      import_ujs2.default.ajax({
        url,
        type: "post",
        beforeSend(xhr, options) {
          xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
          options.data = JSON.stringify(data);
          return true;
        },
        success: function(response, _textStatus, _jqXHR) {
          if (response.redirect_url) {
            window.location = response.redirect_url;
          } else if (response.error_message) {
            refreshForm(response.error_message);
          } else {
            collectBankAccountForMicrodeposit(response);
          }
        },
        error: function(_response, _textStatus, jqXHR) {
          if (jqXHR.status == 0) {
            return;
          }
          const error = document.querySelector("[data-general-error-message]").getAttribute("data-general-error-message");
          showError(error);
        }
      });
    }
    async function initializeStripe() {
      stripe = await (0, import_pure.loadStripe)(apiKey());
    }
    initializeStripe();
  }
})();
//# sourceMappingURL=stripe-ach.L3DNZ3UV.js.map
