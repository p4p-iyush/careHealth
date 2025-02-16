import React, { useEffect, useState } from "react";
import "./Total_doctor.css"

const TotalDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/patients/totaldoctors")
            .then((response) => response.json())
            .then((data) => setDoctors(data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    return (
        <div className="Total-doctor-container">
  <h1 className="Total-doctor-title">Total Doctors</h1>
  <table className="Total-doctor-table">
    <thead>
      <tr className="Total-doctor-table-header">
        <th className="Total-doctor-table-cell">Name</th>
        <th className="Total-doctor-table-cell">Contact</th>
        <th className="Total-doctor-table-cell">Email</th>
        <th className="Total-doctor-table-cell">Specialization</th>
        <th className="Total-doctor-table-cell">Experience</th>
        <th className="Total-doctor-table-cell">Qualification</th>
      </tr>
    </thead>
    <tbody>
      {doctors.map((doctor) => (
        <tr key={doctor._id} className="Total-doctor-table-row">
          <td className="Total-doctor-table-cell">{doctor.name}</td>
          <td className="Total-doctor-table-cell">{doctor.contact}</td>
          <td className="Total-doctor-table-cell">{doctor.email}</td>
          <td className="Total-doctor-table-cell">{doctor.specialization}</td>
          <td className="Total-doctor-table-cell">{doctor.experience}</td>
          <td className="Total-doctor-table-cell">{doctor.qualification}</td>
        </tr>
      ))}
    </tbody>
  </table>
</div>
    )
};

export default TotalDoctor;
