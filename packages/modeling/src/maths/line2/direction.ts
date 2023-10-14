import * as vec2 from "../vec2/index.js";

/**
 * Return the direction of the given line.
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} a vector in the direction of the line
 * @alias module:modeling/maths/line2.direction
 */
export function direction(line) {
	const vector = vec2.normal(vec2.create(), line);
	vec2.negate(vector, vector);
	return vector;
}
import type {Line2} from "./type.d.ts";
import type {Vec2} from "../vec2/type.d.ts";

export function direction(line: Line2): Vec2;
