'use strict';

var $ = require('jquery');
var nav = undefined;

// Constructor
var Nav = function() {
	this.name = 'nav';
	this.element = $('nav');

	this.toggleNav = function() {
		$('.nav-list-outter').stop().slideToggle();
		console.log($(this));
		$('nav').find('.fa').toggleClass('fa-angle-down');
		$('nav').find('.fa').toggleClass('fa-angle-up');
	};

	$('.nav-control').on('click', this.toggleNav);
};

var getNav = function() {
	if (!nav) {
		nav = new Nav();
		return nav;
	} else {
		return nav;
	}
}

module.exports = getNav;
