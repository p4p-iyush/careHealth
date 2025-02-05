const mongoose = require("mongoose");

const inventorySchema = new mongoose.Schema({
  inventory_id: { type: String, required: true, unique: true }, // Custom ID for each inventory item
  name: { type: String, required: true },                      // General name for any inventory item
  quantity: { type: Number, required: true, default: 0 },       // Stock quantity (renamed from `stock`)
  manufacturer: { type: String },                               // Optional field for manufacturer
  expiry_date: { type: Date, required :true },                                  // Optional field for expiry date
  manufacturing_date: { type: Date  , required: true},
  cost: { type: Number}

});

inventorySchema.path("quantity").get(function (num) {
  return Math.floor(num); 
});

const Inventory = mongoose.model("Inventory", inventorySchema);

module.exports = Inventory;
