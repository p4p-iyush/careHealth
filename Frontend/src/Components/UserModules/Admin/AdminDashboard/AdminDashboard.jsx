// Dashboard.js
import './AdminDashboard.css';
import React from 'react';
import { FaUserShield, FaUserInjured, FaUserMd, FaPills, FaCalendarCheck, FaHospital, FaBoxes, FaComments, FaAmbulance } from 'react-icons/fa';

export default function Dashboard() {
  return (
    <div className="admindashboard">
      <div className="admindashboard-header">
        <FaUserShield className="admindashboard-icon-header" />
        <h1 className="admindashboard-title">Admin Dashboard</h1>
      </div>
      <div className="admindashboard-cards-row">
        <div className="admindashboard-card">
          <FaHospital className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Hospital Details</div>
        </div>
        <div className="admindashboard-card">
          <FaUserMd className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Doctor Details</div>
        </div>
        <div className="admindashboard-card">
          <FaPills className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Pharmacist Details</div>
        </div>
        <div className="admindashboard-card">
          <FaUserInjured className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Patient Details</div>
        </div>
        <div className="admindashboard-card">
          <FaCalendarCheck className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Appointments</div>
        </div>
        <div className="admindashboard-card">
          <FaAmbulance className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Emergencies</div>
        </div>
        <div className="admindashboard-card">
          <FaBoxes className="admindashboard-icon" />
          <div className="admindashboard-card-title">Manage Inventory</div>
        </div>
        <div className="admindashboard-card">
          <FaComments className="admindashboard-icon" />
          <div className="admindashboard-card-title">User Feedback</div>
        </div>
      </div>
    </div>
  );
}
