import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './PharmacyRegistration.css';

const PharmacyRegistration = () => {
  const [formData, setFormData] = useState({
    name: "",
    contact: "",
    email: "",
    password: "",
    confirm_password: "", // Ensure correct naming
    department: "",
    yearsOfExperience: "", // Ensure it's converted to number before sending
  });

  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: name === "yearsOfExperience" ? (value ? Number(value) : "") : value, // Convert to number only if value exists
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirm_password) {
      setError("Passwords do not match!");
      return;
    }

    // Ensure yearsOfExperience is not an empty string
    if (!formData.yearsOfExperience) {
      setError("Years of Experience is required.");
      return;
    }

    try {
      const payload = {
        ...formData,
        years_of_experience: Number(formData.yearsOfExperience), // Match backend naming
    };
    

      const response = await axios.post("http://localhost:5000/inventory_register", payload);
      alert(response.data.message || "Registration Successful!");
      navigate("/pharmacy-login"); 
    } catch (error) {
      setError(error.response?.data?.message || "Registration failed. Try again.");
      console.error("Error details:", error.response?.data);
    }
  };

  return (
    <div className="inventory-manager-register-container">
      <h1 className="inventory-manager-register-title">Inventory Manager Register</h1>
      {error && <p className="error-message">{error}</p>}
      <form className="inventory-manager-register-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Full Name:</label>
        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

        <label htmlFor="contact">Contact Number:</label>
        <input type="tel" id="contact" name="contact" value={formData.contact} onChange={handleChange} required />

        <label htmlFor="email">Email:</label>
        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

        <label htmlFor="password">Password:</label>
        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />

        <label htmlFor="confirm_password">Confirm Password:</label>
        <input type="password" id="confirm_password" name="confirm_password" value={formData.confirm_password} onChange={handleChange} required />

        <label htmlFor="department">Department:</label>
        <input type="text" id="department" name="department" value={formData.department} onChange={handleChange} required />

        <label htmlFor="yearsOfExperience">Years of Experience:</label>
        <input type="number" id="yearsOfExperience" name="yearsOfExperience" value={formData.yearsOfExperience} onChange={handleChange} required />

        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <a href="/pharmacy-login">Login</a>
      </p>
    </div>
  );
};

export default PharmacyRegistration;
