import "../App.css";

export default function About() {
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

