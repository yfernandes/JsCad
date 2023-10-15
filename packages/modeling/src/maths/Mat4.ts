import {Vec3} from "./Vector/index.js";
import {IVec3} from "./Vector/types.js";
import {EPS} from "./constants.js";
import {sin, cos} from "./index.js";
import {Plane} from "./types.js";

export type IMat4 = [
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
	number,
];

export class Mat4 {
	/**
	 * Adds the two matrices (A+B).
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} a - first operand
	 * @param {IMat4} b - second operand
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.add
	 */
	public static add(out: IMat4, a: IMat4, b: IMat4): IMat4 {
		out[0] = a[0] + b[0];
		out[1] = a[1] + b[1];
		out[2] = a[2] + b[2];
		out[3] = a[3] + b[3];
		out[4] = a[4] + b[4];
		out[5] = a[5] + b[5];
		out[6] = a[6] + b[6];
		out[7] = a[7] + b[7];
		out[8] = a[8] + b[8];
		out[9] = a[9] + b[9];
		out[10] = a[10] + b[10];
		out[11] = a[11] + b[11];
		out[12] = a[12] + b[12];
		out[13] = a[13] + b[13];
		out[14] = a[14] + b[14];
		out[15] = a[15] + b[15];
		return out;
	}
	/**
	 * Creates a clone of the given matrix.
	 *
	 * @param {IMat4} matrix - matrix to clone
	 * @returns {IMat4} a new matrix
	 * @alias module:modeling/maths/mat4.clone
	 */
	public static clone(matrix: IMat4): IMat4 {
		const out = Mat4.create();
		out[0] = matrix[0];
		out[1] = matrix[1];
		out[2] = matrix[2];
		out[3] = matrix[3];
		out[4] = matrix[4];
		out[5] = matrix[5];
		out[6] = matrix[6];
		out[7] = matrix[7];
		out[8] = matrix[8];
		out[9] = matrix[9];
		out[10] = matrix[10];
		out[11] = matrix[11];
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
		return out;
	}
	/**
	 * Creates a copy of the given matrix.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to copy
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.copy
	 */
	public static copy(out: IMat4, matrix: IMat4): IMat4 {
		out[0] = matrix[0];
		out[1] = matrix[1];
		out[2] = matrix[2];
		out[3] = matrix[3];
		out[4] = matrix[4];
		out[5] = matrix[5];
		out[6] = matrix[6];
		out[7] = matrix[7];
		out[8] = matrix[8];
		out[9] = matrix[9];
		out[10] = matrix[10];
		out[11] = matrix[11];
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
		return out;
	}
	/**
	 * Represents a 4x4 matrix which is column-major (when typed out it looks row-major).
	 * See fromValues().
	 */

	/**
	 * Creates a new identity matrix.
	 *
	 * @returns {IMat4} a new matrix
	 * @alias module:modeling/maths/mat4.create
	 */
	public static create(): IMat4 {
		return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
	}
	/**
	 * Returns whether the matrices have exactly the same elements in the same position.
	 *
	 * @param {IMat4} a - first matrix
	 * @param {IMat4} b - second matrix
	 * @returns {Boolean} true if the matrices are equal
	 * @alias module:modeling/maths/mat4.equals
	 */
	public static equals(a: IMat4, b: IMat4): boolean {
		return (
			a[0] === b[0] &&
			a[1] === b[1] &&
			a[2] === b[2] &&
			a[3] === b[3] &&
			a[4] === b[4] &&
			a[5] === b[5] &&
			a[6] === b[6] &&
			a[7] === b[7] &&
			a[8] === b[8] &&
			a[9] === b[9] &&
			a[10] === b[10] &&
			a[11] === b[11] &&
			a[12] === b[12] &&
			a[13] === b[13] &&
			a[14] === b[14] &&
			a[15] === b[15]
		);
	}
	/**
	 * Creates a matrix from a given angle around a given axis
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.rotate(dest, dest, rad, axis)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {number} rad - angle to rotate the matrix by
	 * @param {Vec3} axis - axis of which to rotate around
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromRotation
	 * @example
	 * let matrix = fromRotation(create(), TAU / 4, [0, 0, 3])
	 */

