const fse = require('fs-extra');
const path = require('path');

const dir = path.resolve(__dirname, '../dist')
console.log('clean ', dir);

fse.remove(dir);
