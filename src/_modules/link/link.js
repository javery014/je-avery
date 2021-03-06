'use strict';

var $ = require('jquery');
var nav = require('../nav/nav')();
require('jquery-smooth-scroll');

// Constructor
var Link = function() {

	this.name = 'link';

	$('a').smoothScroll({
		speed: 750,
		autoCoefficient: 1,
		beforeScroll: function() {
			if (window.innerWidth < window.tabletMin)
				nav.toggleNav();
		}
	});
};

module.exports = Link;
