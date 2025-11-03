// // import React, { useState } from "react";
// // import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// // import axios from "axios";
// // import "./App.css";

// // // Navbar Component
// // function Navbar() {
// //   return (
// //     <nav className="navbar">
// //       <h1 className="logo">BreastCare AI</h1>
// //       <div className="nav-links">
// //         <Link to="/">Home</Link>
// //         <Link to="/upload">Upload</Link>
// //         <Link to="/about">About</Link>
// //       </div>
// //     </nav>
// //   );
// // }

// // // Home Page
// // function Home() {
// //   return (
// //     <div className="home">
// //       <h2>AI-based Breast Cancer Detection</h2>
// //       <p>Empowering early diagnosis using Machine Learning. Upload your report and get instant insights.</p>
// //       <Link to="/upload">
// //         <button className="btn">Start Detection</button>
// //       </Link>

// //       <div className="features">
// //         <div>
// //           <h3>Upload Report</h3>
// //           <p>Upload medical reports or input parameters manually.</p>
// //         </div>
// //         <div>
// //           <h3>AI Prediction</h3>
// //           <p>Our model processes your data and predicts the cancer status.</p>
// //         </div>
// //         <div>
// //           <h3>Get Results</h3>
// //           <p>View results instantly with probability score and suggestions.</p>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }

// // // Upload Page
// // function Upload({ setResult }) {
// //   const [file, setFile] = useState(null);
// //   const navigate = useNavigate();

// //   const handleFileChange = (e) => setFile(e.target.files[0]);

// //   const handleUpload = async () => {
// //     if (!file) {
// //       alert("Please select a file!");
// //       return;
// //     }

// //     const formData = new FormData();
// //     formData.append("file", file);

// //     try {
// //       const res = await axios.post("http://localhost:8000/predict-pdf/", formData, {
// //         headers: { "Content-Type": "multipart/form-data" },
// //       });
// //       setResult(res.data.prediction || res.data.error);
// //       navigate("/result");
// //     } catch (error) {
// //       console.error("Error:", error);
// //       setResult("Error uploading file or predicting");
// //       navigate("/result");
// //     }
// //   };

// //   return (
// //     <div className="upload-container">
// //       <div className="upload-card">
// //         <h2>Upload Your Report</h2>
// //         <input type="file" onChange={handleFileChange} />
// //         <button className="btn" onClick={handleUpload}>Submit for Detection</button>
// //       </div>
// //     </div>
// //   );
// // }

// // // Result Page
// // function Result({ result }) {
// //   return (
// //     <div className="result-container">
// //       <div className="result-card">
// //         <h2>Prediction Result</h2>
// //         <p className="result-label">Result:</p>
// //         <p className={`result-text ${result.includes("Benign") ? "benign" : "malignant"}`}>
// //           {result}
// //         </p>
// //         <p className="disclaimer">
// //           *This is a machine-generated prediction. Please consult a medical professional for confirmation.
// //         </p>
// //         <Link to="/upload">
// //           <button className="btn">Upload Another Report</button>
// //         </Link>
// //       </div>
// //     </div>
// //   );
// // }

// // // About Page
// // function About() {
// //   return (
// //     <div className="about">
// //       <h2>About Breast Cancer Detection</h2>
// //       <p>
// //         Our Breast Cancer Detection platform aims to assist healthcare professionals and individuals in the early diagnosis of breast cancer using advanced Machine Learning models.
// //       </p>
// //       <h3>Why Early Detection Matters</h3>
// //       <p>
// //         Early detection significantly improves the chances of successful treatment and survival. Our goal is to empower patients and doctors with the tools and knowledge they need for timely interventions.
// //       </p>
// //       <h3>How It Works</h3>
// //       <ul>
// //         <li>Upload your diagnostic report in PDF format.</li>
// //         <li>Our ML model analyzes the input using trained datasets.</li>
// //         <li>Results are shown instantly with prediction accuracy.</li>
// //       </ul>
// //       <p className="disclaimer">
// //         *This tool is for educational and research purposes only. Please consult a certified doctor for medical decisions.
// //       </p>
// //     </div>
// //   );
// // }

// // function App() {
// //   const [result, setResult] = useState("");

// //   return (
// //     <Router>
// //       <Navbar />
// //       <Routes>
// //         <Route path="/" element={<Home />} />
// //         <Route path="/upload" element={<Upload setResult={setResult} />} />
// //         <Route path="/result" element={<Result result={result} />} />
// //         <Route path="/about" element={<About />} />
// //       </Routes>
// //     </Router>
// //   );
// // }

// // export default App;

// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import "./App.css";

// // Navbar Component
// function Navbar() {
//   return (
//     <nav className="navbar">
//       <h1 className="logo">BreastCare AI</h1>
//       <div className="nav-links">
//         <Link to="/">Home</Link>
//         <Link to="/upload">Upload</Link>
//         <Link to="/about">About</Link>
//       </div>
//     </nav>
//   );
// }

// // Home Page
// function Home() {
//   return (
//     <div className="home">
//       <h2>AI-based Breast Cancer Detection</h2>
//       <p>Empowering early diagnosis using Machine Learning. Upload your report and get instant insights.</p>
//       <Link to="/upload">
//         <button className="btn">Start Detection</button>
//       </Link>

