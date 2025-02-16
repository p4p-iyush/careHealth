import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./Hospital_bills.css"

const HospitalBills = () => {
  const [bills, setBills] = useState([]);

  useEffect(() => {
    fetchBills();
  }, []);

  const fetchBills = async () => {
    try {
        const response = await axios.get('http://localhost:5000/inventory/api/hospital-bills');
        // Ensure this matches your route
      setBills(response.data);
    } catch (error) {
      console.error('Error fetching bills:', error);
      setBills([]); // Set bills to an empty array in case of an error
    }
  };

  return (
    <div className="Hospital-bill-container">
      <h2 className="Hospital-bill-title">Hospital Bills</h2>
      {Array.isArray(bills) && bills.length > 0 ? (
        <table className="Hospital-bill-table">
          <thead className="Hospital-bill-thead">
            <tr className="Hospital-bill-header-row">
              <th className="Hospital-bill-header">Doctor Name</th>
              <th className="Hospital-bill-header">Department</th>
              <th className="Hospital-bill-header">Request Date</th>
              <th className="Hospital-bill-header">Grand Total</th>
            </tr>
          </thead>
          <tbody className="Hospital-bill-tbody">
            {bills.map((bill) => (
              <tr key={bill._id} className="Hospital-bill-row">
                <td className="Hospital-bill-cell">{bill.doctorName}</td>
                <td className="Hospital-bill-cell">{bill.department}</td>
                <td className="Hospital-bill-cell">{new Date(bill.request_date).toLocaleDateString()}</td>
                <td className="Hospital-bill-cell">{bill.grand_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="Hospital-bill-no-data">No bills found.</p>
      )}
</div>

  );
};

export default HospitalBills;
