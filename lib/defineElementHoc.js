import createElement from './createElement';
import defineElements from './defineElements';
/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export var defineElementHoc = function (options) {
    if (options === void 0) { options = {}; }
    return function (Component) {
        var _a;
        var element = createElement(Component, options);
        if (options.tag) {
            defineElements((_a = {}, _a[options.tag] = element, _a));
        }
        return element;
    };
};
export default defineElementHoc;
