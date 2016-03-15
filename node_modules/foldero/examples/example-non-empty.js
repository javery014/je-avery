'use strict';

var util = require('util');
var foldero = require('../');

var non = foldero('./non-empty', { relative: __dirname });

util.log(util.inspect(non, false, 9));
