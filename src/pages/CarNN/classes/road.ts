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

  draw(carCtx: CanvasRenderingContext2D) {
    carCtx.fillStyle = "gray";
    carCtx.lineWidth = 3;
    carCtx.strokeStyle = "lightgray";

    for (let i = 1; i <= this.laneCount - 1; i++) {
      const laneX = lerp(this.left, this.right, i / this.laneCount);

      carCtx.setLineDash([20, 20]);

      carCtx.beginPath();
      carCtx.moveTo(laneX, this.top);
      carCtx.lineTo(laneX, this.bottom);
      carCtx.stroke();
    }
    // Drawing the borders
    carCtx.setLineDash([]);

    carCtx.beginPath();
    carCtx.moveTo(this.borders.left.top.x, this.borders.left.top.y);
    carCtx.lineTo(this.borders.left.bottom.x, this.borders.left.bottom.y);
    carCtx.stroke();

    carCtx.beginPath();
    carCtx.moveTo(this.borders.right.top.x, this.borders.right.top.y);
    carCtx.lineTo(this.borders.right.bottom.x, this.borders.right.bottom.y);
    carCtx.stroke();
  }
}

export default Road;
