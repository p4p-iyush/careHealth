import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentBookingForm.css';

const predefinedSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'];

const AppointmentBookingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    type: 'General',
    problem: '',
    department: '',
  });

  const [availability, setAvailability] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const checkAvailability = async () => {
    if (formData.date && formData.time && formData.department) {
      try {
        const response = await axios.post('http://localhost:5000/check-availability', {
          date: formData.date,
          time: formData.time,
          department: formData.department,
        });
        setAvailability(response.data.available);
      } catch (error) {
        console.error('Error checking availability:', error);
      }
    }
  };

  useEffect(() => {
    if (formData.date && formData.time && formData.department) {
      checkAvailability();
    }
  }, [formData.date, formData.time, formData.department]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!availability) {
      alert('Selected time slot is not available!');
      return;
    }

    setLoading(true);
    try {
      await axios.post('http://localhost:5000/book-appointment', formData);
      setSubmitted(true);
      alert('Appointment booked successfully!');
    } catch (error) {
      alert(error.response?.data?.message || 'Error booking appointment');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="AppointmentBookingForm-container">
      <form onSubmit={handleSubmit} className="AppointmentBookingForm-form">
        <h2 className="AppointmentBookingForm-heading">Book an Appointment</h2>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Name:</label>
          <input
            className="AppointmentBookingForm-input"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Email:</label>
          <input
            className="AppointmentBookingForm-input"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Phone:</label>
          <input
            className="AppointmentBookingForm-input"
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Date:</label>
          <input
            className="AppointmentBookingForm-input"
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            required
          />
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Time Slot:</label>
          <select
            className="AppointmentBookingForm-select"
            name="time"
            value={formData.time}
            onChange={handleChange}
            required
          >
            <option value="">Select a time slot</option>
            {predefinedSlots.map((slot, index) => (
              <option key={index} value={slot}>
                {slot}
              </option>
            ))}
          </select>
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Appointment Type:</label>
          <select
            className="AppointmentBookingForm-select"
            name="type"
            value={formData.type}
            onChange={handleChange}
          >
            <option value="General">General</option>
            <option value="Emergency">Emergency</option>
            <option value="VIP">VIP</option>
          </select>
        </div>

        <div className="AppointmentBookingForm-field">
          <label className="AppointmentBookingForm-label">Department:</label>
          <select
            className="AppointmentBookingForm-select"
            name="department"
            value={formData.department}
            onChange={handleChange}
            required
          >
            <option value="">Select Department</option>
            <option value="Cardiology">Cardiology</option>
            <option value="Neurology">Neurology</option>
            <option value="Orthopedics">Orthopedics</option>
            <option value="Pediatrics">Pediatrics</option>
            <option value="General Medicine">General Medicine</option>
          </select>
        </div>

        {availability === false && (
          <p className="AppointmentBookingForm-error">This time slot is unavailable.</p>
        )}

        <button
          className="AppointmentBookingForm-button"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Booking...' : 'Book Appointment'}
        </button>
      </form>
    </div>
  );
};

export default AppointmentBookingForm;
