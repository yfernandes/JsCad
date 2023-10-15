import {rectangle} from "./rectangle.js";
import {isGTE} from "./commonChecks.js";

/**
 * Construct an axis-aligned square in two dimensional space with four equal sides at right angles.
 * @see [rectangle]{@link module:modeling/primitives.rectangle} for more options
 * @param {object} [options] - options for construction
 * @param {Array} [options.center=[0,0]] - center of square
 * @param {number} [options.size=2] - dimension of square
 * @returns {Geom2} new 2D geometry
 * @alias module:modeling/primitives.square
 *
 * @example
 * let myshape = square({size: 10})
 */
export function square(options) {
	const defaults = {
		center: [0, 0],
		size: 2,
	};
	let {center, size} = Object.assign({}, defaults, options);

	if (!isGTE(size, 0)) throw new Error("size must be positive");

	size = [size, size];

	return rectangle({center, size});
}
import type {Vec2} from "../maths/vec2/type.d.ts";
import type {Geom2} from "../geometries/geom2/type.d.ts";

export interface SquareOptions {
	center?: Vec2;
	size?: number;
}

export function square(options?: SquareOptions): Geom2;
