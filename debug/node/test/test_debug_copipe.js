/**
 * copipe.js
 *  file: test_debug_copipe.js
 *  description:
 *    build 後の test_copipe オブジェクトを実行するためのファイル
 */

var copipe = require('../copipe.js');

var test_copipe_core = require('./test_copipe_core.js');
var test_copipe_console = require('./test_copipe_console.js');

const main = function() {
  console.log(
    'copipe.VERSION', copipe.VERSION,
  );

  test_copipe_core.run(copipe);
  test_copipe_console.run(copipe);
};
main();

