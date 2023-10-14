import {Vec2} from "../Vector/index.js";
import {IVec2} from "../Vector/types.js";
import {ILine2} from "./Line2.js";

/**
 * Create a new line that passes through the given points.
 *
 * @param {Line2} out - receiving line
 * @param {Vec2} point1 - start point of the line
 * @param {Vec2} point2 - end point of the line
 * @returns {Line2} a new unbounded line
 * @alias module:modeling/maths/line2.fromPoints
 */
export function fromPoints(out: ILine2, point1: IVec2, point2: IVec2): ILine2 {
	const vector = Vec2.subtract(Vec2.create(), point2, point1); // directional vector

	Vec2.normal(vector, vector);
	Vec2.normalize(vector, vector); // normalized

	const distance = Vec2.dot(point1, vector);

	out[0] = vector[0];
	out[1] = vector[1];
	out[2] = distance;
	return out;
}
