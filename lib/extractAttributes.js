import camelCase from 'camelcase';
/**
 * @param {string[]} attrs
 * @param {HTMLElement} element
 */

export default (function (attrs, element) {
  return attrs.reduce(function (props, attrName) {
    props[camelCase(attrName)] = element.getAttribute(attrName) || undefined;
    return props;
  }, {});
});