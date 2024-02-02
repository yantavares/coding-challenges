import p5 from "p5";
import React, { useEffect, useRef } from "react";
import { initializeGrid } from "../../utils";

const black = 0;
const gray = 100;
const w = 8;

const GameOfLife = () => {
  const sketchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (sketchRef.current === null) return;

    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(560, 560);
        p.frameRate(30);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);

        let grid = initializeGrid(cols, rows);

        p.draw = () => {
          p.background(black);
          grid.forEach((row, rowIndex) => {
            row.forEach((cell, colIndex) => {
              p.stroke(black);
              if (cell === black) p.fill(black);
              else if (cell === gray) p.fill(gray);
              else p.fill(cell, 255, 255);
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
