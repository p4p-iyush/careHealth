import React, { useEffect, useState } from "react";
import axios from "axios";
import "./OccupiedBeds.css"; // Import CSS for styling

const OccupiedBeds = () => {
  const [occupiedBeds, setOccupiedBeds] = useState([]);
  const [priceUpdates, setPriceUpdates] = useState({}); // Stores price updates temporarily
  const [message, setMessage] = useState("");

  // Fetch occupied beds
  const fetchOccupiedBeds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds/occupied-beds");
      setOccupiedBeds(res.data);
      console.log(res.data);
    } catch (err) {
      console.error("Error fetching occupied beds:", err);
    }
  };

  useEffect(() => {
    fetchOccupiedBeds();
  }, []);

  // Handle price update
  const handlePriceUpdate = async (bedNumber) => {
    const pricePerDay = priceUpdates[bedNumber];
    if (!pricePerDay || pricePerDay <= 0) {
      setMessage("Invalid price");
      return;
    }

    try {
      await axios.put("http://localhost:5000/api/beds/update-bed-price", { bedNumber, pricePerDay });
      setMessage(`Price for bed ${bedNumber} updated successfully`);
      setPriceUpdates({ ...priceUpdates, [bedNumber]: "" }); // Clear the input field
    } catch (err) {
      setMessage("Error updating bed price");
    }
  };

  return (
    <div className="occupied-beds-container">
      <h1>Occupied Beds and Pricing</h1>
      {message && <p className="message">{message}</p>}

      <table className="occupied-beds-table">
        <thead>
          <tr>
            <th>Bed Number</th>
            <th>Type</th>
            <th>Price Per Day (₹)</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {occupiedBeds.map((bed) => (
            <tr key={bed.bedNumber}>
              <td>{bed.bedNumber}</td>
              <td>{bed.type}</td>
              <td>
                <input
                  type="number"
                  value={priceUpdates[bed.bedNumber] || bed.pricePerDay}
                  onChange={(e) =>
                    setPriceUpdates({ ...priceUpdates, [bed.bedNumber]: e.target.value })
                  }
                  min="0"
                />
              </td>
              <td>
                <button
                  className="update-price-button"
                  onClick={() => handlePriceUpdate(bed.bedNumber)}
                >
                  Update Price
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default OccupiedBeds;