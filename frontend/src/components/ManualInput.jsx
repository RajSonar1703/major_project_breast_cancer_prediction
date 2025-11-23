
// import { useState } from "react";
// import axios from "axios";
// import "../App.css";

// export default function ManualInput() {
//   const FEATURE_NAMES = [
//     "mean radius","mean texture","mean perimeter","mean area","mean smoothness",
//     "mean compactness","mean concavity","mean concave points","mean symmetry","mean fractal dimension",
//     "radius error","texture error","perimeter error","area error","smoothness error",
//     "compactness error","concavity error","concave points error","symmetry error","fractal dimension error",
//     "worst radius","worst texture","worst perimeter","worst area","worst smoothness",
//     "worst compactness","worst concavity","worst concave points","worst symmetry","worst fractal dimension"
//   ];

//   const [features, setFeatures] = useState(Array(30).fill(""));
//   const [result, setResult] = useState(null);
//   const [loading, setLoading] = useState(false);

//   const handleChange = (index, value) => {
//     const updated = [...features];
//     updated[index] = value;
//     setFeatures(updated);
//   };

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
//       console.error(error);
//       setResult({ prediction: "Error", error: "Prediction failed" });
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="manual-input-container">
//       <h2>Manual Input for Prediction</h2>
//       <form onSubmit={handleSubmit}>
//         {FEATURE_NAMES.map((name, i) => (
//           <div key={i} className="input-row">
//             <label htmlFor={`feature-${i}`}><b>{name}</b></label>
//             <input
//               id={`feature-${i}`}
//               type="number"
//               step="any"
//               placeholder={`Enter ${name}`}
//               value={features[i]}
//               onChange={(e) => handleChange(i, e.target.value)}
//               required
//             />
//           </div>
//         ))}
//         <button type="submit" disabled={loading}>
//           {loading ? "Predicting..." : "Predict"}
//         </button>
//       </form>

//       {result && (
//         <div className="manual-result">
//           <h3>Prediction Result: {result.prediction}</h3>
//           <p>Benign Probability: {result.benign_probability}%</p>
//           <p>Malignant Probability: {result.malignant_probability}%</p>

//           <h4>Feature Values Entered:</h4>
//           <table className="feature-table">
//             <thead>
//               <tr>
//                 <th>Feature</th>
//                 <th>Value</th>
//               </tr>
//             </thead>
//             <tbody>
//               {FEATURE_NAMES.map((name, i) => (
//                 <tr key={i}>
//                   <td>{name}</td>
//                   <td>{features[i]}</td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       )}
//     </div>
//   );
// }




import React, { useState } from "react";
import axios from "axios";

export default function BreastCancerPredictor() {
  // 30 features
  const FEATURE_NAMES = [
    "mean radius", "mean texture", "mean perimeter", "mean area", "mean smoothness",
    "mean compactness", "mean concavity", "mean concave points", "mean symmetry", "mean fractal dimension",
    "radius error", "texture error", "perimeter error", "area error", "smoothness error",
    "compactness error", "concavity error", "concave points error", "symmetry error", "fractal dimension error",
    "worst radius", "worst texture", "worst perimeter", "worst area", "worst smoothness",
    "worst compactness", "worst concavity", "worst concave points", "worst symmetry", "worst fractal dimension"
  ];

  const [features, setFeatures] = useState(Array(30).fill(""));
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  // handle input changes
  const handleChange = (index, value) => {
    const updated = [...features];
    updated[index] = value;
    setFeatures(updated);
  };

  // submit features to backend
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (features.some((f) => f === "")) {
      alert("Please fill all 30 feature values!");
      return;
    }

    try {
      setLoading(true);
      const res = await axios.post("http://localhost:8000/predict-manual/", {
        features: features.map(Number),
      });
      setResult(res.data);
    } catch (error) {
      console.error("Prediction failed:", error);
      setResult({ prediction: "Error", benign_probability: 0, malignant_probability: 0 });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: "20px", maxWidth: "900px", margin: "0 auto" }}>
      <h2>AI-Based Breast Cancer Prediction</h2>

      <form onSubmit={handleSubmit} style={{ marginBottom: "30px" }}>
        {FEATURE_NAMES.map((name, idx) => (
          <div key={idx} style={{ marginBottom: "10px" }}>
            <label style={{ display: "block", fontWeight: "bold" }}>
              {idx + 1}. {name}:
            </label>
            <input
              type="number"
              step="any"
              value={features[idx]}
              onChange={(e) => handleChange(idx, e.target.value)}
              style={{ width: "100%", padding: "6px", fontSize: "14px" }}
              required
            />
          </div>
        ))}

        <button type="submit" disabled={loading} style={{ padding: "10px 20px", fontSize: "16px" }}>
          {loading ? "Predicting..." : "Predict"}
        </button>
      </form>

      {/* Result Table */}
      {result && (
        <div style={{ overflowX: "auto" }}>
          <h3>Prediction Result</h3>
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Feature</th>
                <th style={{ border: "1px solid #ddd", padding: "8px" }}>Value</th>
              </tr>
            </thead>
            <tbody>
              {FEATURE_NAMES.map((name, i) => (
                <tr key={i}>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>{name}</td>
                  <td style={{ border: "1px solid #ddd", padding: "8px" }}>
                    {result.features && result.features[i] !== undefined
                      ? result.features[i]
                      : "N/A"}
                  </td>
                </tr>
              ))}
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Prediction</b></td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.prediction}</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Benign Probability</b></td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.benign_probability}%</td>
              </tr>
              <tr>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}><b>Malignant Probability</b></td>
                <td style={{ border: "1px solid #ddd", padding: "8px" }}>{result.malignant_probability}%</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
