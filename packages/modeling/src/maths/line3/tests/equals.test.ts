import test from "ava";
import {Line3} from "../index.js";

test("line3: equals() should return correct booleans", (t) => {
	const line0 = Line3.fromPointAndDirection(Line3.create(), [0, 0, 0], [1, 1, 1]);
	const line1 = Line3.fromPointAndDirection(Line3.create(), [0, 0, 0], [1, 1, 1]);
	t.true(Line3.equals(line0, line1));

	const line2 = Line3.fromPointAndDirection(Line3.create(), [0, 0, 0], [0, 1, 0]);
	t.false(Line3.equals(line0, line2));

	const line3 = Line3.fromPointAndDirection(Line3.create(), [1, 0, 1], [0, 0, 0]);
	t.false(Line3.equals(line0, line3));

	const line4 = Line3.fromPointAndDirection(Line3.create(), [1, 1, 1], [1, 1, 1]);
	t.false(Line3.equals(line0, line4));
});
