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
    <div>
      <nav>
        <h1>Patient Dashboard</h1>
        <Link to="/appointment-booking" state={{ userDetails: userDetails?.patient }}>
          <h2>Appointments</h2>
        </Link>

        <Link to={`/patient/prescription/${userID}`} state={{ userDetails: userDetails?.patient }}>
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
            <button onClick={toggleChatbot} className="close_button"><IoClose /></button>
          </div>
          <Chatbot userDetails={userDetails} /> {/* Render Chatbot */}
        </div>
      )}
    </div>
  );
};

export default PatientDashboard;