export var defineElements = function (elements) {
    for (var tag in elements) {
        try {
            customElements.define(tag, elements[tag]);
        }
        catch (_a) {
            // Pass...
        }
    }
};
export default defineElements;
