"use strict";
let DomHelper = require("./DomHelper");
let cheerio = require("cheerio");

class CheerioDomHelper extends DomHelper {
    constructor(html) {
        super(html);

        this.$ = cheerio.load(html);
    }

    nodes(parent) {
        let nodes;
        if (parent == null) {
            nodes = this.$.root().contents();
        } else {
            nodes = this.$(parent).contents();
        }
        return Array.prototype.slice.call(nodes);
    }

    next(node) {
        return this.$(node).next()[0];
    }

    parent(node) {
        return this.$(node).parent()[0];
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
        this.$(node).remove();
    }

    isRemoved(node) {
        node = this.$(node)[0];
        return node.root == null && node.parent == null;
    }
}

module.exports = CheerioDomHelper;