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
    date: { 
        type: String, 
        required: true, 
        match: [/^\d{4}-\d{2}-\d{2}$/, "Date must be in YYYY-MM-DD format"]
    },
    time: { 
        type: String, 
        required: true, 
        // match: [/^([01]\d|2[0-3]):([0-5]\d)$/, "Time must be in HH:MM 24-hour format"]
    },
    type: { type: String, required: true, enum: ["General", "Emergency", "Follow-up"] },
    status: { type: String, required: true, enum: ["Pending", "Completed", "Cancelled"] ,default: "Pending" },
    department: { type: String, required: true },
    reached: { type: Boolean, default: false }, // To track if the patient arrived
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

module.exports = Appointment;
