'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.LineChart = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Line Chart
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Curve = require('../shape/Curve');

var _Curve2 = _interopRequireDefault(_Curve);

var _Dot = require('../shape/Dot');

var _Dot2 = _interopRequireDefault(_Dot);

var _generateCategoricalChart = require('./generateCategoricalChart');

var _generateCategoricalChart2 = _interopRequireDefault(_generateCategoricalChart);

var _Line = require('../cartesian/Line');

var _Line2 = _interopRequireDefault(_Line);

var _ReactUtils = require('../util/ReactUtils');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _CartesianUtils = require('../util/CartesianUtils');

var _DataUtils = require('../util/DataUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var LineChart = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(LineChart, _Component);

  function LineChart() {
    _classCallCheck(this, LineChart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(LineChart).apply(this, arguments));
  }

  _createClass(LineChart, [{
    key: 'getComposedData',


    /**
     * Compose the data of each group
     * @param  {Object} xAxis   The configuration of x-axis
     * @param  {Object} yAxis   The configuration of y-axis
     * @param  {String} dataKey The unique key of a group
     * @return {Array}  Composed data
     */
    value: function getComposedData(xAxis, yAxis, dataKey) {
      var _props = this.props;
      var layout = _props.layout;
      var dataStartIndex = _props.dataStartIndex;
      var dataEndIndex = _props.dataEndIndex;
      var isComposed = _props.isComposed;

      var data = this.props.data.slice(dataStartIndex, dataEndIndex + 1);
      var bandSize = (0, _DataUtils.getBandSizeOfScale)(layout === 'horizontal' ? xAxis.scale : yAxis.scale);
      var xTicks = (0, _CartesianUtils.getTicksOfAxis)(xAxis);
      var yTicks = (0, _CartesianUtils.getTicksOfAxis)(yAxis);

      return data.map(function (entry, index) {
        return {
          x: layout === 'horizontal' ? xTicks[index].coordinate + bandSize / 2 : xAxis.scale(entry[dataKey]),
          y: layout === 'horizontal' ? yAxis.scale(entry[dataKey]) : yTicks[index].coordinate + bandSize / 2,
          value: entry[dataKey]
        };
      });
    }
  }, {
    key: 'renderCursor',
    value: function renderCursor(xAxisMap, yAxisMap, offset) {
      var _props2 = this.props;
      var children = _props2.children;
      var isTooltipActive = _props2.isTooltipActive;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

      if (!tooltipItem || !tooltipItem.props.cursor || !isTooltipActive) {
        return null;
      }

      var _props3 = this.props;
      var layout = _props3.layout;
      var activeTooltipIndex = _props3.activeTooltipIndex;

      var axisMap = layout === 'horizontal' ? xAxisMap : yAxisMap;
      var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap);
      var ticks = (0, _CartesianUtils.getTicksOfAxis)(axis);
      var start = ticks[activeTooltipIndex].coordinate;
      var x1 = layout === 'horizontal' ? start : offset.left;
      var y1 = layout === 'horizontal' ? offset.top : start;
      var x2 = layout === 'horizontal' ? start : offset.left + offset.width;
      var y2 = layout === 'horizontal' ? offset.top + offset.height : start;
      var cursorProps = _extends({
        stroke: '#ccc'
      }, (0, _ReactUtils.getPresentationAttributes)(tooltipItem.props.cursor), {
        points: [{ x: x1, y: y1 }, { x: x2, y: y2 }]
      });

      return _react2.default.isValidElement(tooltipItem.props.cursor) ? _react2.default.cloneElement(tooltipItem.props.cursor, cursorProps) : _react2.default.createElement(_Curve2.default, _extends({}, cursorProps, { type: 'linear', className: 'recharts-tooltip-cursor' }));
    }

    /**
     * Draw the main part of line chart
     * @param  {Array} items     All the instance of Line
     * @param  {Object} xAxisMap The configuration of all x-axes
     * @param  {Object} yAxisMap The configuration of all y-axes
     * @param  {Object} offset   The offset of main part in the svg element
     * @return {ReactComponent}  All the instances of Line
     */

  }, {
    key: 'renderItems',
    value: function renderItems(items, xAxisMap, yAxisMap, offset) {
      var _this2 = this;

      var _props4 = this.props;
      var children = _props4.children;
      var layout = _props4.layout;
      var isTooltipActive = _props4.isTooltipActive;
      var activeTooltipIndex = _props4.activeTooltipIndex;

      var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);
      var hasDot = tooltipItem && isTooltipActive;
      var dotItems = [];

      var lineItems = items.map(function (child, i) {
        var _child$props = child.props;
        var xAxisId = _child$props.xAxisId;
        var yAxisId = _child$props.yAxisId;
        var dataKey = _child$props.dataKey;
        var stroke = _child$props.stroke;

        var points = _this2.getComposedData(xAxisMap[xAxisId], yAxisMap[yAxisId], dataKey);
        var activePoint = points[activeTooltipIndex];
        var pointStyle = { fill: stroke, strokeWidth: 2, stroke: '#fff' };

        if (hasDot && activePoint) {
          dotItems.push(_react2.default.createElement(_Dot2.default, _extends({
            key: 'area-dot-' + i,
            cx: activePoint.x,
            cy: activePoint.y,
            r: 4
          }, pointStyle)));
        }

        return _react2.default.cloneElement(child, _extends({
          key: 'line-' + i
        }, offset, {
          layout: layout,
          points: points
        }));
      }, this);

      return _react2.default.createElement(
        'g',
        { key: 'recharts-line-wrapper' },
        _react2.default.createElement(
          'g',
          { key: 'recharts-line' },
          lineItems
        ),
        _react2.default.createElement(
          'g',
          { key: 'recharts-line-dot' },
          dotItems
        )
      );
    }
  }, {
    key: 'render',
    value: function render() {
      var _props5 = this.props;
      var isComposed = _props5.isComposed;
      var xAxisMap = _props5.xAxisMap;
      var yAxisMap = _props5.yAxisMap;
      var offset = _props5.offset;
      var graphicalItems = _props5.graphicalItems;


      return _react2.default.createElement(
        _Layer2.default,
        { className: 'recharts-line-graphical' },
        !isComposed && this.renderCursor(xAxisMap, yAxisMap, offset),
        this.renderItems(graphicalItems, xAxisMap, yAxisMap, offset)
      );
    }
  }]);

  return LineChart;
}(_react.Component), _class2.displayName = 'LineChart', _class2.propTypes = {
  layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
  dataStartIndex: _react.PropTypes.number,
  dataEndIndex: _react.PropTypes.number,
  data: _react.PropTypes.array,
  isTooltipActive: _react.PropTypes.bool,
  activeTooltipIndex: _react.PropTypes.number,
  xAxisMap: _react.PropTypes.object,
  yAxisMap: _react.PropTypes.object,
  offset: _react.PropTypes.object,
  graphicalItems: _react.PropTypes.array,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  // used internally
  isComposed: _react.PropTypes.bool
}, _temp)) || _class;

exports.default = (0, _generateCategoricalChart2.default)(LineChart, _Line2.default);
exports.LineChart = LineChart;