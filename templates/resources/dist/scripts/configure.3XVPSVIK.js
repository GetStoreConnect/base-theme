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

  // node_modules/@bugsnag/browser/dist/bugsnag.js
  var require_bugsnag = __commonJS({
    "node_modules/@bugsnag/browser/dist/bugsnag.js"(exports, module) {
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
          g.Bugsnag = f();
        }
      })(function() {
        var define2, module2, exports2;
        var _$breadcrumbTypes_17 = ["navigation", "request", "process", "log", "user", "state", "error", "manual"];
        var _$reduce_26 = function(arr, fn, accum) {
          var val = accum;
          for (var i = 0, len = arr.length; i < len; i++) val = fn(val, arr[i], i, arr);
          return val;
        };
        ;
        var _$filter_21 = function(arr, fn) {
          return _$reduce_26(arr, function(accum, item, i, arr2) {
            return !fn(item, i, arr2) ? accum : accum.concat(item);
          }, []);
        };
        ;
        var _$includes_22 = function(arr, x) {
          return _$reduce_26(arr, function(accum, item, i, arr2) {
            return accum === true || item === x;
          }, false);
        };
        var _$isArray_23 = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
        var _hasDontEnumBug = !{
          toString: null
        }.propertyIsEnumerable("toString");
        var _dontEnums = ["toString", "toLocaleString", "valueOf", "hasOwnProperty", "isPrototypeOf", "propertyIsEnumerable", "constructor"];
        var _$keys_24 = function(obj) {
          var result = [];
          var prop2;
          for (prop2 in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop2)) result.push(prop2);
          }
          if (!_hasDontEnumBug) return result;
          for (var i = 0, len = _dontEnums.length; i < len; i++) {
            if (Object.prototype.hasOwnProperty.call(obj, _dontEnums[i])) result.push(_dontEnums[i]);
          }
          return result;
        };
        var _$intRange_33 = function(min, max) {
          if (min === void 0) {
            min = 1;
          }
          if (max === void 0) {
            max = Infinity;
          }
          return function(value) {
            return typeof value === "number" && parseInt("" + value, 10) === value && value >= min && value <= max;
          };
        };
        ;
        ;
        var _$listOfFunctions_34 = function(value) {
          return typeof value === "function" || _$isArray_23(value) && _$filter_21(value, function(f) {
            return typeof f === "function";
          }).length === value.length;
        };
        var _$stringWithLength_35 = function(value) {
          return typeof value === "string" && !!value.length;
        };
        var _$config_14 = {};
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var defaultErrorTypes = function() {
          return {
            unhandledExceptions: true,
            unhandledRejections: true
          };
        };
        _$config_14.schema = {
          apiKey: {
            defaultValue: function() {
              return null;
            },
            message: "is required",
            validate: _$stringWithLength_35
          },
          appVersion: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || _$stringWithLength_35(value);
            }
          },
          appType: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || _$stringWithLength_35(value);
            }
          },
          autoDetectErrors: {
            defaultValue: function() {
              return true;
            },
            message: "should be true|false",
            validate: function(value) {
              return value === true || value === false;
            }
          },
          enabledErrorTypes: {
            defaultValue: function() {
              return defaultErrorTypes();
            },
            message: "should be an object containing the flags { unhandledExceptions:true|false, unhandledRejections:true|false }",
            allowPartialObject: true,
            validate: function(value) {
              if (typeof value !== "object" || !value) return false;
              var providedKeys = _$keys_24(value);
              var defaultKeys = _$keys_24(defaultErrorTypes());
              if (_$filter_21(providedKeys, function(k) {
                return _$includes_22(defaultKeys, k);
              }).length < providedKeys.length) return false;
              if (_$filter_21(_$keys_24(value), function(k) {
                return typeof value[k] !== "boolean";
              }).length > 0) return false;
              return true;
            }
          },
          onError: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_34
          },
          onSession: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_34
          },
          onBreadcrumb: {
            defaultValue: function() {
              return [];
            },
            message: "should be a function or array of functions",
            validate: _$listOfFunctions_34
          },
          endpoints: {
            defaultValue: function(endpoints) {
              if (typeof endpoints === "undefined") {
                return {
                  notify: "https://notify.bugsnag.com",
                  sessions: "https://sessions.bugsnag.com"
                };
              } else {
                return {
                  notify: null,
                  sessions: null
                };
              }
            },
            message: "should be an object containing endpoint URLs { notify, sessions }",
            validate: function(val) {
              return (
                // first, ensure it's an object
                val && typeof val === "object" && // notify and sessions must always be set
                _$stringWithLength_35(val.notify) && _$stringWithLength_35(val.sessions) && // ensure no keys other than notify/session are set on endpoints object
                _$filter_21(_$keys_24(val), function(k) {
                  return !_$includes_22(["notify", "sessions"], k);
                }).length === 0
              );
            }
          },
          autoTrackSessions: {
            defaultValue: function(val) {
              return true;
            },
            message: "should be true|false",
            validate: function(val) {
              return val === true || val === false;
            }
          },
          enabledReleaseStages: {
            defaultValue: function() {
              return null;
            },
            message: "should be an array of strings",
            validate: function(value) {
              return value === null || _$isArray_23(value) && _$filter_21(value, function(f) {
                return typeof f === "string";
              }).length === value.length;
            }
          },
          releaseStage: {
            defaultValue: function() {
              return "production";
            },
            message: "should be a string",
            validate: function(value) {
              return typeof value === "string" && value.length;
            }
          },
          maxBreadcrumbs: {
            defaultValue: function() {
              return 25;
            },
            message: "should be a number \u2264100",
            validate: function(value) {
              return _$intRange_33(0, 100)(value);
            }
          },
          enabledBreadcrumbTypes: {
            defaultValue: function() {
              return _$breadcrumbTypes_17;
            },
            message: "should be null or a list of available breadcrumb types (" + _$breadcrumbTypes_17.join(",") + ")",
            validate: function(value) {
              return value === null || _$isArray_23(value) && _$reduce_26(value, function(accum, maybeType) {
                if (accum === false) return accum;
                return _$includes_22(_$breadcrumbTypes_17, maybeType);
              }, true);
            }
          },
          context: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be a string",
            validate: function(value) {
              return value === void 0 || typeof value === "string";
            }
          },
          user: {
            defaultValue: function() {
              return {};
            },
            message: "should be an object with { id, email, name } properties",
            validate: function(value) {
              return value === null || value && _$reduce_26(_$keys_24(value), function(accum, key) {
                return accum && _$includes_22(["id", "email", "name"], key);
              }, true);
            }
          },
          metadata: {
            defaultValue: function() {
              return {};
            },
            message: "should be an object",
            validate: function(value) {
              return typeof value === "object" && value !== null;
            }
          },
          logger: {
            defaultValue: function() {
              return void 0;
            },
            message: "should be null or an object with methods { debug, info, warn, error }",
            validate: function(value) {
              return !value || value && _$reduce_26(["debug", "info", "warn", "error"], function(accum, method) {
                return accum && typeof value[method] === "function";
              }, true);
            }
          },
          redactedKeys: {
            defaultValue: function() {
              return ["password"];
            },
            message: "should be an array of strings|regexes",
            validate: function(value) {
              return _$isArray_23(value) && value.length === _$filter_21(value, function(s) {
                return typeof s === "string" || s && typeof s.test === "function";
              }).length;
            }
          },
          plugins: {
            defaultValue: function() {
              return [];
            },
            message: "should be an array of plugin objects",
            validate: function(value) {
              return _$isArray_23(value) && value.length === _$filter_21(value, function(p) {
                return p && typeof p === "object" && typeof p.load === "function";
              }).length;
            }
          },
          featureFlags: {
            defaultValue: function() {
              return [];
            },
            message: 'should be an array of objects that have a "name" property',
            validate: function(value) {
              return _$isArray_23(value) && value.length === _$filter_21(value, function(feature) {
                return feature && typeof feature === "object" && typeof feature.name === "string";
              }).length;
            }
          },
          reportUnhandledPromiseRejectionsAsHandled: {
            defaultValue: function() {
              return false;
            },
            message: "should be true|false",
            validate: function(value) {
              return value === true || value === false;
            }
          },
          sendPayloadChecksums: {
            defaultValue: function() {
              return false;
            },
            message: "should be true|false",
            validate: function(value) {
              return value === true || value === false;
            }
          }
        };
        var _$assign_20 = function(target) {
          for (var i = 1; i < arguments.length; i++) {
            var source = arguments[i];
            for (var key in source) {
              if (Object.prototype.hasOwnProperty.call(source, key)) {
                target[key] = source[key];
              }
            }
          }
          return target;
        };
        ;
        var _$map_25 = function(arr, fn) {
          return _$reduce_26(arr, function(accum, item, i, arr2) {
            return accum.concat(fn(item, i, arr2));
          }, []);
        };
        function _extends() {
          _extends = Object.assign ? Object.assign.bind() : function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return _extends.apply(this, arguments);
        }
        var schema = _$config_14.schema;
        ;
        ;
        var _$config_10 = {
          releaseStage: _$assign_20({}, schema.releaseStage, {
            defaultValue: function() {
              if (/^localhost(:\d+)?$/.test(window.location.host)) return "development";
              return "production";
            }
          }),
          appType: _extends({}, schema.appType, {
            defaultValue: function() {
              return "browser";
            }
          }),
          logger: _$assign_20({}, schema.logger, {
            defaultValue: function() {
              return (
                // set logger based on browser capability
                typeof console !== "undefined" && typeof console.debug === "function" ? getPrefixedConsole() : void 0
              );
            }
          })
        };
        var getPrefixedConsole = function() {
          var logger = {};
          var consoleLog = console.log;
          _$map_25(["debug", "info", "warn", "error"], function(method) {
            var consoleMethod = console[method];
            logger[method] = typeof consoleMethod === "function" ? consoleMethod.bind(console, "[bugsnag]") : consoleLog.bind(console, "[bugsnag]");
          });
          return logger;
        };
        var Breadcrumb = /* @__PURE__ */ function() {
          function Breadcrumb2(message, metadata, type, timestamp) {
            if (timestamp === void 0) {
              timestamp = /* @__PURE__ */ new Date();
            }
            this.type = type;
            this.message = message;
            this.metadata = metadata;
            this.timestamp = timestamp;
          }
          var _proto = Breadcrumb2.prototype;
          _proto.toJSON = function toJSON() {
            return {
              type: this.type,
              name: this.message,
              timestamp: this.timestamp,
              metaData: this.metadata
            };
          };
          return Breadcrumb2;
        }();
        var _$Breadcrumb_12 = Breadcrumb;
        var _$stackframe_9 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("stackframe", [], factory);
          } else if (typeof _$stackframe_9 === "object") {
            _$stackframe_9 = factory();
          } else {
            root.StackFrame = factory();
          }
        })(this, function() {
          "use strict";
          function _isNumber(n) {
            return !isNaN(parseFloat(n)) && isFinite(n);
          }
          function _capitalize(str) {
            return str.charAt(0).toUpperCase() + str.substring(1);
          }
          function _getter(p) {
            return function() {
              return this[p];
            };
          }
          var booleanProps = ["isConstructor", "isEval", "isNative", "isToplevel"];
          var numericProps = ["columnNumber", "lineNumber"];
          var stringProps = ["fileName", "functionName", "source"];
          var arrayProps = ["args"];
          var objectProps = ["evalOrigin"];
          var props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);
          function StackFrame(obj) {
            if (!obj) return;
            for (var i2 = 0; i2 < props.length; i2++) {
              if (obj[props[i2]] !== void 0) {
                this["set" + _capitalize(props[i2])](obj[props[i2]]);
              }
            }
          }
          StackFrame.prototype = {
            getArgs: function() {
              return this.args;
            },
            setArgs: function(v) {
              if (Object.prototype.toString.call(v) !== "[object Array]") {
                throw new TypeError("Args must be an Array");
              }
              this.args = v;
            },
            getEvalOrigin: function() {
              return this.evalOrigin;
            },
            setEvalOrigin: function(v) {
              if (v instanceof StackFrame) {
                this.evalOrigin = v;
              } else if (v instanceof Object) {
                this.evalOrigin = new StackFrame(v);
              } else {
                throw new TypeError("Eval Origin must be an Object or StackFrame");
              }
            },
            toString: function() {
              var fileName = this.getFileName() || "";
              var lineNumber = this.getLineNumber() || "";
              var columnNumber = this.getColumnNumber() || "";
              var functionName = this.getFunctionName() || "";
              if (this.getIsEval()) {
                if (fileName) {
                  return "[eval] (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
                }
                return "[eval]:" + lineNumber + ":" + columnNumber;
              }
              if (functionName) {
                return functionName + " (" + fileName + ":" + lineNumber + ":" + columnNumber + ")";
              }
              return fileName + ":" + lineNumber + ":" + columnNumber;
            }
          };
          StackFrame.fromString = function StackFrame$$fromString(str) {
            var argsStartIndex = str.indexOf("(");
            var argsEndIndex = str.lastIndexOf(")");
            var functionName = str.substring(0, argsStartIndex);
            var args = str.substring(argsStartIndex + 1, argsEndIndex).split(",");
            var locationString = str.substring(argsEndIndex + 1);
            if (locationString.indexOf("@") === 0) {
              var parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString, "");
              var fileName = parts[1];
              var lineNumber = parts[2];
              var columnNumber = parts[3];
            }
            return new StackFrame({
              functionName,
              args: args || void 0,
              fileName,
              lineNumber: lineNumber || void 0,
              columnNumber: columnNumber || void 0
            });
          };
          for (var i = 0; i < booleanProps.length; i++) {
            StackFrame.prototype["get" + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
            StackFrame.prototype["set" + _capitalize(booleanProps[i])] = /* @__PURE__ */ function(p) {
              return function(v) {
                this[p] = Boolean(v);
              };
            }(booleanProps[i]);
          }
          for (var j = 0; j < numericProps.length; j++) {
            StackFrame.prototype["get" + _capitalize(numericProps[j])] = _getter(numericProps[j]);
            StackFrame.prototype["set" + _capitalize(numericProps[j])] = /* @__PURE__ */ function(p) {
              return function(v) {
                if (!_isNumber(v)) {
                  throw new TypeError(p + " must be a Number");
                }
                this[p] = Number(v);
              };
            }(numericProps[j]);
          }
          for (var k = 0; k < stringProps.length; k++) {
            StackFrame.prototype["get" + _capitalize(stringProps[k])] = _getter(stringProps[k]);
            StackFrame.prototype["set" + _capitalize(stringProps[k])] = /* @__PURE__ */ function(p) {
              return function(v) {
                this[p] = String(v);
              };
            }(stringProps[k]);
          }
          return StackFrame;
        });
        var _$stackGenerator_8 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("stack-generator", ["stackframe"], factory);
          } else if (typeof _$stackGenerator_8 === "object") {
            _$stackGenerator_8 = factory(_$stackframe_9);
          } else {
            root.StackGenerator = factory(root.StackFrame);
          }
        })(this, function(StackFrame) {
          return {
            backtrace: function StackGenerator$$backtrace(opts) {
              var stack = [];
              var maxStackSize = 10;
              if (typeof opts === "object" && typeof opts.maxStackSize === "number") {
                maxStackSize = opts.maxStackSize;
              }
              var curr = arguments.callee;
              while (curr && stack.length < maxStackSize && curr["arguments"]) {
                var args = new Array(curr["arguments"].length);
                for (var i = 0; i < args.length; ++i) {
                  args[i] = curr["arguments"][i];
                }
                if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
                  stack.push(new StackFrame({
                    functionName: RegExp.$1 || void 0,
                    args
                  }));
                } else {
                  stack.push(new StackFrame({
                    args
                  }));
                }
                try {
                  curr = curr.caller;
                } catch (e) {
                  break;
                }
              }
              return stack;
            }
          };
        });
        var _$errorStackParser_6 = {};
        (function(root, factory) {
          "use strict";
          if (typeof define2 === "function" && define2.amd) {
            define2("error-stack-parser", ["stackframe"], factory);
          } else if (typeof _$errorStackParser_6 === "object") {
            _$errorStackParser_6 = factory(_$stackframe_9);
          } else {
            root.ErrorStackParser = factory(root.StackFrame);
          }
        })(this, function ErrorStackParser(StackFrame) {
          "use strict";
          var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
          var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
          var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;
          return {
            /**
             * Given an Error object, extract the most information from it.
             *
             * @param {Error} error object
             * @return {Array} of StackFrames
             */
            parse: function ErrorStackParser$$parse(error) {
              if (typeof error.stacktrace !== "undefined" || typeof error["opera#sourceloc"] !== "undefined") {
                return this.parseOpera(error);
              } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
              } else if (error.stack) {
                return this.parseFFOrSafari(error);
              } else {
                throw new Error("Cannot parse given Error object");
              }
            },
            // Separate line and column numbers from a string of the form: (URI:Line:Column)
            extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
              if (urlLike.indexOf(":") === -1) {
                return [urlLike];
              }
              var regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
              var parts = regExp.exec(urlLike.replace(/[()]/g, ""));
              return [parts[1], parts[2] || void 0, parts[3] || void 0];
            },
            parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
              }, this);
              return filtered.map(function(line) {
                if (line.indexOf("(eval ") > -1) {
                  line = line.replace(/eval code/g, "eval").replace(/(\(eval at [^()]*)|(\),.*$)/g, "");
                }
                var sanitizedLine = line.replace(/^\s+/, "").replace(/\(eval code/g, "(");
                var location2 = sanitizedLine.match(/ (\((.+):(\d+):(\d+)\)$)/);
                sanitizedLine = location2 ? sanitizedLine.replace(location2[0], "") : sanitizedLine;
                var tokens = sanitizedLine.split(/\s+/).slice(1);
                var locationParts = this.extractLocation(location2 ? location2[1] : tokens.pop());
                var functionName = tokens.join(" ") || void 0;
                var fileName = ["eval", "<anonymous>"].indexOf(locationParts[0]) > -1 ? void 0 : locationParts[0];
                return new StackFrame({
                  functionName,
                  fileName,
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
                });
              }, this);
            },
            parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
              }, this);
              return filtered.map(function(line) {
                if (line.indexOf(" > eval") > -1) {
                  line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ":$1");
                }
                if (line.indexOf("@") === -1 && line.indexOf(":") === -1) {
                  return new StackFrame({
                    functionName: line
                  });
                } else {
                  var functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                  var matches = line.match(functionNameRegex);
                  var functionName = matches && matches[1] ? matches[1] : void 0;
                  var locationParts = this.extractLocation(line.replace(functionNameRegex, ""));
                  return new StackFrame({
                    functionName,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line
                  });
                }
              }, this);
            },
            parseOpera: function ErrorStackParser$$parseOpera(e) {
              if (!e.stacktrace || e.message.indexOf("\n") > -1 && e.message.split("\n").length > e.stacktrace.split("\n").length) {
                return this.parseOpera9(e);
              } else if (!e.stack) {
                return this.parseOpera10(e);
              } else {
                return this.parseOpera11(e);
              }
            },
            parseOpera9: function ErrorStackParser$$parseOpera9(e) {
              var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
              var lines = e.message.split("\n");
              var result = [];
              for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                  result.push(new StackFrame({
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i]
                  }));
                }
              }
              return result;
            },
            parseOpera10: function ErrorStackParser$$parseOpera10(e) {
              var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
              var lines = e.stacktrace.split("\n");
              var result = [];
              for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                  result.push(new StackFrame({
                    functionName: match[3] || void 0,
                    fileName: match[2],
                    lineNumber: match[1],
                    source: lines[i]
                  }));
                }
              }
              return result;
            },
            // Opera 10.65+ Error.stack very similar to FF/Safari
            parseOpera11: function ErrorStackParser$$parseOpera11(error) {
              var filtered = error.stack.split("\n").filter(function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
              }, this);
              return filtered.map(function(line) {
                var tokens = line.split("@");
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = tokens.shift() || "";
                var functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, "$2").replace(/\([^)]*\)/g, "") || void 0;
                var argsRaw;
                if (functionCall.match(/\(([^)]*)\)/)) {
                  argsRaw = functionCall.replace(/^[^(]+\(([^)]*)\)$/, "$1");
                }
                var args = argsRaw === void 0 || argsRaw === "[arguments not available]" ? void 0 : argsRaw.split(",");
                return new StackFrame({
                  functionName,
                  args,
                  fileName: locationParts[0],
                  lineNumber: locationParts[1],
                  columnNumber: locationParts[2],
                  source: line
                });
              }, this);
            }
          };
        });
        var _$errorStackParser_19 = _$errorStackParser_6;
        var _$safeJsonStringify_5 = function(data, replacer, space, opts) {
          var redactedKeys = opts && opts.redactedKeys ? opts.redactedKeys : [];
          var redactedPaths = opts && opts.redactedPaths ? opts.redactedPaths : [];
          return JSON.stringify(prepareObjForSerialization(data, redactedKeys, redactedPaths), replacer, space);
        };
        var MAX_DEPTH = 20;
        var MAX_EDGES = 25e3;
        var MIN_PRESERVED_DEPTH = 8;
        var REPLACEMENT_NODE = "...";
        function isError(o) {
          return o instanceof Error || /^\[object (Error|(Dom)?Exception)\]$/.test(Object.prototype.toString.call(o));
        }
        function throwsMessage(err) {
          return "[Throws: " + (err ? err.message : "?") + "]";
        }
        function find(haystack, needle) {
          for (var i = 0, len = haystack.length; i < len; i++) {
            if (haystack[i] === needle) return true;
          }
          return false;
        }
        function isDescendent(paths, path) {
          for (var i = 0, len = paths.length; i < len; i++) {
            if (path.indexOf(paths[i]) === 0) return true;
          }
          return false;
        }
        function shouldRedact(patterns, key) {
          for (var i = 0, len = patterns.length; i < len; i++) {
            if (typeof patterns[i] === "string" && patterns[i].toLowerCase() === key.toLowerCase()) return true;
            if (patterns[i] && typeof patterns[i].test === "function" && patterns[i].test(key)) return true;
          }
          return false;
        }
        function __isArray_5(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        }
        function safelyGetProp(obj, prop2) {
          try {
            return obj[prop2];
          } catch (err) {
            return throwsMessage(err);
          }
        }
        function prepareObjForSerialization(obj, redactedKeys, redactedPaths) {
          var seen = [];
          var edges = 0;
          function visit(obj2, path) {
            function edgesExceeded() {
              return path.length > MIN_PRESERVED_DEPTH && edges > MAX_EDGES;
            }
            edges++;
            if (path.length > MAX_DEPTH) return REPLACEMENT_NODE;
            if (edgesExceeded()) return REPLACEMENT_NODE;
            if (obj2 === null || typeof obj2 !== "object") return obj2;
            if (find(seen, obj2)) return "[Circular]";
            seen.push(obj2);
            if (typeof obj2.toJSON === "function") {
              try {
                edges--;
                var fResult = visit(obj2.toJSON(), path);
                seen.pop();
                return fResult;
              } catch (err) {
                return throwsMessage(err);
              }
            }
            var er = isError(obj2);
            if (er) {
              edges--;
              var eResult = visit({
                name: obj2.name,
                message: obj2.message
              }, path);
              seen.pop();
              return eResult;
            }
            if (__isArray_5(obj2)) {
              var aResult = [];
              for (var i = 0, len = obj2.length; i < len; i++) {
                if (edgesExceeded()) {
                  aResult.push(REPLACEMENT_NODE);
                  break;
                }
                aResult.push(visit(obj2[i], path.concat("[]")));
              }
              seen.pop();
              return aResult;
            }
            var result = {};
            try {
              for (var prop2 in obj2) {
                if (!Object.prototype.hasOwnProperty.call(obj2, prop2)) continue;
                if (isDescendent(redactedPaths, path.join(".")) && shouldRedact(redactedKeys, prop2)) {
                  result[prop2] = "[REDACTED]";
                  continue;
                }
                if (edgesExceeded()) {
                  result[prop2] = REPLACEMENT_NODE;
                  break;
                }
                result[prop2] = visit(safelyGetProp(obj2, prop2), path.concat(prop2));
              }
            } catch (e) {
            }
            seen.pop();
            return result;
          }
          return visit(obj, []);
        }
        ;
        ;
        ;
        ;
        function add(existingFeatures, existingFeatureKeys, name2, variant) {
          if (typeof name2 !== "string") {
            return;
          }
          if (variant === void 0) {
            variant = null;
          } else if (variant !== null && typeof variant !== "string") {
            variant = _$safeJsonStringify_5(variant);
          }
          var existingIndex = existingFeatureKeys[name2];
          if (typeof existingIndex === "number") {
            existingFeatures[existingIndex] = {
              name: name2,
              variant
            };
            return;
          }
          existingFeatures.push({
            name: name2,
            variant
          });
          existingFeatureKeys[name2] = existingFeatures.length - 1;
        }
        function merge(existingFeatures, newFeatures, existingFeatureKeys) {
          if (!_$isArray_23(newFeatures)) {
            return;
          }
          for (var i = 0; i < newFeatures.length; ++i) {
            var feature = newFeatures[i];
            if (feature === null || typeof feature !== "object") {
              continue;
            }
            add(existingFeatures, existingFeatureKeys, feature.name, feature.variant);
          }
          return existingFeatures;
        }
        function toEventApi(featureFlags) {
          return _$map_25(_$filter_21(featureFlags, Boolean), function(_ref) {
            var name2 = _ref.name, variant = _ref.variant;
            var flag = {
              featureFlag: name2
            };
            if (typeof variant === "string") {
              flag.variant = variant;
            }
            return flag;
          });
        }
        function clear(features, featuresIndex, name2) {
          var existingIndex = featuresIndex[name2];
          if (typeof existingIndex === "number") {
            features[existingIndex] = null;
            delete featuresIndex[name2];
          }
        }
        var _$featureFlagDelegate_27 = {
          add,
          clear,
          merge,
          toEventApi
        };
        var _$hasStack_28 = function(err) {
          return !!err && (!!err.stack || !!err.stacktrace || !!err["opera#sourceloc"]) && typeof (err.stack || err.stacktrace || err["opera#sourceloc"]) === "string" && err.stack !== err.name + ": " + err.message;
        };
        var _$isError_7 = __isError_7;
        function __isError_7(value) {
          switch (Object.prototype.toString.call(value)) {
            case "[object Error]":
              return true;
            case "[object Exception]":
              return true;
            case "[object DOMException]":
              return true;
            default:
              return value instanceof Error;
          }
        }
        var _$iserror_29 = _$isError_7;
        ;
        var __add_31 = function(state, section, keyOrObj, maybeVal) {
          var _updates;
          if (!section) return;
          var updates;
          if (keyOrObj === null) return __clear_31(state, section);
          if (typeof keyOrObj === "object") updates = keyOrObj;
          if (typeof keyOrObj === "string") updates = (_updates = {}, _updates[keyOrObj] = maybeVal, _updates);
          if (!updates) return;
          if (section === "__proto__" || section === "constructor" || section === "prototype") {
            return;
          }
          if (!state[section]) state[section] = {};
          state[section] = _$assign_20({}, state[section], updates);
        };
        var get = function(state, section, key) {
          if (typeof section !== "string") return void 0;
          if (!key) {
            return state[section];
          }
          if (state[section]) {
            return state[section][key];
          }
          return void 0;
        };
        var __clear_31 = function(state, section, key) {
          if (typeof section !== "string") return;
          if (!key) {
            delete state[section];
            return;
          }
          if (section === "__proto__" || section === "constructor" || section === "prototype") {
            return;
          }
          if (state[section]) {
            delete state[section][key];
          }
        };
        var _$metadataDelegate_31 = {
          add: __add_31,
          get,
          clear: __clear_31
        };
        function ___extends_15() {
          ___extends_15 = Object.assign ? Object.assign.bind() : function(target) {
            for (var i = 1; i < arguments.length; i++) {
              var source = arguments[i];
              for (var key in source) {
                if (Object.prototype.hasOwnProperty.call(source, key)) {
                  target[key] = source[key];
                }
              }
            }
            return target;
          };
          return ___extends_15.apply(this, arguments);
        }
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var Event2 = /* @__PURE__ */ function() {
          function Event3(errorClass, errorMessage, stacktrace, handledState, originalError) {
            if (stacktrace === void 0) {
              stacktrace = [];
            }
            if (handledState === void 0) {
              handledState = defaultHandledState();
            }
            this.apiKey = void 0;
            this.context = void 0;
            this.groupingHash = void 0;
            this.originalError = originalError;
            this._handledState = handledState;
            this.severity = this._handledState.severity;
            this.unhandled = this._handledState.unhandled;
            this.app = {};
            this.device = {};
            this.request = {};
            this.breadcrumbs = [];
            this.threads = [];
            this._metadata = {};
            this._features = [];
            this._featuresIndex = {};
            this._user = {};
            this._session = void 0;
            this._correlation = void 0;
            this.errors = [createBugsnagError(errorClass, errorMessage, Event3.__type, stacktrace)];
          }
          var _proto = Event3.prototype;
          _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
            return _$metadataDelegate_31.add(this._metadata, section, keyOrObj, maybeVal);
          };
          _proto.setTraceCorrelation = function setTraceCorrelation(traceId, spanId) {
            if (typeof traceId === "string") {
              this._correlation = ___extends_15({
                traceId
              }, typeof spanId === "string" ? {
                spanId
              } : {});
            }
          };
          _proto.getMetadata = function getMetadata(section, key) {
            return _$metadataDelegate_31.get(this._metadata, section, key);
          };
          _proto.clearMetadata = function clearMetadata(section, key) {
            return _$metadataDelegate_31.clear(this._metadata, section, key);
          };
          _proto.addFeatureFlag = function addFeatureFlag(name2, variant) {
            if (variant === void 0) {
              variant = null;
            }
            _$featureFlagDelegate_27.add(this._features, this._featuresIndex, name2, variant);
          };
          _proto.addFeatureFlags = function addFeatureFlags(featureFlags) {
            _$featureFlagDelegate_27.merge(this._features, featureFlags, this._featuresIndex);
          };
          _proto.getFeatureFlags = function getFeatureFlags() {
            return _$featureFlagDelegate_27.toEventApi(this._features);
          };
          _proto.clearFeatureFlag = function clearFeatureFlag(name2) {
            _$featureFlagDelegate_27.clear(this._features, this._featuresIndex, name2);
          };
          _proto.clearFeatureFlags = function clearFeatureFlags() {
            this._features = [];
            this._featuresIndex = {};
          };
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto.toJSON = function toJSON() {
            return {
              payloadVersion: "4",
              exceptions: _$map_25(this.errors, function(er) {
                return _$assign_20({}, er, {
                  message: er.errorMessage
                });
              }),
              severity: this.severity,
              unhandled: this._handledState.unhandled,
              severityReason: this._handledState.severityReason,
              app: this.app,
              device: this.device,
              request: this.request,
              breadcrumbs: this.breadcrumbs,
              context: this.context,
              groupingHash: this.groupingHash,
              metaData: this._metadata,
              user: this._user,
              session: this._session,
              featureFlags: this.getFeatureFlags(),
              correlation: this._correlation
            };
          };
          return Event3;
        }();
        var formatStackframe = function(frame) {
          var f = {
            file: frame.fileName,
            method: normaliseFunctionName(frame.functionName),
            lineNumber: frame.lineNumber,
            columnNumber: frame.columnNumber,
            code: void 0,
            inProject: void 0
          };
          if (f.lineNumber > -1 && !f.file && !f.method) {
            f.file = "global code";
          }
          return f;
        };
        var normaliseFunctionName = function(name2) {
          return /^global code$/i.test(name2) ? "global code" : name2;
        };
        var defaultHandledState = function() {
          return {
            unhandled: false,
            severity: "warning",
            severityReason: {
              type: "handledException"
            }
          };
        };
        var ensureString = function(str) {
          return typeof str === "string" ? str : "";
        };
        function createBugsnagError(errorClass, errorMessage, type, stacktrace) {
          return {
            errorClass: ensureString(errorClass),
            errorMessage: ensureString(errorMessage),
            type,
            stacktrace: _$reduce_26(stacktrace, function(accum, frame) {
              var f = formatStackframe(frame);
              try {
                if (JSON.stringify(f) === "{}") return accum;
                return accum.concat(f);
              } catch (e) {
                return accum;
              }
            }, [])
          };
        }
        function getCauseStack(error) {
          if (error.cause) {
            return [error].concat(getCauseStack(error.cause));
          } else {
            return [error];
          }
        }
        Event2.getStacktrace = function(error, errorFramesToSkip, backtraceFramesToSkip) {
          if (_$hasStack_28(error)) return _$errorStackParser_19.parse(error).slice(errorFramesToSkip);
          try {
            return _$filter_21(_$stackGenerator_8.backtrace(), function(frame) {
              return (frame.functionName || "").indexOf("StackGenerator$$") === -1;
            }).slice(1 + backtraceFramesToSkip);
          } catch (e) {
            return [];
          }
        };
        Event2.create = function(maybeError, tolerateNonErrors, handledState, component, errorFramesToSkip, logger) {
          if (errorFramesToSkip === void 0) {
            errorFramesToSkip = 0;
          }
          var _normaliseError = normaliseError(maybeError, tolerateNonErrors, component, logger), error = _normaliseError[0], internalFrames = _normaliseError[1];
          var event;
          try {
            var stacktrace = Event2.getStacktrace(
              error,
              // if an error was created/throw in the normaliseError() function, we need to
              // tell the getStacktrace() function to skip the number of frames we know will
              // be from our own functions. This is added to the number of frames deep we
              // were told about
              internalFrames > 0 ? 1 + internalFrames + errorFramesToSkip : 0,
              // if there's no stacktrace, the callstack may be walked to generated one.
              // this is how many frames should be removed because they come from our library
              1 + errorFramesToSkip
            );
            event = new Event2(error.name, error.message, stacktrace, handledState, maybeError);
          } catch (e) {
            event = new Event2(error.name, error.message, [], handledState, maybeError);
          }
          if (error.name === "InvalidError") {
            event.addMetadata("" + component, "non-error parameter", makeSerialisable(maybeError));
          }
          if (error.cause) {
            var _event$errors;
            var causes = getCauseStack(error).slice(1);
            var normalisedCauses = _$map_25(causes, function(cause) {
              var stacktrace2 = _$iserror_29(cause) && _$hasStack_28(cause) ? _$errorStackParser_19.parse(cause) : [];
              var _normaliseError2 = normaliseError(cause, true, "error cause"), error2 = _normaliseError2[0];
              if (error2.name === "InvalidError") event.addMetadata("error cause", makeSerialisable(cause));
              return createBugsnagError(error2.name, error2.message, Event2.__type, stacktrace2);
            });
            (_event$errors = event.errors).push.apply(_event$errors, normalisedCauses);
          }
          return event;
        };
        var makeSerialisable = function(err) {
          if (err === null) return "null";
          if (err === void 0) return "undefined";
          return err;
        };
        var normaliseError = function(maybeError, tolerateNonErrors, component, logger) {
          var error;
          var internalFrames = 0;
          var createAndLogInputError = function(reason) {
            var verb = component === "error cause" ? "was" : "received";
            if (logger) logger.warn(component + " " + verb + ' a non-error: "' + reason + '"');
            var err = new Error(component + " " + verb + ' a non-error. See "' + component + '" tab for more detail.');
            err.name = "InvalidError";
            return err;
          };
          if (!tolerateNonErrors) {
            if (_$iserror_29(maybeError)) {
              error = maybeError;
            } else {
              error = createAndLogInputError(typeof maybeError);
              internalFrames += 2;
            }
          } else {
            switch (typeof maybeError) {
              case "string":
              case "number":
              case "boolean":
                error = new Error(String(maybeError));
                internalFrames += 1;
                break;
              case "function":
                error = createAndLogInputError("function");
                internalFrames += 2;
                break;
              case "object":
                if (maybeError !== null && _$iserror_29(maybeError)) {
                  error = maybeError;
                } else if (maybeError !== null && hasNecessaryFields(maybeError)) {
                  error = new Error(maybeError.message || maybeError.errorMessage);
                  error.name = maybeError.name || maybeError.errorClass;
                  internalFrames += 1;
                } else {
                  error = createAndLogInputError(maybeError === null ? "null" : "unsupported object");
                  internalFrames += 2;
                }
                break;
              default:
                error = createAndLogInputError("nothing");
                internalFrames += 2;
            }
          }
          if (!_$hasStack_28(error)) {
            try {
              throw error;
            } catch (e) {
              if (_$hasStack_28(e)) {
                error = e;
                internalFrames = 1;
              }
            }
          }
          return [error, internalFrames];
        };
        Event2.__type = "browserjs";
        var hasNecessaryFields = function(error) {
          return (typeof error.name === "string" || typeof error.errorClass === "string") && (typeof error.message === "string" || typeof error.errorMessage === "string");
        };
        var _$Event_15 = Event2;
        var _$asyncEvery_16 = function(arr, fn, cb) {
          var index = 0;
          var next = function() {
            if (index >= arr.length) return cb(null, true);
            fn(arr[index], function(err, result) {
              if (err) return cb(err);
              if (result === false) return cb(null, false);
              index++;
              next();
            });
          };
          next();
        };
        ;
        var _$callbackRunner_18 = function(callbacks, event, onCallbackError, cb) {
          var runMaybeAsyncCallback = function(fn, cb2) {
            if (typeof fn !== "function") return cb2(null);
            try {
              if (fn.length !== 2) {
                var ret = fn(event);
                if (ret && typeof ret.then === "function") {
                  return ret.then(
                    // resolve
                    function(val) {
                      return setTimeout(function() {
                        return cb2(null, val);
                      });
                    },
                    // reject
                    function(err) {
                      setTimeout(function() {
                        onCallbackError(err);
                        return cb2(null, true);
                      });
                    }
                  );
                }
                return cb2(null, ret);
              }
              fn(event, function(err, result) {
                if (err) {
                  onCallbackError(err);
                  return cb2(null);
                }
                cb2(null, result);
              });
            } catch (e) {
              onCallbackError(e);
              cb2(null);
            }
          };
          _$asyncEvery_16(callbacks, runMaybeAsyncCallback, cb);
        };
        var _$syncCallbackRunner_32 = function(callbacks, callbackArg, callbackType, logger) {
          var ignore = false;
          var cbs = callbacks.slice();
          while (!ignore) {
            if (!cbs.length) break;
            try {
              ignore = cbs.pop()(callbackArg) === false;
            } catch (e) {
              logger.error("Error occurred in " + callbackType + " callback, continuing anyway\u2026");
              logger.error(e);
            }
          }
          return ignore;
        };
        var _$pad_4 = function pad(num, size) {
          var s = "000000000" + num;
          return s.substr(s.length - size);
        };
        ;
        var env = typeof window === "object" ? window : self;
        var globalCount = 0;
        for (var prop in env) {
          if (Object.hasOwnProperty.call(env, prop)) globalCount++;
        }
        var mimeTypesLength = navigator.mimeTypes ? navigator.mimeTypes.length : 0;
        var clientId = _$pad_4((mimeTypesLength + navigator.userAgent.length).toString(36) + globalCount.toString(36), 4);
        var _$fingerprint_2 = function fingerprint() {
          return clientId;
        };
        var _$isCuid_3 = function isCuid(value) {
          return typeof value === "string" && /^c[a-z0-9]{20,32}$/.test(value);
        };
        ;
        ;
        ;
        var c = 0, blockSize = 4, base = 36, discreteValues = Math.pow(base, blockSize);
        function randomBlock() {
          return _$pad_4((Math.random() * discreteValues << 0).toString(base), blockSize);
        }
        function safeCounter() {
          c = c < discreteValues ? c : 0;
          c++;
          return c - 1;
        }
        function cuid() {
          var letter = "c", timestamp = (/* @__PURE__ */ new Date()).getTime().toString(base), counter = _$pad_4(safeCounter().toString(base), blockSize), print = _$fingerprint_2(), random = randomBlock() + randomBlock();
          return letter + timestamp + counter + print + random;
        }
        cuid.fingerprint = _$fingerprint_2;
        cuid.isCuid = _$isCuid_3;
        var _$cuid_1 = cuid;
        ;
        var Session = /* @__PURE__ */ function() {
          function Session2() {
            this.id = _$cuid_1();
            this.startedAt = /* @__PURE__ */ new Date();
            this._handled = 0;
            this._unhandled = 0;
            this._user = {};
            this.app = {};
            this.device = {};
          }
          var _proto = Session2.prototype;
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto.toJSON = function toJSON() {
            return {
              id: this.id,
              startedAt: this.startedAt,
              events: {
                handled: this._handled,
                unhandled: this._unhandled
              }
            };
          };
          _proto._track = function _track(event) {
            this[event._handledState.unhandled ? "_unhandled" : "_handled"] += 1;
          };
          return Session2;
        }();
        var _$Session_36 = Session;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var __add_13 = _$featureFlagDelegate_27.add, __clear_13 = _$featureFlagDelegate_27.clear, __merge_13 = _$featureFlagDelegate_27.merge;
        var noop = function() {
        };
        var Client = /* @__PURE__ */ function() {
          function Client2(configuration, schema2, internalPlugins, notifier) {
            var _this = this;
            if (schema2 === void 0) {
              schema2 = _$config_14.schema;
            }
            if (internalPlugins === void 0) {
              internalPlugins = [];
            }
            this._notifier = notifier;
            this._config = {};
            this._schema = schema2;
            this._delivery = {
              sendSession: noop,
              sendEvent: noop
            };
            this._logger = {
              debug: noop,
              info: noop,
              warn: noop,
              error: noop
            };
            this._plugins = {};
            this._breadcrumbs = [];
            this._session = null;
            this._metadata = {};
            this._featuresIndex = {};
            this._features = [];
            this._context = void 0;
            this._user = {};
            this._cbs = {
              e: [],
              s: [],
              sp: [],
              b: []
            };
            this.Client = Client2;
            this.Event = _$Event_15;
            this.Breadcrumb = _$Breadcrumb_12;
            this.Session = _$Session_36;
            this._config = this._configure(configuration, internalPlugins);
            _$map_25(internalPlugins.concat(this._config.plugins), function(pl) {
              if (pl) _this._loadPlugin(pl);
            });
            this._depth = 1;
            var self2 = this;
            var notify = this.notify;
            this.notify = function() {
              return notify.apply(self2, arguments);
            };
          }
          var _proto = Client2.prototype;
          _proto.addMetadata = function addMetadata(section, keyOrObj, maybeVal) {
            return _$metadataDelegate_31.add(this._metadata, section, keyOrObj, maybeVal);
          };
          _proto.getMetadata = function getMetadata(section, key) {
            return _$metadataDelegate_31.get(this._metadata, section, key);
          };
          _proto.clearMetadata = function clearMetadata(section, key) {
            return _$metadataDelegate_31.clear(this._metadata, section, key);
          };
          _proto.addFeatureFlag = function addFeatureFlag(name2, variant) {
            if (variant === void 0) {
              variant = null;
            }
            __add_13(this._features, this._featuresIndex, name2, variant);
          };
          _proto.addFeatureFlags = function addFeatureFlags(featureFlags) {
            __merge_13(this._features, featureFlags, this._featuresIndex);
          };
          _proto.clearFeatureFlag = function clearFeatureFlag(name2) {
            __clear_13(this._features, this._featuresIndex, name2);
          };
          _proto.clearFeatureFlags = function clearFeatureFlags() {
            this._features = [];
            this._featuresIndex = {};
          };
          _proto.getContext = function getContext() {
            return this._context;
          };
          _proto.setContext = function setContext(c2) {
            this._context = c2;
          };
          _proto._configure = function _configure(opts, internalPlugins) {
            var schema2 = _$reduce_26(internalPlugins, function(schema3, plugin) {
              if (plugin && plugin.configSchema) return _$assign_20({}, schema3, plugin.configSchema);
              return schema3;
            }, this._schema);
            if (!opts.endpoints) {
              opts.sendPayloadChecksums = "sendPayloadChecksums" in opts ? opts.sendPayloadChecksums : true;
            }
            var _reduce = _$reduce_26(_$keys_24(schema2), function(accum, key) {
              var defaultValue = schema2[key].defaultValue(opts[key]);
              if (opts[key] !== void 0) {
                var valid = schema2[key].validate(opts[key]);
                if (!valid) {
                  accum.errors[key] = schema2[key].message;
                  accum.config[key] = defaultValue;
                } else {
                  if (schema2[key].allowPartialObject) {
                    accum.config[key] = _$assign_20(defaultValue, opts[key]);
                  } else {
                    accum.config[key] = opts[key];
                  }
                }
              } else {
                accum.config[key] = defaultValue;
              }
              return accum;
            }, {
              errors: {},
              config: {}
            }), errors = _reduce.errors, config = _reduce.config;
            if (schema2.apiKey) {
              if (!config.apiKey) throw new Error("No Bugsnag API Key set");
              if (!/^[0-9a-f]{32}$/i.test(config.apiKey)) errors.apiKey = "should be a string of 32 hexadecimal characters";
            }
            this._metadata = _$assign_20({}, config.metadata);
            __merge_13(this._features, config.featureFlags, this._featuresIndex);
            this._user = _$assign_20({}, config.user);
            this._context = config.context;
            if (config.logger) this._logger = config.logger;
            if (config.onError) this._cbs.e = this._cbs.e.concat(config.onError);
            if (config.onBreadcrumb) this._cbs.b = this._cbs.b.concat(config.onBreadcrumb);
            if (config.onSession) this._cbs.s = this._cbs.s.concat(config.onSession);
            if (_$keys_24(errors).length) {
              this._logger.warn(generateConfigErrorMessage(errors, opts));
            }
            return config;
          };
          _proto.getUser = function getUser() {
            return this._user;
          };
          _proto.setUser = function setUser(id, email, name2) {
            this._user = {
              id,
              email,
              name: name2
            };
          };
          _proto._loadPlugin = function _loadPlugin(plugin) {
            var result = plugin.load(this);
            if (plugin.name) this._plugins["~" + plugin.name + "~"] = result;
          };
          _proto.getPlugin = function getPlugin(name2) {
            return this._plugins["~" + name2 + "~"];
          };
          _proto._setDelivery = function _setDelivery(d) {
            this._delivery = d(this);
          };
          _proto.startSession = function startSession() {
            var session = new _$Session_36();
            session.app.releaseStage = this._config.releaseStage;
            session.app.version = this._config.appVersion;
            session.app.type = this._config.appType;
            session._user = _$assign_20({}, this._user);
            var ignore = _$syncCallbackRunner_32(this._cbs.s, session, "onSession", this._logger);
            if (ignore) {
              this._logger.debug("Session not started due to onSession callback");
              return this;
            }
            return this._sessionDelegate.startSession(this, session);
          };
          _proto.addOnError = function addOnError(fn, front) {
            if (front === void 0) {
              front = false;
            }
            this._cbs.e[front ? "unshift" : "push"](fn);
          };
          _proto.removeOnError = function removeOnError(fn) {
            this._cbs.e = _$filter_21(this._cbs.e, function(f) {
              return f !== fn;
            });
          };
          _proto._addOnSessionPayload = function _addOnSessionPayload(fn) {
            this._cbs.sp.push(fn);
          };
          _proto.addOnSession = function addOnSession(fn) {
            this._cbs.s.push(fn);
          };
          _proto.removeOnSession = function removeOnSession(fn) {
            this._cbs.s = _$filter_21(this._cbs.s, function(f) {
              return f !== fn;
            });
          };
          _proto.addOnBreadcrumb = function addOnBreadcrumb(fn, front) {
            if (front === void 0) {
              front = false;
            }
            this._cbs.b[front ? "unshift" : "push"](fn);
          };
          _proto.removeOnBreadcrumb = function removeOnBreadcrumb(fn) {
            this._cbs.b = _$filter_21(this._cbs.b, function(f) {
              return f !== fn;
            });
          };
          _proto.pauseSession = function pauseSession() {
            return this._sessionDelegate.pauseSession(this);
          };
          _proto.resumeSession = function resumeSession() {
            return this._sessionDelegate.resumeSession(this);
          };
          _proto.leaveBreadcrumb = function leaveBreadcrumb(message, metadata, type) {
            message = typeof message === "string" ? message : "";
            type = typeof type === "string" && _$includes_22(_$breadcrumbTypes_17, type) ? type : "manual";
            metadata = typeof metadata === "object" && metadata !== null ? metadata : {};
            if (!message) return;
            var crumb = new _$Breadcrumb_12(message, metadata, type);
            var ignore = _$syncCallbackRunner_32(this._cbs.b, crumb, "onBreadcrumb", this._logger);
            if (ignore) {
              this._logger.debug("Breadcrumb not attached due to onBreadcrumb callback");
              return;
            }
            this._breadcrumbs.push(crumb);
            if (this._breadcrumbs.length > this._config.maxBreadcrumbs) {
              this._breadcrumbs = this._breadcrumbs.slice(this._breadcrumbs.length - this._config.maxBreadcrumbs);
            }
          };
          _proto._isBreadcrumbTypeEnabled = function _isBreadcrumbTypeEnabled(type) {
            var types = this._config.enabledBreadcrumbTypes;
            return types === null || _$includes_22(types, type);
          };
          _proto.notify = function notify(maybeError, onError, postReportCallback) {
            if (postReportCallback === void 0) {
              postReportCallback = noop;
            }
            var event = _$Event_15.create(maybeError, true, void 0, "notify()", this._depth + 1, this._logger);
            this._notify(event, onError, postReportCallback);
          };
          _proto._notify = function _notify(event, onError, postReportCallback) {
            var _this2 = this;
            if (postReportCallback === void 0) {
              postReportCallback = noop;
            }
            event.app = _$assign_20({}, event.app, {
              releaseStage: this._config.releaseStage,
              version: this._config.appVersion,
              type: this._config.appType
            });
            event.context = event.context || this._context;
            event._metadata = _$assign_20({}, event._metadata, this._metadata);
            event._user = _$assign_20({}, event._user, this._user);
            event.breadcrumbs = this._breadcrumbs.slice();
            __merge_13(event._features, this._features, event._featuresIndex);
            if (this._config.enabledReleaseStages !== null && !_$includes_22(this._config.enabledReleaseStages, this._config.releaseStage)) {
              this._logger.warn("Event not sent due to releaseStage/enabledReleaseStages configuration");
              return postReportCallback(null, event);
            }
            var originalSeverity = event.severity;
            var onCallbackError = function(err) {
              _this2._logger.error("Error occurred in onError callback, continuing anyway\u2026");
              _this2._logger.error(err);
            };
            var callbacks = [].concat(this._cbs.e).concat(onError);
            _$callbackRunner_18(callbacks, event, onCallbackError, function(err, shouldSend) {
              if (err) onCallbackError(err);
              if (!shouldSend) {
                _this2._logger.debug("Event not sent due to onError callback");
                return postReportCallback(null, event);
              }
              if (_this2._isBreadcrumbTypeEnabled("error")) {
                Client2.prototype.leaveBreadcrumb.call(_this2, event.errors[0].errorClass, {
                  errorClass: event.errors[0].errorClass,
                  errorMessage: event.errors[0].errorMessage,
                  severity: event.severity
                }, "error");
              }
              if (originalSeverity !== event.severity) {
                event._handledState.severityReason = {
                  type: "userCallbackSetSeverity"
                };
              }
              if (event.unhandled !== event._handledState.unhandled) {
                event._handledState.severityReason.unhandledOverridden = true;
                event._handledState.unhandled = event.unhandled;
              }
              if (_this2._session) {
                _this2._session._track(event);
                event._session = _this2._session;
              }
              _this2._delivery.sendEvent({
                apiKey: event.apiKey || _this2._config.apiKey,
                notifier: _this2._notifier,
                events: [event]
              }, function(err2) {
                return postReportCallback(err2, event);
              });
            });
          };
          return Client2;
        }();
        var generateConfigErrorMessage = function(errors, rawInput) {
          var er = new Error("Invalid configuration\n" + _$map_25(_$keys_24(errors), function(key) {
            return "  - " + key + " " + errors[key] + ", got " + stringify(rawInput[key]);
          }).join("\n\n"));
          return er;
        };
        var stringify = function(val) {
          switch (typeof val) {
            case "string":
            case "number":
            case "object":
              return JSON.stringify(val);
            default:
              return String(val);
          }
        };
        var _$Client_13 = Client;
        var _$jsonPayload_30 = {};
        ;
        var EVENT_REDACTION_PATHS = ["events.[].metaData", "events.[].breadcrumbs.[].metaData", "events.[].request"];
        _$jsonPayload_30.event = function(event, redactedKeys) {
          var payload = _$safeJsonStringify_5(event, null, null, {
            redactedPaths: EVENT_REDACTION_PATHS,
            redactedKeys
          });
          if (payload.length > 1e6) {
            event.events[0]._metadata = {
              notifier: "WARNING!\nSerialized payload was " + payload.length / 1e6 + "MB (limit = 1MB)\nmetadata was removed"
            };
            payload = _$safeJsonStringify_5(event, null, null, {
              redactedPaths: EVENT_REDACTION_PATHS,
              redactedKeys
            });
          }
          return payload;
        };
        _$jsonPayload_30.session = function(session, redactedKeys) {
          var payload = _$safeJsonStringify_5(session, null, null);
          return payload;
        };
        var _$delivery_37 = {};
        ;
        _$delivery_37 = function(client, win) {
          if (win === void 0) {
            win = window;
          }
          return {
            sendEvent: function(event, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              if (client._config.endpoints.notify === null) {
                var err = new Error("Event not sent due to incomplete endpoint configuration");
                return cb(err);
              }
              var url2 = getApiUrl(client._config, "notify", "4", win);
              var body = _$jsonPayload_30.event(event, client._config.redactedKeys);
              var req = new win.XDomainRequest();
              req.onload = function() {
                cb(null);
              };
              req.onerror = function() {
                var err2 = new Error("Event failed to send");
                client._logger.error("Event failed to send\u2026", err2);
                if (body.length > 1e6) {
                  client._logger.warn("Event oversized (" + (body.length / 1e6).toFixed(2) + " MB)");
                }
                cb(err2);
              };
              req.open("POST", url2);
              setTimeout(function() {
                try {
                  req.send(body);
                } catch (e) {
                  client._logger.error(e);
                  cb(e);
                }
              }, 0);
            },
            sendSession: function(session, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              if (client._config.endpoints.sessions === null) {
                var err = new Error("Session not sent due to incomplete endpoint configuration");
                return cb(err);
              }
              var url2 = getApiUrl(client._config, "sessions", "1", win);
              var req = new win.XDomainRequest();
              req.onload = function() {
                cb(null);
              };
              req.open("POST", url2);
              setTimeout(function() {
                try {
                  req.send(_$jsonPayload_30.session(session, client._config.redactedKeys));
                } catch (e) {
                  client._logger.error(e);
                  cb(e);
                }
              }, 0);
            }
          };
        };
        var getApiUrl = function(config, endpoint, version2, win) {
          var isoDate = JSON.parse(JSON.stringify(/* @__PURE__ */ new Date()));
          var url2 = matchPageProtocol(config.endpoints[endpoint], win.location.protocol);
          return url2 + "?apiKey=" + encodeURIComponent(config.apiKey) + "&payloadVersion=" + version2 + "&sentAt=" + encodeURIComponent(isoDate);
        };
        var matchPageProtocol = _$delivery_37._matchPageProtocol = function(endpoint, pageProtocol) {
          return pageProtocol === "http:" ? endpoint.replace(/^https:/, "http:") : endpoint;
        };
        ;
        function getIntegrityHeaderValue(windowOrWorkerGlobalScope, requestBody) {
          if (windowOrWorkerGlobalScope.isSecureContext && windowOrWorkerGlobalScope.crypto && windowOrWorkerGlobalScope.crypto.subtle && windowOrWorkerGlobalScope.crypto.subtle.digest && typeof TextEncoder === "function") {
            var msgUint8 = new TextEncoder().encode(requestBody);
            return windowOrWorkerGlobalScope.crypto.subtle.digest("SHA-1", msgUint8).then(function(hashBuffer) {
              var hashArray = Array.from(new Uint8Array(hashBuffer));
              var hashHex = hashArray.map(function(b) {
                return b.toString(16).padStart(2, "0");
              }).join("");
              return "sha1 " + hashHex;
            });
          }
          return Promise.resolve();
        }
        var _$delivery_38 = function(client, win) {
          if (win === void 0) {
            win = window;
          }
          return {
            sendEvent: function(event, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              try {
                var url2 = client._config.endpoints.notify;
                if (url2 === null) {
                  var err = new Error("Event not sent due to incomplete endpoint configuration");
                  return cb(err);
                }
                var req = new win.XMLHttpRequest();
                var body = _$jsonPayload_30.event(event, client._config.redactedKeys);
                req.onreadystatechange = function() {
                  if (req.readyState === win.XMLHttpRequest.DONE) {
                    var status = req.status;
                    if (status === 0 || status >= 400) {
                      var _err = new Error("Request failed with status " + status);
                      client._logger.error("Event failed to send\u2026", _err);
                      if (body.length > 1e6) {
                        client._logger.warn("Event oversized (" + (body.length / 1e6).toFixed(2) + " MB)");
                      }
                      cb(_err);
                    } else {
                      cb(null);
                    }
                  }
                };
                req.open("POST", url2);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Bugsnag-Api-Key", event.apiKey || client._config.apiKey);
                req.setRequestHeader("Bugsnag-Payload-Version", "4");
                req.setRequestHeader("Bugsnag-Sent-At", (/* @__PURE__ */ new Date()).toISOString());
                if (client._config.sendPayloadChecksums && typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                  getIntegrityHeaderValue(win, body).then(function(integrity) {
                    if (integrity) {
                      req.setRequestHeader("Bugsnag-Integrity", integrity);
                    }
                    req.send(body);
                  })["catch"](function(err2) {
                    client._logger.error(err2);
                    req.send(body);
                  });
                } else {
                  req.send(body);
                }
              } catch (e) {
                client._logger.error(e);
              }
            },
            sendSession: function(session, cb) {
              if (cb === void 0) {
                cb = function() {
                };
              }
              try {
                var url2 = client._config.endpoints.sessions;
                if (url2 === null) {
                  var err = new Error("Session not sent due to incomplete endpoint configuration");
                  return cb(err);
                }
                var req = new win.XMLHttpRequest();
                var body = _$jsonPayload_30.session(session, client._config.redactedKeys);
                req.onreadystatechange = function() {
                  if (req.readyState === win.XMLHttpRequest.DONE) {
                    var status = req.status;
                    if (status === 0 || status >= 400) {
                      var _err2 = new Error("Request failed with status " + status);
                      client._logger.error("Session failed to send\u2026", _err2);
                      cb(_err2);
                    } else {
                      cb(null);
                    }
                  }
                };
                req.open("POST", url2);
                req.setRequestHeader("Content-Type", "application/json");
                req.setRequestHeader("Bugsnag-Api-Key", client._config.apiKey);
                req.setRequestHeader("Bugsnag-Payload-Version", "1");
                req.setRequestHeader("Bugsnag-Sent-At", (/* @__PURE__ */ new Date()).toISOString());
                if (client._config.sendPayloadChecksums && typeof Promise !== "undefined" && Promise.toString().indexOf("[native code]") !== -1) {
                  getIntegrityHeaderValue(win, body).then(function(integrity) {
                    if (integrity) {
                      req.setRequestHeader("Bugsnag-Integrity", integrity);
                    }
                    req.send(body);
                  })["catch"](function(err2) {
                    client._logger.error(err2);
                    req.send(body);
                  });
                } else {
                  req.send(body);
                }
              } catch (e) {
                client._logger.error(e);
              }
            }
          };
        };
        var appStart = /* @__PURE__ */ new Date();
        var reset = function() {
          appStart = /* @__PURE__ */ new Date();
        };
        var _$app_39 = {
          name: "appDuration",
          load: function(client) {
            client.addOnError(function(event) {
              var now = /* @__PURE__ */ new Date();
              event.app.duration = now - appStart;
            }, true);
            return {
              reset
            };
          }
        };
        var _$context_40 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              client.addOnError(function(event) {
                if (event.context !== void 0) return;
                event.context = win.location.pathname;
              }, true);
            }
          };
        };
        ;
        var BUGSNAG_ANONYMOUS_ID_KEY = "bugsnag-anonymous-id";
        var getDeviceId = function(win) {
          try {
            var storage = win.localStorage;
            var id = storage.getItem(BUGSNAG_ANONYMOUS_ID_KEY);
            if (id && /^c[a-z0-9]{20,32}$/.test(id)) {
              return id;
            }
            ;
            id = _$cuid_1();
            storage.setItem(BUGSNAG_ANONYMOUS_ID_KEY, id);
            return id;
          } catch (err) {
          }
        };
        var _$device_41 = function(nav, win) {
          if (nav === void 0) {
            nav = navigator;
          }
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              var device = {
                locale: nav.browserLanguage || nav.systemLanguage || nav.userLanguage || nav.language,
                userAgent: nav.userAgent
              };
              if (win && win.screen && win.screen.orientation && win.screen.orientation.type) {
                device.orientation = win.screen.orientation.type;
              } else if (win && win.document) {
                device.orientation = win.document.documentElement.clientWidth > win.document.documentElement.clientHeight ? "landscape" : "portrait";
              }
              if (client._config.generateAnonymousId) {
                device.id = getDeviceId(win);
              }
              client.addOnSession(function(session) {
                session.device = _$assign_20({}, session.device, device);
                if (!client._config.collectUserIp) setDefaultUserId(session);
              });
              client.addOnError(function(event) {
                event.device = _$assign_20({}, event.device, device, {
                  time: /* @__PURE__ */ new Date()
                });
                if (!client._config.collectUserIp) setDefaultUserId(event);
              }, true);
            },
            configSchema: {
              generateAnonymousId: {
                validate: function(value) {
                  return value === true || value === false;
                },
                defaultValue: function() {
                  return true;
                },
                message: "should be true|false"
              }
            }
          };
        };
        var setDefaultUserId = function(eventOrSession) {
          var user = eventOrSession.getUser();
          if (!user || !user.id) {
            eventOrSession.setUser(eventOrSession.device.id);
          }
        };
        ;
        var _$request_42 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              client.addOnError(function(event) {
                if (event.request && event.request.url) return;
                event.request = _$assign_20({}, event.request, {
                  url: win.location.href
                });
              }, true);
            }
          };
        };
        ;
        var _$session_43 = {
          load: function(client) {
            client._sessionDelegate = sessionDelegate;
          }
        };
        var sessionDelegate = {
          startSession: function(client, session) {
            var sessionClient = client;
            sessionClient._session = session;
            sessionClient._pausedSession = null;
            if (sessionClient._config.enabledReleaseStages !== null && !_$includes_22(sessionClient._config.enabledReleaseStages, sessionClient._config.releaseStage)) {
              sessionClient._logger.warn("Session not sent due to releaseStage/enabledReleaseStages configuration");
              return sessionClient;
            }
            sessionClient._delivery.sendSession({
              notifier: sessionClient._notifier,
              device: session.device,
              app: session.app,
              sessions: [{
                id: session.id,
                startedAt: session.startedAt,
                user: session._user
              }]
            });
            return sessionClient;
          },
          resumeSession: function(client) {
            if (client._session) {
              return client;
            }
            if (client._pausedSession) {
              client._session = client._pausedSession;
              client._pausedSession = null;
              return client;
            }
            return client.startSession();
          },
          pauseSession: function(client) {
            client._pausedSession = client._session;
            client._session = null;
          }
        };
        ;
        var _$clientIp_44 = {
          load: function(client) {
            if (client._config.collectUserIp) return;
            client.addOnError(function(event) {
              if (event._user && typeof event._user.id === "undefined") delete event._user.id;
              event._user = _$assign_20({
                id: "[REDACTED]"
              }, event._user);
              event.request = _$assign_20({
                clientIp: "[REDACTED]"
              }, event.request);
            });
          },
          configSchema: {
            collectUserIp: {
              defaultValue: function() {
                return true;
              },
              message: "should be true|false",
              validate: function(value) {
                return value === true || value === false;
              }
            }
          }
        };
        var _$consoleBreadcrumbs_45 = {};
        ;
        ;
        ;
        _$consoleBreadcrumbs_45.load = function(client) {
          var isDev = /^(local-)?dev(elopment)?$/.test(client._config.releaseStage);
          if (isDev || !client._isBreadcrumbTypeEnabled("log")) return;
          _$map_25(CONSOLE_LOG_METHODS, function(method) {
            var original = console[method];
            console[method] = function() {
              for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
                args[_key] = arguments[_key];
              }
              client.leaveBreadcrumb("Console output", _$reduce_26(args, function(accum, arg, i) {
                var stringified = "[Unknown value]";
                try {
                  stringified = String(arg);
                } catch (e) {
                }
                if (stringified === "[object Object]") {
                  try {
                    stringified = JSON.stringify(arg);
                  } catch (e) {
                  }
                }
                accum["[" + i + "]"] = stringified;
                return accum;
              }, {
                severity: method.indexOf("group") === 0 ? "log" : method
              }), "log");
              original.apply(console, args);
            };
            console[method]._restore = function() {
              console[method] = original;
            };
          });
        };
        if (false) {
          _$consoleBreadcrumbs_45.destroy = function() {
            return CONSOLE_LOG_METHODS.forEach(function(method) {
              if (typeof console[method]._restore === "function") console[method]._restore();
            });
          };
        }
        var CONSOLE_LOG_METHODS = _$filter_21(["log", "debug", "info", "warn", "error"], function(method) {
          return typeof console !== "undefined" && typeof console[method] === "function";
        });
        ;
        ;
        ;
        var MAX_LINE_LENGTH = 200;
        var MAX_SCRIPT_LENGTH = 5e5;
        var _$inlineScriptContent_46 = function(doc, win) {
          if (doc === void 0) {
            doc = document;
          }
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              if (!client._config.trackInlineScripts) return;
              var originalLocation = win.location.href;
              var html = "";
              var isOldIe = !!doc.attachEvent;
              var DOMContentLoaded = isOldIe ? doc.readyState === "complete" : doc.readyState !== "loading";
              var getHtml = function() {
                return doc.documentElement.outerHTML;
              };
              html = getHtml();
              var prev = doc.onreadystatechange;
              doc.onreadystatechange = function() {
                if (doc.readyState === "interactive") {
                  html = getHtml();
                  DOMContentLoaded = true;
                }
                try {
                  prev.apply(this, arguments);
                } catch (e) {
                }
              };
              var _lastScript = null;
              var updateLastScript = function(script) {
                _lastScript = script;
              };
              var getCurrentScript = function() {
                var script = doc.currentScript || _lastScript;
                if (!script && !DOMContentLoaded) {
                  var scripts = doc.scripts || doc.getElementsByTagName("script");
                  script = scripts[scripts.length - 1];
                }
                return script;
              };
              var addSurroundingCode = function(lineNumber) {
                if (!DOMContentLoaded || !html) html = getHtml();
                var htmlLines = ["<!-- DOC START -->"].concat(html.split("\n"));
                var zeroBasedLine = lineNumber - 1;
                var start = Math.max(zeroBasedLine - 3, 0);
                var end = Math.min(zeroBasedLine + 3, htmlLines.length);
                return _$reduce_26(htmlLines.slice(start, end), function(accum, line, i) {
                  accum[start + 1 + i] = line.length <= MAX_LINE_LENGTH ? line : line.substr(0, MAX_LINE_LENGTH);
                  return accum;
                }, {});
              };
              client.addOnError(function(event) {
                event.errors[0].stacktrace = _$filter_21(event.errors[0].stacktrace, function(f) {
                  return !/__trace__$/.test(f.method);
                });
                var frame = event.errors[0].stacktrace[0];
                var cleanUrl = function(url2) {
                  return url2.replace(/#.*$/, "").replace(/\?.*$/, "");
                };
                if (frame && frame.file && cleanUrl(frame.file) !== cleanUrl(originalLocation)) return;
                var currentScript = getCurrentScript();
                if (currentScript) {
                  var content = currentScript.innerHTML;
                  event.addMetadata("script", "content", content.length <= MAX_SCRIPT_LENGTH ? content : content.substr(0, MAX_SCRIPT_LENGTH));
                  if (frame && frame.lineNumber) {
                    frame.code = addSurroundingCode(frame.lineNumber);
                  }
                }
              }, true);
              var _map = _$map_25(["setTimeout", "setInterval", "setImmediate", "requestAnimationFrame"], function(fn) {
                return __proxy(win, fn, function(original) {
                  return __traceOriginalScript(original, function(args) {
                    return {
                      get: function() {
                        return args[0];
                      },
                      replace: function(fn2) {
                        args[0] = fn2;
                      }
                    };
                  });
                });
              }), _setTimeout = _map[0];
              _$map_25(["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"], function(o) {
                if (!win[o] || !win[o].prototype || !Object.prototype.hasOwnProperty.call(win[o].prototype, "addEventListener")) return;
                __proxy(win[o].prototype, "addEventListener", function(original) {
                  return __traceOriginalScript(original, eventTargetCallbackAccessor);
                });
                __proxy(win[o].prototype, "removeEventListener", function(original) {
                  return __traceOriginalScript(original, eventTargetCallbackAccessor, true);
                });
              });
              function __traceOriginalScript(fn, callbackAccessor, alsoCallOriginal) {
                if (alsoCallOriginal === void 0) {
                  alsoCallOriginal = false;
                }
                return function() {
                  var args = [].slice.call(arguments);
                  try {
                    var cba = callbackAccessor(args);
                    var cb = cba.get();
                    if (alsoCallOriginal) fn.apply(this, args);
                    if (typeof cb !== "function") return fn.apply(this, args);
                    if (cb.__trace__) {
                      cba.replace(cb.__trace__);
                    } else {
                      var script = getCurrentScript();
                      cb.__trace__ = function __trace__() {
                        updateLastScript(script);
                        _setTimeout(function() {
                          updateLastScript(null);
                        }, 0);
                        var ret = cb.apply(this, arguments);
                        updateLastScript(null);
                        return ret;
                      };
                      cb.__trace__.__trace__ = cb.__trace__;
                      cba.replace(cb.__trace__);
                    }
                  } catch (e) {
                  }
                  if (fn.apply) return fn.apply(this, args);
                  switch (args.length) {
                    case 1:
                      return fn(args[0]);
                    case 2:
                      return fn(args[0], args[1]);
                    default:
                      return fn();
                  }
                };
              }
            },
            configSchema: {
              trackInlineScripts: {
                validate: function(value) {
                  return value === true || value === false;
                },
                defaultValue: function() {
                  return true;
                },
                message: "should be true|false"
              }
            }
          };
        };
        function __proxy(host, name2, replacer) {
          var original = host[name2];
          if (!original) return original;
          var replacement = replacer(original);
          host[name2] = replacement;
          return original;
        }
        function eventTargetCallbackAccessor(args) {
          var isEventHandlerObj = !!args[1] && typeof args[1].handleEvent === "function";
          return {
            get: function() {
              return isEventHandlerObj ? args[1].handleEvent : args[1];
            },
            replace: function(fn) {
              if (isEventHandlerObj) {
                args[1].handleEvent = fn;
              } else {
                args[1] = fn;
              }
            }
          };
        }
        var _$interactionBreadcrumbs_47 = function(win) {
          if (win === void 0) {
            win = window;
          }
          return {
            load: function(client) {
              if (!("addEventListener" in win)) return;
              if (!client._isBreadcrumbTypeEnabled("user")) return;
              win.addEventListener("click", function(event) {
                var targetText, targetSelector;
                try {
                  targetText = getNodeText(event.target);
                  targetSelector = getNodeSelector(event.target, win);
                } catch (e) {
                  targetText = "[hidden]";
                  targetSelector = "[hidden]";
                  client._logger.error("Cross domain error when tracking click event. See docs: https://tinyurl.com/yy3rn63z");
                }
                client.leaveBreadcrumb("UI click", {
                  targetText,
                  targetSelector
                }, "user");
              }, true);
            }
          };
        };
        var trim = /^\s*([^\s][\s\S]{0,139}[^\s])?\s*/;
        function getNodeText(el) {
          var text = el.textContent || el.innerText || "";
          if (!text && (el.type === "submit" || el.type === "button")) {
            text = el.value;
          }
          text = text.replace(trim, "$1");
          if (text.length > 140) {
            return text.slice(0, 135) + "(...)";
          }
          return text;
        }
        function getNodeSelector(el, win) {
          var parts = [el.tagName];
          if (el.id) parts.push("#" + el.id);
          if (el.className && el.className.length) parts.push("." + el.className.split(" ").join("."));
          if (!win.document.querySelectorAll || !Array.prototype.indexOf) return parts.join("");
          try {
            if (win.document.querySelectorAll(parts.join("")).length === 1) return parts.join("");
          } catch (e) {
            return parts.join("");
          }
          if (el.parentNode.childNodes.length > 1) {
            var index = Array.prototype.indexOf.call(el.parentNode.childNodes, el) + 1;
            parts.push(":nth-child(" + index + ")");
          }
          if (win.document.querySelectorAll(parts.join("")).length === 1) return parts.join("");
          if (el.parentNode) return getNodeSelector(el.parentNode, win) + " > " + parts.join("");
          return parts.join("");
        }
        var _$navigationBreadcrumbs_48 = {};
        _$navigationBreadcrumbs_48 = function(win) {
          if (win === void 0) {
            win = window;
          }
          var plugin = {
            load: function(client) {
              if (!("addEventListener" in win)) return;
              if (!client._isBreadcrumbTypeEnabled("navigation")) return;
              var drop = function(name2) {
                return function() {
                  return client.leaveBreadcrumb(name2, {}, "navigation");
                };
              };
              win.addEventListener("pagehide", drop("Page hidden"), true);
              win.addEventListener("pageshow", drop("Page shown"), true);
              win.addEventListener("load", drop("Page loaded"), true);
              win.document.addEventListener("DOMContentLoaded", drop("DOMContentLoaded"), true);
              win.addEventListener("load", function() {
                return win.addEventListener("popstate", drop("Navigated back"), true);
              });
              win.addEventListener("hashchange", function(event) {
                var metadata = event.oldURL ? {
                  from: relativeLocation(event.oldURL, win),
                  to: relativeLocation(event.newURL, win),
                  state: getCurrentState(win)
                } : {
                  to: relativeLocation(win.location.href, win)
                };
                client.leaveBreadcrumb("Hash changed", metadata, "navigation");
              }, true);
              if (win.history.pushState) wrapHistoryFn(client, win.history, "pushState", win, true);
              if (win.history.replaceState) wrapHistoryFn(client, win.history, "replaceState", win);
            }
          };
          if (false) {
            plugin.destroy = function(win2) {
              if (win2 === void 0) {
                win2 = window;
              }
              win2.history.replaceState._restore();
              win2.history.pushState._restore();
            };
          }
          return plugin;
        };
        if (false) {
          _$navigationBreadcrumbs_48.destroy = function(win) {
            if (win === void 0) {
              win = window;
            }
            win.history.replaceState._restore();
            win.history.pushState._restore();
          };
        }
        var relativeLocation = function(url2, win) {
          var a = win.document.createElement("A");
          a.href = url2;
          return "" + a.pathname + a.search + a.hash;
        };
        var stateChangeToMetadata = function(win, state, title, url2) {
          var currentPath = relativeLocation(win.location.href, win);
          return {
            title,
            state,
            prevState: getCurrentState(win),
            to: url2 || currentPath,
            from: currentPath
          };
        };
        var wrapHistoryFn = function(client, target, fn, win, resetEventCount) {
          if (resetEventCount === void 0) {
            resetEventCount = false;
          }
          var orig = target[fn];
          target[fn] = function(state, title, url2) {
            client.leaveBreadcrumb("History " + fn, stateChangeToMetadata(win, state, title, url2), "navigation");
            if (resetEventCount && typeof client.resetEventCount === "function") client.resetEventCount();
            orig.apply(target, [state, title].concat(url2 !== void 0 ? url2 : []));
          };
          if (false) {
            target[fn]._restore = function() {
              target[fn] = orig;
            };
          }
        };
        var getCurrentState = function(win) {
          try {
            return win.history.state;
          } catch (e) {
          }
        };
        var BREADCRUMB_TYPE = "request";
        ;
        var _$networkBreadcrumbs_49 = function(_ignoredUrls, win) {
          if (_ignoredUrls === void 0) {
            _ignoredUrls = [];
          }
          if (win === void 0) {
            win = window;
          }
          var restoreFunctions = [];
          var plugin = {
            load: function(client) {
              if (!client._isBreadcrumbTypeEnabled("request")) return;
              var ignoredUrls = [client._config.endpoints.notify, client._config.endpoints.sessions].concat(_ignoredUrls);
              monkeyPatchXMLHttpRequest();
              monkeyPatchFetch();
              function monkeyPatchXMLHttpRequest() {
                if (!("addEventListener" in win.XMLHttpRequest.prototype) || !("WeakMap" in win)) return;
                var trackedRequests = /* @__PURE__ */ new WeakMap();
                var requestHandlers = /* @__PURE__ */ new WeakMap();
                var originalOpen = win.XMLHttpRequest.prototype.open;
                win.XMLHttpRequest.prototype.open = function open(method, url2) {
                  if (this) {
                    trackedRequests.set(this, {
                      method,
                      url: url2
                    });
                  }
                  originalOpen.apply(this, arguments);
                };
                var originalSend = win.XMLHttpRequest.prototype.send;
                win.XMLHttpRequest.prototype.send = function send(body) {
                  var _this = this;
                  var requestData = trackedRequests.get(this);
                  if (requestData) {
                    var listeners = requestHandlers.get(this);
                    if (listeners) {
                      this.removeEventListener("load", listeners.load);
                      this.removeEventListener("error", listeners.error);
                    }
                    var requestStart = /* @__PURE__ */ new Date();
                    var error = function() {
                      return handleXHRError(requestData.method, requestData.url, getDuration(requestStart));
                    };
                    var load = function() {
                      return handleXHRLoad(requestData.method, requestData.url, _this.status, getDuration(requestStart));
                    };
                    this.addEventListener("load", load);
                    this.addEventListener("error", error);
                    if (this) {
                      requestHandlers.set(this, {
                        load,
                        error
                      });
                    }
                  }
                  originalSend.apply(this, arguments);
                };
                if (false) {
                  restoreFunctions.push(function() {
                    win.XMLHttpRequest.prototype.open = originalOpen;
                    win.XMLHttpRequest.prototype.send = originalSend;
                  });
                }
              }
              function handleXHRLoad(method, url2, status, duration) {
                if (url2 === void 0) {
                  client._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
                  return;
                }
                if (typeof url2 === "string" && _$includes_22(ignoredUrls, url2.replace(/\?.*$/, ""))) {
                  return;
                }
                var metadata = {
                  status,
                  method: String(method),
                  url: String(url2),
                  duration
                };
                if (status >= 400) {
                  client.leaveBreadcrumb("XMLHttpRequest failed", metadata, BREADCRUMB_TYPE);
                } else {
                  client.leaveBreadcrumb("XMLHttpRequest succeeded", metadata, BREADCRUMB_TYPE);
                }
              }
              function handleXHRError(method, url2, duration) {
                if (url2 === void 0) {
                  client._logger.warn("The request URL is no longer present on this XMLHttpRequest. A breadcrumb cannot be left for this request.");
                  return;
                }
                if (typeof url2 === "string" && _$includes_22(ignoredUrls, url2.replace(/\?.*$/, ""))) {
                  return;
                }
                client.leaveBreadcrumb("XMLHttpRequest error", {
                  method: String(method),
                  url: String(url2),
                  duration
                }, BREADCRUMB_TYPE);
              }
              function monkeyPatchFetch() {
                if (!("fetch" in win) || win.fetch.polyfill) return;
                var oldFetch = win.fetch;
                win.fetch = function fetch() {
                  var _arguments = arguments;
                  var urlOrRequest = arguments[0];
                  var options = arguments[1];
                  var method;
                  var url2 = null;
                  if (urlOrRequest && typeof urlOrRequest === "object") {
                    url2 = urlOrRequest.url;
                    if (options && "method" in options) {
                      method = options.method;
                    } else if (urlOrRequest && "method" in urlOrRequest) {
                      method = urlOrRequest.method;
                    }
                  } else {
                    url2 = urlOrRequest;
                    if (options && "method" in options) {
                      method = options.method;
                    }
                  }
                  if (method === void 0) {
                    method = "GET";
                  }
                  return new Promise(function(resolve, reject) {
                    var requestStart = /* @__PURE__ */ new Date();
                    oldFetch.apply(void 0, _arguments).then(function(response) {
                      handleFetchSuccess(response, method, url2, getDuration(requestStart));
                      resolve(response);
                    })["catch"](function(error) {
                      handleFetchError(method, url2, getDuration(requestStart));
                      reject(error);
                    });
                  });
                };
                if (false) {
                  restoreFunctions.push(function() {
                    win.fetch = oldFetch;
                  });
                }
              }
              var handleFetchSuccess = function(response, method, url2, duration) {
                var metadata = {
                  method: String(method),
                  status: response.status,
                  url: String(url2),
                  duration
                };
                if (response.status >= 400) {
                  client.leaveBreadcrumb("fetch() failed", metadata, BREADCRUMB_TYPE);
                } else {
                  client.leaveBreadcrumb("fetch() succeeded", metadata, BREADCRUMB_TYPE);
                }
              };
              var handleFetchError = function(method, url2, duration) {
                client.leaveBreadcrumb("fetch() error", {
                  method: String(method),
                  url: String(url2),
                  duration
                }, BREADCRUMB_TYPE);
              };
            }
          };
          if (false) {
            plugin.destroy = function() {
              restoreFunctions.forEach(function(fn) {
                return fn();
              });
              restoreFunctions = [];
            };
          }
          return plugin;
        };
        var getDuration = function(startTime) {
          return startTime && /* @__PURE__ */ new Date() - startTime;
        };
        ;
        var _$throttle_50 = {
          load: function(client) {
            var n = 0;
            client.addOnError(function(event) {
              if (n >= client._config.maxEvents) {
                client._logger.warn("Cancelling event send due to maxEvents per session limit of " + client._config.maxEvents + " being reached");
                return false;
              }
              n++;
            });
            client.resetEventCount = function() {
              n = 0;
            };
          },
          configSchema: {
            maxEvents: {
              defaultValue: function() {
                return 10;
              },
              message: "should be a positive integer \u2264100",
              validate: function(val) {
                return _$intRange_33(1, 100)(val);
              }
            }
          }
        };
        var _$stripQueryString_51 = {};
        ;
        ;
        _$stripQueryString_51 = {
          load: function(client) {
            client.addOnError(function(event) {
              var allFrames = _$reduce_26(event.errors, function(accum, er) {
                return accum.concat(er.stacktrace);
              }, []);
              _$map_25(allFrames, function(frame) {
                frame.file = strip(frame.file);
              });
            });
          }
        };
        var strip = _$stripQueryString_51._strip = function(str) {
          return typeof str === "string" ? str.replace(/\?.*$/, "").replace(/#.*$/, "") : str;
        };
        var _$onerror_52 = function(win, component) {
          if (win === void 0) {
            win = window;
          }
          if (component === void 0) {
            component = "window onerror";
          }
          return {
            load: function(client) {
              if (!client._config.autoDetectErrors) return;
              if (!client._config.enabledErrorTypes.unhandledExceptions) return;
              function onerror(messageOrEvent, url2, lineNo, charNo, error) {
                if (lineNo === 0 && /Script error\.?/.test(messageOrEvent)) {
                  client._logger.warn("Ignoring cross-domain or eval script error. See docs: https://tinyurl.com/yy3rn63z");
                } else {
                  var handledState = {
                    severity: "error",
                    unhandled: true,
                    severityReason: {
                      type: "unhandledException"
                    }
                  };
                  var event;
                  if (error) {
                    event = client.Event.create(error, true, handledState, component, 1);
                    decorateStack(event.errors[0].stacktrace, url2, lineNo, charNo);
                  } else if (
                    // This complex case detects "error" events that are typically synthesised
                    // by jquery's trigger method (although can be created in other ways). In
                    // order to detect this:
                    // - the first argument (message) must exist and be an object (most likely it's a jQuery event)
                    // - the second argument (url) must either not exist or be something other than a string (if it
                    //    exists and is not a string, it'll be the extraParameters argument from jQuery's trigger()
                    //    function)
                    // - the third, fourth and fifth arguments must not exist (lineNo, charNo and error)
                    typeof messageOrEvent === "object" && messageOrEvent !== null && (!url2 || typeof url2 !== "string") && !lineNo && !charNo && !error
                  ) {
                    var name2 = messageOrEvent.type ? "Event: " + messageOrEvent.type : "Error";
                    var message = messageOrEvent.message || messageOrEvent.detail || "";
                    event = client.Event.create({
                      name: name2,
                      message
                    }, true, handledState, component, 1);
                    event.originalError = messageOrEvent;
                    event.addMetadata(component, {
                      event: messageOrEvent,
                      extraParameters: url2
                    });
                  } else {
                    event = client.Event.create(messageOrEvent, true, handledState, component, 1);
                    decorateStack(event.errors[0].stacktrace, url2, lineNo, charNo);
                  }
                  client._notify(event);
                }
                if (typeof prevOnError === "function") prevOnError.apply(this, arguments);
              }
              var prevOnError = win.onerror;
              win.onerror = onerror;
            }
          };
        };
        var decorateStack = function(stack, url2, lineNo, charNo) {
          if (!stack[0]) stack.push({});
          var culprit = stack[0];
          if (!culprit.file && typeof url2 === "string") culprit.file = url2;
          if (!culprit.lineNumber && isActualNumber(lineNo)) culprit.lineNumber = lineNo;
          if (!culprit.columnNumber) {
            if (isActualNumber(charNo)) {
              culprit.columnNumber = charNo;
            } else if (window.event && isActualNumber(window.event.errorCharacter)) {
              culprit.columnNumber = window.event.errorCharacter;
            }
          }
        };
        var isActualNumber = function(n) {
          return typeof n === "number" && String.call(n) !== "NaN";
        };
        ;
        ;
        var _listener;
        var _$unhandledRejection_53 = function(win) {
          if (win === void 0) {
            win = window;
          }
          var plugin = {
            load: function(client) {
              if (!client._config.autoDetectErrors || !client._config.enabledErrorTypes.unhandledRejections) return;
              var listener = function(evt) {
                var error = evt.reason;
                var isBluebird = false;
                try {
                  if (evt.detail && evt.detail.reason) {
                    error = evt.detail.reason;
                    isBluebird = true;
                  }
                } catch (e) {
                }
                var unhandled = !client._config.reportUnhandledPromiseRejectionsAsHandled;
                var event = client.Event.create(error, false, {
                  severity: "error",
                  unhandled,
                  severityReason: {
                    type: "unhandledPromiseRejection"
                  }
                }, "unhandledrejection handler", 1, client._logger);
                if (isBluebird) {
                  _$map_25(event.errors[0].stacktrace, fixBluebirdStacktrace(error));
                }
                client._notify(event, function(event2) {
                  if (_$iserror_29(event2.originalError) && !event2.originalError.stack) {
                    var _event$addMetadata;
                    event2.addMetadata("unhandledRejection handler", (_event$addMetadata = {}, _event$addMetadata[Object.prototype.toString.call(event2.originalError)] = {
                      name: event2.originalError.name,
                      message: event2.originalError.message,
                      code: event2.originalError.code
                    }, _event$addMetadata));
                  }
                });
              };
              if ("addEventListener" in win) {
                win.addEventListener("unhandledrejection", listener);
              } else {
                win.onunhandledrejection = function(reason, promise) {
                  listener({
                    detail: {
                      reason,
                      promise
                    }
                  });
                };
              }
              _listener = listener;
            }
          };
          if (false) {
            plugin.destroy = function(win2) {
              if (win2 === void 0) {
                win2 = window;
              }
              if (_listener) {
                if ("addEventListener" in win2) {
                  win2.removeEventListener("unhandledrejection", _listener);
                } else {
                  win2.onunhandledrejection = null;
                }
              }
              _listener = null;
            };
          }
          return plugin;
        };
        var fixBluebirdStacktrace = function(error) {
          return function(frame) {
            if (frame.file === error.toString()) return;
            if (frame.method) {
              frame.method = frame.method.replace(/^\s+/, "");
            }
          };
        };
        var _$notifier_11 = {};
        var name = "Bugsnag JavaScript";
        var version = "8.2.0";
        var url = "https://github.com/bugsnag/bugsnag-js";
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var __schema_11 = _$assign_20({}, _$config_14.schema, _$config_10);
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        ;
        var Bugsnag2 = {
          _client: null,
          createClient: function(opts) {
            if (typeof opts === "string") opts = {
              apiKey: opts
            };
            if (!opts) opts = {};
            var internalPlugins = [
              // add browser-specific plugins
              _$app_39,
              _$device_41(),
              _$context_40(),
              _$request_42(),
              _$throttle_50,
              _$session_43,
              _$clientIp_44,
              _$stripQueryString_51,
              _$onerror_52(),
              _$unhandledRejection_53(),
              _$navigationBreadcrumbs_48(),
              _$interactionBreadcrumbs_47(),
              _$networkBreadcrumbs_49(),
              _$consoleBreadcrumbs_45,
              // this one added last to avoid wrapping functionality before bugsnag uses it
              _$inlineScriptContent_46()
            ];
            var bugsnag = new _$Client_13(opts, __schema_11, internalPlugins, {
              name,
              version,
              url
            });
            bugsnag._setDelivery(window.XDomainRequest ? _$delivery_37 : _$delivery_38);
            bugsnag._logger.debug("Loaded!");
            bugsnag.leaveBreadcrumb("Bugsnag loaded", {}, "state");
            return bugsnag._config.autoTrackSessions ? bugsnag.startSession() : bugsnag;
          },
          start: function(opts) {
            if (Bugsnag2._client) {
              Bugsnag2._client._logger.warn("Bugsnag.start() was called more than once. Ignoring.");
              return Bugsnag2._client;
            }
            Bugsnag2._client = Bugsnag2.createClient(opts);
            return Bugsnag2._client;
          },
          isStarted: function() {
            return Bugsnag2._client != null;
          }
        };
        _$map_25(["resetEventCount"].concat(_$keys_24(_$Client_13.prototype)), function(m) {
          if (/^_/.test(m)) return;
          Bugsnag2[m] = function() {
            if (!Bugsnag2._client) return console.log("Bugsnag." + m + "() was called before Bugsnag.start()");
            Bugsnag2._client._depth += 1;
            var ret = Bugsnag2._client[m].apply(Bugsnag2._client, arguments);
            Bugsnag2._client._depth -= 1;
            return ret;
          };
        });
        _$notifier_11 = Bugsnag2;
        _$notifier_11.Client = _$Client_13;
        _$notifier_11.Event = _$Event_15;
        _$notifier_11.Session = _$Session_36;
        _$notifier_11.Breadcrumb = _$Breadcrumb_12;
        _$notifier_11["default"] = Bugsnag2;
        return _$notifier_11;
      });
    }
  });

  // node_modules/@bugsnag/js/browser/notifier.js
  var require_notifier = __commonJS({
    "node_modules/@bugsnag/js/browser/notifier.js"(exports, module) {
      module.exports = require_bugsnag();
    }
  });

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
        var Rails = context.Rails;
        (function() {
          (function() {
            var nonce;
            nonce = null;
            Rails.loadCSPNonce = function() {
              var ref;
              return nonce = (ref = document.querySelector("meta[name=csp-nonce]")) != null ? ref.content : void 0;
            };
            Rails.cspNonce = function() {
              return nonce != null ? nonce : Rails.loadCSPNonce();
            };
          }).call(this);
          (function() {
            var expando, m;
            m = Element.prototype.matches || Element.prototype.matchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector || Element.prototype.oMatchesSelector || Element.prototype.webkitMatchesSelector;
            Rails.matches = function(element, selector) {
              if (selector.exclude != null) {
                return m.call(element, selector.selector) && !m.call(element, selector.exclude);
              } else {
                return m.call(element, selector);
              }
            };
            expando = "_ujsData";
            Rails.getData = function(element, key) {
              var ref;
              return (ref = element[expando]) != null ? ref[key] : void 0;
            };
            Rails.setData = function(element, key, value) {
              if (element[expando] == null) {
                element[expando] = {};
              }
              return element[expando][key] = value;
            };
            Rails.$ = function(selector) {
              return Array.prototype.slice.call(document.querySelectorAll(selector));
            };
          }).call(this);
          (function() {
            var $, csrfParam, csrfToken;
            $ = Rails.$;
            csrfToken = Rails.csrfToken = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-token]");
              return meta && meta.content;
            };
            csrfParam = Rails.csrfParam = function() {
              var meta;
              meta = document.querySelector("meta[name=csrf-param]");
              return meta && meta.content;
            };
            Rails.CSRFProtection = function(xhr) {
              var token;
              token = csrfToken();
              if (token != null) {
                return xhr.setRequestHeader("X-CSRF-Token", token);
              }
            };
            Rails.refreshCSRFTokens = function() {
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
            var CustomEvent, fire, matches, preventDefault;
            matches = Rails.matches;
            CustomEvent = window.CustomEvent;
            if (typeof CustomEvent !== "function") {
              CustomEvent = function(event, params) {
                var evt;
                evt = document.createEvent("CustomEvent");
                evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
                return evt;
              };
              CustomEvent.prototype = window.Event.prototype;
              preventDefault = CustomEvent.prototype.preventDefault;
              CustomEvent.prototype.preventDefault = function() {
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
            fire = Rails.fire = function(obj, name, data) {
              var event;
              event = new CustomEvent(name, {
                bubbles: true,
                cancelable: true,
                detail: data
              });
              obj.dispatchEvent(event);
              return !event.defaultPrevented;
            };
            Rails.stopEverything = function(e) {
              fire(e.target, "ujs:everythingStopped");
              e.preventDefault();
              e.stopPropagation();
              return e.stopImmediatePropagation();
            };
            Rails.delegate = function(element, selector, eventType, handler) {
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
            cspNonce = Rails.cspNonce, CSRFProtection = Rails.CSRFProtection, fire = Rails.fire;
            AcceptHeaders = {
              "*": "*/*",
              text: "text/plain",
              html: "text/html",
              xml: "application/xml, text/xml",
              json: "application/json, text/javascript",
              script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            };
            Rails.ajax = function(options) {
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
            Rails.href = function(element) {
              return element.href;
            };
            Rails.isCrossDomain = function(url) {
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
            matches = Rails.matches;
            toArray = function(e) {
              return Array.prototype.slice.call(e);
            };
            Rails.serializeElement = function(element, additionalParam) {
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
            Rails.formElements = function(form, selector) {
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
            fire = Rails.fire, stopEverything = Rails.stopEverything;
            Rails.handleConfirm = function(e) {
              if (!allowAction(this)) {
                return stopEverything(e);
              }
            };
            Rails.confirm = function(message, element) {
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
                  answer = Rails.confirm(message, element);
                } catch (error) {
                }
                callback = fire(element, "confirm:complete", [answer]);
              }
              return answer && callback;
            };
          }).call(this);
          (function() {
            var disableFormElement, disableFormElements, disableLinkElement, enableFormElement, enableFormElements, enableLinkElement, formElements, getData, isXhrRedirect, matches, setData, stopEverything;
            matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, stopEverything = Rails.stopEverything, formElements = Rails.formElements;
            Rails.handleDisabledElement = function(e) {
              var element;
              element = this;
              if (element.disabled) {
                return stopEverything(e);
              }
            };
            Rails.enableElement = function(e) {
              var element;
              if (e instanceof Event) {
                if (isXhrRedirect(e)) {
                  return;
                }
                element = e.target;
              } else {
                element = e;
              }
              if (matches(element, Rails.linkDisableSelector)) {
                return enableLinkElement(element);
              } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formEnableSelector)) {
                return enableFormElement(element);
              } else if (matches(element, Rails.formSubmitSelector)) {
                return enableFormElements(element);
              }
            };
            Rails.disableElement = function(e) {
              var element;
              element = e instanceof Event ? e.target : e;
              if (matches(element, Rails.linkDisableSelector)) {
                return disableLinkElement(element);
              } else if (matches(element, Rails.buttonDisableSelector) || matches(element, Rails.formDisableSelector)) {
                return disableFormElement(element);
              } else if (matches(element, Rails.formSubmitSelector)) {
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
              return formElements(form, Rails.formDisableSelector).forEach(disableFormElement);
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
              return formElements(form, Rails.formEnableSelector).forEach(enableFormElement);
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
            stopEverything = Rails.stopEverything;
            Rails.handleMethod = function(e) {
              var csrfParam, csrfToken, form, formContent, href, link, method;
              link = this;
              method = link.getAttribute("data-method");
              if (!method) {
                return;
              }
              href = Rails.href(link);
              csrfToken = Rails.csrfToken();
              csrfParam = Rails.csrfParam();
              form = document.createElement("form");
              formContent = "<input name='_method' value='" + method + "' type='hidden' />";
              if (csrfParam != null && csrfToken != null && !Rails.isCrossDomain(href)) {
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
            matches = Rails.matches, getData = Rails.getData, setData = Rails.setData, fire = Rails.fire, stopEverything = Rails.stopEverything, ajax = Rails.ajax, isCrossDomain = Rails.isCrossDomain, serializeElement = Rails.serializeElement;
            isRemote = function(element) {
              var value;
              value = element.getAttribute("data-remote");
              return value != null && value !== "false";
            };
            Rails.handleRemote = function(e) {
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
              if (matches(element, Rails.formSubmitSelector)) {
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
              } else if (matches(element, Rails.buttonClickSelector) || matches(element, Rails.inputChangeSelector)) {
                method = element.getAttribute("data-method");
                url = element.getAttribute("data-url");
                data = serializeElement(element, element.getAttribute("data-params"));
              } else {
                method = element.getAttribute("data-method");
                url = Rails.href(element);
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
            Rails.formSubmitButtonClick = function(e) {
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
            Rails.preventInsignificantClick = function(e) {
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
            fire = Rails.fire, delegate = Rails.delegate, getData = Rails.getData, $ = Rails.$, refreshCSRFTokens = Rails.refreshCSRFTokens, CSRFProtection = Rails.CSRFProtection, loadCSPNonce = Rails.loadCSPNonce, enableElement = Rails.enableElement, disableElement = Rails.disableElement, handleDisabledElement = Rails.handleDisabledElement, handleConfirm = Rails.handleConfirm, preventInsignificantClick = Rails.preventInsignificantClick, handleRemote = Rails.handleRemote, formSubmitButtonClick = Rails.formSubmitButtonClick, handleMethod = Rails.handleMethod;
            if (typeof jQuery !== "undefined" && jQuery !== null && jQuery.ajax != null) {
              if (jQuery.rails) {
                throw new Error("If you load both jquery_ujs and rails-ujs, use rails-ujs only.");
              }
              jQuery.rails = Rails;
              jQuery.ajaxPrefilter(function(options, originalOptions, xhr) {
                if (!options.crossDomain) {
                  return CSRFProtection(xhr);
                }
              });
            }
            Rails.start = function() {
              if (window._rails_loaded) {
                throw new Error("rails-ujs has already been loaded!");
              }
              window.addEventListener("pageshow", function() {
                $(Rails.formEnableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
                return $(Rails.linkDisableSelector).forEach(function(el) {
                  if (getData(el, "ujs:disabled")) {
                    return enableElement(el);
                  }
                });
              });
              delegate(document, Rails.linkDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails.linkDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails.buttonDisableSelector, "ajax:complete", enableElement);
              delegate(document, Rails.buttonDisableSelector, "ajax:stopped", enableElement);
              delegate(document, Rails.linkClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails.linkClickSelector, "click", handleDisabledElement);
              delegate(document, Rails.linkClickSelector, "click", handleConfirm);
              delegate(document, Rails.linkClickSelector, "click", disableElement);
              delegate(document, Rails.linkClickSelector, "click", handleRemote);
              delegate(document, Rails.linkClickSelector, "click", handleMethod);
              delegate(document, Rails.buttonClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails.buttonClickSelector, "click", handleDisabledElement);
              delegate(document, Rails.buttonClickSelector, "click", handleConfirm);
              delegate(document, Rails.buttonClickSelector, "click", disableElement);
              delegate(document, Rails.buttonClickSelector, "click", handleRemote);
              delegate(document, Rails.inputChangeSelector, "change", handleDisabledElement);
              delegate(document, Rails.inputChangeSelector, "change", handleConfirm);
              delegate(document, Rails.inputChangeSelector, "change", handleRemote);
              delegate(document, Rails.formSubmitSelector, "submit", handleDisabledElement);
              delegate(document, Rails.formSubmitSelector, "submit", handleConfirm);
              delegate(document, Rails.formSubmitSelector, "submit", handleRemote);
              delegate(document, Rails.formSubmitSelector, "submit", function(e) {
                return setTimeout(function() {
                  return disableElement(e);
                }, 13);
              });
              delegate(document, Rails.formSubmitSelector, "ajax:send", disableElement);
              delegate(document, Rails.formSubmitSelector, "ajax:complete", enableElement);
              delegate(document, Rails.formInputClickSelector, "click", preventInsignificantClick);
              delegate(document, Rails.formInputClickSelector, "click", handleDisabledElement);
              delegate(document, Rails.formInputClickSelector, "click", handleConfirm);
              delegate(document, Rails.formInputClickSelector, "click", formSubmitButtonClick);
              document.addEventListener("DOMContentLoaded", refreshCSRFTokens);
              document.addEventListener("DOMContentLoaded", loadCSPNonce);
              return window._rails_loaded = true;
            };
            if (window.Rails === Rails && fire(document, "rails:attachBindings")) {
              Rails.start();
            }
          }).call(this);
        }).call(this);
        if (typeof module === "object" && module.exports) {
          module.exports = Rails;
        } else if (typeof define === "function" && define.amd) {
          define(Rails);
        }
      }).call(exports);
    }
  });

  // src/scripts/packs/configure.js
  var import_js = __toESM(require_notifier());
  require_rails_ujs().start();
  window.StoreConnect = window.StoreConnect || {};
  window.StoreConnect.configure = function(ENV) {
    if (ENV.BUGSNAG_KEY) {
      window.bugsnagClient = import_js.default;
      import_js.default.start({
        apiKey: ENV.BUGSNAG_KEY,
        appVersion: ENV.STORE_CONNECT_VERSION,
        notifyReleaseStages: ["production", "staging"],
        releaseStage: ENV.BUGSNAG_RELEASE_STAGE,
        appType: "client",
        plugins: []
      });
    } else {
      throw new Error("Failed to configure Bugsnag, missing BUGSNAG_KEY");
    }
  };
})();
//# sourceMappingURL=configure.3XVPSVIK.js.map
