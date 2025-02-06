const mongoose = require('mongoose');

// Patient Schema
const patientSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: { type: Number, required: true },
  prescription: [
    {
      medicine_name: { type: String, required: true },
      quantity: { type: Number, required: true },
    },
  ],
  prescri_date: { type: Date, required: true },
  doctor_id: { type: String, required: true },
  handled_by_pharmacist: { type: Boolean, default: false } // New field
});

// Prevent OverwriteModelError
const Patient = mongoose.models.Patient || mongoose.model('Patients', patientSchema);

module.exports = Patient;
