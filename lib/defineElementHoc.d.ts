import { ComponentClass as Cmp } from 'react';
import { Options } from './createElement';
declare type DefineOptions<T extends Cmp> = Options<T> & {
    tag: string;
};
/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export declare const defineElementHoc: <T extends Cmp<{}, any>>(options: DefineOptions<T>) => (Component: T) => void;
export default defineElementHoc;
