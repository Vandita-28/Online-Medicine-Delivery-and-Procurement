const express = require("express");
const router = express.Router();
const UserModel = require("../models/User");

// Signup
router.post("/signup", async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) return res.status(400).json({ error: "User already exists" });

    const newUser = new UserModel({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User registered successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Error registering user" });
  }
});

// Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await UserModel.findOne({ email });

    if (!user) return res.status(404).json({ error: "User does not exist. Please sign up!" });
    if (user.password !== password) return res.status(401).json({ error: "Invalid email or password!" });

    req.session.user = { id: user._id, username: user.username, role: user.role };

    res.status(200).json({ message: "Login successful!", user: req.session.user });
  } catch (err) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Session Check
router.get("/session", (req, res) => {
  if (req.session.user) {
    res.json({ isAuthenticated: true, user: req.session.user, message: "User is logged in" });
  } else {
    res.json({ isAuthenticated: false });
  }
});

// Logout
router.post("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ error: "Logout failed!" });
    res.json({ message: "Logged out successfully!" });
  });
});

module.exports = router; 