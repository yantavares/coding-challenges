import { Point, polysIntersect, polysIntersectRoad } from "../utils";
import Controls from "./controls";
import { NeuralNetwork } from "./network";
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
  brain: NeuralNetwork;
  useBrain: boolean;
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

    this.useBrain = this.type === "AI";

    if (this.type !== "NPC") {
      this.sensor = new Sensor(this);
      this.brain = new NeuralNetwork([this.sensor.rayCount, 6, 4]);
    }

    this.controls = new Controls(this.type);
  }

  update(roadBorders: RoadBorders, traffic: Car[] = []) {
    if (!this.damaged) {
      this.#move_player();
      this.polygon = this.#create_polygon();
      this.damaged = this.#assessDamage(roadBorders, traffic);
    }

    if (this.sensor) {
      this.sensor.update(roadBorders, traffic);

      // Higher values if danger is close
      const offsets = this.sensor.readings.map((sensor) =>
        sensor == null ? 0 : 1 - sensor.offset
      );

      const outputs = NeuralNetwork.feedForward(offsets, this.brain);

      if (this.useBrain) {
        this.controls.up = outputs[0] > 0.5;
        this.controls.down = outputs[1] > 0.5;
        this.controls.left = outputs[2] > 0.5;
        this.controls.right = outputs[3] > 0.5;
      }
    }
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

  draw(
    carCtx: CanvasRenderingContext2D,
    color: string = "blue",
    showArrows: boolean = false
  ) {
    carCtx.fillStyle = this.damaged ? "black" : color;
    carCtx.beginPath();
    carCtx.moveTo(this.polygon[0].x, this.polygon[0].y);
    for (let i = 1; i < this.polygon.length; i++) {
      carCtx.lineTo(this.polygon[i].x, this.polygon[i].y);
    }
    carCtx.fill();

    if (this.sensor && showArrows) this.sensor.draw(carCtx);
  }
}

export default Car;
