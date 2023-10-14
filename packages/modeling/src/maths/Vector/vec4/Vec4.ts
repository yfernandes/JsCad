import {Mat4} from "../../types.js";
import {Vector} from "../Vector.js";
import {IVec4} from "../types.js";

export class Vec4 extends Vector {
	/**
	 * Creates a new vector initialized to [0,0,0,0].
	 *
	 * @returns {Vec4} a new vector
	 * @alias module:modeling/maths/vec4.create
	 */
	public static create(): IVec4 {
		return super.createBase(4);
	}

	/**
	 * Create a copy of the given vector.
	 *
	 * @param {Vec4} out - receiving vector
	 * @param {Vec4} vector - source vector
	 * @returns {Vec4} out
	 * @alias module:modeling/maths/vec4.copy
	 */
	public static copy(out: IVec4, vector: IVec4): IVec4 {
		return super.copyBase(out, vector);
	}

	/**
	 * Create a clone of the given vector.
	 *
	 * @param {Vec4} vector - source vector
	 * @returns {Vec4} a new vector
	 * @alias module:modeling/maths/vec4.clone
	 */
	public static clone(vector: IVec4): IVec4 {
		const out = Vec4.create();
		out[0] = vector[0];
		out[1] = vector[1];
		out[2] = vector[2];
		out[3] = vector[3];
		return out;
	}

	/**
	 * Transform the given vector using the given matrix.
	 *
	 * @param {Vec4} out - receiving vector
	 * @param {Vec4} vector - vector to transform
	 * @param {Mat4} matrix - matrix to transform with
	 * @returns {Vec4} out
	 * @alias module:modeling/maths/vec4.transform
	 */
	public static transform(out: IVec4, vector: IVec4, matrix: Mat4): IVec4 {
		const [x, y, z, w] = vector;

		out[0] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12] * w;
		out[1] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13] * w;
		out[2] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14] * w;
		out[3] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15] * w;
		return out;
	}
	/**
	 * Creates a new vector with the given values.
	 *
	 * @param {number} x - X component
	 * @param {number} y - Y component
	 * @param {number} z - Z component
	 * @param {number} w - W component
	 * @returns {Vec4} a new vector
	 * @alias module:modeling/maths/vec4.fromValues
	 */
	public static fromValues(x: number, y: number, z: number, w: number): IVec4 {
		const out = Vec4.create();
		out[0] = x;
		out[1] = y;
		out[2] = z;
		out[3] = w;
		return out;
	}
}
