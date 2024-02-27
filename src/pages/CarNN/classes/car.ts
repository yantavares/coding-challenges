import { Point, polysIntersect, polysIntersectRoad } from "../utils";
import Controls from "./controls";
import { RoadBorders } from "./road";
import Sensor from "./sensor";

interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  acceleration: number;
  controls: Controls;
  maxSpeed: number;
  friction: number;
  angle: number;
  sensor: Sensor;
  polygon: Point[];
  damaged: boolean;
  type: string;
}

class Car {
  constructor(
    x: number,
    y: number,
    width: number,
    height: number,
    type: string,
    maxSpeed: number = 3
  ) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.type = type;

    this.speed = 0;
    this.acceleration = 0.2;
    this.maxSpeed = maxSpeed;
    this.friction = 0.05;
    this.angle = 0;
    this.damaged = false;

    if (this.type === "PLAYER") {
      this.sensor = new Sensor(this);
    }

    this.controls = new Controls(this.type);
  }

  update(roadBorders: RoadBorders, traffic: Car[] = []) {
    if (!this.damaged) {
      this.#move_player();
      this.polygon = this.#create_polygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    }

    if (this.sensor) this.sensor.update(roadBorders, traffic);
  }

  #assessDamage(roadBorders: RoadBorders, traffic: Car[]) {
    if (polysIntersectRoad(this.polygon, roadBorders.left)) {
      return true;
    }
    if (polysIntersectRoad(this.polygon, roadBorders.right)) {
      return true;
    }
    if (traffic.some((car) => polysIntersect(this.polygon, car.polygon))) {
      return true;
    }
    return false;
  }

  #create_polygon() {
    const points = [];
    const rad = Math.hypot(this.width, this.height) / 2;
    const alpha = Math.atan2(this.width, this.height);
    points.push({
      x: this.x - Math.sin(this.angle - alpha) * rad,
      y: this.y - Math.cos(this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(this.angle + alpha) * rad,
      y: this.y - Math.cos(this.angle + alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle - alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle - alpha) * rad,
    });
    points.push({
      x: this.x - Math.sin(Math.PI + this.angle + alpha) * rad,
      y: this.y - Math.cos(Math.PI + this.angle + alpha) * rad,
    });
    return points;
  }

  #move_player() {
    if (this.controls.up) {
      this.speed += this.acceleration;
    }
    if (this.controls.down) {
      this.speed -= this.acceleration;
    }

    if (this.speed > this.maxSpeed) {
      this.speed = this.maxSpeed;
    }

    if (this.speed < -this.maxSpeed / 2) {
      this.speed = -this.maxSpeed / 2;
    }

    if (this.speed > 0) {
      this.speed -= this.friction;
    }

    if (this.speed < 0) {
      this.speed += this.friction;
    }

    if (Math.abs(this.speed) < this.friction) {
      this.speed = 0;
    }

    if (this.speed !== 0) {
      const flip = this.speed > 0 ? 1 : -1;
      if (this.controls.left) {
        this.angle += 0.03 * flip;
      }

      if (this.controls.right) {
        this.angle -= 0.03 * flip;
      }
    }

    this.x -= Math.sin(this.angle) * this.speed;
    this.y -= Math.cos(this.angle) * this.speed;
  }

  draw(ctx: CanvasRenderingContext2D, color: string = "blue") {
    ctx.fillStyle = this.damaged ? "black" : color;
    ctx.beginPath();
    ctx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      ctx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    ctx.fill();

    if (this.sensor) this.sensor.draw(ctx);
  }
}

export default Car;
