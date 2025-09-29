


import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./App.css";

// Navbar Component
function Navbar() {
  return (
    <nav className="navbar">
      <h1 className="logo">BreastCare AI</h1>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/upload">Upload</Link>
        <Link to="/about">About</Link>
      </div>
    </nav>
  );
}

// Home Page
function Home() {
  return (
    <div className="home">
      <h2>AI-based Breast Cancer Detection</h2>
      <p>Empowering early diagnosis using Machine Learning. Upload your report and get instant insights.</p>
      <Link to="/upload">
        <button className="btn">Start Detection</button>
      </Link>

      <div className="features">
        <div>
          <h3>Upload Report</h3>
          <p>Upload medical reports or input parameters manually.</p>
        </div>
        <div>
          <h3>AI Prediction</h3>
          <p>Our model processes your data and predicts the cancer status.</p>
        </div>
        <div>
          <h3>Get Results</h3>
          <p>View results instantly with probability score and suggestions.</p>
        </div>
      </div>
    </div>
  );
}

// Upload Page
function Upload({ setResult }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleFileChange = (e) => setFile(e.target.files[0]);

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/predict-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data.prediction || res.data.error);
      navigate("/result");
    } catch (error) {
      console.error("Error:", error);
      setResult("Error uploading file or predicting");
      navigate("/result");
    }
  };

  return (
    <div className="upload-container">
      <div className="upload-card">
        <h2>Upload Your Report</h2>
        <input type="file" onChange={handleFileChange} />
        <button className="btn" onClick={handleUpload}>Submit for Detection</button>
      </div>
    </div>
  );
}

// Result Page
function Result({ result }) {
  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Prediction Result</h2>
        <p className="result-label">Result:</p>
        <p className={`result-text ${result.includes("Benign") ? "benign" : "malignant"}`}>
          {result}
        </p>
        <p className="disclaimer">
          *This is a machine-generated prediction. Please consult a medical professional for confirmation.
        </p>
        <Link to="/upload">
          <button className="btn">Upload Another Report</button>
        </Link>
      </div>
    </div>
  );
}

// About Page
function About() {
  return (
    <div className="about">
      <h2>About Breast Cancer Detection</h2>
      <p>
        Our Breast Cancer Detection platform aims to assist healthcare professionals and individuals in the early diagnosis of breast cancer using advanced Machine Learning models.
      </p>
      <h3>Why Early Detection Matters</h3>
      <p>
        Early detection significantly improves the chances of successful treatment and survival. Our goal is to empower patients and doctors with the tools and knowledge they need for timely interventions.
      </p>
      <h3>How It Works</h3>
      <ul>
        <li>Upload your diagnostic report in PDF format.</li>
        <li>Our ML model analyzes the input using trained datasets.</li>
        <li>Results are shown instantly with prediction accuracy.</li>
      </ul>
      <p className="disclaimer">
        *This tool is for educational and research purposes only. Please consult a certified doctor for medical decisions.
      </p>
    </div>
  );
}

function App() {
  const [result, setResult] = useState("");

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<Upload setResult={setResult} />} />
        <Route path="/result" element={<Result result={result} />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </Router>
  );
}

export default App;
