import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ApplyBed.css";

const ApplyBed = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    department: "General Medicine",
    bedType: "General",
  });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false); // To show a loading state during the request

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Start loading when the form is submitted
    try {
      const res = await axios.post("http://localhost:5000/api/beds/apply-bed", formData);
      setMessage(`Bed allocated successfully: ${res.data.bedNumber}`);
      navigate(-1);
    } catch (err) {
      const errorMessage = err.response
        ? err.response.data?.message || "Error applying for bed"
        : "Network error or server unavailable";
      setMessage(errorMessage);
    } finally {
      setLoading(false); // Stop loading after the request is finished
    }
  };

  return (
    <div className="apply-bed-container">
      <h1>Apply for Bed</h1>
      <form onSubmit={handleSubmit} className="apply-bed-form">
        <input
          type="text"
          placeholder="Name"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          required
        />
        <select
          value={formData.department}
          onChange={(e) => setFormData({ ...formData, department: e.target.value })}
        >
          <option>General Medicine</option>
          <option>Cardiology</option>
          <option>Neurology</option>
          <option>Orthopedics</option>
          <option>Pediatrics</option>
        </select>
        <select
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
