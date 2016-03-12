"use strict";
let DomHelper = require("./DomHelper");
let cheerio = require("cheerio");

class CheerioDomHelper extends DomHelper  {
    constructor(html) {
        super(html);

        this.$ = cheerio.load(html);
    }

    nodes(parent) {
        if (parent == null) {
            return this.$.root().contents();
        }
        return this.$(parent).contents();
    }

    next(node) {
        return this.$(node).next()[0];
    }

    type(node) {
        return this.$(node)[0].type;
    }

    name(node) {
        return this.$(node)[0].name;
    }

    text(node) {
        return this.$(node).text();
    }

    outerHtml(node, empty = true) {
        if (node == null) {
            return this.$("<div/>").append(this.$.root().clone()).html();
        }

        let clone = this.$(node).clone();
        if (empty && clone[0].children.length > 0) {
            clone.empty();
        }
        return this.$("<div/>").append(clone).html();
    }

    attributes(node) {
        return this.$(node)[0].attribs;
    }

    remove(node) {
        return this.$(node).remove();
    }
}

module.exports = CheerioDomHelper;