(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["SfnCookie"] = factory();
	else
		root["SfnCookie"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading wasm modules
/******/ 	var installedWasmModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// object with all compiled WebAssembly.Modules
/******/ 	__webpack_require__.w = {};
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
class Cookie {
    constructor(input, value = null, options = null) {
        if (typeof input === "string") {
            if (value === null) {
                Object.assign(this, parse(input));
            }
            else {
                Object.assign(this, { name: input, value }, options);
            }
        }
        else {
            Object.assign(this, input);
        }
    }
    /** Gets the serialized cookie string of the current instance. */
    toString() {
        return serialize(this);
    }
}
exports.Cookie = Cookie;
/** Serializes an object or Cookie instance to a valid cookie string. */
function serialize(data) {
    let { name, value, maxAge, expires, sameSite, domain, path, httpOnly, secure } = data;
    if (!name)
        return "";
    let str = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (maxAge)
        str += "; Max-Age=" + maxAge;
    if (expires) {
        let err = "Expires must be a valid date string or timestamp, or a Date instance.";
        if (expires instanceof Date) {
            expires = expires.toUTCString();
        }
        else if (typeof expires == "number" || typeof expires == "string") {
            try {
                expires = new Date(expires).toUTCString();
            }
            catch (e) {
                throw new TypeError(err);
            }
        }
        else {
            throw new TypeError(err);
        }
        str += "; Expires=" + expires;
    }
    if (sameSite)
        str += "; SameSite=" + sameSite;
    if (domain)
        str += "; Domain=" + domain;
    if (path)
        str += "; Path=" + path;
    if (httpOnly)
        str += "; HttpOnly";
    if (secure)
        str += "; Secure";
    return str;
}
exports.serialize = serialize;
/** Parses a cookie string to a Cookie instance. */
function parse(cookieStr) {
    if (!cookieStr || typeof cookieStr !== "string")
        return null;
    let pairs = cookieStr.split(/\s*;\s*/), data = { name: undefined, value: undefined };
    for (let i in pairs) {
        let pair = pairs[i].split("=");
        if (i == "0") {
            data.name = decodeURIComponent(pair[0]);
            data.value = decodeURIComponent(pair[1]);
        }
        else {
            let key = pair[0] == "Max-Age"
                ? "maxAge"
                : pair[0][0].toLowerCase() + pair[0].slice(1);
            if (!isNaN(pair[1])) {
                data[key] = parseInt(pair[1]);
            }
            else if (pair[1] === undefined) {
                data[key] = true;
            }
            else {
                data[key] = pair[1];
            }
        }
    }
    return new Cookie(data);
}
exports.parse = parse;
/**
 * Parses a string as multiple cookies, useful for parsing
 * `document.cookie` and `req.headers.cookie`.
 */
function parseMany(str) {
    if (!str || typeof str !== "string")
        return [];
    let pairs = str.split(/\s*;\s*/), cookies = [];
    for (let pair of pairs) {
        cookies.push(new Cookie(pair));
    }
    return cookies;
}
exports.parseMany = parseMany;
exports.default = Cookie;


/***/ })

/******/ });
});
//# sourceMappingURL=cookie.js.map