import React, { useState } from "react";
import './DoctorRegistration.css'
const DoctorRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    specialization: "",
    experience: "",
    qualification: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
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
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="doctor-registration-label" htmlFor="specialization">
          Specialization:
        </label>
        <input
          className="doctor-registration-input"
          type="text"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />

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
