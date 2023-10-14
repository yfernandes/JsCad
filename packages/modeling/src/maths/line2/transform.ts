import {Vec2} from "../Vector/index.js";
import {Mat4} from "../types.js";
import {ILine2} from "./Line2.js";
import {direction} from "./direction.js";
import {fromPoints} from "./fromPoints.js";
import {origin} from "./origin.js";

/**
 * Transforms the given line using the given matrix.
 *
 * @param {Line2} out - receiving line
 * @param {Line2} line - line to transform
 * @param {Mat4} matrix - matrix to transform with
 * @returns {Line2} out
 * @alias module:modeling/maths/line2.transform
 */
export function transform(out: ILine2, line: ILine2, matrix: Mat4): ILine2 {
	const org = origin(line);
	const dir = direction(line);

	Vec2.transform(org, org, matrix);
	Vec2.transform(dir, dir, matrix);

	return fromPoints(out, org, dir);
}
