import { useEffect, useState } from "react";
import './display.css';

function AppointmentsList() {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/appointments")
            .then(response => response.json())
            .then(data => {
                // console.log("Sorted Appointments:", data); 
                setAppointments(data);
            })
            .catch(error => console.error("Error fetching appointments:", error));
    }, []);

    return (
        <div>
            <h2>Appointments</h2>
            <table border="1">
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Date</th>
                        <th>Time</th>
                        <th>Type</th>
                        <th>Department</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.map((appointment, index) => (
                        <tr key={index}>
                            <td>{appointment.name}</td>
                            <td>{appointment.email}</td>
                            <td>{appointment.phone}</td>
                            <td>{appointment.date}</td>
                            <td>{appointment.time}</td>
                            <td>{appointment.type}</td>
                            <td>{appointment.department}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default AppointmentsList;
