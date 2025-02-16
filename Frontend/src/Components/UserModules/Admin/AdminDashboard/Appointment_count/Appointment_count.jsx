import { useEffect, useState } from "react";

const TodayAppointments = () => {
    const [appointments, setAppointments] = useState([]);

    useEffect(() => {
        const fetchAppointments = async () => {
            try {
                const response = await fetch("http://localhost:5000/api/appointments/today");
                const data = await response.json();
                setAppointments(data);
            } catch (error) {
                console.error("Error fetching appointments:", error);
            }
        };
        fetchAppointments();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-xl font-bold mb-4">Today's Appointments</h2>
            <table className="w-full border-collapse border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border p-2">Name</th>
                        <th className="border p-2">Doctor</th>
                        <th className="border p-2">Department</th>
                        <th className="border p-2">Type</th>
                        <th className="border p-2">Time</th>
                        <th className="border p-2">Reached</th>
                    </tr>
                </thead>
                <tbody>
                    {appointments.length > 0 ? (
                        appointments.map((appointment) => (
                            <tr key={appointment._id} className="border">
                                <td className="border p-2">{appointment.name}</td>
                                <td className="border p-2">{appointment.doctorName}</td>
                                <td className="border p-2">{appointment.department}</td>
                                <td className="border p-2">{appointment.type}</td>
                                <td className="border p-2">{appointment.time}</td>
                                <td className="border p-2">{appointment.reached ? "Yes" : "No"}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="6" className="text-center p-2">No appointments today</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default TodayAppointments;
