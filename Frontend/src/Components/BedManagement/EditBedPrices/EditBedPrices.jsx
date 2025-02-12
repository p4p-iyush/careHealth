import React, { useState, useEffect } from "react";
import axios from "axios";

const EditBedPrices = () => {
  const [prices, setPrices] = useState({ ICU: 0, Private: 0, General: 0 });
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  // Fetch default prices from backend
  useEffect(() => {
    const fetchPrices = async () => {
      setLoading(true);
      try {
        const res = await axios.get("http://localhost:5000/api/beds/get-default-prices");
        if (res.status === 200 && Array.isArray(res.data)) {
          // Convert array to object { ICU: price, Private: price, General: price }
          const priceMap = res.data.reduce((acc, item) => {
            acc[item.bedType] = item.pricePerDay;
            return acc;
          }, {});
          setPrices(priceMap);
        }
      } catch (err) {
        setMessage("Error fetching prices. Please try again.");
      }
      setLoading(false);
    };
    fetchPrices();
  }, []);

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    if (value < 0) return; // Prevent negative values
    setPrices((prev) => ({ ...prev, [name]: parseInt(value) || 0 }));
  };

  // Update default prices
  const handleUpdatePrices = async () => {
    setLoading(true);
    try {
      const res = await axios.put("http://localhost:5000/api/beds/update-default-prices", prices);
      if (res.status === 200) {
        setMessage("Default prices updated successfully.");
      }
    } catch (err) {
      setMessage("Error updating default prices. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div>
      <h2>Edit Default Prices</h2>
      {message && <p>{message}</p>}

      {Object.keys(prices).length > 0 ? (
        <>
          <label>ICU Price:</label>
          <input type="number" name="ICU" value={prices.ICU} onChange={handleChange} />

          <label>Private Room Price:</label>
          <input type="number" name="Private" value={prices.Private} onChange={handleChange} />

          <label>General Ward Price:</label>
          <input type="number" name="General" value={prices.General} onChange={handleChange} />

          <button onClick={handleUpdatePrices} disabled={loading}>
            {loading ? "Updating..." : "Update Prices"}
          </button>
        </>
      ) : (
        <p>Loading default prices...</p>
      )}
    </div>
  );
};

export default EditBedPrices;
