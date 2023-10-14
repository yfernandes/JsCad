import {ILine2} from "./Line2.js";
/**
 * Copy the given line to the receiving line.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to copy
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.copy
 */
export function copy(out: ILine2, line: ILine2): ILine2 {
	out[0] = line[0];
	out[1] = line[1];
	out[2] = line[2];
	return out;
}
