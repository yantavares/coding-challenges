import CircularProgress from "@mui/material/CircularProgress";
import React, { Suspense } from "react";
import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SandFalling from "./pages/SandFalling";

function App() {
  return (
    <HashRouter>
      <Suspense fallback={<CircularProgress />}>
        <Routes>
          <Route path="/" element={<SandFalling />} />
        </Routes>
      </Suspense>
    </HashRouter>
  );
}

export default App;
