import { ComponentType } from 'react';

type Props = {
  [key: string]: unknown;
};

type Attributes = {
  [key: string]: string;
};

export type Options = {
  tag?: string;
  extends?: string;
  attrs?: string[];
  methods?: string[];
  styles?: string | string[];
  props?: (attributes: Attributes, element: HTMLElement) => Props;
};

export function css(css: TemplateStringsArray): string;
export default function (options?: Options): (Component: ComponentType) => HTMLElement;
