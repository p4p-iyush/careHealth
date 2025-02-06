// Patient Schema
const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, min: 0 },
  prescription: [
    {
      medicine_name: { type: String, required: true, trim: true },
      quantity: { type: Number, required: true, min: 1 },
    },
  ],
  prescri_date: { type: Date, required: true, default: Date.now },
  doctor_id: { type: mongoose.Schema.Types.ObjectId, required: true, ref: 'Doctor' },
  handled_by_pharmacist: { type: Boolean, default: false },
  grand_total: { type: Number, default: 0, min: 0 }, // New field for total cost
});

const Patient = mongoose.model('Patients', patientSchema);

module.exports = Patient;