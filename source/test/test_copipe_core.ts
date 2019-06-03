/**
 * copipe.js
 *  file: test_copipe_core.ts
 */

namespace test_copipe_core {

  /**
   * 各関数を変数として宣言
   */
  let
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

    assert, guard,
    functionValue, sc, equal, or, if_, switch_,
    isThrown, isThrownValue, isThrownException, isNotThrown,

    match,

    checkEqual;

  /**
   * 初期化として関数変数を代入する
   */
  const initialize = function (copipe) {
    ({
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

      assert, guard,
      functionValue, sc, equal, or, if_, switch_,
      isThrown, isThrownValue, isThrownException, isNotThrown,

    } = copipe);

    ({ match } = copipe.string);

    ({ checkEqual } = copipe.test);
  };

  namespace type {

    export const test_isUndefined = function () {
      var u1: undefined;
      var n1: null = null;
      var v1 = 1;

      checkEqual(true, isUndefined(u1));
      checkEqual(false, isUndefined(n1));
      checkEqual(false, isUndefined(v1));
      checkEqual(true, isUndefinedArray([u1]));
      checkEqual(false, isUndefinedArray([n1]));
      checkEqual(false, isUndefinedArray([v1]));

      checkEqual(true, isUndefined(u1, u1));
      checkEqual(false, isUndefined(u1, n1));
      checkEqual(false, isUndefined(u1, v1));
      checkEqual(true, isUndefinedArray([u1, u1]));
      checkEqual(false, isUndefinedArray([u1, n1]));
      checkEqual(false, isUndefinedArray([u1, v1]));

      checkEqual(false, isNotUndefined(u1));
      checkEqual(true, isNotUndefined(n1));
      checkEqual(true, isNotUndefined(v1));
      checkEqual(false, isNotUndefinedArray([u1]));
      checkEqual(true, isNotUndefinedArray([n1]));
      checkEqual(true, isNotUndefinedArray([v1]));

      checkEqual(false, isNotUndefined(u1, u1));
      checkEqual(false, isNotUndefined(u1, n1));
      checkEqual(true, isNotUndefined(n1, n1));
      checkEqual(false, isNotUndefined(n1, u1));
      checkEqual(true, isNotUndefined(v1, v1));
      checkEqual(true, isNotUndefined(v1, n1));
      checkEqual(false, isNotUndefined(v1, u1));
      checkEqual(false, isNotUndefinedArray([u1, u1]));
      checkEqual(false, isNotUndefinedArray([u1, n1]));
      checkEqual(true, isNotUndefinedArray([n1, n1]));
      checkEqual(false, isNotUndefinedArray([n1, u1]));
      checkEqual(true, isNotUndefinedArray([v1, v1]));
      checkEqual(true, isNotUndefinedArray([v1, n1]));
      checkEqual(false, isNotUndefinedArray([v1, u1]));

      //配列の中身ではなく配列自体を判定する
      //配列はundefinedではない
      checkEqual(false, isUndefined([v1, v1]));
      checkEqual(false, isUndefined([u1, u1]));
      checkEqual(true, isNotUndefined([v1, v1]));
      checkEqual(true, isNotUndefined([u1, u1]));
    };

    export const test_isNull = function () {
      var u1: undefined;
      var n1: null = null;
      var v1 = 1;

      checkEqual(false, isNull(u1));
      checkEqual(true, isNull(n1));
      checkEqual(false, isNull(v1));
      checkEqual(false, isNullArray([u1]));
      checkEqual(true, isNullArray([n1]));
      checkEqual(false, isNullArray([v1]));

      checkEqual(true, isNull(n1, n1));
      checkEqual(false, isNull(n1, u1));
      checkEqual(false, isNull(n1, v1));
      checkEqual(true, isNullArray([n1, n1]));
      checkEqual(false, isNullArray([n1, u1]));
      checkEqual(false, isNullArray([n1, v1]));

      checkEqual(true, isNotNull(u1));
      checkEqual(false, isNotNull(n1));
      checkEqual(true, isNotNull(v1));
      checkEqual(true, isNotNullArray([u1]));
      checkEqual(false, isNotNullArray([n1]));
      checkEqual(true, isNotNullArray([v1]));

      checkEqual(true, isNotNull(u1, u1));
      checkEqual(false, isNotNull(u1, n1));
      checkEqual(false, isNotNull(n1, n1));
      checkEqual(false, isNotNull(n1, u1));
      checkEqual(true, isNotNull(v1, v1));
      checkEqual(false, isNotNull(v1, n1));
      checkEqual(true, isNotNull(v1, u1));
      checkEqual(true, isNotNullArray([u1, u1]));
      checkEqual(false, isNotNullArray([u1, n1]));
      checkEqual(false, isNotNullArray([n1, n1]));
      checkEqual(false, isNotNullArray([n1, u1]));
      checkEqual(true, isNotNullArray([v1, v1]));
      checkEqual(false, isNotNullArray([v1, n1]));
      checkEqual(true, isNotNullArray([v1, u1]));
    };

