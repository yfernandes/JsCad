let _ = require("lodash");
let OpenjscadSolidFactorySingleton = require("./OpenjscadSolidFactorySingleton");

function ModuleInstantiation() {
	this.name;
	this.argnames = [];
	this.argvalues = [];
	this.argexpr = [];
	this.children = [];
	this.isSubmodule = false;
	this.context;
}

ModuleInstantiation.prototype.evaluate = function (context) {
	let evaluatedModule;

	// NOTE: not sure how we should handle this in javascript ... is it necessary?
	// if (this.context === null) {
	//    console.log("WARNING: Ignoring recursive module instantiation of ", this.name)
	// } else {
	let that = this;

	this.argvalues = [];

	_.each(this.argexpr, function (expr, index, list) {
		that.argvalues.push(expr.evaluate(context));
	});

	that.context = context;

	evaluatedModule = context.evaluateModule(that, OpenjscadSolidFactorySingleton.getInstance());

	that.context = null;
	that.argvalues = [];

	// }
	return evaluatedModule;
};

ModuleInstantiation.prototype.evaluateChildren = function (context) {
	let childModules = [];

	for (let i = 0; i < this.children.length; i++) {
		let childInst = this.children[i];

		let evaluatedChild = childInst.evaluate(context);
		if (evaluatedChild !== undefined) {
			childModules.push(evaluatedChild);
		}
	}

	return childModules;
};

module.exports = ModuleInstantiation;
