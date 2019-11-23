'use strict';

const { expect } = require('chai');
const u = require('../src/utils.js');
const fs = require('fs');
const path = require('path');
const electron = require('electron');
const userDataPath = (electron.app || electron.remote.app).getPath('userData');

it('returns false on exists() when file does not exists', function(done) {
  const res = u.exists(path.join(userDataPath, 'aFileNotHere.txt'));
  expect(res).to.be.a('boolean');
  expect(res).to.equals(false);
  done();
});

it('returns true on exists() when file does exists', function(done) {
  const testPath = path.join(userDataPath, 'aFileThatExists.txt');
  fs.writeFileSync(testPath, '');
  const res = u.exists(testPath);
  expect(res).to.be.a('boolean');
  expect(res).to.equals(true);
  done();
});

it('syncs data in file', function(done) {
  const item = { text: 'sometext' };
  const testPath = path.join(userDataPath, 'aFile.json');
  u.sync(testPath, item);
  const res = fs.readFileSync(testPath).toString();
  expect(res).to.be.a('string');
  expect(res).to.equals('{"text":"sometext"}');
  done();
});

it('returns a deep setted item', function(done) {
  const item = {
    foo: { bar: 'baz' },
  };
  const res = u.search(item, 'foo.bar');
  expect(res).to.be.a('string');
  expect(res).to.equals('baz');
  done();
});

it('returns undefined for a non existing item', function(done) {
  const item = {
    foo: { bar: 'baz' },
  };
  const res = u.search(item, 'foo.baz');
  expect(res).to.be.an('undefined');
  expect(res).to.equals(undefined);
  done();
});

it('deep sets a string', function(done) {
  const item = {};
  u.set(item, 'foo.bar')('baz');
  expect(item.foo.bar).to.be.a('string');
  expect(item.foo.bar).to.equals('baz');
  done();
});

it('removes a deep setted item', function(done) {
  const item = {
    foo: { bar: 'baz' },
  };
  u.remove(item, 'foo.bar')();
  expect(item.foo.bar).to.be.an('undefined');
  expect(item.foo.bar).to.equals(undefined);
  done();
});
