/**
 * copipe.js
 *  file: test_copipe_console.ts
 */

namespace test_copipe_console {

  /**
   * 各関数を変数として宣言
   */
  var
    checkEqual,
    consoleHook;

  /**
   * 初期化として関数変数を代入する
   */
  export const initialize = function (copipe) {

    /**
     * 名前空間でルート公開されている関数の展開
     */
    ({
      consoleHook,
    } = copipe);

    /**
     * 名前空間でルート公開されていない関数の展開
     */
    ({
      checkEqual,
    } = copipe.test);
  };

  export const test_consoleHook = function(methodName: string) {

    var consoleOutput = '';
    var consoleHook_hook = function() {
      consoleHook._hook(methodName, function(args: string) {
        consoleOutput += args + ';';
      });
    };

    var consoleMethod = console.log;

    var testConsoleMethod = function() {
      console[methodName]('debug1');
      console[methodName]('debug2');
      console[methodName]('release1');
      console[methodName]('release2');
    };

    consoleOutput = '';
    consoleHook_hook();
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;debug2;release1;release2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug1'], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug'], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;debug2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug1', 'release1'], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;release1;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, [/debug?/], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;debug2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, [/debug?/], ['debug1'], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, [], ['release1'], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;debug2;release2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, [], [/debug?/], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('release1;release2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug1', 'debug2'], ['debug1'], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug2;', consoleOutput);

    var testConsoleMethod = function() {
      console[methodName]('debug1', 'a', 'messageA');
      console[methodName]('debug2', 'b', 'messageB');
      console[methodName]('release1', 'a', 'messageC');
      console[methodName]('release2', 'b', 'messageD');
    };

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug', ' a '], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug1;debug2;release1;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['debug'], [' a '], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('debug2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, [' b '], ['messageB'], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('release2;', consoleOutput);

    consoleOutput = '';
    consoleHook_hook();
    consoleHook._accept(methodName, ['messageD'], [], console[methodName]);
    testConsoleMethod();
    consoleHook._unHook(methodName);
    checkEqual('release2;', consoleOutput);

    consoleHook._hook(methodName, consoleMethod);
  };

  export const run = function(copipe) {

    console.log('test_copipe_console start.');

    initialize(copipe);
    const { test_consoleHook } = test_copipe_console;

    test_consoleHook('log');
    test_consoleHook('info');
    test_consoleHook('warn');
    test_consoleHook('error');
    test_consoleHook('debug');

    console.log('test_copipe_console finish.');

    copipe.consoleHook.unHookLog();

    // console.info('info');
    // console.warn('warn');
    // console.error('error');
    // console.debug('debug');

  };

}

module.exports = test_copipe_console;
