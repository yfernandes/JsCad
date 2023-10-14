import {cssColors} from "./cssColors.js";
import {RGB} from "./types.js";

/**
 * Converts a CSS color name to RGB color.
 *
 * @param {string} s - the CSS color name
 * @return {Array} the RGB color, or undefined if not found
 * @alias module:modeling/colors.colorNameToRgb
 * @example
 * let mySphere = colorize(colorNameToRgb('lightblue'), sphere())
 */
export function colorNameToRgb(s: string): RGB {
	return cssColors[s.toLowerCase()];
}
