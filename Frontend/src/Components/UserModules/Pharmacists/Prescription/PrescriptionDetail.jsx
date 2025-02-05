import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './PrescriptionDetail.css';

const PrescriptionDetails = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [patient, setPatient] = useState(null);
    const [prescriptions, setPrescriptions] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [inventory, setInventory] = useState([]);
    const [inventoryLoading, setInventoryLoading] = useState(true);
    const [updatedQuantities, setUpdatedQuantities] = useState({});

    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/patients/${id.trim()}`);
                if (!response.ok) throw new Error('Failed to fetch patient details.');
                const data = await response.json();
                setPatient(data);
                setPrescriptions(formatPrescriptions(data.prescription));
            } catch (err) {
                console.error(err);
                setError('Failed to load patient details.');
            } finally {
                setLoading(false);
            }
        };
        fetchPatientDetails();
    }, [id]);

    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/api/inventory');
                if (!response.ok) throw new Error('Failed to fetch inventory.');
                const data = await response.json();
                setInventory(data);
            } catch (err) {
                console.error(err);
                setError('Failed to load inventory data.');
            } finally {
                setInventoryLoading(false);
            }
        };
        fetchInventory();
    }, []);

    const formatPrescriptions = (prescription) => {
        if (Array.isArray(prescription)) return prescription;
        if (typeof prescription === 'string') {
            return prescription.split(',').map((item) => {
                const [name, quantity] = item.split(':');
                return { medicine_name: name.trim(), quantity: parseInt(quantity) };
            });
        }
        if (typeof prescription === 'object') {
            return Object.entries(prescription).map(([name, quantity]) => ({
                medicine_name: name.trim(),
                quantity,
            }));
        }
        return [];
    };

    const filteredInventory = prescriptions.map(prescription => {
        const match = inventory.find(item => 
            item.name.replace(/\s+/g, '').toLowerCase() === prescription.medicine_name.replace(/\s+/g, '').toLowerCase()
        );
        return match;
    }).filter(Boolean);

    const handleInputChange = (inventoryId, value) => {
        const quantityToDeduct = parseInt(value);
        if (isNaN(quantityToDeduct) || quantityToDeduct < 0) return;
        setUpdatedQuantities((prev) => ({
            ...prev,
            [inventoryId]: quantityToDeduct,
        }));
    };

    const calculateTotalCost = () => {
        return Object.entries(updatedQuantities).reduce((total, [inventoryId, quantity]) => {
            const item = inventory.find(item => item._id === inventoryId);
            return total + (item ? item.cost * quantity : 0);
        }, 0);
    };

    const handleSubmitUpdate = async () => {
        try {
            const inventoryUpdatePromises = Object.entries(updatedQuantities).map(async ([inventoryId, quantityToDeduct]) => {
                const inventoryItem = inventory.find(item => item._id === inventoryId);
                if (!inventoryItem) return;
                const newQuantity = Math.max(inventoryItem.quantity - quantityToDeduct, 0);
                const response = await fetch(`http://localhost:5000/api/inventory/${inventoryId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                const result = await response.json();
                if (!response.ok) throw new Error(result.message || 'Failed to update inventory');
            });

            await Promise.all(inventoryUpdatePromises);

            const patientResponse = await fetch(`http://localhost:5000/api/patients/${id.trim()}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handled_by_pharmacist: true }),
            });

            if (!patientResponse.ok) throw new Error('Failed to update patient status');

            setPatient((prev) => ({ ...prev, handled_by_pharmacist: true }));
            navigate('/patient-list');
        } catch (err) {
            console.error('Error in handleSubmitUpdate:', err);
            setError('Failed to update data. Please try again.');
        }
    };

    if (loading || inventoryLoading) return <div>Loading details...</div>;
    if (error) return <div>{error}</div>;
    if (!patient) return <div>Patient not found!</div>;

    return (
        <div className="container">
            <header>Prescription & Inventory Management</header>
            <div className="content">
                <div className="left-section">
                    <h3>{patient.name}'s Prescription</h3>
                    <table className="prescription-table">
                        <thead>
                            <tr>
                                <th>Medicine Name</th>
                                <th>Quantity</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((item, index) => (
                                <tr key={index}>
                                    <td>{item.medicine_name}</td>
                                    <td>{item.quantity}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button className="back-btn" onClick={() => navigate(-1)}>Go Back</button>
                </div>

                <div className="right-section">
                    <h3>Inventory Management</h3>
                    <table className="inventory-table">
                        <thead>
                            <tr>
                                <th>Item Name</th>
                                <th>Item Cost</th>
                                <th>Current Quantity</th>
                                <th>Update Quantity</th>
                                <th>Cost</th>
                            </tr>
                        </thead>
                        <tbody>
                            {prescriptions.map((prescription, index) => {
                                const item = filteredInventory[index];
                                return (
                                    <tr key={index}>
                                        <td>{prescription.medicine_name}</td>
                                        <td>₹{item ? item.cost : "N/A"}</td>
                                        <td>{item ? (item.quantity > 0 ? item.quantity : "Out of Stock") : "Unavailable"}</td>
                                        <td>{item && item.quantity > 0 ? (
                                            <input 
                                                type="number" 
                                                min="0" 
                                                value={updatedQuantities[item._id] || ''} 
                                                onChange={(e) => handleInputChange(item._id, e.target.value)} 
                                            />
                                        ) : "N/A"}</td>
                                        <td>₹{item && item.quantity > 0 ? (updatedQuantities[item._id] || 0) * item.cost : 0}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                    <h3>Grand Total: ₹{calculateTotalCost()}</h3>
                    <button onClick={handleSubmitUpdate} className="submit-btn">Submit</button>
                </div>
            </div>
        </div>
    );
};

export default PrescriptionDetails;
