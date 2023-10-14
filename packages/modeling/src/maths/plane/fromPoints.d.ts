import type {Plane} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function fromPoints(out: Plane, ...vertices: Array<IVec3>): Plane;
