const mongoose = require("mongoose");

const MedicineSchema = new mongoose.Schema({
  name: String,
  manufacturer: String,
  price: Number,
  stock: Number,
  image: String, // Store the image filename instead of binary data
});

module.exports = mongoose.model("medicines", MedicineSchema); 