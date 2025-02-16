import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./PatientRegistration.css";

export default function PatientRegister() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    confirm_password: "",
    bloodGroup: "",
    address: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/api/register/patient_register", formData);
      alert(response.data); // Show success message
      navigate("/patient-login"); // Redirect to login page
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
      console.error("Error details:", error.response?.data);
    }
    
  };

  return (
    <div className="patient-reg-container">
  <h2 className="patient-reg-title">Patient Registration</h2>
 <div className="patient-form-cantainer">
  <form className=".patient-reg-form" onSubmit={handleSubmit}>
    {error && <p className="patient-reg-error-message">{error}</p>}

    <label htmlFor="name" className="patient-reg-label">Name:</label>
    <input
      type="text"
      name="name"
      className="patient-reg-input"
      placeholder="Name"
      onChange={handleChange}
      required
    />

    <label htmlFor="age" className="patient-reg-label">Age:</label>
    <input
      type="number"
      name="age"
      className="patient-reg-input"
      placeholder="Age"
      onChange={handleChange}
      required
    />

    <label htmlFor="gender" className="patient-reg-label">Gender:</label>
    <select
      name="gender"
      className="patient-reg-input"
      onChange={handleChange}
      required
    >
      <option value="">Select Gender</option>
      <option value="Male">Male</option>
      <option value="Female">Female</option>
      <option value="Other">Other</option>
    </select>

    <label htmlFor="contact" className="patient-reg-label">Contact:</label>
    <input
      type="text"
      name="contact"
      className="patient-reg-input"
      placeholder="Contact"
      onChange={handleChange}
      required
    />

    <label htmlFor="email" className="patient-reg-label">Email:</label>
    <input
      type="email"
      name="email"
      className="patient-reg-input"
      placeholder="Email"
      onChange={handleChange}
      required
    />

    <label htmlFor="password" className="patient-reg-label">Password:</label>
    <input
      type="password"
      name="password"
      className="patient-reg-input"
      placeholder="Password"
      onChange={handleChange}
      required
    />

    <label htmlFor="confirm_password" className="patient-reg-label">Confirm Password:</label>
    <input
      type="password"
      name="confirm_password"
      className="patient-reg-input"
      placeholder="Confirm Password"
      onChange={handleChange}
      required
    />

    <label htmlFor="bloodGroup" className="patient-reg-label">Blood Group:</label>
    <select
      name="bloodGroup"
      className="patient-reg-input"
      onChange={handleChange}
      required
    >
      <option value="">Select Blood Group</option>
      <option value="A+">A+</option>
      <option value="A-">A-</option>
      <option value="B+">B+</option>
      <option value="B-">B-</option>
      <option value="O+">O+</option>
      <option value="O-">O-</option>
      <option value="AB+">AB+</option>
      <option value="AB-">AB-</option>
    </select>

    <label htmlFor="address" className="patient-reg-label">Address:</label>
    <input
      type="text"
      name="address"
      className="patient-reg-input"
      placeholder="Address"
      onChange={handleChange}
      required
    />

    <button type="submit" className="patient-reg-button">Register</button>
  </form>
  </div>
  </div>



  );
}
