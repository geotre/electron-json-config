'use strict';

const m = require('mochainon');
const config = require('../src/index.js');

beforeEach(config.purge);

it('.set() and .get() a null', function(done) {
  config.set('foo', null);
  var res = config.get('foo');
  m.chai.expect(res).to.be.a('null');
  m.chai.expect(res).to.equals(null);
  done();
});

it('deep .set() and deep .get() a null', function(done) {
  config.set('foo.bar', null);
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.a('null');
  m.chai.expect(res).to.equals(null);
  done();
});

it('.set() and .get() an undefined', function(done) {
  config.set('foo', undefined);
  var res = config.get('foo');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.equals(undefined);
  done();
});

it('deep .set() and deep .get() an undefined', function(done) {
  config.set('foo.bar', undefined);
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.equals(undefined);
  done();
});

it('.set() and .get() a boolean', function(done) {
  config.set('foo', true);
  var res = config.get('foo');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  done();
});

it('deep .set() and deep .get() a boolean', function(done) {
  config.set('foo.bar', true);
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  done();
});

it('.set() and .get() a string', function(done) {
  config.set('foo', 'bar');
  var res = config.get('foo');
  m.chai.expect(res).to.be.a('string');
  m.chai.expect(res).to.equals('bar');
  done();
});

it('deep .set() and deep .get() a string', function(done) {
  config.set('foo.bar', 'baz');
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.a('string');
  m.chai.expect(res).to.equals('baz');
  done();
});

it('.set() and .get() a number', function(done) {
  config.set('foo', 1);
  var res = config.get('foo');
  m.chai.expect(res).to.be.a('number');
  m.chai.expect(res).to.equals(1);
  done();
});

it('deep .set() and deep .get() a number', function(done) {
  config.set('foo.bar', 1);
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.a('number');
  m.chai.expect(res).to.equals(1);
  done();
});

it('.set() and .get() an array', function(done) {
  config.set('foo', ['bar', 'baz']);
  var res = config.get('foo');
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('deep .set() and deep .get() an array', function(done) {
  config.set('foo.bar', ['bar', 'baz']);
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('.set() and .get() an object', function(done) {
  config.set('foo', {bar: true, baz: 42});
  var res = config.get('foo');
  m.chai.expect(res).to.be.an('object');
  m.chai.expect(res).to.deep.equals({bar: true, baz: 42});
  done();
});

it('.get() a default value', function(done) {
  m.chai.expect(config.get('foo', 'bar')).to.equals('bar');
  m.chai.expect(config.get('foo', undefined)).to.be.an('undefined');
  m.chai.expect(config.get('foo')).to.be.an('undefined');
  done();
});

it('deep .set() and deep .get() an object', function(done) {
  config.set('foo.bar', {bar: true, baz: 42});
  var res = config.get('foo.bar');
  m.chai.expect(res).to.be.an('object');
  m.chai.expect(res).to.deep.equals({bar: true, baz: 42});
  done();
});

it('deep .set() and deep .get() an object', function(done) {
  //config.set('foo.bar', {bar: true, baz: 42});
  var res = config.get('foo.bar.baz');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.deep.equals(undefined);
  done();
});

it('very deep .set() and very deep .get() an object', function(done) {
  config.set('foo.bar.baz.very.deep', {itsdeep: true});
  var res = config.get('foo.bar.baz.very.deep');
  m.chai.expect(res).to.be.an('object');
  m.chai.expect(res).to.deep.equals({itsdeep: true});
  done();
});

it('.has()', function(done) {
  var res;
  config.set('foo', 'bar');
  res = config.has('foo');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  res = config.has('baz');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(false);
  done();
});

it('deep .has()', function(done) {
  var res;
  config.set('foo.bar', 'baz');
  res = config.has('foo.bar');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  res = config.has('foo.bar.baz');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(false);
  done();
});

it('gets .keys() from top level', function(done) {
  config.set('foo', undefined);
  config.set('bar', undefined);
  config.set('baz', undefined);
  var res = config.keys();
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.have.length(3);
  m.chai.expect(res).to.deep.equals(['foo', 'bar', 'baz']);
  done();
});

it('gets .keys() from a sub level', function(done) {
  config.set('foo.bar', undefined);
  config.set('foo.baz', undefined);
  var res = config.keys('foo');
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.have.length(2);
  m.chai.expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('gets .all()', function(done) {
  config.set('foo', 1);
  config.set('bar', 2);
  config.set('baz', 3);
  var res = config.all();
  m.chai.expect(res).to.be.an('object');
  m.chai.expect(res).to.deep.equals({
    foo: 1,
    bar: 2,
    baz: 3
  });
  done();
});

it('.delete()', function(done) {
  var res;
  config.set('foo', true);
  res = config.get('foo');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  config.delete('foo');
  res = config.get('foo');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.equals(undefined);
  done();
});

it('deep .delete()', function(done) {
  var res;
  config.set('foo.bar', true);
  res = config.get('foo.bar');
  m.chai.expect(res).to.be.a('boolean');
  m.chai.expect(res).to.equals(true);
  config.delete('foo.bar');
  res = config.get('foo.bar');
  m.chai.expect(res).to.be.an('undefined');
  m.chai.expect(res).to.equals(undefined);
  done();
});

it('.purge()', function(done) {
  var res;
  config.set('foo', true);
  config.set('bar', true);
  config.set('baz', true);
  res = config.keys();
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.have.length(3);
  m.chai.expect(res).to.deep.equals(['foo', 'bar', 'baz']);
  config.purge();
  res = config.keys();
  m.chai.expect(res).to.be.an('array');
  m.chai.expect(res).to.have.length(0);
  m.chai.expect(res).to.deep.equals([]);
  done();
});
