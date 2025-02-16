import React from 'react';
import { Link } from 'react-router-dom';
import './PharmacyDashboard.css';


const LandingPage = () => {
    return (
        <div className="Pharmacydash">
        <div className="pharmacy-dash-container">
        <h1 className="pharmacy-dash-heading">Welcome, Pharmacist</h1>
        <div className="pharmacy-dash-options-container">
            <Link to="/patient-list" className="pharmacy-dash-option-link">View Patient List</Link>
            <Link to="/inventory" className="pharmacy-dash-option-link">Check Inventory</Link>
            <Link to="/hospital-demands" className="pharmacy-dash-option-link">Manage Hospital Demands</Link> 
        </div>
    </div>
    </div>
    );
};

export default LandingPage;

