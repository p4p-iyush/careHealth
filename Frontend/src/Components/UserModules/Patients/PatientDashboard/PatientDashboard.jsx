import React, { useContext, useEffect , useState} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Chatbot from "../../../Chatbot/Chatbot";
import UserContext from "../../../Context/UserContext"; // Import the context
import "./PatientDashboard.css";
import { IoClose } from "react-icons/io5";

const PatientDashboard = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { userDetails } = location.state || {}; // Get userDetails from state
  const { userID, setUserID } = useContext(UserContext); // Access userID and setUserID from context
  const [isChatbotOpen, setIsChatbotOpen] = useState(false); // Chatbot state

  console.log(userDetails.patient._id)

  // Function to fetch text file data
  const fetchtxtfile = async () => {
    try {
      if (!userDetails) {
        console.error("User ID not found.");
        return;
      }
      else
      {
        setUserID(userDetails.patient._id); // Update userID in context
        console.log("User ID", userID)
      }

      // Fetch the text file data from backend
      const response = await fetch(`http://localhost:5000/api/login/fetchtxtfile/${userDetails.patient._id}`);

      if (!response.ok) {
        throw new Error("Failed to fetch the file");
      }
      const textData = await response.text(); // Read file data as text
      console.log("Fetched Text Data:", textData);

      // Send textData to FastAPI backend
      await sendTextToBackend(textData);

    } catch (error) {
      console.error("Error fetching text file:", error);
    }
  };

  // Function to send text data to FastAPI backend
  const sendTextToBackend = async (textData) => {
    try {
      const response = await fetch("http://localhost:8080/store-text", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content: textData }),
      });

      if (!response.ok) {
        throw new Error("Failed to send text data to backend");
      }

      const result = await response.json();
      console.log("Text stored successfully:", result);
    } catch (error) {
      console.error("Error sending text data to backend:", error);
    }
  };

  useEffect(() => {
    if (userDetails?.patient?._id) {
      setUserID(userDetails.patient._id); // Set userID in context
    }
    fetchtxtfile();
    if (!userDetails || !userDetails.patient) {
      navigate("/login"); // Redirect to login if no user details are found
    }
  }, [userDetails, navigate, setUserID]);

  // Toggle chatbot visibility
  const toggleChatbot = () => {
    setIsChatbotOpen((prevState) => !prevState);
  };

  return (
    <div className="patient-dash-container">
      <nav className="patient-dash-nav">
        <h1 className="patient-dash-title">Patient Dashboard</h1>
        <Link className="patient-dash-link-appointments" to="/appointment-booking" state={{ userDetails: userDetails.patient }}>
          Appointments
        </Link>
        <Link className="patient-dash-link-prescription" to={`/patient/prescription/${userDetails.patient._id}`} state={{ userDetails: userDetails.patient }}>
          View Prescription
        </Link>
        <Link className="patient-dash-link-bills" to="/patient-bill" state={{ userDetails: userDetails.patient }}>
          Bills
        </Link>
        <Link className="patient-dash-link-reschedule" to="/appointment-list" state={{ userDetails: userDetails.patient }}>
          Reschedule Appointment
        </Link>
        <Link className="patient-dash-link-medical-report" to="/MedicalReportAnalyzer" state={{ userDetails }}>
          Medical Report Analyzer
        </Link>
      </nav>

      <div className="patient-dash-details">
        <h1 className="patient-dash-details-title">User Details</h1>
        <table className="patient-dash-table">
          <thead className="patient-dash-table-head">
            <tr className="patient-dash-table-row">
              <th className="patient-dash-table-header">Field</th>
              <th className="patient-dash-table-header">Details</th>
            </tr>
          </thead>
          <tbody className="patient-dash-table-body">
            <tr className="patient-dash-table-row">
              <td className="patient-dash-table-field">Name</td>
              <td className="patient-dash-table-value">{userDetails.patient.name}</td>
            </tr>
            <tr className="patient-dash-table-row">
              <td className="patient-dash-table-field">Email</td>
              <td className="patient-dash-table-value">{userDetails.patient.email}</td>
            </tr>
            <tr className="patient-dash-table-row">
              <td className="patient-dash-table-field">Phone</td>
              <td className="patient-dash-table-value">{userDetails.patient.contact}</td>
            </tr>
            <tr className="patient-dash-table-row">
              <td className="patient-dash-table-field">Address</td>
              <td className="patient-dash-table-value">{userDetails.patient.address}</td>
            </tr>
          </tbody>
        </table>
      </div>

    

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
            <button onClick={toggleChatbot} className="close_button"><IoClose /></button>
          </div>
          <Chatbot userDetails={userDetails} /> {/* Render Chatbot */}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;