    export const test_isBoolean = function () {
      checkEqual(true, isBoolean(true));
      checkEqual(true, isBoolean(false));
      checkEqual(false, isBoolean(undefined));
      checkEqual(false, isBoolean(null));
      checkEqual(false, isBoolean(''));
      checkEqual(false, isBoolean('true'));
      checkEqual(false, isBoolean('false'));
      checkEqual(false, isBoolean(123));
      checkEqual(false, isBoolean(0));
      checkEqual(false, isBoolean(-1));

      checkEqual(true, isBoolean(true, true));
      checkEqual(true, isBoolean(true, true, true));
      checkEqual(true, isBoolean(true, false, true));
      checkEqual(false, isBoolean(true, 1, true));

      checkEqual(false, isBoolean([true, true]));

      checkEqual(true, isBooleanArray([true, true]));
      checkEqual(true, isBooleanArray([true, true, true]));
      checkEqual(true, isBooleanArray([true, false, true]));
      checkEqual(false, isBooleanArray([true, 1, true]));
    };

    export const test_isNumber = function () {
      checkEqual(true, isNumber(123));
      checkEqual(true, isNumber(0));
      checkEqual(true, isNumber(-1));
      checkEqual(true, isNumber(123.4));
      checkEqual(true, isNumber(123.0));
      checkEqual(false, isNumber(true));
      checkEqual(false, isNumber(false));
      checkEqual(false, isNumber(null));
      checkEqual(false, isNumber(undefined));
      checkEqual(false, isNumber(Infinity));  //InfinityもNumberとして許可しないことにする
      checkEqual(false, isNumber(NaN));
      checkEqual(false, isNumber(''));
      checkEqual(false, isNumber('ABC'));
      checkEqual(false, isNumber('ABC10'));
      checkEqual(false, isNumber('10ABC'));
      checkEqual(false, isNumber('0ABC'));
      checkEqual(false, isNumber('0'));
      checkEqual(false, isNumber('5'));
      checkEqual(false, isNumber('-5'));
      checkEqual(false, isNumber('100'));
      checkEqual(false, isNumber('-100'));
      checkEqual(false, isNumber([]));
      checkEqual(false, isNumber({}));

      checkEqual(false, isNotNumber(123));
      checkEqual(false, isNotNumber(0));
      checkEqual(true, isNotNumber(true));
      checkEqual(true, isNotNumber(null));
      checkEqual(true, isNotNumber(undefined));
      checkEqual(true, isNotNumber(Infinity));
      checkEqual(true, isNotNumber(NaN));
      checkEqual(true, isNotNumber(''));

      checkEqual(true, isNumber(1, 2));
      checkEqual(true, isNumber(3, 4, 5));
      checkEqual(true, isNumber(10.5, 20.5, 30.5));
      checkEqual(false, isNumber(1, 2, true));

      checkEqual(false, isNotNumber(1, 2));
      checkEqual(false, isNotNumber(3, 4, 5));
      checkEqual(false, isNotNumber(10.5, 20.5, 30.5));
      checkEqual(false, isNotNumber(1, 2, true));
      checkEqual(true, isNotNumber(false, true));
      checkEqual(true, isNotNumber('a', 'b'));

      checkEqual(false, isNumber([1, 2]));

      checkEqual(true, isNumberArray([1, 2]));
      checkEqual(true, isNumberArray([3, 4, 5]));
      checkEqual(true, isNumberArray([10.5, 20.5, 30.5]));
      checkEqual(false, isNumberArray([1, 2, true]));

      checkEqual(false, isNotNumberArray([1, 2]));
      checkEqual(false, isNotNumberArray([3, 4, 5]));
      checkEqual(false, isNotNumberArray([10.5, 20.5, 30.5]));
      checkEqual(false, isNotNumberArray([1, 2, true]));
      checkEqual(true, isNotNumberArray([false, true]));
      checkEqual(true, isNotNumberArray(['a', 'b']));
    };

