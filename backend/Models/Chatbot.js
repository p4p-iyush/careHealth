const mongoose = require("mongoose");

const ChatbotSchema = new mongoose.Schema({
    patientId: { type: mongoose.Schema.Types.ObjectId, ref: "Patient", required: true },
    doctorId: { type: mongoose.Schema.Types.ObjectId, ref: "Doctor", required: true },
    prescriptionId: { type: mongoose.Schema.Types.ObjectId, ref: "Prescription", required: true },
    
    reportDetails: { type: String, required: true },
    chatbotReply: { type: String, required: true },
    createdAt: { type: Date, default: Date.now } // Keep only one timestamp field
});

module.exports = mongoose.model("Chatbot", ChatbotSchema);
