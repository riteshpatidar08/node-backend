//PATH
const path = require('path');
const fs = require('fs');
//join //resolve

const joinedPath = path.join('users', 'node', 'index.js');
console.log(joinedPath);

const filePath = path.join(__dirname, 'async.txt');
console.log(filePath);

const data = fs.readFileSync(filePath, 'utf-8');
console.log(data);

//RESOLVE
const resolvedPath = path.resolve('async.txt');
console.log(resolvedPath);

//basename
const basename = path.basename('/users/index.txt');
console.log(basename);

//ext

const extensionn = path.extname('/index.txt');
console.log(extensionn);


//