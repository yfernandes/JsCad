import {flatten} from "../utils/flatten.js";

import {measureBoundingBox} from "./measureBoundingBox.js";
import type {Geometry} from "../geometries/types.d.ts";
import type {RecursiveArray} from "../utils/recursiveArray.d.ts";

/**
 * Measure the dimensions of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the dimensions for each geometry, i.e. [width, depth, height]
 * @alias module:modeling/measurements.measureDimensions
 *
 * @example
 * let dimensions = measureDimensions(sphere())
 */
export function measureDimensions(geometry: Geometry): [number, number, number];
export function measureDimensions(
	...geometries: RecursiveArray<Geometry>
): [number, number, number][];
export function measureDimensions(...geometries) {
	geometries = flatten(geometries);

	const results = geometries.map((geometry) => {
		const boundingBox = measureBoundingBox(geometry);
		return [
			boundingBox[1][0] - boundingBox[0][0],
			boundingBox[1][1] - boundingBox[0][1],
			boundingBox[1][2] - boundingBox[0][2],
		];
	});
	return results.length === 1 ? results[0] : results;
}
