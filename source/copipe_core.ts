/**
 * copipe.js
 *  file: copipe_core.js
 */

namespace copipe {
  export const VERSION = '0.2.2';
}

namespace copipe {
  
  /**
   * 単独引数の場合の型判定関数
   *  assert などの防御はなし。
   */
  export namespace type {
    export const objectToString = (value: any): string => {
      return Object.prototype.toString.call(value);
    }
  }

  namespace _type {
    const { objectToString } = type;

    type PrimitiveTypeName = 'undefined' | 'boolean' | 'number' | 'string' | 'function';
    const _primitiveTypeCheckFunc =
    (typeName: PrimitiveTypeName): (args1: any) => boolean => {
      return ((value: any): boolean => typeof value === typeName);
    }

    type ObjectTypeName = 'Object' | 'Array' | 'Date';
    const _objectTypeCheckFunc =
    (typeName: ObjectTypeName): (args1: any) => boolean => {
      return ((value: any) => objectToString(value) === `[object ${typeName}]`);
    }

    export const _isUndefined = _primitiveTypeCheckFunc('undefined');

    export const _isNull = (value: any): boolean => (value === null);

    export const _isBoolean = _primitiveTypeCheckFunc('boolean');

    export const _isNumber = (value: any): boolean => {
      return (_primitiveTypeCheckFunc('number')(value) && (isFinite(value)));
    };

    export const _isInteger = (value: any): boolean => {
      if (!_isNumber(value)) {
        return false;
      }
      return Math.round(value) === value;
    };
    export const _isString = _primitiveTypeCheckFunc('string');

    export const _isFunction = _primitiveTypeCheckFunc('function');

    export const _isObject = (value: any): boolean => {
      if (
        (_objectTypeCheckFunc('Object')(value))
        && (_isNotNull(value))
        && (_isNotUndefined(value))
      ) {
        return true;
      }
      return false;
    };

    export const _isArray = _objectTypeCheckFunc('Array');

    export const _isDate = _objectTypeCheckFunc('Date');

    /**
     * 単独引数の場合の型判定関数の否定形
     */
    export const _isNotUndefined = (value: any) => !_isUndefined(value);
    export const _isNotNull = (value: any) => !_isNull(value);
    export const _isNotBoolean = (value: any) => !_isBoolean(value);
    export const _isNotNumber = (value: any) => !_isNumber(value);
    export const _isNotInteger = (value: any) => !_isInteger(value);
    export const _isNotString = (value: any) => !_isString(value);
    export const _isNotFunction = (value: any) => !_isFunction(value);
    export const _isNotObject = (value: any) => !_isObject(value);
    export const _isNotArray = (value: any) => !_isArray(value);
    export const _isNotDate = (value: any) => !_isDate(value);
  }

  /**
   * 文法拡張
   * ここでは型判定関数で使うための assert のみ記載
   */
  export namespace syntax {
    const { _isBoolean, _isString } = _type;
  
    export function assert(value: boolean, message: string = '') {
      if (!_isString(message)) {
        throw new Error('assert argsType:' + message);
      }
      if (!_isBoolean(value)) {
        throw new Error('assert argsType:' + message);
      }
      if (!value) {
        throw new Error('assert:' + message);
      }
    };
  }

  /**
   * 複数引数や関数引数の場合の型判定関数
   */
  export namespace type{
    const { assert } = syntax;

    const {
      _isUndefined,
      _isNull,
      _isBoolean,
      _isNumber,
      _isInteger,
      _isString,
      _isFunction,
      _isObject,
      _isArray,
      _isDate,

      _isNotUndefined,
      _isNotNull,
      _isNotBoolean,
      _isNotNumber,
      _isNotInteger,
      _isNotString,
      _isNotFunction,
      _isNotObject,
      _isNotArray,
      _isNotDate,
    } = _type;
  
    const _isTypeCheck = (
      checkFunc: (args1: any) => boolean,
      argsArray: any[],
    ) => {
      assert(_isFunction(checkFunc));
      assert(_isArray(argsArray));
  
      var l = argsArray.length;
      if (l === 0) {
        return false;
      } else if (l === 1) {
        return checkFunc(argsArray[0]);
      } else {
        for (var i = 0; i < l; i += 1) {
          if (!checkFunc(argsArray[i])) {
            return false;
          }
        }
        return true;
      }
    };
  
