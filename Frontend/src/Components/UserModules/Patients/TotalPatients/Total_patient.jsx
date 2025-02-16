import React, { useEffect, useState } from "react";

const TotalPatient = () => {
    const [patients, setPatients] = useState([]);

    useEffect(() => {
        fetch("http://localhost:5000/api/patients/totalpatients")
            .then((response) => response.json())
            .then((data) => setPatients(data))
            .catch((error) => console.error("Error fetching patients:", error));
    }, []);

    return (
        <div className="container mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6 text-center">Total Patients</h1>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="py-2 px-4 border">Name</th>
                        <th className="py-2 px-4 border">Age</th>
                        <th className="py-2 px-4 border">Gender</th>
                        <th className="py-2 px-4 border">Contact No.</th>
                        <th className="py-2 px-4 border">Email</th>
                        <th className="py-2 px-4 border">Blood Group</th>
                        <th className="py-2 px-4 border">Address</th>
                    </tr>
                </thead>
                <tbody>
                    {patients.map((patient) => (
                        <tr key={patient._id} className="border">
                            <td className="py-2 px-4 border">{patient.name}</td>
                            <td className="py-2 px-4 border">{patient.age}</td>
                            <td className="py-2 px-4 border">{patient.gender}</td>
                            <td className="py-2 px-4 border">{patient.contact}</td>
                            <td className="py-2 px-4 border">{patient.email}</td>
                            <td className="py-2 px-4 border">{patient.bloodGroup}</td>
                            <td className="py-2 px-4 border">{patient.address}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default TotalPatient;
