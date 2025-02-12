import React, { useEffect, useState } from "react";
import axios from "axios";
import "./RemoveBeds.css";

const RemoveBeds = () => {
  const [freeBeds, setFreeBeds] = useState([]);
  const [message, setMessage] = useState("");

  const fetchFreeBeds = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/beds/free-beds");
      setFreeBeds(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchFreeBeds();
  }, []);

  const handleRemove = async (bedNumber) => {
    try {
      const res = await axios.delete(`http://localhost:5000/api/beds/remove-bed/${bedNumber}`);
      setMessage(res.data.message);
      fetchFreeBeds(); // Refresh the list after removal
    } catch (err) {
      setMessage(err.response?.data?.message || "Error removing bed");
    }
  };

  return (
    <div className="component-remove-beds">
      <h2 className="component-title">Remove Beds</h2>
      <p className="component-note">Note: Only free beds can be removed.</p>

      <div className="component-bed-list">
        {freeBeds.length > 0 ? (
          freeBeds.map((bed) => (
            <div key={bed._id} className="component-bed-item">
              <span className="component-bed-info">
                {bed.bedNumber} ({bed.type})
              </span>
              <button className="component-remove-button" onClick={() => handleRemove(bed.bedNumber)}>
                Remove
              </button>
            </div>
          ))
        ) : (
          <p className="component-no-beds">No free beds available for removal.</p>
        )}
      </div>

      {message && <p className="component-message">{message}</p>}
    </div>
  );
};

export default RemoveBeds;