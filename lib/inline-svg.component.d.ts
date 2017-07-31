import { AfterViewInit, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { InlineSVGDirective } from './inline-svg.directive';
export declare class InlineSVGComponent implements AfterViewInit, OnChanges {
    private _el;
    context: InlineSVGDirective;
    content: Element;
    replaceContents: boolean;
    prepend: boolean;
    constructor(_el: ElementRef);
    ngAfterViewInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    private _updateContent();
}
