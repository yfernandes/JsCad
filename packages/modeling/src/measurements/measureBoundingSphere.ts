import {flatten} from "../utils/flatten.js";

import * as geom2 from "../geometries/geom2/index.js";
import * as geom3 from "../geometries/geom3/index.js";
import * as path2 from "../geometries/path2/index.js";
import * as poly3 from "../geometries/poly3/index.js";
import * as slice from "../geometries/slice/index.js";

const cache = new WeakMap();

/*
 * Measure a geometry using a given measure function.
 * Uses cached if available. Otherwise, compute bounding sphere and save to cache.
 *
 * @param {Geometry} geometry - the geometry to measure
 * @param {Function} measureFn - the function to measure the bounding sphere
 * @return {Array[]} the centroid and radius for the geometry
 */
const measureCached = (geometry, measureFn) => {
	let boundingSphere = cache.get(geometry);
	if (boundingSphere) return boundingSphere;
	boundingSphere = measureFn(geometry);
	// if bounding sphere is undefined, default to [0,0,0] and 0
	if (boundingSphere.length === 0) {
		boundingSphere[0] = Vec3.create();
		boundingSphere[1] = 0;
	}
	cache.set(geometry, boundingSphere);
	return boundingSphere;
};

/*
 * Measure the bounding sphere of the given 2D points.
 * @return {[[x, y, z], radius]} the bounding sphere for the points
 */
const measureBoundingSphereOfPoints = (points) => {
	const centroid = Vec3.create();
	let radius = 0;

	if (points.length > 0) {
		// calculate the centroid of the geometry
		let numPoints = 0;
		const temp = Vec3.create();
		points.forEach((point) => {
			Vec3.add(centroid, centroid, Vec3.fromVec2(temp, point, 0));
			numPoints++;
		});
		Vec3.scale(centroid, centroid, 1 / numPoints);

		// find the farthest point from the centroid
		points.forEach((point) => {
			radius = Math.max(radius, Vec2.squaredDistance(centroid, point));
		});
		radius = Math.sqrt(radius);
	}

	return [centroid, radius];
};

/*
 * Measure the bounding sphere of the given (path2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfPath2 = (points) => {
	return measureBoundingSphereOfPoints(path2.toPoints(points));
};

/*
 * Measure the bounding sphere of the given (geom2) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom2 = (geometry) => {
	return measureBoundingSphereOfPoints(geom2.toPoints(geometry));
};

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfGeom3 = (geometry) => {
	const centroid = Vec3.create();
	let radius = 0;

	const polygons = geom3.toPolygons(geometry);

	if (polygons.length > 0) {
		// calculate the centroid of the geometry
		let numVertices = 0;
		polygons.forEach((polygon) => {
			poly3.toVertices(polygon).forEach((vertex) => {
				Vec3.add(centroid, centroid, vertex);
				numVertices++;
			});
		});
		Vec3.scale(centroid, centroid, 1 / numVertices);

		// find the farthest vertex from the centroid
		polygons.forEach((polygon) => {
			poly3.toVertices(polygon).forEach((vertex) => {
				radius = Math.max(radius, Vec3.squaredDistance(centroid, vertex));
			});
		});
		radius = Math.sqrt(radius);
	}

	return [centroid, radius];
};

/*
 * Measure the bounding sphere of the given (geom3) geometry.
 * @return {[[x, y, z], radius]} the bounding sphere for the geometry
 */
const measureBoundingSphereOfSlice = (geometry) => {
	const centroid = Vec3.create();
	let radius = 0;
	let numVertices = 0;

	// calculate the centroid of the geometry
	geometry.contours.forEach((contour) => {
		contour.forEach((vertex) => {
			Vec3.add(centroid, centroid, vertex);
			numVertices++;
		});
	});

	if (numVertices > 0) {
		Vec3.scale(centroid, centroid, 1 / numVertices);

		// find the farthest vertex from the centroid
		geometry.contours.forEach((contour) => {
			contour.forEach((vertex) => {
				radius = Math.max(radius, Vec3.squaredDistance(centroid, vertex));
			});
		});
		radius = Math.sqrt(radius);
	}

	return [centroid, radius];
};

/**
 * Measure the (approximate) bounding sphere of the given geometries.
 * @see https://en.wikipedia.org/wiki/Bounding_sphere
 * @param {...Object} geometries - the geometries to measure
 * @return {Array} the bounding sphere for each geometry, i.e. [centroid, radius]
 * @alias module:modeling/measurements.measureBoundingSphere
 *
 * @example
 * let bounds = measureBoundingSphere(cube())
 */
export function measureBoundingSphere(...geometries: RecursiveArray<Geometry>): BoundingSphere {
	geometries = flatten(geometries);

	const results = geometries.map((geometry) => {
		if (path2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfPath2);
		if (geom2.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom2);
		if (geom3.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfGeom3);
		if (slice.isA(geometry)) return measureCached(geometry, measureBoundingSphereOfSlice);
		return [[0, 0, 0], 0];
	});
	return results.length === 1 ? results[0] : results;
}
import type {Geometry} from "../geometries/types.d.ts";
import type {RecursiveArray} from "../utils/recursiveArray.d.ts";

import type {BoundingSphere} from "./types.d.ts";
import {Vec2, Vec3} from "../maths/Vector/index.js";
