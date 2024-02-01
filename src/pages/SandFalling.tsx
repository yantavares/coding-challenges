import React, { useEffect, useRef } from "react";
import p5 from "p5";
import { initializeGrid } from "./utils";

const black = 50;
const white = 255;
const lightGray = 80;
const w = 20;

const SandFalling = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<number[][]>([]);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(600, 600);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);
        gridRef.current = initializeGrid(cols, rows, black);
      };

      p.draw = () => {
        p.background(black);
        let grid = gridRef.current;

        grid.forEach((row, rowIndex) => {
          row.forEach((cell, colIndex) => {
            p.stroke(lightGray);
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
        gridRef.current = updatedGrid;
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
          if (gridRef.current[row] && gridRef.current[row][col] !== undefined) {
            gridRef.current[row][col] = white;
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
