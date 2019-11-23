'use strict';

const { expect } = require('chai');
const config = require('../src/index.js');


beforeEach(function() {
  config.purge();
});


it('.set() and .get() a null', function(done) {
  config.set('foo', null);
  const res = config.get('foo');
  expect(res).to.be.a('null');
  expect(res).to.equals(null);
  done();
});

it('deep .set() and deep .get() a null', function(done) {
  config.set('foo.bar', null);
  const res = config.get('foo.bar');
  expect(res).to.be.a('null');
  expect(res).to.equals(null);
  done();
});

it('.set() and .get() an undefined', function(done) {
  config.set('foo', undefined);
  const res = config.get('foo');
  expect(res).to.be.an('undefined');
  expect(res).to.equals(undefined);
  done();
});

it('deep .set() and deep .get() an undefined', function(done) {
  config.set('foo.bar', undefined);
  const res = config.get('foo.bar');
  expect(res).to.be.an('undefined');
  expect(res).to.equals(undefined);
  done();
});

it('.set() and .get() a boolean', function(done) {
  config.set('foo', true);
  const res = config.get('foo');
  expect(res).to.be.a('boolean');
  expect(res).to.equals(true);
  done();
});

it('deep .set() and deep .get() a boolean', function(done) {
  config.set('foo.bar', true);
  const res = config.get('foo.bar');
  expect(res).to.be.a('boolean');
  expect(res).to.equals(true);
  done();
});

it('.set() and .get() a string', function(done) {
  config.set('foo', 'bar');
  const res = config.get('foo');
  expect(res).to.be.a('string');
  expect(res).to.equals('bar');
  done();
});

it('deep .set() and deep .get() a string', function(done) {
  config.set('foo.bar', 'baz');
  const res = config.get('foo.bar');
  expect(res).to.be.a('string');
  expect(res).to.equals('baz');
  done();
});

it('.set() and .get() a number', function(done) {
  config.set('foo', 1);
  const res = config.get('foo');
  expect(res).to.be.a('number');
  expect(res).to.equals(1);
  done();
});

it('deep .set() and deep .get() a number', function(done) {
  config.set('foo.bar', 1);
  const res = config.get('foo.bar');
  expect(res).to.be.a('number');
  expect(res).to.equals(1);
  done();
});

