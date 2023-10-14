import {Mat4} from "../../types.js";
import {Vector} from "../Vector.js";
import {IVec3, IVec2} from "../types.js";

export class Vec3 extends Vector {
	/**
	 * Creates a new Vec2 vector, initialized to all zeros.
	 *
	 * @returns a new Vec2 vector
	 * @alias module:modeling/maths/vec2.create
	 */
	public static create(): IVec3 {
		return super.createBase(3);
	}

	/**
	/**
	 * Clones a 3-dimensional vector.
	 *
	 * @param {IVec3} vector - The vector to clone.
	 * @return {IVec3} The cloned vector.
	 */
	public static clone(vector: IVec3): IVec3 {
		return super.cloneBase(vector, super.createBase(3));
	}
	/**
	 * Calculate the angle between two vectors.
	 *
	 * @param {Vec3} a - first operand
	 * @param {Vec3} b - second operand
	 * @returns {number} angle (radians)
	 * @alias module:modeling/maths/vec3.angle
	 */
	public static angle(a: IVec3, b: IVec3): number {
		const ax = a[0];
		const ay = a[1];
		const az = a[2];
		const bx = b[0];
		const by = b[1];
		const bz = b[2];
		const mag1 = Math.sqrt(ax * ax + ay * ay + az * az);
		const mag2 = Math.sqrt(bx * bx + by * by + bz * bz);
		const mag = mag1 * mag2;
		const cosine = mag && super.dot(a, b) / mag;
		return Math.acos(Math.min(Math.max(cosine, -1), 1));
	}

	/**
	 * Computes the cross product of the given vectors (AxB).
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} a - first operand
	 * @param {Vec3} b - second operand
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.cross
	 */
	public static cross(out: IVec3, a: IVec3, b: IVec3): IVec3 {
		const ax = a[0];
		const ay = a[1];
		const az = a[2];
		const bx = b[0];
		const by = b[1];
		const bz = b[2];

		out[0] = ay * bz - az * by;
		out[1] = az * bx - ax * bz;
		out[2] = ax * by - ay * bx;
		return out;
	}
	/**
	 * Calculates the Euclidian distance between the given vectors.
	 *
	 * @param {Vec3} a - first operand
	 * @param {Vec3} b - second operand
	 * @returns {number} distance
	 * @alias module:modeling/maths/vec3.distance
	 */
	public static distance(a: IVec3, b: IVec3): number {
		const x = b[0] - a[0];
		const y = b[1] - a[1];
		const z = b[2] - a[2];
		return Math.sqrt(x * x + y * y + z * z);
	}

	/**
	 * Creates a new vector initialized with the given values.
	 *
	 * @param {number} x - X component
	 * @param {number} y - Y component
	 * @param {number} z - Z component
	 * @returns {Vec3} a new vector
	 * @alias module:modeling/maths/vec3.fromValues
	 */
	public static fromValues(x: number, y: number, z: number): IVec3 {
		const out = Vec3.create();
		out[0] = x;
		out[1] = y;
		out[2] = z;
		return out;
	}

	/**
	 * Create a new vector by extending a 2D vector with a Z value.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Array} vector - 2D vector of values
	 * @param {number} [z=0] - Z value
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.fromVec2
	 */
	public static fromVec2(out: IVec3, vector: IVec2, z?: number): IVec3 {
		out[0] = vector[0];
		out[1] = vector[1];
		out[2] = z;
		return out;
	}

