import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { initializeGrid } from "./utils";

const black = 0;
const w = 8;

const SandFalling = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  let grid: number[][] = [];

  // Adjust hueValue to cycle within a yellow range
  let hueValue = 50;
  const yellowMin = 50;
  const yellowMax = 70;

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(680, 680);
        p.frameRate(30);
        p.colorMode(p.HSB, 360, 255, 255);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);
        grid = initializeGrid(cols, rows);
      };

      p.draw = () => {
        p.background(black);
        grid.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            p.stroke(black);
            if (cell === black) p.fill(black);
            else p.fill(cell, 255, 255);
            p.square(colIndex * w, rowIndex * w, w);
          });
        });

        // Make square fall
        let updatedGrid = grid.map((row) => [...row]);
        for (let i = 0; i < grid.length - 1; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== black) {
              if (grid[i + 1][j] === black) {
                // below is empty
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j] = hueValue;
              } else if (
                // below left is empty
                grid[i + 1][j - 1] === black &&
                grid[i][j - 1] === black
              ) {
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j - 1] = hueValue;
              } else if (
                // below right is empty
                grid[i + 1][j + 1] === black &&
                grid[i][j + 1] === black
              ) {
                updatedGrid[i][j] = black;
                updatedGrid[i + 1][j + 1] = hueValue;
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
          if (
            grid[row] &&
            grid[row][col] !== undefined &&
            grid[row][col] === black
          ) {
            for (let i = -limit; i < limit; i++) {
              for (let j = -limit; j < limit; j++) {
                if (grid[row + i] && grid[row + i][col + j] !== undefined) {
                  if (p.random(1) < 0.5) grid[row + i][col + j] = hueValue;
                }
              }
            }
          }
        }
        hueValue = hueValue + 0.5;
        if (hueValue > yellowMax) hueValue = yellowMin;
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
