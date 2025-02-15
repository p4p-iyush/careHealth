import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { useLocation } from "react-router-dom";

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
    } catch (err) {
      console.error("Error saving report:", err);
      setError(err.response?.data?.error || "Failed to save the report.");
    }
  };
  
    

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Medical Report Analyzer</h1>
      <input
        type="file"
        accept="application/pdf"
        onChange={handleFileChange}
        className="block mt-2 mb-4"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-500 text-white rounded"
      >
        Analyze Report
      </button>
      {error && (
        <div className="mt-4 p-4 border rounded bg-red-100 text-red-600">
          <strong>Error:</strong> {error}
        </div>
      )}
      {response && (
        <div className="mt-4 p-4 border rounded bg-gray-100">
          <h2 className="text-xl font-semibold">Analysis Report</h2>
          <pre className="whitespace-pre-wrap">{response}</pre>
        </div>
      )}
      <button onClick={() => {handleSave()}}>Save report</button>
    </div>
  );
}

export default MedicalReportAnalyzer;