	/**
	 * Normalize the given vector.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector to normalize
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.normalize
	 */
	public static normalize(out: IVec3, vector: IVec3): IVec3 {
		const x = vector[0];
		const y = vector[1];
		const z = vector[2];
		let len = x * x + y * y + z * z;
		if (len > 0) {
			len = 1 / Math.sqrt(len);
		}
		out[0] = x * len;
		out[1] = y * len;
		out[2] = z * len;
		return out;
	}
	/**
	 * Create a new vector that is orthogonal to the given vector.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector of reference
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.orthogonal
	 */
	public static orthogonal(out: IVec3, vector: IVec3): IVec3 {
		const bV = Vec3.abs(Vec3.create(), vector);
		const b0 = 0 + (bV[0] < bV[1] && bV[0] < bV[2]);
		const b1 = 0 + (bV[1] <= bV[0] && bV[1] < bV[2]);
		const b2 = 0 + (bV[2] <= bV[0] && bV[2] <= bV[1]);

		return Vec3.cross(out, vector, [b0, b1, b2]);
	}
	/**
	 * Rotate the given vector around the given origin, X axis only.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector to rotate
	 * @param {Vec3} origin - origin of the rotation
	 * @param {number} radians - angle of rotation
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.rotateX
	 */
	public static rotateX(out: IVec3, vector: IVec3, origin: IVec3, radians: number): IVec3 {
		const p = [];
		const r = [];

		// translate point to the origin
		p[0] = vector[0] - origin[0];
		p[1] = vector[1] - origin[1];
		p[2] = vector[2] - origin[2];

		// perform rotation
		r[0] = p[0];
		r[1] = p[1] * Math.cos(radians) - p[2] * Math.sin(radians);
		r[2] = p[1] * Math.sin(radians) + p[2] * Math.cos(radians);

		// translate to correct position
		out[0] = r[0] + origin[0];
		out[1] = r[1] + origin[1];
		out[2] = r[2] + origin[2];

		return out;
	}
	/**
	 * Rotate the given vector around the given origin, Y axis only.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector to rotate
	 * @param {Vec3} origin - origin of the rotation
	 * @param {number} radians - angle of rotation
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.rotateY
	 */
	public static rotateY(out: IVec3, vector: IVec3, origin: IVec3, radians: number): IVec3 {
		const p = [];
		const r = [];

		// translate point to the origin
		p[0] = vector[0] - origin[0];
		p[1] = vector[1] - origin[1];
		p[2] = vector[2] - origin[2];

		// perform rotation
		r[0] = p[2] * Math.sin(radians) + p[0] * Math.cos(radians);
		r[1] = p[1];
		r[2] = p[2] * Math.cos(radians) - p[0] * Math.sin(radians);

		// translate to correct position
		out[0] = r[0] + origin[0];
		out[1] = r[1] + origin[1];
		out[2] = r[2] + origin[2];

		return out;
	}
	/**
	 * Rotate the given vector around the given origin, Z axis only.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector to rotate
	 * @param {Vec3} origin - origin of the rotation
	 * @param {number} radians - angle of rotation in radians
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.rotateZ
	 */
	public static rotateZ(out: IVec3, vector: IVec3, origin: IVec3, radians: number): IVec3 {
		const p = [];
		const r = [];
		// Translate point to the origin
		p[0] = vector[0] - origin[0];
		p[1] = vector[1] - origin[1];

		// z
		// perform rotation
		r[0] = p[0] * Math.cos(radians) - p[1] * Math.sin(radians);
		r[1] = p[0] * Math.sin(radians) + p[1] * Math.cos(radians);

		// translate to correct position
		out[0] = r[0] + origin[0];
		out[1] = r[1] + origin[1];
		out[2] = vector[2];

		return out;
	}

	/**
	 * Transforms the given vector using the given matrix.
	 *
	 * @param {Vec3} out - receiving vector
	 * @param {Vec3} vector - vector to transform
	 * @param {Mat4} matrix - transform matrix
	 * @returns {Vec3} out
	 * @alias module:modeling/maths/vec3.transform
	 */
	public static transform(out: IVec3, vector: IVec3, matrix: Mat4): IVec3 {
		const x = vector[0];
		const y = vector[1];
		const z = vector[2];
		let w = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
		w = w || 1.0;
		out[0] = (matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12]) / w;
		out[1] = (matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13]) / w;
		out[2] = (matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14]) / w;
		return out;
	}
}
