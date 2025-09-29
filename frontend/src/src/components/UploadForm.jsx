import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Please select a PDF file!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://localhost:8000/predict-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      navigate("/result");
    } catch (error) {
      console.error("Error:", error);
      setResult({ prediction: "Error", error: "Upload failed or model error" });
      navigate("/result");
    }
  };

  return (
    <div className="upload-container">
      <h2>Upload Medical Report (PDF)</h2>
      <input type="file" accept="application/pdf" onChange={(e) => setFile(e.target.files[0])} />
      <button className="btn" onClick={handleSubmit}>Upload & Predict</button>
    </div>
  );
}

