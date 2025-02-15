import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Chatbot from "../../../Chatbot/Chatbot";
import "./PatientDashboard.css";
import { IoClose } from "react-icons/io5";

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state || {}; // Get userDetails from state

  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Chatbot state

  console.log(userDetails)

  // Redirect to login if userDetails is missing
  useEffect(() => {
    if (!userDetails || !userDetails.patient) {
      navigate("/login"); // Redirect to login if no user details are found
    }
  }, [userDetails, navigate]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div>
      <nav>
        <h1>Patient Dashboard</h1>
        <Link to="/appointment-booking" state={{ userDetails: userDetails?.patient }}>
          <h2>Appointments</h2>
        </Link>

        <Link to={`/patient/prescription/${userDetails?.patient?._id}`} state={{ userDetails: userDetails?.patient }}>
          <h2>View Prescription</h2>
        </Link>

        <Link to="/patient-bill" state={{ userDetails: userDetails?.patient }}>
          <h2>Bills</h2>
        </Link>

        <Link to="/appointment-list" state={{ userDetails: userDetails?.patient }}>
          <h2>Reschedule Appointment</h2>
        </Link>

        <Link to="/MedicalReportAnalyzer" state={{ userDetails }}>
          <h2>Medical Report Analyzer</h2>
        </Link>
      </nav>

      {/* User Details Section */}
      {userDetails?.patient && (
        <div>
          <h1>User Details</h1>
          <table>
            <thead>
              <tr>
                <th>Field</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{userDetails.patient.name}</td>
              </tr>
              <tr>
                <td>Email</td>
                <td>{userDetails.patient.email}</td>
              </tr>
              <tr>
                <td>Phone</td>
                <td>{userDetails.patient.contact}</td>
              </tr>
              <tr>
                <td>Address</td>
                <td>{userDetails.patient.address}</td>
              </tr>
            </tbody>
          </table>
        </div>
      )}

      {/* Chatbot Toggle Button */}
      <div className="chatbot_logo" onClick={toggleChatbot}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/online-medical-chatbot-service-5588600-4655407.png"
          alt="Medical Chatbot Icon"
        />
      </div>

      {/* Chatbot Popup */}
      {isChatbotOpen && (
        <div className="chatbot_popup">
          <div className="chatbot_header">
            <button onClick={toggleChatbot} className="close_button"><IoClose/></button>
          </div>
          <Chatbot userDetails = {userDetails} /> {/* Render Chatbot */}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
