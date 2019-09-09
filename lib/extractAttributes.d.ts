export declare type AttributesMap = {
    [name: string]: string | undefined;
};
export declare const extractAttributes: (attrs: string[], element: HTMLElement) => AttributesMap;
export default extractAttributes;
