import camelCase from 'camelcase';
export var extractAttributes = function (attrs, element) { return (attrs.reduce(function (props, name) { return (props[camelCase(name)] = element.getAttribute(name) || undefined,
    props); }, {})); };
export default extractAttributes;
