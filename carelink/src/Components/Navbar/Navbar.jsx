import React from 'react'
import { FaHome, FaClipboardList, FaCalendarPlus, FaUsers, FaSignOutAlt, FaCog, FaStethoscope } from 'react-icons/fa'
import './Navbar.css'

const Navbar = ({ userRole }) => {
  const renderAdminLinks = () => (
    <>
      <li>
        <a href="/admin-dashboard">
          <FaCog size={20} />
          Admin Dashboard
        </a>
      </li>
      <li>
        <a href="/manage-users">
          <FaUsers size={20} />
          Manage Users
        </a>
      </li>
    </>
  )

  const renderPharmacistLinks = () => (
    <>
      <li>
        <a href="/manage-medicines">
          <FaClipboardList size={20} />
          Manage Medicines
        </a>
      </li>
    </>
  )

  const renderPatientLinks = () => (
    <>
      <li>
        <a href="/appointments">
          <FaClipboardList size={20} />
          My Appointments
        </a>
      </li>
      <li>
        <a href="/prescriptions">
          <FaCalendarPlus size={20} />
          My Prescriptions
        </a>
      </li>
    </>
  )

  const renderDoctorLinks = () => (
    <>
      <li>
        <a href="/view-patients">
          <FaStethoscope size={20} />
          View Patients
        </a>
      </li>
      <li>
        <a href="/appointments">
          <FaClipboardList size={20} />
          Manage Appointments
        </a>
      </li>
    </>
  )

  return (
    <nav className="navbar">
      <div className="navbar-brand">
        <h2>OPD Management</h2>
      </div>
      <ul className="navbar-links">
        <li>
          <a href="/home">
            <FaHome size={20} />
            Home
          </a>
        </li>
        {userRole === 'admin' && renderAdminLinks()}
        {userRole === 'pharmacist' && renderPharmacistLinks()}
        {userRole === 'patient' && renderPatientLinks()}
        {userRole === 'doctor' && renderDoctorLinks()}
        <li>
          <a href="/logout">
            <FaSignOutAlt size={20} />
            Logout
          </a>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
