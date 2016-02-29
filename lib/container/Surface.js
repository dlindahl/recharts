'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Surface
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Surface = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Surface, _Component);

  function Surface() {
    _classCallCheck(this, Surface);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Surface).apply(this, arguments));
  }

  _createClass(Surface, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var children = _props.children;
      var width = _props.width;
      var height = _props.height;
      var viewBox = _props.viewBox;
      var className = _props.className;
      var style = _props.style;

      var svgView = viewBox || { width: width, height: height, x: 0, y: 0 };
      var layerClass = (0, _classnames2.default)('recharts-surface', className);

      return _react2.default.createElement(
        'svg',
        {
          className: layerClass,
          width: width,
          height: height,
          style: style,
          viewBox: svgView.x + ' ' + svgView.y + ' ' + svgView.width + ' ' + svgView.height,
          xmlns: 'http://www.w3.org/2000/svg', version: '1.1'
        },
        children
      );
    }
  }]);

  return Surface;
}(_react.Component), _class2.displayName = 'Surface', _class2.propTypes = {
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  viewBox: _react.PropTypes.shape({
    x: _react.PropTypes.number,
    y: _react.PropTypes.number,
    width: _react.PropTypes.number,
    height: _react.PropTypes.number
  }),
  className: _react.PropTypes.string,
  style: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
}, _temp)) || _class;

exports.default = Surface;