import React, { useEffect, useState } from "react";

const TotalDoctor = () => {
    const [doctors, setDoctors] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/patients/totaldoctors")
            .then((response) => response.json())
            .then((data) => setDoctors(data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Total Patients</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">contact</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Specialization</th>
                        <th className="py-2 px-4 border">Expirience</th>
                        <th className="py-2 px-4 border">Qualification</th>
                    </tr>
                </thead>
                <tbody>
                    {doctors.map((doctor) => (
                        <tr key={doctor._id} className="border">
                            <td className="py-2 px-4 border">{doctor.name}</td>
                            <td className="py-2 px-4 border">{doctor.contact}</td>
                            <td className="py-2 px-4 border">{doctor.email}</td>
                            <td className="py-2 px-4 border">{doctor.specialization}</td>
                            <td className="py-2 px-4 border">{doctor.experience}</td>
                            <td className="py-2 px-4 border">{doctor.qualification}</td>
                            
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalDoctor;
