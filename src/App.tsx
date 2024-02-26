import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { BrowserRouter, HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SandFalling from "./pages/SandFalling";
import Home from "./pages/home";
import GameOfLife from "./pages/GameOfLife";
import MazeHome from "./pages/MazeHome";
import MazeCreator from "./pages/MazeCreator";
import CarNN from "./pages/CarNN";

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
