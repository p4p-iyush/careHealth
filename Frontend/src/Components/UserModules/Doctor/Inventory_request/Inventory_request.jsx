import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Inventory_request.css"

const Inventory_request = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMed, setSelectedMed] = useState([]);
  const [selectedMedSet, setSelectedMedSet] = useState(new Set());
  const [doctor, setDoctor] = useState(null); // State to store doctor details
  const [loading, setLoading] = useState(true); // Loading state

  const location = useLocation();
  const { doctor_id } = location.state || {}; // Get doctor_id from state

  // Fetch doctor details based on doctor_id
  useEffect(() => {
    if (doctor_id) {
      fetch(`http://localhost:5000/doctorRoutes/doctor/${doctor_id}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.doctor) {
            setDoctor(data.doctor); // Set doctor details
          } else {
            console.error("Doctor not found");
          }
          setLoading(false); // Set loading to false
        })
        .catch((err) => {
          console.error("Error fetching doctor details:", err);
          setLoading(false); // Set loading to false in case of error
        });
    }
  }, [doctor_id]);

  // Fetch medicine suggestions based on search term
  useEffect(() => {
    if (searchTerm.trim() === "") {
      setSuggestions([]);
      return;
    }

    fetch(`http://localhost:5000/inventory/search/inventory?search=${searchTerm}`)
      .then((res) => res.json())
      .then((data) => setSuggestions(data))
      .catch((err) => console.error(err));
  }, [searchTerm]);

  // Handle selecting a medicine
  const handleSelectMed = (suggestion) => {
    setSelectedMed((prevMed) => [
      ...prevMed,
      { ...suggestion, quantity: 1 },
    ]);
    setSelectedMedSet((prevSet) => new Set(prevSet).add(suggestion._id));
    setSearchTerm("");
    setSuggestions([]);
  };

  // Handle removing a medicine
  const handleRemoveMed = (id) => {
    setSelectedMed((prevMed) => prevMed.filter((med) => med._id !== id));
    setSelectedMedSet((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.delete(id);
      return updatedSet;
    });
  };

  // Handle changing medicine quantity
  const handleFieldChange = (id, field, value) => {
    setSelectedMed((prevMed) =>
      prevMed.map((med) =>
        med._id === id ? { ...med, [field]: value } : med
      )
    );
  };

  // Handle form submission
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventoryRequest/save-inventory-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          doctorName: doctor?.name,
          department: doctor?.specialization,
          requests: selectedMed.map(({ name, quantity }) => ({ medicine_name: name, quantity })),
          grand_total: selectedMed.reduce((total, med) => total + (med.price || 0) * med.quantity, 0),
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Inventory request saved successfully!");
        navigate(-1)
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error while saving inventory request:", err);
    }
  };

  // Display loading state while fetching doctor details
  if (loading) {
    return <p>Loading doctor details...</p>;
  }

  // Display error if doctor details are not found
  if (!doctor) {
    return <p>Doctor not found.</p>;
  }

  return (
    <div className="inventory-request-container">
      {/* Doctor Info */}
      <div className="inventory-request-doctor-info">
        <h2>Doctor: {doctor?.name}</h2>
        <h3>Department: {doctor?.specialization}</h3>
      </div>

      {/* Medicine Search */}
      <div className="inventory-request-medicine-search">
        <label>Medicine Name:</label>
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <ul>
          {suggestions.map((suggestion) =>
            !selectedMedSet.has(suggestion._id) ? (
              <li key={suggestion._id} onClick={() => handleSelectMed(suggestion)}>
                {suggestion.name}
              </li>
            ) : null
          )}
        </ul>
      </div>

      {/* Selected Medicines */}
      {selectedMed.length > 0 && (
        <div className="inventory-request-selected-medicines">
          <h3>Selected Medicines</h3>
          {selectedMed.map((med) => (
            <div key={med._id} className="inventory-request-medicine-item">
              <span>{med.name}</span>
              <label>
                Quantity:
                <input
                  type="number"
                  min="1"
                  value={med.quantity}
                  onChange={(e) =>
                    handleFieldChange(med._id, "quantity", e.target.value)
                  }
                />
              </label>
              <button onClick={() => handleRemoveMed(med._id)}>✖</button>
            </div>
          ))}
        </div>
      )}

      {/* Submit Button */}
      <div className="inventory-request-form-actions">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Inventory_request;