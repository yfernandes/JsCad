import type {Mat4} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function fromVectorRotation(out: Mat4, source: IVec3, target: IVec3): Mat4;
