
import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Result from "./pages/Result";
import "./App.css";
import ManualInput from "./components/ManualInput";

function App() {
  const [result, setResult] = useState(null);

  return (
    <Router>
      <AppContent result={result} setResult={setResult} />
    </Router>
  );
}

// New component that uses useLocation()
function AppContent({ result, setResult }) {
  const location = useLocation();

  // Hide footer only on Result page
  const hideFooter = location.pathname === "/result";

  return (
    <div className="app-container">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/upload" element={<Upload setResult={setResult} />} />
            <Route path="/manual-input" element={<ManualInput />} />

          <Route path="/result" element={<Result result={result} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
