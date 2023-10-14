import type {IVec3} from "../maths/vec3/type.d.ts";
import type {Geom3} from "../geometries/geom3/type.d.ts";
import type {RGB, RGBA} from "../colors/types.d.ts";

export interface PolyhedronOptions {
	points: Array<IVec3>;
	faces: Array<Array<number>>;
	colors?: Array<RGB | RGBA>;
	orientation?: "outward" | "inward";
}

export function polyhedron(options: PolyhedronOptions): Geom3;
