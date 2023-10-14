import {IVec2, IVec3, IVec4, IVecN} from "./types.js";

export abstract class Vector {
	/**
	 * Creates a new vector, initialized to all zeros.
	 *
	 * @param n - the number of elements in the vector
	 * @returns a new vector
	 * @alias module:modeling/maths/vecN.create
	 */
	protected static createBase(n: 2): IVec2;
	protected static createBase(n: 3): IVec3;
	protected static createBase(n: 4): IVec4;
	protected static createBase(n: 2 | 3 | 4): IVecN {
		return Array(n).fill(0) as IVecN;
	}

	/**
	 * Create a clone of the given vector.
	 *
	 * @param {IVecN} vector - vector to clone
	 * @param {IVecN} out - receiving vector
	 * @returns {IVecN} a new vector
	 * @alias module:modeling/maths/vecN.clone
	 */
	protected static cloneBase(vector: IVec2, out: IVec2): IVec2;
	protected static cloneBase(vector: IVec3, out: IVec3): IVec3;
	protected static cloneBase(vector: IVec4, out: IVec4): IVec4;
	protected static cloneBase(vector: IVecN, out: IVecN): IVecN {
		vector.forEach((value, index) => {
			out[index] = value;
		});

		return out;
	}

	/**
	 * Create a copy of the given vector.
	 *
	 * @param out - receiving vector
	 * @param vector - source vector
	 * @returns out
	 * @alias module:modeling/maths/vec2.copy
	 */
	public static copyBase(out: IVec2, vector: IVec2): IVec2;
	public static copyBase(out: IVec3, vector: IVec3): IVec3;
	public static copyBase(out: IVec4, vector: IVec4): IVec4;
	public static copyBase(out: IVecN, vector: IVecN): IVecN {
		vector.forEach((value, index) => {
			out[index] = value;
		});
		return out;
	}

	/**
	 * Calculates the absolute coordinates of the given vector.
	 *
	 * @param out - receiving vector
	 * @param vector - vector of reference
	 * @returns out
	 * @alias module:modeling/maths/vec2.abs
	 */
	public static abs(out: IVec2, vector: IVec2): IVec2;
	public static abs(out: IVec3, vector: IVec3): IVec3;
	public static abs(out: IVec4, vector: IVec4): IVec4;
	public static abs(out: IVecN, vector: IVecN): IVecN {
		vector.forEach((value, index) => {
			out[index] = Math.abs(value);
		});
		return out;
	}

	/**
	 * Adds the coordinates of two vectors (A+B).
	 *
	 * @param out - receiving vector
	 * @param a - first operand
	 * @param b - second operand
	 * @returns out
	 * @alias module:modeling/maths/vec2.add
	 */
	public static add(out: IVec2, a: IVec2, b: IVec2): IVec2;
	public static add(out: IVec3, a: IVec3, b: IVec3): IVec3;
	public static add(out: IVec4, a: IVec4, b: IVec4): IVec4;
	public static add(out: IVecN, a: IVecN, b: IVecN): IVecN {
		a.forEach((value, index) => {
			out[index] = value + b[index];
		});
		return out;
	}

	/**
	 * Calculates the dot product of two vectors.
	 *
	 * @param a - first operand
	 * @param b - second operand
	 * @returns dot product
	 * @alias module:modeling/maths/vec2.dot
	 */
	public static dot(a: IVec2, b: IVec2): number;
	public static dot(a: IVec3, b: IVec3): number;
	public static dot(a: IVec4, b: IVec4): number;
	public static dot(a: IVecN, b: IVecN): number {
		return a.reduce((p, _, i) => (p += a[i] * b[i]), 0);
	}

	/**
	 * Calculates the length of the given vector.
	 *
	 * @param vector - vector of reference
	 * @returns length
	 * @alias module:modeling/maths/vec2.length
	 */
	public static vecLength(vector: IVec2): number;
	public static vecLength(vector: IVec3): number;
	public static vecLength(vector: IVec4): number;
	public static vecLength(vector: IVecN): number {
		return Math.sqrt(vector.reduce((p, _, i) => (p += vector[i] * vector[i]), 0));
	}

