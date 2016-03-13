"use strict";

let Promise = require("bluebird");
let SyntaxBuilder = require("./syntaxBuilder");

class Engine {
    constructor(options) {
        this.options = Object.assign({}, Engine.options, options);
        this.syntaxBuilder = new SyntaxBuilder();
    }

    processNodes(nodes) {
        return Promise.mapSeries(nodes, this.processNode.bind(this));
    }

    processNode(node) {
        if (this.dom.isRemoved(node)) {
            return Promise.resolve();
        }

        let type = this.dom.type(node);
        let handler;
        switch (type) {
            case "comment":
            case "directive":
                handler = this.options.elements.__default;
                break;
            case "text":
                handler = this.options.elements.__text;
                break;
            case "tag":
                let name = this.dom.name(node);
                if (name in this.options.elements) {
                    handler = this.options.elements[name];
                } else {
                    handler = this.options.elements.__default;
                }
                break;
            default:
                throw new Error("Unsupported node type " + type);
        }

        return handler.call(this, node);
    }

    compile(html, model) {
        this.dom = new this.options.domHelper(html);
        this.model = model;

        return this.processNodes(this.dom.nodes()).then(data => {
            return this.syntaxBuilder.compile(data);
        });
    }

    render(html, model) {
        return this.compile(html, model).then(tmpl => {
            return tmpl(model);
        });
    }

}

Engine.options = {
    domHelper: require("./cheerioDomHelper"),
    elements: require("./elements")
};

module.exports = Engine;