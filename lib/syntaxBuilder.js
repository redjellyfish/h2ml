"use strict";

class SyntaxBuilder {
    appendText(text) {
        return { expression: "__h.encode(`" + text.replace("\\", "\\\\").replace("`", "\\`") + "`)" };
    }

    _flatten(arr) {
        let out = [];
        for (let i = 0; i < arr.length; i++) {
            out.push.apply(out, Array.isArray(arr[i]) ? this._flatten(arr[i]) : [arr[i]]);
        }
        return out;
    };

    compile(tokens) {
        if (!(tokens instanceof Array)) {
            tokens = [tokens];
        }

        tokens = this._flatten(tokens);

        tokens.push({ statement: "return __r;" });

        let syntax = '"use strict";let __r=``';
        let canAppend = true;

        for (let i = 0; i < tokens.length; i++) {
            let token = tokens[i];
            if ("statement" in token) {
                if (canAppend) {
                    syntax += ";";
                }
                syntax += token.statement;
                canAppend = false;
            } else if ("expression" in token) {
                if (canAppend) {
                    if (syntax.endsWith("`") && token.expression[0] === "`") {
                        syntax = syntax.substr(0, syntax.length - 1);
                        syntax += token.expression.substr(1);
                    } else {
                        syntax += "+" + token.expression;
                    }
                } else {
                    syntax += "__r+=" + token.expression;
                    canAppend = true;
                }
            }
        }

        return new Function(["__h, model"], syntax);
    }
}

module.exports = SyntaxBuilder;