import React, { useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "./MedicalReportAnalyzer.css"

function MedicalReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const location = useLocation(); 
  const navigate = useNavigate();
  const { userDetails } = location.state || {}; 

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
    setResponse("");
  };

  console.log("User Details:", userDetails.patient._id);

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      // Step 1: Send file to backend for analysis
      const res = await axios.post("http://127.0.0.1:3000/analyze-report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setResponse(res.data.response); // ✅ Store the analyzed report
    } catch (err) {
      console.error("Error:", err);
      setError(err.response?.data?.error);
    }
  };

  const handleSave = async () => {
    if (!response) {
      alert("Please analyze the report first.");
      return;
    }
    if (!userDetails || !userDetails.patient || !userDetails.patient._id) {
      setError("User details missing.");
      return;
    }
  
    try {
      // Step 2: Send analyzed report details to MongoDB
      const saveResponse = await axios.post("http://localhost:5000/api/chatbot/save-report", {
        patientId: userDetails.patient._id,  // ✅ Fixed: Access correct patient ID
        reportDetails: response,  // ✅ Fixed: Use correct state variable
      });
  
      console.log("Report saved:", saveResponse.data.message);
      alert("Report saved successfully!");
      navigate(-1);
    } catch (err) {
      console.error("Error saving report:", err);
      setError(err.response?.data?.error || "Failed to save the report.");
    }
  };
  
    

  return (
    <div className="medi-analyser-container">
    <div className="medi-analyser">
    <h1 className="medi-analyser-title">Medical Report Analyzer</h1>
  
  <input
    type="file"
    accept="application/pdf"
    onChange={handleFileChange}
    className="medi-analyser-input"
  />
  
  <button
    onClick={handleSubmit}
    className="medi-analyser-btn"
  >
    Analyze Report
  </button>

  {error && (
    <div className="medi-analyser-error">
      <strong>Error:</strong> {error}
    </div>
  )}

  {response && (
    <div className="medi-analyser-report">
      <h2 className="medi-analyser-subtitle">Analysis Report</h2>
      <pre className="medi-analyser-pre">{response}</pre>
    </div>
  )}

  <button onClick={handleSave} className="medi-analyser-save-btn">
    Save Report
  </button>
</div>
</div>
);
}

export default MedicalReportAnalyzer;
