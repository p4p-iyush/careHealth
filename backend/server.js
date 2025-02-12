require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');


// Import Models
const Bed = require("./Models/Bed");
const BedPrice = require("./Models/BedPrice");

// login and registration Routes
const LoginRoutes = require("./routes/LoginRoutes.js");
const RegisterRoutes = require("./routes/RegisterRoutes.js");

// Bed Management Routes
const bedManagementRoutes = require("./routes/AllBedManagement.js");
const dischargeandbillManagementRoute = require("./routes/DischargeAndBill.js");

// Inventory Management Routes
const InventoryRoutes = require("./routes/InventoryRoutes.js");

//OPD Routes 
const OPDRoutes = require("./routes/OPDRoutes");

// Doctor Routes
const DoctorRoutes = require("./routes/DoctorRoutes");
const PrescriptionRoutes = require("./routes/PrescriptionRoutes");


const app = express();
app.use(cors());
app.use(bodyParser.json());
// app.use(express.json());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log(err));



// Initialize Bed Data with numeric field - only if no beds or prices exist
async function initializeBeds() {
    const bedCount = await Bed.countDocuments(); // Check if any beds exist
    const priceCount = await BedPrice.countDocuments(); // Check if any prices exist
  
    if (bedCount > 0 && priceCount > 0) {
      console.log("Beds and prices already initialized. Skipping initialization.");
      return;
    }
  
    const bedCounts = {
      ICU: 5,
      Private: 5,
      General: 10,
    };
  
    const defaultPrices = {
      ICU: 500,
      Private: 300,
      General: 100,
    };
  
    for (const [type, count] of Object.entries(bedCounts)) {
      for (let i = 1; i <= count; i++) {
        const prefix = type === "ICU" ? "ICU" : type === "Private" ? "PVT" : "GN";
        const bedNumber = `${prefix}B${i}`;
  
        await Bed.findOneAndUpdate(
          { bedNumber },
          { bedNumber, number: i, type, status: "Free" },
          { upsert: true }
        );
      }
  
      // Set default price for the bed type
      await BedPrice.findOneAndUpdate(
        { bedType: type },
        { bedType: type, pricePerDay: defaultPrices[type] },
        { upsert: true }
      );
    }
  
    console.log("Bed data initialized with default prices.");
  }
  
  mongoose.connection.once("open", () => {
    initializeBeds();
  });
  


  // Routes
  app.use("/api/login", LoginRoutes)
  app.use("/api/register", RegisterRoutes)

  // ############################### Bed Management #########################################
  app.use("/api/beds", bedManagementRoutes);
  app.use("/api/bill", dischargeandbillManagementRoute);

  // ############################### Inventory Management #########################################
  app.use("/inventory", InventoryRoutes);

  // ############################### OPD management #########################################
  app.use("/opdRoutes", OPDRoutes);

// ###############################  doctor section ###############################
  app.use("/doctorRoutes", DoctorRoutes);
  app.use("/prescriptions" , PrescriptionRoutes)



// Start the server
const PORT = process.env.PORT || 5000; // Use the environment variable PORT or default to 5000
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