    export const test_isInteger = function () {
      checkEqual(true, isInteger(123));
      checkEqual(true, isInteger(0));
      checkEqual(true, isInteger(-1));
      checkEqual(false, isInteger(123.4));
      checkEqual(true, isInteger(123.0));
      //.0の場合は整数か小数かは判断できない

      checkEqual(false, isInteger(true));
      checkEqual(false, isInteger(false));
      checkEqual(false, isInteger(null));
      checkEqual(false, isInteger(undefined));
      checkEqual(false, isInteger(''));
      checkEqual(false, isInteger('ABC'));
      checkEqual(false, isInteger('0'));
      checkEqual(false, isInteger('5'));
      checkEqual(false, isInteger('-5'));
      checkEqual(false, isInteger('100'));
      checkEqual(false, isInteger('-100'));
      checkEqual(false, isInteger([]));
      checkEqual(false, isInteger({}));

      checkEqual(true, isInteger(1, 2));
      checkEqual(true, isInteger(3, 4, 5));
      checkEqual(true, isInteger(10, 20, 30));
      checkEqual(false, isInteger(1, 2, 3.5));

      checkEqual(false, isNotInteger(1, 2));
      checkEqual(false, isNotInteger(3, 4, 5));
      checkEqual(false, isNotInteger(10, 20, 30));
      checkEqual(false, isNotInteger(1, 2, 3.5));
      checkEqual(false, isNotInteger(1, 2.1, 3.5));
      checkEqual(true, isNotInteger(1.1, 2.2, 3.5));

      checkEqual(false, isIntegerArray([]));
      checkEqual(true, isIntegerArray([1]));
      checkEqual(true, isIntegerArray([1, 2, 3]));
      checkEqual(true, isIntegerArray([1, 2, 0]));
      checkEqual(false, isIntegerArray([1, 2, NaN]));
      checkEqual(false, isIntegerArray([1, 2, null]));
      checkEqual(false, isIntegerArray(['a', 'b', 1]));
    };

    export const test_isString = function () {
      checkEqual(true, isString(''));
      checkEqual(true, isString('a'));
      checkEqual(true, isString('a', 'b', 'c'));
      checkEqual(true, isString('a', 'b', ''));
      checkEqual(false, isString('a', 'b', 0));
      checkEqual(false, isString('a', 'b', 1));
      checkEqual(false, isString('a', 'b', null));
      checkEqual(false, isString('a', 'b', undefined));

      checkEqual(false, isStringArray([]));
      checkEqual(true, isStringArray(['']));
      checkEqual(true, isStringArray(['a']));
      checkEqual(true, isStringArray(['a', 'b', 'c']));
      checkEqual(true, isStringArray(['a', 'b', '']));
      checkEqual(false, isStringArray(['a', 'b', 0]));
      checkEqual(false, isStringArray(['a', 'b', 1]));
      checkEqual(false, isStringArray(['a', 'b', null]));
      checkEqual(false, isStringArray(['a', 'b', undefined]));
    };

    export const test_isFunction = function () {

      checkEqual(true, isFunction(function () { }));
      checkEqual(false, isFunction({}));

      checkEqual(true, isFunction(function () { }, test_isFunction));
      checkEqual(false, isFunction({}, test_isFunction));

      checkEqual(true, isFunctionArray(
        [function () { }, test_isFunction]));
      checkEqual(false, isFunctionArray(
        [{}, test_isFunction]));

    };

