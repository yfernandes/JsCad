import type {Mat4} from "./type.d.ts";
import type {IVec3} from "../vec3/type.d.ts";

export function translate(out: Mat4, matrix: Mat4, offsets: IVec3): Mat4;
