import {EPS} from "../constants.js";
import {Mat4, Plane, Vec} from "../types.js";
import {solve2Linear} from "../utils/solve2Linear.js";
import * as vec3 from "../vec3/index.js";
import {IVec3} from "../vec3/type.js";

export type ILine3 = [IVec3, IVec3];

export class Line3 {
	/**
	 * Create a clone of the given line.
	 *
	 * @param {ILine3} line - line to clone
	 * @returns {ILine3} a new unbounded line
	 * @alias module:modeling/maths/line3.clone
	 */
	public static clone(line: ILine3): ILine3 {
		const out = Line3.create();
		vec3.copy(out[0], line[0]);
		vec3.copy(out[1], line[1]);
		return out;
	}

	/**
	 * Determine the closest point on the given line to the given point.
	 *
	 * @param {ILine3} line - line of reference
	 * @param {IVec3} point - point of reference
	 * @returns {IVec3} a point
	 * @alias module:modeling/maths/line3.closestPoint
	 */
	public static closestPoint(line: ILine3, point: IVec3): IVec3 {
		const lPoint = line[0];
		const lDirection = line[1];

		const a = vec3.dot(vec3.subtract(vec3.create(), point, lPoint), lDirection);
		const b = vec3.dot(lDirection, lDirection);
		const t = a / b;

		const closestPoint = vec3.scale(vec3.create(), lDirection, t);
		vec3.add(closestPoint, closestPoint, lPoint);
		return closestPoint;
	}

	/**
	 * Copy the given line into the receiving line.
	 *
	 * @param {ILine3} out - receiving line
	 * @param {ILine3} line - line to copy
	 * @returns {ILine3} out
	 * @alias module:modeling/maths/line3.copy
	 */
	public static copy(out: ILine3, line: ILine3): ILine3 {
		vec3.copy(out[0], line[0]);
		vec3.copy(out[1], line[1]);
		return out;
	}

	/**
	 * Create a line, positioned at 0,0,0 and lying on the X axis.
	 *
	 * @returns {ILine3} a new unbounded line
	 * @alias module:modeling/maths/line3.create
	 *
	 * Represents an unbounded line in 3D space, positioned at a point of origin.
	 * A line is parametrized by a point of origin and a directional vector.
	 *
	 * The array contents are two 3D vectors; origin [0,0,0] and directional vector [0,0,1].
	 * @see https://en.wikipedia.org/wiki/Hesse_normal_form
	 */
	public static create(): ILine3 {
		return [
			vec3.fromValues(0, 0, 0), // origin
			vec3.fromValues(0, 0, 1), // direction
		];
	}

	/**
	 * Return the direction of the given line.
	 *
	 * @param {ILine3} line - line for reference
	 * @return {IVec3} the relative vector in the direction of the line
	 * @alias module:modeling/maths/line3.direction
	 */
	public static direction(line: ILine3): IVec3 {
		return line[1];
	}

	/**
	 * Calculate the distance (positive) between the given point and line.
	 *
	 * @param {ILine3} line - line of reference
	 * @param {IVec3} point - point of reference
	 * @return {number} distance between line and point
	 * @alias module:modeling/maths/line3.distanceToPoint
	 */
	public static distanceToPoint(line: ILine3, point: IVec3): number {
		const closest = Line3.closestPoint(line, point);
		const distanceVector = vec3.subtract(vec3.create(), point, closest);
		return vec3.length(distanceVector);
	}

	/**
	 * Compare the given lines for equality.
	 *
	 * @param {ILine3} line1 - first line to compare
	 * @param {ILine3} line2 - second line to compare
	 * @return {Boolean} true if lines are equal
	 * @alias module:modeling/maths/line3.equals
	 */
	public static equals(line1: ILine3, line2: ILine3): boolean {
		// compare directions (unit vectors)
		if (!vec3.equals(line1[1], line2[1])) return false;

		// compare points
		if (!vec3.equals(line1[0], line2[0])) return false;

		// why would lines with the same slope (direction) and different points be equal?
		// let distance = distanceToPoint(line1, line2[0])
		// if (distance > EPS) return false

		return true;
	}

	/**
	 * Create a line as the intersection of the given planes.
	 *
	 * @param {ILine3} out - receiving line
	 * @param {Plane} plane1 - first plane of reference
	 * @param {Plane} plane2 - second plane of reference
	 * @returns {ILine3} out
	 * @alias module:modeling/maths/line3.fromPlanes
	 */
	public static fromPlanes(out: ILine3, plane1: Plane, plane2: Plane): ILine3 {
		const direction = vec3.cross(
			vec3.create(),
			plane1.slice(0, 3) as IVec3,
			plane2.slice(0, 3) as IVec3
		); // Extract the normal vectors
		const length = vec3.length(direction);

		if (length < EPS) {
			throw new Error("parallel planes do not intersect");
		}

		const invLength = 1.0 / length;
		vec3.scale(direction, direction, invLength);

		const absX = Math.abs(direction[0]);
		const absY = Math.abs(direction[1]);
		const absZ = Math.abs(direction[2]);
		let origin;
		let r;

		if (absX >= absY && absX >= absZ) {
			r = solve2Linear(plane1[1], plane1[2], plane2[1], plane2[2], plane1[3], plane2[3]);
			origin = vec3.fromValues(0, r[0], r[1]);
		} else if (absY >= absX && absY >= absZ) {
			r = solve2Linear(plane1[0], plane1[2], plane2[0], plane2[2], plane1[3], plane2[3]);
			origin = vec3.fromValues(r[0], 0, r[1]);
		} else {
			r = solve2Linear(plane1[0], plane1[1], plane2[0], plane2[1], plane1[3], plane2[3]);
			origin = vec3.fromValues(r[0], r[1], 0);
		}

		return Line3.fromPointAndDirection(out, origin, direction);
	}

