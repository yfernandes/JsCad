import test from "ava";

import {plane} from "../../index.js";
import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: fromPlanes() should return a new line3 with correct values", (t) => {
	const planeXY = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [1, 1, 0]); // flat on XY
	const planeXZ = plane.fromPoints(plane.create(), [0, 0, 0], [1, 0, 0], [0, 0, 1]); // flat on XZ
	const planeYZ = plane.fromPoints(plane.create(), [0, 0, 0], [0, 1, 0], [0, 0, 1]); // flat on YZ
	const plane2 = plane.fromPoints(plane.create(), [0, -3, 0], [1, -3, 0], [0, -3, 1]);

	let obs = Line3.fromPlanes(Line3.create(), planeXY, planeXZ);
	let pnt = obs[0];
	let dir = obs[1];
	t.true(compareVectors(pnt, [0, 0, 0]));
	t.true(compareVectors(dir, [1, 0, 0]));

	obs = Line3.fromPlanes(Line3.create(), planeYZ, planeXZ);
	pnt = obs[0];
	dir = obs[1];
	t.true(compareVectors(pnt, [0, 0, 0]));
	t.true(compareVectors(dir, [0, 0, -1]));

	obs = Line3.fromPlanes(Line3.create(), planeXY, planeYZ);
	pnt = obs[0];
	dir = obs[1];
	t.true(compareVectors(pnt, [0, 0, 0]));
	t.true(compareVectors(dir, [0, 1, 0]));

	obs = Line3.fromPlanes(obs, planeXY, plane2);
	pnt = obs[0];
	dir = obs[1];
	t.true(compareVectors(pnt, [0, -3, 0]));
	t.true(compareVectors(dir, [1, 0, 0]));
});
