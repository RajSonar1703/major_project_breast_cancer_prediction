// import { Link } from "react-router-dom";
// import "../App.css";

// export default function ResultCard({ result }) {
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

import { Link } from "react-router-dom";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
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

  return (
    <div className="result-container">
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

      {/* Final result below */}
      <div className="result-card" style={{marginBottom: "20px"}}>
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
        <p className="disclaimer">
          *This is an AI-generated prediction based on your report. Please
          consult a doctor for professional advice.
        </p>
        <Link to="/">
          <button className="btn">Upload Another Report</button>
        </Link>
      </div>
    </div>
  );
}
