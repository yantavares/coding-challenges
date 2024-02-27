import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import SandFalling from "./pages/SandFalling";
import Home from "./pages/home";
import GameOfLife from "./pages/GameOfLife";
import MazeHome from "./pages/MazePlayground/MazeHome";
import MazeCreator from "./pages/MazePlayground/MazeCreator";
import CarNN from "./pages/CarNN";
import "./App.css";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sand-falling" element={<SandFalling />} />
          <Route path="/game-of-life" element={<GameOfLife />} />
          <Route path="/maze-playground" element={<MazeHome />} />
          <Route path="/carNN" element={<CarNN />} />
          <Route
            path="/maze-playground/maze-creator"
            element={<MazeCreator />}
          />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