	/**
	 * Compare the given vectors for equality.
	 *
	 * @param a - first operand
	 * @param b - second operand
	 * @returns true if a and b are equal
	 * @alias module:modeling/maths/vec2.equals
	 */
	public static equals(a: IVec2, b: IVec2): boolean;
	public static equals(a: IVec3, b: IVec3): boolean;
	public static equals(a: IVec4, b: IVec4): boolean;
	public static equals(a: IVecN, b: IVecN): boolean {
		return a.reduce((p, _, i) => p && a[i] === b[i], true);
	}

	/**
	 * Performs a linear interpolation between two vectors.
	 *
	 * @param out - receiving vector
	 * @param a - first operand
	 * @param b - second operand
	 * @param t - interpolation amount between the two vectors
	 * @returns out
	 * @alias module:modeling/maths/vec2.lerp
	 */
	public static lerp(out: IVec2, a: IVec2, b: IVec2, t: number): IVec2;
	public static lerp(out: IVec3, a: IVec3, b: IVec3, t: number): IVec3;
	public static lerp(out: IVec4, a: IVec4, b: IVec4, t: number): IVec4;
	public static lerp(out: IVecN, a: IVecN, b: IVecN, t: number): IVecN {
		a.forEach((_, i) => (out[i] = a[i] + t * (b[i] - a[i])));
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
	public static max<T extends IVecN>(out: T, a: T, b: T): T {
		a.forEach((_, i) => (out[i] = Math.max(a[i], b[i])));
		return out;
	}

	/**
	 * Returns the minimum coordinates of two vectors.
	 *
	 * @param out - receiving vector
	 * @param a - first operand
	 * @param b - second operand
	 * @returns out
	 * @alias module:modeling/maths/vec2.min
	 */
	public static min(out: IVec2, a: IVec2, b: IVec2): IVec2;
	public static min(out: IVec3, a: IVec3, b: IVec3): IVec3;
	public static min(out: IVec4, a: IVec4, b: IVec4): IVec4;
	public static min(out: IVecN, a: IVecN, b: IVecN): IVecN {
		a.forEach((_, i) => (out[i] = Math.min(a[i], b[i])));
		return out;
	}

	/**
	 * Multiplies the coordinates of two vectors (A*B).
	 *
	 * @param out - receiving vector
	 * @param a - first operand
	 * @param b - second operand
	 * @returns out
	 * @alias module:modeling/maths/vec2.multiply
	 */
	public static multiply(out: IVec2, a: IVec2, b: IVec2): IVec2;
	public static multiply(out: IVec3, a: IVec3, b: IVec3): IVec3;
	public static multiply(out: IVec4, a: IVec4, b: IVec4): IVec4;
	public static multiply(out: IVecN, a: IVecN, b: IVecN): IVecN {
		a.forEach((_, i) => (out[i] = a[i] * b[i]));
		return out;
	}

	/**
	 * Negates the coordinates of the given vector.
	 *
	 * @param out - receiving vector
	 * @param vector - vector to negate
	 * @returns out
	 * @alias module:modeling/maths/vec2.negate
	 */
	public static negate(out: IVec2, vector: IVec2): IVec2;
	public static negate(out: IVec3, vector: IVec3): IVec3;
	public static negate(out: IVec4, vector: IVec4): IVec4;
	public static negate(out: IVecN, vector: IVecN): IVecN {
		vector.forEach((_, i) => (out[i] = -vector[i]));
		return out;
	}

	/**
	 * Calculates the squared length of the given vector.
	 *
	 * @param {IVec2} vector - Vector of reference (2D)
	 * @returns {number} Squared length
	 * @alias module:modeling/maths/vec2.squaredLength
	 */
	public static squaredLength(vector: IVec2): number;
	public static squaredLength(vector: IVec3): number;
	public static squaredLength(vector: IVec4): number;
	public static squaredLength(vector: IVecN): number {
		return vector.reduce((p, value) => p + value * value, 0);
	}

	/**
	 * Subtract the coordinates of two vectors (A - B).
	 *
	 * @param {IVec2} out - Receiving vector (2D)
	 * @param {IVec2} a - First operand
	 * @param {IVec2} b - Second operand
	 * @returns {IVec2} out
	 * @alias module:modeling/maths/vec2.subtract
	 */
	public static subtract(out: IVec2, a: IVec2, b: IVec2): IVec2;
	public static subtract(out: IVec3, a: IVec3, b: IVec3): IVec3;
	public static subtract(out: IVec4, a: IVec4, b: IVec4): IVec4;
	public static subtract(out: IVecN, a: IVecN, b: IVecN): IVecN {
		a.forEach((_, i) => (out[i] = a[i] - b[i]));
		return out;
	}

	/**
	 * Convert the vector to a string representation.
	 *
	 * @param {IVecN} vector - vector to convert to a string
	 * @returns {string} string representation of the vector
	 * @alias module:modeling/maths/vecN.toString
	 */
	public static toString(vector: IVec2): string;
	public static toString(vector: IVec3): string;
	public static toString(vector: IVec4): string;
	public static toString(vector: IVecN): string {
		return `[${vector.map((value) => value.toFixed(7)).join(", ")}]`;
	}

	/**
	 * Scales the coordinates of the given vector.
	 *
	 * @param {IVec2} out - Receiving vector (2D)
	 * @param {IVec2} vector - Vector to scale (2D)
	 * @param {number} amount - Amount to scale
	 * @returns {IVec2} out
	 * @alias module:modeling/maths/vec2.scale
	 */
	public static scale(out: IVec2, vector: IVec2, amount: number): IVec2;
	public static scale(out: IVec3, vector: IVec3, amount: number): IVec3;
	public static scale(out: IVec4, vector: IVec4, amount: number): IVec4;
	public static scale(out: IVecN, vector: IVecN, amount: number): IVecN {
		vector.forEach((value, index) => {
			out[index] = value * amount;
		});
		return out;
	}

	/**
	 * Divides the coordinates of two vectors (A/B).
	 *
	 * @param {IVec2} out - Receiving vector (2D)
	 * @param {IVec2} a - First operand (2D)
	 * @param {IVec2} b - Second operand (2D)
	 * @returns {IVec2} out
	 * @alias module:modeling/maths/vec2.divide
	 */
	public static divide(out: IVec2, a: IVec2, b: IVec2): IVec2;
	public static divide(out: IVec3, a: IVec3, b: IVec3): IVec3;
	public static divide(out: IVec4, a: IVec4, b: IVec4): IVec4;
	public static divide(out: IVecN, a: IVecN, b: IVecN): IVecN {
		a.forEach((_, i) => (out[i] = a[i] / b[i]));
		return out;
	}

	/**
	 * Create a vector from a single scalar value.
	 *
	 * @param {IVec2} out - Receiving vector (2D)
	 * @param {number} scalar - The scalar value
	 * @returns {IVec2} out
	 * @alias module:modeling/maths/vec2.fromScalar
	 */
	public static fromScalar(out: IVec2, scalar: number): IVec2;
	public static fromScalar(out: IVec3, scalar: number): IVec3;
	public static fromScalar(out: IVec4, scalar: number): IVec4;
	public static fromScalar(out: IVecN, scalar: number): IVecN {
		out.forEach((_, i) => (out[i] = scalar));
		return out;
	}

	/**
	 * Snaps the coordinates of the given vector to the given epsilon.
	 *
	 * @param {IVecN} out - Receiving vector (N)
	 * @param {IVecN} vector - Vector to snap (N)
	 * @param {number} epsilon - Epsilon of precision, less than 0
	 * @returns {IVecN} out
	 * @alias module:modeling/maths/vecN.snap
	 */
	public static snap(out: IVec2, vector: IVec2, epsilon: number): IVec2;
	public static snap(out: IVec3, vector: IVec3, epsilon: number): IVec3;
	public static snap(out: IVec4, vector: IVec4, epsilon: number): IVec4;
	public static snap(out: IVecN, vector: IVecN, epsilon: number): IVecN {
		out.forEach((_, i) => (out[i] = Math.round(vector[i] / epsilon) * epsilon));
		return out;
	}

	/**
	 * Calculates the squared distance between the given vectors.
	 *
	 * @param {IVecN} a - First operand
	 * @param {IVecN} b - Second operand
	 * @returns {number} squared distance
	 * @alias module:modeling/maths/vecN.squaredDistance
	 */
	public static squaredDistance(a: IVec2, b: IVec2): number;
	public static squaredDistance(a: IVec3, b: IVec3): number;
	public static squaredDistance(a: IVec4, b: IVec4): number;
	public static squaredDistance(a: IVecN, b: IVecN): number {
		return a.reduce((p, _, i) => {
			const diff = a[i] - b[i];
			return p + diff * diff;
		}, 0);
	}
}
