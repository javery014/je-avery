'use strict';

var Page = function(config) {
	this.element = config.element;
	this.side = config.side;
	this.pageNum = parseInt(config.pageNum);
	this.flipping = '';
	this.book = config.book;
	var context = this;

	this.element.addEventListener('animationstart', function() {
		if (context.side === 'left') {
			if (context.flipping === 'right') {
				context.addClass('moving');
				context.removeClass('top');
				context.book.getPageByPageNum(context.pageNum - 2).addClass('top');
			} else {
				context.addClass('moving');
			}
		} else {
			if (context.flipping === 'right') {
				context.addClass('moving');
			} else {
				// give the page a z-index of 2
				context.addClass('moving');
				context.removeClass('top');
				// give the page beneath it a z-index of 1
				context.book.getPageByPageNum(context.pageNum + 2).addClass('top');
			}
		}
	});

	this.element.addEventListener('animationend', function() {
		if (context.side === 'left') {
			if (context.flipping === 'right') {
				context.removeClass('moving');
			} else {
				config.book.getPageByPageNum(context.pageNum - 2).removeClass('top');
				context.addClass('top');
				context.removeClass('moving');
			}
		} else {
			if (context.flipping === 'right') {
				config.book.getPageByPageNum(context.pageNum + 2).removeClass('top');
				context.addClass('top');
				context.removeClass('moving');
			} else {
				context.removeClass('moving');
			}
		}
	});
};

Page.prototype.flipRight = function() {
	this.flipping = 'right';
	if (this.side === 'left') {
		this.removeClass('flipping-left-page-left');
		this.addClass('flipping-left-page-right');
	} else {
		this.removeClass('flipping-right-page-left');
		this.addClass('flipping-right-page-right');
	}
};

Page.prototype.flipLeft = function() {
	this.flipping = 'left';
	if (this.side === 'left') {
		this.removeClass('flipping-left-page-right');
		this.addClass('flipping-left-page-left');
	} else {
		this.removeClass('flipping-right-page-right');
		this.addClass('flipping-right-page-left');
	}
};

Page.prototype.removeClass = function(classToRemove) {
	var classes = this.element.className;
	var index = classes.indexOf(classToRemove);
	if (index < 0) {
		return;
	}
	var newClassesArray = classes.split(classToRemove);
	this.element.className = newClassesArray[0] + newClassesArray[1];
};

Page.prototype.addClass = function(classToAdd) {
	this.element.className += (' ' + classToAdd);
};

module.exports = Page;
