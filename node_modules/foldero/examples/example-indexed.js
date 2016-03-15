'use strict';

var util = require('util');
var foldero = require('../');

// the folder has an index.js, it will be loaded.
var indexed = foldero('./indexed', { relative: __dirname });

util.log(util.inspect(indexed, false, 9));
