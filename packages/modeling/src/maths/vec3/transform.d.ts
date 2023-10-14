import type {IVec3} from "./type.d.ts";
import type {Mat4} from "../mat4/type.d.ts";

export function transform(out: IVec3, vector: IVec3, matrix: Mat4): IVec3;
