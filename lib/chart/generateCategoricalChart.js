'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _range2 = require('lodash/range');

var _range3 = _interopRequireDefault(_range2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _reactDom2 = _interopRequireDefault(_reactDom);

var _rechartsScale = require('recharts-scale');

var _d3Scale = require('d3-scale');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _Surface = require('../container/Surface');

var _Surface2 = _interopRequireDefault(_Surface);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Tooltip = require('../component/Tooltip');

var _Tooltip2 = _interopRequireDefault(_Tooltip);

var _Legend = require('../component/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _LogUtils = require('../util/LogUtils');

var _ReactUtils = require('../util/ReactUtils');

var _CartesianAxis = require('../cartesian/CartesianAxis');

var _CartesianAxis2 = _interopRequireDefault(_CartesianAxis);

var _CartesianGrid = require('../cartesian/CartesianGrid');

var _CartesianGrid2 = _interopRequireDefault(_CartesianGrid);

var _ReferenceLine = require('../cartesian/ReferenceLine');

var _ReferenceLine2 = _interopRequireDefault(_ReferenceLine);

var _ReferenceDot = require('../cartesian/ReferenceDot');

var _ReferenceDot2 = _interopRequireDefault(_ReferenceDot);

var _XAxis = require('../cartesian/XAxis');

var _XAxis2 = _interopRequireDefault(_XAxis);

var _YAxis = require('../cartesian/YAxis');

var _YAxis2 = _interopRequireDefault(_YAxis);

var _Brush = require('../cartesian/Brush');

var _Brush2 = _interopRequireDefault(_Brush);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

var _DOMUtils = require('../util/DOMUtils');

var _DataUtils = require('../util/DataUtils');

var _CartesianUtils = require('../util/CartesianUtils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var ORIENT_MAP = {
  xAxis: ['bottom', 'top'],
  yAxis: ['left', 'right']
};

var generateCategoricalChart = function generateCategoricalChart(ChartComponent, GraphicalChild) {
  var _class, _temp;

  var CategoricalChartWrapper = (_temp = _class = function (_Component) {
    _inherits(CategoricalChartWrapper, _Component);

    function CategoricalChartWrapper(props) {
      _classCallCheck(this, CategoricalChartWrapper);

      var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CategoricalChartWrapper).call(this, props));

      _this.state = {
        dataStartIndex: 0,
        dataEndIndex: _this.props.data && _this.props.data.length - 1 || 0,
        activeTooltipIndex: -1,
        activeTooltipLabel: '',
        activeTooltipCoord: { x: 0, y: 0 },
        isTooltipActive: false
      };

      _this.handleBrushChange = function (_ref) {
        var startIndex = _ref.startIndex;
        var endIndex = _ref.endIndex;

        _this.setState({
          dataStartIndex: startIndex,
          dataEndIndex: endIndex
        });
      };

      _this.handleMouseLeave = function () {
        _this.setState({
          isTooltipActive: false
        });
      };

      _this.validateAxes();
      return _this;
    }

    _createClass(CategoricalChartWrapper, [{
      key: 'componentWillReceiveProps',
      value: function componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
          this.setState({
            dataStartIndex: 0,
            dataEndIndex: nextProps.data && nextProps.data.length - 1 || 0
          });
        }
      }

      /**
      * Get the configuration of all x-axis or y-axis
      * @param  {String} axisType    The type of axis
      * @param  {Array} items        The instances of item
      * @param  {Object} stackGroups The items grouped by axisId and stackId
      * @return {Object}          Configuration
      */

    }, {
      key: 'getAxisMap',
      value: function getAxisMap() {
        var axisType = arguments.length <= 0 || arguments[0] === undefined ? 'xAxis' : arguments[0];
        var items = arguments[1];
        var stackGroups = arguments[2];
        var children = this.props.children;

        var Axis = axisType === 'xAxis' ? _XAxis2.default : _YAxis2.default;
        var axisIdKey = axisType === 'xAxis' ? 'xAxisId' : 'yAxisId';
        // Get all the instance of Axis
        var axes = (0, _ReactUtils.findAllByType)(children, Axis);

        var axisMap = {};

        if (axes && axes.length) {
          axisMap = this.getAxisMapByAxes(axes, items, axisType, axisIdKey, stackGroups);
        } else if (items && items.length) {
          axisMap = this.getAxisMapByItems(items, Axis, axisType, axisIdKey, stackGroups);
        }

        return axisMap;
      }

      /**
       * Get the configuration of axis by the options of axis instance
       * @param {Array}  axes  The instance of axes
       * @param  {Array} items The instances of item
       * @param  {String} axisType The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey The unique id of an axis
       * @param  {Object} stackGroups The items grouped by axisId and stackId
       * @return {Object}      Configuration
       */

    }, {
      key: 'getAxisMapByAxes',
      value: function getAxisMapByAxes(axes, items, axisType, axisIdKey, stackGroups) {
        var _props = this.props;
        var layout = _props.layout;
        var children = _props.children;
        var data = _props.data;
        var _state = this.state;
        var dataEndIndex = _state.dataEndIndex;
        var dataStartIndex = _state.dataStartIndex;

        var displayedData = data.slice(dataStartIndex, dataEndIndex + 1);
        var len = displayedData.length;
        var isCategorial = (0, _CartesianUtils.isCategorialAxis)(layout, axisType);

        // Eliminate duplicated axes
        var axisMap = axes.reduce(function (result, child) {
          var _child$props = child.props;
          var type = _child$props.type;
          var dataKey = _child$props.dataKey;

          var axisId = child.props[axisIdKey];

          if (!result[axisId]) {
            var domain = void 0;

            if (dataKey) {
              domain = (0, _CartesianUtils.getDomainOfDataByKey)(displayedData, dataKey, type);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack && type === 'number') {
              domain = (0, _CartesianUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
            } else if (isCategorial) {
              domain = (0, _range3.default)(0, len);
            } else {
              domain = (0, _CartesianUtils.getDomainOfItemsWithSameAxis)(displayedData, items.filter(function (entry) {
                return entry.props[axisIdKey] === axisId;
              }), type);
            }
            if (type === 'number') {
              // To detect wether there is any reference lines whose props alwaysShow is true
              domain = (0, _CartesianUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType);

              if (child.props.domain) {
                domain = (0, _DataUtils.parseSpecifiedDomain)(child.props.domain, domain);
              }
            }

            return _extends({}, result, _defineProperty({}, axisId, _extends({}, child.props, {
              axisType: axisType,
              domain: domain,
              originalDomain: child.props.domain
            })));
          }

          return result;
        }, {});

        return axisMap;
      }

      /**
       * Get the configuration of axis by the options of item,
       * this kind of axis does not display in chart
       * @param  {Array} items       The instances of item
       * @param  {ReactElement} Axis Axis Component
       * @param  {String} axisType   The type of axis, xAxis - x-axis, yAxis - y-axis
       * @param  {String} axisIdKey  The unique id of an axis
       * @param  {Object} stackGroups The items grouped by axisId and stackId
       * @return {Object}            Configuration
       */

    }, {
      key: 'getAxisMapByItems',
      value: function getAxisMapByItems(items, Axis, axisType, axisIdKey, stackGroups) {
        var _props2 = this.props;
        var layout = _props2.layout;
        var children = _props2.children;
        var data = _props2.data;
        var _state2 = this.state;
        var dataEndIndex = _state2.dataEndIndex;
        var dataStartIndex = _state2.dataStartIndex;

        var displayedData = data.slice(dataStartIndex, dataEndIndex + 1);
        var len = displayedData.length;
        var isCategorial = (0, _CartesianUtils.isCategorialAxis)(layout, axisType);
        var index = -1;

        // The default type of x-axis is category axis,
        // The default contents of x-axis is the serial numbers of data
        // The default type of y-axis is number axis
        // The default contents of y-axis is the domain of data
        var axisMap = items.reduce(function (result, child) {
          var axisId = child.props[axisIdKey];

          if (!result[axisId]) {
            index++;
            var domain = void 0;

            if (isCategorial) {
              domain = (0, _range3.default)(0, len);
            } else if (stackGroups && stackGroups[axisId] && stackGroups[axisId].hasStack) {
              domain = (0, _CartesianUtils.getDomainOfStackGroups)(stackGroups[axisId].stackGroups, dataStartIndex, dataEndIndex);
              domain = (0, _CartesianUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            } else {
              domain = (0, _DataUtils.parseSpecifiedDomain)(Axis.defaultProps.domain, (0, _CartesianUtils.getDomainOfItemsWithSameAxis)(displayedData, items.filter(function (entry) {
                return entry.props[axisIdKey] === axisId;
              }), 'number'));
              domain = (0, _CartesianUtils.detectReferenceElementsDomain)(children, domain, axisId, axisType);
            }

            return _extends({}, result, _defineProperty({}, axisId, _extends({
              axisType: axisType
            }, Axis.defaultProps, {
              hide: true,
              orientation: ORIENT_MAP[axisType][index % 2],
              isAutoGenerated: true,
              domain: domain
            })));
          }

          return result;
        }, {});

        return axisMap;
      }
      /**
       * Configure the scale function of axis
       * @param {Object} scale The scale function
       * @param {Object} opts  The configuration of axis
       * @return {Object}      null
       */

    }, {
      key: 'setTicksOfScale',
      value: function setTicksOfScale(scale, opts) {
        // Give priority to use the options of ticks
        if (opts.ticks && opts.ticks) {
          scale.domain((0, _CartesianUtils.calculateDomainOfTicks)(opts.ticks, opts.type));
          return;
        }

        if (opts.tickCount && opts.type === 'number' && opts.originalDomain && (opts.originalDomain[0] === 'auto' || opts.originalDomain[1] === 'auto')) {
          // Calculate the ticks by the number of grid when the axis is a number axis
          var domain = scale.domain();
          var tickValues = (0, _rechartsScale.getNiceTickValues)(domain, opts.tickCount);

          opts.ticks = tickValues;
          scale.domain((0, _CartesianUtils.calculateDomainOfTicks)(tickValues, opts.type));
        }
      }

      /**
       * Calculate the scale function, position, width, height of axes
       * @param  {Object} axisMap  The configuration of axes
       * @param  {Object} offset   The offset of main part in the svg element
       * @param  {Object} axisType The type of axes, x-axis or y-axis
       * @return {Object} Configuration
       */

    }, {
      key: 'getFormatAxisMap',
      value: function getFormatAxisMap(axisMap, offset, axisType) {
        var _this2 = this;

        var _props3 = this.props;
        var width = _props3.width;
        var height = _props3.height;
        var layout = _props3.layout;

        var displayName = this.constructor.displayName;
        var ids = Object.keys(axisMap);
        var steps = {
          left: offset.left,
          right: width - offset.right,
          top: offset.top,
          bottom: height - offset.bottom
        };

        return ids.reduce(function (result, id) {
          var axis = axisMap[id];
          var orientation = axis.orientation;
          var type = axis.type;
          var domain = axis.domain;

          var range = void 0;

          if (axisType === 'xAxis') {
            range = [offset.left, offset.left + offset.width];
          } else {
            range = layout === 'horizontal' ? [offset.top + offset.height, offset.top] : [offset.top, offset.top + offset.height];
          }
          var scale = void 0;

          if (type === 'number') {
            scale = (0, _d3Scale.scaleLinear)().domain(domain).range(range);
          } else if (displayName === 'LineChart' || displayName === 'AreaChart') {
            scale = (0, _d3Scale.scalePoint)().domain(domain).range(range);
          } else {
            scale = (0, _d3Scale.scaleBand)().domain(domain).range(range);
          }

          _this2.setTicksOfScale(scale, axis);

          var x = void 0;
          var y = void 0;

          if (axisType === 'xAxis') {
            x = offset.left;
            y = orientation === 'top' ? steps[orientation] - axis.height : steps[orientation];
          } else {
            x = orientation === 'left' ? steps[orientation] - axis.width : steps[orientation];
            y = offset.top;
          }

          result[id] = _extends({}, axis, {
            x: x, y: y, scale: scale,
            width: axisType === 'xAxis' ? offset.width : axis.width,
            height: axisType === 'yAxis' ? offset.height : axis.height
          });

          if (!axis.hide && axisType === 'xAxis') {
            steps[orientation] += (orientation === 'top' ? -1 : 1) * result[id].height;
          } else if (!axis.hide) {
            steps[orientation] += (orientation === 'left' ? -1 : 1) * result[id].width;
          }

          return result;
        }, {});
      }
      /**
       * Get the information of mouse in chart, return null when the mouse is not in the chart
       * @param  {Object}  xAxisMap The configuration of all x-axes
       * @param  {Object}  yAxisMap The configuration of all y-axes
       * @param  {Object}  offset   The offset of main part in the svg element
       * @param  {Object}  e        The event object
       * @return {Object}           Mouse data
       */

    }, {
      key: 'getMouseInfo',
      value: function getMouseInfo(xAxisMap, yAxisMap, offset, e) {
        var isIn = e.chartX >= offset.left && e.chartX <= offset.left + offset.width && e.chartY >= offset.top && e.chartY <= offset.top + offset.height;

        if (!isIn) {
          return null;
        }

        var layout = this.props.layout;

        var axisMap = layout === 'horizontal' ? xAxisMap : yAxisMap;
        var pos = layout === 'horizontal' ? e.chartX : e.chartY;
        var axis = (0, _DataUtils.getAnyElementOfObject)(axisMap);
        var ticks = (0, _CartesianUtils.getTicksOfAxis)(axis, true);
        var activeIndex = (0, _CartesianUtils.calculateActiveTickIndex)(pos, ticks);

        if (activeIndex >= 0) {
          return {
            activeTooltipIndex: activeIndex,
            activeTooltipLabel: ticks[activeIndex].value,
            activeTooltipCoord: {
              x: layout === 'horizontal' ? ticks[activeIndex].coordinate : e.chartX,
              y: layout === 'horizontal' ? e.chartY : ticks[activeIndex].coordinate
            }
          };
        }

        return null;
      }
      /**
       * Get the content to be displayed in the tooltip
       * @param  {Array} items The instances of item
       * @return {Array}       The content of tooltip
       */

    }, {
      key: 'getTooltipContent',
      value: function getTooltipContent(items) {
        var _state3 = this.state;
        var activeTooltipIndex = _state3.activeTooltipIndex;
        var dataStartIndex = _state3.dataStartIndex;
        var dataEndIndex = _state3.dataEndIndex;

        var data = this.props.data.slice(dataStartIndex, dataEndIndex + 1);

        if (activeTooltipIndex < 0 || !items || !items.length) {
          return null;
        }

        return items.map(function (child) {
          var _child$props2 = child.props;
          var dataKey = _child$props2.dataKey;
          var name = _child$props2.name;
          var unit = _child$props2.unit;
          var formatter = _child$props2.formatter;


          return {
            name: name || dataKey,
            unit: unit || '',
            color: (0, _CartesianUtils.getMainColorOfGraphicItem)(child),
            value: data[activeTooltipIndex][dataKey],
            formatter: formatter
          };
        });
      }
      /**
       * Calculate the offset of main part in the svg element
       * @param  {Array} items       The instances of item
       * @param  {Object} xAxisMap  The configuration of x-axis
       * @param  {Object} yAxisMap  The configuration of y-axis
       * @return {Object} The offset of main part in the svg element
       */

    }, {
      key: 'calculateOffset',
      value: function calculateOffset(items, xAxisMap, yAxisMap) {
        var _props4 = this.props;
        var width = _props4.width;
        var height = _props4.height;
        var margin = _props4.margin;
        var children = _props4.children;

        var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush2.default);

        var offsetH = Object.keys(yAxisMap).reduce(function (result, id) {
          var entry = yAxisMap[id];
          var orientation = entry.orientation;

          result[orientation] += entry.hide ? 0 : entry.width;

          return result;
        }, { left: margin.left || 0, right: margin.right || 0 });

        var offsetV = Object.keys(xAxisMap).reduce(function (result, id) {
          var entry = xAxisMap[id];
          var orientation = entry.orientation;

          result[orientation] += entry.hide ? 0 : entry.height;

          return result;
        }, { top: margin.top || 0, bottom: margin.bottom || 0 });

        var brushBottom = offsetV.bottom;

        if (brushItem) {
          offsetV.bottom += brushItem.props.height || _Brush2.default.defaultProps.height;
        }

        var legendProps = (0, _CartesianUtils.getLegendProps)(children, items, width, height);
        if (legendProps) {
          var box = _Legend2.default.getLegendBBox(legendProps, width, height) || {};
          if (legendProps.layout === 'horizontal' && (0, _isNumber3.default)(offsetV[legendProps.verticalAlign])) {
            offsetV[legendProps.verticalAlign] += box.height || 0;
          } else if (legendProps.layout === 'vertical' && (0, _isNumber3.default)(offsetH[legendProps.align])) {
            offsetH[legendProps.align] += box.width || 0;
          }
        }

        return _extends({
          brushBottom: brushBottom
        }, offsetH, offsetV, {
          width: width - offsetH.left - offsetH.right,
          height: height - offsetV.top - offsetV.bottom
        });
      }
    }, {
      key: 'handleMouseEnter',

      /**
       * The handler of mouse entering chart
       * @param  {Object} offset   The offset of main part in the svg element
       * @param  {Object} xAxisMap The configuration of all x-axes
       * @param  {Object} yAxisMap The configuration of all y-axes
       * @param  {Object} e        Event object
       * @return {Null}            null
       */
      value: function handleMouseEnter(offset, xAxisMap, yAxisMap, e) {
        var container = _reactDom2.default.findDOMNode(this);
        var containerOffset = (0, _DOMUtils.getOffset)(container);
        var ne = (0, _CartesianUtils.calculateChartCoordinate)(e, containerOffset);
        var mouse = this.getMouseInfo(xAxisMap, yAxisMap, offset, ne);

        if (mouse) {
          this.setState(_extends({}, mouse, {
            isTooltipActive: true
          }));
        }
      }

      /**
       * The handler of mouse moving in chart
       * @param  {Object} offset   The offset of main part in the svg element
       * @param  {Object} xAxisMap The configuration of all x-axes
       * @param  {Object} yAxisMap The configuration of all y-axes
       * @param  {Object} e        Event object
       * @return {Null} no return
       */

    }, {
      key: 'handleMouseMove',
      value: function handleMouseMove(offset, xAxisMap, yAxisMap, e) {
        var container = _reactDom2.default.findDOMNode(this);
        var containerOffset = (0, _DOMUtils.getOffset)(container);
        var ne = (0, _CartesianUtils.calculateChartCoordinate)(e, containerOffset);
        var mouse = this.getMouseInfo(xAxisMap, yAxisMap, offset, ne);

        if (mouse) {
          this.setState(_extends({}, mouse, {
            isTooltipActive: true
          }));
        } else {
          this.setState({
            isTooltipActive: false
          });
        }
      }
      /**
       * The handler if mouse leaving chart
       * @return {Null} no return
       */

    }, {
      key: 'validateAxes',
      value: function validateAxes() {
        var _props5 = this.props;
        var layout = _props5.layout;
        var children = _props5.children;

        var xAxes = (0, _ReactUtils.findAllByType)(children, _XAxis2.default);
        var yAxes = (0, _ReactUtils.findAllByType)(children, _YAxis2.default);

        if (layout === 'horizontal' && xAxes && xAxes.length) {
          xAxes.forEach(function (axis) {
            (0, _LogUtils.warn)(axis.props.type === 'category', 'x-axis should be category axis when the layout is horizontal');
          });
        } else if (layout === 'vertical') {
          var displayName = this.constructor.displayName;

          (0, _LogUtils.warn)(yAxes && yAxes.length, 'You should add <YAxis type="number" /> in ' + displayName + '.\n           The layout is vertical now, y-axis should be category axis,\n           but y-axis is number axis when no YAxis is added.');
          (0, _LogUtils.warn)(xAxes && xAxes.length, 'You should add <XAxis /> in ' + displayName + '.\n          The layout is vertical now, x-axis is category when no XAxis is added.');

          if (yAxes && yAxes.length) {
            yAxes.forEach(function (axis) {
              (0, _LogUtils.warn)(axis.props.type === 'category', 'y-axis should be category axis when the layout is vertical');
            });
          }
        }

        return null;
      }
      /**
       * Draw axes
       * @param {Object} axisMap The configuration of all x-axes or y-axes
       * @param {String} name    The name of axes
       * @return {ReactElement}  The instance of x-axes
       */

    }, {
      key: 'renderAxes',
      value: function renderAxes(axisMap, name) {
        var _props6 = this.props;
        var width = _props6.width;
        var height = _props6.height;

        var ids = axisMap && Object.keys(axisMap);

        if (ids && ids.length) {
          var axes = [];

          for (var i = 0, len = ids.length; i < len; i++) {
            var axis = axisMap[ids[i]];

            if (!axis.hide) {
              axes.push(_react2.default.createElement(_CartesianAxis2.default, _extends({}, axis, {
                key: name + '-' + ids[i],
                viewBox: { x: 0, y: 0, width: width, height: height },
                ticks: (0, _CartesianUtils.getTicksOfAxis)(axis, true)
              })));
            }
          }

          return axes.length ? _react2.default.createElement(
            _Layer2.default,
            { key: name + '-layer', className: 'recharts-' + name },
            axes
          ) : null;
        }

        return null;
      }
      /**
       * Draw grid
       * @param  {Object} xAxisMap The configuration of all x-axes
       * @param  {Object} yAxisMap The configuration of all y-axes
       * @param  {Object} offset   The offset of main part in the svg element
       * @return {ReactElement} The instance of grid
       */

    }, {
      key: 'renderGrid',
      value: function renderGrid(xAxisMap, yAxisMap, offset) {
        var _props7 = this.props;
        var children = _props7.children;
        var width = _props7.width;
        var height = _props7.height;

        var gridItem = (0, _ReactUtils.findChildByType)(children, _CartesianGrid2.default);

        if (!gridItem) {
          return null;
        }

        var xAxis = (0, _DataUtils.getAnyElementOfObject)(xAxisMap);
        var yAxis = (0, _DataUtils.getAnyElementOfObject)(yAxisMap);

        var verticalPoints = (0, _CartesianUtils.getTicksOfGrid)(_CartesianAxis2.default.getTicks(_extends({}, _CartesianAxis2.default.defaultProps, xAxis, {
          ticks: (0, _CartesianUtils.getTicksOfAxis)(xAxis, true),
          viewBox: { x: 0, y: 0, width: width, height: height }
        })), offset.left, offset.left + offset.width);

        var horizontalPoints = (0, _CartesianUtils.getTicksOfGrid)(_CartesianAxis2.default.getTicks(_extends({}, _CartesianAxis2.default.defaultProps, yAxis, {
          ticks: (0, _CartesianUtils.getTicksOfAxis)(yAxis, true),
          viewBox: { x: 0, y: 0, width: width, height: height }
        })), offset.top, offset.top + offset.height);

        return _react2.default.cloneElement(gridItem, {
          key: 'grid',
          x: offset.left,
          y: offset.top,
          width: offset.width,
          height: offset.height,
          verticalPoints: verticalPoints, horizontalPoints: horizontalPoints
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
        var _props8 = this.props;
        var children = _props8.children;
        var width = _props8.width;
        var height = _props8.height;

        var props = (0, _CartesianUtils.getLegendProps)(children, items, width, height);

        if (!props) {
          return null;
        }

        var margin = this.props.margin;


        return _react2.default.createElement(_Legend2.default, _extends({}, props, {
          chartWidth: width,
          chartHeight: height,
          margin: margin
        }));
      }

      /**
       * Draw Tooltip
       * @param  {Array} items   The instances of item
       * @param  {Object} offset The offset of main part in the svg element
       * @return {ReactElement}  The instance of Tooltip
       */

    }, {
      key: 'renderTooltip',
      value: function renderTooltip(items, offset) {
        var children = this.props.children;

        var tooltipItem = (0, _ReactUtils.findChildByType)(children, _Tooltip2.default);

        if (!tooltipItem) {
          return null;
        }

        var _state4 = this.state;
        var isTooltipActive = _state4.isTooltipActive;
        var activeTooltipLabel = _state4.activeTooltipLabel;
        var activeTooltipCoord = _state4.activeTooltipCoord;

        var viewBox = {
          x: offset.left,
          y: offset.top,
          width: offset.width,
          height: offset.height
        };

        return _react2.default.cloneElement(tooltipItem, {
          viewBox: viewBox,
          active: isTooltipActive,
          label: activeTooltipLabel,
          payload: isTooltipActive ? this.getTooltipContent(items) : [],
          coordinate: activeTooltipCoord
        });
      }
    }, {
      key: 'renderBrush',
      value: function renderBrush(xAxisMap, yAxisMap, offset) {
        var _props9 = this.props;
        var children = _props9.children;
        var data = _props9.data;
        var margin = _props9.margin;

        var brushItem = (0, _ReactUtils.findChildByType)(children, _Brush2.default);

        if (!brushItem) {
          return null;
        }

        var dataKey = brushItem.props.dataKey;

        return _react2.default.cloneElement(brushItem, {
          onChange: this.handleBrushChange,
          data: data.map(function (entry) {
            return entry[dataKey];
          }),
          x: offset.left,
          y: offset.top + offset.height + offset.brushBottom - (margin.bottom || 0),
          width: offset.width
        });
      }
    }, {
      key: 'renderReferenceLines',
      value: function renderReferenceLines(xAxisMap, yAxisMap, offset) {
        var children = this.props.children;

        var lines = (0, _ReactUtils.findAllByType)(children, _ReferenceLine2.default);

        if (!lines || !lines.length) {
          return null;
        }

        return lines.map(function (entry, i) {
          return _react2.default.cloneElement(entry, {
            key: 'reference-line-' + i,
            xAxisMap: xAxisMap, yAxisMap: yAxisMap,
            viewBox: {
              x: offset.left,
              y: offset.top,
              width: offset.width,
              height: offset.height
            }
          });
        });
      }
    }, {
      key: 'renderReferenceDots',
      value: function renderReferenceDots(xAxisMap, yAxisMap, offset) {
        var children = this.props.children;

        var dots = (0, _ReactUtils.findAllByType)(children, _ReferenceDot2.default);

        if (!dots || !dots.length) {
          return null;
        }

        return dots.map(function (entry, i) {
          return _react2.default.cloneElement(entry, {
            key: 'reference-dot-' + i,
            xAxisMap: xAxisMap, yAxisMap: yAxisMap
          });
        });
      }
    }, {
      key: 'render',
      value: function render() {
        var data = this.props.data;

        if (!(0, _ReactUtils.validateWidthHeight)(this) || !data || !data.length) {
          return null;
        }

        var _props10 = this.props;
        var style = _props10.style;
        var children = _props10.children;
        var layout = _props10.layout;
        var className = _props10.className;
        var width = _props10.width;
        var height = _props10.height;

        var numberAxisName = layout === 'horizontal' ? 'yAxis' : 'xAxis';
        var items = (0, _ReactUtils.findAllByType)(children, GraphicalChild);
        var stackGroups = (0, _CartesianUtils.getStackGroupsByAxisId)(data, items, numberAxisName + 'Id');

        var xAxisMap = this.getAxisMap('xAxis', items, numberAxisName === 'xAxis' && stackGroups);
        var yAxisMap = this.getAxisMap('yAxis', items, numberAxisName === 'yAxis' && stackGroups);
        var offset = this.calculateOffset(items, xAxisMap, yAxisMap);

        xAxisMap = this.getFormatAxisMap(xAxisMap, offset, 'xAxis');
        yAxisMap = this.getFormatAxisMap(yAxisMap, offset, 'yAxis');

        return _react2.default.createElement(
          'div',
          { className: (0, _classnames2.default)('recharts-wrapper', className),
            style: _extends({ position: 'relative', cursor: 'default' }, style),
            onMouseEnter: this.handleMouseEnter.bind(this, offset, xAxisMap, yAxisMap),
            onMouseMove: this.handleMouseMove.bind(this, offset, xAxisMap, yAxisMap),
            onMouseLeave: this.handleMouseLeave
          },
          _react2.default.createElement(
            _Surface2.default,
            { width: width, height: height },
            this.renderGrid(xAxisMap, yAxisMap, offset),
            this.renderReferenceLines(xAxisMap, yAxisMap, offset),
            this.renderReferenceDots(xAxisMap, yAxisMap, offset),
            this.renderAxes(xAxisMap, 'x-axis'),
            this.renderAxes(yAxisMap, 'y-axis'),
            _react2.default.createElement(ChartComponent, _extends({}, this.props, this.state, {
              graphicalItems: items,
              xAxisMap: xAxisMap,
              yAxisMap: yAxisMap,
              offset: offset,
              stackGroups: stackGroups
            })),
            this.renderBrush(xAxisMap, yAxisMap, offset)
          ),
          this.renderLegend(items),
          this.renderTooltip(items, offset)
        );
      }
    }]);

    return CategoricalChartWrapper;
  }(_react.Component), _class.displayName = (0, _ReactUtils.getDisplayName)(ChartComponent), _class.propTypes = {
    width: _react.PropTypes.number,
    height: _react.PropTypes.number,
    data: _react.PropTypes.arrayOf(_react.PropTypes.object),
    layout: _react.PropTypes.oneOf(['horizontal', 'vertical']),
    margin: _react.PropTypes.shape({
      top: _react.PropTypes.number,
      right: _react.PropTypes.number,
      bottom: _react.PropTypes.number,
      left: _react.PropTypes.number
    }),
    style: _react.PropTypes.object,
    className: _react.PropTypes.string,
    children: _react.PropTypes.oneOfType([_react.PropTypes.arrayOf(_react.PropTypes.node), _react.PropTypes.node])
  }, _class.defaultProps = {
    layout: 'horizontal',
    margin: { top: 5, right: 5, bottom: 5, left: 5 }
  }, _temp);


  return CategoricalChartWrapper;
};

exports.default = generateCategoricalChart;