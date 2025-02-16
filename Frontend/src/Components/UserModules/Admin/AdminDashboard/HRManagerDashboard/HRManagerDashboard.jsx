import React from "react";
import { useNavigate } from "react-router-dom";

const HRManagerDashboard = () => {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-6">System Administrator Dashboard</h1>
            <div className="grid grid-cols-2 gap-6">
                <button 
                    onClick={() => navigate("/admin-registration")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    New Admin Register
                </button>
                <button 
                    onClick={() => navigate("/Total-Doctors")}
                    className="bg-blue-500 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-600 transition"
                >
                    total doctors
                </button>
                </div>
        </div>
    );
};

export default HRManagerDashboard;