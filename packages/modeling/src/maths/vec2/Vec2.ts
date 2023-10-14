import {sin, cos} from "../utils/trigonometry.js";
import {TAU} from "../constants.js";
import {Mat4, Vec3} from "../types.js";

export class Vec2 {
	/**
	 * Calculates the absolute coordinates of the given vector.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector of reference
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.abs
	 */
	public static abs(out: Vec2, vector: Vec2): Vec2 {
		out[0] = Math.abs(vector[0]);
		out[1] = Math.abs(vector[1]);
		return out;
	}

	/**
	 * Adds the coordinates of two vectors (A+B).
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.add
	 */
	public static add(out: Vec2, a: Vec2, b: Vec2): Vec2 {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		return out;
	}

	/**
	 * Create a copy of the given vector.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - source vector
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.copy
	 */
	public static copy(out: Vec2, vector: Vec2): Vec2 {
		out[0] = vector[0];
		out[1] = vector[1];
		return out;
	}

	/**
	 * Creates a new vector, initialized to [0,0].
	 *
	 * @returns {Vec2} a new vector
	 * @alias module:modeling/maths/vec2.create
	 */
	public static create(): Vec2 {
		return [0, 0];
	}

	/**
	 * Create a clone of the given vector.
	 *
	 * @param {Vec2} vector - vector to clone
	 * @returns {Vec2} a new vector
	 * @alias module:modeling/maths/vec2.clone
	 */
	public static clone(vector: Vec2): Vec2 {
		const out = Vec2.create();
		out[0] = vector[0];
		out[1] = vector[1];
		return out;
	}

