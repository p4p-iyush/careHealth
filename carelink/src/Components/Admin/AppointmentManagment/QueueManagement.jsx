import './QueueManagement.css'
import React from 'react'
import { FaCalendarPlus, FaClipboardList, FaClock, FaUsers, FaRegCheckCircle } from 'react-icons/fa'

export default function QueueManagement() {
  return (
    <div>
      <h1 className="heading">Appointment Management</h1>
      <div className="queue-container">
        {/* Add New Appointment Card */}
        <div className="queue-card">
          <FaCalendarPlus size={40} />
          <h2>Add New Appointment</h2>
        </div>

        {/* Today's Appointments Card */}
        <div className="queue-card">
          <FaClipboardList size={40} />
          <h2>Today's Appointments</h2>
          <p>5 appointments remaining</p>
        </div>

        {/* Tomorrow's Appointments Card */}
        <div className="queue-card">
          <FaClock size={40} />
          <h2>Tomorrow's Appointments</h2>
          <p>8 appointments scheduled</p>
        </div>

        {/* Waiting for Appointments Card */}
        <div className="queue-card">
          <FaClipboardList size={40} />
          <h2>Waiting for Appointments</h2>
          <p>2 patients in the queue</p>
        </div>

        {/* Upcoming Appointments Card */}
        <div className="queue-card">
          <FaUsers size={40} />
          <h2>Upcoming Appointments</h2>
          <p>15 upcoming appointments</p>
        </div>

        {/* Past Appointments Card */}
        <div className="queue-card">
          <FaRegCheckCircle size={40} />
          <h2>Past Appointments</h2>
          <p>10 completed appointments</p>
        </div>
      </div>
    </div>
  )
}
