// routes/DischargeAndBill.js
const express = require("express");
const router = express.Router();
const Application = require("../Models/BedApplication");
const Bed = require("../Models/Bed");
const BedPrice = require("../Models/BedPrice");
const DischargeBill = require("../Models/DischargeBill");

// ✅ 1️⃣ Generate Discharge Bill
router.post("/discharge-bill/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Generating bill for patient ID: ${id}`);

    // Find the application
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Calculate Days Stayed
    const allocationTime = new Date(application.allocationTime || application.createdAt);
    const currentTime = new Date();
    const daysStayed = Math.max(1, Math.ceil((currentTime - allocationTime) / (1000 * 60 * 60 * 24)));

    // Get Bed Price
    const bedPrice = await BedPrice.findOne({ bedType: application.bedType });
    const pricePerDay = bedPrice ? bedPrice.pricePerDay : 0;
    const totalCost = daysStayed * pricePerDay;

    // Create and Save Bill
    const dischargeBill = new DischargeBill({
      name: application.name,
      contact: application.contact,
      department: application.department,
      bedType: application.bedType,
      bedNumber: application.bedNumber,
      allocationTime,
      daysStayed,
      totalCost,
    });

    await dischargeBill.save();
    console.log("Bill Saved:", dischargeBill);

    // Mark Bed as Free
    await Bed.updateOne({ bedNumber: application.bedNumber }, { status: "Free" });

    res.json({ message: "Bill generated and saved successfully", dischargeBill });
  } catch (error) {
    console.error("Error generating discharge bill:", error);
    res.status(500).json({ message: "Error generating discharge bill", error: error.message });
  }
});

// ✅ 2️⃣ Discharge a Patient
router.put("/discharge/:id", async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`Discharging patient with ID: ${id}`);

    // Find Application
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    console.log("Application found:", application);

    // Find and Update Bed Status
    const bed = await Bed.findOne({ bedNumber: application.bedNumber });
    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }

    console.log("Bed found:", bed);
    bed.status = "Free"; // or bed.isOccupied = false;
    await bed.save();

    // Delete the Application
    await Application.findByIdAndDelete(id);

    res.json({ message: "Patient discharged successfully" });
  } catch (error) {
    console.error("Error discharging patient:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ 3️⃣ Get All Discharge Bills
router.get("/discharge-bill", async (req, res) => {
  try {
    const bills = await DischargeBill.find().sort({ allocationTime: -1 });
    res.json(bills);
  } catch (error) {
    console.error("Error fetching all bills:", error);
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

module.exports = router;
