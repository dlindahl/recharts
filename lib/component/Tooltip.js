'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Tooltip
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _server = require('react-dom/server');

var _server2 = _interopRequireDefault(_server);

var _DefaultTooltipContent = require('./DefaultTooltipContent');

var _DefaultTooltipContent2 = _interopRequireDefault(_DefaultTooltipContent);

var _DOMUtils = require('../util/DOMUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Tooltip = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Tooltip, _Component);

  function Tooltip() {
    _classCallCheck(this, Tooltip);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Tooltip).apply(this, arguments));
  }

  _createClass(Tooltip, [{
    key: 'getTooltipBBox',
    value: function getTooltipBBox(wrapperStyle) {
      if (typeof document !== 'undefined') {
        var content = this.props.content;

        var contentHtml = _server2.default.renderToStaticMarkup(_react2.default.isValidElement(content) ? _react2.default.cloneElement(content, this.props) : _react2.default.createElement(_DefaultTooltipContent2.default, this.props));
        var style = _extends({}, wrapperStyle, { top: -20000, left: 0, display: 'block' });

        var wrapper = document.createElement('div');

        wrapper.setAttribute('style', (0, _DOMUtils.getStyleString)(style));
        wrapper.innerHTML = contentHtml;
        document.body.appendChild(wrapper);
        var box = wrapper.getBoundingClientRect();

        document.body.removeChild(wrapper);

        return box;
      }

      return null;
    }
  }, {
    key: 'render',
    value: function render() {
      var payload = this.props.payload;

      if (!payload || !payload.length) {
        return null;
      }

      var _props = this.props;
      var content = _props.content;
      var viewBox = _props.viewBox;
      var coordinate = _props.coordinate;
      var active = _props.active;
      var offset = _props.offset;


      var outerStyle = {
        pointerEvents: 'none',
        display: active ? 'block' : 'none',
        position: 'absolute'
      };
      var box = this.getTooltipBBox(outerStyle);

      if (!box) {
        return null;
      }

      outerStyle.left = Math.max(coordinate.x + box.width + offset > viewBox.x + viewBox.width ? coordinate.x - box.width - offset : coordinate.x + offset, viewBox.x);
      outerStyle.top = Math.max(coordinate.y + box.height + offset > viewBox.y + viewBox.height ? coordinate.y - box.height - offset : coordinate.y + offset, viewBox.x);

      return _react2.default.createElement(
        'div',
        { className: 'recharts-tooltip-wrapper', style: outerStyle },
        _react2.default.isValidElement(content) ? _react2.default.cloneElement(content, this.props) : _react2.default.createElement(_DefaultTooltipContent2.default, this.props)
      );
    }
  }]);

  return Tooltip;
}(_react.Component), _class2.displayName = 'Tooltip', _class2.propTypes = {
  content: _react.PropTypes.element,
  viewBox: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number
  }),

  active: _react.PropTypes.bool,
  separator: _react.PropTypes.string,
  formatter: _react.PropTypes.func,
  offset: _react.PropTypes.number,

  itemStyle: _react.PropTypes.object,
  labelStyle: _react.PropTypes.object,
  wrapperStyle: _react.PropTypes.object,
  cursor: _react.PropTypes.oneOfType([_react.PropTypes.bool, _react.PropTypes.element, _react.PropTypes.object]),

  coordinate: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number
  }),

  label: _react.PropTypes.any,
  payload: _react.PropTypes.arrayOf(_react.PropTypes.shape({
    name: _react.PropTypes.any,
    value: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
    unit: _react.PropTypes.any
  }))
}, _class2.defaultProps = {
  active: false,
  offset: 10,
  viewBox: { x1: 0, x2: 0, y1: 0, y2: 0 },
  coordinate: { x: 0, y: 0 },
  cursorStyle: {},
  separator: ' : ',
  wrapperStyle: {},
  itemStyle: {},
  labelStyle: {},
  cursor: true
}, _temp)) || _class;

exports.default = Tooltip;