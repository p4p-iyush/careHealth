import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './UpdateQuantity.css';

const UpdateQuantity = () => {
    const { id } = useParams();  // Fixed _id to id
    const [quantity, setQuantity] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        fetchMedicine();
    }, []);

    const fetchMedicine = async () => {
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/inventory/api/inventory/${id}`);
            if (!response.ok) {
                throw new Error('Failed to fetch medicine');
            }
            const data = await response.json();
            setQuantity(data.quantity);
        } catch (error) {
            setError('Failed to fetch medicine.');
            console.error('Error fetching medicine:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        if (isNaN(quantity) || quantity < 0) {
            setError('Quantity must be a valid non-negative number.');
            return;
        }
        setLoading(true);
        try {
            const response = await fetch(`http://localhost:5000/inventory/api/inventory/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ quantity: quantity }) // No need for Number() if already a number
            });
            if (!response.ok) {
                throw new Error('Failed to update quantity');
            }
            navigate('/inventory');
        } catch (error) {
            setError('Failed to update quantity.');
            console.error('Error updating quantity:', error); // Log the error details
        } finally {
            setLoading(false);
        }
    };
    
    return (
        <div className="Update-quantity-container">
            <h1 className="Update-quantity-heading">Update Quantity</h1>
            {loading ? (
                <p className="Update-quantity-loading">Loading...</p>
            ) : error ? (
                <p className="Update-quantity-error-message">{error}</p>
            ) : (
                <form onSubmit={handleUpdate} className="Update-quantity-form">
                    <p className="Update-quantity-current-quantity">Current Quantity: {quantity}</p>
                    <label htmlFor="quantity" className="Update-quantity-label">Quantity</label>
                    <input
                        type="number"
                        id="quantity"
                        value={quantity}
                        onChange={(e) => setQuantity(Number(e.target.value))}
                        required
                        className="Update-quantity-input-field"
                    />
                    <button type="submit" className="Update-quantity-update-btn">Update</button>
                </form>
            )}
        </div>
    );
};

export default UpdateQuantity;
