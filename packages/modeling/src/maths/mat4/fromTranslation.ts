/**
 * Creates a matrix from a vector translation.
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest)
 *     mat4.translate(dest, dest, vec)
 *
 * @param {Mat4} out - receiving matrix
 * @param {Vec3} vector - offset (vector) of translation
 * @returns {Mat4} out
 * @alias module:modeling/maths/mat4.fromTranslation
 * @example
 * let matrix = fromTranslation(create(), [1, 2, 3])
 */
export function fromTranslation(out, vector) {
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
import type {Mat4} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function fromTranslation(out: Mat4, vector: IVec3): Mat4;
