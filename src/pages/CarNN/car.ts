import Controls from "./controls";

interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  speed: number;
  acceleration: number;
  controls: Controls;
  draw(ctx: { fillStyle: string; fillRect: any }): void;
}

class Car {
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;

    this.speed = 0;
    this.acceleration = 0.2;

    this.controls = new Controls();
  }

  update() {
    if (this.controls.left) {
      this.x -= 3;
    }
    if (this.controls.right) {
      this.x += 3;
    }
    if (this.controls.up) {
      this.speed -= this.acceleration;
    }
    if (this.controls.down) {
      this.speed += this.acceleration;
    }

    this.y += this.speed;
  }

  draw(ctx: any) {
    ctx.beginPath();
    ctx.rect(
      this.x - this.width / 2,
      this.y - this.height / 2,
      this.width,
      this.height
    );
    ctx.fillStyle = "black";
    ctx.fill();
  }
}

export default Car;
