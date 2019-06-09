"use strict";
/**
 * copipe.js
 *  file: copipe_core.ts
 */
var copipe;
(function (copipe) {
    copipe.VERSION = '1.2.1 beta';
})(copipe || (copipe = {}));
(function (copipe) {
    /**
     * 単独引数の場合の型判定関数
     *  assert などの防御はなし。
     */
    var type;
    (function (type) {
        type.objectToString = function (value) {
            return Object.prototype.toString.call(value);
        };
    })(type = copipe.type || (copipe.type = {}));
    var _type;
    (function (_type) {
        var objectToString = type.objectToString;
        var _primitiveTypeCheckFunc = function (typeName) {
            return (function (value) { return typeof value === typeName; });
        };
        var _objectTypeCheckFunc = function (typeName) {
            return (function (value) { return objectToString(value) === "[object " + typeName + "]"; });
        };
        _type._isUndefined = _primitiveTypeCheckFunc('undefined');
        _type._isNull = function (value) { return (value === null); };
        _type._isNaNStrict = function (value) { return value !== value; };
        _type._isBoolean = _primitiveTypeCheckFunc('boolean');
        _type._isNumber = function (value) {
            return (_primitiveTypeCheckFunc('number')(value) && (isFinite(value)));
        };
        _type._isInteger = function (value) {
            if (!_type._isNumber(value)) {
                return false;
            }
            return Math.round(value) === value;
        };
        _type._isString = _primitiveTypeCheckFunc('string');
        _type._isFunction = _primitiveTypeCheckFunc('function');
        _type._isObject = function (value) {
            if ((_objectTypeCheckFunc('Object')(value))
                && (_type._isNotNull(value))
                && (_type._isNotUndefined(value))) {
                return true;
            }
            return false;
        };
        _type._isArray = _objectTypeCheckFunc('Array');
        _type._isDate = _objectTypeCheckFunc('Date');
        _type._isRegExp = _objectTypeCheckFunc('RegExp');
        _type._isError = _objectTypeCheckFunc('Error');
        /**
         * 例外オブジェクト判定
         *  Errorオブジェクトを含む例外(Exception)オブジェクトは
         *  name と message プロパティの有無によって判定する
         *
         *  Errorオブジェクトの判定は下記のように実装することが可能
         *  export const _isError = _objectTypeCheckFunc('Error');
         *  だが
         *  Errorオブジェクトを継承して
         *  独自エラーオブジェクトを作成する方法は記載が難しいために利用しずらい
         *  なので、単に name と message プロパティを持つオブジェクトかどうかの判定で
         *  機能として十分になる
         *
         *  参考：独自例外(Exception)オブジェクト作成方法
         *    https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/throw
         */
        _type._isException = function (value) {
            if (_type._isObject(value)) {
                if ('name' in value) {
                    if ('message' in value) {
                        return true;
                    }
                }
            }
            else if (_type._isError(value)) {
                return true;
            }
            return false;
        };
        /**
         * 単独引数の場合の型判定関数の否定形
         */
        _type._isNotUndefined = function (value) { return !_type._isUndefined(value); };
        _type._isNotNull = function (value) { return !_type._isNull(value); };
        _type._isNotNaNStrict = function (value) { return !_type._isNaNStrict(value); };
        _type._isNotBoolean = function (value) { return !_type._isBoolean(value); };
        _type._isNotNumber = function (value) { return !_type._isNumber(value); };
        _type._isNotInteger = function (value) { return !_type._isInteger(value); };
        _type._isNotString = function (value) { return !_type._isString(value); };
        _type._isNotFunction = function (value) { return !_type._isFunction(value); };
        _type._isNotObject = function (value) { return !_type._isObject(value); };
        _type._isNotArray = function (value) { return !_type._isArray(value); };
        _type._isNotDate = function (value) { return !_type._isDate(value); };
        _type._isNotRegExp = function (value) { return !_type._isRegExp(value); };
        _type._isNotException = function (value) { return !_type._isException(value); };
    })(_type || (_type = {}));
    /**
     * 文法拡張
     * 型判定関数で使うための assert を記載する
     */
    /**
     * 契約プログラミングで使用する assert
     *  assert(boolean, message) の形式で記載。
     *  boolean に false が入ると assert=宣言する ことが false になるので
     *  例外を発生して停止させるものとして使う。
     */
    var syntax;
    (function (syntax) {
        var _isBoolean = _type._isBoolean, _isString = _type._isString;
        syntax.assert = function (value, message) {
            if (message === void 0) { message = ''; }
            if (!_isBoolean(value)) {
                throw new TypeError('assert args1(value) type is not boolean. message:' + message);
            }
            if (!_isString(message)) {
                throw new TypeError('assert args2(message) type is not string. message:' + message);
            }
            if (!value) {
                throw new Error('assert error. message:' + message);
            }
        };
        /**
         * assert を発展させた guard 節 として使用する。
         *  guard の構文に従っていない場合は SyntaxError が出るようにしている
         *  TypeError と迷ったが、guard で守られている場合は TypeError を投げるべきで
         *  guard 構文の記載ミスの場合なので SyntaxError としている
         */
        var guard_status = true;
        var guard_message;
        syntax.guard = function (guardFunc, runFunc) {
            guard_message = '';
            if (guard_status === false) {
                return false;
            }
            if (!copipe.isFunction(guardFunc)) {
                throw new SyntaxError('guard args1(guardFunc) type is not function.');
            }
            var result = guardFunc();
            if (!copipe.isArray(result)) {
                throw new SyntaxError('guard args1(guardFunc) result type is not array.');
            }
            for (var i = 0; i < result.length; i += 1) {
                // 配列の [a,b,] の最終カンマ対策
                if ((i === result.length - 1) && copipe.isUndefined(result[i])) {
                    continue;
                }
                var resultValue = void 0;
                var message = '';
                if (copipe.isArray(result[i])) {
                    if (!(1 <= result[i].length)) {
                        throw new SyntaxError('guard args1(guardFunc) result item is not array.length >= 1.');
                    }
                    resultValue = result[i][0];
                    if (2 <= result[i].length) {
                        message = result[i][1];
                    }
                }
                else {
                    resultValue = result[i];
                }
                resultValue = syntax.functionValue(resultValue);
                if (!copipe.isBoolean(resultValue)) {
                    throw new SyntaxError('guard args1(guardFunc) result item value type is not boolean.');
                }
                if (resultValue === false) {
                    guard_message = message;
                    if (!copipe.isUndefined(runFunc)) {
                        if (!copipe.isFunction(runFunc)) {
                            throw new SyntaxError('guard args2(runFunc) type is not function');
                        }
                        runFunc();
                    }
                    return true;
                }
            }
            return false;
        };
        syntax.guard.message = function () { return guard_message; };
        syntax.guard.status = function (value) {
            return guard_status = value;
        };
        syntax.guard.on = function () {
            guard_status = true;
        };
        syntax.guard.off = function () {
            guard_status = false;
        };
    })(syntax = copipe.syntax || (copipe.syntax = {}));
    /**
     * 複数引数や関数引数の場合の型判定関数
     */
    (function (type) {
        var assert = syntax.assert;
        var _isUndefined = _type._isUndefined, _isNull = _type._isNull, _isNaNStrict = _type._isNaNStrict, _isBoolean = _type._isBoolean, _isNumber = _type._isNumber, _isInteger = _type._isInteger, _isString = _type._isString, _isFunction = _type._isFunction, _isObject = _type._isObject, _isArray = _type._isArray, _isDate = _type._isDate, _isRegExp = _type._isRegExp, _isException = _type._isException, _isNotUndefined = _type._isNotUndefined, _isNotNull = _type._isNotNull, _isNotNaNStrict = _type._isNotNaNStrict, _isNotBoolean = _type._isNotBoolean, _isNotNumber = _type._isNotNumber, _isNotInteger = _type._isNotInteger, _isNotString = _type._isNotString, _isNotFunction = _type._isNotFunction, _isNotObject = _type._isNotObject, _isNotArray = _type._isNotArray, _isNotDate = _type._isNotDate, _isNotRegExp = _type._isNotRegExp, _isNotException = _type._isNotException;
        var _isTypeCheck = function (checkFunc, argsArray) {
            assert(_isFunction(checkFunc));
            assert(_isArray(argsArray));
            var l = argsArray.length;
            if (l === 0) {
                return false;
            }
            else if (l === 1) {
                return checkFunc(argsArray[0]);
            }
            else {
                for (var i = 0; i < l; i += 1) {
                    if (!checkFunc(argsArray[i])) {
                        return false;
                    }
                }
                return true;
            }
        };
        var _isTypeCheckArgsFunc = function (checkFunc) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                return _isTypeCheck(checkFunc, args);
            };
        };
        var _isTypeCheckArrayFunc = function (checkFunc) {
            return function (value) { return _isTypeCheck(checkFunc, value); };
        };
        type.isUndefined = _isTypeCheckArgsFunc(_isUndefined);
        type.isNull = _isTypeCheckArgsFunc(_isNull);
        type.isNaNStrict = _isTypeCheckArgsFunc(_isNaNStrict);
        type.isBoolean = _isTypeCheckArgsFunc(_isBoolean);
        type.isNumber = _isTypeCheckArgsFunc(_isNumber);
        type.isInteger = _isTypeCheckArgsFunc(_isInteger);
        type.isString = _isTypeCheckArgsFunc(_isString);
        type.isFunction = _isTypeCheckArgsFunc(_isFunction);
        type.isObject = _isTypeCheckArgsFunc(_isObject);
        type.isArray = _isTypeCheckArgsFunc(_isArray);
        type.isDate = _isTypeCheckArgsFunc(_isDate);
        type.isRegExp = _isTypeCheckArgsFunc(_isRegExp);
        type.isException = _isTypeCheckArgsFunc(_isException);
        type.isNotUndefined = _isTypeCheckArgsFunc(_isNotUndefined);
        type.isNotNull = _isTypeCheckArgsFunc(_isNotNull);
        type.isNotNaNStrict = _isTypeCheckArgsFunc(_isNotNaNStrict);
        type.isNotBoolean = _isTypeCheckArgsFunc(_isNotBoolean);
        type.isNotNumber = _isTypeCheckArgsFunc(_isNotNumber);
        type.isNotInteger = _isTypeCheckArgsFunc(_isNotInteger);
        type.isNotString = _isTypeCheckArgsFunc(_isNotString);
        type.isNotFunction = _isTypeCheckArgsFunc(_isNotFunction);
        type.isNotObject = _isTypeCheckArgsFunc(_isNotObject);
        type.isNotArray = _isTypeCheckArgsFunc(_isNotArray);
        type.isNotDate = _isTypeCheckArgsFunc(_isNotDate);
        type.isNotRegExp = _isTypeCheckArgsFunc(_isNotRegExp);
        type.isNotException = _isTypeCheckArgsFunc(_isNotException);
        type.isUndefinedArray = _isTypeCheckArrayFunc(_isUndefined);
        type.isNullArray = _isTypeCheckArrayFunc(_isNull);
        type.isNaNStrictArray = _isTypeCheckArrayFunc(_isNaNStrict);
        type.isBooleanArray = _isTypeCheckArrayFunc(_isBoolean);
        type.isNumberArray = _isTypeCheckArrayFunc(_isNumber);
        type.isIntegerArray = _isTypeCheckArrayFunc(_isInteger);
        type.isStringArray = _isTypeCheckArrayFunc(_isString);
        type.isFunctionArray = _isTypeCheckArrayFunc(_isFunction);
        type.isObjectArray = _isTypeCheckArrayFunc(_isObject);
        type.isArrayArray = _isTypeCheckArrayFunc(_isArray);
        type.isDateArray = _isTypeCheckArrayFunc(_isDate);
        type.isRegExpArray = _isTypeCheckArrayFunc(_isRegExp);
        type.isExceptionArray = _isTypeCheckArrayFunc(_isException);
        type.isNotUndefinedArray = _isTypeCheckArrayFunc(_isNotUndefined);
        type.isNotNullArray = _isTypeCheckArrayFunc(_isNotNull);
        type.isNotNaNStrictArray = _isTypeCheckArrayFunc(_isNotNaNStrict);
        type.isNotBooleanArray = _isTypeCheckArrayFunc(_isNotBoolean);
        type.isNotNumberArray = _isTypeCheckArrayFunc(_isNotNumber);
        type.isNotIntegerArray = _isTypeCheckArrayFunc(_isNotInteger);
        type.isNotStringArray = _isTypeCheckArrayFunc(_isNotString);
        type.isNotFunctionArray = _isTypeCheckArrayFunc(_isNotFunction);
        type.isNotObjectArray = _isTypeCheckArrayFunc(_isNotObject);
        type.isNotArrayArray = _isTypeCheckArrayFunc(_isNotArray);
        type.isNotDateArray = _isTypeCheckArrayFunc(_isNotDate);
        type.isNotRegExpArray = _isTypeCheckArrayFunc(_isNotRegExp);
        type.isNotExceptionArray = _isTypeCheckArrayFunc(_isNotException);
    })(type = copipe.type || (copipe.type = {}));
})(copipe || (copipe = {}));
/**
 * 型判定関数の省略形
 */