//       <div className="features">
//         <div>
//           <h3>Upload Report</h3>
//           <p>Upload medical reports or input parameters manually.</p>
//         </div>
//         <div>
//           <h3>AI Prediction</h3>
//           <p>Our model processes your data and predicts the cancer status.</p>
//         </div>
//         <div>
//           <h3>Get Results</h3>
//           <p>View results instantly with probability score and suggestions.</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// function Upload({ setResult }) {
//   const [file, setFile] = useState(null);
//   const navigate = useNavigate();

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       alert("Please select a PDF file!");
//       return;
//     }

//     const formData = new FormData();
//     formData.append("file", file);

//     try {
//       const res = await axios.post("http://localhost:8000/predict-pdf/", formData, {
//         headers: { "Content-Type": "multipart/form-data" },
//       });
//       setResult(res.data);
//       navigate("/result");
//     } catch (error) {
//       console.error("Error:", error);
//       setResult({ prediction: "Error", error: "Upload failed or model error" });
//       navigate("/result");
//     }
//   };

//   return (
//     <div className="upload-container">
//       <h2>Upload Medical Report (PDF)</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button className="btn" onClick={handleUpload}>Upload & Predict</button>
//     </div>
//   );
// }

// // About Page
// function About() {
//   return (
//     <div className="about">
//       <h2>About Breast Cancer Detection</h2>
//       <p>
//         Our Breast Cancer Detection platform aims to assist healthcare professionals and individuals in the early diagnosis of breast cancer using advanced Machine Learning models.
//       </p>
//       <h3>Why Early Detection Matters</h3>
//       <p>
//         Early detection significantly improves the chances of successful treatment and survival. Our goal is to empower patients and doctors with the tools and knowledge they need for timely interventions.
//       </p>
//       <h3>How It Works</h3>
//       <ul>
//         <li>Upload your diagnostic report in PDF format.</li>
//         <li>Our ML model analyzes the input using trained datasets.</li>
//         <li>Results are shown instantly with prediction accuracy.</li>
//       </ul>
//       <p className="disclaimer">
//         *This tool is for educational and research purposes only. Please consult a certified doctor for medical decisions.
//       </p>
//     </div>
//   );
// }

// function Result({ result }) {
//   if (!result || !result.prediction) {
//     return (
//       <div className="result-container">
//         <div className="result-card">
//           <h2>No Result Found</h2>
//           <Link to="/"><button className="btn">Try Again</button></Link>
//         </div>
//       </div>
//     );
//   }

//   const isBenign = result.prediction.includes("Benign");

//   return (
//     <div className="result-container">
//       <div className="result-card">
//         <h2>Prediction Result</h2>
//         <p className="result-label">Diagnosis:</p>
//         <p className={`result-text ${isBenign ? "benign" : "malignant"}`}>
//           {result.prediction}
//         </p>

//         <div className="progress-bar">
//           <div
//             className="progress-fill benign"
//             style={{ width: `${result.benign_probability}%` }}
//           >
//             Benign: {result.benign_probability}%
//           </div>
//         </div>
//         <div className="progress-bar">
//           <div
//             className="progress-fill malignant"
//             style={{ width: `${result.malignant_probability}%` }}
//           >
//             Malignant: {result.malignant_probability}%
//           </div>
//         </div>

//         <p className="result-description">
//           {isBenign
//             ? "The tumor is predicted as benign. This generally means non-cancerous growth, but please confirm with a doctor."
//             : "The tumor is predicted as malignant. This indicates possible cancerous growth. Immediate medical consultation is advised."}
//         </p>

//         <p className="disclaimer">
//           *This is a machine-generated prediction. Please consult a medical professional for confirmation.
//         </p>
//         <Link to="/">
//           <button className="btn">Upload Another Report</button>
//         </Link>
//       </div>
//     </div>
//   );
// }

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <Router>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         {/* <Route path="/" element={<Upload setResult={setResult} />} /> */}
//         <Route path="/upload" element={<Upload setResult={setResult} />} />
//         {/* <Route path="/result" element={<Result result={result} />} /> */}
//          <Route path="/result" element={<Result result={result} />} />
//           <Route path="/about" element={<About />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;

// 1234 retry





// import React, { useState } from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
// import Home from "./pages/Home";
// import Upload from "./pages/Upload";
// import About from "./pages/About";
// import Result from "./pages/Result";
// import "./App.css";

// function App() {
//   const [result, setResult] = useState(null);

//   return (
//     <Router>
//       <div className="app-container">
//         <Navbar />
//         <main>
//           <Routes>
//             <Route path="/" element={<Home />} />
//             <Route path="/upload" element={<Upload setResult={setResult} />} />
//             <Route path="/result" element={<Result result={result} />} />
//             <Route path="/about" element={<About />} />
//           </Routes>
//         </main>
//         <Footer />
//       </div>
//     </Router>
//   );
// }

// export default App;




import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Upload from "./pages/Upload";
import About from "./pages/About";
import Result from "./pages/Result";
import "./App.css";

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
          <Route path="/result" element={<Result result={result} />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </main>
      {!hideFooter && <Footer />}
    </div>
  );
}

export default App;
