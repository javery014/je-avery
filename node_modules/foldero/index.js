'use strict';

var fs = require('fs');
var path = require('path');
var util = require('util');

var WHITELIST_JS = '^(/|[A-Za-z]\:)(.+)\.js(on)?$';
var INDEX_FILE_NAME = 'index.js';

function reTest(re, f) {
  return re.test(f);
}

function extractFileNameWithoutExtension(f) {
  return path.basename(f, path.extname(f));
}

function processDirectory(stats, dir, opt) {
  var $ = {};
  var files = fs.readdirSync(dir);
  var len = files.length;
  var i, f, n, s;
  if (opt.index && !opt.noIndex) {
    i = files.indexOf(opt.index);
    if (i >= 0) {
      f = path.join(dir, files[i]);
      if (f !== opt.ignore) {
        return opt.loader(f);
      }
    }
  }
  i = -1;
  while (++i < len) {
    n = files[i];
    f = path.join(dir, n);
    s = fs.statSync(f);
    if (s.isDirectory() && opt.recurse && !opt.whitelist(f)) {
      $[opt.calculateName(f)] = processDirectory(s, f, opt);
    } else if (s.isFile() && opt.whitelist(f) && f != opt.ignore) {
      $[opt.calculateName(f)] = opt.loader(f);
    }
  }
  return $;
}

function foldero(dir, opt) {
  opt = opt || {};
  opt.whitelist = opt.whitelist || reTest.bind(null, new RegExp(WHITELIST_JS));
  if (typeof(opt.whitelist) === 'string') {
    opt.whitelist = reTest.bind(null, new RegExp(opt.whitelist));
  }
  opt.calculateName = opt.calculateName || extractFileNameWithoutExtension;
  opt.loader = opt.loader || require;
  if (opt.relative) {
    dir = path.normalize(path.join(opt.relative, dir));
  }
  opt.index = opt.index || INDEX_FILE_NAME;
  var stats = fs.statSync(dir);
  if (stats.isDirectory(stats)) {
    return processDirectory(stats, dir, opt);
  } else if (stats.isFile() && opt.whitelist(dir)) {
    return opt.loader(dir);
  }
}

module.exports = foldero;
