import { Link } from "react-router-dom";
import "../App.css";

export default function ResultCard({ result }) {
  if (!result || !result.prediction) {
    return (
      <div className="result-container">
        <div className="result-card">
          <h2>No Result Found</h2>
          <Link to="/"><button className="btn">Try Again</button></Link>
        </div>
      </div>
    );
  }

  const isBenign = result.prediction.includes("Benign");

  return (
    <div className="result-container">
      <div className="result-card">
        <h2>Prediction Result</h2>
        <p className="result-label">Diagnosis:</p>
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
          *This is a machine-generated prediction. Please consult a medical professional for confirmation.
        </p>
        <Link to="/">
          <button className="btn">Upload Another Report</button>
        </Link>
      </div>
    </div>
  );
}

