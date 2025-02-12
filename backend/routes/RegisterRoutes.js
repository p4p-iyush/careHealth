const express = require("express");
const router = express.Router();
const Patient = require("../Models/PatientRegistration");
const Doctor = require("../Models/DoctorRegistration");
const InventoryManager = require("../Models/InventoryManagerRegistration");
const Admin = require("../Models/AdminRegistration");

router.post('/patient_register', async (req, res) => {
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
router.post('/doctor_register', async (req, res) => {
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
router.post('/inventory_register', async (req, res) => {
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
router.post('/admin_register', async (req, res) => {
    try {
        const newDoctor = new Admin({
            name: req.body.name,
            contact: req.body.contact,
            email: req.body.email,
            password: req.body.password,
            specialization: req.body.specialization,
        });

        const registeredDoctor = await newDoctor.save();
        res.status(201).send("Doctor registered successfully");
    } catch (err) {
        res.status(400).send(`Error: ${err.message}`);
    }
});

module.exports = router;
