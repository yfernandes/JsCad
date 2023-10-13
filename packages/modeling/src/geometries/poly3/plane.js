import * as mplane from "../../maths/plane/index.js";

export function plane(polygon) {
	if (!polygon.plane) {
		polygon.plane = mplane.fromPoints(mplane.create(), ...polygon.vertices);
	}
	return polygon.plane;
}
