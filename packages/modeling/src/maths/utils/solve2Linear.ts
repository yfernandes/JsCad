import {Vec2} from "../Vector/index.js";

/**
 * Solves a system of two linear equations in the form of:
 * ax + by = u
 * cx + dy = v
 * and returns the solution as a 2D vector.
 *
 * @param {number} a - The coefficient of x in the first equation.
 * @param {number} b - The coefficient of y in the first equation.
 * @param {number} c - The coefficient of x in the second equation.
 * @param {number} d - The coefficient of y in the second equation.
 * @param {number} u - The constant term in the first equation.
 * @param {number} v - The constant term in the second equation.
 * @return {Vec2} The solution to the system of linear equations as a 2D vector.
 */
export const solve2Linear = (
	a: number,
	b: number,
	c: number,
	d: number,
	u: number,
	v: number
): Vec2 => {
	const det = a * d - b * c;
	const invdet = 1.0 / det;
	let x = u * d - b * v;
	let y = -u * c + a * v;
	x *= invdet;
	y *= invdet;
	return [x, y];
};
