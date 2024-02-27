import { lerp } from "../utils";
import Car from "./car";
import { RoadBorders } from "./road";
import { getIntersection } from "../utils";

interface Intersection {
  x: number;
  y: number;
  offset: number;
}
interface Ray {
  start: { x: number; y: number };
  end: { x: number; y: number };
}
interface Sensor {
  car: Car;
  rays: Ray[];
  rayCount: number;
  rayLength: number;
  raySpread: number;
  readings: Intersection[];
}

class Sensor {
  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
  }

  update(roadBorders: RoadBorders, traffic: Car[] = []) {
    this.#castRays();
    this.readings = [];
    for (let i = 0; i < this.rays.length; i++) {
      this.readings.push(this.#getReading(this.rays[i], roadBorders, traffic));
    }
  }

  #getReading(
    ray: Ray,
    roadBorders: RoadBorders,
    traffic: Car[] = []
  ): Intersection {
    let touches = [];

    // Check for intersection with traffic
    for (let i = 0; i < traffic.length; i++) {
      const car = traffic[i];
      for (let j = 0; j < car.polygon.length; j++) {
        const next = (j + 1) % car.polygon.length;
        const touch = getIntersection(
          ray.start,
          ray.end,
          car.polygon[j],
          car.polygon[next]
        );
        if (touch) {
          touches.push(touch);
        }
      }
    }

    const roadTouch = getIntersection(
      ray.start,
      ray.end,
      roadBorders.left.top,
      roadBorders.left.bottom
    );
    if (roadTouch) {
      touches.push(roadTouch);
    }

    const roadTouch2 = getIntersection(
      ray.start,
      ray.end,
      roadBorders.right.top,
      roadBorders.right.bottom
    );
    if (roadTouch2) {
      touches.push(roadTouch2);
    }

    const offsets = touches.map((touch) => touch.offset);
    const closest = Math.min(...offsets);
    const closestTouch = touches.find((touch) => touch.offset === closest);

    return closestTouch;
  }

  #castRays() {
    this.rays = [];
    for (let i = 0; i < this.rayCount; i++) {
      const rayAngle =
        lerp(
          this.raySpread / 2,
          -this.raySpread / 2,
          this.rayCount !== 1 ? i / (this.rayCount - 1) : 0.5
        ) + this.car.angle;

      const start = {
        x: this.car.x,
        y: this.car.y,
      };
      const end = {
        x: this.car.x - Math.sin(rayAngle) * this.rayLength,
        y: this.car.y - Math.cos(rayAngle) * this.rayLength,
      };

      this.rays.push({ start, end });
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    for (let i = 0; i < this.rayCount; i++) {
      let rayEnd = this.rays[i].end;
      if (this.readings[i]) {
        rayEnd = this.readings[i];
      }

      ctx.beginPath();
      ctx.strokeStyle = "yellow";
      ctx.lineWidth = 2;
      ctx.moveTo(this.rays[i].start.x, this.rays[i].start.y);
      ctx.lineTo(rayEnd.x, rayEnd.y);
      ctx.stroke();

      ctx.beginPath();
      ctx.strokeStyle = "black";
      ctx.lineWidth = 2;
      ctx.moveTo(this.rays[i].end.x, this.rays[i].end.y);
      ctx.lineTo(rayEnd.x, rayEnd.y);
      ctx.stroke();
    }
  }
}

export default Sensor;
