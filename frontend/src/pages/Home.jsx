import { Link } from "react-router-dom";
import "../App.css";

export default function Home() {
  return (
    <div className="home">
      <div className="section" style={{backgroundColor:"#fce7f3", padding:"80px 0px"}}>
      <h2 style={{fontWeight:"bold", fontSize:"45px"}}>AI-based Breast Cancer Detection</h2>
      <p>Empowering early diagnosis using Machine Learning. Upload your report and get instant insights.</p>
      <Link to="/upload">
        <button className="btn">Start Detection</button>
      </Link>
      </div>

      <section>
      <div className="features">
        <div className="feature">
          <h3>Upload Report</h3>
          <p>Easily upload your medical report in PDF format or manually enter key parameters like mean radius, texture, perimeter, area, and more. Our system supports both scanned documents and typed data to ensure flexibility and ease of use.</p>
        </div>
        <div className="feature">
          <h3>AI Prediction</h3>
          <p>Once the data is uploaded, our advanced machine learning model gets to work. It analyzes the key features extracted from your report to predict whether the tumor is benign or malignant. The system ensures quick, accurate, and transparent predictions using state-of-the-art algorithms.</p>
        </div>
        <div className="feature">
          <h3>Get Results</h3>
          <p>Your results are displayed in an intuitive format, showing the prediction outcome, confidence level, and suggested next steps. You’ll also receive visual cues to better understand the risk level, helping you make informed decisions or consult a specialist if needed.</p>
        </div>
      </div>
      </section>
    </div>
  );
}