    export const test_isObject = function () {
      checkEqual(true, isObject({}));
      checkEqual(false, isObject([]));
      checkEqual(false, isObject(null));
      checkEqual(false, isObject(undefined));

      checkEqual(true, isObject({}));
      checkEqual(true, isObject({ a: 0 }));
      checkEqual(true, isObject({ a: 0, b: 1 }));
      checkEqual(true, isObjectArray([{}, { a: 0, b: 1 }]));
      checkEqual(false, isObjectArray([[], { a: 0, b: 1 }]));
      checkEqual(false, isObjectArray([[{}], { a: 0, b: 1 }]));

      checkEqual(true, isObject({ a: 0, b: 1 }, { c: 0, d: 1 }));

      checkEqual(false, isObject([]));
      checkEqual(false, isObject(null));
      checkEqual(false, isObject(undefined));
      checkEqual(false, isObject(function () { }));
    };

    export const test_isArray = function () {
      checkEqual(true, isArray([123]));
      checkEqual(true, isArray([]));
      checkEqual(true, isArray([1, 2, 3]));
      checkEqual(false, isArray(123));
      checkEqual(false, isArray('1,2,3'));

      checkEqual(true, isArray([1], [2]));
      checkEqual(true, isArray([3], [4], [5]));
      checkEqual(true, isArray([10, 20], [30]));
      checkEqual(false, isArray([1, 2], 3));

      checkEqual(true, isNotArray(1, 2));
      checkEqual(false, isNotArray([3], [4], 5));
      checkEqual(true, isNotArray(10, 20, 30));
      checkEqual(false, isNotArray(10, 20, [30]));


      checkEqual(true, isArrayArray([[1], [2]]));
      checkEqual(true, isArrayArray([[3], [4], [5]]));
      checkEqual(true, isArrayArray([[10, 20], [30]]));
      checkEqual(false, isArrayArray([[1, 2], 3]));

      checkEqual(true, isNotArrayArray([1, 2]));
      checkEqual(false, isNotArrayArray([[3], [4], 5]));
      checkEqual(true, isNotArrayArray([10, 20, 30]));
      checkEqual(false, isNotArrayArray([10, 20, [30]]));
    };

    export const test_isDate = function () {
      checkEqual(true, isDate(new Date(2017, 1, 1)));
      checkEqual(true, isDate(new Date('2017/01')));
      checkEqual(true, isDate(new Date(2017, 1)));
      checkEqual(true, isDate(new Date(2017, 1)));
    };

    export const test_isExcection = function () {
      checkEqual(true, isException({ name: '', message: '' }));
      checkEqual(false, isException({ name: '' }));
      checkEqual(false, isException({ message: '' }));

      checkEqual(true, isException(new Error()));
      checkEqual(true, isException(new TypeError()));
      checkEqual(true, isException(new SyntaxError()));
      checkEqual(true, isException(new ReferenceError()));

      class UserException {
        public message: string;
        public name: string;
        public constructor(message: string) {
          this.message = message;
          this.name = 'UserException';
        }
      }
      checkEqual(true, isException(new UserException('message')));
    };

  }

  namespace syntax {

    export const test_or = function () {
      var value: any;
      checkEqual(false, or(value, []));
      checkEqual(false, or(value, [null]));
      checkEqual(false, or(value, [null, null]));
      checkEqual(false, or(value, [null, 0]));
      checkEqual(false, or(value, [0, '']));
      checkEqual(true, or(value, [undefined]));
      checkEqual(true, or(value, [undefined, null]));
      checkEqual(true, or(value, [null, undefined]));
      checkEqual(true, or(value, [undefined, undefined]));
      checkEqual(true, or(value, [undefined, 0]));
      value = null;
      checkEqual(false, or(value, []));
      checkEqual(false, or(value, [undefined]));
      checkEqual(false, or(value, [undefined, undefined]));
      checkEqual(false, or(value, [undefined, 0]));
      checkEqual(false, or(value, [0, '']));
      checkEqual(true, or(value, [null]));
      checkEqual(true, or(value, [null, undefined]));
      checkEqual(true, or(value, [undefined, null]));
      checkEqual(true, or(value, [null, null]));
      checkEqual(true, or(value, [null, 0]));
      value = 1;
      checkEqual(true, or(value, [1]));
      checkEqual(true, or(value, [1, 2]));
      checkEqual(true, or(value, [1, 2, 3]));
      checkEqual(false, or(value, [2]));
      checkEqual(false, or(value, [2, 3]));
    };

