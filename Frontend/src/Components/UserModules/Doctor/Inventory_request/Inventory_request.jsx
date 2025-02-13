import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Inventory_request = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedMed, setSelectedMed] = useState([]);
  const [selectedMedSet, setSelectedMedSet] = useState(new Set());

  const location = useLocation();
  const { patient, doctor } = location.state || {};

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

  const handleSelectMed = (suggestion) => {
    setSelectedMed((prevMed) => [
      ...prevMed,
      { ...suggestion, quantity: 1 },
    ]);
    setSelectedMedSet((prevSet) => new Set(prevSet).add(suggestion._id));
    setSearchTerm("");
    setSuggestions([]);
  };

/*************  ✨ Codeium Command ⭐  *************/
  /**
   * Removes a medication from the list of selected medications.
   * @param {string} id The id of the medication to remove.
   */
/******  72e2e571-1ee1-43cc-9a20-5f991763ed2a  *******/  const handleRemoveMed = (id) => {
    setSelectedMed((prevMed) => prevMed.filter((med) => med._id !== id));
    setSelectedMedSet((prevSet) => {
      const updatedSet = new Set(prevSet);
      updatedSet.delete(id);
      return updatedSet;
    });
  };

  const handleFieldChange = (id, field, value) => {
    setSelectedMed((prevMed) =>
      prevMed.map((med) =>
        med._id === id ? { ...med, [field]: value } : med
      )
    );
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/inventoryRequest/save-inventory-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },  
        body: JSON.stringify({
          doctorName: doctor?.name,
          department: doctor?.specialization,
          requests: selectedMed.map(({ name, quantity }) => ({ medicine_name: name, quantity })), // Send only necessary fields
          grand_total: selectedMed.reduce((total, med) => total + (med.price || 0) * med.quantity, 0), // Calculate grand total
        }),
      });
  
      const data = await response.json();
      if (response.ok) {
        alert("Inventory request saved successfully!");
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (err) {
      console.error("Error while saving invent  ory request:", err);
    }
  };
  

  return (
    <div className="add-patient-med-container">
      {/* Doctor Info */}
      <div className="doctor-info">
        <h2>Doctor: {doctor?.name}</h2>
        <h3>Department: {doctor?.specialization}</h3>
      </div>

      {/* Medicine Search */}
      <div className="medicine-search">
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
        <div className="selected-medicines">
          <h3>Selected Medicines</h3>
          {selectedMed.map((med) => (
            <div key={med._id} className="medicine-item">
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
      <div className="form-actions">
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Inventory_request;