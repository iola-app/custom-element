declare type ElementMap = {
    [tag: string]: typeof HTMLElement;
};
export declare function defineElements(elements: ElementMap): void;
export default defineElements;
