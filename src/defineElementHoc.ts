import { ComponentType, ComponentClass } from 'react';

import createElement, { Options } from './createElement';
import defineElements from './defineElements';

type DefineOptions = Options<ComponentClass> & {
  tag: string;
}

/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export const defineElementHoc = (options: DefineOptions) => (Component: ComponentClass<any>) => {
  defineElements({ [options.tag]: createElement(Component, options) });
};

export default defineElementHoc;
