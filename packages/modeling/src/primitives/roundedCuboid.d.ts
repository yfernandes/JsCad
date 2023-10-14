import type {IVec3} from "../maths/vec3/type.d.ts";
import type {Geom3} from "../geometries/geom3/type.d.ts";

export interface RoundedCuboidOptions {
	center?: IVec3;
	size?: IVec3;
	roundRadius?: number;
	segments?: number;
}

export function roundedCuboid(options?: RoundedCuboidOptions): Geom3;
