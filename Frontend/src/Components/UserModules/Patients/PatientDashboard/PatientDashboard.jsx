import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';
import './PatientDashboard.css';  // Make sure to import your styles

const PatientDashboard = () => {
  // Get user details from the state passed by navigate
  const location = useLocation();
  const { userDetails } = location.state || {};  // Default to empty object if no state is passed
  console.log("User details in PatientDashboard:", userDetails);

  if (!userDetails) {
    return <div>No user data available!</div>; // Handle case where no user data is available
  }

  return (
    <div>
      <nav>
        <h1>Patient Dashboard</h1>
        <Link to="/appointment-booking" state={{ userDetails: userDetails.patient }}>
          <h2>Appointments</h2>
        </Link>
        <Link to={`/patient/prescription/${userDetails.patient._id}`} state={{ userDetails: userDetails.patient }}>

          View Prescription
        </Link>

        <h2>Medication</h2>
        <h2>Health Records</h2>
      </nav>

      <div>
        <h1>User Details</h1>
        <table>
          <thead>
            <tr>
              <th>Field</th>
              <th>Details</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Name</td>
              <td>{userDetails.patient.name}</td>
            </tr>
            <tr>
              <td>Email</td>
              <td>{userDetails.patient.email}</td>
            </tr>
            <tr>
              <td>Phone</td>
              <td>{userDetails.patient.contact}</td>
            </tr>
            <tr>
              <td>Address</td>
              <td>{userDetails.patient.address}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PatientDashboard;
