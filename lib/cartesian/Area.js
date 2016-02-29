'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Area = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Area, _Component);

  function Area() {
    _classCallCheck(this, Area);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Area).apply(this, arguments));
  }

  _createClass(Area, [{
    key: 'renderArea',
    value: function renderArea() {
      return _react2.default.createElement(_Curve2.default, _extends({}, this.props, { stroke: 'none', className: 'recharts-area-area' }));
    }
  }, {
    key: 'renderCurve',
    value: function renderCurve() {
      var _props = this.props;
      var points = _props.points;
      var type = _props.type;
      var layout = _props.layout;


      return _react2.default.createElement(_Curve2.default, _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), {
        className: 'recharts-area-curve',
        layout: layout,
        points: points,
        type: type,
        fill: 'none'
      }));
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      var _props2 = this.props;
      var dot = _props2.dot;
      var points = _props2.points;

      var areaProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);
      var isDotElement = _react2.default.isValidElement(dot);

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

        return isDotElement ? _react2.default.cloneElement(dot, dotProps) : _react2.default.createElement(_Dot2.default, _extends({}, dotProps, { className: 'recharts-area-dot' }));
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-area-dots' },
        dots
      );
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _props3 = this.props;
      var points = _props3.points;
      var label = _props3.label;

      var areaProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);
      var isLabelElement = _react2.default.isValidElement(label);

      var labels = points.map(function (entry, i) {
        var labelProps = _extends({
          textAnchor: 'middle'
        }, entry, areaProps, customLabelProps, {
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        return isLabelElement ? _react2.default.cloneElement(label, labelProps) : _react2.default.createElement(
          'text',
          _extends({}, labelProps, { className: 'recharts-area-label' }),
          entry.value
        );
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
      var _props4 = this.props;
      var dot = _props4.dot;
      var curve = _props4.curve;
      var label = _props4.label;
      var points = _props4.points;
      var className = _props4.className;
      var layout = _props4.layout;
      var isAnimationActive = _props4.isAnimationActive;
      var animationBegin = _props4.animationBegin;
      var animationDuration = _props4.animationDuration;
      var animationEasing = _props4.animationEasing;

      var other = _objectWithoutProperties(_props4, ['dot', 'curve', 'label', 'points', 'className', 'layout', 'isAnimationActive', 'animationBegin', 'animationDuration', 'animationEasing']);

      if (!points || !points.length) {
        return null;
      }

      var hasSinglePoint = points.length === 1;
      var layerClass = (0, _classnames2.default)('recharts-area', className);
      var transformOrigin = layout === 'vertical' ? 'left center' : 'center bottom';
      var scaleType = layout === 'vertical' ? 'scaleX' : 'scaleY';

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        _react2.default.createElement(
          _reactSmooth2.default,
          { attributeName: 'transform',
            isActive: isAnimationActive,
            begin: animationBegin,
            easing: animationEasing,
            duration: animationDuration,
            from: scaleType + '(0)',
            to: scaleType + '(1)'
          },
          _react2.default.createElement(
            'g',
            { style: { transformOrigin: transformOrigin } },
            curve && !hasSinglePoint && this.renderCurve(),
            !hasSinglePoint && this.renderArea()
          )
        ),
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
  yAxisId: _react.PropTypes.number,
  xAxisId: _react.PropTypes.number,
  stackId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  legendType: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  // dot configuration
  dot: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.object, _react.PropTypes.bool]),
  label: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.object, _react.PropTypes.bool]),
  // have curve configuration
  curve: _react.PropTypes.bool,
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  baseLine: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
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
  onClick: function onClick() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},


  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp)) || _class;

exports.default = Area;