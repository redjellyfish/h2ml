"use strict";
module.exports = {
    __directive: function (node) {
        return [{ expression: "`<`" }, this.syntaxBuilder.appendText(this.dom.data(node)), { expression: "`>`" }];
    }
}