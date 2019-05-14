"use strict";
/**
 * copipe.js
 *  file: test_copipe_console.ts
 */
var test_copipe_console;
(function (test_copipe_console) {
    /**
     * 各関数を変数として宣言
     */
    var checkEqual, consoleHook;
    /**
     * 初期化として関数変数を代入する
     */
    test_copipe_console.initialize = function (copipe) {
        (checkEqual = copipe.checkEqual, consoleHook = copipe.consoleHook);
    };
    test_copipe_console.test_consoleHook = function (methodName) {
        var consoleOutput = '';
        var consoleHook_hook = function () {
            consoleHook._hook(methodName, function (args) { consoleOutput += args + ';'; });
        };
        var testConsoleMethod = function () {
            console[methodName]('debug1');
            console[methodName]('debug2');
            console[methodName]('release1');
            console[methodName]('release2');
        };
        var consoleMethod = console.log;
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
        consoleHook._hook(methodName, consoleMethod);
    };
    test_copipe_console.run = function (copipe) {
        console.log('test_copipe_console start.');
        test_copipe_console.initialize(copipe);
        var test_consoleHook = test_copipe_console.test_consoleHook;
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
})(test_copipe_console || (test_copipe_console = {}));
module.exports = test_copipe_console;
