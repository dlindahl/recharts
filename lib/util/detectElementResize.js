'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/**
* Detect Element Resize.
* Forked in order to guard against unsafe 'window' and 'document' references.
*
* https://github.com/sdecima/javascript-detect-element-resize
* Sebastian Decima
*
* version: 0.5.3
**/

// Check `document` and `window` in case of server-side rendering
//
var animationName = 'resizeanim';

var getWindow = function getWindow() {
  if (typeof window !== 'undefined') {
    return window;
  }

  return null;
};
var getAttachEvent = function getAttachEvent() {
  if (typeof document !== 'undefined' && document.attachEvent) {
    return document.attachEvent;
  }
  return null;
};

var stylesCreated = false;

var requestFrame = function requestFrame(fn) {
  var _window = getWindow();
  var raf = void 0;

  if (_window) {
    raf = _window.requestAnimationFrame || _window.mozRequestAnimationFrame || _window.webkitRequestAnimationFrame || function (callback) {
      _window.setTimeout(callback, 20);
    };
  } else {
    raf = function raf() {};
  }

  return raf(fn);
};

var cancelFrame = function cancelFrame(id) {
  var _window = getWindow();

  var cancel = void 0;
  if (_window) {
    cancel = _window.cancelAnimationFrame || _window.mozCancelAnimationFrame || _window.webkitCancelAnimationFrame || _window.clearTimeout;
  } else {
    cancel = function cancel() {};
  }
  return cancel(id);
};

var resetTriggers = function resetTriggers(element) {
  if (element) {
    var triggers = element.__resizeTriggers__;
    var expand = triggers.firstElementChild;
    var contract = triggers.lastElementChild;
    var expandChild = expand.firstElementChild;

    var contractScrollWidth = contract.scrollWidth;
    var contractScrollHeight = contract.scrollHeight;
    var expandOffsetWidth = expand.offsetWidth;
    var expandOffsetHeight = expand.offsetHeight;
    var expandScrollWidth = expand.scrollWidth;
    var expandScrollHeight = expand.scrollHeight;

    contract.scrollLeft = contractScrollWidth;
    contract.scrollTop = contractScrollHeight;
    expandChild.style.width = expandOffsetWidth + 1 + 'px';
    expandChild.style.height = expandOffsetHeight + 1 + 'px';
    expand.scrollLeft = expandScrollWidth;
    expand.scrollTop = expandOffsetHeight;
  }
};

var checkTriggers = function checkTriggers(element) {
  return element.offsetWidth !== element.__resizeLast__.width || element.offsetHeight !== element.__resizeLast__.height;
};

function scrollListener(e) {
  var element = this;

  if (element) {
    resetTriggers(element);

    if (element.__resizeRAF__) {
      cancelFrame(element.__resizeRAF__);
    }

    element.__resizeRAF__ = requestFrame(function () {
      if (checkTriggers(element)) {
        element.__resizeLast__.width = element.offsetWidth;
        element.__resizeLast__.height = element.offsetHeight;
        element.__resizeListeners__.forEach(function (fn) {
          fn.call(element, e);
        });
      }
    });
  }
}

var removeNode = function removeNode(elm) {
  if (elm && elm.parentNode && elm.parentNode.removeChild) {
    elm.parentNode.removeChild(elm);
  }
};

