'use strict';

var rsvpValidator;
var $ = require('jquery');

// Constructor
var RsvpValidator = function(form) {
  this.name = 'section';
  rsvpValidator = this;
  $('#submitRsvp').on('change', function() {
  	$('#error-container').html('');
  });

};

RsvpValidator.prototype.checkAttending = function($inputs, form) {
	return ($inputs.filter(function() {
		return $(this).attr('name') === 'attending' && $(this).is(':checked');
	}).size() > 0 ? '' : "Please indicate whether or not you will be attending");
};

RsvpValidator.prototype.checkGuests = function($inputs, form) {
	return ($inputs.filter(function() {
		return $(this).attr('name') === 'guest' && $(this).is(':checked');
	}).size() > 0 ? '' : 'Please indicate if you\'ll be bringing a guest');
};

RsvpValidator.prototype.checkParty = function($inputs, form) {
	return parseInt($('#numInParty').val()) ? '' : 'Please indicate how many people are in your party';
};

RsvpValidator.prototype.checkCouple = function($inputs, form) {
	return $inputs.filter(function() {
		return $(this).attr('type') === 'checkbox' && $(this).is(':checked');
	}).size() > 0 ? '' : 'Please indicate who will be attending';
};

RsvpValidator.prototype.validateForm = function(form) {
	var $inputs = $(form).find('input');

	if ($('#attending').is(':checked')) {
		if ($(form).data('formType') === 'couple') {
			var guestCheck = this.checkCouple($inputs, form);
			if (guestCheck) {
				$('#error-container').html('<i class="fa fa-exclamation-circle"></i>&nbsp;' + guestCheck);
				return false;
			}
		}

		if ($(form).data('formType') === 'plus-one') {
			var guestCheck = this.checkGuests($inputs, form);
			if (guestCheck) {
				$('#error-container').html('<i class="fa fa-exclamation-circle"></i>&nbsp;' + guestCheck);
				return false;
			}
		}

		if ($(form).data('formType') === 'family') {
			var partyCheck = this.checkParty($inputs, form);
			if (partyCheck) {
				$('#error-container').html('<i class="fa fa-exclamation-circle"></i>&nbsp;' + partyCheck);
				return false;
			}
		}
	}
};

module.exports = (!rsvpValidator ? new RsvpValidator : rsvpValidator);
