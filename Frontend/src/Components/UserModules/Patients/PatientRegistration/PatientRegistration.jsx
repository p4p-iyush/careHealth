import React, { useState } from "react";

const PatientRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    bloodGroup: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="patientregistration-container">
      <h1 className="patientregistration-title">Patient Register</h1>
      <form className="patientregistration-form" onSubmit={handleSubmit}>
        <label className="patientregistration-label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="patientregistration-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="age">
          Age:
        </label>
        <input
          className="patientregistration-input"
          type="number"
          id="age"
          name="age"
          value={formData.age}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="gender">
          Gender:
        </label>
        <select
          className="patientregistration-input"
          id="gender"
          name="gender"
          value={formData.gender}
          onChange={handleChange}
          required
        >
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>

        <label className="patientregistration-label" htmlFor="contact">
          Contact Number:
        </label>
        <input
          className="patientregistration-input"
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="email">
          Email:
        </label>
        <input
          className="patientregistration-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="password">
          Password:
        </label>
        <input
          className="patientregistration-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className="patientregistration-input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="patientregistration-label" htmlFor="bloodGroup">
          Blood Group:
        </label>
        <select
          className="patientregistration-input"
          id="bloodGroup"
          name="bloodGroup"
          value={formData.bloodGroup}
          onChange={handleChange}
        >
          <option value="A+">A+</option>
          <option value="A-">A-</option>
          <option value="B+">B+</option>
          <option value="B-">B-</option>
          <option value="O+">O+</option>
          <option value="O-">O-</option>
          <option value="AB+">AB+</option>
          <option value="AB-">AB-</option>
        </select>

        <label className="patientregistration-label" htmlFor="address">
          Address:
        </label>
        <textarea
          className="patientregistration-input"
          id="address"
          name="address"
          value={formData.address}
          onChange={handleChange}
        ></textarea>

        <button className="patientregistration-button" type="submit">
          Register
        </button>
      </form>
      <p className="patientregistration-login-text">
        Already have an account? <a href="login.html">Login</a>
      </p>
    </div>
  );
};

export default PatientRegister;
