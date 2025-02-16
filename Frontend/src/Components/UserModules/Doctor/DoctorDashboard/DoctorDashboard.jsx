import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom"; // Import useNavigate
import axios from "axios"; // Ensure axios is imported
import BedStatus from "../../../BedManagement/BedStatus/BedStatus.jsx";
import UserContext from "../../../Context/UserContext.js";

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const { userID, setUserID } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { userDetails } = location.state || {};
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchDoctorAndPatients = async () => {
      try {
        setUserID(userDetails.doctor._id);
        const response = await fetch(`http://localhost:5000/doctorRoutes/doctor_patient_list/${userDetails.doctor._id}`);
        const data = await response.json();

        if (response.ok) {
          setDoctor(data.doctor);
          setPatients(data.patients);
        } else {
          console.error("Error:", data.message);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAndPatients();
  }, [userDetails.doctor._id, setUserID]);

  const handleSubmit = async (patientId) => {
    try {
      const response = await axios.put('http://localhost:5000/doctorRoutes/doctor_patient_list', {
        patientId: patientId,
        reached: true,
      });

      console.log("Response:", response.data);
      alert("Patient status updated successfully!");

      // Update state to reflect changes instantly
      setPatients((prevPatients) =>
        prevPatients.map((patient) =>
          patient._id === patientId ? { ...patient, reached: true } : patient
        )
      );
    } catch (error) {
      console.error("Error updating patient status:", error);
      alert("Failed to update patient status.");
    }
  };

  // Function to handle the button click and navigate to /inventory-request
  const handleInventoryRequest = () => {
    navigate("/inventory-request", { state: { doctor_id: userDetails.doctor._id } });
  };

  return (
    <div className="container">
      <h2>Doctor Dashboard</h2>

      {loading ? (
        <p>Loading doctor and patient details...</p>
      ) : doctor ? (
        <div className="doctor-info">
          <h3>Dr. {doctor.name}</h3>
          <p><strong>Specialization:</strong> {doctor.specialization}</p>
          <p><strong>Email:</strong> {doctor.email}</p>
          <p><strong>Phone:</strong> {doctor.contact}</p>
        </div>
      ) : (
        <p>Doctor not found.</p>
      )}

      <h3>
        Request to Inventory
        <button onClick={handleInventoryRequest} style={{ marginLeft: "10px" }}>
          Request Inventory
        </button>
      </h3>

      <h3>Appointments</h3>
      {patients.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>Department</th>
              <th>Date</th>
              <th>Time</th>
              <th>Add Prescription</th>
              <th>View Prescription's</th>
              <th>Allocate Bed</th>
              <th>Prescription Status</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((patient) => (
              <tr key={patient._id}>
                <td>{patient.name}</td>
                <td>{patient.department}</td>
                <td>{patient.date}</td>
                <td>{patient.time}</td>
                <td>
                  <Link to="/add-patient-med" state={{ patient, doctor }}>ADD</Link>
                </td>
                <td>
                  <Link to={`/patient/prescription/${patient.patientId}`} state={{ userDetails: patient }}>
                    View Prev Prescription
                  </Link>
                </td>
                <td>
                  <Link to="/bed-application" state={{ patient, doctor }}>ADD</Link>
                </td>
                <td>
                  <button
                    onClick={() => handleSubmit(patient._id)}
                    disabled={patient.reached} // Disable button if already marked as reached
                  >
                    {patient.reached ? "Done" : "Pending..."}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found in this department.</p>
      )}

      <h3>Beds Allocated to Doctor</h3>
      {/* Add bed status display */}
      {userDetails.doctor && userDetails.doctor._id ? <BedStatus doctor={userDetails.doctor} /> : <p>Loading doctor data...</p>}
    </div>
  );
};

export default DoctorDashboard;