function _typeof(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _possibleConstructorReturn(self, call) { if (call && (_typeof(call) === "object" || typeof call === "function")) { return call; } return _assertThisInitialized(self); }

function _assertThisInitialized(self) { if (self === void 0) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function"); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, writable: true, configurable: true } }); if (superClass) _setPrototypeOf(subClass, superClass); }

function _wrapNativeSuper(Class) { var _cache = typeof Map === "function" ? new Map() : undefined; _wrapNativeSuper = function _wrapNativeSuper(Class) { if (Class === null || !_isNativeFunction(Class)) return Class; if (typeof Class !== "function") { throw new TypeError("Super expression must either be null or a function"); } if (typeof _cache !== "undefined") { if (_cache.has(Class)) return _cache.get(Class); _cache.set(Class, Wrapper); } function Wrapper() { return _construct(Class, arguments, _getPrototypeOf(this).constructor); } Wrapper.prototype = Object.create(Class.prototype, { constructor: { value: Wrapper, enumerable: false, writable: true, configurable: true } }); return _setPrototypeOf(Wrapper, Class); }; return _wrapNativeSuper(Class); }

function isNativeReflectConstruct() { if (typeof Reflect === "undefined" || !Reflect.construct) return false; if (Reflect.construct.sham) return false; if (typeof Proxy === "function") return true; try { Date.prototype.toString.call(Reflect.construct(Date, [], function () {})); return true; } catch (e) { return false; } }

function _construct(Parent, args, Class) { if (isNativeReflectConstruct()) { _construct = Reflect.construct; } else { _construct = function _construct(Parent, args, Class) { var a = [null]; a.push.apply(a, args); var Constructor = Function.bind.apply(Parent, a); var instance = new Constructor(); if (Class) _setPrototypeOf(instance, Class.prototype); return instance; }; } return _construct.apply(null, arguments); }

function _isNativeFunction(fn) { return Function.toString.call(fn).indexOf("[native code]") !== -1; }

function _setPrototypeOf(o, p) { _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) { o.__proto__ = p; return o; }; return _setPrototypeOf(o, p); }

function _getPrototypeOf(o) { _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) { return o.__proto__ || Object.getPrototypeOf(o); }; return _getPrototypeOf(o); }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

import React from 'react';
import ReactDom from 'react-dom';
import extractAttributes from './extractAttributes';
/**
 * @param {object} options
 * @param {string} options.tag
 * @param {string} options.extends
 * @param {string[]} options.attrs
 * @param {string[]} options.methods
 * @param {string[] | string} options.styles
 * @param {function} options.props
 */

var defineElement = function defineElement() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  return function (Component) {
    var observedAttributes = options.attrs || [];
    var styles = Array.isArray(options.styles) ? options.styles : [options.styles];
    var shadowRoots = new WeakMap();
    var componentInstances = new WeakMap();

    var getProps = function getProps(props, element) {
      var _options$props;

      return ((_options$props = options.props) === null || _options$props === void 0 ? void 0 : _options$props.call(options, props, element)) || props;
    };

    var render = function render(element) {
      return ReactDom.render(React.createElement(Component, getProps(extractAttributes(observedAttributes, element), element)), shadowRoots.get(element), function () {
        componentInstances.set(element, this);
      });
    };

    var CustomElement =
    /*#__PURE__*/
    function (_HTMLElement) {
      _inherits(CustomElement, _HTMLElement);

      function CustomElement() {
        var _getPrototypeOf2;

        var _this;

        _classCallCheck(this, CustomElement);

        for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        _this = _possibleConstructorReturn(this, (_getPrototypeOf2 = _getPrototypeOf(CustomElement)).call.apply(_getPrototypeOf2, [this].concat(args)));
        shadowRoots.set(_assertThisInitialized(_this), _this.attachShadow({
          mode: 'open'
        }));
        return _this;
      }

      _createClass(CustomElement, [{
        key: "connectedCallback",
        value: function connectedCallback() {
          var _this2 = this;

          render(this);
          /**
           * Add styles to the shadow root
           */

          styles.filter(Boolean).forEach(function (css) {
            var style = document.createElement('style');
            style.appendChild(document.createTextNode(css.toString()));
            shadowRoots.get(_this2).appendChild(style);
          });
        }
      }, {
        key: "attributeChangedCallback",
        value: function attributeChangedCallback() {
          render(this);
        }
      }, {
        key: "disconnectedCallback",
        value: function disconnectedCallback() {
          ReactDom.unmountComponentAtNode(shadowRoots.get(this));
        }
      }]);

      return CustomElement;
    }(_wrapNativeSuper(HTMLElement));

    _defineProperty(CustomElement, "observedAttributes", observedAttributes);

    if (options.methods) {
      Object.assign(CustomElement.prototype, options.methods.reduce(function (methods, methodName) {
        return _objectSpread({}, methods, _defineProperty({}, methodName, function () {
          var _componentInstances$g, _componentInstances$g2;

          for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
            args[_key2] = arguments[_key2];
          }

          return (_componentInstances$g = componentInstances.get(this)) === null || _componentInstances$g === void 0 ? void 0 : (_componentInstances$g2 = _componentInstances$g[methodName]) === null || _componentInstances$g2 === void 0 ? void 0 : _componentInstances$g2.call.apply(_componentInstances$g2, [_componentInstances$g].concat(args));
        }));
      }, {}));
    }

    if (options.tag) {
      try {
        customElements.define(options.tag, CustomElement, {
          "extends": options["extends"]
        });
      } catch (_unused) {// Pass...
      }
    }

    return CustomElement;
  };
};

export { default as css } from './css';
export default defineElement;