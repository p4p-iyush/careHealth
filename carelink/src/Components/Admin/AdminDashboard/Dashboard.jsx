// Dashboard.js
import './Dashboard.css';
import React from 'react';
import { FaUserShield, FaUserInjured, FaUserMd, FaPills, FaCalendarCheck, FaHospital, FaBoxes, FaComments, FaAmbulance } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <FaUserShield className="icon-header" />
        <h1>Admin Dashboard</h1>
      </div>
      <div className="dashboard-cards-row">
      <div className="dashboard-card">
          <FaHospital className="icon" />
          <div className="card-title">Manage Hospital Details</div>
        </div>
        <div className="dashboard-card">
          <FaUserMd className="icon" />
          <div className="card-title">Manage Doctor Details</div>
        </div>
        <div className="dashboard-card">
          <FaPills className="icon" />
          <div className="card-title">Manage Pharmacist Details</div>
        </div>
        <div className="dashboard-card">
          <FaUserInjured className="icon" />
          <div className="card-title">Manage Patient Details</div>
        </div> 
        <div className="dashboard-card">
          <FaCalendarCheck className="icon" />
          <div className="card-title">Manage Appointments</div>
        </div>
        <div className="dashboard-card">
        <FaAmbulance className="icon" />
          <div className="card-title">Manage Emergencies</div>
        </div>
        <div className="dashboard-card">
          <FaBoxes className="icon" />
          <div className="card-title">Manage Inventory</div>
        </div>
        <div className="dashboard-card">
          <FaComments className="icon" />
          <div className="card-title">User Feedback</div>
        </div>
      </div>
    </div>
  );
}
