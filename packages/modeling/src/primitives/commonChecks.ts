// verify that the array has the given dimension, and contains Number values
export function isNumberArray(array, dimension) {
	if (Array.isArray(array) && array.length >= dimension) {
		return array.every((n) => Number.isFinite(n));
	}
	return false;
}

// verify that the value is a Number greater than the constant
export function isGT(value, constant) {
	return Number.isFinite(value) && value > constant;
}

// verify that the value is a Number greater than or equal to the constant
export function isGTE(value, constant) {
	return Number.isFinite(value) && value >= constant;
}
