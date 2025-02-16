import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate} from "react-router-dom"; // For navigation
import { Link } from 'react-router-dom';
import "./PatientList.css"

const PatientList = () => {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const navigate = useNavigate(); // Initialize navigation

  useEffect(() => {
    axios
      .get("http://localhost:5000/inventory/api/patients")
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
    <div className="view-patient-list-container">
            {error && <div className="view-patient-list-error">{error}</div>} {/* Display error message */}

            <table className="view-patient-list-table">
                <thead className="view-patient-list-thead">
                    <tr className="view-patient-list-header-row">
                       
                        <th className="view-patient-list-th">Name</th>
                        <th className="view-patient-list-th">Prescription Date</th>
                        <th className="view-patient-list-th">Prescription</th>
                    </tr>
                </thead>
                <tbody className="view-patient-list-tbody">
                    {patients.map((patient) => (
                        <tr key={patient._id} className="view-patient-list-row">
                            <td className="view-patient-list-td">{patient.patient_name}</td>
                            <td className="view-patient-list-td">
                                {new Date(patient.prescription_date).toLocaleDateString()}
                            </td>
                            <td className="view-patient-list-td">
                                <button
                                    onClick={() => handleViewPrescription(patient._id)}
                                    className="view-patient-list-btn"
                                >
                                    View Prescription
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <Link to="/pharmacy-dashboard" className="view-patient-list-home">
                Home
            </Link>
        </div>
    
  );

};


export default PatientList;