    export const test_if_ = function () {
      var ifResultValue = {
        then: 'THEN',
        else: 'ELSE',
      };
      checkEqual('THEN', if_(true)(ifResultValue));
      checkEqual('ELSE', if_(false)(ifResultValue));

      var ifResultFunc = {
        then: function() { return 'THEN'; },
        else: function() { return 'ELSE'; },
      };
      checkEqual('THEN', if_(true)(ifResultFunc));
      checkEqual('ELSE', if_(false)(ifResultFunc));

      var ifThenValue = {
        then: 'THEN',
      };
      checkEqual('THEN', if_(true)(ifThenValue));
      checkEqual(undefined, if_(false)(ifThenValue));

      var ifElseValue = {
        else: 'ELSE',
      };
      checkEqual(undefined, if_(true)(ifElseValue));
      checkEqual('ELSE', if_(false)(ifElseValue));

      var ifThenFunc = {
        then: function() { return 'THEN'; },
      };
      checkEqual('THEN', if_(true)(ifThenFunc));
      checkEqual(undefined, if_(false)(ifThenFunc));

      var ifElseFunc = {
        else: function() { return 'ELSE'; },
      };
      checkEqual(undefined, if_(true)(ifElseFunc));
      checkEqual('ELSE', if_(false)(ifElseFunc));

      // Error
      checkEqual(true, isThrownException(
        function() { if_(true)(); },
        (new SyntaxError).name
      ));

      checkEqual(true, isThrownException(
        function() { if_(true)({}); },
        (new SyntaxError).name
      ));

      checkEqual(true, isThrownException(
        function() { if_(true)({ thenn: '' }); },
        (new SyntaxError).name
      ));

      checkEqual(false, isNotThrown(
        function() { if_(true)(); }
      ));
      checkEqual(true, isNotThrown(
        function() { if_(true)({ then: '' }); }
      ));
    };

    export const test_switch_ = function () {
      var switchResultValue1 = [
        [1, 'number 1'],
        ['1', 'string 1'],
      ];
      checkEqual('number 1', switch_(1)(switchResultValue1));
      checkEqual('string 1', switch_('1')(switchResultValue1));
      checkEqual(undefined, switch_(2)(switchResultValue1));

      var switchResultValue2 = [
        [1, 'number 1'],
        ['1', 'string 1'],
        ['default'],
      ];
      checkEqual('number 1', switch_(1)(switchResultValue2));
      checkEqual('string 1', switch_('1')(switchResultValue2));
      checkEqual('default', switch_(2)(switchResultValue2));

      var switchResultValue3 = [
        [1, 'number 1'],
        ['1', 'string 1'],
        [],
      ];
      checkEqual('number 1', switch_(1)(switchResultValue3));
      checkEqual('string 1', switch_('1')(switchResultValue3));
      checkEqual(undefined, switch_(2)(switchResultValue3));

      // Error
      var switchResultValue4 = [
        [1, '1'],
        'default'
      ];
      checkEqual(true, isThrownException(
        function() { switch_(1)(switchResultValue4); },
        (new SyntaxError).name
      ));
      checkEqual(true, isThrownException(
        function() { switch_(2)(switchResultValue4); },
        (new SyntaxError).name
      ));

      var switchResultFunc1 = [
        [1, function() { return 'number 1'; }],
        ['1', function() { return 'string 1'; }],
      ];
      checkEqual('number 1', switch_(1)(switchResultFunc1));
      checkEqual('string 1', switch_('1')(switchResultFunc1));
      checkEqual(undefined, switch_(2)(switchResultFunc1));

      var switchResultFunc2 = [
        [1, function() { return 'number 1'; }],
        ['1', function() { return 'string 1'; }],
        [function() { return 'default'; }],
      ];
      checkEqual('number 1', switch_(1)(switchResultFunc2));
      checkEqual('string 1', switch_('1')(switchResultFunc2));
      checkEqual('default', switch_(2)(switchResultFunc2));

      var switchResultFunc3 = [
        [1, 'number 1'],
        ['1', 'string 1'],
        [function() { }],
      ];
      checkEqual('number 1', switch_(1)(switchResultFunc3));
      checkEqual('string 1', switch_('1')(switchResultFunc3));
      checkEqual(undefined, switch_(2)(switchResultFunc3));
    };

