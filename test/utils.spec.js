'use strict';

const m = require('mochainon');
const u = require('../src/utils.js');
const fs = require('fs');
const electron = require('electron');
const path = (electron.app || electron.remote.app).getPath('userData');

it('returns false on exists() when file does not exists', function(done) {
  var res = u.exists(path + '/aFileNotHere.txt');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(false);
  done();
});

it('returns true on exists() when file does exists', function(done) {
  fs.writeFileSync(path + '/aFileThatExists.txt', '');
  var res = u.exists(path + '/aFileThatExists.txt');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  done();
});

it('syncs data in file', function(done) {
  var item = {
    text: 'sometext'
  };
  u.sync(path + '/aFile.json', item);
  var res = fs.readFileSync(path + '/aFile.json').toString();
  m.chai.expect(res).to.be.a('string');
  m.chai.expect(res).to.equals('{"text":"sometext"}');
  done();
});

it('returns a deep setted item', function(done) {
  var item = {
    foo: {
      bar: 'baz'
    }
  };
  var res = u.search(item, 'foo.bar');
  m.chai.expect(res).to.be.a('string');
  m.chai.expect(res).to.equals('baz');
  done();
});

it('returns undefined for a non existing item', function(done) {
  var item = {
    foo: {
      bar: 'baz'
    }
  };
  var res = u.search(item, 'foo.baz');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.equals(undefined);
  done();
});

it('deep sets a string', function(done) {
  var item = {};
  u.set(item, 'foo.bar')('baz');
  m.chai.expect(item.foo.bar).to.be.a('string');
  m.chai.expect(item.foo.bar).to.equals('baz');
  done();
});

it('removes a deep setted item', function(done) {
  var item = {
    foo: {
      bar: 'baz'
    }
  };
  u.remove(item, 'foo.bar')();
  m.chai.expect(item.foo.bar).to.be.an('undefined');
  m.chai.expect(item.foo.bar).to.equals(undefined);
  done();
});
