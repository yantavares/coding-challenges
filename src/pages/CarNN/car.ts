interface Car {
  x: number;
  y: number;
  width: number;
  height: number;
  draw(ctx: { fillStyle: string; fillRect: any }): void;
}

class Car {
  constructor(x: number, y: number, width: number, height: number) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
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
