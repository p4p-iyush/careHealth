import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './ExpiredProduct.css';

const ExpiredProduct = () => {
    const [expiredProducts, setExpiredProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchExpiredProducts();
    }, []);

    const fetchExpiredProducts = async () => {
        setLoading(true);
        try {
            const response = await fetch('http://localhost:5000/api/expired-products');
            if (!response.ok) {
                throw new Error('Failed to fetch expired products');
            }
            const data = await response.json();
            setExpiredProducts(data);
        } catch (error) {
            setError('Failed to fetch expired products.');
            console.error('Error fetching expired products:', error);
        } finally {
            setLoading(false);
        }
    };

    const formatDate = (dateString) => {
        return dateString ? dateString.split('T')[0] : '';
    };

    return (
        <div className="container expired-product">
            <h1>Expired Products</h1>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : expiredProducts.length > 0 ? (
                <table className="expired-product-list">
                    <thead>
                        <tr>
                            <th>Item Name</th>
                            <th>Expiry Date</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {expiredProducts.map((product, index) => (
                            <tr key={index}>
                                <td>{product.name}</td>
                                <td>{formatDate(product.expiry_date)}</td>
                                <td>
                                    <Link to={`/ExpiryUpdate/${product._id}`} className="action-btn">
                                        Handle
                                    </Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <p>No expired products available.</p>
            )}
            <div>
                <Link to="/inventory" className="back-btn">Go back</Link>
                <Link to="/pharmacy-dashboard" className="home-btn">Home</Link>
            </div>
        </div>
    );
};

export default ExpiredProduct;
