(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __require = /* @__PURE__ */ ((x) => typeof require !== "undefined" ? require : typeof Proxy !== "undefined" ? new Proxy(x, {
    get: (a, b) => (typeof require !== "undefined" ? require : a)[b]
  }) : x)(function(x) {
    if (typeof require !== "undefined") return require.apply(this, arguments);
    throw Error('Dynamic require of "' + x + '" is not supported');
  });
  var __commonJS = (cb, mod) => function __require2() {
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
                var ref, response2;
                response2 = processResponse((ref = xhr.response) != null ? ref : xhr.responseText, xhr.getResponseHeader("Content-Type"));
                if (Math.floor(xhr.status / 100) === 2) {
                  if (typeof options.success === "function") {
                    options.success(response2, xhr.statusText, xhr);
                  }
                } else {
                  if (typeof options.error === "function") {
                    options.error(response2, xhr.statusText, xhr);
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
            processResponse = function(response2, type) {
              var parser, script;
              if (typeof response2 === "string" && typeof type === "string") {
                if (type.match(/\bjson\b/)) {
                  try {
                    response2 = JSON.parse(response2);
                  } catch (error) {
                  }
                } else if (type.match(/\b(?:java|ecma)script\b/)) {
                  script = document.createElement("script");
                  script.setAttribute("nonce", cspNonce());
                  script.text = response2;
                  document.head.appendChild(script).parentNode.removeChild(script);
                } else if (type.match(/\b(xml|html|svg)\b/)) {
                  parser = new DOMParser();
                  type = type.replace(/;.+/, "");
                  try {
                    response2 = parser.parseFromString(response2, type);
                  } catch (error) {
                  }
                }
              }
              return response2;
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

  // node_modules/braintree-web/dist/browser/index.js
  var require_browser = __commonJS({
    "node_modules/braintree-web/dist/browser/index.js"(exports, module) {
      (function(f) {
        if (typeof exports === "object" && typeof module !== "undefined") {
          module.exports = f();
        } else if (typeof define === "function" && define.amd) {
          define([], f);
        } else {
          var g;
          if (typeof window !== "undefined") {
            g = window;
          } else if (typeof global !== "undefined") {
            g = global;
          } else if (typeof self !== "undefined") {
            g = self;
          } else {
            g = this;
          }
          g.braintree = f();
        }
      })(function() {
        var define2, module2, exports2;
        return (/* @__PURE__ */ function() {
          function r(e, n, t) {
            function o(i2, f) {
              if (!n[i2]) {
                if (!e[i2]) {
                  var c = "function" == typeof __require && __require;
                  if (!f && c) return c(i2, true);
                  if (u) return u(i2, true);
                  var a = new Error("Cannot find module '" + i2 + "'");
                  throw a.code = "MODULE_NOT_FOUND", a;
                }
                var p = n[i2] = { exports: {} };
                e[i2][0].call(p.exports, function(r2) {
                  var n2 = e[i2][1][r2];
                  return o(n2 || r2);
                }, p, p.exports, r, e, n, t);
              }
              return n[i2].exports;
            }
            for (var u = "function" == typeof __require && __require, i = 0; i < t.length; i++) o(t[i]);
            return o;
          }
          return r;
        }())({ 1: [function(_dereq_, module3, exports3) {
          "use strict";
          var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : { "default": mod };
          };
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.PromiseGlobal = void 0;
          var promise_polyfill_1 = __importDefault(_dereq_("promise-polyfill"));
          var PromiseGlobal = (
            // eslint-disable-next-line no-undef
            typeof Promise !== "undefined" ? Promise : promise_polyfill_1.default
          );
          exports3.PromiseGlobal = PromiseGlobal;
        }, { "promise-polyfill": 68 }], 2: [function(_dereq_, module3, exports3) {
          "use strict";
          var promise_1 = _dereq_("./lib/promise");
          var scriptPromiseCache = {};
          function loadScript(options) {
            var scriptLoadPromise;
            var stringifiedOptions = JSON.stringify(options);
            if (!options.forceScriptReload) {
              scriptLoadPromise = scriptPromiseCache[stringifiedOptions];
              if (scriptLoadPromise) {
                return scriptLoadPromise;
              }
            }
            var script = document.createElement("script");
            var attrs = options.dataAttributes || {};
            var container = options.container || document.head;
            script.src = options.src;
            script.id = options.id || "";
            script.async = true;
            if (options.crossorigin) {
              script.setAttribute("crossorigin", "" + options.crossorigin);
            }
            Object.keys(attrs).forEach(function(key) {
              script.setAttribute("data-" + key, "" + attrs[key]);
            });
            scriptLoadPromise = new promise_1.PromiseGlobal(function(resolve, reject) {
              script.addEventListener("load", function() {
                resolve(script);
              });
              script.addEventListener("error", function() {
                reject(new Error(options.src + " failed to load."));
              });
              script.addEventListener("abort", function() {
                reject(new Error(options.src + " has aborted."));
              });
              container.appendChild(script);
            });
            scriptPromiseCache[stringifiedOptions] = scriptLoadPromise;
            return scriptLoadPromise;
          }
          loadScript.clearCache = function() {
            scriptPromiseCache = {};
          };
          module3.exports = loadScript;
        }, { "./lib/promise": 1 }], 3: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/load-script");
        }, { "./dist/load-script": 2 }], 4: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isAndroid(ua) {
            ua = ua || window.navigator.userAgent;
            return /Android/i.test(ua);
          };
        }, {}], 5: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isChromeOS(ua) {
            ua = ua || window.navigator.userAgent;
            return /CrOS/i.test(ua);
          };
        }, {}], 6: [function(_dereq_, module3, exports3) {
          "use strict";
          var isEdge = _dereq_("./is-edge");
          var isSamsung = _dereq_("./is-samsung");
          var isDuckDuckGo = _dereq_("./is-duckduckgo");
          var isOpera = _dereq_("./is-opera");
          var isSilk = _dereq_("./is-silk");
          module3.exports = function isChrome(ua) {
            ua = ua || window.navigator.userAgent;
            return (ua.indexOf("Chrome") !== -1 || ua.indexOf("CriOS") !== -1) && !isEdge(ua) && !isSamsung(ua) && !isDuckDuckGo(ua) && !isOpera(ua) && !isSilk(ua);
          };
        }, { "./is-duckduckgo": 7, "./is-edge": 8, "./is-opera": 18, "./is-samsung": 19, "./is-silk": 20 }], 7: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isDuckDuckGo(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("DuckDuckGo/") !== -1;
          };
        }, {}], 8: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isEdge(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("Edge/") !== -1;
          };
        }, {}], 9: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isFirefox(ua) {
            ua = ua || window.navigator.userAgent;
            return /Firefox/i.test(ua);
          };
        }, {}], 10: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isIe9(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("MSIE 9") !== -1;
          };
        }, {}], 11: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isIosFirefox(ua) {
            ua = ua || window.navigator.userAgent;
            return /FxiOS/i.test(ua);
          };
        }, {}], 12: [function(_dereq_, module3, exports3) {
          "use strict";
          var isIos = _dereq_("./is-ios");
          function isGoogleSearchApp(ua) {
            return /\bGSA\b/.test(ua);
          }
          module3.exports = function isIosGoogleSearchApp(ua) {
            ua = ua || window.navigator.userAgent;
            return isIos(ua) && isGoogleSearchApp(ua);
          };
        }, { "./is-ios": 16 }], 13: [function(_dereq_, module3, exports3) {
          "use strict";
          var isIos = _dereq_("./is-ios");
          var isIosFirefox = _dereq_("./is-ios-firefox");
          var webkitRegexp = /webkit/i;
          function isWebkit(ua) {
            return webkitRegexp.test(ua);
          }
          function isIosChrome(ua) {
            return ua.indexOf("CriOS") > -1;
          }
          function isFacebook(ua) {
            return ua.indexOf("FBAN") > -1;
          }
          module3.exports = function isIosSafari(ua) {
            ua = ua || window.navigator.userAgent;
            return isIos(ua) && isWebkit(ua) && !isIosChrome(ua) && !isIosFirefox(ua) && !isFacebook(ua);
          };
        }, { "./is-ios": 16, "./is-ios-firefox": 11 }], 14: [function(_dereq_, module3, exports3) {
          "use strict";
          var isIos = _dereq_("./is-ios");
          var isIosGoogleSearchApp = _dereq_("./is-ios-google-search-app");
          module3.exports = function isIosWebview(ua) {
            ua = ua || window.navigator.userAgent;
            if (isIos(ua)) {
              if (isIosGoogleSearchApp(ua)) {
                return true;
              }
              return /.+AppleWebKit(?!.*Safari)/i.test(ua);
            }
            return false;
          };
        }, { "./is-ios": 16, "./is-ios-google-search-app": 12 }], 15: [function(_dereq_, module3, exports3) {
          "use strict";
          var isIosWebview = _dereq_("./is-ios-webview");
          module3.exports = function isIosWKWebview(ua, statusBarVisible) {
            statusBarVisible = typeof statusBarVisible !== "undefined" ? statusBarVisible : window.statusbar.visible;
            return isIosWebview(ua) && statusBarVisible;
          };
        }, { "./is-ios-webview": 14 }], 16: [function(_dereq_, module3, exports3) {
          "use strict";
          var isIpadOS = _dereq_("./is-ipados");
          module3.exports = function isIos(ua, checkIpadOS, document2) {
            if (checkIpadOS === void 0) {
              checkIpadOS = true;
            }
            ua = ua || window.navigator.userAgent;
            var iOsTest = /iPhone|iPod|iPad/i.test(ua);
            return checkIpadOS ? iOsTest || isIpadOS(ua, document2) : iOsTest;
          };
        }, { "./is-ipados": 17 }], 17: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isIpadOS(ua, document2) {
            ua = ua || window.navigator.userAgent;
            document2 = document2 || window.document;
            return /Mac|iPad/i.test(ua) && "ontouchend" in document2;
          };
        }, {}], 18: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isOpera(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("OPR/") !== -1 || ua.indexOf("Opera/") !== -1 || ua.indexOf("OPT/") !== -1;
          };
        }, {}], 19: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isSamsungBrowser(ua) {
            ua = ua || window.navigator.userAgent;
            return /SamsungBrowser/i.test(ua);
          };
        }, {}], 20: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function isSilk(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("Silk/") !== -1;
          };
        }, {}], 21: [function(_dereq_, module3, exports3) {
          "use strict";
          var MINIMUM_SUPPORTED_CHROME_IOS_VERSION = 48;
          var isAndroid = _dereq_("./is-android");
          var isIosFirefox = _dereq_("./is-ios-firefox");
          var isIosWebview = _dereq_("./is-ios-webview");
          var isChrome = _dereq_("./is-chrome");
          var isSamsungBrowser = _dereq_("./is-samsung");
          var isDuckDuckGo = _dereq_("./is-duckduckgo");
          function isUnsupportedIosChrome(ua) {
            ua = ua || window.navigator.userAgent;
            var match = ua.match(/CriOS\/(\d+)\./);
            if (!match) {
              return false;
            }
            var version = parseInt(match[1], 10);
            return version < MINIMUM_SUPPORTED_CHROME_IOS_VERSION;
          }
          function isOperaMini(ua) {
            ua = ua || window.navigator.userAgent;
            return ua.indexOf("Opera Mini") > -1;
          }
          function isAndroidWebview(ua) {
            var androidWebviewRegExp = /Version\/[\d.]+/i;
            ua = ua || window.navigator.userAgent;
            if (isAndroid(ua)) {
              return androidWebviewRegExp.test(ua) && !isOperaMini(ua) && !isDuckDuckGo(ua);
            }
            return false;
          }
          function isOldSamsungBrowserOrSamsungWebview(ua) {
            return !isChrome(ua) && !isSamsungBrowser(ua) && /samsung/i.test(ua);
          }
          module3.exports = function supportsPopups(ua) {
            ua = ua || window.navigator.userAgent;
            return !(isIosWebview(ua) || isIosFirefox(ua) || isAndroidWebview(ua) || isOperaMini(ua) || isUnsupportedIosChrome(ua) || isOldSamsungBrowserOrSamsungWebview(ua));
          };
        }, { "./is-android": 4, "./is-chrome": 6, "./is-duckduckgo": 7, "./is-ios-firefox": 11, "./is-ios-webview": 14, "./is-samsung": 19 }], 22: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-android");
        }, { "./dist/is-android": 4 }], 23: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-chrome-os");
        }, { "./dist/is-chrome-os": 5 }], 24: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-chrome");
        }, { "./dist/is-chrome": 6 }], 25: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-firefox");
        }, { "./dist/is-firefox": 9 }], 26: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-ie9");
        }, { "./dist/is-ie9": 10 }], 27: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-ios-safari");
        }, { "./dist/is-ios-safari": 13 }], 28: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-ios-webview");
        }, { "./dist/is-ios-webview": 14 }], 29: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-ios-wkwebview");
        }, { "./dist/is-ios-wkwebview": 15 }], 30: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-ios");
        }, { "./dist/is-ios": 16 }], 31: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/is-samsung");
        }, { "./dist/is-samsung": 19 }], 32: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/supports-popups");
        }, { "./dist/supports-popups": 21 }], 33: [function(_dereq_, module3, exports3) {
          "use strict";
          var EventEmitter = (
            /** @class */
            function() {
              function EventEmitter2() {
                this._events = {};
              }
              EventEmitter2.prototype.on = function(event, callback) {
                if (this._events[event]) {
                  this._events[event].push(callback);
                } else {
                  this._events[event] = [callback];
                }
              };
              EventEmitter2.prototype.off = function(event, callback) {
                var eventCallbacks = this._events[event];
                if (!eventCallbacks) {
                  return;
                }
                var indexOfCallback = eventCallbacks.indexOf(callback);
                eventCallbacks.splice(indexOfCallback, 1);
              };
              EventEmitter2.prototype._emit = function(event) {
                var args = [];
                for (var _i = 1; _i < arguments.length; _i++) {
                  args[_i - 1] = arguments[_i];
                }
                var eventCallbacks = this._events[event];
                if (!eventCallbacks) {
                  return;
                }
                eventCallbacks.forEach(function(callback) {
                  callback.apply(void 0, args);
                });
              };
              EventEmitter2.prototype.hasListener = function(event) {
                var eventCallbacks = this._events[event];
                if (!eventCallbacks) {
                  return false;
                }
                return eventCallbacks.length > 0;
              };
              EventEmitter2.createChild = function(ChildObject) {
                ChildObject.prototype = Object.create(EventEmitter2.prototype, {
                  constructor: ChildObject
                });
              };
              return EventEmitter2;
            }()
          );
          module3.exports = EventEmitter;
        }, {}], 34: [function(_dereq_, module3, exports3) {
          "use strict";
          var GlobalPromise = typeof Promise !== "undefined" ? Promise : null;
          var ExtendedPromise = (
            /** @class */
            function() {
              function ExtendedPromise2(options) {
                var _this = this;
                if (typeof options === "function") {
                  this._promise = new ExtendedPromise2.Promise(options);
                  return;
                }
                this._promise = new ExtendedPromise2.Promise(function(resolve, reject) {
                  _this._resolveFunction = resolve;
                  _this._rejectFunction = reject;
                });
                options = options || {};
                this._onResolve = options.onResolve || ExtendedPromise2.defaultOnResolve;
                this._onReject = options.onReject || ExtendedPromise2.defaultOnReject;
                if (ExtendedPromise2.shouldCatchExceptions(options)) {
                  this._promise.catch(function() {
                  });
                }
                this._resetState();
              }
              ExtendedPromise2.defaultOnResolve = function(result) {
                return ExtendedPromise2.Promise.resolve(result);
              };
              ExtendedPromise2.defaultOnReject = function(err) {
                return ExtendedPromise2.Promise.reject(err);
              };
              ExtendedPromise2.setPromise = function(PromiseClass) {
                ExtendedPromise2.Promise = PromiseClass;
              };
              ExtendedPromise2.shouldCatchExceptions = function(options) {
                if (options.hasOwnProperty("suppressUnhandledPromiseMessage")) {
                  return Boolean(options.suppressUnhandledPromiseMessage);
                }
                return Boolean(ExtendedPromise2.suppressUnhandledPromiseMessage);
              };
              ExtendedPromise2.all = function(args) {
                return ExtendedPromise2.Promise.all(args);
              };
              ExtendedPromise2.allSettled = function(args) {
                return ExtendedPromise2.Promise.allSettled(args);
              };
              ExtendedPromise2.race = function(args) {
                return ExtendedPromise2.Promise.race(args);
              };
              ExtendedPromise2.reject = function(arg) {
                return ExtendedPromise2.Promise.reject(arg);
              };
              ExtendedPromise2.resolve = function(arg) {
                return ExtendedPromise2.Promise.resolve(arg);
              };
              ExtendedPromise2.prototype.then = function() {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                return (_a = this._promise).then.apply(_a, args);
              };
              ExtendedPromise2.prototype.catch = function() {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                  args[_i] = arguments[_i];
                }
                return (_a = this._promise).catch.apply(_a, args);
              };
              ExtendedPromise2.prototype.resolve = function(arg) {
                var _this = this;
                if (this.isFulfilled) {
                  return this;
                }
                this._setResolved();
                ExtendedPromise2.Promise.resolve().then(function() {
                  return _this._onResolve(arg);
                }).then(function(argForResolveFunction) {
                  _this._resolveFunction(argForResolveFunction);
                }).catch(function(err) {
                  _this._resetState();
                  _this.reject(err);
                });
                return this;
              };
              ExtendedPromise2.prototype.reject = function(arg) {
                var _this = this;
                if (this.isFulfilled) {
                  return this;
                }
                this._setRejected();
                ExtendedPromise2.Promise.resolve().then(function() {
                  return _this._onReject(arg);
                }).then(function(result) {
                  _this._setResolved();
                  _this._resolveFunction(result);
                }).catch(function(err) {
                  return _this._rejectFunction(err);
                });
                return this;
              };
              ExtendedPromise2.prototype._resetState = function() {
                this.isFulfilled = false;
                this.isResolved = false;
                this.isRejected = false;
              };
              ExtendedPromise2.prototype._setResolved = function() {
                this.isFulfilled = true;
                this.isResolved = true;
                this.isRejected = false;
              };
              ExtendedPromise2.prototype._setRejected = function() {
                this.isFulfilled = true;
                this.isResolved = false;
                this.isRejected = true;
              };
              ExtendedPromise2.Promise = GlobalPromise;
              return ExtendedPromise2;
            }()
          );
          module3.exports = ExtendedPromise;
        }, {}], 35: [function(_dereq_, module3, exports3) {
          "use strict";
          var set_attributes_1 = _dereq_("./lib/set-attributes");
          var default_attributes_1 = _dereq_("./lib/default-attributes");
          var assign_1 = _dereq_("./lib/assign");
          module3.exports = function createFrame(options) {
            if (options === void 0) {
              options = {};
            }
            var iframe = document.createElement("iframe");
            var config = assign_1.assign({}, default_attributes_1.defaultAttributes, options);
            if (config.style && typeof config.style !== "string") {
              assign_1.assign(iframe.style, config.style);
              delete config.style;
            }
            set_attributes_1.setAttributes(iframe, config);
            if (!iframe.getAttribute("id")) {
              iframe.id = iframe.name;
            }
            return iframe;
          };
        }, { "./lib/assign": 36, "./lib/default-attributes": 37, "./lib/set-attributes": 38 }], 36: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.assign = void 0;
          function assign(target) {
            var objs = [];
            for (var _i = 1; _i < arguments.length; _i++) {
              objs[_i - 1] = arguments[_i];
            }
            objs.forEach(function(obj) {
              if (typeof obj !== "object") {
                return;
              }
              Object.keys(obj).forEach(function(key) {
                target[key] = obj[key];
              });
            });
            return target;
          }
          exports3.assign = assign;
        }, {}], 37: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.defaultAttributes = void 0;
          exports3.defaultAttributes = {
            src: "about:blank",
            frameBorder: 0,
            allowtransparency: true,
            scrolling: "no"
          };
        }, {}], 38: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.setAttributes = void 0;
          function setAttributes(element, attributes) {
            for (var key in attributes) {
              if (attributes.hasOwnProperty(key)) {
                var value = attributes[key];
                if (value == null) {
                  element.removeAttribute(key);
                } else {
                  element.setAttribute(key, value);
                }
              }
            }
          }
          exports3.setAttributes = setAttributes;
        }, {}], 39: [function(_dereq_, module3, exports3) {
          "use strict";
          function uuid() {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function(c) {
              var r = Math.random() * 16 | 0;
              var v = c === "x" ? r : r & 3 | 8;
              return v.toString(16);
            });
          }
          module3.exports = uuid;
        }, {}], 40: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          function deferred(fn) {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              setTimeout(function() {
                try {
                  fn.apply(void 0, args);
                } catch (err) {
                  console.log("Error in callback function");
                  console.log(err);
                }
              }, 1);
            };
          }
          exports3.deferred = deferred;
        }, {}], 41: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          function once(fn) {
            var called = false;
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              if (!called) {
                called = true;
                fn.apply(void 0, args);
              }
            };
          }
          exports3.once = once;
        }, {}], 42: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          function promiseOrCallback(promise, callback) {
            if (!callback) {
              return promise;
            }
            promise.then(function(data) {
              return callback(null, data);
            }).catch(function(err) {
              return callback(err);
            });
          }
          exports3.promiseOrCallback = promiseOrCallback;
        }, {}], 43: [function(_dereq_, module3, exports3) {
          "use strict";
          var deferred_1 = _dereq_("./lib/deferred");
          var once_1 = _dereq_("./lib/once");
          var promise_or_callback_1 = _dereq_("./lib/promise-or-callback");
          function wrapPromise(fn) {
            return function() {
              var args = [];
              for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
              }
              var callback;
              var lastArg = args[args.length - 1];
              if (typeof lastArg === "function") {
                callback = args.pop();
                callback = once_1.once(deferred_1.deferred(callback));
              }
              return promise_or_callback_1.promiseOrCallback(fn.apply(this, args), callback);
            };
          }
          wrapPromise.wrapPrototype = function(target, options) {
            if (options === void 0) {
              options = {};
            }
            var ignoreMethods = options.ignoreMethods || [];
            var includePrivateMethods = options.transformPrivateMethods === true;
            var methods = Object.getOwnPropertyNames(target.prototype).filter(function(method) {
              var isNotPrivateMethod;
              var isNonConstructorFunction = method !== "constructor" && typeof target.prototype[method] === "function";
              var isNotAnIgnoredMethod = ignoreMethods.indexOf(method) === -1;
              if (includePrivateMethods) {
                isNotPrivateMethod = true;
              } else {
                isNotPrivateMethod = method.charAt(0) !== "_";
              }
              return isNonConstructorFunction && isNotPrivateMethod && isNotAnIgnoredMethod;
            });
            methods.forEach(function(method) {
              var original = target.prototype[method];
              target.prototype[method] = wrapPromise(original);
            });
            return target;
          };
          module3.exports = wrapPromise;
        }, { "./lib/deferred": 40, "./lib/once": 41, "./lib/promise-or-callback": 42 }], 44: [function(_dereq_, module3, exports3) {
          "use strict";
          var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                  t[p] = s[p];
              }
              return t;
            };
            return __assign.apply(this, arguments);
          };
          var cardTypes = _dereq_("./lib/card-types");
          var add_matching_cards_to_results_1 = _dereq_("./lib/add-matching-cards-to-results");
          var is_valid_input_type_1 = _dereq_("./lib/is-valid-input-type");
          var find_best_match_1 = _dereq_("./lib/find-best-match");
          var clone_1 = _dereq_("./lib/clone");
          var customCards = {};
          var cardNames = {
            VISA: "visa",
            MASTERCARD: "mastercard",
            AMERICAN_EXPRESS: "american-express",
            DINERS_CLUB: "diners-club",
            DISCOVER: "discover",
            JCB: "jcb",
            UNIONPAY: "unionpay",
            MAESTRO: "maestro",
            ELO: "elo",
            MIR: "mir",
            HIPER: "hiper",
            HIPERCARD: "hipercard"
          };
          var ORIGINAL_TEST_ORDER = [
            cardNames.VISA,
            cardNames.MASTERCARD,
            cardNames.AMERICAN_EXPRESS,
            cardNames.DINERS_CLUB,
            cardNames.DISCOVER,
            cardNames.JCB,
            cardNames.UNIONPAY,
            cardNames.MAESTRO,
            cardNames.ELO,
            cardNames.MIR,
            cardNames.HIPER,
            cardNames.HIPERCARD
          ];
          var testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
          function findType(cardType) {
            return customCards[cardType] || cardTypes[cardType];
          }
          function getAllCardTypes() {
            return testOrder.map(function(cardType) {
              return clone_1.clone(findType(cardType));
            });
          }
          function getCardPosition(name, ignoreErrorForNotExisting) {
            if (ignoreErrorForNotExisting === void 0) {
              ignoreErrorForNotExisting = false;
            }
            var position = testOrder.indexOf(name);
            if (!ignoreErrorForNotExisting && position === -1) {
              throw new Error('"' + name + '" is not a supported card type.');
            }
            return position;
          }
          function creditCardType(cardNumber) {
            var results = [];
            if (!is_valid_input_type_1.isValidInputType(cardNumber)) {
              return results;
            }
            if (cardNumber.length === 0) {
              return getAllCardTypes();
            }
            testOrder.forEach(function(cardType) {
              var cardConfiguration = findType(cardType);
              add_matching_cards_to_results_1.addMatchingCardsToResults(cardNumber, cardConfiguration, results);
            });
            var bestMatch = find_best_match_1.findBestMatch(results);
            if (bestMatch) {
              return [bestMatch];
            }
            return results;
          }
          creditCardType.getTypeInfo = function(cardType) {
            return clone_1.clone(findType(cardType));
          };
          creditCardType.removeCard = function(name) {
            var position = getCardPosition(name);
            testOrder.splice(position, 1);
          };
          creditCardType.addCard = function(config) {
            var existingCardPosition = getCardPosition(config.type, true);
            customCards[config.type] = config;
            if (existingCardPosition === -1) {
              testOrder.push(config.type);
            }
          };
          creditCardType.updateCard = function(cardType, updates) {
            var originalObject = customCards[cardType] || cardTypes[cardType];
            if (!originalObject) {
              throw new Error('"' + cardType + "\" is not a recognized type. Use `addCard` instead.'");
            }
            if (updates.type && originalObject.type !== updates.type) {
              throw new Error("Cannot overwrite type parameter.");
            }
            var clonedCard = clone_1.clone(originalObject);
            clonedCard = __assign(__assign({}, clonedCard), updates);
            customCards[clonedCard.type] = clonedCard;
          };
          creditCardType.changeOrder = function(name, position) {
            var currentPosition = getCardPosition(name);
            testOrder.splice(currentPosition, 1);
            testOrder.splice(position, 0, name);
          };
          creditCardType.resetModifications = function() {
            testOrder = clone_1.clone(ORIGINAL_TEST_ORDER);
            customCards = {};
          };
          creditCardType.types = cardNames;
          module3.exports = creditCardType;
        }, { "./lib/add-matching-cards-to-results": 45, "./lib/card-types": 46, "./lib/clone": 47, "./lib/find-best-match": 48, "./lib/is-valid-input-type": 49 }], 45: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.addMatchingCardsToResults = void 0;
          var clone_1 = _dereq_("./clone");
          var matches_1 = _dereq_("./matches");
          function addMatchingCardsToResults(cardNumber, cardConfiguration, results) {
            var i, patternLength;
            for (i = 0; i < cardConfiguration.patterns.length; i++) {
              var pattern = cardConfiguration.patterns[i];
              if (!matches_1.matches(cardNumber, pattern)) {
                continue;
              }
              var clonedCardConfiguration = clone_1.clone(cardConfiguration);
              if (Array.isArray(pattern)) {
                patternLength = String(pattern[0]).length;
              } else {
                patternLength = String(pattern).length;
              }
              if (cardNumber.length >= patternLength) {
                clonedCardConfiguration.matchStrength = patternLength;
              }
              results.push(clonedCardConfiguration);
              break;
            }
          }
          exports3.addMatchingCardsToResults = addMatchingCardsToResults;
        }, { "./clone": 47, "./matches": 50 }], 46: [function(_dereq_, module3, exports3) {
          "use strict";
          var cardTypes = {
            visa: {
              niceType: "Visa",
              type: "visa",
              patterns: [4],
              gaps: [4, 8, 12],
              lengths: [16, 18, 19],
              code: {
                name: "CVV",
                size: 3
              }
            },
            mastercard: {
              niceType: "Mastercard",
              type: "mastercard",
              patterns: [[51, 55], [2221, 2229], [223, 229], [23, 26], [270, 271], 2720],
              gaps: [4, 8, 12],
              lengths: [16],
              code: {
                name: "CVC",
                size: 3
              }
            },
            "american-express": {
              niceType: "American Express",
              type: "american-express",
              patterns: [34, 37],
              gaps: [4, 10],
              lengths: [15],
              code: {
                name: "CID",
                size: 4
              }
            },
            "diners-club": {
              niceType: "Diners Club",
              type: "diners-club",
              patterns: [[300, 305], 36, 38, 39],
              gaps: [4, 10],
              lengths: [14, 16, 19],
              code: {
                name: "CVV",
                size: 3
              }
            },
            discover: {
              niceType: "Discover",
              type: "discover",
              patterns: [6011, [644, 649], 65],
              gaps: [4, 8, 12],
              lengths: [16, 19],
              code: {
                name: "CID",
                size: 3
              }
            },
            jcb: {
              niceType: "JCB",
              type: "jcb",
              patterns: [2131, 1800, [3528, 3589]],
              gaps: [4, 8, 12],
              lengths: [16, 17, 18, 19],
              code: {
                name: "CVV",
                size: 3
              }
            },
            unionpay: {
              niceType: "UnionPay",
              type: "unionpay",
              patterns: [
                620,
                [624, 626],
                [62100, 62182],
                [62184, 62187],
                [62185, 62197],
                [62200, 62205],
                [622010, 622999],
                622018,
                [622019, 622999],
                [62207, 62209],
                [622126, 622925],
                [623, 626],
                6270,
                6272,
                6276,
                [627700, 627779],
                [627781, 627799],
                [6282, 6289],
                6291,
                6292,
                810,
                [8110, 8131],
                [8132, 8151],
                [8152, 8163],
                [8164, 8171]
              ],
              gaps: [4, 8, 12],
              lengths: [14, 15, 16, 17, 18, 19],
              code: {
                name: "CVN",
                size: 3
              }
            },
            maestro: {
              niceType: "Maestro",
              type: "maestro",
              patterns: [
                493698,
                [5e5, 504174],
                [504176, 506698],
                [506779, 508999],
                [56, 59],
                63,
                67,
                6
              ],
              gaps: [4, 8, 12],
              lengths: [12, 13, 14, 15, 16, 17, 18, 19],
              code: {
                name: "CVC",
                size: 3
              }
            },
            elo: {
              niceType: "Elo",
              type: "elo",
              patterns: [
                401178,
                401179,
                438935,
                457631,
                457632,
                431274,
                451416,
                457393,
                504175,
                [506699, 506778],
                [509e3, 509999],
                627780,
                636297,
                636368,
                [650031, 650033],
                [650035, 650051],
                [650405, 650439],
                [650485, 650538],
                [650541, 650598],
                [650700, 650718],
                [650720, 650727],
                [650901, 650978],
                [651652, 651679],
                [655e3, 655019],
                [655021, 655058]
              ],
              gaps: [4, 8, 12],
              lengths: [16],
              code: {
                name: "CVE",
                size: 3
              }
            },
            mir: {
              niceType: "Mir",
              type: "mir",
              patterns: [[2200, 2204]],
              gaps: [4, 8, 12],
              lengths: [16, 17, 18, 19],
              code: {
                name: "CVP2",
                size: 3
              }
            },
            hiper: {
              niceType: "Hiper",
              type: "hiper",
              patterns: [637095, 63737423, 63743358, 637568, 637599, 637609, 637612],
              gaps: [4, 8, 12],
              lengths: [16],
              code: {
                name: "CVC",
                size: 3
              }
            },
            hipercard: {
              niceType: "Hipercard",
              type: "hipercard",
              patterns: [606282],
              gaps: [4, 8, 12],
              lengths: [16],
              code: {
                name: "CVC",
                size: 3
              }
            }
          };
          module3.exports = cardTypes;
        }, {}], 47: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.clone = void 0;
          function clone(originalObject) {
            if (!originalObject) {
              return null;
            }
            return JSON.parse(JSON.stringify(originalObject));
          }
          exports3.clone = clone;
        }, {}], 48: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.findBestMatch = void 0;
          function hasEnoughResultsToDetermineBestMatch(results) {
            var numberOfResultsWithMaxStrengthProperty = results.filter(function(result) {
              return result.matchStrength;
            }).length;
            return numberOfResultsWithMaxStrengthProperty > 0 && numberOfResultsWithMaxStrengthProperty === results.length;
          }
          function findBestMatch(results) {
            if (!hasEnoughResultsToDetermineBestMatch(results)) {
              return null;
            }
            return results.reduce(function(bestMatch, result) {
              if (!bestMatch) {
                return result;
              }
              if (Number(bestMatch.matchStrength) < Number(result.matchStrength)) {
                return result;
              }
              return bestMatch;
            });
          }
          exports3.findBestMatch = findBestMatch;
        }, {}], 49: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.isValidInputType = void 0;
          function isValidInputType(cardNumber) {
            return typeof cardNumber === "string" || cardNumber instanceof String;
          }
          exports3.isValidInputType = isValidInputType;
        }, {}], 50: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.matches = void 0;
          function matchesRange(cardNumber, min, max) {
            var maxLengthToCheck = String(min).length;
            var substr = cardNumber.substr(0, maxLengthToCheck);
            var integerRepresentationOfCardNumber = parseInt(substr, 10);
            min = parseInt(String(min).substr(0, substr.length), 10);
            max = parseInt(String(max).substr(0, substr.length), 10);
            return integerRepresentationOfCardNumber >= min && integerRepresentationOfCardNumber <= max;
          }
          function matchesPattern(cardNumber, pattern) {
            pattern = String(pattern);
            return pattern.substring(0, cardNumber.length) === cardNumber.substring(0, pattern.length);
          }
          function matches(cardNumber, pattern) {
            if (Array.isArray(pattern)) {
              return matchesRange(cardNumber, pattern[0], pattern[1]);
            }
            return matchesPattern(cardNumber, pattern);
          }
          exports3.matches = matches;
        }, {}], 51: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.Framebus = void 0;
          var lib_1 = _dereq_("./lib");
          var DefaultPromise = typeof window !== "undefined" && window.Promise;
          var Framebus = (
            /** @class */
            function() {
              function Framebus2(options) {
                if (options === void 0) {
                  options = {};
                }
                this.origin = options.origin || "*";
                this.channel = options.channel || "";
                this.verifyDomain = options.verifyDomain;
                this.targetFrames = options.targetFrames || [];
                this.limitBroadcastToFramesArray = Boolean(options.targetFrames);
                this.isDestroyed = false;
                this.listeners = [];
                this.hasAdditionalChecksForOnListeners = Boolean(this.verifyDomain || this.limitBroadcastToFramesArray);
              }
              Framebus2.setPromise = function(PromiseGlobal) {
                Framebus2.Promise = PromiseGlobal;
              };
              Framebus2.target = function(options) {
                return new Framebus2(options);
              };
              Framebus2.prototype.addTargetFrame = function(frame) {
                if (!this.limitBroadcastToFramesArray) {
                  return;
                }
                this.targetFrames.push(frame);
              };
              Framebus2.prototype.include = function(childWindow) {
                if (childWindow == null) {
                  return false;
                }
                if (childWindow.Window == null) {
                  return false;
                }
                if (childWindow.constructor !== childWindow.Window) {
                  return false;
                }
                lib_1.childWindows.push(childWindow);
                return true;
              };
              Framebus2.prototype.target = function(options) {
                return Framebus2.target(options);
              };
              Framebus2.prototype.emit = function(eventName, data, reply) {
                if (this.isDestroyed) {
                  return false;
                }
                var origin = this.origin;
                eventName = this.namespaceEvent(eventName);
                if ((0, lib_1.isntString)(eventName)) {
                  return false;
                }
                if ((0, lib_1.isntString)(origin)) {
                  return false;
                }
                if (typeof data === "function") {
                  reply = data;
                  data = void 0;
                }
                var payload2 = (0, lib_1.packagePayload)(eventName, origin, data, reply);
                if (!payload2) {
                  return false;
                }
                if (this.limitBroadcastToFramesArray) {
                  this.targetFramesAsWindows().forEach(function(frame) {
                    (0, lib_1.sendMessage)(frame, payload2, origin);
                  });
                } else {
                  (0, lib_1.broadcast)(payload2, {
                    origin,
                    frame: window.top || window.self
                  });
                }
                return true;
              };
              Framebus2.prototype.emitAsPromise = function(eventName, data) {
                var _this = this;
                return new Framebus2.Promise(function(resolve, reject) {
                  var didAttachListener = _this.emit(eventName, data, function(payload2) {
                    resolve(payload2);
                  });
                  if (!didAttachListener) {
                    reject(new Error('Listener not added for "'.concat(eventName, '"')));
                  }
                });
              };
              Framebus2.prototype.on = function(eventName, originalHandler) {
                if (this.isDestroyed) {
                  return false;
                }
                var self2 = this;
                var origin = this.origin;
                var handler = originalHandler;
                eventName = this.namespaceEvent(eventName);
                if ((0, lib_1.subscriptionArgsInvalid)(eventName, handler, origin)) {
                  return false;
                }
                if (this.hasAdditionalChecksForOnListeners) {
                  handler = function() {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                      args[_i] = arguments[_i];
                    }
                    if (!self2.passesVerifyDomainCheck(this && this.origin)) {
                      return;
                    }
                    if (!self2.hasMatchingTargetFrame(this && this.source)) {
                      return;
                    }
                    originalHandler.apply(void 0, args);
                  };
                }
                this.listeners.push({
                  eventName,
                  handler,
                  originalHandler
                });
                lib_1.subscribers[origin] = lib_1.subscribers[origin] || {};
                lib_1.subscribers[origin][eventName] = lib_1.subscribers[origin][eventName] || [];
                lib_1.subscribers[origin][eventName].push(handler);
                return true;
              };
              Framebus2.prototype.off = function(eventName, originalHandler) {
                var handler = originalHandler;
                if (this.isDestroyed) {
                  return false;
                }
                if (this.verifyDomain) {
                  for (var i = 0; i < this.listeners.length; i++) {
                    var listener = this.listeners[i];
                    if (listener.originalHandler === originalHandler) {
                      handler = listener.handler;
                    }
                  }
                }
                eventName = this.namespaceEvent(eventName);
                var origin = this.origin;
                if ((0, lib_1.subscriptionArgsInvalid)(eventName, handler, origin)) {
                  return false;
                }
                var subscriberList = lib_1.subscribers[origin] && lib_1.subscribers[origin][eventName];
                if (!subscriberList) {
                  return false;
                }
                for (var i = 0; i < subscriberList.length; i++) {
                  if (subscriberList[i] === handler) {
                    subscriberList.splice(i, 1);
                    return true;
                  }
                }
                return false;
              };
              Framebus2.prototype.teardown = function() {
                if (this.isDestroyed) {
                  return;
                }
                this.isDestroyed = true;
                for (var i = 0; i < this.listeners.length; i++) {
                  var listener = this.listeners[i];
                  this.off(listener.eventName, listener.handler);
                }
                this.listeners.length = 0;
              };
              Framebus2.prototype.passesVerifyDomainCheck = function(origin) {
                if (!this.verifyDomain) {
                  return true;
                }
                return this.checkOrigin(origin);
              };
              Framebus2.prototype.targetFramesAsWindows = function() {
                if (!this.limitBroadcastToFramesArray) {
                  return [];
                }
                return this.targetFrames.map(function(frame) {
                  if (frame instanceof HTMLIFrameElement) {
                    return frame.contentWindow;
                  }
                  return frame;
                }).filter(function(win) {
                  return win;
                });
              };
              Framebus2.prototype.hasMatchingTargetFrame = function(source) {
                if (!this.limitBroadcastToFramesArray) {
                  return true;
                }
                var matchingFrame = this.targetFramesAsWindows().find(function(frame) {
                  return frame === source;
                });
                return Boolean(matchingFrame);
              };
              Framebus2.prototype.checkOrigin = function(postMessageOrigin) {
                var merchantHost;
                var a = document.createElement("a");
                a.href = location.href;
                if (a.protocol === "https:") {
                  merchantHost = a.host.replace(/:443$/, "");
                } else if (a.protocol === "http:") {
                  merchantHost = a.host.replace(/:80$/, "");
                } else {
                  merchantHost = a.host;
                }
                var merchantOrigin = a.protocol + "//" + merchantHost;
                if (merchantOrigin === postMessageOrigin) {
                  return true;
                }
                if (this.verifyDomain) {
                  return this.verifyDomain(postMessageOrigin);
                }
                return true;
              };
              Framebus2.prototype.namespaceEvent = function(eventName) {
                if (!this.channel) {
                  return eventName;
                }
                return "".concat(this.channel, ":").concat(eventName);
              };
              Framebus2.Promise = DefaultPromise;
              return Framebus2;
            }()
          );
          exports3.Framebus = Framebus;
        }, { "./lib": 59 }], 52: [function(_dereq_, module3, exports3) {
          "use strict";
          var lib_1 = _dereq_("./lib");
          var framebus_1 = _dereq_("./framebus");
          (0, lib_1.attach)();
          module3.exports = framebus_1.Framebus;
        }, { "./framebus": 51, "./lib": 59 }], 53: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.detach = exports3.attach = void 0;
          var _1 = _dereq_("./");
          var isAttached = false;
          function attach() {
            if (isAttached || typeof window === "undefined") {
              return;
            }
            isAttached = true;
            window.addEventListener("message", _1.onMessage, false);
          }
          exports3.attach = attach;
          function detach() {
            isAttached = false;
            window.removeEventListener("message", _1.onMessage, false);
          }
          exports3.detach = detach;
        }, { "./": 59 }], 54: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.broadcastToChildWindows = void 0;
          var _1 = _dereq_("./");
          function broadcastToChildWindows(payload2, origin, source) {
            for (var i = _1.childWindows.length - 1; i >= 0; i--) {
              var childWindow = _1.childWindows[i];
              if (childWindow.closed) {
                _1.childWindows.splice(i, 1);
              } else if (source !== childWindow) {
                (0, _1.broadcast)(payload2, {
                  origin,
                  frame: childWindow.top
                });
              }
            }
          }
          exports3.broadcastToChildWindows = broadcastToChildWindows;
        }, { "./": 59 }], 55: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.broadcast = void 0;
          var _1 = _dereq_("./");
          function broadcast(payload2, options) {
            var i = 0;
            var frameToBroadcastTo;
            var origin = options.origin, frame = options.frame;
            try {
              frame.postMessage(payload2, origin);
              if ((0, _1.hasOpener)(frame) && frame.opener.top !== window.top) {
                broadcast(payload2, {
                  origin,
                  frame: frame.opener.top
                });
              }
              while (frameToBroadcastTo = frame.frames[i]) {
                broadcast(payload2, {
                  origin,
                  frame: frameToBroadcastTo
                });
                i++;
              }
            } catch (_) {
            }
          }
          exports3.broadcast = broadcast;
        }, { "./": 59 }], 56: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.subscribers = exports3.childWindows = exports3.prefix = void 0;
          exports3.prefix = "/*framebus*/";
          exports3.childWindows = [];
          exports3.subscribers = {};
        }, {}], 57: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.dispatch = void 0;
          var _1 = _dereq_("./");
          function dispatch(origin, event, data, reply, e) {
            if (!_1.subscribers[origin]) {
              return;
            }
            if (!_1.subscribers[origin][event]) {
              return;
            }
            var args = [];
            if (data) {
              args.push(data);
            }
            if (reply) {
              args.push(reply);
            }
            for (var i = 0; i < _1.subscribers[origin][event].length; i++) {
              _1.subscribers[origin][event][i].apply(e, args);
            }
          }
          exports3.dispatch = dispatch;
        }, { "./": 59 }], 58: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.hasOpener = void 0;
          function hasOpener(frame) {
            if (frame.top !== frame) {
              return false;
            }
            if (frame.opener == null) {
              return false;
            }
            if (frame.opener === frame) {
              return false;
            }
            if (frame.opener.closed === true) {
              return false;
            }
            return true;
          }
          exports3.hasOpener = hasOpener;
        }, {}], 59: [function(_dereq_, module3, exports3) {
          "use strict";
          var __createBinding = this && this.__createBinding || (Object.create ? function(o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            var desc = Object.getOwnPropertyDescriptor(m, k);
            if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
              desc = { enumerable: true, get: function() {
                return m[k];
              } };
            }
            Object.defineProperty(o, k2, desc);
          } : function(o, m, k, k2) {
            if (k2 === void 0) k2 = k;
            o[k2] = m[k];
          });
          var __exportStar = this && this.__exportStar || function(m, exports4) {
            for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports4, p)) __createBinding(exports4, m, p);
          };
          Object.defineProperty(exports3, "__esModule", { value: true });
          __exportStar(_dereq_("./attach"), exports3);
          __exportStar(_dereq_("./broadcast-to-child-windows"), exports3);
          __exportStar(_dereq_("./broadcast"), exports3);
          __exportStar(_dereq_("./constants"), exports3);
          __exportStar(_dereq_("./dispatch"), exports3);
          __exportStar(_dereq_("./has-opener"), exports3);
          __exportStar(_dereq_("./is-not-string"), exports3);
          __exportStar(_dereq_("./message"), exports3);
          __exportStar(_dereq_("./package-payload"), exports3);
          __exportStar(_dereq_("./send-message"), exports3);
          __exportStar(_dereq_("./subscribe-replier"), exports3);
          __exportStar(_dereq_("./subscription-args-invalid"), exports3);
          __exportStar(_dereq_("./types"), exports3);
          __exportStar(_dereq_("./unpack-payload"), exports3);
        }, { "./attach": 53, "./broadcast": 55, "./broadcast-to-child-windows": 54, "./constants": 56, "./dispatch": 57, "./has-opener": 58, "./is-not-string": 60, "./message": 61, "./package-payload": 62, "./send-message": 63, "./subscribe-replier": 64, "./subscription-args-invalid": 65, "./types": 66, "./unpack-payload": 67 }], 60: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.isntString = void 0;
          function isntString(str) {
            return typeof str !== "string";
          }
          exports3.isntString = isntString;
        }, {}], 61: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.onMessage = void 0;
          var _1 = _dereq_("./");
          function onMessage(e) {
            if ((0, _1.isntString)(e.data)) {
              return;
            }
            var payload2 = (0, _1.unpackPayload)(e);
            if (!payload2) {
              return;
            }
            var data = payload2.eventData;
            var reply = payload2.reply;
            (0, _1.dispatch)("*", payload2.event, data, reply, e);
            (0, _1.dispatch)(e.origin, payload2.event, data, reply, e);
            (0, _1.broadcastToChildWindows)(e.data, payload2.origin, e.source);
          }
          exports3.onMessage = onMessage;
        }, { "./": 59 }], 62: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.packagePayload = void 0;
          var _1 = _dereq_("./");
          function packagePayload(event, origin, data, reply) {
            var packaged;
            var payload2 = {
              event,
              origin
            };
            if (typeof reply === "function") {
              payload2.reply = (0, _1.subscribeReplier)(reply, origin);
            }
            payload2.eventData = data;
            try {
              packaged = _1.prefix + JSON.stringify(payload2);
            } catch (e) {
              throw new Error("Could not stringify event: ".concat(e.message));
            }
            return packaged;
          }
          exports3.packagePayload = packagePayload;
        }, { "./": 59 }], 63: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.sendMessage = void 0;
          function sendMessage(frame, payload2, origin) {
            try {
              frame.postMessage(payload2, origin);
            } catch (error) {
            }
          }
          exports3.sendMessage = sendMessage;
        }, {}], 64: [function(_dereq_, module3, exports3) {
          "use strict";
          var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : { "default": mod };
          };
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.subscribeReplier = void 0;
          var framebus_1 = _dereq_("../framebus");
          var uuid_1 = __importDefault(_dereq_("@braintree/uuid"));
          function subscribeReplier(fn, origin) {
            var uuid = (0, uuid_1.default)();
            function replier(data, replyOriginHandler) {
              fn(data, replyOriginHandler);
              framebus_1.Framebus.target({
                origin
              }).off(uuid, replier);
            }
            framebus_1.Framebus.target({
              origin
            }).on(uuid, replier);
            return uuid;
          }
          exports3.subscribeReplier = subscribeReplier;
        }, { "../framebus": 51, "@braintree/uuid": 39 }], 65: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.subscriptionArgsInvalid = void 0;
          var _1 = _dereq_("./");
          function subscriptionArgsInvalid(event, fn, origin) {
            if ((0, _1.isntString)(event)) {
              return true;
            }
            if (typeof fn !== "function") {
              return true;
            }
            return (0, _1.isntString)(origin);
          }
          exports3.subscriptionArgsInvalid = subscriptionArgsInvalid;
        }, { "./": 59 }], 66: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
        }, {}], 67: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.unpackPayload = void 0;
          var _1 = _dereq_("./");
          function unpackPayload(e) {
            var payload2;
            if (e.data.slice(0, _1.prefix.length) !== _1.prefix) {
              return false;
            }
            try {
              payload2 = JSON.parse(e.data.slice(_1.prefix.length));
            } catch (err) {
              return false;
            }
            if (payload2.reply) {
              var replyOrigin_1 = e.origin;
              var replySource_1 = e.source;
              var replyEvent_1 = payload2.reply;
              payload2.reply = function reply(replyData) {
                if (!replySource_1) {
                  return;
                }
                var replyPayload = (0, _1.packagePayload)(replyEvent_1, replyOrigin_1, replyData);
                if (!replyPayload) {
                  return;
                }
                replySource_1.postMessage(replyPayload, replyOrigin_1);
              };
            }
            return payload2;
          }
          exports3.unpackPayload = unpackPayload;
        }, { "./": 59 }], 68: [function(_dereq_, module3, exports3) {
          "use strict";
          function finallyConstructor(callback) {
            var constructor = this.constructor;
            return this.then(
              function(value) {
                return constructor.resolve(callback()).then(function() {
                  return value;
                });
              },
              function(reason) {
                return constructor.resolve(callback()).then(function() {
                  return constructor.reject(reason);
                });
              }
            );
          }
          function allSettled(arr) {
            var P = this;
            return new P(function(resolve2, reject2) {
              if (!(arr && typeof arr.length !== "undefined")) {
                return reject2(
                  new TypeError(
                    typeof arr + " " + arr + " is not iterable(cannot read property Symbol(Symbol.iterator))"
                  )
                );
              }
              var args = Array.prototype.slice.call(arr);
              if (args.length === 0) return resolve2([]);
              var remaining = args.length;
              function res(i2, val) {
                if (val && (typeof val === "object" || typeof val === "function")) {
                  var then = val.then;
                  if (typeof then === "function") {
                    then.call(
                      val,
                      function(val2) {
                        res(i2, val2);
                      },
                      function(e) {
                        args[i2] = { status: "rejected", reason: e };
                        if (--remaining === 0) {
                          resolve2(args);
                        }
                      }
                    );
                    return;
                  }
                }
                args[i2] = { status: "fulfilled", value: val };
                if (--remaining === 0) {
                  resolve2(args);
                }
              }
              for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
              }
            });
          }
          var setTimeoutFunc = setTimeout;
          function isArray(x) {
            return Boolean(x && typeof x.length !== "undefined");
          }
          function noop() {
          }
          function bind(fn, thisArg) {
            return function() {
              fn.apply(thisArg, arguments);
            };
          }
          function Promise2(fn) {
            if (!(this instanceof Promise2))
              throw new TypeError("Promises must be constructed via new");
            if (typeof fn !== "function") throw new TypeError("not a function");
            this._state = 0;
            this._handled = false;
            this._value = void 0;
            this._deferreds = [];
            doResolve(fn, this);
          }
          function handle(self2, deferred) {
            while (self2._state === 3) {
              self2 = self2._value;
            }
            if (self2._state === 0) {
              self2._deferreds.push(deferred);
              return;
            }
            self2._handled = true;
            Promise2._immediateFn(function() {
              var cb = self2._state === 1 ? deferred.onFulfilled : deferred.onRejected;
              if (cb === null) {
                (self2._state === 1 ? resolve : reject)(deferred.promise, self2._value);
                return;
              }
              var ret;
              try {
                ret = cb(self2._value);
              } catch (e) {
                reject(deferred.promise, e);
                return;
              }
              resolve(deferred.promise, ret);
            });
          }
          function resolve(self2, newValue) {
            try {
              if (newValue === self2)
                throw new TypeError("A promise cannot be resolved with itself.");
              if (newValue && (typeof newValue === "object" || typeof newValue === "function")) {
                var then = newValue.then;
                if (newValue instanceof Promise2) {
                  self2._state = 3;
                  self2._value = newValue;
                  finale(self2);
                  return;
                } else if (typeof then === "function") {
                  doResolve(bind(then, newValue), self2);
                  return;
                }
              }
              self2._state = 1;
              self2._value = newValue;
              finale(self2);
            } catch (e) {
              reject(self2, e);
            }
          }
          function reject(self2, newValue) {
            self2._state = 2;
            self2._value = newValue;
            finale(self2);
          }
          function finale(self2) {
            if (self2._state === 2 && self2._deferreds.length === 0) {
              Promise2._immediateFn(function() {
                if (!self2._handled) {
                  Promise2._unhandledRejectionFn(self2._value);
                }
              });
            }
            for (var i = 0, len = self2._deferreds.length; i < len; i++) {
              handle(self2, self2._deferreds[i]);
            }
            self2._deferreds = null;
          }
          function Handler(onFulfilled, onRejected, promise) {
            this.onFulfilled = typeof onFulfilled === "function" ? onFulfilled : null;
            this.onRejected = typeof onRejected === "function" ? onRejected : null;
            this.promise = promise;
          }
          function doResolve(fn, self2) {
            var done = false;
            try {
              fn(
                function(value) {
                  if (done) return;
                  done = true;
                  resolve(self2, value);
                },
                function(reason) {
                  if (done) return;
                  done = true;
                  reject(self2, reason);
                }
              );
            } catch (ex) {
              if (done) return;
              done = true;
              reject(self2, ex);
            }
          }
          Promise2.prototype["catch"] = function(onRejected) {
            return this.then(null, onRejected);
          };
          Promise2.prototype.then = function(onFulfilled, onRejected) {
            var prom = new this.constructor(noop);
            handle(this, new Handler(onFulfilled, onRejected, prom));
            return prom;
          };
          Promise2.prototype["finally"] = finallyConstructor;
          Promise2.all = function(arr) {
            return new Promise2(function(resolve2, reject2) {
              if (!isArray(arr)) {
                return reject2(new TypeError("Promise.all accepts an array"));
              }
              var args = Array.prototype.slice.call(arr);
              if (args.length === 0) return resolve2([]);
              var remaining = args.length;
              function res(i2, val) {
                try {
                  if (val && (typeof val === "object" || typeof val === "function")) {
                    var then = val.then;
                    if (typeof then === "function") {
                      then.call(
                        val,
                        function(val2) {
                          res(i2, val2);
                        },
                        reject2
                      );
                      return;
                    }
                  }
                  args[i2] = val;
                  if (--remaining === 0) {
                    resolve2(args);
                  }
                } catch (ex) {
                  reject2(ex);
                }
              }
              for (var i = 0; i < args.length; i++) {
                res(i, args[i]);
              }
            });
          };
          Promise2.allSettled = allSettled;
          Promise2.resolve = function(value) {
            if (value && typeof value === "object" && value.constructor === Promise2) {
              return value;
            }
            return new Promise2(function(resolve2) {
              resolve2(value);
            });
          };
          Promise2.reject = function(value) {
            return new Promise2(function(resolve2, reject2) {
              reject2(value);
            });
          };
          Promise2.race = function(arr) {
            return new Promise2(function(resolve2, reject2) {
              if (!isArray(arr)) {
                return reject2(new TypeError("Promise.race accepts an array"));
              }
              for (var i = 0, len = arr.length; i < len; i++) {
                Promise2.resolve(arr[i]).then(resolve2, reject2);
              }
            });
          };
          Promise2._immediateFn = // @ts-ignore
          typeof setImmediate === "function" && function(fn) {
            setImmediate(fn);
          } || function(fn) {
            setTimeoutFunc(fn, 0);
          };
          Promise2._unhandledRejectionFn = function _unhandledRejectionFn(err) {
            if (typeof console !== "undefined" && console) {
              console.warn("Possible Unhandled Promise Rejection:", err);
            }
          };
          module3.exports = Promise2;
        }, {}], 69: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.isIos = exports3.isIE9 = exports3.isSamsungBrowser = exports3.isAndroidChrome = exports3.isKitKatWebview = void 0;
          var UA = typeof window !== "undefined" && window.navigator && window.navigator.userAgent;
          var isAndroid = _dereq_("@braintree/browser-detection/is-android");
          var isChromeOs = _dereq_("@braintree/browser-detection/is-chrome-os");
          var isChrome = _dereq_("@braintree/browser-detection/is-chrome");
          var isIos = _dereq_("@braintree/browser-detection/is-ios");
          exports3.isIos = isIos;
          var isIE9 = _dereq_("@braintree/browser-detection/is-ie9");
          exports3.isIE9 = isIE9;
          var KITKAT_WEBVIEW_REGEX = /Version\/\d\.\d* Chrome\/\d*\.0\.0\.0/;
          function isOldSamsungBrowserOrSamsungWebview(ua) {
            return !isChrome(ua) && ua.indexOf("Samsung") > -1;
          }
          function isKitKatWebview(ua) {
            if (ua === void 0) {
              ua = UA;
            }
            return isAndroid(ua) && KITKAT_WEBVIEW_REGEX.test(ua);
          }
          exports3.isKitKatWebview = isKitKatWebview;
          function isAndroidChrome(ua) {
            if (ua === void 0) {
              ua = UA;
            }
            return (isAndroid(ua) || isChromeOs(ua)) && isChrome(ua);
          }
          exports3.isAndroidChrome = isAndroidChrome;
          function isSamsungBrowser(ua) {
            if (ua === void 0) {
              ua = UA;
            }
            return /SamsungBrowser/.test(ua) || isOldSamsungBrowserOrSamsungWebview(ua);
          }
          exports3.isSamsungBrowser = isSamsungBrowser;
        }, { "@braintree/browser-detection/is-android": 22, "@braintree/browser-detection/is-chrome": 24, "@braintree/browser-detection/is-chrome-os": 23, "@braintree/browser-detection/is-ie9": 26, "@braintree/browser-detection/is-ios": 30 }], 70: [function(_dereq_, module3, exports3) {
          "use strict";
          var device_1 = _dereq_("./lib/device");
          module3.exports = function supportsInputFormatting() {
            return !(0, device_1.isSamsungBrowser)();
          };
        }, { "./lib/device": 69 }], 71: [function(_dereq_, module3, exports3) {
          module3.exports = _dereq_("./dist/supports-input-formatting");
        }, { "./dist/supports-input-formatting": 70 }], 72: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var errors = _dereq_("./errors");
          var assign = _dereq_("../lib/assign").assign;
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function AmericanExpress(options) {
            this._client = options.client;
          }
          AmericanExpress.prototype.getRewardsBalance = function(options) {
            var nonce = options.nonce;
            var data;
            if (!nonce) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.AMEX_NONCE_REQUIRED.type,
                  code: errors.AMEX_NONCE_REQUIRED.code,
                  message: "getRewardsBalance must be called with a nonce."
                })
              );
            }
            data = assign(
              {
                _meta: { source: "american-express" },
                paymentMethodNonce: nonce
              },
              options
            );
            delete data.nonce;
            return this._client.request({
              method: "get",
              endpoint: "payment_methods/amex_rewards_balance",
              data
            }).catch(function(err) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.AMEX_NETWORK_ERROR.type,
                  code: errors.AMEX_NETWORK_ERROR.code,
                  message: "A network error occurred when getting the American Express rewards balance.",
                  details: {
                    originalError: err
                  }
                })
              );
            });
          };
          AmericanExpress.prototype.getExpressCheckoutProfile = function(options) {
            if (!options.nonce) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.AMEX_NONCE_REQUIRED.type,
                  code: errors.AMEX_NONCE_REQUIRED.code,
                  message: "getExpressCheckoutProfile must be called with a nonce."
                })
              );
            }
            return this._client.request({
              method: "get",
              endpoint: "payment_methods/amex_express_checkout_cards/" + options.nonce,
              data: {
                _meta: { source: "american-express" },
                paymentMethodNonce: options.nonce
              }
            }).catch(function(err) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.AMEX_NETWORK_ERROR.type,
                  code: errors.AMEX_NETWORK_ERROR.code,
                  message: "A network error occurred when getting the American Express Checkout nonce profile.",
                  details: {
                    originalError: err
                  }
                })
              );
            });
          };
          AmericanExpress.prototype.teardown = function() {
            convertMethodsToError(this, methods(AmericanExpress.prototype));
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(AmericanExpress);
        }, { "../lib/assign": 121, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/methods": 155, "./errors": 73, "@braintree/wrap-promise": 43 }], 73: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            AMEX_NONCE_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "AMEX_NONCE_REQUIRED"
            },
            AMEX_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "AMEX_NETWORK_ERROR"
            }
          };
        }, { "../lib/braintree-error": 124 }], 74: [function(_dereq_, module3, exports3) {
          "use strict";
          var AmericanExpress = _dereq_("./american-express");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "American Express";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              options.client = client;
              return new AmericanExpress(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./american-express": 72, "@braintree/wrap-promise": 43 }], 75: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./errors");
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function ApplePay(options) {
            this._instantiatedWithClient = Boolean(!options.useDeferredClient);
            this._client = options.client;
            this._createPromise = options.createPromise;
            if (this._client) {
              this._setMerchantIdentifier();
            }
          }
          ApplePay.prototype._waitForClient = function() {
            if (this._client) {
              return Promise.resolve();
            }
            return this._createPromise.then(
              function(client) {
                this._client = client;
                this._setMerchantIdentifier();
              }.bind(this)
            );
          };
          ApplePay.prototype._setMerchantIdentifier = function() {
            var applePayConfig = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
            if (!applePayConfig) {
              return;
            }
            Object.defineProperty(this, "merchantIdentifier", {
              value: applePayConfig.merchantIdentifier,
              configurable: false,
              writable: false
            });
          };
          ApplePay.prototype.createPaymentRequest = function(paymentRequest) {
            if (this._instantiatedWithClient) {
              return this._createPaymentRequestSynchronously(paymentRequest);
            }
            return this._waitForClient().then(
              function() {
                return this._createPaymentRequestSynchronously(paymentRequest);
              }.bind(this)
            );
          };
          ApplePay.prototype._createPaymentRequestSynchronously = function(paymentRequest) {
            var applePay = this._client.getConfiguration().gatewayConfiguration.applePayWeb;
            var defaults = {
              countryCode: applePay.countryCode,
              currencyCode: applePay.currencyCode,
              merchantCapabilities: applePay.merchantCapabilities || ["supports3DS"],
              supportedNetworks: applePay.supportedNetworks.map(function(network) {
                return network === "mastercard" ? "masterCard" : network;
              })
            };
            return Object.assign({}, defaults, paymentRequest);
          };
          ApplePay.prototype.performValidation = function(options) {
            var self2 = this;
            if (!options || !options.validationURL) {
              return Promise.reject(
                new BraintreeError(errors.APPLE_PAY_VALIDATION_URL_REQUIRED)
              );
            }
            return this._waitForClient().then(function() {
              var applePayWebSession = {
                validationUrl: options.validationURL,
                domainName: options.domainName || window.location.hostname,
                merchantIdentifier: options.merchantIdentifier || self2.merchantIdentifier
              };
              if (options.displayName != null) {
                applePayWebSession.displayName = options.displayName;
              }
              return self2._client.request({
                method: "post",
                endpoint: "apple_pay_web/sessions",
                data: {
                  _meta: { source: "apple-pay" },
                  applePayWebSession
                }
              });
            }).then(function(response2) {
              analytics.sendEvent(self2._client, "applepay.performValidation.succeeded");
              return Promise.resolve(response2);
            }).catch(function(err) {
              analytics.sendEvent(self2._client, "applepay.performValidation.failed");
              if (err.code === "CLIENT_REQUEST_ERROR") {
                return Promise.reject(
                  new BraintreeError({
                    type: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.type,
                    code: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.code,
                    message: errors.APPLE_PAY_MERCHANT_VALIDATION_FAILED.message,
                    details: {
                      originalError: err.details.originalError
                    }
                  })
                );
              }
              return Promise.reject(
                new BraintreeError({
                  type: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.type,
                  code: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.code,
                  message: errors.APPLE_PAY_MERCHANT_VALIDATION_NETWORK.message,
                  details: {
                    originalError: err
                  }
                })
              );
            });
          };
          ApplePay.prototype.tokenize = function(options) {
            var self2 = this;
            if (!options.token) {
              return Promise.reject(
                new BraintreeError(errors.APPLE_PAY_PAYMENT_TOKEN_REQUIRED)
              );
            }
            return this._waitForClient().then(function() {
              return self2._client.request({
                method: "post",
                endpoint: "payment_methods/apple_payment_tokens",
                data: {
                  _meta: {
                    source: "apple-pay"
                  },
                  applePaymentToken: Object.assign({}, options.token, {
                    // The gateway requires this key to be base64-encoded.
                    paymentData: btoa(JSON.stringify(options.token.paymentData))
                  })
                }
              });
            }).then(function(response2) {
              analytics.sendEvent(self2._client, "applepay.tokenize.succeeded");
              return Promise.resolve(response2.applePayCards[0]);
            }).catch(function(err) {
              analytics.sendEvent(self2._client, "applepay.tokenize.failed");
              return Promise.reject(
                new BraintreeError({
                  type: errors.APPLE_PAY_TOKENIZATION.type,
                  code: errors.APPLE_PAY_TOKENIZATION.code,
                  message: errors.APPLE_PAY_TOKENIZATION.message,
                  details: {
                    originalError: err
                  }
                })
              );
            });
          };
          ApplePay.prototype.teardown = function() {
            convertMethodsToError(this, methods(ApplePay.prototype));
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(ApplePay);
        }, { "../lib/analytics": 119, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/methods": 155, "./errors": 76, "@braintree/wrap-promise": 43 }], 76: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            APPLE_PAY_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "APPLE_PAY_NOT_ENABLED",
              message: "Apple Pay is not enabled for this merchant."
            },
            APPLE_PAY_VALIDATION_URL_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "APPLE_PAY_VALIDATION_URL_REQUIRED",
              message: "performValidation must be called with a validationURL."
            },
            APPLE_PAY_MERCHANT_VALIDATION_NETWORK: {
              type: BraintreeError.types.NETWORK,
              code: "APPLE_PAY_MERCHANT_VALIDATION_NETWORK",
              message: "A network error occurred when validating the Apple Pay merchant."
            },
            APPLE_PAY_MERCHANT_VALIDATION_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "APPLE_PAY_MERCHANT_VALIDATION_FAILED",
              message: "Make sure you have registered your domain name in the Braintree Control Panel."
            },
            APPLE_PAY_PAYMENT_TOKEN_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "APPLE_PAY_PAYMENT_TOKEN_REQUIRED",
              message: "tokenize must be called with a payment token."
            },
            APPLE_PAY_TOKENIZATION: {
              type: BraintreeError.types.NETWORK,
              code: "APPLE_PAY_TOKENIZATION",
              message: "A network error occurred when processing the Apple Pay payment."
            }
          };
        }, { "../lib/braintree-error": 124 }], 77: [function(_dereq_, module3, exports3) {
          "use strict";
          var ApplePay = _dereq_("./apple-pay");
          var analytics = _dereq_("../lib/analytics");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var errors = _dereq_("./errors");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "Apple Pay";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var applePayInstance;
              var createPromise = createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              }).then(function(client) {
                if (!client.getConfiguration().gatewayConfiguration.applePayWeb) {
                  return Promise.reject(
                    new BraintreeError(errors.APPLE_PAY_NOT_ENABLED)
                  );
                }
                analytics.sendEvent(client, "applepay.initialized");
                return client;
              });
              options.createPromise = createPromise;
              applePayInstance = new ApplePay(options);
              if (!options.useDeferredClient) {
                return createPromise.then(function(client) {
                  applePayInstance._client = client;
                  return applePayInstance;
                });
              }
              return applePayInstance;
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./apple-pay": 75, "./errors": 76, "@braintree/wrap-promise": 43 }], 78: [function(_dereq_, module3, exports3) {
          "use strict";
          var BRAINTREE_VERSION = _dereq_("./constants").BRAINTREE_VERSION;
          var GraphQL = _dereq_("./request/graphql");
          var request = _dereq_("./request");
          var isVerifiedDomain = _dereq_("../lib/is-verified-domain");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var convertToBraintreeError = _dereq_("../lib/convert-to-braintree-error");
          var getGatewayConfiguration = _dereq_("./get-configuration").getConfiguration;
          var createAuthorizationData = _dereq_("../lib/create-authorization-data");
          var addMetadata = _dereq_("../lib/add-metadata");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var once = _dereq_("../lib/once");
          var deferred = _dereq_("../lib/deferred");
          var assign = _dereq_("../lib/assign").assign;
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./errors");
          var VERSION = _dereq_("../lib/constants").VERSION;
          var GRAPHQL_URLS = _dereq_("../lib/constants").GRAPHQL_URLS;
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var assets = _dereq_("../lib/assets");
          var FRAUDNET_FNCLS = _dereq_("../lib/constants").FRAUDNET_FNCLS;
          var FRAUDNET_SOURCE = _dereq_("../lib/constants").FRAUDNET_SOURCE;
          var FRAUDNET_URL = _dereq_("../lib/constants").FRAUDNET_URL;
          var cachedClients = {};
          function Client(configuration) {
            var configurationJSON, gatewayConfiguration;
            configuration = configuration || {};
            configurationJSON = JSON.stringify(configuration);
            gatewayConfiguration = configuration.gatewayConfiguration;
            if (!gatewayConfiguration) {
              throw new BraintreeError(errors.CLIENT_MISSING_GATEWAY_CONFIGURATION);
            }
            ["assetsUrl", "clientApiUrl", "configUrl"].forEach(function(property) {
              if (property in gatewayConfiguration && !isVerifiedDomain(gatewayConfiguration[property])) {
                throw new BraintreeError({
                  type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
                  code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
                  message: property + " property is on an invalid domain."
                });
              }
            });
            this.getConfiguration = function() {
              return JSON.parse(configurationJSON);
            };
            this._request = request;
            this._configuration = this.getConfiguration();
            this._clientApiBaseUrl = gatewayConfiguration.clientApiUrl + "/v1/";
            if (gatewayConfiguration.graphQL) {
              if (!isVerifiedDomain(gatewayConfiguration.graphQL.url)) {
                throw new BraintreeError({
                  type: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.type,
                  code: errors.CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN.code,
                  message: "graphQL.url property is on an invalid domain."
                });
              }
              this._graphQL = new GraphQL({
                graphQL: gatewayConfiguration.graphQL
              });
            }
          }
          Client.initialize = function(options) {
            var clientInstance2, authData;
            var promise = cachedClients[options.authorization];
            if (promise) {
              analytics.sendEvent(promise, "custom.client.load.cached");
              return promise;
            }
            try {
              authData = createAuthorizationData(options.authorization);
            } catch (err) {
              return Promise.reject(
                new BraintreeError(errors.CLIENT_INVALID_AUTHORIZATION)
              );
            }
            promise = getGatewayConfiguration(authData).then(function(configuration) {
              if (options.debug) {
                configuration.isDebug = true;
              }
              configuration.authorization = options.authorization;
              clientInstance2 = new Client(configuration);
              return clientInstance2;
            });
            cachedClients[options.authorization] = promise;
            analytics.sendEvent(promise, "custom.client.load.initialized");
            return promise.then(function(client) {
              analytics.sendEvent(clientInstance2, "custom.client.load.succeeded");
              return client;
            }).catch(function(err) {
              delete cachedClients[options.authorization];
              return Promise.reject(err);
            });
          };
          Client.clearCache = function() {
            cachedClients = {};
          };
          Client.prototype._findOrCreateFraudnetJSON = function(clientMetadataId) {
            var el = document.querySelector('script[fncls="' + FRAUDNET_FNCLS + '"]');
            var config, additionalData, authorizationFingerprint, parameters;
            if (!el) {
              el = document.body.appendChild(document.createElement("script"));
              el.type = "application/json";
              el.setAttribute("fncls", FRAUDNET_FNCLS);
            }
            config = this.getConfiguration();
            additionalData = {
              rda_tenant: "bt_card",
              // eslint-disable-line camelcase
              mid: config.gatewayConfiguration.merchantId
            };
            authorizationFingerprint = config.authorizationFingerprint;
            if (authorizationFingerprint) {
              authorizationFingerprint.split("&").forEach(function(pieces) {
                var component = pieces.split("=");
                if (component[0] === "customer_id" && component.length > 1) {
                  additionalData.cid = component[1];
                }
              });
            }
            parameters = {
              f: clientMetadataId.substr(0, 32),
              fp: additionalData,
              bu: false,
              s: FRAUDNET_SOURCE
            };
            el.text = JSON.stringify(parameters);
          };
          Client.prototype.request = function(options, callback) {
            var self2 = this;
            var requestPromise = new Promise(function(resolve, reject) {
              var optionName, api, baseUrl, requestOptions;
              var shouldCollectData = Boolean(
                options.endpoint === "payment_methods/credit_cards" && self2.getConfiguration().gatewayConfiguration.creditCards.collectDeviceData
              );
              if (options.api !== "graphQLApi") {
                if (!options.method) {
                  optionName = "options.method";
                } else if (!options.endpoint) {
                  optionName = "options.endpoint";
                }
              }
              if (optionName) {
                throw new BraintreeError({
                  type: errors.CLIENT_OPTION_REQUIRED.type,
                  code: errors.CLIENT_OPTION_REQUIRED.code,
                  message: optionName + " is required when making a request."
                });
              }
              if ("api" in options) {
                api = options.api;
              } else {
                api = "clientApi";
              }
              requestOptions = {
                method: options.method,
                graphQL: self2._graphQL,
                timeout: options.timeout,
                metadata: self2._configuration.analyticsMetadata
              };
              if (api === "clientApi") {
                baseUrl = self2._clientApiBaseUrl;
                requestOptions.data = addMetadata(self2._configuration, options.data);
              } else if (api === "graphQLApi") {
                baseUrl = GRAPHQL_URLS[self2._configuration.gatewayConfiguration.environment];
                options.endpoint = "";
                requestOptions.method = "post";
                requestOptions.data = assign(
                  {
                    clientSdkMetadata: {
                      platform: self2._configuration.analyticsMetadata.platform,
                      source: self2._configuration.analyticsMetadata.source,
                      integration: self2._configuration.analyticsMetadata.integration,
                      sessionId: self2._configuration.analyticsMetadata.sessionId,
                      version: VERSION
                    }
                  },
                  options.data
                );
                requestOptions.headers = getAuthorizationHeadersForGraphQL(
                  self2._configuration
                );
              } else {
                throw new BraintreeError({
                  type: errors.CLIENT_OPTION_INVALID.type,
                  code: errors.CLIENT_OPTION_INVALID.code,
                  message: "options.api is invalid."
                });
              }
              requestOptions.url = baseUrl + options.endpoint;
              requestOptions.sendAnalyticsEvent = function(kind) {
                analytics.sendEvent(self2, kind);
              };
              self2._request(requestOptions, function(err, data, status) {
                var resolvedData, requestError;
                requestError = formatRequestError(status, err);
                if (requestError) {
                  reject(requestError);
                  return;
                }
                if (api === "graphQLApi" && data.errors) {
                  reject(
                    convertToBraintreeError(data.errors, {
                      type: errors.CLIENT_GRAPHQL_REQUEST_ERROR.type,
                      code: errors.CLIENT_GRAPHQL_REQUEST_ERROR.code,
                      message: errors.CLIENT_GRAPHQL_REQUEST_ERROR.message
                    })
                  );
                  return;
                }
                resolvedData = assign({ _httpStatus: status }, data);
                if (shouldCollectData && resolvedData.creditCards && resolvedData.creditCards.length > 0) {
                  self2._findOrCreateFraudnetJSON(resolvedData.creditCards[0].nonce);
                  assets.loadScript({
                    src: FRAUDNET_URL,
                    forceScriptReload: true
                  });
                }
                resolve(resolvedData);
              });
            });
            if (typeof callback === "function") {
              callback = once(deferred(callback));
              requestPromise.then(function(response2) {
                callback(null, response2, response2._httpStatus);
              }).catch(function(err) {
                var status = err && err.details && err.details.httpStatus;
                callback(err, null, status);
              });
              return;
            }
            return requestPromise;
          };
          function formatRequestError(status, err) {
            var requestError;
            if (status === -1) {
              requestError = new BraintreeError(errors.CLIENT_REQUEST_TIMEOUT);
            } else if (status === 401) {
              requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INVALID);
            } else if (status === 403) {
              requestError = new BraintreeError(errors.CLIENT_AUTHORIZATION_INSUFFICIENT);
            } else if (status === 429) {
              requestError = new BraintreeError(errors.CLIENT_RATE_LIMITED);
            } else if (status >= 500) {
              requestError = new BraintreeError(errors.CLIENT_GATEWAY_NETWORK);
            } else if (status < 200 || status >= 400) {
              requestError = convertToBraintreeError(err, {
                type: errors.CLIENT_REQUEST_ERROR.type,
                code: errors.CLIENT_REQUEST_ERROR.code,
                message: errors.CLIENT_REQUEST_ERROR.message
              });
            }
            if (requestError) {
              requestError.details = requestError.details || {};
              requestError.details.httpStatus = status;
              return requestError;
            }
          }
          Client.prototype.toJSON = function() {
            return this.getConfiguration();
          };
          Client.prototype.getVersion = function() {
            return VERSION;
          };
          Client.prototype.teardown = wrapPromise(function() {
            var self2 = this;
            delete cachedClients[self2.getConfiguration().authorization];
            convertMethodsToError(self2, methods(Client.prototype));
            return Promise.resolve();
          });
          function getAuthorizationHeadersForGraphQL(configuration) {
            var token = configuration.authorizationFingerprint || configuration.authorization;
            return {
              Authorization: "Bearer " + token,
              "Braintree-Version": BRAINTREE_VERSION
            };
          }
          module3.exports = Client;
        }, { "../lib/add-metadata": 118, "../lib/analytics": 119, "../lib/assets": 120, "../lib/assign": 121, "../lib/braintree-error": 124, "../lib/constants": 126, "../lib/convert-methods-to-error": 127, "../lib/convert-to-braintree-error": 128, "../lib/create-authorization-data": 130, "../lib/deferred": 132, "../lib/is-verified-domain": 153, "../lib/methods": 155, "../lib/once": 156, "./constants": 79, "./errors": 80, "./get-configuration": 81, "./request": 92, "./request/graphql": 90, "@braintree/wrap-promise": 43 }], 79: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            BRAINTREE_VERSION: "2018-05-10"
          };
        }, {}], 80: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_GATEWAY_CONFIGURATION_INVALID_DOMAIN"
            },
            CLIENT_OPTION_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_OPTION_REQUIRED"
            },
            CLIENT_OPTION_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_OPTION_INVALID"
            },
            CLIENT_MISSING_GATEWAY_CONFIGURATION: {
              type: BraintreeError.types.INTERNAL,
              code: "CLIENT_MISSING_GATEWAY_CONFIGURATION",
              message: "Missing gatewayConfiguration."
            },
            CLIENT_INVALID_AUTHORIZATION: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_INVALID_AUTHORIZATION",
              message: "Authorization is invalid. Make sure your client token or tokenization key is valid."
            },
            CLIENT_GATEWAY_NETWORK: {
              type: BraintreeError.types.NETWORK,
              code: "CLIENT_GATEWAY_NETWORK",
              message: "Cannot contact the gateway at this time."
            },
            CLIENT_REQUEST_TIMEOUT: {
              type: BraintreeError.types.NETWORK,
              code: "CLIENT_REQUEST_TIMEOUT",
              message: "Request timed out waiting for a reply."
            },
            CLIENT_REQUEST_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "CLIENT_REQUEST_ERROR",
              message: "There was a problem with your request."
            },
            CLIENT_GRAPHQL_REQUEST_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "CLIENT_GRAPHQL_REQUEST_ERROR",
              message: "There was a problem with your request."
            },
            CLIENT_RATE_LIMITED: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_RATE_LIMITED",
              message: "You are being rate-limited; please try again in a few minutes."
            },
            CLIENT_AUTHORIZATION_INSUFFICIENT: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_AUTHORIZATION_INSUFFICIENT",
              message: "The authorization used has insufficient privileges."
            },
            CLIENT_AUTHORIZATION_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "CLIENT_AUTHORIZATION_INVALID",
              message: "Either the client token has expired and a new one should be generated or the tokenization key has been deactivated or deleted."
            }
          };
        }, { "../lib/braintree-error": 124 }], 81: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var request = _dereq_("./request");
          var uuid = _dereq_("@braintree/uuid");
          var constants = _dereq_("../lib/constants");
          var errors = _dereq_("./errors");
          var GraphQL = _dereq_("./request/graphql");
          var GRAPHQL_URLS = _dereq_("../lib/constants").GRAPHQL_URLS;
          var isDateStringBeforeOrOn = _dereq_("../lib/is-date-string-before-or-on");
          var BRAINTREE_VERSION = _dereq_("./constants").BRAINTREE_VERSION;
          function getConfiguration(authData) {
            return new Promise(function(resolve, reject) {
              var configuration, attrs, configUrl, reqOptions;
              var sessionId = uuid();
              var analyticsMetadata = {
                merchantAppId: window.location.host,
                platform: constants.PLATFORM,
                sdkVersion: constants.VERSION,
                source: constants.SOURCE,
                // NEXT_MAJOR_VERSION remove one of these to not duplicate data. Target parity with mobile platforms approach.
                integration: constants.INTEGRATION,
                integrationType: constants.INTEGRATION,
                sessionId
              };
              attrs = authData.attrs;
              configUrl = authData.configUrl;
              attrs._meta = analyticsMetadata;
              attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
              attrs.configVersion = "3";
              reqOptions = {
                url: configUrl,
                method: "GET",
                data: attrs
              };
              if (attrs.authorizationFingerprint && authData.graphQL) {
                if (isDateStringBeforeOrOn(authData.graphQL.date, BRAINTREE_VERSION)) {
                  reqOptions.graphQL = new GraphQL({
                    graphQL: {
                      url: authData.graphQL.url,
                      features: ["configuration"]
                    }
                  });
                }
                reqOptions.metadata = analyticsMetadata;
              } else if (attrs.tokenizationKey) {
                reqOptions.graphQL = new GraphQL({
                  graphQL: {
                    url: GRAPHQL_URLS[authData.environment],
                    features: ["configuration"]
                  }
                });
                reqOptions.metadata = analyticsMetadata;
              }
              request(reqOptions, function(err, response2, status) {
                var errorTemplate;
                if (err) {
                  if (status === 403) {
                    errorTemplate = errors.CLIENT_AUTHORIZATION_INSUFFICIENT;
                  } else if (status === 401) {
                    errorTemplate = errors.CLIENT_AUTHORIZATION_INVALID;
                  } else {
                    errorTemplate = errors.CLIENT_GATEWAY_NETWORK;
                  }
                  reject(
                    new BraintreeError({
                      type: errorTemplate.type,
                      code: errorTemplate.code,
                      message: errorTemplate.message,
                      details: {
                        originalError: err
                      }
                    })
                  );
                  return;
                }
                configuration = {
                  authorizationType: attrs.tokenizationKey ? "TOKENIZATION_KEY" : "CLIENT_TOKEN",
                  authorizationFingerprint: attrs.authorizationFingerprint,
                  analyticsMetadata,
                  gatewayConfiguration: response2
                };
                resolve(configuration);
              });
            });
          }
          module3.exports = {
            getConfiguration: wrapPromise(getConfiguration)
          };
        }, { "../lib/braintree-error": 124, "../lib/constants": 126, "../lib/is-date-string-before-or-on": 151, "./constants": 79, "./errors": 80, "./request": 92, "./request/graphql": 90, "@braintree/uuid": 39, "@braintree/wrap-promise": 43 }], 82: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var Client = _dereq_("./client");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var sharedErrors = _dereq_("../lib/errors");
          function create(options) {
            if (!options.authorization) {
              return Promise.reject(
                new BraintreeError({
                  type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
                  code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
                  message: "options.authorization is required when instantiating a client."
                })
              );
            }
            return Client.initialize(options);
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/braintree-error": 124, "../lib/errors": 135, "./client": 78, "@braintree/wrap-promise": 43 }], 83: [function(_dereq_, module3, exports3) {
          "use strict";
          var querystring = _dereq_("../../lib/querystring");
          var assign = _dereq_("../../lib/assign").assign;
          var prepBody = _dereq_("./prep-body");
          var parseBody = _dereq_("./parse-body");
          var xhr = _dereq_("./xhr");
          var isXHRAvailable = xhr.isAvailable;
          var GraphQLRequest = _dereq_("./graphql/request");
          var DefaultRequest = _dereq_("./default-request");
          var MAX_TCP_RETRYCOUNT = 1;
          var TCP_PRECONNECT_BUG_STATUS_CODE = 408;
          function requestShouldRetry(status) {
            return !status || status === TCP_PRECONNECT_BUG_STATUS_CODE;
          }
          function graphQLRequestShouldRetryWithClientApi(body) {
            var errorClass = !body.data && body.errors && body.errors[0] && body.errors[0].extensions && body.errors[0].extensions.errorClass;
            return errorClass === "UNKNOWN" || errorClass === "INTERNAL";
          }
          function _requestWithRetry(options, tcpRetryCount, cb) {
            var status, resBody, ajaxRequest, body, method, headers, parsedBody;
            var url = options.url;
            var graphQL = options.graphQL;
            var timeout = options.timeout;
            var req = xhr.getRequestObject();
            var callback = cb;
            var isGraphQLRequest = Boolean(
              graphQL && graphQL.isGraphQLRequest(url, options.data)
            );
            options.headers = assign(
              { "Content-Type": "application/json" },
              options.headers
            );
            if (isGraphQLRequest) {
              ajaxRequest = new GraphQLRequest(options);
            } else {
              ajaxRequest = new DefaultRequest(options);
            }
            url = ajaxRequest.getUrl();
            body = ajaxRequest.getBody();
            method = ajaxRequest.getMethod();
            headers = ajaxRequest.getHeaders();
            if (method === "GET") {
              url = querystring.queryify(url, body);
              body = null;
            }
            if (isXHRAvailable) {
              req.onreadystatechange = function() {
                if (req.readyState !== 4) {
                  return;
                }
                if (req.status === 0 && isGraphQLRequest) {
                  delete options.graphQL;
                  _requestWithRetry(options, tcpRetryCount, cb);
                  return;
                }
                parsedBody = parseBody(req.responseText);
                resBody = ajaxRequest.adaptResponseBody(parsedBody);
                status = ajaxRequest.determineStatus(req.status, parsedBody);
                if (status >= 400 || status < 200) {
                  if (isGraphQLRequest && graphQLRequestShouldRetryWithClientApi(parsedBody)) {
                    delete options.graphQL;
                    _requestWithRetry(options, tcpRetryCount, cb);
                    return;
                  }
                  if (tcpRetryCount < MAX_TCP_RETRYCOUNT && requestShouldRetry(status)) {
                    tcpRetryCount++;
                    _requestWithRetry(options, tcpRetryCount, cb);
                    return;
                  }
                  callback(resBody || "error", null, status || 500);
                } else {
                  callback(null, resBody, status);
                }
              };
            } else {
              if (options.headers) {
                url = querystring.queryify(url, headers);
              }
              req.onload = function() {
                callback(null, parseBody(req.responseText), req.status);
              };
              req.onerror = function() {
                callback("error", null, 500);
              };
              req.onprogress = function() {
              };
              req.ontimeout = function() {
                callback("timeout", null, -1);
              };
            }
            try {
              req.open(method, url, true);
            } catch (requestOpenError) {
              if (!isGraphQLRequest) {
                throw requestOpenError;
              }
              delete options.graphQL;
              _requestWithRetry(options, tcpRetryCount, cb);
              return;
            }
            req.timeout = timeout;
            if (isXHRAvailable) {
              Object.keys(headers).forEach(function(headerKey) {
                req.setRequestHeader(headerKey, headers[headerKey]);
              });
            }
            try {
              req.send(prepBody(method, body));
            } catch (e) {
            }
          }
          function request(options, cb) {
            _requestWithRetry(options, 0, cb);
          }
          module3.exports = {
            request
          };
        }, { "../../lib/assign": 121, "../../lib/querystring": 157, "./default-request": 84, "./graphql/request": 91, "./parse-body": 93, "./prep-body": 94, "./xhr": 95 }], 84: [function(_dereq_, module3, exports3) {
          "use strict";
          function DefaultRequest(options) {
            this._url = options.url;
            this._data = options.data;
            this._method = options.method;
            this._headers = options.headers;
          }
          DefaultRequest.prototype.getUrl = function() {
            return this._url;
          };
          DefaultRequest.prototype.getBody = function() {
            return this._data;
          };
          DefaultRequest.prototype.getMethod = function() {
            return this._method;
          };
          DefaultRequest.prototype.getHeaders = function() {
            return this._headers;
          };
          DefaultRequest.prototype.adaptResponseBody = function(parsedBody) {
            return parsedBody;
          };
          DefaultRequest.prototype.determineStatus = function(status) {
            return status;
          };
          module3.exports = DefaultRequest;
        }, {}], 85: [function(_dereq_, module3, exports3) {
          "use strict";
          var errorResponseAdapter = _dereq_("./error");
          var assign = _dereq_("../../../../lib/assign").assign;
          var cardTypeTransforms = {
            creditCard: {
              AMERICAN_EXPRESS: "American Express",
              DISCOVER: "Discover",
              INTERNATIONAL_MAESTRO: "Maestro",
              JCB: "JCB",
              MASTERCARD: "MasterCard",
              SOLO: "Solo",
              UK_MAESTRO: "UK Maestro",
              UNION_PAY: "UnionPay",
              VISA: "Visa",
              ELO: "Elo",
              HIPER: "Hiper",
              HIPERCARD: "Hipercard"
            },
            applePayWeb: {
              VISA: "visa",
              MASTERCARD: "mastercard",
              DISCOVER: "discover",
              AMERICAN_EXPRESS: "amex",
              INTERNATIONAL_MAESTRO: "maestro",
              ELO: "elo"
            },
            visaCheckout: {
              VISA: "Visa",
              MASTERCARD: "MasterCard",
              DISCOVER: "Discover",
              AMERICAN_EXPRESS: "American Express"
            },
            googlePay: {
              VISA: "visa",
              MASTERCARD: "mastercard",
              DISCOVER: "discover",
              AMERICAN_EXPRESS: "amex",
              INTERNATIONAL_MAESTRO: "maestro",
              ELO: "elo"
            },
            masterpass: {
              VISA: "visa",
              MASTERCARD: "master",
              DISCOVER: "discover",
              AMERICAN_EXPRESS: "amex",
              DINERS: "diners",
              INTERNATIONAL_MAESTRO: "maestro",
              JCB: "jcb"
            }
          };
          function configurationResponseAdapter(responseBody, ctx) {
            var adaptedResponse;
            if (responseBody.data && !responseBody.errors) {
              adaptedResponse = adaptConfigurationResponseBody(responseBody, ctx);
            } else {
              adaptedResponse = errorResponseAdapter(responseBody);
            }
            return adaptedResponse;
          }
          function adaptConfigurationResponseBody(body, ctx) {
            var configuration = body.data.clientConfiguration;
            var response2;
            response2 = {
              environment: configuration.environment.toLowerCase(),
              clientApiUrl: configuration.clientApiUrl,
              assetsUrl: configuration.assetsUrl,
              analytics: {
                url: configuration.analyticsUrl
              },
              merchantId: configuration.merchantId,
              venmo: "off"
            };
            if (configuration.supportedFeatures) {
              response2.graphQL = {
                url: ctx._graphQL._config.url,
                features: configuration.supportedFeatures.map(function(feature) {
                  return feature.toLowerCase();
                })
              };
            }
            if (configuration.braintreeApi) {
              response2.braintreeApi = configuration.braintreeApi;
            }
            if (configuration.applePayWeb) {
              response2.applePayWeb = configuration.applePayWeb;
              response2.applePayWeb.supportedNetworks = mapCardTypes(
                configuration.applePayWeb.supportedCardBrands,
                cardTypeTransforms.applePayWeb
              );
              delete response2.applePayWeb.supportedCardBrands;
            }
            if (configuration.ideal) {
              response2.ideal = configuration.ideal;
            }
            if (configuration.kount) {
              response2.kount = {
                kountMerchantId: configuration.kount.merchantId
              };
            }
            if (configuration.creditCard) {
              response2.challenges = configuration.creditCard.challenges.map(function(challenge) {
                return challenge.toLowerCase();
              });
              response2.creditCards = {
                supportedCardTypes: mapCardTypes(
                  configuration.creditCard.supportedCardBrands,
                  cardTypeTransforms.creditCard
                )
              };
              response2.threeDSecureEnabled = configuration.creditCard.threeDSecureEnabled;
              response2.threeDSecure = configuration.creditCard.threeDSecure;
            } else {
              response2.challenges = [];
              response2.creditCards = {
                supportedCardTypes: []
              };
              response2.threeDSecureEnabled = false;
            }
            if (configuration.googlePay) {
              response2.androidPay = {
                displayName: configuration.googlePay.displayName,
                enabled: true,
                environment: configuration.googlePay.environment.toLowerCase(),
                googleAuthorizationFingerprint: configuration.googlePay.googleAuthorization,
                paypalClientId: configuration.googlePay.paypalClientId,
                supportedNetworks: mapCardTypes(
                  configuration.googlePay.supportedCardBrands,
                  cardTypeTransforms.googlePay
                )
              };
            }
            if (configuration.venmo) {
              response2.payWithVenmo = {
                merchantId: configuration.venmo.merchantId,
                accessToken: configuration.venmo.accessToken,
                environment: configuration.venmo.environment.toLowerCase(),
                enrichedCustomerDataEnabled: configuration.venmo.enrichedCustomerDataEnabled
              };
            }
            if (configuration.paypal) {
              response2.paypalEnabled = true;
              response2.paypal = assign({}, configuration.paypal);
              response2.paypal.currencyIsoCode = response2.paypal.currencyCode;
              response2.paypal.environment = response2.paypal.environment.toLowerCase();
              delete response2.paypal.currencyCode;
            } else {
              response2.paypalEnabled = false;
            }
            if (configuration.unionPay) {
              response2.unionPay = {
                enabled: true,
                merchantAccountId: configuration.unionPay.merchantAccountId
              };
            }
            if (configuration.visaCheckout) {
              response2.visaCheckout = {
                apikey: configuration.visaCheckout.apiKey,
                encryptionKey: configuration.visaCheckout.encryptionKey,
                externalClientId: configuration.visaCheckout.externalClientId,
                supportedCardTypes: mapCardTypes(
                  configuration.visaCheckout.supportedCardBrands,
                  cardTypeTransforms.visaCheckout
                )
              };
            }
            if (configuration.masterpass) {
              response2.masterpass = {
                merchantCheckoutId: configuration.masterpass.merchantCheckoutId,
                supportedNetworks: mapCardTypes(
                  configuration.masterpass.supportedCardBrands,
                  cardTypeTransforms.masterpass
                )
              };
            }
            if (configuration.usBankAccount) {
              response2.usBankAccount = {
                routeId: configuration.usBankAccount.routeId,
                plaid: {
                  publicKey: configuration.usBankAccount.plaidPublicKey
                }
              };
            }
            return response2;
          }
          function mapCardTypes(cardTypes, cardTypeTransformMap) {
            return cardTypes.reduce(function(acc, type) {
              if (cardTypeTransformMap.hasOwnProperty(type)) {
                return acc.concat(cardTypeTransformMap[type]);
              }
              return acc;
            }, []);
          }
          module3.exports = configurationResponseAdapter;
        }, { "../../../../lib/assign": 121, "./error": 87 }], 86: [function(_dereq_, module3, exports3) {
          "use strict";
          var errorResponseAdapter = _dereq_("./error");
          var CARD_BRAND_MAP = {
            /* eslint-disable camelcase */
            AMERICAN_EXPRESS: "American Express",
            DINERS: "Discover",
            DISCOVER: "Discover",
            ELO: "Elo",
            HIPER: "Hiper",
            HIPERCARD: "Hipercard",
            INTERNATIONAL_MAESTRO: "Maestro",
            JCB: "JCB",
            MASTERCARD: "MasterCard",
            UK_MAESTRO: "Maestro",
            UNION_PAY: "UnionPay",
            VISA: "Visa"
            /* eslint-enable camelcase */
          };
          var BIN_DATA_MAP = {
            YES: "Yes",
            NO: "No",
            UNKNOWN: "Unknown"
          };
          var AUTHENTICATION_INSIGHT_MAP = {
            PSDTWO: "psd2"
          };
          function creditCardTokenizationResponseAdapter(responseBody) {
            var adaptedResponse;
            if (responseBody.data && !responseBody.errors) {
              adaptedResponse = adaptTokenizeCreditCardResponseBody(responseBody);
            } else {
              adaptedResponse = errorResponseAdapter(responseBody);
            }
            return adaptedResponse;
          }
          function adaptTokenizeCreditCardResponseBody(body) {
            var data = body.data.tokenizeCreditCard;
            var creditCard = data.creditCard;
            var lastTwo = creditCard.last4 ? creditCard.last4.substr(2, 4) : "";
            var binData = creditCard.binData;
            var response2, regulationEnvironment;
            if (binData) {
              [
                "commercial",
                "debit",
                "durbinRegulated",
                "healthcare",
                "payroll",
                "prepaid"
              ].forEach(function(key) {
                if (binData[key]) {
                  binData[key] = BIN_DATA_MAP[binData[key]];
                } else {
                  binData[key] = "Unknown";
                }
              });
              ["issuingBank", "countryOfIssuance", "productId"].forEach(function(key) {
                if (!binData[key]) {
                  binData[key] = "Unknown";
                }
              });
            }
            response2 = {
              creditCards: [
                {
                  binData,
                  consumed: false,
                  description: lastTwo ? "ending in " + lastTwo : "",
                  nonce: data.token,
                  details: {
                    cardholderName: creditCard.cardholderName,
                    expirationMonth: creditCard.expirationMonth,
                    expirationYear: creditCard.expirationYear,
                    bin: creditCard.bin || "",
                    cardType: CARD_BRAND_MAP[creditCard.brandCode] || "Unknown",
                    lastFour: creditCard.last4 || "",
                    lastTwo
                  },
                  type: "CreditCard",
                  threeDSecureInfo: null
                }
              ]
            };
            if (data.authenticationInsight) {
              regulationEnvironment = data.authenticationInsight.customerAuthenticationRegulationEnvironment;
              response2.creditCards[0].authenticationInsight = {
                regulationEnvironment: AUTHENTICATION_INSIGHT_MAP[regulationEnvironment] || regulationEnvironment.toLowerCase()
              };
            }
            return response2;
          }
          module3.exports = creditCardTokenizationResponseAdapter;
        }, { "./error": 87 }], 87: [function(_dereq_, module3, exports3) {
          "use strict";
          function errorResponseAdapter(responseBody) {
            var response2;
            var errorClass = responseBody.errors && responseBody.errors[0] && responseBody.errors[0].extensions && responseBody.errors[0].extensions.errorClass;
            if (errorClass === "VALIDATION") {
              response2 = userErrorResponseAdapter(responseBody);
            } else if (errorClass) {
              response2 = errorWithClassResponseAdapter(responseBody);
            } else {
              response2 = {
                error: { message: "There was a problem serving your request" },
                fieldErrors: []
              };
            }
            return response2;
          }
          function errorWithClassResponseAdapter(responseBody) {
            return {
              error: { message: responseBody.errors[0].message },
              fieldErrors: []
            };
          }
          function userErrorResponseAdapter(responseBody) {
            var fieldErrors = buildFieldErrors(responseBody.errors);
            if (fieldErrors.length === 0) {
              return { error: { message: responseBody.errors[0].message } };
            }
            return {
              error: { message: getLegacyMessage(fieldErrors) },
              fieldErrors
            };
          }
          function buildFieldErrors(errors) {
            var fieldErrors = [];
            errors.forEach(function(error) {
              if (!(error.extensions && error.extensions.inputPath)) {
                return;
              }
              addFieldError(error.extensions.inputPath.slice(1), error, fieldErrors);
            });
            return fieldErrors;
          }
          function addFieldError(inputPath, errorDetail, fieldErrors) {
            var fieldError;
            var legacyCode = errorDetail.extensions.legacyCode;
            var inputField = inputPath[0];
            if (inputPath.length === 1) {
              fieldErrors.push({
                code: legacyCode,
                field: inputField,
                message: errorDetail.message
              });
              return;
            }
            fieldErrors.forEach(function(candidate) {
              if (candidate.field === inputField) {
                fieldError = candidate;
              }
            });
            if (!fieldError) {
              fieldError = { field: inputField, fieldErrors: [] };
              fieldErrors.push(fieldError);
            }
            addFieldError(inputPath.slice(1), errorDetail, fieldError.fieldErrors);
          }
          function getLegacyMessage(errors) {
            var legacyMessages = {
              creditCard: "Credit card is invalid"
            };
            var field = errors[0].field;
            return legacyMessages[field];
          }
          module3.exports = errorResponseAdapter;
        }, {}], 88: [function(_dereq_, module3, exports3) {
          "use strict";
          var CONFIGURATION_QUERY = "query ClientConfiguration {   clientConfiguration {     analyticsUrl     environment     merchantId     assetsUrl     clientApiUrl     creditCard {       supportedCardBrands       challenges       threeDSecureEnabled       threeDSecure {         cardinalAuthenticationJWT       }     }     applePayWeb {       countryCode       currencyCode       merchantIdentifier       supportedCardBrands     }     googlePay {       displayName       supportedCardBrands       environment       googleAuthorization       paypalClientId     }     ideal {       routeId       assetsUrl     }     kount {       merchantId     }     masterpass {       merchantCheckoutId       supportedCardBrands     }     paypal {       displayName       clientId       assetsUrl       environment       environmentNoNetwork       unvettedMerchant       braintreeClientId       billingAgreementsEnabled       merchantAccountId       currencyCode       payeeEmail     }     unionPay {       merchantAccountId     }     usBankAccount {       routeId       plaidPublicKey     }     venmo {       merchantId       accessToken       environment       enrichedCustomerDataEnabled    }     visaCheckout {       apiKey       externalClientId       supportedCardBrands     }     braintreeApi {       accessToken       url     }     supportedFeatures   } }";
          function configuration() {
            return {
              query: CONFIGURATION_QUERY,
              operationName: "ClientConfiguration"
            };
          }
          module3.exports = configuration;
        }, {}], 89: [function(_dereq_, module3, exports3) {
          "use strict";
          var assign = _dereq_("../../../../lib/assign").assign;
          function createMutation(config) {
            var hasAuthenticationInsight = config.hasAuthenticationInsight;
            var mutation = "mutation TokenizeCreditCard($input: TokenizeCreditCardInput!";
            if (hasAuthenticationInsight) {
              mutation += ", $authenticationInsightInput: AuthenticationInsightInput!";
            }
            mutation += ") {   tokenizeCreditCard(input: $input) {     token     creditCard {       bin       brandCode       last4       cardholderName       expirationMonth      expirationYear      binData {         prepaid         healthcare         debit         durbinRegulated         commercial         payroll         issuingBank         countryOfIssuance         productId       }     } ";
            if (hasAuthenticationInsight) {
              mutation += "    authenticationInsight(input: $authenticationInsightInput) {      customerAuthenticationRegulationEnvironment    }";
            }
            mutation += "  } }";
            return mutation;
          }
          function createCreditCardTokenizationBody(body, options) {
            var cc = body.creditCard;
            var billingAddress = cc && cc.billingAddress;
            var expDate = cc && cc.expirationDate;
            var expirationMonth = cc && (cc.expirationMonth || expDate && expDate.split("/")[0].trim());
            var expirationYear = cc && (cc.expirationYear || expDate && expDate.split("/")[1].trim());
            var variables = {
              input: {
                creditCard: {
                  number: cc && cc.number,
                  expirationMonth,
                  expirationYear,
                  cvv: cc && cc.cvv,
                  cardholderName: cc && cc.cardholderName
                },
                options: {}
              }
            };
            if (options.hasAuthenticationInsight) {
              variables.authenticationInsightInput = {
                merchantAccountId: body.merchantAccountId
              };
            }
            if (billingAddress) {
              variables.input.creditCard.billingAddress = billingAddress;
            }
            variables.input = addValidationRule(body, variables.input);
            return variables;
          }
          function addValidationRule(body, input) {
            var validate;
            if (body.creditCard && body.creditCard.options && typeof body.creditCard.options.validate === "boolean") {
              validate = body.creditCard.options.validate;
            } else if (body.authorizationFingerprint && body.tokenizationKey || body.authorizationFingerprint) {
              validate = true;
            } else if (body.tokenizationKey) {
              validate = false;
            }
            if (typeof validate === "boolean") {
              input.options = assign(
                {
                  validate
                },
                input.options
              );
            }
            return input;
          }
          function creditCardTokenization(body) {
            var options = {
              hasAuthenticationInsight: Boolean(
                body.authenticationInsight && body.merchantAccountId
              )
            };
            return {
              query: createMutation(options),
              variables: createCreditCardTokenizationBody(body, options),
              operationName: "TokenizeCreditCard"
            };
          }
          module3.exports = creditCardTokenization;
        }, { "../../../../lib/assign": 121 }], 90: [function(_dereq_, module3, exports3) {
          "use strict";
          var features = {
            tokenize_credit_cards: "payment_methods/credit_cards",
            // eslint-disable-line camelcase
            configuration: "configuration"
          };
          var disallowedInputPaths = ["creditCard.options.unionPayEnrollment"];
          function GraphQL(config) {
            this._config = config.graphQL;
          }
          GraphQL.prototype.getGraphQLEndpoint = function() {
            return this._config.url;
          };
          GraphQL.prototype.isGraphQLRequest = function(url, body) {
            var featureEnabled;
            var path = this.getClientApiPath(url);
            if (!this._isGraphQLEnabled() || !path) {
              return false;
            }
            featureEnabled = this._config.features.some(function(feature) {
              return features[feature] === path;
            });
            if (containsDisallowedlistedKeys(body)) {
              return false;
            }
            return featureEnabled;
          };
          GraphQL.prototype.getClientApiPath = function(url) {
            var path;
            var clientApiPrefix = "/client_api/v1/";
            var pathParts = url.split(clientApiPrefix);
            if (pathParts.length > 1) {
              path = pathParts[1].split("?")[0];
            }
            return path;
          };
          GraphQL.prototype._isGraphQLEnabled = function() {
            return Boolean(this._config);
          };
          function containsDisallowedlistedKeys(body) {
            return disallowedInputPaths.some(function(keys) {
              var value = keys.split(".").reduce(function(accumulator, key) {
                return accumulator && accumulator[key];
              }, body);
              return value !== void 0;
            });
          }
          module3.exports = GraphQL;
        }, {}], 91: [function(_dereq_, module3, exports3) {
          "use strict";
          var BRAINTREE_VERSION = _dereq_("../../constants").BRAINTREE_VERSION;
          var assign = _dereq_("../../../lib/assign").assign;
          var snakeCaseToCamelCase = _dereq_("../../../lib/snake-case-to-camel-case");
          var creditCardTokenizationBodyGenerator = _dereq_("./generators/credit-card-tokenization");
          var creditCardTokenizationResponseAdapter = _dereq_("./adapters/credit-card-tokenization");
          var configurationBodyGenerator = _dereq_("./generators/configuration");
          var configurationResponseAdapter = _dereq_("./adapters/configuration");
          var generators = {
            "payment_methods/credit_cards": creditCardTokenizationBodyGenerator,
            configuration: configurationBodyGenerator
          };
          var adapters = {
            "payment_methods/credit_cards": creditCardTokenizationResponseAdapter,
            configuration: configurationResponseAdapter
          };
          function GraphQLRequest(options) {
            var clientApiPath = options.graphQL.getClientApiPath(options.url);
            this._graphQL = options.graphQL;
            this._data = options.data;
            this._method = options.method;
            this._headers = options.headers;
            this._clientSdkMetadata = {
              source: options.metadata.source,
              integration: options.metadata.integration,
              sessionId: options.metadata.sessionId
            };
            this._sendAnalyticsEvent = options.sendAnalyticsEvent || Function.prototype;
            this._generator = generators[clientApiPath];
            this._adapter = adapters[clientApiPath];
            this._sendAnalyticsEvent("graphql.init");
          }
          GraphQLRequest.prototype.getUrl = function() {
            return this._graphQL.getGraphQLEndpoint();
          };
          GraphQLRequest.prototype.getBody = function() {
            var formattedBody = formatBodyKeys(this._data);
            var generatedBody = this._generator(formattedBody);
            var body = assign(
              { clientSdkMetadata: this._clientSdkMetadata },
              generatedBody
            );
            return JSON.stringify(body);
          };
          GraphQLRequest.prototype.getMethod = function() {
            return "POST";
          };
          GraphQLRequest.prototype.getHeaders = function() {
            var authorization, headers;
            if (this._data.authorizationFingerprint) {
              this._sendAnalyticsEvent("graphql.authorization-fingerprint");
              authorization = this._data.authorizationFingerprint;
            } else {
              this._sendAnalyticsEvent("graphql.tokenization-key");
              authorization = this._data.tokenizationKey;
            }
            headers = {
              Authorization: "Bearer " + authorization,
              "Braintree-Version": BRAINTREE_VERSION
            };
            return assign({}, this._headers, headers);
          };
          GraphQLRequest.prototype.adaptResponseBody = function(parsedBody) {
            return this._adapter(parsedBody, this);
          };
          GraphQLRequest.prototype.determineStatus = function(httpStatus, parsedResponse) {
            var status, errorClass;
            if (httpStatus === 200) {
              errorClass = parsedResponse.errors && parsedResponse.errors[0] && parsedResponse.errors[0].extensions && parsedResponse.errors[0].extensions.errorClass;
              if (parsedResponse.data && !parsedResponse.errors) {
                status = 200;
              } else if (errorClass === "VALIDATION") {
                status = 422;
              } else if (errorClass === "AUTHORIZATION") {
                status = 403;
              } else if (errorClass === "AUTHENTICATION") {
                status = 401;
              } else if (isGraphQLError(errorClass, parsedResponse)) {
                status = 403;
              } else {
                status = 500;
              }
            } else if (!httpStatus) {
              status = 500;
            } else {
              status = httpStatus;
            }
            this._sendAnalyticsEvent("graphql.status." + httpStatus);
            this._sendAnalyticsEvent("graphql.determinedStatus." + status);
            return status;
          };
          function isGraphQLError(errorClass, parsedResponse) {
            return !errorClass && parsedResponse.errors[0].message;
          }
          function formatBodyKeys(originalBody) {
            var body = {};
            Object.keys(originalBody).forEach(function(key) {
              var camelCaseKey = snakeCaseToCamelCase(key);
              if (typeof originalBody[key] === "object") {
                body[camelCaseKey] = formatBodyKeys(originalBody[key]);
              } else if (typeof originalBody[key] === "number") {
                body[camelCaseKey] = String(originalBody[key]);
              } else {
                body[camelCaseKey] = originalBody[key];
              }
            });
            return body;
          }
          module3.exports = GraphQLRequest;
        }, { "../../../lib/assign": 121, "../../../lib/snake-case-to-camel-case": 159, "../../constants": 79, "./adapters/configuration": 85, "./adapters/credit-card-tokenization": 86, "./generators/configuration": 88, "./generators/credit-card-tokenization": 89 }], 92: [function(_dereq_, module3, exports3) {
          "use strict";
          var once = _dereq_("../../lib/once");
          var AJAXDriver = _dereq_("./ajax-driver");
          module3.exports = function(options, cb) {
            cb = once(cb || Function.prototype);
            options.method = (options.method || "GET").toUpperCase();
            options.timeout = options.timeout == null ? 6e4 : options.timeout;
            options.data = options.data || {};
            AJAXDriver.request(options, cb);
          };
        }, { "../../lib/once": 156, "./ajax-driver": 83 }], 93: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(body) {
            try {
              body = JSON.parse(body);
            } catch (e) {
            }
            return body;
          };
        }, {}], 94: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(method, body) {
            if (typeof method !== "string") {
              throw new Error("Method must be a string");
            }
            if (method.toLowerCase() !== "get" && body != null) {
              body = typeof body === "string" ? body : JSON.stringify(body);
            }
            return body;
          };
        }, {}], 95: [function(_dereq_, module3, exports3) {
          "use strict";
          var isXHRAvailable = typeof window !== "undefined" && window.XMLHttpRequest && "withCredentials" in new window.XMLHttpRequest();
          function getRequestObject() {
            return isXHRAvailable ? new window.XMLHttpRequest() : new window.XDomainRequest();
          }
          module3.exports = {
            isAvailable: isXHRAvailable,
            getRequestObject
          };
        }, {}], 96: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            DATA_COLLECTOR_KOUNT_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "DATA_COLLECTOR_KOUNT_NOT_ENABLED",
              message: "Kount is not enabled for this merchant."
            },
            DATA_COLLECTOR_KOUNT_ERROR: {
              type: BraintreeError.types.MERCHANT,
              code: "DATA_COLLECTOR_KOUNT_ERROR"
            },
            DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS: {
              type: BraintreeError.types.MERCHANT,
              code: "DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS",
              message: "Data Collector must be created with Kount and/or PayPal."
            }
          };
        }, { "../lib/braintree-error": 124 }], 97: [function(_dereq_, module3, exports3) {
          "use strict";
          var FRAUDNET_FNCLS = _dereq_("../lib/constants").FRAUDNET_FNCLS;
          var FRAUDNET_SOURCE = _dereq_("../lib/constants").FRAUDNET_SOURCE;
          var FRAUDNET_URL = _dereq_("../lib/constants").FRAUDNET_URL;
          var loadScript = _dereq_("../lib/assets").loadScript;
          var cachedSessionId;
          function setup(options) {
            var fraudNet = new Fraudnet();
            options = options || {};
            if (!options.sessionId && cachedSessionId) {
              fraudNet.sessionId = cachedSessionId;
              return Promise.resolve(fraudNet);
            }
            return fraudNet.initialize(options);
          }
          function clearSessionIdCache() {
            cachedSessionId = null;
          }
          function Fraudnet() {
          }
          Fraudnet.prototype.initialize = function(options) {
            var environment = options.environment;
            var self2 = this;
            this.sessionId = options.sessionId || _generateSessionId();
            if (!options.sessionId) {
              cachedSessionId = this.sessionId;
            }
            this._beaconId = _generateBeaconId(this.sessionId);
            this._parameterBlock = _createParameterBlock(
              this.sessionId,
              this._beaconId,
              environment
            );
            return loadScript({
              src: FRAUDNET_URL
            }).then(function(block) {
              self2._thirdPartyBlock = block;
              return self2;
            }).catch(function() {
              return null;
            });
          };
          Fraudnet.prototype.teardown = function() {
            removeElementIfOnPage(document.querySelector('iframe[title="ppfniframe"]'));
            removeElementIfOnPage(document.querySelector('iframe[title="pbf"]'));
            removeElementIfOnPage(this._parameterBlock);
            removeElementIfOnPage(this._thirdPartyBlock);
          };
          function removeElementIfOnPage(element) {
            if (element && element.parentNode) {
              element.parentNode.removeChild(element);
            }
          }
          function _generateSessionId() {
            var i;
            var id = "";
            for (i = 0; i < 32; i++) {
              id += Math.floor(Math.random() * 16).toString(16);
            }
            return id;
          }
          function _generateBeaconId(sessionId) {
            var timestamp = (/* @__PURE__ */ new Date()).getTime() / 1e3;
            return "https://b.stats.paypal.com/counter.cgi?i=127.0.0.1&p=" + sessionId + "&t=" + timestamp + "&a=14";
          }
          function _createParameterBlock(sessionId, beaconId, environment) {
            var el = document.body.appendChild(document.createElement("script"));
            var config = {
              f: sessionId,
              s: FRAUDNET_SOURCE,
              b: beaconId
            };
            if (environment !== "production") {
              config.sandbox = true;
            }
            el.type = "application/json";
            el.setAttribute("fncls", FRAUDNET_FNCLS);
            el.text = JSON.stringify(config);
            return el;
          }
          module3.exports = {
            setup,
            clearSessionIdCache
          };
        }, { "../lib/assets": 120, "../lib/constants": 126 }], 98: [function(_dereq_, module3, exports3) {
          "use strict";
          var kount = _dereq_("./kount");
          var fraudnet = _dereq_("./fraudnet");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var errors = _dereq_("./errors");
          function create(options) {
            var name = "Data Collector";
            var result = {
              _instances: []
            };
            var data;
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              result._instantiatedWithAClient = !options.useDeferredClient;
              result._createPromise = createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              }).then(function(client) {
                var kountInstance;
                var config = client.getConfiguration();
                if (options.kount === true && config.gatewayConfiguration.kount) {
                  try {
                    kountInstance = kount.setup({
                      environment: config.gatewayConfiguration.environment,
                      merchantId: config.gatewayConfiguration.kount.kountMerchantId
                    });
                  } catch (err) {
                    return Promise.reject(
                      new BraintreeError({
                        type: errors.DATA_COLLECTOR_KOUNT_ERROR.type,
                        code: errors.DATA_COLLECTOR_KOUNT_ERROR.code,
                        message: err.message
                      })
                    );
                  }
                  data = kountInstance.deviceData;
                  result._instances.push(kountInstance);
                } else {
                  data = {};
                }
                return Promise.resolve(client);
              }).then(function(client) {
                return fraudnet.setup({
                  sessionId: options.riskCorrelationId || options.clientMetadataId || options.correlationId,
                  environment: client.getConfiguration().gatewayConfiguration.environment
                }).then(function(fraudnetInstance) {
                  if (fraudnetInstance) {
                    data.correlation_id = fraudnetInstance.sessionId;
                    result._instances.push(fraudnetInstance);
                  }
                });
              }).then(function() {
                if (result._instances.length === 0) {
                  return Promise.reject(
                    new BraintreeError(errors.DATA_COLLECTOR_REQUIRES_CREATE_OPTIONS)
                  );
                }
                result.deviceData = JSON.stringify(data);
                result.rawDeviceData = data;
                return result;
              });
              result.teardown = createTeardownMethod(result);
              result.getDeviceData = createGetDeviceDataMethod(result);
              if (result._instantiatedWithAClient) {
                return result._createPromise;
              }
              return result;
            });
          }
          function createTeardownMethod(result) {
            return wrapPromise(function teardown() {
              return result._createPromise.then(function() {
                result._instances.forEach(function(instance) {
                  if (instance) {
                    instance.teardown();
                  }
                });
                convertMethodsToError(result, methods(result));
              });
            });
          }
          function createGetDeviceDataMethod(result) {
            return wrapPromise(function getDeviceData(options) {
              options = options || {};
              return result._createPromise.then(function() {
                if (options.raw) {
                  return Promise.resolve(result.rawDeviceData);
                }
                return Promise.resolve(result.deviceData);
              });
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "../lib/methods": 155, "./errors": 96, "./fraudnet": 97, "./kount": 99, "@braintree/wrap-promise": 43 }], 99: [function(_dereq_, module3, exports3) {
          "use strict";
          var sjcl = _dereq_("./vendor/sjcl");
          var camelCaseToSnakeCase = _dereq_("../lib/camel-case-to-snake-case");
          var QA_URL = "https://assets.qa.braintreepayments.com/data";
          var IFRAME_ID_PREFIX = "braintreeDataFrame-";
          var environmentUrls = {
            development: QA_URL,
            qa: QA_URL,
            sandbox: "https://assets.braintreegateway.com/sandbox/data",
            production: "https://assets.braintreegateway.com/data"
          };
          var cachedDeviceData = {};
          function setup(o) {
            var options = o != null ? o : {};
            return new Kount(options);
          }
          function Kount(options) {
            var previouslyInitializedDeviceData = Kount.getCachedDeviceData(
              options.merchantId
            );
            if (previouslyInitializedDeviceData) {
              this.deviceData = previouslyInitializedDeviceData;
              this._isCached = true;
              return;
            }
            this._currentEnvironment = this._initializeEnvironment(options);
            sjcl.random.startCollectors();
            this._deviceSessionId = this._generateDeviceSessionId();
            this.deviceData = this._getDeviceData();
            Kount.setCachedDeviceData(options.merchantId, this.deviceData);
            this._iframe = this._setupIFrame();
          }
          Kount.getCachedDeviceData = function(merchantId) {
            return cachedDeviceData[merchantId];
          };
          Kount.setCachedDeviceData = function(merchantId, data) {
            cachedDeviceData[merchantId] = data;
          };
          Kount.prototype.teardown = function() {
            if (!this._isCached) {
              sjcl.random.stopCollectors();
              this._removeIframe();
            }
          };
          Kount.prototype._removeIframe = function() {
            this._iframe.parentNode.removeChild(this._iframe);
          };
          Kount.prototype._getDeviceData = function() {
            return camelCaseToSnakeCase({
              deviceSessionId: this._deviceSessionId,
              fraudMerchantId: this._currentEnvironment.id
            });
          };
          Kount.prototype._generateDeviceSessionId = function() {
            var bits, hexString;
            bits = sjcl.random.randomWords(4, 0);
            hexString = sjcl.codec.hex.fromBits(bits);
            return hexString;
          };
          Kount.prototype._setupIFrame = function() {
            var params, iframe;
            var self2 = this;
            params = "?m=" + this._currentEnvironment.id + "&s=" + this._deviceSessionId;
            iframe = document.createElement("iframe");
            iframe.width = 1;
            iframe.id = IFRAME_ID_PREFIX + this._deviceSessionId;
            iframe.height = 1;
            iframe.frameBorder = 0;
            iframe.scrolling = "no";
            iframe.style.position = "fixed";
            iframe.style.left = "-999999px";
            iframe.style.top = "-999999px";
            iframe.title = "Braintree-Kount-iframe";
            iframe.setAttribute("aria-hidden", "true");
            document.body.appendChild(iframe);
            setTimeout(function() {
              iframe.src = self2._currentEnvironment.url + "/logo.htm" + params;
              iframe.innerHTML = '<img src="' + self2._currentEnvironment.url + "/logo.gif" + params + '" alt="" />';
            }, 10);
            return iframe;
          };
          Kount.prototype._initializeEnvironment = function(options) {
            var url = environmentUrls[options.environment];
            if (url == null) {
              throw new Error(
                options.environment + " is not a valid environment for kount.environment"
              );
            }
            return {
              url,
              name: options.environment,
              id: options.merchantId
            };
          };
          module3.exports = {
            setup,
            Kount,
            environmentUrls
          };
        }, { "../lib/camel-case-to-snake-case": 125, "./vendor/sjcl": 100 }], 100: [function(_dereq_, module3, exports3) {
          "use strict";
          var sjcl = {
            cipher: {},
            hash: {},
            keyexchange: {},
            mode: {},
            misc: {},
            codec: {},
            exception: {
              corrupt: function(a) {
                this.toString = function() {
                  return "CORRUPT: " + this.message;
                };
                this.message = a;
              },
              invalid: function(a) {
                this.toString = function() {
                  return "INVALID: " + this.message;
                };
                this.message = a;
              },
              bug: function(a) {
                this.toString = function() {
                  return "BUG: " + this.message;
                };
                this.message = a;
              },
              notReady: function(a) {
                this.toString = function() {
                  return "NOT READY: " + this.message;
                };
                this.message = a;
              }
            }
          };
          sjcl.cipher.aes = function(a) {
            this.l[0][0][0] || this.G();
            var b, c, d, e, f = this.l[0][4], g = this.l[1];
            b = a.length;
            var k = 1;
            if (4 !== b && 6 !== b && 8 !== b)
              throw new sjcl.exception.invalid("invalid aes key size");
            this.b = [d = a.slice(0), e = []];
            for (a = b; a < 4 * b + 28; a++) {
              c = d[a - 1];
              if (0 === a % b || 8 === b && 4 === a % b)
                c = f[c >>> 24] << 24 ^ f[c >> 16 & 255] << 16 ^ f[c >> 8 & 255] << 8 ^ f[c & 255], 0 === a % b && (c = c << 8 ^ c >>> 24 ^ k << 24, k = k << 1 ^ 283 * (k >> 7));
              d[a] = d[a - b] ^ c;
            }
            for (b = 0; a; b++, a--)
              c = d[b & 3 ? a : a - 4], e[b] = 4 >= a || 4 > b ? c : g[0][f[c >>> 24]] ^ g[1][f[c >> 16 & 255]] ^ g[2][f[c >> 8 & 255]] ^ g[3][f[c & 255]];
          };
          sjcl.cipher.aes.prototype = {
            encrypt: function(a) {
              return t(this, a, 0);
            },
            decrypt: function(a) {
              return t(this, a, 1);
            },
            l: [
              [[], [], [], [], []],
              [[], [], [], [], []]
            ],
            G: function() {
              var a = this.l[0], b = this.l[1], c = a[4], d = b[4], e, f, g, k = [], l = [], p, n, h, m;
              for (e = 0; 256 > e; e++) l[(k[e] = e << 1 ^ 283 * (e >> 7)) ^ e] = e;
              for (f = g = 0; !c[f]; f ^= p || 1, g = l[g] || 1)
                for (h = g ^ g << 1 ^ g << 2 ^ g << 3 ^ g << 4, h = h >> 8 ^ h & 255 ^ 99, c[f] = h, d[h] = f, n = k[e = k[p = k[f]]], m = 16843009 * n ^ 65537 * e ^ 257 * p ^ 16843008 * f, n = 257 * k[h] ^ 16843008 * h, e = 0; 4 > e; e++)
                  a[e][f] = n = n << 24 ^ n >>> 8, b[e][h] = m = m << 24 ^ m >>> 8;
              for (e = 0; 5 > e; e++) a[e] = a[e].slice(0), b[e] = b[e].slice(0);
            }
          };
          function t(a, b, c) {
            if (4 !== b.length)
              throw new sjcl.exception.invalid("invalid aes block size");
            var d = a.b[c], e = b[0] ^ d[0], f = b[c ? 3 : 1] ^ d[1], g = b[2] ^ d[2];
            b = b[c ? 1 : 3] ^ d[3];
            var k, l, p, n = d.length / 4 - 2, h, m = 4, q = [0, 0, 0, 0];
            k = a.l[c];
            a = k[0];
            var r = k[1], v = k[2], w = k[3], x = k[4];
            for (h = 0; h < n; h++)
              k = a[e >>> 24] ^ r[f >> 16 & 255] ^ v[g >> 8 & 255] ^ w[b & 255] ^ d[m], l = a[f >>> 24] ^ r[g >> 16 & 255] ^ v[b >> 8 & 255] ^ w[e & 255] ^ d[m + 1], p = a[g >>> 24] ^ r[b >> 16 & 255] ^ v[e >> 8 & 255] ^ w[f & 255] ^ d[m + 2], b = a[b >>> 24] ^ r[e >> 16 & 255] ^ v[f >> 8 & 255] ^ w[g & 255] ^ d[m + 3], m += 4, e = k, f = l, g = p;
            for (h = 0; 4 > h; h++)
              q[c ? 3 & -h : h] = x[e >>> 24] << 24 ^ x[f >> 16 & 255] << 16 ^ x[g >> 8 & 255] << 8 ^ x[b & 255] ^ d[m++], k = e, e = f, f = g, g = b, b = k;
            return q;
          }
          sjcl.bitArray = {
            bitSlice: function(a, b, c) {
              a = sjcl.bitArray.M(a.slice(b / 32), 32 - (b & 31)).slice(1);
              return void 0 === c ? a : sjcl.bitArray.clamp(a, c - b);
            },
            extract: function(a, b, c) {
              var d = Math.floor(-b - c & 31);
              return ((b + c - 1 ^ b) & -32 ? a[b / 32 | 0] << 32 - d ^ a[b / 32 + 1 | 0] >>> d : a[b / 32 | 0] >>> d) & (1 << c) - 1;
            },
            concat: function(a, b) {
              if (0 === a.length || 0 === b.length) return a.concat(b);
              var c = a[a.length - 1], d = sjcl.bitArray.getPartial(c);
              return 32 === d ? a.concat(b) : sjcl.bitArray.M(b, d, c | 0, a.slice(0, a.length - 1));
            },
            bitLength: function(a) {
              var b = a.length;
              return 0 === b ? 0 : 32 * (b - 1) + sjcl.bitArray.getPartial(a[b - 1]);
            },
            clamp: function(a, b) {
              if (32 * a.length < b) return a;
              a = a.slice(0, Math.ceil(b / 32));
              var c = a.length;
              b = b & 31;
              0 < c && b && (a[c - 1] = sjcl.bitArray.partial(
                b,
                a[c - 1] & 2147483648 >> b - 1,
                1
              ));
              return a;
            },
            partial: function(a, b, c) {
              return 32 === a ? b : (c ? b | 0 : b << 32 - a) + 1099511627776 * a;
            },
            getPartial: function(a) {
              return Math.round(a / 1099511627776) || 32;
            },
            equal: function(a, b) {
              if (sjcl.bitArray.bitLength(a) !== sjcl.bitArray.bitLength(b)) return false;
              var c = 0, d;
              for (d = 0; d < a.length; d++) c |= a[d] ^ b[d];
              return 0 === c;
            },
            M: function(a, b, c, d) {
              var e;
              e = 0;
              for (void 0 === d && (d = []); 32 <= b; b -= 32) d.push(c), c = 0;
              if (0 === b) return d.concat(a);
              for (e = 0; e < a.length; e++)
                d.push(c | a[e] >>> b), c = a[e] << 32 - b;
              e = a.length ? a[a.length - 1] : 0;
              a = sjcl.bitArray.getPartial(e);
              d.push(sjcl.bitArray.partial(b + a & 31, 32 < b + a ? c : d.pop(), 1));
              return d;
            },
            Y: function(a, b) {
              return [a[0] ^ b[0], a[1] ^ b[1], a[2] ^ b[2], a[3] ^ b[3]];
            },
            byteswapM: function(a) {
              var b, c;
              for (b = 0; b < a.length; ++b)
                c = a[b], a[b] = c >>> 24 | c >>> 8 & 65280 | (c & 65280) << 8 | c << 24;
              return a;
            }
          };
          sjcl.codec.utf8String = {
            fromBits: function(a) {
              var b = "", c = sjcl.bitArray.bitLength(a), d, e;
              for (d = 0; d < c / 8; d++)
                0 === (d & 3) && (e = a[d / 4]), b += String.fromCharCode(e >>> 8 >>> 8 >>> 8), e <<= 8;
              return decodeURIComponent(escape(b));
            },
            toBits: function(a) {
              a = unescape(encodeURIComponent(a));
              var b = [], c, d = 0;
              for (c = 0; c < a.length; c++)
                d = d << 8 | a.charCodeAt(c), 3 === (c & 3) && (b.push(d), d = 0);
              c & 3 && b.push(sjcl.bitArray.partial(8 * (c & 3), d));
              return b;
            }
          };
          sjcl.codec.hex = {
            fromBits: function(a) {
              var b = "", c;
              for (c = 0; c < a.length; c++)
                b += ((a[c] | 0) + 263882790666240).toString(16).substr(4);
              return b.substr(0, sjcl.bitArray.bitLength(a) / 4);
            },
            toBits: function(a) {
              var b, c = [], d;
              a = a.replace(/\s|0x/g, "");
              d = a.length;
              a = a + "00000000";
              for (b = 0; b < a.length; b += 8) c.push(parseInt(a.substr(b, 8), 16) ^ 0);
              return sjcl.bitArray.clamp(c, 4 * d);
            }
          };
          sjcl.hash.sha256 = function(a) {
            this.b[0] || this.G();
            a ? (this.u = a.u.slice(0), this.o = a.o.slice(0), this.h = a.h) : this.reset();
          };
          sjcl.hash.sha256.hash = function(a) {
            return new sjcl.hash.sha256().update(a).finalize();
          };
          sjcl.hash.sha256.prototype = {
            blockSize: 512,
            reset: function() {
              this.u = this.K.slice(0);
              this.o = [];
              this.h = 0;
              return this;
            },
            update: function(a) {
              "string" === typeof a && (a = sjcl.codec.utf8String.toBits(a));
              var b, c = this.o = sjcl.bitArray.concat(this.o, a);
              b = this.h;
              a = this.h = b + sjcl.bitArray.bitLength(a);
              if (9007199254740991 < a)
                throw new sjcl.exception.invalid("Cannot hash more than 2^53 - 1 bits");
              if ("undefined" !== typeof Uint32Array) {
                var d = new Uint32Array(c), e = 0;
                for (b = 512 + b - (512 + b & 511); b <= a; b += 512)
                  u(this, d.subarray(16 * e, 16 * (e + 1))), e += 1;
                c.splice(0, 16 * e);
              } else
                for (b = 512 + b - (512 + b & 511); b <= a; b += 512)
                  u(this, c.splice(0, 16));
              return this;
            },
            finalize: function() {
              var a, b = this.o, c = this.u, b = sjcl.bitArray.concat(b, [sjcl.bitArray.partial(1, 1)]);
              for (a = b.length + 2; a & 15; a++) b.push(0);
              b.push(Math.floor(this.h / 4294967296));
              for (b.push(this.h | 0); b.length; ) u(this, b.splice(0, 16));
              this.reset();
              return c;
            },
            K: [],
            b: [],
            G: function() {
              function a(a2) {
                return 4294967296 * (a2 - Math.floor(a2)) | 0;
              }
              for (var b = 0, c = 2, d, e; 64 > b; c++) {
                e = true;
                for (d = 2; d * d <= c; d++)
                  if (0 === c % d) {
                    e = false;
                    break;
                  }
                e && (8 > b && (this.K[b] = a(Math.pow(c, 0.5))), this.b[b] = a(Math.pow(c, 1 / 3)), b++);
              }
            }
          };
          function u(a, b) {
            var c, d, e, f = a.u, g = a.b, k = f[0], l = f[1], p = f[2], n = f[3], h = f[4], m = f[5], q = f[6], r = f[7];
            for (c = 0; 64 > c; c++)
              16 > c ? d = b[c] : (d = b[c + 1 & 15], e = b[c + 14 & 15], d = b[c & 15] = (d >>> 7 ^ d >>> 18 ^ d >>> 3 ^ d << 25 ^ d << 14) + (e >>> 17 ^ e >>> 19 ^ e >>> 10 ^ e << 15 ^ e << 13) + b[c & 15] + b[c + 9 & 15] | 0), d = d + r + (h >>> 6 ^ h >>> 11 ^ h >>> 25 ^ h << 26 ^ h << 21 ^ h << 7) + (q ^ h & (m ^ q)) + g[c], r = q, q = m, m = h, h = n + d | 0, n = p, p = l, l = k, k = d + (l & p ^ n & (l ^ p)) + (l >>> 2 ^ l >>> 13 ^ l >>> 22 ^ l << 30 ^ l << 19 ^ l << 10) | 0;
            f[0] = f[0] + k | 0;
            f[1] = f[1] + l | 0;
            f[2] = f[2] + p | 0;
            f[3] = f[3] + n | 0;
            f[4] = f[4] + h | 0;
            f[5] = f[5] + m | 0;
            f[6] = f[6] + q | 0;
            f[7] = f[7] + r | 0;
          }
          sjcl.prng = function(a) {
            this.c = [new sjcl.hash.sha256()];
            this.i = [0];
            this.H = 0;
            this.v = {};
            this.F = 0;
            this.J = {};
            this.L = this.f = this.j = this.T = 0;
            this.b = [0, 0, 0, 0, 0, 0, 0, 0];
            this.g = [0, 0, 0, 0];
            this.C = void 0;
            this.D = a;
            this.s = false;
            this.B = { progress: {}, seeded: {} };
            this.m = this.S = 0;
            this.w = 1;
            this.A = 2;
            this.O = 65536;
            this.I = [0, 48, 64, 96, 128, 192, 256, 384, 512, 768, 1024];
            this.P = 3e4;
            this.N = 80;
          };
          sjcl.prng.prototype = {
            randomWords: function(a, b) {
              var c = [], d;
              d = this.isReady(b);
              var e;
              if (d === this.m)
                throw new sjcl.exception.notReady("generator isn't seeded");
              if (d & this.A) {
                d = !(d & this.w);
                e = [];
                var f = 0, g;
                this.L = e[0] = (/* @__PURE__ */ new Date()).valueOf() + this.P;
                for (g = 0; 16 > g; g++) e.push(4294967296 * Math.random() | 0);
                for (g = 0; g < this.c.length && (e = e.concat(this.c[g].finalize()), f += this.i[g], this.i[g] = 0, d || !(this.H & 1 << g)); g++) ;
                this.H >= 1 << this.c.length && (this.c.push(new sjcl.hash.sha256()), this.i.push(0));
                this.f -= f;
                f > this.j && (this.j = f);
                this.H++;
                this.b = sjcl.hash.sha256.hash(this.b.concat(e));
                this.C = new sjcl.cipher.aes(this.b);
                for (d = 0; 4 > d && (this.g[d] = this.g[d] + 1 | 0, !this.g[d]); d++) ;
              }
              for (d = 0; d < a; d += 4)
                0 === (d + 1) % this.O && y(this), e = z(this), c.push(e[0], e[1], e[2], e[3]);
              y(this);
              return c.slice(0, a);
            },
            setDefaultParanoia: function(a, b) {
              if (0 === a && "Setting paranoia=0 will ruin your security; use it only for testing" !== b)
                throw new sjcl.exception.invalid(
                  "Setting paranoia=0 will ruin your security; use it only for testing"
                );
              this.D = a;
            },
            addEntropy: function(a, b, c) {
              c = c || "user";
              var d, e, f = (/* @__PURE__ */ new Date()).valueOf(), g = this.v[c], k = this.isReady(), l = 0;
              d = this.J[c];
              void 0 === d && (d = this.J[c] = this.T++);
              void 0 === g && (g = this.v[c] = 0);
              this.v[c] = (this.v[c] + 1) % this.c.length;
              switch (typeof a) {
                case "number":
                  void 0 === b && (b = 1);
                  this.c[g].update([d, this.F++, 1, b, f, 1, a | 0]);
                  break;
                case "object":
                  c = Object.prototype.toString.call(a);
                  if ("[object Uint32Array]" === c) {
                    e = [];
                    for (c = 0; c < a.length; c++) e.push(a[c]);
                    a = e;
                  } else
                    for ("[object Array]" !== c && (l = 1), c = 0; c < a.length && !l; c++)
                      "number" !== typeof a[c] && (l = 1);
                  if (!l) {
                    if (void 0 === b)
                      for (c = b = 0; c < a.length; c++)
                        for (e = a[c]; 0 < e; ) b++, e = e >>> 1;
                    this.c[g].update([d, this.F++, 2, b, f, a.length].concat(a));
                  }
                  break;
                case "string":
                  void 0 === b && (b = a.length);
                  this.c[g].update([d, this.F++, 3, b, f, a.length]);
                  this.c[g].update(a);
                  break;
                default:
                  l = 1;
              }
              if (l)
                throw new sjcl.exception.bug(
                  "random: addEntropy only supports number, array of numbers or string"
                );
              this.i[g] += b;
              this.f += b;
              k === this.m && (this.isReady() !== this.m && A("seeded", Math.max(this.j, this.f)), A("progress", this.getProgress()));
            },
            isReady: function(a) {
              a = this.I[void 0 !== a ? a : this.D];
              return this.j && this.j >= a ? this.i[0] > this.N && (/* @__PURE__ */ new Date()).valueOf() > this.L ? this.A | this.w : this.w : this.f >= a ? this.A | this.m : this.m;
            },
            getProgress: function(a) {
              a = this.I[a ? a : this.D];
              return this.j >= a ? 1 : this.f > a ? 1 : this.f / a;
            },
            startCollectors: function() {
              if (!this.s) {
                this.a = {
                  loadTimeCollector: B(this, this.V),
                  mouseCollector: B(this, this.W),
                  keyboardCollector: B(this, this.U),
                  accelerometerCollector: B(this, this.R),
                  touchCollector: B(this, this.X)
                };
                if (window.addEventListener)
                  window.addEventListener("load", this.a.loadTimeCollector, false), window.addEventListener("mousemove", this.a.mouseCollector, false), window.addEventListener("keypress", this.a.keyboardCollector, false), window.addEventListener(
                    "devicemotion",
                    this.a.accelerometerCollector,
                    false
                  ), window.addEventListener("touchmove", this.a.touchCollector, false);
                else if (document.attachEvent)
                  document.attachEvent("onload", this.a.loadTimeCollector), document.attachEvent("onmousemove", this.a.mouseCollector), document.attachEvent("keypress", this.a.keyboardCollector);
                else throw new sjcl.exception.bug("can't attach event");
                this.s = true;
              }
            },
            stopCollectors: function() {
              this.s && (window.removeEventListener ? (window.removeEventListener("load", this.a.loadTimeCollector, false), window.removeEventListener("mousemove", this.a.mouseCollector, false), window.removeEventListener("keypress", this.a.keyboardCollector, false), window.removeEventListener(
                "devicemotion",
                this.a.accelerometerCollector,
                false
              ), window.removeEventListener("touchmove", this.a.touchCollector, false)) : document.detachEvent && (document.detachEvent("onload", this.a.loadTimeCollector), document.detachEvent("onmousemove", this.a.mouseCollector), document.detachEvent("keypress", this.a.keyboardCollector)), this.s = false);
            },
            addEventListener: function(a, b) {
              this.B[a][this.S++] = b;
            },
            removeEventListener: function(a, b) {
              var c, d, e = this.B[a], f = [];
              for (d in e) e.hasOwnProperty(d) && e[d] === b && f.push(d);
              for (c = 0; c < f.length; c++) d = f[c], delete e[d];
            },
            U: function() {
              C(this, 1);
            },
            W: function(a) {
              var b, c;
              try {
                b = a.x || a.clientX || a.offsetX || 0, c = a.y || a.clientY || a.offsetY || 0;
              } catch (d) {
                c = b = 0;
              }
              0 != b && 0 != c && this.addEntropy([b, c], 2, "mouse");
              C(this, 0);
            },
            X: function(a) {
              a = a.touches[0] || a.changedTouches[0];
              this.addEntropy([a.pageX || a.clientX, a.pageY || a.clientY], 1, "touch");
              C(this, 0);
            },
            V: function() {
              C(this, 2);
            },
            R: function(a) {
              a = a.accelerationIncludingGravity.x || a.accelerationIncludingGravity.y || a.accelerationIncludingGravity.z;
              if (window.orientation) {
                var b = window.orientation;
                "number" === typeof b && this.addEntropy(b, 1, "accelerometer");
              }
              a && this.addEntropy(a, 2, "accelerometer");
              C(this, 0);
            }
          };
          function A(a, b) {
            var c, d = sjcl.random.B[a], e = [];
            for (c in d) d.hasOwnProperty(c) && e.push(d[c]);
            for (c = 0; c < e.length; c++) e[c](b);
          }
          function C(a, b) {
            "undefined" !== typeof window && window.performance && "function" === typeof window.performance.now ? a.addEntropy(window.performance.now(), b, "loadtime") : a.addEntropy((/* @__PURE__ */ new Date()).valueOf(), b, "loadtime");
          }
          function y(a) {
            a.b = z(a).concat(z(a));
            a.C = new sjcl.cipher.aes(a.b);
          }
          function z(a) {
            for (var b = 0; 4 > b && (a.g[b] = a.g[b] + 1 | 0, !a.g[b]); b++) ;
            return a.C.encrypt(a.g);
          }
          function B(a, b) {
            return function() {
              b.apply(a, arguments);
            };
          }
          sjcl.random = new sjcl.prng(6);
          a: try {
            var D, E, F, G;
            if (G = "undefined" !== typeof module3 && module3.exports) {
              var H;
              try {
                H = _dereq_("crypto");
              } catch (a) {
                H = null;
              }
              G = E = H;
            }
            if (G && E.randomBytes)
              D = E.randomBytes(128), D = new Uint32Array(new Uint8Array(D).buffer), sjcl.random.addEntropy(D, 1024, "crypto['randomBytes']");
            else if ("undefined" !== typeof window && "undefined" !== typeof Uint32Array) {
              F = new Uint32Array(32);
              if (window.crypto && window.crypto.getRandomValues)
                window.crypto.getRandomValues(F);
              else if (window.msCrypto && window.msCrypto.getRandomValues)
                window.msCrypto.getRandomValues(F);
              else break a;
              sjcl.random.addEntropy(F, 1024, "crypto['getRandomValues']");
            }
          } catch (a) {
            "undefined" !== typeof window && window.console && (console.log("There was an error collecting entropy from the browser:"), console.log(a));
          }
          "undefined" !== typeof module3 && module3.exports && (module3.exports = sjcl);
          "function" === typeof define2 && define2([], function() {
            return sjcl;
          });
        }, { "crypto": void 0 }], 101: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            GOOGLE_PAYMENT_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "GOOGLE_PAYMENT_NOT_ENABLED",
              message: "Google Pay is not enabled for this merchant."
            },
            GOOGLE_PAYMENT_GATEWAY_ERROR: {
              code: "GOOGLE_PAYMENT_GATEWAY_ERROR",
              message: "There was an error when tokenizing the Google Pay payment method.",
              type: BraintreeError.types.UNKNOWN
            },
            GOOGLE_PAYMENT_UNSUPPORTED_VERSION: {
              code: "GOOGLE_PAYMENT_UNSUPPORTED_VERSION",
              type: BraintreeError.types.MERCHANT
            }
          };
        }, { "../lib/braintree-error": 124 }], 102: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var assign = _dereq_("../lib/assign").assign;
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var find = _dereq_("../lib/find");
          var generateGooglePayConfiguration = _dereq_("../lib/generate-google-pay-configuration");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var errors = _dereq_("./errors");
          var methods = _dereq_("../lib/methods");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var CREATE_PAYMENT_DATA_REQUEST_METHODS = {
            1: "_createV1PaymentDataRequest",
            2: "_createV2PaymentDataRequest"
          };
          function GooglePayment(options) {
            this._createPromise = options.createPromise;
            this._client = options.client;
            this._useDeferredClient = options.useDeferredClient;
            this._googlePayVersion = options.googlePayVersion || 1;
            this._googleMerchantId = options.googleMerchantId;
            if (this._isUnsupportedGooglePayAPIVersion()) {
              throw new BraintreeError({
                code: errors.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.code,
                message: "The Braintree SDK does not support Google Pay version " + this._googlePayVersion + ". Please upgrade the version of your Braintree SDK and contact support if this error persists.",
                type: errors.GOOGLE_PAYMENT_UNSUPPORTED_VERSION.type
              });
            }
          }
          GooglePayment.prototype._waitForClient = function() {
            if (this._client) {
              return Promise.resolve();
            }
            return this._createPromise.then(
              function(client) {
                this._client = client;
              }.bind(this)
            );
          };
          GooglePayment.prototype._isUnsupportedGooglePayAPIVersion = function() {
            return !(this._googlePayVersion in CREATE_PAYMENT_DATA_REQUEST_METHODS);
          };
          GooglePayment.prototype._getDefaultConfig = function() {
            if (!this._defaultConfig) {
              this._defaultConfig = generateGooglePayConfiguration(
                this._client.getConfiguration(),
                this._googlePayVersion,
                this._googleMerchantId
              );
            }
            return this._defaultConfig;
          };
          GooglePayment.prototype._createV1PaymentDataRequest = function(paymentDataRequest) {
            var defaultConfig = this._getDefaultConfig();
            var overrideCardNetworks = paymentDataRequest.cardRequirements && paymentDataRequest.cardRequirements.allowedCardNetworks;
            var defaultConfigCardNetworks = defaultConfig.cardRequirements.allowedCardNetworks;
            var allowedCardNetworks = overrideCardNetworks || defaultConfigCardNetworks;
            paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);
            paymentDataRequest.cardRequirements.allowedCardNetworks = allowedCardNetworks;
            return paymentDataRequest;
          };
          GooglePayment.prototype._createV2PaymentDataRequest = function(paymentDataRequest) {
            var defaultConfig = this._getDefaultConfig();
            if (paymentDataRequest.allowedPaymentMethods) {
              paymentDataRequest.allowedPaymentMethods.forEach(function(paymentMethod) {
                var defaultPaymentMethod = find(
                  defaultConfig.allowedPaymentMethods,
                  "type",
                  paymentMethod.type
                );
                if (defaultPaymentMethod) {
                  applyDefaultsToPaymentMethodConfiguration(
                    paymentMethod,
                    defaultPaymentMethod
                  );
                }
              });
            }
            paymentDataRequest = assign({}, defaultConfig, paymentDataRequest);
            return paymentDataRequest;
          };
          GooglePayment.prototype.createPaymentDataRequest = function(overrides) {
            if (!this._useDeferredClient) {
              return this._createPaymentDataRequestSyncronously(overrides);
            }
            return this._waitForClient().then(
              function() {
                return this._createPaymentDataRequestSyncronously(overrides);
              }.bind(this)
            );
          };
          GooglePayment.prototype._createPaymentDataRequestSyncronously = function(overrides) {
            var paymentDataRequest = assign({}, overrides);
            var version = this._googlePayVersion;
            var createPaymentDataRequestMethod = CREATE_PAYMENT_DATA_REQUEST_METHODS[version];
            analytics.sendEvent(
              this._createPromise,
              "google-payment.v" + version + ".createPaymentDataRequest"
            );
            return this[createPaymentDataRequestMethod](paymentDataRequest);
          };
          GooglePayment.prototype.parseResponse = function(response2) {
            var self2 = this;
            return Promise.resolve().then(function() {
              var payload2;
              var rawResponse = response2.apiVersion === 2 ? response2.paymentMethodData.tokenizationData.token : response2.paymentMethodToken.token;
              var parsedResponse = JSON.parse(rawResponse);
              var error = parsedResponse.error;
              if (error) {
                return Promise.reject(error);
              }
              analytics.sendEvent(
                self2._createPromise,
                "google-payment.parseResponse.succeeded"
              );
              if (parsedResponse.paypalAccounts) {
                payload2 = parsedResponse.paypalAccounts[0];
                analytics.sendEvent(
                  self2._createPromise,
                  "google-payment.parseResponse.succeeded.paypal"
                );
                return Promise.resolve({
                  nonce: payload2.nonce,
                  type: payload2.type,
                  description: payload2.description
                });
              }
              payload2 = parsedResponse.androidPayCards[0];
              analytics.sendEvent(
                self2._createPromise,
                "google-payment.parseResponse.succeeded.google-payment"
              );
              return Promise.resolve({
                nonce: payload2.nonce,
                type: payload2.type,
                description: payload2.description,
                details: {
                  cardType: payload2.details.cardType,
                  lastFour: payload2.details.lastFour,
                  lastTwo: payload2.details.lastTwo,
                  isNetworkTokenized: payload2.details.isNetworkTokenized,
                  bin: payload2.details.bin
                },
                binData: payload2.binData
              });
            }).catch(function(error) {
              analytics.sendEvent(
                self2._createPromise,
                "google-payment.parseResponse.failed"
              );
              return Promise.reject(
                new BraintreeError({
                  code: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.code,
                  message: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.message,
                  type: errors.GOOGLE_PAYMENT_GATEWAY_ERROR.type,
                  details: {
                    originalError: error
                  }
                })
              );
            });
          };
          GooglePayment.prototype.teardown = function() {
            convertMethodsToError(this, methods(GooglePayment.prototype));
            return Promise.resolve();
          };
          function applyDefaultsToPaymentMethodConfiguration(merchantSubmittedPaymentMethod, defaultPaymentMethod) {
            Object.keys(defaultPaymentMethod).forEach(function(parameter) {
              if (typeof defaultPaymentMethod[parameter] === "object") {
                merchantSubmittedPaymentMethod[parameter] = assign(
                  {},
                  defaultPaymentMethod[parameter],
                  merchantSubmittedPaymentMethod[parameter]
                );
              } else {
                merchantSubmittedPaymentMethod[parameter] = merchantSubmittedPaymentMethod[parameter] || defaultPaymentMethod[parameter];
              }
            });
          }
          module3.exports = wrapPromise.wrapPrototype(GooglePayment);
        }, { "../lib/analytics": 119, "../lib/assign": 121, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/find": 137, "../lib/generate-google-pay-configuration": 149, "../lib/methods": 155, "./errors": 101, "@braintree/wrap-promise": 43 }], 103: [function(_dereq_, module3, exports3) {
          "use strict";
          var GooglePayment = _dereq_("./google-payment");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var VERSION = "3.102.0";
          var errors = _dereq_("./errors");
          function create(options) {
            var name = "Google Pay";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var createPromise, instance;
              createPromise = createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              }).then(function(client) {
                var configuration = client.getConfiguration();
                options.client = client;
                if (!configuration.gatewayConfiguration.androidPay) {
                  return Promise.reject(
                    new BraintreeError(errors.GOOGLE_PAYMENT_NOT_ENABLED)
                  );
                }
                return client;
              });
              options.createPromise = createPromise;
              instance = new GooglePayment(options);
              if (!options.useDeferredClient) {
                return createPromise.then(function(client) {
                  instance._client = client;
                  return instance;
                });
              }
              return instance;
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./errors": 101, "./google-payment": 102, "@braintree/wrap-promise": 43 }], 104: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var errors = _dereq_("../shared/errors");
          var allowedAttributes = _dereq_("../shared/constants").allowedAttributes;
          function attributeValidationError(attribute, value) {
            var err;
            if (!allowedAttributes.hasOwnProperty(attribute)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.type,
                code: errors.HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED.code,
                message: 'The "' + attribute + '" attribute is not supported in Hosted Fields.'
              });
            } else if (value != null && !_isValid(attribute, value)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.type,
                code: errors.HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED.code,
                message: 'Value "' + value + '" is not allowed for "' + attribute + '" attribute.'
              });
            }
            return err;
          }
          function _isValid(attribute, value) {
            if (allowedAttributes[attribute] === "string") {
              return typeof value === "string" || typeof value === "number";
            } else if (allowedAttributes[attribute] === "boolean") {
              return String(value) === "true" || String(value) === "false";
            }
            return false;
          }
          module3.exports = attributeValidationError;
        }, { "../../lib/braintree-error": 124, "../shared/constants": 112, "../shared/errors": 113 }], 105: [function(_dereq_, module3, exports3) {
          "use strict";
          var constants = _dereq_("../shared/constants");
          var useMin = _dereq_("../../lib/use-min");
          module3.exports = function composeUrl(assetsUrl, componentId, isDebug) {
            return assetsUrl + "/web/" + constants.VERSION + "/html/hosted-fields-frame" + useMin(isDebug) + ".html#" + componentId;
          };
        }, { "../../lib/use-min": 160, "../shared/constants": 112 }], 106: [function(_dereq_, module3, exports3) {
          "use strict";
          var directions = _dereq_("../shared/constants").navigationDirections;
          var browserDetection = _dereq_("../shared/browser-detection");
          var focusIntercept = _dereq_("../shared/focus-intercept");
          var findParentTags = _dereq_("../shared/find-parent-tags");
          var userFocusableTagNames = ["INPUT", "SELECT", "TEXTAREA"];
          var unfocusedInputTypes = [
            "hidden",
            "button",
            "reset",
            "submit",
            "checkbox",
            "radio",
            "file"
          ];
          function _isUserFocusableElement(element) {
            if (!browserDetection.hasSoftwareKeyboard()) {
              return element.type !== "hidden";
            }
            return userFocusableTagNames.indexOf(element.tagName) > -1 && unfocusedInputTypes.indexOf(element.type) < 0;
          }
          function _createNavigationHelper(direction, numberOfElementsInForm) {
            switch (direction) {
              case directions.BACK:
                return {
                  checkIndexBounds: function(index) {
                    return index < 0;
                  },
                  indexChange: -1
                };
              case directions.FORWARD:
                return {
                  checkIndexBounds: function(index) {
                    return index > numberOfElementsInForm - 1;
                  },
                  indexChange: 1
                };
              default:
            }
            return {};
          }
          function _findFirstFocusableElement(elementsInForm) {
            var elementsIndex, element;
            for (elementsIndex = 0; elementsIndex < elementsInForm.length; elementsIndex++) {
              element = elementsInForm[elementsIndex];
              if (_isUserFocusableElement(element)) {
                return element;
              }
            }
            return null;
          }
          module3.exports = {
            removeExtraFocusElements: function(checkoutForm, onRemoveFocusIntercepts) {
              var elements = Array.prototype.slice.call(checkoutForm.elements);
              var firstFocusableInput = _findFirstFocusableElement(elements);
              var lastFocusableInput = _findFirstFocusableElement(elements.reverse());
              [firstFocusableInput, lastFocusableInput].forEach(function(input) {
                if (!input) {
                  return;
                }
                if (focusIntercept.matchFocusElement(input.getAttribute("id"))) {
                  onRemoveFocusIntercepts(input.getAttribute("id"));
                }
              });
            },
            createFocusChangeHandler: function(hostedFieldsId, callbacks) {
              return function(data) {
                var currentIndex, targetElement, checkoutForm, navHelper;
                var sourceElement = document.getElementById(
                  "bt-" + data.field + "-" + data.direction + "-" + hostedFieldsId
                );
                if (!sourceElement) {
                  return;
                }
                checkoutForm = findParentTags(sourceElement, "form")[0];
                if (document.forms.length < 1 || !checkoutForm) {
                  callbacks.onRemoveFocusIntercepts();
                  return;
                }
                checkoutForm = [].slice.call(checkoutForm.elements);
                currentIndex = checkoutForm.indexOf(sourceElement);
                navHelper = _createNavigationHelper(data.direction, checkoutForm.length);
                do {
                  currentIndex += navHelper.indexChange;
                  if (navHelper.checkIndexBounds(currentIndex)) {
                    return;
                  }
                  targetElement = checkoutForm[currentIndex];
                } while (!_isUserFocusableElement(targetElement));
                if (focusIntercept.matchFocusElement(targetElement.getAttribute("id"))) {
                  callbacks.onTriggerInputFocus(
                    targetElement.getAttribute("data-braintree-type")
                  );
                } else {
                  targetElement.focus();
                }
              };
            }
          };
        }, { "../shared/browser-detection": 111, "../shared/constants": 112, "../shared/find-parent-tags": 114, "../shared/focus-intercept": 115 }], 107: [function(_dereq_, module3, exports3) {
          "use strict";
          var allowedStyles = _dereq_("../shared/constants").allowedStyles;
          module3.exports = function getStylesFromClass(cssClass) {
            var element = document.createElement("input");
            var styles = {};
            var computedStyles;
            if (cssClass[0] === ".") {
              cssClass = cssClass.substring(1);
            }
            element.className = cssClass;
            element.style.display = "none !important";
            element.style.position = "fixed !important";
            element.style.left = "-99999px !important";
            element.style.top = "-99999px !important";
            document.body.appendChild(element);
            computedStyles = window.getComputedStyle(element);
            allowedStyles.forEach(function(style) {
              var value = computedStyles[style];
              if (value) {
                styles[style] = value;
              }
            });
            document.body.removeChild(element);
            return styles;
          };
        }, { "../shared/constants": 112 }], 108: [function(_dereq_, module3, exports3) {
          "use strict";
          var assign = _dereq_("../../lib/assign").assign;
          var createAssetsUrl = _dereq_("../../lib/create-assets-url");
          var isVerifiedDomain = _dereq_("../../lib/is-verified-domain");
          var Destructor = _dereq_("../../lib/destructor");
          var iFramer = _dereq_("@braintree/iframer");
          var Bus = _dereq_("framebus");
          var createDeferredClient = _dereq_("../../lib/create-deferred-client");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var composeUrl = _dereq_("./compose-url");
          var getStylesFromClass = _dereq_("./get-styles-from-class");
          var constants = _dereq_("../shared/constants");
          var errors = _dereq_("../shared/errors");
          var INTEGRATION_TIMEOUT_MS = _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
          var uuid = _dereq_("@braintree/uuid");
          var findParentTags = _dereq_("../shared/find-parent-tags");
          var browserDetection = _dereq_("../shared/browser-detection");
          var events = constants.events;
          var EventEmitter = _dereq_("@braintree/event-emitter");
          var injectFrame = _dereq_("./inject-frame");
          var analytics = _dereq_("../../lib/analytics");
          var allowedFields = constants.allowedFields;
          var methods = _dereq_("../../lib/methods");
          var shadow = _dereq_("../../lib/shadow");
          var findRootNode = _dereq_("../../lib/find-root-node");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var sharedErrors = _dereq_("../../lib/errors");
          var getCardTypes = _dereq_("../shared/get-card-types");
          var attributeValidationError = _dereq_("./attribute-validation-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var focusChange = _dereq_("./focus-change");
          var destroyFocusIntercept = _dereq_("../shared/focus-intercept").destroy;
          var SAFARI_FOCUS_TIMEOUT = 5;
          function createInputEventHandler(fields) {
            return function(eventData) {
              var field;
              var merchantPayload = eventData.merchantPayload;
              var emittedBy = merchantPayload.emittedBy;
              var container = fields[emittedBy].containerElement;
              Object.keys(merchantPayload.fields).forEach(function(key) {
                merchantPayload.fields[key].container = fields[key].containerElement;
              });
              field = merchantPayload.fields[emittedBy];
              container.classList.toggle(
                constants.externalClasses.FOCUSED,
                field.isFocused
              );
              container.classList.toggle(constants.externalClasses.VALID, field.isValid);
              container.classList.toggle(
                constants.externalClasses.INVALID,
                !field.isPotentiallyValid
              );
              this._state = {
                cards: merchantPayload.cards,
                fields: merchantPayload.fields
              };
              this._emit(eventData.type, merchantPayload);
            };
          }
          function isVisibleEnough(node) {
            var boundingBox = node.getBoundingClientRect();
            var verticalMidpoint = Math.floor(boundingBox.height / 2);
            var horizontalMidpoint = Math.floor(boundingBox.width / 2);
            return boundingBox.top < (window.innerHeight - verticalMidpoint || document.documentElement.clientHeight - verticalMidpoint) && boundingBox.right > horizontalMidpoint && boundingBox.bottom > verticalMidpoint && boundingBox.left < (window.innerWidth - horizontalMidpoint || document.documentElement.clientWidth - horizontalMidpoint);
          }
          function HostedFields(options) {
            var failureTimeout, clientConfig, assetsUrl, isDebug, hostedFieldsUrl;
            var self2 = this;
            var fields = {};
            var frameReadyPromiseResolveFunctions = {};
            var frameReadyPromises = [];
            var componentId = uuid();
            this._merchantConfigurationOptions = assign({}, options);
            if (options.client) {
              clientConfig = options.client.getConfiguration();
              assetsUrl = clientConfig.gatewayConfiguration.assetsUrl;
              isDebug = clientConfig.isDebug;
            } else {
              assetsUrl = createAssetsUrl.create(options.authorization);
              isDebug = Boolean(options.isDebug);
            }
            this._clientPromise = createDeferredClient.create({
              client: options.client,
              authorization: options.authorization,
              debug: isDebug,
              assetsUrl,
              name: "Hosted Fields"
            });
            hostedFieldsUrl = composeUrl(assetsUrl, componentId, isDebug);
            if (!options.fields || Object.keys(options.fields).length === 0) {
              throw new BraintreeError({
                type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
                code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
                message: "options.fields is required when instantiating Hosted Fields."
              });
            }
            EventEmitter.call(this);
            this._injectedNodes = [];
            this._destructor = new Destructor();
            this._fields = fields;
            this._state = {
              fields: {},
              cards: getCardTypes("")
            };
            this._bus = new Bus({
              channel: componentId,
              verifyDomain: isVerifiedDomain,
              targetFrames: [window]
            });
            this._destructor.registerFunctionForTeardown(function() {
              self2._bus.teardown();
            });
            if (!options.client) {
              analytics.sendEvent(
                this._clientPromise,
                "custom.hosted-fields.initialized.deferred-client"
              );
            } else {
              analytics.sendEvent(
                this._clientPromise,
                "custom.hosted-fields.initialized"
              );
            }
            Object.keys(options.fields).forEach(
              function(key) {
                var field, externalContainer, internalContainer, frame, frameReadyPromise;
                if (!constants.allowedFields.hasOwnProperty(key)) {
                  throw new BraintreeError({
                    type: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.type,
                    code: errors.HOSTED_FIELDS_INVALID_FIELD_KEY.code,
                    message: '"' + key + '" is not a valid field.'
                  });
                }
                field = options.fields[key];
                externalContainer = field.container || field.selector;
                if (typeof externalContainer === "string") {
                  externalContainer = document.querySelector(externalContainer);
                }
                if (!externalContainer || externalContainer.nodeType !== 1) {
                  throw new BraintreeError({
                    type: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.type,
                    code: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.code,
                    message: errors.HOSTED_FIELDS_INVALID_FIELD_SELECTOR.message,
                    details: {
                      fieldSelector: field.selector,
                      fieldContainer: field.container,
                      fieldKey: key
                    }
                  });
                } else if (externalContainer.querySelector('iframe[name^="braintree-"]')) {
                  throw new BraintreeError({
                    type: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.type,
                    code: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.code,
                    message: errors.HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME.message,
                    details: {
                      fieldSelector: field.selector,
                      fieldContainer: field.container,
                      fieldKey: key
                    }
                  });
                }
                internalContainer = externalContainer;
                if (shadow.isShadowElement(internalContainer)) {
                  internalContainer = shadow.transformToSlot(
                    internalContainer,
                    "height: 100%"
                  );
                }
                if (field.maxlength && typeof field.maxlength !== "number") {
                  throw new BraintreeError({
                    type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                    code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                    message: "The value for maxlength must be a number.",
                    details: {
                      fieldKey: key
                    }
                  });
                }
                if (field.minlength && typeof field.minlength !== "number") {
                  throw new BraintreeError({
                    type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                    code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                    message: "The value for minlength must be a number.",
                    details: {
                      fieldKey: key
                    }
                  });
                }
                frame = iFramer({
                  type: key,
                  name: "braintree-hosted-field-" + key,
                  style: constants.defaultIFrameStyle,
                  title: field.iframeTitle || "Secure Credit Card Frame - " + constants.allowedFields[key].label
                });
                this._bus.addTargetFrame(frame);
                this._injectedNodes.push.apply(
                  this._injectedNodes,
                  injectFrame(componentId, frame, internalContainer, function() {
                    self2.focus(key);
                  })
                );
                this._setupLabelFocus(key, externalContainer);
                fields[key] = {
                  frameElement: frame,
                  containerElement: externalContainer
                };
                frameReadyPromise = new Promise(function(resolve) {
                  frameReadyPromiseResolveFunctions[key] = resolve;
                });
                frameReadyPromises.push(frameReadyPromise);
                this._state.fields[key] = {
                  isEmpty: true,
                  isValid: false,
                  isPotentiallyValid: true,
                  isFocused: false,
                  container: externalContainer
                };
                setTimeout(function() {
                  frame.src = hostedFieldsUrl;
                }, 0);
              }.bind(this)
            );
            if (this._merchantConfigurationOptions.styles) {
              Object.keys(this._merchantConfigurationOptions.styles).forEach(function(selector) {
                var className = self2._merchantConfigurationOptions.styles[selector];
                if (typeof className === "string") {
                  self2._merchantConfigurationOptions.styles[selector] = getStylesFromClass(className);
                }
              });
            }
            this._bus.on(events.REMOVE_FOCUS_INTERCEPTS, function(data) {
              destroyFocusIntercept(data && data.id);
            });
            this._bus.on(
              events.TRIGGER_FOCUS_CHANGE,
              focusChange.createFocusChangeHandler(componentId, {
                onRemoveFocusIntercepts: function(element) {
                  self2._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
                    id: element
                  });
                },
                onTriggerInputFocus: function(targetType) {
                  self2.focus(targetType);
                }
              })
            );
            this._bus.on(events.READY_FOR_CLIENT, function(reply) {
              self2._clientPromise.then(function(client) {
                reply(client);
              });
            });
            this._bus.on(events.CARD_FORM_ENTRY_HAS_BEGUN, function() {
              analytics.sendEvent(self2._clientPromise, "hosted-fields.input.started");
            });
            this._bus.on(events.BIN_AVAILABLE, function(bin) {
              self2._emit("binAvailable", {
                bin
              });
            });
            failureTimeout = setTimeout(function() {
              analytics.sendEvent(
                self2._clientPromise,
                "custom.hosted-fields.load.timed-out"
              );
              self2._emit("timeout");
            }, INTEGRATION_TIMEOUT_MS);
            Promise.all(frameReadyPromises).then(function(results) {
              var reply = results[0];
              clearTimeout(failureTimeout);
              reply(
                formatMerchantConfigurationForIframes(self2._merchantConfigurationOptions)
              );
              self2._cleanUpFocusIntercepts();
              self2._emit("ready");
            });
            this._bus.on(events.FRAME_READY, function(data, reply) {
              frameReadyPromiseResolveFunctions[data.field](reply);
            });
            this._bus.on(events.INPUT_EVENT, createInputEventHandler(fields).bind(this));
            this._destructor.registerFunctionForTeardown(function() {
              var j, node, parent;
              for (j = 0; j < self2._injectedNodes.length; j++) {
                node = self2._injectedNodes[j];
                parent = node.parentNode;
                parent.removeChild(node);
                parent.classList.remove(
                  constants.externalClasses.FOCUSED,
                  constants.externalClasses.INVALID,
                  constants.externalClasses.VALID
                );
              }
            });
            this._destructor.registerFunctionForTeardown(function() {
              destroyFocusIntercept();
            });
            this._destructor.registerFunctionForTeardown(function() {
              var methodNames = methods(HostedFields.prototype).concat(
                methods(EventEmitter.prototype)
              );
              convertMethodsToError(self2, methodNames);
            });
          }
          EventEmitter.createChild(HostedFields);
          HostedFields.prototype._setupLabelFocus = function(type, container) {
            var labels, i;
            var self2 = this;
            var rootNode = findRootNode(container);
            if (container.id == null) {
              return;
            }
            function triggerFocus() {
              self2.focus(type);
            }
            labels = Array.prototype.slice.call(
              document.querySelectorAll('label[for="' + container.id + '"]')
            );
            if (rootNode !== document) {
              labels = labels.concat(
                Array.prototype.slice.call(
                  rootNode.querySelectorAll('label[for="' + container.id + '"]')
                )
              );
            }
            labels = labels.concat(findParentTags(container, "label"));
            labels = labels.filter(function(label, index, arr) {
              return arr.indexOf(label) === index;
            });
            for (i = 0; i < labels.length; i++) {
              labels[i].addEventListener("click", triggerFocus, false);
            }
            this._destructor.registerFunctionForTeardown(function() {
              for (i = 0; i < labels.length; i++) {
                labels[i].removeEventListener("click", triggerFocus, false);
              }
            });
          };
          HostedFields.prototype._getAnyFieldContainer = function() {
            var self2 = this;
            return Object.keys(this._fields).reduce(function(found, field) {
              return found || self2._fields[field].containerElement;
            }, null);
          };
          HostedFields.prototype._cleanUpFocusIntercepts = function() {
            var iframeContainer, checkoutForm;
            if (document.forms.length < 1) {
              this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
            } else {
              iframeContainer = this._getAnyFieldContainer();
              checkoutForm = findParentTags(iframeContainer, "form")[0];
              if (checkoutForm) {
                focusChange.removeExtraFocusElements(
                  checkoutForm,
                  function(id) {
                    this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS, {
                      id
                    });
                  }.bind(this)
                );
              } else {
                this._bus.emit(events.REMOVE_FOCUS_INTERCEPTS);
              }
            }
          };
          HostedFields.prototype._attachInvalidFieldContainersToError = function(err) {
            if (!(err.details && err.details.invalidFieldKeys && err.details.invalidFieldKeys.length > 0)) {
              return;
            }
            err.details.invalidFields = {};
            err.details.invalidFieldKeys.forEach(
              function(field) {
                err.details.invalidFields[field] = this._fields[field].containerElement;
              }.bind(this)
            );
          };
          HostedFields.prototype.getChallenges = function() {
            return this._clientPromise.then(function(client) {
              return client.getConfiguration().gatewayConfiguration.challenges;
            });
          };
          HostedFields.prototype.getSupportedCardTypes = function() {
            return this._clientPromise.then(function(client) {
              var cards = client.getConfiguration().gatewayConfiguration.creditCards.supportedCardTypes.map(function(cardType) {
                if (cardType === "MasterCard") {
                  return "Mastercard";
                }
                return cardType;
              });
              return cards;
            });
          };
          HostedFields.prototype.teardown = function() {
            var self2 = this;
            return new Promise(function(resolve, reject) {
              self2._destructor.teardown(function(err) {
                analytics.sendEvent(
                  self2._clientPromise,
                  "custom.hosted-fields.teardown-completed"
                );
                if (err) {
                  reject(err);
                } else {
                  resolve();
                }
              });
            });
          };
          HostedFields.prototype.tokenize = function(options) {
            var self2 = this;
            if (!options) {
              options = {};
            }
            return new Promise(function(resolve, reject) {
              self2._bus.emit(events.TOKENIZATION_REQUEST, options, function(response2) {
                var err = response2[0];
                var payload2 = response2[1];
                if (err) {
                  self2._attachInvalidFieldContainersToError(err);
                  reject(new BraintreeError(err));
                } else {
                  resolve(payload2);
                }
              });
            });
          };
          HostedFields.prototype.addClass = function(field, classname) {
            var err;
            if (!allowedFields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + field + '" is not a valid field. You must use a valid field option when adding a class.'
              });
            } else if (!this._fields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot add class to "' + field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              this._bus.emit(events.ADD_CLASS, {
                field,
                classname
              });
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.removeClass = function(field, classname) {
            var err;
            if (!allowedFields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + field + '" is not a valid field. You must use a valid field option when removing a class.'
              });
            } else if (!this._fields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot remove class from "' + field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              this._bus.emit(events.REMOVE_CLASS, {
                field,
                classname
              });
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.setAttribute = function(options) {
            var attributeErr, err;
            if (!allowedFields.hasOwnProperty(options.field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + options.field + '" is not a valid field. You must use a valid field option when setting an attribute.'
              });
            } else if (!this._fields.hasOwnProperty(options.field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot set attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              attributeErr = attributeValidationError(options.attribute, options.value);
              if (attributeErr) {
                err = attributeErr;
              } else {
                this._bus.emit(events.SET_ATTRIBUTE, {
                  field: options.field,
                  attribute: options.attribute,
                  value: options.value
                });
              }
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.setMonthOptions = function(options) {
            var self2 = this;
            var merchantOptions = this._merchantConfigurationOptions.fields;
            var errorMessage;
            if (!merchantOptions.expirationMonth) {
              errorMessage = "Expiration month field must exist to use setMonthOptions.";
            } else if (!merchantOptions.expirationMonth.select) {
              errorMessage = "Expiration month field must be a select element.";
            }
            if (errorMessage) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.type,
                  code: errors.HOSTED_FIELDS_FIELD_PROPERTY_INVALID.code,
                  message: errorMessage
                })
              );
            }
            return new Promise(function(resolve) {
              self2._bus.emit(events.SET_MONTH_OPTIONS, options, resolve);
            });
          };
          HostedFields.prototype.setMessage = function(options) {
            this._bus.emit(events.SET_MESSAGE, {
              field: options.field,
              message: options.message
            });
          };
          HostedFields.prototype.removeAttribute = function(options) {
            var attributeErr, err;
            if (!allowedFields.hasOwnProperty(options.field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + options.field + '" is not a valid field. You must use a valid field option when removing an attribute.'
              });
            } else if (!this._fields.hasOwnProperty(options.field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot remove attribute for "' + options.field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              attributeErr = attributeValidationError(options.attribute);
              if (attributeErr) {
                err = attributeErr;
              } else {
                this._bus.emit(events.REMOVE_ATTRIBUTE, {
                  field: options.field,
                  attribute: options.attribute
                });
              }
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.setPlaceholder = function(field, placeholder) {
            return this.setAttribute({
              field,
              attribute: "placeholder",
              value: placeholder
            });
          };
          HostedFields.prototype.clear = function(field) {
            var err;
            if (!allowedFields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + field + '" is not a valid field. You must use a valid field option when clearing a field.'
              });
            } else if (!this._fields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot clear "' + field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              this._bus.emit(events.CLEAR_FIELD, {
                field
              });
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.focus = function(field) {
            var err;
            var fieldConfig = this._fields[field];
            if (!allowedFields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_INVALID.type,
                code: errors.HOSTED_FIELDS_FIELD_INVALID.code,
                message: '"' + field + '" is not a valid field. You must use a valid field option when focusing a field.'
              });
            } else if (!this._fields.hasOwnProperty(field)) {
              err = new BraintreeError({
                type: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.type,
                code: errors.HOSTED_FIELDS_FIELD_NOT_PRESENT.code,
                message: 'Cannot focus "' + field + '" field because it is not part of the current Hosted Fields options.'
              });
            } else {
              fieldConfig.frameElement.focus();
              this._bus.emit(events.TRIGGER_INPUT_FOCUS, {
                field
              });
              if (browserDetection.isIos()) {
                setTimeout(function() {
                  if (!isVisibleEnough(fieldConfig.containerElement)) {
                    fieldConfig.containerElement.scrollIntoView();
                  }
                }, SAFARI_FOCUS_TIMEOUT);
              }
            }
            if (err) {
              return Promise.reject(err);
            }
            return Promise.resolve();
          };
          HostedFields.prototype.getState = function() {
            return this._state;
          };
          function formatMerchantConfigurationForIframes(config) {
            var formattedConfig = assign({}, config);
            formattedConfig.fields = assign({}, formattedConfig.fields);
            Object.keys(formattedConfig.fields).forEach(function(field) {
              formattedConfig.fields[field] = assign({}, formattedConfig.fields[field]);
              delete formattedConfig.fields[field].container;
            });
            return formattedConfig;
          }
          module3.exports = wrapPromise.wrapPrototype(HostedFields);
        }, { "../../lib/analytics": 119, "../../lib/assign": 121, "../../lib/braintree-error": 124, "../../lib/constants": 126, "../../lib/convert-methods-to-error": 127, "../../lib/create-assets-url": 129, "../../lib/create-deferred-client": 131, "../../lib/destructor": 133, "../../lib/errors": 135, "../../lib/find-root-node": 136, "../../lib/is-verified-domain": 153, "../../lib/methods": 155, "../../lib/shadow": 158, "../shared/browser-detection": 111, "../shared/constants": 112, "../shared/errors": 113, "../shared/find-parent-tags": 114, "../shared/focus-intercept": 115, "../shared/get-card-types": 116, "./attribute-validation-error": 104, "./compose-url": 105, "./focus-change": 106, "./get-styles-from-class": 107, "./inject-frame": 109, "@braintree/event-emitter": 33, "@braintree/iframer": 35, "@braintree/uuid": 39, "@braintree/wrap-promise": 43, "framebus": 52 }], 109: [function(_dereq_, module3, exports3) {
          "use strict";
          var focusIntercept = _dereq_("../shared/focus-intercept");
          var directions = _dereq_("../shared/constants").navigationDirections;
          module3.exports = function injectFrame(id, frame, container, focusHandler) {
            var frameType = frame.getAttribute("type");
            var clearboth = document.createElement("div");
            var fragment = document.createDocumentFragment();
            var focusInterceptBefore = focusIntercept.generate(
              id,
              frameType,
              directions.BACK,
              focusHandler
            );
            var focusInterceptAfter = focusIntercept.generate(
              id,
              frameType,
              directions.FORWARD,
              focusHandler
            );
            clearboth.style.clear = "both";
            fragment.appendChild(focusInterceptBefore);
            fragment.appendChild(frame);
            fragment.appendChild(focusInterceptAfter);
            fragment.appendChild(clearboth);
            container.appendChild(fragment);
            return [frame, clearboth];
          };
        }, { "../shared/constants": 112, "../shared/focus-intercept": 115 }], 110: [function(_dereq_, module3, exports3) {
          "use strict";
          var HostedFields = _dereq_("./external/hosted-fields");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var errors = _dereq_("./shared/errors");
          var supportsInputFormatting = _dereq_("restricted-input/supports-input-formatting");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var VERSION = "3.102.0";
          function create(options) {
            return basicComponentVerification.verify({
              name: "Hosted Fields",
              authorization: options.authorization,
              client: options.client
            }).then(function() {
              var integration = new HostedFields(options);
              return new Promise(function(resolve, reject) {
                integration.on("ready", function() {
                  resolve(integration);
                });
                integration.on("timeout", function() {
                  reject(new BraintreeError(errors.HOSTED_FIELDS_TIMEOUT));
                });
              });
            });
          }
          module3.exports = {
            /**
             * @static
             * @function supportsInputFormatting
             * @description Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true. For a list of unsupported browsers, [go here](https://github.com/braintree/restricted-input/blob/main/README.md#browsers-where-formatting-is-turned-off-automatically).
             * @returns {Boolean} Returns false if input formatting will be automatically disabled due to browser incompatibility. Otherwise, returns true.
             * @example
             * <caption>Conditionally choosing split expiration date inputs if formatting is unavailable</caption>
             * var canFormat = braintree.hostedFields.supportsInputFormatting();
             * var fields = {
             *   number: {
             *     container: '#card-number'
             *   },
             *   cvv: {
             *     container: '#cvv'
             *   }
             * };
             *
             * if (canFormat) {
             *   fields.expirationDate = {
             *     selection: '#expiration-date'
             *   };
             *   functionToCreateAndInsertExpirationDateDivToForm();
             * } else {
             *   fields.expirationMonth = {
             *     selection: '#expiration-month'
             *   };
             *   fields.expirationYear = {
             *     selection: '#expiration-year'
             *   };
             *   functionToCreateAndInsertExpirationMonthAndYearDivsToForm();
             * }
             *
             * braintree.hostedFields.create({
             *   client: clientInstance,
             *   styles: {
             *     // Styles
             *   },
             *   fields: fields
             * }, callback);
             */
            supportsInputFormatting,
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "./external/hosted-fields": 108, "./shared/errors": 113, "@braintree/wrap-promise": 43, "restricted-input/supports-input-formatting": 71 }], 111: [function(_dereq_, module3, exports3) {
          "use strict";
          var isAndroid = _dereq_("@braintree/browser-detection/is-android");
          var isChromeOS = _dereq_("@braintree/browser-detection/is-chrome-os");
          var isIos = _dereq_("@braintree/browser-detection/is-ios");
          var isChrome = _dereq_("@braintree/browser-detection/is-chrome");
          function hasSoftwareKeyboard() {
            return isAndroid() || isChromeOS() || isIos();
          }
          function isChromeIos() {
            return isChrome() && isIos();
          }
          module3.exports = {
            isAndroid,
            isChromeOS,
            isChromeIos,
            isFirefox: _dereq_("@braintree/browser-detection/is-firefox"),
            isIos,
            isIosWebview: _dereq_("@braintree/browser-detection/is-ios-webview"),
            hasSoftwareKeyboard
          };
        }, { "@braintree/browser-detection/is-android": 22, "@braintree/browser-detection/is-chrome": 24, "@braintree/browser-detection/is-chrome-os": 23, "@braintree/browser-detection/is-firefox": 25, "@braintree/browser-detection/is-ios": 30, "@braintree/browser-detection/is-ios-webview": 28 }], 112: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("../../lib/enumerate");
          var errors = _dereq_("./errors");
          var VERSION = "3.102.0";
          var constants = {
            VERSION,
            maxExpirationYearAge: 19,
            externalEvents: {
              FOCUS: "focus",
              BLUR: "blur",
              EMPTY: "empty",
              NOT_EMPTY: "notEmpty",
              VALIDITY_CHANGE: "validityChange",
              CARD_TYPE_CHANGE: "cardTypeChange"
            },
            defaultMaxLengths: {
              number: 19,
              postalCode: 8,
              expirationDate: 7,
              expirationMonth: 2,
              expirationYear: 4,
              cvv: 3
            },
            externalClasses: {
              FOCUSED: "braintree-hosted-fields-focused",
              INVALID: "braintree-hosted-fields-invalid",
              VALID: "braintree-hosted-fields-valid"
            },
            navigationDirections: {
              BACK: "before",
              FORWARD: "after"
            },
            defaultIFrameStyle: {
              border: "none",
              width: "100%",
              height: "100%",
              float: "left"
            },
            tokenizationErrorCodes: {
              81724: errors.HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE,
              // NEXT_MAJOR_VERSION this error triggers for both AVS and CVV errors
              // but the code name implies that it would only trigger for CVV verification
              // failures
              81736: errors.HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED
            },
            allowedStyles: [
              "-moz-appearance",
              "-moz-box-shadow",
              "-moz-osx-font-smoothing",
              "-moz-tap-highlight-color",
              "-moz-transition",
              "-webkit-appearance",
              "-webkit-box-shadow",
              "-webkit-font-smoothing",
              "-webkit-tap-highlight-color",
              "-webkit-transition",
              "appearance",
              "box-shadow",
              "color",
              "direction",
              "font",
              "font-family",
              "font-size",
              "font-size-adjust",
              "font-stretch",
              "font-style",
              "font-variant",
              "font-variant-alternates",
              "font-variant-caps",
              "font-variant-east-asian",
              "font-variant-ligatures",
              "font-variant-numeric",
              "font-weight",
              "letter-spacing",
              "line-height",
              "margin",
              "margin-top",
              "margin-right",
              "margin-bottom",
              "margin-left",
              "opacity",
              "outline",
              "padding",
              "padding-top",
              "padding-right",
              "padding-bottom",
              "padding-left",
              "text-align",
              "text-shadow",
              "transition"
            ],
            allowedFields: {
              cardholderName: {
                name: "cardholder-name",
                label: "Cardholder Name"
              },
              number: {
                name: "credit-card-number",
                label: "Credit Card Number"
              },
              cvv: {
                name: "cvv",
                label: "CVV"
              },
              expirationDate: {
                name: "expiration",
                label: "Expiration Date"
              },
              expirationMonth: {
                name: "expiration-month",
                label: "Expiration Month"
              },
              expirationYear: {
                name: "expiration-year",
                label: "Expiration Year"
              },
              postalCode: {
                name: "postal-code",
                label: "Postal Code"
              }
            },
            allowedAttributes: {
              "aria-invalid": "boolean",
              "aria-required": "boolean",
              disabled: "boolean",
              placeholder: "string"
            },
            autocompleteMappings: {
              "cardholder-name": "cc-name",
              "credit-card-number": "cc-number",
              expiration: "cc-exp",
              "expiration-month": "cc-exp-month",
              "expiration-year": "cc-exp-year",
              cvv: "cc-csc",
              "postal-code": "billing postal-code"
            }
          };
          constants.events = enumerate(
            [
              "ADD_CLASS",
              "AUTOFILL_DATA_AVAILABLE",
              "BIN_AVAILABLE",
              "CARD_FORM_ENTRY_HAS_BEGUN",
              "CLEAR_FIELD",
              "CONFIGURATION",
              "FRAME_READY",
              "INPUT_EVENT",
              "READY_FOR_CLIENT",
              "REMOVE_ATTRIBUTE",
              "REMOVE_CLASS",
              "REMOVE_FOCUS_INTERCEPTS",
              "SET_ATTRIBUTE",
              "SET_MESSAGE",
              "SET_MONTH_OPTIONS",
              "TOKENIZATION_REQUEST",
              "TRIGGER_FOCUS_CHANGE",
              "TRIGGER_INPUT_FOCUS",
              "VALIDATE_STRICT"
            ],
            "hosted-fields:"
          );
          module3.exports = constants;
        }, { "../../lib/enumerate": 134, "./errors": 113 }], 113: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            HOSTED_FIELDS_TIMEOUT: {
              type: BraintreeError.types.UNKNOWN,
              code: "HOSTED_FIELDS_TIMEOUT",
              message: "Hosted Fields timed out when attempting to set up."
            },
            HOSTED_FIELDS_INVALID_FIELD_KEY: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_INVALID_FIELD_KEY"
            },
            HOSTED_FIELDS_INVALID_FIELD_SELECTOR: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_INVALID_FIELD_SELECTOR",
              message: "Selector does not reference a valid DOM node."
            },
            HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_FIELD_DUPLICATE_IFRAME",
              message: "Element already contains a Braintree iframe."
            },
            HOSTED_FIELDS_FIELD_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_FIELD_INVALID"
            },
            HOSTED_FIELDS_FIELD_NOT_PRESENT: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_FIELD_NOT_PRESENT"
            },
            HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "HOSTED_FIELDS_TOKENIZATION_NETWORK_ERROR",
              message: "A tokenization network error occurred."
            },
            HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE: {
              type: BraintreeError.types.CUSTOMER,
              code: "HOSTED_FIELDS_TOKENIZATION_FAIL_ON_DUPLICATE",
              message: "This credit card already exists in the merchant's vault."
            },
            HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED: {
              type: BraintreeError.types.CUSTOMER,
              code: "HOSTED_FIELDS_TOKENIZATION_CVV_VERIFICATION_FAILED",
              message: "CVV verification failed during tokenization."
            },
            HOSTED_FIELDS_FAILED_TOKENIZATION: {
              type: BraintreeError.types.CUSTOMER,
              code: "HOSTED_FIELDS_FAILED_TOKENIZATION",
              message: "The supplied card data failed tokenization."
            },
            HOSTED_FIELDS_FIELDS_EMPTY: {
              type: BraintreeError.types.CUSTOMER,
              code: "HOSTED_FIELDS_FIELDS_EMPTY",
              message: "All fields are empty. Cannot tokenize empty card fields."
            },
            HOSTED_FIELDS_FIELDS_INVALID: {
              type: BraintreeError.types.CUSTOMER,
              code: "HOSTED_FIELDS_FIELDS_INVALID",
              message: "Some payment input fields are invalid. Cannot tokenize invalid card fields."
            },
            HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_ATTRIBUTE_NOT_SUPPORTED"
            },
            HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_ATTRIBUTE_VALUE_NOT_ALLOWED"
            },
            HOSTED_FIELDS_FIELD_PROPERTY_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "HOSTED_FIELDS_FIELD_PROPERTY_INVALID"
            }
          };
        }, { "../../lib/braintree-error": 124 }], 114: [function(_dereq_, module3, exports3) {
          "use strict";
          function findParentTags(element, tag) {
            var parent = element.parentNode;
            var parents = [];
            while (parent != null) {
              if (parent.tagName != null && parent.tagName.toLowerCase() === tag) {
                parents.push(parent);
              }
              parent = parent.parentNode;
            }
            return parents;
          }
          module3.exports = findParentTags;
        }, {}], 115: [function(_dereq_, module3, exports3) {
          "use strict";
          var browserDetection = _dereq_("./browser-detection");
          var constants = _dereq_("./constants");
          var allowedFields = Object.keys(constants.allowedFields);
          var directions = constants.navigationDirections;
          var focusIntercept = {
            generate: function(hostedFieldsId, type, direction, handler) {
              var input = document.createElement("input");
              var focusInterceptStyles = {
                border: "none !important",
                display: "block !important",
                height: "1px !important",
                left: "-1px !important",
                opacity: "0 !important",
                position: "absolute !important",
                top: "-1px !important",
                width: "1px !important"
              };
              var shouldCreateFocusIntercept = browserDetection.hasSoftwareKeyboard() || browserDetection.isFirefox();
              if (!shouldCreateFocusIntercept) {
                return document.createDocumentFragment();
              }
              input.setAttribute("aria-hidden", "true");
              input.setAttribute("autocomplete", "off");
              input.setAttribute("data-braintree-direction", direction);
              input.setAttribute("data-braintree-type", type);
              input.setAttribute(
                "id",
                "bt-" + type + "-" + direction + "-" + hostedFieldsId
              );
              input.setAttribute(
                "style",
                JSON.stringify(focusInterceptStyles).replace(/[{}"]/g, "").replace(/,/g, ";")
              );
              input.classList.add("focus-intercept");
              input.addEventListener("focus", function(event) {
                handler(event);
                if (!browserDetection.hasSoftwareKeyboard()) {
                  input.blur();
                }
              });
              return input;
            },
            destroy: function(idString) {
              var focusInputs;
              if (!idString) {
                focusInputs = document.querySelectorAll("[data-braintree-direction]");
                focusInputs = [].slice.call(focusInputs);
              } else {
                focusInputs = [document.getElementById(idString)];
              }
              focusInputs.forEach(function(node) {
                if (node && node.nodeType === 1 && focusIntercept.matchFocusElement(node.getAttribute("id"))) {
                  node.parentNode.removeChild(node);
                }
              });
            },
            matchFocusElement: function(idString) {
              var idComponents, hasBTPrefix, isAllowedType, isValidDirection;
              if (!idString) {
                return false;
              }
              idComponents = idString.split("-");
              if (idComponents.length < 4) {
                return false;
              }
              hasBTPrefix = idComponents[0] === "bt";
              isAllowedType = allowedFields.indexOf(idComponents[1]) > -1;
              isValidDirection = idComponents[2] === directions.BACK || idComponents[2] === directions.FORWARD;
              return Boolean(hasBTPrefix && isAllowedType && isValidDirection);
            }
          };
          module3.exports = focusIntercept;
        }, { "./browser-detection": 111, "./constants": 112 }], 116: [function(_dereq_, module3, exports3) {
          "use strict";
          var creditCardType = _dereq_("credit-card-type");
          module3.exports = function(number) {
            var results = creditCardType(number);
            results.forEach(function(card) {
              if (card.type === "mastercard") {
                card.type = "master-card";
              }
            });
            return results;
          };
        }, { "credit-card-type": 44 }], 117: [function(_dereq_, module3, exports3) {
          "use strict";
          var americanExpress = _dereq_("./american-express");
          var applePay = _dereq_("./apple-pay");
          var client = _dereq_("./client");
          var dataCollector = _dereq_("./data-collector");
          var hostedFields = _dereq_("./hosted-fields");
          var localPayment = _dereq_("./local-payment");
          var masterpass = _dereq_("./masterpass");
          var paymentRequest = _dereq_("./payment-request");
          var paypal = _dereq_("./paypal");
          var paypalCheckout = _dereq_("./paypal-checkout");
          var googlePayment = _dereq_("./google-payment");
          var sepa = _dereq_("./sepa");
          var threeDSecure = _dereq_("./three-d-secure");
          var unionpay = _dereq_("./unionpay");
          var usBankAccount = _dereq_("./us-bank-account");
          var vaultManager = _dereq_("./vault-manager");
          var venmo = _dereq_("./venmo");
          var visaCheckout = _dereq_("./visa-checkout");
          var preferredPaymentMethods = _dereq_("./preferred-payment-methods");
          var VERSION = "3.102.0";
          module3.exports = {
            /** @type {module:braintree-web/american-express} */
            americanExpress,
            /** @type {module:braintree-web/apple-pay} */
            applePay,
            /** @type {module:braintree-web/client} */
            client,
            /** @type {module:braintree-web/data-collector} */
            dataCollector,
            /** @type {module:braintree-web/hosted-fields} */
            hostedFields,
            /** @type {module:braintree-web/local-payment} */
            localPayment,
            /** @type {module:braintree-web/masterpass} */
            masterpass,
            /** @type {module:braintree-web/google-payment} */
            googlePayment,
            /** @type {module:braintree-web/payment-request} */
            paymentRequest,
            /** @type {module:braintree-web/paypal} */
            paypal,
            /** @type {module:braintree-web/paypal-checkout} */
            paypalCheckout,
            /** @type {module:braintree-web/three-d-secure} */
            threeDSecure,
            /** @type {module:braintree-web/unionpay} */
            unionpay,
            /** @type {module:braintree-web/us-bank-account} */
            usBankAccount,
            /** @type {module:braintree-web/vault-manager} */
            vaultManager,
            /** @type {module:braintree-web/venmo} */
            venmo,
            /** @type {module:braintree-web/visa-checkout} */
            visaCheckout,
            /** @type {module:braintree-web/sepa} */
            sepa,
            /** @type {module:braintree-web/preferred-payment-methods} */
            preferredPaymentMethods,
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "./american-express": 74, "./apple-pay": 77, "./client": 82, "./data-collector": 98, "./google-payment": 103, "./hosted-fields": 110, "./local-payment": 164, "./masterpass": 167, "./payment-request": 172, "./paypal": 179, "./paypal-checkout": 176, "./preferred-payment-methods": 182, "./sepa": 186, "./three-d-secure": 198, "./unionpay": 202, "./us-bank-account": 208, "./vault-manager": 211, "./venmo": 216, "./visa-checkout": 226 }], 118: [function(_dereq_, module3, exports3) {
          "use strict";
          var createAuthorizationData = _dereq_("./create-authorization-data");
          var jsonClone = _dereq_("./json-clone");
          var constants = _dereq_("./constants");
          function addMetadata(configuration, data) {
            var key;
            var attrs = data ? jsonClone(data) : {};
            var authAttrs = createAuthorizationData(configuration.authorization).attrs;
            var _meta = jsonClone(configuration.analyticsMetadata);
            attrs.braintreeLibraryVersion = constants.BRAINTREE_LIBRARY_VERSION;
            for (key in attrs._meta) {
              if (attrs._meta.hasOwnProperty(key)) {
                _meta[key] = attrs._meta[key];
              }
            }
            attrs._meta = _meta;
            if (authAttrs.tokenizationKey) {
              attrs.tokenizationKey = authAttrs.tokenizationKey;
            } else {
              attrs.authorizationFingerprint = authAttrs.authorizationFingerprint;
            }
            return attrs;
          }
          module3.exports = addMetadata;
        }, { "./constants": 126, "./create-authorization-data": 130, "./json-clone": 154 }], 119: [function(_dereq_, module3, exports3) {
          "use strict";
          var constants = _dereq_("./constants");
          var addMetadata = _dereq_("./add-metadata");
          function sendAnalyticsEvent(clientInstanceOrPromise, kind, callback) {
            var timestamp = Date.now();
            return Promise.resolve(clientInstanceOrPromise).then(function(client) {
              var timestampInPromise = Date.now();
              var configuration = client.getConfiguration();
              var request = client._request;
              var url = configuration.gatewayConfiguration.analytics.url;
              var data = {
                analytics: [
                  {
                    kind: constants.ANALYTICS_PREFIX + kind,
                    isAsync: Math.floor(timestampInPromise / 1e3) !== Math.floor(timestamp / 1e3),
                    timestamp
                  }
                ]
              };
              request(
                {
                  url,
                  method: "post",
                  data: addMetadata(configuration, data),
                  timeout: constants.ANALYTICS_REQUEST_TIMEOUT_MS
                },
                callback
              );
            }).catch(function(err) {
              if (callback) {
                callback(err);
              }
            });
          }
          module3.exports = {
            sendEvent: sendAnalyticsEvent
          };
        }, { "./add-metadata": 118, "./constants": 126 }], 120: [function(_dereq_, module3, exports3) {
          "use strict";
          var loadScript = _dereq_("@braintree/asset-loader/load-script");
          module3.exports = {
            loadScript
          };
        }, { "@braintree/asset-loader/load-script": 3 }], 121: [function(_dereq_, module3, exports3) {
          "use strict";
          var assignNormalized = typeof Object.assign === "function" ? Object.assign : assignPolyfill;
          function assignPolyfill(destination) {
            var i, source, key;
            for (i = 1; i < arguments.length; i++) {
              source = arguments[i];
              for (key in source) {
                if (source.hasOwnProperty(key)) {
                  destination[key] = source[key];
                }
              }
            }
            return destination;
          }
          module3.exports = {
            assign: assignNormalized,
            _assign: assignPolyfill
          };
        }, {}], 122: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("./braintree-error");
          var sharedErrors = _dereq_("./errors");
          var VERSION = "3.102.0";
          function basicComponentVerification(options) {
            var client, authorization, name;
            if (!options) {
              return Promise.reject(
                new BraintreeError({
                  type: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.type,
                  code: sharedErrors.INVALID_USE_OF_INTERNAL_FUNCTION.code,
                  message: "Options must be passed to basicComponentVerification function."
                })
              );
            }
            name = options.name;
            client = options.client;
            authorization = options.authorization;
            if (!client && !authorization) {
              return Promise.reject(
                new BraintreeError({
                  type: sharedErrors.INSTANTIATION_OPTION_REQUIRED.type,
                  code: sharedErrors.INSTANTIATION_OPTION_REQUIRED.code,
                  // NEXT_MAJOR_VERSION in major version, we expose passing in authorization for all components
                  // instead of passing in a client instance. Leave this a silent feature for now.
                  message: "options.client is required when instantiating " + name + "."
                })
              );
            }
            if (!authorization && client.getVersion() !== VERSION) {
              return Promise.reject(
                new BraintreeError({
                  type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
                  code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
                  message: "Client (version " + client.getVersion() + ") and " + name + " (version " + VERSION + ") components must be from the same SDK version."
                })
              );
            }
            return Promise.resolve();
          }
          module3.exports = {
            verify: basicComponentVerification
          };
        }, { "./braintree-error": 124, "./errors": 135 }], 123: [function(_dereq_, module3, exports3) {
          "use strict";
          var once = _dereq_("./once");
          function call(fn, callback) {
            var isSync = fn.length === 0;
            if (isSync) {
              fn();
              callback(null);
            } else {
              fn(callback);
            }
          }
          module3.exports = function(functions, cb) {
            var i;
            var length = functions.length;
            var remaining = length;
            var callback = once(cb);
            if (length === 0) {
              callback(null);
              return;
            }
            function finish(err) {
              if (err) {
                callback(err);
                return;
              }
              remaining -= 1;
              if (remaining === 0) {
                callback(null);
              }
            }
            for (i = 0; i < length; i++) {
              call(functions[i], finish);
            }
          };
        }, { "./once": 156 }], 124: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("./enumerate");
          function BraintreeError(options) {
            if (!BraintreeError.types.hasOwnProperty(options.type)) {
              throw new Error(options.type + " is not a valid type.");
            }
            if (!options.code) {
              throw new Error("Error code required.");
            }
            if (!options.message) {
              throw new Error("Error message required.");
            }
            this.name = "BraintreeError";
            this.code = options.code;
            this.message = options.message;
            this.type = options.type;
            this.details = options.details;
          }
          BraintreeError.prototype = Object.create(Error.prototype);
          BraintreeError.prototype.constructor = BraintreeError;
          BraintreeError.types = enumerate([
            "CUSTOMER",
            "MERCHANT",
            "NETWORK",
            "INTERNAL",
            "UNKNOWN"
          ]);
          BraintreeError.findRootError = function(err) {
            if (err instanceof BraintreeError && err.details && err.details.originalError) {
              return BraintreeError.findRootError(err.details.originalError);
            }
            return err;
          };
          module3.exports = BraintreeError;
        }, { "./enumerate": 134 }], 125: [function(_dereq_, module3, exports3) {
          "use strict";
          function transformKey(key) {
            return key.replace(/([a-z\d])([A-Z])/g, "$1_$2").replace(/([A-Z]+)([A-Z][a-z\d]+)/g, "$1_$2").toLowerCase();
          }
          module3.exports = function(obj) {
            return Object.keys(obj).reduce(function(newObj, key) {
              var transformedKey = transformKey(key);
              newObj[transformedKey] = obj[key];
              return newObj;
            }, {});
          };
        }, {}], 126: [function(_dereq_, module3, exports3) {
          "use strict";
          var VERSION = "3.102.0";
          var PLATFORM = "web";
          var CLIENT_API_URLS = {
            production: "https://api.braintreegateway.com:443",
            sandbox: "https://api.sandbox.braintreegateway.com:443"
          };
          var ASSETS_URLS = {
            production: "https://assets.braintreegateway.com",
            sandbox: "https://assets.braintreegateway.com"
          };
          var GRAPHQL_URLS = {
            production: "https://payments.braintree-api.com/graphql",
            sandbox: "https://payments.sandbox.braintree-api.com/graphql"
          };
          module3.exports = {
            ANALYTICS_PREFIX: PLATFORM + ".",
            ANALYTICS_REQUEST_TIMEOUT_MS: 2e3,
            ASSETS_URLS,
            CLIENT_API_URLS,
            FRAUDNET_SOURCE: "BRAINTREE_SIGNIN",
            FRAUDNET_FNCLS: "fnparams-dede7cc5-15fd-4c75-a9f4-36c430ee3a99",
            FRAUDNET_URL: "https://c.paypal.com/da/r/fb.js",
            BUS_CONFIGURATION_REQUEST_EVENT: "BUS_CONFIGURATION_REQUEST",
            GRAPHQL_URLS,
            INTEGRATION_TIMEOUT_MS: 6e4,
            VERSION,
            INTEGRATION: "custom",
            SOURCE: "client",
            PLATFORM,
            BRAINTREE_LIBRARY_VERSION: "braintree/" + PLATFORM + "/" + VERSION
          };
        }, {}], 127: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("./braintree-error");
          var sharedErrors = _dereq_("./errors");
          module3.exports = function(instance, methodNames) {
            methodNames.forEach(function(methodName) {
              instance[methodName] = function() {
                throw new BraintreeError({
                  type: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.type,
                  code: sharedErrors.METHOD_CALLED_AFTER_TEARDOWN.code,
                  message: methodName + " cannot be called after teardown."
                });
              };
            });
          };
        }, { "./braintree-error": 124, "./errors": 135 }], 128: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("./braintree-error");
          function convertToBraintreeError(originalErr, btErrorObject) {
            if (originalErr instanceof BraintreeError) {
              return originalErr;
            }
            return new BraintreeError({
              type: btErrorObject.type,
              code: btErrorObject.code,
              message: btErrorObject.message,
              details: {
                originalError: originalErr
              }
            });
          }
          module3.exports = convertToBraintreeError;
        }, { "./braintree-error": 124 }], 129: [function(_dereq_, module3, exports3) {
          "use strict";
          var ASSETS_URLS = _dereq_("./constants").ASSETS_URLS;
          function createAssetsUrl(authorization) {
            return ASSETS_URLS.production;
          }
          module3.exports = {
            create: createAssetsUrl
          };
        }, { "./constants": 126 }], 130: [function(_dereq_, module3, exports3) {
          "use strict";
          var atob2 = _dereq_("../lib/vendor/polyfill").atob;
          var CLIENT_API_URLS = _dereq_("../lib/constants").CLIENT_API_URLS;
          function _isTokenizationKey(str) {
            return /^[a-zA-Z0-9]+_[a-zA-Z0-9]+_[a-zA-Z0-9_]+$/.test(str);
          }
          function _parseTokenizationKey(tokenizationKey) {
            var tokens = tokenizationKey.split("_");
            var environment = tokens[0];
            var merchantId = tokens.slice(2).join("_");
            return {
              merchantId,
              environment
            };
          }
          function createAuthorizationData(authorization) {
            var parsedClientToken, parsedTokenizationKey;
            var data = {
              attrs: {},
              configUrl: ""
            };
            if (_isTokenizationKey(authorization)) {
              parsedTokenizationKey = _parseTokenizationKey(authorization);
              data.environment = parsedTokenizationKey.environment;
              data.attrs.tokenizationKey = authorization;
              data.configUrl = CLIENT_API_URLS[parsedTokenizationKey.environment] + "/merchants/" + parsedTokenizationKey.merchantId + "/client_api/v1/configuration";
            } else {
              parsedClientToken = JSON.parse(atob2(authorization));
              data.environment = parsedClientToken.environment;
              data.attrs.authorizationFingerprint = parsedClientToken.authorizationFingerprint;
              data.configUrl = parsedClientToken.configUrl;
              data.graphQL = parsedClientToken.graphQL;
            }
            return data;
          }
          module3.exports = createAuthorizationData;
        }, { "../lib/constants": 126, "../lib/vendor/polyfill": 161 }], 131: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("./braintree-error");
          var assets = _dereq_("./assets");
          var sharedErrors = _dereq_("./errors");
          var VERSION = "3.102.0";
          function createDeferredClient(options) {
            var promise = Promise.resolve();
            if (options.client) {
              return Promise.resolve(options.client);
            }
            if (!(window.braintree && window.braintree.client)) {
              promise = assets.loadScript({
                src: options.assetsUrl + "/web/" + VERSION + "/js/client.min.js"
              }).catch(function(err) {
                return Promise.reject(
                  new BraintreeError({
                    type: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.type,
                    code: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.code,
                    message: sharedErrors.CLIENT_SCRIPT_FAILED_TO_LOAD.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              });
            }
            return promise.then(function() {
              if (window.braintree.client.VERSION !== VERSION) {
                return Promise.reject(
                  new BraintreeError({
                    type: sharedErrors.INCOMPATIBLE_VERSIONS.type,
                    code: sharedErrors.INCOMPATIBLE_VERSIONS.code,
                    message: "Client (version " + window.braintree.client.VERSION + ") and " + options.name + " (version " + VERSION + ") components must be from the same SDK version."
                  })
                );
              }
              return window.braintree.client.create({
                authorization: options.authorization,
                debug: options.debug
              });
            });
          }
          module3.exports = {
            create: createDeferredClient
          };
        }, { "./assets": 120, "./braintree-error": 124, "./errors": 135 }], 132: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(fn) {
            return function() {
              var args = arguments;
              setTimeout(function() {
                fn.apply(null, args);
              }, 1);
            };
          };
        }, {}], 133: [function(_dereq_, module3, exports3) {
          "use strict";
          var batchExecuteFunctions = _dereq_("./batch-execute-functions");
          function Destructor() {
            this._teardownRegistry = [];
            this._isTearingDown = false;
          }
          Destructor.prototype.registerFunctionForTeardown = function(fn) {
            if (typeof fn === "function") {
              this._teardownRegistry.push(fn);
            }
          };
          Destructor.prototype.teardown = function(callback) {
            if (this._isTearingDown) {
              callback(new Error("Destructor is already tearing down"));
              return;
            }
            this._isTearingDown = true;
            batchExecuteFunctions(
              this._teardownRegistry,
              function(err) {
                this._teardownRegistry = [];
                this._isTearingDown = false;
                if (typeof callback === "function") {
                  callback(err);
                }
              }.bind(this)
            );
          };
          module3.exports = Destructor;
        }, { "./batch-execute-functions": 123 }], 134: [function(_dereq_, module3, exports3) {
          "use strict";
          function enumerate(values, prefix) {
            prefix = prefix == null ? "" : prefix;
            return values.reduce(function(enumeration, value) {
              enumeration[value] = prefix + value;
              return enumeration;
            }, {});
          }
          module3.exports = enumerate;
        }, {}], 135: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("./braintree-error");
          module3.exports = {
            INVALID_USE_OF_INTERNAL_FUNCTION: {
              type: BraintreeError.types.INTERNAL,
              code: "INVALID_USE_OF_INTERNAL_FUNCTION"
            },
            INSTANTIATION_OPTION_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "INSTANTIATION_OPTION_REQUIRED"
            },
            INCOMPATIBLE_VERSIONS: {
              type: BraintreeError.types.MERCHANT,
              code: "INCOMPATIBLE_VERSIONS"
            },
            CLIENT_SCRIPT_FAILED_TO_LOAD: {
              type: BraintreeError.types.NETWORK,
              code: "CLIENT_SCRIPT_FAILED_TO_LOAD",
              message: "Braintree client script could not be loaded."
            },
            METHOD_CALLED_AFTER_TEARDOWN: {
              type: BraintreeError.types.MERCHANT,
              code: "METHOD_CALLED_AFTER_TEARDOWN"
            }
          };
        }, { "./braintree-error": 124 }], 136: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function findRootNode(element) {
            while (element.parentNode) {
              element = element.parentNode;
            }
            return element;
          };
        }, {}], 137: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(array, key, value) {
            var i;
            for (i = 0; i < array.length; i++) {
              if (array[i].hasOwnProperty(key) && array[i][key] === value) {
                return array[i];
              }
            }
            return null;
          };
        }, {}], 138: [function(_dereq_, module3, exports3) {
          "use strict";
          var Popup = _dereq_("./strategies/popup");
          var PopupBridge = _dereq_("./strategies/popup-bridge");
          var Modal = _dereq_("./strategies/modal");
          var Bus = _dereq_("framebus");
          var events = _dereq_("../shared/events");
          var errors = _dereq_("../shared/errors");
          var constants = _dereq_("../shared/constants");
          var uuid = _dereq_("@braintree/uuid");
          var iFramer = _dereq_("@braintree/iframer");
          var BraintreeError = _dereq_("../../braintree-error");
          var browserDetection = _dereq_("../shared/browser-detection");
          var assign = _dereq_("./../../assign").assign;
          var BUS_CONFIGURATION_REQUEST_EVENT = _dereq_("../../constants").BUS_CONFIGURATION_REQUEST_EVENT;
          var REQUIRED_CONFIG_KEYS = ["name", "dispatchFrameUrl", "openFrameUrl"];
          function noop() {
          }
          function _validateFrameConfiguration(options) {
            if (!options) {
              throw new Error("Valid configuration is required");
            }
            REQUIRED_CONFIG_KEYS.forEach(function(key) {
              if (!options.hasOwnProperty(key)) {
                throw new Error("A valid frame " + key + " must be provided");
              }
            });
            if (!/^[\w_]+$/.test(options.name)) {
              throw new Error("A valid frame name must be provided");
            }
          }
          function FrameService(options) {
            _validateFrameConfiguration(options);
            this._serviceId = uuid().replace(/-/g, "");
            this._options = {
              name: options.name + "_" + this._serviceId,
              dispatchFrameUrl: options.dispatchFrameUrl,
              openFrameUrl: options.openFrameUrl,
              height: options.height,
              width: options.width,
              top: options.top,
              left: options.left
            };
            this.state = options.state || {};
            this._bus = new Bus({ channel: this._serviceId });
            this._setBusEvents();
          }
          FrameService.prototype.initialize = function(callback) {
            var dispatchFrameReadyHandler = function() {
              callback();
              this._bus.off(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
            }.bind(this);
            this._bus.on(events.DISPATCH_FRAME_READY, dispatchFrameReadyHandler);
            this._writeDispatchFrame();
          };
          FrameService.prototype._writeDispatchFrame = function() {
            var frameName = constants.DISPATCH_FRAME_NAME + "_" + this._serviceId;
            var frameSrc = this._options.dispatchFrameUrl;
            this._dispatchFrame = iFramer({
              "aria-hidden": true,
              name: frameName,
              title: frameName,
              src: frameSrc,
              class: constants.DISPATCH_FRAME_CLASS,
              height: 0,
              width: 0,
              style: {
                position: "absolute",
                left: "-9999px"
              }
            });
            document.body.appendChild(this._dispatchFrame);
          };
          FrameService.prototype._setBusEvents = function() {
            this._bus.on(
              events.DISPATCH_FRAME_REPORT,
              function(res, reply) {
                if (this._onCompleteCallback) {
                  this._onCompleteCallback.call(null, res.err, res.payload);
                }
                this._frame.close();
                this._onCompleteCallback = null;
                if (reply) {
                  reply();
                }
              }.bind(this)
            );
            this._bus.on(
              BUS_CONFIGURATION_REQUEST_EVENT,
              function(reply) {
                reply(this.state);
              }.bind(this)
            );
          };
          FrameService.prototype.open = function(options, callback) {
            options = options || {};
            this._frame = this._getFrameForEnvironment(options);
            this._frame.initialize(callback);
            if (this._frame instanceof PopupBridge) {
              return;
            }
            assign(this.state, options.state);
            this._onCompleteCallback = callback;
            this._frame.open();
            if (this.isFrameClosed()) {
              this._cleanupFrame();
              if (callback) {
                callback(new BraintreeError(errors.FRAME_SERVICE_FRAME_OPEN_FAILED));
              }
              return;
            }
            this._pollForPopupClose();
          };
          FrameService.prototype.redirect = function(url) {
            if (this._frame && !this.isFrameClosed()) {
              this._frame.redirect(url);
            }
          };
          FrameService.prototype.close = function() {
            if (!this.isFrameClosed()) {
              this._frame.close();
            }
          };
          FrameService.prototype.focus = function() {
            if (!this.isFrameClosed()) {
              this._frame.focus();
            }
          };
          FrameService.prototype.createHandler = function(options) {
            options = options || {};
            return {
              close: function() {
                if (options.beforeClose) {
                  options.beforeClose();
                }
                this.close();
              }.bind(this),
              focus: function() {
                if (options.beforeFocus) {
                  options.beforeFocus();
                }
                this.focus();
              }.bind(this)
            };
          };
          FrameService.prototype.createNoopHandler = function() {
            return {
              close: noop,
              focus: noop
            };
          };
          FrameService.prototype.teardown = function() {
            this.close();
            this._dispatchFrame.parentNode.removeChild(this._dispatchFrame);
            this._dispatchFrame = null;
            this._cleanupFrame();
          };
          FrameService.prototype.isFrameClosed = function() {
            return this._frame == null || this._frame.isClosed();
          };
          FrameService.prototype._cleanupFrame = function() {
            this._frame = null;
            clearInterval(this._popupInterval);
            this._popupInterval = null;
          };
          FrameService.prototype._pollForPopupClose = function() {
            this._popupInterval = setInterval(
              function() {
                if (this.isFrameClosed()) {
                  this._cleanupFrame();
                  if (this._onCompleteCallback) {
                    this._onCompleteCallback(
                      new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED)
                    );
                  }
                }
              }.bind(this),
              constants.POPUP_POLL_INTERVAL
            );
            return this._popupInterval;
          };
          FrameService.prototype._getFrameForEnvironment = function(options) {
            var usePopup = browserDetection.supportsPopups();
            var popupBridgeExists = Boolean(window.popupBridge);
            var initOptions = assign({}, this._options, options);
            if (popupBridgeExists) {
              return new PopupBridge(initOptions);
            } else if (usePopup) {
              return new Popup(initOptions);
            }
            return new Modal(initOptions);
          };
          module3.exports = FrameService;
        }, { "../../braintree-error": 124, "../../constants": 126, "../shared/browser-detection": 145, "../shared/constants": 146, "../shared/errors": 147, "../shared/events": 148, "./../../assign": 121, "./strategies/modal": 140, "./strategies/popup": 143, "./strategies/popup-bridge": 141, "@braintree/iframer": 35, "@braintree/uuid": 39, "framebus": 52 }], 139: [function(_dereq_, module3, exports3) {
          "use strict";
          var FrameService = _dereq_("./frame-service");
          module3.exports = {
            create: function createFrameService(options, callback) {
              var frameService = new FrameService(options);
              frameService.initialize(function() {
                callback(frameService);
              });
            }
          };
        }, { "./frame-service": 138 }], 140: [function(_dereq_, module3, exports3) {
          "use strict";
          var iFramer = _dereq_("@braintree/iframer");
          var assign = _dereq_("../../../assign").assign;
          var browserDetection = _dereq_("../../shared/browser-detection");
          var ELEMENT_STYLES = {
            position: "fixed",
            top: 0,
            left: 0,
            bottom: 0,
            padding: 0,
            margin: 0,
            border: 0,
            outline: "none",
            zIndex: 20001,
            background: "#FFFFFF"
          };
          function noop() {
          }
          function Modal(options) {
            this._closed = null;
            this._frame = null;
            this._options = options || {};
            this._container = this._options.container || document.body;
          }
          Modal.prototype.initialize = noop;
          Modal.prototype.open = function() {
            var iframerConfig = {
              src: this._options.openFrameUrl,
              name: this._options.name,
              scrolling: "yes",
              height: "100%",
              width: "100%",
              style: assign({}, ELEMENT_STYLES),
              title: "Lightbox Frame"
            };
            if (browserDetection.isIos()) {
              if (browserDetection.isIosWKWebview()) {
                this._lockScrolling();
                iframerConfig.style = {};
              }
              this._el = document.createElement("div");
              assign(this._el.style, ELEMENT_STYLES, {
                height: "100%",
                width: "100%",
                overflow: "auto",
                "-webkit-overflow-scrolling": "touch"
              });
              this._frame = iFramer(iframerConfig);
              this._el.appendChild(this._frame);
            } else {
              this._el = this._frame = iFramer(iframerConfig);
            }
            this._closed = false;
            this._container.appendChild(this._el);
          };
          Modal.prototype.focus = noop;
          Modal.prototype.close = function() {
            this._container.removeChild(this._el);
            this._frame = null;
            this._closed = true;
            if (browserDetection.isIosWKWebview()) {
              this._unlockScrolling();
            }
          };
          Modal.prototype.isClosed = function() {
            return Boolean(this._closed);
          };
          Modal.prototype.redirect = function(redirectUrl) {
            this._frame.src = redirectUrl;
          };
          Modal.prototype._unlockScrolling = function() {
            document.body.style.overflow = this._savedBodyProperties.overflowStyle;
            document.body.style.position = this._savedBodyProperties.positionStyle;
            window.scrollTo(
              this._savedBodyProperties.left,
              this._savedBodyProperties.top
            );
            delete this._savedBodyProperties;
          };
          Modal.prototype._lockScrolling = function() {
            var doc = document.documentElement;
            this._savedBodyProperties = {
              left: (window.pageXOffset || doc.scrollLeft) - (doc.clientLeft || 0),
              top: (window.pageYOffset || doc.scrollTop) - (doc.clientTop || 0),
              overflowStyle: document.body.style.overflow,
              positionStyle: document.body.style.position
            };
            document.body.style.overflow = "hidden";
            document.body.style.position = "fixed";
            window.scrollTo(0, 0);
          };
          module3.exports = Modal;
        }, { "../../../assign": 121, "../../shared/browser-detection": 145, "@braintree/iframer": 35 }], 141: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../../braintree-error");
          var errors = _dereq_("../../shared/errors");
          function noop() {
          }
          function PopupBridge(options) {
            this._closed = null;
            this._options = options;
          }
          PopupBridge.prototype.initialize = function(callback) {
            var self2 = this;
            window.popupBridge.onComplete = function(err, payload2) {
              var popupDismissed = !payload2 && !err;
              self2._closed = true;
              if (err || popupDismissed) {
                callback(new BraintreeError(errors.FRAME_SERVICE_FRAME_CLOSED));
                return;
              }
              callback(null, payload2);
            };
          };
          PopupBridge.prototype.open = function(options) {
            var url;
            options = options || {};
            url = options.openFrameUrl || this._options.openFrameUrl;
            this._closed = false;
            window.popupBridge.open(url);
          };
          PopupBridge.prototype.focus = noop;
          PopupBridge.prototype.close = noop;
          PopupBridge.prototype.isClosed = function() {
            return Boolean(this._closed);
          };
          PopupBridge.prototype.redirect = function(redirectUrl) {
            this.open({ openFrameUrl: redirectUrl });
          };
          module3.exports = PopupBridge;
        }, { "../../../braintree-error": 124, "../../shared/errors": 147 }], 142: [function(_dereq_, module3, exports3) {
          "use strict";
          var constants = _dereq_("../../../shared/constants");
          var position = _dereq_("./position");
          function calculatePosition(type, userDefinedPosition, size) {
            if (typeof userDefinedPosition !== "undefined") {
              return userDefinedPosition;
            }
            return position[type](size);
          }
          module3.exports = function composePopupOptions(options) {
            var height = options.height || constants.DEFAULT_POPUP_HEIGHT;
            var width = options.width || constants.DEFAULT_POPUP_WIDTH;
            var top = calculatePosition("top", options.top, height);
            var left = calculatePosition("left", options.left, width);
            return [
              constants.POPUP_BASE_OPTIONS,
              "height=" + height,
              "width=" + width,
              "top=" + top,
              "left=" + left
            ].join(",");
          };
        }, { "../../../shared/constants": 146, "./position": 144 }], 143: [function(_dereq_, module3, exports3) {
          "use strict";
          var composeOptions = _dereq_("./compose-options");
          function noop() {
          }
          function Popup(options) {
            this._frame = null;
            this._options = options || {};
          }
          Popup.prototype.initialize = noop;
          Popup.prototype.open = function() {
            this._frame = window.open(
              this._options.openFrameUrl,
              this._options.name,
              composeOptions(this._options)
            );
          };
          Popup.prototype.focus = function() {
            this._frame.focus();
          };
          Popup.prototype.close = function() {
            if (this._frame.closed) {
              return;
            }
            this._frame.close();
          };
          Popup.prototype.isClosed = function() {
            return !this._frame || Boolean(this._frame.closed);
          };
          Popup.prototype.redirect = function(redirectUrl) {
            this._frame.location.href = redirectUrl;
          };
          module3.exports = Popup;
        }, { "./compose-options": 142 }], 144: [function(_dereq_, module3, exports3) {
          "use strict";
          function top(height) {
            var windowHeight = window.outerHeight || document.documentElement.clientHeight;
            var windowTop = window.screenY == null ? window.screenTop : window.screenY;
            return center(windowHeight, height, windowTop);
          }
          function left(width) {
            var windowWidth = window.outerWidth || document.documentElement.clientWidth;
            var windowLeft = window.screenX == null ? window.screenLeft : window.screenX;
            return center(windowWidth, width, windowLeft);
          }
          function center(windowMetric, popupMetric, offset) {
            return (windowMetric - popupMetric) / 2 + offset;
          }
          module3.exports = {
            top,
            left,
            center
          };
        }, {}], 145: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            isIos: _dereq_("@braintree/browser-detection/is-ios"),
            isIosWKWebview: _dereq_("@braintree/browser-detection/is-ios-wkwebview"),
            supportsPopups: _dereq_("@braintree/browser-detection/supports-popups")
          };
        }, { "@braintree/browser-detection/is-ios": 30, "@braintree/browser-detection/is-ios-wkwebview": 29, "@braintree/browser-detection/supports-popups": 32 }], 146: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            DISPATCH_FRAME_NAME: "dispatch",
            DISPATCH_FRAME_CLASS: "braintree-dispatch-frame",
            POPUP_BASE_OPTIONS: "resizable,scrollbars",
            DEFAULT_POPUP_WIDTH: 450,
            DEFAULT_POPUP_HEIGHT: 535,
            POPUP_POLL_INTERVAL: 100,
            POPUP_CLOSE_TIMEOUT: 100
          };
        }, {}], 147: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../braintree-error");
          module3.exports = {
            FRAME_SERVICE_FRAME_CLOSED: {
              type: BraintreeError.types.INTERNAL,
              code: "FRAME_SERVICE_FRAME_CLOSED",
              message: "Frame closed before tokenization could occur."
            },
            FRAME_SERVICE_FRAME_OPEN_FAILED: {
              type: BraintreeError.types.INTERNAL,
              code: "FRAME_SERVICE_FRAME_OPEN_FAILED",
              message: "Frame failed to open."
            }
          };
        }, { "../../braintree-error": 124 }], 148: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("../../enumerate");
          module3.exports = enumerate(
            ["DISPATCH_FRAME_READY", "DISPATCH_FRAME_REPORT"],
            "frameService:"
          );
        }, { "../../enumerate": 134 }], 149: [function(_dereq_, module3, exports3) {
          "use strict";
          var VERSION = "3.102.0";
          var assign = _dereq_("./assign").assign;
          function generateTokenizationParameters(configuration, overrides) {
            var metadata = configuration.analyticsMetadata;
            var basicTokenizationParameters = {
              gateway: "braintree",
              "braintree:merchantId": configuration.gatewayConfiguration.merchantId,
              "braintree:apiVersion": "v1",
              "braintree:sdkVersion": VERSION,
              "braintree:metadata": JSON.stringify({
                source: metadata.source,
                integration: metadata.integration,
                sessionId: metadata.sessionId,
                version: VERSION,
                platform: metadata.platform
              })
            };
            return assign({}, basicTokenizationParameters, overrides);
          }
          module3.exports = function(configuration, googlePayVersion, googleMerchantId) {
            var data, paypalPaymentMethod;
            var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
            var environment = configuration.gatewayConfiguration.environment === "production" ? "PRODUCTION" : "TEST";
            if (googlePayVersion === 2) {
              data = {
                apiVersion: 2,
                apiVersionMinor: 0,
                environment,
                allowedPaymentMethods: [
                  {
                    type: "CARD",
                    parameters: {
                      allowedAuthMethods: ["PAN_ONLY", "CRYPTOGRAM_3DS"],
                      allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(
                        function(card) {
                          return card.toUpperCase();
                        }
                      )
                    },
                    tokenizationSpecification: {
                      type: "PAYMENT_GATEWAY",
                      parameters: generateTokenizationParameters(configuration, {
                        "braintree:authorizationFingerprint": androidPayConfiguration.googleAuthorizationFingerprint
                      })
                    }
                  }
                ]
              };
              if (googleMerchantId) {
                data.merchantInfo = {
                  merchantId: googleMerchantId
                };
              }
              if (androidPayConfiguration.paypalClientId) {
                paypalPaymentMethod = {
                  type: "PAYPAL",
                  parameters: {
                    /* eslint-disable camelcase */
                    purchase_context: {
                      purchase_units: [
                        {
                          payee: {
                            client_id: androidPayConfiguration.paypalClientId
                          },
                          recurring_payment: true
                        }
                      ]
                    }
                    /* eslint-enable camelcase */
                  },
                  tokenizationSpecification: {
                    type: "PAYMENT_GATEWAY",
                    parameters: generateTokenizationParameters(configuration, {
                      "braintree:paypalClientId": androidPayConfiguration.paypalClientId
                    })
                  }
                };
                data.allowedPaymentMethods.push(paypalPaymentMethod);
              }
            } else {
              data = {
                environment,
                allowedPaymentMethods: ["CARD", "TOKENIZED_CARD"],
                paymentMethodTokenizationParameters: {
                  tokenizationType: "PAYMENT_GATEWAY",
                  parameters: generateTokenizationParameters(configuration, {
                    "braintree:authorizationFingerprint": androidPayConfiguration.googleAuthorizationFingerprint
                  })
                },
                cardRequirements: {
                  allowedCardNetworks: androidPayConfiguration.supportedNetworks.map(
                    function(card) {
                      return card.toUpperCase();
                    }
                  )
                }
              };
              if (configuration.authorizationType === "TOKENIZATION_KEY") {
                data.paymentMethodTokenizationParameters.parameters["braintree:clientKey"] = configuration.authorization;
              }
              if (googleMerchantId) {
                data.merchantId = googleMerchantId;
              }
              if (googlePayVersion) {
                data.apiVersion = googlePayVersion;
              }
            }
            return data;
          };
        }, { "./assign": 121 }], 150: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function inIframe(win) {
            win = win || window;
            try {
              return win.self !== win.top;
            } catch (e) {
              return true;
            }
          };
        }, {}], 151: [function(_dereq_, module3, exports3) {
          "use strict";
          function convertDateStringToDate(dateString) {
            var splitDate = dateString.split("-");
            return new Date(splitDate[0], splitDate[1], splitDate[2]);
          }
          function isDateStringBeforeOrOn(firstDate, secondDate) {
            return convertDateStringToDate(firstDate) <= convertDateStringToDate(secondDate);
          }
          module3.exports = isDateStringBeforeOrOn;
        }, {}], 152: [function(_dereq_, module3, exports3) {
          "use strict";
          function isHTTPS(protocol) {
            protocol = protocol || window.location.protocol;
            return protocol === "https:";
          }
          module3.exports = {
            isHTTPS
          };
        }, {}], 153: [function(_dereq_, module3, exports3) {
          "use strict";
          var parser;
          var legalHosts = {
            "paypal.com": 1,
            "braintreepayments.com": 1,
            "braintreegateway.com": 1,
            "braintree-api.com": 1
          };
          function stripSubdomains(domain) {
            return domain.split(".").slice(-2).join(".");
          }
          function isVerifiedDomain(url) {
            var mainDomain;
            url = url.toLowerCase();
            if (!/^https:/.test(url)) {
              return false;
            }
            parser = parser || document.createElement("a");
            parser.href = url;
            mainDomain = stripSubdomains(parser.hostname);
            return legalHosts.hasOwnProperty(mainDomain);
          }
          module3.exports = isVerifiedDomain;
        }, {}], 154: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(value) {
            return JSON.parse(JSON.stringify(value));
          };
        }, {}], 155: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(obj) {
            return Object.keys(obj).filter(function(key) {
              return typeof obj[key] === "function";
            });
          };
        }, {}], 156: [function(_dereq_, module3, exports3) {
          "use strict";
          function once(fn) {
            var called = false;
            return function() {
              if (!called) {
                called = true;
                fn.apply(null, arguments);
              }
            };
          }
          module3.exports = once;
        }, {}], 157: [function(_dereq_, module3, exports3) {
          "use strict";
          function _notEmpty(obj) {
            var key;
            for (key in obj) {
              if (obj.hasOwnProperty(key)) {
                return true;
              }
            }
            return false;
          }
          function _isArray(value) {
            return value && typeof value === "object" && typeof value.length === "number" && Object.prototype.toString.call(value) === "[object Array]" || false;
          }
          function hasQueryParams(url) {
            url = url || window.location.href;
            return /\?/.test(url);
          }
          function parse(url) {
            var query, params;
            url = url || window.location.href;
            if (!hasQueryParams(url)) {
              return {};
            }
            query = url.split("?")[1] || "";
            query = query.replace(/#.*$/, "").split("&");
            params = query.reduce(function(toReturn, keyValue) {
              var parts = keyValue.split("=");
              var key = decodeURIComponent(parts[0]);
              var value = decodeURIComponent(parts[1]);
              toReturn[key] = value;
              return toReturn;
            }, {});
            return params;
          }
          function stringify(params, namespace) {
            var k, v, p;
            var query = [];
            for (p in params) {
              if (!params.hasOwnProperty(p)) {
                continue;
              }
              v = params[p];
              if (namespace) {
                if (_isArray(params)) {
                  k = namespace + "[]";
                } else {
                  k = namespace + "[" + p + "]";
                }
              } else {
                k = p;
              }
              if (typeof v === "object") {
                query.push(stringify(v, k));
              } else {
                query.push(encodeURIComponent(k) + "=" + encodeURIComponent(v));
              }
            }
            return query.join("&");
          }
          function queryify(url, params) {
            url = url || "";
            if (params != null && typeof params === "object" && _notEmpty(params)) {
              url += url.indexOf("?") === -1 ? "?" : "";
              url += url.indexOf("=") !== -1 ? "&" : "";
              url += stringify(params);
            }
            return url;
          }
          module3.exports = {
            parse,
            stringify,
            queryify,
            hasQueryParams
          };
        }, {}], 158: [function(_dereq_, module3, exports3) {
          "use strict";
          var uuid = _dereq_("@braintree/uuid");
          var findRootNode = _dereq_("./find-root-node");
          function isShadowElement(element) {
            element = findRootNode(element);
            return element.toString() === "[object ShadowRoot]";
          }
          function getShadowHost(element) {
            element = findRootNode(element);
            if (!isShadowElement(element)) {
              return null;
            }
            return element.host;
          }
          function transformToSlot(element, styles) {
            var styleNode = findRootNode(element).querySelector("style");
            var shadowHost = getShadowHost(element);
            var slotName = "shadow-slot-" + uuid();
            var slot = document.createElement("slot");
            var slotProvider = document.createElement("div");
            slot.setAttribute("name", slotName);
            element.appendChild(slot);
            slotProvider.setAttribute("slot", slotName);
            shadowHost.appendChild(slotProvider);
            if (styles) {
              if (!styleNode) {
                styleNode = document.createElement("style");
                element.appendChild(styleNode);
              }
              styleNode.sheet.insertRule(
                '::slotted([slot="' + slotName + '"]) { ' + styles + " }"
              );
            }
            if (isShadowElement(shadowHost)) {
              return transformToSlot(slotProvider, styles);
            }
            return slotProvider;
          }
          module3.exports = {
            isShadowElement,
            getShadowHost,
            transformToSlot
          };
        }, { "./find-root-node": 136, "@braintree/uuid": 39 }], 159: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = function(snakeString) {
            if (snakeString.indexOf("_") === -1) {
              return snakeString;
            }
            return snakeString.toLowerCase().replace(/(\_\w)/g, function(match) {
              return match[1].toUpperCase();
            });
          };
        }, {}], 160: [function(_dereq_, module3, exports3) {
          "use strict";
          function useMin(isDebug) {
            return isDebug ? "" : ".min";
          }
          module3.exports = useMin;
        }, {}], 161: [function(_dereq_, module3, exports3) {
          "use strict";
          var atobNormalized = typeof atob === "function" ? atob : atobPolyfill;
          function atobPolyfill(base64String) {
            var a, b, c, b1, b2, b3, b4, i;
            var base64Matcher = new RegExp(
              "^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{4})([=]{1,2})?$"
            );
            var characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
            var result = "";
            if (!base64Matcher.test(base64String)) {
              throw new Error("Non base64 encoded input passed to window.atob polyfill");
            }
            i = 0;
            do {
              b1 = characters.indexOf(base64String.charAt(i++));
              b2 = characters.indexOf(base64String.charAt(i++));
              b3 = characters.indexOf(base64String.charAt(i++));
              b4 = characters.indexOf(base64String.charAt(i++));
              a = (b1 & 63) << 2 | b2 >> 4 & 3;
              b = (b2 & 15) << 4 | b3 >> 2 & 15;
              c = (b3 & 3) << 6 | b4 & 63;
              result += String.fromCharCode(a) + (b ? String.fromCharCode(b) : "") + (c ? String.fromCharCode(c) : "");
            } while (i < base64String.length);
            return result;
          }
          module3.exports = {
            atob: function(base64String) {
              return atobNormalized.call(window, base64String);
            },
            _atob: atobPolyfill
          };
        }, {}], 162: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            REQUIRED_OPTIONS_FOR_START_PAYMENT: [
              "givenName",
              "surname",
              "currencyCode",
              "onPaymentStart",
              "paymentType",
              "amount",
              "fallback"
            ],
            REQUIRED_OPTIONS_FOR_PAY_UPON_INVOICE_PAYMENT_TYPE: [
              "givenName",
              "surname",
              "currencyCode",
              "onPaymentStart",
              "paymentType",
              "amount",
              "address",
              "billingAddress",
              "birthDate",
              "email",
              "locale",
              "customerServiceInstructions",
              "correlationId",
              "phone",
              "phoneCountryCode",
              "lineItems"
            ],
            REQUIRED_OPTIONS_FOR_ADDRESS: [
              "streetAddress",
              "locality",
              "postalCode",
              "countryCode"
            ],
            REQUIRED_OPTIONS_FOR_LINE_ITEMS: [
              "category",
              "name",
              "quantity",
              "unitAmount",
              "unitTaxAmount"
            ],
            REQUIRED_OPTIONS_FOR_BLIK_SEAMLESS_PAYMENT_TYPE: [
              "givenName",
              "surname",
              "currencyCode",
              "onPaymentStart",
              "paymentType",
              "amount"
            ],
            REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_LEVEL_0: ["authCode"],
            REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_FIRST: [
              "authCode",
              "consumerReference",
              "aliasLabel"
            ],
            REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_SUBSEQUENT: [
              "consumerReference",
              "aliasKey"
            ]
          };
        }, {}], 163: [function(_dereq_, module3, exports3) {
          "use strict";
          var frameService = _dereq_("../../lib/frame-service/external");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var useMin = _dereq_("../../lib/use-min");
          var VERSION = "3.102.0";
          var INTEGRATION_TIMEOUT_MS = _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
          var analytics = _dereq_("../../lib/analytics");
          var methods = _dereq_("../../lib/methods");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var convertToBraintreeError = _dereq_("../../lib/convert-to-braintree-error");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var querystring = _dereq_("../../lib/querystring");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var constants = _dereq_("./constants");
          var errors = _dereq_("../shared/errors");
          var DEFAULT_WINDOW_WIDTH = 1282;
          var DEFAULT_WINDOW_HEIGHT = 720;
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function LocalPayment(options) {
            this._client = options.client;
            this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.assetsUrl + "/web/" + VERSION;
            this._isDebug = options.client.getConfiguration().isDebug;
            this._loadingFrameUrl = this._assetsUrl + "/html/local-payment-landing-frame" + useMin(this._isDebug) + ".html";
            this._authorizationInProgress = false;
            this._paymentType = "unknown";
            this._merchantAccountId = options.merchantAccountId;
          }
          LocalPayment.prototype._initialize = function() {
            var self2 = this;
            var client = this._client;
            var failureTimeout = setTimeout(function() {
              analytics.sendEvent(client, "local-payment.load.timed-out");
            }, INTEGRATION_TIMEOUT_MS);
            return new Promise(function(resolve) {
              frameService.create(
                {
                  name: "localpaymentlandingpage",
                  dispatchFrameUrl: self2._assetsUrl + "/html/dispatch-frame" + useMin(self2._isDebug) + ".html",
                  openFrameUrl: self2._loadingFrameUrl
                },
                function(service) {
                  self2._frameService = service;
                  clearTimeout(failureTimeout);
                  analytics.sendEvent(client, "local-payment.load.succeeded");
                  resolve(self2);
                }
              );
            });
          };
          LocalPayment.prototype.startPayment = function(options) {
            var missingOption, missingError, address, fallback, params, promise, billingAddress, windowOptions, onPaymentStartPromise;
            var self2 = this;
            var serviceId = this._frameService._serviceId;
            missingOption = hasMissingOption(options);
            if (missingOption) {
              missingError = new BraintreeError(
                errors.LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION
              );
              if (typeof missingOption === "string") {
                missingError.details = "Missing required '" + missingOption + "' option.";
              }
              return Promise.reject(missingError);
            }
            windowOptions = options.windowOptions || {};
            address = options.address || {};
            fallback = options.fallback || {};
            billingAddress = options.billingAddress || {};
            params = {
              amount: options.amount,
              bic: options.bic,
              billingAddress: {
                line1: billingAddress.streetAddress,
                line2: billingAddress.extendedAddress,
                city: billingAddress.locality,
                state: billingAddress.region,
                postalCode: billingAddress.postalCode,
                countryCode: billingAddress.countryCode
              },
              birthDate: options.birthDate,
              blikOptions: options.blikOptions,
              cancelUrl: querystring.queryify(
                self2._assetsUrl + "/html/local-payment-redirect-frame" + useMin(self2._isDebug) + ".html",
                {
                  channel: serviceId,
                  r: fallback.cancelUrl || fallback.url,
                  t: fallback.cancelButtonText || fallback.buttonText,
                  c: 1
                  // indicating we went through the cancel flow
                }
              ),
              city: address.locality,
              correlationId: options.correlationId,
              countryCode: address.countryCode,
              currencyIsoCode: options.currencyCode,
              discountAmount: options.discountAmount,
              experienceProfile: {
                brandName: options.displayName,
                customerServiceInstructions: options.customerServiceInstructions,
                locale: options.locale,
                noShipping: !options.shippingAddressRequired
              },
              firstName: options.givenName,
              fundingSource: options.paymentType,
              intent: "sale",
              lastName: options.surname,
              line1: address.streetAddress,
              line2: address.extendedAddress,
              lineItems: options.lineItems,
              merchantAccountId: self2._merchantAccountId,
              merchantOrPartnerCustomerId: options.customerId,
              payerEmail: options.email,
              paymentTypeCountryCode: options.paymentTypeCountryCode,
              phone: options.phone,
              phoneCountryCode: options.phoneCountryCode,
              postalCode: address.postalCode,
              recurrent: options.recurrent,
              returnUrl: querystring.queryify(
                self2._assetsUrl + "/html/local-payment-redirect-frame" + useMin(self2._isDebug) + ".html",
                {
                  channel: serviceId,
                  r: fallback.url,
                  t: fallback.buttonText
                }
              ),
              shippingAmount: options.shippingAmount,
              state: address.region
            };
            self2._paymentType = options.paymentType.toLowerCase();
            if (self2._authorizationInProgress) {
              analytics.sendEvent(
                self2._client,
                self2._paymentType + ".local-payment.start-payment.error.already-opened"
              );
              return Promise.reject(
                new BraintreeError(errors.LOCAL_PAYMENT_ALREADY_IN_PROGRESS)
              );
            }
            self2._authorizationInProgress = true;
            promise = new ExtendedPromise();
            if (!isDeferredPaymentTypeOptions(options)) {
              self2._startPaymentCallback = self2._createStartPaymentCallback(
                function(val) {
                  promise.resolve(val);
                },
                function(err) {
                  promise.reject(err);
                }
              );
              self2._frameService.open(
                {
                  width: windowOptions.width || DEFAULT_WINDOW_WIDTH,
                  height: windowOptions.height || DEFAULT_WINDOW_HEIGHT
                },
                self2._startPaymentCallback
              );
            }
            self2._client.request({
              method: "post",
              endpoint: "local_payments/create",
              data: params
            }).then(function(response2) {
              var redirectUrl = response2.paymentResource.redirectUrl;
              analytics.sendEvent(
                self2._client,
                self2._paymentType + ".local-payment.start-payment.opened"
              );
              self2._startPaymentOptions = options;
              if (isDeferredPaymentTypeOptions(options)) {
                self2._authorizationInProgress = false;
                if (typeof redirectUrl === "string" && redirectUrl.length) {
                  promise.reject(
                    new BraintreeError(
                      errors.LOCAL_PAYMENT_START_PAYMENT_DEFERRED_PAYMENT_FAILED
                    )
                  );
                } else {
                  onPaymentStartPromise = options.onPaymentStart({
                    paymentId: response2.paymentResource.paymentToken
                  });
                  if (onPaymentStartPromise instanceof Promise) {
                    onPaymentStartPromise.then(function() {
                      promise.resolve();
                    });
                  } else {
                    promise.resolve();
                  }
                }
              } else {
                options.onPaymentStart(
                  { paymentId: response2.paymentResource.paymentToken },
                  function() {
                    self2._frameService.redirect(response2.paymentResource.redirectUrl);
                  }
                );
              }
            }).catch(function(err) {
              var status = err.details && err.details.httpStatus;
              self2._frameService.close();
              self2._authorizationInProgress = false;
              if (status === 422) {
                promise.reject(
                  new BraintreeError({
                    type: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.type,
                    code: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.code,
                    message: errors.LOCAL_PAYMENT_INVALID_PAYMENT_OPTION.message,
                    details: {
                      originalError: err
                    }
                  })
                );
                return;
              }
              promise.reject(
                convertToBraintreeError(err, {
                  type: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
                  code: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
                  message: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.message
                })
              );
            });
            return promise;
          };
          LocalPayment.prototype.tokenize = function(params) {
            var self2 = this;
            var client = this._client;
            params = params || querystring.parse();
            if (params.queryItems) {
              params = params.queryItems;
            }
            if (params.c || params.wasCanceled) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.LOCAL_PAYMENT_CANCELED.type,
                  code: errors.LOCAL_PAYMENT_CANCELED.code,
                  message: errors.LOCAL_PAYMENT_CANCELED.message,
                  details: {
                    originalError: {
                      errorcode: params.errorcode,
                      token: params.btLpToken
                    }
                  }
                })
              );
            } else if (params.errorcode) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.type,
                  code: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.code,
                  message: errors.LOCAL_PAYMENT_START_PAYMENT_FAILED.message,
                  details: {
                    originalError: {
                      errorcode: params.errorcode,
                      token: params.btLpToken
                    }
                  }
                })
              );
            }
            return client.request({
              endpoint: "payment_methods/paypal_accounts",
              method: "post",
              data: this._formatTokenizeData(params)
            }).then(function(response2) {
              var payload2 = self2._formatTokenizePayload(response2);
              if (window.popupBridge) {
                analytics.sendEvent(
                  client,
                  self2._paymentType + ".local-payment.tokenization.success-popupbridge"
                );
              } else {
                analytics.sendEvent(
                  client,
                  self2._paymentType + ".local-payment.tokenization.success"
                );
              }
              return payload2;
            }).catch(function(err) {
              analytics.sendEvent(
                client,
                self2._paymentType + ".local-payment.tokenization.failed"
              );
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.type,
                  code: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.code,
                  message: errors.LOCAL_PAYMENT_TOKENIZATION_FAILED.message
                })
              );
            });
          };
          LocalPayment.prototype.closeWindow = function() {
            if (this._authoriztionInProgress) {
              analytics.sendEvent(
                this._client,
                this._paymentType + ".local-payment.start-payment.closed.by-merchant"
              );
            }
            this._frameService.close();
          };
          LocalPayment.prototype.focusWindow = function() {
            this._frameService.focus();
          };
          LocalPayment.prototype._createStartPaymentCallback = function(resolve, reject) {
            var self2 = this;
            var client = this._client;
            return function(err, params) {
              self2._authorizationInProgress = false;
              if (err) {
                if (err.code === "FRAME_SERVICE_FRAME_CLOSED") {
                  if (params && params.errorcode === "processing_error") {
                    analytics.sendEvent(
                      client,
                      self2._paymentType + ".local-payment.failed-in-window"
                    );
                    reject(new BraintreeError(errors.LOCAL_PAYMENT_START_PAYMENT_FAILED));
                    return;
                  }
                  analytics.sendEvent(
                    client,
                    self2._paymentType + ".local-payment.tokenization.closed.by-user"
                  );
                  reject(new BraintreeError(errors.LOCAL_PAYMENT_WINDOW_CLOSED));
                } else if (err.code && err.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1) {
                  reject(
                    new BraintreeError({
                      code: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.code,
                      type: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.type,
                      message: errors.LOCAL_PAYMENT_WINDOW_OPEN_FAILED.message,
                      details: {
                        originalError: err
                      }
                    })
                  );
                }
              } else if (params) {
                if (!window.popupBridge) {
                  self2._frameService.redirect(self2._loadingFrameUrl);
                }
                self2.tokenize(params).then(resolve).catch(reject).then(function() {
                  self2._frameService.close();
                });
              }
            };
          };
          LocalPayment.prototype._formatTokenizePayload = function(response2) {
            var payload2;
            var account = {};
            if (response2.paypalAccounts) {
              account = response2.paypalAccounts[0];
            }
            payload2 = {
              nonce: account.nonce,
              details: {},
              type: account.type
            };
            if (account.details) {
              if (account.details.payerInfo) {
                payload2.details = account.details.payerInfo;
              }
              if (account.details.correlationId) {
                payload2.correlationId = account.details.correlationId;
              }
            }
            return payload2;
          };
          LocalPayment.prototype.hasTokenizationParams = function() {
            var params = querystring.parse();
            if (params.errorcode) {
              return true;
            }
            return Boolean(
              params.btLpToken && params.btLpPaymentId && params.btLpPayerId
            );
          };
          LocalPayment.prototype._formatTokenizeData = function(params) {
            var clientConfiguration = this._client.getConfiguration();
            var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
            var data = {
              merchantAccountId: this._merchantAccountId,
              paypalAccount: {
                correlationId: params.btLpToken || params.token,
                paymentToken: params.btLpPaymentId || params.paymentId,
                payerId: params.btLpPayerId || params.PayerID,
                unilateral: gatewayConfiguration.paypal.unvettedMerchant,
                intent: "sale"
              }
            };
            return data;
          };
          function isDeferredPaymentTypeOptions(options) {
            var blikOptions = options.blikOptions || {};
            var paymentType = typeof options.paymentType === "string" ? options.paymentType.toLowerCase() : options.paymentType;
            if (paymentType === "pay_upon_invoice") {
              return true;
            } else if (paymentType === "blik") {
              return blikOptions.hasOwnProperty("level_0") || blikOptions.hasOwnProperty("oneClick");
            }
            return false;
          }
          function hasMissingAddressOption(options) {
            var i, option;
            for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_ADDRESS.length; i++) {
              option = constants.REQUIRED_OPTIONS_FOR_ADDRESS[i];
              if (!options.hasOwnProperty(option)) {
                return option;
              }
            }
            return false;
          }
          function hasMissingLineItemsOption(items) {
            var i, j, item, option;
            for (j = 0; j < items.length; j++) {
              item = items[j];
              for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_LINE_ITEMS.length; i++) {
                option = constants.REQUIRED_OPTIONS_FOR_LINE_ITEMS[i];
                if (!item.hasOwnProperty(option)) {
                  return option;
                }
              }
            }
            return false;
          }
          function hasMissingBlikOptions(options) {
            var i, option, oneClick;
            var blikOptions = options.blikOptions || {};
            for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_BLIK_SEAMLESS_PAYMENT_TYPE.length; i++) {
              option = constants.REQUIRED_OPTIONS_FOR_BLIK_SEAMLESS_PAYMENT_TYPE[i];
              if (!options.hasOwnProperty(option)) {
                return option;
              }
            }
            if (blikOptions.hasOwnProperty("level_0")) {
              for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_LEVEL_0.length; i++) {
                option = constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_LEVEL_0[i];
                if (!blikOptions.level_0.hasOwnProperty(option)) {
                  return "blikOptions.level_0." + option;
                }
              }
            } else if (blikOptions.hasOwnProperty("oneClick")) {
              oneClick = blikOptions.oneClick || {};
              if (oneClick.hasOwnProperty("aliasKey")) {
                for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_SUBSEQUENT.length; i++) {
                  option = constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_SUBSEQUENT[i];
                  if (!oneClick.hasOwnProperty(option)) {
                    return "blikOptions.oneClick." + option;
                  }
                }
              } else {
                for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_FIRST.length; i++) {
                  option = constants.REQUIRED_OPTIONS_FOR_BLIK_OPTIONS_ONE_CLICK_FIRST[i];
                  if (!oneClick.hasOwnProperty(option)) {
                    return "blikOptions.oneClick." + option;
                  }
                }
              }
            }
            return false;
          }
          function hasMissingOption(options) {
            var i, option, missingAddressOption, missingLineItemOption, paymentType;
            if (!options) {
              return true;
            }
            if (isDeferredPaymentTypeOptions(options)) {
              paymentType = options.paymentType || "";
              if (paymentType.toLowerCase() === "pay_upon_invoice") {
                for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_PAY_UPON_INVOICE_PAYMENT_TYPE.length; i++) {
                  option = constants.REQUIRED_OPTIONS_FOR_PAY_UPON_INVOICE_PAYMENT_TYPE[i];
                  if (!options.hasOwnProperty(option)) {
                    return option;
                  }
                  if (option === "address" || option === "billingAddress") {
                    missingAddressOption = hasMissingAddressOption(options[option]);
                    if (missingAddressOption) {
                      return option + "." + missingAddressOption;
                    }
                  } else if (option === "lineItems") {
                    missingLineItemOption = hasMissingLineItemsOption(options[option]);
                    if (missingLineItemOption) {
                      return option + "." + missingLineItemOption;
                    }
                  }
                }
              } else if (paymentType.toLowerCase() === "blik") {
                return hasMissingBlikOptions(options);
              }
            } else {
              for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_START_PAYMENT.length; i++) {
                option = constants.REQUIRED_OPTIONS_FOR_START_PAYMENT[i];
                if (!options.hasOwnProperty(option)) {
                  return option;
                }
              }
              if (!options.fallback.url) {
                return "fallback.url";
              }
              if (!options.fallback.buttonText) {
                return "fallback.buttonText";
              }
              if (options.recurrent === true && !options.customerId) {
                return "customerId";
              }
            }
            return false;
          }
          LocalPayment.prototype.teardown = function() {
            var self2 = this;
            self2._frameService.teardown();
            convertMethodsToError(self2, methods(LocalPayment.prototype));
            analytics.sendEvent(self2._client, "local-payment.teardown-completed");
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(LocalPayment);
        }, { "../../lib/analytics": 119, "../../lib/braintree-error": 124, "../../lib/constants": 126, "../../lib/convert-methods-to-error": 127, "../../lib/convert-to-braintree-error": 128, "../../lib/frame-service/external": 139, "../../lib/methods": 155, "../../lib/querystring": 157, "../../lib/use-min": 160, "../shared/errors": 165, "./constants": 162, "@braintree/extended-promise": 34, "@braintree/wrap-promise": 43 }], 164: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var LocalPayment = _dereq_("./external/local-payment");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var errors = _dereq_("./shared/errors");
          function create(options) {
            var name = "Local Payment";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var localPaymentInstance;
              var config = client.getConfiguration();
              options.client = client;
              if (config.gatewayConfiguration.paypalEnabled !== true) {
                return Promise.reject(
                  new BraintreeError(errors.LOCAL_PAYMENT_NOT_ENABLED)
                );
              }
              analytics.sendEvent(client, "local-payment.initialized");
              localPaymentInstance = new LocalPayment(options);
              return localPaymentInstance._initialize();
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./external/local-payment": 163, "./shared/errors": 165, "@braintree/wrap-promise": 43 }], 165: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            LOCAL_PAYMENT_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "LOCAL_PAYMENT_NOT_ENABLED",
              message: "LocalPayment is not enabled for this merchant."
            },
            LOCAL_PAYMENT_ALREADY_IN_PROGRESS: {
              type: BraintreeError.types.MERCHANT,
              code: "LOCAL_PAYMENT_ALREADY_IN_PROGRESS",
              message: "LocalPayment payment is already in progress."
            },
            LOCAL_PAYMENT_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "LOCAL_PAYMENT_CANCELED",
              message: "Customer canceled the LocalPayment before authorizing."
            },
            LOCAL_PAYMENT_WINDOW_CLOSED: {
              type: BraintreeError.types.CUSTOMER,
              code: "LOCAL_PAYMENT_WINDOW_CLOSED",
              message: "Customer closed LocalPayment window before authorizing."
            },
            LOCAL_PAYMENT_WINDOW_OPEN_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "LOCAL_PAYMENT_WINDOW_OPEN_FAILED",
              message: "LocalPayment window failed to open; make sure startPayment was called in response to a user action."
            },
            LOCAL_PAYMENT_START_PAYMENT_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "LOCAL_PAYMENT_START_PAYMENT_FAILED",
              message: "LocalPayment startPayment failed."
            },
            LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "LOCAL_PAYMENT_START_PAYMENT_MISSING_REQUIRED_OPTION",
              message: "Missing required option for startPayment."
            },
            LOCAL_PAYMENT_START_PAYMENT_DEFERRED_PAYMENT_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "LOCAL_PAYMENT_START_PAYMENT_DEFERRED_PAYMENT_FAILED",
              message: "LocalPayment startPayment deferred payment failed."
            },
            LOCAL_PAYMENT_TOKENIZATION_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "LOCAL_PAYMENT_TOKENIZATION_FAILED",
              message: "Could not tokenize user's local payment method."
            },
            LOCAL_PAYMENT_INVALID_PAYMENT_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "LOCAL_PAYMENT_INVALID_PAYMENT_OPTION",
              message: "Local payment options are invalid."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 166: [function(_dereq_, module3, exports3) {
          "use strict";
          var frameService = _dereq_("../../lib/frame-service/external");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var errors = _dereq_("../shared/errors");
          var VERSION = "3.102.0";
          var methods = _dereq_("../../lib/methods");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var analytics = _dereq_("../../lib/analytics");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var convertToBraintreeError = _dereq_("../../lib/convert-to-braintree-error");
          var constants = _dereq_("../shared/constants");
          var INTEGRATION_TIMEOUT_MS = _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
          function Masterpass(options) {
            var configuration = options.client.getConfiguration();
            this._client = options.client;
            this._assetsUrl = configuration.gatewayConfiguration.assetsUrl + "/web/" + VERSION;
            this._isDebug = configuration.isDebug;
            this._authInProgress = false;
            if (window.popupBridge && typeof window.popupBridge.getReturnUrlPrefix === "function") {
              this._callbackUrl = window.popupBridge.getReturnUrlPrefix() + "return";
            } else {
              this._callbackUrl = this._assetsUrl + "/html/redirect-frame" + (this._isDebug ? "" : ".min") + ".html";
            }
          }
          Masterpass.prototype._initialize = function() {
            var self2 = this;
            return new Promise(function(resolve) {
              var failureTimeout = setTimeout(function() {
                analytics.sendEvent(self2._client, "masterpass.load.timed-out");
              }, INTEGRATION_TIMEOUT_MS);
              frameService.create(
                {
                  name: constants.LANDING_FRAME_NAME,
                  height: constants.POPUP_HEIGHT,
                  width: constants.POPUP_WIDTH,
                  dispatchFrameUrl: self2._assetsUrl + "/html/dispatch-frame" + (self2._isDebug ? "" : ".min") + ".html",
                  openFrameUrl: self2._assetsUrl + "/html/masterpass-landing-frame" + (self2._isDebug ? "" : ".min") + ".html"
                },
                function(service) {
                  self2._frameService = service;
                  clearTimeout(failureTimeout);
                  analytics.sendEvent(self2._client, "masterpass.load.succeeded");
                  resolve(self2);
                }
              );
            });
          };
          Masterpass.prototype.tokenize = function(options) {
            var self2 = this;
            if (!options || hasMissingOption(options)) {
              return Promise.reject(
                new BraintreeError(errors.MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION)
              );
            }
            if (self2._authInProgress) {
              return Promise.reject(
                new BraintreeError(errors.MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS)
              );
            }
            return new Promise(function(resolve, reject) {
              self2._navigateFrameToLoadingPage(options).catch(reject);
              self2._frameService.open(
                options.frameOptions,
                self2._createFrameOpenHandler(resolve, reject)
              );
            });
          };
          Masterpass.prototype._navigateFrameToLoadingPage = function(options) {
            var self2 = this;
            this._authInProgress = true;
            return this._client.request({
              method: "post",
              endpoint: "masterpass/request_token",
              data: {
                requestToken: {
                  originUrl: window.location.protocol + "//" + window.location.hostname,
                  subtotal: options.subtotal,
                  currencyCode: options.currencyCode,
                  callbackUrl: this._callbackUrl
                }
              }
            }).then(function(response2) {
              var redirectUrl = self2._assetsUrl + "/html/masterpass-loading-frame" + (self2._isDebug ? "" : ".min") + ".html?";
              var gatewayConfiguration = self2._client.getConfiguration().gatewayConfiguration;
              var config = options.config || {};
              var queryParams;
              queryParams = {
                environment: gatewayConfiguration.environment,
                requestToken: response2.requestToken,
                callbackUrl: self2._callbackUrl,
                merchantCheckoutId: gatewayConfiguration.masterpass.merchantCheckoutId,
                allowedCardTypes: gatewayConfiguration.masterpass.supportedNetworks,
                version: constants.MASTERPASS_VERSION
              };
              Object.keys(config).forEach(function(key) {
                if (typeof config[key] !== "function") {
                  queryParams[key] = config[key];
                }
              });
              redirectUrl += Object.keys(queryParams).map(function(key) {
                return key + "=" + queryParams[key];
              }).join("&");
              self2._frameService.redirect(redirectUrl);
            }).catch(function(err) {
              var status = err.details && err.details.httpStatus;
              self2._closeWindow();
              if (status === 422) {
                return Promise.reject(
                  convertToBraintreeError(err, errors.MASTERPASS_INVALID_PAYMENT_OPTION)
                );
              }
              return Promise.reject(
                convertToBraintreeError(err, errors.MASTERPASS_FLOW_FAILED)
              );
            });
          };
          Masterpass.prototype._createFrameOpenHandler = function(resolve, reject) {
            var self2 = this;
            if (window.popupBridge) {
              return function(popupBridgeErr, payload2) {
                self2._authInProgress = false;
                if (popupBridgeErr) {
                  analytics.sendEvent(
                    self2._client,
                    "masterpass.tokenization.closed-popupbridge.by-user"
                  );
                  reject(
                    convertToBraintreeError(
                      popupBridgeErr,
                      errors.MASTERPASS_POPUP_CLOSED
                    )
                  );
                  return;
                } else if (!payload2.queryItems) {
                  analytics.sendEvent(
                    self2._client,
                    "masterpass.tokenization.failed-popupbridge"
                  );
                  reject(new BraintreeError(errors.MASTERPASS_FLOW_FAILED));
                  return;
                }
                self2._tokenizeMasterpass(payload2.queryItems).then(resolve).catch(reject);
              };
            }
            return function(frameServiceErr, payload2) {
              if (frameServiceErr) {
                self2._authInProgress = false;
                if (frameServiceErr.code === "FRAME_SERVICE_FRAME_CLOSED") {
                  analytics.sendEvent(
                    self2._client,
                    "masterpass.tokenization.closed.by-user"
                  );
                  reject(new BraintreeError(errors.MASTERPASS_POPUP_CLOSED));
                  return;
                }
                if (frameServiceErr.code && frameServiceErr.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1) {
                  analytics.sendEvent(
                    self2._client,
                    "masterpass.tokenization.failed.to-open"
                  );
                  reject(
                    new BraintreeError({
                      code: errors.MASTERPASS_POPUP_OPEN_FAILED.code,
                      type: errors.MASTERPASS_POPUP_OPEN_FAILED.type,
                      message: errors.MASTERPASS_POPUP_OPEN_FAILED.message,
                      details: {
                        originalError: frameServiceErr
                      }
                    })
                  );
                  return;
                }
                analytics.sendEvent(self2._client, "masterpass.tokenization.failed");
                self2._closeWindow();
                reject(
                  convertToBraintreeError(frameServiceErr, errors.MASTERPASS_FLOW_FAILED)
                );
                return;
              }
              self2._tokenizeMasterpass(payload2).then(resolve).catch(reject);
            };
          };
          Masterpass.prototype._tokenizeMasterpass = function(payload2) {
            var self2 = this;
            if (payload2.mpstatus !== "success") {
              analytics.sendEvent(self2._client, "masterpass.tokenization.closed.by-user");
              self2._closeWindow();
              return Promise.reject(new BraintreeError(errors.MASTERPASS_POPUP_CLOSED));
            }
            if (isMissingRequiredPayload(payload2)) {
              analytics.sendEvent(
                self2._client,
                "masterpass.tokenization.closed.missing-payload"
              );
              self2._closeWindow();
              return Promise.reject(
                new BraintreeError(errors.MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS)
              );
            }
            return self2._client.request({
              endpoint: "payment_methods/masterpass_cards",
              method: "post",
              data: {
                masterpassCard: {
                  checkoutResourceUrl: payload2.checkout_resource_url,
                  requestToken: payload2.oauth_token,
                  verifierToken: payload2.oauth_verifier
                }
              }
            }).then(function(response2) {
              self2._closeWindow();
              if (window.popupBridge) {
                analytics.sendEvent(
                  self2._client,
                  "masterpass.tokenization.success-popupbridge"
                );
              } else {
                analytics.sendEvent(self2._client, "masterpass.tokenization.success");
              }
              return response2.masterpassCards[0];
            }).catch(function(tokenizeErr) {
              self2._closeWindow();
              if (window.popupBridge) {
                analytics.sendEvent(
                  self2._client,
                  "masterpass.tokenization.failed-popupbridge"
                );
              } else {
                analytics.sendEvent(self2._client, "masterpass.tokenization.failed");
              }
              return Promise.reject(
                convertToBraintreeError(
                  tokenizeErr,
                  errors.MASTERPASS_ACCOUNT_TOKENIZATION_FAILED
                )
              );
            });
          };
          function isMissingRequiredPayload(payload2) {
            return [
              payload2.oauth_verifier,
              payload2.oauth_token,
              payload2.checkout_resource_url
            ].some(function(element) {
              return element == null || element === "null";
            });
          }
          Masterpass.prototype._closeWindow = function() {
            this._authInProgress = false;
            this._frameService.close();
          };
          Masterpass.prototype.teardown = function() {
            var self2 = this;
            return new Promise(function(resolve) {
              self2._frameService.teardown();
              convertMethodsToError(self2, methods(Masterpass.prototype));
              analytics.sendEvent(self2._client, "masterpass.teardown-completed");
              resolve();
            });
          };
          function hasMissingOption(options) {
            var i, option;
            for (i = 0; i < constants.REQUIRED_OPTIONS_FOR_TOKENIZE.length; i++) {
              option = constants.REQUIRED_OPTIONS_FOR_TOKENIZE[i];
              if (!options.hasOwnProperty(option)) {
                return true;
              }
            }
            return false;
          }
          module3.exports = wrapPromise.wrapPrototype(Masterpass);
        }, { "../../lib/analytics": 119, "../../lib/braintree-error": 124, "../../lib/constants": 126, "../../lib/convert-methods-to-error": 127, "../../lib/convert-to-braintree-error": 128, "../../lib/frame-service/external": 139, "../../lib/methods": 155, "../shared/constants": 169, "../shared/errors": 170, "@braintree/wrap-promise": 43 }], 167: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var browserDetection = _dereq_("./shared/browser-detection");
          var Masterpass = _dereq_("./external/masterpass");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var VERSION = "3.102.0";
          var errors = _dereq_("./shared/errors");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "Masterpass";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              if (!isSupported()) {
                return Promise.reject(
                  new BraintreeError(errors.MASTERPASS_BROWSER_NOT_SUPPORTED)
                );
              }
              return Promise.resolve();
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var masterpassInstance, configuration;
              options.client = client;
              configuration = options.client.getConfiguration().gatewayConfiguration;
              if (!configuration.masterpass) {
                return Promise.reject(
                  new BraintreeError(errors.MASTERPASS_NOT_ENABLED)
                );
              }
              masterpassInstance = new Masterpass(options);
              return masterpassInstance._initialize();
            });
          }
          function isSupported() {
            return Boolean(window.popupBridge || browserDetection.supportsPopups());
          }
          module3.exports = {
            create: wrapPromise(create),
            isSupported,
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./external/masterpass": 166, "./shared/browser-detection": 168, "./shared/errors": 170, "@braintree/wrap-promise": 43 }], 168: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            supportsPopups: _dereq_("@braintree/browser-detection/supports-popups")
          };
        }, { "@braintree/browser-detection/supports-popups": 32 }], 169: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            LANDING_FRAME_NAME: "braintreemasterpasslanding",
            POPUP_WIDTH: 450,
            POPUP_HEIGHT: 660,
            MASTERPASS_VERSION: "v6",
            REQUIRED_OPTIONS_FOR_TOKENIZE: ["subtotal", "currencyCode"]
          };
        }, {}], 170: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            MASTERPASS_BROWSER_NOT_SUPPORTED: {
              type: BraintreeError.types.CUSTOMER,
              code: "MASTERPASS_BROWSER_NOT_SUPPORTED",
              message: "Browser is not supported."
            },
            MASTERPASS_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_NOT_ENABLED",
              message: "Masterpass is not enabled for this merchant."
            },
            MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_TOKENIZE_MISSING_REQUIRED_OPTION",
              message: "Missing required option for tokenize."
            },
            MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_TOKENIZATION_ALREADY_IN_PROGRESS",
              message: "Masterpass tokenization is already in progress."
            },
            MASTERPASS_ACCOUNT_TOKENIZATION_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "MASTERPASS_ACCOUNT_TOKENIZATION_FAILED",
              message: "Could not tokenize user's Masterpass account."
            },
            MASTERPASS_POPUP_OPEN_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_POPUP_OPEN_FAILED",
              message: "Masterpass popup failed to open. Make sure to tokenize in response to a user action, such as a click."
            },
            MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_POPUP_MISSING_REQUIRED_PARAMETERS",
              message: "Masterpass popup failed to return all required parameters needed to continue tokenization."
            },
            MASTERPASS_POPUP_CLOSED: {
              type: BraintreeError.types.CUSTOMER,
              code: "MASTERPASS_POPUP_CLOSED",
              message: "Customer closed Masterpass popup before authorizing."
            },
            MASTERPASS_INVALID_PAYMENT_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "MASTERPASS_INVALID_PAYMENT_OPTION",
              message: "Masterpass payment options are invalid."
            },
            MASTERPASS_FLOW_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "MASTERPASS_FLOW_FAILED",
              message: "Could not initialize Masterpass flow."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 171: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../../lib/analytics");
          var assign = _dereq_("../../lib/assign").assign;
          var Bus = _dereq_("framebus");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var generateGooglePayConfiguration = _dereq_("../../lib/generate-google-pay-configuration");
          var iFramer = _dereq_("@braintree/iframer");
          var uuid = _dereq_("@braintree/uuid");
          var useMin = _dereq_("../../lib/use-min");
          var methods = _dereq_("../../lib/methods");
          var EventEmitter = _dereq_("@braintree/event-emitter");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var VERSION = "3.102.0";
          var constants = _dereq_("../shared/constants");
          var events = constants.events;
          var errors = constants.errors;
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var CARD_TYPE_MAPPINGS = {
            Visa: "visa",
            MasterCard: "mastercard",
            "American Express": "amex",
            "Diners Club": "diners",
            Discover: "discover",
            JCB: "jcb",
            UnionPay: "unionpay",
            Maestro: "maestro"
          };
          var BRAINTREE_GOOGLE_PAY_MERCHANT_ID = "18278000977346790994";
          function composeUrl(assetsUrl, componentId, isDebug) {
            var baseUrl = assetsUrl;
            return baseUrl + "/web/" + VERSION + "/html/payment-request-frame" + useMin(isDebug) + ".html#" + componentId;
          }
          function PaymentRequestComponent(options) {
            var enabledPaymentMethods = options.enabledPaymentMethods || {};
            EventEmitter.call(this);
            this._componentId = uuid();
            this._client = options.client;
            this._enabledPaymentMethods = {
              basicCard: enabledPaymentMethods.basicCard !== false,
              googlePay: enabledPaymentMethods.googlePay !== false
            };
            this._googlePayVersion = options.googlePayVersion === 2 ? 2 : 1;
            this._googleMerchantId = BRAINTREE_GOOGLE_PAY_MERCHANT_ID;
            this._supportedPaymentMethods = this._constructDefaultSupportedPaymentMethods();
            this._defaultSupportedPaymentMethods = Object.keys(
              this._supportedPaymentMethods
            ).map(
              function(key) {
                return this._supportedPaymentMethods[key];
              }.bind(this)
            );
            this._bus = new Bus({ channel: this._componentId });
          }
          EventEmitter.createChild(PaymentRequestComponent);
          PaymentRequestComponent.prototype._constructDefaultSupportedPaymentMethods = function() {
            var configuration = this._client.getConfiguration();
            var androidPayConfiguration = configuration.gatewayConfiguration.androidPay;
            var cardConfiguration = configuration.gatewayConfiguration.creditCards;
            var supportedPaymentMethods = {};
            if (this._enabledPaymentMethods.basicCard && cardConfiguration && cardConfiguration.supportedCardTypes.length > 0) {
              supportedPaymentMethods.basicCard = {
                supportedMethods: "basic-card",
                data: {
                  supportedNetworks: cardConfiguration.supportedCardTypes.reduce(
                    function(types, cardType) {
                      if (cardType in CARD_TYPE_MAPPINGS) {
                        types.push(CARD_TYPE_MAPPINGS[cardType]);
                      }
                      return types;
                    },
                    []
                  )
                }
              };
            }
            if (this._enabledPaymentMethods.googlePay && androidPayConfiguration && androidPayConfiguration.enabled) {
              supportedPaymentMethods.googlePay = {
                supportedMethods: "https://google.com/pay",
                data: generateGooglePayConfiguration(
                  configuration,
                  this._googlePayVersion,
                  this._googleMerchantId
                )
              };
            }
            return supportedPaymentMethods;
          };
          PaymentRequestComponent.prototype.initialize = function() {
            var clientConfiguration = this._client.getConfiguration();
            var self2 = this;
            this._frame = iFramer({
              allowPaymentRequest: true,
              name: "braintree-payment-request-frame",
              class: "braintree-payment-request-frame",
              height: 0,
              width: 0,
              style: {
                position: "absolute",
                left: "-9999px"
              },
              title: "Secure Payment Frame"
            });
            if (this._defaultSupportedPaymentMethods.length === 0) {
              return Promise.reject(
                new BraintreeError(
                  errors.PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS
                )
              );
            }
            return new Promise(function(resolve) {
              self2._bus.on(events.FRAME_READY, function(reply) {
                reply(self2._client);
              });
              self2._bus.on(events.FRAME_CAN_MAKE_REQUESTS, function() {
                analytics.sendEvent(self2._client, "payment-request.initialized");
                self2._bus.on(events.SHIPPING_ADDRESS_CHANGE, function(shippingAddress) {
                  var shippingAddressChangeEvent = {
                    target: {
                      shippingAddress
                    },
                    updateWith: function(paymentDetails) {
                      self2._bus.emit(events.UPDATE_SHIPPING_ADDRESS, paymentDetails);
                    }
                  };
                  self2._emit("shippingAddressChange", shippingAddressChangeEvent);
                  self2._emit("shippingaddresschange", shippingAddressChangeEvent);
                });
                self2._bus.on(events.SHIPPING_OPTION_CHANGE, function(shippingOption) {
                  var shippingOptionChangeEvent = {
                    target: {
                      shippingOption
                    },
                    updateWith: function(paymentDetails) {
                      self2._bus.emit(events.UPDATE_SHIPPING_OPTION, paymentDetails);
                    }
                  };
                  self2._emit("shippingOptionChange", shippingOptionChangeEvent);
                  self2._emit("shippingoptionchange", shippingOptionChangeEvent);
                });
                resolve(self2);
              });
              self2._frame.src = composeUrl(
                clientConfiguration.gatewayConfiguration.assetsUrl,
                self2._componentId,
                clientConfiguration.isDebug
              );
              document.body.appendChild(self2._frame);
            });
          };
          PaymentRequestComponent.prototype.createSupportedPaymentMethodsConfiguration = function(type, overrides) {
            var configuration;
            if (!type) {
              throw new BraintreeError(
                errors.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE
              );
            }
            if (!this._enabledPaymentMethods[type]) {
              throw new BraintreeError(
                errors.PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED
              );
            }
            configuration = assign({}, this._supportedPaymentMethods[type]);
            configuration.data = assign({}, configuration.data, overrides);
            return configuration;
          };
          PaymentRequestComponent.prototype.tokenize = function(configuration) {
            var self2 = this;
            return new Promise(function(resolve, reject) {
              self2._bus.emit(
                events.PAYMENT_REQUEST_INITIALIZED,
                {
                  supportedPaymentMethods: configuration.supportedPaymentMethods || self2._defaultSupportedPaymentMethods,
                  details: configuration.details,
                  options: configuration.options
                },
                function(response2) {
                  var rawError = response2[0];
                  var payload2 = response2[1];
                  if (rawError) {
                    reject(self2._formatTokenizationError(rawError));
                    return;
                  }
                  analytics.sendEvent(self2._client, "payment-request.tokenize.succeeded");
                  resolve({
                    nonce: payload2.nonce,
                    type: payload2.type,
                    description: payload2.description,
                    details: {
                      rawPaymentResponse: payload2.details.rawPaymentResponse,
                      cardType: payload2.details.cardType,
                      lastFour: payload2.details.lastFour,
                      lastTwo: payload2.details.lastTwo
                    },
                    binData: payload2.binData
                  });
                }
              );
            });
          };
          PaymentRequestComponent.prototype.canMakePayment = function(configuration) {
            var self2 = this;
            var unsupportedPaymentMethod;
            if (!window.PaymentRequest) {
              analytics.sendEvent(
                self2._client,
                "payment-request.can-make-payment.not-available"
              );
              return Promise.resolve(false);
            }
            if (configuration.supportedPaymentMethods) {
              configuration.supportedPaymentMethods.forEach(function(config) {
                var supportedMethods = config.supportedMethods;
                if (!(supportedMethods in constants.SUPPORTED_METHODS)) {
                  unsupportedPaymentMethod = supportedMethods;
                }
              });
              if (unsupportedPaymentMethod) {
                return Promise.reject(
                  new BraintreeError({
                    type: errors.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.type,
                    code: errors.PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD.code,
                    message: unsupportedPaymentMethod + " is not a supported payment method."
                  })
                );
              }
            }
            return new Promise(function(resolve, reject) {
              self2._bus.emit(
                events.CAN_MAKE_PAYMENT,
                {
                  supportedPaymentMethods: configuration.supportedPaymentMethods || self2._defaultSupportedPaymentMethods,
                  details: configuration.details,
                  options: configuration.options
                },
                function(response2) {
                  var error = response2[0];
                  var payload2 = response2[1];
                  if (error) {
                    reject(self2._formatCanMakePaymentError(error));
                    return;
                  }
                  analytics.sendEvent(
                    self2._client,
                    "payment-request.can-make-payment." + payload2
                  );
                  resolve(payload2);
                }
              );
            });
          };
          PaymentRequestComponent.prototype.teardown = function() {
            this._bus.teardown();
            this._frame.parentNode.removeChild(this._frame);
            convertMethodsToError(this, methods(PaymentRequestComponent.prototype));
            analytics.sendEvent(this._client, "payment-request.teardown-completed");
            return Promise.resolve();
          };
          PaymentRequestComponent.prototype._formatTokenizationError = function(error) {
            var formattedError;
            switch (error.name) {
              case "AbortError":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_CANCELED.type,
                  code: errors.PAYMENT_REQUEST_CANCELED.code,
                  message: errors.PAYMENT_REQUEST_CANCELED.message,
                  details: {
                    originalError: error
                  }
                });
                analytics.sendEvent(this._client, "payment-request.tokenize.canceled");
                return formattedError;
              case "PAYMENT_REQUEST_INITIALIZATION_FAILED":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
                  code: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
                  message: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
                  details: {
                    originalError: error
                  }
                });
                break;
              case "BRAINTREE_GATEWAY_GOOGLE_PAYMENT_TOKENIZATION_ERROR":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.type,
                  code: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.code,
                  message: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE.message,
                  details: {
                    originalError: error
                  }
                });
                break;
              case "BRAINTREE_GATEWAY_GOOGLE_PAYMENT_PARSING_ERROR":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.type,
                  code: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.code,
                  message: errors.PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR.message,
                  details: {
                    originalError: error
                  }
                });
                break;
              default:
                formattedError = new BraintreeError({
                  code: errors.PAYMENT_REQUEST_NOT_COMPLETED.code,
                  type: error.type || BraintreeError.types.CUSTOMER,
                  message: errors.PAYMENT_REQUEST_NOT_COMPLETED.message,
                  details: {
                    originalError: error
                  }
                });
            }
            analytics.sendEvent(this._client, "payment-request.tokenize.failed");
            return formattedError;
          };
          PaymentRequestComponent.prototype._formatCanMakePaymentError = function(error) {
            var formattedError;
            switch (error.name) {
              case "PAYMENT_REQUEST_INITIALIZATION_FAILED":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.type,
                  code: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.code,
                  message: errors.PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED.message,
                  details: {
                    originalError: error
                  }
                });
                break;
              case "NotAllowedError":
                formattedError = new BraintreeError({
                  type: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.type,
                  code: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.code,
                  message: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED.message,
                  details: {
                    originalError: error
                  }
                });
                break;
              default:
                formattedError = new BraintreeError({
                  code: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.code,
                  type: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.type,
                  message: errors.PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED.message,
                  details: {
                    originalError: error
                  }
                });
            }
            analytics.sendEvent(this._client, "payment-request.can-make-payment.failed");
            return formattedError;
          };
          module3.exports = wrapPromise.wrapPrototype(PaymentRequestComponent);
        }, { "../../lib/analytics": 119, "../../lib/assign": 121, "../../lib/braintree-error": 124, "../../lib/convert-methods-to-error": 127, "../../lib/generate-google-pay-configuration": 149, "../../lib/methods": 155, "../../lib/use-min": 160, "../shared/constants": 173, "@braintree/event-emitter": 33, "@braintree/iframer": 35, "@braintree/uuid": 39, "@braintree/wrap-promise": 43, "framebus": 52 }], 172: [function(_dereq_, module3, exports3) {
          "use strict";
          var PaymentRequestComponent = _dereq_("./external/payment-request");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var VERSION = "3.102.0";
          function create(options) {
            var name = "Payment Request";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var paymentRequestInstance;
              options.client = client;
              paymentRequestInstance = new PaymentRequestComponent(options);
              return paymentRequestInstance.initialize();
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./external/payment-request": 171, "@braintree/wrap-promise": 43 }], 173: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("../../lib/enumerate");
          var errors = _dereq_("./errors");
          var constants = {};
          constants.events = enumerate(
            [
              "CAN_MAKE_PAYMENT",
              "FRAME_READY",
              "FRAME_CAN_MAKE_REQUESTS",
              "PAYMENT_REQUEST_INITIALIZED",
              "SHIPPING_ADDRESS_CHANGE",
              "UPDATE_SHIPPING_ADDRESS",
              "SHIPPING_OPTION_CHANGE",
              "UPDATE_SHIPPING_OPTION"
            ],
            "payment-request:"
          );
          constants.errors = errors;
          constants.SUPPORTED_METHODS = {
            "basic-card": true,
            "https://google.com/pay": true
          };
          module3.exports = constants;
        }, { "../../lib/enumerate": 134, "./errors": 174 }], 174: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_NO_VALID_SUPPORTED_PAYMENT_METHODS",
              message: "There are no supported payment methods associated with this account."
            },
            PAYMENT_REQUEST_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "PAYMENT_REQUEST_CANCELED",
              message: "Payment request was canceled."
            },
            PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_INITIALIZATION_MISCONFIGURED",
              message: "Something went wrong when configuring the payment request."
            },
            PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "PAYMENT_REQUEST_CAN_MAKE_PAYMENT_FAILED",
              message: "Something went wrong when calling `canMakePayment`"
            },
            PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_CAN_MAKE_PAYMENT_NOT_ALLOWED",
              message: "Something went wrong when calling `canMakePayment`. Most likely, `canMakePayment` was called multiple times with different supportedMethods configurations."
            },
            PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_UNSUPPORTED_PAYMENT_METHOD"
            },
            PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_GOOGLE_PAYMENT_FAILED_TO_TOKENIZE",
              message: "Something went wrong when tokenizing the Google Pay card."
            },
            PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "PAYMENT_REQUEST_GOOGLE_PAYMENT_PARSING_ERROR",
              message: "Something went wrong when tokenizing the Google Pay card."
            },
            PAYMENT_REQUEST_NOT_COMPLETED: {
              code: "PAYMENT_REQUEST_NOT_COMPLETED",
              message: "Payment request could not be completed."
            },
            PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_MUST_INCLUDE_TYPE",
              message: "createSupportedPaymentMethodsConfiguration must include a type parameter."
            },
            PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYMENT_REQUEST_CREATE_SUPPORTED_PAYMENT_METHODS_CONFIGURATION_TYPE_NOT_ENABLED",
              message: "createSupportedPaymentMethodsConfiguration type parameter must be valid or enabled."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 175: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            PAYPAL_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_NOT_ENABLED",
              message: "PayPal is not enabled for this merchant."
            },
            PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED",
              message: "A linked PayPal Sandbox account is required to use PayPal Checkout in Sandbox. See https://developer.paypal.com/braintree/docs/guides/paypal/testing-go-live#linked-paypal-testing for details on linking your PayPal sandbox with Braintree."
            },
            PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "PAYPAL_ACCOUNT_TOKENIZATION_FAILED",
              message: "Could not tokenize user's PayPal account."
            },
            PAYPAL_FLOW_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "PAYPAL_FLOW_FAILED",
              message: "Could not initialize PayPal flow."
            },
            PAYPAL_FLOW_OPTION_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_FLOW_OPTION_REQUIRED",
              message: "PayPal flow property is invalid or missing."
            },
            PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED"
            },
            PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED",
              message: "Something went wrong when setting up the checkout workflow."
            },
            PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED",
              message: "PayPal popup failed to open, make sure to initiate the vault checkout in response to a user action."
            },
            PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED",
              message: "Customer closed PayPal popup before authorizing."
            },
            PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS",
              message: "Vault initiated checkout already in progress."
            },
            PAYPAL_INVALID_PAYMENT_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_INVALID_PAYMENT_OPTION",
              message: "PayPal payment options are invalid."
            },
            PAYPAL_MISSING_REQUIRED_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_MISSING_REQUIRED_OPTION",
              message: "Missing required option."
            }
          };
        }, { "../lib/braintree-error": 124 }], 176: [function(_dereq_, module3, exports3) {
          "use strict";
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var PayPalCheckout = _dereq_("./paypal-checkout");
          var VERSION = "3.102.0";
          function create(options) {
            var name = "PayPal Checkout";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var instance = new PayPalCheckout(options);
              return instance._initialize(options);
            });
          }
          function isSupported() {
            return true;
          }
          module3.exports = {
            create: wrapPromise(create),
            isSupported,
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "./paypal-checkout": 177, "@braintree/wrap-promise": 43 }], 177: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var assign = _dereq_("../lib/assign").assign;
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var convertToBraintreeError = _dereq_("../lib/convert-to-braintree-error");
          var errors = _dereq_("./errors");
          var constants = _dereq_("../paypal/shared/constants");
          var frameService = _dereq_("../lib/frame-service/external");
          var createAuthorizationData = _dereq_("../lib/create-authorization-data");
          var methods = _dereq_("../lib/methods");
          var useMin = _dereq_("../lib/use-min");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var querystring = _dereq_("../lib/querystring");
          var VERSION = "3.102.0";
          var INTEGRATION_TIMEOUT_MS = _dereq_("../lib/constants").INTEGRATION_TIMEOUT_MS;
          var REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT = [
            "amount",
            "currency",
            "vaultInitiatedCheckoutPaymentMethodToken"
          ];
          var PAYPAL_SDK_PRELOAD_URL = "https://www.{ENV}paypal.com/smart/buttons/preload";
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function PayPalCheckout(options) {
            this._merchantAccountId = options.merchantAccountId;
            this._autoSetDataUserIdToken = Boolean(options.autoSetDataUserIdToken);
          }
          PayPalCheckout.prototype._initialize = function(options) {
            var config;
            if (options.client) {
              config = options.client.getConfiguration();
              this._authorizationInformation = {
                fingerprint: config.authorizationFingerprint,
                environment: config.gatewayConfiguration.environment
              };
            } else {
              config = createAuthorizationData(options.authorization);
              this._authorizationInformation = {
                fingerprint: config.attrs.authorizationFingerprint,
                environment: config.environment
              };
            }
            this._clientPromise = createDeferredClient.create({
              authorization: options.authorization,
              client: options.client,
              debug: options.debug,
              assetsUrl: createAssetsUrl.create(options.authorization),
              name: "PayPal Checkout"
            }).then(
              function(client) {
                this._configuration = client.getConfiguration();
                if (!this._merchantAccountId) {
                  if (!this._configuration.gatewayConfiguration.paypalEnabled) {
                    this._setupError = new BraintreeError(errors.PAYPAL_NOT_ENABLED);
                  } else if (this._configuration.gatewayConfiguration.paypal.environmentNoNetwork === true) {
                    this._setupError = new BraintreeError(
                      errors.PAYPAL_SANDBOX_ACCOUNT_NOT_LINKED
                    );
                  }
                }
                if (this._setupError) {
                  return Promise.reject(this._setupError);
                }
                analytics.sendEvent(client, "paypal-checkout.initialized");
                this._frameServicePromise = this._setupFrameService(client);
                return client;
              }.bind(this)
            );
            if (options.client) {
              return this._clientPromise.then(
                function() {
                  return this;
                }.bind(this)
              );
            }
            return Promise.resolve(this);
          };
          PayPalCheckout.prototype._setupFrameService = function(client) {
            var frameServicePromise = new ExtendedPromise();
            var config = client.getConfiguration();
            var timeoutRef = setTimeout(function() {
              analytics.sendEvent(client, "paypal-checkout.frame-service.timed-out");
              frameServicePromise.reject(
                new BraintreeError(
                  errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_SETUP_FAILED
                )
              );
            }, INTEGRATION_TIMEOUT_MS);
            this._assetsUrl = config.gatewayConfiguration.paypal.assetsUrl + "/web/" + VERSION;
            this._isDebug = config.isDebug;
            this._loadingFrameUrl = this._assetsUrl + "/html/paypal-landing-frame" + useMin(this._isDebug) + ".html";
            frameService.create(
              {
                name: "braintreepaypallanding",
                dispatchFrameUrl: this._assetsUrl + "/html/dispatch-frame" + useMin(this._isDebug) + ".html",
                openFrameUrl: this._loadingFrameUrl
              },
              function(service) {
                this._frameService = service;
                clearTimeout(timeoutRef);
                frameServicePromise.resolve();
              }.bind(this)
            );
            return frameServicePromise;
          };
          PayPalCheckout.prototype.createPayment = function(options) {
            if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
              return Promise.reject(
                new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED)
              );
            }
            analytics.sendEvent(this._clientPromise, "paypal-checkout.createPayment");
            return this._createPaymentResource(options).then(function(response2) {
              var flowToken, urlParams;
              if (options.flow === "checkout") {
                urlParams = querystring.parse(response2.paymentResource.redirectUrl);
                flowToken = urlParams.token;
              } else {
                flowToken = response2.agreementSetup.tokenId;
              }
              return flowToken;
            });
          };
          PayPalCheckout.prototype._createPaymentResource = function(options, config) {
            var self2 = this;
            var endpoint = "paypal_hermes/" + constants.FLOW_ENDPOINTS[options.flow];
            delete this.intentFromCreatePayment;
            config = config || {};
            if (options.offerCredit === true) {
              analytics.sendEvent(this._clientPromise, "paypal-checkout.credit.offered");
            }
            return this._clientPromise.then(function(client) {
              return client.request({
                endpoint,
                method: "post",
                data: self2._formatPaymentResourceData(options, config)
              }).then(function(data) {
                self2.intentFromCreatePayment = options.intent;
                return data;
              });
            }).catch(function(err) {
              var status;
              if (self2._setupError) {
                return Promise.reject(self2._setupError);
              }
              status = err.details && err.details.httpStatus;
              if (status === 422) {
                return Promise.reject(
                  new BraintreeError({
                    type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
                    code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
                    message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              }
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.PAYPAL_FLOW_FAILED.type,
                  code: errors.PAYPAL_FLOW_FAILED.code,
                  message: errors.PAYPAL_FLOW_FAILED.message
                })
              );
            });
          };
          PayPalCheckout.prototype.updatePayment = function(options) {
            var self2 = this;
            var endpoint = "paypal_hermes/patch_payment_resource";
            if (!options || this._hasMissingOption(options, constants.REQUIRED_OPTIONS)) {
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.updatePayment.missing-options"
              );
              return Promise.reject(
                new BraintreeError(errors.PAYPAL_MISSING_REQUIRED_OPTION)
              );
            }
            if (!this._verifyConsistentCurrency(options)) {
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.updatePayment.inconsistent-currencies"
              );
              return Promise.reject(
                new BraintreeError({
                  type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
                  code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
                  message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
                  details: {
                    originalError: new Error(
                      "One or more shipping option currencies differ from checkout currency."
                    )
                  }
                })
              );
            }
            analytics.sendEvent(this._clientPromise, "paypal-checkout.updatePayment");
            return this._clientPromise.then(function(client) {
              return client.request({
                endpoint,
                method: "post",
                data: self2._formatUpdatePaymentData(options)
              });
            }).catch(function(err) {
              var status = err.details && err.details.httpStatus;
              if (status === 422) {
                analytics.sendEvent(
                  self2._clientPromise,
                  "paypal-checkout.updatePayment.invalid"
                );
                return Promise.reject(
                  new BraintreeError({
                    type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
                    code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
                    message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              }
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.updatePayment." + errors.PAYPAL_FLOW_FAILED.code
              );
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.PAYPAL_FLOW_FAILED.type,
                  code: errors.PAYPAL_FLOW_FAILED.code,
                  message: errors.PAYPAL_FLOW_FAILED.message
                })
              );
            });
          };
          PayPalCheckout.prototype.startVaultInitiatedCheckout = function(options) {
            var missingRequiredParam;
            var self2 = this;
            if (this._vaultInitiatedCheckoutInProgress) {
              analytics.sendEvent(
                this._clientPromise,
                "paypal-checkout.startVaultInitiatedCheckout.error.already-in-progress"
              );
              return Promise.reject(
                new BraintreeError(
                  errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_IN_PROGRESS
                )
              );
            }
            REQUIRED_PARAMS_FOR_START_VAULT_INITIATED_CHECKOUT.forEach(function(param) {
              if (!options.hasOwnProperty(param)) {
                missingRequiredParam = param;
              }
            });
            if (missingRequiredParam) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.type,
                  code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_PARAM_REQUIRED.code,
                  message: "Required param " + missingRequiredParam + " is missing."
                })
              );
            }
            this._vaultInitiatedCheckoutInProgress = true;
            this._addModalBackdrop(options);
            options = assign({}, options, {
              flow: "checkout"
            });
            analytics.sendEvent(
              this._clientPromise,
              "paypal-checkout.startVaultInitiatedCheckout.started"
            );
            return this._waitForVaultInitiatedCheckoutDependencies().then(function() {
              var frameCommunicationPromise = new ExtendedPromise();
              var startVaultInitiatedCheckoutPromise = self2._createPaymentResource(options, {
                returnUrl: self2._constructVaultCheckutUrl("redirect-frame"),
                cancelUrl: self2._constructVaultCheckutUrl("cancel-frame")
              }).then(function(response2) {
                var redirectUrl = response2.paymentResource.redirectUrl;
                self2._frameService.redirect(redirectUrl);
                return frameCommunicationPromise;
              });
              self2._frameService.open(
                {},
                self2._createFrameServiceCallback(frameCommunicationPromise)
              );
              return startVaultInitiatedCheckoutPromise;
            }).catch(function(err) {
              self2._vaultInitiatedCheckoutInProgress = false;
              self2._removeModalBackdrop();
              if (err.code === "FRAME_SERVICE_FRAME_CLOSED") {
                analytics.sendEvent(
                  self2._clientPromise,
                  "paypal-checkout.startVaultInitiatedCheckout.canceled.by-customer"
                );
                return Promise.reject(
                  new BraintreeError(
                    errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_CANCELED
                  )
                );
              }
              if (self2._frameService) {
                self2._frameService.close();
              }
              if (err.code && err.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1) {
                analytics.sendEvent(
                  self2._clientPromise,
                  "paypal-checkout.startVaultInitiatedCheckout.failed.popup-not-opened"
                );
                return Promise.reject(
                  new BraintreeError({
                    code: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.code,
                    type: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.type,
                    message: errors.PAYPAL_START_VAULT_INITIATED_CHECKOUT_POPUP_OPEN_FAILED.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              }
              return Promise.reject(err);
            }).then(function(response2) {
              self2._frameService.close();
              self2._vaultInitiatedCheckoutInProgress = false;
              self2._removeModalBackdrop();
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.startVaultInitiatedCheckout.succeeded"
              );
              return Promise.resolve(response2);
            });
          };
          PayPalCheckout.prototype._addModalBackdrop = function(options) {
            if (options.optOutOfModalBackdrop) {
              return;
            }
            if (!this._modalBackdrop) {
              this._modalBackdrop = document.createElement("div");
              this._modalBackdrop.setAttribute(
                "data-braintree-paypal-vault-initiated-checkout-modal",
                true
              );
              this._modalBackdrop.style.position = "fixed";
              this._modalBackdrop.style.top = 0;
              this._modalBackdrop.style.bottom = 0;
              this._modalBackdrop.style.left = 0;
              this._modalBackdrop.style.right = 0;
              this._modalBackdrop.style.zIndex = 9999;
              this._modalBackdrop.style.background = "black";
              this._modalBackdrop.style.opacity = "0.7";
              this._modalBackdrop.addEventListener(
                "click",
                function() {
                  this.focusVaultInitiatedCheckoutWindow();
                }.bind(this)
              );
            }
            document.body.appendChild(this._modalBackdrop);
          };
          PayPalCheckout.prototype._removeModalBackdrop = function() {
            if (!(this._modalBackdrop && this._modalBackdrop.parentNode)) {
              return;
            }
            this._modalBackdrop.parentNode.removeChild(this._modalBackdrop);
          };
          PayPalCheckout.prototype.closeVaultInitiatedCheckoutWindow = function() {
            if (this._vaultInitiatedCheckoutInProgress) {
              analytics.sendEvent(
                this._clientPromise,
                "paypal-checkout.startVaultInitiatedCheckout.canceled.by-merchant"
              );
            }
            return this._waitForVaultInitiatedCheckoutDependencies().then(
              function() {
                this._frameService.close();
              }.bind(this)
            );
          };
          PayPalCheckout.prototype.focusVaultInitiatedCheckoutWindow = function() {
            return this._waitForVaultInitiatedCheckoutDependencies().then(
              function() {
                this._frameService.focus();
              }.bind(this)
            );
          };
          PayPalCheckout.prototype._createFrameServiceCallback = function(frameCommunicationPromise) {
            var self2 = this;
            return function(err, payload2) {
              if (err) {
                frameCommunicationPromise.reject(err);
              } else if (payload2) {
                self2._frameService.redirect(self2._loadingFrameUrl);
                self2.tokenizePayment({
                  paymentToken: payload2.token,
                  payerID: payload2.PayerID,
                  paymentID: payload2.paymentId,
                  orderID: payload2.orderId
                }).then(function(res) {
                  frameCommunicationPromise.resolve(res);
                }).catch(function(tokenizationError) {
                  frameCommunicationPromise.reject(tokenizationError);
                });
              }
            };
          };
          PayPalCheckout.prototype._waitForVaultInitiatedCheckoutDependencies = function() {
            var self2 = this;
            return this._clientPromise.then(function() {
              return self2._frameServicePromise;
            });
          };
          PayPalCheckout.prototype._constructVaultCheckutUrl = function(frameName) {
            var serviceId = this._frameService._serviceId;
            return this._assetsUrl + "/html/" + frameName + useMin(this._isDebug) + ".html?channel=" + serviceId;
          };
          PayPalCheckout.prototype.tokenizePayment = function(tokenizeOptions) {
            var self2 = this;
            var shouldVault = true;
            var payload2;
            var options = {
              flow: tokenizeOptions.billingToken && !tokenizeOptions.paymentID ? "vault" : "checkout",
              intent: tokenizeOptions.intent || this.intentFromCreatePayment
            };
            var params = {
              // The paymentToken provided by the PayPal JS SDK is the EC Token
              ecToken: tokenizeOptions.paymentToken,
              billingToken: tokenizeOptions.billingToken,
              payerId: tokenizeOptions.payerID,
              paymentId: tokenizeOptions.paymentID,
              orderId: tokenizeOptions.orderID,
              shippingOptionsId: tokenizeOptions.shippingOptionsId
            };
            if (tokenizeOptions.hasOwnProperty("vault")) {
              shouldVault = tokenizeOptions.vault;
            }
            options.vault = shouldVault;
            analytics.sendEvent(
              this._clientPromise,
              "paypal-checkout.tokenization.started"
            );
            return this._clientPromise.then(function(client) {
              return client.request({
                endpoint: "payment_methods/paypal_accounts",
                method: "post",
                data: self2._formatTokenizeData(options, params)
              });
            }).then(function(response2) {
              payload2 = self2._formatTokenizePayload(response2);
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.tokenization.success"
              );
              if (payload2.creditFinancingOffered) {
                analytics.sendEvent(
                  self2._clientPromise,
                  "paypal-checkout.credit.accepted"
                );
              }
              return payload2;
            }).catch(function(err) {
              if (self2._setupError) {
                return Promise.reject(self2._setupError);
              }
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.tokenization.failed"
              );
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
                  code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
                  message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
                })
              );
            });
          };
          PayPalCheckout.prototype.getClientId = function() {
            return this._clientPromise.then(function(client) {
              return client.getConfiguration().gatewayConfiguration.paypal.clientId;
            });
          };
          PayPalCheckout.prototype.loadPayPalSDK = function(options) {
            var idPromise, src;
            var loadPromise = new ExtendedPromise();
            var dataAttributes = options && options.dataAttributes || {};
            var userIdToken = dataAttributes["user-id-token"] || dataAttributes["data-user-id-token"];
            if (!userIdToken) {
              userIdToken = this._authorizationInformation.fingerprint && this._authorizationInformation.fingerprint.split("?")[0];
            }
            this._paypalScript = document.createElement("script");
            options = assign(
              {},
              {
                components: "buttons"
              },
              options
            );
            delete options.dataAttributes;
            if (options.vault) {
              options.intent = options.intent || "tokenize";
            } else {
              options.intent = options.intent || "authorize";
              options.currency = options.currency || "USD";
            }
            src = "https://www.paypal.com/sdk/js?";
            this._paypalScript.onload = function() {
              loadPromise.resolve();
            };
            Object.keys(dataAttributes).forEach(
              function(attribute) {
                this._paypalScript.setAttribute(
                  "data-" + attribute.replace(/^data\-/, ""),
                  dataAttributes[attribute]
                );
              }.bind(this)
            );
            if (options["client-id"]) {
              idPromise = Promise.resolve(options["client-id"]);
            } else {
              idPromise = this.getClientId();
            }
            idPromise.then(
              function(id) {
                options["client-id"] = id;
                if (this._autoSetDataUserIdToken && userIdToken) {
                  this._paypalScript.setAttribute("data-user-id-token", userIdToken);
                  this._attachPreloadPixel({
                    id,
                    userIdToken,
                    amount: dataAttributes.amount,
                    currency: options.currency,
                    merchantId: options["merchant-id"]
                  });
                }
                this._paypalScript.src = querystring.queryify(src, options);
                document.head.insertBefore(
                  this._paypalScript,
                  document.head.firstElementChild
                );
              }.bind(this)
            );
            return loadPromise.then(
              function() {
                return this;
              }.bind(this)
            );
          };
          PayPalCheckout.prototype._attachPreloadPixel = function(options) {
            var request;
            var id = options.id;
            var userIdToken = options.userIdToken;
            var env = this._authorizationInformation.environment;
            var subdomain = env === "production" ? "" : "sandbox.";
            var url = PAYPAL_SDK_PRELOAD_URL.replace("{ENV}", subdomain);
            var preloadOptions = {
              "client-id": id,
              "user-id-token": userIdToken
            };
            if (options.amount) {
              preloadOptions.amount = options.amount;
            }
            if (options.currency) {
              preloadOptions.currency = options.currency;
            }
            if (options.merchantId) {
              preloadOptions["merchant-id"] = options.merchantId;
            }
            request = new XMLHttpRequest();
            request.open("GET", querystring.queryify(url, preloadOptions));
            request.send();
          };
          PayPalCheckout.prototype._formatPaymentResourceData = function(options, config) {
            var key;
            var gatewayConfiguration = this._configuration.gatewayConfiguration;
            var intent = options.intent;
            var paymentResource = {
              // returnUrl and cancelUrl are required in hermes create_payment_resource route
              // but are not used by the PayPal sdk, except to redirect to an error page
              returnUrl: config.returnUrl || "https://www.paypal.com/checkoutnow/error",
              cancelUrl: config.cancelUrl || "https://www.paypal.com/checkoutnow/error",
              offerPaypalCredit: options.offerCredit === true,
              merchantAccountId: this._merchantAccountId,
              experienceProfile: {
                brandName: options.displayName || gatewayConfiguration.paypal.displayName,
                localeCode: options.locale,
                noShipping: (!options.enableShippingAddress).toString(),
                addressOverride: options.shippingAddressEditable === false,
                landingPageType: options.landingPageType
              },
              shippingOptions: options.shippingOptions
            };
            if (options.flow === "checkout") {
              paymentResource.amount = options.amount;
              paymentResource.currencyIsoCode = options.currency;
              paymentResource.requestBillingAgreement = options.requestBillingAgreement;
              if (intent) {
                if (intent === "capture") {
                  intent = "sale";
                }
                paymentResource.intent = intent;
              }
              if (options.hasOwnProperty("lineItems")) {
                paymentResource.lineItems = options.lineItems;
              }
              if (options.hasOwnProperty("vaultInitiatedCheckoutPaymentMethodToken")) {
                paymentResource.vaultInitiatedCheckoutPaymentMethodToken = options.vaultInitiatedCheckoutPaymentMethodToken;
              }
              if (options.hasOwnProperty("shippingOptions")) {
                paymentResource.shippingOptions = options.shippingOptions;
              }
              for (key in options.shippingAddressOverride) {
                if (options.shippingAddressOverride.hasOwnProperty(key)) {
                  paymentResource[key] = options.shippingAddressOverride[key];
                }
              }
              if (options.hasOwnProperty("billingAgreementDetails")) {
                paymentResource.billingAgreementDetails = options.billingAgreementDetails;
              }
            } else {
              paymentResource.shippingAddress = options.shippingAddressOverride;
              if (options.billingAgreementDescription) {
                paymentResource.description = options.billingAgreementDescription;
              }
            }
            this._riskCorrelationId = options.riskCorrelationId;
            if (options.riskCorrelationId) {
              paymentResource.correlationId = this._riskCorrelationId;
            }
            return paymentResource;
          };
          PayPalCheckout.prototype._verifyConsistentCurrency = function(options) {
            if (options.currency && options.hasOwnProperty("shippingOptions") && Array.isArray(options.shippingOptions)) {
              return options.shippingOptions.every(function(item) {
                return item.amount && item.amount.currency && options.currency.toLowerCase() === item.amount.currency.toLowerCase();
              });
            }
            return true;
          };
          PayPalCheckout.prototype._hasMissingOption = function(options, required) {
            var i, option;
            required = required || [];
            if (!options.hasOwnProperty("amount") && !options.hasOwnProperty("lineItems")) {
              return true;
            }
            for (i = 0; i < required.length; i++) {
              option = required[i];
              if (!options.hasOwnProperty(option)) {
                return true;
              }
            }
            return false;
          };
          PayPalCheckout.prototype._formatUpdatePaymentData = function(options) {
            var self2 = this;
            var paymentResource = {
              merchantAccountId: this._merchantAccountId,
              paymentId: options.paymentId || options.orderId,
              currencyIsoCode: options.currency
            };
            if (options.hasOwnProperty("amount")) {
              paymentResource.amount = options.amount;
            }
            if (options.hasOwnProperty("lineItems")) {
              paymentResource.lineItems = options.lineItems;
            }
            if (options.hasOwnProperty("shippingOptions")) {
              paymentResource.shippingOptions = options.shippingOptions;
            }
            if (options.hasOwnProperty("amountBreakdown")) {
              paymentResource.amountBreakdown = options.amountBreakdown;
            }
            if (options.hasOwnProperty("shippingAddress")) {
              analytics.sendEvent(
                self2._clientPromise,
                "paypal-checkout.updatePayment.shippingAddress.provided.by-the-merchant"
              );
              paymentResource.line1 = options.shippingAddress.line1;
              if (options.shippingAddress.hasOwnProperty("line2")) {
                paymentResource.line2 = options.shippingAddress.line2;
              }
              paymentResource.city = options.shippingAddress.city;
              paymentResource.state = options.shippingAddress.state;
              paymentResource.postalCode = options.shippingAddress.postalCode;
              paymentResource.countryCode = options.shippingAddress.countryCode;
              if (options.shippingAddress.hasOwnProperty("phone")) {
                paymentResource.phone = options.shippingAddress.phone;
              }
              if (options.shippingAddress.hasOwnProperty("recipientName")) {
                paymentResource.recipientName = options.shippingAddress.recipientName;
              }
            }
            return paymentResource;
          };
          PayPalCheckout.prototype._formatTokenizeData = function(options, params) {
            var clientConfiguration = this._configuration;
            var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
            var isTokenizationKey = clientConfiguration.authorizationType === "TOKENIZATION_KEY";
            var isVaultFlow = options.flow === "vault";
            var correlationId = this._riskCorrelationId || params.billingToken || params.ecToken;
            var data = {
              paypalAccount: {
                correlationId,
                options: {
                  validate: isVaultFlow && !isTokenizationKey && options.vault
                }
              }
            };
            if (isVaultFlow) {
              data.paypalAccount.billingAgreementToken = params.billingToken;
            } else {
              data.paypalAccount.paymentToken = params.paymentId || params.orderId;
              data.paypalAccount.payerId = params.payerId;
              data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;
              if (options.intent) {
                data.paypalAccount.intent = options.intent;
              }
            }
            if (this._merchantAccountId) {
              data.merchantAccountId = this._merchantAccountId;
            }
            return data;
          };
          PayPalCheckout.prototype._formatTokenizePayload = function(response2) {
            var payload2;
            var account = {};
            if (response2.paypalAccounts) {
              account = response2.paypalAccounts[0];
            }
            payload2 = {
              nonce: account.nonce,
              details: {},
              type: account.type
            };
            if (account.details && account.details.payerInfo) {
              payload2.details = account.details.payerInfo;
            }
            if (account.details && account.details.creditFinancingOffered) {
              payload2.creditFinancingOffered = account.details.creditFinancingOffered;
            }
            if (account.details && account.details.shippingOptionId) {
              payload2.shippingOptionId = account.details.shippingOptionId;
            }
            if (account.details && account.details.cobrandedCardLabel) {
              payload2.cobrandedCardLabel = account.details.cobrandedCardLabel;
            }
            return payload2;
          };
          PayPalCheckout.prototype.teardown = function() {
            var self2 = this;
            convertMethodsToError(this, methods(PayPalCheckout.prototype));
            if (this._paypalScript && this._paypalScript.parentNode) {
              this._paypalScript.parentNode.removeChild(this._paypalScript);
            }
            return this._frameServicePromise.catch(function() {
            }).then(function() {
              if (!self2._frameService) {
                return Promise.resolve();
              }
              return self2._frameService.teardown();
            });
          };
          module3.exports = wrapPromise.wrapPrototype(PayPalCheckout);
        }, { "../lib/analytics": 119, "../lib/assign": 121, "../lib/braintree-error": 124, "../lib/constants": 126, "../lib/convert-methods-to-error": 127, "../lib/convert-to-braintree-error": 128, "../lib/create-assets-url": 129, "../lib/create-authorization-data": 130, "../lib/create-deferred-client": 131, "../lib/frame-service/external": 139, "../lib/methods": 155, "../lib/querystring": 157, "../lib/use-min": 160, "../paypal/shared/constants": 180, "./errors": 175, "@braintree/extended-promise": 34, "@braintree/wrap-promise": 43 }], 178: [function(_dereq_, module3, exports3) {
          "use strict";
          var frameService = _dereq_("../../lib/frame-service/external");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var convertToBraintreeError = _dereq_("../../lib/convert-to-braintree-error");
          var useMin = _dereq_("../../lib/use-min");
          var once = _dereq_("../../lib/once");
          var VERSION = "3.102.0";
          var constants = _dereq_("../shared/constants");
          var INTEGRATION_TIMEOUT_MS = _dereq_("../../lib/constants").INTEGRATION_TIMEOUT_MS;
          var analytics = _dereq_("../../lib/analytics");
          var methods = _dereq_("../../lib/methods");
          var deferred = _dereq_("../../lib/deferred");
          var errors = _dereq_("../shared/errors");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var querystring = _dereq_("../../lib/querystring");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function PayPal(options) {
            this._client = options.client;
            this._assetsUrl = options.client.getConfiguration().gatewayConfiguration.paypal.assetsUrl + "/web/" + VERSION;
            this._isDebug = options.client.getConfiguration().isDebug;
            this._loadingFrameUrl = this._assetsUrl + "/html/paypal-landing-frame" + useMin(this._isDebug) + ".html";
            this._authorizationInProgress = false;
          }
          PayPal.prototype._initialize = function() {
            var self2 = this;
            var client = this._client;
            var failureTimeout = setTimeout(function() {
              analytics.sendEvent(client, "paypal.load.timed-out");
            }, INTEGRATION_TIMEOUT_MS);
            return new Promise(function(resolve) {
              frameService.create(
                {
                  name: constants.LANDING_FRAME_NAME,
                  dispatchFrameUrl: self2._assetsUrl + "/html/dispatch-frame" + useMin(self2._isDebug) + ".html",
                  openFrameUrl: self2._loadingFrameUrl
                },
                function(service) {
                  self2._frameService = service;
                  clearTimeout(failureTimeout);
                  analytics.sendEvent(client, "paypal.load.succeeded");
                  resolve(self2);
                }
              );
            });
          };
          PayPal.prototype.tokenize = function(options, callback) {
            var self2 = this;
            var client = this._client;
            var tokenizePromise, optionError;
            if (callback) {
              callback = once(deferred(callback));
            }
            if (!options || !constants.FLOW_ENDPOINTS.hasOwnProperty(options.flow)) {
              optionError = new BraintreeError(errors.PAYPAL_FLOW_OPTION_REQUIRED);
              if (callback) {
                callback(optionError);
                return this._frameService.createNoopHandler();
              }
              return Promise.reject(optionError);
            }
            tokenizePromise = new Promise(function(resolve, reject) {
              if (self2._authorizationInProgress) {
                analytics.sendEvent(client, "paypal.tokenization.error.already-opened");
                reject(new BraintreeError(errors.PAYPAL_TOKENIZATION_REQUEST_ACTIVE));
              } else {
                self2._authorizationInProgress = true;
                if (!window.popupBridge) {
                  analytics.sendEvent(client, "paypal.tokenization.opened");
                }
                if (options.offerCredit === true) {
                  analytics.sendEvent(client, "paypal.credit.offered");
                }
                if (options.offerPayLater === true) {
                  analytics.sendEvent(client, "paypal.paylater.offered");
                }
                self2._navigateFrameToAuth(options).catch(reject);
                self2._frameService.open(
                  {},
                  self2._createFrameServiceCallback(options, resolve, reject)
                );
              }
            });
            if (callback) {
              tokenizePromise.then(function(res) {
                callback(null, res);
              }).catch(callback);
              return this._frameService.createHandler({
                beforeClose: function() {
                  analytics.sendEvent(client, "paypal.tokenization.closed.by-merchant");
                }
              });
            }
            return tokenizePromise;
          };
          PayPal.prototype._createFrameServiceCallback = function(options, resolve, reject) {
            var self2 = this;
            var client = this._client;
            if (window.popupBridge) {
              return function(err, payload2) {
                var canceled = payload2 && payload2.path && payload2.path.substring(0, 7) === "/cancel";
                self2._authorizationInProgress = false;
                if (err || canceled) {
                  analytics.sendEvent(
                    client,
                    "paypal.tokenization.closed-popupbridge.by-user"
                  );
                  reject(new BraintreeError(errors.PAYPAL_POPUP_CLOSED));
                } else if (payload2) {
                  self2._tokenizePayPal(options, payload2.queryItems).then(resolve).catch(reject);
                }
              };
            }
            return function(err, params) {
              self2._authorizationInProgress = false;
              if (err) {
                if (err.code === "FRAME_SERVICE_FRAME_CLOSED") {
                  analytics.sendEvent(client, "paypal.tokenization.closed.by-user");
                  reject(new BraintreeError(errors.PAYPAL_POPUP_CLOSED));
                } else if (err.code && err.code.indexOf("FRAME_SERVICE_FRAME_OPEN_FAILED") > -1) {
                  reject(
                    new BraintreeError({
                      code: errors.PAYPAL_POPUP_OPEN_FAILED.code,
                      type: errors.PAYPAL_POPUP_OPEN_FAILED.type,
                      message: errors.PAYPAL_POPUP_OPEN_FAILED.message,
                      details: {
                        originalError: err
                      }
                    })
                  );
                }
              } else if (params) {
                self2._tokenizePayPal(options, params).then(resolve).catch(reject);
              }
            };
          };
          PayPal.prototype._tokenizePayPal = function(options, params) {
            var self2 = this;
            var client = this._client;
            if (!window.popupBridge) {
              this._frameService.redirect(this._loadingFrameUrl);
            }
            return client.request({
              endpoint: "payment_methods/paypal_accounts",
              method: "post",
              data: this._formatTokenizeData(options, params)
            }).then(function(response2) {
              var payload2 = self2._formatTokenizePayload(response2);
              if (window.popupBridge) {
                analytics.sendEvent(client, "paypal.tokenization.success-popupbridge");
              } else {
                analytics.sendEvent(client, "paypal.tokenization.success");
              }
              if (payload2.creditFinancingOffered) {
                analytics.sendEvent(client, "paypal.credit.accepted");
              }
              self2._frameService.close();
              return payload2;
            }).catch(function(err) {
              if (window.popupBridge) {
                analytics.sendEvent(client, "paypal.tokenization.failed-popupbridge");
              } else {
                analytics.sendEvent(client, "paypal.tokenization.failed");
              }
              self2._frameService.close();
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.type,
                  code: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.code,
                  message: errors.PAYPAL_ACCOUNT_TOKENIZATION_FAILED.message
                })
              );
            });
          };
          PayPal.prototype._formatTokenizePayload = function(response2) {
            var payload2;
            var account = {};
            if (response2.paypalAccounts) {
              account = response2.paypalAccounts[0];
            }
            payload2 = {
              nonce: account.nonce,
              details: {},
              type: account.type
            };
            if (account.details && account.details.payerInfo) {
              payload2.details = account.details.payerInfo;
            }
            if (account.details && account.details.creditFinancingOffered) {
              payload2.creditFinancingOffered = account.details.creditFinancingOffered;
            }
            return payload2;
          };
          PayPal.prototype._formatTokenizeData = function(options, params) {
            var clientConfiguration = this._client.getConfiguration();
            var gatewayConfiguration = clientConfiguration.gatewayConfiguration;
            var isTokenizationKey = clientConfiguration.authorizationType === "TOKENIZATION_KEY";
            var data = {
              paypalAccount: {
                correlationId: params.ba_token || params.token,
                options: {
                  validate: options.flow === "vault" && !isTokenizationKey
                }
              }
            };
            if (params.ba_token) {
              data.paypalAccount.billingAgreementToken = params.ba_token;
            } else {
              data.paypalAccount.paymentToken = params.paymentId;
              data.paypalAccount.payerId = params.PayerID;
              data.paypalAccount.unilateral = gatewayConfiguration.paypal.unvettedMerchant;
              if (options.hasOwnProperty("intent")) {
                data.paypalAccount.intent = options.intent;
              }
            }
            return data;
          };
          PayPal.prototype._navigateFrameToAuth = function(options) {
            var self2 = this;
            var client = this._client;
            var endpoint = "paypal_hermes/" + constants.FLOW_ENDPOINTS[options.flow];
            return client.request({
              endpoint,
              method: "post",
              data: this._formatPaymentResourceData(options)
            }).then(function(response2) {
              var redirectUrl;
              if (options.flow === "checkout") {
                redirectUrl = response2.paymentResource.redirectUrl;
              } else {
                redirectUrl = response2.agreementSetup.approvalUrl;
              }
              if (options.useraction === "commit") {
                redirectUrl = querystring.queryify(redirectUrl, {
                  useraction: "commit"
                });
              }
              if (window.popupBridge) {
                analytics.sendEvent(client, "paypal.tokenization.opened-popupbridge");
              }
              self2._frameService.redirect(redirectUrl);
            }).catch(function(err) {
              var status = err.details && err.details.httpStatus;
              self2._frameService.close();
              self2._authorizationInProgress = false;
              if (status === 422) {
                return Promise.reject(
                  new BraintreeError({
                    type: errors.PAYPAL_INVALID_PAYMENT_OPTION.type,
                    code: errors.PAYPAL_INVALID_PAYMENT_OPTION.code,
                    message: errors.PAYPAL_INVALID_PAYMENT_OPTION.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              }
              return Promise.reject(
                convertToBraintreeError(err, {
                  type: errors.PAYPAL_FLOW_FAILED.type,
                  code: errors.PAYPAL_FLOW_FAILED.code,
                  message: errors.PAYPAL_FLOW_FAILED.message
                })
              );
            });
          };
          PayPal.prototype._formatPaymentResourceData = function(options) {
            var key;
            var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
            var serviceId = this._frameService._serviceId;
            var paymentResource = {
              returnUrl: gatewayConfiguration.paypal.assetsUrl + "/web/" + VERSION + "/html/redirect-frame" + useMin(this._isDebug) + ".html?channel=" + serviceId,
              cancelUrl: gatewayConfiguration.paypal.assetsUrl + "/web/" + VERSION + "/html/cancel-frame" + useMin(this._isDebug) + ".html?channel=" + serviceId,
              offerPaypalCredit: options.offerCredit === true,
              offerPayLater: options.offerPayLater === true,
              experienceProfile: {
                brandName: options.displayName || gatewayConfiguration.paypal.displayName,
                localeCode: options.locale,
                noShipping: (!options.enableShippingAddress).toString(),
                addressOverride: options.shippingAddressEditable === false,
                landingPageType: options.landingPageType
              }
            };
            if (window.popupBridge && typeof window.popupBridge.getReturnUrlPrefix === "function") {
              paymentResource.returnUrl = window.popupBridge.getReturnUrlPrefix() + "return";
              paymentResource.cancelUrl = window.popupBridge.getReturnUrlPrefix() + "cancel";
            }
            if (options.flow === "checkout") {
              paymentResource.amount = options.amount;
              paymentResource.currencyIsoCode = options.currency;
              if (options.hasOwnProperty("intent")) {
                paymentResource.intent = options.intent;
              }
              for (key in options.shippingAddressOverride) {
                if (options.shippingAddressOverride.hasOwnProperty(key)) {
                  paymentResource[key] = options.shippingAddressOverride[key];
                }
              }
            } else {
              paymentResource.shippingAddress = options.shippingAddressOverride;
              if (options.billingAgreementDescription) {
                paymentResource.description = options.billingAgreementDescription;
              }
            }
            return paymentResource;
          };
          PayPal.prototype.closeWindow = function() {
            if (this._authorizationInProgress) {
              analytics.sendEvent(this._client, "paypal.tokenize.closed.by-merchant");
            }
            this._frameService.close();
          };
          PayPal.prototype.focusWindow = function() {
            this._frameService.focus();
          };
          PayPal.prototype.teardown = wrapPromise(function() {
            var self2 = this;
            self2._frameService.teardown();
            convertMethodsToError(self2, methods(PayPal.prototype));
            analytics.sendEvent(self2._client, "paypal.teardown-completed");
            return Promise.resolve();
          });
          module3.exports = PayPal;
        }, { "../../lib/analytics": 119, "../../lib/braintree-error": 124, "../../lib/constants": 126, "../../lib/convert-methods-to-error": 127, "../../lib/convert-to-braintree-error": 128, "../../lib/deferred": 132, "../../lib/frame-service/external": 139, "../../lib/methods": 155, "../../lib/once": 156, "../../lib/querystring": 157, "../../lib/use-min": 160, "../shared/constants": 180, "../shared/errors": 181, "@braintree/wrap-promise": 43 }], 179: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var errors = _dereq_("./shared/errors");
          var PayPal = _dereq_("./external/paypal");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "PayPal";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var pp;
              var config = client.getConfiguration();
              options.client = client;
              if (config.gatewayConfiguration.paypalEnabled !== true) {
                return Promise.reject(new BraintreeError(errors.PAYPAL_NOT_ENABLED));
              }
              analytics.sendEvent(options.client, "paypal.initialized");
              pp = new PayPal(options);
              return pp._initialize();
            });
          }
          function isSupported() {
            return true;
          }
          module3.exports = {
            create: wrapPromise(create),
            isSupported,
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./external/paypal": 178, "./shared/errors": 181, "@braintree/wrap-promise": 43 }], 180: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            LANDING_FRAME_NAME: "braintreepaypallanding",
            FLOW_ENDPOINTS: {
              checkout: "create_payment_resource",
              vault: "setup_billing_agreement"
            },
            REQUIRED_OPTIONS: ["paymentId", "currency"]
          };
        }, {}], 181: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            PAYPAL_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_NOT_ENABLED",
              message: "PayPal is not enabled for this merchant."
            },
            PAYPAL_TOKENIZATION_REQUEST_ACTIVE: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_TOKENIZATION_REQUEST_ACTIVE",
              message: "Another tokenization request is active."
            },
            PAYPAL_ACCOUNT_TOKENIZATION_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "PAYPAL_ACCOUNT_TOKENIZATION_FAILED",
              message: "Could not tokenize user's PayPal account."
            },
            PAYPAL_FLOW_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "PAYPAL_FLOW_FAILED",
              message: "Could not initialize PayPal flow."
            },
            PAYPAL_FLOW_OPTION_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_FLOW_OPTION_REQUIRED",
              message: "PayPal flow property is invalid or missing."
            },
            PAYPAL_POPUP_OPEN_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_POPUP_OPEN_FAILED",
              message: "PayPal popup failed to open, make sure to tokenize in response to a user action."
            },
            PAYPAL_POPUP_CLOSED: {
              type: BraintreeError.types.CUSTOMER,
              code: "PAYPAL_POPUP_CLOSED",
              message: "Customer closed PayPal popup before authorizing."
            },
            PAYPAL_INVALID_PAYMENT_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "PAYPAL_INVALID_PAYMENT_OPTION",
              message: "PayPal payment options are invalid."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 182: [function(_dereq_, module3, exports3) {
          "use strict";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var PreferredPaymentMethods = _dereq_("./preferred-payment-methods");
          var VERSION = "3.102.0";
          function create(options) {
            var name = "PreferredPaymentMethods";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var instance = new PreferredPaymentMethods();
              return instance.initialize(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "./preferred-payment-methods": 183, "@braintree/wrap-promise": 43 }], 183: [function(_dereq_, module3, exports3) {
          "use strict";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var analytics = _dereq_("../lib/analytics");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          function PreferredPaymentMethods() {
          }
          PreferredPaymentMethods.prototype.initialize = function(options) {
            var self2 = this;
            this._clientPromise = createDeferredClient.create({
              authorization: options.authorization,
              client: options.client,
              debug: options.debug,
              assetsUrl: createAssetsUrl.create(options.authorization),
              name: "PreferredPaymentMethods"
            }).catch(function(err) {
              self2._setupError = err;
              return Promise.reject(err);
            });
            analytics.sendEvent(
              this._clientPromise,
              "preferred-payment-methods.initialized"
            );
            return Promise.resolve(this);
          };
          PreferredPaymentMethods.prototype.fetchPreferredPaymentMethods = function() {
            var client;
            var self2 = this;
            return this._clientPromise.then(function(clientInstance2) {
              client = clientInstance2;
              return client.request({
                api: "graphQLApi",
                data: {
                  query: "query PreferredPaymentMethods { preferredPaymentMethods { paypalPreferred venmoPreferred } }"
                }
              });
            }).then(function(result) {
              var paypalPreferred = result.data.preferredPaymentMethods.paypalPreferred;
              var venmoPreferred = result.data.preferredPaymentMethods.venmoPreferred;
              analytics.sendEvent(
                client,
                "preferred-payment-methods.paypal.api-detected." + paypalPreferred
              );
              analytics.sendEvent(
                client,
                "preferred-payment-methods.venmo.api-detected." + venmoPreferred
              );
              return {
                paypalPreferred,
                venmoPreferred
              };
            }).catch(function() {
              if (self2._setupError) {
                return Promise.reject(self2._setupError);
              }
              analytics.sendEvent(client, "preferred-payment-methods.api-error");
              return {
                paypalPreferred: false,
                venmoPreferred: false
              };
            });
          };
          module3.exports = wrapPromise.wrapPrototype(PreferredPaymentMethods);
        }, { "../lib/analytics": 119, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "@braintree/wrap-promise": 43 }], 184: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var sepaErrors = _dereq_("../shared/errors");
          var frameService = _dereq_("../../lib/frame-service/external");
          var analytics = _dereq_("../../lib/analytics");
          var useMin = _dereq_("../../lib/use-min");
          var billingAddressOptions = _dereq_("../shared/constants").BILLING_ADDRESS_OPTIONS;
          var snakeCaseToCamelCase = _dereq_("../../lib/snake-case-to-camel-case");
          var POPUP_WIDTH = 400;
          var POPUP_HEIGHT = 570;
          function createMandate(client, options) {
            var data = {
              sepa_debit: {
                account_holder_name: options.accountHolderName,
                billing_address: {
                  country_code: options.countryCode
                },
                iban: options.iban,
                merchant_or_partner_customer_id: options.customerId,
                mandate_type: options.mandateType
              },
              locale: options.locale,
              cancel_url: options.cancelUrl,
              return_url: options.returnUrl,
              merchant_account_id: options.merchantAccountId
            };
            if (options.billingAddress) {
              billingAddressOptions.forEach(function(option) {
                var ccOption = snakeCaseToCamelCase(option);
                if (ccOption in options.billingAddress) {
                  data.sepa_debit.billing_address[option] = options.billingAddress[ccOption];
                }
              });
            }
            return client.request({
              api: "clientApi",
              method: "post",
              endpoint: "sepa_debit",
              data
            }).then(function(response2) {
              var sepaDebitAccount = response2.message.body.sepaDebitAccount;
              if (!sepaDebitAccount) {
                throw new BraintreeError(sepaErrors.SEPA_CREATE_MANDATE_FAILED);
              }
              return {
                approvalUrl: sepaDebitAccount.approvalUrl,
                last4: sepaDebitAccount.last4,
                bankReferenceToken: sepaDebitAccount.bankReferenceToken
              };
            }).catch(function() {
              throw new BraintreeError(sepaErrors.SEPA_CREATE_MANDATE_FAILED);
            });
          }
          function openPopup(client, options) {
            var popupName = "sepadirectdebit";
            var assetsBaseUrl = options.assetsUrl + "/html";
            var debug = options.debug || false;
            return new Promise(function(resolve, reject) {
              var popupLocation = centeredPopupDimensions();
              frameService.create(
                {
                  name: popupName,
                  dispatchFrameUrl: assetsBaseUrl + "/dispatch-frame" + useMin(debug) + ".html",
                  openFrameUrl: assetsBaseUrl + "/sepa-landing-frame" + useMin(debug) + ".html",
                  top: popupLocation.top,
                  left: popupLocation.left,
                  height: POPUP_HEIGHT,
                  width: POPUP_WIDTH
                },
                function(frameServiceInstance) {
                  analytics.sendEvent(client, "sepa.popup.initialized");
                  frameServiceInstance.open({}, function(err, params) {
                    if (mandateApproved(params)) {
                      frameServiceInstance.close();
                      return resolve();
                    }
                    if (customerCanceled(params, err)) {
                      frameServiceInstance.close();
                      return reject(
                        new BraintreeError(sepaErrors.SEPA_CUSTOMER_CANCELED)
                      );
                    }
                    frameServiceInstance.close();
                    return reject(
                      new BraintreeError(sepaErrors.SEPA_TOKENIZATION_FAILED)
                    );
                  });
                  frameServiceInstance.redirect(options.approvalUrl);
                }
              );
            });
          }
          function mandateApproved(params) {
            return params && params.success;
          }
          function customerCanceled(params, error) {
            return params && params.cancel || error && error.code === "FRAME_SERVICE_FRAME_CLOSED";
          }
          function centeredPopupDimensions() {
            var popupTop = Math.round((window.outerHeight - POPUP_HEIGHT) / 2) + window.screenTop;
            var popupLeft = Math.round((window.outerWidth - POPUP_WIDTH) / 2) + window.screenLeft;
            return {
              top: popupTop,
              left: popupLeft
            };
          }
          function handleApproval(client, options) {
            var data = {
              sepa_debit_account: {
                last_4: options.last4,
                merchant_or_partner_customer_id: options.customerId,
                bank_reference_token: options.bankReferenceToken,
                mandate_type: options.mandateType
              },
              merchant_account_id: options.merchantAccountId
            };
            return client.request({
              api: "clientApi",
              method: "post",
              endpoint: "payment_methods/sepa_debit_accounts",
              data
            }).then(function(response2) {
              if (!response2.nonce) {
                throw new BraintreeError(sepaErrors.SEPA_TRANSACTION_FAILED);
              }
              return {
                nonce: response2.nonce,
                ibanLastFour: options.last4,
                customerId: options.customerId,
                mandateType: options.mandateType
              };
            }).catch(function() {
              throw new BraintreeError(sepaErrors.SEPA_TRANSACTION_FAILED);
            });
          }
          module3.exports = {
            createMandate,
            openPopup,
            handleApproval,
            POPUP_WIDTH,
            POPUP_HEIGHT
          };
        }, { "../../lib/analytics": 119, "../../lib/braintree-error": 124, "../../lib/frame-service/external": 139, "../../lib/snake-case-to-camel-case": 159, "../../lib/use-min": 160, "../shared/constants": 187, "../shared/errors": 188 }], 185: [function(_dereq_, module3, exports3) {
          "use strict";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var sepaErrors = _dereq_("../shared/errors");
          var constants = _dereq_("../shared/constants");
          var mandates = _dereq_("./mandate");
          var hasMissingOption = _dereq_("../shared/has-missing-option");
          var analytics = _dereq_("../../lib/analytics");
          var VERSION = "3.102.0";
          var assign = _dereq_("../../lib/assign").assign;
          function SEPA(options) {
            var getConfiguration = options.client.getConfiguration();
            this._client = options.client;
            this._assetsUrl = getConfiguration.gatewayConfiguration.assetsUrl + "/web/" + VERSION;
            this._isDebug = getConfiguration.isDebug;
            this._returnUrl = this._assetsUrl + "/html/redirect-frame.html?success=1";
            this._cancelUrl = this._assetsUrl + "/html/redirect-frame.html?cancel=1";
            analytics.sendEvent(this._client, "sepa.component.initialized");
          }
          SEPA.prototype.tokenize = function(options) {
            var self2 = this;
            var createMandateOptions = assign(
              { cancelUrl: self2._cancelUrl, returnUrl: self2._returnUrl },
              options
            );
            if (!options || hasMissingOption(options, constants.REQUIRED_OPTIONS)) {
              analytics.sendEvent(self2._client, "sepa.input-validation.missing-options");
              return Promise.reject(
                new BraintreeError(sepaErrors.SEPA_TOKENIZE_MISSING_REQUIRED_OPTION)
              );
            }
            if (!constants.MANDATE_TYPE_ENUM.includes(options.mandateType)) {
              analytics.sendEvent(self2._client, "sepa.input-validation.invalid-mandate");
              return Promise.reject(
                new BraintreeError(sepaErrors.SEPA_INVALID_MANDATE_TYPE)
              );
            }
            return mandates.createMandate(self2._client, createMandateOptions).then(function(mandateResponse) {
              analytics.sendEvent(self2._client, "sepa.create-mandate.success");
              options.last4 = mandateResponse.last4;
              options.bankReferenceToken = mandateResponse.bankReferenceToken;
              return mandates.openPopup(self2._client, {
                approvalUrl: mandateResponse.approvalUrl,
                assetsUrl: self2._assetsUrl
              });
            }).then(function() {
              analytics.sendEvent(self2._client, "sepa.mandate.approved");
              return mandates.handleApproval(self2._client, {
                bankReferenceToken: options.bankReferenceToken,
                last4: options.last4,
                customerId: options.customerId,
                mandateType: options.mandateType,
                merchantAccountId: options.merchantAccountId
              });
            }).then(function(approval) {
              analytics.sendEvent(self2._client, "sepa.tokenization.success");
              return Promise.resolve(approval);
            }).catch(function(err) {
              analytics.sendEvent(self2._client, "sepa." + err.details + ".failed");
              return Promise.reject(err);
            });
          };
          module3.exports = wrapPromise.wrapPrototype(SEPA);
        }, { "../../lib/analytics": 119, "../../lib/assign": 121, "../../lib/braintree-error": 124, "../shared/constants": 187, "../shared/errors": 188, "../shared/has-missing-option": 189, "./mandate": 184, "@braintree/wrap-promise": 43 }], 186: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var SEPA = _dereq_("./external/sepa");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var VERSION = "3.102.0";
          function create(options) {
            var name = "SEPA";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              options.client = client;
              analytics.sendEvent(options.client, "sepa.client.initialized");
              return new SEPA(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./external/sepa": 185, "@braintree/wrap-promise": 43 }], 187: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            REQUIRED_OPTIONS: [
              "iban",
              "merchantAccountId",
              "mandateType",
              "customerId",
              "accountHolderName",
              "countryCode"
            ],
            BILLING_ADDRESS_OPTIONS: [
              "address_line_1",
              "address_line_2",
              "admin_area_1",
              "admin_area_2",
              "postal_code"
            ],
            MANDATE_TYPE_ENUM: ["ONE_OFF", "RECURRENT"]
          };
        }, {}], 188: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            SEPA_CREATE_MANDATE_FAILED: {
              type: BraintreeError.types.MERCHANT,
              code: "SEPA_CREATE_MANDATE_FAILED",
              message: "SEPA create mandate failed.",
              details: "create-mandate"
            },
            SEPA_CUSTOMER_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "SEPA_CUSTOMER_CANCELED",
              message: "User canceled SEPA authorization",
              details: "customer-canceled"
            },
            SEPA_INVALID_MANDATE_TYPE: {
              type: BraintreeError.types.MERCHANT,
              code: "SEPA_INVALID_MANDATE_TYPE",
              message: "SEPA mandate type is invalid"
            },
            SEPA_TOKENIZATION_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "SEPA_TOKENIZATION_FAILED",
              message: "SEPA encountered a problem",
              details: "open-popup"
            },
            SEPA_TOKENIZE_MISSING_REQUIRED_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "SEPA_TOKENIZE_MISSING_REQUIRED_OPTION",
              message: "Missing required option for tokenize."
            },
            SEPA_TRANSACTION_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "SEPA_TRANSACTION_FAILED",
              message: "SEPA transaction failed",
              details: "handle-approval"
            }
          };
        }, { "../../lib/braintree-error": 124 }], 189: [function(_dereq_, module3, exports3) {
          "use strict";
          function hasMissingOption(options, required) {
            var i, option;
            required = required || [];
            for (i = 0; i < required.length; i++) {
              option = required[i];
              if (!options.hasOwnProperty(option)) {
                return true;
              }
            }
            return false;
          }
          module3.exports = hasMissingOption;
        }, {}], 190: [function(_dereq_, module3, exports3) {
          "use strict";
          var assign = _dereq_("../../../lib/assign").assign;
          var analytics = _dereq_("../../../lib/analytics");
          var BraintreeError = _dereq_("../../../lib/braintree-error");
          var isVerifiedDomain = _dereq_("../../../lib/is-verified-domain");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var EventEmitter = _dereq_("@braintree/event-emitter");
          var errors = _dereq_("../../shared/errors");
          var iFramer = _dereq_("@braintree/iframer");
          var Bus = _dereq_("framebus");
          var constants = _dereq_("../../shared/constants");
          var uuid = _dereq_("@braintree/uuid");
          var events = _dereq_("../../shared/events");
          var useMin = _dereq_("../../../lib/use-min");
          var BUS_CONFIGURATION_REQUEST_EVENT = _dereq_("../../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT;
          var VERSION = "3.102.0";
          var IFRAME_HEIGHT = 400;
          var IFRAME_WIDTH = 400;
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function BaseFramework(options) {
            EventEmitter.call(this);
            this._client = options.client;
            this._createPromise = options.createPromise;
            this._createOptions = options;
            if (this._client) {
              this._isDebug = this._client.getConfiguration().isDebug;
              this._assetsUrl = this._client.getConfiguration().gatewayConfiguration.assetsUrl;
            } else {
              this._isDebug = Boolean(options.isDebug);
              this._assetsUrl = options.assetsUrl;
            }
            this._assetsUrl = this._assetsUrl + "/web/" + VERSION;
          }
          EventEmitter.createChild(BaseFramework);
          BaseFramework.prototype._waitForClient = function() {
            if (this._client) {
              return Promise.resolve();
            }
            return this._createPromise.then(
              function(client) {
                this._client = client;
              }.bind(this)
            );
          };
          BaseFramework.prototype.setUpEventListeners = function() {
            throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
          };
          BaseFramework.prototype.verifyCard = function(options, privateOptions) {
            var formattedOptions, error;
            var self2 = this;
            privateOptions = privateOptions || {};
            error = this._checkForVerifyCardError(options, privateOptions);
            if (error) {
              return Promise.reject(error);
            }
            this._verifyCardInProgress = true;
            formattedOptions = this._formatVerifyCardOptions(options);
            return this._formatLookupData(formattedOptions).then(function(data) {
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.started"
              );
              return self2._performLookup(formattedOptions.nonce, data);
            }).then(function(response2) {
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.3ds-version." + response2.lookup.threeDSecureVersion
              );
              return self2._onLookupComplete(response2, formattedOptions);
            }).then(function(response2) {
              return self2.initializeChallengeWithLookupResponse(
                response2,
                formattedOptions
              );
            }).then(function(payload2) {
              self2._resetVerificationState();
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.completed"
              );
              return payload2;
            }).catch(function(err) {
              self2._resetVerificationState();
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.failed"
              );
              return Promise.reject(err);
            });
          };
          BaseFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function() {
            throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
          };
          BaseFramework.prototype._presentChallenge = function() {
            throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
          };
          BaseFramework.prototype.prepareLookup = function() {
            throw new BraintreeError(errors.THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED);
          };
          BaseFramework.prototype._resetVerificationState = function() {
            this._verifyCardInProgress = false;
            this._verifyCardPromisePlus = null;
            if (typeof this._reloadThreeDSecure === "function") {
              this._reloadThreeDSecure();
            }
          };
          BaseFramework.prototype._performLookup = function(nonce, data) {
            var self2 = this;
            var url = "payment_methods/" + nonce + "/three_d_secure/lookup";
            return this._waitForClient().then(function() {
              return self2._client.request({
                endpoint: url,
                method: "post",
                data
              }).catch(function(err) {
                var status = err && err.details && err.details.httpStatus;
                var analyticsMessage = "three-d-secure.verification-flow.lookup-failed";
                var lookupError;
                if (status === 404) {
                  lookupError = errors.THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR;
                  analyticsMessage += ".404";
                } else if (status === 422) {
                  lookupError = errors.THREEDS_LOOKUP_VALIDATION_ERROR;
                  analyticsMessage += ".422";
                } else {
                  lookupError = errors.THREEDS_LOOKUP_ERROR;
                }
                analytics.sendEvent(self2._createPromise, analyticsMessage);
                return Promise.reject(
                  new BraintreeError({
                    type: lookupError.type,
                    code: lookupError.code,
                    message: lookupError.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              });
            });
          };
          BaseFramework.prototype._checkForVerifyCardError = function(options, privateOptions) {
            var errorOption;
            if (this._verifyCardInProgress === true) {
              return new BraintreeError(errors.THREEDS_AUTHENTICATION_IN_PROGRESS);
            } else if (!options.nonce) {
              errorOption = "a nonce";
            } else if (!options.amount) {
              errorOption = "an amount";
            }
            if (!errorOption) {
              errorOption = this._checkForFrameworkSpecificVerifyCardErrors(
                options,
                privateOptions
              );
            }
            if (errorOption) {
              return new BraintreeError({
                type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
                code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
                message: "verifyCard options must include " + errorOption + "."
              });
            }
            return null;
          };
          BaseFramework.prototype.initializeChallengeWithLookupResponse = function(lookupResponse, options) {
            var self2 = this;
            options = options || {};
            this._lookupPaymentMethod = lookupResponse.paymentMethod;
            self2._verifyCardPromisePlus = self2._verifyCardPromisePlus || new ExtendedPromise();
            self2._handleLookupResponse(lookupResponse, options);
            return self2._verifyCardPromisePlus.then(function(payload2) {
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.liability-shifted." + String(payload2.liabilityShifted)
              );
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.liability-shift-possible." + String(payload2.liabilityShiftPossible)
              );
              return payload2;
            });
          };
          BaseFramework.prototype._handleLookupResponse = function(lookupResponse, options) {
            var challengeShouldBePresented = Boolean(
              lookupResponse.lookup && lookupResponse.lookup.acsUrl
            );
            var details;
            analytics.sendEvent(
              this._createPromise,
              "three-d-secure.verification-flow.challenge-presented." + String(challengeShouldBePresented)
            );
            if (challengeShouldBePresented) {
              this._presentChallenge(lookupResponse, options);
            } else {
              details = this._formatAuthResponse(
                lookupResponse.paymentMethod,
                lookupResponse.threeDSecureInfo
              );
              details.verificationDetails = lookupResponse.threeDSecureInfo;
              this._verifyCardPromisePlus.resolve(details);
            }
          };
          BaseFramework.prototype._onLookupComplete = function(response2) {
            this._lookupPaymentMethod = response2.paymentMethod;
            this._verifyCardPromisePlus = new ExtendedPromise();
            return Promise.resolve(response2);
          };
          BaseFramework.prototype._formatAuthResponse = function(paymentMethod, threeDSecureInfo) {
            return {
              nonce: paymentMethod.nonce,
              type: paymentMethod.type,
              binData: paymentMethod.binData,
              details: paymentMethod.details,
              description: paymentMethod.description && paymentMethod.description.replace(/\+/g, " "),
              liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
              liabilityShiftPossible: threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
              threeDSecureInfo: paymentMethod.threeDSecureInfo
            };
          };
          BaseFramework.prototype._formatVerifyCardOptions = function(options) {
            return assign({}, options);
          };
          BaseFramework.prototype._formatLookupData = function(options) {
            var data = {
              amount: options.amount
            };
            if (options.collectDeviceData === true) {
              data.browserColorDepth = window.screen.colorDepth;
              data.browserJavaEnabled = window.navigator.javaEnabled();
              data.browserJavascriptEnabled = true;
              data.browserLanguage = window.navigator.language;
              data.browserScreenHeight = window.screen.height;
              data.browserScreenWidth = window.screen.width;
              data.browserTimeZone = (/* @__PURE__ */ new Date()).getTimezoneOffset();
              data.deviceChannel = "Browser";
            }
            return Promise.resolve(data);
          };
          BaseFramework.prototype._handleV1AuthResponse = function(data) {
            var authResponse = JSON.parse(data.auth_response);
            if (authResponse.success) {
              this._verifyCardPromisePlus.resolve(
                this._formatAuthResponse(
                  authResponse.paymentMethod,
                  authResponse.threeDSecureInfo
                )
              );
            } else if (authResponse.threeDSecureInfo && authResponse.threeDSecureInfo.liabilityShiftPossible) {
              this._verifyCardPromisePlus.resolve(
                this._formatAuthResponse(
                  this._lookupPaymentMethod,
                  authResponse.threeDSecureInfo
                )
              );
            } else {
              this._verifyCardPromisePlus.reject(
                new BraintreeError({
                  type: BraintreeError.types.UNKNOWN,
                  code: "UNKNOWN_AUTH_RESPONSE",
                  message: authResponse.error.message
                })
              );
            }
          };
          BaseFramework.prototype.cancelVerifyCard = function() {
            var response2, threeDSecureInfo;
            this._verifyCardInProgress = false;
            if (!this._lookupPaymentMethod) {
              return Promise.reject(
                new BraintreeError(errors.THREEDS_NO_VERIFICATION_PAYLOAD)
              );
            }
            threeDSecureInfo = this._lookupPaymentMethod.threeDSecureInfo;
            response2 = assign({}, this._lookupPaymentMethod, {
              liabilityShiftPossible: threeDSecureInfo && threeDSecureInfo.liabilityShiftPossible,
              liabilityShifted: threeDSecureInfo && threeDSecureInfo.liabilityShifted,
              verificationDetails: threeDSecureInfo && threeDSecureInfo.verificationDetails
            });
            return Promise.resolve(response2);
          };
          BaseFramework.prototype._setupV1Bus = function(options) {
            var clientConfiguration = this._client.getConfiguration();
            var parentURL = window.location.href.split("#")[0];
            var lookupResponse = options.lookupResponse;
            var channel = uuid();
            var bus = new Bus({
              channel,
              verifyDomain: isVerifiedDomain
            });
            var authenticationCompleteBaseUrl = this._assetsUrl + "/html/three-d-secure-authentication-complete-frame.html?channel=" + encodeURIComponent(channel) + "&";
            bus.on(BUS_CONFIGURATION_REQUEST_EVENT, function(reply) {
              reply({
                clientConfiguration,
                nonce: options.nonce,
                acsUrl: lookupResponse.acsUrl,
                pareq: lookupResponse.pareq,
                termUrl: lookupResponse.termUrl + "&three_d_secure_version=" + VERSION + "&authentication_complete_base_url=" + encodeURIComponent(authenticationCompleteBaseUrl),
                md: lookupResponse.md,
                parentUrl: parentURL
              });
            });
            bus.on(events.AUTHENTICATION_COMPLETE, options.handleAuthResponse);
            return bus;
          };
          BaseFramework.prototype._setupV1Iframe = function(options) {
            var url = this._assetsUrl + "/html/three-d-secure-bank-frame" + useMin(this._isDebug) + ".html?showLoader=" + options.showLoader;
            var bankIframe = iFramer({
              src: url,
              height: IFRAME_HEIGHT,
              width: IFRAME_WIDTH,
              name: constants.LANDING_FRAME_NAME + "_" + this._v1Bus.channel,
              title: "3D Secure Authorization Frame"
            });
            return bankIframe;
          };
          BaseFramework.prototype._setupV1Elements = function(options) {
            this._v1Bus = this._setupV1Bus(options);
            this._v1Iframe = this._setupV1Iframe(options);
          };
          BaseFramework.prototype._teardownV1Elements = function() {
            if (this._v1Bus) {
              this._v1Bus.teardown();
              this._v1Bus = null;
            }
            if (this._v1Iframe && this._v1Iframe.parentNode) {
              this._v1Iframe.parentNode.removeChild(this._v1Iframe);
              this._v1Iframe = null;
            }
            if (this._onV1Keyup) {
              document.removeEventListener("keyup", this._onV1Keyup);
              this._onV1Keyup = null;
            }
          };
          BaseFramework.prototype.teardown = function() {
            analytics.sendEvent(this._createPromise, "three-d-secure.teardown-completed");
            this._teardownV1Elements();
            return Promise.resolve();
          };
          module3.exports = BaseFramework;
        }, { "../../../lib/analytics": 119, "../../../lib/assign": 121, "../../../lib/braintree-error": 124, "../../../lib/constants": 126, "../../../lib/is-verified-domain": 153, "../../../lib/use-min": 160, "../../shared/constants": 199, "../../shared/errors": 200, "../../shared/events": 201, "@braintree/event-emitter": 33, "@braintree/extended-promise": 34, "@braintree/iframer": 35, "@braintree/uuid": 39, "framebus": 52 }], 191: [function(_dereq_, module3, exports3) {
          "use strict";
          var SongbirdFramework = _dereq_("./songbird");
          function Bootstrap3ModalFramework(options) {
            SongbirdFramework.call(this, options);
          }
          Bootstrap3ModalFramework.prototype = Object.create(
            SongbirdFramework.prototype,
            {
              constructor: SongbirdFramework
            }
          );
          Bootstrap3ModalFramework.prototype._createV1IframeModalElement = function(iframe) {
            var modal = document.createElement("div");
            modal.innerHTML = '<div class="modal fade in" tabindex="-1" role="dialog" aria-labelledby="CCAFrameModal-label" aria-hidden="true" style="display: block;"><div class="modal-dialog" style="width:440px;z-index:999999;"><div class="modal-content"><div class="modal-body" data-braintree-v1-fallback-iframe-container><button type="button" data-braintree-v1-fallback-close-button class="close" data-dismiss="modal" aria-hidden="true">\xD7</button></div></div></div><div data-braintree-v1-fallback-backdrop style="position: fixed;cursor: pointer;z-index: 999998;top: 0;left: 0;width: 100%;height: 100%;"></div></div>';
            modal.querySelector("[data-braintree-v1-fallback-iframe-container]").appendChild(iframe);
            return modal;
          };
          Bootstrap3ModalFramework.prototype._createCardinalConfigurationOptions = function(setupOptions) {
            var options = SongbirdFramework.prototype._createCardinalConfigurationOptions.call(
              this,
              setupOptions
            );
            options.payment.framework = "bootstrap3";
            return options;
          };
          module3.exports = Bootstrap3ModalFramework;
        }, { "./songbird": 196 }], 192: [function(_dereq_, module3, exports3) {
          "use strict";
          var SongbirdFramework = _dereq_("./songbird");
          function CardinalModalFramework(options) {
            SongbirdFramework.call(this, options);
          }
          CardinalModalFramework.prototype = Object.create(SongbirdFramework.prototype, {
            constructor: SongbirdFramework
          });
          CardinalModalFramework.prototype._createV1IframeModalElement = function(iframe) {
            var modal = document.createElement("div");
            var addCloseButton = Boolean(
              this._createOptions && this._createOptions.cardinalSDKConfig && this._createOptions.cardinalSDKConfig.payment && this._createOptions.cardinalSDKConfig.payment.displayExitButton
            );
            modal.innerHTML = `<div style="position: fixed;z-index: 999999;top: 50%;left: 50%;padding: 24px 20px;transform: translate(-50%,-50%);border-radius: 2px;background: #fff;max-width: 100%;overflow: auto;"><div><button data-braintree-v1-fallback-close-button style="font-family: Helvetica,Arial,sans-serif;font-size: 25px;line-height: 12px;position: absolute;top: 2px;right: 0px;cursor: pointer;color: #999;border: 0;outline: none;background: none;" onMouseOver="this.style.color='#000'" onMouseOut="this.style.color='#999'">\xD7</button></div><div data-braintree-v1-fallback-iframe-container style="height: 400px;"></div></div><div data-braintree-v1-fallback-backdrop style="position: fixed;z-index: 999998;cursor: pointer;top: 0;left: 0;width: 100%;height: 100%;transition: opacity 1ms ease;background: rgba(0,0,0,.6);"></div>`;
            if (!addCloseButton) {
              modal.querySelector(
                "[data-braintree-v1-fallback-close-button]"
              ).style.display = "none";
            }
            modal.querySelector("[data-braintree-v1-fallback-iframe-container]").appendChild(iframe);
            return modal;
          };
          module3.exports = CardinalModalFramework;
        }, { "./songbird": 196 }], 193: [function(_dereq_, module3, exports3) {
          "use strict";
          var LegacyFramework = _dereq_("./legacy");
          var CardinalModalFramework = _dereq_("./cardinal-modal");
          var Bootstrap3ModalFramework = _dereq_("./bootstrap3-modal");
          var InlineIframeFramework = _dereq_("./inline-iframe");
          module3.exports = {
            legacy: LegacyFramework,
            "cardinal-modal": CardinalModalFramework,
            "bootstrap3-modal": Bootstrap3ModalFramework,
            "inline-iframe": InlineIframeFramework
          };
        }, { "./bootstrap3-modal": 191, "./cardinal-modal": 192, "./inline-iframe": 194, "./legacy": 195 }], 194: [function(_dereq_, module3, exports3) {
          "use strict";
          var SongbirdFramework = _dereq_("./songbird");
          var BraintreeError = _dereq_("../../../lib/braintree-error");
          var errors = _dereq_("../../shared/errors");
          var enumerate = _dereq_("../../../lib/enumerate");
          function InlineIframeFramework(options) {
            SongbirdFramework.call(this, options);
          }
          InlineIframeFramework.prototype = Object.create(SongbirdFramework.prototype, {
            constructor: SongbirdFramework
          });
          InlineIframeFramework.events = enumerate(
            ["AUTHENTICATION_IFRAME_AVAILABLE"],
            "inline-iframe-framework:"
          );
          InlineIframeFramework.prototype.setUpEventListeners = function(reply) {
            SongbirdFramework.prototype.setUpEventListeners.call(this, reply);
            this.on(
              InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
              function(payload2, next) {
                reply("authentication-iframe-available", payload2, next);
              }
            );
          };
          InlineIframeFramework.prototype._createCardinalConfigurationOptions = function(setupOptions) {
            var options = SongbirdFramework.prototype._createCardinalConfigurationOptions.call(
              this,
              setupOptions
            );
            options.payment.framework = "inline";
            return options;
          };
          InlineIframeFramework.prototype._addV1IframeToPage = function() {
            this._emit(
              InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
              {
                element: this._v1Modal
              },
              function() {
              }
            );
          };
          InlineIframeFramework.prototype._setupFrameworkSpecificListeners = function() {
            this.setCardinalListener("ui.inline.setup", this._onInlineSetup.bind(this));
          };
          InlineIframeFramework.prototype._onInlineSetup = function(htmlTemplate, details, resolve, reject) {
            var container, hasError;
            if (!htmlTemplate || !details) {
              hasError = true;
            } else if (details.paymentType !== "CCA") {
              hasError = true;
            } else if (!(details.data.mode === "suppress" || details.data.mode === "static")) {
              hasError = true;
            }
            if (hasError) {
              reject(new BraintreeError(errors.THREEDS_INLINE_IFRAME_DETAILS_INCORRECT));
              return;
            }
            container = document.createElement("div");
            container.innerHTML = htmlTemplate;
            if (details.data.mode === "suppress") {
              container.style.display = "none";
              document.body.appendChild(container);
              resolve();
            } else if (details.data.mode === "static") {
              this._emit(
                InlineIframeFramework.events.AUTHENTICATION_IFRAME_AVAILABLE,
                {
                  element: container
                },
                function() {
                  resolve();
                }
              );
            }
          };
          module3.exports = InlineIframeFramework;
        }, { "../../../lib/braintree-error": 124, "../../../lib/enumerate": 134, "../../shared/errors": 200, "./songbird": 196 }], 195: [function(_dereq_, module3, exports3) {
          "use strict";
          var BaseFramework = _dereq_("./base");
          var deferred = _dereq_("../../../lib/deferred");
          function LegacyFramework(options) {
            BaseFramework.call(this, options);
          }
          LegacyFramework.prototype = Object.create(BaseFramework.prototype, {
            constructor: LegacyFramework
          });
          LegacyFramework.prototype.setUpEventListeners = function() {
          };
          LegacyFramework.prototype.transformV1CustomerBillingAddress = function(customer) {
            customer.billingAddress.line1 = customer.billingAddress.streetAddress;
            customer.billingAddress.line2 = customer.billingAddress.extendedAddress;
            customer.billingAddress.city = customer.billingAddress.locality;
            customer.billingAddress.state = customer.billingAddress.region;
            customer.billingAddress.countryCode = customer.billingAddress.countryCodeAlpha2;
            delete customer.billingAddress.streetAddress;
            delete customer.billingAddress.extendedAddress;
            delete customer.billingAddress.locality;
            delete customer.billingAddress.region;
            delete customer.billingAddress.countryCodeAlpha2;
            return customer;
          };
          LegacyFramework.prototype._createIframe = function(options) {
            var self2 = this;
            this._setupV1Elements({
              nonce: options.nonce,
              lookupResponse: options.lookupResponse,
              showLoader: options.showLoader,
              handleAuthResponse: function(data) {
                self2._handleAuthResponse(data, options);
              }
            });
            return this._v1Iframe;
          };
          LegacyFramework.prototype._handleAuthResponse = function(data, options) {
            this._v1Bus.teardown();
            options.removeFrame();
            deferred(
              function() {
                this._handleV1AuthResponse(data);
              }.bind(this)
            )();
          };
          LegacyFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function(options) {
            var errorOption;
            if (typeof options.addFrame !== "function") {
              errorOption = "an addFrame function";
            } else if (typeof options.removeFrame !== "function") {
              errorOption = "a removeFrame function";
            }
            return errorOption;
          };
          LegacyFramework.prototype._formatVerifyCardOptions = function(options) {
            var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(
              this,
              options
            );
            modifiedOptions.addFrame = deferred(options.addFrame);
            modifiedOptions.removeFrame = deferred(options.removeFrame);
            modifiedOptions.showLoader = options.showLoader !== false;
            return modifiedOptions;
          };
          LegacyFramework.prototype._formatLookupData = function(options) {
            var self2 = this;
            return BaseFramework.prototype._formatLookupData.call(this, options).then(function(data) {
              if (options.customer && options.customer.billingAddress) {
                data.customer = self2.transformV1CustomerBillingAddress(
                  options.customer
                );
              }
              return data;
            });
          };
          LegacyFramework.prototype._presentChallenge = function(lookupResponse, options) {
            options.addFrame(
              null,
              this._createIframe({
                showLoader: options.showLoader,
                lookupResponse: lookupResponse.lookup,
                nonce: lookupResponse.paymentMethod.nonce,
                removeFrame: options.removeFrame
              })
            );
          };
          module3.exports = LegacyFramework;
        }, { "../../../lib/deferred": 132, "./base": 190 }], 196: [function(_dereq_, module3, exports3) {
          "use strict";
          var BaseFramework = _dereq_("./base");
          var assign = _dereq_("../../../lib/assign").assign;
          var deferred = _dereq_("../../../lib/deferred");
          var BraintreeError = _dereq_("../../../lib/braintree-error");
          var convertToBraintreeError = _dereq_("../../../lib/convert-to-braintree-error");
          var analytics = _dereq_("../../../lib/analytics");
          var assets = _dereq_("../../../lib/assets");
          var errors = _dereq_("../../shared/errors");
          var enumerate = _dereq_("../../../lib/enumerate");
          var constants = _dereq_("../../shared/constants");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var INTEGRATION_TIMEOUT_MS = _dereq_("../../../lib/constants").INTEGRATION_TIMEOUT_MS;
          var PLATFORM = _dereq_("../../../lib/constants").PLATFORM;
          var VERSION = "3.102.0";
          var CUSTOMER_CANCELED_SONGBIRD_MODAL = "01";
          var SONGBIRD_UI_EVENTS = [
            "ui.close",
            "ui.render",
            // TODO these events are not documented in the
            // client reference because so far we have
            // not been able to trigger them in our testing
            "ui.renderHidden",
            "ui.loading.close",
            "ui.loading.render"
          ];
          var SCA_EXEMPTION_TYPES = ["low_value", "transaction_risk_analysis"];
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function SongbirdFramework(options) {
            BaseFramework.call(this, options);
            this._songbirdInitFailed = false;
            this._clientMetadata = {
              requestedThreeDSecureVersion: "2",
              sdkVersion: PLATFORM + "/" + VERSION
            };
            this.originalSetupOptions = options;
            this._getDfReferenceIdPromisePlus = new ExtendedPromise();
            this.setupSongbird(options);
            this._cardinalEvents = [];
          }
          SongbirdFramework.prototype = Object.create(BaseFramework.prototype, {
            constructor: SongbirdFramework
          });
          SongbirdFramework.events = enumerate(
            [
              "LOOKUP_COMPLETE",
              "CUSTOMER_CANCELED",
              "UI.CLOSE",
              "UI.RENDER",
              "UI.RENDERHIDDEN",
              "UI.LOADING.CLOSE",
              "UI.LOADING.RENDER"
            ],
            "songbird-framework:"
          );
          SongbirdFramework.prototype.setUpEventListeners = function(reply) {
            this.on(SongbirdFramework.events.LOOKUP_COMPLETE, function(data, next) {
              reply("lookup-complete", data, next);
            });
            this.on(SongbirdFramework.events.CUSTOMER_CANCELED, function() {
              reply("customer-canceled");
            });
            this.on(SongbirdFramework.events["UI.CLOSE"], function() {
              reply("authentication-modal-close");
            });
            this.on(SongbirdFramework.events["UI.RENDER"], function() {
              reply("authentication-modal-render");
            });
            this.on(SongbirdFramework.events["UI.RENDERHIDDEN"], function() {
              reply("authentication-modal-render-hidden");
            });
            this.on(SongbirdFramework.events["UI.LOADING.CLOSE"], function() {
              reply("authentication-modal-loader-close");
            });
            this.on(SongbirdFramework.events["UI.LOADING.RENDER"], function() {
              reply("authentication-modal-loader-render");
            });
          };
          SongbirdFramework.prototype.prepareLookup = function(options) {
            var data = assign({}, options);
            var self2 = this;
            return this.getDfReferenceId().then(function(id) {
              data.dfReferenceId = id;
            }).then(function() {
              return self2._triggerCardinalBinProcess(options.bin);
            }).catch(function() {
            }).then(function() {
              return self2._waitForClient();
            }).then(function() {
              data.clientMetadata = self2._clientMetadata;
              data.authorizationFingerprint = self2._client.getConfiguration().authorizationFingerprint;
              data.braintreeLibraryVersion = "braintree/web/" + VERSION;
              return data;
            });
          };
          SongbirdFramework.prototype.initializeChallengeWithLookupResponse = function(lookupResponse, options) {
            return this.setupSongbird().then(
              function() {
                return BaseFramework.prototype.initializeChallengeWithLookupResponse.call(
                  this,
                  lookupResponse,
                  options
                );
              }.bind(this)
            );
          };
          SongbirdFramework.prototype.handleSongbirdError = function(errorType) {
            this._songbirdInitFailed = true;
            this._removeSongbirdListeners();
            analytics.sendEvent(
              this._createPromise,
              "three-d-secure.cardinal-sdk.songbird-error." + errorType
            );
            if (this._songbirdPromise) {
              this._songbirdPromise.resolve();
            }
          };
          SongbirdFramework.prototype._triggerCardinalBinProcess = function(bin) {
            var self2 = this;
            var issuerStartTime = Date.now();
            return window.Cardinal.trigger("bin.process", bin).then(function(binResults) {
              self2._clientMetadata.issuerDeviceDataCollectionTimeElapsed = Date.now() - issuerStartTime;
              self2._clientMetadata.issuerDeviceDataCollectionResult = binResults && binResults.Status;
            });
          };
          SongbirdFramework.prototype.transformBillingAddress = function(additionalInformation, billingAddress) {
            if (billingAddress) {
              extractAddressData(billingAddress, additionalInformation, "billing");
              additionalInformation.billingPhoneNumber = billingAddress.phoneNumber;
              additionalInformation.billingGivenName = billingAddress.givenName;
              additionalInformation.billingSurname = billingAddress.surname;
            }
            return additionalInformation;
          };
          SongbirdFramework.prototype.transformShippingAddress = function(additionalInformation) {
            var shippingAddress = additionalInformation.shippingAddress;
            if (shippingAddress) {
              extractAddressData(shippingAddress, additionalInformation, "shipping");
              delete additionalInformation.shippingAddress;
            }
            return additionalInformation;
          };
          SongbirdFramework.prototype._createV1IframeModalElement = function(iframe) {
            var modal = document.createElement("div");
            modal.innerHTML = '<div data-braintree-v1-fallback-iframe-container="true" style="height: 400px;"></div>';
            modal.querySelector('[data-braintree-v1-fallback-iframe-container="true"]').appendChild(iframe);
            return modal;
          };
          SongbirdFramework.prototype._createV1IframeModal = function(iframe) {
            var modal = this._createV1IframeModalElement(iframe);
            var btn = modal.querySelector("[data-braintree-v1-fallback-close-button]");
            var backdrop = modal.querySelector("[data-braintree-v1-fallback-backdrop]");
            var self2 = this;
            function closeHandler() {
              modal.parentNode.removeChild(modal);
              self2.cancelVerifyCard(errors.THREEDS_CARDINAL_SDK_CANCELED);
              document.removeEventListener("keyup", self2._onV1Keyup);
              self2._onV1Keyup = null;
            }
            this._onV1Keyup = function(e) {
              if (e.key !== "Escape") {
                return;
              }
              if (!modal.parentNode) {
                return;
              }
              closeHandler();
            };
            if (btn) {
              btn.addEventListener("click", closeHandler);
            }
            if (backdrop) {
              backdrop.addEventListener("click", closeHandler);
            }
            document.addEventListener("keyup", this._onV1Keyup);
            return modal;
          };
          SongbirdFramework.prototype._addV1IframeToPage = function() {
            document.body.appendChild(this._v1Modal);
          };
          SongbirdFramework.prototype.setupSongbird = function(setupOptions) {
            var self2 = this;
            var startTime = Date.now();
            if (this._songbirdPromise) {
              return this._songbirdPromise;
            }
            setupOptions = setupOptions || {};
            this._songbirdPromise = new ExtendedPromise();
            this._v2SetupFailureReason = "reason-unknown";
            self2._loadCardinalScript(setupOptions).then(function() {
              if (!window.Cardinal) {
                self2._v2SetupFailureReason = "cardinal-global-unavailable";
                return Promise.reject(
                  new BraintreeError(errors.THREEDS_CARDINAL_SDK_SETUP_FAILED)
                );
              }
              return self2._configureCardinalSdk({
                setupOptions,
                setupStartTime: startTime
              });
            }).catch(function(err) {
              var error = convertToBraintreeError(err, {
                type: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.type,
                code: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.code,
                message: errors.THREEDS_CARDINAL_SDK_SETUP_FAILED.message
              });
              self2._getDfReferenceIdPromisePlus.reject(error);
              window.clearTimeout(self2._songbirdSetupTimeoutReference);
              analytics.sendEvent(
                self2._client,
                "three-d-secure.cardinal-sdk.init.setup-failed"
              );
              self2.handleSongbirdError(
                "cardinal-sdk-setup-failed." + self2._v2SetupFailureReason
              );
            });
            return this._songbirdPromise;
          };
          SongbirdFramework.prototype._configureCardinalSdk = function(config) {
            var self2 = this;
            return this._waitForClient().then(function() {
              var threeDSConfig = self2._client.getConfiguration().gatewayConfiguration.threeDSecure;
              return threeDSConfig;
            }).then(function(threeDSConfig) {
              var jwt = threeDSConfig.cardinalAuthenticationJWT;
              var setupOptions = config.setupOptions;
              var setupStartTime = config.setupStartTime;
              var cardinalConfiguration = self2._createCardinalConfigurationOptions(setupOptions);
              SONGBIRD_UI_EVENTS.forEach(function(eventName) {
                self2.setCardinalListener(eventName, function() {
                  self2._emit(SongbirdFramework.events[eventName.toUpperCase()]);
                });
              });
              self2.setCardinalListener(
                "payments.setupComplete",
                self2._createPaymentsSetupCompleteCallback()
              );
              self2._setupFrameworkSpecificListeners();
              window.Cardinal.configure(cardinalConfiguration);
              window.Cardinal.setup("init", {
                jwt
              });
              self2._clientMetadata.cardinalDeviceDataCollectionTimeElapsed = Date.now() - setupStartTime;
              self2.setCardinalListener(
                "payments.validated",
                self2._createPaymentsValidatedCallback()
              );
            }).catch(function(err) {
              self2._v2SetupFailureReason = "cardinal-configuration-threw-error";
              return Promise.reject(err);
            });
          };
          SongbirdFramework.prototype.setCardinalListener = function(eventName, cb) {
            this._cardinalEvents.push(eventName);
            window.Cardinal.on(eventName, cb);
          };
          SongbirdFramework.prototype._setupFrameworkSpecificListeners = function() {
          };
          SongbirdFramework.prototype._createCardinalConfigurationOptions = function(setupOptions) {
            var cardinalConfiguration = setupOptions.cardinalSDKConfig || {};
            var paymentSettings = cardinalConfiguration.payment || {};
            if (!cardinalConfiguration.logging && setupOptions.loggingEnabled) {
              cardinalConfiguration.logging = {
                level: "verbose"
              };
            }
            cardinalConfiguration.payment = {};
            if (paymentSettings.hasOwnProperty("displayLoading")) {
              cardinalConfiguration.payment.displayLoading = paymentSettings.displayLoading;
            }
            if (paymentSettings.hasOwnProperty("displayExitButton")) {
              cardinalConfiguration.payment.displayExitButton = paymentSettings.displayExitButton;
            }
            return cardinalConfiguration;
          };
          SongbirdFramework.prototype._loadCardinalScript = function(setupOptions) {
            var self2 = this;
            return this._waitForClient().then(function() {
              var scriptSource = self2._getCardinalScriptSource();
              self2._songbirdSetupTimeoutReference = window.setTimeout(function() {
                analytics.sendEvent(
                  self2._client,
                  "three-d-secure.cardinal-sdk.init.setup-timeout"
                );
                self2.handleSongbirdError("cardinal-sdk-setup-timeout");
              }, setupOptions.timeout || INTEGRATION_TIMEOUT_MS);
              return assets.loadScript({ src: scriptSource });
            }).catch(function(err) {
              self2._v2SetupFailureReason = "songbird-js-failed-to-load";
              return Promise.reject(
                convertToBraintreeError(
                  err,
                  errors.THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED
                )
              );
            });
          };
          SongbirdFramework.prototype._getCardinalScriptSource = function() {
            var gatewayConfig = this._client.getConfiguration().gatewayConfiguration;
            if (gatewayConfig && gatewayConfig.environment === "production") {
              return constants.CARDINAL_SCRIPT_SOURCE.production;
            }
            return constants.CARDINAL_SCRIPT_SOURCE.sandbox;
          };
          SongbirdFramework.prototype._createPaymentsSetupCompleteCallback = function() {
            var self2 = this;
            return function(data) {
              self2._getDfReferenceIdPromisePlus.resolve(data.sessionId);
              window.clearTimeout(self2._songbirdSetupTimeoutReference);
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.cardinal-sdk.init.setup-completed"
              );
              self2._songbirdPromise.resolve();
            };
          };
          SongbirdFramework.prototype.getDfReferenceId = function() {
            return this._getDfReferenceIdPromisePlus;
          };
          SongbirdFramework.prototype._performJWTValidation = function(rawCardinalSDKVerificationData, jwt) {
            var self2 = this;
            var nonce = this._lookupPaymentMethod.nonce;
            var url = "payment_methods/" + nonce + "/three_d_secure/authenticate_from_jwt";
            var cancelCode = rawCardinalSDKVerificationData && rawCardinalSDKVerificationData.Payment && rawCardinalSDKVerificationData.Payment.ExtendedData && rawCardinalSDKVerificationData.Payment.ExtendedData.ChallengeCancel;
            if (cancelCode) {
              analytics.sendEvent(
                this._createPromise,
                "three-d-secure.verification-flow.cardinal-sdk.cancel-code." + cancelCode
              );
              if (cancelCode === CUSTOMER_CANCELED_SONGBIRD_MODAL) {
                this._emit(SongbirdFramework.events.CUSTOMER_CANCELED);
              }
            }
            analytics.sendEvent(
              this._createPromise,
              "three-d-secure.verification-flow.upgrade-payment-method.started"
            );
            return this._waitForClient().then(function() {
              return self2._client.request({
                method: "post",
                endpoint: url,
                data: {
                  jwt,
                  paymentMethodNonce: nonce
                }
              });
            }).then(function(response2) {
              var paymentMethod = response2.paymentMethod || self2._lookupPaymentMethod;
              var formattedResponse = self2._formatAuthResponse(
                paymentMethod,
                response2.threeDSecureInfo
              );
              formattedResponse.rawCardinalSDKVerificationData = rawCardinalSDKVerificationData;
              analytics.sendEvent(
                self2._client,
                "three-d-secure.verification-flow.upgrade-payment-method.succeeded"
              );
              return Promise.resolve(formattedResponse);
            }).catch(function(err) {
              var error = new BraintreeError({
                type: errors.THREEDS_JWT_AUTHENTICATION_FAILED.type,
                code: errors.THREEDS_JWT_AUTHENTICATION_FAILED.code,
                message: errors.THREEDS_JWT_AUTHENTICATION_FAILED.message,
                details: {
                  originalError: err
                }
              });
              analytics.sendEvent(
                self2._client,
                "three-d-secure.verification-flow.upgrade-payment-method.errored"
              );
              return Promise.reject(error);
            });
          };
          SongbirdFramework.prototype._createPaymentsValidatedCallback = function() {
            var self2 = this;
            return function(data, validatedJwt) {
              var formattedError;
              analytics.sendEvent(
                self2._createPromise,
                "three-d-secure.verification-flow.cardinal-sdk.action-code." + data.ActionCode.toLowerCase()
              );
              if (!self2._verifyCardPromisePlus) {
                self2.handleSongbirdError(
                  "cardinal-sdk-setup-error.number-" + data.ErrorNumber
                );
                return;
              }
              switch (data.ActionCode) {
                // Handle these scenarios based on liability shift information in the response.
                case "SUCCESS":
                case "NOACTION":
                case "FAILURE":
                  self2._performJWTValidation(data, validatedJwt).then(function(result) {
                    self2._verifyCardPromisePlus.resolve(result);
                  }).catch(function(err) {
                    self2._verifyCardPromisePlus.reject(err);
                  });
                  break;
                case "ERROR":
                  analytics.sendEvent(
                    self2._createPromise,
                    "three-d-secure.verification-flow.cardinal-sdk-error." + data.ErrorNumber
                  );
                  switch (data.ErrorNumber) {
                    case 10001:
                    // Cardinal Docs: Timeout when sending an /Init message
                    case 10002:
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT
                      );
                      break;
                    case 10003:
                    // Cardinal Docs: Timeout when sending an /Validate message. Although this code exists we do not yet have a flow where a validate message is sent to Midas. This error should not yet be triggered
                    case 10007:
                    // Cardinal Docs: Timeout when sending an /Confirm message
                    case 10009:
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT
                      );
                      break;
                    case 10005:
                    // Cardinal Docs: Songbird was started without a request jwt.
                    case 10006:
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_BAD_CONFIG
                      );
                      break;
                    case 10008:
                    // Cardinal Docs: Songbird was initialized without a merchant JWT.
                    case 10010:
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_BAD_JWT
                      );
                      break;
                    case 10011:
                      analytics.sendEvent(
                        self2._createPromise,
                        "three-d-secure.verification-flow.canceled"
                      );
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_CANCELED
                      );
                      break;
                    default:
                      formattedError = new BraintreeError(
                        errors.THREEDS_CARDINAL_SDK_ERROR
                      );
                  }
                  formattedError.details = {
                    originalError: {
                      code: data.ErrorNumber,
                      description: data.ErrorDescription
                    }
                  };
                  self2._verifyCardPromisePlus.reject(formattedError);
                  break;
                default:
              }
            };
          };
          SongbirdFramework.prototype._checkForVerifyCardError = function(options, privateOptions) {
            if (!options.bin) {
              return new BraintreeError({
                type: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.type,
                code: errors.THREEDS_MISSING_VERIFY_CARD_OPTION.code,
                message: "verifyCard options must include a BIN."
              });
            }
            return BaseFramework.prototype._checkForVerifyCardError.call(
              this,
              options,
              privateOptions
            );
          };
          SongbirdFramework.prototype._checkForFrameworkSpecificVerifyCardErrors = function(options, privateOptions) {
            var errorOption;
            if (typeof options.onLookupComplete !== "function" && !privateOptions.ignoreOnLookupCompleteRequirement) {
              errorOption = "an onLookupComplete function";
            }
            return errorOption;
          };
          SongbirdFramework.prototype._formatVerifyCardOptions = function(options) {
            var modifiedOptions = BaseFramework.prototype._formatVerifyCardOptions.call(
              this,
              options
            );
            var additionalInformation = modifiedOptions.additionalInformation || {};
            additionalInformation = this.transformBillingAddress(
              additionalInformation,
              options.billingAddress
            );
            additionalInformation = this.transformShippingAddress(additionalInformation);
            if (options.onLookupComplete) {
              modifiedOptions.onLookupComplete = deferred(options.onLookupComplete);
            }
            if (options.email) {
              additionalInformation.email = options.email;
            }
            if (options.mobilePhoneNumber) {
              additionalInformation.mobilePhoneNumber = options.mobilePhoneNumber;
            }
            modifiedOptions.additionalInformation = additionalInformation;
            return modifiedOptions;
          };
          SongbirdFramework.prototype._onLookupComplete = function(lookupResponse, options) {
            var self2 = this;
            return BaseFramework.prototype._onLookupComplete.call(this, lookupResponse).then(function(response2) {
              return new Promise(function(resolve, reject) {
                response2.requiresUserAuthentication = Boolean(
                  response2.lookup && response2.lookup.acsUrl
                );
                function next() {
                  resolve(response2);
                }
                self2._verifyCardPromisePlus.catch(reject);
                if (options.onLookupComplete) {
                  options.onLookupComplete(response2, next);
                } else {
                  self2._emit(SongbirdFramework.events.LOOKUP_COMPLETE, response2, next);
                }
              });
            });
          };
          SongbirdFramework.prototype._presentChallenge = function(lookupResponse) {
            if (this._songbirdInitFailed || !lookupResponse.lookup.transactionId) {
              return;
            }
            window.Cardinal.continue(
              "cca",
              {
                AcsUrl: lookupResponse.lookup.acsUrl,
                Payload: lookupResponse.lookup.pareq
              },
              {
                OrderDetails: { TransactionId: lookupResponse.lookup.transactionId }
              }
            );
          };
          SongbirdFramework.prototype._formatLookupData = function(options) {
            var self2 = this;
            return BaseFramework.prototype._formatLookupData.call(this, options).then(function(data) {
              data.additionalInfo = options.additionalInformation;
              if (options.accountType) {
                data.accountType = options.accountType;
              }
              if (options.challengeRequested) {
                data.challengeRequested = options.challengeRequested;
              }
              if (options.requestedExemptionType) {
                if (!SCA_EXEMPTION_TYPES.includes(options.requestedExemptionType)) {
                  throw new BraintreeError({
                    code: errors.THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID.code,
                    type: errors.THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID.type,
                    message: "requestedExemptionType `" + options.requestedExemptionType + "` is not a valid exemption. The accepted values are: `" + SCA_EXEMPTION_TYPES.join("`, `") + "`"
                  });
                }
                data.requestedExemptionType = options.requestedExemptionType;
              }
              if (options.customFields) {
                data.customFields = options.customFields;
              }
              if (options.dataOnlyRequested) {
                data.dataOnlyRequested = options.dataOnlyRequested;
              }
              if (options.exemptionRequested) {
                data.exemptionRequested = options.exemptionRequested;
              }
              if (options.requestVisaDAF) {
                data.requestVisaDAF = options.requestVisaDAF;
              }
              if (options.bin) {
                data.bin = options.bin;
              }
              if (options.cardAdd != null) {
                data.cardAdd = options.cardAdd;
              }
              if (options.cardAddChallengeRequested != null) {
                data.cardAdd = options.cardAddChallengeRequested;
              }
              if (options.merchantName) {
                data.merchantName = options.merchantName;
              }
              return self2.prepareLookup(data);
            });
          };
          SongbirdFramework.prototype.cancelVerifyCard = function(verifyCardError) {
            var self2 = this;
            return BaseFramework.prototype.cancelVerifyCard.call(this).then(function(response2) {
              if (self2._verifyCardPromisePlus) {
                verifyCardError = verifyCardError || new BraintreeError(errors.THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT);
                self2._verifyCardPromisePlus.reject(verifyCardError);
              }
              return response2;
            });
          };
          SongbirdFramework.prototype._removeSongbirdListeners = function() {
            this._cardinalEvents.forEach(function(eventName) {
              window.Cardinal.off(eventName);
            });
            this._cardinalEvents = [];
          };
          SongbirdFramework.prototype.teardown = function() {
            if (window.Cardinal) {
              this._removeSongbirdListeners();
            }
            return BaseFramework.prototype.teardown.call(this);
          };
          SongbirdFramework.prototype._reloadThreeDSecure = function() {
            var self2 = this;
            var startTime = Date.now();
            return self2.teardown().then(function() {
              self2._configureCardinalSdk({
                setupOptions: self2.originalSetupOptions,
                setupStartTime: startTime
              });
            });
          };
          function extractAddressData(source, target, prefix) {
            target[prefix + "Line1"] = source.streetAddress;
            target[prefix + "Line2"] = source.extendedAddress;
            target[prefix + "Line3"] = source.line3;
            target[prefix + "City"] = source.locality;
            target[prefix + "State"] = source.region;
            target[prefix + "PostalCode"] = source.postalCode;
            target[prefix + "CountryCode"] = source.countryCodeAlpha2;
          }
          module3.exports = SongbirdFramework;
        }, { "../../../lib/analytics": 119, "../../../lib/assets": 120, "../../../lib/assign": 121, "../../../lib/braintree-error": 124, "../../../lib/constants": 126, "../../../lib/convert-to-braintree-error": 128, "../../../lib/deferred": 132, "../../../lib/enumerate": 134, "../../shared/constants": 199, "../../shared/errors": 200, "./base": 190, "@braintree/extended-promise": 34 }], 197: [function(_dereq_, module3, exports3) {
          "use strict";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var methods = _dereq_("../../lib/methods");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var EventEmitter = _dereq_("@braintree/event-emitter");
          var FRAMEWORKS = _dereq_("./frameworks");
          function ThreeDSecure(options) {
            var self2 = this;
            var Framework = FRAMEWORKS[options.framework];
            EventEmitter.call(this);
            this._framework = new Framework(options);
            this._framework.setUpEventListeners(function() {
              self2._emit.apply(self2, arguments);
            });
          }
          EventEmitter.createChild(ThreeDSecure);
          ThreeDSecure.prototype.verifyCard = function(options) {
            var privateOptions;
            if (this.hasListener("lookup-complete")) {
              privateOptions = {
                ignoreOnLookupCompleteRequirement: true
              };
            }
            return this._framework.verifyCard(options, privateOptions);
          };
          ThreeDSecure.prototype.initializeChallengeWithLookupResponse = function(lookupResponse) {
            if (typeof lookupResponse === "string") {
              lookupResponse = JSON.parse(lookupResponse);
            }
            return this._framework.initializeChallengeWithLookupResponse(lookupResponse);
          };
          ThreeDSecure.prototype.prepareLookup = function(options) {
            return this._framework.prepareLookup(options).then(function(data) {
              return JSON.stringify(data);
            });
          };
          ThreeDSecure.prototype.cancelVerifyCard = function() {
            return this._framework.cancelVerifyCard();
          };
          ThreeDSecure.prototype.teardown = function() {
            var methodNames = methods(ThreeDSecure.prototype).concat(
              methods(EventEmitter.prototype)
            );
            convertMethodsToError(this, methodNames);
            return this._framework.teardown();
          };
          module3.exports = wrapPromise.wrapPrototype(ThreeDSecure);
        }, { "../../lib/convert-methods-to-error": 127, "../../lib/methods": 155, "./frameworks": 193, "@braintree/event-emitter": 33, "@braintree/wrap-promise": 43 }], 198: [function(_dereq_, module3, exports3) {
          "use strict";
          var ThreeDSecure = _dereq_("./external/three-d-secure");
          var isHTTPS = _dereq_("../lib/is-https").isHTTPS;
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./shared/errors");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "3D Secure";
            var framework = getFramework(options);
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var assetsUrl = createAssetsUrl.create(options.authorization);
              var createPromise = createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl,
                name
              }).then(function(client) {
                var error, isProduction;
                var config = client.getConfiguration();
                var gwConfig = config.gatewayConfiguration;
                options.client = client;
                if (!gwConfig.threeDSecureEnabled) {
                  error = errors.THREEDS_NOT_ENABLED;
                }
                if (config.authorizationType === "TOKENIZATION_KEY") {
                  error = errors.THREEDS_CAN_NOT_USE_TOKENIZATION_KEY;
                }
                isProduction = gwConfig.environment === "production";
                if (isProduction && !isHTTPS()) {
                  error = errors.THREEDS_HTTPS_REQUIRED;
                }
                if (framework !== "legacy" && !(gwConfig.threeDSecure && gwConfig.threeDSecure.cardinalAuthenticationJWT)) {
                  analytics.sendEvent(
                    options.client,
                    "three-d-secure.initialization.failed.missing-cardinalAuthenticationJWT"
                  );
                  error = errors.THREEDS_NOT_ENABLED_FOR_V2;
                }
                if (error) {
                  return Promise.reject(new BraintreeError(error));
                }
                analytics.sendEvent(options.client, "three-d-secure.initialized");
                return client;
              });
              var instance = new ThreeDSecure({
                client: options.client,
                assetsUrl,
                createPromise,
                loggingEnabled: options.loggingEnabled,
                cardinalSDKConfig: options.cardinalSDKConfig,
                framework
              });
              if (options.client) {
                return createPromise.then(function() {
                  return instance;
                });
              }
              return instance;
            });
          }
          function getFramework(options) {
            var version = String(options.version || "");
            if (!version || version === "1") {
              throw new BraintreeError({
                code: errors.THREEDS_UNSUPPORTED_VERSION.code,
                type: errors.THREEDS_UNSUPPORTED_VERSION.type,
                message: errors.THREEDS_UNSUPPORTED_VERSION.message
              });
            }
            switch (version) {
              case "2":
              case "2-cardinal-modal":
                return "cardinal-modal";
              case "2-bootstrap3-modal":
                return "bootstrap3-modal";
              case "2-inline-iframe":
                return "inline-iframe";
              default:
                throw new BraintreeError({
                  code: errors.THREEDS_UNRECOGNIZED_VERSION.code,
                  type: errors.THREEDS_UNRECOGNIZED_VERSION.type,
                  message: "Version `" + options.version + "` is not a recognized version. You may need to update the version of your Braintree SDK to support this version."
                });
            }
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "../lib/is-https": 152, "./external/three-d-secure": 197, "./shared/errors": 200, "@braintree/wrap-promise": 43 }], 199: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            LANDING_FRAME_NAME: "braintreethreedsecurelanding",
            CARDINAL_SCRIPT_SOURCE: {
              production: "https://songbird.cardinalcommerce.com/edge/v1/songbird.js",
              sandbox: "https://songbirdstag.cardinalcommerce.com/edge/v1/songbird.js"
            }
          };
        }, {}], 200: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            THREEDS_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_NOT_ENABLED",
              message: "3D Secure is not enabled for this merchant."
            },
            THREEDS_CAN_NOT_USE_TOKENIZATION_KEY: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_CAN_NOT_USE_TOKENIZATION_KEY",
              message: "3D Secure can not use a tokenization key for authorization."
            },
            THREEDS_HTTPS_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_HTTPS_REQUIRED",
              message: "3D Secure requires HTTPS."
            },
            THREEDS_NOT_ENABLED_FOR_V2: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_NOT_ENABLED_FOR_V2",
              message: "3D Secure version 2 is not enabled for this merchant. Contact Braintree Support for assistance at https://help.braintreepayments.com/"
            },
            THREEDS_UNRECOGNIZED_VERSION: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_UNRECOGNIZED_VERSION"
            },
            THREEDS_CARDINAL_SDK_SETUP_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_CARDINAL_SDK_SETUP_FAILED",
              message: "Something went wrong setting up Cardinal's Songbird.js library."
            },
            THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "THREEDS_CARDINAL_SDK_SCRIPT_LOAD_FAILED",
              message: "Cardinal's Songbird.js library could not be loaded."
            },
            THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_CARDINAL_SDK_SETUP_TIMEDOUT",
              message: "Cardinal's Songbird.js took too long to setup."
            },
            THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_CARDINAL_SDK_RESPONSE_TIMEDOUT",
              message: "Cardinal's API took too long to respond."
            },
            THREEDS_CARDINAL_SDK_BAD_CONFIG: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_CARDINAL_SDK_BAD_CONFIG",
              message: "JWT or other required field missing. Please check your setup configuration."
            },
            THREEDS_CARDINAL_SDK_BAD_JWT: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_CARDINAL_SDK_BAD_JWT",
              message: "Cardinal JWT missing or malformed. Please check your setup configuration."
            },
            THREEDS_CARDINAL_SDK_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_CARDINAL_SDK_ERROR",
              message: "A general error has occurred with Cardinal. See description for more information."
            },
            THREEDS_CARDINAL_SDK_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "THREEDS_CARDINAL_SDK_CANCELED",
              message: "Canceled by user."
            },
            THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_VERIFY_CARD_CANCELED_BY_MERCHANT",
              message: "3D Secure verfication canceled by merchant."
            },
            THREEDS_AUTHENTICATION_IN_PROGRESS: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_AUTHENTICATION_IN_PROGRESS",
              message: "Cannot call verifyCard while existing authentication is in progress."
            },
            THREEDS_MISSING_VERIFY_CARD_OPTION: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_MISSING_VERIFY_CARD_OPTION"
            },
            THREEDS_JWT_AUTHENTICATION_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_JWT_AUTHENTICATION_FAILED",
              message: "Something went wrong authenticating the JWT from Cardinal"
            },
            THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_LOOKUP_TOKENIZED_CARD_NOT_FOUND_ERROR",
              message: "Either the payment method nonce passed to `verifyCard` does not exist, or it was already consumed"
            },
            THREEDS_LOOKUP_VALIDATION_ERROR: {
              type: BraintreeError.types.CUSTOMER,
              code: "THREEDS_LOOKUP_VALIDATION_ERROR",
              message: "The data passed in `verifyCard` did not pass validation checks. See details for more info"
            },
            THREEDS_LOOKUP_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_LOOKUP_ERROR",
              message: "Something went wrong during the 3D Secure lookup"
            },
            THREEDS_INLINE_IFRAME_DETAILS_INCORRECT: {
              type: BraintreeError.types.UNKNOWN,
              code: "THREEDS_INLINE_IFRAME_DETAILS_INCORRECT",
              message: "Something went wrong when attempting to add the authentication iframe to the page."
            },
            THREEDS_NO_VERIFICATION_PAYLOAD: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_NO_VERIFICATION_PAYLOAD",
              message: "No verification payload available."
            },
            THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN: {
              type: BraintreeError.types.INTERNAL,
              code: "THREEDS_TERM_URL_REQUIRES_BRAINTREE_DOMAIN",
              message: "Term Url must be on a Braintree domain."
            },
            THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED: {
              type: BraintreeError.types.INTERNAL,
              code: "THREEDS_FRAMEWORK_METHOD_NOT_IMPLEMENTED",
              message: "Method not implemented for this framework."
            },
            THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_REQUESTED_EXEMPTION_TYPE_INVALID",
              message: "Requested Exemption Type is invalid."
            },
            THREEDS_UNSUPPORTED_VERSION: {
              type: BraintreeError.types.MERCHANT,
              code: "THREEDS_UNSUPPORTED_VERSION",
              message: "3D Secure `1` is deprecated and no longer supported. See available versions at https://braintree.github.io/braintree-web/current/module-braintree-web_three-d-secure.html#.create"
            }
          };
        }, { "../../lib/braintree-error": 124 }], 201: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("../../lib/enumerate");
          module3.exports = enumerate(["AUTHENTICATION_COMPLETE"], "threedsecure:");
        }, { "../../lib/enumerate": 134 }], 202: [function(_dereq_, module3, exports3) {
          "use strict";
          var UnionPay = _dereq_("./shared/unionpay");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./shared/errors");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "UnionPay";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var config = client.getConfiguration();
              options.client = client;
              if (!config.gatewayConfiguration.unionPay || config.gatewayConfiguration.unionPay.enabled !== true) {
                return Promise.reject(new BraintreeError(errors.UNIONPAY_NOT_ENABLED));
              }
              analytics.sendEvent(options.client, "unionpay.initialized");
              return new UnionPay(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./shared/errors": 204, "./shared/unionpay": 205, "@braintree/wrap-promise": 43 }], 203: [function(_dereq_, module3, exports3) {
          "use strict";
          var enumerate = _dereq_("../../lib/enumerate");
          module3.exports = {
            events: enumerate(
              [
                "HOSTED_FIELDS_FETCH_CAPABILITIES",
                "HOSTED_FIELDS_ENROLL",
                "HOSTED_FIELDS_TOKENIZE"
              ],
              "union-pay:"
            ),
            HOSTED_FIELDS_FRAME_NAME: "braintreeunionpayhostedfields"
          };
        }, { "../../lib/enumerate": 134 }], 204: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            UNIONPAY_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_NOT_ENABLED",
              message: "UnionPay is not enabled for this merchant."
            },
            UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID",
              message: "Found an invalid Hosted Fields instance. Please use a valid Hosted Fields instance."
            },
            UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_HOSTED_FIELDS_INSTANCE_REQUIRED",
              message: "Could not find the Hosted Fields instance."
            },
            UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED",
              message: "A card or a Hosted Fields instance is required. Please supply a card or a Hosted Fields instance."
            },
            UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES",
              message: "Please supply either a card or a Hosted Fields instance, not both."
            },
            UNIONPAY_EXPIRATION_DATE_INCOMPLETE: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_EXPIRATION_DATE_INCOMPLETE",
              message: "You must supply expiration month and year or neither."
            },
            UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID: {
              type: BraintreeError.types.CUSTOMER,
              code: "UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID",
              message: "Enrollment failed due to user input error."
            },
            UNIONPAY_ENROLLMENT_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "UNIONPAY_ENROLLMENT_NETWORK_ERROR",
              message: "Could not enroll UnionPay card."
            },
            UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR",
              message: "Could not fetch card capabilities."
            },
            UNIONPAY_TOKENIZATION_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "UNIONPAY_TOKENIZATION_NETWORK_ERROR",
              message: "A tokenization network error occurred."
            },
            UNIONPAY_MISSING_MOBILE_PHONE_DATA: {
              type: BraintreeError.types.MERCHANT,
              code: "UNIONPAY_MISSING_MOBILE_PHONE_DATA",
              message: "A `mobile` with `countryCode` and `number` is required."
            },
            UNIONPAY_FAILED_TOKENIZATION: {
              type: BraintreeError.types.CUSTOMER,
              code: "UNIONPAY_FAILED_TOKENIZATION",
              message: "The supplied card data failed tokenization."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 205: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../../lib/analytics");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var Bus = _dereq_("framebus");
          var constants = _dereq_("./constants");
          var isVerifiedDomain = _dereq_("../../lib/is-verified-domain");
          var useMin = _dereq_("../../lib/use-min");
          var convertMethodsToError = _dereq_("../../lib/convert-methods-to-error");
          var errors = _dereq_("./errors");
          var events = constants.events;
          var iFramer = _dereq_("@braintree/iframer");
          var methods = _dereq_("../../lib/methods");
          var VERSION = "3.102.0";
          var uuid = _dereq_("@braintree/uuid");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BUS_CONFIGURATION_REQUEST_EVENT = _dereq_("../../lib/constants").BUS_CONFIGURATION_REQUEST_EVENT;
          function UnionPay(options) {
            this._options = options;
          }
          UnionPay.prototype.fetchCapabilities = function(options) {
            var self2 = this;
            var client = this._options.client;
            var cardNumber = options.card ? options.card.number : null;
            var hostedFields = options.hostedFields;
            if (cardNumber && hostedFields) {
              return Promise.reject(
                new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)
              );
            } else if (cardNumber) {
              return client.request({
                method: "get",
                endpoint: "payment_methods/credit_cards/capabilities",
                data: {
                  _meta: { source: "unionpay" },
                  creditCard: {
                    number: cardNumber
                  }
                }
              }).then(function(response2) {
                analytics.sendEvent(client, "unionpay.capabilities-received");
                return response2;
              }).catch(function(err) {
                var status = err.details && err.details.httpStatus;
                analytics.sendEvent(client, "unionpay.capabilities-failed");
                if (status === 403) {
                  return Promise.reject(err);
                }
                return Promise.reject(
                  new BraintreeError({
                    type: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.type,
                    code: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.code,
                    message: errors.UNIONPAY_FETCH_CAPABILITIES_NETWORK_ERROR.message,
                    details: {
                      originalError: err
                    }
                  })
                );
              });
            } else if (hostedFields) {
              if (!hostedFields._bus) {
                return Promise.reject(
                  new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)
                );
              }
              return self2._initializeHostedFields().then(function() {
                return new Promise(function(resolve, reject) {
                  self2._bus.emit(
                    events.HOSTED_FIELDS_FETCH_CAPABILITIES,
                    { hostedFields },
                    function(response2) {
                      if (response2.err) {
                        reject(new BraintreeError(response2.err));
                        return;
                      }
                      resolve(response2.payload);
                    }
                  );
                });
              });
            }
            return Promise.reject(
              new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED)
            );
          };
          UnionPay.prototype.enroll = function(options) {
            var self2 = this;
            var client = this._options.client;
            var card = options.card;
            var mobile = options.mobile;
            var hostedFields = options.hostedFields;
            var data;
            if (!mobile) {
              return Promise.reject(
                new BraintreeError(errors.UNIONPAY_MISSING_MOBILE_PHONE_DATA)
              );
            }
            if (hostedFields) {
              if (!hostedFields._bus) {
                return Promise.reject(
                  new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)
                );
              } else if (card) {
                return Promise.reject(
                  new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)
                );
              }
              return new Promise(function(resolve, reject) {
                self2._initializeHostedFields().then(function() {
                  self2._bus.emit(
                    events.HOSTED_FIELDS_ENROLL,
                    { hostedFields, mobile },
                    function(response2) {
                      if (response2.err) {
                        reject(new BraintreeError(response2.err));
                        return;
                      }
                      resolve(response2.payload);
                    }
                  );
                });
              });
            } else if (card && card.number) {
              data = {
                _meta: { source: "unionpay" },
                unionPayEnrollment: {
                  number: card.number,
                  mobileCountryCode: mobile.countryCode,
                  mobileNumber: mobile.number
                }
              };
              if (card.expirationDate) {
                data.unionPayEnrollment.expirationDate = card.expirationDate;
              } else if (card.expirationMonth || card.expirationYear) {
                if (card.expirationMonth && card.expirationYear) {
                  data.unionPayEnrollment.expirationYear = card.expirationYear;
                  data.unionPayEnrollment.expirationMonth = card.expirationMonth;
                } else {
                  return Promise.reject(
                    new BraintreeError(errors.UNIONPAY_EXPIRATION_DATE_INCOMPLETE)
                  );
                }
              }
              return client.request({
                method: "post",
                endpoint: "union_pay_enrollments",
                data
              }).then(function(response2) {
                analytics.sendEvent(client, "unionpay.enrollment-succeeded");
                return {
                  enrollmentId: response2.unionPayEnrollmentId,
                  smsCodeRequired: response2.smsCodeRequired
                };
              }).catch(function(err) {
                var error;
                var status = err.details && err.details.httpStatus;
                if (status === 403) {
                  error = err;
                } else if (status < 500) {
                  error = new BraintreeError(
                    errors.UNIONPAY_ENROLLMENT_CUSTOMER_INPUT_INVALID
                  );
                  error.details = { originalError: err };
                } else {
                  error = new BraintreeError(errors.UNIONPAY_ENROLLMENT_NETWORK_ERROR);
                  error.details = { originalError: err };
                }
                analytics.sendEvent(client, "unionpay.enrollment-failed");
                return Promise.reject(error);
              });
            }
            return Promise.reject(
              new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED)
            );
          };
          UnionPay.prototype.tokenize = function(options) {
            var data;
            var self2 = this;
            var client = this._options.client;
            var card = options.card;
            var hostedFields = options.hostedFields;
            if (card && hostedFields) {
              return Promise.reject(
                new BraintreeError(errors.UNIONPAY_CARD_AND_HOSTED_FIELDS_INSTANCES)
              );
            } else if (card) {
              data = {
                _meta: { source: "unionpay" },
                creditCard: {
                  number: options.card.number,
                  options: {
                    unionPayEnrollment: {
                      id: options.enrollmentId
                    }
                  }
                }
              };
              if (options.smsCode) {
                data.creditCard.options.unionPayEnrollment.smsCode = options.smsCode;
              }
              if (card.expirationDate) {
                data.creditCard.expirationDate = card.expirationDate;
              } else if (card.expirationMonth && card.expirationYear) {
                data.creditCard.expirationYear = card.expirationYear;
                data.creditCard.expirationMonth = card.expirationMonth;
              }
              if (options.card.cvv) {
                data.creditCard.cvv = options.card.cvv;
              }
              return client.request({
                method: "post",
                endpoint: "payment_methods/credit_cards",
                data
              }).then(function(response2) {
                var tokenizedCard = response2.creditCards[0];
                delete tokenizedCard.consumed;
                delete tokenizedCard.threeDSecureInfo;
                analytics.sendEvent(client, "unionpay.nonce-received");
                return tokenizedCard;
              }).catch(function(err) {
                var error;
                var status = err.details && err.details.httpStatus;
                analytics.sendEvent(client, "unionpay.nonce-failed");
                if (status === 403) {
                  error = err;
                } else if (status < 500) {
                  error = new BraintreeError(errors.UNIONPAY_FAILED_TOKENIZATION);
                  error.details = { originalError: err };
                } else {
                  error = new BraintreeError(
                    errors.UNIONPAY_TOKENIZATION_NETWORK_ERROR
                  );
                  error.details = { originalError: err };
                }
                return Promise.reject(error);
              });
            } else if (hostedFields) {
              if (!hostedFields._bus) {
                return Promise.reject(
                  new BraintreeError(errors.UNIONPAY_HOSTED_FIELDS_INSTANCE_INVALID)
                );
              }
              return new Promise(function(resolve, reject) {
                self2._initializeHostedFields().then(function() {
                  self2._bus.emit(
                    events.HOSTED_FIELDS_TOKENIZE,
                    options,
                    function(response2) {
                      if (response2.err) {
                        reject(new BraintreeError(response2.err));
                        return;
                      }
                      resolve(response2.payload);
                    }
                  );
                });
              });
            }
            return Promise.reject(
              new BraintreeError(errors.UNIONPAY_CARD_OR_HOSTED_FIELDS_INSTANCE_REQUIRED)
            );
          };
          UnionPay.prototype.teardown = function() {
            if (this._bus) {
              this._hostedFieldsFrame.parentNode.removeChild(this._hostedFieldsFrame);
              this._bus.teardown();
            }
            convertMethodsToError(this, methods(UnionPay.prototype));
            return Promise.resolve();
          };
          UnionPay.prototype._initializeHostedFields = function() {
            var assetsUrl, isDebug;
            var componentId = uuid();
            var self2 = this;
            if (this._hostedFieldsInitializePromise) {
              return this._hostedFieldsInitializePromise;
            }
            this._hostedFieldsInitializePromise = new Promise(function(resolve) {
              assetsUrl = self2._options.client.getConfiguration().gatewayConfiguration.assetsUrl;
              isDebug = self2._options.client.getConfiguration().isDebug;
              self2._bus = new Bus({
                channel: componentId,
                verifyDomain: isVerifiedDomain
              });
              self2._hostedFieldsFrame = iFramer({
                name: constants.HOSTED_FIELDS_FRAME_NAME + "_" + componentId,
                src: assetsUrl + "/web/" + VERSION + "/html/unionpay-hosted-fields-frame" + useMin(isDebug) + ".html",
                height: 0,
                width: 0
              });
              self2._bus.on(BUS_CONFIGURATION_REQUEST_EVENT, function(reply) {
                reply(self2._options.client);
                resolve();
              });
              document.body.appendChild(self2._hostedFieldsFrame);
            });
            return this._hostedFieldsInitializePromise;
          };
          module3.exports = wrapPromise.wrapPrototype(UnionPay);
        }, { "../../lib/analytics": 119, "../../lib/braintree-error": 124, "../../lib/constants": 126, "../../lib/convert-methods-to-error": 127, "../../lib/is-verified-domain": 153, "../../lib/methods": 155, "../../lib/use-min": 160, "./constants": 203, "./errors": 204, "@braintree/iframer": 35, "@braintree/uuid": 39, "@braintree/wrap-promise": 43, "framebus": 52 }], 206: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            PLAID_LINK_JS: "https://cdn.plaid.com/link/v2/stable/link-initialize.js"
          };
        }, {}], 207: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            US_BANK_ACCOUNT_OPTION_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "US_BANK_ACCOUNT_OPTION_REQUIRED"
            },
            US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS: {
              type: BraintreeError.types.MERCHANT,
              code: "US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS"
            },
            US_BANK_ACCOUNT_LOGIN_LOAD_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "US_BANK_ACCOUNT_LOGIN_LOAD_FAILED",
              message: "Bank login flow failed to load."
            },
            US_BANK_ACCOUNT_LOGIN_CLOSED: {
              type: BraintreeError.types.CUSTOMER,
              code: "US_BANK_ACCOUNT_LOGIN_CLOSED",
              message: "Customer closed bank login flow before authorizing."
            },
            US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE: {
              type: BraintreeError.types.MERCHANT,
              code: "US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE",
              message: "Another bank login tokenization request is active."
            },
            US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR",
              message: "A tokenization network error occurred."
            },
            US_BANK_ACCOUNT_FAILED_TOKENIZATION: {
              type: BraintreeError.types.CUSTOMER,
              code: "US_BANK_ACCOUNT_FAILED_TOKENIZATION",
              message: "The supplied data failed tokenization."
            },
            US_BANK_ACCOUNT_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "US_BANK_ACCOUNT_NOT_ENABLED",
              message: "US bank account is not enabled."
            },
            US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED",
              message: "Bank login is not enabled."
            }
          };
        }, { "../lib/braintree-error": 124 }], 208: [function(_dereq_, module3, exports3) {
          "use strict";
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var errors = _dereq_("./errors");
          var USBankAccount = _dereq_("./us-bank-account");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "US Bank Account";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              var usBankAccount;
              options.client = client;
              usBankAccount = options.client.getConfiguration().gatewayConfiguration.usBankAccount;
              if (!usBankAccount) {
                return Promise.reject(
                  new BraintreeError(errors.US_BANK_ACCOUNT_NOT_ENABLED)
                );
              }
              return new USBankAccount(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./errors": 207, "./us-bank-account": 209, "@braintree/wrap-promise": 43 }], 209: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var constants = _dereq_("./constants");
          var errors = _dereq_("./errors");
          var sharedErrors = _dereq_("../lib/errors");
          var analytics = _dereq_("../lib/analytics");
          var once = _dereq_("../lib/once");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var methods = _dereq_("../lib/methods");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var TOKENIZE_BANK_DETAILS_MUTATION = createGraphQLMutation("UsBankAccount");
          var TOKENIZE_BANK_LOGIN_MUTATION = createGraphQLMutation("UsBankLogin");
          function USBankAccount(options) {
            this._client = options.client;
            this._isTokenizingBankLogin = false;
            analytics.sendEvent(this._client, "usbankaccount.initialized");
          }
          USBankAccount.prototype.tokenize = function(options) {
            options = options || {};
            if (!options.mandateText) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                  code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                  message: "mandateText property is required."
                })
              );
            }
            if (options.bankDetails && options.bankLogin) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.type,
                  code: errors.US_BANK_ACCOUNT_MUTUALLY_EXCLUSIVE_OPTIONS.code,
                  message: "tokenize must be called with bankDetails or bankLogin, not both."
                })
              );
            } else if (options.bankDetails) {
              return this._tokenizeBankDetails(options);
            } else if (options.bankLogin) {
              return this._tokenizeBankLogin(options);
            }
            return Promise.reject(
              new BraintreeError({
                type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                message: "tokenize must be called with bankDetails or bankLogin."
              })
            );
          };
          USBankAccount.prototype._tokenizeBankDetails = function(options) {
            var client = this._client;
            var bankDetails = options.bankDetails;
            var data = {
              achMandate: options.mandateText,
              routingNumber: bankDetails.routingNumber,
              accountNumber: bankDetails.accountNumber,
              accountType: bankDetails.accountType.toUpperCase(),
              billingAddress: formatBillingAddressForGraphQL(
                bankDetails.billingAddress || {}
              )
            };
            formatDataForOwnershipType(data, bankDetails);
            return client.request({
              api: "graphQLApi",
              data: {
                query: TOKENIZE_BANK_DETAILS_MUTATION,
                variables: {
                  input: {
                    usBankAccount: data
                  }
                }
              }
            }).then(function(response2) {
              analytics.sendEvent(
                client,
                "usbankaccount.bankdetails.tokenization.succeeded"
              );
              return Promise.resolve(
                formatTokenizeResponseFromGraphQL(response2, "tokenizeUsBankAccount")
              );
            }).catch(function(err) {
              var error = errorFrom(err);
              analytics.sendEvent(
                client,
                "usbankaccount.bankdetails.tokenization.failed"
              );
              return Promise.reject(error);
            });
          };
          USBankAccount.prototype._tokenizeBankLogin = function(options) {
            var self2 = this;
            var client = this._client;
            var gatewayConfiguration = client.getConfiguration().gatewayConfiguration;
            var isProduction = gatewayConfiguration.environment === "production";
            var plaidConfig = gatewayConfiguration.usBankAccount.plaid;
            if (!options.bankLogin.displayName) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.type,
                  code: errors.US_BANK_ACCOUNT_OPTION_REQUIRED.code,
                  message: "displayName property is required when using bankLogin."
                })
              );
            }
            if (!plaidConfig) {
              return Promise.reject(
                new BraintreeError(errors.US_BANK_ACCOUNT_BANK_LOGIN_NOT_ENABLED)
              );
            }
            if (this._isTokenizingBankLogin) {
              return Promise.reject(
                new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_REQUEST_ACTIVE)
              );
            }
            this._isTokenizingBankLogin = true;
            return new Promise(function(resolve, reject) {
              self2._loadPlaid(function(plaidLoadErr, plaid) {
                if (plaidLoadErr) {
                  reject(plaidLoadErr);
                  return;
                }
                plaid.create({
                  clientName: options.bankLogin.displayName,
                  apiVersion: "v2",
                  env: isProduction ? "production" : "sandbox",
                  key: plaidConfig.publicKey,
                  product: "auth",
                  selectAccount: true,
                  onExit: function() {
                    self2._isTokenizingBankLogin = false;
                    analytics.sendEvent(
                      client,
                      "usbankaccount.banklogin.tokenization.closed.by-user"
                    );
                    reject(new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_CLOSED));
                  },
                  onSuccess: function(publicToken, metadata) {
                    var bankLogin = options.bankLogin;
                    var data = {
                      publicToken,
                      accountId: isProduction ? metadata.account_id : "plaid_account_id",
                      accountType: metadata.account.subtype.toUpperCase(),
                      achMandate: options.mandateText,
                      billingAddress: formatBillingAddressForGraphQL(
                        bankLogin.billingAddress || {}
                      )
                    };
                    formatDataForOwnershipType(data, bankLogin);
                    client.request({
                      api: "graphQLApi",
                      data: {
                        query: TOKENIZE_BANK_LOGIN_MUTATION,
                        variables: {
                          input: {
                            usBankLogin: data
                          }
                        }
                      }
                    }).then(function(response2) {
                      self2._isTokenizingBankLogin = false;
                      analytics.sendEvent(
                        client,
                        "usbankaccount.banklogin.tokenization.succeeded"
                      );
                      resolve(
                        formatTokenizeResponseFromGraphQL(
                          response2,
                          "tokenizeUsBankLogin"
                        )
                      );
                    }).catch(function(tokenizeErr) {
                      var error;
                      self2._isTokenizingBankLogin = false;
                      error = errorFrom(tokenizeErr);
                      analytics.sendEvent(
                        client,
                        "usbankaccount.banklogin.tokenization.failed"
                      );
                      reject(error);
                    });
                  }
                }).open();
                analytics.sendEvent(
                  client,
                  "usbankaccount.banklogin.tokenization.started"
                );
              });
            });
          };
          function errorFrom(err) {
            var error;
            var status = err.details && err.details.httpStatus;
            if (status === 401) {
              error = new BraintreeError(sharedErrors.BRAINTREE_API_ACCESS_RESTRICTED);
            } else if (status < 500) {
              error = new BraintreeError(errors.US_BANK_ACCOUNT_FAILED_TOKENIZATION);
            } else {
              error = new BraintreeError(
                errors.US_BANK_ACCOUNT_TOKENIZATION_NETWORK_ERROR
              );
            }
            error.details = { originalError: err };
            return error;
          }
          function formatTokenizeResponseFromGraphQL(response2, type) {
            var data = response2.data[type].paymentMethod;
            var last4 = data.details.last4;
            var description = "US bank account ending in - " + last4;
            return {
              nonce: data.id,
              details: {},
              description,
              type: "us_bank_account"
            };
          }
          USBankAccount.prototype._loadPlaid = function(callback) {
            var existingScript, script;
            callback = once(callback);
            if (window.Plaid) {
              callback(null, window.Plaid);
              return;
            }
            existingScript = document.querySelector(
              'script[src="' + constants.PLAID_LINK_JS + '"]'
            );
            if (existingScript) {
              addLoadListeners(existingScript, callback);
            } else {
              script = document.createElement("script");
              script.src = constants.PLAID_LINK_JS;
              script.async = true;
              addLoadListeners(script, callback);
              document.body.appendChild(script);
              this._plaidScript = script;
            }
          };
          function addLoadListeners(script, callback) {
            function loadHandler() {
              var readyState = this.readyState;
              if (!readyState || readyState === "loaded" || readyState === "complete") {
                removeLoadListeners();
                callback(null, window.Plaid);
              }
            }
            function errorHandler() {
              script.parentNode.removeChild(script);
              callback(new BraintreeError(errors.US_BANK_ACCOUNT_LOGIN_LOAD_FAILED));
            }
            function removeLoadListeners() {
              script.removeEventListener("error", errorHandler);
              script.removeEventListener("load", loadHandler);
              script.removeEventListener("readystatechange", loadHandler);
            }
            script.addEventListener("error", errorHandler);
            script.addEventListener("load", loadHandler);
            script.addEventListener("readystatechange", loadHandler);
          }
          function formatBillingAddressForGraphQL(address) {
            return {
              streetAddress: address.streetAddress,
              extendedAddress: address.extendedAddress,
              city: address.locality,
              state: address.region,
              zipCode: address.postalCode
            };
          }
          function formatDataForOwnershipType(data, details) {
            if (details.ownershipType === "personal") {
              data.individualOwner = {
                firstName: details.firstName,
                lastName: details.lastName
              };
            } else if (details.ownershipType === "business") {
              data.businessOwner = {
                businessName: details.businessName
              };
            }
          }
          function createGraphQLMutation(type) {
            return "mutation Tokenize" + type + "($input: Tokenize" + type + "Input!) {  tokenize" + type + "(input: $input) {    paymentMethod {      id      details {        ... on UsBankAccountDetails {          last4        }      }    }  }}";
          }
          USBankAccount.prototype.teardown = function() {
            if (this._plaidScript) {
              document.body.removeChild(this._plaidScript);
            }
            convertMethodsToError(this, methods(USBankAccount.prototype));
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(USBankAccount);
        }, { "../lib/analytics": 119, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/errors": 135, "../lib/methods": 155, "../lib/once": 156, "./constants": 206, "./errors": 207, "@braintree/wrap-promise": 43 }], 210: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN: {
              type: BraintreeError.types.MERCHANT,
              code: "VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN",
              message: "A client token with a customer id must be used to delete a payment method nonce."
            },
            VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND: {
              type: BraintreeError.types.MERCHANT,
              code: "VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND"
            },
            VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR"
            }
          };
        }, { "../lib/braintree-error": 124 }], 211: [function(_dereq_, module3, exports3) {
          "use strict";
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var VaultManager = _dereq_("./vault-manager");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "Vault Manager";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return new VaultManager({
                createPromise: createDeferredClient.create({
                  authorization: options.authorization,
                  client: options.client,
                  debug: options.debug,
                  assetsUrl: createAssetsUrl.create(options.authorization),
                  name
                })
              });
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/basic-component-verification": 122, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./vault-manager": 212, "@braintree/wrap-promise": 43 }], 212: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var errors = _dereq_("./errors");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var methods = _dereq_("../lib/methods");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var DELETE_PAYMENT_METHOD_MUTATION = "mutation DeletePaymentMethodFromSingleUseToken($input: DeletePaymentMethodFromSingleUseTokenInput!) {  deletePaymentMethodFromSingleUseToken(input: $input) {    clientMutationId  }}";
          function VaultManager(options) {
            this._createPromise = options.createPromise;
          }
          VaultManager.prototype.fetchPaymentMethods = function(options) {
            var defaultFirst;
            options = options || {};
            defaultFirst = options.defaultFirst === true ? 1 : 0;
            return this._createPromise.then(function(client) {
              return client.request({
                endpoint: "payment_methods",
                method: "get",
                data: {
                  defaultFirst
                }
              });
            }).then(
              function(paymentMethodsPayload) {
                analytics.sendEvent(
                  this._createPromise,
                  "vault-manager.fetch-payment-methods.succeeded"
                );
                return paymentMethodsPayload.paymentMethods.map(
                  formatPaymentMethodPayload
                );
              }.bind(this)
            );
          };
          VaultManager.prototype.deletePaymentMethod = function(paymentMethodNonce) {
            return this._createPromise.then(function(client) {
              var usesClientToken = client.getConfiguration().authorizationType === "CLIENT_TOKEN";
              if (!usesClientToken) {
                return Promise.reject(
                  new BraintreeError(
                    errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_NONCE_REQUIRES_CLIENT_TOKEN
                  )
                );
              }
              return client.request({
                api: "graphQLApi",
                data: {
                  query: DELETE_PAYMENT_METHOD_MUTATION,
                  variables: {
                    input: {
                      singleUseTokenId: paymentMethodNonce
                    }
                  },
                  operationName: "DeletePaymentMethodFromSingleUseToken"
                }
              }).then(function() {
                analytics.sendEvent(
                  client,
                  "vault-manager.delete-payment-method.succeeded"
                );
              }).catch(function(error) {
                var originalError = error.details.originalError;
                var formattedError;
                analytics.sendEvent(
                  client,
                  "vault-manager.delete-payment-method.failed"
                );
                if (originalError[0] && originalError[0].extensions.errorClass === "NOT_FOUND") {
                  formattedError = new BraintreeError({
                    type: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.type,
                    code: errors.VAULT_MANAGER_PAYMENT_METHOD_NONCE_NOT_FOUND.code,
                    message: "A payment method for payment method nonce `" + paymentMethodNonce + "` could not be found.",
                    details: {
                      originalError
                    }
                  });
                }
                if (!formattedError) {
                  formattedError = new BraintreeError({
                    type: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.type,
                    code: errors.VAULT_MANAGER_DELETE_PAYMENT_METHOD_UNKNOWN_ERROR.code,
                    message: "An unknown error occured when attempting to delete the payment method assocaited with the payment method nonce `" + paymentMethodNonce + "`.",
                    details: {
                      originalError
                    }
                  });
                }
                return Promise.reject(formattedError);
              });
            });
          };
          function formatPaymentMethodPayload(paymentMethod) {
            var formattedPaymentMethod = {
              nonce: paymentMethod.nonce,
              default: paymentMethod.default,
              details: paymentMethod.details,
              hasSubscription: paymentMethod.hasSubscription,
              type: paymentMethod.type
            };
            if (paymentMethod.description) {
              formattedPaymentMethod.description = paymentMethod.description;
            }
            if (paymentMethod.binData) {
              formattedPaymentMethod.binData = paymentMethod.binData;
            }
            return formattedPaymentMethod;
          }
          VaultManager.prototype.teardown = function() {
            convertMethodsToError(this, methods(VaultManager.prototype));
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(VaultManager);
        }, { "../lib/analytics": 119, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/methods": 155, "./errors": 210, "@braintree/wrap-promise": 43 }], 213: [function(_dereq_, module3, exports3) {
          "use strict";
          var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : { default: mod };
          };
          var venmo_desktop_1 = __importDefault(_dereq_("./venmo-desktop"));
          module3.exports = function createVenmoDesktop(options) {
            var instance = new venmo_desktop_1.default(options);
            return instance.initialize();
          };
        }, { "./venmo-desktop": 215 }], 214: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = exports3.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = exports3.UPDATE_PAYMENT_CONTEXT_QUERY = exports3.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = exports3.CREATE_PAYMENT_CONTEXT_QUERY = exports3.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = void 0;
          exports3.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoQRCodePaymentContext($input: CreateVenmoQRCodePaymentContextInput!) {\n  createVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n    venmoQRCodePaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
          exports3.CREATE_PAYMENT_CONTEXT_QUERY = "mutation CreateVenmoPaymentContext($input: CreateVenmoPaymentContextInput!) {\n  createVenmoPaymentContext(input: $input) {\n    clientMutationId\n    venmoPaymentContext {\n      id\n      merchantId\n      createdAt\n      expiresAt\n    }\n  }\n}";
          exports3.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoQRCodePaymentContext($input: UpdateVenmoQRCodePaymentContextInput!) {\n  updateVenmoQRCodePaymentContext(input: $input) {\n    clientMutationId\n  }\n}";
          exports3.UPDATE_PAYMENT_CONTEXT_QUERY = "mutation UpdateVenmoPaymentContextStatus($input: UpdateVenmoPaymentContextStatusInput!) {\n  updateVenmoPaymentContextStatus(input: $input) {\n    clientMutationId\n  }\n}";
          exports3.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoQRCodePaymentContext {\n      status\n      paymentMethodId\n      userName\n    }\n  }\n}";
          exports3.VENMO_PAYMENT_CONTEXT_STATUS_QUERY = "query PaymentContext($id: ID!) {\n  node(id: $id) {\n    ... on VenmoPaymentContext {\n      status\n      paymentMethodId\n      userName\n      payerInfo {\n        firstName\n        lastName\n        phoneNumber\n        email\n        externalId\n        userName\n        billingAddress {\n          fullName\n          addressLine1\n          addressLine2\n          adminArea1\n          adminArea2\n          postalCode\n          countryCode\n        }\n        shippingAddress {\n          fullName\n          addressLine1\n          addressLine2\n          adminArea1\n          adminArea2\n          postalCode\n          countryCode\n        }\n      }\n    }\n  }\n}";
        }, {}], 215: [function(_dereq_, module3, exports3) {
          "use strict";
          var __assign = this && this.__assign || function() {
            __assign = Object.assign || function(t) {
              for (var s, i = 1, n = arguments.length; i < n; i++) {
                s = arguments[i];
                for (var p in s)
                  if (Object.prototype.hasOwnProperty.call(s, p)) t[p] = s[p];
              }
              return t;
            };
            return __assign.apply(this, arguments);
          };
          var __importDefault = this && this.__importDefault || function(mod) {
            return mod && mod.__esModule ? mod : { default: mod };
          };
          Object.defineProperty(exports3, "__esModule", { value: true });
          var framebus_1 = __importDefault(_dereq_("framebus"));
          var iframer_1 = __importDefault(_dereq_("@braintree/iframer"));
          var uuid_1 = __importDefault(_dereq_("@braintree/uuid"));
          var events_1 = _dereq_("../shared/events");
          var queries_1 = _dereq_("./queries");
          var VENMO_DESKTOP_POLLING_INTERVAL = 1e3;
          var VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION = 2e3;
          var VenmoDesktop = (
            /** @class */
            function() {
              function VenmoDesktop2(options) {
                this.isHidden = true;
                this.env = options.environment;
                this.id = uuid_1.default();
                this.profileId = options.profileId;
                this.displayName = options.displayName;
                this.paymentMethodUsage = options.paymentMethodUsage;
                this.shouldUseLegacyQRCodeMutation = !this.paymentMethodUsage;
                var frameUrl = options.url + "#" + this.env + "_" + this.id;
                this.bus = new framebus_1.default({
                  channel: this.id,
                  verifyDomain: options.verifyDomain,
                  targetFrames: []
                });
                this.apiRequest = options.apiRequest;
                this.sendEvent = options.sendEvent;
                this.Promise = options.Promise;
                this.alertBox = document.createElement("div");
                this.alertBox.setAttribute("data-venmo-desktop-id", this.id);
                this.alertBox.setAttribute("role", "alert");
                this.alertBox.style.position = "fixed";
                this.alertBox.style.display = "none";
                this.alertBox.style.height = "1px";
                this.alertBox.style.width = "1px";
                this.alertBox.style.overflow = "hidden";
                this.alertBox.style.zIndex = "0";
                this.iframe = iframer_1.default({
                  src: frameUrl,
                  name: "venmo-desktop-iframe",
                  style: {
                    display: "none",
                    position: "fixed",
                    top: "0",
                    bottom: "0",
                    right: "0",
                    left: "0",
                    height: "100%",
                    width: "100%",
                    zIndex: "9999999"
                  },
                  title: "Venmo Desktop"
                });
                this.bus.addTargetFrame(this.iframe);
              }
              VenmoDesktop2.prototype.initialize = function() {
                var _this = this;
                return new this.Promise(function(resolve) {
                  _this.bus.on(events_1.VENMO_DESKTOP_IFRAME_READY, function() {
                    resolve(_this);
                  });
                  _this.bus.on(events_1.VENMO_DESKTOP_REQUEST_NEW_QR_CODE, function() {
                    _this.sendEvent("venmo.tokenize.desktop.restarted-from-error-view");
                    _this.startPolling();
                  });
                  document.body.appendChild(_this.iframe);
                  document.body.appendChild(_this.alertBox);
                });
              };
              VenmoDesktop2.prototype.launchDesktopFlow = function() {
                var _this = this;
                this.isHidden = false;
                var promise = new this.Promise(function(resolve, reject) {
                  _this.launchDesktopPromiseRejectFunction = reject;
                  var removeListeners = function() {
                    _this.bus.off(
                      events_1.VENMO_DESKTOP_CUSTOMER_CANCELED,
                      customerCancelledHandler
                    );
                    _this.bus.off(
                      events_1.VENMO_DESKTOP_UNKNOWN_ERROR,
                      unknownErrorHandler
                    );
                  };
                  var unknownErrorHandler = function(err) {
                    removeListeners();
                    _this.sendEvent("venmo.tokenize.desktop.unknown-error");
                    reject({
                      allowUIToHandleError: false,
                      reason: "UNKNOWN_ERROR",
                      err
                    });
                  };
                  var customerCancelledHandler = function() {
                    removeListeners();
                    _this.updateVenmoDesktopPaymentContext("CANCELED");
                    _this.sendEvent(
                      "venmo.tokenize.desktop.status-change.canceled-from-modal"
                    );
                    reject({
                      allowUIToHandleError: false,
                      reason: "CUSTOMER_CANCELED"
                    });
                  };
                  _this.completedHandler = function(payload2) {
                    removeListeners();
                    resolve(payload2);
                  };
                  _this.bus.on(
                    events_1.VENMO_DESKTOP_CUSTOMER_CANCELED,
                    customerCancelledHandler
                  );
                  _this.bus.on(events_1.VENMO_DESKTOP_UNKNOWN_ERROR, unknownErrorHandler);
                });
                this.iframe.style.display = "block";
                this.setAlert("Generating a QR code, get your Venmo app ready");
                this.iframe.focus();
                this.startPolling();
                return promise.then(function(result) {
                  delete _this.venmoContextId;
                  delete _this.launchDesktopPromiseRejectFunction;
                  return result;
                }).catch(function(err) {
                  delete _this.venmoContextId;
                  delete _this.launchDesktopPromiseRejectFunction;
                  return _this.Promise.reject(err);
                });
              };
              VenmoDesktop2.prototype.triggerCompleted = function(result) {
                var _this = this;
                if (this.isHidden) {
                  return;
                }
                setTimeout(function() {
                  if (_this.completedHandler) {
                    _this.completedHandler(result);
                  }
                  delete _this.completedHandler;
                }, VISUAL_DELAY_BEFORE_SIGNALLING_COMPLETION);
              };
              VenmoDesktop2.prototype.triggerRejected = function(err) {
                if (this.launchDesktopPromiseRejectFunction) {
                  this.launchDesktopPromiseRejectFunction(err);
                }
              };
              VenmoDesktop2.prototype.hideDesktopFlow = function() {
                this.setAlert("");
                this.iframe.style.display = "none";
                this.bus.emit(events_1.VENMO_DESKTOP_CLOSED_FROM_PARENT);
                this.isHidden = true;
              };
              VenmoDesktop2.prototype.displayError = function(message) {
                if (this.isHidden) {
                  return;
                }
                this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_ERROR, {
                  message
                });
                this.setAlert(message);
              };
              VenmoDesktop2.prototype.displayQRCode = function(id, merchantId) {
                if (this.isHidden) {
                  return;
                }
                this.bus.emit(events_1.VENMO_DESKTOP_DISPLAY_QR_CODE, {
                  id,
                  merchantId
                });
                this.setAlert("To scan the QR code, open your Venmo app");
              };
              VenmoDesktop2.prototype.authorize = function() {
                if (this.isHidden) {
                  return;
                }
                this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZE);
                this.setAlert("Venmo account authorized");
              };
              VenmoDesktop2.prototype.authorizing = function() {
                if (this.isHidden) {
                  return;
                }
                this.bus.emit(events_1.VENMO_DESKTOP_AUTHORIZING);
                this.setAlert("Authorize on your Venmo app");
              };
              VenmoDesktop2.prototype.startPolling = function() {
                var _this = this;
                return this.createVenmoDesktopPaymentContext().then(function(result) {
                  var expiresIn = new Date(result.expiresAt).getTime() - new Date(result.createdAt).getTime();
                  var expiredTime = Date.now() + expiresIn;
                  _this.displayQRCode(result.id, result.merchantId);
                  return _this.pollForStatusChange(result.status, expiredTime);
                }).then(function(result) {
                  if (!result) {
                    return;
                  }
                  var username = result.userName || "";
                  username = "@" + username.replace("@", "");
                  _this.triggerCompleted({
                    paymentMethodNonce: result.paymentMethodId,
                    username,
                    payerInfo: result.payerInfo,
                    id: _this.venmoContextId || ""
                  });
                }).catch(function(err) {
                  if (err.allowUIToHandleError) {
                    return;
                  }
                  _this.sendEvent("venmo.tokenize.desktop.unhandled-error");
                  _this.triggerRejected(err);
                });
              };
              VenmoDesktop2.prototype.pollForStatusChange = function(status, expiredTime) {
                var _this = this;
                if (!this.venmoContextId) {
                  return this.Promise.resolve();
                }
                if (Date.now() > expiredTime) {
                  return this.updateVenmoDesktopPaymentContext("EXPIRED").then(function() {
                    _this.displayError("Something went wrong");
                    _this.sendEvent("venmo.tokenize.desktop.status-change.sdk-timeout");
                    return _this.Promise.reject({
                      allowUIToHandleError: true,
                      reason: "TIMEOUT"
                    });
                  });
                }
                return this.lookupVenmoDesktopPaymentContext().then(function(response2) {
                  if (!_this.venmoContextId || !response2) {
                    return _this.Promise.resolve();
                  }
                  var newStatus = response2.status;
                  if (newStatus !== status) {
                    status = newStatus;
                    _this.sendEvent(
                      "venmo.tokenize.desktop.status-change." + status.toLowerCase()
                    );
                    switch (status) {
                      case "CREATED":
                        break;
                      case "EXPIRED":
                      case "FAILED":
                      case "CANCELED":
                        var message = status === "CANCELED" ? "The authorization was canceled" : "Something went wrong";
                        _this.displayError(message);
                        return _this.Promise.reject({
                          allowUIToHandleError: true,
                          reason: status
                        });
                      case "SCANNED":
                        _this.authorizing();
                        break;
                      case "APPROVED":
                        _this.authorize();
                        return _this.Promise.resolve(response2);
                      default:
                    }
                  }
                  return new _this.Promise(function(resolve, reject) {
                    setTimeout(function() {
                      _this.pollForStatusChange(status, expiredTime).then(resolve).catch(reject);
                    }, VENMO_DESKTOP_POLLING_INTERVAL);
                  });
                });
              };
              VenmoDesktop2.prototype.teardown = function() {
                this.bus.teardown();
                if (this.iframe.parentNode) {
                  this.iframe.parentNode.removeChild(this.iframe);
                }
                if (this.alertBox.parentNode) {
                  this.alertBox.parentNode.removeChild(this.alertBox);
                }
              };
              VenmoDesktop2.prototype.setAlert = function(message) {
                this.alertBox.style.display = message ? "block" : "none";
                this.alertBox.textContent = message;
              };
              VenmoDesktop2.prototype.createPaymentContextFromGraphqlLegacyQRCodeMutation = function(intent) {
                return this.apiRequest(queries_1.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY, {
                  input: {
                    environment: this.env,
                    intent
                  }
                }).then(function(response2) {
                  return response2.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext;
                });
              };
              VenmoDesktop2.prototype.createPaymentContextFromGraphQL = function(intent) {
                var input = {
                  intent,
                  paymentMethodUsage: this.paymentMethodUsage,
                  customerClient: "DESKTOP"
                };
                if (this.profileId) {
                  input.merchantProfileId = this.profileId;
                }
                if (this.displayName) {
                  input.displayName = this.displayName;
                }
                return this.apiRequest(queries_1.CREATE_PAYMENT_CONTEXT_QUERY, {
                  input
                }).then(function(response2) {
                  return response2.createVenmoPaymentContext.venmoPaymentContext;
                });
              };
              VenmoDesktop2.prototype.createVenmoDesktopPaymentContext = function() {
                var _this = this;
                var contextPromise = this.shouldUseLegacyQRCodeMutation ? this.createPaymentContextFromGraphqlLegacyQRCodeMutation("PAY_FROM_APP") : this.createPaymentContextFromGraphQL("PAY_FROM_APP");
                return contextPromise.then(function(context) {
                  _this.venmoContextId = context.id;
                  var merchantId = _this.profileId || context.merchantId;
                  return {
                    id: context.id,
                    status: context.status,
                    merchantId,
                    createdAt: context.createdAt,
                    expiresAt: context.expiresAt
                  };
                });
              };
              VenmoDesktop2.prototype.updateVenmoDesktopPaymentContext = function(status, additionalOptions) {
                if (additionalOptions === void 0) {
                  additionalOptions = {};
                }
                if (!this.venmoContextId) {
                  return this.Promise.resolve();
                }
                var data = {
                  input: __assign(
                    { id: this.venmoContextId, status },
                    additionalOptions
                  )
                };
                var query = this.shouldUseLegacyQRCodeMutation ? queries_1.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY : queries_1.UPDATE_PAYMENT_CONTEXT_QUERY;
                return this.apiRequest(query, data).then(function() {
                });
              };
              VenmoDesktop2.prototype.lookupVenmoDesktopPaymentContext = function() {
                if (!this.venmoContextId) {
                  return this.Promise.resolve();
                }
                var query = this.shouldUseLegacyQRCodeMutation ? queries_1.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY : queries_1.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
                return this.apiRequest(query, {
                  id: this.venmoContextId
                }).then(function(response2) {
                  return response2.node;
                });
              };
              return VenmoDesktop2;
            }()
          );
          exports3.default = VenmoDesktop;
        }, { "../shared/events": 220, "./queries": 214, "@braintree/iframer": 35, "@braintree/uuid": 39, "framebus": 52 }], 216: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var errors = _dereq_("./shared/errors");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var Venmo = _dereq_("./venmo");
          var supportsVenmo = _dereq_("./shared/supports-venmo");
          var VERSION = "3.102.0";
          function create(options) {
            var name = "Venmo";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              var createPromise, instance;
              if (options.profileId && typeof options.profileId !== "string") {
                return Promise.reject(
                  new BraintreeError(errors.VENMO_INVALID_PROFILE_ID)
                );
              }
              if (options.deepLinkReturnUrl && typeof options.deepLinkReturnUrl !== "string") {
                return Promise.reject(
                  new BraintreeError(errors.VENMO_INVALID_DEEP_LINK_RETURN_URL)
                );
              }
              createPromise = createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              }).then(function(client) {
                var configuration = client.getConfiguration();
                options.client = client;
                if (!configuration.gatewayConfiguration.payWithVenmo) {
                  return Promise.reject(new BraintreeError(errors.VENMO_NOT_ENABLED));
                }
                return client;
              });
              options.createPromise = createPromise;
              instance = new Venmo(options);
              analytics.sendEvent(createPromise, "venmo.initialized");
              return createPromise.then(function() {
                return instance;
              });
            });
          }
          function isBrowserSupported(options) {
            return supportsVenmo.isBrowserSupported(options);
          }
          module3.exports = {
            create: wrapPromise(create),
            isBrowserSupported,
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./shared/errors": 219, "./shared/supports-venmo": 222, "./venmo": 224, "@braintree/wrap-promise": 43 }], 217: [function(_dereq_, module3, exports3) {
          "use strict";
          var isAndroid = _dereq_("@braintree/browser-detection/is-android");
          var isChrome = _dereq_("@braintree/browser-detection/is-chrome");
          var isIos = _dereq_("@braintree/browser-detection/is-ios");
          var isIosSafari = _dereq_("@braintree/browser-detection/is-ios-safari");
          var isIosWebview = _dereq_("@braintree/browser-detection/is-ios-webview");
          var isSamsung = _dereq_("@braintree/browser-detection/is-samsung");
          function isAndroidWebview() {
            return isAndroid() && window.navigator.userAgent.toLowerCase().indexOf("wv") > -1;
          }
          function doesNotSupportWindowOpenInIos() {
            if (!isIos()) {
              return false;
            }
            return isIosWebview() || !isIosSafari();
          }
          function isFacebookOwnedBrowserOnAndroid() {
            var ua = window.navigator.userAgent.toLowerCase();
            if (ua.indexOf("huawei") > -1 && ua.indexOf("fban") > -1) {
              return true;
            }
            if (!isAndroid()) {
              return false;
            }
            return ua.indexOf("fb_iab") > -1 || ua.indexOf("instagram") > -1;
          }
          function isIosChrome() {
            return isIos() && isChrome();
          }
          module3.exports = {
            isAndroid,
            isAndroidWebview,
            isChrome,
            isIos,
            isIosChrome,
            isSamsung,
            isIosSafari,
            isIosWebview,
            isFacebookOwnedBrowserOnAndroid,
            doesNotSupportWindowOpenInIos
          };
        }, { "@braintree/browser-detection/is-android": 22, "@braintree/browser-detection/is-chrome": 24, "@braintree/browser-detection/is-ios": 30, "@braintree/browser-detection/is-ios-safari": 27, "@braintree/browser-detection/is-ios-webview": 28, "@braintree/browser-detection/is-samsung": 31 }], 218: [function(_dereq_, module3, exports3) {
          "use strict";
          module3.exports = {
            DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY: 500,
            DEFAULT_PROCESS_RESULTS_DELAY: 1e3,
            VENMO_APP_OR_MOBILE_AUTH_URL: "https://venmo.com/go/checkout",
            VENMO_MOBILE_APP_AUTH_ONLY_URL: "https://venmo.com/braintree/checkout",
            VENMO_WEB_LOGIN_URL: "https://account.venmo.com/go/web"
          };
        }, {}], 219: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../../lib/braintree-error");
          module3.exports = {
            VENMO_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_NOT_ENABLED",
              message: "Venmo is not enabled for this merchant."
            },
            VENMO_TOKENIZATION_REQUEST_ACTIVE: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_TOKENIZATION_REQUEST_ACTIVE",
              message: "Another tokenization request is active."
            },
            VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE",
              message: "No tokenization in progress."
            },
            VENMO_APP_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "VENMO_APP_FAILED",
              message: "Venmo app encountered a problem."
            },
            VENMO_APP_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_APP_CANCELED",
              message: "Venmo app authorization was canceled."
            },
            VENMO_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_CANCELED",
              message: "User canceled Venmo authorization, or Venmo app is not available."
            },
            VENMO_CUSTOMER_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_CUSTOMER_CANCELED",
              message: "User canceled Venmo authorization."
            },
            VENMO_NETWORK_ERROR: {
              type: BraintreeError.types.NETWORK,
              code: "VENMO_NETWORK_ERROR",
              message: "Something went wrong making the request"
            },
            VENMO_DESKTOP_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_DESKTOP_CANCELED",
              message: "User canceled Venmo authorization by closing the Venmo Desktop modal."
            },
            VENMO_TOKENIZATION_CANCELED_BY_MERCHANT: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_TOKENIZATION_CANCELED_BY_MERCHANT",
              message: "The Venmo tokenization was canceled by the merchant."
            },
            VENMO_DESKTOP_UNKNOWN_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "VENMO_DESKTOP_UNKNOWN_ERROR",
              message: "Something went wrong with the Venmo Desktop flow."
            },
            VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED: {
              type: BraintreeError.types.NETWORK,
              code: "VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED",
              message: "Something went wrong creating the Venmo Payment Context."
            },
            VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR: {
              type: BraintreeError.types.UNKNOWN,
              code: "VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR",
              message: "Something went wrong during mobile polling."
            },
            VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_MOBILE_POLLING_TOKENIZATION_EXPIRED",
              message: "The Venmo authorization request is expired."
            },
            VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED",
              message: "The Venmo authorization was canceled"
            },
            VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT: {
              type: BraintreeError.types.CUSTOMER,
              code: "VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT",
              message: "Customer took too long to authorize Venmo payment."
            },
            VENMO_MOBILE_POLLING_TOKENIZATION_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "VENMO_MOBILE_POLLING_TOKENIZATION_FAILED",
              message: "The Venmo authorization failed."
            },
            VENMO_INVALID_PROFILE_ID: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_INVALID_PROFILE_ID",
              message: "Venmo profile ID is invalid."
            },
            VENMO_INVALID_DEEP_LINK_RETURN_URL: {
              type: BraintreeError.types.MERCHANT,
              code: "VENMO_INVALID_DEEP_LINK_RETURN_URL",
              message: "Venmo deep link return URL is invalid."
            },
            VENMO_TOKENIZATION_FAILED: {
              type: BraintreeError.types.UNKNOWN,
              code: "VENMO_TOKENIZATION_FAILED",
              message: "Venmo encountered a problem"
            },
            VENMO_ECD_DISABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "ECD_DISABLED",
              message: "Cannot collect customer data when ECD is disabled. Enable this feature in the Control Panel to collect this data."
            }
          };
        }, { "../../lib/braintree-error": 124 }], 220: [function(_dereq_, module3, exports3) {
          "use strict";
          Object.defineProperty(exports3, "__esModule", { value: true });
          exports3.VENMO_DESKTOP_UNKNOWN_ERROR = exports3.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = exports3.VENMO_DESKTOP_CLOSED_FROM_PARENT = exports3.VENMO_DESKTOP_IFRAME_READY = exports3.VENMO_DESKTOP_DISPLAY_QR_CODE = exports3.VENMO_DESKTOP_DISPLAY_ERROR = exports3.VENMO_DESKTOP_CUSTOMER_CANCELED = exports3.VENMO_DESKTOP_AUTHORIZING = exports3.VENMO_DESKTOP_AUTHORIZE = exports3.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = void 0;
          exports3.VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT = "VENMO_DESKTOP_AUTHORIZATION_TIMED_OUT";
          exports3.VENMO_DESKTOP_AUTHORIZE = "VENMO_DESKTOP_AUTHORIZE";
          exports3.VENMO_DESKTOP_AUTHORIZING = "VENMO_DESKTOP_AUTHORIZING";
          exports3.VENMO_DESKTOP_CUSTOMER_CANCELED = "VENMO_DESKTOP_CUSTOMER_CANCELED";
          exports3.VENMO_DESKTOP_DISPLAY_ERROR = "VENMO_DESKTOP_DISPLAY_ERROR";
          exports3.VENMO_DESKTOP_DISPLAY_QR_CODE = "VENMO_DESKTOP_DISPLAY_QR_CODE";
          exports3.VENMO_DESKTOP_IFRAME_READY = "VENMO_DESKTOP_IFRAME_READY";
          exports3.VENMO_DESKTOP_CLOSED_FROM_PARENT = "VENMO_DESKTOP_CLOSED_FROM_PARENT";
          exports3.VENMO_DESKTOP_REQUEST_NEW_QR_CODE = "VENMO_DESKTOP_REQUEST_NEW_QR_CODE";
          exports3.VENMO_DESKTOP_UNKNOWN_ERROR = "VENMO_DESKTOP_UNKNOWN_ERROR";
        }, {}], 221: [function(_dereq_, module3, exports3) {
          "use strict";
          var venmoConstants = _dereq_("./constants");
          function getVenmoUrl(options) {
            if (options.useAllowDesktopWebLogin)
              return venmoConstants.VENMO_WEB_LOGIN_URL;
            if (options.mobileWebFallBack)
              return venmoConstants.VENMO_APP_OR_MOBILE_AUTH_URL;
            return venmoConstants.VENMO_MOBILE_APP_AUTH_ONLY_URL;
          }
          module3.exports = getVenmoUrl;
        }, { "./constants": 218 }], 222: [function(_dereq_, module3, exports3) {
          "use strict";
          var browserDetection = _dereq_("./browser-detection");
          var inIframe = _dereq_("../../lib/in-iframe");
          function isBrowserSupported(options) {
            var isKnownUnsupportedMobileBrowser, merchantAllowsDesktopBrowsers, merchantAllowsIosChrome, merchantAllowsReturningToNewBrowserTab, merchantAllowsWebviews;
            var isAndroid = browserDetection.isAndroid();
            var isMobileDevice = isAndroid || browserDetection.isIos();
            var isAndroidChrome = isAndroid && browserDetection.isChrome();
            var isMobileDeviceThatSupportsReturnToSameTab = browserDetection.isIosSafari() || isAndroidChrome;
            options = options || {};
            merchantAllowsDesktopBrowsers = (options.allowDesktopWebLogin || options.allowDesktop) === true;
            merchantAllowsReturningToNewBrowserTab = options.hasOwnProperty(
              "allowNewBrowserTab"
            ) ? options.allowNewBrowserTab : true;
            merchantAllowsWebviews = options.hasOwnProperty("allowWebviews") ? options.allowWebviews : true;
            merchantAllowsIosChrome = merchantAllowsReturningToNewBrowserTab && !inIframe();
            isKnownUnsupportedMobileBrowser = !merchantAllowsIosChrome && browserDetection.isIosChrome() || browserDetection.isFacebookOwnedBrowserOnAndroid() || browserDetection.isSamsung();
            if (isKnownUnsupportedMobileBrowser) {
              return false;
            }
            if (!merchantAllowsWebviews && (browserDetection.isAndroidWebview() || browserDetection.isIosWebview())) {
              return false;
            }
            if (!isMobileDevice) {
              return merchantAllowsDesktopBrowsers;
            }
            if (!merchantAllowsReturningToNewBrowserTab) {
              return isMobileDeviceThatSupportsReturnToSameTab;
            }
            return isMobileDevice;
          }
          module3.exports = {
            isBrowserSupported
          };
        }, { "../../lib/in-iframe": 150, "./browser-detection": 217 }], 223: [function(_dereq_, module3, exports3) {
          "use strict";
          var frameService = _dereq_("../../lib/frame-service/external");
          var useMin = _dereq_("../../lib/use-min");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var errors = _dereq_("../shared/errors");
          var BraintreeError = _dereq_("../../lib/braintree-error");
          var VERSION = "3.102.0";
          var VENMO_LOGO_SVG = '<svg width="198" height="58" viewBox="0 0 198 58" fill="none" xmlns="http://www.w3.org/2000/svg">\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M43.0702 13.6572C44.1935 15.4585 44.6999 17.3139 44.6999 19.6576C44.6999 27.1328 38.1277 36.8436 32.7935 43.6625H20.6099L15.7236 15.2939L26.3917 14.3105L28.9751 34.4966C31.389 30.6783 34.3678 24.6779 34.3678 20.587C34.3678 18.3477 33.9727 16.8225 33.3553 15.5666L43.0702 13.6572Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M56.8965 26.1491C58.8596 26.1491 63.8018 25.2772 63.8018 22.5499C63.8018 21.2402 62.8481 20.587 61.7242 20.587C59.7579 20.587 57.1776 22.8763 56.8965 26.1491ZM56.6715 31.5506C56.6715 34.8807 58.5787 36.1873 61.107 36.1873C63.8603 36.1873 66.4966 35.534 69.923 33.8433L68.6324 42.3523C66.2183 43.4976 62.4559 44.2617 58.8039 44.2617C49.5403 44.2617 46.2249 38.8071 46.2249 31.9879C46.2249 23.1496 51.6179 13.765 62.7365 13.765C68.858 13.765 72.2809 17.0949 72.2809 21.7317C72.2815 29.2066 62.4005 31.4965 56.6715 31.5506Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M103.067 20.3142C103.067 21.4052 102.897 22.9875 102.727 24.0216L99.5262 43.6622H89.1385L92.0585 25.658C92.1139 25.1696 92.284 24.1865 92.284 23.6411C92.284 22.3314 91.4414 22.0047 90.4282 22.0047C89.0826 22.0047 87.7337 22.6042 86.8354 23.0418L83.5234 43.6625H73.0772L77.8495 14.257H86.8908L87.0052 16.6041C89.1382 15.2404 91.9469 13.7656 95.932 13.7656C101.212 13.765 103.067 16.3845 103.067 20.3142Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M133.906 16.9841C136.881 14.9131 139.69 13.765 143.563 13.765C148.897 13.765 150.753 16.3845 150.753 20.3142C150.753 21.4052 150.583 22.9875 150.413 24.0216L147.216 43.6622H136.825L139.801 25.2774C139.855 24.786 139.971 24.1865 139.971 23.8063C139.971 22.3317 139.128 22.0047 138.115 22.0047C136.824 22.0047 135.535 22.5501 134.577 23.0418L131.266 43.6625H120.878L123.854 25.2777C123.908 24.7863 124.02 24.1868 124.02 23.8065C124.02 22.332 123.177 22.0049 122.167 22.0049C120.819 22.0049 119.473 22.6045 118.574 23.0421L115.26 43.6628H104.817L109.589 14.2573H118.52L118.8 16.7122C120.878 15.241 123.684 13.7662 127.446 13.7662C130.704 13.765 132.837 15.129 133.906 16.9841Z" fill="white"/>\n  <path fill-rule="evenodd" clip-rule="evenodd" d="M171.426 25.5502C171.426 23.1496 170.808 21.513 168.956 21.513C164.857 21.513 164.015 28.55 164.015 32.1498C164.015 34.8807 164.802 36.5709 166.653 36.5709C170.528 36.5709 171.426 29.1497 171.426 25.5502ZM153.458 31.7152C153.458 22.442 158.511 13.765 170.136 13.765C178.896 13.765 182.098 18.7854 182.098 25.7148C182.098 34.8805 177.099 44.3723 165.194 44.3723C156.378 44.3723 153.458 38.7525 153.458 31.7152Z" fill="white"/>\n</svg>';
          var CONTINUE_OR_CANCEL_INSTRUCTIONS = "Tap cancel payment to cancel and return to the business. Continue payment will relaunch the payment window.";
          var POPUP_WIDTH = 400;
          var POPUP_HEIGHT = 570;
          var ELEMENT_IDS = {
            backdrop: "venmo-desktop-web-backdrop",
            backdropHidden: "venmo-desktop-web-backdrop.hidden",
            backdropContainer: "venmo-backdrop-container",
            cancelButton: "venmo-popup-cancel-button",
            continueButton: "venmo-popup-continue-button",
            message: "venmo-message",
            instructions: "venmo-instructions",
            venmoLogo: "venmo-full-logo"
          };
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function openPopup(options) {
            var frameServiceInstance = options.frameServiceInstance;
            var venmoUrl = options.venmoUrl;
            var checkForStatusChange = options.checkForStatusChange;
            var cancelTokenization = options.cancelTokenization;
            var checkPaymentContextStatus = options.checkPaymentContextStatus;
            var extendedPromise = new ExtendedPromise();
            document.getElementById(ELEMENT_IDS.continueButton).addEventListener("click", function() {
              frameServiceInstance.focus();
            });
            document.getElementById(ELEMENT_IDS.cancelButton).addEventListener("click", function() {
              frameServiceInstance.close();
              cancelTokenization();
              closeBackdrop();
            });
            frameServiceInstance.open({}, function(frameServiceErr) {
              var retryStartingCount = 1;
              if (frameServiceErr) {
                extendedPromise.reject(frameServiceErr);
              } else {
                checkForStatusChange(retryStartingCount).then(function(data) {
                  extendedPromise.resolve(data);
                }).catch(function(statusCheckError) {
                  checkPaymentContextStatus().then(function(node) {
                    if (node.status === "CREATED") {
                      extendedPromise.reject(
                        new BraintreeError(errors.VENMO_CUSTOMER_CANCELED)
                      );
                    } else {
                      extendedPromise.reject(statusCheckError);
                    }
                  });
                });
              }
              frameServiceInstance.close();
              closeBackdrop();
            });
            frameServiceInstance.redirect(venmoUrl);
            return extendedPromise;
          }
          function centeredPopupDimensions() {
            var popupTop = Math.round((window.outerHeight - POPUP_HEIGHT) / 2) + window.screenTop;
            var popupLeft = Math.round((window.outerWidth - POPUP_WIDTH) / 2) + window.screenLeft;
            return {
              top: popupTop,
              left: popupLeft
            };
          }
          function closeBackdrop() {
            document.getElementById("venmo-desktop-web-backdrop").classList.add("hidden");
          }
          function getElementStyles() {
            var backdropStyles = [
              "#" + ELEMENT_IDS.backdropHidden + " {",
              "display: none;",
              "}",
              "#" + ELEMENT_IDS.backdrop + " {",
              "z-index: 3141592632;",
              "cursor: pointer;",
              "position: fixed;",
              "top: 0;",
              "left: 0;",
              "bottom: 0;",
              "width: 100%;",
              "background: rgba(0, 0, 0, 0.8);",
              "}"
            ];
            var backdropContainerStyles = [
              "#" + ELEMENT_IDS.backdropContainer + " {",
              "display: flex;",
              "align-content: center;",
              "justify-content: center;",
              "align-items: center;",
              "width: 100%;",
              "height: 100%;",
              "flex-direction: column;",
              "}"
            ];
            var cancelButtonStyles = [
              "#" + ELEMENT_IDS.cancelButton + " {",
              "height: 24px;",
              "width: 380px;",
              "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
              "font-style: normal;",
              "font-weight: 700;",
              "font-size: 18px;",
              "line-height: 24px;",
              "text-align: center;",
              "background-color: transparent;",
              "border: none;",
              "color: #FFFFFF;",
              "margin-top: 28px;",
              "}"
            ];
            var continueButtonStyles = [
              "#" + ELEMENT_IDS.continueButton + " {",
              "width: 400px;",
              "height: 50px;",
              "background: #0074DE;",
              "border-radius: 24px;",
              "border: none;",
              "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
              "font-style: normal;",
              "font-weight: 700;",
              "font-size: 18px;",
              "color: #FFFFFF;",
              "margin-top: 44px;",
              "}"
            ];
            var messageStyles = [
              "#" + ELEMENT_IDS.message + " {",
              "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
              "font-style: normal;",
              "font-weight: 500;",
              "font-size: 24px;",
              "line-height: 32px;",
              "text-align: center;",
              "color: #FFFFFF;",
              "margin-top: 32px;",
              "}"
            ];
            var instructionStyles = [
              "#" + ELEMENT_IDS.instructions + " {",
              "font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;",
              "font-style: normal;",
              "font-weight: 400;",
              "font-size: 16px;",
              "line-height: 20px;",
              "text-align: center;",
              "color: #FFFFFF;",
              "margin-top: 16px;",
              "width: 400px;",
              "}"
            ];
            var allStyles = backdropStyles.concat(
              backdropContainerStyles,
              cancelButtonStyles,
              continueButtonStyles,
              messageStyles,
              instructionStyles
            );
            return allStyles.join("\n");
          }
          function buildAndStyleElements() {
            var alreadyRenderedBackdrop = document.getElementById(ELEMENT_IDS.backdrop);
            var backdropStylesElement, backdropDiv, backDropContentContainer, venmoLogoDiv, venmoMessageDiv, instructionsDiv, continueButton, cancelButton;
            if (alreadyRenderedBackdrop) {
              alreadyRenderedBackdrop.classList.remove("hidden");
              return;
            }
            backdropStylesElement = document.createElement("style");
            backdropDiv = document.createElement("div");
            backDropContentContainer = document.createElement("div");
            venmoLogoDiv = document.createElement("div");
            venmoMessageDiv = document.createElement("div");
            instructionsDiv = document.createElement("div");
            continueButton = document.createElement("button");
            cancelButton = document.createElement("button");
            backdropStylesElement.id = "venmo-desktop-web__injected-styles";
            backdropStylesElement.innerHTML = getElementStyles();
            backdropDiv.id = ELEMENT_IDS.backdrop;
            backDropContentContainer.id = ELEMENT_IDS.backdropContainer;
            venmoLogoDiv.id = ELEMENT_IDS.venmoLogo;
            venmoLogoDiv.innerHTML = VENMO_LOGO_SVG;
            venmoMessageDiv.id = ELEMENT_IDS.message;
            venmoMessageDiv.innerText = "What would you like to do?";
            instructionsDiv.id = ELEMENT_IDS.instructions;
            instructionsDiv.innerText = CONTINUE_OR_CANCEL_INSTRUCTIONS;
            continueButton.id = ELEMENT_IDS.continueButton;
            continueButton.innerText = "Continue payment";
            cancelButton.id = ELEMENT_IDS.cancelButton;
            cancelButton.innerText = "Cancel payment";
            document.head.appendChild(backdropStylesElement);
            backDropContentContainer.appendChild(venmoLogoDiv);
            backDropContentContainer.appendChild(venmoMessageDiv);
            backDropContentContainer.appendChild(instructionsDiv);
            backDropContentContainer.appendChild(continueButton);
            backDropContentContainer.appendChild(cancelButton);
            backdropDiv.appendChild(backDropContentContainer);
            document.body.appendChild(backdropDiv);
            backdropDiv.addEventListener("click", function(event) {
              event.stopPropagation();
            });
          }
          function runWebLogin(options) {
            buildAndStyleElements();
            return openPopup(options);
          }
          function setupDesktopWebLogin(options) {
            var extendedPromise = new ExtendedPromise();
            var popupName = "venmoDesktopWebLogin";
            var assetsUrl = options.assetsUrl;
            var debug = options.debug || false;
            var popupLocation = centeredPopupDimensions();
            var assetsBaseUrl = assetsUrl + "/web/" + VERSION + "/html";
            frameService.create(
              {
                name: popupName,
                dispatchFrameUrl: assetsBaseUrl + "/dispatch-frame" + useMin(debug) + ".html",
                openFrameUrl: assetsBaseUrl + "/venmo-landing-frame" + useMin(debug) + ".html",
                top: popupLocation.top,
                left: popupLocation.left,
                height: POPUP_HEIGHT,
                width: POPUP_WIDTH
              },
              function(frameServiceInstance) {
                extendedPromise.resolve(frameServiceInstance);
              }
            );
            return extendedPromise;
          }
          module3.exports = {
            runWebLogin,
            openPopup,
            setupDesktopWebLogin,
            POPUP_WIDTH,
            POPUP_HEIGHT
          };
        }, { "../../lib/braintree-error": 124, "../../lib/frame-service/external": 139, "../../lib/use-min": 160, "../shared/errors": 219, "@braintree/extended-promise": 34 }], 224: [function(_dereq_, module3, exports3) {
          "use strict";
          var analytics = _dereq_("../lib/analytics");
          var isBrowserSupported = _dereq_("./shared/supports-venmo");
          var browserDetection = _dereq_("./shared/browser-detection");
          var constants = _dereq_("./shared/constants");
          var errors = _dereq_("./shared/errors");
          var querystring = _dereq_("../lib/querystring");
          var isVerifiedDomain = _dereq_("../lib/is-verified-domain");
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var inIframe = _dereq_("../lib/in-iframe");
          var ExtendedPromise = _dereq_("@braintree/extended-promise");
          var getVenmoUrl = _dereq_("./shared/get-venmo-url");
          var desktopWebLogin = _dereq_("./shared/web-login-backdrop");
          var snakeCaseToCamelCase = _dereq_("../lib/snake-case-to-camel-case");
          var createVenmoDesktop = _dereq_("./external/");
          var graphqlQueries = _dereq_("./external/queries");
          var VERSION = "3.102.0";
          var DEFAULT_MOBILE_POLLING_INTERVAL = 250;
          var DEFAULT_MOBILE_EXPIRING_THRESHOLD = 3e5;
          ExtendedPromise.suppressUnhandledPromiseMessage = true;
          function Venmo(options) {
            var self2 = this;
            this._allowDesktopWebLogin = options.allowDesktopWebLogin || false;
            this._mobileWebFallBack = options.mobileWebFallBack || false;
            this._createPromise = options.createPromise;
            this._allowNewBrowserTab = options.allowNewBrowserTab !== false;
            this._allowWebviews = options.allowWebviews !== false;
            this._allowDesktop = options.allowDesktop === true;
            this._useRedirectForIOS = options.useRedirectForIOS === true;
            this._profileId = options.profileId;
            this._displayName = options.displayName;
            this._deepLinkReturnUrl = options.deepLinkReturnUrl;
            this._ignoreHistoryChanges = options.ignoreHistoryChanges;
            this._paymentMethodUsage = (options.paymentMethodUsage || "").toUpperCase();
            this._shouldUseLegacyFlow = !this._paymentMethodUsage;
            this._requireManualReturn = options.requireManualReturn === true;
            this._useDesktopQRFlow = this._allowDesktop && this._isDesktop() && !this._allowDesktopWebLogin;
            this._useAllowDesktopWebLogin = this._allowDesktopWebLogin && this._isDesktop();
            this._cannotHaveReturnUrls = inIframe() || this._requireManualReturn;
            this._allowAndroidRecreation = options.allowAndroidRecreation !== false;
            this._maxRetryCount = 3;
            this._collectCustomerBillingAddress = options.collectCustomerBillingAddress || false;
            this._collectCustomerShippingAddress = options.collectCustomerShippingAddress || false;
            this._isFinalAmount = options.isFinalAmount || false;
            this._lineItems = options.lineItems;
            this._subTotalAmount = options.subTotalAmount;
            this._discountAmount = options.discountAmount;
            this._taxAmount = options.taxAmount;
            this._shippingAmount = options.shippingAmount;
            this._totalAmount = options.totalAmount;
            this._shouldCreateVenmoPaymentContext = this._cannotHaveReturnUrls || !this._shouldUseLegacyFlow;
            analytics.sendEvent(
              this._createPromise,
              "venmo.desktop-flow.configured." + String(Boolean(this._allowDesktop))
            );
            if (this.hasTokenizationResult()) {
              analytics.sendEvent(
                this._createPromise,
                "venmo.appswitch.return-in-new-tab"
              );
            } else if (this._useDesktopQRFlow) {
              this._createPromise = this._createPromise.then(function(client) {
                var config = client.getConfiguration().gatewayConfiguration;
                return createVenmoDesktop({
                  url: config.assetsUrl + "/web/" + VERSION + "/html/venmo-desktop-frame.html",
                  environment: config.environment === "production" ? "PRODUCTION" : "SANDBOX",
                  profileId: self2._profileId || config.payWithVenmo.merchantId,
                  paymentMethodUsage: self2._paymentMethodUsage,
                  displayName: self2._displayName,
                  Promise,
                  apiRequest: function(query, data) {
                    return client.request({
                      api: "graphQLApi",
                      data: {
                        query,
                        variables: data
                      }
                    }).then(function(response2) {
                      return response2.data;
                    });
                  },
                  sendEvent: function(eventName) {
                    analytics.sendEvent(self2._createPromise, eventName);
                  },
                  verifyDomain: isVerifiedDomain
                }).then(function(venmoDesktopInstance) {
                  self2._venmoDesktopInstance = venmoDesktopInstance;
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo.desktop-flow.presented"
                  );
                  return client;
                }).catch(function() {
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo.desktop-flow.setup-failed"
                  );
                  self2._useDesktopQRFlow = false;
                  return client;
                });
              });
            } else if (this._shouldCreateVenmoPaymentContext) {
              this._mobilePollingInterval = DEFAULT_MOBILE_POLLING_INTERVAL;
              this._mobilePollingExpiresThreshold = DEFAULT_MOBILE_EXPIRING_THRESHOLD;
              this._createPromise = this._createPromise.then(function(client) {
                var paymentContextPromise, webLoginPromise;
                var analyticsCategory = self2._cannotHaveReturnUrls ? "manual-return" : "mobile-payment-context";
                var config = client.getConfiguration();
                webLoginPromise = desktopWebLogin.setupDesktopWebLogin({
                  assetsUrl: config.gatewayConfiguration.assetsUrl,
                  debug: config.isDebug
                }).then(function(frameServiceInstance) {
                  self2._frameServiceInstance = frameServiceInstance;
                }).catch(function(desktopWebErr) {
                  return desktopWebErr;
                });
                self2._mobilePollingContextEnvironment = config.gatewayConfiguration.environment.toUpperCase();
                paymentContextPromise = self2._createVenmoPaymentContext(client).then(function() {
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo." + analyticsCategory + ".presented"
                  );
                  return client;
                }).catch(function(err) {
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo." + analyticsCategory + ".setup-failed"
                  );
                  return Promise.reject(
                    new BraintreeError({
                      type: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.type,
                      code: errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.code,
                      message: isValidationError(err) ? err.details.originalError[0].message : errors.VENMO_MOBILE_PAYMENT_CONTEXT_SETUP_FAILED.message,
                      details: {
                        originalError: err
                      }
                    })
                  );
                });
                return ExtendedPromise.all([webLoginPromise, paymentContextPromise]).then(function(results) {
                  var paymentContextResult = results[1];
                  return Promise.resolve(paymentContextResult);
                }).catch(function(promiseErr) {
                  return Promise.reject(promiseErr);
                });
              });
            }
          }
          function isValidationError(err) {
            return err.details && err.details.originalError && err.details.originalError[0] && err.details.originalError[0].extensions && err.details.originalError[0].extensions.errorClass === "VALIDATION" && err.details.originalError[0].extensions.errorType === "user_error";
          }
          Venmo.prototype._createVenmoPaymentContext = function(client, cancelIfTokenizationInProgress) {
            var self2 = this;
            var promise, transactionDetails;
            var configuration = client.getConfiguration();
            var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
            var transactionDetailsPresent = false;
            var customerClientChannel = self2._useAllowDesktopWebLogin ? "NATIVE_WEB" : "MOBILE_WEB";
            if (!this._shouldCreateVenmoPaymentContext) {
              return Promise.resolve();
            }
            if (this._shouldUseLegacyFlow) {
              promise = client.request({
                api: "graphQLApi",
                data: {
                  query: graphqlQueries.LEGACY_CREATE_PAYMENT_CONTEXT_QUERY,
                  variables: {
                    input: {
                      environment: this._mobilePollingContextEnvironment,
                      intent: "PAY_FROM_APP"
                    }
                  }
                }
              }).then(function(response2) {
                return response2.data.createVenmoQRCodePaymentContext.venmoQRCodePaymentContext;
              });
            } else {
              if ((this._collectCustomerBillingAddress || this._collectCustomerShippingAddress) && !venmoConfiguration.enrichedCustomerDataEnabled) {
                return Promise.reject(new BraintreeError(errors.VENMO_ECD_DISABLED));
              }
              if (this._lineItems) {
                this._lineItems.forEach(function(item) {
                  item.unitTaxAmount = item.unitTaxAmount || "0";
                });
              }
              transactionDetails = {
                subTotalAmount: this._subTotalAmount,
                discountAmount: this._discountAmount,
                taxAmount: this._taxAmount,
                shippingAmount: this._shippingAmount,
                totalAmount: this._totalAmount,
                lineItems: this._lineItems
              };
              transactionDetailsPresent = Object.keys(transactionDetails).some(function(detail) {
                return transactionDetails[detail] !== void 0;
              });
              promise = client.request({
                api: "graphQLApi",
                data: {
                  query: graphqlQueries.CREATE_PAYMENT_CONTEXT_QUERY,
                  variables: {
                    input: {
                      paymentMethodUsage: this._paymentMethodUsage,
                      intent: "CONTINUE",
                      customerClient: customerClientChannel,
                      isFinalAmount: this._isFinalAmount,
                      displayName: this._displayName,
                      paysheetDetails: {
                        collectCustomerBillingAddress: this._collectCustomerBillingAddress,
                        collectCustomerShippingAddress: this._collectCustomerShippingAddress,
                        transactionDetails: transactionDetailsPresent ? transactionDetails : void 0
                        // eslint-disable-line no-undefined
                      }
                    }
                  }
                }
              }).then(function(response2) {
                return response2.data.createVenmoPaymentContext.venmoPaymentContext;
              });
            }
            return promise.then(function(context) {
              var expiredTime = new Date(context.expiresAt) - new Date(context.createdAt);
              var refreshIn = expiredTime * 0.6666;
              clearTimeout(self2._refreshPaymentContextTimeout);
              self2._refreshPaymentContextTimeout = setTimeout(function() {
                if (self2._tokenizationInProgress) {
                  return;
                }
                self2._createVenmoPaymentContext(client, true);
              }, refreshIn);
              if (cancelIfTokenizationInProgress && self2._tokenizationInProgress) {
                return;
              }
              self2._venmoPaymentContextStatus = context.status;
              self2._venmoPaymentContextId = context.id;
            });
          };
          Venmo.prototype.appSwitch = function(url) {
            if (this._deepLinkReturnUrl) {
              if (isIosWebviewInDeepLinkReturnUrlFlow()) {
                analytics.sendEvent(
                  this._createPromise,
                  "venmo.appswitch.start.ios-webview"
                );
                window.location.href = url;
              } else if (window.popupBridge && typeof window.popupBridge.open === "function") {
                analytics.sendEvent(
                  this._createPromise,
                  "venmo.appswitch.start.popup-bridge"
                );
                window.popupBridge.open(url);
              } else {
                analytics.sendEvent(this._createPromise, "venmo.appswitch.start.webview");
                window.open(url);
              }
            } else {
              analytics.sendEvent(this._createPromise, "venmo.appswitch.start.browser");
              if (browserDetection.doesNotSupportWindowOpenInIos() || this._shouldUseRedirectStrategy()) {
                window.location.href = url;
              } else {
                window.open(url);
              }
            }
          };
          Venmo.prototype.getUrl = function() {
            return this._createPromise.then(
              function(client) {
                var configuration = client.getConfiguration();
                var params = {};
                var currentUrl = this._deepLinkReturnUrl || window.location.href.replace(window.location.hash, "");
                var venmoConfiguration = configuration.gatewayConfiguration.payWithVenmo;
                var analyticsMetadata = configuration.analyticsMetadata;
                var accessToken = venmoConfiguration.accessToken;
                var braintreeData = {
                  _meta: {
                    version: analyticsMetadata.sdkVersion,
                    integration: analyticsMetadata.integration,
                    platform: analyticsMetadata.platform,
                    sessionId: analyticsMetadata.sessionId
                  }
                };
                this._isDebug = configuration.isDebug;
                this._assetsUrl = configuration.gatewayConfiguration.assetsUrl;
                currentUrl = currentUrl.replace(/#*$/, "");
                if (this._venmoPaymentContextId) {
                  if (this._shouldUseLegacyFlow) {
                    accessToken += "|pcid:" + this._venmoPaymentContextId;
                  } else {
                    params.resource_id = this._venmoPaymentContextId;
                  }
                }
                if (this._shouldIncludeReturnUrls() || this._useAllowDesktopWebLogin) {
                  if (this._useAllowDesktopWebLogin) {
                    currentUrl = this._assetsUrl + "/web/" + VERSION + "/html/redirect-frame.html";
                  }
                  params["x-success"] = currentUrl + "#venmoSuccess=1";
                  params["x-cancel"] = currentUrl + "#venmoCancel=1";
                  params["x-error"] = currentUrl + "#venmoError=1";
                } else {
                  params["x-success"] = "NOOP";
                  params["x-cancel"] = "NOOP";
                  params["x-error"] = "NOOP";
                }
                if (!this._allowAndroidRecreation) {
                  params.allowAndroidRecreation = 0;
                } else {
                  params.allowAndroidRecreation = 1;
                }
                params.ua = window.navigator.userAgent;
                params.braintree_merchant_id = this._profileId || venmoConfiguration.merchantId;
                params.braintree_access_token = accessToken;
                params.braintree_environment = venmoConfiguration.environment;
                params.braintree_sdk_data = btoa(JSON.stringify(braintreeData));
                return getVenmoUrl({
                  useAllowDesktopWebLogin: this._useAllowDesktopWebLogin,
                  mobileWebFallBack: this._mobileWebFallBack
                }) + "?" + querystring.stringify(params);
              }.bind(this)
            );
          };
          Venmo.prototype.isBrowserSupported = function() {
            return isBrowserSupported.isBrowserSupported({
              allowNewBrowserTab: this._allowNewBrowserTab,
              allowWebviews: this._allowWebviews,
              allowDesktop: this._allowDesktop,
              allowDesktopWebLogin: this._allowDesktopWebLogin
            });
          };
          Venmo.prototype.hasTokenizationResult = function() {
            return this._hasTokenizationResult();
          };
          Venmo.prototype._hasTokenizationResult = function(hash) {
            var params = getFragmentParameters(hash);
            return typeof (params.venmoSuccess || params.venmoError || params.venmoCancel) !== "undefined";
          };
          Venmo.prototype._shouldIncludeReturnUrls = function() {
            if (this._deepLinkReturnUrl) {
              return true;
            }
            return !this._cannotHaveReturnUrls;
          };
          Venmo.prototype._isDesktop = function() {
            return !(browserDetection.isIos() || browserDetection.isAndroid());
          };
          Venmo.prototype.tokenize = function(options) {
            var self2 = this;
            var tokenizationPromise;
            options = options || {};
            if (this._tokenizationInProgress === true) {
              return Promise.reject(
                new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_ACTIVE)
              );
            }
            this._tokenizationInProgress = true;
            if (this._useDesktopQRFlow) {
              tokenizationPromise = this._tokenizeForDesktopQRFlow(options);
            } else if (this._useAllowDesktopWebLogin) {
              tokenizationPromise = this._tokenizeWebLoginWithRedirect();
            } else if (this._cannotHaveReturnUrls) {
              tokenizationPromise = this._tokenizeForMobileWithManualReturn();
            } else {
              tokenizationPromise = this._tokenizeForMobileWithHashChangeListeners(options);
            }
            return tokenizationPromise.then(function(payload2) {
              return self2._createPromise.then(function(client) {
                return self2._createVenmoPaymentContext(client);
              }).then(function() {
                self2._tokenizationInProgress = false;
                return formatTokenizePayload(payload2);
              });
            }).catch(function(err) {
              return self2._createPromise.then(function(client) {
                return self2._createVenmoPaymentContext(client);
              }).then(function() {
                self2._tokenizationInProgress = false;
                return Promise.reject(err);
              });
            });
          };
          Venmo.prototype.cancelTokenization = function() {
            if (!this._tokenizationInProgress) {
              return Promise.reject(
                new BraintreeError(errors.VENMO_TOKENIZATION_REQUEST_NOT_ACTIVE)
              );
            }
            this._removeVisibilityEventListener();
            if (this._tokenizePromise) {
              this._tokenizePromise.reject(
                new BraintreeError(errors.VENMO_TOKENIZATION_CANCELED_BY_MERCHANT)
              );
            }
            return Promise.all([
              this._cancelMobilePaymentContext(),
              this._cancelVenmoDesktopContext()
            ]);
          };
          Venmo.prototype._tokenizeWebLoginWithRedirect = function() {
            var self2 = this;
            analytics.sendEvent(self2._createPromise, "venmo.tokenize.web-login.start");
            this._tokenizePromise = new ExtendedPromise();
            return this.getUrl().then(function(url) {
              desktopWebLogin.runWebLogin({
                checkForStatusChange: self2._checkPaymentContextStatusAndProcessResult.bind(self2),
                cancelTokenization: self2.cancelTokenization.bind(self2),
                frameServiceInstance: self2._frameServiceInstance,
                venmoUrl: url,
                debug: self2._isDebug,
                checkPaymentContextStatus: self2._checkPaymentContextStatus.bind(self2)
              }).then(function(payload2) {
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.tokenize.web-login.success"
                );
                self2._tokenizePromise.resolve({
                  paymentMethodNonce: payload2.paymentMethodId,
                  username: payload2.userName,
                  payerInfo: payload2.payerInfo,
                  id: self2._venmoPaymentContextId
                });
              }).catch(function(err) {
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.tokenize.web-login.failure"
                );
                self2._tokenizePromise.reject(err);
              });
              return self2._tokenizePromise;
            });
          };
          Venmo.prototype._queryPaymentContextStatus = function(id) {
            var self2 = this;
            return this._createPromise.then(function(client) {
              var query = self2._shouldUseLegacyFlow ? graphqlQueries.LEGACY_VENMO_PAYMENT_CONTEXT_STATUS_QUERY : graphqlQueries.VENMO_PAYMENT_CONTEXT_STATUS_QUERY;
              return client.request({
                api: "graphQLApi",
                data: {
                  query,
                  variables: {
                    id
                  }
                }
              });
            }).then(function(response2) {
              return response2.data.node;
            });
          };
          Venmo.prototype._checkPaymentContextStatusAndProcessResult = function(retryCount) {
            var self2 = this;
            return self2._checkPaymentContextStatus().then(function(node) {
              var resultStatus = node.status;
              if (resultStatus !== self2._venmoPaymentContextStatus) {
                self2._venmoPaymentContextStatus = resultStatus;
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.tokenize.web-login.status-change"
                );
                switch (resultStatus) {
                  case "APPROVED":
                    return Promise.resolve(node);
                  case "CANCELED":
                    return Promise.reject(
                      new BraintreeError(errors.VENMO_CUSTOMER_CANCELED)
                    );
                  case "FAILED":
                    return Promise.reject(
                      new BraintreeError(errors.VENMO_TOKENIZATION_FAILED)
                    );
                  default:
                }
              }
              return new Promise(function(resolve, reject) {
                if (retryCount < self2._maxRetryCount) {
                  retryCount++;
                  return self2._checkPaymentContextStatusAndProcessResult(retryCount).then(resolve).catch(reject);
                }
                return reject(new BraintreeError(errors.VENMO_TOKENIZATION_FAILED));
              });
            });
          };
          Venmo.prototype._checkPaymentContextStatus = function() {
            var self2 = this;
            return self2._queryPaymentContextStatus(self2._venmoPaymentContextId).catch(function(networkError) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.VENMO_NETWORK_ERROR.type,
                  code: errors.VENMO_NETWORK_ERROR.code,
                  message: errors.VENMO_NETWORK_ERROR.message,
                  details: networkError
                })
              );
            }).then(function(node) {
              return Promise.resolve(node);
            });
          };
          Venmo.prototype._pollForStatusChange = function() {
            var self2 = this;
            if (Date.now() > self2._mobilePollingContextExpiresIn) {
              return Promise.reject(
                new BraintreeError(errors.VENMO_MOBILE_POLLING_TOKENIZATION_TIMEOUT)
              );
            }
            return this._queryPaymentContextStatus(this._venmoPaymentContextId).catch(function(networkError) {
              return Promise.reject(
                new BraintreeError({
                  type: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.type,
                  code: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.code,
                  message: errors.VENMO_MOBILE_POLLING_TOKENIZATION_NETWORK_ERROR.message,
                  details: {
                    originalError: networkError
                  }
                })
              );
            }).then(function(node) {
              var newStatus = node.status;
              if (newStatus !== self2._venmoPaymentContextStatus) {
                self2._venmoPaymentContextStatus = newStatus;
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.tokenize.manual-return.status-change." + newStatus.toLowerCase()
                );
                switch (newStatus) {
                  case "EXPIRED":
                  case "FAILED":
                  case "CANCELED":
                    return Promise.reject(
                      new BraintreeError(
                        errors["VENMO_MOBILE_POLLING_TOKENIZATION_" + newStatus]
                      )
                    );
                  case "APPROVED":
                    return Promise.resolve(node);
                  case "CREATED":
                  case "SCANNED":
                  default:
                }
              }
              return new Promise(function(resolve, reject) {
                setTimeout(function() {
                  self2._pollForStatusChange().then(resolve).catch(reject);
                }, self2._mobilePollingInterval);
              });
            });
          };
          Venmo.prototype._tokenizeForMobileWithManualReturn = function() {
            var self2 = this;
            analytics.sendEvent(
              this._createPromise,
              "venmo.tokenize.manual-return.start"
            );
            this._mobilePollingContextExpiresIn = Date.now() + this._mobilePollingExpiresThreshold;
            this._tokenizePromise = new ExtendedPromise();
            this._pollForStatusChange().then(function(payload2) {
              analytics.sendEvent(
                self2._createPromise,
                "venmo.tokenize.manual-return.success"
              );
              self2._tokenizePromise.resolve({
                paymentMethodNonce: payload2.paymentMethodId,
                username: payload2.userName,
                payerInfo: payload2.payerInfo,
                id: self2._venmoPaymentContextId
              });
            }).catch(function(err) {
              analytics.sendEvent(
                self2._createPromise,
                "venmo.tokenize.manual-return.failure"
              );
              self2._tokenizePromise.reject(err);
            });
            return this.getUrl().then(function(url) {
              self2.appSwitch(url);
              return self2._tokenizePromise;
            });
          };
          Venmo.prototype._shouldUseRedirectStrategy = function() {
            if (!browserDetection.isIos()) {
              return false;
            }
            if (this._mobileWebFallBack === true) {
              return true;
            }
            return this._useRedirectForIOS;
          };
          Venmo.prototype._tokenizeForMobileWithHashChangeListeners = function(options) {
            var self2 = this;
            var resultProcessingInProgress, visibilityChangeListenerTimeout;
            if (this.hasTokenizationResult()) {
              return this.processHashChangeFlowResults();
            }
            analytics.sendEvent(this._createPromise, "venmo.tokenize.mobile.start");
            this._tokenizePromise = new ExtendedPromise();
            this._previousHash = window.location.hash;
            function completeFlow(hash) {
              var error;
              self2.processHashChangeFlowResults(hash).catch(function(err) {
                error = err;
              }).then(function(res) {
                if (!self2._ignoreHistoryChanges && window.location.hash !== self2._previousHash) {
                  window.location.hash = self2._previousHash;
                }
                self2._removeVisibilityEventListener();
                if (error) {
                  self2._tokenizePromise.reject(error);
                } else {
                  self2._tokenizePromise.resolve(res);
                }
                delete self2._tokenizePromise;
              });
            }
            this._onHashChangeListener = function(e) {
              var hash = e.newURL.split("#")[1];
              if (!self2._hasTokenizationResult(hash)) {
                return;
              }
              resultProcessingInProgress = true;
              clearTimeout(visibilityChangeListenerTimeout);
              completeFlow(hash);
            };
            window.addEventListener("hashchange", this._onHashChangeListener, false);
            this._visibilityChangeListener = function() {
              var delay = options.processResultsDelay || constants.DEFAULT_PROCESS_RESULTS_DELAY;
              if (!window.document.hidden) {
                if (!resultProcessingInProgress) {
                  visibilityChangeListenerTimeout = setTimeout(completeFlow, delay);
                }
              }
            };
            return this.getUrl().then(function(url) {
              self2.appSwitch(url);
              setTimeout(function() {
                window.document.addEventListener(
                  documentVisibilityChangeEventName(),
                  self2._visibilityChangeListener
                );
              }, constants.DOCUMENT_VISIBILITY_CHANGE_EVENT_DELAY);
              return self2._tokenizePromise;
            });
          };
          Venmo.prototype._tokenizeForDesktopQRFlow = function() {
            var self2 = this;
            analytics.sendEvent(this._createPromise, "venmo.tokenize.desktop.start");
            this._tokenizePromise = new ExtendedPromise();
            this._createPromise.then(function() {
              return self2._venmoDesktopInstance.launchDesktopFlow();
            }).then(function(payload2) {
              self2._venmoDesktopInstance.hideDesktopFlow();
              analytics.sendEvent(
                self2._createPromise,
                "venmo.tokenize.desktop.success"
              );
              self2._tokenizePromise.resolve(payload2);
            }).catch(function(err) {
              analytics.sendEvent(
                self2._createPromise,
                "venmo.tokenize.desktop.failure"
              );
              if (self2._venmoDesktopInstance) {
                self2._venmoDesktopInstance.hideDesktopFlow();
              }
              if (err && err.reason === "CUSTOMER_CANCELED") {
                self2._tokenizePromise.reject(
                  new BraintreeError(errors.VENMO_DESKTOP_CANCELED)
                );
                return;
              }
              self2._tokenizePromise.reject(
                new BraintreeError({
                  type: errors.VENMO_DESKTOP_UNKNOWN_ERROR.type,
                  code: errors.VENMO_DESKTOP_UNKNOWN_ERROR.code,
                  message: errors.VENMO_DESKTOP_UNKNOWN_ERROR.message,
                  details: {
                    originalError: err
                  }
                })
              );
            });
            return this._tokenizePromise;
          };
          Venmo.prototype._cancelMobilePaymentContext = function() {
            var self2 = this;
            return this._createPromise.then(function(client) {
              var query;
              if (self2._venmoPaymentContextId) {
                query = self2._shouldUseLegacyFlow ? graphqlQueries.LEGACY_UPDATE_PAYMENT_CONTEXT_QUERY : graphqlQueries.UPDATE_PAYMENT_CONTEXT_QUERY;
                return client.request({
                  api: "graphQLApi",
                  data: {
                    query,
                    variables: {
                      input: {
                        id: self2._venmoPaymentContextId,
                        status: "CANCELED"
                      }
                    }
                  }
                });
              }
              return Promise.resolve();
            });
          };
          Venmo.prototype._cancelVenmoDesktopContext = function() {
            var self2 = this;
            return this._createPromise.then(function() {
              if (self2._venmoDesktopInstance) {
                self2._venmoDesktopInstance.updateVenmoDesktopPaymentContext("CANCELED");
              }
              return Promise.resolve();
            });
          };
          Venmo.prototype.teardown = function() {
            var self2 = this;
            this._removeVisibilityEventListener();
            return this._createPromise.then(
              function() {
                if (self2._venmoDesktopInstance) {
                  self2._venmoDesktopInstance.teardown();
                }
                clearTimeout(self2._refreshPaymentContextTimeout);
                self2._cancelMobilePaymentContext();
                convertMethodsToError(this, methods(Venmo.prototype));
              }.bind(this)
            );
          };
          Venmo.prototype._removeVisibilityEventListener = function() {
            window.removeEventListener("hashchange", this._onHashChangeListener);
            window.document.removeEventListener(
              documentVisibilityChangeEventName(),
              this._visibilityChangeListener
            );
            delete this._visibilityChangeListener;
            delete this._onHashChangeListener;
          };
          Venmo.prototype.processHashChangeFlowResults = function(hash) {
            var self2 = this;
            var params = getFragmentParameters(hash);
            return new Promise(function(resolve, reject) {
              if (!self2._shouldUseLegacyFlow) {
                self2._pollForStatusChange().then(function(payload2) {
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo.appswitch.handle.payment-context-status-query.success"
                  );
                  return resolve({
                    paymentMethodNonce: payload2.paymentMethodId,
                    username: payload2.userName,
                    payerInfo: payload2.payerInfo,
                    id: self2._venmoPaymentContextId
                  });
                }).catch(function(err) {
                  if (err.type === errors.VENMO_MOBILE_POLLING_TOKENIZATION_CANCELED.type) {
                    reject(err);
                  }
                  analytics.sendEvent(
                    self2._createPromise,
                    "venmo.process-results.payment-context-status-query-failed"
                  );
                  resolve(params);
                });
              } else if (params.venmoSuccess) {
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.appswitch.handle.success"
                );
                resolve(params);
              } else if (params.venmoError) {
                analytics.sendEvent(self2._createPromise, "venmo.appswitch.handle.error");
                reject(
                  new BraintreeError({
                    type: errors.VENMO_APP_FAILED.type,
                    code: errors.VENMO_APP_FAILED.code,
                    message: errors.VENMO_APP_FAILED.message,
                    details: {
                      originalError: {
                        message: decodeURIComponent(params.errorMessage),
                        code: params.errorCode
                      }
                    }
                  })
                );
              } else if (params.venmoCancel) {
                analytics.sendEvent(self2._createPromise, "venmo.appswitch.handle.cancel");
                reject(new BraintreeError(errors.VENMO_APP_CANCELED));
              } else {
                analytics.sendEvent(
                  self2._createPromise,
                  "venmo.appswitch.cancel-or-unavailable"
                );
                reject(new BraintreeError(errors.VENMO_CANCELED));
              }
              self2._clearFragmentParameters();
            });
          };
          Venmo.prototype._clearFragmentParameters = function() {
            if (this._ignoreHistoryChanges) {
              return;
            }
            if (typeof window.history.replaceState === "function" && window.location.hash) {
              history.pushState(
                {},
                "",
                window.location.href.slice(0, window.location.href.indexOf("#"))
              );
            }
          };
          function getFragmentParameters(hash) {
            var keyValuesArray = (hash || window.location.hash.substring(1)).split("&");
            var parsedParams = keyValuesArray.reduce(function(toReturn, keyValue) {
              var parts = keyValue.split("=");
              var decodedKey = decodeURIComponent(parts[0]).replace(/\W/g, "");
              var key = snakeCaseToCamelCase(decodedKey);
              var value = decodeURIComponent(parts[1]);
              toReturn[key] = value;
              return toReturn;
            }, {});
            if (parsedParams.resourceId) {
              parsedParams.id = parsedParams.resourceId;
            }
            return parsedParams;
          }
          function formatUserName(username) {
            username = username || "";
            return "@" + username.replace("@", "");
          }
          function formatTokenizePayload(payload2) {
            var formattedPayload = {
              nonce: payload2.paymentMethodNonce,
              type: "VenmoAccount",
              details: {
                username: formatUserName(payload2.username),
                paymentContextId: payload2.id
              }
            };
            if (payload2.payerInfo) {
              formattedPayload.details.payerInfo = payload2.payerInfo;
              formattedPayload.details.payerInfo.userName = formatUserName(
                payload2.payerInfo.userName
              );
            }
            return formattedPayload;
          }
          function documentVisibilityChangeEventName() {
            var visibilityChange;
            if (typeof window.document.hidden !== "undefined") {
              visibilityChange = "visibilitychange";
            } else if (typeof window.document.msHidden !== "undefined") {
              visibilityChange = "msvisibilitychange";
            } else if (typeof window.document.webkitHidden !== "undefined") {
              visibilityChange = "webkitvisibilitychange";
            }
            return visibilityChange;
          }
          function isIosWebviewInDeepLinkReturnUrlFlow() {
            return window.navigator.platform && /iPhone|iPad|iPod/.test(window.navigator.platform);
          }
          module3.exports = wrapPromise.wrapPrototype(Venmo);
        }, { "../lib/analytics": 119, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/in-iframe": 150, "../lib/is-verified-domain": 153, "../lib/methods": 155, "../lib/querystring": 157, "../lib/snake-case-to-camel-case": 159, "./external/": 213, "./external/queries": 214, "./shared/browser-detection": 217, "./shared/constants": 218, "./shared/errors": 219, "./shared/get-venmo-url": 221, "./shared/supports-venmo": 222, "./shared/web-login-backdrop": 223, "@braintree/extended-promise": 34, "@braintree/wrap-promise": 43 }], 225: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          module3.exports = {
            VISA_CHECKOUT_NOT_ENABLED: {
              type: BraintreeError.types.MERCHANT,
              code: "VISA_CHECKOUT_NOT_ENABLED",
              message: "Visa Checkout is not enabled for this merchant."
            },
            VISA_CHECKOUT_INIT_OPTIONS_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "VISA_CHECKOUT_INIT_OPTIONS_REQUIRED",
              message: "initOptions requires an object."
            },
            VISA_CHECKOUT_PAYMENT_REQUIRED: {
              type: BraintreeError.types.MERCHANT,
              code: "VISA_CHECKOUT_PAYMENT_REQUIRED",
              message: "tokenize requires callid, encKey, and encPaymentData."
            },
            VISA_CHECKOUT_TOKENIZATION: {
              type: BraintreeError.types.NETWORK,
              code: "VISA_CHECKOUT_TOKENIZATION",
              message: "A network error occurred when processing the Visa Checkout payment."
            }
          };
        }, { "../lib/braintree-error": 124 }], 226: [function(_dereq_, module3, exports3) {
          "use strict";
          var basicComponentVerification = _dereq_("../lib/basic-component-verification");
          var BraintreeError = _dereq_("../lib/braintree-error");
          var createDeferredClient = _dereq_("../lib/create-deferred-client");
          var createAssetsUrl = _dereq_("../lib/create-assets-url");
          var VisaCheckout = _dereq_("./visa-checkout");
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./errors");
          var VERSION = "3.102.0";
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          function create(options) {
            var name = "Visa Checkout";
            return basicComponentVerification.verify({
              name,
              client: options.client,
              authorization: options.authorization
            }).then(function() {
              return createDeferredClient.create({
                authorization: options.authorization,
                client: options.client,
                debug: options.debug,
                assetsUrl: createAssetsUrl.create(options.authorization),
                name
              });
            }).then(function(client) {
              options.client = client;
              if (!options.client.getConfiguration().gatewayConfiguration.visaCheckout) {
                return Promise.reject(
                  new BraintreeError(errors.VISA_CHECKOUT_NOT_ENABLED)
                );
              }
              analytics.sendEvent(options.client, "visacheckout.initialized");
              return new VisaCheckout(options);
            });
          }
          module3.exports = {
            create: wrapPromise(create),
            /**
             * @description The current version of the SDK, i.e. `{@pkg version}`.
             * @type {string}
             */
            VERSION
          };
        }, { "../lib/analytics": 119, "../lib/basic-component-verification": 122, "../lib/braintree-error": 124, "../lib/create-assets-url": 129, "../lib/create-deferred-client": 131, "./errors": 225, "./visa-checkout": 227, "@braintree/wrap-promise": 43 }], 227: [function(_dereq_, module3, exports3) {
          "use strict";
          var BraintreeError = _dereq_("../lib/braintree-error");
          var analytics = _dereq_("../lib/analytics");
          var errors = _dereq_("./errors");
          var jsonClone = _dereq_("../lib/json-clone");
          var methods = _dereq_("../lib/methods");
          var convertMethodsToError = _dereq_("../lib/convert-methods-to-error");
          var wrapPromise = _dereq_("@braintree/wrap-promise");
          var cardTypeTransformMap = {
            Visa: "VISA",
            MasterCard: "MASTERCARD",
            Discover: "DISCOVER",
            "American Express": "AMEX"
          };
          function VisaCheckout(options) {
            this._client = options.client;
          }
          function transformCardTypes(cardTypes) {
            return cardTypes.reduce(function(acc, type) {
              if (cardTypeTransformMap.hasOwnProperty(type)) {
                return acc.concat(cardTypeTransformMap[type]);
              }
              return acc;
            }, []);
          }
          VisaCheckout.prototype.createInitOptions = function(options) {
            var initOptions;
            var gatewayConfiguration = this._client.getConfiguration().gatewayConfiguration;
            var visaCheckoutConfiguration = gatewayConfiguration.visaCheckout;
            if (!options) {
              throw new BraintreeError(errors.VISA_CHECKOUT_INIT_OPTIONS_REQUIRED);
            }
            initOptions = jsonClone(options);
            initOptions.apikey = initOptions.apikey || visaCheckoutConfiguration.apikey;
            initOptions.encryptionKey = visaCheckoutConfiguration.encryptionKey;
            initOptions.externalClientId = initOptions.externalClientId || visaCheckoutConfiguration.externalClientId;
            initOptions.settings = initOptions.settings || {};
            initOptions.settings.dataLevel = "FULL";
            initOptions.settings.payment = initOptions.settings.payment || {};
            if (!initOptions.settings.payment.cardBrands) {
              initOptions.settings.payment.cardBrands = transformCardTypes(
                gatewayConfiguration.visaCheckout.supportedCardTypes
              );
            }
            return initOptions;
          };
          VisaCheckout.prototype.tokenize = function(payment) {
            var self2 = this;
            if (!payment.callid || !payment.encKey || !payment.encPaymentData) {
              return Promise.reject(
                new BraintreeError(errors.VISA_CHECKOUT_PAYMENT_REQUIRED)
              );
            }
            return this._client.request({
              method: "post",
              endpoint: "payment_methods/visa_checkout_cards",
              data: {
                _meta: {
                  source: "visa-checkout"
                },
                visaCheckoutCard: {
                  callId: payment.callid,
                  encryptedPaymentData: payment.encPaymentData,
                  encryptedKey: payment.encKey
                }
              }
            }).then(function(response2) {
              analytics.sendEvent(self2._client, "visacheckout.tokenize.succeeded");
              return response2.visaCheckoutCards[0];
            }).catch(function(err) {
              analytics.sendEvent(self2._client, "visacheckout.tokenize.failed");
              return Promise.reject(
                new BraintreeError({
                  type: errors.VISA_CHECKOUT_TOKENIZATION.type,
                  code: errors.VISA_CHECKOUT_TOKENIZATION.code,
                  message: errors.VISA_CHECKOUT_TOKENIZATION.message,
                  details: {
                    originalError: err
                  }
                })
              );
            });
          };
          VisaCheckout.prototype.teardown = function() {
            convertMethodsToError(this, methods(VisaCheckout.prototype));
            return Promise.resolve();
          };
          module3.exports = wrapPromise.wrapPrototype(VisaCheckout);
        }, { "../lib/analytics": 119, "../lib/braintree-error": 124, "../lib/convert-methods-to-error": 127, "../lib/json-clone": 154, "../lib/methods": 155, "./errors": 225, "@braintree/wrap-promise": 43 }] }, {}, [117])(117);
      });
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
  function submitData({ payload: payload2, handleSuccess }) {
    hideError();
    const form = formElement();
    payload2.payment = payload2.payment || {};
    payload2.payment.provider_id = providerId;
    payload2.payment.method = providerName;
    const customerNotes = document.getElementById(`customer_notes__payment__${providerId}`);
    if (customerNotes) {
      payload2.customer_notes = customerNotes.value;
    }
    const assistedBy = document.getElementById(`assisted_by_user_id__payment__${providerId}`);
    if (assistedBy) {
      const assistedByOption = assistedBy.options[assistedBy.selectedIndex];
      if (assistedByOption && !assistedByOption.disabled) {
        payload2.assisted_by_user_id = assistedBy.value;
      }
    }
    const formData = new FormData(form);
    payload2.answers = {};
    formData.forEach((value, key) => {
      const matches = key.match(/answers\[(.*)\]\[answer\]/);
      if (matches) {
        payload2.answers[matches[1]] = { answer: value };
      }
    });
    const formMethod = form._method ? form._method.value : form.getAttribute("method");
    const checkoutUrl = payload2.url ? payload2.url : form.getAttribute("action");
    import_ujs.default.ajax({
      url: checkoutUrl,
      type: formMethod || payload2.method,
      beforeSend(xhr, options) {
        xhr.setRequestHeader("Content-Type", "application/json; charset=UTF-8");
        options.data = JSON.stringify(payload2);
        return true;
      },
      success: function(response2, _textStatus, _jqXHR) {
        if (response2.sf) {
          window.parent.postMessage(
            { type: "payment_status", status: "success", message: response2.paymentId },
            "*"
          );
        } else if (response2.redirect_url) {
          window.location = response2.redirect_url;
        } else if (response2.error_message) {
          refreshForm(response2.error_message);
        } else if (response2.payment_response && handleSuccess) {
          handleSuccess(response2.payment_response.action);
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
    const element = formElement();
    return element ? element.dataset.callbackUrl : null;
  }
  function apiMode() {
    const element = formElement();
    return element ? element.dataset.apiMode : null;
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

  // src/scripts/packs/gateways/braintree.js
  var braintree = require_browser();
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.Gateways = window.StoreConnect.Gateways || {};
  var clientInstance;
  var hostedFieldsInstance;
  window.StoreConnect.Gateways.Braintree = async function({
    providerId: providerId2,
    firstname,
    lastname,
    email,
    phone,
    billingStreet,
    billingCity,
    billingState,
    billingCountry,
    billingPostalCode
  }) {
    init("Braintree", providerId2, preparePayload);
    fetch(callbackUrl(), {
      method: "post",
      headers: {
        "content-type": "application/json"
      }
    }).then((response2) => {
      return response2.json();
    }).then((json) => {
      if (json.message) {
        showError(json.message);
        return;
      }
      initializeClient(json.token);
    });
    function initializeClient(token) {
      braintree.client.create({
        authorization: token
      }).then((clientInstance_) => {
        clientInstance = clientInstance_;
        initializeHostedFields();
      }).catch((err) => {
        showError(err);
      });
    }
    function initializeHostedFields() {
      braintree.hostedFields.create(
        {
          client: clientInstance,
          styles: {
            input: {
              "font-size": "14px"
            },
            "input.invalid": {
              color: "red"
            },
            "input.valid": {
              color: "green"
            }
          },
          fields: {
            number: {
              container: formFieldElement("card_number"),
              placeholder: formFieldElement("card_number").getAttribute("data-placeholder")
            },
            cvv: {
              container: formFieldElement("card_verification"),
              placeholder: formFieldElement("card_verification").getAttribute("data-placeholder")
            },
            expirationDate: {
              container: formFieldElement("card_expiry"),
              placeholder: formFieldElement("card_expiry").getAttribute("data-placeholder")
            }
          }
        },
        (hostedFieldsErr, hostedFieldsInstance_) => {
          if (hostedFieldsErr) {
            showError(hostedFieldsErr);
            return;
          }
          hostedFieldsInstance = hostedFieldsInstance_;
        }
      );
    }
    function preparePayload() {
      hostedFieldsInstance.tokenize((tokenizeErr, tokenPayload) => {
        if (tokenizeErr) {
          const errorMessage = errorElement().getAttribute("data-placeholder");
          showError(errorMessage);
          return;
        }
        const threeDSecure = formElement().dataset.threeDSecure === "true";
        if (threeDSecure) {
          prepareThreeDSecurePayload();
        } else {
          const payload2 = {
            payment_source: {
              tok_id: tokenPayload.nonce,
              last_digits: tokenPayload.details.lastFour,
              month: tokenPayload.details.expirationMonth,
              year: tokenPayload.details.expirationYear
            }
          };
          submitData({ payload: payload2 });
        }
      });
    }
    function prepareThreeDSecurePayload() {
      braintree.threeDSecure.create(
        { client: clientInstance, version: 2 },
        (threeDSecureErr, threeDSecureInstance) => {
          if (threeDSecureErr) {
            showError(threeDSecureErr);
            return;
          }
          const params = {
            amount: parsedAmount.toFixed(2),
            nonce: payload.nonce,
            bin: payload.details.bin,
            email,
            billingAddress: {
              givenName: firstname,
              surname: lastname,
              phoneNumber: phone,
              streetAddress: billingStreet,
              locality: billingCity,
              region: billingState,
              postalCode: billingPostalCode,
              countryCodeAlpha2: billingCountry
            },
            additionalInformation: {
              workPhoneNumber: phone,
              shippingGivenName: firstname,
              shippingSurname: lastname,
              shippingAddress: {
                streetAddress: billingStreet,
                locality: billingCity,
                region: billingState,
                postalCode: billingPostalCode,
                countryCodeAlpha2: billingCountry
              }
            },
            onLookupComplete: function(data, next) {
              next();
            }
          };
          threeDSecureInstance.verifyCard(params, (threeDSecureVerifyErr, payload2) => {
            if (verifyCardErr) {
              showError(verifyCardErr);
              return;
            }
            const threeDSecurePayload = {
              payment: {
                provider_id: providerId2,
                method: "Braintree"
              },
              payment_source: {
                tok_id: response.nonce,
                last_digits: response.details.lastFour,
                month: response.details.expirationMonth,
                year: response.details.expirationYear
              }
            };
            submitData({ threeDSecurePayload });
          });
        }
      );
    }
    if (showWallets()) {
      let submitPaymentRequest = function(event) {
        let paymentDataRequest;
        event.preventDefault();
        paymentDataRequest = googlePay.createPaymentDataRequest({
          transactionInfo: {
            currencyCode: currency(),
            totalPriceStatus: "FINAL",
            totalPrice: totalPayable()
          }
        });
        paymentsClient.loadPaymentData(paymentDataRequest).then(function(paymentData) {
          return googlePay.parseResponse(paymentData);
        }).then(function(result) {
          const token = result.nonce;
          const lastDigits = result.details.lastFour;
          const payload2 = {
            checkout: {
              url: `/checkout/payment`,
              payment_source: {
                tok_id: token,
                last_digits: lastDigits
              }
            }
          };
          submitData({ payload: payload2 });
        }).catch(function(err) {
          showError(err);
        });
      };
      let googlePay;
      const environment = apiMode() === "production" ? "PRODUCTION" : "TEST";
      const paymentsClient = new google.payments.api.PaymentsClient({
        environment
      });
      const googleMerchantId = formElement().dataset.merchantId;
      const googleMerchantEnabled = googleMerchantId && googleMerchantId.length > 0;
      const container = document.getElementById(`BraintreeWalletsContainer${providerId2}`);
      if (container && googleMerchantEnabled) {
        fetch(callbackUrl(), {
          method: "post",
          headers: {
            "content-type": "application/json"
          }
        }).then((response2) => {
          return response2.json();
        }).then((json) => {
          if (json.message) {
            showError(json.message);
            return;
          }
          const token = json.token;
          braintree.client.create({
            authorization: token
          }).then((clientInstance2) => {
            return braintree.googlePayment.create({
              client: clientInstance2,
              googlePayVersion: 2,
              googleMerchantId
            });
          }).then((googlePaymentInstance) => {
            googlePay = googlePaymentInstance;
            return paymentsClient.isReadyToPay({
              apiVersion: 2,
              apiVersionMinor: 0,
              allowedPaymentMethods: googlePaymentInstance.createPaymentDataRequest().allowedPaymentMethods,
              existingPaymentMethodRequired: true
            });
          }).then((response2) => {
            if (response2.result) {
              const button = paymentsClient.createButton({
                buttonColor: "default",
                buttonType: "long",
                onClick: submitPaymentRequest,
                id: `BraintreeGooglePayButton${providerId2}`,
                allowedPaymentMethods: []
              });
              container.appendChild(button);
            }
          }).catch((err) => {
            showError(err);
          });
        });
      } else {
        container.remove();
      }
    }
  };
})();
//# sourceMappingURL=braintree.ZFE3XHR3.js.map
