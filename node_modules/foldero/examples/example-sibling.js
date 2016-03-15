'use strict';

var util = require('util');
var foldero = require('../');

var sibling = foldero('./siblings', { relative: __dirname });

util.log(util.inspect(sibling, false, 9));
