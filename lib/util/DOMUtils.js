'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getOffset = exports.getHeight = exports.getWidth = exports.getStringSize = exports.getStyleString = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ReactUtils = require('./ReactUtils');

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

function autoCompleteStyle(name, value) {
  if (STYLE_LIST.indexOf(name) >= 0 && value === +value) {
    return value + 'px';
  }

  return value;
}

function camelToMiddleLine(text) {
  var strs = text.split('');

  var formatStrs = strs.reduce(function (result, entry) {
    if (entry === entry.toUpperCase()) {
      return [].concat(_toConsumableArray(result), ['-', entry.toLowerCase()]);
    }

    return [].concat(_toConsumableArray(result), [entry]);
  }, []);

  return formatStrs.join('');
}

function getComputedStyles(el) {
  return el.ownerDocument.defaultView.getComputedStyle(el, null);
}

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

  if (text === undefined || text === null || (0, _ReactUtils.isSsr)()) {
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

var getWidth = exports.getWidth = function getWidth(el) {
  var styles = getComputedStyles(el);
  var width = parseFloat(styles.width.indexOf('px') !== -1 ? styles.width : 0);

  var boxSizing = styles.boxSizing || 'content-box';
  if (boxSizing === 'border-box') {
    return width;
  }

  var borderLeftWidth = parseFloat(styles.borderLeftWidth);
  var borderRightWidth = parseFloat(styles.borderRightWidth);
  var paddingLeft = parseFloat(styles.paddingLeft);
  var paddingRight = parseFloat(styles.paddingRight);
  return width - borderRightWidth - borderLeftWidth - paddingLeft - paddingRight;
};

var getHeight = exports.getHeight = function getHeight(el) {
  var styles = getComputedStyles(el);
  var height = parseFloat(styles.height.indexOf('px') !== -1 ? styles.height : 0);

  var boxSizing = styles.boxSizing || 'content-box';
  if (boxSizing === 'border-box') {
    return height;
  }

  var borderTopWidth = parseFloat(styles.borderTopWidth);
  var borderBottomWidth = parseFloat(styles.borderBottomWidth);
  var paddingTop = parseFloat(styles.paddingTop);
  var paddingBottom = parseFloat(styles.paddingBottom);
  return height - borderBottomWidth - borderTopWidth - paddingTop - paddingBottom;
};

var getOffset = exports.getOffset = function getOffset(el) {
  var html = el.ownerDocument.documentElement;
  var box = { top: 0, left: 0 };

  // If we don't have gBCR, just use 0,0 rather than error
  // BlackBerry 5, iOS 3 (original iPhone)
  if (typeof el.getBoundingClientRect !== 'undefined') {
    box = el.getBoundingClientRect();
  }

  return {
    top: box.top + window.pageYOffset - html.clientTop,
    left: box.left + window.pageXOffset - html.clientLeft
  };
};