import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './admin_registration.css';

const AdminRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirm_Password: "",
    specialization: "",
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting form:", formData);

    if (formData.password !== formData.confirm_Password) {
      setError("Passwords do not match!");
      return;
    }

    try {
      const response = await axios.post("http://localhost:5000/admin_register", formData);
      console.log("Response received:", response.data);
      alert(response.data);
      navigate("/admin-login");
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
      console.error("Error details:", error.response?.data);
    }
  };

  return (
    <div className="admin-registration-container">
      <h1 className="admin-registration-title">Admin Register</h1>
      <form className="admin-registration-form" onSubmit={handleSubmit}>
        <label className="admin-registration-label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="admin-registration-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="admin-registration-label" htmlFor="contact">
          Contact Number:
        </label>
        <input
          className="admin-registration-input"
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label className="admin-registration-label" htmlFor="email">
          Email:
        </label>
        <input
          className="admin-registration-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="admin-registration-label" htmlFor="password">
          Password:
        </label>
        <input
          className="admin-registration-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="admin-registration-label" htmlFor="confirm_Password">
          Confirm Password:
        </label>
        <input
          className="admin-registration-input"
          type="password"
          id="confirm_Password"
          name="confirm_Password"
          value={formData.confirm_Password}
          onChange={handleChange}
          required
        />

        <label className="admin-registration-label" htmlFor="specialization">
          Specialization:
        </label>
        <select
          className="admin-registration-select"
          id="specialization"
          name="specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        >
          <option value="">Select Role</option>
          <option value="Receptionist">Receptionist</option>
          <option value="HR Manager">HR Manager</option>
          <option value="System Administrator">System Administrator</option>
        </select>

        <button className="admin-registration-button" type="submit">
          Register
        </button>
      </form>
    </div>
  );
};

export default AdminRegistration;