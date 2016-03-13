"use strict";
module.exports = {
    __default: function (node) {
        let parts = [{ expression: "`<" + this.dom.name(node) + "`" }];

        let attrs = this.dom.attributes(node);
        for (let attr in attrs) {
            if (attr.endsWith("?")) {
                //Conditional attribute
                throw new Error("Conditional attributes not implemented");
            } else if (attr[0] === "@") {
                //Operation
                throw new Error("Operator attributes not implemented");
            } else {
                let val = attrs[attr];
                parts.push({ expression: "` " + attr + "`" });
                if (val != null) {
                    parts.push({ expression: '`="`' });
                    parts.push(this.syntaxBuilder.appendText(val));
                    parts.push({ expression: '`"`' });
                }
            }
        }

        parts.push({ expression: "`>`" });

        return this.processNodes(this.dom.nodes(node)).then(data => {
            parts.push.call(parts, data);

            if (!this.dom.isVoid(node)) {
                parts.push({ expression: "`</" + this.dom.name(node) + ">`" });
            }
            return parts;
        });
    }
}