(function (copipe) {
    var type;
    (function (type) {
        type.isUndef = type.isUndefined;
        type.isBool = type.isBoolean;
        type.isNum = type.isNumber;
        type.isInt = type.isInteger;
        type.isStr = type.isString;
        type.isFunc = type.isFunction;
        type.isObj = type.isObject;
        type.isExcept = type.isException;
        type.isNotUndef = type.isNotUndefined;
        type.isNotBool = type.isNotBoolean;
        type.isNotNum = type.isNotNumber;
        type.isNotInt = type.isNotInteger;
        type.isNotStr = type.isNotString;
        type.isNotFunc = type.isNotFunction;
        type.isNotObj = type.isNotObject;
        type.isNotExcept = type.isNotException;
    })(type = copipe.type || (copipe.type = {}));
})(copipe || (copipe = {}));
/**
 * 文法拡張
 */
(function (copipe) {
    var syntax;
    (function (syntax) {
        /**
         * 例外や値が投げられたかどうかを判定する関数
         *  テストコードに使うためのもの
         * compareFunc undefined の場合
         *  なにか例外が投げられていれば true を返す
         * copareFunc 関数の場合
         *  何が投げられたのかを取得するために
         *  compareFunc の引数として投げられた値が渡されるので
         *  そこで判定する
         */
        syntax.isThrown = function (targetFunc, compareFunc) {
            syntax.guard(function () { return [
                [
                    copipe.isFunction(targetFunc),
                    'isThrown args(targetFunc) type is not function.'
                ],
                [
                    copipe.isFunction(compareFunc) || copipe.isUndefined(compareFunc),
                    'isThrown args(compareFunc) type is not function or undefined.'
                ]
            ]; }, function () {
                throw new SyntaxError(syntax.guard.message());
            });
            try {
                targetFunc();
            }
            catch (e) {
                if (copipe.isUndefined(compareFunc)) {
                    return true;
                }
                return compareFunc(e);
            }
            return false;
        };
        /**
         * 値が投げられたかどうか判定する関数
         */
        syntax.isThrownValue = function (targetFunc, thrownValue) {
            return syntax.isThrown(targetFunc, function (thrown) {
                return thrown === thrownValue;
            });
        };
        /**
         * 例外が投げられたかどうか判定する関数
         */
        syntax.isThrownException = function (targetFunc, exceptionName) {
            if (!(copipe.isUndefined(exceptionName) || copipe.isString(exceptionName))) {
                throw new SyntaxError('isThrownException args2(exceptionName) type is not string.');
            }
            return syntax.isThrown(targetFunc, function (thrown) {
                if (copipe.isException(thrown)) {
                    if (copipe.isUndefined(exceptionName)) {
                        return true;
                    }
                    return thrown.name === exceptionName;
                }
                return false;
            });
        };
        /**
         * 例外や値が投げられていないことを判定する関数
         */
        syntax.isNotThrown = function (targetFunc) {
            return !syntax.isThrown(targetFunc, function () { return true; });
        };
        /**
         * 非関数の場合はそのままの値、関数の場合は実行結果を返す関数
         */
        syntax.functionValue = function (value) {
            if (copipe.isFunction(value)) {
                return value();
            }
            else {
                return value;
            }
        };
        /**
         * 二番目の引数を比較関数として利用して結果を返す関数
         *  sc は second call の略
         */
        syntax.sc = function (argsFirst, 
        // func: (args1: any, ...args: any) => any,
        func) {
            var argsRest = [];
            for (var _i = 2; _i < arguments.length; _i++) {
                argsRest[_i - 2] = arguments[_i];
            }
            return func.apply(void 0, [argsFirst].concat(argsRest));
        };
        /**
         * ifを値を返す関数にしたもの。
         *  次の形式で記載する
         *  if_(true)({
         *   then: ()=>valueA,
         *   else: ()=>valueB
         *  })
         *  condition に指定されたBoolean値によって
         *  処理を分岐して値を返す。
         *
         *  thenとelse には関数でも値でも設定可能
         *  関数の場合は、条件に合致しない場合は実行されない。
         *
         *  then else どちらも含まないオブジェクトを指定すると
         *  例外を発生する
         */
        syntax.if_ = function (condition) {
            if (!copipe.isBoolean(condition)) {
                throw new TypeError('if_ args(condition) type is not boolean.');
            }
            var checkSyntax = function (args) {
                if (!copipe.isObject(args)) {
                    throw new SyntaxError('if_() args type is not object.');
                }
                if (copipe.isUndefined(args.then) && copipe.isUndefined(args["else"])) {
                    throw new SyntaxError('if_() args .then .else both nothing.');
                }
            };
            if (condition) {
                return function (args) {
                    checkSyntax(args);
                    return syntax.functionValue(args.then);
                };
            }
            else {
                return function (args) {
                    checkSyntax(args);
                    return syntax.functionValue(args["else"]);
                };
            }
        };
        /**
         * switch を値を返す関数にしたもの
         *  次の形式で記載する
         *  switch_(value)([
         *   [1, valueA],
         *   [2, valueB],
         *   ['1', valueC],
         *   [valueD],
         *  ]);
         *  数値と文字列の厳密な比較が可能。
         *
         *  valueDはデフォルト値を返す
         *  デフォルト値に undefined を返す場合は
         *  [undefined] もしくは [] と記載すること
         *
         *  valueA-D の部分には関数でも値でも設定可能
         *  関数の場合は、条件に合致しない場合は実行されない。
         *
         *  switch_(value1)(args) argsの部分に配列内配列以外の値を渡すと
         *  例外を発生する
         */
        syntax.switch_ = function (expression) {
            return function (args) {
                if (!copipe.isArray(args)) {
                    throw new SyntaxError('switch_() args type is not array.');
                }
                for (var i = 0; i < args.length; i += 1) {
                    // 配列の [a,b,] の最終カンマ対策
                    if ((i === args.length - 1) && copipe.isUndefined(args[i])) {
                        continue;
                    }
                    if (!copipe.isArray(args[i])) {
                        throw new SyntaxError('switch_() args type is not array in array.');
                    }
                }
                for (var i = 0; i < args.length; i += 1) {
                    // 配列の [a,b,] の最終カンマ対策
                    if ((i === args.length - 1) && copipe.isUndefined(args[i])) {
                        continue;
                    }
                    if (args[i].length === 0) {
                        return undefined;
                    }
                    if (args[i].length === 1) {
                        return syntax.functionValue(args[i][0]);
                    }
                    if (args[i][0] === expression) {
                        return syntax.functionValue(args[i][1]);
                    }
                }
                return undefined;
            };
        };
    })(syntax = copipe.syntax || (copipe.syntax = {}));
})(copipe || (copipe = {}));
/**
 * 比較処理
 */
