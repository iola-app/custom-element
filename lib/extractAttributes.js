import camelCase from 'camelcase';
export const extractAttributes = (attrs, element) => (attrs.reduce((props, name) => (props[camelCase(name)] = element.getAttribute(name) || undefined,
    props), {}));
export default extractAttributes;
