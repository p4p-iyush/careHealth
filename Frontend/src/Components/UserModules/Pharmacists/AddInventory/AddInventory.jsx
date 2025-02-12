import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import './AddInventory.css';

const AddItem = () => {
    const [name, setName] = useState('');       
    const [quantity, setQuantity] = useState('');
    const [cost, setCost] = useState('');
    const [manufacturer, setManufacturer] = useState('');
    const [manufacturingDate, setManufacturingDate] = useState('');
    const [expiryDate, setExpiryDate] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const addItem = async (e) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
      
        // Log inputs for debugging
        console.log({ name, quantity, cost, manufacturer, manufacturingDate, expiryDate });
      
        // Validation for empty fields and numeric fields
        if (!name || !quantity || !cost) {
          setError('Please provide valid item details!');
          setLoading(false);
          return;
        }
      
        // Ensure quantity and cost are valid numbers
        if (isNaN(quantity) || isNaN(cost) || quantity <= 0 || cost <= 0) {
          setError('Quantity and cost must be valid positive numbers.');
          setLoading(false);
          return;
        }
      
        // Validate date
        if (manufacturingDate && expiryDate && new Date(manufacturingDate) >= new Date(expiryDate)) {
          setError('Manufacturing date should be before expiry date.');
          setLoading(false);
          return;
        }
      
        try {
          // Check if the item already exists
          const checkResponse = await fetch('http://localhost:5000/inventory/api/inventory/check?name=${name}');
          const checkData = await checkResponse.json();
          console.log('Check Response:', checkData); // Debug log
      
          if (checkResponse.ok && checkData.exists) {
            setError('This item is already present in the inventory (${checkData.count} times).');
            setLoading(false);
            return;
          }
      
          // Proceed with adding the item
          const response = await fetch('http://localhost:5000/inventory/api/inventory', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              name,
              quantity: parseInt(quantity),
              manufacturer,
              expiry_date: expiryDate,
              manufacturing_date: manufacturingDate,
              cost: parseFloat(cost),
            }),
          });
      
          const responseData = await response.json();
          console.log('Response Data:', responseData); // Debug log
      
          if (!response.ok) {
            setError(responseData.message || 'Failed to add new item');
            throw new Error(responseData.message);
          }
      
          navigate('/inventory');
        } catch (error) {
          console.error('Error adding new item:', error);
          setError(error.message);
        } finally {
          setLoading(false);
        }
      };
      

    return (
        <div className="container add-item">
            <h1>Add New Item</h1>
            <form onSubmit={addItem} className="add-item-form">
                {error && <div className="error-message">{error}</div>}

                <label>Item Name:</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                <label>Quantity:</label>
                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    required
                    min="1"
                />

                <label>Cost:</label>
                <input
                    type="number"
                    value={cost}
                    onChange={(e) => setCost(e.target.value)}
                    required
                    min="1"
                />

                <label>Manufacturer:</label>
                <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />

                <label>Manufacturing Date:</label>
                <input
                    type="date"
                    value={manufacturingDate}
                    onChange={(e) => setManufacturingDate(e.target.value)}
                    required
                />

                <label>Expiry Date:</label>
                <input
                    type="date"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                    required
                />

                <div>
                    <button type="submit" className="add-btn" disabled={loading}>
                        {loading ? 'Adding...' : 'Add Item'}
                    </button>
                    <Link to="/inventory" className="add-btn">
                        Go back
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddItem;