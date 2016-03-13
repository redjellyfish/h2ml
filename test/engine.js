"use strict";
var chai = require("chai");
let expect = chai.expect;
var chaiAsPromised = require("chai-as-promised");
let h2ml = require("../app");
let entities = new (require('html-entities').XmlEntities)();

chai.use(chaiAsPromised);

describe("Engine", function () {
    describe("Text interpolation", function () {
        it("can pull values from the model", function () {
            return expect(h2ml.render("${model.text}", { text: "hello world" })).to.eventually.equal("hello world");
        });

        it("html encodes output by default", function () {
            return expect(h2ml.render("${model.text}", { text: "<div>test</div>" })).to.eventually.equal("&lt;div&gt;test&lt;/div&gt;");
        });

        it("escapes any characters that would break syntax generation", function () {
            let chars = '!"#$%&\'()*+,-./0123456789:;<=>?@ABCDEFGHIJKLMNOPQRSTUVWXYZ\t[\\]^_` abcdefghijklmnopqrstuvwxyz{|}~';

            return expect(h2ml.render("${model.text}" + chars.replace("<", "&lt;"), { text: chars })).to.eventually.equal(entities.encode(chars + chars));
        });
    });

    describe("HTML generation", function () {
        it("rebuilds input html", function () {
            let input = '<div id="ok">test</div>';
            return expect(h2ml.render(input)).to.eventually.equal(input);
        });

        it("rebuilds comment nodes", function () {
            let input = '<!-- test -->';
            return expect(h2ml.render(input)).to.eventually.equal(input);
        });

        it("rebuilds directive nodes", function () {
            let input = '<!doctype html>';
            return expect(h2ml.render(input)).to.eventually.equal(input);
        });

    });
});