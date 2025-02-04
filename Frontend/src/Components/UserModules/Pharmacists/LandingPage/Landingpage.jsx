import React from 'react';
import { Link } from 'react-router-dom';
import './LandingPage.css';

const LandingPage = () => {
    return (
        <div className="landingpage-container">
            <h1 className="landingpage-heading">Welcome, Pharmacist</h1>
            <div className="landingpage-options-container">
                <Link to="/patient-list" className="landingpage-option-link">View Patient List</Link>
                <Link to="/inventory" className="landingpage-option-link">Check Inventory</Link>
                <Link to="/Hospital-Demands" className="landingpage-option-link">Manage Hospital Demands</Link> 
            </div>
        </div>
    );
};

export default LandingPage;

