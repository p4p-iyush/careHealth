// routes/BedManagement.js
const express = require("express");
const router = express.Router();
const Bed = require("../Models/Bed");
const BedPrice = require("../Models/BedPrice");
const Application = require("../Models/BedApplication");

// Apply for a bed
router.post("/apply-bed", async (req, res) => {
  try {
    const { name, email, department, bedType } = req.body;
    const freeBed = await Bed.findOne({ type: bedType, status: "Free" });

    if (!freeBed) {
      return res.status(400).json({ message: `No ${bedType} bed available` });
    }

    freeBed.status = "Occupied";
    await freeBed.save();

    const application = new Application({ name, email, department, bedType, bedNumber: freeBed.bedNumber });
    await application.save();

    res.json({ message: "Bed allocated successfully", bedNumber: freeBed.bedNumber });
  } catch (error) {
    res.status(500).json({ message: "Error allocating bed" });
  }
});

// Get all bed applications
router.get("/bed-status", async (req, res) => {
  try {
    const applications = await Application.find().sort({ allocationTime: -1 });
    res.json(applications);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bed applications" });
  }
});

// Add new beds
router.post("/add-beds", async (req, res) => {
  try {
    const { type, count } = req.body;
    const lastBed = await Bed.findOne({ type }).sort({ number: -1 });
    let lastNumber = lastBed ? lastBed.number : 0;
    const prefix = type === "ICU" ? "ICU" : type === "Private" ? "PVT" : "GN";

    for (let i = 1; i <= count; i++) {
      const newNumber = lastNumber + i;
      const bedNumber = `${prefix}B${newNumber}`;
      await Bed.create({ bedNumber, number: newNumber, type, status: "Free" });
    }

    res.json({ message: `${count} ${type} beds added successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error adding beds" });
  }
});

// Remove a bed
router.delete("/remove-bed/:bedNumber", async (req, res) => {
  try {
    const { bedNumber } = req.params;
    const bed = await Bed.findOne({ bedNumber });

    if (!bed) {
      return res.status(404).json({ message: "Bed not found" });
    }
    if (bed.status === "Occupied") {
      return res.status(400).json({ message: "Cannot remove an occupied bed" });
    }
    await Bed.deleteOne({ bedNumber });
    res.json({ message: `Bed ${bedNumber} removed successfully` });
  } catch (error) {
    res.status(500).json({ message: "Error removing bed" });
  }
});

// Get free beds
router.get("/free-beds", async (req, res) => {
  try {
    const freeBeds = await Bed.find({ status: "Free" }).sort({ bedType: 1 });
    res.json(freeBeds);
  } catch (err) {
    res.status(500).json({ message: "Error fetching free beds", error: err.message });
  }
});

// Get bed statistics
router.get("/bed-stats", async (req, res) => {
  const types = ["ICU", "Private", "General"];
  const stats = {};

  for (const type of types) {
    const total = await Bed.countDocuments({ type });
    const available = await Bed.countDocuments({ type, status: "Free" });
    stats[type] = { total, available };
  }

  res.json(stats);
});

// Get occupied beds with prices
router.get("/occupied-beds", async (req, res) => {
  try {
    const occupiedBeds = await Bed.find({ status: "Occupied" });
    const bedsWithPrices = await Promise.all(
      occupiedBeds.map(async (bed) => {
        const bedPrice = await BedPrice.findOne({ bedNumber: bed.bedNumber });
        
        return {
          bedNumber: bed.bedNumber,
          type: bed.type,
          pricePerDay: bedPrice ? bedPrice.pricePerDay : defaultPrices[bed.type],
        };
      })
    );
    res.json(bedsWithPrices);
  } catch (err) {
    res.status(500).json({ message: "Error fetching occupied beds", error: err.message });
  }
});

// Get default bed prices
router.get("/get-default-prices", async (req, res) => {
  const defaultPrices = await BedPrice.find();
  console.log(defaultPrices);
  res.json(defaultPrices);
  console.log(defaultPrices);
});

// Update default bed prices
router.put("/update-default-prices", async (req, res) => {
  try {
    const { ICU, Private, General } = req.body;
    console.log(ICU, Private, General);

    const updates = await Promise.all([
      BedPrice.findOneAndUpdate({ bedType: "ICU" }, { pricePerDay: ICU }, { new: true }),
      BedPrice.findOneAndUpdate({ bedType: "Private" }, { pricePerDay: Private }, { new: true }),
      BedPrice.findOneAndUpdate({ bedType: "General" }, { pricePerDay: General }, { new: true })
    ]);
    console.log(updates);

    res.json({ message: "Default prices updated successfully", updates });
  } catch (error) {
    console.error("Error updating prices:", error);
    res.status(500).json({ error: "Error updating default prices" });
  }
});

module.exports = router;