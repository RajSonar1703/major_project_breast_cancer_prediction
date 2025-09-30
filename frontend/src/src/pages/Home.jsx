import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
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

