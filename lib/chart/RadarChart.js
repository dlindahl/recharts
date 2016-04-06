'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp; /**
                             * @fileOverview Radar Chart
                             */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _d3Scale = require('d3-scale');

var _rechartsScale = require('recharts-scale');

var _Surface = require('../container/Surface');

var _Surface2 = _interopRequireDefault(_Surface);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Legend = require('../component/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _Radar = require('../polar/Radar');

var _Radar2 = _interopRequireDefault(_Radar);

var _PolarGrid = require('../polar/PolarGrid');

var _PolarGrid2 = _interopRequireDefault(_PolarGrid);

var _PolarAngleAxis = require('../polar/PolarAngleAxis');

var _PolarAngleAxis2 = _interopRequireDefault(_PolarAngleAxis);

var _PolarRadiusAxis = require('../polar/PolarRadiusAxis');

var _PolarRadiusAxis2 = _interopRequireDefault(_PolarRadiusAxis);

var _ReactUtils = require('../util/ReactUtils');

var _PolarUtils = require('../util/PolarUtils');

var _DataUtils = require('../util/DataUtils');

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RadarChart = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(RadarChart, _Component);

  function RadarChart() {
    _classCallCheck(this, RadarChart);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(RadarChart).apply(this, arguments));
  }

  _createClass(RadarChart, [{
    key: 'getRadiusAxisCfg',
    value: function getRadiusAxisCfg(radiusAxis, innerRadius, outerRadius) {
      var children = this.props.children;

      var domain = void 0;
      var tickCount = void 0;
      var ticks = void 0;

      if (radiusAxis && radiusAxis.props.ticks) {
        ticks = radiusAxis.props.ticks;

        tickCount = ticks.length;
        domain = [Math.min.apply(null, ticks), Math.max.apply(null, ticks)];
      } else {
        tickCount = Math.max(radiusAxis && radiusAxis.props.tickCount || _PolarRadiusAxis2.default.defaultProps.tickCount, 2);
        ticks = this.getTicksByItems(radiusAxis, tickCount);

        domain = [Math.min.apply(null, ticks), Math.max.apply(null, ticks)];
      }

      return {
        tickCount: tickCount,
        ticks: ticks,
        scale: (0, _d3Scale.scaleLinear)().domain(domain).range([innerRadius, outerRadius])
      };
    }
  }, {
    key: 'getTicksByItems',
    value: function getTicksByItems(axisItem, tickCount) {
      var _props = this.props;
      var data = _props.data;
      var children = _props.children;

      var _ref = axisItem ? axisItem.props : _PolarRadiusAxis2.default.defaultProps;

      var domain = _ref.domain;

      var radarItems = (0, _ReactUtils.findAllByType)(children, _Radar2.default);
      var dataKeys = radarItems.map(function (item) {
        return item.props.dataKey;
      });
      var extent = data.reduce(function (prev, current) {
        var values = dataKeys.map(function (v) {
          return current[v] || 0;
        });
        var currentMax = Math.max.apply(null, values);
        var currentMin = Math.min.apply(null, values);

        return [Math.min(prev[0], currentMin), Math.max(prev[1], currentMax)];
      }, [Infinity, -Infinity]);
      var finalDomain = (0, _DataUtils.parseSpecifiedDomain)(domain, extent);

      if (domain && (domain[0] === 'auto' || domain[1] === 'auto')) {
        return (0, _rechartsScale.getNiceTickValues)(finalDomain, tickCount);
      }

      return finalDomain;
    }
  }, {
    key: 'getGridRadius',
    value: function getGridRadius(gridCount, innerRadius, outerRadius) {
      var domain = (0, _range3.default)(0, gridCount);
      var scale = (0, _d3Scale.scalePoint)().domain(domain).range([innerRadius, outerRadius]);

      return domain.map(function (v) {
        return scale(v);
      });
    }
  }, {
    key: 'getAngle',
    value: function getAngle(index, dataLength, startAngle, clockWise) {
      var sign = clockWise ? -1 : 1;
      var angleInterval = 360 / dataLength;

      return startAngle + index * sign * angleInterval;
    }
  }, {
    key: 'getAngleTicks',
    value: function getAngleTicks(dataLength, startAngle, clockWise) {
      var angles = [];

      for (var i = 0; i < dataLength; i++) {
        angles.push(this.getAngle(i, dataLength, startAngle, clockWise));
      }

      return angles;
    }
  }, {
    key: 'getRadiusTicks',
    value: function getRadiusTicks(axisCfg) {
      var ticks = axisCfg.ticks;
      var scale = axisCfg.scale;


      if (ticks && ticks.length) {
        return ticks.map(function (entry) {
          return {
            radius: scale(entry),
            value: entry
          };
        });
      }
      var tickCount = axisCfg.tickCount;

      var domain = scale.domain();

      return (0, _range3.default)(0, tickCount).map(function (v, i) {
        var value = domain[0] + i * (domain[1] - domain[0]) / (tickCount - 1);
        return {
          value: value,
          radius: scale(value)
        };
      });
    }
  }, {
    key: 'getComposedData',
    value: function getComposedData(item, scale, cx, cy, innerRadius, outerRadius) {
      var _this2 = this;

      var dataKey = item.props.dataKey;
      var _props2 = this.props;
      var data = _props2.data;
      var startAngle = _props2.startAngle;
      var clockWise = _props2.clockWise;

      var len = data.length;

      return data.map(function (entry, i) {
        var value = entry[dataKey] || 0;
        var angle = _this2.getAngle(i, len, startAngle, clockWise);
        var radius = scale(value);

        return _extends({}, (0, _PolarUtils.polarToCartesian)(cx, cy, radius, angle), {
          value: value,
          cx: cx, cy: cy, radius: radius, angle: angle,
          payload: entry
        });
      });
    }
  }, {
    key: 'renderRadars',
    value: function renderRadars(items, scale, cx, cy, innerRadius, outerRadius) {
      var _this3 = this;

      if (!items || !items.length) {
        return null;
      }

      var baseProps = (0, _ReactUtils.getPresentationAttributes)(this.props);
      return items.map(function (el, index) {
        return _react2.default.cloneElement(el, _extends({}, baseProps, (0, _ReactUtils.getPresentationAttributes)(el), {
          points: _this3.getComposedData(el, scale, cx, cy, innerRadius, outerRadius),
          key: 'radar-' + index
        }));
      });
    }
  }, {
    key: 'renderGrid',
    value: function renderGrid(radiusAxisCfg, cx, cy, innerRadius, outerRadius) {
      var children = this.props.children;

      var grid = (0, _ReactUtils.findChildByType)(children, _PolarGrid2.default);

      if (!grid) {
        return null;
      }

      var _props3 = this.props;
      var startAngle = _props3.startAngle;
      var clockWise = _props3.clockWise;
      var data = _props3.data;

      var len = data.length;
      var gridCount = radiusAxisCfg.tickCount;

      return _react2.default.cloneElement(grid, {
        polarAngles: this.getAngleTicks(len, startAngle, clockWise),
        polarRadius: this.getGridRadius(gridCount, innerRadius, outerRadius),
        cx: cx, cy: cy, innerRadius: innerRadius, outerRadius: outerRadius,
        key: 'layer-grid'
      });
    }
  }, {
    key: 'renderAngleAxis',
    value: function renderAngleAxis(cx, cy, outerRadius, maxRadius) {
      var _this4 = this;

      var children = this.props.children;

      var angleAxis = (0, _ReactUtils.findChildByType)(children, _PolarAngleAxis2.default);

      if (!angleAxis || angleAxis.props.hide) {
        return null;
      }

      var _props4 = this.props;
      var data = _props4.data;
      var width = _props4.width;
      var height = _props4.height;
      var startAngle = _props4.startAngle;
      var clockWise = _props4.clockWise;

      var len = data.length;
      var grid = (0, _ReactUtils.findChildByType)(children, _PolarGrid2.default);
      var radius = (0, _DataUtils.getPercentValue)(angleAxis.props.radius, maxRadius, outerRadius);
      var dataKey = angleAxis.props.dataKey;


      return _react2.default.cloneElement(angleAxis, {
        ticks: data.map(function (v, i) {
          return {
            value: dataKey ? v[dataKey] : i,
            angle: _this4.getAngle(i, len, startAngle, clockWise)
          };
        }),
        cx: cx, cy: cy, radius: radius,
        axisLineType: grid && grid.props && grid.props.gridType || _PolarGrid2.default.defaultProps.gridType,
        key: 'layer-angle-axis'
      });
    }
  }, {
    key: 'renderRadiusAxis',
    value: function renderRadiusAxis(radiusAxis, radiusAxisCfg, cx, cy) {
      if (!radiusAxis || radiusAxis.props.hide) {
        return null;
      }

      var startAngle = this.props.startAngle;

      return _react2.default.cloneElement(radiusAxis, {
        angle: radiusAxis.props.angle || startAngle,
        ticks: this.getRadiusTicks(radiusAxisCfg),
        cx: cx, cy: cy
      });
    }

    /**
     * Draw legend
     * @param  {Array} items             The instances of item
     * @return {ReactElement}            The instance of Legend
     */

  }, {
    key: 'renderLegend',
    value: function renderLegend(items) {
      var children = this.props.children;

      var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend2.default);
      if (!legendItem) {
        return null;
      }

      var _props5 = this.props;
      var width = _props5.width;
      var height = _props5.height;
      var margin = _props5.margin;

      var legendData = legendItem.props && legendItem.props.payload || items.map(function (child) {
        var _child$props = child.props;
        var dataKey = _child$props.dataKey;
        var name = _child$props.name;
        var legendType = _child$props.legendType;


        return {
          type: legendType || 'square',
          color: child.props.stroke || child.props.fill,
          value: name || dataKey
        };
      }, this);

      return _react2.default.cloneElement(legendItem, _extends({}, _Legend2.default.getWithHeight(legendItem, width, height), {
        payload: legendData,
        chartWidth: width,
        chartHeight: height,
        margin: margin
      }));
    }
  }, {
    key: 'render',
    value: function render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }
      var _props6 = this.props;
      var className = _props6.className;
      var data = _props6.data;
      var width = _props6.width;
      var height = _props6.height;
      var margin = _props6.margin;
      var children = _props6.children;
      var style = _props6.style;

      var cx = (0, _DataUtils.getPercentValue)(this.props.cx, width, width / 2);
      var cy = (0, _DataUtils.getPercentValue)(this.props.cy, height, height / 2);
      var maxRadius = (0, _PolarUtils.getMaxRadius)(width, height, margin);
      var innerRadius = (0, _DataUtils.getPercentValue)(this.props.innerRadius, maxRadius, 0);
      var outerRadius = (0, _DataUtils.getPercentValue)(this.props.outerRadius, maxRadius, maxRadius * 0.8);

      if (outerRadius <= 0 || !data || !data.length) {
        return null;
      }

      var items = (0, _ReactUtils.findAllByType)(children, _Radar2.default);
      var radiusAxis = (0, _ReactUtils.findChildByType)(children, _PolarRadiusAxis2.default);
      var radiusAxisCfg = this.getRadiusAxisCfg(radiusAxis, innerRadius, outerRadius);

      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('recharts-wrapper', className),
          style: _extends({ position: 'relative', cursor: 'default' }, style)
        },
        _react2.default.createElement(
          _Surface2.default,
          { width: width, height: height },
          this.renderGrid(radiusAxisCfg, cx, cy, innerRadius, outerRadius),
          this.renderRadiusAxis(radiusAxis, radiusAxisCfg, cx, cy),
          this.renderAngleAxis(cx, cy, outerRadius, maxRadius),
          this.renderRadars(items, radiusAxisCfg.scale, cx, cy, innerRadius, outerRadius)
        ),
        this.renderLegend(items)
      );
    }
  }]);

  return RadarChart;
}(_react.Component), _class2.displayName = 'RadarChart', _class2.propTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  margin: _react.PropTypes.shape({
    top: _react.PropTypes.number,
    right: _react.PropTypes.number,
    bottom: _react.PropTypes.number,
    left: _react.PropTypes.number
  }),

  cx: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  cy: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  startAngle: _react.PropTypes.number,
  innerRadius: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  outerRadius: _react.PropTypes.oneOfType([_react.PropTypes.number, _react.PropTypes.string]),
  clockWise: _react.PropTypes.bool,

  data: _react.PropTypes.array,
  style: _react.PropTypes.object,
  children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node]),
  className: _react.PropTypes.string
}, _class2.defaultProps = {
  width: 0,
  height: 0,
  cx: '50%',
  cy: '50%',
  innerRadius: 0,
  outerRadius: '80%',

  startAngle: 90,
  clockWise: true,
  data: [],
  margin: { top: 0, right: 0, bottom: 0, left: 0 }
}, _temp)) || _class;

exports.default = RadarChart;