import React, { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { initializeGrid } from "../../utils";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLeftLong } from "@fortawesome/free-solid-svg-icons";

const black = 0;
const gray = 100;
const w = 8;

const SandFalling = () => {
  const selectedButtonRef = useRef("sand");
  const [selectedButton, setSelectedButton] = useState("sand");
  const [toggleReload, setToggleReload] = useState(false);

  const navigate = useNavigate();

  const sketchRef = useRef<HTMLDivElement>(null);
  let grid: number[][] = [];

  // Adjust hueValue to cycle within a yellow range
  let hueValue = 50;
  const yellowMin = 50;
  const yellowMax = 70;

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(560, 560);
        p.frameRate(30);
        p.colorMode(p.HSB, 360, 255, 255);
        const cols = Math.floor(p.width / w);
        const rows = Math.floor(p.height / w);
        grid = initializeGrid(rows, cols);
      };

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

        // Make square fall
        let updatedGrid = grid.map((row) => [...row]);
        for (let i = 0; i < grid.length - 1; i++) {
          for (let j = 0; j < grid[i].length; j++) {
            if (grid[i][j] !== black && grid[i][j] !== gray) {
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
      const updateGridForMouse = (selectedMaterial: string) => {
        if (
          p.mouseX >= 0 &&
          p.mouseX < p.width &&
          p.mouseY >= 0 &&
          p.mouseY < p.height
        ) {
          const col = Math.floor(p.mouseX / w);
          const row = Math.floor(p.mouseY / w);

          const limitSand = 2;
          const limitConcrete = 1;
          if (
            grid[row] &&
            grid[row][col] !== undefined &&
            grid[row][col] === black
          ) {
            if (selectedMaterial === "sand") {
              for (let i = -limitSand; i < limitSand; i++) {
                for (let j = -limitSand; j < limitSand; j++) {
                  if (grid[row + i] && grid[row + i][col + j] === black) {
                    if (p.random(1) < 0.5) grid[row + i][col + j] = hueValue;
                  }
                }
              }
            } else if (selectedMaterial === "concrete") {
              for (let i = -limitConcrete; i < limitConcrete; i++) {
                for (let j = -limitConcrete; j < limitConcrete; j++) {
                  if (grid[row + i] && grid[row + i][col + j] === black) {
                    grid[row + i][col + j] = gray;
                  }
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
        updateGridForMouse(selectedButtonRef.current);
      };

      // Mouse dragged event
      p.mouseDragged = () => {
        updateGridForMouse(selectedButtonRef.current);
      };
    };

    if (sketchRef.current === null) return;

    let myp5 = new p5(sketch, sketchRef.current);

    return () => {
      myp5.remove();
    };
  }, [toggleReload]);

  const handleMaterialChange = (material) => {
    selectedButtonRef.current = material;
    setSelectedButton(material);
  };

  return (
    <div style={{ display: "flex", gap: "1rem" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <button onClick={() => navigate("/")}>
          <FontAwesomeIcon icon={faLeftLong} />
        </button>
      </div>
      <div ref={sketchRef} />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: "0.5rem",
        }}
      >
        <button
          style={selectedButton === "sand" ? { border: "1px solid cyan" } : {}}
          onClick={() => handleMaterialChange("sand")}
        >
          Sand
        </button>
        <button
          style={
            selectedButton === "concrete" ? { border: "1px solid cyan" } : {}
          }
          onClick={() => handleMaterialChange("concrete")}
        >
          Concrete
        </button>
        <button onClick={() => setToggleReload(!toggleReload)}>Clear</button>
      </div>
    </div>
  );
};

export default SandFalling;
