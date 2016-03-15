'use strict';

var util = require('util');
var fs = require('fs');
var path = require('path');
var foldero = require('../');

function loadAsString(f) {
  return fs.readFileSync(f, 'utf8');
}

var non = foldero('./non-empty', {
  relative: __dirname,
  whitelist: "(.*/)*.+\.(htm|html|HTM|HTML)$",
  calculateName: path.basename.bind(path),
  loader: loadAsString
});

util.log(util.inspect(non, false, 9));
