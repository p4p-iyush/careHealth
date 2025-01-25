require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));

const appointmentSchema = new mongoose.Schema({
    name: String,
    email: String,
    phone: String,
    date: String,
    time: String,
    type: String,
    department: String,
    reached: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

const Appointment = mongoose.model('Appointment', appointmentSchema);

// Endpoint to check time slot availability
app.post('/check-availability', async (req, res) => {
    try {
        const { date, time, department } = req.body;
        const existingAppointment = await Appointment.findOne({ date, time, department });
        res.json({ available: !existingAppointment });
    } catch (error) {
        console.error('Error checking availability:', error);
        res.status(500).json({ message: 'Error checking availability' });
    }
});

// Endpoint to book an appointment
app.post('/book-appointment', async (req, res) => {
    try {
        const { name, email, phone, date, time, type, department } = req.body;
        const existingAppointment = await Appointment.findOne({ date, time, department });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const newAppointment = new Appointment({ name, email, phone, date, time, type, department });
        await newAppointment.save();

        res.json({ message: 'Appointment booked successfully' });
    } catch (error) {
        console.error('Error booking appointment:', error);
        res.status(500).json({ message: 'Error booking appointment' });
    }
});

// Endpoint to cancel an appointment
app.delete('/cancel-appointment/:id', async (req, res) => {
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
app.put('/reschedule-appointment/:id', async (req, res) => {
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
app.get('/appointments', async (req, res) => {
    try {
        const appointments = await Appointment.find().sort({ date: 1, time: 1 });
        res.json(appointments);
    } catch (err) {
        res.status(500).json({ message: 'Error fetching appointments' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
