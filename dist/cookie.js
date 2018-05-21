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

/***/ "./node_modules/object-assign/index.js":
/*!*********************************************!*\
  !*** ./node_modules/object-assign/index.js ***!
  \*********************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/*
object-assign
(c) Sindre Sorhus
@license MIT
*/


/* eslint-disable no-unused-vars */
var getOwnPropertySymbols = Object.getOwnPropertySymbols;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var propIsEnumerable = Object.prototype.propertyIsEnumerable;

function toObject(val) {
	if (val === null || val === undefined) {
		throw new TypeError('Object.assign cannot be called with null or undefined');
	}

	return Object(val);
}

function shouldUseNative() {
	try {
		if (!Object.assign) {
			return false;
		}

		// Detect buggy property enumeration order in older V8 versions.

		// https://bugs.chromium.org/p/v8/issues/detail?id=4118
		var test1 = new String('abc');  // eslint-disable-line no-new-wrappers
		test1[5] = 'de';
		if (Object.getOwnPropertyNames(test1)[0] === '5') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test2 = {};
		for (var i = 0; i < 10; i++) {
			test2['_' + String.fromCharCode(i)] = i;
		}
		var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
			return test2[n];
		});
		if (order2.join('') !== '0123456789') {
			return false;
		}

		// https://bugs.chromium.org/p/v8/issues/detail?id=3056
		var test3 = {};
		'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
			test3[letter] = letter;
		});
		if (Object.keys(Object.assign({}, test3)).join('') !==
				'abcdefghijklmnopqrst') {
			return false;
		}

		return true;
	} catch (err) {
		// We don't expect any of the above to throw, but better to be safe.
		return false;
	}
}

module.exports = shouldUseNative() ? Object.assign : function (target, source) {
	var from;
	var to = toObject(target);
	var symbols;

	for (var s = 1; s < arguments.length; s++) {
		from = Object(arguments[s]);

		for (var key in from) {
			if (hasOwnProperty.call(from, key)) {
				to[key] = from[key];
			}
		}

		if (getOwnPropertySymbols) {
			symbols = getOwnPropertySymbols(from);
			for (var i = 0; i < symbols.length; i++) {
				if (propIsEnumerable.call(from, symbols[i])) {
					to[symbols[i]] = from[symbols[i]];
				}
			}
		}
	}

	return to;
};


/***/ }),

/***/ "./src/index.ts":
/*!**********************!*\
  !*** ./src/index.ts ***!
  \**********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var assign = __webpack_require__(/*! object-assign */ "./node_modules/object-assign/index.js");
var Cookie = /** @class */ (function () {
    function Cookie(input, value, options) {
        if (value === void 0) { value = null; }
        if (options === void 0) { options = null; }
        if (typeof input === "string") {
            if (value === null) {
                assign(this, parse(input));
            }
            else {
                assign(this, { name: input, value: value }, options);
            }
        }
        else {
            assign(this, input);
        }
    }
    /** Gets the serialized cookie string of the current instance. */
    Cookie.prototype.toString = function () {
        return serialize(this);
    };
    return Cookie;
}());
exports.Cookie = Cookie;
/** Serializes an object or Cookie instance to a valid cookie string. */
function serialize(data) {
    var name = data.name, value = data.value, maxAge = data.maxAge, expires = data.expires, sameSite = data.sameSite, domain = data.domain, path = data.path, httpOnly = data.httpOnly, secure = data.secure;
    if (!name)
        return "";
    var str = encodeURIComponent(name) + "=" + encodeURIComponent(value);
    if (maxAge)
        str += "; Max-Age=" + maxAge;
    if (expires) {
        var err = "Expires must be a valid date string or timestamp, or a Date instance.";
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
    var pairs = cookieStr.split(/\s*;\s*/), data = { name: undefined, value: undefined };
    for (var i in pairs) {
        var pair = pairs[i].split("=");
        if (i == "0") {
            data.name = decodeURIComponent(pair[0]);
            data.value = decodeURIComponent(pair[1]);
        }
        else {
            var key = pair[0] == "Max-Age"
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
    var pairs = str.split(/\s*;\s*/), cookies = [];
    for (var _i = 0, pairs_1 = pairs; _i < pairs_1.length; _i++) {
        var pair = pairs_1[_i];
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