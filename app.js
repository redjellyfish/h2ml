"use strict";

let CheerioDomHelper = require("./lib/CheerioDomHelper");
let Engine = require("./lib/engine");

module.exports = {
    compile: function (html, options, model) {
        let engine = new Engine(options);
        return engine.compile(html, model);
    },
    render: function (html, model, options) {
        let engine = new Engine(options);
        return engine.render(html, model);
    }
}
