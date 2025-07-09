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
            Rails3.formElements = function(form2, selector) {
              if (matches(form2, "form")) {
                return toArray(form2.elements).filter(function(el) {
                  return matches(el, selector);
                });
              } else {
                return toArray(form2.querySelectorAll(selector));
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
            disableFormElements = function(form2) {
              return formElements(form2, Rails3.formDisableSelector).forEach(disableFormElement);
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
            enableFormElements = function(form2) {
              return formElements(form2, Rails3.formEnableSelector).forEach(enableFormElement);
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
              var csrfParam, csrfToken, form2, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails3.href(link);
              csrfToken = Rails3.csrfToken();
              csrfParam = Rails3.csrfParam();
              form2 = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails3.isCrossDomain(href)) {
                formContent += "<input name='" + csrfParam + "' value='" + csrfToken + "' type='hidden' />";
              }
              formContent += '<input type="submit" />';
              form2.method = "post";
              form2.action = href;
              form2.target = link.target;
              form2.innerHTML = formContent;
              form2.style.display = "none";
              document.body.appendChild(form2);
              form2.querySelector('[type="submit"]').click();
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
              var button, form2;
              button = this;
              form2 = button.form;
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
  function scriptsElement() {
    return document.getElementById(`${providerName}ScriptBlock${elementProviderId()}`);
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
    scriptsElement().appendChild(script);
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

  // src/scripts/packs/gateways/form.js
  function callbackUrl() {
    return form.dataset.callbackUrl;
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

  // src/scripts/packs/gateways/zippay.js
  var import_ujs2 = __toESM(require_rails_ujs());
  onDomChange((node) => {
    const forms = node.querySelectorAll('form[data-provider="Zippay"]');
    forms.forEach((form2) => {
      const providerId2 = form2.dataset.providerId;
      if (providerId2) {
        initZippay({ form: form2, providerId: providerId2 });
      }
    });
  });
  function initZippay({ form: form2, providerId: providerId2 }) {
    init(form2);
    const payButtonId = `#ZippayPayWithButton${providerId2}`;
    const payButton = form2.querySelector(payButtonId);
    import_ujs2.default.disableElement(payButton);
    loadScript({
      url: "https://static.zipmoney.com.au/checkout/checkout-v1.min.js",
      onload: function() {
        import_ujs2.default.enableElement(payButton);
        const checkoutUri = callbackUrl();
        const args = {
          checkoutUri,
          redirectUri: `${checkoutUri}&type=redirect`,
          // Required; but we are not handling this scenario ATM
          onComplete: function(data) {
            const payload = {
              payment_source: {
                tok_id: data.checkoutId,
                customer_id: data.customerId,
                state: data.state
              }
            };
            submitData({ payload });
          },
          onError: function(error) {
            if (error.detail.message) {
              showError(error.detail.message);
            } else {
              showError(error.message);
            }
            import_ujs2.default.enableElement(payButton);
          }
        };
        Zip.Checkout.attachButton(payButtonId, args);
      }
    });
  }
})();
//# sourceMappingURL=zippay.GTGVUD32.js.map
