import test from "ava";

import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: origin() should return proper origins", (t) => {
	const line1 = Line3.create();
	const org1 = Line3.origin(line1);
	t.true(compareVectors(org1, [0, 0, 0]));

	const line2 = Line3.fromPoints(Line3.create(), [1, 0, 0], [0, 1, 0]);
	const org2 = Line3.origin(line2);
	t.true(compareVectors(org2, [1, 0, 0]));

	const line3 = Line3.fromPoints(Line3.create(), [0, 1, 0], [1, 0, 0]);
	const org3 = Line3.origin(line3);
	t.true(compareVectors(org3, [0, 1, 0]));

	const line4 = Line3.fromPoints(Line3.create(), [0, 0, 6], [0, 6, 0]);
	const org4 = Line3.origin(line4);
	t.true(compareVectors(org4, [0, 0, 6]));

	const line5 = Line3.fromPoints(Line3.create(), [-5, -5, -5], [5, 5, 5]);
	const org5 = Line3.origin(line5);
	t.true(compareVectors(org5, [-5, -5, -5]));
});
