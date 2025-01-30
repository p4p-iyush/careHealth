import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AppointmentsList.css';

const predefinedSlots = ['09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM', '11:00 AM'];

const AppointmentsList = () => {
    const [appointments, setAppointments] = useState([]);
    const [loading, setLoading] = useState(false);
    const [rescheduleData, setRescheduleData] = useState(null);
    const [availability, setAvailability] = useState([]);

    useEffect(() => {
        fetchAppointments();
    }, []);

    const fetchAppointments = async () => {
        try {
            const response = await axios.get('http://localhost:5000/appointments');
            setAppointments(response.data);
        } catch (error) {
            console.error('Error fetching appointments:', error);
        }
    };

    const cancelAppointment = async (id) => {
        if (!window.confirm('Are you sure you want to cancel this appointment?')) return;

        setLoading(true);
        try {
            await axios.delete(`http://localhost:5000/cancel-appointment/${id}`);
            alert('Appointment cancelled successfully');
            fetchAppointments();
        } catch (error) {
            console.error('Error cancelling appointment:', error);
            alert('Error cancelling appointment');
        }
        setLoading(false);
    };

    const checkAvailability = async (date, department) => {
        if (date && department) {
            try {
                const response = await axios.post('http://localhost:5000/check-availability', {
                    date,
                    department,
                });

                const unavailableSlots = response.data.unavailableSlots || [];
                const availableSlots = predefinedSlots.filter(slot => !unavailableSlots.includes(slot));
                setAvailability(availableSlots);
            } catch (error) {
                console.error('Error checking availability:', error);
            }
        }
    };

    const rescheduleAppointment = async (e) => {
        e.preventDefault();
        if (!rescheduleData.date || !rescheduleData.time) {
            alert('Please select a new date and time');
            return;
        }

        setLoading(true);
        try {
            await axios.put(`http://localhost:5000/reschedule-appointment/${rescheduleData.id}`, {
                date: rescheduleData.date,
                time: rescheduleData.time
            });
            alert('Appointment rescheduled successfully');
            fetchAppointments();
        } catch (error) {
            alert(error.response?.data?.message || 'Error rescheduling appointment');
        }
        setLoading(false);
        setRescheduleData(null);
    };

    return (
        <div>
            <h2>Appointments</h2>
            {appointments.length === 0 ? <p>No appointments found.</p> : (
                <ul className='appointments-list'>
                    {appointments.map((appointment) => (
                        <li key={appointment._id}>
                            <strong>{appointment.name}</strong> - {appointment.date} at {appointment.time} ({appointment.department})
                            <div className='btn-appointment'>
                                <button onClick={() => cancelAppointment(appointment._id)} disabled={loading}>Cancel</button>
                                <button onClick={() => {
                                    if (rescheduleData?.id === appointment._id) {
                                        setRescheduleData(null);
                                    } else {
                                        setRescheduleData({
                                            id: appointment._id,
                                            name: appointment.name,
                                            date: appointment.date,
                                            time: appointment.time,
                                            department: appointment.department,
                                        });
                                        checkAvailability(appointment.date, appointment.department);
                                    }
                                }}>
                                    Reschedule
                                </button>
                            </div>

                            {/* Reschedule Form - Shown Only for Selected Appointment */}
                            {rescheduleData?.id === appointment._id && (
                                <div className="reschedule-form">
                                    <h3>Reschedule Appointment</h3>
                                    <p><strong>Patient:</strong> {rescheduleData.name}</p>
                                    <p><strong>Previous Date:</strong> {rescheduleData.date}</p>
                                    <p><strong>Previous Time:</strong> {rescheduleData.time}</p>

                                    <label>New Date:</label>
                                    <input type="date"
                                        value={rescheduleData.date}
                                        onChange={(e) => {
                                            const newDate = e.target.value;
                                            setRescheduleData({ ...rescheduleData, date: newDate });
                                            checkAvailability(newDate, rescheduleData.department);
                                        }}
                                        required
                                    />

                                    <label>New Time Slot:</label>
                                    <select
                                        value={rescheduleData.time}
                                        onChange={(e) => setRescheduleData({ ...rescheduleData, time: e.target.value })}
                                        required
                                    >
                                        <option value="">Select a time slot</option>
                                        {availability.length > 0 ?
                                            availability.map((slot, index) => (
                                                <option key={index} value={slot}>{slot}</option>
                                            ))
                                            :
                                            <option disabled>No slots available</option>
                                        }
                                    </select>
                                    <div className="btn-reschedule">
                                        <button onClick={rescheduleAppointment} disabled={loading}>Confirm Reschedule</button>
                                        <button onClick={() => setRescheduleData(null)}>Cancel</button>
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default AppointmentsList;
