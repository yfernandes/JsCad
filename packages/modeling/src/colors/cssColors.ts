import type {RGB} from "./types.d.ts";
type CSSColors = {
	[color: string]: RGB;
};

/**
 * @alias module:modeling/colors.cssColors
 * @see CSS color table from http://www.w3.org/TR/css3-color/
 * @enum {Array}
 * @example
 * let newShape = colorize(cssColors.red, oldShape)
 */
export const cssColors: CSSColors = {
	// basic color keywords
	black: [0 / 255, 0 / 255, 0 / 255],
	silver: [192 / 255, 192 / 255, 192 / 255],
	gray: [128 / 255, 128 / 255, 128 / 255],
	white: [255 / 255, 255 / 255, 255 / 255],
	maroon: [128 / 255, 0 / 255, 0 / 255],
	red: [255 / 255, 0 / 255, 0 / 255],
	purple: [128 / 255, 0 / 255, 128 / 255],
	fuchsia: [255 / 255, 0 / 255, 255 / 255],
	green: [0 / 255, 128 / 255, 0 / 255],
	lime: [0 / 255, 255 / 255, 0 / 255],
	olive: [128 / 255, 128 / 255, 0 / 255],
	yellow: [255 / 255, 255 / 255, 0 / 255],
	navy: [0 / 255, 0 / 255, 128 / 255],
	blue: [0 / 255, 0 / 255, 255 / 255],
	teal: [0 / 255, 128 / 255, 128 / 255],
	aqua: [0 / 255, 255 / 255, 255 / 255],
	// extended color keywords
	aliceblue: [240 / 255, 248 / 255, 255 / 255],
	antiquewhite: [250 / 255, 235 / 255, 215 / 255],
	// 'aqua': [ 0 / 255, 255 / 255, 255 / 255 ],
	aquamarine: [127 / 255, 255 / 255, 212 / 255],
	azure: [240 / 255, 255 / 255, 255 / 255],
	beige: [245 / 255, 245 / 255, 220 / 255],
	bisque: [255 / 255, 228 / 255, 196 / 255],
	// 'black': [ 0 / 255, 0 / 255, 0 / 255 ],
	blanchedalmond: [255 / 255, 235 / 255, 205 / 255],
	// 'blue': [ 0 / 255, 0 / 255, 255 / 255 ],
	blueviolet: [138 / 255, 43 / 255, 226 / 255],
	brown: [165 / 255, 42 / 255, 42 / 255],
	burlywood: [222 / 255, 184 / 255, 135 / 255],
	cadetblue: [95 / 255, 158 / 255, 160 / 255],
	chartreuse: [127 / 255, 255 / 255, 0 / 255],
	chocolate: [210 / 255, 105 / 255, 30 / 255],
	coral: [255 / 255, 127 / 255, 80 / 255],
	cornflowerblue: [100 / 255, 149 / 255, 237 / 255],
	cornsilk: [255 / 255, 248 / 255, 220 / 255],
	crimson: [220 / 255, 20 / 255, 60 / 255],
	cyan: [0 / 255, 255 / 255, 255 / 255],
	darkblue: [0 / 255, 0 / 255, 139 / 255],
	darkcyan: [0 / 255, 139 / 255, 139 / 255],
	darkgoldenrod: [184 / 255, 134 / 255, 11 / 255],
	darkgray: [169 / 255, 169 / 255, 169 / 255],
	darkgreen: [0 / 255, 100 / 255, 0 / 255],
	darkgrey: [169 / 255, 169 / 255, 169 / 255],
	darkkhaki: [189 / 255, 183 / 255, 107 / 255],
	darkmagenta: [139 / 255, 0 / 255, 139 / 255],
	darkolivegreen: [85 / 255, 107 / 255, 47 / 255],
	darkorange: [255 / 255, 140 / 255, 0 / 255],
	darkorchid: [153 / 255, 50 / 255, 204 / 255],
	darkred: [139 / 255, 0 / 255, 0 / 255],
	darksalmon: [233 / 255, 150 / 255, 122 / 255],
	darkseagreen: [143 / 255, 188 / 255, 143 / 255],
	darkslateblue: [72 / 255, 61 / 255, 139 / 255],
	darkslategray: [47 / 255, 79 / 255, 79 / 255],
	darkslategrey: [47 / 255, 79 / 255, 79 / 255],
	darkturquoise: [0 / 255, 206 / 255, 209 / 255],
	darkviolet: [148 / 255, 0 / 255, 211 / 255],
	deeppink: [255 / 255, 20 / 255, 147 / 255],
	deepskyblue: [0 / 255, 191 / 255, 255 / 255],
	dimgray: [105 / 255, 105 / 255, 105 / 255],
	dimgrey: [105 / 255, 105 / 255, 105 / 255],
	dodgerblue: [30 / 255, 144 / 255, 255 / 255],
	firebrick: [178 / 255, 34 / 255, 34 / 255],
	floralwhite: [255 / 255, 250 / 255, 240 / 255],
	forestgreen: [34 / 255, 139 / 255, 34 / 255],
	// 'fuchsia': [ 255 / 255, 0 / 255, 255 / 255 ],
	gainsboro: [220 / 255, 220 / 255, 220 / 255],
	ghostwhite: [248 / 255, 248 / 255, 255 / 255],
	gold: [255 / 255, 215 / 255, 0 / 255],
	goldenrod: [218 / 255, 165 / 255, 32 / 255],
	// 'gray': [ 128 / 255, 128 / 255, 128 / 255 ],
	// 'green': [ 0 / 255, 128 / 255, 0 / 255 ],
	greenyellow: [173 / 255, 255 / 255, 47 / 255],
	grey: [128 / 255, 128 / 255, 128 / 255],
	honeydew: [240 / 255, 255 / 255, 240 / 255],
	hotpink: [255 / 255, 105 / 255, 180 / 255],
	indianred: [205 / 255, 92 / 255, 92 / 255],
	indigo: [75 / 255, 0 / 255, 130 / 255],
	ivory: [255 / 255, 255 / 255, 240 / 255],
	khaki: [240 / 255, 230 / 255, 140 / 255],
	lavender: [230 / 255, 230 / 255, 250 / 255],
	lavenderblush: [255 / 255, 240 / 255, 245 / 255],
	lawngreen: [124 / 255, 252 / 255, 0 / 255],
	lemonchiffon: [255 / 255, 250 / 255, 205 / 255],
	lightblue: [173 / 255, 216 / 255, 230 / 255],
	lightcoral: [240 / 255, 128 / 255, 128 / 255],
	lightcyan: [224 / 255, 255 / 255, 255 / 255],
	lightgoldenrodyellow: [250 / 255, 250 / 255, 210 / 255],
	lightgray: [211 / 255, 211 / 255, 211 / 255],
	lightgreen: [144 / 255, 238 / 255, 144 / 255],
	lightgrey: [211 / 255, 211 / 255, 211 / 255],
	lightpink: [255 / 255, 182 / 255, 193 / 255],
	lightsalmon: [255 / 255, 160 / 255, 122 / 255],
	lightseagreen: [32 / 255, 178 / 255, 170 / 255],
	lightskyblue: [135 / 255, 206 / 255, 250 / 255],
	lightslategray: [119 / 255, 136 / 255, 153 / 255],
	lightslategrey: [119 / 255, 136 / 255, 153 / 255],
	lightsteelblue: [176 / 255, 196 / 255, 222 / 255],
	lightyellow: [255 / 255, 255 / 255, 224 / 255],
	// 'lime': [ 0 / 255, 255 / 255, 0 / 255 ],
	limegreen: [50 / 255, 205 / 255, 50 / 255],
	linen: [250 / 255, 240 / 255, 230 / 255],
	magenta: [255 / 255, 0 / 255, 255 / 255],
	// 'maroon': [ 128 / 255, 0 / 255, 0 / 255 ],
	mediumaquamarine: [102 / 255, 205 / 255, 170 / 255],
	mediumblue: [0 / 255, 0 / 255, 205 / 255],
	mediumorchid: [186 / 255, 85 / 255, 211 / 255],
	mediumpurple: [147 / 255, 112 / 255, 219 / 255],
	mediumseagreen: [60 / 255, 179 / 255, 113 / 255],
	mediumslateblue: [123 / 255, 104 / 255, 238 / 255],
	mediumspringgreen: [0 / 255, 250 / 255, 154 / 255],
	mediumturquoise: [72 / 255, 209 / 255, 204 / 255],
	mediumvioletred: [199 / 255, 21 / 255, 133 / 255],
	midnightblue: [25 / 255, 25 / 255, 112 / 255],
	mintcream: [245 / 255, 255 / 255, 250 / 255],
	mistyrose: [255 / 255, 228 / 255, 225 / 255],
	moccasin: [255 / 255, 228 / 255, 181 / 255],
	navajowhite: [255 / 255, 222 / 255, 173 / 255],
	// 'navy': [ 0 / 255, 0 / 255, 128 / 255 ],
	oldlace: [253 / 255, 245 / 255, 230 / 255],
	// 'olive': [ 128 / 255, 128 / 255, 0 / 255 ],
	olivedrab: [107 / 255, 142 / 255, 35 / 255],
	orange: [255 / 255, 165 / 255, 0 / 255],
	orangered: [255 / 255, 69 / 255, 0 / 255],
	orchid: [218 / 255, 112 / 255, 214 / 255],
	palegoldenrod: [238 / 255, 232 / 255, 170 / 255],
	palegreen: [152 / 255, 251 / 255, 152 / 255],
	paleturquoise: [175 / 255, 238 / 255, 238 / 255],
	palevioletred: [219 / 255, 112 / 255, 147 / 255],
	papayawhip: [255 / 255, 239 / 255, 213 / 255],
	peachpuff: [255 / 255, 218 / 255, 185 / 255],
	peru: [205 / 255, 133 / 255, 63 / 255],
	pink: [255 / 255, 192 / 255, 203 / 255],
	plum: [221 / 255, 160 / 255, 221 / 255],
	powderblue: [176 / 255, 224 / 255, 230 / 255],
	// 'purple': [ 128 / 255, 0 / 255, 128 / 255 ],
	// 'red': [ 255 / 255, 0 / 255, 0 / 255 ],
	rosybrown: [188 / 255, 143 / 255, 143 / 255],
	royalblue: [65 / 255, 105 / 255, 225 / 255],
	saddlebrown: [139 / 255, 69 / 255, 19 / 255],
	salmon: [250 / 255, 128 / 255, 114 / 255],
	sandybrown: [244 / 255, 164 / 255, 96 / 255],
	seagreen: [46 / 255, 139 / 255, 87 / 255],
	seashell: [255 / 255, 245 / 255, 238 / 255],
	sienna: [160 / 255, 82 / 255, 45 / 255],
	// 'silver': [ 192 / 255, 192 / 255, 192 / 255 ],
	skyblue: [135 / 255, 206 / 255, 235 / 255],
	slateblue: [106 / 255, 90 / 255, 205 / 255],
	slategray: [112 / 255, 128 / 255, 144 / 255],
	slategrey: [112 / 255, 128 / 255, 144 / 255],
	snow: [255 / 255, 250 / 255, 250 / 255],
	springgreen: [0 / 255, 255 / 255, 127 / 255],
	steelblue: [70 / 255, 130 / 255, 180 / 255],
	tan: [210 / 255, 180 / 255, 140 / 255],
	// 'teal': [ 0 / 255, 128 / 255, 128 / 255 ],
	thistle: [216 / 255, 191 / 255, 216 / 255],
	tomato: [255 / 255, 99 / 255, 71 / 255],
	turquoise: [64 / 255, 224 / 255, 208 / 255],
	violet: [238 / 255, 130 / 255, 238 / 255],
	wheat: [245 / 255, 222 / 255, 179 / 255],
	// 'white': [ 255 / 255, 255 / 255, 255 / 255 ],
	whitesmoke: [245 / 255, 245 / 255, 245 / 255],
	// 'yellow': [ 255 / 255, 255 / 255, 0 / 255 ],
	yellowgreen: [154 / 255, 205 / 255, 50 / 255],
};

