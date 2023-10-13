let OpenjscadSolidFactory = require("./OpenjscadSolidFactory");
let factory = new OpenjscadSolidFactory();

module.exports = {
	getInstance: function () {
		return factory;
	},
};
