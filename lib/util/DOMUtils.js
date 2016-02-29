'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var stringCache = {
  widthCache: {},
  cacheCount: 0
};
var MAX_CACHE_NUM = 2000;
var SPAN_STYLE = {
  position: 'absolute',
  top: '-20000px',
  left: 0,
  padding: 0,
  margin: 0,
  border: 'none',
  whiteSpace: 'pre'
};
var STYLE_LIST = ['minWidth', 'maxWidth', 'width', 'minHeight', 'maxHeight', 'height', 'top', 'left', 'fontSize', 'lineHeight', 'padding', 'margin', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'marginLeft', 'marginRight', 'marginTop', 'marginBottom'];

var autoCompleteStyle = function autoCompleteStyle(name, value) {
  if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
    return value + 'px';
  }

  return value;
};
var camelToMiddleLine = function camelToMiddleLine(text) {
  var strs = text.split('');

  var formatStrs = strs.reduce(function (result, entry) {
    if (entry === entry.toUpperCase()) {
      return [].concat(_toConsumableArray(result), ['-', entry.toLowerCase()]);
    }

    return [].concat(_toConsumableArray(result), [entry]);
  }, []);

  return formatStrs.join('');
};

var getStyleString = exports.getStyleString = function getStyleString(style) {
  var result = '';

  for (var s in style) {
    if (style.hasOwnProperty(s)) {
      result += camelToMiddleLine(s) + ':' + autoCompleteStyle(s, style[s]) + ';';
    }
  }
  return result;
};

var getStringSize = exports.getStringSize = function getStringSize(text) {
  var style = arguments.length <= 1 || arguments[1] === undefined ? {} : arguments[1];

  if (text === undefined || text === null || typeof document === 'undefined') {
    return 0;
  }

  var str = '' + text;
  var styleString = getStyleString(style);
  var cacheKey = str + '-' + styleString;

  if (stringCache.widthCache[cacheKey]) {
    return stringCache.widthCache[cacheKey];
  }

  if (!stringCache.span) {
    var span = document.createElement('span');
    span.setAttribute('style', getStyleString(SPAN_STYLE));
    document.body.appendChild(span);

    stringCache.span = span;
  }

  stringCache.span.setAttribute('style', getStyleString(_extends({}, SPAN_STYLE, style)));
  stringCache.span.textContent = str;

  var rect = stringCache.span.getBoundingClientRect();
  var result = { width: rect.width, height: rect.height };

  stringCache.widthCache[cacheKey] = result;

  if (++stringCache.cacheCount > MAX_CACHE_NUM) {
    stringCache.cacheCount = 0;
    stringCache.widthCache = {};
  }

  return result;
};