it('.set() and .get() an array', function(done) {
  config.set('foo', ['bar', 'baz']);
  const res = config.get('foo');
  expect(res).to.be.an('array');
  expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('deep .set() and deep .get() an array', function(done) {
  config.set('foo.bar', ['bar', 'baz']);
  const res = config.get('foo.bar');
  expect(res).to.be.an('array');
  expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('.set() and .get() an object', function(done) {
  config.set('foo', {bar: true, baz: 42});
  const res = config.get('foo');
  expect(res).to.be.an('object');
  expect(res).to.deep.equals({bar: true, baz: 42});
  done();
});

it('.get() a default value', function(done) {
  expect(config.get('foo', 'bar')).to.equals('bar');
  expect(config.get('foo', undefined)).to.be.an('undefined');
  expect(config.get('foo')).to.be.an('undefined');
  done();
});

it('deep .set() and deep .get() an object', function(done) {
  config.set('foo.bar', {bar: true, baz: 42});
  const res = config.get('foo.bar');
  expect(res).to.be.an('object');
  expect(res).to.deep.equals({bar: true, baz: 42});
  done();
});

it('deep .get() an undefined', function(done) {
  const res = config.get('foo.bar.baz');
  expect(res).to.be.an('undefined');
  expect(res).to.deep.equals(undefined);
  done();
});

it('very deep .set() and very deep .get() an object', function(done) {
  config.set('foo.bar.baz.very.deep', {itsdeep: true});
  const res = config.get('foo.bar.baz.very.deep');
  expect(res).to.be.an('object');
  expect(res).to.deep.equals({itsdeep: true});
  done();
});

it('.has()', function(done) {
  config.set('foo', 'bar');
  
  const resFoo = config.has('foo');
  expect(resFoo).to.be.a('boolean');
  expect(resFoo).to.equals(true);

  const resBaz = config.has('baz');
  expect(resBaz).to.be.a('boolean');
  expect(resBaz).to.equals(false);
  done();
});

it('deep .has()', function(done) {
  config.set('foo.bar', 'baz');
  
  const resFooBar = config.has('foo.bar');
  expect(resFooBar).to.be.a('boolean');
  expect(resFooBar).to.equals(true);

  const resFooBarBaz = config.has('foo.bar.baz');
  expect(resFooBarBaz).to.be.a('boolean');
  expect(resFooBarBaz).to.equals(false);
  done();
});

it('gets .keys() from top level', function(done) {
  config.set('foo', undefined);
  config.set('bar', undefined);
  config.set('baz', undefined);

  const res = config.keys();
  expect(res).to.be.an('array');
  expect(res).to.have.length(3);
  expect(res).to.deep.equals(['foo', 'bar', 'baz']);
  done();
});

it('gets .keys() from a sub level', function(done) {
  config.set('foo.bar', undefined);
  config.set('foo.baz', undefined);
  
  const res = config.keys('foo');
  expect(res).to.be.an('array');
  expect(res).to.have.length(2);
  expect(res).to.deep.equals(['bar', 'baz']);
  done();
});

it('gets .all()', function(done) {
  config.set('foo', 1);
  config.set('bar', 2);
  config.set('baz', 3);
  
  const res = config.all();
  expect(res).to.be.an('object');
  expect(res).to.deep.equals({
    foo: 1,
    bar: 2,
    baz: 3,
  });
  done();
});

it('.delete()', function(done) {
  config.set('foo', true);
  const resSet = config.get('foo');
  expect(resSet).to.be.a('boolean');
  expect(resSet).to.equals(true);
  
  config.delete('foo');
  const resDel = config.get('foo');
  expect(resDel).to.be.an('undefined');
  expect(resDel).to.equals(undefined);
  done();
});

it('deep .delete()', function(done) {
  config.set('foo.bar', true);
  const resSet = config.get('foo.bar');
  expect(resSet).to.be.a('boolean');
  expect(resSet).to.equals(true);

  config.delete('foo.bar');
  const resDel = config.get('foo.bar');
  expect(resDel).to.be.an('undefined');
  expect(resDel).to.equals(undefined);
  done();
});

it('.purge()', function(done) {
  config.set('foo', true);
  config.set('bar', true);
  config.set('baz', true);
  const resSet = config.keys();
  expect(resSet).to.be.an('array');
  expect(resSet).to.have.length(3);
  expect(resSet).to.deep.equals(['foo', 'bar', 'baz']);

  config.purge();
  const resKeys = config.keys();
  expect(resKeys).to.be.an('array');
  expect(resKeys).to.have.length(0);
  expect(resKeys).to.deep.equals([]);
  done();
});


it('.setBulk() multiple values in a single call and .get() them', function(done) {
  config.setBulk({
    a_boolean: true,
    a_string: 'foo bar',
    an_int: 42,
    an_array: ['foo', 'bar'],
    'an.object': {
      foo: 'bar',
      theAnswer: 42,
    },
  });

  const keys = config.keys();
  expect(keys).to.have.length(5);
  expect(keys).to.deep.equals([
    'a_boolean',
    'a_string',
    'an_int',
    'an_array',
    'an',
  ]);

  const deepSettedObject = config.get('an');
  expect(deepSettedObject).to.deep.equals({
    object: {
      foo: 'bar',
      theAnswer: 42,
    },
  });

  const all = config.all();
  expect(all).to.deep.equals({
    a_boolean: true,
    a_string: 'foo bar',
    an_int: 42,
    an_array: ['foo', 'bar'],
    an: {
      object: {
        foo: 'bar',
        theAnswer: 42,
      },
    },
  });

  done();
});

it('.deleteBulk multiple values in a single call', function(done) {
  config.setBulk({
    a_boolean: true,
    a_string: 'foo bar',
    an_int: 42,
    an_array: ['foo', 'bar'],
    'an.object': {
      foo: 'bar',
      theAnswer: 42,
    },
  });

  config.deleteBulk([
    'a_boolean',
    'an_int',
    'an.object.theAnswer',
  ]);

  const keys = config.keys();
  expect(keys).to.have.length(3);
  expect(keys).to.deep.equals([
    'a_string',
    'an_array',
    'an',
  ]);

  const all = config.all();
  expect(all).to.deep.equals({
    a_string: 'foo bar',
    an_array: ['foo', 'bar'],
    an: {
      object: {
        foo: 'bar',
      },
    },
  });

  const foo = config.get('an.object.foo');
  expect(foo).to.equals('bar');

  done();
});
