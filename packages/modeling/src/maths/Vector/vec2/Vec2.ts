import {TAU} from "../../constants.js";
import {cos, sin} from "../../index.js";
import {Mat4} from "../../types.js";
import {Vector} from "../Vector.js";
import {Vec3} from "../index.js";
import {IVec2} from "../types.js";

export class Vec2 extends Vector {
	/**
	 * Creates a new Vec2 vector, initialized to all zeros.
	 *
	 * @returns a new Vec2 vector
	 * @alias module:modeling/maths/vec2.create
	 */
	public static create(): IVec2 {
		return super.createBase(2);
	}

	/**
	 * Clones a 2-dimensional vector.
	 *
	 * @param {IVec2} vector - The vector to clone.
	 * @return {IVec2} The cloned vector.
	 */
	public static clone(vector: IVec2): IVec2 {
		return super.cloneBase(vector, super.createBase(2));
	}

	/**
	 * Calculate the angle of the given vector.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {number} angle in degrees
	 * @alias module:modeling/maths/vec2.angleDegrees
	 */
	public static angleDegrees(vector: IVec2): number {
		return Vec2.angleRadians(vector) * 57.29577951308232;
	}
	/**
	 * Calculate the angle of the given vector.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {number} angle in radians
	 * @alias module:modeling/maths/vec2.angleRadians
	 */
	public static angleRadians(vector) {
		return Math.atan2(vector[1], vector[0]); // y=sin, x=cos
	}

	/**
	 * Computes the cross product (3D) of two vectors.
	 *
	 * @param {Vec3} out - receiving vector (3D)
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec2.cross
	 */
	public static cross(out: Vec3, a: IVec2, b: IVec2): Vec3 {
		out[0] = 0;
		out[1] = 0;
		out[2] = a[0] * b[1] - a[1] * b[0];
		return out;
	}

	/**
	 * Calculates the distance between two vectors.
	 *
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {number} distance
	 * @alias module:modeling/maths/vec2.distance
	 */
	public static distance(a: IVec2, b: IVec2): number {
		const x = b[0] - a[0];
		const y = b[1] - a[1];
		return Math.sqrt(x * x + y * y);
	}

	/**
	 * Create a new vector in the direction of the given angle.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {number} degrees - angle in degrees
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.fromAngleDegrees
	 */
	public static fromAngleDegrees(out: IVec2, degrees: number): IVec2 {
		return Vec2.fromAngleRadians(out, degrees * 0.017453292519943295);
	}

	/**
	 * Create a new vector in the direction of the given angle.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {number} radians - angle in radians
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.fromAngleRadians
	 */
	public static fromAngleRadians(out: IVec2, radians: number): IVec2 {
		out[0] = cos(radians);
		out[1] = sin(radians);
		return out;
	}

	/**
	 * Creates a new vector initialized with the given values.
	 *
	 * @param {number} x - X coordinate
	 * @param {number} y - Y coordinate
	 * @returns {Vec2} a new vector
	 * @alias module:modeling/maths/vec2.fromValues
	 */
	public static fromValues(x: number, y: number): IVec2 {
		const out = Vec2.create();
		out[0] = x;
		out[1] = y;
		return out;
	}

	/**
	 * Calculates the normal of the given vector.
	 * The normal value is the given vector rotated 90 degrees.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - given value
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.normal
	 */
	public static normal(out: IVec2, vector: IVec2): IVec2 {
		return Vec2.rotate(out, vector, Vec2.create(), TAU / 4);
	}

	/**
	 * Normalize the given vector.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to normalize
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.normalize
	 */
	public static normalize(out: IVec2, vector: IVec2): IVec2 {
		const x = vector[0];
		const y = vector[1];
		let len = x * x + y * y;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		out[0] = x * len;
		out[1] = y * len;
		return out;
	}

	/**
	 * Rotates the given vector by the given angle.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to rotate
	 * @param {Vec2} origin - origin of the rotation
	 * @param {number} radians - angle of rotation (radians)
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.rotate
	 */
	public static rotate<T extends IVec2>(out: T, vector: T, origin: T, radians: number): T {
		const x = vector[0] - origin[0];
		const y = vector[1] - origin[1];
		const c = Math.cos(radians);
		const s = Math.sin(radians);

		out[0] = x * c - y * s + origin[0];
		out[1] = x * s + y * c + origin[1];

		return out;
	}

	/**
	 * Transforms the given vector using the given matrix.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to transform
	 * @param {Mat4} matrix - matrix to transform with
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.transform
	 */
	public static transform(out: IVec2, vector: IVec2, matrix: Mat4): IVec2 {
		const x = vector[0];
		const y = vector[1];
		out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
		out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
		return out;
	}
}
