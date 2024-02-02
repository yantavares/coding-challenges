import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SandFalling from "./pages/SandFalling";
import Home from "./pages/home";

function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/coding-challenges" element={<Home />} />
          <Route path="/sand-falling" element={<SandFalling />} />
          <Route
            path="/coding-challenges/sand-falling"
            element={<SandFalling />}
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