(function (copipe) {
    var compare;
    (function (compare) {
        /**
         * 比較する関数
         */
        compare.equal = function (valueA, valueB) {
            return valueA === valueB;
        };
        /**
         * 配列内に value と一致する値があるかどうかを判定する関数
         */
        compare.or = function (value, compareArray) {
            copipe.assert(copipe.isArray(compareArray));
            for (var i = 0; i < compareArray.length; i += 1) {
                if (value === compareArray[i]) {
                    return true;
                }
            }
            return false;
        };
        /**
         * 値が他の値と一致しているかどうかを調べる関数(内部)
         */
        compare._match = function (matchFunc, value, compareArray) {
            copipe.guard(function () { return [
                [
                    copipe.isArray(compareArray),
                    '_match args2(compareArray) type is not Array.'
                ],
            ]; }, function () {
                throw new TypeError(copipe.guard.message());
            });
            if (copipe.isString(value)) {
                return compareArray.some(function (element) {
                    var result;
                    if (copipe.isRegExp(element)) {
                        result = value.match(element) !== null;
                    }
                    else if (copipe.isFunction(element)) {
                        result = element(value);
                    }
                    else {
                        result = matchFunc(value, element);
                        // 文字列と数値の場合などでも判定できるように
                        // matchFunc に処理を渡す
                    }
                    if (!copipe.isBoolean(result)) {
                        throw new SyntaxError('_match args2(compareArray) Array element result is not Boolean.');
                    }
                    return result;
                });
            }
            else {
                return compareArray.some(function (element) {
                    var result;
                    if (copipe.isFunction(element)) {
                        result = element(value);
                    }
                    else {
                        result = matchFunc(value, element);
                    }
                    if (!copipe.isBoolean(result)) {
                        throw new SyntaxError('_match args2(compareArray) Array element result is not Boolean.');
                    }
                    return result;
                });
            }
        };
        /**
         * 値が他の値と一致しているかどうかを調べる関数
         * パラメータ渡し(名前付き引数)への対応
         */
        compare.match = function (value, compareArray) {
            var matchFunc = function (a, b) { return a === b; };
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, compareArray: compareArray }
            });
            return compare._match(matchFunc, parameter.value, parameter.compareArray);
        };
        /**
         * 値が一致していた場合にデフォルト値を返す関数
         */
        compare._matchValue = function (value, compareArray, inMatchValue) {
            var matchFunc = function (a, b) { return a === b; };
            if (compare._match(matchFunc, value, compareArray)) {
                return inMatchValue;
            }
            return value;
        };
        /**
         * 値が一致していた場合にデフォルト値を返す関数
         * パラメータ渡し(名前付き引数)への対応
         */
        compare.matchValue = function (value, compareArray, inMatchValue) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, compareArray: compareArray, inMatchValue: inMatchValue }
            });
            return compare._matchValue(parameter.value, parameter.compareArray, parameter.inMatchValue);
        };
        compare.matchTo = compare.matchValue;
        /**
         * null か undefined の場合にデフォルト値を返す関数
         * パラメータ渡し(名前付き引数)への対応
         */
        compare.defaultValue = function (value, inMatchValue) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, inMatchValue: inMatchValue }
            });
            return compare._matchValue(parameter.value, [copipe.isUndefined, copipe.isNull], parameter.inMatchValue);
        };
        compare.defaultTo = compare.defaultValue;
    })(compare = copipe.compare || (copipe.compare = {}));
})(copipe || (copipe = {}));
/**
 * 変換処理
 */
