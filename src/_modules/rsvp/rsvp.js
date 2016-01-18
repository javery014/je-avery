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
		var found = false;
		list.forEach(function(cName, index, array) {
			var couple = cName.split(', ');
			if (couple[0] === (firstName.toLowerCase() + " " + lastName.toLowerCase()) || couple[1] === (firstName.toLowerCase() + " " + lastName.toLowerCase())) {
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

		$('#name').val(name);

		if (rsvp.searchSimpleList(name, rsvp.numGuestsList)) {
			$('.family').show();
			$('.couples, .plus-one').remove();
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName + '!');
			$('form[name="submitRsvp"]').data('formType', 'family');
		} else if (rsvp.searchSimpleList(name,  rsvp.plusOnesList)) {
			$('.plus-one').show();
			$('.family, .couples').remove();
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName + '!');
			$('form[name="submitRsvp"]').data('formType', 'plus-one');


			var $plusOne = $('[data-input-type="plusOne"]');
			$plusOne.find('label').attr('for', 'plusOne');
			$plusOne.find('input').attr('id', 'plusOne');
		} else if (rsvp.searchCouplesList(firstName, lastName, rsvp.couplesList)) {
			$('.couples').show();
			$('.plus-one, .family').remove();
			$(formInner).addClass('flipped');
			$('#rsvpGreetingName').html(firstName + '!');
			$('form[name="submitRsvp"]').data('formType', 'couple');

			// Find the couple
			var couple;
			rsvp.couplesList.forEach(function(value, index, array) {
				console.log(value);
				if (value.indexOf(firstName.toLowerCase() + " " + lastName.toLowerCase()) >= 0) {
					couple = value.split(', ');
				}
			});

			// Populate the checkboxes for the names of the couple
			$('[data-input-type="couple"]').each(function(index) {
				var guestName = couple[index];
				var firstLast = guestName.split(' ');
				$(this).find('label').html(guestName).attr('for', guestName);
				$(this).find('input[type="hidden"]').attr('value', guestName);

			});
		} else {
			alert('Please enter your name as it appears on your invitation');
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
