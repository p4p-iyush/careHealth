const fs = require("fs");
const path = require("path");
const express = require("express");
const router = express.Router();
const Prescription = require("../Models/Patientprescription");
const Patient = require("../Models/PatientRegistration");
const InventoryManager = require("../Models/InventoryManagerRegistration");
const Doctor = require("../Models/DoctorRegistration");
const Admin = require("../Models/AdminRegistration");

const Chatbot = require("../Models/Chatbot");

const CHATBOT_DATA_DIR = path.join(__dirname, "../ChatBotData");

// Ensure the ChatBotData folder exists
if (!fs.existsSync(CHATBOT_DATA_DIR)) {
    fs.mkdirSync(CHATBOT_DATA_DIR, { recursive: true });
}

// Ensure the ChatBotData folder exists
if (!fs.existsSync(CHATBOT_DATA_DIR)) {
    fs.mkdirSync(CHATBOT_DATA_DIR, { recursive: true });
}

router.post("/patient_login", async (req, res) => {
    try {
        const { email, password } = req.body;
        const patient = await Patient.findOne({ email: email, password: password });

        if (!patient) {
            return res.status(404).send("User not found");
        }


        // Fetch prescriptions for the patient
        const prescriptions = await Prescription.find({ patient_id: patient._id });

        // Fetch chatbot reportDetails for the patient
        const chatbotData = await Chatbot.findOne({ patientId: patient._id });

        // Define file path: ChatBotData/{patient_id}.txt
        const filePath = path.join(CHATBOT_DATA_DIR, `${patient._id}.txt`);

        // Prepare content for the file
        let content = `#Patient Details: \nName:${patient.name}\n Age:${patient.age}\n Gender:${patient.gender} \n ContactNumber:${patient.contact} \nBlood Group:${patient.bloodGroup}\n Address:${patient.address} \nEmail: ${patient.email}\nLogin Time: ${new Date().toISOString()}\n\n`;

        // Add only prescription number and details
        content += "#Patien Prescriptions:\n";
        if (prescriptions.length > 0) {
            prescriptions.forEach((prescription, index) => {
                content += `  ${index + 1}. Prescription Details: ${prescription.prescription.map(med => 
                    `${med.medicine_name} (${med.dosage}, ${med.quantity} units)`
                ).join(", ")}\n`;
            });
        } else {
            content += "  No prescriptions found.\n";
        }

        // Add chatbot reportDetails
        content += "\n#Patient Report Details:\n";
        content += chatbotData && chatbotData.reportDetails ? chatbotData.reportDetails : "  No report details found.\n";

        // Write patient login, prescriptions, and chatbot reportDetails to a text file
        fs.writeFileSync(filePath, content, "utf8");

        res.json({ patient });
    } catch (err) {
        console.error("Error:", err);
        res.status(500).send(`Error: ${err.message}`);
    }
});

router.get("/fetchtxtfile/:patientId", async (req, res) => {
    try {
        const { patientId } = req.params;
        const filePath = path.join(CHATBOT_DATA_DIR, `${patientId}.txt`);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ message: "File not found" });
        }

        // Read the file and send it as a response
        const fileContent = fs.readFileSync(filePath, "utf8");
        res.setHeader("Content-Type", "text/plain");
        res.send(fileContent);

    } catch (err) {
        console.error("Error fetching file:", err);
        res.status(500).send(`Error: ${err.message}`);
    }
});



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
        const admin = await Admin.findOne({ email, password });

        if (!admin) {
            return res.status(404).json({ message: "User not found" });
        }

        // Ensure the response includes the role
        res.json({ 
            id: admin._id,
            email: admin.email,
            userRole: admin.userRole // ✅ This must be present
        });
    } catch (err) {
        res.status(500).json({ message: `Error: ${err.message}` });
    }
});

module.exports = router;
