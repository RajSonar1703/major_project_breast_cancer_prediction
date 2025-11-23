


import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../App.css";

export default function UploadForm({ setResult }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [dataset, setDataset] = useState([]); // for dataset display
  const navigate = useNavigate();

  // Handle PDF upload and prediction
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

  // Handle dataset fetching
  const handleShowDataset = async () => {
    try {
      const response = await axios.get("http://localhost:8000/show-dataset/");
      setDataset(response.data);
    } catch (error) {
      console.error("Error fetching dataset:", error);
      alert("Failed to fetch dataset from backend");
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

      <hr style={{ margin: "30px 0" }} />

      {/* Show Dataset Button */}
      <button className="simple-btn" onClick={handleShowDataset}>
        Show Dataset
      </button>

      {/* Display dataset if available */}
      {dataset.length > 0 && (
        <div style={{ overflowX: "auto", maxHeight: "400px", marginTop: "20px" }}>
          <table border="1" cellPadding="5" style={{ borderCollapse: "collapse", width: "100%" }}>
            <thead style={{ background: "#007bff", color: "white", position: "sticky", top: 0 }}>
              <tr>
                {Object.keys(dataset[0]).map((col) => (
                  <th key={col}>{col}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {dataset.map((row, i) => ( // show first 50 rows only
                <tr key={i}>
                  {Object.values(row).map((val, j) => (
                    <td key={j}>{val}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
