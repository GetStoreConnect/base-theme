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
        var Rails2 = context.Rails;
        (function() {
          (function() {
            var nonce;
            nonce = null;
            Rails2.loadCSPNonce = function() {
              var ref;
              return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
            };
            Rails2.cspNonce = function() {
              return nonce != null ? nonce : Rails2.loadCSPNonce();
            };
          }).call(this);
          (function() {
            var expando, m;
            m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
            Rails2.matches = function(element, selector) {
              if (selector.exclude != null) {
                return m.call(element, selector.selector) && !m.call(element, selector.exclude);
              } else {
                return m.call(element, selector);
              }
            };
            expando = "_ujsData";
            Rails2.getData = function(element, key) {
              var ref;
              return (ref = element[expando]) != null ? ref[key] : void 0;
            };
            Rails2.setData = function(element, key, value) {
              if (element[expando] == null) {
                element[expando] = {};
              }
              return element[expando][key] = value;
            };
            Rails2.$ = function(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector));
            };
          }).call(this);
          (function() {
            var $, csrfParam, csrfToken;
            $ = Rails2.$;
            csrfToken = Rails2.csrfToken = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-token]");
              return meta && meta.content;
            };
            csrfParam = Rails2.csrfParam = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-param]");
              return meta && meta.content;
            };
            Rails2.CSRFProtection = function(xhr) {
              var token;
              token = csrfToken();
              if (token != null) {
                return xhr.setRequestHeader("X-CSRF-Token", token);
              }
            };
            Rails2.refreshCSRFTokens = function() {
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
            matches = Rails2.matches;
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
            fire = Rails2.fire = function(obj, name, data) {
              var event;
              event = new CustomEvent2(name, {
                bubbles: true,
                cancelable: true,
                detail: data
              });
              obj.dispatchEvent(event);
              return !event.defaultPrevented;
            };
            Rails2.stopEverything = function(e) {
              fire(e.target, "ujs:everythingStopped");
              e.preventDefault();
              e.stopPropagation();
              return e.stopImmediatePropagation();
            };
            Rails2.delegate = function(element, selector, eventType, handler) {
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
            cspNonce = Rails2.cspNonce, CSRFProtection = Rails2.CSRFProtection, fire = Rails2.fire;
            AcceptHeaders = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            };
            Rails2.ajax = function(options) {
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
            Rails2.href = function(element) {
              return element.href;
            };
            Rails2.isCrossDomain = function(url) {
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
            matches = Rails2.matches;
            toArray = function(e) {
              return Array.prototype.slice.call(e);
            };
            Rails2.serializeElement = function(element, additionalParam) {
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
            Rails2.formElements = function(form, selector) {
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
            fire = Rails2.fire, stopEverything = Rails2.stopEverything;
            Rails2.handleConfirm = function(e) {
              if (!allowAction(this)) {
                return stopEverything(e);
              }
            };
            Rails2.confirm = function(message, element) {
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
                  answer = Rails2.confirm(message, element);
                } catch (error) {
                }
                callback = fire(element, "confirm:complete", [answer]);
              }
              return answer && callback;
            };
          }).call(this);
          (function() {
            var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, stopEverything = Rails2.stopEverything, formElements = Rails2.formElements;
            Rails2.handleDisabledElement = function(e) {
              var element;
              element = this;
              if (element.disabled) {
                return stopEverything(e);
              }
            };
            Rails2.enableElement = function(e) {
              var element;
              if (e instanceof Event) {
                if (isXhrRedirect(e)) {
                  return;
                }
                element = e.target;
              } else {
                element = e;
              }
              if (matches(element, Rails2.linkDisableSelector)) {
                return enableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formEnableSelector)) {
                return enableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
                return enableFormElements(element);
              }
            };
            Rails2.disableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails2.linkDisableSelector)) {
                return disableLinkElement(element);
              } else if (matches(element, Rails2.buttonDisableSelector) || matches(element, Rails2.formDisableSelector)) {
                return disableFormElement(element);
              } else if (matches(element, Rails2.formSubmitSelector)) {
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
              return formElements(form, Rails2.formDisableSelector).forEach(disableFormElement);
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
              return formElements(form, Rails2.formEnableSelector).forEach(enableFormElement);
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
            stopEverything = Rails2.stopEverything;
            Rails2.handleMethod = function(e) {
              var csrfParam, csrfToken, form, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails2.href(link);
              csrfToken = Rails2.csrfToken();
              csrfParam = Rails2.csrfParam();
              form = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails2.isCrossDomain(href)) {
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
            matches = Rails2.matches, getData = Rails2.getData, setData = Rails2.setData, fire = Rails2.fire, stopEverything = Rails2.stopEverything, ajax = Rails2.ajax, isCrossDomain = Rails2.isCrossDomain, serializeElement = Rails2.serializeElement;
            isRemote = function(element) {
              var value;
              value = element.getAttribute("data-remote");
              return value != null && value !== "false";
            };
            Rails2.handleRemote = function(e) {
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
              if (matches(element, Rails2.formSubmitSelector)) {
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
              } else if (matches(element, Rails2.buttonClickSelector) || matches(element, Rails2.inputChangeSelector)) {
                method = element.getAttribute("data-method");
                url = element.getAttribute("data-url");
                data = serializeElement(element, element.getAttribute("data-params"));
              } else {
                method = element.getAttribute("data-method");
                url = Rails2.href(element);
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
            Rails2.formSubmitButtonClick = function(e) {
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
            Rails2.preventInsignificantClick = function(e) {
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
            fire = Rails2.fire, delegate = Rails2.delegate, getData = Rails2.getData, $ = Rails2.$, refreshCSRFTokens = Rails2.refreshCSRFTokens, CSRFProtection = Rails2.CSRFProtection, loadCSPNonce = Rails2.loadCSPNonce, enableElement = Rails2.enableElement, disableElement = Rails2.disableElement, handleDisabledElement = Rails2.handleDisabledElement, handleConfirm = Rails2.handleConfirm, preventInsignificantClick = Rails2.preventInsignificantClick, handleRemote = Rails2.handleRemote, formSubmitButtonClick = Rails2.formSubmitButtonClick, handleMethod = Rails2.handleMethod;
            if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
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
            Rails2.start = function() {
              if (window._rails_loaded) {
                throw new Error("rails-ujs has already been loaded!");
              }
              window.addEventListener("pageshow", function() {
                $(Rails2.formEnableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
                return $(Rails2.linkDisableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
              });
              delegate(document, Rails2.linkDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.linkDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.buttonDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails2.linkClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.linkClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.linkClickSelector, "click", handleConfirm);
              delegate(document, Rails2.linkClickSelector, "click", disableElement);
              delegate(document, Rails2.linkClickSelector, "click", handleRemote);
              delegate(document, Rails2.linkClickSelector, "click", handleMethod);
              delegate(document, Rails2.buttonClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.buttonClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleConfirm);
              delegate(document, Rails2.buttonClickSelector, "click", disableElement);
              delegate(document, Rails2.buttonClickSelector, "click", handleRemote);
              delegate(document, Rails2.inputChangeSelector, "change", handleDisabledElement);
              delegate(document, Rails2.inputChangeSelector, "change", handleConfirm);
              delegate(document, Rails2.inputChangeSelector, "change", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", handleDisabledElement);
              delegate(document, Rails2.formSubmitSelector, "submit", handleConfirm);
              delegate(document, Rails2.formSubmitSelector, "submit", handleRemote);
              delegate(document, Rails2.formSubmitSelector, "submit", function(e) {
                return setTimeout(function() {
                  return disableElement(e);
                }, 13);
              });
              delegate(document, Rails2.formSubmitSelector, "ajax:send", disableElement);
              delegate(document, Rails2.formSubmitSelector, "ajax:complete", enableElement);
              delegate(document, Rails2.formInputClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails2.formInputClickSelector, "click", handleDisabledElement);
              delegate(document, Rails2.formInputClickSelector, "click", handleConfirm);
              delegate(document, Rails2.formInputClickSelector, "click", formSubmitButtonClick);
              document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
              document.addEventListener("DOMContentLoaded", loadCSPNonce);
              return window._rails_loaded = true;
            };
            if (window.Rails === Rails2 && fire(document, "rails:attachBindings")) {
              Rails2.start();
            }
          }).call(this);
        }).call(this);
        if (typeof module === "object" && module.exports) {
          module.exports = Rails2;
        } else if (typeof define === "function" && define.amd) {
          define(Rails2);
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
        payButton.removeAttribute("data-loading");
        payButton.disabled = false;
        setTimeout(() => {
          payButton.disabled = false;
        }, 500);
      } else {
        payButton.setAttribute("data-loading", true);
        payButton.disabled = true;
      }
    }
  }
  function showError(error, replace = true) {
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
    setPayButton(true);
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
          window.parent.postMessage(
            { type: "payment_status", status: "success", message: response.paymentId },
            "*"
          );
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
  function showWallets() {
    const element = formElement();
    return element ? Boolean(element.dataset.showWallets) : false;
  }
  function totalPayable() {
    const element = formElement();
    return element ? element.dataset.totalPayable : null;
  }
  function currency() {
    const element = formElement();
    return element ? element.dataset.currencyCode : null;
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

  // src/scripts/packs/gateways/express-checkout.js
  function onlyExpressCheckout() {
    return formElement().dataset.onlyExpressCheckout === "true";
  }
  function storeName() {
    return formElement().dataset.storeName;
  }
  function offerShipping() {
    return formElement().dataset.offerShipping === "true";
  }
  function allowedShippingCountries() {
    return JSON.parse(formElement().dataset.shippingCountries || "[]");
  }
  function formAuthentityToken() {
    return formElement().querySelector("input[name='authenticity_token']")?.value;
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
    const res = await fetch(store_path_url_default(`/express_checkout/shipping_methods`), {
      method: "PUT",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        address,
        authenticity_token: formAuthentityToken(),
        dedicated_cart_product_id: dedicatedCartProductId
      })
    });
    if (!res.ok) {
      return await res.json();
    }
    const response = await res.json();
    const shippingRates = response.shipping.rates.sort((a, b) => a.amount - b.amount).slice(0, 9);
    return {
      amount: Math.round(response.cart.amount * 100),
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
    const form = document.querySelector(`form[data-cart-form="true"]`);
    const formData = new FormData(form);
    const formValues = {};
    formData.forEach((value, key) => {
      formValues[key] = value;
    });
    return formValues;
  }
  function removeWalletsContainer() {
    const id = `${providerName}WalletsContainer${providerId}`;
    const walletsContainer = document.getElementById(id);
    if (walletsContainer) {
      walletsContainer.remove();
    }
  }

  // src/scripts/packs/gateways/stripe.js
  var import_pure = __toESM(require_pure2());
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};
  window.StoreConnect.Gateways.Stripe = function({ providerId: providerId2, dedicatedCartProductId: dedicatedCartProductId2 }) {
    init("Stripe", providerId2, stripeCreateToken, null, dedicatedCartProductId2);
    let cardNumberElement;
    let stripe;
    let elements;
    function paymentsUrl() {
      return formElement().dataset.paymentsUrl;
    }
    function intentsUrl() {
      return formElement().dataset.intentsUrl;
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
        cardNumberElement = elements.create("cardNumber", {
          placeholder: formFieldElement("card_number").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe sc-expand" },
          style: {
            base: {
              fontSize,
              fontFamily
            }
          }
        });
        cardNumberElement.mount(`#${formFieldElement("card_number").id}`);
        const cardExpiryElement = elements.create("cardExpiry", {
          placeholder: formFieldElement("card_expiry").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe" },
          style: {
            base: {
              fontSize,
              fontFamily
            }
          }
        });
        cardExpiryElement.mount(`#${formFieldElement("card_expiry").id}`);
        const cardCvcElement = elements.create("cardCvc", {
          placeholder: formFieldElement("card_verification").dataset.placeholder,
          classes: { base: "SC-Field_input SC-Field-stripe" },
          style: {
            base: {
              fontSize,
              fontFamily
            }
          }
        });
        cardCvcElement.mount(`#${formFieldElement("card_verification").id}`);
      }
    }
    function handleWalletError({ error, event }) {
      if (error) {
        const id = `#StripeWalletsError${elementProviderId()}`;
        const messageContainer = document.querySelector(id);
        if (messageContainer) {
          if (error.message) {
            messageContainer.textContent = error.message;
          } else {
            messageContainer.textContent = JSON.stringify(error);
          }
        }
      }
      if (event) {
        event.reject();
      }
    }
    function stripeInitializeWallets() {
      const checkoutId = `StripeWalletsCheckout${elementProviderId()}`;
      if (!document.getElementById(checkoutId)) {
        return;
      }
      const elements2 = stripe.elements({
        mode: "payment",
        amount: Math.round(totalPayable() * 100),
        currency: currency().toLowerCase()
      });
      const expressCheckoutElement = elements2.create("expressCheckout", {
        paymentMethods: { applePay: "always", googlePay: "always" },
        buttonType: {
          applePay: "check-out",
          googlePay: "checkout"
        }
      });
      expressCheckoutElement.mount(`#${checkoutId}`);
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
      await stripeInitializeElements();
      if (showWallets()) {
        await stripeInitializeWallets();
      } else {
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
        document.querySelectorAll('form[action="/cart"]').forEach((form) => {
          form.removeAttribute("action");
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
  };
})();
//# sourceMappingURL=stripe.33SQASNT.js.map
