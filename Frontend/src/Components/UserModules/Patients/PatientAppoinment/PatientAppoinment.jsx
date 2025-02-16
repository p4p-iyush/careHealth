import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import "./PatientAppoinment.css"; // Ensure correct file name

const AppointmentDetails = () => {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Ensure fallback value

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  console.log("Patient ID:", userDetails); // Debugging check

  useEffect(() => {
    if (!userDetails) {
      setError("Invalid patient ID");
      setLoading(false);
      return;
    }

    fetch(`http://localhost:5000/api/appointments/getAppointments/${userDetails}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch appointments");
        }
        return response.json();
      })
      .then((data) => {
        setAppointments(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(error.message);
        setLoading(false);
      });
  }, [userDetails]); // ✅ Correct dependency

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;

  return (
    <div className="appointment-container">
      <h2 className="appointment-title">Appointment Details</h2>
      {appointments.length > 0 ? (
        <table className="appointment-table">
          <thead>
            <tr>
              <th className="appointment-header">Name</th>
              <th className="appointment-header">Date</th>
              <th className="appointment-header">Time</th>
              <th className="appointment-header">Type</th>
              <th className="appointment-header">Appoinment Status</th>
              <th className="appointment-header">Department</th>
              <th className="appointment-header">Doctor</th>
              <th className="appointment-header">Prescrition Status</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appointment) => (
              <tr className="appointment-row" key={appointment._id}>
                <td className="appointment-cell">{appointment.name}</td>
                <td className="appointment-cell">{appointment.date}</td>
                <td className="appointment-cell">{appointment.time}</td>
                <td className="appointment-cell">{appointment.type}</td>
                <td className="appointment-cell">{appointment.status}</td>
                <td className="appointment-cell">{appointment.department}</td>
                <td className="appointment-cell">{appointment.doctorName}</td>
                <td className="appointment-cell">{appointment.reached == true ? "Yes" : "No"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p className="error">No appointments found.</p>
      )}
    </div>
  );
};

export default AppointmentDetails;
