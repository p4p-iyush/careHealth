require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Patient = require('./Models/PatientRegistration');
const Doctor = require('./Models/DoctorRegistration');
const InventoryManager = require('./Models/InventoryManagerRegistration');
const Appointment = require('./Models/AppointmentSchema');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));


// ############################### Appointment OPD management #########################################
// Endpoint to check time slot availability
app.post('/check-availability', async (req, res) => {
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
app.post('/book-appointment', async (req, res) => {
    try {
        const { name, email, phone, date, time, type, department } = req.body;
        const existingAppointment = await Appointment.findOne({ date, time, department });

        if (existingAppointment) {
            return res.status(400).json({ message: 'Time slot already booked' });
        }

        const newAppointment = new Appointment({ name, email, phone, date, time, type, department });
        console.log(newAppointment);
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

// ###############################  registration management #########################################
// Route to handle patient registration form submissions
app.post('/patient_register', async (req, res) => {
    try {
        const password = req.body.password;
        const confirm_password = req.body.confirm_password;

        if (password === confirm_password) {
            const patientRegistered = new Patient({
                name: req.body.name,
                age: req.body.age,
                gender: req.body.gender,
                contact: req.body.contact,
                email: req.body.email,
                password: req.body.password,
                confirm_password: req.body.confirm_password,
                bloodGroup: req.body.bloodGroup,
                address: req.body.address,
            });

            const registered = await patientRegistered.save();
            console.log("Patient registered: ", registered);
            res.status(201).send("Patient registered successfully");
        } else {
            res.status(400).send("Passwords do not match");
        }
    } catch (error) {
        res.status(400).send(error);
    }
});

// Route to handle doctor registration form submissions
app.post('/doctor_register', async (req, res) => {
    try {
        const newDoctor = new Doctor({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_Password,
            specialization: req.body.specialization,
            experience: req.body.experience,
            qualification: req.body.qualification,
        });

        const registeredDoctor = await newDoctor.save();
        res.status(201).send("Doctor registered successfully");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

// Route to handle inventory manager registration form submissions
app.post('/inventory_register', async (req, res) => {
    try {
        const newInventoryManager = new InventoryManager({
            name: req.body.name,
            age: req.body.age,
            gender: req.body.gender,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            confirm_password: req.body.confirm_password,
            department: req.body.department,
            yearsOfExperience: req.body.yearsOfExperience,
        });

        const registeredInventoryManager = await newInventoryManager.save();
        res.status(201).send("Inventory Manager registered successfully");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});
// Route to handle admin registration form sumission
app.post('/admin_register', async (req, res) => {
    try {
        const newDoctor = new Doctor({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            specialization: req.body.specialization,
            experience: req.body.experience,
            qualification: req.body.qualification,
        });

        const registeredDoctor = await newDoctor.save();
        res.status(201).send("Doctor registered successfully");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});



// ###############################  login management #########################################
// Route to handle user login
app.post("/patient_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email: email, password: password });
        if (!patient) {
            return res.status(404).send("User not found");
        }
        res.json({ patient });
    }
    catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})
app.post("/doctor_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const doctor = await Doctor.findOne({ email: email, password: password });
        if (!doctor) {
            return res.status(404).send("User not found");
        }
        res.json({ doctor });
    }
    catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})

// Route to handle inventory  login

app.post("/inventory_manager_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const inventoryManager = await InventoryManager.findOne({ email: email, password: password });
        if (!inventoryManager) {
            return res.status(404).send("User not found");
        }
        res.json({ inventoryManager });
    }
    catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})
// Route to handle admin login 

app.post("/admin_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const admin = await Admin.findOne({ email: email, password: password });
        if (!admin) {
            return res.status(404).send("User not found");
        }
        res.json({ admin });
    }
    catch (err) {
        res.status(500).send(`Error: ${err.message}`);
    }
})
// ###############################  doctor section ###############################
// Route to get all patient of that doctor
app.get('/doctor_patient_list/:id', async (req, res) => {
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


// dome data
app.get('/api/inventory', (req, res) => {
    res.json([
        { name: "Paracetamol", quantity: 50, cost: 10 },
        { name: "Ibuprofen", quantity: 30, cost: 15 }
    ]);
});







// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
