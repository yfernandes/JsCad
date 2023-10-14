import {Vec2} from "../Vector/index.js";
import {IVec2} from "../Vector/types.js";
import {ILine2} from "./Line2.js";

/**
 * Calculate the distance (positive) between the given point and line.
 *
 * @param {Line2} line - line of reference
 * @param {Vec2} point - point of reference
 * @return {number} distance between line and point
 * @alias module:modeling/maths/line2.distanceToPoint
 */
export function distanceToPoint(line: ILine2, point: IVec2): number {
	let distance = Vec2.dot(point, line);
	distance = Math.abs(distance - line[2]);
	return distance;
}
