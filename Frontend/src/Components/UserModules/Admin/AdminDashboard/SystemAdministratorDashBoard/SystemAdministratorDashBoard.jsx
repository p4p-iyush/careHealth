import React from "react";
import { useNavigate } from "react-router-dom";

const SystemAdministratorDashBoard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">System Administrator Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
                <button 
                    onClick={() => navigate("/doctor-registration")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    New Doctor Register
                </button>
                <button 
                    onClick={() => navigate("/pharmacy-registration")}
                    className="bg-green-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition"
                >
                    New Pharmacist Register
                </button>
                <button 
                    onClick={() => navigate("/total-patients")}
                    className="bg-purple-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-purple-600 transition"
                >
                    Total No. of Patients
                </button>
                <button 
                    onClick={() => navigate("/Hospital-bills")}
                    className="bg-red-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-red-600 transition"
                >
                   Hospital Pharmacy Bill Show
                </button>
            </div>
        </div>
    );
};

export default SystemAdministratorDashBoard;
