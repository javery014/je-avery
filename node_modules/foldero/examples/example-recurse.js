'use strict';

var util = require('util');
var foldero = require('../');

var recurse = foldero('./recurse', { relative: __dirname, recurse: true });

util.log(util.inspect(recurse, false, 9));
