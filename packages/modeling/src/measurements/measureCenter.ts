import {flatten} from "../utils/flatten.js";
import type {Geometry} from "../geometries/types.d.ts";
import type {RecursiveArray} from "../utils/recursiveArray.d.ts";
import {measureBoundingBox} from "./measureBoundingBox.js";

/**
 * Measure the center of the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the center vertex for each geometry, i.e. [X, Y, Z]
 * @alias module:modeling/measurements.measureCenter
 *
 * @example
 * let center = measureCenter(sphere())
 */
export function measureCenter(geometry: Geometry): [number, number, number];
export function measureCenter(...geometries: RecursiveArray<Geometry>): [number, number, number][];
export function measureCenter(...geometries) {
	geometries = flatten(geometries);

	const results = geometries.map((geometry) => {
		const bounds = measureBoundingBox(geometry);
		return [
			bounds[0][0] + (bounds[1][0] - bounds[0][0]) / 2,
			bounds[0][1] + (bounds[1][1] - bounds[0][1]) / 2,
			bounds[0][2] + (bounds[1][2] - bounds[0][2]) / 2,
		];
	});
	return results.length === 1 ? results[0] : results;
}
