'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; /**
                                                                                                                                                                                                                                                                   * @fileOverview TreemapChart
                                                                                                                                                                                                                                                                   */


var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _Surface = require('../container/Surface');

var _Surface2 = _interopRequireDefault(_Surface);

var _Layer = require('../container/Layer');

var _Layer2 = _interopRequireDefault(_Layer);

var _Rectangle = require('../shape/Rectangle');

var _Rectangle2 = _interopRequireDefault(_Rectangle);

var _ReactUtils = require('../util/ReactUtils');

var _classnames = require('classnames');

var _classnames2 = _interopRequireDefault(_classnames);

var _reactSmooth = require('react-smooth');

var _reactSmooth2 = _interopRequireDefault(_reactSmooth);

var _PureRender = require('../util/PureRender');

var _PureRender2 = _interopRequireDefault(_PureRender);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var computeNode = function computeNode(depth, node, index, valueKey) {
  var children = node.children;

  var childDepth = depth + 1;
  var computedChildren = children && children.length ? children.map(function (child, i) {
    return computeNode(childDepth, child, i, valueKey);
  }) : null;
  var value = void 0;

  if (children && children.length) {
    value = computedChildren.reduce(function (result, child) {
      return result + child.value;
    }, 0);
  } else {
    value = isNaN(node[valueKey]) || node[valueKey] <= 0 ? 0 : node[valueKey];
  }

  return _extends({}, node, {
    children: computedChildren,
    value: value, depth: depth, index: index
  });
};

var pad = function pad(node) {
  return { x: node.x, y: node.y, width: node.width, height: node.height };
};

// Compute the area for each child based on value & scale.
var scale = function scale(children, k) {
  var formatK = k < 0 ? 0 : k;

  return children.map(function (child) {
    var area = child.value * formatK;

    return _extends({}, child, {
      area: isNaN(area) || area <= 0 ? 0 : area
    });
  });
};

// Computes the score for the specified row, as the worst aspect ratio.
var worst = function worst(row, size, ratio) {
  var newSize = size * size;
  var rowArea = row.area * row.area;

  var _row$reduce = row.reduce(function (result, child) {
    return {
      min: Math.min(result.min, child.area),
      max: Math.max(result.max, child.area)
    };
  }, { min: Infinity, max: 0 });

  var min = _row$reduce.min;
  var max = _row$reduce.max;


  return rowArea ? Math.max(newSize * max * ratio / rowArea, rowArea / (newSize * min * ratio)) : Infinity;
};

// Positions the specified row of nodes. Modifies `rect`.
var position = function position(row, size, rect, flush) {
  var i = -1;
  var n = row.length;
  var x = rect.x;
  var y = rect.y;
  var v = size ? Math.round(row.area / size) : 0;
  var o = void 0;

  if (size === rect.width) {
    // horizontal subdivision
    if (flush || v > rect.height) v = rect.height; // over+underflow
    while (++i < n) {
      o = row[i];
      o.x = x;
      o.y = y;
      o.height = v;
      x += o.width = Math.min(rect.x + rect.width - x, v ? Math.round(o.area / v) : 0);
    }
    o.z = true;
    o.width += rect.x + rect.width - x; // rounding error
    rect.y += v;
    rect.height -= v;
  } else {
    // vertical subdivision
    if (flush || v > rect.width) v = rect.width; // over+underflow
    while (++i < n) {
      o = row[i];
      o.x = x;
      o.y = y;
      o.width = v;
      y += o.height = Math.min(rect.y + rect.height - y, v ? Math.round(o.area / v) : 0);
    }
    o.z = false;
    o.height += rect.y + rect.height - y; // rounding error
    rect.x += v;
    rect.width -= v;
  }
};

// Recursively arranges the specified node's children into squarified rows.
var squarify = function squarify(node, ratio) {
  var children = node.children;

  if (children && children.length) {
    var rect = pad(node);
    var row = [];
    var best = Infinity; // the best row score so far
    var score = void 0; // the current row score
    var size = Math.min(rect.width, rect.height); // initial orientation
    var scaleChildren = scale(children, rect.width * rect.height / node.value);
    var tempChildren = scaleChildren.slice();

    row.area = 0;

    var child = void 0;

    while (tempChildren.length > 0) {
      row.push(child = tempChildren[0]);
      row.area += child.area;

      score = worst(row, size, ratio);
      if (score <= best) {
        // continue with this orientation
        tempChildren.shift();
        best = score;
      } else {
        // abort, and try a different orientation
        row.area -= row.pop().area;
        position(row, size, rect, false);
        size = Math.min(rect.width, rect.height);
        row.length = row.area = 0;
        best = Infinity;
      }
    }
    if (row.length) {
      position(row, size, rect, true);
      row.length = row.area = 0;
    }

    return _extends({}, node, { children: scaleChildren.map(function (c) {
        return squarify(c, ratio);
      }) });
  }

  return node;
};

