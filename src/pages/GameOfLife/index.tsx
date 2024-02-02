import p5 from "p5";
import React, { useEffect, useRef, useState } from "react";
import { initializeRandomGrid, checkNeighborsWrapAround } from "../../utils"; // make sure these utils functions exist and are correctly imported
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const black = 0;
const gray = 100;

const GameOfLife = () => {
  const sketchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();
  const [cellSize, setCellSize] = useState(10);
  const [toggleReload, setToggleReload] = useState(false);
  const isPausedRef = useRef(false);
  const [isPaused, setIsPaused] = useState(false);

  isPausedRef.current = isPaused;

  useEffect(() => {
    if (sketchRef.current === null) return;

    const sketch = (p: p5) => {
      let grid: number[][] = [];
      let cols: number;
      let rows: number;

      p.setup = () => {
        p.createCanvas(1000, 600);
        p.frameRate(10);
        cols = Math.floor(p.width / cellSize);
        rows = Math.floor(p.height / cellSize);

        console.log(cols, rows);

        grid = initializeRandomGrid(rows, cols);
      };

      p.draw = () => {
        p.background(black);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            const cell = grid[i][j];
            p.fill(cell === 1 ? gray : black);
            p.square(j * cellSize, i * cellSize, cellSize);
          }
        }

        grid = computeNextGeneration(grid, rows, cols);
      };

      const computeNextGeneration = (
        grid: number[][],
        rows: number,
        cols: number
      ) => {
        if (isPausedRef.current) return grid;
        let newGrid = grid.map((row) => [...row]);
        for (let i = 0; i < rows; i++) {
          for (let j = 0; j < cols; j++) {
            let neighbors = checkNeighborsWrapAround(grid, i, j);
            if (grid[i][j] === 1 && (neighbors < 2 || neighbors > 3)) {
              newGrid[i][j] = 0;
            } else if (grid[i][j] === 0 && neighbors === 3) {
              newGrid[i][j] = 1;
            }
          }
        }
        return newGrid;
      };
    };

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, [toggleReload, cellSize]);

  const handleCellSizeChange = (newSize) => {
    setCellSize(newSize);
    setToggleReload(!toggleReload);
  };

  return (
    <div style={{ display: "flex", gap: "1rem", flexDirection: "column" }}>
      <div
        style={{
          display: "flex",
          gap: "0.5rem",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <button onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
        <button onClick={() => setToggleReload(!toggleReload)}>Clear</button>
        <button onClick={() => setIsPaused(!isPaused)}>
          {isPaused ? "Play" : "Pause"}
        </button>
        <p>Cell Size: </p>
        <select
          onChange={(e) => handleCellSizeChange(Number(e.target.value))}
          value={cellSize}
          style={{
            height: "2rem",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {[5, 10, 15, 20, 25].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
      </div>
      <div ref={sketchRef} />
    </div>
  );
};

export default GameOfLife;
