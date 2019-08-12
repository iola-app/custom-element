import camelCase from 'camelcase';

/**
 * @param {string[]} attrs
 * @param {HTMLElement} element
 */
export default (attrs, element) => attrs.reduce((props, attrName) => {
 props[camelCase(attrName)] = element.getAttribute(attrName) || undefined;

 return props;
}, {});
