import camelCase from 'camelcase';

export type AttributesMap = {
  [name: string]: string | undefined;
};

export const extractAttributes = (attrs: string[], element: HTMLElement) => (
  attrs.reduce<AttributesMap>((props, name) => (
    props[camelCase(name)] = element.getAttribute(name) || undefined,
    props
  ), {})
);

export default extractAttributes;
