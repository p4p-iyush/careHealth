const express = require("express");
const router = express.Router();
const Patient = require("../Models/PatientRegistration");
const Doctor = require("../Models/DoctorRegistration");
const InventoryManager = require("../Models/InventoryManagerRegistration");
const Admin = require("../Models/AdminRegistration");

router.post("/patient_login", async (req, res) => {
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
router.post("/doctor_login", async (req, res) => {
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
router.post("/inventory_manager_login", async (req, res) => {
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

router.post("/admin_login", async (req, res) => {
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
module.exports = router;
