'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isSsr = exports.validateWidthHeight = exports.filterEventAttributes = exports.getPresentationAttributes = exports.withoutType = exports.findChildByType = exports.findAllByType = exports.getDisplayName = exports.PRESENTATION_ATTRIBUTES = undefined;

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PRESENTATION_ATTRIBUTES = exports.PRESENTATION_ATTRIBUTES = {
  alignmentBaseline: _react.PropTypes.string,
  baselineShift: _react.PropTypes.string,
  clip: _react.PropTypes.string,
  clipPath: _react.PropTypes.string,
  clipRule: _react.PropTypes.string,
  color: _react.PropTypes.string,
  colorInterpolation: _react.PropTypes.string,
  colorInterpolationFilters: _react.PropTypes.string,
  colorProfile: _react.PropTypes.string,
  colorRendering: _react.PropTypes.string,
  cursor: _react.PropTypes.string,
  direction: _react.PropTypes.oneOf(['ltr', 'rtl', 'inherit']),
  display: _react.PropTypes.string,
  dominantBaseline: _react.PropTypes.string,
  enableBackground: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  fillOpacity: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  fillRule: _react.PropTypes.oneOf(['nonzero', 'evenodd', 'inherit']),
  filter: _react.PropTypes.string,
  floodColor: _react.PropTypes.string,
  floodOpacity: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  font: _react.PropTypes.string,
  fontFamily: _react.PropTypes.string,
  fontSize: _react.PropTypes.number,
  fontSizeAdjust: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  fontStretch: _react.PropTypes.oneOf(['normal', 'wider', 'narrower', 'ultra-condensed', 'extra-condensed', 'condensed', 'semi-condensed', 'semi-expanded', 'expanded', 'extra-expanded', 'ultra-expanded', 'inherit']),
  fontStyle: _react.PropTypes.oneOf(['normal', 'italic', 'oblique', 'inherit']),
  fontVariant: _react.PropTypes.oneOf(['normal', 'small-caps', 'inherit']),
  fontWeight: _react.PropTypes.oneOf(['normal', 'bold', 'bolder', 'lighter', 100, 200, 300, 400, 500, 600, 700, 800, 900, 'inherit']),
  glyphOrientationHorizontal: _react.PropTypes.string,
  glyphOrientationVertical: _react.PropTypes.string,
  imageRendering: _react.PropTypes.oneOf(['auto', 'optimizeSpeed', 'optimizeQuality', 'inherit']),
  kerning: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  letterSpacing: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  lightingColor: _react.PropTypes.string,
  markerEnd: _react.PropTypes.string,
  markerMid: _react.PropTypes.string,
  markerStart: _react.PropTypes.string,
  mask: _react.PropTypes.string,
  opacity: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  overflow: _react.PropTypes.oneOf(['visible', 'hidden', 'scroll', 'auto', 'inherit']),
  pointerEvents: _react.PropTypes.oneOf(['visiblePainted', 'visibleFill', 'visibleStroke', 'visible', 'painted', 'fill', 'stroke', 'all', 'none', 'inherit']),
  shapeRendering: _react.PropTypes.oneOf(['auto', 'optimizeSpeed', 'crispEdges', 'geometricPrecision', 'inherit']),
  stopColor: _react.PropTypes.string,
  stopOpacity: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  stroke: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  strokeDasharray: _react.PropTypes.string,
  strokeDashoffset: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  strokeLinecap: _react.PropTypes.oneOf(['butt', 'round', 'square', 'inherit']),
  strokeLinejoin: _react.PropTypes.oneOf(['miter', 'round', 'bevel', 'inherit']),
  strokeMiterlimit: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  strokeOpacity: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  strokeWidth: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  textAnchor: _react.PropTypes.oneOf(['start', 'middle', 'end', 'inherit']),
  textDecoration: _react.PropTypes.oneOf(['none', 'underline', 'overline', 'line-through', 'blink', 'inherit']),
  textRendering: _react.PropTypes.oneOf(['auto', 'optimizeSpeed', 'optimizeLegibility', 'geometricPrecision', 'inherit']),
  unicodeBidi: _react.PropTypes.oneOf(['normal', 'embed', 'bidi-override', 'inherit']),
  visibility: _react.PropTypes.oneOf(['visible', 'hidden', 'collapse', 'inherit']),
  wordSpacing: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  writingMode: _react.PropTypes.oneOf(['lr-tb', 'rl-tb', 'tb-rl', 'lr', 'rl', 'tb', 'inherit']),
  transform: _react.PropTypes.string,
  style: _react.PropTypes.object
};

