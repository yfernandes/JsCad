import type {IVec3} from "../../maths/vec3/type.d.ts";
import type {Color} from "../types.d.ts";

export interface Slice {
	contours: Array<Array<IVec3>>;
	color?: Color;
}