(function (copipe) {
    var convert;
    (function (convert) {
        /**
         * 数値を文字列に変換する
         */
        convert._numberToString = function (value, radix) {
            radix = copipe.defaultTo(radix, 10);
            copipe.guard(function () { return [
                [copipe.isNumber(value), 'args1(value) is not number.'],
                [copipe.isInteger(radix), 'args2(radix) is not number.'],
                [(2 <= radix && radix <= 36), 'args2(radix) is not in 2..36.'],
            ]; }, function () {
                throw new TypeError('numberToString ' + copipe.guard.message());
            });
            return value.toString(radix);
        };
        convert.numberToString = function (value, radix) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, radix: radix }
            });
            return convert._numberToString(parameter.value, parameter.radix);
        };
        convert.numToString = convert.numberToString;
        convert.numToStr = convert.numberToString;
        /**
         * 文字列を数値に変換する
         *  変換できない場合は defaultValue で指定された値を返す
         *  進数指定はできない
         */
        convert._stringToNumber = function (value, defaultValue) {
            copipe.guard(function () { return [
                [copipe.isString(value), 'args1(value) is not string.'],
            ]; }, function () {
                throw new TypeError('stringToNumber ' + copipe.guard.message());
            });
            if (!copipe.string.matchFormat('float', value)) {
                return defaultValue;
            }
            return copipe.matchValue(Number(value), [copipe.isNotNumber], defaultValue);
        };
        convert.stringToNumber = function (value, defaultValue) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, defaultValue: defaultValue }
            });
            return convert._stringToNumber(parameter.value, parameter.defaultValue);
        };
        convert.strToNumber = convert.stringToNumber;
        convert.strToNum = convert.stringToNumber;
        /**
         * 文字列を整数に変換する
         *  変換できない場合は defaultValue で指定された値を返す
         *  進数指定可能
         */
        convert._stringToInteger = function (value, defaultValue, radix) {
            radix = copipe.defaultTo(radix, 10);
            copipe.guard(function () { return [
                [copipe.isString(value), 'args1(value) is not string.'],
                [copipe.isInteger(radix), 'args2(radix) is not number.'],
                [(2 <= radix && radix <= 36), 'args2(radix) is not in 2..36.'],
            ]; }, function () {
                throw new TypeError('stringToInteger ' + copipe.guard.message());
            });
            if (!copipe.string.matchFormat(String(radix) + '_base_number', value)) {
                return defaultValue;
            }
            return copipe.matchValue(parseInt(value, radix), [copipe.isNotInteger], defaultValue);
        };
        convert.stringToInteger = function (value, defaultValue, radix) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, radix: radix, defaultValue: defaultValue }
            });
            return convert._stringToInteger(parameter.value, parameter.defaultValue, parameter.radix);
        };
        convert.strToInteger = convert.stringToInteger;
        convert.strToInt = convert.stringToInteger;
    })(convert = copipe.convert || (copipe.convert = {}));
})(copipe || (copipe = {}));
/**
 * 文字列処理
 */
