"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var svg_cache_service_1 = require("./svg-cache.service");
var utils_1 = require("./utils");
var InlineSVGDirective = (function () {
    function InlineSVGDirective(_el, _svgCache) {
        this._el = _el;
        this._svgCache = _svgCache;
        this.replaceContents = true;
        this.prepend = false;
        this.cacheSVG = true;
        this.forceEvalStyles = false;
        this.evalScripts = 'always';
        this.onSVGInserted = new core_1.EventEmitter();
        this.onSVGFailed = new core_1.EventEmitter();
        this._ranScripts = {};
        this._isBrowser = utils_1.isBrowser();
        this._supportsSVG = utils_1.checkSVGSupport();
        if (!this._supportsSVG) {
            this._fail('Embed SVG not supported by browser');
        }
    }
    InlineSVGDirective.prototype.ngOnInit = function () {
        if (!this._isBrowser) {
            return;
        }
        this._insertSVG();
    };
    InlineSVGDirective.prototype.ngOnChanges = function (changes) {
        if (!this._isBrowser) {
            return;
        }
        if (changes['inlineSVG']) {
            this._insertSVG();
        }
    };
    InlineSVGDirective.prototype.ngOnDestroy = function () {
        if (this._subscription) {
            this._subscription.unsubscribe();
        }
    };
    InlineSVGDirective.prototype._insertSVG = function () {
        var _this = this;
        if (!this._supportsSVG) {
            return;
        }
        if (!this.inlineSVG) {
            this._fail('No URL passed to [inlineSVG]');
            return;
        }
        if (this.inlineSVG.charAt(0) === '#' || this.inlineSVG.indexOf('.svg#') > -1) {
            var elSvg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
            var elSvgUse = document.createElementNS('http://www.w3.org/2000/svg', 'use');
            elSvgUse.setAttributeNS('http://www.w3.org/1999/xlink', 'href', this.inlineSVG);
            elSvg.appendChild(elSvgUse);
            this._insertEl(elSvg);
            this.onSVGInserted.emit(elSvg);
            return;
        }
        if (this.inlineSVG !== this._prevUrl) {
            this._prevUrl = this.inlineSVG;
            this._subscription = this._svgCache.getSVG(this.inlineSVG, this.cacheSVG)
                .subscribe(function (svg) {
                if (!svg) {
                    return;
                }
                if (_this.removeSVGAttributes) {
                    _this._removeAttributes(svg, _this.removeSVGAttributes);
                }
                _this._insertEl(svg);
                _this._evalScripts(svg, _this.inlineSVG);
                if (_this.forceEvalStyles) {
                    var styleTags = svg.querySelectorAll('style');
                    Array.prototype.forEach.call(styleTags, function (tag) { return tag.textContent += ''; });
                }
                _this.onSVGInserted.emit(svg);
            }, function (err) {
                _this._fail(err);
            });
        }
    };
    InlineSVGDirective.prototype._insertEl = function (el) {
        utils_1.insertEl(this, this._el.nativeElement, el, this.replaceContents, this.prepend);
    };
    InlineSVGDirective.prototype._removeAttributes = function (svg, attrs) {
        var innerEls = svg.getElementsByTagName('*');
        for (var i = 0; i < innerEls.length; i++) {
            var elAttrs = innerEls[i].attributes;
            for (var j = 0; j < elAttrs.length; j++) {
                if (attrs.indexOf(elAttrs[j].name.toLowerCase()) > -1) {
                    innerEls[i].removeAttribute(elAttrs[j].name);
                }
            }
        }
    };
    InlineSVGDirective.prototype._evalScripts = function (svg, url) {
        var scripts = svg.querySelectorAll('script');
        var scriptsToEval = [];
        var script, scriptType;
        for (var i = 0; i < scripts.length; i++) {
            scriptType = scripts[i].getAttribute('type');
            if (!scriptType || scriptType === 'application/ecmascript' || scriptType === 'application/javascript') {
                script = scripts[i].innerText || scripts[i].textContent;
                scriptsToEval.push(script);
                svg.removeChild(scripts[i]);
            }
        }
        if (scriptsToEval.length > 0 && (this.evalScripts === 'always' ||
            (this.evalScripts === 'once' && !this._ranScripts[url]))) {
            for (var i = 0; i < scriptsToEval.length; i++) {
                new Function(scriptsToEval[i])(window);
            }
            this._ranScripts[url] = true;
        }
    };
    InlineSVGDirective.prototype._fail = function (msg) {
        this.onSVGFailed.emit(msg);
        if (this.fallbackImgUrl) {
            var elImg = document.createElement('IMG');
            elImg.src = this.fallbackImgUrl;
            this._insertEl(elImg);
        }
    };
    InlineSVGDirective.decorators = [
        { type: core_1.Directive, args: [{
                    selector: '[inlineSVG]',
                    providers: [svg_cache_service_1.SVGCacheService]
                },] },
    ];
    InlineSVGDirective.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: svg_cache_service_1.SVGCacheService, },
    ]; };
    InlineSVGDirective.propDecorators = {
        'inlineSVG': [{ type: core_1.Input },],
        'replaceContents': [{ type: core_1.Input },],
        'prepend': [{ type: core_1.Input },],
        'cacheSVG': [{ type: core_1.Input },],
        'removeSVGAttributes': [{ type: core_1.Input },],
        'forceEvalStyles': [{ type: core_1.Input },],
        'evalScripts': [{ type: core_1.Input },],
        'fallbackImgUrl': [{ type: core_1.Input },],
        'onSVGInserted': [{ type: core_1.Output },],
        'onSVGFailed': [{ type: core_1.Output },],
    };
    return InlineSVGDirective;
}());
exports.InlineSVGDirective = InlineSVGDirective;
