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


    
    // Fetch patient details
    useEffect(() => {
        const fetchPatientDetails = async () => {
            try {
                const response = await fetch(`http://localhost:5000/inventory/api/patients/${id.trim()}`);
                if (!response.ok) throw new Error('Failed to fetch patient details.');
                const data = await response.json();
                // console.log("Fetched Patient Data:", data);
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

    // Fetch inventory data
    useEffect(() => {
        const fetchInventory = async () => {
            try {
                const response = await fetch('http://localhost:5000/inventory/api/inventory');
                if (!response.ok) throw new Error('Failed to fetch inventory.');
                const data = await response.json();
                // console.log("Fetched Inventory Data:", data); // Debugging Log
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

    // Format prescriptions
    const formatPrescriptions = (prescription) => {
        if (Array.isArray(prescription)) {
            return prescription;
        } else if (typeof prescription === 'string') {
            return prescription.split(',').map((item) => {
                const [name, quantity] = item.split(':');
                return { medicine_name: name.trim(), quantity: parseInt(quantity) };
            });
        } else if (typeof prescription === 'object') {
            return Object.entries(prescription).map(([name, quantity]) => ({
                medicine_name: name.trim(),
                quantity,
            }));
        }
        return [];
    };

    // Match inventory with prescriptions
    const filteredInventory = prescriptions.map(prescription => {
        const match = inventory.find(item => 
            item.name.replace(/\s+/g, '').toLowerCase() === prescription.medicine_name.replace(/\s+/g, '').toLowerCase()
        );
        // console.log(`Matching: Prescription - ${prescription.medicine_name} | Inventory - ${match?.name || "Not Found"}`);
        return match;
    }).filter(item => item); // Remove undefined values

    // console.log("Filtered Inventory Data:", filteredInventory); 

    // Handle quantity input change
    const handleInputChange = (inventoryId, value) => {
        const quantityToDeduct = parseInt(value);
        if (isNaN(quantityToDeduct) || quantityToDeduct < 0) return;
        setUpdatedQuantities((prev) => ({
            ...prev,
            [inventoryId]: quantityToDeduct,
        }));
    };

    // Calculate total cost
    const calculateTotalCost = () => {
        return Object.entries(updatedQuantities).reduce((total, [inventoryId, quantity]) => {
            const item = inventory.find(item => item._id === inventoryId);
            return total + (item ? item.cost * quantity : 0);
        }, 0);
    };

    // Handle inventory update
    const handleSubmitUpdate = async () => {
        const grandTotal = calculateTotalCost(); // Calculate the grand total

        try {
            // Update inventory
            const inventoryUpdatePromises = Object.entries(updatedQuantities).map(async ([inventoryId, quantityToDeduct]) => {
                const inventoryItem = inventory.find(item => item._id === inventoryId);
                if (!inventoryItem) return;
                const newQuantity = Math.max(inventoryItem.quantity - quantityToDeduct, 0);
                // console.log(`Updating: InventoryID: ${inventoryId}, New Quantity: ${newQuantity}`);
                const response = await fetch(`http://localhost:5000/inventory/api/inventory/${inventoryId}`, {
                    method: 'PATCH',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ quantity: newQuantity }),
                });
                const result = await response.json();
                // console.log('Patch response:', result);
                if (!response.ok) {
                    throw new Error(result.message || 'Failed to update inventory');
                }
            });

            await Promise.all(inventoryUpdatePromises);

            // Update patient status and grand total
            const patientResponse = await fetch(`http://localhost:5000/inventory/api/patients/${id.trim()}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ handled_by_pharmacist: true, grand_total: grandTotal }), // Include grand total
            });

            if (!patientResponse.ok) {
                throw new Error('Failed to update patient status');
            }

            setPatient((prev) => ({
                ...prev,
                handled_by_pharmacist: true,
                grand_total: grandTotal // Update local state with grand total
            }));
            navigate('/patient-list');
        } catch (err) {
            console.log(err);
            console.error('Error in handleSubmitUpdate:', err);
            setError('Failed to update data. Please try again.');
        }
    };

    if (loading || inventoryLoading) return <div>Loading details...</div>;
    if (error) return <div>{error}</div>;
    if (!patient) return <div>Patient not found!</div>;
    
    return (
        <div className="Prescription-container">
        <header>Prescription & Inventory Management</header>
        <div className="Prescription-content">
            <div className="Prescription-left-section">
                <h3>{patient.patient_name}'s Prescription</h3>
                <table className="Prescription-prescription-table">
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
                <button className="Prescription-back-btn" onClick={() => navigate(-1)}>Go Back</button>
            </div>
            <div className="Prescription-right-section">
                <h3>Inventory Management</h3>
                <table className="Prescription-inventory-table">
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
                                    <td>{item && item.quantity > 0 ?` ₹${(updatedQuantities[item._id] || 0) * item.cost}` : "₹0"}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <h3>Grand Total: ₹{calculateTotalCost()}</h3>
                <button onClick={handleSubmitUpdate} className="Prescription-submit-btn">Submit</button>
            </div>
        </div>
    </div>
    
    );
};

export default PrescriptionDetails;
