const express = require("express");
const Appointment= require("../Models/AppointmentSchema");
const router = express.Router();

router.get("/getAppointments/:id", (req, res) => {
    const id = req.params.id;

    Appointment.find({ patientId: id }) // ✅ Find all appointments for the patient
        .then((appointments) => {
            if (appointments.length === 0) {
                return res.status(404).json({ message: "No appointments found for this patient" });
            }
            res.json(appointments); // Send all appointments
        })
        .catch((err) => {
            res.status(500).json({ message: "Error fetching appointments", error: err.message });
        });
});





router.get("/total-appointment-count", async (req, res) => {
    try {
        const totalAppointments = await Appointment.countDocuments(); // ✅ Await the result
        res.json({ totalAppointments });
    } catch (error) {
        res.status(500).json({ message: "Error fetching total appointments", error });
    }
});


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
