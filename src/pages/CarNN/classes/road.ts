import { lerp } from "../utils";

interface Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  borders: { x: number; y: number }[][];
}

class Road {
  constructor(x: number, width: number, laneCount: number = 3) {
    this.x = x;
    this.width = width;
    this.laneCount = laneCount;

    this.left = x - width / 2;
    this.right = x + width / 2;

    const infinite = 1000000;

    this.top = -infinite;
    this.bottom = infinite;

    const topLeft = { x: this.left, y: this.top };
    const topRight = { x: this.right, y: this.top };
    const bottomRight = { x: this.right, y: this.bottom };
    const bottomLeft = { x: this.left, y: this.bottom };

    this.borders = [
      [topLeft, bottomLeft],
      [topRight, bottomRight],
    ];
  }

  getLaneCenter(lane: number) {
    const laneWidth = this.width / this.laneCount;
    return (
      Math.min(lane, this.laneCount - 1) * laneWidth + laneWidth / 2 + this.left
    );
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = "gray";
    ctx.lineWidth = 3;
    ctx.strokeStyle = "lightgray";

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const laneX = lerp(this.left, this.right, i / this.laneCount);

      ctx.setLineDash([20, 20]);

      ctx.beginPath();
      ctx.moveTo(laneX, this.top);
      ctx.lineTo(laneX, this.bottom);
      ctx.stroke();
    }

    ctx.setLineDash([]);
    this.borders.forEach((border) => {
      ctx.beginPath();
      ctx.moveTo(border[0].x, border[0].y);
      ctx.lineTo(border[1].x, border[1].y);
      ctx.stroke();
    });
  }
}

export default Road;
