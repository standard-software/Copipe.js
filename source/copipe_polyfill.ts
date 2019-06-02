/**
 * copipe.js
 *  file: copipe_console.js
 */

import copipe_console = require('./copipe_console');

namespace copipe {
  /**
   * ルート公開されている名前空間の展開
   */
  export const { VERSION, type, syntax, string, test, consoleHook } = copipe_console;
  export const {
    isUndefined, isNull,
    isBoolean, isNumber, isInteger, isString,
    isFunction, isObject, isArray, isDate,
    isRegExp, isException,

    isNotUndefined, isNotNull,
    isNotBoolean, isNotNumber,isNotInteger, isNotString,
    isNotFunction, isNotObject, isNotArray, isNotDate,
    isNotRegExp, isNotException,

    isUndefinedArray, isNullArray,
    isBooleanArray, isNumberArray, isIntegerArray, isStringArray,
    isFunctionArray, isObjectArray, isArrayArray, isDateArray,
    isRegExpArray, isExceptionArray,

    isNotUndefinedArray, isNotNullArray,
    isNotBooleanArray, isNotNumberArray, isNotIntegerArray, isNotStringArray,
    isNotFunctionArray, isNotObjectArray, isNotArrayArray, isNotDateArray,
    isNotRegExpArray, isNotExceptionArray,

    isUndef, isBool, isNum, isInt, isStr,
    isFunc, isObj, isExcept,

    isNotUndef, isNotBool, isNotNum, isNotInt, isNotStr,
    isNotFunc, isNotObj, isNotExcept,
  } = type;
  export const {
    assert, guard,
    functionValue, sc, equal, or, if_, switch_,
    isThrown, isThrownValue, isThrownException, isNotThrown,
  } = syntax;
  export const {
    checkEqual,
  } = test;

  export const polyfillDefine = () => {
    // console.info('polyfill String.prototype.includes');

    if (!String.prototype.includes) {
      String.prototype.includes = function(search, start) {
        'use strict';
        if (typeof start !== 'number') {
          start = 0;
        }

        if (start + search.length > this.length) {
          return false;
        } else {
          return this.indexOf(search, start) !== -1;
        }
      };
    }

    if (!Array.prototype.some) {
      Array.prototype.some = function(fun, thisArg) {
        'use strict';

        if (this == null) {
          throw new TypeError('Array.prototype.some called on null or undefined');
        }

        if (typeof fun !== 'function') {
          throw new TypeError();
        }

        var t = Object(this);
        var len = t.length >>> 0;

        var thisArg = arguments.length >= 2 ? arguments[1] : void 0;
        for (var i = 0; i < len; i++) {
          if (i in t && fun.call(thisArg, t[i], i, t)) {
            return true;
          }
        }

        return false;
      };
    }

    // https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/map
    if (!Array.prototype.map) {
      Array.prototype.map = function(callback/*, thisArg*/) {
        var T, A, k;
        if (this == null) {
          throw new TypeError('this is null or not defined');
        }
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
          throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
          T = arguments[1];
        }
        A = new Array(len);
        k = 0;
        while (k < len) {
          var kValue, mappedValue;
          if (k in O) {
            kValue = O[k];
            mappedValue = callback.call(T, kValue, k, O);
            A[k] = mappedValue;
          }
          k++;
        }
        return A;
      };
    }
  };

  polyfillDefine();

}
export = copipe;


