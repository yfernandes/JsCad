import test from "ava";

import {compareVectors} from "../../../../test/helpers/index.js";
import {Line3} from "../index.js";

test("line3: create() should return a line3 with initial values", (t) => {
	const obs = Line3.create();
	t.true(compareVectors(obs[0], [0, 0, 0]));
	t.true(compareVectors(obs[1], [0, 0, 1]));
});
