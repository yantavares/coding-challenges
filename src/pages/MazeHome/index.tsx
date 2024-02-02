import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Maze from "../../components/HomeMaze";
import { StartButton } from "./styles";

const MazeHome = () => {
  const navigate = useNavigate();
  const [board, setBoard] = useState([
    ["h", "", "", "", "", "", ""],
    ["=", "=", "=", "=", "=", "=", ""],
    ["", "", "", "", "", "", ""],
    ["", "=", "=", "=", "=", "=", "="],
    ["", "", "", "", "", "", ""],
    ["=", "", "=", "=", "=", "=", "="],
    ["", "", "", "", "", "", "g"],
  ]);
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        gap: "4rem",
      }}
    >
      <h1 style={{ margin: 0, padding: 0 }}>Maze Solving Playground</h1>
      <div>
        <Maze board={board} setBoard={setBoard} delay={300} />
        <i>Example: solving live using DFS</i>
      </div>

      <div
        style={{
          display: "flex",
          gap: "2rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <StartButton onClick={() => navigate("/maze-playground/maze-creator/")}>
          Start
        </StartButton>
      </div>
    </div>
  );
};
export default MazeHome;
