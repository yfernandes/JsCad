import {ILine2} from "./Line2.js";

/**
 * Return a string representing the given line.
 *
 * @param {Line2} line - line of reference
 * @returns {string} string representation
 * @alias module:modeling/maths/line2.toString
 */
export function toString(line: ILine2): string {
	return `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`;
}
