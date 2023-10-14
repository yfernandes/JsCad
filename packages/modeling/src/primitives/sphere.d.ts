import type {IVec3} from "../maths/vec3/type.d.ts";
import type {Geom3} from "../geometries/geom3/type.d.ts";

export interface SphereOptions {
	center?: IVec3;
	radius?: number;
	segments?: number;
	axes?: IVec3;
}

export function sphere(options?: SphereOptions): Geom3;
