let _ = require("lodash");
let Module = require("./Module");
let Context = require("./Context");
let Globals = require("./Globals");
let FunctionDef = require("./FunctionDef");
let support = require("./openscad-parser-support");

let currmodule = new Module("root");

function resetModule() {
	currmodule = new Module("root");
	Globals.context_stack = [];
	Globals.module_stack = [];
}

function processModule(yy) {
	let lines = [];
	lines.push("function main(){");
	lines.push("\n");

	let context = undefined;
	if (yy.context !== undefined) {
		context = yy.context;
	} else {
		context = new Context();
	}

	if (yy.importCache !== undefined) {
		context.setVariable("importCache", yy.importCache);
	}

	let res = currmodule.evaluate(context);

	let evaluatedLines = _.flatten(res);
	if (evaluatedLines.length == 1) {
		lines.push("return " + evaluatedLines[0] + ";");
	} else if (evaluatedLines.length > 1) {
		lines.push("return " + _.first(evaluatedLines) + ".union([");
		lines.push(_.tail(evaluatedLines));
		lines.push("]);");
	}
	lines.push("};");

	let x = {lines: lines, context: Globals.context_stack[Globals.context_stack.length - 1]};
	resetModule();

	return x;
}

function stashModule(newName, newArgNames, newArgExpr) {
	let p_currmodule = currmodule;
	Globals.module_stack.push(currmodule);

	currmodule = new Module(newName);

	p_currmodule.modules.push(currmodule);

	currmodule.argnames = newArgNames;
	currmodule.argexpr = newArgExpr;
}

function popModule() {
	if (Globals.module_stack.length > 0) {
		currmodule = Globals.module_stack.pop();
	}
}

function addModuleChild(child) {
	currmodule.children.push(child);
}

function addModuleAssignmentVar(name, value) {
	currmodule.assignments_var[name] = value;
}

function addModuleFunction(name, expr, argnames, argexpr) {
	let func = new FunctionDef();
	func.argnames = argnames;
	func.argexpr = argexpr;
	func.expr = expr;
	currmodule.functions[name] = func;
}

module.exports = {
	processModule: processModule,
	stashModule: stashModule,
	popModule: popModule,
	addModuleChild: addModuleChild,
	addModuleAssignmentVar: addModuleAssignmentVar,
	addModuleFunction: addModuleFunction,
};
