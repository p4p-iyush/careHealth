import React, { useState } from "react";

const AddPatientMed = () => {
  const [formData, setFormData] = useState({
    patientName: "",
    medicineName: "",
    dosage: "",
    frequency: "",
    startDate: "",
    endDate: "",
  });

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Simple validation
    if (!formData.patientName || !formData.medicineName || !formData.dosage) {
      alert("Please fill in all required fields.");
      return;
    }

    console.log("Form Data Submitted:", formData);
    alert("Medication added successfully!");

    // Reset form after submission
    setFormData({
      patientName: "",
      medicineName: "",
      dosage: "",
      frequency: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div className="container">
      <h1>Add Patient Medication</h1>
      <form onSubmit={handleSubmit}>
        <label>Patient Name:</label>
        <input
          type="text"
          name="patientName"
          value={formData.patientName}
          onChange={handleChange}
          required
        />

        <label>Medicine Name:</label>
        <input
          type="text"
          name="medicineName"
          value={formData.medicineName}
          onChange={handleChange}
          required
        />

        <label>Dosage (e.g., 500mg):</label>
        <input
          type="text"
          name="dosage"
          value={formData.dosage}
          onChange={handleChange}
          required
        />

        <label>Frequency:</label>
        <select name="frequency" value={formData.frequency} onChange={handleChange}>
          <option value="">Select Frequency</option>
          <option value="Once a day">Once a day</option>
          <option value="Twice a day">Twice a day</option>
          <option value="Every 6 hours">Every 6 hours</option>
        </select>

        <label>Start Date:</label>
        <input
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />

        <label>End Date:</label>
        <input
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />

        <button type="submit">Add Medication</button>
      </form>
    </div>
  );
};

export default AddPatientMed;
