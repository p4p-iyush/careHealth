const express = require("express");
const Appointment= require("../Models/AppointmentSchema");


const router = express.Router();

// Route to fetch today's appointments
router.get("/today", async (req, res) => {
    try {
        const today = new Date().toISOString().split("T")[0];
        const appointments = await Appointment.find({ date: today });
        res.json(appointments);
    } catch (error) {
        res.status(500).json({ message: "Error fetching appointments", error });
    }
});

module.exports=router;
