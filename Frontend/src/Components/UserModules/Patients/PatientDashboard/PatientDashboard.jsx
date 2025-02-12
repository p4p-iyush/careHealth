import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Chatbot from "../../../Chatbot/Chatbot"
import "./PatientDashboard.css";

const PatientDashboard = () => {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Get userDetails from state

  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // State to toggle chatbot

  if (!userDetails) {
    return <div>No user data available!</div>;
  }

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen); // Toggle chatbot visibility
  };

  return (
    <div>
      <nav>
        <h1>Patient Dashboard</h1>
        <Link to="/appointment-booking" state={{ userDetails: userDetails.patient }}>
          <h2>Appointments</h2>
        </Link>

        <Link
          to={`/patient/prescription/${userDetails.patient._id}`}
          state={{ userDetails: userDetails.patient }}
        >
          <h2>View Prescription</h2>
        </Link>
        <Link to="/patient-bill" state={{ userDetails: userDetails.patient }}>
          <h2>Bills</h2>
        </Link>
        <Link to='/appointment-list' state={{ userDetails: userDetails.patient }} >
        <h2>Reschedule Appointment </h2>
        </Link>
        <Link to='/MedicalReportAnalyzer'>
        <h2>MedicalReportAnalyzer</h2>
        </Link>
      </nav>

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

      <div className="chatbot_logo" onClick={toggleChatbot}>
        <img
          src="https://cdni.iconscout.com/illustration/premium/thumb/online-medical-chatbot-service-5588600-4655407.png"
          alt="Chatbot"
        />
      </div>

      {/* Chatbot Popup */}
      {isChatbotOpen && (
        <div className="chatbot_popup">
          <div className="chatbot_header">
            {/* <h3>Chatbot</h3> */}
            <button onClick={toggleChatbot} className="close_button">X</button>
          </div>
          <Chatbot /> {/* Render the Chatbot component */}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;
