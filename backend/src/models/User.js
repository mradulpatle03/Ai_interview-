const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true },
  passwordHash: { type: String, required: true },
  
  // role: student/admin (future: coaches, recruiters)
  role: { type: String, enum: ["user", "admin"], default: "user" },

  experienceLevel: { type: String, enum: ["junior", "mid", "senior"], default: "junior" },
  preferences: {
    categories: [String], // e.g. ["technical", "behavioral"]
    difficulty: { type: String, enum: ["easy", "medium", "hard"], default: "medium" }
  },

  isVerified: { type: Boolean, default: false },
  resetToken: { type: String },
  resetTokenExpiry: { type: Date },

  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("User", userSchema);
