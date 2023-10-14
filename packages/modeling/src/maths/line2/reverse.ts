import {Vec2} from "../Vector/index.js";
import {ILine2} from "./Line2.js";
import {copy} from "./copy.js";
import {fromValues} from "./fromValues.js";

/**
 * Create a new line in the opposite direction as the given.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to reverse
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.reverse
 */
export function reverse(out: ILine2, line: ILine2): ILine2 {
	const normal = Vec2.negate(Vec2.create(), line);
	const distance = -line[2];
	return copy(out, fromValues(normal[0], normal[1], distance));
}
