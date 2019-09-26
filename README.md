# Copipe.js
simple code parts

## URL
standard-software/Copipe.js: simple code parts  
https://github.com/standard-software/copipejs

@standard-software/copipe - npm  
https://www.npmjs.com/package/@standard-software/copipe


## for node webpack etc.. 

### npm install
    npm i @standard-software/copipe

### How to use type CommonJS

```
// index.js
const copipe = require("@standard-software/copipe");

console.log(
  'copipe.VERSION', copipe.VERSION
);
```
    node index.js

### How to use type ES Modules

```
// index.mjs
import copipe from '@standard-software/copipe';

console.log(
  'copipe.VERSION', copipe.VERSION
);
```
    node --experimental-modules index.mjs

## for web

### Setting to use Debug Version

```
<script>
  var require = function() {
    return copipe;
  };
  var module = {};
</script>
  <script src="../copipe_core.js"></script>
  <script src="../copipe_console.js"></script>
  <script src="../copipe_polyfill.js"></script>
<script>
  console.log(copipe.VERSION);
</script>
```
- refer to ./debug/web/test/test_debug_copipe.html

### Setting to use Release Version

```
<script>
  var module = {};
</script>
  <script src="../copipe.js"></script>
<script>
  console.log(copipe.VERSION);
</script>
```
- refer to ./release/web/test/test_release_copipe.html

## for WSH(Window Scripting Host / Windows10)

### Setting to use Debug Version

- refer to ./debug/wsh/test/test_debug_copipe.wsf

### Setting to use Release Version

- refer to ./release/wsh/test/test_release_copipe.wsf


## Version

### 2.0.0
#### 2019/09/26(Thu)
Next Product  
[standard-software / Parts.js](https://github.com/standard-software/partsjs)

### 1.2.3
#### 2019/09/26(Thu)
- document update

### 1.2.2
#### 2019/09/26(Thu)
- document update

### 1.2.1
#### 2019/06/09(Sun)
- update parameter args
  numberToString, stringToNumber, stringToInteger
  string.includes, string.matchFormat

### 1.2.0
#### 2019/06/08(Sat)
- add numberToString, stringToNumber, stringToInteger
- add isNaNStrict
- add matchFormat

### 1.1.0
#### 2019/06/06(Thu)
- update isThrown no args thrown value.
- update compare.match
- update string.include and consoleHook
- add Polyfill statsWith endsWith
- update compare.equal or
- add compare.matchValue defaultValue

### More Info
[VERSION_EN.md](./VERSION_EN.md)
