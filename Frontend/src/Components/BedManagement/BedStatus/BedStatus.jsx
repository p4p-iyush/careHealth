import React, { useEffect, useState } from "react";
import axios from "axios";
import "./BedStatus.css";
import { useNavigate } from "react-router-dom"; // ✅ Correct import

const BedStatus = () => {
  const [prices, setPrices] = useState({});
  const [applications, setApplications] = useState([]);
  const [bedStats, setBedStats] = useState({});
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // ✅ Use useNavigate hook

  // Fetch applications and bed statistics
  const fetchData = async () => {
    try {
      const appRes = await axios.get("http://localhost:5000/api/beds/bed-status");
      setApplications(appRes.data);
      console.log("Applications:", appRes.data);

      const statsRes = await axios.get("http://localhost:5000/api/beds/bed-stats");
      setBedStats(statsRes.data);
      console.log("Bed Stats:", statsRes.data);
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  // Fetch bed prices
  const fetchPrices = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds/get-default-prices");
      if (res.status === 200 && Array.isArray(res.data)) {
        const priceMap = res.data.reduce((acc, item) => {
          acc[item.bedType] = item.pricePerDay;
          return acc;
        }, {});
        setPrices(priceMap);
      }
    } catch (err) {
      console.error("Error fetching prices:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
    fetchPrices();

    // ✅ Auto-refresh every 30 seconds (optional)
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);

  const handleDischarge = async (id) => {
    try {
      // Generate the bill first
      const billResponse = await axios.post(`http://localhost:5000/api/bill/discharge-bill/${id}`);
      console.log("Discharge Bill Response:", billResponse.data);

      // Discharge the patient after the bill is saved
      const dischargeResponse = await axios.put(`http://localhost:5000/api/bill/discharge/${id}`);
      console.log("Discharge Response:", dischargeResponse.data);

      // Refresh data after successful discharge
      fetchData();

      // ✅ Corrected Navigation
      navigate("/allDischargeBill", { state: billResponse.data });
    } catch (err) {
      console.error("Error discharging patient:", err);
    }
  };

  return (
    <div className="bed-status-container">
      <h1>Bed Status</h1>

      {/* Bed Statistics */}
      <div className="bed-stats">
        <h2>Bed Statistics</h2>
        <p>ICU Beds: {bedStats.ICU?.total} (Available: {bedStats.ICU?.available})</p>
        <p>Private Beds: {bedStats.Private?.total} (Available: {bedStats.Private?.available})</p>
        <p>General Beds: {bedStats.General?.total} (Available: {bedStats.General?.available})</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <p>Loading bed prices...</p>
      ) : (
        <table className="bed-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Department</th>
              <th>Bed Type</th>
              <th>Bed Number</th>
              <th>Allocation Time</th>
              <th>Days Stayed</th>
              <th>Total Bill</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((app) => {
              const allocationTime = new Date(app.allocationTime);
              const currentTime = new Date();
              const daysStayed = Math.ceil((currentTime - allocationTime) / (1000 * 60 * 60 * 24));

              // Ensure bedPrice exists before calculating totalBill
              const bedPrice = prices[app.bedType] || 0;
              const totalBill = daysStayed * bedPrice;

              return (
                <tr key={app._id}>
                  <td>{app.name}</td>
                  <td>{app.contact}</td>
                  <td>{app.department}</td>
                  <td>{app.bedType}</td>
                  <td>{app.bedNumber}</td>
                  <td>{allocationTime.toLocaleString()}</td>
                  <td>{daysStayed}</td>
                  <td>₹{totalBill}</td>
                  <td>
                    <button className="discharge-button" onClick={() => handleDischarge(app._id)}>
                      Discharge
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default BedStatus;
