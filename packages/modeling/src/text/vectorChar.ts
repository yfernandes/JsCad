import {fromPoints} from "../geometries/path2/index.js";
import * as vec2 from "../maths/vec2/index.js";
import type {Vec2} from "../maths/vec2/type.d.ts";

import {simplex} from "./fonts/single-line/hershey/simplex.js";

export interface VectorChar {
	width: number;
	height: number;
	paths: Array<Array<Vec2>>;
}

export interface VectorCharOptions {
	xOffset?: number;
	yOffset?: number;
	height?: number;
	extrudeOffset?: number;
	font?: typeof simplex;
}

const defaultsVectorParams = {
	xOffset: 0,
	yOffset: 0,
	font: simplex,
	height: 14, // old vector_xxx simplex font height
	extrudeOffset: 0,
};

/**
 * Generates a vector character based on the given options and text.
 * Construct a {@link VectorChar} from an ASCII character whose code is between 31 and 127.
 * If the character is not supported it is replaced by a question mark.
 *
 * @param {VectorCharOptions} options - The options for generating the vector character.
 * @param {string} text - The text for the vector character. Must be a single ascii character.
 * @return {VectorChar} The generated vector character.
 * @alias module:modeling/text.vectorChar
 *
 * @example
 * let myCharacter = vectorChar({ xOffset: 57 }, 'C')
 */
export const vectorChar = (options: VectorCharOptions, text: string): VectorChar => {
	const {xOffset, yOffset, font, height, extrudeOffset} = Object.assign(
		{},
		defaultsVectorParams,
		options
	);

	if (typeof text !== "string" || text.length !== 1) {
		throw new Error("text must be a single character");
	}

	let code = text.charCodeAt(0);
	if (!code || !font[code]) {
		code = 63; // invalid character so use ?
	}

	const glyph = [].concat(font[code]);
	const ratio = (height - extrudeOffset) / font.height;
	const extrudeYOffset = extrudeOffset / 2;
	const width = glyph.shift() * ratio;

	const paths = [];
	let polyline = [];
	for (let i = 0, il = glyph.length; i < il; i += 2) {
		const gx = ratio * glyph[i] + xOffset;
		const gy = ratio * glyph[i + 1] + yOffset + extrudeYOffset;
		if (glyph[i] !== undefined) {
			polyline.push(vec2.fromValues(gx, gy));
			continue;
		}
		paths.push(fromPoints({}, polyline));
		polyline = [];
		i--;
	}
	if (polyline.length) {
		paths.push(fromPoints({}, polyline));
	}

	return {width, height, paths};
};
