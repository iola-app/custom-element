import { ComponentType } from 'react';

import createElement, { Options } from './createElement';
import defineElements from './defineElements';

type DefineOptions = Options & {
  tag: string;
}

/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export const defineElementHoc = (options: DefineOptions) => (Component: ComponentType<any>) => {
  defineElements({ [options.tag]: createElement(Component, options) });
};

export default defineElementHoc;
