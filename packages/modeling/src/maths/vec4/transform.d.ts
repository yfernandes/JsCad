import type {IVec4} from "./type.d.ts";
import type {Mat4} from "../mat4/type.d.ts";

export function transform(out: IVec4, vector: IVec4, matrix: Mat4): IVec4;
