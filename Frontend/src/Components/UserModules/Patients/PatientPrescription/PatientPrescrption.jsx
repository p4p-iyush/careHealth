import React, { useState, useEffect } from 'react';
import { useLocation } from "react-router-dom";

const PatientPrescrption = () => {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Get userDetails from location.state
  const [prescriptions, setPrescriptions] = useState(null);

  useEffect(() => {
    const fetchPrescriptions = async () => {
      if (!userDetails?._id) {
        console.error('User ID is missing');
        return;
      }
      try {
        const response = await fetch(`http://localhost:5000/patient/prescription/${userDetails.patientId || userDetails._id }`);

        const data = await response.json();
    
        console.log('Full fetched response:', data); // Log the full response
    
        if (response.ok) {
          setPrescriptions(data); // Assuming `data` is the array of prescriptions
        } else {
          console.error('Error from server:', data.message || 'Failed to fetch prescriptions');
        }
      } catch (err) {
        console.error('Error fetching prescriptions:', err);
      }
    };
    

    fetchPrescriptions();
  }, [userDetails?._id]); // Re-run the effect if userDetails._id changes

  if (!userDetails) {
    return <div>No user details found.</div>;
  }

  return (
    <div>
      <h1>Prescriptions for {userDetails?.name}</h1>
      {prescriptions ? (
        prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <div key={prescription._id} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ccc' }}>
              <h2>Prescription {index + 1}</h2>
              <p><strong>Date:</strong> {new Date(prescription.prescription_date).toLocaleDateString()}</p>
              <h3>Medicines:</h3>
              {prescription.prescription.length > 0 ? (
                <ul>
                  {prescription.prescription.map((med, medIndex) => (
                    <li key={medIndex}>
                      <strong>Medicine:</strong> {med.medicine_name} <br />
                      <strong>Quantity:</strong> {med.quantity} <br />
                      <strong>Dosage:</strong> {med.dosage} <br />
                      <strong>Duration:</strong> {med.duration}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No medicines found in this prescription.</p>
              )}
            </div>
          ))
        ) : (
          <p>No prescriptions found for this patient.</p>
        )
      ) : (
        <p>Loading prescriptions...</p>
      )}
    </div>
  );
};

export default PatientPrescrption;
