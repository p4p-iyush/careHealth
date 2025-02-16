import React, { useEffect, useState, useContext } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import BedStatus from "../../../BedManagement/BedStatus/BedStatus.jsx";
import UserContext from "../../../Context/UserContext.js";
import "./DoctorDashboard.css"; // Import CSS file for styling

const DoctorDashboard = () => {
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const { userID, setUserID } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { userDetails } = location.state || {};
  const navigate = useNavigate();

  // Fetch doctor and patient data
  useEffect(() => {
    const fetchDoctorAndPatients = async () => {
      try {
        if (userDetails?.doctor?._id) {
          setUserID(userDetails.doctor._id);
          const response = await fetch(
            `http://localhost:5000/doctorRoutes/doctor_patient_list/${userDetails.doctor._id}`
          );
          const data = await response.json();

          if (response.ok) {
            setDoctor(data.doctor);
            setPatients(data.patients);
          } else {
            console.error("Error:", data.message);
          }
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorAndPatients();
  }, [userDetails?.doctor?._id, setUserID]);

  // Handle updating patient status
  const handleSubmit = async (patientId) => {
    try {
      const response = await axios.put(
        "http://localhost:5000/doctorRoutes/doctor_patient_list",
        {
          patientId: patientId,
          reached: true,
        }
      );

      console.log("Response:", response.data);
      alert("Patient status updated successfully!");

      // ✅ Update only the selected patient while keeping others unchanged
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

  // Navigate to inventory request page
  const handleInventoryRequest = () => {
    navigate("/inventory-request", { state: { doctor_id: userDetails.doctor._id } });
  };

  return (
    <div className="doctor-dash-container">
      <h2 className="doctor-dash-title">Doctor Dashboard</h2>

      {loading ? (
        <p className="doctor-dash-loading-message">Loading doctor and patient details...</p>
      ) : doctor ? (
        <div className="doctor-dash-info">
          <h3 className="doctor-dash-name">Dr. {doctor.name}</h3>
          <p className="doctor-dash-specialization">
            <strong>Specialization:</strong> {doctor.specialization}
          </p>
          <p className="doctor-dash-email">
            <strong>Email:</strong> {doctor.email}
          </p>
          <p className="doctor-dash-phone">
            <strong>Phone:</strong> {doctor.contact}
          </p>
        </div>
      ) : (
        <p className="doctor-dash-not-found-message">Doctor not found.</p>
      )}

      <h3 className="doctor-dash-subtitle">
        Request to Inventory
        <button
          onClick={handleInventoryRequest}
          className="doctor-dash-bed-btn"
        >
          Request Inventory
        </button>
      </h3>

      <h3 className="doctor-dash-subtitle">Appointments</h3>

      {patients.length > 0 ? (
        <table className="doctor-dash-table">
          <thead className="doctor-dash-table-head">
            <tr className="doctor-dash-table-header-row">
              <th className="doctor-dash-table-header">Patient Name</th>
              <th className="doctor-dash-table-header">Department</th>
              <th className="doctor-dash-table-header">Date</th>
              <th className="doctor-dash-table-header">Time</th>
              <th className="doctor-dash-table-header">Add Prescription</th>
              <th className="doctor-dash-table-header">View Prescription</th>
              <th className="doctor-dash-table-header">Allocate Bed</th>
              <th className="doctor-dash-table-header">Prescription Status</th>
            </tr>
          </thead>
          <tbody className="doctor-dash-table-body">
            {patients.map((patient) => (
              <tr key={patient._id} className="doctor-dash-table-row">
                <td className="doctor-dash-patient-name">{patient.name}</td>
                <td className="doctor-dash-patient-department">
                  {patient.department}
                </td>
                <td className="doctor-dash-patient-date">{patient.date}</td>
                <td className="doctor-dash-patient-time">{patient.time}</td>
                <td className="doctor-dash-action">
                  <Link
                    to="/add-patient-med"
                    state={{ patient, doctor }}
                    className="doctor-dash-add-btn"
                  >
                    ADD
                  </Link>
                </td>
                <td className="doctor-dash-action">
                  <Link
                    to={`/patient/prescription/${patient.patientId}`}
                    state={{ userDetails: patient }}
                    className="doctor-dash-view-btn"
                  >
                    View Prev Prescription
                  </Link>
                </td>
                <td className="doctor-dash-action">
                  <Link
                    to="/bed-application"
                    state={{ patient, doctor }}
                    className="doctor-dash-bed-btn"
                  >
                    ADD
                  </Link>
                </td>
                <td className="doctor-dash-action">
                  <button
                    className="doctor-dash-bed-btn"
                    onClick={() => handleSubmit(patient._id)}
                    disabled={patient.reached} // ✅ Only disable the clicked button
                  >
                    {patient.reached ? "Done" : "Pending..."}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="doctor-dash-no-patients-message">
          No patients found in this department.
        </p>
      )}

      <h3 className="doctor-dash-subtitle">Beds Allocated to Doctor</h3>
      {userDetails?.doctor?._id ? (
        <BedStatus doctor={userDetails.doctor} />
      ) : (
        <p>Loading doctor data...</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
