'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Background
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// TODO: add support of gradient

var Background = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Background, _Component);

  function Background() {
    _classCallCheck(this, Background);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Background).apply(this, arguments));
  }

  _createClass(Background, [{
    key: 'render',
    value: function render() {
      var _props = this.props;
      var className = _props.className;

      var others = _objectWithoutProperties(_props, ['className']);

      return _react2.default.createElement(
        'g',
        { className: (0, _classnames2.default)('recharts-background', className) },
        _react2.default.createElement('rect', others)
      );
    }
  }]);

  return Background;
}(_react.Component), _class2.displayName = 'Background', _class2.propTypes = {
  x: _react.PropTypes.number,
  y: _react.PropTypes.number,
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  strokeWidth: _react.PropTypes.number,
  stroke: _react.PropTypes.string,
  fill: _react.PropTypes.string,
  className: _react.PropTypes.string
}, _class2.defaultProps = {}, _temp)) || _class;

exports.default = Background;