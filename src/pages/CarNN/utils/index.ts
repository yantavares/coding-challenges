export interface Point {
  x: number;
  y: number;
}

// Linear interpolation
export function lerp(start: number, end: number, t: number) {
  return start * (1 - t) + end * t;
}
export function getIntersection(a: Point, b: Point, c: Point, d: Point) {
  const tTop = (a.x - c.x) * (d.y - c.y) - (a.y - c.y) * (d.x - c.x);
  const uTop = (a.x - c.x) * (b.y - a.y) - (a.y - c.y) * (b.x - a.x);
  const bottom = (b.x - a.x) * (d.y - c.y) - (b.y - a.y) * (d.x - c.x);

  if (bottom !== 0) {
    const t = tTop / bottom;
    const u = -uTop / bottom;
    if (t >= 0 && t <= 1 && u >= 0 && u <= 1) {
      return {
        x: lerp(a.x, b.x, t),
        y: lerp(a.y, b.y, t),
        offset: t,
      };
    }
  }
  return null;
}
