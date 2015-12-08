'use strict';

var $ = require('jquery');

// Constructor
var Rsvp = function() {
	this.name = 'rsvp';
	console.log('%s module', this.name);
	var rsvp = this;
	this.lists = null;

	$.ajax({
		dataType: 'json',
		url: 'x13kcvnsakdjt30ph8asdkjarj2.json',
		success: function(data) {
			rsvp.lists = data;
			rsvp.numGuestsList = rsvp.lists.numGuests;
			rsvp.plusOnesList = rsvp.lists.plusOne;
			rsvp.couplesList = rsvp.lists.couples;
		}
	});

	this.searchSimpleList = function(name, list) {
		console.log(name);
		console.log(list);
		var found = false;
		list.forEach(function(value, index, array) {
			console.log(value);
			if (name.toLowerCase() === value.toLowerCase()) {
				found = true;
			}
		});
		return found;
	};

	this.searchCouplesList = function(firstName, lastName, list) {
		var cLastNames = Object.keys(list);
		var found = false;
		cLastNames.forEach(function(cLastName, index, array) {
			if (lastName.toLowerCase() === cLastName.toLowerCase() &&
				rsvp.searchSimpleList(firstName + ' ' + lastName, list[cLastName])) {
				found = true;
			}
		});
		return found;
	};

	$('#fetch-name').on('submit', function(e) {
		// Get name and search through the json lists for the name
		// - if the name is in a list, load the proper html file in place
		// - if the name is not in the list, show an error
		var firstName = $('#firstName').val();
		var lastName = $('#lastName').val();
		var name = firstName + ' ' + lastName;

		var formInner = document.getElementsByClassName('rsvp-inner')[0];
		if (rsvp.searchSimpleList(name, rsvp.numGuestsList)) {
			formInner.style.transform = 'translateX(-300px)';
		} else if (rsvp.searchSimpleList(name,  rsvp.plusOnesList)) {
			formInner.style.transform = 'translateX(-300px)';
		} else if (rsvp.searchCouplesList(firstName, lastName, rsvp.couplesList)) {
			formInner.style.transform = 'translateX(-300px)';
		} else {
			alert('not on the list...');
		}

		return false;
	});

	$('.back').on('click', function() {
		var formInner = document.getElementsByClassName('rsvp-inner')[0];
		formInner.style.transform = 'translateX(0)';
	});
};

module.exports = Rsvp;