	public static fromRotation(out: IMat4, rad: number, axis: IVec3): IMat4 {
		let [x, y, z] = axis;
		const lengthSquared = x * x + y * y + z * z;

		if (Math.abs(lengthSquared) < EPS) {
			// axis is 0,0,0 or almost
			return Mat4.identity(out);
		}

		const len = 1 / Math.sqrt(lengthSquared);
		x *= len;
		y *= len;
		z *= len;

		const s = sin(rad);
		const c = cos(rad);
		const t = 1 - c;

		// Perform rotation-specific matrix multiplication
		out[0] = x * x * t + c;
		out[1] = y * x * t + z * s;
		out[2] = z * x * t - y * s;
		out[3] = 0;
		out[4] = x * y * t - z * s;
		out[5] = y * y * t + c;
		out[6] = z * y * t + x * s;
		out[7] = 0;
		out[8] = x * z * t + y * s;
		out[9] = y * z * t - x * s;
		out[10] = z * z * t + c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from a vector scaling.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.scale(dest, dest, vec)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {Vec3} vector - X, Y, Z factors by which to scale
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromScaling
	 * @example
	 * let matrix = fromScaling([1, 2, 0.5])
	 */
	public static fromScaling(out: IMat4, vector: IVec3): IMat4 {
		out[0] = vector[0];
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = vector[1];
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = vector[2];
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from the given Tait–Bryan angles.
	 *
	 * Tait-Bryan Euler angle convention using active, intrinsic rotations around the axes in the order z-y-x.
	 * @see https://en.wikipedia.org/wiki/Euler_angles
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {number} yaw - Z rotation in radians
	 * @param {number} pitch - Y rotation in radians
	 * @param {number} roll - X rotation in radians
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromTaitBryanRotation
	 * @example
	 * let matrix = fromTaitBryanRotation(create(), TAU / 4, 0, TAU / 2)
	 */

	public static fromTaitBryanRotation(out: IMat4, yaw: number, pitch: number, roll: number): IMat4 {
		// precompute sines and cosines of Euler angles
		const sy = sin(yaw);
		const cy = cos(yaw);
		const sp = sin(pitch);
		const cp = cos(pitch);
		const sr = sin(roll);
		const cr = cos(roll);

		// create and populate rotation matrix
		// left-hand-rule rotation
		// const els = [
		//  cp*cy, sr*sp*cy - cr*sy, sr*sy + cr*sp*cy, 0,
		//  cp*sy, cr*cy + sr*sp*sy, cr*sp*sy - sr*cy, 0,
		//  -sp, sr*cp, cr*cp, 0,
		//  0, 0, 0, 1
		// ]
		// right-hand-rule rotation
		out[0] = cp * cy;
		out[1] = cp * sy;
		out[2] = -sp;
		out[3] = 0;
		out[4] = sr * sp * cy - cr * sy;
		out[5] = cr * cy + sr * sp * sy;
		out[6] = sr * cp;
		out[7] = 0;
		out[8] = sr * sy + cr * sp * cy;
		out[9] = cr * sp * sy - sr * cy;
		out[10] = cr * cp;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from a vector translation.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.translate(dest, dest, vec)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {Vec3} vector - offset (vector) of translation
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromTranslation
	 * @example
	 * let matrix = fromTranslation(create(), [1, 2, 3])
	 */
	public static fromTranslation(out: IMat4, vector: IVec3): IMat4 {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = vector[0];
		out[13] = vector[1];
		out[14] = vector[2];
		out[15] = 1;
		return out;
	}
	/**
	 * Create a matrix with the given values.
	 *
	 * @param {number} m00 Component in column 0, row 0 position (index 0)
	 * @param {number} m01 Component in column 0, row 1 position (index 1)
	 * @param {number} m02 Component in column 0, row 2 position (index 2)
	 * @param {number} m03 Component in column 0, row 3 position (index 3)
	 * @param {number} m10 Component in column 1, row 0 position (index 4)
	 * @param {number} m11 Component in column 1, row 1 position (index 5)
	 * @param {number} m12 Component in column 1, row 2 position (index 6)
	 * @param {number} m13 Component in column 1, row 3 position (index 7)
	 * @param {number} m20 Component in column 2, row 0 position (index 8)
	 * @param {number} m21 Component in column 2, row 1 position (index 9)
	 * @param {number} m22 Component in column 2, row 2 position (index 10)
	 * @param {number} m23 Component in column 2, row 3 position (index 11)
	 * @param {number} m30 Component in column 3, row 0 position (index 12)
	 * @param {number} m31 Component in column 3, row 1 position (index 13)
	 * @param {number} m32 Component in column 3, row 2 position (index 14)
	 * @param {number} m33 Component in column 3, row 3 position (index 15)
	 * @returns {IMat4} a new matrix
	 * @alias module:modeling/maths/mat4.fromValues
	 * @example
	 * let matrix = fromValues(
	 *   1, 0, 0, 1,
	 *   0, 1, 0, 0,
	 *   0, 0, 1, 0,
	 *   0, 0, 0, 1
	 * )
	 */
	public static fromValues(
		m00: number,
		m01: number,
		m02: number,
		m03: number,
		m10: number,
		m11: number,
		m12: number,
		m13: number,
		m20: number,
		m21: number,
		m22: number,
		m23: number,
		m30: number,
		m31: number,
		m32: number,
		m33: number
	): IMat4 {
		const out = Mat4.create();
		out[0] = m00;
		out[1] = m01;
		out[2] = m02;
		out[3] = m03;
		out[4] = m10;
		out[5] = m11;
		out[6] = m12;
		out[7] = m13;
		out[8] = m20;
		out[9] = m21;
		out[10] = m22;
		out[11] = m23;
		out[12] = m30;
		out[13] = m31;
		out[14] = m32;
		out[15] = m33;
		return out;
	}
	/**
	 * Determine whether the given matrix is only translate and/or scale.
	 * This code returns true for TAU / 2 rotation as it can be interpreted as scale.
	 *
	 * @param {IMat4} matrix - the matrix
	 * @returns {boolean} true if matrix is for translate and/or scale
	 * @alias module:modeling/maths/mat4.isOnlyTransformScale
	 */
	public static isOnlyTransformScale(matrix: IMat4): boolean {
		// TODO check if it is worth the effort to add recognition of 90 deg rotations

		return (
			Mat4.isZero(matrix[1]) &&
			Mat4.isZero(matrix[2]) &&
			Mat4.isZero(matrix[3]) &&
			Mat4.isZero(matrix[4]) &&
			Mat4.isZero(matrix[6]) &&
			Mat4.isZero(matrix[7]) &&
			Mat4.isZero(matrix[8]) &&
			Mat4.isZero(matrix[9]) &&
			Mat4.isZero(matrix[11]) &&
			matrix[15] === 1
		);
	}
	/**
	 * @param {number} num
	 * @returns {boolean}
	 */
	public static isZero(num: number): boolean {
		return Math.abs(num) < Number.EPSILON;
	}
	/**
	 * Create a matrix that rotates the given source to the given target vector.
	 *
	 * Each vector must be a directional vector with a length greater than zero.
	 * @see https://gist.github.com/kevinmoran/b45980723e53edeb8a5a43c49f134724
	 * @param {IMat4} out - receiving matrix
	 * @param {Vec3} source - source vector
	 * @param {Vec3} target - target vector
	 * @returns {IMat4} a new matrix
	 * @alias module:modeling/maths/mat4.fromVectorRotation
	 * @example
	 * let matrix = fromVectorRotation(create(), [1, 2, 2], [-3, 3, 12])
	 */

	public static fromVectorRotation(out: IMat4, source: IVec3, target: IVec3): IMat4 {
		const sourceNormal = Vec3.normalize(Vec3.create(), source);
		const targetNormal = Vec3.normalize(Vec3.create(), target);

		const axis = Vec3.cross(Vec3.create(), targetNormal, sourceNormal);
		const cosA = Vec3.dot(targetNormal, sourceNormal);
		if (cosA === -1.0) return Mat4.fromRotation(out, Math.PI, Vec3.orthogonal(axis, sourceNormal));

		const k = 1 / (1 + cosA);
		out[0] = axis[0] * axis[0] * k + cosA;
		out[1] = axis[1] * axis[0] * k - axis[2];
		out[2] = axis[2] * axis[0] * k + axis[1];
		out[3] = 0;

		out[4] = axis[0] * axis[1] * k + axis[2];
		out[5] = axis[1] * axis[1] * k + cosA;
		out[6] = axis[2] * axis[1] * k - axis[0];
		out[7] = 0;

		out[8] = axis[0] * axis[2] * k - axis[1];
		out[9] = axis[1] * axis[2] * k + axis[0];
		out[10] = axis[2] * axis[2] * k + cosA;
		out[11] = 0;

		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from the given angle around the X axis.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.rotateX(dest, dest, radians)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromXRotation
	 * @example
	 * let matrix = fromXRotation(create(), TAU / 4)
	 */
	public static fromXRotation(out: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);

		// Perform axis-specific matrix multiplication
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = c;
		out[6] = s;
		out[7] = 0;
		out[8] = 0;
		out[9] = -s;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from the given angle around the Y axis.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.rotateY(dest, dest, radians)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromYRotation
	 * @example
	 * let matrix = fromYRotation(create(), TAU / 4)
	 */
	public static fromYRotation(out: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);

		// Perform axis-specific matrix multiplication
		out[0] = c;
		out[1] = 0;
		out[2] = -s;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = s;
		out[9] = 0;
		out[10] = c;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates a matrix from the given angle around the Z axis.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.identity(dest)
	 *     mat4.rotateZ(dest, dest, radians)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.fromZRotation
	 * @example
	 * let matrix = fromZRotation(create(), TAU / 4)
	 */
	public static fromZRotation(out: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);

		// Perform axis-specific matrix multiplication
		out[0] = c;
		out[1] = s;
		out[2] = 0;
		out[3] = 0;
		out[4] = -s;
		out[5] = c;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Set a matrix to the identity transform.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.identity
	 */
	public static identity(out: IMat4): IMat4 {
		out[0] = 1;
		out[1] = 0;
		out[2] = 0;
		out[3] = 0;
		out[4] = 0;
		out[5] = 1;
		out[6] = 0;
		out[7] = 0;
		out[8] = 0;
		out[9] = 0;
		out[10] = 1;
		out[11] = 0;
		out[12] = 0;
		out[13] = 0;
		out[14] = 0;
		out[15] = 1;
		return out;
	}
	/**
	 * Creates an inverted copy of the given matrix.
	 * Returns null if matrix is determinant is zero
	 *
	 * @author Julian Lloyd
	 * code from https://github.com/jlmakes/rematrix/blob/master/src/index.js
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to invert
	 * @returns {IMat4?} out
	 * @alias module:modeling/maths/mat4.invert
	 */
	public static invert(out: IMat4, matrix: IMat4): IMat4 {
		const a00 = matrix[0];
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a10 = matrix[4];
		const a11 = matrix[5];
		const a12 = matrix[6];
		const a13 = matrix[7];
		const a20 = matrix[8];
		const a21 = matrix[9];
		const a22 = matrix[10];
		const a23 = matrix[11];
		const a30 = matrix[12];
		const a31 = matrix[13];
		const a32 = matrix[14];
		const a33 = matrix[15];

		const b00 = a00 * a11 - a01 * a10;
		const b01 = a00 * a12 - a02 * a10;
		const b02 = a00 * a13 - a03 * a10;
		const b03 = a01 * a12 - a02 * a11;
		const b04 = a01 * a13 - a03 * a11;
		const b05 = a02 * a13 - a03 * a12;
		const b06 = a20 * a31 - a21 * a30;
		const b07 = a20 * a32 - a22 * a30;
		const b08 = a20 * a33 - a23 * a30;
		const b09 = a21 * a32 - a22 * a31;
		const b10 = a21 * a33 - a23 * a31;
		const b11 = a22 * a33 - a23 * a32;

		// Calculate the determinant
		let det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

		if (!det) {
			return null;
		}
		det = 1.0 / det;

		out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
		out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
		out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
		out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
		out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
		out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
		out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
		out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
		out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
		out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
		out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
		out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
		out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
		out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
		out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
		out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

		return out;
	}
	/**
	 * Determine whether the given matrix is the identity transform.
	 * This is equivalent to (but much faster than):
	 *
	 *     mat4.equals(mat4.create(), matrix)
	 *
	 * @param {IMat4} matrix - the matrix
	 * @returns {boolean} true if matrix is the identity transform
	 * @alias module:modeling/maths/mat4.isIdentity
	 * @example
	 * if (mat4.isIdentity(myMatrix)) ...
	 */
	public static isIdentity(matrix: IMat4): boolean {
		return (
			matrix[0] === 1 &&
			matrix[1] === 0 &&
			matrix[2] === 0 &&
			matrix[3] === 0 &&
			matrix[4] === 0 &&
			matrix[5] === 1 &&
			matrix[6] === 0 &&
			matrix[7] === 0 &&
			matrix[8] === 0 &&
			matrix[9] === 0 &&
			matrix[10] === 1 &&
			matrix[11] === 0 &&
			matrix[12] === 0 &&
			matrix[13] === 0 &&
			matrix[14] === 0 &&
			matrix[15] === 1
		);
	}
	/**
	 * Determine whether the given matrix is a mirroring transformation.
	 *
	 * @param {IMat4} matrix - matrix of reference
	 * @returns {Boolean} true if matrix is a mirroring transformation
	 * @alias module:modeling/maths/mat4.isMirroring
	 */
	public static isMirroring(matrix: IMat4): boolean {
		// const xVector = [matrix[0], matrix[4], matrix[8]]
		// const yVector = [matrix[1], matrix[5], matrix[9]]
		// const zVector = [matrix[2], matrix[6], matrix[10]]

		// for a true orthogonal, non-mirrored base, xVector.cross(yVector) == zVector
		// If they have an opposite direction then we are mirroring
		// calculate xVector.cross(yVector)
		const x = matrix[4] * matrix[9] - matrix[8] * matrix[5];
		const y = matrix[8] * matrix[1] - matrix[0] * matrix[9];
		const z = matrix[0] * matrix[5] - matrix[4] * matrix[1];
		// calculate dot(cross, zVector)
		const d = x * matrix[2] + y * matrix[6] + z * matrix[10];
		return d < 0;
	}
	/**
	 * Create a matrix for mirroring about the given plane.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {Vec4} plane - plane of which to mirror the matrix
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.mirrorByPlane
	 */
	public static mirrorByPlane(out: IMat4, plane: Plane): IMat4 {
		const [nx, ny, nz, w] = plane;

		out[0] = 1.0 - 2.0 * nx * nx;
		out[1] = -2.0 * ny * nx;
		out[2] = -2.0 * nz * nx;
		out[3] = 0;
		out[4] = -2.0 * nx * ny;
		out[5] = 1.0 - 2.0 * ny * ny;
		out[6] = -2.0 * nz * ny;
		out[7] = 0;
		out[8] = -2.0 * nx * nz;
		out[9] = -2.0 * ny * nz;
		out[10] = 1.0 - 2.0 * nz * nz;
		out[11] = 0;
		out[12] = 2.0 * nx * w;
		out[13] = 2.0 * ny * w;
		out[14] = 2.0 * nz * w;
		out[15] = 1;

		return out;
	}
	/**
	 * Multiplies the two matrices.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} a - first operand
	 * @param {IMat4} b - second operand
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.multiply
	 */
	public static multiply(out: IMat4, a: IMat4, b: IMat4): IMat4 {
		const a00 = a[0];
		const a01 = a[1];
		const a02 = a[2];
		const a03 = a[3];
		const a10 = a[4];
		const a11 = a[5];
		const a12 = a[6];
		const a13 = a[7];
		const a20 = a[8];
		const a21 = a[9];
		const a22 = a[10];
		const a23 = a[11];
		const a30 = a[12];
		const a31 = a[13];
		const a32 = a[14];
		const a33 = a[15];

		// Cache only the current line of the second matrix
		let b0 = b[0];
		let b1 = b[1];
		let b2 = b[2];
		let b3 = b[3];
		out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[4];
		b1 = b[5];
		b2 = b[6];
		b3 = b[7];
		out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[8];
		b1 = b[9];
		b2 = b[10];
		b3 = b[11];
		out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;

		b0 = b[12];
		b1 = b[13];
		b2 = b[14];
		b3 = b[15];
		out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
		out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
		out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
		out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
		return out;
	}
	/**
	 * Rotates a matrix by the given angle about the given axis.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to rotate
	 * @param {number} radians - angle to rotate the matrix by
	 * @param {Vec3} axis - axis to rotate around
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.rotate
	 */
	public static rotate(out: IMat4, matrix: IMat4, radians: number, axis: IVec3): IMat4 {
		let [x, y, z] = axis;
		const lengthSquared = x * x + y * y + z * z;

		if (Math.abs(lengthSquared) < EPS) {
			// axis is 0,0,0 or almost
			return Mat4.copy(out, matrix);
		}

		const len = 1 / Math.sqrt(lengthSquared);
		x *= len;
		y *= len;
		z *= len;

		const s = sin(radians);
		const c = cos(radians);
		const t = 1 - c;

		const a00 = matrix[0];
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a10 = matrix[4];
		const a11 = matrix[5];
		const a12 = matrix[6];
		const a13 = matrix[7];
		const a20 = matrix[8];
		const a21 = matrix[9];
		const a22 = matrix[10];
		const a23 = matrix[11];

		// Construct the elements of the rotation matrix
		const b00 = x * x * t + c;
		const b01 = y * x * t + z * s;
		const b02 = z * x * t - y * s;
		const b10 = x * y * t - z * s;
		const b11 = y * y * t + c;
		const b12 = z * y * t + x * s;
		const b20 = x * z * t + y * s;
		const b21 = y * z * t - x * s;
		const b22 = z * z * t + c;

		// Perform rotation-specific matrix multiplication
		out[0] = a00 * b00 + a10 * b01 + a20 * b02;
		out[1] = a01 * b00 + a11 * b01 + a21 * b02;
		out[2] = a02 * b00 + a12 * b01 + a22 * b02;
		out[3] = a03 * b00 + a13 * b01 + a23 * b02;
		out[4] = a00 * b10 + a10 * b11 + a20 * b12;
		out[5] = a01 * b10 + a11 * b11 + a21 * b12;
		out[6] = a02 * b10 + a12 * b11 + a22 * b12;
		out[7] = a03 * b10 + a13 * b11 + a23 * b12;
		out[8] = a00 * b20 + a10 * b21 + a20 * b22;
		out[9] = a01 * b20 + a11 * b21 + a21 * b22;
		out[10] = a02 * b20 + a12 * b21 + a22 * b22;
		out[11] = a03 * b20 + a13 * b21 + a23 * b22;

		if (matrix !== out) {
			// If the source and destination differ, copy the unchanged last row
			out[12] = matrix[12];
			out[13] = matrix[13];
			out[14] = matrix[14];
			out[15] = matrix[15];
		}
		return out;
	}
	/**
	 * Rotates a matrix by the given angle around the X axis.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to rotate
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.rotateX
	 */
	public static rotateX(out: IMat4, matrix: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);
		const a10 = matrix[4];
		const a11 = matrix[5];
		const a12 = matrix[6];
		const a13 = matrix[7];
		const a20 = matrix[8];
		const a21 = matrix[9];
		const a22 = matrix[10];
		const a23 = matrix[11];

		if (matrix !== out) {
			// If the source and destination differ, copy the unchanged rows
			out[0] = matrix[0];
			out[1] = matrix[1];
			out[2] = matrix[2];
			out[3] = matrix[3];
			out[12] = matrix[12];
			out[13] = matrix[13];
			out[14] = matrix[14];
			out[15] = matrix[15];
		}

		// Perform axis-specific matrix multiplication
		out[4] = a10 * c + a20 * s;
		out[5] = a11 * c + a21 * s;
		out[6] = a12 * c + a22 * s;
		out[7] = a13 * c + a23 * s;
		out[8] = a20 * c - a10 * s;
		out[9] = a21 * c - a11 * s;
		out[10] = a22 * c - a12 * s;
		out[11] = a23 * c - a13 * s;
		return out;
	}
	/**
	 * Rotates a matrix by the given angle around the Y axis.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to rotate
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.rotateY
	 */
	public static rotateY(out: IMat4, matrix: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);
		const a00 = matrix[0];
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a20 = matrix[8];
		const a21 = matrix[9];
		const a22 = matrix[10];
		const a23 = matrix[11];

		if (matrix !== out) {
			// If the source and destination differ, copy the unchanged rows
			out[4] = matrix[4];
			out[5] = matrix[5];
			out[6] = matrix[6];
			out[7] = matrix[7];
			out[12] = matrix[12];
			out[13] = matrix[13];
			out[14] = matrix[14];
			out[15] = matrix[15];
		}

		// Perform axis-specific matrix multiplication
		out[0] = a00 * c - a20 * s;
		out[1] = a01 * c - a21 * s;
		out[2] = a02 * c - a22 * s;
		out[3] = a03 * c - a23 * s;
		out[8] = a00 * s + a20 * c;
		out[9] = a01 * s + a21 * c;
		out[10] = a02 * s + a22 * c;
		out[11] = a03 * s + a23 * c;
		return out;
	}
	/**
	 * Rotates a matrix by the given angle around the Z axis.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to rotate
	 * @param {number} radians - angle to rotate the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.rotateZ
	 */
	public static rotateZ(out: IMat4, matrix: IMat4, radians: number): IMat4 {
		const s = sin(radians);
		const c = cos(radians);
		const a00 = matrix[0];
		const a01 = matrix[1];
		const a02 = matrix[2];
		const a03 = matrix[3];
		const a10 = matrix[4];
		const a11 = matrix[5];
		const a12 = matrix[6];
		const a13 = matrix[7];

		if (matrix !== out) {
			// If the source and destination differ, copy the unchanged last row
			out[8] = matrix[8];
			out[9] = matrix[9];
			out[10] = matrix[10];
			out[11] = matrix[11];
			out[12] = matrix[12];
			out[13] = matrix[13];
			out[14] = matrix[14];
			out[15] = matrix[15];
		}

		// Perform axis-specific matrix multiplication
		out[0] = a00 * c + a10 * s;
		out[1] = a01 * c + a11 * s;
		out[2] = a02 * c + a12 * s;
		out[3] = a03 * c + a13 * s;
		out[4] = a10 * c - a00 * s;
		out[5] = a11 * c - a01 * s;
		out[6] = a12 * c - a02 * s;
		out[7] = a13 * c - a03 * s;
		return out;
	}
	/**
	 * Scales the matrix by the given dimensions.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to scale
	 * @param {Vec3} dimensions - dimensions to scale the matrix by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.scale
	 */
	public static scale(out: IMat4, matrix: IMat4, dimensions: IVec3): IMat4 {
		const x = dimensions[0];
		const y = dimensions[1];
		const z = dimensions[2];

		out[0] = matrix[0] * x;
		out[1] = matrix[1] * x;
		out[2] = matrix[2] * x;
		out[3] = matrix[3] * x;
		out[4] = matrix[4] * y;
		out[5] = matrix[5] * y;
		out[6] = matrix[6] * y;
		out[7] = matrix[7] * y;
		out[8] = matrix[8] * z;
		out[9] = matrix[9] * z;
		out[10] = matrix[10] * z;
		out[11] = matrix[11] * z;
		out[12] = matrix[12];
		out[13] = matrix[13];
		out[14] = matrix[14];
		out[15] = matrix[15];
		return out;
	}
	/**
	 * Subtracts matrix b from matrix a. (A-B)
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} a - first operand
	 * @param {IMat4} b - second operand
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.subtract
	 */
	public static subtract(out: IMat4, a: IMat4, b: IMat4): IMat4 {
		out[0] = a[0] - b[0];
		out[1] = a[1] - b[1];
		out[2] = a[2] - b[2];
		out[3] = a[3] - b[3];
		out[4] = a[4] - b[4];
		out[5] = a[5] - b[5];
		out[6] = a[6] - b[6];
		out[7] = a[7] - b[7];
		out[8] = a[8] - b[8];
		out[9] = a[9] - b[9];
		out[10] = a[10] - b[10];
		out[11] = a[11] - b[11];
		out[12] = a[12] - b[12];
		out[13] = a[13] - b[13];
		out[14] = a[14] - b[14];
		out[15] = a[15] - b[15];
		return out;
	}
	/**
	 * Return a string representing the given matrix.
	 *
	 * @param {IMat4} mat - matrix of reference
	 * @returns {string} string representation
	 * @alias module:modeling/maths/mat4.toString
	 */
	public static toString(matrix: IMat4): string {
		return matrix.map((n) => n.toFixed(7)).toString();
	}
	/**
	 * Translate the matrix by the given offset vector.
	 *
	 * @param {IMat4} out - receiving matrix
	 * @param {IMat4} matrix - matrix to translate
	 * @param {Vec3} offsets - offset vector to translate by
	 * @returns {IMat4} out
	 * @alias module:modeling/maths/mat4.translate
	 */
	public static translate(out: IMat4, matrix: IMat4, offsets: IVec3): IMat4 {
		const x = offsets[0];
		const y = offsets[1];
		const z = offsets[2];
		let a00;
		let a01;
		let a02;
		let a03;
		let a10;
		let a11;
		let a12;
		let a13;
		let a20;
		let a21;
		let a22;
		let a23;

		if (matrix === out) {
			// 0-11 assignments are unnecessary
			out[12] = matrix[0] * x + matrix[4] * y + matrix[8] * z + matrix[12];
			out[13] = matrix[1] * x + matrix[5] * y + matrix[9] * z + matrix[13];
			out[14] = matrix[2] * x + matrix[6] * y + matrix[10] * z + matrix[14];
			out[15] = matrix[3] * x + matrix[7] * y + matrix[11] * z + matrix[15];
		} else {
			a00 = matrix[0];
			a01 = matrix[1];
			a02 = matrix[2];
			a03 = matrix[3];
			a10 = matrix[4];
			a11 = matrix[5];
			a12 = matrix[6];
			a13 = matrix[7];
			a20 = matrix[8];
			a21 = matrix[9];
			a22 = matrix[10];
			a23 = matrix[11];

			out[0] = a00;
			out[1] = a01;
			out[2] = a02;
			out[3] = a03;
			out[4] = a10;
			out[5] = a11;
			out[6] = a12;
			out[7] = a13;
			out[8] = a20;
			out[9] = a21;
			out[10] = a22;
			out[11] = a23;

			out[12] = a00 * x + a10 * y + a20 * z + matrix[12];
			out[13] = a01 * x + a11 * y + a21 * z + matrix[13];
			out[14] = a02 * x + a12 * y + a22 * z + matrix[14];
			out[15] = a03 * x + a13 * y + a23 * z + matrix[15];
		}

		return out;
	}
}
