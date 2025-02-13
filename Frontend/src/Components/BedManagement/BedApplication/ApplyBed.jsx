import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./ApplyBed.css";

const ApplyBed = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { patient, doctor } = location.state || {}; // Extract patient and doctor details

  const [formData, setFormData] = useState({
    name: patient?.name || "",
    contact: patient?.contact || "",
    department: "General Medicine",
    bedType: "General",
    doctorId: doctor?._id || "",
    doctorname: doctor?.name || "", // Optional: Storing assigned doctor name
  });

  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/beds/apply-bed", {
        ...formData,
        patientId: patient?.id, // Include patient ID if available
        doctorId: doctor?._id, // Include doctor ID if available
      });
      setMessage(`Bed allocated successfully: ${res.data.bedNumber}`);
      navigate(-1);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data?.message || "Error applying for bed"
        : "Network error or server unavailable";
      setMessage(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="apply-bed-container">
      <h1>Apply for Bed</h1>
      <form onSubmit={handleSubmit} className="apply-bed-form">
        <label htmlFor="name">Patient Name:</label>
        <input
          type="text"
          id="name"
          placeholder="Enter patient name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />

        <label htmlFor="contact">Contact Number:</label>
        <input
          type="text"
          id="contact"
          placeholder="Enter contact number"
          value={formData.contact}
          onChange={(e) => setFormData({ ...formData, contact: e.target.value })}
          required
        />

        <label htmlFor="department">Department:</label>
        <select
          id="department"
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        >
          <option>General Medicine</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>Pediatrics</option>
        </select>

        <label htmlFor="bedType">Bed Type:</label>
        <select
          id="bedType"
          value={formData.bedType}
          onChange={(e) => setFormData({ ...formData, bedType: e.target.value })}
        >
          <option>General</option>
          <option>Private</option>
          <option>ICU</option>
        </select>

        <button type="submit" disabled={loading}>
          {loading ? "Applying..." : "Apply"}
        </button>
      </form>

      {message && <p className="apply-message">{message}</p>}
    </div>
  );
};

export default ApplyBed;
