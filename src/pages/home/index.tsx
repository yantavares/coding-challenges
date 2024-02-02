import React from "react";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const navigate = useNavigate();
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
      <h1>Home</h1>
      <button onClick={() => navigate("/sand-falling")}>Sand</button>
      <button onClick={() => navigate("/game-of-life")}>Game of Life</button>
    </div>
  );
};
export default Home;
