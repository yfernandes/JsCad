import type {Plane} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function fromNormalAndPoint(out: Plane, normal: IVec3, point: IVec3): Plane;
