const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const MedicineModel = require("../models/Medicine");

// Multer setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = path.join(__dirname, "..", "uploads");
    if (!fs.existsSync(uploadPath)) fs.mkdirSync(uploadPath);
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage: storage });

// Middleware to verify admin
function isAdmin(req, res, next) {
  if (req.session.user && req.session.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ error: "Access denied. Admins only." });
  }
}

// Public route to get all medicines
router.get("/medicines", async (req, res) => {
  try {
    const medicines = await MedicineModel.find();
    res.json(medicines);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// Get all medicines (admin only)
router.get("/admin/medicines", isAdmin, async (req, res) => {
  try {
    const meds = await MedicineModel.find();
    res.json(meds);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch medicines" });
  }
});

// Add new medicine with image upload
router.post("/admin/medicines", isAdmin, upload.single("image"), async (req, res) => {
  try {
    const { name, manufacturer, price, stock } = req.body;
    const imageFilename = req.file ? req.file.filename : null;

    const newMed = new MedicineModel({
      name,
      manufacturer,
      price,
      stock,
      image: imageFilename,
    });

    await newMed.save();
    res.status(201).json({ message: "Medicine added", med: newMed });
  } catch (err) {
    res.status(500).json({ error: "Failed to add medicine" });
  }
});

// Delete medicine
router.delete("/admin/medicines/:id", isAdmin, async (req, res) => {
  try {
    await MedicineModel.findByIdAndDelete(req.params.id);
    res.json({ message: "Medicine deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete medicine" });
  }
});

// Update medicine
router.put("/admin/medicines/:id", isAdmin, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, manufacturer, price, stock } = req.body;
    
    const updatedMedicine = await MedicineModel.findByIdAndUpdate(
      id,
      { name, manufacturer, price, stock },
      { new: true }
    );
    
    if (!updatedMedicine) {
      return res.status(404).json({ error: "Medicine not found" });
    }
    
    res.status(200).json({ message: "Medicine updated successfully", medicine: updatedMedicine });
  } catch (err) {
    console.error("Error updating medicine:", err);
    res.status(500).json({ error: "Failed to update medicine" });
  }
});

// Get medicine by ID
router.get("/medicines/by-id/:id", async (req, res) => {
  try {
    const medicine = await MedicineModel.findOne({ id: parseInt(req.params.id) });
    if (!medicine) return res.status(404).json({ error: "Medicine not found" });
    res.json(medicine);
  } catch (err) {
    res.status(500).json({ error: "Error fetching medicine" });
  }
});

module.exports = router; 