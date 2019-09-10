import React from 'react';
import { AttributesMap } from './extractAttributes';
export declare type Options<P = {}> = {
    attrs?: string[];
    styles?: string | string[];
    methods?: string[];
    props?: (attributes: AttributesMap, element: HTMLElement) => P;
};
export declare function createElement<T extends React.ComponentType<any>>(Component: T, options?: Options<React.ComponentProps<T>>): typeof HTMLElement;
export default createElement;
