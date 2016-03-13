"use strict";
module.exports = {
    __comment: function (node) {
        return [{ expression: "`<!--`" }, this.syntaxBuilder.appendText(this.dom.data(node)), { expression: "`-->`" }];
    }
}