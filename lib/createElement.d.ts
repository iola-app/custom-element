import React from 'react';
import { AttributesMap } from './extractAttributes';
declare type CommonOptions<C extends React.ComponentType> = {
    attrs?: string[];
    styles?: string | string[];
    props?: (attributes: AttributesMap, element: HTMLElement) => React.ComponentProps<C>;
};
declare type FunctionalComponentOptions = {};
declare type ClassComponentOptions = {
    methods?: string[];
};
export declare type Options<C extends React.ComponentType> = (CommonOptions<C> & ClassComponentOptions & FunctionalComponentOptions);
/**
 * Signature for functional components
 */
export declare function createElement<T extends React.FunctionComponent<any>>(Component: T, options: CommonOptions<T> & FunctionalComponentOptions): typeof HTMLElement;
/**
 * Signature for class components
 */
export declare function createElement<T extends React.ComponentClass<any>>(Component: T, options: CommonOptions<T> & ClassComponentOptions): typeof HTMLElement;
export default createElement;
