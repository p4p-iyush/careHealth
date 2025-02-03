const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    email: { 
        type: String, 
        required: true, 
        trim: true, 
        lowercase: true, 
        match: [/^\S+@\S+\.\S+$/, "Invalid email format"] 
    },
    phone: { 
        type: String, 
        required: true, 
        match: [/^\d{10}$/, "Phone number must be 10 digits"]
    },
    appointmentDateTime: { type: Date, required: true }, // Combines date & time
    type: { type: String, required: true, enum: ["General", "Emergency", "Follow-up"] },
    department: { type: String, required: true },
    reached: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
