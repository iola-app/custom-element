import React from 'react';
import ReactDom from 'react-dom';
import extractAttributes, { AttributesMap } from './extractAttributes';

export type Options<P> = {
  extends?: string;
  attrs?: string[];
  methods?: string[];
  styles?: string | string[];
  props?: (attributes: AttributesMap, element: HTMLElement) => P;
};

export function createElement<T extends React.ComponentType>(
  Component: T, options: Options<React.ComponentProps<T>> = {}
): typeof HTMLElement {
  const componentInstances = new WeakMap<HTMLElement, T>();
  const observedAttributes = options.attrs || [];

  let styles = Array.isArray(options.styles) ? options.styles : (
    options.styles ? [options.styles] : []
  );

  class CustomElement extends HTMLElement {
    static observedAttributes = observedAttributes;
    private root: ShadowRoot;

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
      ReactDom.unmountComponentAtNode(this.root as any);
    }

    private render() {
      const element = this;
      const attributes = extractAttributes(observedAttributes, this);
      const props = options.props ? options.props(attributes, this) : attributes;
      const reactElement = React.createElement(Component, props as React.Attributes);

      /**
       * TODO: Looks like typings are outdated, because it is not possible to pass `ShadowRoot` as container
       */
      return ReactDom.render(reactElement, this.root as any, function(this: T) {
        componentInstances.set(element, this);
      });
    }
  }

  if (options.methods) {
    type FunctionMap = {
      [key: string]: Function;
    };

    const proto: FunctionMap = {};
    for (const methodName of options.methods) {
      proto[methodName] = function(this: HTMLElement, ...args: unknown[]) {
        const component = componentInstances.get(this) as unknown;

        return component && (component as FunctionMap)[methodName](...args);
      };
    }

    CustomElement.prototype = Object.assign(CustomElement.prototype, proto);
  }

  return CustomElement;
}

export default createElement;
