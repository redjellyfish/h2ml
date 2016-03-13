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


module.exports.render("<div id='ok'>test</div>").then(console.log);