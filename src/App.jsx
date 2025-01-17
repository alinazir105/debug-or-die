import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Engine from "./pages/engine";
import LeftWing from "./pages/leftWing";
import RightWing from "./pages/rightWing";
import LandingGear from "./pages/landingGear";
import "./index.css";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/engine" element={<Engine />} />
        <Route path="/leftWing" element={<LeftWing />} />
        <Route path="/rightWing" element={<RightWing />} />
        <Route path="/landingGear" element={<LandingGear />} />
      </Routes>
    </Router>
  );
};

export default App;
