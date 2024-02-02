import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { initializeGrid, initializeRandomGrid } from "../../utils";

const black = 0;
const gray = 100;
const w = 10;

const GameOfLife = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sketchRef.current === null) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(100, 200);
        p.frameRate(30);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);

        console.log(cols, rows);

        let grid = initializeRandomGrid(rows, cols);

        p.draw = () => {
          p.background(black);
          grid.forEach((row, rowIndex) => {
            row.forEach((cell: number, colIndex: number) => {
              if (cell === 1) p.fill(gray);
              else p.fill(black);
              p.square(colIndex * w, rowIndex * w, w);
            });
          });
        };
      };
    };

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, []);

  return <div ref={sketchRef} />;
};

export default GameOfLife;
