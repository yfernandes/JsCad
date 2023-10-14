/**
 * Represents an unbounded line in 2D space, positioned at a point of origin.
 * A line is parametrized by a normal vector (perpendicular to the line,
 * rotated 90 degrees counterclockwise) and distance from the origin.
 *
 * Equation: A Point (P) is on Line (L) if dot(L.normal, P) == L.distance
 *
 * The contents of the array are a normal [0,1] and a distance [2].
 */
export type ILine2 = [number, number, number];

// export class Line2 {}
