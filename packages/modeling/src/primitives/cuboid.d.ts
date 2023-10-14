import type {IVec3} from "../maths/vec3/type.d.ts";
import type {Geom3} from "../geometries/geom3/type.d.ts";

export interface CuboidOptions {
	center?: IVec3;
	size?: IVec3;
}

export function cuboid(options?: CuboidOptions): Geom3;
