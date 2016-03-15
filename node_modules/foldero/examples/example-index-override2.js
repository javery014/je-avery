'use strict';

var util = require('util');
var foldero = require('../');

// the folder has an index.js, but we're specifying that a different
// file should be used as the index.
var indexed = foldero('./indexed', { relative: __dirname, index: 'another.js' });

util.log(util.inspect(indexed, false, 9));
