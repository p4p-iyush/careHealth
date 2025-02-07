import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const PatientPrescrption = () => {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Get userDetails from location.state
  const [prescription, setPrescription] = useState(null);

  useEffect(() => {
    const fetchPrescription = async () => {
      if (!userDetails?._id) {
        console.error('User ID is missing');
        return; // Prevent fetching if userDetails._id is not available
      }
      try {
        const response = await fetch(`http://localhost:5000/patient/prescription/${userDetails._id}`);
        const data = await response.json();
        console.log('Fetched data:', data);

        if (response.ok) {
          setPrescription(data); // Set prescription data from the backend
        } else {
          console.error(data.message || 'Failed to fetch prescription');
        }
      } catch (err) {
        console.error('Error fetching prescription:', err);
      }
    };

    fetchPrescription();
  }, [userDetails?._id]); // Re-run the effect if userDetails._id changes

  if (!userDetails) {
    return <div>No user details found.</div>;
  }

  return (
    <div>
      <h1>Prescription for {userDetails?.name}</h1>
      {prescription ? (
        <div>
          {/* Render the prescription data here */}
          <h3>Medicines:</h3>
          {prescription.prescription && prescription.prescription.length > 0 ? (
            <ul>
              {prescription.prescription.map((med, index) => (
                <li key={index}>
                  <strong>{med.medicine_name}</strong> - {med.quantity} - {med.dosage} - {med.duration}
                </li>
              ))}
            </ul>
          ) : (
            <p>No medicines found in the prescription.</p>
          )}
        </div>
      ) : (
        <p>Loading prescription...</p>
      )}
    </div>
  );
};

export default PatientPrescrption;
