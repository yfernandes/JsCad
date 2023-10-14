import {IVec2, Vec2} from "../Vector/index.js";
import {ILine2} from "./Line2.js";

/**
 * Return the direction of the given line.
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} a vector in the direction of the line
 * @alias module:modeling/maths/line2.direction
 */
export function direction(line: ILine2): IVec2 {
	const vector = Vec2.normal(Vec2.create(), line);
	Vec2.negate(vector, vector);
	return vector;
}
