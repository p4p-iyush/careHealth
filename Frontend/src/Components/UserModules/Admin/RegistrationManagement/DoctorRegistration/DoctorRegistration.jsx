import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './DoctorRegistration.css'
const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirm_Password: "",
    specialization: "",
    experience: "",
    qualification: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);  // Debug log

    if (formData.password !== formData.confirm_Password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/doctor_register", formData);
      console.log("Response received:", response.data);  // Debug log
      alert(response.data);
      navigate("/doctor-login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
      console.error("Error details:", error.response?.data);
    }
  };


  return (
    <div className="doctor-registration-container">
      <h1 className="doctor-registration-title">Doctor Register</h1>
      <form className="doctor-registration-form" onSubmit={handleSubmit}>
        <label className="doctor-registration-label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="doctor-registration-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="contact">
          Contact Number:
        </label>
        <input
          className="doctor-registration-input"
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="email">
          Email:
        </label>
        <input
          className="doctor-registration-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="password">
          Password:
        </label>
        <input
          className="doctor-registration-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className="doctor-registration-input"
          type="password"
          id="confirm_Password"
          name="confirm_Password"
          value={formData.confirm_Password}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="specialization">
          Specialization:
        </label>
        <select
          className="doctor-registration-input"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Select Department</option>
          <option value="Cardiology">Cardiology</option>
          <option value="Neurology">Neurology</option>
          <option value="Orthopedics">Orthopedics</option>
          <option value="Pediatrics">Pediatrics</option>
          <option value="General Medicine">General Medicine</option>

        </select>

        <label className="doctor-registration-label" htmlFor="experience">
          Years of Experience:
        </label>
        <input
          className="doctor-registration-input"
          type="number"
          id="experience"
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="qualification">
          Qualification:
        </label>
        <input
          className="doctor-registration-input"
          type="text"
          id="qualification"
          name="qualification"
          value={formData.qualification}
          onChange={handleChange}
          required
        />

        <button className="doctor-registration-button" type="submit">
          Register
        </button>
      </form>
      <p className="doctor-registration-login-text">
        Already have an account? <a href="login.html">Login</a>
      </p>
    </div>
  );
};

export default DoctorRegistration;