	/**
	 * Create a line from the given point (origin) and direction.
	 *
	 * The point can be any random point on the line.
	 * The direction must be a vector with positive or negative distance from the point.
	 *
	 * See the logic of fromPoints() for appropriate values.
	 *
	 * @param {ILine3} out - receiving line
	 * @param {IVec3} point - start point of the line segment
	 * @param {IVec3} direction - direction of the line segment
	 * @returns {ILine3} out
	 * @alias module:modeling/maths/line3.fromPointAndDirection
	 */
	public static fromPointAndDirection(out: ILine3, point: IVec3, direction: IVec3): ILine3 {
		const unit = vec3.normalize(vec3.create(), direction);

		vec3.copy(out[0], point);
		vec3.copy(out[1], unit);
		return out;
	}

	/**
	 * Create a line that passes through the given points.
	 *
	 * @param {ILine3} out - receiving line
	 * @param {IVec3} point1 - start point of the line segment
	 * @param {IVec3} point2 - end point of the line segment
	 * @returns {ILine3} out
	 * @alias module:modeling/maths/line3.fromPoints
	 */
	public static fromPoints(out: ILine3, point1: IVec3, point2: IVec3): ILine3 {
		const direction = vec3.subtract(vec3.create(), point2, point1);
		return Line3.fromPointAndDirection(out, point1, direction);
	}
	/**
	 * Determine the closest point on the given plane to the given line.
	 *
	 * NOTES:
	 * The point of intersection will be invalid if the line is parallel to the plane, e.g. NaN.
	 *
	 * @param {ILine3} line - line of reference
	 * @param {Plane} plane - plane of reference
	 * @returns {IVec3} a point on the line
	 * @alias module:modeling/maths/line3.intersectPointOfLineAndPlane
	 */
	public static intersectionPointOfLineAndPlane(line: ILine3, plane: Plane): IVec3 {
		// The plane is defined by a 4D array [a, b, c, d] where (a, b, c) is the normal and d is the distance from the origin.
		const pNormal = plane.slice(0, 3) as IVec3; // Extract the normal vector [a, b, c]
		const pw = plane[3]; // Extract the distance from the origin (d)

		const lPoint = line[0];
		const lDirection = line[1];

		// Calculate the lambda value
		const lambda = (pw - vec3.dot(pNormal, lPoint)) / vec3.dot(pNormal, lDirection);

		// Calculate the intersection point
		return vec3.add(vec3.create(), lPoint, vec3.scale(vec3.create(), lDirection, lambda));
	}

	/**
	 * Return the origin of the given line.
	 *
	 * @param {ILine3} line - line of reference
	 * @return {IVec3} the origin of the line
	 * @alias module:modeling/maths/line3.origin
	 */
	public static origin(line: ILine3): IVec3 {
		return line[0];
	}

	/**
	 * Create a line in the opposite direction as the given.
	 *
	 * @param {ILine3} out - receiving line
	 * @param {ILine3} line - line to reverse
	 * @returns {ILine3} out
	 * @alias module:modeling/maths/line3.reverse
	 */
	public static reverse(out: ILine3, line: ILine3): ILine3 {
		const point = vec3.clone(line[0]);
		const direction = vec3.negate(vec3.create(), line[1]);
		return Line3.fromPointAndDirection(out, point, direction);
	}

	/**
	 * Return a string representing the given line.
	 *
	 * @param {ILine3} line - line of reference
	 * @returns {string} string representation
	 * @alias module:modeling/maths/line3.toString
	 */
	public static toString(line: ILine3): string {
		const point = line[0];
		const direction = line[1];
		return `line3: point: (${point[0].toFixed(7)}, ${point[1].toFixed(7)}, ${point[2].toFixed(
			7
		)}) direction: (${direction[0].toFixed(7)}, ${direction[1].toFixed(7)}, ${direction[2].toFixed(
			7
		)})`;
	}

	/**
	 * Transforms the given line using the given matrix.
	 *
	 * @param {ILine3} out - line to update
	 * @param {ILine3} line - line to transform
	 * @param {Mat4} matrix - matrix to transform with
	 * @returns {ILine3} a new unbounded line
	 * @alias module:modeling/maths/line3.transform
	 */
	public static transform(out: ILine3, line: ILine3, matrix: Mat4): ILine3 {
		const point = line[0];
		const direction = line[1];
		const pointPlusDirection = vec3.add(vec3.create(), point, direction);

		const newPoint = vec3.transform(vec3.create(), point, matrix);
		const newPointPlusDirection = vec3.transform(pointPlusDirection, pointPlusDirection, matrix);
		const newDirection = vec3.subtract(newPointPlusDirection, newPointPlusDirection, newPoint);

		return Line3.fromPointAndDirection(out, newPoint, newDirection);
	}
}