    export const test_sc = function () {
      checkEqual(true, sc(1, equal, 1));
      checkEqual(false, sc(1, equal, 2));

      checkEqual(true, sc(1, or, [1, 2]));
      checkEqual(false, sc(0, or, [1, 2]));
    };

    export const test_guard = function () {
      var guardFunc = function() { return [
        isInteger(value1), [isInteger(value2), 'testmessage']
      ]; };
      {
        // ガードされない処理
        var result1 = false; var value1: any = 1; var value2: any = 2;
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(false, result1);
        checkEqual('', guard.message());

        // ガードされる処理
        {
          var result1 = false; var value1: any = '1'; var value2: any = 2;
          if (guard(guardFunc)) { result1 = true; }
          checkEqual(true, result1);
          checkEqual('', guard.message());

          var result1 = false; var value1: any = 1; var value2: any = '2';
          if (guard(guardFunc)) { result1 = true; }
          checkEqual(true, result1);
          checkEqual('testmessage', guard.message());
        }

        // ガードされる処理だがガードOFFされているので実行されない
        guard.off();
        {
          var result1 = false; var value1: any = '1'; var value2: any = 2;
          if (guard(guardFunc)) { result1 = true; }
          checkEqual(false, result1);
          checkEqual('', guard.message());

          var result1 = false; var value1: any = 1; var value2: any = '2';
          if (guard(guardFunc)) { result1 = true; }
          checkEqual(false, result1);
          checkEqual('', guard.message());
        }
        guard.on();
      }

      var guardFunc = function() { return [
        isInteger(value1), isArray(value2), 1 <= value2.length
      ]; };
      {
        var result1 = false; var value1: any = 1; var value2: any = [1];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(false, result1);

        var result1 = false; var value1: any = 1; var value2: any = [];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);

        var result1 = false; var value1: any = [1]; var value2: any = [1];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
      }

      var guardFunc = function() { return [
        isArray(value1),
        [1 <= value1.length],
        [value1[0] === 1, 'value1[0]error'],
        function() { return isArray(value2); },
        [function() { return 2 <= value2.length; }],
        [function() { return value2[0] === 1; }, 'value2[0]error'],
      ]; };
      {
        var result1 = false; var value1: any = [1]; var value2: any = [1, 2];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(false, result1);
        checkEqual('', guard.message());

        var result1 = false; var value1: any = 1; var value2: any = [1, 2];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('', guard.message());

        var result1 = false; var value1: any = []; var value2: any = [1, 2];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('', guard.message());

        var result1 = false; var value1: any = [2]; var value2: any = [1, 2];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('value1[0]error', guard.message());

        var result1 = false; var value1: any = [1]; var value2: any = '[1,2]';
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('', guard.message());

        var result1 = false; var value1: any = [1]; var value2: any = [1];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('', guard.message());

        var result1 = false; var value1: any = [1]; var value2: any = [2, 2];
        if (guard(guardFunc)) { result1 = true; }
        checkEqual(true, result1);
        checkEqual('value2[0]error', guard.message());
      }
    };