var EVENT_ATTRIBUTES = {
  onClick: _react.PropTypes.func,
  onMouseDown: _react.PropTypes.func,
  onMouseUp: _react.PropTypes.func,
  onMouseOver: _react.PropTypes.func,
  onMouseMove: _react.PropTypes.func,
  onMouseOut: _react.PropTypes.func,
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func
};

var getDisplayName = exports.getDisplayName = function getDisplayName(Comp) {
  if (!Comp) {
    return '';
  }
  if (typeof Comp === 'string') {
    return Comp;
  }
  return Comp.displayName || Comp.name || 'Component';
};

/*
 * Find and return all matched children by type. `type` can be a React element class or
 * string
 */
var findAllByType = exports.findAllByType = function findAllByType(children, type) {
  var result = [];
  var types = [];

  if ((0, _isArray3.default)(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }

  _react2.default.Children.forEach(children, function (child) {
    var childType = child && child.type && (child.type.displayName || child.type.name);
    if (types.indexOf(childType) !== -1) {
      result.push(child);
    }
  });

  return result;
};
/*
 * Return the first matched child by type, return null otherwise.
 * `type` can be a React element class or string.
 */
var findChildByType = exports.findChildByType = function findChildByType(children, type) {
  var result = findAllByType(children, type);

  return result && result[0];
};

/*
 * Create a new array of children excluding the ones matched the type
 */
var withoutType = exports.withoutType = function withoutType(children, type) {
  var newChildren = [];
  var types = void 0;

  if ((0, _isArray3.default)(type)) {
    types = type.map(function (t) {
      return getDisplayName(t);
    });
  } else {
    types = [getDisplayName(type)];
  }

  _react2.default.Children.forEach(children, function (child) {
    if (child && child.type && child.type.displayName && types.indexOf(child.type.displayName) !== -1) {
      return;
    }
    newChildren.push(child);
  });

  return newChildren;
};

/**
 * get all the presentation attribute of svg element
 * @param  {Object} el A react element or the props of a react element
 * @return {Object}    attributes or null
 */
var getPresentationAttributes = exports.getPresentationAttributes = function getPresentationAttributes(el) {
  if (!el || (0, _isFunction3.default)(el)) {
    return null;
  }

  var props = _react2.default.isValidElement(el) ? el.props : el;
  var result = null;

  for (var key in props) {
    if (props.hasOwnProperty(key) && PRESENTATION_ATTRIBUTES[key]) {
      if (!result) {
        result = {};
      }
      result[key] = props[key];
    }
  }

  return result;
};

/**
 * get all the event attribute of svg element
 * @param  {Object} el A react element or the props of a react element
 * @return {Object}    attributes or null
 */
var filterEventAttributes = exports.filterEventAttributes = function filterEventAttributes(el) {
  if (!el || (0, _isFunction3.default)(el)) {
    return null;
  }

  var props = _react2.default.isValidElement(el) ? el.props : el;
  var result = null;

  for (var key in props) {
    if (props.hasOwnProperty(key) && EVENT_ATTRIBUTES[key]) {
      if (!result) {
        result = {};
      }
      result[key] = props[key];
    }
  }

  return result;
};

/**
 * validate the width and height props of a chart element
 * @param  {Object} el A chart element
 * @return {Boolean}   true If the props width and height are number, and greater than 0
 */
var validateWidthHeight = exports.validateWidthHeight = function validateWidthHeight(el) {
  if (!el || !el.props) {
    return false;
  }
  var _el$props = el.props;
  var width = _el$props.width;
  var height = _el$props.height;


  if (!(0, _isNumber3.default)(width) || width <= 0 || !(0, _isNumber3.default)(height) || height <= 0) {
    return false;
  }

  return true;
};

var isSsr = exports.isSsr = function isSsr() {
  return typeof document === 'undefined';
};