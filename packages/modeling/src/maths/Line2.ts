import {Vec2} from "../Vector/index.js";
import {IVec2} from "../Vector/types.js";
import {Mat4} from "../types.js";
import {solve2Linear} from "../utils/solve2Linear.js";

/**
 * Represents an unbounded line in 2D space, positioned at a point of origin.
 * A line is parametrized by a normal vector (perpendicular to the line,
 * rotated 90 degrees counterclockwise) and distance from the origin.
 *
 * Equation: A Point (P) is on Line (L) if dot(L.normal, P) == L.distance
 *
 * The contents of the array are a normal [0,1] and a distance [2].
 */
export type ILine2 = [number, number, number];

export class Line2 {
	/**
	 * Create a clone of the given line.
	 *
	 * @param {Line2} line - line to clone
	 * @returns {Line2} a new unbounded line
	 * @alias module:modeling/maths/line2.clone
	 */
	public static clone(line: ILine2): ILine2 {
		const out = Line2.create();
		out[0] = line[0];
		out[1] = line[1];
		out[2] = line[2];
		return out;
	}

	/**
	 * Determine the closest point on the given line to the given point.
	 *
	 * @param {Line2} line - line of reference
	 * @param {Vec2} point - point of reference
	 * @returns {Vec2} closest point
	 * @alias module:modeling/maths/line2.closestPoint
	 */
	public static closestPoint(line: ILine2, point: IVec2): IVec2 {
		const orig = Line2.origin(line);
		const dir = Line2.direction(line);

		const v = Vec2.subtract(Vec2.create(), point, orig);
		const dist = Vec2.dot(v, dir);
		Vec2.scale(v, dir, dist);
		Vec2.add(v, v, orig);
		return v;
	}
	/**
	 * Copy the given line to the receiving line.
	 *
	 * @param {Line2} out - receiving line
	 * @param {Line2} line - line to copy
	 * @returns {Line2} out
	 * @alias module:modeling/maths/line2.copy
	 */
	public static copy(out: ILine2, line: ILine2): ILine2 {
		out[0] = line[0];
		out[1] = line[1];
		out[2] = line[2];
		return out;
	}
	/**
	 * Create a line, positioned at 0,0, and running along the X axis.
	 *
	 * @returns {Line2} a new unbounded line
	 * @alias module:modeling/maths/line2.create
	 */
	public static create(): ILine2 {
		return [0, 1, 0];
	} // normal and distance
	/**
	 * Return the direction of the given line.
	 *
	 * @param {Line2} line - line of reference
	 * @return {Vec2} a vector in the direction of the line
	 * @alias module:modeling/maths/line2.direction
	 */
	public static direction(line: ILine2): IVec2 {
		const vector = Vec2.normal(Vec2.create(), line);
		Vec2.negate(vector, vector);
		return vector;
	}
	/**
	 * Calculate the distance (positive) between the given point and line.
	 *
	 * @param {Line2} line - line of reference
	 * @param {Vec2} point - point of reference
	 * @return {number} distance between line and point
	 * @alias module:modeling/maths/line2.distanceToPoint
	 */
	public static distanceToPoint(line: ILine2, point: IVec2): number {
		let distance = Vec2.dot(point, line);
		distance = Math.abs(distance - line[2]);
		return distance;
	}
	/**
	 * Compare the given lines for equality.
	 *
	 * @param {Line2} line1 - first line to compare
	 * @param {Line2} line2 - second line to compare
	 * @return {boolean} true if lines are equal
	 * @alias module:modeling/maths/line2.equals
	 */
	public static equals(line1: ILine2, line2: ILine2): boolean {
		return line1[0] === line2[0] && line1[1] === line2[1] && line1[2] === line2[2];
	}
	/**
	 * Create a new line that passes through the given points.
	 *
	 * @param {Line2} out - receiving line
	 * @param {Vec2} point1 - start point of the line
	 * @param {Vec2} point2 - end point of the line
	 * @returns {Line2} a new unbounded line
	 * @alias module:modeling/maths/line2.fromPoints
	 */
	public static fromPoints(out: ILine2, point1: IVec2, point2: IVec2): ILine2 {
		const vector = Vec2.subtract(Vec2.create(), point2, point1); // directional vector

		Vec2.normal(vector, vector);
		Vec2.normalize(vector, vector); // normalized

		const distance = Vec2.dot(point1, vector);

		out[0] = vector[0];
		out[1] = vector[1];
		out[2] = distance;
		return out;
	}
	/**
	 * Creates a new line initialized with the given values.
	 *
	 * @param {number} x - X coordinate of the unit normal
	 * @param {number} y - Y coordinate of the unit normal
	 * @param {number} d - distance of the line from [0,0]
	 * @returns {Line2} a new unbounded line
	 * @alias module:modeling/maths/line2.fromValues
	 */
	public static fromValues(x: number, y: number, d: number): ILine2;
	public static fromValues(x, y, d) {
		const out = Line2.create();
		out[0] = x;
		out[1] = y;
		out[2] = d;
		return out;
	}
	/**
	 * Return the point of intersection between the given lines.
	 *
	 * NOTES:
	 * The point will have Infinity values if the lines are parallel.
	 * The point will have NaN values if the lines are the same.
	 *
	 * @param {Line2} line1 - line of reference
	 * @param {Line2} line2 - line of reference
	 * @return {Vec2} the point of intersection
	 * @alias module:modeling/maths/line2.intersectPointOfLines
	 */
	public static intersectPointOfLines(line1: ILine2, line2: ILine2): IVec2 {
		const point = solve2Linear(line1[0], line1[1], line2[0], line2[1], line1[2], line2[2]);
		return Vec2.clone(point);
	}

