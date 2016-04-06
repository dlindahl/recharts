'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Area
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Area = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Area, _Component);

  function Area() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Area);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Area)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isAnimationFinished: false
    }, _this.handleAnimationEnd = function () {
      _this.setState({ isAnimationFinished: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Area, [{
    key: 'renderCurve',
    value: function renderCurve(points, opacity) {
      var _props = this.props;
      var layout = _props.layout;
      var type = _props.type;
      var curve = _props.curve;

      var animProps = {
        points: this.props.points
      };

      if (points) {
        animProps = {
          points: points,
          opacity: opacity
        };
      }

      return _react2.default.createElement(
        'g',
        null,
        curve && _react2.default.createElement(_Curve2.default, _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), {
          className: 'recharts-area-curve',
          layout: layout,
          type: type,
          fill: 'none'
        }, animProps)),
        _react2.default.createElement(_Curve2.default, _extends({}, this.props, {
          stroke: 'none',
          className: 'recharts-area-area'
        }, animProps))
      );
    }
  }, {
    key: 'renderAreaCurve',
    value: function renderAreaCurve() {
      var _this2 = this;

      var _props2 = this.props;
      var points = _props2.points;
      var type = _props2.type;
      var layout = _props2.layout;
      var baseLine = _props2.baseLine;
      var curve = _props2.curve;
      var isAnimationActive = _props2.isAnimationActive;
      var animationBegin = _props2.animationBegin;
      var animationDuration = _props2.animationDuration;
      var animationEasing = _props2.animationEasing;


      if (points.length === 1) {
        return null;
      }

      var animationProps = {
        isActive: isAnimationActive,
        begin: animationBegin,
        easing: animationEasing,
        duration: animationDuration,
        onAnimationEnd: this.handleAnimationEnd
      };

      if (!baseLine || !baseLine.length) {
        var transformOrigin = layout === 'vertical' ? 'left center' : 'center bottom';
        var scaleType = layout === 'vertical' ? 'scaleX' : 'scaleY';

        return _react2.default.createElement(
          _reactSmooth2.default,
          _extends({ attributeName: 'transform',
            from: scaleType + '(0)',
            to: scaleType + '(1)'
          }, animationProps),
          _react2.default.createElement(
            'g',
            { style: { transformOrigin: transformOrigin } },
            this.renderCurve()
          )
        );
      }

      return _react2.default.createElement(
        _reactSmooth2.default,
        _extends({ from: { alpha: 0 },
          to: { alpha: 1 }
        }, animationProps),
        function (_ref) {
          var alpha = _ref.alpha;
          return _this2.renderCurve(points.map(function (_ref2, i) {
            var x = _ref2.x;
            var y = _ref2.y;
            return {
              x: x,
              y: (y - baseLine[i].y) * alpha + baseLine[i].y
            };
          }), +(alpha > 0));
        }
      );
    }
  }, {
    key: 'renderDotItem',
    value: function renderDotItem(option, props) {
      var dotItem = void 0;

      if (_react2.default.isValidElement(option)) {
        dotItem = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        dotItem = option(props);
      } else {
        dotItem = _react2.default.createElement(_Dot2.default, _extends({}, props, { className: 'recharts-area-dot' }));
      }

      return dotItem;
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      var _this3 = this;

      var isAnimationActive = this.props.isAnimationActive;


      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _props3 = this.props;
      var dot = _props3.dot;
      var points = _props3.points;

      var areaProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);

      var dots = points.map(function (entry, i) {
        var dotProps = _extends({
          key: 'dot-' + i,
          r: 3
        }, areaProps, customDotProps, {
          cx: entry.x,
          cy: entry.y,
          index: i,
          playload: entry
        });

        return _this3.renderDotItem(dot, dotProps);
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-area-dots' },
        dots
      );
    }
  }, {
    key: 'renderLabelItem',
    value: function renderLabelItem(option, props, value) {
      var labelItem = void 0;

      if (_react2.default.isValidElement(option)) {
        labelItem = _react2.default.cloneElement(option, props);
      } else if ((0, _isFunction3.default)(option)) {
        labelItem = option(props);
      } else {
        labelItem = _react2.default.createElement(
          'text',
          _extends({}, props, { className: 'recharts-area-label' }),
          (0, _isArray3.default)(value) ? value[1] : value
        );
      }

      return labelItem;
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _this4 = this;

      var isAnimationActive = this.props.isAnimationActive;


      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }
      var _props4 = this.props;
      var points = _props4.points;
      var label = _props4.label;

      var areaProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);

      var labels = points.map(function (entry, i) {
        var labelProps = _extends({
          textAnchor: 'middle'
        }, entry, areaProps, customLabelProps, {
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        return _this4.renderLabelItem(label, labelProps, entry.value);
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-area-labels' },
        labels
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var dot = _props5.dot;
      var label = _props5.label;
      var points = _props5.points;
      var className = _props5.className;


      if (!points || !points.length) {
        return null;
      }

      var hasSinglePoint = points.length === 1;
      var layerClass = (0, _classnames2.default)('recharts-area', className);

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        this.renderAreaCurve(),
        (dot || hasSinglePoint) && this.renderDots(),
        label && this.renderLabels()
      );
    }
  }]);

  return Area;
}(_react.Component), _class2.displayName = 'Area', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  type: _react.PropTypes.oneOf(['linear', 'monotone', 'step', 'stepBefore', 'stepAfter']),
  unit: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  yAxisId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  xAxisId: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  stackId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  legendType: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  // dot configuration
  dot: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.element, _react.PropTypes.object, _react.PropTypes.bool]),
  label: _react.PropTypes.oneOfType([_react.PropTypes.func, _react.PropTypes.element, _react.PropTypes.object, _react.PropTypes.bool]),
  // have curve configuration
  curve: _react.PropTypes.bool,
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  baseLine: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
  points: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array])
  })),
  onMouseEnter: _react.PropTypes.func,
  onMouseLeave: _react.PropTypes.func,
  onClick: _react.PropTypes.func,

  isAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  strokeWidth: 1,
  stroke: '#3182bd',
  fill: '#3182bd',
  fillOpacity: 0.6,
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'line',
  // points of area
  points: [],
  dot: false,
  label: false,
  curve: true,

  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp2)) || _class;

exports.default = Area;