(function (copipe) {
    var string;
    (function (string) {
        /**
         * 文字列を他の文字列か正規表現で含むかどうかを調べる関数
         */
        string._includes = function (value, compareArray) {
            var compareFunc = function (a, b) { return a.includes(b); };
            var _match = copipe.compare._match;
            if (copipe.isObject(value)) {
                return _match(compareFunc, value.value, value.compareArray);
            }
            else {
                return _match(compareFunc, value, compareArray);
            }
        };
        string.includes = function (value, compareArray) {
            var parameter = copipe.if_(copipe.isObject(value))({
                then: value,
                "else": { value: value, compareArray: compareArray }
            });
            return string._includes(parameter.value, parameter.compareArray);
        };
        /**
         * フォーマットに一致しているかどうかを判定する関数
         */
        string._matchFormat = function (formatName, value) {
            copipe.guard(function () { return [
                [copipe.isString(value), 'args1(value) is not string.'],
                [copipe.isString(formatName), 'args2(formatName) is not string.'],
            ]; }, function () {
                throw new TypeError('matchFormat ' + copipe.guard.message());
            });
            switch (formatName) {
                case 'zenkaku':
                    // 全角文字
                    return (value.match(/^[^\x01-\x7E\xA1-\xDF]+$/)) ? true : false;
                case 'hiragana':
                    // 全角ひらがな
                    return (value.match(/^[\u3041-\u3096]+$/)) ? true : false;
                case 'katakana':
                    // 全角カタカナ
                    return (value.match(/^[\u30a1-\u30f6]+$/)) ? true : false;
                case 'alphabet-number':
                    // 半角英数字（大文字・小文字）
                    return (value.match(/^[0-9a-zA-Z]+$/)) ? true : false;
                case 'number':
                    // 半角数字
                    return (value.match(/^[0-9]+$/)) ? true : false;
                case 'alphabet':
                    // 半角英字（大文字・小文字）
                    return (value.match(/^[a-zA-Z]+$/)) ? true : false;
                case 'upper_alphabet':
                    // 半角英字（大文字のみ）
                    return (value.match(/^[A-Z]+$/)) ? true : false;
                case 'lower_alphabet':
                    // 半角英字（小文字のみ）
                    return (value.match(/^[a-z]+$/)) ? true : false;
                case 'integer':
                    // 整数値
                    return (value.match(/^[+|-]?[0-9]+$/)) ? true : false;
                case 'float_only':
                    // 小数
                    return (value.match(/^[-|+]?[0-9]*\.[0-9]+$/)) ? true : false;
                case 'float':
                    // 整数か小数
                    return (value.match(/^[-|+]?[0-9]*\.[0-9]+$|^[+|-]?[0-9]+$/)) ? true : false;
                // 各進数
                case '2_base_number':
                case 'binary': // 2進数
                    return (value.match(/^[-|+]?[01]+$/)) ? true : false;
                case '3_base_number':
                    return (value.match(/^[-|+]?[0-2]+$/)) ? true : false;
                case '4_base_number':
                    return (value.match(/^[-|+]?[0-3]+$/)) ? true : false;
                case '5_base_number':
                    return (value.match(/^[-|+]?[0-4]+$/)) ? true : false;
                case '6_base_number':
                    return (value.match(/^[-|+]?[0-5]+$/)) ? true : false;
                case '7_base_number':
                    return (value.match(/^[-|+]?[0-6]+$/)) ? true : false;
                case '8_base_number':
                case 'octal': // 8進数
                    return (value.match(/^[-|+]?[0-7]+$/)) ? true : false;
                case '9_base_number':
                    return (value.match(/^[-|+]?[0-8]+$/)) ? true : false;
                case '10_base_number':
                    return (value.match(/^[-|+]?[0-9]+$/)) ? true : false;
                case '11_base_number':
                    return (value.match(/^[-|+]?[0-9A]+$|^[-|+]?[0-9a]+$/)) ? true : false;
                case '12_base_number':
                    return (value.match(/^[-|+]?[0-9AB]+$|^[-|+]?[0-9ab]+$/)) ? true : false;
                case '13_base_number':
                    return (value.match(/^[-|+]?[0-9A-C]+$|^[-|+]?[0-9a-c]+$/)) ? true : false;
                case '14_base_number':
                    return (value.match(/^[-|+]?[0-9A-D]+$|^[-|+]?[0-9a-d]+$/)) ? true : false;
                case '15_base_number':
                    return (value.match(/^[-|+]?[0-9A-E]+$|^[-|+]?[0-9a-e]+$/)) ? true : false;
                case '16_base_number':
                case 'hex': // 16進数
                    return (value.match(/^[-|+]?[0-9A-F]+$|^[-|+]?[0-9a-f]+$/)) ? true : false;
                case 'date':
                    // y/m/d
                    return (value.match(/^\d{1,4}\/\d{1,2}\/\d{1,2}$/)) ? true : false;
                case 'date-minutes':
                    // y/m/d h:n
                    return (value.match(/^\d{1,4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}$/)) ? true : false;
                case 'date-seconds':
                    // y/m/d h:n:s
                    return (value.match(/^\d{1,4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}$/))
                        ? true : false;
                case 'date-milliseconds':
                    // y/m/d h:n:s.ms
                    return (value.match(/^\d{1,4}\/\d{1,2}\/\d{1,2}\s\d{1,2}:\d{1,2}:\d{1,2}\.\d{1,3}$/))
                        ? true : false;
                default:
                    throw new Error("matchFormat args2(formatName) is not exists format. " + formatName);
            }
        };
        string.matchFormat = function (formatName, value) {
            var parameter = copipe.if_(copipe.isObject(formatName))({
                then: formatName,
                "else": { formatName: formatName, value: value }
            });
            return string._matchFormat(parameter.formatName, parameter.value);
        };
    })(string = copipe.string || (copipe.string = {}));
})(copipe || (copipe = {}));
/**
 * テスト
 */
