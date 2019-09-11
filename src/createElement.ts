import React from 'react';
import ReactDom from 'react-dom';
import { FunctionKeys, NonUndefined, Subtract } from 'utility-types';
import extractAttributes, { AttributesMap } from './extractAttributes';

const componentInstanceSymbol = Symbol('React component instance');
const shadowRootSymbol = Symbol('Shadow root symbol');

type ComponentType = React.ComponentType<any>;
type FunctionComponent = React.FunctionComponent<any>;
type ComponentClass = React.ComponentClass<any>;

interface CommonOptions<T extends ComponentType> {
  attrs?: string[];
  styles?: string | string[];
  props?: (attributes: AttributesMap, element: HTMLElement) => React.ComponentProps<T>;
}

interface FunctionComponentOptions<T extends FunctionComponent> extends CommonOptions<T> {}
interface ClassComponentOptions<T extends ComponentClass> extends CommonOptions<T> {
  methods?: NonUndefined<FunctionKeys<Subtract<InstanceType<T>, React.Component>>>[]
};

export type Options<T extends ComponentType = React.ComponentClass> = (
  T extends FunctionComponent ? FunctionComponentOptions<T>:
  T extends ComponentClass ? ClassComponentOptions<T>:
  never
);

type FunctionMap<T = Function> = Record<string, T>;

/**
 * Declaration signature
 */
export function createElement<T extends ComponentType>(
  Component: T, options?: Options<T>
): typeof HTMLElement;

/**
 * Implementation signature ( class component )
 */
export function createElement<T extends ComponentClass>(
  Component: T, options: Options = {}
): typeof HTMLElement {
  const observedAttributes = options.attrs || [];
  const styles = Array.isArray(options.styles) ? options.styles : (
    options.styles ? [options.styles] : []
  );

  function render(this: CustomElement) {
    const attributes = extractAttributes(observedAttributes, this);
    const props = options.props ? options.props(attributes, this) : attributes;
    const ref = options.methods && options.methods.length
      ? (componentInstance: T) => { this[componentInstanceSymbol] = componentInstance }
      : undefined;
    const reactElement = React.createElement(Component, { ...props, ref } as React.Attributes);

    ReactDom.render(reactElement, this[shadowRootSymbol] as any);
  }

  class CustomElement extends HTMLElement {
    static observedAttributes = observedAttributes;

    [componentInstanceSymbol]: T;
    [shadowRootSymbol] = this.attachShadow({ mode: 'open' });

    connectedCallback() {
      render.call(this);

      /**
       * Add styles to the shadow root
       */
      for (const css of styles) {
        const style = document.createElement('style');
        style.appendChild(document.createTextNode(css));

        this[shadowRootSymbol].appendChild(style);
      }
    }

    attributeChangedCallback() {
      render.call(this);
    }

    disconnectedCallback() {
      ReactDom.unmountComponentAtNode(this[shadowRootSymbol] as any);
    }
  }

  if (options.methods) {
    const proto: FunctionMap = {};
    for (const methodName of options.methods) {
      proto[methodName] = function(this: CustomElement, ...args: any[]) {
        const component: FunctionMap = this[componentInstanceSymbol] as any;

        return component[methodName] && component[methodName](...args);
      };
    }

    Object.assign(CustomElement.prototype, proto);
  }

  return CustomElement;
}

export default createElement;
