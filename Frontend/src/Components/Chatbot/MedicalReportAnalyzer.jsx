import React, { useState } from "react";
import axios from "axios";

function MedicalReportAnalyzer() {
  const [file, setFile] = useState(null);
  const [response, setResponse] = useState("");
  const [error, setError] = useState("");

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    setError("");
    setResponse("");
  };

  const handleSubmit = async () => {
    if (!file) {
      alert("Please upload a PDF file.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await axios.post("http://127.0.0.1:3000/analyze-report", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setResponse(res.data.response);
    } catch (err) {
      console.error("Error analyzing report:", err);
      setError(err.response?.data?.error || "Failed to analyze the report.");
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
    </div>
  );
}

export default MedicalReportAnalyzer;