// export const black: RGB;
// export const silver: RGB;
// export const gray: RGB;
// export const white: RGB;
// export const maroon: RGB;
// export const red: RGB;
// export const purple: RGB;
// export const fuchsia: RGB;
// export const green: RGB;
// export const lime: RGB;
// export const olive: RGB;
// export const yellow: RGB;
// export const navy: RGB;
// export const blue: RGB;
// export const teal: RGB;
// export const aqua: RGB;
// export const aliceblue: RGB;
// export const antiquewhite: RGB;
// export const aquamarine: RGB;
// export const azure: RGB;
// export const beige: RGB;
// export const bisque: RGB;
// export const blanchedalmond: RGB;
// export const blueviolet: RGB;
// export const brown: RGB;
// export const burlywood: RGB;
// export const cadetblue: RGB;
// export const chartreuse: RGB;
// export const chocolate: RGB;
// export const coral: RGB;
// export const cornflowerblue: RGB;
// export const cornsilk: RGB;
// export const crimson: RGB;
// export const cyan: RGB;
// export const darkblue: RGB;
// export const darkcyan: RGB;
// export const darkgoldenrod: RGB;
// export const darkgray: RGB;
// export const darkgreen: RGB;
// export const darkgrey: RGB;
// export const darkkhaki: RGB;
// export const darkmagenta: RGB;
// export const darkolivegreen: RGB;
// export const darkorange: RGB;
// export const darkorchid: RGB;
// export const darkred: RGB;
// export const darksalmon: RGB;
// export const darkseagreen: RGB;
// export const darkslateblue: RGB;
// export const darkslategray: RGB;
// export const darkslategrey: RGB;
// export const darkturquoise: RGB;
// export const darkviolet: RGB;
// export const deeppink: RGB;
// export const deepskyblue: RGB;
// export const dimgray: RGB;
// export const dimgrey: RGB;
// export const dodgerblue: RGB;
// export const firebrick: RGB;
// export const floralwhite: RGB;
// export const forestgreen: RGB;
// export const gainsboro: RGB;
// export const ghostwhite: RGB;
// export const gold: RGB;
// export const goldenrod: RGB;
// export const greenyellow: RGB;
// export const grey: RGB;
// export const honeydew: RGB;
// export const hotpink: RGB;
// export const indianred: RGB;
// export const indigo: RGB;
// export const ivory: RGB;
// export const khaki: RGB;
// export const lavender: RGB;
// export const lavenderblush: RGB;
// export const lawngreen: RGB;
// export const lemonchiffon: RGB;
// export const lightblue: RGB;
// export const lightcoral: RGB;
// export const lightcyan: RGB;
// export const lightgoldenrodyellow: RGB;
// export const lightgray: RGB;
// export const lightgreen: RGB;
// export const lightgrey: RGB;
// export const lightpink: RGB;
// export const lightsalmon: RGB;
// export const lightseagreen: RGB;
// export const lightskyblue: RGB;
// export const lightslategray: RGB;
// export const lightslategrey: RGB;
// export const lightsteelblue: RGB;
// export const lightyellow: RGB;
// export const limegreen: RGB;
// export const linen: RGB;
// export const magenta: RGB;
// export const mediumaquamarine: RGB;
// export const mediumblue: RGB;
// export const mediumorchid: RGB;
// export const mediumpurple: RGB;
// export const mediumseagreen: RGB;
// export const mediumslateblue: RGB;
// export const mediumspringgreen: RGB;
// export const mediumturquoise: RGB;
// export const mediumvioletred: RGB;
// export const midnightblue: RGB;
// export const mintcream: RGB;
// export const mistyrose: RGB;
// export const moccasin: RGB;
// export const navajowhite: RGB;
// export const oldlace: RGB;
// export const olivedrab: RGB;
// export const orange: RGB;
// export const orangered: RGB;
// export const orchid: RGB;
// export const palegoldenrod: RGB;
// export const palegreen: RGB;
// export const paleturquoise: RGB;
// export const palevioletred: RGB;
// export const papayawhip: RGB;
// export const peachpuff: RGB;
// export const peru: RGB;
// export const pink: RGB;
// export const plum: RGB;
// export const powderblue: RGB;
// export const rosybrown: RGB;
// export const royalblue: RGB;
// export const saddlebrown: RGB;
// export const salmon: RGB;
// export const sandybrown: RGB;
// export const seagreen: RGB;
// export const seashell: RGB;
// export const sienna: RGB;
// export const skyblue: RGB;
// export const slateblue: RGB;
// export const slategray: RGB;
// export const slategrey: RGB;
// export const snow: RGB;
// export const springgreen: RGB;
// export const steelblue: RGB;
// export const tan: RGB;
// export const thistle: RGB;
// export const tomato: RGB;
// export const turquoise: RGB;
// export const violet: RGB;
// export const wheat: RGB;
// export const whitesmoke: RGB;
// export const yellowgreen: RGB;
