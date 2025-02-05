import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom"; // For navigation
import { Link } from 'react-router-dom';

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/patients")
      .then((response) => {
        setPatients(response.data); // Update state with fetched patients
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        setError("Error fetching patients. Please try again later.");
        console.error("Error fetching patients:", error);
        setLoading(false); // Set loading to false after error
      });
  }, []);

  const handleViewPrescription = (patientId) => {
    navigate(`/prescription/${patientId}`); // Redirect to prescription details page
  };

  if (loading) {
    return <div>Loading patients...</div>; // Show loading message while fetching
  }

  return (
    <div className="container">
      {error && <div className="alert alert-danger">{error}</div>} {/* Display error message */}
      <table className="patient-list">
        <thead>
          <tr>
            <th>Patient ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>Prescription Date</th>
            <th>Prescription</th>
          </tr>
        </thead>
        <tbody>
          {patients.map((patient) => (
            <tr key={patient._id}>
              <td>{patient._id}</td>
              <td>{patient.name}</td>
              <td>{patient.age}</td>
              <td>{new Date(patient.prescri_date).toLocaleDateString()}</td>
              <td>
                <button
                  onClick={() => handleViewPrescription(patient._id)}
                  className="btn btn-primary"
                >
                  View Prescription
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Link to="/pharmacy-dashboard" className="abouttoexpire">
        Home
      </Link>
    </div>
    
  );

};


export default PatientList;
