/*global it: false, describe: false, before: false, after: false, afterEach: false*/
'use strict';

var foldero = require('../');

var path = require('path');
var fs = require('fs');
var util = require('util');
var expect = require('expect.js');

describe('foldero', function() {

  describe('when loading an empty folder (default)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/empty', {
        relative: __dirname
      });
    });

    describe('the folded object', function() {

      it('has no properties', function() {
        expect(underTest).to.be.ok();
        var keys = Object.keys(underTest);
        expect(keys.length).to.be(0);
      });

    });
  });

  describe('when loading a non-empty folder (default)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/non-empty', {
        relative: __dirname
      });
    });

    describe('the folded object', function() {

      it('was created', function() {
        expect(underTest).to.be.ok();
      });

      it('has a property for the file ./one.js', function() {
        expect(underTest.one).to.be('this is file one');
      });

      it('has a property for the file ./two.json', function() {
        expect(underTest.two).to.be.an('object');
        expect(underTest.two.two).to.be('is my file name');
      });

      it('does not have a property for the file ./three.html', function() {
        expect(underTest.three).to.be(undefined);
      });

    });

  });

  describe('when loading a non-empty folder (calculated name)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/non-empty', {
        relative: __dirname,
        calculateName: path.basename.bind(path)
      });
    });

    describe('the folded object', function() {

      it('was created', function() {
        expect(underTest).to.be.ok();
      });

      it('has a property for the file ./one.js', function() {
        expect(underTest['one.js']).to.be('this is file one');
      });

      it('has a property for the file ./two.json', function() {
        expect(underTest['two.json']).to.be.an('object');
        expect(underTest['two.json'].two).to.be('is my file name');
      });

      it('does not have a property for the file ./three.html', function() {
        expect(underTest['three.html']).to.be(undefined);
      });

    });

  });

  describe('when loading a non-empty folder (custom for html)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/non-empty', {
        relative: __dirname,
        whitelist: "(.*/)*.+\.(htm|html|HTM|HTML)$",
        loader: function loadAsString(f) {
          return fs.readFileSync(f, 'utf8');
        }
      });
    });

    describe('the folded object', function() {

      it('was created', function() {
        expect(underTest).to.be.ok();
      });

      it('does not have a property for the file ./one.js', function() {
        expect(underTest.one).to.be(undefined);
      });

      it('does not have a property for the file ./two.json', function() {
        expect(underTest.two).to.be(undefined);
      });

      it('has a property for the file ./three.html', function() {
        expect(underTest.three).to.be.a('string');
      });

    });

  });

  describe('when loading a folder with nested folders and files (default)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/recurse', {
        relative: __dirname
      });
    });

    describe('the folded object', function() {

      it('was created', function() {
        expect(underTest).to.be.ok();
      });

      it('has a property for the file ./one.js', function() {
        expect(underTest.one).to.be('this is file one');
      });

      it('has a property for the file ./two.json', function() {
        expect(underTest.two).to.be.an('object');
        expect(underTest.two.this).to.be('is file two');
      });

      it('does not have a property for the nested directory or files', function() {
        expect(underTest.three).to.be(undefined);
        expect(underTest.four).to.be(undefined);
        expect(underTest.five).to.be(undefined);
        expect(underTest.six).to.be(undefined);
        expect(underTest.seven).to.be(undefined);
      });

    });

  });

  describe('when loading a folder with nested folders and files (recurse)', function() {
    var underTest;

    before(function() {
      underTest = foldero('../examples/recurse', {
        relative: __dirname,
        recurse: true
      });
    });

    describe('the folded object', function() {

      it('was created', function() {
        expect(underTest).to.be.ok();
      });

      it('has a property for the file ./one.js', function() {
        expect(underTest.one).to.be('this is file one');
      });

      it('has a property for the file ./two.json', function() {
        expect(underTest.two).to.be.an('object');
        expect(underTest.two.this).to.be('is file two');
      });

      it('has a property for the nested directory ./three', function() {
        expect(underTest.three).to.be.an('object');
      });

      it('has a property for the nested file ./three/four.js', function() {
        expect(underTest.three.four).to.be('this is file four');
      });

      it('has a property for the nested file ./three/five.js', function() {
        expect(underTest.three.five).to.be.an('object');
      });

      it('has a property for the nested directory ./three/six', function() {
        expect(underTest.three.six).to.be.an('object');
      });

      it('has a property for the nested file ./three/six/seven.js', function() {
        expect(underTest.three.six.seven).to.be.an('array');
        expect(underTest.three.six.seven[0]).to.be('in subfolder three, subfolder six');
      });

    });

  });
});