/* Detect CSS Animations support to detect element display/re-attach */
var detectCssAnimation = function detectCssAnimation() {
  var domPrefixes = 'Webkit Moz O ms'.split(' ');
  var startEvents = ['webkitAnimationStart', 'animationstart', 'oAnimationStart', 'MSAnimationStart'];
  var _window = getWindow();

  if (_window) {
    var elm = document.createElement('fakeelement');
    if (elm.style.animationName !== undefined) {
      removeNode(elm);
      return {
        animationstartevent: 'animationstart',
        animationKeyframes: 'keyframes ' + animationName + ' { from {opacity:0;} to {opacity:0;} } ',
        animationStyle: 'animation: 1ms ' + animationName + ';'
      };
    }

    for (var i = 0, len = domPrefixes.length; i < len; i++) {
      if (elm.style[domPrefixes[i] + 'AnimationName'] !== undefined) {
        removeNode(elm);
        var pfx = domPrefixes[i];
        var keyframeprefix = '-' + pfx.toLowerCase() + '-';

        return {
          animationstartevent: startEvents[i],
          animationKeyframes: '@' + keyframeprefix + 'keyframes ' + animationName + ' {from{opacity:0;} to{opacity:0;}} ',
          animationStyle: keyframeprefix + 'animation: 1ms ' + animationName + ';'
        };
      }
    }
  }

  return {
    animationKeyframes: '',
    animationStyle: ''
  };
};

var createStyles = function createStyles(animationKeyframes, animationStyle) {
  if (!stylesCreated) {
    // opacity:0 works around a chrome bug https://code.google.com/p/chromium/issues/detail?id=286360
    var css = '\n        ' + animationKeyframes + '\n        .resize-triggers {\n          ' + animationStyle + ' visibility: hidden; opacity: 0;\n        }\n        .resize-triggers, .resize-triggers > div,\n        .contract-trigger:before {\n          content: " ";\n          display: block;\n          position: absolute;\n          top: 0;\n          left: 0;\n          height: 100%;\n          width: 100%;\n          overflow: hidden;\n        } .resize-triggers > div {\n          background: #eee;\n          overflow: auto;\n        } .contract-trigger:before {\n          width: 200%; height: 200%;\n        }';
    var head = document && (document.head || document.getElementsByTagName('head')[0]);
    var style = document && document.createElement('style');

    if (style) {
      style.type = 'text/css';
      if (style.styleSheet) {
        style.styleSheet.cssText = css;
      } else {
        style.appendChild(document && document.createTextNode(css));
      }

      head.appendChild(style);
      stylesCreated = true;
    }
  }
};

var addResizeListener = function addResizeListener(element, fn) {
  var attachEvent = getAttachEvent();

  if (attachEvent) {
    element.attachEvent('onresize', fn);
  } else if (typeof document !== 'undefined') {
    if (!element.__resizeTriggers__) {
      if (getComputedStyle(element).position === 'static') {
        element.style.position = 'relative';
      }

      var _detectCssAnimation = detectCssAnimation();

      var animationstartevent = _detectCssAnimation.animationstartevent;
      var animationKeyframes = _detectCssAnimation.animationKeyframes;
      var animationStyle = _detectCssAnimation.animationStyle;

      createStyles(animationKeyframes, animationStyle);
      element.__resizeLast__ = {};
      element.__resizeListeners__ = [];
      (element.__resizeTriggers__ = document.createElement('div')).className = 'resize-triggers';
      element.__resizeTriggers__.innerHTML = '\n          <div class="expand-trigger"><div></div></div>\n          <div class="contract-trigger"></div>\n        ';
      element.appendChild(element.__resizeTriggers__);
      resetTriggers(element);
      element.addEventListener('scroll', scrollListener, true);

      /* Listen for a css animation to detect element display/re-attach */
      animationstartevent && element.__resizeTriggers__.addEventListener(animationstartevent, function (e) {
        if (e.animationName === animationName) resetTriggers(element);
      });
    }
    element.__resizeListeners__.push(fn);
  }
};

var removeResizeListener = function removeResizeListener(element, fn) {
  var attachEvent = getAttachEvent();

  if (attachEvent) {
    element.detachEvent('onresize', fn);
  } else {
    element.__resizeListeners__.splice(element.__resizeListeners__.indexOf(fn), 1);
    if (!element.__resizeListeners__.length) {
      element.removeEventListener('scroll', scrollListener);
      element.__resizeTriggers__ = !element.removeChild(element.__resizeTriggers__);
    }
  }
};

exports.addResizeListener = addResizeListener;
exports.removeResizeListener = removeResizeListener;