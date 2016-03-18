'use strict';

const fs = require('fs');
const exists = require('exists-file');
const electron = require('electron');
const file = (electron.app || electron.remote.app).getPath('userData')+'/config.json';

if(!exists(file)) {
  fs.writeFileSync(file, '{}');
}
var config = require(file);

const sync = function() {
  fs.writeFileSync(file, JSON.stringify(config));
};

exports.file = function() {
  return file;
};

exports.has = function(key) {
  return config.hasOwnProperty(key);
};

exports.set = function(key, value) {
  config[key] = value;
  sync();
};

exports.get = function(key)  {
  return config[key];
};

exports.keys = function() {
  return Object.keys(config);
};

exports.all = function() {
  return config;
};

exports.delete = function(key) {
  delete config[key];
  sync();
};

exports.purge = function() {
  config = {};
  sync();
};
