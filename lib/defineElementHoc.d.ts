import { ComponentClass } from 'react';
import { Options } from './createElement';
declare type DefineOptions = Options<ComponentClass> & {
    tag: string;
};
/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export declare const defineElementHoc: (options: DefineOptions) => (Component: ComponentClass<any, any>) => void;
export default defineElementHoc;
