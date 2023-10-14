import {create} from "./create.js";
import {toOutlines} from "./toOutlines.js";

/**
 * Reverses the given geometry so that the outline points are flipped in the opposite order.
 * This swaps the left (interior) and right (exterior) edges.
 * @param {Geom2} geometry - the geometry to reverse
 * @returns {Geom2} the new reversed geometry
 * @alias module:modeling/geometries/geom2.reverse
 *
 * @example
 * let newGeometry = reverse(geometry)
 */
export function reverse(geometry) {
	const outlines = toOutlines(geometry).map((outline) => outline.slice().reverse());
	const reversed = create(outlines);
	if (geometry.color) reversed.color = geometry.color;
	return reversed;
}
