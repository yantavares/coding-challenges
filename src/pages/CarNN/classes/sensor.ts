import { lerp } from "../utils";
import Car from "./car";

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
}

class Sensor {
  constructor(car: Car) {
    this.car = car;
    this.rayCount = 5;
    this.rayLength = 150;
    this.raySpread = Math.PI / 2;

    this.rays = [];
  }

  update() {
    this.#castRays();
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
    ctx.strokeStyle = "yellow";
    this.rays.forEach((ray) => {
      ctx.beginPath();
      ctx.lineWidth = 2;
      ctx.moveTo(ray.start.x, ray.start.y);
      ctx.lineTo(ray.end.x, ray.end.y);
      ctx.stroke();
    });
  }
}

export default Sensor;
