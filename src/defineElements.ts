type ElementMap = {
  [tag: string]: typeof HTMLElement;
}

export const defineElements = (elements: ElementMap): void => {
  for (const tag in elements) {
    try {
      customElements.define(tag, elements[tag]);
    } catch {
      // Pass...
    }
  }
}

export default defineElements;
