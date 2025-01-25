import './LoginPage.css';
import React from 'react';
import { FaUserCog, FaStethoscope, FaUserMd, FaPrescriptionBottleAlt } from 'react-icons/fa';

export default function LoginPage() {
  return (
    <>
      <div className="login-container">
        <h1 className="login-heading">Welcome to the OPD Management System</h1>
        <p className="login-subheading">Choose your login type to proceed</p>
        <div className="login-type-container">
        <div className="login-card">
          <FaUserCog size={50} />
          <span>Admin Login</span>
        </div>
        <div className="login-card">
          <FaStethoscope size={50} />
          <span>Patient Login</span>
        </div>
        <div className="login-card">
          <FaUserMd size={50} />
          <span>Doctor Login</span>
        </div>
        <div className="login-card">
          <FaPrescriptionBottleAlt size={50} />
          <span>Pharmacy Login</span>
        </div>
        </div>
      </div>
    </>
  );
}
