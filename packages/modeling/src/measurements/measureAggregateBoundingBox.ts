import {flatten} from "../utils/flatten.js";

import type {Geometry} from "../geometries/types.d.ts";
import type {RecursiveArray} from "../utils/recursiveArray.d.ts";
import type {BoundingBox} from "./types.d.ts";

import {measureBoundingBox} from "./measureBoundingBox.js";
import {Vec3} from "../maths/Vector/index.js";

/**
 * Measure the aggregated minimum and maximum bounds for the given geometries.
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the min and max bounds for the group of geometry, i.e. [[x,y,z],[X,Y,Z]]
 * @alias module:modeling/measurements.measureAggregateBoundingBox
 *
 * @example
 * let bounds = measureAggregateBoundingBox(sphere(),cube())
 */
export function measureAggregateBoundingBox(...geometries: RecursiveArray<Geometry>): BoundingBox {
	geometries = flatten(geometries);
	if (geometries.length === 0)
		throw new Error("measureAggregateBoundingBox: no geometries supplied");
	const bounds = measureBoundingBox(geometries);
	if (geometries.length === 1) {
		return bounds;
	}
	const result = [
		[Number.MAX_VALUE, Number.MAX_VALUE, Number.MAX_VALUE],
		[-Number.MAX_VALUE, -Number.MAX_VALUE, -Number.MAX_VALUE],
	];
	return bounds.reduce((result, item) => {
		result = [Vec3.min(result[0], result[0], item[0]), Vec3.max(result[1], result[1], item[1])];
		return result;
	}, result);
}
