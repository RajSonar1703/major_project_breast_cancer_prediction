


// import React, { useState } from "react";
// import axios from "axios";

// export default function BreastCancerPredictor() {
//   // 30 features
//   const FEATURE_NAMES = [
//     "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
//     "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension",
//     "radius error", "texture error", "perimeter error", "area error", "smoothness error",
//     "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error",
//     "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness",
//     "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"
//   ];

//   const [features, setFeatures] = useState(Array(30).fill(""));
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   // handle input changes
//   const handleChange = (index, value) => {
//     const updated = [...features];
//     updated[index] = value;
//     setFeatures(updated);
//   };

//   // submit features to backend
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (features.some((f) => f === "")) {
//       alert("Please fill all 30 feature values!");
//       return;
//     }

//     try {
//       setLoading(true);
//       const res = await axios.post("http://localhost:8000/predict-manual/", {
//         features: features.map(Number),
//       });
//       setResult(res.data);
//     } catch (error) {
//       console.error("Prediction failed:", error);
//       setResult({ prediction: "Error", benign_probability: 0, malignant_probability: 0 });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
//       <h2>AI-Based Breast Cancer Prediction</h2>

//       <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
//         {FEATURE_NAMES.map((name, idx) => (
//           <div key={idx} style={{ marginBottom: "10px" }}>
//             <label style={{ display: "block", fontWeight: "bold" }}>
//               {idx + 1}. {name}:
//             </label>
//             <input
//               type="number"
//               step="any"
//               value={features[idx]}
//               onChange={(e) => handleChange(idx, e.target.value)}
//               style={{ width: "100%", padding: "6px", fontSize: "14px" }}
//               required
//             />
//           </div>
//         ))}

//         <button type="submit" disabled={loading} style={{ padding: "10px 20px", fontSize: "16px" }}>
//           {loading ? "Predicting..." : "Predict"}
//         </button>
//       </form>

//       {/* Result Table */}
//       {result && (
//         <div style={{ overflowX: "auto" }}>
//           <h3>Prediction Result</h3>
//           <table style={{ width: "100%", borderCollapse: "collapse" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>Feature</th>
//                 <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {FEATURE_NAMES.map((name, i) => (
//                 <tr key={i}>
//                   <td style={{ border: "1px solid #ddd", padding: "8px" }}>{name}</td>
//                   <td style={{ border: "1px solid #ddd", padding: "8px" }}>
//                     {result.features && result.features[i] !== undefined
//                       ? result.features[i]
//                       : "N/A"}
//                   </td>
//                 </tr>
//               ))}
//               <tr>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Prediction</b></td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.prediction}</td>
//               </tr>
//               <tr>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Benign Probability</b></td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.benign_probability}%</td>
//               </tr>
//               <tr>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Malignant Probability</b></td>
//                 <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.malignant_probability}%</td>
//               </tr>
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }










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

export default function ManualInput() {
  const API_URL = "https://major-project-breast-cancer-prediction.onrender.com"
  // const API_URL = "http://127.0.0.1:8000";

  const FEATURE_NAMES = [
    "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
    "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension",
    "radius error", "texture error", "perimeter error", "area error", "smoothness error",
    "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error",
    "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness",
    "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"
  ];

  const [manualInputs, setManualInputs] = useState(Array(30).fill(""));
  const [manualResult, setManualResult] = useState(null);
  const [dataset, setDataset] = useState([]);
  const [preprocess, setPreprocess] = useState(null);

  // Handle manual input changes
  const handleChange = (index, value) => {
    const updatedInputs = [...manualInputs];
    updatedInputs[index] = value;
    setManualInputs(updatedInputs);
  };

  // Manual Prediction
  const handleManualPredict = async () => {
    if (manualInputs.some((v) => v === "")) {
      alert("Please fill all 30 feature values!");
      return;
    }

    try {
      const res = await fetch(`${API_URL}/predict-manual/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ features: manualInputs.map(Number) }),
      });

      const data = await res.json();
      setManualResult(data);

    } catch (error) {
      console.error("Manual prediction failed:", error);
      alert("Prediction failed. Check console.");
    }
  };

  // Fetch dataset
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

  return (
    <div className="container">
      <h2 className="title">Manual Input Prediction</h2>

      {/* Manual Input Fields */}
      <div className="manual-input-container">
        {FEATURE_NAMES.map((name, idx) => (
          <div key={idx} className="input-item">
            <label><b>{idx + 1}. {name}</b></label>
            <input
              type="number"
              step="any"
              value={manualInputs[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              className="input-box"
            />
          </div>
        ))}

        <button className="predict-btn" onClick={handleManualPredict}>
          Predict
        </button>
      </div>

      {/* Prediction Result */}
      {manualResult && (
        <div className="result-section">
          <h3>Prediction Result</h3>

          <table className="result-table">
            <thead>
              <tr>
                <th>Feature</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_NAMES.map((name, idx) => (
                <tr key={idx}>
                  <td>{name}</td>
                  <td>{manualResult.features ? manualResult.features[idx] : "N/A"}</td>
                </tr>
              ))}
              <tr>
                <td><b>Prediction</b></td>
                <td>{manualResult.prediction}</td>
              </tr>
              <tr>
                <td><b>Benign Probability</b></td>
                <td>{manualResult.benign_probability}%</td>
              </tr>
              <tr>
                <td><b>Malignant Probability</b></td>
                <td>{manualResult.malignant_probability}%</td>
              </tr>
            </tbody>
          </table>

          {/* Radial Chart */}
          <div className="chart-container">
            <ResponsiveContainer width="50%" height={250}>
              <RadialBarChart
                cx="50%"
                cy="50%"
                innerRadius="20%"
                outerRadius="90%"
                data={[
                  { name: "Benign", value: manualResult.benign_probability },
                  { name: "Malignant", value: manualResult.malignant_probability },
                ]}
              >
                <RadialBar dataKey="value" cornerRadius={5} />
                <Tooltip />
              </RadialBarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* Dataset Section */}
      <div className="dataset-section">
        <h3>Dataset</h3>
        <button onClick={fetchDataset} className="small-btn">Load Dataset</button>
        {dataset.length > 0 && (
          <pre className="dataset-box">{JSON.stringify(dataset, null, 2)}</pre>
        )}
      </div>

      {/* Preprocessing Section */}
      <div className="preprocess-section">
        <h3>Preprocessing Steps</h3>
        <button onClick={fetchPreprocess} className="small-btn">Load Steps</button>
        {preprocess && (
          <pre className="dataset-box">{JSON.stringify(preprocess, null, 2)}</pre>
        )}
      </div>

      <Link to="/" className="back-btn">Back to Home</Link>
    </div>
  );
}