	/**
	 * Return the origin of the given line.
	 * The origin is the point on the line which is closest to the origin [0, 0].
	 *
	 * @param {Line2} line - line of reference
	 * @return {Vec2} the origin of the line
	 * @alias module:modeling/maths/line2.origin
	 */
	public static origin(line: ILine2): IVec2 {
		return Vec2.scale(Vec2.create(), line, line[2]);
	}
	/**
	 * Create a new line in the opposite direction as the given.
	 *
	 * @param {Line2} out - receiving line
	 * @param {Line2} line - line to reverse
	 * @returns {Line2} out
	 * @alias module:modeling/maths/line2.reverse
	 */
	public static reverse(out: ILine2, line: ILine2): ILine2 {
		const normal = Vec2.negate(Vec2.create(), line);
		const distance = -line[2];
		return Line2.copy(out, Line2.fromValues(normal[0], normal[1], distance));
	}

	/**
	 * Return a string representing the given line.
	 *
	 * @param {Line2} line - line of reference
	 * @returns {string} string representation
	 * @alias module:modeling/maths/line2.toString
	 */
	public static toString(line: ILine2): string {
		return `line2: (${line[0].toFixed(7)}, ${line[1].toFixed(7)}, ${line[2].toFixed(7)})`;
	}

	/**
	 * Transforms the given line using the given matrix.
	 *
	 * @param {Line2} out - receiving line
	 * @param {Line2} line - line to transform
	 * @param {Mat4} matrix - matrix to transform with
	 * @returns {Line2} out
	 * @alias module:modeling/maths/line2.transform
	 */
	public static transform(out: ILine2, line: ILine2, matrix: Mat4): ILine2 {
		const org = Line2.origin(line);
		const dir = Line2.direction(line);

		Vec2.transform(org, org, matrix);
		Vec2.transform(dir, dir, matrix);

		return Line2.fromPoints(out, org, dir);
	}
	/**
	 * Determine the X coordinate of the given line at the Y coordinate.
	 *
	 * The X coordinate will be Infinity if the line is parallel to the X axis.
	 *
	 * @param {Line2} line - line of reference
	 * @param {number} y - Y coordinate on the line
	 * @return {number} the X coordinate on the line
	 * @alias module:modeling/maths/line2.xAtY
	 */
	public static xAtY(line: ILine2, y: number): number {
		let x = (line[2] - line[1] * y) / line[0];
		if (Number.isNaN(x)) {
			const org = Line2.origin(line);
			x = org[0];
		}
		return x;
	}
}
