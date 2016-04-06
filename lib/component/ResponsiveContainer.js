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

var _DOMUtils = require('../util/DOMUtils');

var _LogUtils = require('../util/LogUtils');

var _detectElementResize = require('../util/detectElementResize');

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
      var _this$props = _this.props;
      var width = _this$props.width;
      var height = _this$props.height;

      var container = _this.refs.container;
      var clientWidth = (0, _DOMUtils.getWidth)(container);
      var clientHeight = (0, _DOMUtils.getHeight)(container);

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
      (0, _detectElementResize.addResizeListener)(this.refs.container, this.updateSizeOfWrapper);
    }
  }, {
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      removeEventListener(this.refs.container, this.updateSizeOfWrapper);
    }
  }, {
    key: 'render',
    value: function render() {
      var _state = this.state;
      var hasInitialized = _state.hasInitialized;
      var width = _state.width;
      var height = _state.height;
      var children = this.props.children;

      var style = {
        width: '100%',
        height: '100%'
      };

      (0, _LogUtils.warn)((0, _DataUtils.isPercent)(this.props.width) || (0, _DataUtils.isPercent)(this.props.height), 'The width(%s) and height(%s) are both fixed number,\n       maybe you don\'t need to use ResponsiveContainer.', this.props.width, this.props.height);

      if (hasInitialized) {
        (0, _LogUtils.warn)(width > 0 && height > 0, 'The width(%s) and height(%s) of chart should be greater than 0,\n        please check the style of container, or the props width(%s) and height(%s).', width, height, this.props.width, this.props.height);
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
  width: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  height: _react.PropTypes.oneOfType([_react.PropTypes.string, _react.PropTypes.number]),
  children: _react.PropTypes.node
}, _class2.defaultProps = {
  width: '100%',
  height: '100%'
}, _temp2)) || _class;

exports.default = ResponsiveContainer;