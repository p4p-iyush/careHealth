import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientLogin.css";

export default function PatientLogin() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError("Both fields are required!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/login/patient_login", formData);

      // Assuming 'response.data' contains the user details
      const userDetails = response.data;
      // console.log("User details:", userDetails);

      // Store user data in localStorage (optional)
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      alert("Login Successful!");

      // Pass the response data to the next page using navigate
      navigate("/patient-dashboard", { state: { userDetails } }); // Passing user details as state
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="login-container">
      <h2>Patient Login</h2>
      <form onSubmit={handleSubmit}>
        {error && <p className="error-message">{error}</p>}

        <div className="input-group">
          <label>Email:</label>
          <input 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            required 
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            required 
          />
        </div>

        <button type="submit" className="login-button">Login</button>
      </form>

      <p className="register-link">
        Don't have an account? <Link to="/patient-registration">Register Now</Link>
      </p>
    </div>
  );
}
