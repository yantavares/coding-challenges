import p5 from "p5";
import React, { useEffect, useRef, useState } from "react";
import { initializeRandomGrid, checkNeighborsWrapAround } from "../../utils"; // Ensure these utility functions are correctly implemented
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
  const [isPaused, setIsPaused] = useState(false);
  const [frameCount, setFrameCount] = useState(0);
  const [population, setPopulation] = useState(0);
  const isPausedRef = useRef(isPaused);

  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  useEffect(() => {
    if (sketchRef.current === null) return;

    const sketch = (p: p5) => {
      let grid: number[][] = [];
      let cols: number;
      let rows: number;

      p.setup = () => {
        p.createCanvas(1000, 560);
        p.frameRate(10);
        cols = Math.floor(p.width / cellSize);
        rows = Math.floor(p.height / cellSize);

        grid = initializeRandomGrid(rows, cols);
        countPopulation(grid);
      };

      const countPopulation = (grid: number[][]) => {
        let alive = grid.flat().reduce((acc, cell) => acc + cell, 0);
        setPopulation(alive);
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
        countPopulation(grid);
      };

      const computeNextGeneration = (
        grid: number[][],
        rows: number,
        cols: number
      ) => {
        if (isPausedRef.current) return grid;
        setFrameCount((prev) => prev + 1);
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

  const handleCellSizeChange = (newSize: number) => {
    setCellSize(newSize);
    setToggleReload(!toggleReload);
    setFrameCount(0);
    setPopulation(0);
  };

  const handleClear = () => {
    setToggleReload(!toggleReload);
    setFrameCount(0);
  };

  return (
    <div style={{ display: "flex", gap: "0.5rem", flexDirection: "column" }}>
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
        <button onClick={handleClear}>Clear</button>
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
            marginRight: "5rem",
          }}
        >
          {[5, 10, 15, 20, 25].map((size) => (
            <option key={size} value={size}>
              {size}px
            </option>
          ))}
        </select>
        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <p style={{ width: "15rem" }}>
            Time passed: <a>{frameCount}</a>
          </p>
          <p style={{ width: "15rem" }}>
            Population count: <a>{population}</a>
          </p>
        </div>
      </div>

      <div ref={sketchRef} />
    </div>
  );
};

export default GameOfLife;
