import test from "ava";

import {lerp, fromValues} from "./index.js";

import {compareVectors} from "../../../test/helpers/index.js";

test("vec2: lerp() called with three parameters should update a vec2 with correct values", (t) => {
	const obs1 = fromValues(0, 0);
	const ret1 = lerp(obs1, [0, 0], [0, 0], 0);
	t.true(compareVectors(obs1, [0, 0]));
	t.true(compareVectors(ret1, [0, 0]));

	const obs2 = fromValues(0, 0);
	const ret2 = lerp(obs2, [1, 2], [5, 6], 0.0);
	t.true(compareVectors(obs2, [1, 2]));
	t.true(compareVectors(ret2, [1, 2]));

	const obs3 = fromValues(0, 0);
	const ret3 = lerp(obs3, [1, 2], [5, 6], 0.75);
	t.true(compareVectors(obs3, [4, 5]));
	t.true(compareVectors(ret3, [4, 5]));

	const obs4 = fromValues(0, 0);
	const ret4 = lerp(obs4, [1, 2], [5, 6], 1.0);
	t.true(compareVectors(obs4, [5, 6]));
	t.true(compareVectors(ret4, [5, 6]));
});