var Treemap = (0, _PureRender2.default)(_class = (_temp = _class2 = function (_Component) {
  _inherits(Treemap, _Component);

  function Treemap() {
    _classCallCheck(this, Treemap);

    return _possibleConstructorReturn(this, Object.getPrototypeOf(Treemap).apply(this, arguments));
  }

  _createClass(Treemap, [{
    key: 'renderDefaultNode',
    value: function renderDefaultNode(nodeProps) {
      var _props = this.props;
      var isAnimationActive = _props.isAnimationActive;
      var animationBegin = _props.animationBegin;
      var animationDuration = _props.animationDuration;
      var animationEasing = _props.animationEasing;
      var width = nodeProps.width;
      var height = nodeProps.height;

      var translateX = parseInt((Math.random() * 2 - 1) * width, 10);
      var translateY = parseInt((Math.random() * 2 - 1) * height, 10);

      return _react2.default.createElement(
        _reactSmooth2.default,
        { from: 'translate(' + translateX + 'px, ' + translateX + 'px)',
          to: 'translate(0, 0)',
          attributeName: 'transform',
          animationBegin: animationBegin,
          animationEasing: animationEasing,
          isAnimationActive: isAnimationActive,
          animationDuration: animationDuration
        },
        _react2.default.createElement(
          'g',
          null,
          _react2.default.createElement(_Rectangle2.default, _extends({}, nodeProps, {
            isAnimationActive: isAnimationActive
          }))
        )
      );
    }
  }, {
    key: 'renderNode',
    value: function renderNode(root, node, i) {
      var _this2 = this;

      var content = this.props.content;

      var nodeProps = _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), node, { root: root });
      var contentItem = void 0;

      if (_react2.default.isValidElement(content)) {
        contentItem = _react2.default.cloneElement(content, nodeProps);
      } else if ((0, _isFunction3.default)(content)) {
        contentItem = content(nodeProps);
      } else {
        contentItem = this.renderDefaultNode(nodeProps);
      }

      return _react2.default.createElement(
        _Layer2.default,
        { key: 'recharts-treemap-node-' + i },
        contentItem,
        node.children && node.children.length ? node.children.map(function (child, index) {
          return _this2.renderNode(node, child, index);
        }) : null
      );
    }
  }, {
    key: 'renderAllNodes',
    value: function renderAllNodes() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var data = _props2.data;
      var dataKey = _props2.dataKey;
      var ratio = _props2.ratio;


      var root = computeNode(0, {
        children: data,
        x: 0,
        y: 0,
        width: width,
        height: height
      }, 0, dataKey);

      var formatRoot = squarify(root, ratio);

      return this.renderNode(formatRoot, formatRoot, 0);
    }
  }, {
    key: 'render',
    value: function render() {
      if (!(0, _ReactUtils.validateWidthHeight)(this)) {
        return null;
      }

      var _props3 = this.props;
      var width = _props3.width;
      var height = _props3.height;
      var className = _props3.className;
      var style = _props3.style;


      return _react2.default.createElement(
        'div',
        { className: (0, _classnames2.default)('recharts-wrapper', className),
          style: _extends({ position: 'relative', cursor: 'default' }, style)
        },
        _react2.default.createElement(
          _Surface2.default,
          { width: width, height: height },
          this.renderAllNodes()
        )
      );
    }
  }]);

  return Treemap;
}(_react.Component), _class2.displayName = 'Treemap', _class2.propTypes = {
  width: _react.PropTypes.number,
  height: _react.PropTypes.number,
  data: _react.PropTypes.array,
  style: _react.PropTypes.object,
  ratio: _react.PropTypes.number,
  content: _react.PropTypes.oneOfType([_react.PropTypes.element, _react.PropTypes.func]),
  fill: _react.PropTypes.string,
  stroke: _react.PropTypes.string,
  className: _react.PropTypes.string,
  dataKey: _react.PropTypes.string,
  isAnimationActive: _react.PropTypes.bool,
  animationBegin: _react.PropTypes.number,
  animationDuration: _react.PropTypes.number,
  animationEasing: _react.PropTypes.oneOf(['ease', 'ease-in', 'ease-out', 'ease-in-out', 'linear'])
}, _class2.defaultProps = {
  fill: '#fff',
  stroke: '#000',
  dataKey: 'value',
  ratio: 0.5 * (1 + Math.sqrt(5)),

  isAnimationActive: true,
  animationBegin: 0,
  animationDuration: 1500,
  animationEasing: 'ease'
}, _temp)) || _class;

exports.default = Treemap;