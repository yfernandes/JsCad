import type {Mat4} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function fromRotation(out: Mat4, rad: number, axis: IVec3): Mat4;
