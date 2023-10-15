import test from "ava";

import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: Line3.closestPoint() should return proper values", (t) => {
	const line1 = Line3.create(); // line follows X axis
	const x1 = Line3.closestPoint(line1, [0, 0, 0]);
	t.true(compareVectors(x1, [0, 0, 0]));
	const x2 = Line3.closestPoint(line1, [0, 1, 0]);
	t.true(compareVectors(x2, [0, 0, 0]));
	const x3 = Line3.closestPoint(line1, [6, 0, 0]);
	t.true(compareVectors(x3, [0, 0, 0])); // rounding errors

	const line2 = Line3.fromPoints(Line3.create(), [-5, -5, -5], [5, 5, 5]);
	const x4 = Line3.closestPoint(line2, [0, 0, 0]);
	t.true(compareVectors(x4, [0.0, 0.0, 0.0]));
	const x5 = Line3.closestPoint(line2, [1, 0, 0]);
	t.true(compareVectors(x5, [0.3333333333333339, 0.3333333333333339, 0.3333333333333339]));
	const x6 = Line3.closestPoint(line2, [2, 0, 0]);
	t.true(compareVectors(x6, [0.6666666666666661, 0.6666666666666661, 0.6666666666666661]));
	const x7 = Line3.closestPoint(line2, [3, 0, 0]);
	t.true(compareVectors(x7, [1, 1, 1]));
	const x8 = Line3.closestPoint(line2, [4, 0, 0]);
	t.true(compareVectors(x8, [1.3333333333333348, 1.3333333333333348, 1.3333333333333348]));
	const x9 = Line3.closestPoint(line2, [5, 0, 0]);
	t.true(compareVectors(x9, [1.666666666666667, 1.666666666666667, 1.666666666666667]));
	const x10 = Line3.closestPoint(line2, [50, 0, 0]);
	t.true(compareVectors(x10, [16.666666666666668, 16.666666666666668, 16.666666666666668]));

	const ya = Line3.closestPoint(line2, [-5, -5, -5]);
	t.true(compareVectors(ya, [-5, -5, -5]));
	const yb = Line3.closestPoint(line2, [5, 5, 5]);
	t.true(compareVectors(yb, [5, 5, 5]));

	t.true(true);
});
