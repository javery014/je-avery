// Main javascript entry point
// Should handle bootstrapping/starting application

'use strict';

var $ = require('jquery');
var Imager = require('imager.js')

var Link = require('../_modules/link/link');
var getNav = require('../_modules/nav/nav');
var Book = require('../_modules/book/book');
var Rsvp = require('../_modules/rsvp/rsvp');

global.tabletMin = 768;
global.tabletMax = 1024;

$(function() {
  new Link(); // Activate Link modules logic
  getNav();
  new Book();
  new Rsvp();
  new Imager({
  	availableWidths: [
  		800, 1400
  	],
  	availablePixelRatios: [
  		1, 1.5
  	]
  });
});
