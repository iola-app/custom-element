import { ComponentType } from 'react';

import createElement, { Options } from './createElement';
import defineElements from './defineElements';

type DefineOptions = Options & {
  tag?: string;
}

/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export const defineElementHoc = (options: DefineOptions = {}) => (Component: ComponentType) => {
  const element = createElement(Component, options);

  if (options.tag) {
    defineElements({ [options.tag]: element });
  }

  return element;
};

export default defineElementHoc;
