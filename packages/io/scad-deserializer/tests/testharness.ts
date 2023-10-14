let parser = require("../src/OpenscadOpenjscadParser");
let fs = require("fs");

let openSCADText = fs.readFileSync(__dirname + "/test.scad", "UTF8");
let openJSCADResult = parser.parse(openSCADText);

console.log(openJSCADResult);
