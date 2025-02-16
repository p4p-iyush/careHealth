import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import "./PatientBills.css"

const PatientBills = () => {
  const location = useLocation();
  const { userDetails } = location.state || {};
  const [bill, setBill] = useState(null);
  const [bedBills, setBedBills] = useState([]);

  useEffect(() => {
    const fetchBill = async () => {
      if (!userDetails?._id) {
        console.error('User ID is missing');
        return;
      }

      try {
        const response = await fetch(`http://localhost:5000/prescriptions/patient/bill/${userDetails._id}`);
        const data = await response.json();

        console.log('Full fetched response:', data);

        if (response.ok) {
          setBill(data.patientPrescriptions || []);
        } else {
          console.error('Error from server:', data.message || 'Failed to fetch bill');
        }
      } catch (err) {
        console.error('Error fetching bill:', err);
      }
    };

    fetchBill();
  }, [userDetails?._id]);

  useEffect(() => {
    const fetchBedBills = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/bill/discharge-bill");
        const data = await response.json();

        if (response.ok) {
          setBedBills(data || []);
        } else {
          console.error("Error from server:", data.message || "Failed to fetch bed bills");
        }
      } catch (err) {
        console.error("Error fetching bed bills:", err);
      }
    };

    fetchBedBills();
  }, []);

  if (!bill && bedBills.length === 0) {
    return <p>Loading bill details...</p>;
  }

  if ((bill && bill.length === 0) && bedBills.length === 0) {
    return <p>No bills found for this patient.</p>;
  }

  return (
    
    <div className="patient-bill-container">
      <h2 className="patient-bill-title">Patient Bill Details</h2>
    <div className='patient-bill-container2'>

    
      {/* Prescription Bills */}
      <div className="patient-bill-section">
        <h2 className="patient-bill-subtitle">Patient Prescription Bills</h2>
        {bill && bill.map((item, index) => (
          <div key={index} className="patient-bill-card">
            <p><strong>Grand Total:</strong> ₹{item.grand_total}</p>
            <p><strong>Medicine Names:</strong> {item.prescription.map((med) => med.medicine_name).join(', ')}</p>
            <p><strong>Prescription Date:</strong> {new Date(item.prescription_date).toLocaleDateString()}</p>
          </div>
        ))}
      </div>

      {/* Bed Bills */}
      <div className="patient-bill-section">
        <h2 className="patient-bill-subtitle">Patient Bed Bills</h2>
        {bedBills.map((bedBill, index) => (
          <div key={index} className="patient-bill-card">
            <p><strong>Patient Name:</strong> {bedBill.name}</p>
            <p><strong>Contact:</strong> {bedBill.contact}</p>
            <p><strong>Department:</strong> {bedBill.department}</p>
            <p><strong>Bed Type:</strong> {bedBill.bedType}</p>
            <p><strong>Bed Number:</strong> {bedBill.bedNumber}</p>
            <p><strong>Allocation Time:</strong> {new Date(bedBill.allocationTime).toLocaleString()}</p>
            <p><strong>Discharge Time:</strong> {new Date(bedBill.dischargeTime).toLocaleString()}</p>
            <p><strong>Days Stayed:</strong> {bedBill.daysStayed}</p>
            <p><strong>Total Cost:</strong> ₹{bedBill.totalCost}</p>
            <p><strong>Payment Status:</strong> {bedBill.paymentStatus}</p>
          </div>
        ))}
      </div>
      </div>
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