    export const test_isThrown = function() {
      checkEqual(true, isThrown(function() { throw 1; }, function(throwValue) { return throwValue === 1; }));
      checkEqual(false, isThrown(function() { throw 1; }, function(throwValue) { return throwValue !== 1; }));
      checkEqual(false, isThrown(function() { throw 2; }, function(throwValue) { return throwValue === 1; }));
      checkEqual(false, isThrown(function() { throw 1; }, function(throwValue) { return throwValue === '1'; }));
      checkEqual(true, isThrown(function() { throw '1'; }, function(throwValue) { return throwValue === '1'; }));
      checkEqual(true, isThrown(function() { throw ''; }, function(throwValue) { return throwValue === ''; }));
      checkEqual(true, isThrown(function() { throw { test: 'TEST' }; }, function(throwValue) { return throwValue.test === 'TEST'; }));
      checkEqual(false, isThrown(function() { throw { test: 'TEST' }; }, function(throwValue) { return throwValue.test === 'test'; }));

      checkEqual(false, isThrown(function() { }, function() { }));
      // 例外を投げない場合は isThrown は false

      // 第二引数指定のない isThrown
      checkEqual(true, isThrown(function() { throw 1; }));
      checkEqual(true, isThrown(function() { throw '1'; }));
      checkEqual(false, isThrown(function() {  }));

    };
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  namespace convert {
  }

  namespace string {
    export const test_match = () => {
      // 通常引数
      checkEqual(false, match('abc', ['123', '456', '789']), 'test_match 1');
      checkEqual(true,  match('abc', ['123', '456', 'abc']), 'test_match 2');
      checkEqual(false,  match('abc', ['123', '456', /^b/]), 'test_match 3');
      checkEqual(true,  match('abc', ['123', '456', /^a/]), 'test_match 4');
      checkEqual(false,  match('abc', []), 'test_match 5');

      // 例外判定
      checkEqual(false, isThrown(
        () => { match('123', []); }
      ));
      checkEqual(true, isThrownException(
        () => { match('123', 'abc'); },
        (new TypeError).name
      ));

      // パラメータ引数
      checkEqual(false, match({
        value: 'abc',
        compareValues: ['123', '456', '789'],
      }), 'test_match 1');
      checkEqual(true,  match({
        value: 'abc',
        compareValues: ['123', '456', 'abc'],
      }), 'test_match 2');
      checkEqual(false,  match({
        value: 'abc',
        compareValues: ['123', '456', /^b/],
      }), 'test_match 3');
      checkEqual(true,  match({
        value: 'abc',
        compareValues: ['123', '456', /^a/]
      }), 'test_match 4');
      checkEqual(false,  match({
        value: 'abc',
        compareValues: []
      }), 'test_match 5');

      // 例外判定
      checkEqual(false, isThrown(
        () => {
          match({
            value: '123',
            compareValues: ['123']
          });
        }
      ), 'test_match thrown 1');
      checkEqual(false, isThrown(
        () => {
          match({
            value: '123',
            compareValues: []
          });
        }
      ), 'test_match thrown 2');
      checkEqual(true, isThrown(
        () => {
          match({
            value: '123',
            compareValues: [123]
          });
        }
      ), 'test_match thrown 3');

    };

  }

  export const run = function(copipe) {

    initialize(copipe);

    var checkEqual = copipe.test.checkEqual;
    checkEqual(true, true, 'assert test');
    checkEqual(false, false, 'assert test');

    const test_isUndefined = type.test_isUndefined;
    const test_isNull = type.test_isNull;
    const test_isBoolean = type.test_isBoolean;
    const test_isNumber = type.test_isNumber;
    const test_isInteger = type.test_isInteger;
    const test_isString = type.test_isString;
    const test_isFunction = type.test_isFunction;
    const test_isObject = type.test_isObject;
    const test_isArray = type.test_isArray;
    const test_isDate = type.test_isDate;
    const test_isExcection = type.test_isExcection;

    const test_or = syntax.test_or;
    const test_if_ = syntax.test_if_;
    const test_switch_ = syntax.test_switch_;
    const test_sc = syntax.test_sc;
    const test_guard = syntax.test_guard;

    const { test_match } = string;

    console.log('test_copipe_core start.');

    test_isUndefined();
    test_isNull();
    test_isBoolean();
    test_isNumber();
    test_isInteger();
    test_isString();
    test_isFunction();
    test_isObject();
    test_isArray();
    test_isDate();
    test_isExcection(),
    test_or();
    test_if_();
    test_switch_();
    test_sc();
    test_guard();

    test_match();

    console.log('test_copipe_core finish.');
  };
}



module.exports = test_copipe_core;
