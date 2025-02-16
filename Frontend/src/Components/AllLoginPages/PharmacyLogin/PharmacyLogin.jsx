import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Added axios import
import '../AllLogin.css';

const Login = () => {
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
      const response = await axios.post("http://localhost:5000/api/login/inventory_manager_login", formData);

      const userDetails = response.data;
      localStorage.setItem("userDetails", JSON.stringify(userDetails));

      alert("Login Successful!");
      navigate("/pharmacy-dashboard", { state: { userDetails } }); 
    } catch (error) {
      setError("Invalid email or password");
      console.error("Login error:", error);
    }
  };

  return (
    <div className="all-login-container">
      
      <div className="all-login-container">
        <h1>Pharmacy Login</h1>
        <form onSubmit={handleSubmit}>
          <div className="all-login-input-group">
            <label>Email:</label>
            <input
              type="email"
              name="email"
              placeholder="Enter email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
      
          <div className="all-login-input-group">
            <label>Password:</label>
            <input
              type="password"
              name="password"
              placeholder="Enter password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
      
          {error && <p className="all-login-error">{error}</p>}
      
          <button type="submit" className="all-login-button">Login</button>
        <p className="all-login-register-link">
          Don't have an account? <Link to="/pharmacy-registration">Register Now</Link>
        </p>
         </form>
       
      </div>
    </div>
  );
};

export default Login;
