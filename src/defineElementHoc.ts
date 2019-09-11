import { ComponentClass as Cmp } from 'react';

import createElement, { Options } from './createElement';
import defineElements from './defineElements';

type DefineOptions<T extends Cmp> = Options<T> & {
  tag: string;
}

/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export const defineElementHoc = <T extends Cmp>(options: DefineOptions<T>) => (Component: T) => {
  defineElements({ [options.tag]: createElement(Component, options) });
};

export default defineElementHoc;
