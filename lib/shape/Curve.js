'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray = require('lodash/isArray');

var _isArray2 = _interopRequireDefault(_isArray);

var _isNumber = require('lodash/isNumber');

var _isNumber2 = _interopRequireDefault(_isNumber);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Curve
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _d3Shape = require('d3-shape');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var CURVE_FACTORIES = {
  curveLinear: _d3Shape.curveLinear, curveMonotoneX: _d3Shape.curveMonotoneX, curveMonotoneY: _d3Shape.curveMonotoneY, curveStep: _d3Shape.curveStep,
  curveStepAfter: _d3Shape.curveStepAfter, curveStepBefore: _d3Shape.curveStepBefore
};

var Curve = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Curve, _Component);

  function Curve() {
    _classCallCheck(this, Curve);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Curve).apply(this, arguments));
  }

  _createClass(Curve, [{
    key: 'getCurveFactory',
    value: function getCurveFactory(type, layout) {
      var name = 'curve' + type.slice(0, 1).toUpperCase() + type.slice(1);

      if (name === 'curveMonotone' && layout) {
        return CURVE_FACTORIES['' + name + (layout === 'vertical' ? 'Y' : 'X')];
      }
      return CURVE_FACTORIES[name] || _d3Shape.curveLinear;
    }

    /**
     * Calculate the path of curve
     * @return {String} path
     */

  }, {
    key: 'getPath',
    value: function getPath() {
      var _props = this.props;
      var type = _props.type;
      var points = _props.points;
      var baseLine = _props.baseLine;
      var layout = _props.layout;

      var l = (0, _d3Shape.line)().x(function (p) {
        return p.x;
      }).y(function (p) {
        return p.y;
      }).defined(function (p) {
        return p.x === +p.x && p.y === +p.y;
      }).curve(this.getCurveFactory(type, layout));
      var len = points.length;
      var curvePath = l(points);

      if (!curvePath) {
        return '';
      }

      if (layout === 'horizontal' && (0, _isNumber2.default)(baseLine)) {
        curvePath += 'L' + points[len - 1].x + ' ' + baseLine + 'L' + points[0].x + ' ' + baseLine + 'Z';
      } else if (layout === 'vertical' && (0, _isNumber2.default)(baseLine)) {
        curvePath += 'L' + baseLine + ' ' + points[len - 1].y + 'L' + baseLine + ' ' + points[0].y + 'Z';
      } else if ((0, _isArray2.default)(baseLine) && baseLine.length) {
        var revese = baseLine.reduce(function (result, entry) {
          return [entry].concat(_toConsumableArray(result));
        }, []);
        var revesePath = this.fliterMouseToSeg(l(revese) || '');

        curvePath += 'L' + revese[0].x + ' ' + revese[0].y + revesePath + 'Z';
      }

      return curvePath;
    }
  }, {
    key: 'fliterMouseToSeg',
    value: function fliterMouseToSeg(path) {
      var reg = /[CSLHVcslhv]/;
      var res = reg.exec(path);

      if (res && res.length) {
        var index = path.indexOf(res[0]);

        return path.slice(index);
      }

      return path;
    }
  }, {
    key: 'render',
    value: function render() {
      var _props2 = this.props;
      var className = _props2.className;
      var points = _props2.points;
      var type = _props2.type;


      if (!points || !points.length) {
        return null;
      }

      return _react2.default.createElement('path', _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), (0, _ReactUtils.filterEventAttributes)(this.props), {
        className: (0, _classnames2.default)('recharts-curve', className),
        d: this.getPath()
      }));
    }
  }]);

  return Curve;
}(_react.Component), _class2.displayName = 'Curve', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  type: _react.PropTypes.oneOf(['linear', 'monotone', 'step', 'stepBefore', 'stepAfter']),
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  baseLine: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
  points: _react.PropTypes.arrayOf(_react.PropTypes.object)
}), _class2.defaultProps = {
  type: 'linear',
  stroke: '#000',
  fill: 'none',
  strokeWidth: 1,
  strokeDasharray: 'none',
  points: []
}, _temp)) || _class;

exports.default = Curve;