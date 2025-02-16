import React, { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div>
      <h2>Hospital Bills</h2>
      {Array.isArray(bills) && bills.length > 0 ? (
        <table>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Department</th>
              <th>Request Date</th>
              <th>Grand Total</th>
            </tr>
          </thead>
          <tbody>
            {bills.map((bill) => (
              <tr key={bill._id}>
                <td>{bill.doctorName}</td>
                <td>{bill.department}</td>
                <td>{new Date(bill.request_date).toLocaleDateString()}</td>
                <td>{bill.grand_total}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No bills found.</p>
      )}
    </div>
  );
};

export default HospitalBills;
