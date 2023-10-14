import {ILine2} from "./Line2.js";
/**
 * Create a line, positioned at 0,0, and running along the X axis.
 *
 * @returns {Line2} a new unbounded line
 * @alias module:modeling/maths/line2.create
 */
export function create(): ILine2 {
	return [0, 1, 0];
} // normal and distance
