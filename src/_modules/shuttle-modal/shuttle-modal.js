'use strict';

var bsModal = require('bootstrap/js/modal.js');

// Constructor
var Modal = function() {
  this.name = 'Modal';
  $('#shuttle-modal').modal();
  console.log('run');
};

module.exports = Modal;
