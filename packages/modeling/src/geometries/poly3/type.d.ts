import type {Plane} from "../../maths/plane/type.d.ts";
import type {IVec3} from "../../maths/vec3/type.d.ts";
import type {Color} from "../types.d.ts";

export interface Poly3 {
	vertices: Array<IVec3>;
	color?: Color;

	// used internally for caching:
	plane?: Plane;
}
