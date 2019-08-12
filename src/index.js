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
const defineElement = (options = {}) => Component => {
  const observedAttributes = options.attrs || [];
  const styles = Array.isArray(options.styles) ? options.styles : [ options.styles ];

  const shadowRoots = new WeakMap();
  const componentInstances = new WeakMap();

  const getProps = (props, element) => options.props?.(props, element) || props;
  const render = element => ReactDom.render(
    React.createElement(
      Component,
      getProps(extractAttributes(observedAttributes, element), element),
    ),
    shadowRoots.get(element),
    function () {
      componentInstances.set(element, this);
    },
  );

  class CustomElement extends HTMLElement {
    static observedAttributes = observedAttributes;

    constructor(...args) {
      super(...args);

      shadowRoots.set(this, this.attachShadow({ mode: 'open' }));
    }

    connectedCallback() {
      render(this);

      /**
       * Add styles to the shadow root
       */
      styles.filter(Boolean).forEach(css => {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css.toString()));

        shadowRoots.get(this).appendChild(style);
      });
    }

    attributeChangedCallback() {
      render(this);
    }

    disconnectedCallback() {
      ReactDom.unmountComponentAtNode(shadowRoots.get(this));
    }
  }

  if (options.methods) {
    Object.assign(CustomElement.prototype, options.methods.reduce((methods, methodName) => ({
      ...methods,
      [methodName]: function (...args) {
        return componentInstances.get(this)?.[methodName] ?.(...args);
      },
    }), {}));
  }

  if (options.tag) {
    try {
      customElements.define(options.tag, CustomElement, {
        extends: options.extends,
      });
    } catch {
      // Pass...
    }
  }

  return CustomElement;
};


export { default as css } from './css';
export default defineElement;
