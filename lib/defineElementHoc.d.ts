import { ComponentType } from 'react';
import { Options } from './createElement';
declare type DefineOptions = Options & {
    tag: string;
};
/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export declare const defineElementHoc: (options: DefineOptions) => (Component: ComponentType<any>) => void;
export default defineElementHoc;
