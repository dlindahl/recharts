'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Radar
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _ReactUtils = require('../util/ReactUtils');

var _Polygon = require('../shape/Polygon');

var _Polygon2 = _interopRequireDefault(_Polygon);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Radar = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Radar, _Component);

  function Radar() {
    _classCallCheck(this, Radar);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Radar).apply(this, arguments));
  }

  _createClass(Radar, [{
    key: 'renderPolygon',
    value: function renderPolygon() {
      var _props = this.props;
      var shape = _props.shape;
      var points = _props.points;
      var animationDuration = _props.animationDuration;
      var animationEasing = _props.animationEasing;
      var animationBegin = _props.animationBegin;
      var isAnimationActive = _props.isAnimationActive;


      if (_react2.default.isValidElement(shape)) {
        return _react2.default.cloneElement(shape, this.props);
      } else if ((0, _isFunction3.default)(shape)) {
        return shape(this.props);
      }

      var point = points[0];
      var transformPoints = points.map(function (p) {
        return { x: p.x - point.cx, y: p.y - point.cy };
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-radar-polygon', transform: 'translate(' + point.cx + ', ' + point.cy + ')' },
        _react2.default.createElement(
          _reactSmooth2.default,
          { from: 'scale(0)',
            to: 'scale(1)',
            attributeName: 'transform',
            isActive: isAnimationActive,
            begin: animationBegin,
            easing: animationEasing,
            duration: animationDuration
          },
          _react2.default.createElement(_Polygon2.default, _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), { points: transformPoints }))
        )
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
          _extends({}, props, { className: 'recharts-radar-label' }),
          value
        );
      }

      return labelItem;
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var _this2 = this;

      var _props2 = this.props;
      var points = _props2.points;
      var label = _props2.label;

      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);

      var labels = points.map(function (entry, i) {
        var labelProps = _extends({
          textAnchor: 'middle'
        }, baseProps, {
          stroke: 'none',
          fill: baseProps && baseProps.stroke || '#666'
        }, customLabelProps, entry, {
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        return _this2.renderLabelItem(label, labelProps, entry.value);
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-radar-labels' },
        labels
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
        dotItem = _react2.default.createElement(_Dot2.default, _extends({}, props, { className: 'recharts-radar-dot' }));
      }

      return dotItem;
    }
  }, {
    key: 'renderDots',
    value: function renderDots() {
      var _this3 = this;

      var _props3 = this.props;
      var dot = _props3.dot;
      var points = _props3.points;

      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customDotProps = (0, _ReactUtils.getPresentationAttributes)(dot);

      var dots = points.map(function (entry, i) {
        var dotProps = _extends({
          key: 'dot-' + i,
          r: 3
        }, baseProps, customDotProps, {
          cx: entry.x,
          cy: entry.y,
          index: i,
          playload: entry
        });

        return _this3.renderDotItem(dot, dotProps);
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-radar-dots' },
        dots
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props4 = this.props;
      var className = _props4.className;
      var points = _props4.points;
      var label = _props4.label;
      var dot = _props4.dot;


      if (!points || !points.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-radar', className);
      var transformOrigin = 'center center';

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        this.renderPolygon(),
        label && this.renderLabels(),
        dot && this.renderDots()
      );
    }
  }]);

  return Radar;
}(_react.Component), _class2.displayName = 'Radar', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {
  className: _react.PropTypes.string,
  dataKey: _react.PropTypes.string.isRequired,

  points: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    cx: _react.PropTypes.number,
    cy: _react.PropTypes.number,
    angle: _react.PropTypes.number,
    radius: _react.PropTypes.number,
    value: _react.PropTypes.number,
    payload: _react.PropTypes.object
  })),
  shape: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func]),
  dot: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func, _react.PropTypes.object, _react.PropTypes.bool]),
  label: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func, _react.PropTypes.object, _react.PropTypes.bool]),

  isAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}), _class2.defaultProps = {
  dot: false,
  label: false,
  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp)) || _class;

exports.default = Radar;