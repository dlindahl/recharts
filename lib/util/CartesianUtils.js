'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getLegendProps = exports.getMainColorOfGraphicItem = exports.calculateActiveTickIndex = exports.getTicksOfAxis = exports.getTicksOfGrid = exports.isCategorialAxis = exports.getDomainOfItemsWithSameAxis = exports.getDomainOfStackGroups = exports.getDomainOfDataByKey = exports.calculateDomainOfTicks = exports.calculateChartCoordinate = exports.getStackedDataOfItem = exports.getStackGroupsByAxisId = exports.getStackedData = exports.detectReferenceElementsDomain = undefined;

var _uniqueId2 = require('lodash/uniqueId');

var _uniqueId3 = _interopRequireDefault(_uniqueId2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _isNumber2 = require('lodash/isNumber');

var _isNumber3 = _interopRequireDefault(_isNumber2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _ReactUtils = require('./ReactUtils');

var _ReferenceDot = require('../cartesian/ReferenceDot');

var _ReferenceDot2 = _interopRequireDefault(_ReferenceDot);

var _ReferenceLine = require('../cartesian/ReferenceLine');

var _ReferenceLine2 = _interopRequireDefault(_ReferenceLine);

var _Legend = require('../component/Legend');

var _Legend2 = _interopRequireDefault(_Legend);

var _d3Shape = require('d3-shape');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var detectReferenceElementsDomain = exports.detectReferenceElementsDomain = function detectReferenceElementsDomain(children, domain, axisId, axisType) {
  var lines = (0, _ReactUtils.findAllByType)(children, _ReferenceLine2.default);
  var dots = (0, _ReactUtils.findAllByType)(children, _ReferenceDot2.default);
  var elements = lines.concat(dots);
  var idKey = axisType + 'Id';
  var valueKey = axisType[0];

  return elements.reduce(function (result, el) {
    if (el.props[idKey] === axisId && el.props.alwaysShow && (0, _isNumber3.default)(el.props[valueKey])) {
      var value = el.props[valueKey];

      return [Math.min(result[0], value), Math.max(result[1], value)];
    }
    return result;
  }, domain);
};

var getStackedData = exports.getStackedData = function getStackedData(data, stackItems) {
  var dataKeys = stackItems.map(function (item) {
    return item.props.dataKey;
  });
  var stack = (0, _d3Shape.stack)().keys(dataKeys).value(function (d, key) {
    return +d[key] || 0;
  }).order(_d3Shape.stackOrderNone).offset(_d3Shape.stackOffsetNone);

  return stack(data);
};

var getStackGroupsByAxisId = exports.getStackGroupsByAxisId = function getStackGroupsByAxisId(data, items, axisIdKey) {
  var stackGroups = items.reduce(function (result, item) {
    var _item$props = item.props;
    var stackId = _item$props.stackId;
    var dataKey = _item$props.dataKey;

    var axisId = item.props[axisIdKey];

    if (!result[axisId]) {
      result[axisId] = { hasStack: false, stackGroups: {} };
    }

    if ((0, _isNumber3.default)(stackId) || (0, _isString3.default)(stackId)) {
      if (!result[axisId].stackGroups[stackId]) {
        result[axisId].stackGroups[stackId] = {
          items: []
        };
      }
      result[axisId].stackGroups[stackId].items.push(item);

      if (result[axisId].stackGroups[stackId].items.length >= 2) {
        result[axisId].hasStack = true;
      }
    } else {
      result[axisId].stackGroups[(0, _uniqueId3.default)('_stackId_')] = {
        items: [item]
      };
    }

    return result;
  }, {});

  return Object.keys(stackGroups).reduce(function (result, axisId) {
    var group = stackGroups[axisId];

    if (group.hasStack) {
      group.stackGroups = Object.keys(group.stackGroups).reduce(function (res, stackId) {
        var g = group.stackGroups[stackId];

        return _extends({}, res, _defineProperty({}, stackId, {
          items: g.items,
          stackedData: getStackedData(data, g.items)
        }));
      }, {});
    }

    return _extends({}, result, _defineProperty({}, axisId, group));
  }, {});
};

var getStackedDataOfItem = exports.getStackedDataOfItem = function getStackedDataOfItem(item, stackGroups) {
  var stackId = item.props.stackId;


  if ((0, _isNumber3.default)(stackId) || (0, _isString3.default)(stackId)) {
    var group = stackGroups[stackId];

    if (group && group.items.length) {
      var itemIndex = -1;

      for (var i = 0, len = group.items.length; i < len; i++) {
        if (group.items[i] === item) {
          itemIndex = i;
          break;
        }
      }
      return itemIndex >= 0 ? group.stackedData[itemIndex] : null;
    }
  }

  return null;
};

/**
 * Calculate coordinate of cursor in chart
 * @param  {Object} event  Event object
 * @param  {Object} offset The offset of main part in the svg element
 * @return {Object}        {chartX, chartY}
 */
var calculateChartCoordinate = exports.calculateChartCoordinate = function calculateChartCoordinate(event, offset) {
  return {
    chartX: Math.round(event.pageX - offset.left),
    chartY: Math.round(event.pageY - offset.top)
  };
};
/**
 * get domain of ticks
 * @param  {Array} ticks Ticks of axis
 * @param  {String} type  The type of axis
 * @return {Array} domain
 */
var calculateDomainOfTicks = exports.calculateDomainOfTicks = function calculateDomainOfTicks(ticks, type) {
  if (type === 'number') {
    return [Math.min.apply(null, ticks), Math.max.apply(null, ticks)];
  }

  return ticks;
};

/**
 * Get domain of data by key
 * @param  {Array} data   The data displayed in the chart
 * @param  {String} key  The unique key of a group of data
 * @param  {String} type The type of axis
 * @return {Array} Domain of data
 */
var getDomainOfDataByKey = exports.getDomainOfDataByKey = function getDomainOfDataByKey(data, key, type) {
  var defaultValue = type === 'number' ? 0 : '';
  var domain = data.map(function (entry) {
    return entry[key] || defaultValue;
  });

  return type === 'number' ? [Math.min.apply(null, domain), Math.max.apply(null, domain)] : domain;
};

var getDomainOfStackGroups = exports.getDomainOfStackGroups = function getDomainOfStackGroups(stackGroups, startIndex, endIndex) {
  return Object.keys(stackGroups).reduce(function (result, stackId) {
    var group = stackGroups[stackId];
    var stackedData = group.stackedData;

    var minList = stackedData[0].slice(startIndex, endIndex + 1);
    var maxList = stackedData[stackedData.length - 1].slice(startIndex, endIndex + 1);
    var min = minList.reduce(function (res, entry) {
      return Math.min(res, entry[0]);
    }, Infinity);
    var max = maxList.reduce(function (res, entry) {
      return Math.max(res, entry[1]);
    }, -Infinity);

    return [Math.min(min, result[0]), Math.max(max, result[1])];
  }, [Infinity, -Infinity]);
};

/**
 * Get domain of data by the configuration of item element
 * @param  {Array} data   The data displayed in the chart
 * @param  {Array} items  The instances of item
 * @param  {String} type  The type of axis, number - Number Axis, category - Category Axis
 * @return {Array}        Domain
 */
var getDomainOfItemsWithSameAxis = exports.getDomainOfItemsWithSameAxis = function getDomainOfItemsWithSameAxis(data, items, type) {
  var domains = items.map(function (item) {
    return getDomainOfDataByKey(data, item.props.dataKey, type);
  });

  if (type === 'number') {
    // Calculate the domain of number axis
    return domains.reduce(function (result, entry) {
      return [Math.min(result[0], entry[0]), Math.max(result[1], entry[1])];
    }, [Infinity, -Infinity]);
  }

  var tag = {};
  // Get the union set of category axis
  return domains.reduce(function (result, entry) {
    for (var i = 0, len = entry.length; i < len; i++) {
      if (!tag[entry[i]]) {
        tag[entry[i]] = true;

        result.push(entry[i]);
      }
    }
    return result;
  }, []);
};

var isCategorialAxis = exports.isCategorialAxis = function isCategorialAxis(layout, axisType) {
  return layout === 'horizontal' && axisType === 'xAxis' || layout === 'vertical' && axisType === 'yAxis';
};
/**
* Calculate the ticks of grid
* @param  {Array} ticks The ticks in axis
* @param {Number} min   The minimun value of axis
* @param {Number} max   The maximun value of axis
* @return {Array}       Ticks
*/
var getTicksOfGrid = exports.getTicksOfGrid = function getTicksOfGrid(ticks, min, max) {
  var hasMin = void 0;
  var hasMax = void 0;

  var values = ticks.map(function (entry) {
    if (entry.coordinate === min) {
      hasMin = true;
    }
    if (entry.coordinate === max) {
      hasMax = true;
    }

    return entry.coordinate;
  });

  if (!hasMin) {
    values.push(min);
  }
  if (!hasMax) {
    values.push(max);
  }

  return values;
};

/**
 * Get the ticks of an axis
 * @param  {Object}  axis The configuration of an axis
 * @param {Boolean} isGrid Whether or not are the ticks in grid
 * @return {Array}  Ticks
 */
var getTicksOfAxis = exports.getTicksOfAxis = function getTicksOfAxis(axis, isGrid) {
  var scale = axis.scale;
  var offset = isGrid && axis.type === 'category' ? scale.bandwidth() / 2 : 0;

  if (axis.ticks) {
    return axis.ticks.map(function (entry) {
      return { coordinate: scale(entry) + offset, value: entry };
    });
  }

  if (scale.ticks) {
    return scale.ticks(axis.tickCount).map(function (entry) {
      return { coordinate: scale(entry) + offset, value: entry };
    });
  }

  return scale.domain().map(function (entry) {
    return { coordinate: scale(entry) + offset, value: entry };
  });
};

var calculateActiveTickIndex = exports.calculateActiveTickIndex = function calculateActiveTickIndex(coordinate, ticks) {
  var index = -1;
  var len = ticks.length;

  if (len > 1) {
    for (var i = 0; i < len; i++) {
      if (i === 0 && coordinate <= (ticks[i].coordinate + ticks[i + 1].coordinate) / 2 || i > 0 && i < len - 1 && coordinate > (ticks[i].coordinate + ticks[i - 1].coordinate) / 2 && coordinate <= (ticks[i].coordinate + ticks[i + 1].coordinate) / 2 || i === len - 1 && coordinate > (ticks[i].coordinate + ticks[i - 1].coordinate) / 2) {
        index = i;
        break;
      }
    }
  }

  return index;
};

/**
 * Get the main color of each graphic item
 * @param  {ReactElement} item A graphic item
 * @return {String}            Color
 */
var getMainColorOfGraphicItem = exports.getMainColorOfGraphicItem = function getMainColorOfGraphicItem(item) {
  var displayName = item.type.displayName;
  var result = void 0;

  switch (displayName) {
    case 'Line':
      result = item.props.stroke;
      break;
    default:
      result = item.props.fill;
      break;
  }

  return result;
};

var getLegendProps = exports.getLegendProps = function getLegendProps(children, graphicItems, width, height) {
  var legendItem = (0, _ReactUtils.findChildByType)(children, _Legend2.default);

  if (!legendItem) {
    return null;
  }

  var legendData = legendItem.props && legendItem.props.payload || graphicItems.map(function (child) {
    var _child$props = child.props;
    var dataKey = _child$props.dataKey;
    var name = _child$props.name;
    var legendType = _child$props.legendType;


    return {
      type: legendType || 'square',
      color: getMainColorOfGraphicItem(child),
      value: name || dataKey
    };
  }, undefined);

  return _extends({}, legendItem.props, _Legend2.default.getWithHeight(legendItem, width, height), {
    payload: legendData
  });
};