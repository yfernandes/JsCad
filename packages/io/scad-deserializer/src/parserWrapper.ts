let parser = require("./parserCJS");
let Globals = require("./Globals");

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
