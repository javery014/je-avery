'use strict';

var Page = require('./page/page');
var $ = require('jquery');

var Book = function(pages) {
	this.pages = pages || [];
	this.spreadNum = 1;
	this.currentPage = 1;
	this.mobile = (window.innerWidth < window.tabletMin);
	this.smoothScrolling = false;
	this.postSmoothScrolling = false;
	var book = this;

	this.getPageByPageNum = function(pageNum) {
		var ret = null;
		this.pages.forEach(function(element, index, array) {
			if (element.pageNum === pageNum) {
				ret = element;
			}
		});
		return ret;
	};

	this.flipRight = function() {
		if (this.spreadNum > 1 && !this.mobile) {
			var leftPage = this.getPageByPageNum(2*this.spreadNum - 1);
			this.spreadNum--;
			var rightPage = this.getPageByPageNum(2*this.spreadNum);

			leftPage.flipRight();
			rightPage.flipRight();
		} else if (this.currentPage > 1) {
			this.currentPage--;
			this.scrollToPage(this.currentPage);
		}
	};

	this.flipLeft = function() {
		if (this.spreadNum*2 < this.pages.length && !this.mobile) {
			var rightPage = this.getPageByPageNum(2*this.spreadNum);
			this.spreadNum++;
			var leftPage = this.getPageByPageNum(2*this.spreadNum - 1);

			rightPage.flipLeft();
			leftPage.flipLeft();
		} else if (this.currentPage < this.pages.length) {
			this.currentPage++;
			this.scrollToPage(this.currentPage);
		}
	};

	this.scrollToPage = function(pageNum) {
		$.smoothScroll({
			scrollElement: $('.book'),
			scrollTarget: '#' + pageNum,
			beforeScroll: function() {
				book.smoothScrolling = true;
			},
			afterScroll: function() {
				book.smoothScrolling = false;
				book.postSmoothScrolling = true;
				if (book.mobile) {
					// $('.paging-controls').css('top', $('.book').scrollTop());
				}
			}
		});
	};

	Array.prototype.forEach.call(document.getElementsByClassName('page-next'), function(v) {
		v.addEventListener('click', function() {
			var bindedFlip = book.flipLeft.bind(book);
			bindedFlip();
		});
	});

	Array.prototype.forEach.call(document.getElementsByClassName('page-prev'), function(v) {
		v.addEventListener('click', function() {
			var bindedFlip = book.flipRight.bind(book);
			bindedFlip();
		});
	});

	var pages = document.querySelectorAll('.page');
	var i = 0;
	for (i = 0; i < pages.length; i++) {
		var side = (i % 2 !== 0 ? 'right' : 'left');
		var pageNum = i + 1;
		this.pages.push(new Page({
			book: this,
			element: pages[i],
			side: side,
			pageNum: pageNum
		}));
		if (this.pages[i].pageNum === 1 || this.pages[i].pageNum === 2) {
			this.pages[i].addClass('top');
		}
	}

	window.addEventListener('resize', function() {
		var prev = book.mobile;
		book.mobile = (window.innerWidth < window.tabletMin);
		if (prev != book.mobile) {
			if (book.mobile) {
				book.currentPage = 2*book.spreadNum -1;
				book.scrollToPage(book.currentPage);
			}
			book.spreadNum = book.currentPage % 2 === 0 ? book.currentPage/2 : (book.currentPage + 1)/2;
			book.pages.forEach(function(element, index, array) {
				element.element.className = 'page';
				if (element.pageNum === 2*book.spreadNum || element.pageNum === (2*book.spreadNum - 1)) {
					element.addClass('top');
				}
			});
		}
	})

	$('.book').on('scroll', function() {
		if (book.postSmoothScrolling) {
			book.postSmoothScrolling = false;
			return;
		}
		if (!book.smoothScrolling) {
			var scrollPoint = this.scrollTop/400 + 1;
			book.currentPage = (scrollPoint % Math.floor(scrollPoint) > 0.8 ? Math.ceil(scrollPoint) : Math.floor(scrollPoint));
		}
	});
};

module.exports = Book;
