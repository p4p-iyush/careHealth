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

  if (!bills || bills.length === 0) {
    return <p className="loading-message">Loading or No Bills Available...</p>;
  }

  return (
    <div className="discharge-bill-container">
      <h1>Discharge Bills</h1>
      <table className="bill-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Department</th>
            <th>Bed Type</th>
            <th>Bed Number</th>
            <th>Allocation Time</th>
            <th>Days Stayed</th>
            <th>Total Cost (₹)</th>
          </tr>
        </thead>
        <tbody>
          {bills.map((bill) => (
            <tr key={bill._id}>
              <td>{bill.name}</td>
              <td>{bill.email}</td>
              <td>{bill.department}</td>
              <td>{bill.bedType}</td>
              <td>{bill.bedNumber}</td>
              <td>{new Date(bill.allocationTime).toLocaleString()}</td>
              <td>{bill.daysStayed}</td>
              <td>₹{bill.totalCost}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllDischargeBill;
