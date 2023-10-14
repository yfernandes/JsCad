import {ILine2} from "./Line2.js";

/**
 * Compare the given lines for equality.
 *
 * @param {Line2} line1 - first line to compare
 * @param {Line2} line2 - second line to compare
 * @return {boolean} true if lines are equal
 * @alias module:modeling/maths/line2.equals
 */
export function equals(line1: ILine2, line2: ILine2): boolean {
	return line1[0] === line2[0] && line1[1] === line2[1] && line1[2] === line2[2];
}
