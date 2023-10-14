import {IVec2, Vec2} from "../Vector/index.js";
import {ILine2} from "./Line2.js";

import {direction} from "./direction.js";
import {origin} from "./origin.js";

/**
 * Determine the closest point on the given line to the given point.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @returns {Vec2} closest point
 * @alias module:modeling/maths/line2.closestPoint
 */
export function closestPoint(line: ILine2, point: IVec2): IVec2 {
	const orig = origin(line);
	const dir = direction(line);

	const v = Vec2.subtract(Vec2.create(), point, orig);
	const dist = Vec2.dot(v, dir);
	Vec2.scale(v, dir, dist);
	Vec2.add(v, v, orig);
	return v;
}
