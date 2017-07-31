import { InlineSVGDirective } from './inline-svg.directive';
export declare function checkSVGSupport(): boolean;
export declare function insertEl(dir: InlineSVGDirective, parentEl: HTMLElement, content: Element, replaceContents: boolean, prepend: boolean): void;
export declare function isBrowser(): boolean;
