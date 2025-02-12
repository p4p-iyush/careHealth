const mongoose = require("mongoose");

const DischargeBillSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  department: { type: String, required: true },
  bedType: { type: String, required: true },
  bedNumber: { type: String, required: true },
  allocationTime: { type: Date, required: true },
  dischargeTime: { type: Date, default: Date.now },
  daysStayed: { type: Number, required: true },
  totalCost: { type: Number, required: true },
});

module.exports = mongoose.model("DischargeBill", DischargeBillSchema);
