import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import  { Link } from "react-router-dom";

const DoctorDashboard = () => {
  const { doctorId } = useParams(); // Get doctorId from the URL
  const [doctor, setDoctor] = useState(null);
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorAndPatients = async () => {
      try {
        const response = await fetch(`http://localhost:5000/doctor_patient_list/${doctorId}`);
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
  }, [doctorId]);

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
          <p><strong>Phone:</strong> {doctor.phone}</p>
        </div>
      ) : (
        <p>Doctor not found.</p>
      )}

      <h3>Appointments</h3>
      {patients.length > 0 ? (
        <table border="1" cellPadding="10">
          <thead>
            <tr>
              <th>Patient Name</th>
              <th>department</th>
              <th>date</th>
              <th>time</th>
              <th>Enter</th>
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
                  <Link to="/add-patient-med">Enter</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No patients found in this department.</p>
      )}
    </div>
  );
};

export default DoctorDashboard;
