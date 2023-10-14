import type {Mat4} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function rotate(out: Mat4, matrix: Mat4, radians: number, axis: IVec3): Mat4;
