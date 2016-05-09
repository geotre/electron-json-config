'use strict';

const fs = require('fs');
const exists = require('exists-file');
const electron = require('electron');
const file = (electron.app || electron.remote.app).getPath('userData')+'/config.json';

if(!exists.sync(file)) {
  fs.writeFileSync(file, '{}');
}
var config = require(file);

const sync = function() {
  fs.writeFileSync(file, JSON.stringify(config));
};

const search = function(object, key) {
  let path = key.split('.');
  for(let i = 0; i < path.length; i++) {
    if(object[path[i]] === undefined) {
      return undefined;
    }
    object = object[path[i]];
  }
  return object;
};

const set = function(object, key) {
  let path = key.split('.');
  for(var i = 0; i < path.length - 1; ++i) {
    if(!object[path[i]]) {
      object[path[i]] = {};
    }
    object = object[path[i]];
  }
  return function(object, attribute) {
    return function(value) { object[attribute] = value; };
  } (object, path[i]);
};

const remove = function(object, key) {
  let path = key.split('.');
  for(var i = 0; i < path.length - 1; ++i) {
    if(!object[path[i]]) {
      object[path[i]] = {};
    }
    object = object[path[i]];
  }
  return function(object, attribute) {
    return function() { delete object[attribute]; };
  } (object, path[i]);
};

exports.file = function() {
  return file;
};

exports.has = function(key) {
  return search(config, key) !== undefined;
};

exports.set = function(key, value) {
  set(config, key)(value);
  sync();
};

exports.get = function(key)  {
  return search(config, key);
};

exports.keys = function(key) {
  return Object.keys((key) ? search(config, key) : config);
};

exports.all = function() {
  return config;
};

exports.delete = function(key) {
  remove(config, key)();
  sync();
};

exports.purge = function() {
  config = {};
  sync();
};
