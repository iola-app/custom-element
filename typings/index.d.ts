import { ComponentType, ComponentProps } from 'react';

export type Options<P> = {
  tag?: string;
  extends?: string;
  attrs?: string[];
  methods?: string[];
  styles?: string | string[];
  props?: (attributes: { [key: string]: string }, element: HTMLElement) => P;
};

export function css(css: TemplateStringsArray): string;
export default function <T extends ComponentType>(options?: Options<ComponentProps<T>>): (Component: T) => HTMLElement;
