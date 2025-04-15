const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  role: String, // 'admin' or 'user'
});

module.exports = mongoose.model("users", UserSchema); 