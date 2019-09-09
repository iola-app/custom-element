import createElement from './createElement';
import defineElements from './defineElements';
/**
 * @deprecated Use `createElement` and `defineElements` instead
 */
export const defineElementHoc = (options) => (Component) => {
    defineElements({ [options.tag]: createElement(Component, options) });
};
export default defineElementHoc;
