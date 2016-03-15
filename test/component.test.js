"use strict";
var chai = require("chai");
let expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
let h2ml = require("../app");
let entities = new (require('html-entities').XmlEntities)();

chai.use(chaiAsPromised);

describe("Component", function () {

    it("element requires ID attribute", function () {
        let input = '<component></component>';
        return expect(h2ml.render(input, { message: "hello world" })).to.be.rejected;
    });

    it("element is removed from the dom", function () {
        let input = 'a<component id="test"></component>b';
        return expect(h2ml.render(input)).to.eventually.equal('ab');
    });

});