    const _isTypeCheckArgsFunc = (
      checkFunc: (args1: any) => boolean
    ): ((...args: any[]) => boolean) => {
      return (...args: any[]): boolean => _isTypeCheck(checkFunc, args);
    };
  
    const _isTypeCheckArrayFunc = (
      checkFunc: (args1: any) => boolean
    ): (args1: any[]) => boolean => {
      return (value: any[]): boolean => _isTypeCheck(checkFunc, value);
    };
  
    export const isUndefined = _isTypeCheckArgsFunc(_isUndefined);
    export const isNull = _isTypeCheckArgsFunc(_isNull);
    export const isBoolean = _isTypeCheckArgsFunc(_isBoolean);
    export const isNumber = _isTypeCheckArgsFunc(_isNumber);
    export const isInteger = _isTypeCheckArgsFunc(_isInteger);
    export const isString = _isTypeCheckArgsFunc(_isString);
    export const isFunction = _isTypeCheckArgsFunc(_isFunction);
    export const isObject = _isTypeCheckArgsFunc(_isObject);
    export const isArray = _isTypeCheckArgsFunc(_isArray);
    export const isDate = _isTypeCheckArgsFunc(_isDate);
  
    export const isNotUndefined = _isTypeCheckArgsFunc(_isNotUndefined);
    export const isNotNull = _isTypeCheckArgsFunc(_isNotNull);
    export const isNotBoolean = _isTypeCheckArgsFunc(_isNotBoolean);
    export const isNotNumber = _isTypeCheckArgsFunc(_isNotNumber);
    export const isNotInteger = _isTypeCheckArgsFunc(_isNotInteger);
    export const isNotString = _isTypeCheckArgsFunc(_isNotString);
    export const isNotFunction = _isTypeCheckArgsFunc(_isNotFunction);
    export const isNotObject = _isTypeCheckArgsFunc(_isNotObject);
    export const isNotArray = _isTypeCheckArgsFunc(_isNotArray);
    export const isNotDate = _isTypeCheckArgsFunc(_isNotDate);
  
    export const isUndefinedArray = _isTypeCheckArrayFunc(_isUndefined);
    export const isNullArray = _isTypeCheckArrayFunc(_isNull);
    export const isBooleanArray = _isTypeCheckArrayFunc(_isBoolean);
    export const isNumberArray = _isTypeCheckArrayFunc(_isNumber);
    export const isIntegerArray = _isTypeCheckArrayFunc(_isInteger);
    export const isStringArray = _isTypeCheckArrayFunc(_isString);
    export const isFunctionArray = _isTypeCheckArrayFunc(_isFunction);
    export const isObjectArray = _isTypeCheckArrayFunc(_isObject);
    export const isArrayArray = _isTypeCheckArrayFunc(_isArray);
    export const isDateArray = _isTypeCheckArrayFunc(_isDate);
  
    export const isNotUndefinedArray = _isTypeCheckArrayFunc(_isNotUndefined);
    export const isNotNullArray = _isTypeCheckArrayFunc(_isNotNull);
    export const isNotBooleanArray = _isTypeCheckArrayFunc(_isNotBoolean);
    export const isNotNumberArray = _isTypeCheckArrayFunc(_isNotNumber);
    export const isNotIntegerArray = _isTypeCheckArrayFunc(_isNotInteger);
    export const isNotStringArray = _isTypeCheckArrayFunc(_isNotString);
    export const isNotFunctionArray = _isTypeCheckArrayFunc(_isNotFunction);
    export const isNotObjectArray = _isTypeCheckArrayFunc(_isNotObject);
    export const isNotArrayArray = _isTypeCheckArrayFunc(_isNotArray);
    export const isNotDateArray = _isTypeCheckArrayFunc(_isNotDate);
  }
}

/**
 * 型判定関数の省略形
 */
namespace copipe.type {
  export const isUndef = isUndefined;
  export const isBool = isBoolean;
  export const isNum = isNumber;
  export const isInt = isInteger;
  export const isStr = isString;
  export const isFunc = isFunction
  export const isObj = isObject

