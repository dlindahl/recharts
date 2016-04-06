'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAnyElementOfObject = exports.getBandSizeOfScale = exports.validateCoordinateInRange = exports.parseSpecifiedDomain = exports.getPercentValue = exports.isPercent = undefined;

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var isPercent = exports.isPercent = function isPercent(value) {
  return (0, _isString3.default)(value) && value.indexOf('%') === value.length - 1;
};

/**
 * Get percent value of a total value
 * @param {Number|String} percent A percent
 * @param {Number} totalValue     Total value
 * @param {NUmber} defaultValue   The value returned when percent is undefined or invalid
 * @return {Number} value
 */
var getPercentValue = exports.getPercentValue = function getPercentValue(percent, totalValue) {
  var defaultValue = arguments.length <= 2 || arguments[2] === undefined ? 0 : arguments[2];
  var validate = arguments.length <= 3 || arguments[3] === undefined ? false : arguments[3];

  if (!(0, _isNumber3.default)(percent) && !(0, _isString3.default)(percent)) {
    return defaultValue;
  }

  var value = void 0;

  if (isPercent(percent)) {
    var index = percent.indexOf('%');
    value = totalValue * parseFloat(percent.slice(0, index)) / 100;
  } else {
    value = +percent;
  }

  if (isNaN(value)) {
    value = defaultValue;
  }

  if (validate && value > totalValue) {
    value = totalValue;
  }

  return value;
};

var parseSpecifiedDomain = exports.parseSpecifiedDomain = function parseSpecifiedDomain(specifiedDomain, dataDomain) {
  if (!(0, _isArray3.default)(specifiedDomain)) {
    return dataDomain;
  }

  var domain = [];

  if (!(0, _isNumber3.default)(specifiedDomain[0]) || specifiedDomain[0] > dataDomain[0]) {
    domain[0] = dataDomain[0];
  } else {
    domain[0] = specifiedDomain[0];
  }

  if (!(0, _isNumber3.default)(specifiedDomain[1]) || specifiedDomain[1] < dataDomain[1]) {
    domain[1] = dataDomain[1];
  } else {
    domain[1] = specifiedDomain[1];
  }

  return domain;
};

var validateCoordinateInRange = exports.validateCoordinateInRange = function validateCoordinateInRange(coordinate, scale) {
  if (!scale) {
    return false;
  }

  var range = scale.range();
  var first = range[0];
  var last = range[range.length - 1];
  var isValidate = first <= last ? coordinate >= first && coordinate <= last : coordinate >= last && coordinate <= first;

  return isValidate;
};

/**
 * Calculate the size between two category
 * @param  {Function} scale Scale function
 * @return {Number} Size
 */
var getBandSizeOfScale = exports.getBandSizeOfScale = function getBandSizeOfScale(scale) {
  if (scale && scale.bandwidth) {
    return scale.bandwidth();
  }
  return 0;
};

var getAnyElementOfObject = exports.getAnyElementOfObject = function getAnyElementOfObject(obj) {
  if (!obj) {
    return null;
  }

  var keys = Object.keys(obj);

  if (keys && keys.length) {
    return obj[keys[0]];
  }

  return null;
};