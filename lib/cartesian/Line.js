'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Line
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Line = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Line, _Component);

  function Line(props, ctx) {
    _classCallCheck(this, Line);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Line).call(this, props, ctx));

    _this.handleAnimationEnd = function () {
      _this.setState({ isAnimationFinished: true });
    };

    _this.state = {
      isAnimationFinished: false,
      steps: [],
      totalLength: 0
    };
    return _this;
  }

  _createClass(Line, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      var isAnimationActive = this.props.isAnimationActive;


      if (!isAnimationActive) {
        return;
      }

      var curveDom = (0, _reactDom.findDOMNode)(this.refs.animate);
      var totalLength = curveDom && curveDom.getTotalLength && curveDom.getTotalLength() || 0;

      this.setState({ totalLength: totalLength });
    }
  }, {
    key: 'getStrokeDasharray',
    value: function getStrokeDasharray(length, totalLength, lines) {
      var lineLength = lines.reduce(function (pre, next) {
        return pre + next;
      });

      var count = parseInt(length / lineLength, 10);
      var remainLength = length % lineLength;
      var restLength = totalLength - length;

      var remainLines = [];
      for (var i = 0, sum = 0; true; sum += lines[i], ++i) {
        if (sum + lines[i] > remainLength) {
          remainLines = [].concat(_toConsumableArray(lines.slice(0, i)), [remainLength - sum]);
          break;
        }
      }

      var emptyLines = remainLines.length % 2 === 0 ? [0, restLength] : [restLength];

      return [].concat(_toConsumableArray(this.repeat(lines, count)), _toConsumableArray(remainLines), emptyLines).map(function (line) {
        return line + 'px';
      }).join(', ');
    }
  }, {
    key: 'repeat',
    value: function repeat(lines, count) {
      var linesUnit = lines.length % 2 !== 0 ? [].concat(_toConsumableArray(lines), [0]) : lines;
      var result = [];

      for (var i = 0; i < count; ++i) {
        result = [].concat(_toConsumableArray(result), _toConsumableArray(linesUnit));
      }

      return result;
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _props = this.props;
      var points = _props.points;
      var label = _props.label;

      var lineProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);
      var isLabelElement = _react2.default.isValidElement(label);

      var labels = points.map(function (entry, i) {
        var x = entry.x + entry.width / 2;
        var y = entry.y;
        var labelProps = _extends({
          textAnchor: 'middle'
        }, entry, lineProps, customLabelProps, {
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        return isLabelElement ? _react2.default.cloneElement(label, labelProps) : _react2.default.createElement(
          'text',
          _extends({}, labelProps, { className: 'recharts-line-label' }),
          entry.value
        );
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-line-labels' },
        labels
      );
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      var isAnimationActive = this.props.isAnimationActive;


      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _props2 = this.props;
      var dot = _props2.dot;
      var points = _props2.points;

      var lineProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);
      var isDotElement = _react2.default.isValidElement(dot);

      var dots = points.map(function (entry, i) {
        var dotProps = _extends({
          key: 'dot-' + i,
          r: 3
        }, lineProps, customDotProps, {
          cx: entry.x,
          cy: entry.y,
          index: i,
          payload: entry
        });

        return isDotElement ? _react2.default.cloneElement(dot, dotProps) : _react2.default.createElement(_Dot2.default, _extends({ className: 'recharts-line-dot' }, dotProps));
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-line-dots' },
        dots
      );
    }
  }, {
    key: 'renderCurve',
    value: function renderCurve() {
      var _this2 = this;

      var _props3 = this.props;
      var dot = _props3.dot;
      var points = _props3.points;
      var label = _props3.label;
      var className = _props3.className;
      var isAnimationActive = _props3.isAnimationActive;
      var animationBegin = _props3.animationBegin;
      var animationDuration = _props3.animationDuration;
      var animationEasing = _props3.animationEasing;
      var onClick = _props3.onClick;
      var onMouseEnter = _props3.onMouseEnter;
      var onMouseLeave = _props3.onMouseLeave;
      var strokeDasharray = _props3.strokeDasharray;

      var other = _objectWithoutProperties(_props3, ['dot', 'points', 'label', 'className', 'isAnimationActive', 'animationBegin', 'animationDuration', 'animationEasing', 'onClick', 'onMouseEnter', 'onMouseLeave', 'strokeDasharray']);

      var totalLength = this.state.totalLength;

      var animationProps = {
        isActive: isAnimationActive,
        begin: animationBegin,
        canBegin: totalLength > 0,
        easing: animationEasing,
        duration: animationDuration,
        onAnimationEnd: this.handleAnimationEnd,
        ref: 'animate'
      };
      var curveProps = _extends({}, other, {
        className: 'recharts-line-curve',
        fill: 'none',
        onClick: onClick,
        onMouseEnter: onMouseEnter,
        onMouseLeave: onMouseLeave,
        points: points
      });

      if (strokeDasharray) {
        var _ret = function () {
          var lines = strokeDasharray.split(/[,\s]+/gim).map(function (num) {
            return parseFloat(num);
          });

          return {
            v: _react2.default.createElement(
              _reactSmooth2.default,
              _extends({}, animationProps, {
                from: { length: 0 },
                to: { length: totalLength }
              }),
              function (_ref) {
                var length = _ref.length;
                return _react2.default.createElement(_Curve2.default, _extends({}, curveProps, {
                  strokeDasharray: _this2.getStrokeDasharray(length, totalLength, lines)
                }));
              }
            )
          };
        }();

        if ((typeof _ret === 'undefined' ? 'undefined' : _typeof(_ret)) === "object") return _ret.v;
      }

      return _react2.default.createElement(
        _reactSmooth2.default,
        _extends({}, animationProps, {
          from: '0px ' + (totalLength === 0 ? 1 : totalLength) + 'px',
          to: totalLength + 'px 0px',
          attributeName: 'strokeDasharray'
        }),
        _react2.default.createElement(_Curve2.default, curveProps)
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var dot = _props4.dot;
      var points = _props4.points;
      var label = _props4.label;
      var className = _props4.className;
      var onClick = _props4.onClick;
      var onMouseEnter = _props4.onMouseEnter;
      var onMouseLeave = _props4.onMouseLeave;


      if (!points || !points.length) {
        return null;
      }

      var hasSinglePoint = points.length === 1;
      var layerClass = (0, _classnames2.default)('recharts-line', className);

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        !hasSinglePoint && this.renderCurve(),
        (hasSinglePoint || dot) && this.renderDots(),
        label && this.renderLabels()
      );
    }
  }]);

  return Line;
}(_react.Component), _class2.displayName = 'Line', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  type: _react.PropTypes.oneOf(['linear', 'monotone', 'step', 'stepBefore', 'stepAfter']),
  unit: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  yAxisId: _react.PropTypes.number,
  xAxisId: _react.PropTypes.number,
  legendType: _react.PropTypes.string,
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),

  // whether have dot in line
  dot: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.element, _react.PropTypes.bool]),
  label: _react.PropTypes.oneOfType([_react.PropTypes.object, _react.PropTypes.element, _react.PropTypes.bool]),

  points: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    value: _react.PropTypes.value
  })),
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onClick: _react.PropTypes.func,
  isAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  xAxisId: 0,
  yAxisId: 0,
  dot: true,
  legendType: 'line',
  stroke: '#3182bd',
  strokeWidth: 1,
  fill: '#fff',
  points: [],
  onClick: function onClick() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},

  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp)) || _class;

exports.default = Line;