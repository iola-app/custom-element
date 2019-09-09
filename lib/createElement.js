var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
import React from 'react';
import ReactDom from 'react-dom';
import extractAttributes from './extractAttributes';
var componentInstanceSymbol = Symbol('React component instance');
var shadowRootSymbol = Symbol('Shadow root symbol');
export function createElement(Component, options) {
    if (options === void 0) { options = {}; }
    var observedAttributes = options.attrs || [];
    var styles = Array.isArray(options.styles) ? options.styles : (options.styles ? [options.styles] : []);
    var CustomElement = /** @class */ (function (_super) {
        __extends(CustomElement, _super);
        function CustomElement() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this[_b] = _this.attachShadow({ mode: 'open' });
            return _this;
        }
        CustomElement.prototype.connectedCallback = function () {
            this.render();
            /**
             * Add styles to the shadow root
             */
            for (var _i = 0, styles_1 = styles; _i < styles_1.length; _i++) {
                var css = styles_1[_i];
                var style = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                this[shadowRootSymbol].appendChild(style);
            }
        };
        CustomElement.prototype.attributeChangedCallback = function () {
            this.render();
        };
        CustomElement.prototype.disconnectedCallback = function () {
            ReactDom.unmountComponentAtNode(this[shadowRootSymbol]);
        };
        CustomElement.prototype.render = function () {
            var element = this;
            var attributes = extractAttributes(observedAttributes, this);
            var props = options.props ? options.props(attributes, this) : attributes;
            var reactElement = React.createElement(Component, props);
            return ReactDom.render(reactElement, this[shadowRootSymbol], function () {
                element[componentInstanceSymbol] = this;
            });
        };
        var _b;
        _b = shadowRootSymbol;
        CustomElement.observedAttributes = observedAttributes;
        return CustomElement;
    }(HTMLElement));
    if (options.methods) {
        var proto = {};
        var _loop_1 = function (methodName) {
            proto[methodName] = function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var component = this[componentInstanceSymbol];
                return component[methodName] && component[methodName].apply(component, args);
            };
        };
        for (var _i = 0, _a = options.methods; _i < _a.length; _i++) {
            var methodName = _a[_i];
            _loop_1(methodName);
        }
        CustomElement.prototype = Object.assign(CustomElement.prototype, proto);
    }
    return CustomElement;
}
export default createElement;
