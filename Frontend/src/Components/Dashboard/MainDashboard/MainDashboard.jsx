import React from "react";
import { useLocation } from "react-router-dom";
import Navbar from "../../Navbar/Navbar";
import PatientDashboard from "../PatientDashboard/PatientDashboard";
import AdminDashboard from "../AdminDashboard/AdminDashboard";
import PharmacyDashboard from "../PharmacyDashboard/PharmacyDashboard";
import DoctorDashboard from "../DoctorDashboard/DoctorDashboard";

const MainDashboard = () => {
  const location = useLocation();
  const { userDetails } = location.state || {}; // Ensure userDetails exists

  const userRole = userDetails.patient?.userRole || ""; // Default to 'patient' if undefined

  return (
    <div>
      <Navbar userRole={userRole} />

      {userRole === "admin" && <AdminDashboard />}
      {userRole === "pharmacist" && <PharmacyDashboard />}
      {userRole === "patient" && <PatientDashboard userDetails={userDetails?.patient} />}
      {userRole === "doctor" && <DoctorDashboard />}
    </div>
  );
};

export default MainDashboard;
