// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');

var Link = require('../_modules/link/link');
var getNav = require('../_modules/nav/nav');
var Book = require('../_modules/book/book');

global.tabletMin = 768;

$(function() {
  new Link(); // Activate Link modules logic
  getNav();
  new Book();
});
