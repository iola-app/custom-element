declare type ElementMap = {
    [tag: string]: typeof HTMLElement;
};
export declare const defineElements: (elements: ElementMap) => void;
export default defineElements;
