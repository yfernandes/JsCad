import test from "ava";

import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: copy() with two params should update a line3 with same values", (t) => {
	const line1 = Line3.create();
	const org1 = Line3.fromPointAndDirection(Line3.create(), [0, 0, 0], [1, 0, 0]);
	const ret1 = Line3.copy(line1, org1);
	t.true(compareVectors(line1[0], [0, 0, 0]));
	t.true(compareVectors(line1[1], [1, 0, 0]));
	t.true(compareVectors(ret1[0], [0, 0, 0]));
	t.true(compareVectors(ret1[1], [1, 0, 0]));
	t.not(ret1, org1);

	const line2 = Line3.create();
	const org2 = Line3.fromPointAndDirection(Line3.create(), [1, 2, 3], [1, 0, 1]);
	const ret2 = Line3.copy(line2, org2);
	t.true(compareVectors(line2[0], [1, 2, 3]));
	t.true(compareVectors(line2[1], [0.7071067811865475, 0, 0.7071067811865475]));
	t.true(compareVectors(ret2[0], [1, 2, 3]));
	t.true(compareVectors(ret2[1], [0.7071067811865475, 0, 0.7071067811865475]));
	t.not(ret2, org2);

	const line3 = Line3.create();
	const org3 = Line3.fromPointAndDirection(Line3.create(), [-1, -2, -3], [0, -1, -1]);
	const ret3 = Line3.copy(line3, org3);
	t.true(compareVectors(line3[0], [-1, -2, -3]));
	t.true(compareVectors(line3[1], [0, -0.7071067811865475, -0.7071067811865475]));
	t.true(compareVectors(ret3[0], [-1, -2, -3]));
	t.true(compareVectors(ret3[1], [0, -0.7071067811865475, -0.7071067811865475]));
	t.not(ret3, org3);
});
