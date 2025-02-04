import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './InventoryManagement.css';

const InventoryManagement = () => {
    const [medicines, setMedicines] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchMedicines();
    }, []);

    const fetchMedicines = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/inventory');
            if (!response.ok) {
                throw new Error('Failed to fetch medicines');
            }
            const data = await response.json();
            setMedicines(data);
        } catch (error) {
            setError('Failed to fetch medicines.');
            console.error('Error fetching medicines:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return dateString ? dateString.split('T')[0] : '';
    };

    return (
        <div className="InventoryManagement-container">
            <h1 className="InventoryManagement-title">Manage Medicines</h1>

            <div className="InventoryManagement-buttonContainer">
                <Link to="/add-item" className="InventoryManagement-addBtn">Add Item</Link>
                <Link to="/Expired-product" className="InventoryManagement-expiredProductsBtn">View Expired Products</Link>
                <Link to="/About-to-expire" className="InventoryManagement-aboutToExpireBtn">View About to Expire Products</Link>
                <Link to="/" className="InventoryManagement-homeBtn">Home</Link>
            </div>

            <br />

            {loading ? (
                <p className="InventoryManagement-loading">Loading...</p>
            ) : error ? (
                <p className="InventoryManagement-errorMessage">{error}</p>
            ) : medicines.length > 0 ? (
                <table className="InventoryManagement-medicineList">
                    <thead>
                        <tr>
                            <th>Medicine Name</th>
                            <th>Quantity</th>
                            <th>Cost</th>
                            <th>Manufacture Date</th>
                            <th>Expiry Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {medicines.map((med, index) => (
                            <tr key={index}>
                                <td>{med.name}</td>
                                <td>{med.quantity}</td>
                                <td>{med.cost}</td>
                                <td>{formatDate(med.manufacturing_date)}</td>
                                <td>{formatDate(med.expiry_date)}</td>
                                <td>
                                    <Link to={`/update-quantity/${med._id}`} className="InventoryManagement-updateQuantityBtn">Update Quantity</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p className="InventoryManagement-noMedicines">No medicines available in inventory.</p>
            )}
        </div>
    );
};

export default InventoryManagement; 

