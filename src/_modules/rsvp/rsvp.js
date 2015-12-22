'use strict';

var $ = require('jquery');
var validator = require('./rsvp-validator');

// Constructor
var Rsvp = function() {
	this.name = 'rsvp';
	var rsvp = this;
	this.lists = null;

	var attendingTemplate =
		'<p><input type="radio" name="attending" value="no" id="notAttending"/><label for="notAttending">Decline with regret</label></p>' +
		'<p><input type="radio" name="attending" value="yes" id="attending" /><label for="attending">Accept with excitement</label></p>';
	var numGuestsTemplate =
			'<p class="sub-text-field"><input type="number" id="numInParty" name="numInParty" placeholder="Number attending in party" data-required-if="attending,yes"/></p>';
	var plusOneTemplate =
		'<div class="guest-info">' +
			'<p><input type="radio" name="guest" value="no" id="noGuest" data-required-if="attending,yes" data-error-container="error-container"/><label for="noGuest">Won\'t be bringing a guest</label></p>' +
			'<p><input type="radio" name="guest" value="yes" id="yesGuest" /><label for="yesGuest">Will be bringing a guest</label></p>' +
			'<p class="sub-text-field"><input type="text" id="plusOne" name="plusOne" placeholder="Name of guest"/></p>' +
		'</div>';
	var couplesTemplate =
		'<div class="guest-info">' +
			'<p class="sub-label">Please check who will be attending:</p>' +
			'<p data-input-type="couple"><input type="checkbox" name="" data-required-if="attending,yes" data-error-container="error-container"/> <label for=""><span class="guestName"></span></label></p>' +
			'<p data-input-type="couple"><input type="checkbox" name="" /> <label for=""><span class="guestName"></span></label></p>' +
		'</div>';
	var submitTemplate = '<button type="submit">SUBMIT</button>';

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
			$('#rsvpGreetingName').html(firstName + '!');
			// $('form[name="submitRsvp"]').html(attendingTemplate + numGuestsTemplate + submitTemplate);
			$('form[name="submitRsvp"]').data('formType', 'family');
		} else if (rsvp.searchSimpleList(name,  rsvp.plusOnesList)) {
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName + '!');
			$('form[name="submitRsvp"]').html(attendingTemplate + plusOneTemplate + submitTemplate);
			$('form[name="submitRsvp"]').data('formType', 'plus-one');
			var $plusOne = $('[data-input-type="plusOne"]');
			$plusOne.find('label').attr('for', 'plusOne');
			$plusOne.find('input').attr('id', 'plusOne');
		} else if (rsvp.searchCouplesList(firstName, lastName, rsvp.couplesList)) {
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName + '!');
			$('form[name="submitRsvp"]').html(attendingTemplate + couplesTemplate + submitTemplate);
			$('form[name="submitRsvp"]').data('formType', 'couple');
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

	$('form[name="submitRsvp"]').on('submit', function(e) {
		// e.preventDefault();
		if (validator.validateForm(this) !== false) {
			return true;
		}
		return false;
	});
};

module.exports = Rsvp;