	/**
	 * Calculate the angle of the given vector.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {number} angle in degrees
	 * @alias module:modeling/maths/vec2.angleDegrees
	 */
	public static angleDegrees(vector: Vec2): number {
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
	public static cross(out: Vec3, a: Vec2, b: Vec2): Vec3 {
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
	public static distance(a: Vec2, b: Vec2): number {
		const x = b[0] - a[0];
		const y = b[1] - a[1];
		return Math.sqrt(x * x + y * y);
	}

	/**
	 * Divides the coordinates of two vectors (A/B).
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.divide
	 */
	public static divide(out: Vec2, a: Vec2, b: Vec2): Vec2 {
		out[0] = a[0] / b[0];
		out[1] = a[1] / b[1];
		return out;
	}

	/**
	 * Calculates the dot product of two vectors.
	 *
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {number} dot product
	 * @alias module:modeling/maths/vec2.dot
	 */
	public static dot(a: Vec2, b: Vec2): number {
		return a[0] * b[0] + a[1] * b[1];
	}

	/**
	 * Compare the given vectors for equality.
	 *
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Boolean} true if a and b are equal
	 * @alias module:modeling/maths/vec2.equals
	 */
	public static equals(a: Vec2, b: Vec2): boolean {
		return a[0] === b[0] && a[1] === b[1];
	}

	/**
	 * Create a new vector in the direction of the given angle.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {number} degrees - angle in degrees
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.fromAngleDegrees
	 */
	public static fromAngleDegrees(out: Vec2, degrees: number): Vec2 {
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
	public static fromAngleRadians(out: Vec2, radians: number): Vec2 {
		out[0] = cos(radians);
		out[1] = sin(radians);
		return out;
	}

	/**
	 * Create a vector from a single scalar value.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {number} scalar - the scalar value
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.fromScalar
	 */
	public static fromScalar(out: Vec2, scalar: number): Vec2 {
		out[0] = scalar;
		out[1] = scalar;
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
	public static fromValues(x: number, y: number): Vec2 {
		const out = Vec2.create();
		out[0] = x;
		out[1] = y;
		return out;
	}

	/**
	 * Calculates the length of the given vector.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {number} length
	 * @alias module:modeling/maths/vec2.length
	 */
	public static vecLength(vector: Vec2): number {
		return Math.sqrt(vector[0] * vector[0] + vector[1] * vector[1]);
	}

	/**
	 * Performs a linear interpolation between two vectors.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @param {number} t - interpolation amount between the two vectors
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.lerp
	 */
	public static lerp(out: Vec2, a: Vec2, b: Vec2, t: number): Vec2 {
		const ax = a[0];
		const ay = a[1];
		out[0] = ax + t * (b[0] - ax);
		out[1] = ay + t * (b[1] - ay);
		return out;
	}

	/**
	 * Returns the maximum coordinates of two vectors.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.max
	 */
	public static max(out: Vec2, a: Vec2, b: Vec2): Vec2 {
		out[0] = Math.max(a[0], b[0]);
		out[1] = Math.max(a[1], b[1]);
		return out;
	}

	/**
	 * Returns the minimum coordinates of two vectors.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.min
	 */
	public static min(out, a, b) {
		out[0] = Math.min(a[0], b[0]);
		out[1] = Math.min(a[1], b[1]);
		return out;
	}

	/**
	 * Multiplies the coordinates of two vectors (A*B).
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.multiply
	 */
	public static multiply(out: Vec2, a: Vec2, b: Vec2): Vec2 {
		out[0] = a[0] * b[0];
		out[1] = a[1] * b[1];
		return out;
	}

	/**
	 * Negates the coordinates of the given vector.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to negate
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.negate
	 */
	public static negate(out: Vec2, vector: Vec2): Vec2 {
		out[0] = -vector[0];
		out[1] = -vector[1];
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
	public static normal(out: Vec2, vector: Vec2): Vec2 {
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
	public static normalize(out: Vec2, vector: Vec2): Vec2 {
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
	public static rotate(out: Vec2, vector: Vec2, origin: Vec2, radians: number): Vec2 {
		const x = vector[0] - origin[0];
		const y = vector[1] - origin[1];
		const c = Math.cos(radians);
		const s = Math.sin(radians);

		out[0] = x * c - y * s + origin[0];
		out[1] = x * s + y * c + origin[1];

		return out;
	}

	/**
	 * Scales the coordinates of the given vector.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to scale
	 * @param {number} amount - amount to scale
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.scale
	 */
	public static scale(out: Vec2, vector: Vec2, amount: number): Vec2 {
		out[0] = vector[0] * amount;
		out[1] = vector[1] * amount;
		return out;
	}

	/**
	 * Snaps the coordinates of the given vector to the given epsilon.
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} vector - vector to snap
	 * @param {number} epsilon - epsilon of precision, less than 0
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.snap
	 */
	public static snap(out: Vec2, vector: Vec2, epsilon: number): Vec2 {
		out[0] = Math.round(vector[0] / epsilon) * epsilon + 0;
		out[1] = Math.round(vector[1] / epsilon) * epsilon + 0;
		return out;
	}

	/**
	 * Calculates the squared distance between the given vectors.
	 *
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {number} squared distance
	 * @alias module:modeling/maths/vec2.squaredDistance
	 */
	public static squaredDistance(a: Vec2, b: Vec2): number {
		const x = b[0] - a[0];
		const y = b[1] - a[1];
		return x * x + y * y;
	}

	/**
	 * Calculates the squared length of the given vector.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {number} squared length
	 * @alias module:modeling/maths/vec2.squaredLength
	 */
	public static squaredLength(vector: Vec2): number {
		const x = vector[0];
		const y = vector[1];
		return x * x + y * y;
	}

	/**
	 * Subtracts the coordinates of two vectors (A-B).
	 *
	 * @param {Vec2} out - receiving vector
	 * @param {Vec2} a - first operand
	 * @param {Vec2} b - second operand
	 * @returns {Vec2} out
	 * @alias module:modeling/maths/vec2.subtract
	 */
	public static subtract(out: Vec2, a: Vec2, b: Vec2): Vec2 {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		return out;
	}

	/**
	 * Convert the given vector to a representative string.
	 *
	 * @param {Vec2} vector - vector of reference
	 * @returns {string} string representation
	 * @alias module:modeling/maths/vec2.toString
	 */
	public static toString(vector: Vec2): string {
		return `[${vector[0].toFixed(7)}, ${vector[1].toFixed(7)}]`;
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
	public static transform(out: Vec2, vector: Vec2, matrix: Mat4): Vec2 {
		const x = vector[0];
		const y = vector[1];
		out[0] = matrix[0] * x + matrix[4] * y + matrix[12];
		out[1] = matrix[1] * x + matrix[5] * y + matrix[13];
		return out;
	}
}
