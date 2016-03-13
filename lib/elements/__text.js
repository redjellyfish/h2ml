"use strict";
module.exports = {
    __text: function (node) {
        return this.syntaxBuilder.appendText(this.dom.text(node));
    }
}