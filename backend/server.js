const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const session = require("express-session");
const MongoStore = require("connect-mongo");
require("dotenv").config();
const path = require("path");
const fs = require("fs");

// Import routes
const authRoutes = require("./routes/authRoutes");
const medicineRoutes = require("./routes/medicineRoutes");
const orderRoutes = require("./routes/orderRoutes");

const app = express();
const PORT = 8000;

// Middleware
// Log the uploads directory path
const uploadsPath = path.join(__dirname, "uploads");
console.log("Uploads directory path:", uploadsPath);
console.log("Uploads directory exists:", fs.existsSync(uploadsPath));
console.log("Uploads directory is directory:", fs.statSync(uploadsPath).isDirectory());

// Serve static files first
app.use("/uploads", express.static(uploadsPath)); // Serve static images

// Then other middleware
app.use(cors({ 
  origin: "http://localhost:5173", 
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));
app.use(bodyParser.json());

// Session Middleware
app.use(
  session({
    secret: process.env.SESSION_SECRET || "secret-key",
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: "mongodb://127.0.0.1:27017/mydb" }),
    cookie: { secure: false, httpOnly: true, maxAge: 24 * 60 * 60 * 1000 },
  })
);

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1:27017/mydb", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Error connecting to DB:", err));


app.use("/", authRoutes);
app.use("/", medicineRoutes);
app.use("/", orderRoutes);


app.get("/test", (req, res) => {
  res.json({ message: "Server is working!" });
});


app.get("/test-image", (req, res) => {
  res.sendFile(path.join(__dirname, "uploads", "crocin.jpg"));
});


app.get("/explicit-image/:filename", (req, res) => {
  const filename = req.params.filename;
  const filePath = path.join(__dirname, "uploads", filename);
  
  console.log("Requested file:", filename);
  console.log("Full file path:", filePath);
  console.log("File exists:", fs.existsSync(filePath));
  
  if (fs.existsSync(filePath)) {
    res.sendFile(filePath);
  } else {
    res.status(404).json({ error: "File not found", path: filePath });
  }
});

// List all files in uploads directory
app.get("/uploads-list", (req, res) => {
  try {
    const files = fs.readdirSync(path.join(__dirname, "uploads"));
    res.json({ files });
  } catch (err) {
    res.status(500).json({ error: "Error reading uploads directory", details: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
