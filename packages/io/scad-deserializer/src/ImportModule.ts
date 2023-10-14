let Context = require("./Context");
let Globals = require("./Globals");
let StlDecoder = require("./StlDecoder");

function Import(factory) {
	this.factory = factory;
}

Import.prototype.evaluate = function (parentContext, inst) {
	let context = new Context(parentContext);

	let argnames = ["file", "filename", "convexity"];
	let argexpr = [];

	context.args(argnames, argexpr, inst.argnames, inst.argvalues);

	let filename =
		Context.contextVariableLookup(context, "file", null) ||
		Context.contextVariableLookup(context, "filename", null);

	let convexity = Context.contextVariableLookup(context, "convexity", 5);

	let importCache = Context.contextVariableLookup(context, "importCache", {});

	let fileContents = importCache[filename];

	if (fileContents !== undefined) {
		let stlDecoder = new StlDecoder(atob(fileContents));
		stlDecoder.decode();
		return stlDecoder.getCSGString();
	}

	return undefined;
};

module.Exports = Import;
