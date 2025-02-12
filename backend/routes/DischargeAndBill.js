// routes/DischargeAndBill.js
const express = require("express");
const router = express.Router();
const Application = require("../Models/BedApplication");
const Bed = require("../Models/Bed");
const BedPrice = require("../Models/BedPrice");
const DischargeBill = require("../Models/DischargeBill");

// Discharge Bill API
router.post("/discharge-bill/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);
    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    const allocationTime = new Date(application.allocationTime || application.createdAt);
    const currentTime = new Date();
    const daysStayed = Math.max(1, Math.ceil((currentTime - allocationTime) / (1000 * 60 * 60 * 24)));

    const bedPrice = await BedPrice.findOne({ bedType: application.bedType });
    const pricePerDay = bedPrice ? bedPrice.pricePerDay : 0;
    const totalCost = daysStayed * pricePerDay;

    const dischargeBill = new DischargeBill({
      name: application.name,
      email: application.email,
      department: application.department,
      bedType: application.bedType,
      bedNumber: application.bedNumber,
      allocationTime,
      daysStayed,
      totalCost,
    });

    await dischargeBill.save();
    await Bed.updateOne({ bedNumber: application.bedNumber }, { status: "Free" });

    res.json({ message: "Bill generated and saved successfully", dischargeBill });
  } catch (error) {
    res.status(500).json({ message: "Error generating discharge bill" });
  }
});

// Discharge a patient
router.put("/discharge/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const application = await Application.findById(id);

    if (!application) {
      return res.status(404).json({ message: "Application not found" });
    }

    await Bed.updateOne({ bedNumber: application.bedNumber }, { status: "Free" });
    await Application.findByIdAndDelete(id);

    res.json({ message: "Patient discharged successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error discharging patient" });
  }
});

// Get all discharge bills
router.get("/discharge-bill", async (req, res) => {
  try {
    const bills = await DischargeBill.find().sort({ allocationTime: -1 });
    res.json(bills);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bills" });
  }
});

module.exports = router;
