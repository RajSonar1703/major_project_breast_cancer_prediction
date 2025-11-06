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

export default function ResultCard({ result }) {
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

  const data =
    result.features?.slice(0, 10).map((val, i) => ({
      name: FEATURE_NAMES[i],
      value: val,
    })) || [];

  const importanceData =
    result.importance?.slice(0, 10).map((val, i) => ({
      name: FEATURE_NAMES[i],
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
                <th>Feature</th>
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
        <div className="btn-group">
          <Link to="/upload">
            <button className="btn">Upload Another Report</button>
          </Link>
        </div>
      </div>

      {/* 🩺 Disclaimer */}
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
}









