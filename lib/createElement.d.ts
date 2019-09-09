import React from 'react';
import { AttributesMap } from './extractAttributes';
export declare type Options<P = {}> = {
    extends?: string;
    attrs?: string[];
    methods?: string[];
    styles?: string | string[];
    props?: (attributes: AttributesMap, element: HTMLElement) => P;
};
export declare function createElement<T extends React.ComponentType>(Component: T, options?: Options<React.ComponentProps<T>>): typeof HTMLElement;
export default createElement;
