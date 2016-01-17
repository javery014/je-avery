'use strict';

var $ = require('jquery');
var nav = undefined;

// Constructor
var Nav = function() {
	this.name = 'nav';
	this.element = $('nav');
	this.open = false;
	this.nav = this;

	this.toggleNav = function() {
		$('.nav-list-outter').stop().slideToggle();
		nav.open = !nav.open;
		if (nav.open) {
			$('nav').find('.mobile-logo').css('display', 'none');
		} else {
			$('nav').find('.mobile-logo').css('display', 'block');
		}
		$('nav').find('.fa').toggleClass('fa-bars');
		$('nav').find('.fa').toggleClass('fa-close');
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
