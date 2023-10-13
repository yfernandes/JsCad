import test from "ava";

import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: clone() should return a new line3 with same values", (t) => {
	const org1 = Line3.fromPointAndDirection(Line3.create(), [0, 0, 0], [1, 0, 0]);
	const obs1 = Line3.clone(org1);
	t.true(compareVectors(obs1[0], [0, 0, 0]));
	t.true(compareVectors(obs1[1], [1, 0, 0]));
	t.not(obs1, org1);

	const org2 = Line3.fromPointAndDirection(Line3.create(), [1, 2, 3], [1, 0, 1]);
	const obs2 = Line3.clone(org2);
	t.true(compareVectors(obs2[0], [1, 2, 3]));
	t.true(compareVectors(obs2[1], [0.7071067811865475, 0, 0.7071067811865475]));
	t.not(obs2, org2);

	const org3 = Line3.fromPointAndDirection(Line3.create(), [-1, -2, -3], [0, -1, -1]);
	const obs3 = Line3.clone(org3);
	t.true(compareVectors(obs3[0], [-1, -2, -3]));
	t.true(compareVectors(obs3[1], [0, -0.7071067811865475, -0.7071067811865475]));
	t.not(obs3, org3);
});
