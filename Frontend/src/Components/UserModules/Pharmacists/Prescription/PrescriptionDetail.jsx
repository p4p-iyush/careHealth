import React, { useState, useEffect } from "react";
import "./PrescriptionDetails.css";

const PrescriptionDetails = () => {
  const [prescriptions, setPrescriptions] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});

  useEffect(() => {
    // Fetch prescription data (API simulation)
    const fetchedPrescriptions = [
      { id: 1, name: "Paracetamol", quantity: 10 },
      { id: 2, name: "Ibuprofen", quantity: 5 },
    ];
    setPrescriptions(fetchedPrescriptions);

    // Fetch inventory data (API simulation)
    const fetchedInventory = [
      { id: 1, name: "Paracetamol", availableQuantity: 100, cost: 10 },
      { id: 2, name: "Ibuprofen", availableQuantity: 50, cost: 15 },
    ];
    setInventory(fetchedInventory);
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setUpdatedQuantities((prev) => ({
      ...prev,
      [id]: quantity,
    }));
  };

  const handleSubmit = () => {
    const updatedItems = inventory.map((item) => {
      const newQuantity = updatedQuantities[item.id];
      return newQuantity
        ? {
            ...item,
            availableQuantity: item.availableQuantity - newQuantity,
          }
        : item;
    });

    setInventory(updatedItems);
    setUpdatedQuantities({});
    alert("Inventory updated successfully!");
  };

  return (
    <div className="PrescriptionDetails-container">
      <header className="PrescriptionDetails-header">
        Prescription Details
      </header>

      <div className="PrescriptionDetails-content">
        {/* Left Section: Prescriptions */}
        <div className="PrescriptionDetails-left-section">
          <h3>Prescriptions</h3>
          <table className="PrescriptionDetails-prescription-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Quantity</th>
              </tr>
            </thead>
            <tbody>
              {prescriptions.map((prescription) => (
                <tr key={prescription.id}>
                  <td>{prescription.name}</td>
                  <td>{prescription.quantity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Right Section: Inventory */}
        <div className="PrescriptionDetails-right-section">
          <h3>Inventory</h3>
          <table className="PrescriptionDetails-inventory-table">
            <thead>
              <tr>
                <th>Medicine</th>
                <th>Available</th>
                <th>Cost</th>
                <th>Update Quantity</th>
              </tr>
            </thead>
            <tbody>
              {inventory.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.availableQuantity}</td>
                  <td>{item.cost}</td>
                  <td>
                    <input
                      type="number"
                      min="0"
                      max={item.availableQuantity}
                      value={updatedQuantities[item.id] || ""}
                      onChange={(e) =>
                        handleQuantityChange(item.id, Number(e.target.value))
                      }
                      placeholder="Enter quantity"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <button
        className="PrescriptionDetails-submit-btn"
        onClick={handleSubmit}
      >
        Update Inventory
      </button>
    </div>
  );
};

export default PrescriptionDetails;
