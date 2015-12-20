'use strict';

var $ = require('jquery');

// Constructor
var Rsvp = function() {
	this.name = 'rsvp';
	var rsvp = this;
	this.lists = null;

	var notAttendingTemplate = '<p><input type="checkbox" name="notAttending" id="notAttending"/><label for="notAttending">Not attending</label></p>';
	var numGuestsTemplate = '<p><input type="text" name="numInParty" placeholder="Number attending in party"/></p>' ;
	var plusOneTemplate = '<p><input type="text" name="plusOne" placeholder="Name of guest"/></p>' +
		'<p data-input-type="plusOne"><input type="checkbox" name="noGuest"/><label for="noGuest">No guest</label>';
	var couplesTemplate = '<p>Check who\'s attending</p>' +
		'<p data-input-type="couple"><input type="checkbox" name="" /> <label for=""><span class="guestName"></span></label></p>' +
		'<p data-input-type="couple"><input type="checkbox" name="" /> <label for=""><span class="guestName"></span></label></p>';
	var submitTemplate = '<p><button type="submit">SUBMIT</button>';

	$.ajax({
		dataType: 'json',
		url: 'j3289urjsklm3dk4okds.json',
		success: function(data) {
			rsvp.lists = data;
			rsvp.numGuestsList = rsvp.lists.numGuests;
			rsvp.plusOnesList = rsvp.lists.plusOne;
			rsvp.couplesList = rsvp.lists.couples;
		}
	});

	this.flipForm = function(forward) {
		if (forward) {

		}
	};

	this.searchSimpleList = function(name, list) {
		var found = false;
		list.forEach(function(value, index, array) {
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
		var secondPage = $('#secondPage')
		var formInner = document.getElementsByClassName('rsvp-inner')[0];

		if (rsvp.searchSimpleList(name, rsvp.numGuestsList)) {
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName);
			$('#submitRsvp').html(notAttendingTemplate + numGuestsTemplate + submitTemplate);
		} else if (rsvp.searchSimpleList(name,  rsvp.plusOnesList)) {
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName);
			$('#submitRsvp').html(notAttendingTemplate + plusOneTemplate + submitTemplate);
			var $plusOne = $('[data-input-type="plusOne"]');
			$plusOne.find('label').attr('for', 'plusOne');
			$plusOne.find('input').attr('id', 'plusOne');
		} else if (rsvp.searchCouplesList(firstName, lastName, rsvp.couplesList)) {
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName);
			$('#submitRsvp').html(notAttendingTemplate + couplesTemplate + submitTemplate);
			$('[data-input-type="couple"]').each(function(index) {
				var guestName = rsvp.couplesList[lastName.toLowerCase()][index];
				$(this).find('label').html(guestName).attr('for', guestName);
				$(this).find('input').attr('name', guestName).attr('id', guestName);
			});
		} else {
			alert('not on the list...');
		}

		return false;
	});

	$('.back').on('click', function() {
		$('.rsvp-inner').removeClass('flipped');
	});
};

module.exports = Rsvp;
