"use strict";

let CheerioDomHelper = require("./lib/CheerioDomHelper");
let Engine = require("./lib/engine");

module.exports = {
    compile: function (html, options, model) {
        return new Engine(options).compile(html, model);
    },
    render: function (html, model, options) {
        return new Engine(options).render(html, model);
    },
}

let input = '<!-- test -->';

module.exports.render(input).then(console.log);