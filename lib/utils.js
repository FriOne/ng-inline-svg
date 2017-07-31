"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function checkSVGSupport() {
    return typeof SVGRect !== 'undefined';
}
exports.checkSVGSupport = checkSVGSupport;
function insertEl(dir, parentEl, content, replaceContents, prepend) {
    if (replaceContents && !prepend) {
        var parentNode = dir._prevSVG && dir._prevSVG.parentNode;
        if (parentNode) {
            parentNode.removeChild(dir._prevSVG);
        }
        parentEl.innerHTML = '';
    }
    if (prepend) {
        parentEl.insertBefore(content, parentEl.firstChild);
    }
    else {
        parentEl.appendChild(content);
    }
    if (content.nodeName === 'svg') {
        dir._prevSVG = content;
    }
}
exports.insertEl = insertEl;
function isBrowser() {
    return new Function('try{return this===window;}catch(e){return false;}')();
}
exports.isBrowser = isBrowser;
