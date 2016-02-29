'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _class2, _temp2; /**
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

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Treemap = (0, _PureRender2.default)(_class = (_temp2 = _class2 = function (_Component) {
  _inherits(Treemap, _Component);

  function Treemap() {
    var _Object$getPrototypeO;

    var _temp, _this, _ret;

    _classCallCheck(this, Treemap);

    for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
      args[_key] = arguments[_key];
    }

    return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_Object$getPrototypeO = Object.getPrototypeOf(Treemap)).call.apply(_Object$getPrototypeO, [this].concat(args))), _this), _this.squarify = function (node) {
      var children = node.children;

      if (children && children.length) {
        var rect = _this.pad(node);
        var row = [];
        var remaining = children.slice(); // copy-on-write
        var child = undefined;
        var best = Infinity; // the best row score so far
        var score = undefined; // the current row score
        var u = Math.min(rect.width, rect.height); // initial orientation

        _this.scale(remaining, rect.width * rect.height / node.value);
        row.area = 0;
        while (remaining.length > 0) {
          row.push(child = remaining[0]);
          row.area += child.area;

          score = _this.worst(row, u);
          if (score <= best) {
            // continue with this orientation
            remaining.shift();
            best = score;
          } else {
            // abort, and try a different orientation
            row.area -= row.pop().area;
            _this.position(row, u, rect, false);
            u = Math.min(rect.width, rect.height);
            row.length = row.area = 0;
            best = Infinity;
          }
        }
        if (row.length) {
          _this.position(row, u, rect, true);
          row.length = row.area = 0;
        }
        children.forEach(_this.squarify);
      }
    }, _temp), _possibleConstructorReturn(_this, _ret);
  }

  _createClass(Treemap, [{
    key: 'pad',
    value: function pad(node) {
      return { x: node.x, y: node.y, width: node.width, height: node.height };
    }

    // Compute the area for each child based on value & scale.

  }, {
    key: 'scale',
    value: function scale(children, k) {
      var n = children.length;
      var i = -1;
      var child = undefined;
      var area = undefined;

      while (++i < n) {
        area = (child = children[i]).value * (k < 0 ? 0 : k);
        child.area = isNaN(area) || area <= 0 ? 0 : area;
      }
    }

    // Recursively arranges the specified node's children into squarified rows.

  }, {
    key: 'worst',


    // Computes the score for the specified row, as the worst aspect ratio.
    value: function worst(row, u) {
      var newU = u;
      var s = row.area;
      var r = undefined;
      var rmax = 0;
      var rmin = Infinity;
      var i = -1;
      var n = row.length;
      var ratio = this.props.ratio;


      while (++i < n) {
        r = row[i].area;

        if (!r) continue;
        if (r < rmin) rmin = r;
        if (r > rmax) rmax = r;
      }
      s *= s;
      newU *= newU;

      return s ? Math.max(newU * rmax * ratio / s, s / (newU * rmin * ratio)) : Infinity;
    }

    // Positions the specified row of nodes. Modifies `rect`.

  }, {
    key: 'position',
    value: function position(row, u, rect, flush) {
      var i = -1;
      var n = row.length;
      var x = rect.x;
      var y = rect.y;
      var v = u ? Math.round(row.area / u) : 0;
      var o = undefined;

      if (u === rect.width) {
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
    }
  }, {
    key: 'computeNode',
    value: function computeNode(depth, node, index) {
      var dataKey = this.props.dataKey;
      var children = node.children;
      var x = node.x;
      var y = node.y;
      var width = node.width;
      var height = node.height;

      var payload = _objectWithoutProperties(node, ['children', 'x', 'y', 'width', 'height']);

      var childDepth = depth + 1;
      var computedChildren = children && children.length ? children.map(this.computeNode.bind(this, childDepth)) : null;
      var value = undefined;

      if (children && children.length) {
        value = computedChildren.reduce(function (a, b) {
          return a + b.value;
        }, 0);
      } else {
        value = isNaN(node[dataKey]) || node[dataKey] <= 0 ? 0 : node[dataKey];
      }

      return {
        children: computedChildren,
        value: value,
        depth: depth,
        index: index,
        x: x,
        y: y,
        width: width,
        height: height,
        payload: payload
      };
    }
  }, {
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
      var content = this.props.content;

      var nodeProps = _extends({}, (0, _ReactUtils.getPresentationAttributes)(this.props), node, { root: root });

      return _react2.default.createElement(
        _Layer2.default,
        { key: 'recharts-treemap-node-' + i },
        _react2.default.isValidElement(content) ? _react2.default.cloneElement(content, nodeProps) : this.renderDefaultNode(nodeProps),
        node.children && node.children.length ? node.children.map(this.renderNode.bind(this, root)) : null
      );
    }
  }, {
    key: 'renderAllNodes',
    value: function renderAllNodes() {
      var _props2 = this.props;
      var width = _props2.width;
      var height = _props2.height;
      var data = _props2.data;


      var root = this.computeNode(0, {
        children: data,
        x: 0,
        y: 0,
        width: width,
        height: height
      }, 0);

      this.squarify(root);

      return this.renderNode(root, root, 0);
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
  content: _react.PropTypes.element,
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
}, _temp2)) || _class;

exports.default = Treemap;