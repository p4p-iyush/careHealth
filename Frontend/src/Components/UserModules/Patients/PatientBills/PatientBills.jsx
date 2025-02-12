import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const PatientBills = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const [bill, setBill] = useState(null);

  useEffect(() => {
    const fetchBill = async () => {
      if (!userDetails?._id) {
        console.error('User ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/patient/bill/${userDetails._id}`);
        const data = await response.json();

        console.log('Full fetched response:', data);

        if (response.ok) {
          setBill(data.patientPrescriptions || []); // Assuming `patientPrescriptions` contains the required details
        } else {
          console.error('Error from server:', data.message || 'Failed to fetch bill');
        }
      } catch (err) {
        console.error('Error fetching bill:', err);
      }
    };

    fetchBill();
  }, [userDetails?._id]);

  if (!bill) {
    return <p>Loading bill details...</p>;
  }

  if (bill.length === 0) {
    return <p>No bills found for this patient.</p>;
  }

  return (
    <div>
      <h2>Patient Bill Details</h2>
      {bill.map((item, index) => (
        <div key={index} style={styles.billCard}>
          <p><strong>Grand Total:</strong> ₹{item.grand_total}</p>
          <p>
            <strong>Medicine Names:</strong>{' '}
            {item.prescription.map((med) => med.medicine_name).join(', ')}
          </p>
          <p>
            <strong>Prescription Date:</strong>{' '}
            {new Date(item.prescription_date).toLocaleDateString()}
          </p>
        </div>
      ))}
    </div>
  );
};

const styles = {
  billCard: {
    border: '1px solid #ccc',
    margin: '10px',
    padding: '10px',
    borderRadius: '5px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
};

export default PatientBills;
