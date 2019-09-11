import React from 'react';
import { FunctionKeys, NonUndefined, Subtract } from 'utility-types';
import { AttributesMap } from './extractAttributes';
interface CommonOptions<T extends React.ComponentType> {
    attrs?: string[];
    styles?: string | string[];
    props?: (attributes: AttributesMap, element: HTMLElement) => React.ComponentProps<T>;
}
interface FunctionComponentOptions<T extends React.FC> extends CommonOptions<T> {
}
interface ClassComponentOptions<T extends React.ComponentClass> extends CommonOptions<T> {
    methods?: NonUndefined<FunctionKeys<Subtract<InstanceType<T>, React.Component>>>[];
}
export declare type Options<T extends React.ComponentType = React.ComponentClass> = (T extends React.FC ? FunctionComponentOptions<T> : T extends React.ComponentClass ? ClassComponentOptions<T> : never);
/**
 * Declaration signature
 */
export declare function createElement<T extends React.ComponentType>(Component: T, options?: Options<T>): typeof HTMLElement;
export default createElement;
