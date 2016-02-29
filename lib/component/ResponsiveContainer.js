'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
                              * @fileOverview Wrapper component to make charts adapt to the size of parent * DOM
                              */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _DataUtils = require('../util/DataUtils');

var _ouiDomUtils = require('oui-dom-utils');

var _ouiDomUtils2 = _interopRequireDefault(_ouiDomUtils);

var _invariant = require('invariant');

var _invariant2 = _interopRequireDefault(_invariant);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ResponsiveContainer = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(ResponsiveContainer, _Component);

  function ResponsiveContainer() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, ResponsiveContainer);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(ResponsiveContainer)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.state = {
      hasInitialized: false
    }, _this.updateSizeOfWrapper = function () {
      var container = _this.refs.container;
      var clientWidth = _ouiDomUtils2.default.width(container);
      var clientHeight = _ouiDomUtils2.default.height(container);
      var _this$props = _this.props;
      var width = _this$props.width;
      var height = _this$props.height;


      _this.setState({
        hasInitialized: true,
        width: (0, _DataUtils.getPercentValue)(width, clientWidth),
        height: (0, _DataUtils.getPercentValue)(height, clientHeight)
      });
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(ResponsiveContainer, [{
    key: 'componentDidMount',
    value: function componentDidMount() {
      this.updateSizeOfWrapper();
      window.addEventListener('resize', this.updateSizeOfWrapper);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      window.removeEventListener('resize', this.updateSizeOfWrapper);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var hasInitialized = _state.hasInitialized;
      var width = _state.width;
      var height = _state.height;
      var children = this.props.children;

      var style = Object.assign({}, {
        width: '100%',
        height: '100%'
      }, this.props.style);

      if (hasInitialized) {
        (0, _invariant2.default)(width > 0 && height > 0, 'The width(%s) and height(%s) of chart should be greater than 0, ' + 'please check the style of container, or the props width(%s) and height(%s).', width, height, this.props.width, this.props.height);
      }

      return _react2.default.createElement(
        'div',
        { className: 'recharts-responsive-container', style: style, ref: 'container' },
        hasInitialized && width > 0 && height > 0 ? _react2.default.cloneElement(children, { width: width, height: height }) : null
      );
    }
  }]);

  return ResponsiveContainer;
}(_react.Component), _class2.displayName = 'ResponsiveContainer', _class2.propTypes = {
  width: _react.PropTypes.string,
  height: _react.PropTypes.string,
  children: _react.PropTypes.node,
  style: _react.PropTypes.object
}, _class2.defaultProps = {
  width: '100%',
  height: '100%',
  style: {}
}, _temp2)) || _class;

exports.default = ResponsiveContainer;