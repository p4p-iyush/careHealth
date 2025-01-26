import './AppointmentManagment.css';
import React from 'react';
import { FaCalendarPlus, FaClipboardList, FaClock, FaUsers, FaRegCheckCircle } from 'react-icons/fa';

export default function QueueManagement() {
  return (
    <div>
      <h1 className="AppointmentManagement-heading">Appointment Management</h1>
      <div className="AppointmentManagement-container">
        {/* Add New Appointment Card */}
        <div className="AppointmentManagement-card">
          <FaCalendarPlus className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Add New Appointment</h2>
        </div>

        {/* Today's Appointments Card */}
        <div className="AppointmentManagement-card">
          <FaClipboardList className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Today's Appointments</h2>
          <p className="AppointmentManagement-card-description">5 appointments remaining</p>
        </div>

        {/* Tomorrow's Appointments Card */}
        <div className="AppointmentManagement-card">
          <FaClock className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Tomorrow's Appointments</h2>
          <p className="AppointmentManagement-card-description">8 appointments scheduled</p>
        </div>

        {/* Waiting for Appointments Card */}
        <div className="AppointmentManagement-card">
          <FaClipboardList className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Waiting for Appointments</h2>
          <p className="AppointmentManagement-card-description">2 patients in the queue</p>
        </div>

        {/* Upcoming Appointments Card */}
        <div className="AppointmentManagement-card">
          <FaUsers className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Upcoming Appointments</h2>
          <p className="AppointmentManagement-card-description">15 upcoming appointments</p>
        </div>

        {/* Past Appointments Card */}
        <div className="AppointmentManagement-card">
          <FaRegCheckCircle className="AppointmentManagement-icon" />
          <h2 className="AppointmentManagement-card-title">Past Appointments</h2>
          <p className="AppointmentManagement-card-description">10 completed appointments</p>
        </div>
      </div>
    </div>
  );
}
