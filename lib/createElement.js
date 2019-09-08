import React from 'react';
import ReactDom from 'react-dom';
import extractAttributes from './extractAttributes';
export function createElement(Component, options = {}) {
    const componentInstances = new WeakMap();
    const observedAttributes = options.attrs || [];
    let styles = Array.isArray(options.styles) ? options.styles : (options.styles ? [options.styles] : []);
    class CustomElement extends HTMLElement {
        constructor() {
            super();
            this.root = this.attachShadow({ mode: 'open' });
        }
        connectedCallback() {
            this.render();
            /**
             * Add styles to the shadow root
             */
            for (const css of styles) {
                const style = document.createElement('style');
                style.appendChild(document.createTextNode(css));
                this.root.appendChild(style);
            }
        }
        attributeChangedCallback() {
            this.render();
        }
        disconnectedCallback() {
            /**
             * TODO: Looks like typings are outdated, because it is not possible to pass `ShadowRoot`
             */
            ReactDom.unmountComponentAtNode(this.root);
        }
        render() {
            const element = this;
            const attributes = extractAttributes(observedAttributes, this);
            const props = options.props ? options.props(attributes, this) : attributes;
            const reactElement = React.createElement(Component, props);
            /**
             * TODO: Looks like typings are outdated, because it is not possible to pass `ShadowRoot` as container
             */
            return ReactDom.render(reactElement, this.root, function () {
                componentInstances.set(element, this);
            });
        }
    }
    CustomElement.observedAttributes = observedAttributes;
    if (options.methods) {
        const proto = {};
        for (const methodName of options.methods) {
            proto[methodName] = function (...args) {
                const component = componentInstances.get(this);
                return component && component[methodName](...args);
            };
        }
        CustomElement.prototype = Object.assign(CustomElement.prototype, proto);
    }
    return CustomElement;
}
export default createElement;
