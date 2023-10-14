import type {Poly3} from "./type.d.ts";
import type {IVec3} from "../../maths/vec3/type.d.ts";

export function measureBoundingBox(polygon: Poly3): [IVec3, IVec3];
