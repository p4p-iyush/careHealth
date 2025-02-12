const express = require("express");
const router = express.Router();
const Appointment = require('../Models/AppointmentSchema');
const Patient = require('../Models/PatientRegistration')

router.post('/check-availability', async (req, res) => {
    try {
        const { date, department } = req.body;

        // Find all appointments for the given date and department
        const existingAppointments = await Appointment.find({ date, department });

        // Get all booked time slots
        const bookedSlots = existingAppointments.map(appointment => appointment.time);
        // console.log("bookedSlots:",bookedSlots,"existingAppointments:",existingAppointments);

        // Send back the booked slots as unavailable
        res.json({ unavailableSlots: bookedSlots });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ message: 'Error checking availability' });
    }
});

// Endpoint to book an appointment
router.post('/book-appointment', async (req, res) => {
    try {
        const { name, patientId, email, phone, date, time, type, department } = req.body;
        const existingAppointment = await Appointment.findOne({ date, time, department });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const newAppointment = new Appointment({ name, patientId, email, phone, date, time, type, department });
        console.log(newAppointment);
        await newAppointment.save();

        res.json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

// Endpoint to cancel an appointment
router.delete('/cancel-appointment/:id', async (req, res) => {
    try {
        const { id } = req.params;

        // Convert ID to MongoDB ObjectId
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(400).json({ message: 'Invalid appointment ID' });
        }

        const deletedAppointment = await Appointment.findByIdAndDelete(id);

        if (!deletedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({ message: 'Appointment cancelled successfully' });
    } catch (error) {
        console.error('Error cancelling appointment:', error);
        res.status(500).json({ message: 'Error cancelling appointment' });
    }
});

// Endpoint to reschedule an appointment
router.put('/reschedule-appointment/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { date, time, department } = req.body;

        // Check if the new slot is available
        const existingAppointment = await Appointment.findOne({ date, time, department });
        if (existingAppointment) {
            return res.status(400).json({ message: 'New time slot already booked' });
        }

        // Update the appointment
        const updatedAppointment = await Appointment.findByIdAndUpdate(id, { date, time }, { new: true });

        if (!updatedAppointment) {
            return res.status(404).json({ message: 'Appointment not found' });
        }

        res.json({ message: 'Appointment rescheduled successfully', appointment: updatedAppointment });
    } catch (error) {
        console.error('Error rescheduling appointment:', error);
        res.status(500).json({ message: 'Error rescheduling appointment' });
    }
});

// Endpoint to get all appointments
router.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1, time: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});
router.get('/appointments/:id', async (req, res) => {
    try {
        const { id } = req.params; // Extract patient ID from route parameters
        // console.log("Patient ID:", id);

        // Find the patient by ID
        const patient = await Patient.findById(id);
        if (!patient) {
            return res.status(404).json({ message: 'Patient not found' });
        }
        // console.log("Patient:", patient);

        // Find appointments associated with the patient
        const patientAppointments = await Appointment.find({ patientId: id });
        if (!patientAppointments.length) {
            return res.status(404).json({ message: 'No appointments found for this patient' });
        }

        res.json(patientAppointments); // Send the appointments as the response
    }catch (err) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});


module.exports = router;