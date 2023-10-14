import {Vec2} from "../Vector/index.js";
import {IVec2} from "../Vector/types.js";
import {ILine2} from "./Line2.js";

/**
 * Return the origin of the given line.
 * The origin is the point on the line which is closest to the origin [0, 0].
 *
 * @param {Line2} line - line of reference
 * @return {Vec2} the origin of the line
 * @alias module:modeling/maths/line2.origin
 */
export function origin(line: ILine2): IVec2 {
	return Vec2.scale(Vec2.create(), line, line[2]);
}
