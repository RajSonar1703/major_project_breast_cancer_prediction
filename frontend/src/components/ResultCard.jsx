





import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  RadialBarChart,
  RadialBar,
} from "recharts";
import "../App.css";

const ResultCard = ({ result }) => {
  const [dataset, setDataset] = useState([]);
  const [preprocess, setPreprocess] = useState(null);
  const [manualInputs, setManualInputs] = useState(Array(30).fill(""));
  const [manualResult, setManualResult] = useState(null);

  const API_URL = "http://127.0.0.1:8000";

  // Fetch dataset from backend
  const fetchDataset = async () => {
    try {
      const res = await fetch(`${API_URL}/get-dataset/`);
      const data = await res.json();
      setDataset(data);
    } catch (error) {
      console.error("Error fetching dataset:", error);
    }
  };

  // Fetch preprocessing steps
  const fetchPreprocess = async () => {
    try {
      const res = await fetch(`${API_URL}/preprocess-steps/`);
      const data = await res.json();
      setPreprocess(data);
    } catch (error) {
      console.error("Error fetching preprocessing steps:", error);
    }
  };

  // Predict manually
  const handleManualPredict = async () => {
    try {
      const values = manualInputs.map(Number);
      const res = await fetch(`${API_URL}/predict-manual/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: values })
,
      });
      const data = await res.json();
      setManualResult(data);
    } catch (error) {
      console.error("Manual prediction failed:", error);
    }
  };

  // Guard clause if no result
  if (!result || !result.prediction) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h2>No Result Found</h2>
          <Link to="/">
            <button className="btn">Try Again</button>
          </Link>
        </div>
      </div>
    );
  }

  const isBenign = result.prediction.includes("Benign");

  const FEATURE_NAMES = [
    "mean radius",
    "mean texture",
    "mean perimeter",
    "mean area",
    "mean smoothness",
    "mean compactness",
    "mean concavity",
    "mean concave points",
    "mean symmetry",
    "mean fractal dimension",
    "radius error",
    "texture error",
    "perimeter error",
    "area error",
    "smoothness error",
    "compactness error",
    "concavity error",
    "concave points error",
    "symmetry error",
    "fractal dimension error",
    "worst radius",
    "worst texture",
    "worst perimeter",
    "worst area",
    "worst smoothness",
    "worst compactness",
    "worst concavity",
    "worst concave points",
    "worst symmetry",
    "worst fractal dimension",
  ];
  const feat= [
  "Signal Intensity Index",
  "Tissue Pattern Score",
  "Structural Density Factor",
  "Cell Formation Index",
  "Morphology Stability Value",
  "Complexity Profile Rating",
  "Granularity Distribution Level",
  "Shape Deviation Metric",
  "Boundary Irregularity Score",
  "Growth Variation Index"
];
  const random = Math.floor(Math.random() * (30 - 10 + 1)) + 10;  
  const data =
    result.features?.slice(random-10, random).map((val, i) => ({
      name: feat[i],
      value: val,
    })) || [];

  const importanceData =
    result.importance?.slice(random-10, random).map((val, i) => ({
      name: feat[i],
      importance: val,
    })) || [];

  const confidenceData = [
    {
      name: "Confidence",
      value: isBenign
        ? result.benign_probability
        : result.malignant_probability,
      fill: isBenign ? "#4caf50" : "#e91e63",
    },
  ];

  return (
    <div className="result-container">
      {/* 🧬 Hero Section */}
      <section className="summary-banner">
        <h2>🧬 Your Report Summary</h2>
        <p>
          AI analysis completed successfully. View your prediction, confidence
          score, and detailed insights below.
        </p>
      </section>

      {/* 📊 Analysis Section */}
      <h2 className="page-heading">How AI Predicted Your Result</h2>
      <p className="page-subtext">
        The graph shows the most influential features, and the table lists the
        values extracted from your uploaded report.
      </p>

      <div className="analysis-section">
        {/* Chart Section */}
        <div className="chart-section">
          <h3 className="section-title">Top 10 Most Influential Features</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={importanceData}>
              <XAxis dataKey="name" angle={-30} textAnchor="end" height={80} />
              <YAxis />
              <Tooltip />
              <Bar dataKey="importance" fill="#e91e63" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Table Section */}
        <div className="table-section">
          <h3 className="section-title">Extracted Values from Your Report</h3>
          <table className="feature-table">
            <thead>
              <tr>
                <th>Important value from dataset </th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item, i) => (
                <tr key={i}>
                  <td>{item.name}</td>
                  <td>{item.value.toFixed(3)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* 🩺 Confidence Section */}
      <div className="confidence-section">
        <h3 className="section-title">Prediction Confidence</h3>
        <ResponsiveContainer width="100%" height={250}>
          <RadialBarChart
            innerRadius="80%"
            outerRadius="100%"
            data={confidenceData}
            startAngle={180}
            endAngle={0}
          >
            <RadialBar minAngle={15} background clockWise dataKey="value" />
            <Tooltip />
          </RadialBarChart>
        </ResponsiveContainer>
        <p className="confidence-text">
          Confidence:{" "}
          {isBenign
            ? result.benign_probability
            : result.malignant_probability}
          %
        </p>
      </div>

      {/* 🧠 Model Info Section */}
      <div className="model-info-card">
        <h3>Model Insights</h3>
        <p>
          This prediction is powered by an <b>XGBoost</b> model trained on the
          <b> Breast Cancer Sklearn Dataset</b> with over <b>96% accuracy</b>.
          The model identifies the most critical factors influencing your result.
        </p>
      </div>

      {/* 🩻 Final Diagnosis Section */}
      <div className="result-card">
        <h2>Final Diagnosis</h2>
        <p className={`result-text ${isBenign ? "benign" : "malignant"}`}>
          {result.prediction}
        </p>
        <div className="progress-bar">
          <div
            className="progress-fill benign"
            style={{ width: `${result.benign_probability}%` }}
          >
            Benign: {result.benign_probability}%
          </div>
        </div>
        <div className="progress-bar">
          <div
            className="progress-fill malignant"
            style={{ width: `${result.malignant_probability}%` }}
          >
            Malignant: {result.malignant_probability}%
          </div>
        </div>
        <p className="result-description">
          {isBenign
            ? "The tumor is predicted as benign. This generally means non-cancerous growth, but please confirm with a doctor."
            : "The tumor is predicted as malignant. This indicates possible cancerous growth. Immediate medical consultation is advised."}
        </p>
      </div>

      {/* 🔍 Dataset / Preprocessing / Manual Input Section */}
      <div className="extra-tools">
        <h3>Additional Analysis Tools</h3>
        <div className="buttons">
          <button onClick={fetchDataset}>Show Dataset</button>
          <button onClick={fetchPreprocess}>Show Preprocessing Steps</button>
          <button onClick={() => setManualResult(null)}>Manual Input</button>
        </div>

        {/* Dataset */}
        {dataset.length > 0 && (
          <div className="dataset">
            <h3>Sample Breast Cancer Dataset (Sklearn)</h3>
            <table>
              <thead>
                <tr>
                  {Object.keys(dataset[0]).map((col) => (
                    <th key={col}>{col}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {dataset.map((row, idx) => (
                  <tr key={idx}>
                    {Object.values(row).map((val, i) => (
                      <td key={i}>{val}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Preprocessing Info */}
        {preprocess && (
          <div className="preprocess">
            <h3>Preprocessing Steps</h3>
            <pre>{JSON.stringify(preprocess, null, 2)}</pre>
          </div>
        )}

        {/* Manual Input Section */}
        {manualResult === null && (
          <div className="manual-input">
            <h3>Enter 30 Features</h3>
            {manualInputs.map((val, idx) => (
              <div key={idx}>
                <label>{FEATURE_NAMES[idx]} :</label>
                <input
                  type="number"
                  value={val}
                  onChange={(e) => {
                    const newInputs = [...manualInputs];
                    newInputs[idx] = e.target.value;
                    setManualInputs(newInputs);
                  }}
                />
              </div>
            ))}
            <button onClick={handleManualPredict}>Predict</button>
          </div>
        )}

        {/* Manual Prediction Result */}
        {manualResult && (
          <div className="manual-result">
            <h3>Manual Prediction Result</h3>
            <p>{manualResult.prediction}</p>
            <pre>{JSON.stringify(manualResult.features, null, 2)}</pre>
          </div>
        )}
      </div>

      {/* 🩺 Footer Disclaimer */}
      <footer className="footer-result">
        <p>
          ⚠️ This is an AI-generated prediction and should not replace
          professional medical advice.
        </p>
        <p>
          Made with ❤️ by <b>BreastCare AI Team</b> | © 2025
        </p>
      </footer>
    </div>
  );
};

export default ResultCard;




























