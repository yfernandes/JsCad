let requirejs = require("requirejs");

requirejs.config({
	baseUrl: __dirname,
	paths: {
		lib: "../lib",
	},
	nodeRequire: require,
});

let parser = requirejs("openscad-parser");
let Globals = requirejs("Globals");
let parser_support = requirejs("openscad-parser-support");
let us = requirejs("lib/underscore");

module.exports = {
	parse: function (text) {
		if (parser.yy === undefined) {
			parser.yy = {};
		}

		let openSCADText = Globals.preParse(text);

		let openJSCADResult = parser.parse(openSCADText);

		return openJSCADResult.lines.join("\n");
	},
};
