'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var PREFIX_LIST = ['Webkit', 'Moz', 'O', 'ms'];

var generatePrefixStyle = exports.generatePrefixStyle = function generatePrefixStyle(name, value) {
  if (!name) {
    return null;
  }

  var camelName = name.replace(/(\w)/, function (v) {
    return v.toUpperCase();
  });
  var result = PREFIX_LIST.reduce(function (res, entry) {
    res[entry + camelName] = value;

    return res;
  }, {});

  result[name] = value;

  return result;
};