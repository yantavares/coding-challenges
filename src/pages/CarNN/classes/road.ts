import { Point, lerp } from "../utils";

interface Road {
  x: number;
  width: number;
  laneCount: number;
  left: number;
  right: number;
  top: number;
  bottom: number;
  borders: RoadBorders;
}

export interface RoadBorders {
  left: {
    top: Point;
    bottom: Point;
  };
  right: {
    top: Point;
    bottom: Point;
  };
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

    this.borders = {
      left: { top: topLeft, bottom: bottomLeft },
      right: { top: topRight, bottom: bottomRight },
    };
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
    // Drawing the borders
    ctx.setLineDash([]);

    ctx.beginPath();
    ctx.moveTo(this.borders.left.top.x, this.borders.left.top.y);
    ctx.lineTo(this.borders.left.bottom.x, this.borders.left.bottom.y);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(this.borders.right.top.x, this.borders.right.top.y);
    ctx.lineTo(this.borders.right.bottom.x, this.borders.right.bottom.y);
    ctx.stroke();
  }
}

export default Road;
