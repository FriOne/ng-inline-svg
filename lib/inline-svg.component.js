"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var utils_1 = require("./utils");
var InlineSVGComponent = (function () {
    function InlineSVGComponent(_el) {
        this._el = _el;
    }
    InlineSVGComponent.prototype.ngAfterViewInit = function () {
        this._updateContent();
    };
    InlineSVGComponent.prototype.ngOnChanges = function (changes) {
        if (changes['content']) {
            this._updateContent();
        }
    };
    InlineSVGComponent.prototype._updateContent = function () {
        utils_1.insertEl(this.context, this._el.nativeElement, this.content, this.replaceContents, this.prepend);
    };
    InlineSVGComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'inline-svg',
                    template: '',
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    InlineSVGComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
    ]; };
    InlineSVGComponent.propDecorators = {
        'context': [{ type: core_1.Input },],
        'content': [{ type: core_1.Input },],
        'replaceContents': [{ type: core_1.Input },],
        'prepend': [{ type: core_1.Input },],
    };
    return InlineSVGComponent;
}());
exports.InlineSVGComponent = InlineSVGComponent;