(function (copipe) {
    var test;
    (function (test) {
        /**
         * a, b の2つの引数が一致するかどうかを判定する関数
         *  テストコードに使うためのもの
         */
        test.checkEqual = function (a, b, message) {
            if (message === void 0) { message = ''; }
            if (!copipe.isString(message)) {
                throw new SyntaxError('checkEqual args(message) type is not string.');
            }
            if (copipe.isNaNStrict(a, b)) {
                return true;
            }
            if (a === b) {
                return true;
            }
            message = "Test: " + message + "\n" +
                'A !== B\n' +
                ("A = " + String(a) + "\n") +
                ("B = " + String(b));
            console.log(message);
            return false;
        };
    })(test = copipe.test || (copipe.test = {}));
})(copipe || (copipe = {}));
/**
 * 名前空間ルートの公開
 */
(function (copipe) {
    var _a, _b, _c, _d;
    /**
     * 型判定
     */
    _a = copipe.type, copipe.isUndefined = _a.isUndefined, copipe.isNull = _a.isNull, copipe.isNaNStrict = _a.isNaNStrict, copipe.isBoolean = _a.isBoolean, copipe.isNumber = _a.isNumber, copipe.isInteger = _a.isInteger, copipe.isString = _a.isString, copipe.isFunction = _a.isFunction, copipe.isObject = _a.isObject, copipe.isArray = _a.isArray, copipe.isDate = _a.isDate, copipe.isRegExp = _a.isRegExp, copipe.isException = _a.isException, copipe.isNotUndefined = _a.isNotUndefined, copipe.isNotNull = _a.isNotNull, copipe.isNotBoolean = _a.isNotBoolean, copipe.isNotNumber = _a.isNotNumber, copipe.isNotInteger = _a.isNotInteger, copipe.isNotString = _a.isNotString, copipe.isNotFunction = _a.isNotFunction, copipe.isNotObject = _a.isNotObject, copipe.isNotArray = _a.isNotArray, copipe.isNotDate = _a.isNotDate, copipe.isNotRegExp = _a.isNotRegExp, copipe.isNotException = _a.isNotException, copipe.isUndefinedArray = _a.isUndefinedArray, copipe.isNullArray = _a.isNullArray, copipe.isBooleanArray = _a.isBooleanArray, copipe.isNumberArray = _a.isNumberArray, copipe.isIntegerArray = _a.isIntegerArray, copipe.isStringArray = _a.isStringArray, copipe.isFunctionArray = _a.isFunctionArray, copipe.isObjectArray = _a.isObjectArray, copipe.isArrayArray = _a.isArrayArray, copipe.isDateArray = _a.isDateArray, copipe.isRegExpArray = _a.isRegExpArray, copipe.isExceptionArray = _a.isExceptionArray, copipe.isNotUndefinedArray = _a.isNotUndefinedArray, copipe.isNotNullArray = _a.isNotNullArray, copipe.isNotBooleanArray = _a.isNotBooleanArray, copipe.isNotNumberArray = _a.isNotNumberArray, copipe.isNotIntegerArray = _a.isNotIntegerArray, copipe.isNotStringArray = _a.isNotStringArray, copipe.isNotFunctionArray = _a.isNotFunctionArray, copipe.isNotObjectArray = _a.isNotObjectArray, copipe.isNotArrayArray = _a.isNotArrayArray, copipe.isNotDateArray = _a.isNotDateArray, copipe.isNotRegExpArray = _a.isNotRegExpArray, copipe.isNotExceptionArray = _a.isNotExceptionArray, copipe.isUndef = _a.isUndef, copipe.isBool = _a.isBool, copipe.isNum = _a.isNum, copipe.isInt = _a.isInt, copipe.isStr = _a.isStr, copipe.isFunc = _a.isFunc, copipe.isObj = _a.isObj, copipe.isExcept = _a.isExcept, copipe.isNotUndef = _a.isNotUndef, copipe.isNotBool = _a.isNotBool, copipe.isNotNum = _a.isNotNum, copipe.isNotInt = _a.isNotInt, copipe.isNotStr = _a.isNotStr, copipe.isNotFunc = _a.isNotFunc, copipe.isNotObj = _a.isNotObj, copipe.isNotExcept = _a.isNotExcept;
    /**
     * 文法拡張
     */
    _b = copipe.syntax, copipe.assert = _b.assert, copipe.guard = _b.guard, copipe.functionValue = _b.functionValue, copipe.sc = _b.sc, copipe.if_ = _b.if_, copipe.switch_ = _b.switch_, copipe.isThrown = _b.isThrown, copipe.isThrownValue = _b.isThrownValue, copipe.isThrownException = _b.isThrownException, copipe.isNotThrown = _b.isNotThrown;
    /**
     * 比較
     */
    _c = copipe.compare, copipe.equal = _c.equal, copipe.or = _c.or, copipe.match = _c.match, copipe.matchValue = _c.matchValue, copipe.matchTo = _c.matchTo, copipe.defaultValue = _c.defaultValue, copipe.defaultTo = _c.defaultTo;
    /**
     * 変換
     */
    _d = copipe.convert, copipe.numberToString = _d.numberToString, copipe.numToString = _d.numToString, copipe.numToStr = _d.numToStr, copipe.stringToNumber = _d.stringToNumber, copipe.strToNumber = _d.strToNumber, copipe.strToNum = _d.strToNum, copipe.stringToInteger = _d.stringToInteger, copipe.strToInteger = _d.strToInteger, copipe.strToInt = _d.strToInt;
    /**
     * 文字列
     */
    // export const {
    // } = copipe.string;
    /**
     * テスト
     */
    // export const {
    // } = copipe.test;
})(copipe || (copipe = {}));
module.exports = copipe;
