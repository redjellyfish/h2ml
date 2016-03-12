"use strict";

class DomHelper {
    constructor(html) {
        if (new.target === DomHelper) {
            throw new TypeError("Cannot construct DomHelper instances directly");
        }

        this.html = html;
    }

    isVoid(node) {
        return !(/<\/[^>]+>$/.test(this.outerHtml(node)));
    }
}

module.exports = DomHelper;