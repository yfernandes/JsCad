import {NEPS} from "../constants.js";
import {Vec3} from "../types.js";

/**
 * Compare two normals (unit vectors) for near equality.
 * @param {Vec3} a - normal a
 * @param {Vec3} b - normal b
 * @returns {Boolean} true if a and b are nearly equal
 * @alias module:modeling/maths/utils.aboutEqualNormals
 */
export const aboutEqualNormals = (a: Vec3, b: Vec3): boolean =>
	Math.abs(a[0] - b[0]) <= NEPS && Math.abs(a[1] - b[1]) <= NEPS && Math.abs(a[2] - b[2]) <= NEPS;
