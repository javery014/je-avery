'use strict';

var bsModal = require('./bs-modal.js');

// Constructor
var Modal = function() {
  this.name = 'Modal';
  $('#shuttle-modal').modal();
};

module.exports = Modal;