  export const isNotUndef = isNotUndefined;
  export const isNotBool = isNotBoolean;
  export const isNotNum = isNotNumber;
  export const isNotInt = isNotInteger;
  export const isNotStr = isNotString;
  export const isNotFunc = isNotFunction
  export const isNotObj = isNotObject
}

/**
 * 文法拡張
 */
namespace copipe.syntax {

  /**
   * a, b の2つの引数が一致するかどうかを判定する関数
   * テストコードに使うためのもの
   */
  export const checkEqual = 
  (a: any, b: any, message: string = ''): boolean => {
    if (a === b) { return true; }
    message = `Test: ${message}\n` +
      'A !== B\n' +
      `A = ${String(a)}\n` +
      `B = ${String(b)}`
    console.log(message);
    return false
  }

  /**
   * 非関数の場合はそのままの値、関数の場合は実行結果を返す関数
   */
  export const functionValue = (value: any): any => {
    if (isFunction(value)) {
      return value();
    } else {
      return value;
    }
  };
  
  /**
   * 二番目の引数を比較関数として利用して結果を返す関数
   *  sc は second call の略
   */
  export const sc = (
    argsFirst: any, 
    // func: (args1: any, ...args: any) => any,
    func: any,
    ...argsRest: any
  ) => {
    return func(argsFirst, ...argsRest);
  }
  
  /**
   * 比較する関数
   */
  export const equal = (valueA: any, valueB: any) => {
    return valueA === valueB;
  }

  /**
   * 配列内に value と一致する値があるかどうかを判定する関数
   */
  export const or = (value: any, compareArray: any[]) => {
    assert(isArray(compareArray));
    for (let i = 0; i < compareArray.length; i += 1) {
      if (value === compareArray[i]) {
        return true;
      }
    }
    return false;
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
  export const if_ = (condition: boolean): any => {
    assert(isBoolean(condition), 'if_ argsType')
    const assertObjectThenElse = (args: any) => {
      assert(isObject(args), 'if_() argsType');
      assert(
        !(isUndefined(args.then) && isUndefined(args.else)),
        'if_() argsType'
      );
    }
    if (condition) {
      return (args: any) => {
        assertObjectThenElse(args);
        return functionValue(args.then);
      };
    } else {
      return (args: any) => {
        assertObjectThenElse(args);
        return functionValue(args.else);
      }
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
  export const switch_ = (expression: any): any => {
    return (args: any[]) => {
      assert(isArray(args), 'switch_() argsType');
      for (let i = 0; i < args.length; i += 1) {
        assert(isArray(args[i]), 'switch_() argsType not[[]]');
      }
      for (let i = 0; i < args.length; i += 1) {
        if (args[i].length === 0 ) { return undefined; };
        if (args[i].length === 1 ) { return functionValue(args[i][0]); };
        if (args[i][0] === expression) {
          return functionValue(args[i][1]);
        }
      }
      return undefined;
    };
  };
}

/**
 * 名前空間ルートの公開
 */
namespace copipe {

  /**
   * 型判定
   */
  export const {
    isUndefined,
    isNull,
    isBoolean,
    isNumber,
    isInteger,
    isString,
    isFunction,
    isObject,
    isArray,
    isDate,

    isNotUndefined,
    isNotNull,
    isNotBoolean,
    isNotNumber,
    isNotInteger,
    isNotString,
    isNotFunction,
    isNotObject,
    isNotArray,
    isNotDate,

    isUndefinedArray,
    isNullArray,
    isBooleanArray,
    isNumberArray,
    isIntegerArray,
    isStringArray,
    isFunctionArray,
    isObjectArray,
    isArrayArray,
    isDateArray,

    isNotUndefinedArray,
    isNotNullArray,
    isNotBooleanArray,
    isNotNumberArray,
    isNotIntegerArray,
    isNotStringArray,
    isNotFunctionArray,
    isNotObjectArray,
    isNotArrayArray,
    isNotDateArray,

    isUndef,
    isBool,
    isNum,
    isInt,
    isStr,
    isFunc,
    isObj,

    isNotUndef,
    isNotBool,
    isNotNum,
    isNotInt,
    isNotStr,
    isNotFunc,
    isNotObj,
  } = copipe.type;

  /**
   * 文法拡張
   */
  export const {
    assert,
    checkEqual,
  } = copipe.syntax;
}

export = copipe;
