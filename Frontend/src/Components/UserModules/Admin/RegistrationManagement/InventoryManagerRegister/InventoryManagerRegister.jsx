import React, { useState } from "react";
import './InventoryManagerRegister.css'
const InventoryManagerRegister = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirmPassword: "",
    department: "",
    yearsOfExperience: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Submitted", formData);
  };

  return (
    <div className="inventrymanagerregister-container">
      <h1 className="inventrymanagerregister-title">Inventory Manager Register</h1>
      <form className="inventrymanagerregister-form" onSubmit={handleSubmit}>
        <label className="inventrymanagerregister-label" htmlFor="name">
          Full Name:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="contact">
          Contact Number:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="tel"
          id="contact"
          name="contact"
          value={formData.contact}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="email">
          Email:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="password">
          Password:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="confirmPassword">
          Confirm Password:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="password"
          id="confirmPassword"
          name="confirmPassword"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="department">
          Department:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="text"
          id="department"
          name="department"
          value={formData.department}
          onChange={handleChange}
          required
        />

        <label className="inventrymanagerregister-label" htmlFor="yearsOfExperience">
          Years of Experience:
        </label>
        <input
          className="inventrymanagerregister-input"
          type="number"
          id="yearsOfExperience"
          name="yearsOfExperience"
          value={formData.yearsOfExperience}
          onChange={handleChange}
          required
        />

        <button className="inventrymanagerregister-button" type="submit">
          Register
        </button>
      </form>
      <p className="inventrymanagerregister-login-text">
        Already have an account? <a href="inventory_manager_login.html">Login</a>
      </p>
    </div>
  );
};

export default InventoryManagerRegister;