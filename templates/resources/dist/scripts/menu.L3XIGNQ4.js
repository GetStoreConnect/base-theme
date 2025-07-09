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

  // node_modules/hoverintent/dist/hoverintent.min.js
  var require_hoverintent_min = __commonJS({
    "node_modules/hoverintent/dist/hoverintent.min.js"(exports, module) {
      !function(e, t) {
        if ("function" == typeof define && define.amd) define("hoverintent", ["module"], t);
        else if ("undefined" != typeof exports) t(module);
        else {
          var n = { exports: {} };
          t(n), e.hoverintent = n.exports;
        }
      }(exports, function(e) {
        "use strict";
        var t = Object.assign || function(e2) {
          for (var t2 = 1; t2 < arguments.length; t2++) {
            var n = arguments[t2];
            for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (e2[o] = n[o]);
          }
          return e2;
        };
        e.exports = function(e2, n, o) {
          function i(e3, t2) {
            return y && (y = clearTimeout(y)), b = 0, p ? void 0 : o.call(e3, t2);
          }
          function r(e3) {
            m = e3.clientX, d = e3.clientY;
          }
          function u(e3, t2) {
            if (y && (y = clearTimeout(y)), Math.abs(h - m) + Math.abs(E - d) < x.sensitivity) return b = 1, p ? void 0 : n.call(e3, t2);
            h = m, E = d, y = setTimeout(function() {
              u(e3, t2);
            }, x.interval);
          }
          function s(t2) {
            return L = true, y && (y = clearTimeout(y)), e2.removeEventListener("mousemove", r, false), 1 !== b && (h = t2.clientX, E = t2.clientY, e2.addEventListener("mousemove", r, false), y = setTimeout(function() {
              u(e2, t2);
            }, x.interval)), this;
          }
          function c(t2) {
            return L = false, y && (y = clearTimeout(y)), e2.removeEventListener("mousemove", r, false), 1 === b && (y = setTimeout(function() {
              i(e2, t2);
            }, x.timeout)), this;
          }
          function v(t2) {
            L || (p = true, n.call(e2, t2));
          }
          function a(t2) {
            !L && p && (p = false, o.call(e2, t2));
          }
          function f() {
            e2.addEventListener("focus", v, false), e2.addEventListener("blur", a, false);
          }
          function l() {
            e2.removeEventListener("focus", v, false), e2.removeEventListener("blur", a, false);
          }
          var m, d, h, E, L = false, p = false, T = {}, b = 0, y = 0, x = { sensitivity: 7, interval: 100, timeout: 0, handleFocus: false };
          return T.options = function(e3) {
            var n2 = e3.handleFocus !== x.handleFocus;
            return x = t({}, x, e3), n2 && (x.handleFocus ? f() : l()), T;
          }, T.remove = function() {
            e2 && (e2.removeEventListener("mouseover", s, false), e2.removeEventListener("mouseout", c, false), l());
          }, e2 && (e2.addEventListener("mouseover", s, false), e2.addEventListener("mouseout", c, false)), T;
        };
      });
    }
  });

  // src/scripts/packs/menu.js
  var import_hoverintent = __toESM(require_hoverintent_min());

  // src/scripts/theme/viewport.js
  var BREAKPOINTS = [
    { id: 0, name: "base" },
    { id: 1, name: "small" },
    { id: 2, name: "medium" },
    { id: 3, name: "large" },
    { id: 4, name: "xlarge" },
    { id: 5, name: "huge" }
  ];
  var largeAndUp = () => returnBreakpoint() > 2;
  function returnBreakpoint() {
    let breakpoint;
    if (document.querySelector("[data-breakpoint]") === null) {
      createBreakpointElements();
    }
    for (var i = 0; i < BREAKPOINTS.length; i++) {
      const elem = document.querySelector(`[data-breakpoint="${BREAKPOINTS[i].id}"]`);
      if (elem && isVisible(elem)) {
        breakpoint = BREAKPOINTS[i];
        break;
      }
    }
    return breakpoint.id;
  }
  function createBreakpointElements() {
    BREAKPOINTS.map((breakpoint) => {
      const elem = document.createElement("div");
      elem.setAttribute("data-breakpoint", breakpoint.id);
      document.querySelector("body").append(elem);
    });
  }
  function isVisible(element) {
    return window.getComputedStyle(element).display !== "none";
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

  // src/scripts/packs/menu.js
  onDomChange(init);
  function init(node) {
    const triggers = [...node.querySelectorAll("[data-menu-init]")];
    const backBtns = [...node.querySelectorAll("[data-menu-x]")];
    backBtns.map((btn) => btn.addEventListener("click", close));
    if (largeAndUp()) {
      triggers.map((trigger) => {
        (0, import_hoverintent.default)(trigger.closest("li"), show, hide);
      });
    } else {
      triggers.map((trigger) => {
        trigger.addEventListener("click", open);
      });
    }
  }
  function show(event) {
    const group = event.target.closest("li");
    const menu = group.querySelector("[data-menu]");
    if (menu) {
      group.classList.add("is-active");
      menu.classList.add("is-active");
    }
  }
  function hide(event) {
    const group = event.target.closest("li");
    const menu = group.querySelector("[data-menu]");
    if (menu) {
      group.classList.remove("is-active");
      menu.classList.remove("is-active");
    }
  }
  function open(event) {
    const menuId = event.target.getAttribute("data-menu-init");
    const menu = document.querySelector(`[data-menu="${menuId}"]`);
    if (menu) {
      event.preventDefault();
      menu.classList.add("is-active");
      document.querySelector("body").style.overflow = "hidden";
    }
  }
  function close(event) {
    const body = document.querySelector("body");
    const menu = event.target.closest("[data-menu]");
    const isRoot = menu.classList.contains("tier1");
    menu.classList.remove("is-active");
    if (isRoot) body.style.overflow = "visible";
  }
})();
//# sourceMappingURL=menu.L3XIGNQ4.js.map
