import type {IVec3} from "../../maths/vec3/type.d.ts";
import type {Plane} from "../../maths/plane/type.d.ts";
import type {Poly3} from "./type.d.ts";

export function fromVerticesAndPlane(vertices: Array<IVec3>, plane: Plane): Poly3;
