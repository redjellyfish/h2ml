"use strict";

let elements = {};

require('fs').readdirSync(__dirname + '/').forEach(function (file) {
    if (file.match(/\.js$/) !== null && file !== 'index.js') {
        Object.assign(elements, require('./' + file));
    }
});

module.exports = elements;