"use strict";
let entities = new (require('html-entities').XmlEntities)();

module.exports = {
    encode: entities.encode
}