import React, { ComponentProps, ComponentClass, ComponentType, FunctionComponent } from 'react';
import { FunctionKeys, NonUndefined, Subtract } from 'utility-types';
import { AttributesMap } from './extractAttributes';
interface CommonOptions<T extends ComponentType> {
    attrs?: string[];
    styles?: string | string[];
    props?: (attributes: AttributesMap, element: HTMLElement) => ComponentProps<T>;
}
interface FunctionComponentOptions<T extends FunctionComponent> extends CommonOptions<T> {
}
interface ClassComponentOptions<T extends ComponentClass> extends CommonOptions<T> {
    methods?: NonUndefined<FunctionKeys<Subtract<InstanceType<T>, React.Component>>>[];
}
export declare type Options<T extends ComponentType = ComponentClass> = (T extends FunctionComponent ? FunctionComponentOptions<T> : T extends ComponentClass ? ClassComponentOptions<T> : never);
/**
 * Declaration signature
 */
export declare function createElement<T extends ComponentType>(Component: T, options?: Options<T>): typeof HTMLElement;
export default createElement;
