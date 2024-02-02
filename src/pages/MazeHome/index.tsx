import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Maze from "../../components/HomeMaze";
import { StartButton } from "./styles";

const Home = () => {
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
      <h1 style={{ margin: 0, padding: 0 }}>Maze Visualization Playground</h1>
      <div>
        <Maze size={6} board={board} setBoard={setBoard} delay={300} />
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
        <StartButton
          onClick={() =>
            navigate("/maze-visualization-playground/create-maze/")
          }
        >
          Start
        </StartButton>
      </div>
    </div>
  );
};
export default Home;
