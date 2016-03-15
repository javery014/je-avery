'use strict';

var util = require('util');
var foldero = require('../');

// the folder has an index.js, but we're specifying it should not be treated differently.
var indexed = foldero('./indexed', { relative: __dirname, noIndex: true });

util.log(util.inspect(indexed, false, 9));
