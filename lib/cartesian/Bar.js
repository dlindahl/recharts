'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Render a group of bar
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _Rectangle = require('../shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _ReactUtils = require('../util/ReactUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Bar = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Bar, _Component);

  function Bar() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Bar);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Bar)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      isAnimationFinished: false
    }, _this.handleAnimationEnd = function () {
      _this.setState({ isAnimationFinished: true });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Bar, [{
    key: 'renderRectangles',
    value: function renderRectangles() {
      var _this2 = this;

      var _props = this.props;
      var data = _props.data;
      var className = _props.className;
      var shape = _props.shape;
      var layout = _props.layout;
      var isAnimationActive = _props.isAnimationActive;
      var animationBegin = _props.animationBegin;
      var animationDuration = _props.animationDuration;
      var animationEasing = _props.animationEasing;

      var others = _objectWithoutProperties(_props, ['data', 'className', 'shape', 'layout', 'isAnimationActive', 'animationBegin', 'animationDuration', 'animationEasing']);

      return data.map(function (entry, index) {
        var value = entry.value;
        var width = entry.width;
        var height = entry.height;

        var rest = _objectWithoutProperties(entry, ['value', 'width', 'height']);

        var props = _extends({}, others, rest, { width: width, height: height });
        var getStyle = function getStyle(isBegin) {
          return {
            transform: 'scale' + (layout === 'vertical' ? 'X' : 'Y') + '(' + (isBegin ? 0 : 1) + ')'
          };
        };
        var transformOrigin = '';

        if (layout === 'vertical') {
          transformOrigin = width > 0 ? 'left center' : 'right center';
        } else {
          transformOrigin = height > 0 ? 'center bottom' : 'center top';
        }

        return _react2.default.createElement(
          _reactSmooth2.default,
          { begin: animationBegin,
            duration: animationDuration,
            isActive: isAnimationActive,
            easing: animationEasing,
            from: getStyle(true),
            to: getStyle(false),
            key: 'rectangle-' + index,
            onAnimationEnd: _this2.handleAnimationEnd
          },
          _react2.default.createElement(
            'g',
            { style: { transformOrigin: transformOrigin } },
            _react2.default.isValidElement(shape) ? _react2.default.cloneElement(shape, _extends({}, props, { index: index })) : _react2.default.createElement(_Rectangle2.default, props)
          )
        );
      });
    }
  }, {
    key: 'renderLabels',
    value: function renderLabels() {
      var isAnimationActive = this.props.isAnimationActive;


      if (isAnimationActive && !this.state.isAnimationFinished) {
        return null;
      }

      var _props2 = this.props;
      var data = _props2.data;
      var label = _props2.label;

      var barProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      var customLabelProps = (0, _ReactUtils.getPresentationAttributes)(label);
      var isLabelElement = _react2.default.isValidElement(label);

      var labels = data.map(function (entry, i) {
        var x = entry.x + entry.width / 2;
        var labelProps = _extends({
          textAnchor: 'middle'
        }, entry, barProps, customLabelProps, {
          x: x,
          index: i,
          key: 'label-' + i,
          payload: entry
        });

        return isLabelElement ? _react2.default.cloneElement(label, labelProps) : _react2.default.createElement(
          'text',
          _extends({}, labelProps, { className: 'recharts-bar-label' }),
          entry.value
        );
      });

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-bar-labels' },
        labels
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props3 = this.props;
      var data = _props3.data;
      var className = _props3.className;
      var label = _props3.label;


      if (!data || !data.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-bar', className);

      return _react2.default.createElement(
        _Layer2.default,
        { className: layerClass },
        _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-bar-rectangles' },
          this.renderRectangles()
        ),
        label && _react2.default.createElement(
          _Layer2.default,
          { className: 'recharts-bar-rectangle-labels' },
          this.renderLabels()
        )
      );
    }
  }]);

  return Bar;
}(_react.Component), _class2.displayName = 'Bar', _class2.propTypes = _extends({}, _ReactUtils.PRESENTATION_ATTRIBUTES, {

  className: _react.PropTypes.string,
  layout: _react.PropTypes.string,
  xAxisId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  yAxisId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  stackId: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  barSize: _react.PropTypes.number,
  unit: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  name: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  dataKey: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]).isRequired,
  formatter: _react.PropTypes.func,

  shape: _react.PropTypes.element,
  label: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.object, _react.PropTypes.element]),
  data: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    radius: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.array]),
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
  fill: '#fff',
  xAxisId: 0,
  yAxisId: 0,
  legendType: 'rect',
  // data of bar
  data: [],
  onClick: function onClick() {},
  onMouseEnter: function onMouseEnter() {},
  onMouseLeave: function onMouseLeave() {},

  layout: 'vertical',
  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp2)) || _class;

exports.default = Bar;