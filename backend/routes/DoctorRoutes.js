const express = require("express");
const router = express.Router();
const Doctor = require('../Models/DoctorRegistration');
const Appointment = require('../Models/AppointmentSchema');


router.get('/doctor_patient_list/:id', async (req, res) => {
    try {
        const id = req.params.id;
        const doctor = await Doctor.findById(id);

        if (!doctor) {
            return res.status(404).json({ message: "Doctor not found" });
        }

        const department = doctor.specialization;
        const patients = await Appointment.find({ department: department });

        console.log("doctor data:", doctor, "patients:", patients);

        // Corrected sort function
        res.status(200).json({
            doctor,
            patients: patients.sort((a, b) => new Date(a.date) - new Date(b.date))
        });

    } catch (error) {
        console.error("Error fetching doctor or patients:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
});


module.exports = router;