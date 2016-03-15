'use strict';

var util = require('util');
var path = require('path');
var foldero = require('../');

var dir = path.normalize(path.join(__dirname, './empty'));

var empty = foldero(dir);

util.log(util.inspect(empty, false, 9));
