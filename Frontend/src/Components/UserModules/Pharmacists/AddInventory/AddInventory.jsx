import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AddInventory.css';

const AddInventory = () => {
    const [inventoryId, setInventoryId] = useState('');
    const [name, setName] = useState('');
    const [quantity, setQuantity] = useState('');
    const [cost, setCost] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addInventoryItem = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        if (!inventoryId || !name || quantity <= 0 || cost <= 0) {
            setError('Please provide valid item details!');
            setLoading(false);
            return;
        }

        if (manufacturingDate && expiryDate && new Date(manufacturingDate) >= new Date(expiryDate)) {
            setError('Manufacturing date should be before expiry date.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('http://localhost:5000/api/inventory', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    inventory_id: inventoryId,
                    name,
                    quantity: parseInt(quantity),
                    manufacturer,
                    expiry_date: expiryDate,
                    manufacturing_date: manufacturingDate,
                    cost: parseFloat(cost),
                }),
            });

            if (!response.ok) throw new Error('Failed to add new item');

            navigate('/inventory');
        } catch (error) {
            console.error('Error adding new item:', error);
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="addinventory-container">
            <h1 className="addinventory-title">Add New Item</h1>
            <form onSubmit={addInventoryItem} className="addinventory-form">
                {error && <div className="addinventory-error-message">{error}</div>}

                <label className="addinventory-label">Inventory ID:</label>
                <input type="text" value={inventoryId} onChange={(e) => setInventoryId(e.target.value)} className="addinventory-input" required />

                <label className="addinventory-label">Item Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="addinventory-input" required />

                <label className="addinventory-label">Quantity:</label>
                <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="addinventory-input" required min="1" />

                <label className="addinventory-label">Cost:</label>
                <input type="number" value={cost} onChange={(e) => setCost(e.target.value)} className="addinventory-input" required min="1" />

                <label className="addinventory-label">Manufacturer:</label>
                <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} className="addinventory-input" />

                <label className="addinventory-label">Manufacturing Date:</label>
                <input type="date" value={manufacturingDate} onChange={(e) => setManufacturingDate(e.target.value)} className="addinventory-input" required />

                <label className="addinventory-label">Expiry Date:</label>
                <input type="date" value={expiryDate} onChange={(e) => setExpiryDate(e.target.value)} className="addinventory-input" required />

                <div className="addinventory-buttons">
                    <button type="submit" className="addinventory-btn" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Item'}
                    </button>
                    <Link to="/inventory" className="addinventory-btn">Go back</Link>
                </div>
            </form>
        </div>
    );
};

export default AddInventory;


