"use strict";
let expect = require("chai").expect;
let h2ml = require("../app");

describe("Engine", function () {
    describe("Text interpolation", function () {
        it("can pull values from the model", function () {
            h2ml.render("${model.text}", { text: "hello world" }).then(html => {
                expect(html).to.equal("hello world");
            });
        });

        it("html encodes output by default");

        it("escapes any characters that would break syntax generation");
    });
});