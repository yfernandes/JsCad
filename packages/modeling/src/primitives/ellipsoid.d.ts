import type {IVec3} from "../maths/vec3/type.d.ts";
import type {Geom3} from "../geometries/geom3/type.d.ts";

export interface EllipsoidOptions {
	center?: IVec3;
	radius?: IVec3;
	segments?: number;
	axes?: IVec3;
}

export function ellipsoid(options?: EllipsoidOptions): Geom3;
