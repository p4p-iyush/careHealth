import React, { useEffect, useState } from "react";
import axios from "axios";
import "./AllDischargeBill.css"; // Import the CSS file

const AllDischargeBill = () => {
  const [bills, setBills] = useState([]);

  // Fetch all bills
  const fetchBills = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/bill/discharge-bill");
      setBills(res.data);
    } catch (err) {
      console.error("Error fetching discharge bills:", err);
    }
  };

  useEffect(() => {
    fetchBills();
  }, []);

  const handlePaymentStatus = async (billId) => {
    try {
      const res = await axios.put(`http://localhost:5000/api/bill/${billId}/payment-status`);
      console.log("Payment status updated:", res.data);
      fetchBills();
    } catch (err) {
      console.error("Error updating payment status:", err);
    }
  };
 

  if (!bills || bills.length === 0) {
    return <p className="loading-message">Loading or No Bills Available...</p>;
  }

  return (
    <div className="Discharge-Bill-container">
      <h1 className="Discharge-Bill-title">Discharge Bills</h1>
      <table className="Discharge-Bill-table">
        <thead>
          <tr>
            <th className="Discharge-Bill-header">Name</th>
            <th className="Discharge-Bill-header">Email</th>
            <th className="Discharge-Bill-header">Department</th>
            <th className="Discharge-Bill-header">Bed Type</th>
            <th className="Discharge-Bill-header">Bed Number</th>
            <th className="Discharge-Bill-header">Allocation Time</th>
            <th className="Discharge-Bill-header">Days Stayed</th>
            <th className="Discharge-Bill-header">Total Cost (₹)</th>
            <th className="Discharge-Bill-header">Payment Status</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id} className="Discharge-Bill-row">
              <td className="Discharge-Bill-cell">{bill.name}</td>
              <td className="Discharge-Bill-cell">{bill.email}</td>
              <td className="Discharge-Bill-cell">{bill.department}</td>
              <td className="Discharge-Bill-cell">{bill.bedType}</td>
              <td className="Discharge-Bill-cell">{bill.bedNumber}</td>
              <td className="Discharge-Bill-cell">{new Date(bill.allocationTime).toLocaleString()}</td>
              <td className="Discharge-Bill-cell">{bill.daysStayed}</td>
              <td className="Discharge-Bill-cell">₹{bill.totalCost}</td>
              <td className="Discharge-Bill-cell"><button classname="Discharge-Bill-btn" onClick={() => { handlePaymentStatus(bill._id); }}>{bill.paymentStatus}</button></td>
            </tr>
          ))}
        </tbody>
      </table>
</div>

  );
};

export default AllDischargeBill;
