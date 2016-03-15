"use strict";
module.exports = {
    component: function (node) {
        if (this.components == null) {
            this.components = {};
        }

        let attrs = this.dom.attributes(node);
        if (!("id" in attrs)) {
            throw new Error("Component id attribute is required");
        }

        let params = {};
        for (let attr in attrs) {
            if (attr[0] === "$") {
                params[attr.substr(1)] = attrs[attr];
            }
        }
        let id = attrs.id;

        return this.processNodes(this.dom.nodes(node)).then(data => {
            let fn = "function() {" + this.syntaxBuilder.generate(data) + "}";
            this.components[id] = fn;
            return Promise.resolve();
        });
    }
}