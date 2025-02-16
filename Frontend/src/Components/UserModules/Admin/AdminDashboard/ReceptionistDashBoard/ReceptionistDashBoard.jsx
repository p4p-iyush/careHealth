import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ReceptionistDashBoard.css"

const ReceptionistDashBoard = () => {
  const navigate = useNavigate();
  const [BedCounts, setBedCounts] = useState({ totalBeds: 0, freeBeds: 0, occupiedBeds: 0 });

  const fetchBedCounts = () => {
    fetch("http://localhost:5000/api/beds/totalbed")
      .then((response) => response.json())
      .then((data) => setBedCounts(data))
      .catch((error) => console.error("Error fetching bed counts:", error));
  };
  const fetchTotalappoinments = () => {
    fetch("http://localhost:5000/api/appointments")
      .then((response) => response.json())
      .then((data) => console.log("Total appointments:", data.length))
      .catch((error) => console.error("Error fetching total appointments:", error));
  };

  useEffect(() => {
    fetchBedCounts();
  }, []);

  return (
    <div className="admin-dashboard-container">
      {/* Sidebar Section */}
      <aside className="admin-dashboard-sidebar">
        <h2>Menu</h2>
        <div className="admin-dashboard-sidebar-buttons">
          <button onClick={() => navigate("/")}>Dashboard</button>
          <button onClick={() => navigate("/appointment-count")}>Appointments</button>
          <button onClick={() => navigate("/Bed-Status")}>Bed Status</button>
          <button onClick={() => navigate("/Hospital-bills")}>Inventory Bills</button>
        </div>
      </aside>

      {/* Main Content Section */}
      <div className="admin-dashboard-main-content-wrapper">
        {/* Header Section */}
        <header className="admin-dashboard-header">
          <h1>Hospital Management System</h1>
          <p>Welcome, Admin</p>
        </header>

        {/* Main Content */}
        <main className="admin-dashboard-main-content">
          {/* Top Section: Quick Stats */}
          <section className="admin-dashboard-quick-stats">
            <div className="admin-dashboard-stat-card">
              <h3>Total Appointments</h3>
              <p>90</p>
              <a href="/appointment-count">View Details</a>
            </div>
            <div className="admin-dashboard-stat-card">
              <h3>Total Beds</h3>
              <p>{BedCounts.totalBeds}</p>
              <a href="/bed-status">View Details</a>
            </div>
            <div className="admin-dashboard-stat-card">
              <h3>Total Available Beds</h3>
              <p>{BedCounts.freeBeds}</p>
              <a href="/bed-status">View Details</a>
            </div>
            <div className="admin-dashboard-stat-card">
              <h3>Total Occupied Beds</h3>
              <p>{BedCounts.occupiedBeds}</p>
              <a href="/bed-status">View Details</a>
            </div>
            
          </section>

          {/* Middle Section: Quick Actions */}
          <section className="admin-dashboard-quick-actions">
            <h2>Quick Actions</h2>
            <div className="admin-dashboard-action-buttons">
              <button onClick={() => navigate("/editDefaultPrices")}>Change Bed Price</button>
              <button onClick={() => navigate("/AllDischargeBill")}>View Discharge Bill</button>

            </div>
          </section>

          {/* Bottom Section: Recent Activity */}
          <section className="admin-dashboard-recent-activity">
            <h2>Recent Activity</h2>
            <div className="admin-dashboard-activity-list">
              <div className="admin-dashboard-activity-item">
                <p><strong>Dr. John Doe</strong> registered a new patient.</p>
                <span>2 hours ago</span>
              </div>
              <div className="admin-dashboard-activity-item">
                <p><strong>Bed ICUB1</strong> was allocated to a patient.</p>
                <span>4 hours ago</span>
              </div>
              <div className="admin-dashboard-activity-item">
                <p><strong>Inventory</strong> was updated by Admin.</p>
                <span>6 hours ago</span>
              </div>
            </div>
          </section>
        </main>

        {/* Footer Section */}
        <footer className="admin-dashboard-footer">
          <p>&copy; 2023 Hospital Management System. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default ReceptionistDashBoard;
