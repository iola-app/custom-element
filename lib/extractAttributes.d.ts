export declare type AttributesMap = Record<string, string | undefined>;
export declare const extractAttributes: (attrs: string[], element: HTMLElement) => Record<string, string | undefined>;
export default extractAttributes;
