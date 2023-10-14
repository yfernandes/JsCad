import type {IVec1} from "./vec1/type.js";
import type {Vec2} from "./vec2/index.js";
import type {IVec3} from "./vec3/type.js";
import type {IVec4} from "./vec4/type.js";

export type {Line2} from "./line2/type.js";
export type {Line3} from "./line3/index.js";
export type {Mat4} from "./mat4/type.js";
export type {Plane} from "./plane/type.js";
export type {IVec1 as Vec1} from "./vec1/type.js";
export type {Vec2} from "./vec2/index.js";
export type {IVec3 as Vec3} from "./vec3/type.js";
export type {IVec4 as Vec4} from "./vec4/type.js";

export type Vec = IVec1 | Vec2 | IVec3 | IVec4;
