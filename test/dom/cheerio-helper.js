"use strict";
let expect = require("chai").expect;
let CheerioDomHelper = require("../../lib/CheerioDomHelper");

describe("CheerioDomHelper", function () {
    it("can be constructed", function () {
        expect(() => new CheerioDomHelper("<div>test</div>")).to.not.throw(Error);
    });

    it("can get root nodes", function () {
        let dom = new CheerioDomHelper("<div><ul><li></li></ul></div><hr>");
        expect(dom.nodes().length).to.equal(2);
    });

    it("can get node type", function () {
        let dom = new CheerioDomHelper("<!doctype html><!-- test --><meta property='test'/><div><ul><li></li></div><hr>test");
        let nodes = dom.nodes();
        let res = nodes.map((i, n) => dom.type(n));
        let expected = ["directive", "comment", "tag", "tag", "tag", "text"]

        expect(Array.prototype.slice.call(res)).to.deep.equal(expected);
    });

    it("can get tag/directive name", function () {
        let dom = new CheerioDomHelper("<!doctype html><div></div>test");
        let nodes = dom.nodes();
        expect(dom.name(nodes[0])).to.equal("!doctype");
        expect(dom.name(nodes[1])).to.equal("div");
        expect(dom.name(nodes[2])).to.equal(undefined);
    });

    it("can get child nodes", function () {
        let dom = new CheerioDomHelper("<div><ul><li></li></ul></div><hr>");
        let nodes = dom.nodes();
        expect(dom.name(dom.nodes(nodes[0]))).to.equal("ul");
        expect(dom.nodes(nodes[1]).length).to.equal(0);
    });

    it("can get text node content", function () {
        let dom = new CheerioDomHelper("<div>hello</div><div>{<p>.</p>}</div>test");
        let nodes = dom.nodes();

        let res = nodes.map((i, n) => dom.text(n));
        let expected = ["hello", "{.}", "test"];

        expect(Array.prototype.slice.call(res)).to.deep.equal(expected);
    });

    it("can remove nodes", function () {
        let dom = new CheerioDomHelper("<br><hr>");
        let nodes = dom.nodes();
        let count = nodes.length;
        dom.remove(nodes[0]);
        expect(dom.nodes().length).to.equal(count - 1);

        expect(dom.isRemoved(nodes[0])).to.equal(true);
    });

    it("can remove identity void elements", function () {
        let dom = new CheerioDomHelper("<br><hr><div></div><p></p><area/><img>");
        let nodes = dom.nodes();
        let res = nodes.map((i, n) => dom.isVoid(n));
        let expected = [true, true, false, false, true, true]

        expect(Array.prototype.slice.call(res)).to.deep.equal(expected);
    });

    it("can get node next sibling", function () {
        let dom = new CheerioDomHelper("<br><hr><div></div><p></p><area/><img>");
        let nodes = dom.nodes();
        let node = nodes[0];
        let res = [];
        while ((node = dom.next(node)) != null) {
            res.push(dom.name(node));
        }
        let expected = ["hr", "div", "p", "area", "img"];

        expect(res).to.deep.equal(expected);
    });

    it("can get parent node", function () {
        let dom = new CheerioDomHelper("<div><ul><li><p><hr></p></li></ul></div>");
        let node = dom.nodes()[0];
        let nodes = dom.nodes(node);
        while ((nodes = dom.nodes(node)).length > 0) {
            node = nodes[0];
        }
        let res = [];
        while (node != null) {
            res.push(dom.name(node));
            node = dom.parent(node);
        }
        let expected = ["hr", "p", "li", "ul", "div"];
        expect(res).to.deep.equal(expected);
    });

    describe("HTML generation", function () {
        it("can get root outer HTML", function () {
            let dom = new CheerioDomHelper("<div id='hi'><ul><li></li></ul></div><hr>");
            let nodes = dom.nodes();

            expect(dom.outerHtml()).to.equal('<div id="hi"><ul><li></li></ul></div><hr>');
        });

        it("can get node outer HTML", function () {
            let dom = new CheerioDomHelper("<div id='hi'><ul><li></li></ul></div><hr>");
            let nodes = dom.nodes();

            expect(dom.outerHtml(nodes[0], false)).to.equal('<div id="hi"><ul><li></li></ul></div>');
            expect(dom.outerHtml(nodes[0], true)).to.equal('<div id="hi"></div>');
            expect(dom.outerHtml(nodes[0])).to.equal('<div id="hi"></div>');
        });

        it("handles void elements", function () {
            let dom = new CheerioDomHelper("<br><hr><div></div><p></p><area/><img>");

            expect(dom.outerHtml()).to.equal('<br><hr><div></div><p></p><area><img>');
        });
    });

    describe("Attributes", function () {
        it("can get standard attributes", function () {
            let dom = new CheerioDomHelper("<div id='hi'></div>");
            let nodes = dom.nodes();

            expect(dom.attributes(nodes[0])).to.deep.equal({ "id": "hi"});
        });

        it("can get parameter attributes", function () {
            let dom = new CheerioDomHelper("<div $param='value'></div>");
            let nodes = dom.nodes();

            expect(dom.attributes(nodes[0])).to.deep.equal({ "$param": "value" });
        });

        it("can get conditional attributes", function () {
            let dom = new CheerioDomHelper("<div param?='model.enable!==null?\"enabled\"'></div>");
            let nodes = dom.nodes();

            expect(dom.attributes(nodes[0])).to.deep.equal({ "param?": 'model.enable!==null?"enabled"' });
        });

        it("can get empty attributes", function () {
            let dom = new CheerioDomHelper("<div attr1 attr2=attr2 attr3='attr3'></div>");
            let nodes = dom.nodes();

            expect(dom.attributes(nodes[0])).to.deep.equal({ attr1: "", attr2: "attr2", attr3: "attr3" });
        });
    });
});