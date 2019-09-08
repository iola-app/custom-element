export function defineElements(elements) {
    for (const tag in elements) {
        try {
            customElements.define(tag, elements[tag]);
        }
        catch (_a) {
            // Pass...
        }
    }
}
export default defineElements;
