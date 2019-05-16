# Copipe.js
simple code parts

## URL
standard-software/Copipe.js: simple code parts  
https://github.com/standard-software/copipejs

@standard-software/copipe - npm  
https://www.npmjs.com/package/@standard-software/copipe


## install
    npm i @standard-software/copipe

## How to use

### type CommonJS

```
// index.js
const copipe = require("@standard-software/copipe");

console.log(
  'copipe.VERSION', copipe.VERSION
);
```
    node index.js

### type ES Modules

```
// index.mjs
import copipe from '@standard-software/copipe';

console.log(
  'copipe.VERSION', copipe.VERSION
);
```
    node --experimental-modules index.mjs


## Version

### 0.7.4
#### 2019/05/17(Fri)
- Update npm script 
- Created copipe_node.js function forceMkDirSync
- Uninstalled cpx

### 0.7.3
#### 2019/05/16(Thu)
- Created copipe.min.js and copipe.js for node and web
- Changed folder structure build >> debug
  same npm script name
  same debug file name

### 0.7.2
#### 2019/05/14(Tue)
- Update miss README.md and VERSION_EN.md

### 0.7.1
#### 2019/05/14(Tue)
- Uninstall prettier with eslint

### 0.7.0
#### 2019/05/08(Wed)
- Introduction eslint

### More Info
[VERSION_EN.md](https://github.com/standard-software/copipejs/blob/master/VERSION_EN.md)
