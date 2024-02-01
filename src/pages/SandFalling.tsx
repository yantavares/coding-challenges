import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { initializeGrid } from "./utils";

const black = 50;
const white = 255;
const w = 10;

const SandFalling = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  let grid: number[][] = [];

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(680, 680);
        p.frameRate(80);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);
        grid = initializeGrid(cols, rows, black);
      };

      p.draw = () => {
        p.background(black);

        grid.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            p.stroke(black);
            p.fill(cell);
            p.square(colIndex * w, rowIndex * w, w);
          });
        });

        // Make square fall
        let updatedGrid = grid.map((row) => [...row]);
        for (let i = 0; i < grid.length - 1; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] === white) {
              if (grid[i + 1][j] === black) {
                // below is empty
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j] = white;
              } else if (
                // below left is empty
                grid[i + 1][j - 1] === black &&
                grid[i][j - 1] === black
              ) {
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j - 1] = white;
              } else if (
                // below right is empty
                grid[i + 1][j + 1] === black &&
                grid[i][j + 1] === black
              ) {
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j + 1] = white;
              }
            }
          }
        }
        grid = updatedGrid;
      };

      // Function to turn squares white where the mouse is
      const updateGridForMouse = () => {
        if (
          p.mouseX >= 0 &&
          p.mouseX < p.width &&
          p.mouseY >= 0 &&
          p.mouseY < p.height
        ) {
          const col = Math.floor(p.mouseX / w);
          const row = Math.floor(p.mouseY / w);
          const area = 4;
          const limit = Math.floor(area / 2);
          if (grid[row] && grid[row][col] !== undefined) {
            for (let i = -limit; i < limit; i++) {
              for (let j = -limit; j < limit; j++) {
                if (grid[row + i] && grid[row + i][col + j] !== undefined) {
                  if (p.random(1) < 0.5) grid[row + i][col + j] = white;
                }
              }
            }
          }
        }
      };

      // Mouse pressed event
      p.mousePressed = () => {
        updateGridForMouse();
      };

      // Mouse dragged event
      p.mouseDragged = () => {
        updateGridForMouse();
      };
    };

    if (sketchRef.current === null) return;

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, []);

  return <div ref={sketchRef}></div>;
};

export default SandFalling;
