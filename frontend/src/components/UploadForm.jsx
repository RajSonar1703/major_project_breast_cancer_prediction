import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
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
      setLoading(true);
      const res = await axios.post("http://localhost:8000/predict-pdf/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResult(res.data);
      navigate("/result");
    } catch (error) {
      console.error("Error:", error);
      setResult({ prediction: "Error", error: "Upload failed or model error" });
      navigate("/result");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-simple-container">
      <h2>Upload Medical Report (PDF)</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="file"
          accept="application/pdf"
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br /><br />
        <button className="simple-btn" type="submit" disabled={loading}>
          {loading ? "Processing..." : "Upload & Predict"}
        </button>
      </form>

      {file && <p className="file-name">Selected File: {file.name}</p>}
    </div>
  );
}
