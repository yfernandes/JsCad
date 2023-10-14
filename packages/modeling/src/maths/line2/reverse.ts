import * as vec2 from "../vec2/index.js";

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
export function reverse(out, line) {
	const normal = vec2.negate(vec2.create(), line);
	const distance = -line[2];
	return copy(out, fromValues(normal[0], normal[1], distance));
}
import type {Line2} from "./type.d.ts";

export function reverse(out: Line2, line: Line2): Line2;
