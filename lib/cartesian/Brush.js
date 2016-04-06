'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Brush
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _d3Scale = require('d3-scale');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Brush = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Brush, _Component);

  function Brush(props) {
    _classCallCheck(this, Brush);

    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Brush).call(this, props));

    _this.handleMove = function (e) {
      if (_this._leaveTimer) {
        clearTimeout(_this._leaveTimer);
        _this._leaveTimer = null;
      }

      if (_this.state.isTravellerMoving) {
        _this.handleTravellerMove(e);
      } else if (_this.state.isSlideMoving) {
        _this.handleSlideMove(e);
      }
    };

    _this.handleUp = function () {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: false
      });
    };

    _this.handleLeaveWrapper = function () {
      if (_this.state.isTravellerMoving || _this.state.isSlideMoving) {
        _this._leaveTimer = setTimeout(_this.handleUp, 1000);
      }
    };

    _this.handleEnterSlideOrTraveller = function () {
      _this.setState({
        isTextActive: true
      });
    };

    _this.handleLeaveSlideOrTraveller = function () {
      _this.setState({
        isTextActive: false
      });
    };

    _this.handleSlideDown = function (e) {
      _this.setState({
        isTravellerMoving: false,
        isSlideMoving: true,
        slideMoveStartX: e.pageX
      });
    };

    _this.travellerDownHandlers = {
      startX: _this.handleTravellerDown.bind(_this, 'startX'),
      endX: _this.handleTravellerDown.bind(_this, 'endX')
    };

    if (props.data && props.data.length) {
      var len = props.data.length;
      var startIndex = (0, _isNumber3.default)(props.defaultStartIndex) ? props.defaultStartIndex : 0;
      var endIndex = (0, _isNumber3.default)(props.defaultEndIndex) ? props.defaultEndIndex : len - 1;

      _this.scale = (0, _d3Scale.scalePoint)().domain((0, _range3.default)(0, len)).range([props.x, props.x + props.width - props.travellerWidth]);
      _this.scaleValues = _this.scale.domain().map(function (entry) {
        return _this.scale(entry);
      });

      _this.state = {
        isTextActive: false,
        isSlideMoving: false,
        isTravellerMoving: false,
        startIndex: startIndex, endIndex: endIndex,
        startX: _this.scale(startIndex),
        endX: _this.scale(endIndex)
      };
    } else {
      _this.state = {};
    }
    return _this;
  }

  _createClass(Brush, [{
    key: 'componentWillUnmount',
    value: function componentWillUnmount() {
      if (this._leaveTimer) {
        clearTimeout(this._leaveTimer);
        this._leaveTimer = null;
      }
    }
  }, {
    key: 'getIndexInRange',
    value: function getIndexInRange(range, x) {
      var len = range.length;
      var start = 0;
      var end = len - 1;

      while (end - start > 1) {
        var middle = Math.floor((start + end) / 2);

        if (range[middle] > x) {
          end = middle;
        } else {
          start = middle;
        }
      }

      return x >= range[end] ? end : start;
    }
  }, {
    key: 'getIndex',
    value: function getIndex(_ref) {
      var startX = _ref.startX;
      var endX = _ref.endX;

      var min = Math.min(startX, endX);
      var max = Math.max(startX, endX);
      var minIndex = this.getIndexInRange(this.scaleValues, min);
      var maxIndex = this.getIndexInRange(this.scaleValues, max);

      return {
        startIndex: minIndex,
        endIndex: maxIndex
      };
    }
  }, {
    key: 'handleSlideMove',
    value: function handleSlideMove(e) {
      var _state = this.state;
      var slideMoveStartX = _state.slideMoveStartX;
      var startX = _state.startX;
      var endX = _state.endX;
      var _props = this.props;
      var x = _props.x;
      var width = _props.width;
      var travellerWidth = _props.travellerWidth;
      var onChange = _props.onChange;

      var delta = e.pageX - slideMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - endX, x + width - travellerWidth - startX);
      } else if (delta < 0) {
        delta = Math.max(delta, x - startX, x - endX);
      }
      var newIndex = this.getIndex({
        startX: startX + delta,
        endX: endX + delta
      });

      this.setState(_extends({
        startX: startX + delta,
        endX: endX + delta,
        slideMoveStartX: e.pageX
      }, newIndex), function () {
        if (onChange) {
          onChange(newIndex);
        }
      });
    }
  }, {
    key: 'handleTravellerDown',
    value: function handleTravellerDown(id, e) {
      this.setState({
        isSlideMoving: false,
        isTravellerMoving: true,
        movingTravellerId: id,
        brushMoveStartX: e.pageX
      });
    }
  }, {
    key: 'handleTravellerMove',
    value: function handleTravellerMove(e) {
      var _extends2;

      var _state2 = this.state;
      var brushMoveStartX = _state2.brushMoveStartX;
      var movingTravellerId = _state2.movingTravellerId;

      var prevValue = this.state[movingTravellerId];
      var _props2 = this.props;
      var x = _props2.x;
      var width = _props2.width;
      var travellerWidth = _props2.travellerWidth;
      var onChange = _props2.onChange;


      var params = { startX: this.state.startX, endX: this.state.endX };
      var delta = e.pageX - brushMoveStartX;

      if (delta > 0) {
        delta = Math.min(delta, x + width - travellerWidth - prevValue);
      } else if (delta < 0) {
        delta = Math.max(delta, x - prevValue);
      }

      params[movingTravellerId] = prevValue + delta;
      var newIndex = this.getIndex(params);

      this.setState(_extends((_extends2 = {}, _defineProperty(_extends2, movingTravellerId, prevValue + delta), _defineProperty(_extends2, 'brushMoveStartX', e.pageX), _extends2), newIndex), function () {
        if (onChange) {
          onChange(newIndex);
        }
      });
    }
  }, {
    key: 'renderBackground',
    value: function renderBackground() {
      var _props3 = this.props;
      var x = _props3.x;
      var y = _props3.y;
      var width = _props3.width;
      var height = _props3.height;
      var fill = _props3.fill;
      var stroke = _props3.stroke;


      return _react2.default.createElement('rect', {
        stroke: stroke,
        fill: fill,
        x: x,
        y: y,
        width: width,
        height: height
      });
    }
  }, {
    key: 'renderTraveller',
    value: function renderTraveller(startX, id) {
      var _props4 = this.props;
      var y = _props4.y;
      var travellerWidth = _props4.travellerWidth;
      var height = _props4.height;
      var stroke = _props4.stroke;

      var lineY = Math.floor(y + height / 2) - 1;
      var x = Math.max(startX, this.props.x);

      return _react2.default.createElement(
        _Layer2.default,
        {
          className: 'recharts-brush-traveller',
          onMouseEnter: this.handleEnterSlideOrTraveller,
          onMouseLeave: this.handleLeaveSlideOrTraveller,
          onMouseDown: this.travellerDownHandlers[id],
          style: { cursor: 'col-resize' }
        },
        _react2.default.createElement('rect', {
          x: x,
          y: y,
          width: travellerWidth,
          height: height,
          fill: stroke,
          stroke: 'none'
        }),
        _react2.default.createElement('line', {
          x1: x + 1,
          y1: lineY,
          x2: x + travellerWidth - 1,
          y2: lineY,
          fill: 'none',
          stroke: '#fff'
        }),
        _react2.default.createElement('line', {
          x1: x + 1,
          y1: lineY + 2,
          x2: x + travellerWidth - 1,
          y2: lineY + 2,
          fill: 'none',
          stroke: '#fff'
        })
      );
    }
  }, {
    key: 'renderSlide',
    value: function renderSlide(startX, endX) {
      var _props5 = this.props;
      var y = _props5.y;
      var height = _props5.height;
      var stroke = _props5.stroke;


      return _react2.default.createElement('rect', {
        className: 'recharts-brush-slide',
        onMouseEnter: this.handleEnterSlideOrTraveller,
        onMouseLeave: this.handleLeaveSlideOrTraveller,
        onMouseDown: this.handleSlideDown,
        style: { cursor: 'move' },
        stroke: 'none',
        fill: stroke,
        fillOpacity: 0.2,
        x: Math.min(startX, endX),
        y: y,
        width: Math.abs(endX - startX),
        height: height
      });
    }
  }, {
    key: 'renderText',
    value: function renderText() {
      var _props6 = this.props;
      var data = _props6.data;
      var y = _props6.y;
      var height = _props6.height;
      var travellerWidth = _props6.travellerWidth;
      var stroke = _props6.stroke;
      var _state3 = this.state;
      var startIndex = _state3.startIndex;
      var endIndex = _state3.endIndex;
      var startX = _state3.startX;
      var endX = _state3.endX;

      var offset = 5;
      var style = {
        pointerEvents: 'none',
        fill: stroke
      };

      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-brush-texts' },
        _react2.default.createElement(
          'text',
          {
            textAnchor: 'end',
            style: style,
            dy: offset,
            x: Math.min(startX, endX) - offset,
            y: y + height / 2
          },
          data[startIndex]
        ),
        _react2.default.createElement(
          'text',
          {
            textAnchor: 'start',
            style: style,
            dy: offset,
            x: Math.max(startX, endX) + travellerWidth + offset,
            y: y + height / 2
          },
          data[endIndex]
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props7 = this.props;
      var x = _props7.x;
      var width = _props7.width;
      var travellerWidth = _props7.travellerWidth;
      var data = _props7.data;
      var className = _props7.className;
      var _state4 = this.state;
      var startX = _state4.startX;
      var endX = _state4.endX;
      var isTextActive = _state4.isTextActive;
      var isSlideMoving = _state4.isSlideMoving;
      var isTravellerMoving = _state4.isTravellerMoving;


      if (!data || !data.length) {
        return null;
      }

      var layerClass = (0, _classnames2.default)('recharts-bursh', className);

      return _react2.default.createElement(
        _Layer2.default,
        {
          className: layerClass,
          onMouseUp: this.handleUp,
          onMouseMove: this.handleMove,
          onMouseLeave: this.handleLeaveWrapper
        },
        this.renderBackground(),
        this.renderSlide(startX, endX),
        this.renderTraveller(startX, 'startX'),
        this.renderTraveller(endX, 'endX'),
        (isTextActive || isSlideMoving || isTravellerMoving) && this.renderText()
      );
    }
  }]);

  return Brush;
}(_react.Component), _class2.displayName = 'Brush', _class2.propTypes = {
  className: _react.PropTypes.string,

  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string,
  x: _react.PropTypes.number.isRequired,
  y: _react.PropTypes.number.isRequired,
  width: _react.PropTypes.number.isRequired,
  height: _react.PropTypes.number.isRequired,
  data: _react.PropTypes.array,

  travellerWidth: _react.PropTypes.number,
  defaultStartIndex: _react.PropTypes.number,
  defaultEndIndex: _react.PropTypes.number,

  onChange: _react.PropTypes.func
}, _class2.defaultProps = {
  x: 0,
  y: 0,
  width: 0,
  height: 40,
  travellerWidth: 5,
  fill: '#fff',
  stroke: '#666'
}, _temp)) || _class;

exports.default = Brush;