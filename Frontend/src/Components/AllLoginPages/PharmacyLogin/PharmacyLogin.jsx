import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";  // ✅ Added axios import

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
      const response = await axios.post("http://localhost:5000/inventory_manager_login", formData);

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
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"  // ✅ Added name attribute
            placeholder="Enter email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="input-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"  // ✅ Added name attribute
            placeholder="Enter password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        {error && <p className="error">{error}</p>}

        <button type="submit">Login</button>
      </form>
      <p className="register-link">
        Don't have an account? <Link to="/pharmacy-registration">Register Now</Link>
      </p>
    </div>
  );
};

export default Login;
